class UserRepo {
  constructor(users) {
    this.users = users;
  };

  getUserFromID(id) {
    return this.users.find((user) => id === user.id);
  };

  getDataFromUserID(id, dataSet) {
    return dataSet.filter((userData) => id === userData.userID);
  };

  calculateAverageStepGoal() {
    const totalStepGoal = this.users.reduce((sum, data) => {
      return sum += data.dailyStepGoal;
    }, 0);
    const averageSteps = totalStepGoal / this.users.length;
    return averageSteps;
  };

  makeSortedUserArray(id, dataSet) {
    let selectedID = this.getDataFromUserID(id, dataSet)
    let sortedByDate = selectedID.sort((a, b) => new Date(b.date) - new Date(a.date));
    return sortedByDate;
  };

  getCurrentDate(id, dataSet) {
    return this.makeSortedUserArray(id, dataSet)[0].date;
  };

  getFirstWeek(id, dataSet) {
    return this.makeSortedUserArray(id, dataSet).slice(0, 7);
  };

  getWeekByDate(date, id, dataSet) {
    let user = this.makeSortedUserArray(id, dataSet).find((sortedItem) => (sortedItem.date === date));
    let dateIndex = this.makeSortedUserArray(id, dataSet).indexOf(user);
    let week = this.makeSortedUserArray(id, dataSet).slice(dateIndex, dateIndex + 7);
    return week;
  };

  getWeekDataForAllUsers(dataSet, date) {
    let allUserData = dataSet.filter((dataItem) => {
      return (new Date(date)).setDate((new Date(date)).getDate() - 7) <= new Date(dataItem.date) && new Date(dataItem.date) <= new Date(date);
    });
    return allUserData;
  };

  getDayDataForAllUsers(dataSet, date) {
    let userData = dataSet.filter((dataItem) => {
      return dataItem.date === date
    });
    return userData;
  };

  getUserAndRelevantData(dataSet, date, relevantData, timelineData) {
    let userData = timelineData.reduce((userObject, dataItem) => {
      if (!userObject[dataItem.userID]) {
        userObject[dataItem.userID] = [dataItem[relevantData]];
      } else {
        userObject[dataItem.userID].push(dataItem[relevantData]);
      }
      return userObject;
    }, {});
    return userData;
  };

  rankUsersByDataValue(dataSet, date, relevantData, timelineData) {
    let sortedObjectKeys = this.getUserAndRelevantData(dataSet, date, relevantData, timelineData);
    let dataValue = Object.keys(sortedObjectKeys).sort((b, a) => {
      return (this.getUserAverageData(sortedObjectKeys[a])) - (this.getUserAverageData(sortedObjectKeys[b]));
    });
    return dataValue;
  };

  getUserAverageData(propertyValues) {
    const totalUserData = propertyValues.reduce((sum, currentData) => {
      sum += currentData
      return sum;
    }, 0);
    const average = totalUserData / propertyValues.length;
    return average;
  };

  combineRankedUsersAndAverageData(dataSet, date, relevantData, timelineData) {
    let sortedObjectKeys = this.getUserAndRelevantData(dataSet, date, relevantData, timelineData);
    let rankedUsers = this.rankUsersByDataValue(dataSet, date, relevantData, timelineData);
    let rankedUsersAndAverages = rankedUsers.reduce((rankedAverages, user) => {
      let updatedUser = {[user] : this.getUserAverageData(sortedObjectKeys[user])}
      rankedAverages.push(updatedUser)
      return rankedAverages;
    }, []);
    return rankedUsersAndAverages;
  };
}

export default UserRepo;
