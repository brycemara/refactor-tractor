import sleepData from './data/sleep';

class Sleep {
  constructor(sleepData) {
    this.sleepData = sleepData;
  };

  calculateAverage(id, property) {
    let dataPerDay = this.sleepData.filter((data) => id === data.userID);
    let total = dataPerDay.reduce((sum, data) => {
      return sum += data[property];
    }, 0);
    let averagePerDay = total / dataPerDay.length;
    return averagePerDay;
  };

  calculateDailyTotal(id, date, property) {
    let findSleepDataByDate = this.sleepData.find((data) => id === data.userID && date === data.date);
    return findSleepDataByDate[property];
  };

  calculateWeekTotal(date, id, userRepo, property) {
  return userRepo.getWeekByDate(date, id, this.sleepData).map((data) => `${data.date}: ${data[property]}`);
};

  calculateAllUserSleepQuality() {
    let totalSleepQuality = this.sleepData.reduce((sum, user) => {
      sum += user.sleepQuality;
      return sum;
    }, 0)
    let averageSleep = totalSleepQuality / this.sleepData.length;
    return averageSleep;
  };

  determineBestSleepers(date, userRepo) {
    let weekData = userRepo.getWeekDataForAllUsers(this.sleepData, date);
    let userSleepObject = userRepo.getUserAndRelevantData(this.sleepData, date, 'sleepQuality', weekData);
    let bestSleepers = Object.keys(userSleepObject).filter((key) => {
      return this.sleepQuality(userSleepObject[key]) > 3;
    });
    return bestSleepers.map((sleeper) => {
      return userRepo.getUserFromID(parseInt(sleeper)).name;
    });
  };

  sleepQuality(array) {
    let sleepQualityAverage = array.reduce((sum, sleepQualityValue) => {
      sum += sleepQualityValue;
      return sum;
    }, 0) / array.length;
    return sleepQualityAverage;
  };

  determineSleepWinnerForWeek(date, userRepo) {
    let weekData = userRepo.getWeekDataForAllUsers(this.sleepData, date);
    let sleepRankWithData = userRepo.combineRankedUsersAndAverageData(this.sleepData, date, 'sleepQuality', weekData);
    return this.getWinnerNamesFromList(sleepRankWithData, userRepo);
  };

  determineSleepHoursWinnerForDay(date, userRepo) {
    let dayData = userRepo.getDayDataForAllUsers(this.sleepData, date);
    let sleepRankWithData = userRepo.combineRankedUsersAndAverageData(this.sleepData, date, 'hoursSlept', dayData);
    return this.getWinnerNamesFromList(sleepRankWithData, userRepo);
  };

  getWinnerNamesFromList(sortedArray, userRepo) {
    let bestSleepers = sortedArray.filter((element) => {
      return element[Object.keys(element)] === Object.values(sortedArray[0])[0]
    });
    let bestSleeperIds = bestSleepers.map((bestSleeper) => {
      return (Object.keys(bestSleeper));
    });
    return bestSleeperIds.map((sleepNumber) => {
      return userRepo.getUserFromID(parseInt(sleepNumber)).name;
    });
  };
}


export default Sleep;
