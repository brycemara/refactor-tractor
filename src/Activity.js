import Health from './Health';
class Activity extends Health {
  constructor(data) {
    super(data);
    this.activityData = data;
  };

  getDailyMiles(id, date, userRepo) {
    let userStepsByDate = this.activityData.find(data => id === data.userID && date === data.date);
    let userRepoData = userRepo.users.find(user => id === user.id);
    let miles = parseFloat(((userStepsByDate.numSteps * userRepoData.strideLength) / 5280).toFixed(1));
    return miles;
  };

  getDaysGoalExceeded(id, userRepo) {
    let userRepoData = userRepo.users.find(user => id === user.id);
    let daysExceeded = this.activityData.filter(data => id === data.userID && data.numSteps > userRepoData.dailyStepGoal);
    let dates = daysExceeded.map(data => data.date);
    return dates;
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
      let qualifyingDay = this.isQualifyingDay(sortedUserArray, index, relevantData);
      if (qualifyingDay) {
        streakDays.push(currentDay.date);
      }
      return streakDays;
    }, []);
    return streaks;
  };

  isQualifyingDay(sortedUserArray, index, relevantData) {
    if (index >= 2) {
      return sortedUserArray[index - 2][relevantData] < sortedUserArray[index - 1][relevantData] && sortedUserArray[index - 1][relevantData] < sortedUserArray[index][relevantData]
    }
    return false;
  };

  getWinnerId(user, date, userRepo) {
    let rankedList = this.getFriendsAverageStepsForWeek(user, date, userRepo);
    let keysList = rankedList.map(friend => Object.keys(friend));
    let winnerID = parseInt(keysList[0].join(''));
    return winnerID;
  };

};


export default Activity;
