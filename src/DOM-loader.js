let domDisplay = {

  makeActivityHTML(relevantData, relevantDataName) {
    return relevantData.map(activityData => `<li class="historical-list-listItem">On ${activityData} ${relevantDataName}</li>`).join('');
  },

  createDailyActivityData(id, activityInfo, dateString, userRepo) {
    const userDailyFlights = activityInfo.getDailyUserData(id, dateString, userRepo, 'flightsOfStairs');
    document.getElementById('userStairsToday').insertAdjacentHTML("afterBegin", `<p>Stair Count:</p><p>You</><p><span class="number">${userDailyFlights}</span></p>`);
    const usersAverageDailyFlights = activityInfo.getAllUsersAverageForDay(dateString, userRepo, 'flightsOfStairs');
    document.getElementById('avgStairsToday').insertAdjacentHTML("afterBegin", `<p>Stair Count: </p><p>All Users</p><p><span class="number">${usersAverageDailyFlights}</span></p>`);
    const userSteps = activityInfo.getDailyUserData(id, dateString, userRepo, 'numSteps');
    document.getElementById('userStepsToday').insertAdjacentHTML("afterBegin", `<p>Step Count:</p><p>You</p><p><span class="number">${userSteps}</span></p>`);
    const usersAverageDailySteps = activityInfo.getAllUsersAverageForDay(dateString, userRepo, 'numSteps');
    document.getElementById('avgStepsToday').insertAdjacentHTML("afterBegin", `<p>Step Count:</p><p>All Users</p><p><span class="number">${usersAverageDailySteps}</span></p>`);
  },

  createWeeklyActivityData(id, activityInfo, dateString, userRepo, randomHistory, user, winnerId) {
    const weeklySteps = domDisplay.makeActivityHTML(activityInfo.getWeeklyUserData(id, dateString, userRepo, "numSteps"), "steps");
    document.getElementById('userStepsThisWeek').insertAdjacentHTML("afterBegin", weeklySteps);
    const weeklyFlights = domDisplay.makeActivityHTML(activityInfo.getWeeklyUserData(id, dateString, userRepo, "flightsOfStairs"), "flights");
    document.getElementById('userStairsThisWeek').insertAdjacentHTML("afterBegin", weeklyFlights);
    const minutesActive = domDisplay.makeActivityHTML(activityInfo.getWeeklyUserData(id, dateString, userRepo, "minutesActive"), "minutes");
    document.getElementById('userMinutesThisWeek').insertAdjacentHTML("afterBegin", minutesActive);
    const bestSteps = domDisplay.makeActivityHTML(activityInfo.getWeeklyUserData(winnerId, dateString, userRepo, "numSteps"), "steps");
    document.getElementById('bestUserSteps').insertAdjacentHTML("afterBegin", bestSteps);
  }

};

export {domDisplay};
