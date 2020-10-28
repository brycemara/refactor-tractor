import Health from './Health';
class Hydration extends Health{
  constructor(data) {
    super(data);
    this.hydrationData = data;
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
