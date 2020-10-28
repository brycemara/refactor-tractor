class Health {
  constructor(data) {
    this.data = data
  }

  calculateDailyTotal(id, date, property) {
    let findDataByDate = this.data.find((data) => id === data.userID && date === data.date);
    return findDataByDate[property];
  }

  calculateAverage(id, property) {
    let dataPerDay = this.data.filter((data) => id === data.userID);
    let total = dataPerDay.reduce((sum, data) => {
      return sum += data[property];
    }, 0);
    let averagePerDay = total / dataPerDay.length;
    return averagePerDay;
  }
}

export default Health;
