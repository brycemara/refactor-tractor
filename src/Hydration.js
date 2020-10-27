class Hydration {
  constructor(hydrationData) {
    this.hydrationData = hydrationData;
  };

  calculateDailyOunces(id, date) {
    let findOuncesByDate = this.hydrationData.find((data) => id === data.userID && date === data.date);
    return findOuncesByDate.numOunces;
  };

  calculateAverageDailyOunces(id) {
    let perDayUserHydration = this.hydrationData.filter((data) => id === data.userID);
    let dailyHydration = perDayUserHydration.reduce((sum, user) => {
      return sum += user.numOunces;
    }, 0)
    let averageHydration = dailyHydration / perDayUserHydration.length;
    return averageHydration;
  };

  calculateFirstWeekOunces(userRepo, id) {
    let firstWeek = userRepo.getFirstWeek(id, this.hydrationData);
    let firstWeekOunces = firstWeek.map((data) => `${data.date}: ${data.numOunces}`);
    return firstWeekOunces;
  };

  calculateRandomWeekOunces(date, id, userRepo) {
    let week = userRepo.getWeekByDate(date, id, this.hydrationData);
    let weekOunces = week.map((data) => `${data.date}: ${data.numOunces}`);
    return weekOunces;
  };
};

export default Hydration;
