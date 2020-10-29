let fetchApi = {
  fetchUserData() {
    let fetchedUser = fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/users/userData')
      .then(response => response.json())
      .then(data => data.userData)
      .catch(error => console.log(error.message));
      return fetchedUser;
  },
  fetchSleepData() {
    let fetchedSleep = fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/sleep/sleepData')
      .then(response => response.json())
      .then(data => data.sleepData)
      .catch(error => console.log(error.message));
      return fetchedSleep;
  },
  fetchHydrationData() {
    let fetchedHydration = fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData')
      .then(response => response.json())
      .then(data => data.hydrationData)
      .catch(error => console.log(error.message));
      return fetchedHydration;
  },
  fetchActivityData() {
    let fetchedActivity = fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData')
      .then(response => response.json())
      .then(data => data.activityData)
      .catch(error => console.log(error.message));
      return fetchedActivity;
  },
  postSleepData() {
    let newData = buildSleepObject();
    let postSleepData = fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/sleep/sleepData', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(newData)
    })
    .then(response => response.json())
    .catch(error => console.log(error.message))
  },
  buildSleepObject() {
    let newData = {userID: parseInt(sleepIdInfo.value),
    date: sleepDateInfo.value,
    hoursSlept: parseInt(sleepHoursSleptInfo.value),
    sleepQuality: parseInt(sleepSleepQualityInfo.value)};
    return newData;
  },
  postHydrationData() {
   let newData = buildHydrationObject();
   let postSleepData = fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData', {
     method: 'POST',
     headers: {
       'Content-Type':'application/json'
     },
     body: JSON.stringify(newData)
   })
   .then(response => response.json())
   .catch(error => console.log(error.message))
 },
 buildHydrationObject() {
   let newData = {userID: parseInt(hydrationIdInfo.value),
   date: hydrationDateInfo.value,
   numOunces: parseInt(hydrationOuncesInfo.value),
   };
   return newData;
 },
 postActivityData() {
   let newData = buildActivityObject();
   let postSleepData = fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData', {
     method: 'POST',
     headers: {
       'Content-Type':'application/json'
     },
     body: JSON.stringify(newData)
   })
   .then(response => response.json())
   .catch(error => console.log(error.message))
 },
 buildActivityObject() {
   let newData = {userID: parseInt(activityIdInfo.value),
   date: activityDateInfo.value,
   numSteps: parseInt(activityNumStepsInfo.value),
   minutesActive: parseInt(activityMinsActiveInfo.value),
   flightsOfStairs: parseInt(activityFlightsOfStairsInfo.value)};
   return newData;
 }
};

export {fetchApi};
