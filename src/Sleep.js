import Health from './Health';
class Sleep extends Health {
  constructor(data) {
    super(data);
    this.sleepData = data;
  };

  calculateWeekTotal(date, id, userRepo, property) {
  return userRepo.getWeekByDate(date, id, this.sleepData).map((data) => `${data.date}: ${data[property]}`);
};

  calculateAllUserSleepQuality() {
    let totalSleepQuality = this.sleepData.reduce((sum, user) => {
      sum += parseInt(user.sleepQuality);
      return sum;
    }, 0)
    let averageSleep = totalSleepQuality / this.sleepData.length;
    return averageSleep;
  };

  determineBestSleepers(date, userRepo) {
    let weekData = userRepo.getWeekDataForAllUsers(this.sleepData, date);
    let userSleepObject = userRepo.getUserAndRelevantData(this.sleepData, date, 'sleepQuality', weekData);
    let bestSleepers = Object.keys(userSleepObject).filter((key) => {
      return this.calculateSleepQualityAverage(userSleepObject[key]) > 3;
    });
    return bestSleepers.map((sleeper) => {
      return userRepo.getUserFromID(parseInt(sleeper)).name;
    });
  };

  calculateSleepQualityAverage(sleepQualityData) {
    let sleepQualityAverage = sleepQualityData.reduce((sum, sleepQualityValue) => {
      sum += sleepQualityValue;
      return sum;
    }, 0);
    const average = sleepQualityAverage / sleepQualityData.length;
    return average;
  };

  getWinnerNamesFromList(sortedArray, userRepo) {
    let bestSleepers = this.getBestSleepers(sortedArray);
    let bestSleeperIds = this.getBestSleepersIds(bestSleepers);
    return bestSleeperIds.map((sleepNumber) => {
      return userRepo.getUserFromID(parseInt(sleepNumber)).name;
    });
  };

  getBestSleepers(sortedArray) {
    let bestSleepers = sortedArray.filter((element) => {
      return element[Object.keys(element)] === Object.values(sortedArray[0])[0]
    });
    return bestSleepers;
  };

  getBestSleepersIds(bestSleepers) {
    let bestSleeperIds = bestSleepers.map((bestSleeper) => {
      return (Object.keys(bestSleeper));
    });
    return bestSleeperIds;
  }
};


export default Sleep;
