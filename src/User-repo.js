class UserRepo {
  constructor(users) {
    this.users = users;
  };

  getDataFromID(id) {
    return this.users.find((user) => id === user.id);
  };

  getDataFromUserID(id, dataSet) {
    return dataSet.filter((userData) => id === userData.userID);
  };

  calculateAverageStepGoal() {
    const totalStepGoal = this.users.reduce((sumSoFar, data) => {
      return sumSoFar += data.dailyStepGoal;
    }, 0);
    const averageSteps = totalStepGoal / this.users.length;
    return averageSteps;
  };

  makeSortedUserArray(id, dataSet) {
    let selectedID = this.getDataFromUserID(id, dataSet)
    let sortedByDate = selectedID.sort((a, b) => new Date(b.date) - new Date(a.date));
    return sortedByDate;
  };

  getToday(id, dataSet) {
    return this.makeSortedUserArray(id, dataSet)[0].date;
  };

  getFirstWeek(id, dataSet) {
    return this.makeSortedUserArray(id, dataSet).slice(0, 7);
  };

  getWeekFromDate(date, id, dataSet) {
    let user = this.makeSortedUserArray(id, dataSet).find((sortedItem) => (sortedItem.date === date));
    let dateIndex = this.makeSortedUserArray(id, dataSet).indexOf(user);
    let week = this.makeSortedUserArray(id, dataSet).slice(dateIndex, dateIndex + 7);
    return week;
  };

  chooseWeekDataForAllUsers(dataSet, date) {
    let allUserData = dataSet.filter((dataItem) => {
      return (new Date(date)).setDate((new Date(date)).getDate() - 7) <= new Date(dataItem.date) && new Date(dataItem.date) <= new Date(date);
    });
    return allUserData;
  };

  chooseDayDataForAllUsers(dataSet, date) {
    let userData = dataSet.filter((dataItem) => {
      return dataItem.date === date
    });
    return userData;
  };

  isolateUsernameAndRelevantData(dataSet, date, relevantData, listFromMethod) {
    let userData = listFromMethod.reduce((objectSoFar, dataItem) => {
      if (!objectSoFar[dataItem.userID]) {
        objectSoFar[dataItem.userID] = [dataItem[relevantData]];
      } else {
        objectSoFar[dataItem.userID].push(dataItem[relevantData]);
      }
      return objectSoFar;
    }, {});
    return userData;
  };

  rankUserIDsbyRelevantDataValue(dataSet, date, relevantData, listFromMethod) {
    let sortedObjectKeys = this.isolateUsernameAndRelevantData(dataSet, date, relevantData, listFromMethod);
    let dataValue = Object.keys(sortedObjectKeys).sort((b, a) => {
      return (this.getAverageRelevantData(sortedObjectKeys[a])) - (this.getAverageRelevantData(sortedObjectKeys[b]));
    });
    return dataValue;
  };

  getAverageRelevantData(propertyValues) {
    return propertyValues.reduce((sum, currentData) => {
      sum += currentData
      return sum;
    }, 0) / propertyValues.length;
  };

  combineRankedUserIDsAndAveragedData(dataSet, date, relevantData, listFromMethod) {
    let sortedObjectKeys = this.isolateUsernameAndRelevantData(dataSet, date, relevantData, listFromMethod);
    let rankedUsers = this.rankUserIDsbyRelevantDataValue(dataSet, date, relevantData, listFromMethod);
    let rankedUsersAndAverages = rankedUsers.reduce((rankedAverages, user) => {
      let updatedUser = {[user] : this.getAverageRelevantData(sortedObjectKeys[user])}
      rankedAverages.push(updatedUser)
      return rankedAverages;
    }, []);
    return rankedUsersAndAverages;
  };
}

export default UserRepo;
