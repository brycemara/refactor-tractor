let domDisplay = {

  makeActivityHTML(relevantData, relevantDataName) {
    return relevantData.map(activityData => `<li class="historical-list-listItem">On ${activityData} ${relevantDataName}</li>`).join('');
  },

  createDailyActivityData(id, activityInfo, dateString, userRepo) {
    const userDailyFlights = activityInfo.getDailyUserData(id, dateString, userRepo, 'flightsOfStairs');
    userStairsToday.insertAdjacentHTML("afterBegin", `<p>Stair Count:</p><p>You</><p><span class="number">${userDailyFlights}</span></p>`);
    const usersAverageDailyFlights = activityInfo.getAllUsersAverageForDay(dateString, userRepo, 'flightsOfStairs');
    avgStairsToday.insertAdjacentHTML("afterBegin", `<p>Stair Count: </p><p>All Users</p><p><span class="number">${usersAverageDailyFlights}</span></p>`);
    const userSteps = activityInfo.getDailyUserData(id, dateString, userRepo, 'numSteps');
    userStepsToday.insertAdjacentHTML("afterBegin", `<p>Step Count:</p><p>You</p><p><span class="number">${userSteps}</span></p>`);
    const usersAverageDailySteps = activityInfo.getAllUsersAverageForDay(dateString, userRepo, 'numSteps');
    avgStepsToday.insertAdjacentHTML("afterBegin", `<p>Step Count:</p><p>All Users</p><p><span class="number">${usersAverageDailyFlights}</span></p>`);
  },

  createWeeklyActivityData(id, activityInfo, dateString, userRepo, winnerId, user) {
    const weeklySteps = domDisplay.makeActivityHTML(activityInfo.getWeeklyUserData(id, dateString, userRepo, "numSteps"), "steps");
    userStepsThisWeek.insertAdjacentHTML("afterBegin", weeklySteps);
    const weeklyFlights = domDisplay.makeActivityHTML(activityInfo.getWeeklyUserData(id, dateString, userRepo, "flightsOfStairs"), "flights");
    userStairsThisWeek.insertAdjacentHTML("afterBegin", weeklyFlights);
    const minutesActive = domDisplay.makeActivityHTML(activityInfo.getWeeklyUserData(id, dateString, userRepo, "minutesActive"), "minutes");
    userMinutesThisWeek.insertAdjacentHTML("afterBegin", minutesActive);
    const bestSteps = domDisplay.makeActivityHTML(activityInfo.getWeeklyUserData(winnerId, dateString, userRepo, "numSteps"), 'steps');
    bestUserSteps.insertAdjacentHTML("afterBegin", bestSteps);
  }

};

export {domDisplay};
