class Activity {
  constructor(activityData) {
    this.activityData = activityData
  };

  getMilesByDate(id, date, userRepo) {
    let userStepsByDate = this.activityData.find(data => id === data.userID && date === data.date);
    let userRepoData = userRepo.users.find(user => id === user.id);
    let miles = parseFloat(((userStepsByDate.numSteps * userRepoData.strideLength) / 5280).toFixed(1));
    return miles;
  };

  getActiveMinutesByDate(id, date) {
    let userActivityByDate = this.activityData.find(data => id === data.userID && date === data.date);
    let activeMin = userActivityByDate.minutesActive;
    return activeMin;
  };

  calculateActiveAverageForWeek(id, date, userRepo) {
    let week = userRepo.getWeekFromDate(date, id, this.activityData);
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

  getAllUserAverageForDay(date, userRepo, relevantData) {
    let selectedDayData = userRepo.chooseDayDataForAllUsers(this.activityData, date);
    let stairsAverage = selectedDayData.reduce((sum, user) => sum += user[relevantData], 0) / selectedDayData.length;
    let formattedAverage = parseFloat(stairsAverage.toFixed(1));
    return formattedAverage;
  };

  userDataForToday(id, date, userRepo, relevantData) {
    let userData = userRepo.getDataFromUserID(id, this.activityData);
    let dataByDate = userData.find(data => data.date === date)[relevantData];
    return dataByDate;
  };

  userDataForWeek(id, date, userRepo, releventData) {
    let dataByWeek = userRepo.getWeekFromDate(date, id, this.activityData);
    let formattedData = dataByWeek.map((data) => `${data.date}: ${data[releventData]}`);
    return formattedData;
  };
  
  // Friends

  getFriendsActivity(user, userRepo) {
    let data = this.activityData;
    let userDatalist = user.friends.map(function(friend) {
      return userRepo.getDataFromUserID(friend, data)
    });
    return userDatalist.reduce(function(arraySoFar, listItem) {
      return arraySoFar.concat(listItem);
    }, []);
  }
  getFriendsAverageStepsForWeek(user, date, userRepo) {
    let friendsActivity = this.getFriendsActivity(user, userRepo);
    let timeline = userRepo.chooseWeekDataForAllUsers(friendsActivity, date);
    return userRepo.combineRankedUserIDsAndAveragedData(friendsActivity, date, 'numSteps', timeline)
  }
  showChallengeListAndWinner(user, date, userRepo) {
    let rankedList = this.getFriendsAverageStepsForWeek(user, date, userRepo);

    return rankedList.map(function(listItem) {
      let userID = Object.keys(listItem)[0];
      let userName = userRepo.getDataFromID(parseInt(userID)).name;
      return `${userName}: ${listItem[userID]}`
    })
  }
  showcaseWinner(user, date, userRepo) {
    let namedList = this.showChallengeListAndWinner(user, date, userRepo);
    let winner = this.showChallengeListAndWinner(user, date, userRepo).shift();
    return winner;
  }
  getStreak(userRepo, id, relevantData) {
    let data = this.activityData;
    let sortedUserArray = (userRepo.makeSortedUserArray(id, data)).reverse();
    let streaks = sortedUserArray.filter(function(element, index) {
      if (index >= 2) {
        return (sortedUserArray[index - 2][relevantData] < sortedUserArray[index - 1][relevantData] && sortedUserArray[index - 1][relevantData] < sortedUserArray[index][relevantData])
      }
    });
    return streaks.map(function(streak) {
      return streak.date;
    })
  }
  getWinnerId(user, date, userRepo) {
    let rankedList = this.getFriendsAverageStepsForWeek(user, date, userRepo);
    let keysList = rankedList.map(listItem => Object.keys(listItem));
    return parseInt(keysList[0].join(''))
  }
}



export default Activity;
