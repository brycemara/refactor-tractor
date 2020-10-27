class Activity {
  constructor(activityData) {
    this.activityData = activityData
  };

  getDailyMiles(id, date, userRepo) {
    let userStepsByDate = this.activityData.find(data => id === data.userID && date === data.date);
    let userRepoData = userRepo.users.find(user => id === user.id);
    let miles = parseFloat(((userStepsByDate.numSteps * userRepoData.strideLength) / 5280).toFixed(1));
    return miles;
  };

  getDailyActiveMinutes(id, date) {
    let userActivityByDate = this.activityData.find(data => id === data.userID && date === data.date);
    let activeMin = userActivityByDate.minutesActive;
    return activeMin;
  };

  calculateActiveWeeklyAverage(id, date, userRepo) {
    let week = userRepo.getWeekByDate(date, id, this.activityData);
    let weekActiveMin =  week.reduce((sum, user) => {
      return sum += user.minutesActive;
    }, 0);
    let averageActiveWeek = parseFloat((weekActiveMin / 7).toFixed(1));
    return averageActiveWeek;
  };

  accomplishStepGoal(id, date, userRepo) {
    let userActivityData = this.activityData.find(data => id === data.userID && date === data.date);
    let userRepoData = userRepo.users.find(user => id === user.id);
    let goalAccomplished = userActivityData.numSteps >= userRepoData.dailyStepGoal;
    return goalAccomplished;
  };

  getDaysGoalExceeded(id, userRepo) {
    let userRepoData = userRepo.users.find(user => id === user.id);
    let daysExceeded = this.activityData.filter(data => id === data.userID && data.numSteps > userRepoData.dailyStepGoal);
    let dates = daysExceeded.map(data => data.date);
    return dates;
  };

  getStairRecord(id) {
    let userActivityData = this.activityData.filter(data => id === data.userID);
    let totalStairs = userActivityData.reduce((sum, user) => (user.flightsOfStairs > sum) ? user.flightsOfStairs : sum, 0);
    return totalStairs;
  };

  getAllUsersAverageForDay(date, userRepo, relevantData) {
    let selectedDayData = userRepo.getDayDataForAllUsers(this.activityData, date);
    let stairsAverage = selectedDayData.reduce((sum, user) => sum += user[relevantData], 0) / selectedDayData.length;
    let formattedAverage = parseFloat(stairsAverage.toFixed(1));
    return formattedAverage;
  };

  getDailyUserData(id, date, userRepo, relevantData) {
    let userData = userRepo.getDataFromUserID(id, this.activityData);
    let dataByDate = userData.find(data => data.date === date)[relevantData];
    return dataByDate;
  };

  getWeeklyUserData(id, date, userRepo, releventData) {
    let dataByWeek = userRepo.getWeekByDate(date, id, this.activityData);
    let formattedData = dataByWeek.map((data) => `${data.date}: ${data[releventData]}`);
    return formattedData;
  };

  // Friends

  getFriendsActivityData(user, userRepo) {
    let data = this.activityData;
    let userFriends = user.friends.map((friend) => {
      return userRepo.getDataFromUserID(friend, data)
    });
    let userFriendsData = userFriends.flat();
    return userFriendsData;
  };

  getFriendsAverageStepsForWeek(user, date, userRepo) {
    let friendsActivity = this.getFriendsActivityData(user, userRepo);
    let weekData = userRepo.getWeekDataForAllUsers(friendsActivity, date);
    let rankedFriendsActivity = userRepo.combineRankedUsersAndAverageData(friendsActivity, date, 'numSteps', weekData);
    return rankedFriendsActivity;
  };

  getChallengeListAndWinner(user, date, userRepo) {
    let rankedList = this.getFriendsAverageStepsForWeek(user, date, userRepo);
    let rankedFriendsActivity = rankedList.map((friend) => {
      let userID = Object.keys(friend)[0];
      let userName = userRepo.getUserFromID(parseInt(userID)).name;
      return `${userName}: ${friend[userID]}`;
    });
    return rankedFriendsActivity;
  };

  showcaseWinner(user, date, userRepo) {
    let namedList = this.getChallengeListAndWinner(user, date, userRepo);
    let winner = this.getChallengeListAndWinner(user, date, userRepo).shift();
    return winner;
  };

  getStreakDays(userRepo, id, relevantData) {
    let data = this.activityData;
    let sortedUserArray = (userRepo.makeSortedUserArray(id, data)).reverse();
    let streaks = sortedUserArray.reduce((streakDays, currentDay, index) => {
      let qualifyingDay;
      if (index >= 2) {
        qualifyingDay = (sortedUserArray[index - 2][relevantData] < sortedUserArray[index - 1][relevantData] && sortedUserArray[index - 1][relevantData] < sortedUserArray[index][relevantData]);
      };
      if (qualifyingDay) {
        streakDays.push(currentDay.date);
      }
      return streakDays;
    }, []);
    return streaks;
  };

  getWinnerId(user, date, userRepo) {
    let rankedList = this.getFriendsAverageStepsForWeek(user, date, userRepo);
    let keysList = rankedList.map(friend => Object.keys(friend));
    let winnerID = parseInt(keysList[0].join(''));
    return winnerID;
  };

};


export default Activity;
