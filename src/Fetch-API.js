import {sleepIdInfo, sleepDateInfo, sleepHoursSleptInfo, sleepSleepQualityInfo, hydrationIdInfo, hydrationDateInfo, hydrationOuncesInfo, activityIdInfo, activityDateInfo, activityNumStepsInfo, activityMinsActiveInfo, activityFlightsOfStairsInfo} from './dom-data.js'

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
    let newData = fetchApi.buildSleepObject();
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
    fetchApi.checkSleepInputs();
    let newData = {userID: parseInt(sleepIdInfo.value),
    date: sleepDateInfo.value,
    hoursSlept: parseInt(sleepHoursSleptInfo.value),
    sleepQuality: parseInt(sleepSleepQualityInfo.value)};
    return newData;
  },
  checkSleepInputs() {
    if (sleepIdInfo.value < 1 || sleepIdInfo.value > 50) {
      alert('Please input a valid User ID# between 1 and 50');
    } else if (sleepDateInfo.value === '') {
      alert('Please enter a valid date YYYY/MM/DD')
    } else if (sleepHoursSleptInfo.value < 1) {
      alert('I hope you slept longer than that...');
    } else if (sleepSleepQualityInfo.value < 1) {
      alert('Looks like you could use some rest!');
    };
  },
  postHydrationData() {
   let newData = fetchApi.buildHydrationObject();
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
   fetchApi.checkHydrationInputs();
   let newData = {userID: parseInt(hydrationIdInfo.value),
   date: hydrationDateInfo.value,
   numOunces: parseInt(hydrationOuncesInfo.value),
   };
   return newData;
 },
 checkHydrationInputs() {
   if (hydrationIdInfo.value < 1 || hydrationIdInfo.value > 50) {
     alert('Please input a valid User ID# between 1 and 50');
   } else if (hydrationDateInfo.value === '') {
     alert('Please enter a valid date YYYY/MM/DD')
   } else if (hydrationOuncesInfo.value < 1) {
     alert('Aren\'t you thirsty?');
   } else if (hydrationOuncesInfo.value > 1000) {
     alert('Are your kidneys ok?');
   };
 },
 postActivityData() {
   let newData = fetchApi.buildActivityObject();
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
   if (activityIdInfo.value < 1 || activityIdInfo.value > 50) {
     alert('Please input a valid User ID# between 1 and 50');
   } else if (activityDateInfo.value === '') {
     alert('Please enter a valid date YYYY/MM/DD')
   } else if (activityNumStepsInfo.value < 1 || activityMinsActiveInfo.value < 1) {
     alert('Get moving!');
   } else if (activityFlightsOfStairsInfo.value < 1) {
     alert('Get climbing!');
   };
   let newData = {userID: parseInt(activityIdInfo.value),
   date: activityDateInfo.value,
   numSteps: parseInt(activityNumStepsInfo.value),
   minutesActive: parseInt(activityMinsActiveInfo.value),
   flightsOfStairs: parseInt(activityFlightsOfStairsInfo.value)};
   return newData;
 }
};

export {fetchApi};
