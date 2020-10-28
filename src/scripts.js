import './css/base.scss';
import './css/style.scss';

import './images/person walking on path.jpg';
import './images/The Rock.jpg';

import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
import UserRepo from './User-repo';

let userList;
let userRepo;
let hydrationRepo;
let sleepRepo;
let activityRepo;

let fetchedUserData = fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/users/userData')
  .then(response => response.json())
  .then(data => data.userData)
  .catch(error => console.log(error.message));

let fetchedSleepData = fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/sleep/sleepData')
  .then(response => response.json())
  .then(data => data.sleepData)
  .catch(error => console.log(error.message));

let fetchedHydrationData = fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData')
  .then(response => response.json())
  .then(data => data.hydrationData)
  .catch(error => console.log(error.message));

let fetchedActivityData = fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData')
  .then(response => response.json())
  .then(data => data.activityData)
  .catch(error => console.log(error.message));

Promise.all([fetchedUserData, fetchedSleepData, fetchedHydrationData, fetchedActivityData]).then(values => {
  userList = createUsers(values[0]);
  userRepo = new UserRepo(userList);
  sleepRepo = new Sleep(values[1]);
  hydrationRepo = new Hydration(values[2]);
  activityRepo = new Activity(values[3]);
  startApp();
});

let sleepIdInfo = document.getElementById('sleep-userID-input');
let sleepDateInfo = document.getElementById('sleep-date-input');
let sleepHoursSleptInfo = document.getElementById('sleep-hoursSlept-input');
let sleepSleepQualityInfo = document.getElementById('sleep-sleepQuality-input');

function buildSleepObject() {
  let newData = {userID: parseInt(sleepIdInfo.value),
  date: sleepDateInfo.value,
  hoursSlept: parseInt(sleepHoursSleptInfo.value),
  sleepQuality: parseInt(sleepSleepQualityInfo.value)};
  return newData;
};

function postSleepData() {
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
};


let hydrationIdInfo = document.getElementById('hydration-userID-input');
let hydrationDateInfo = document.getElementById('hydration-date-input');
let hydrationOuncesInfo = document.getElementById('hydration-ounces-input');

function buildHydrationObject() {
  let newData = {userID: parseInt(hydrationIdInfo.value),
  date: hydrationDateInfo.value,
  numOunces: parseInt(hydrationOuncesInfo.value),
  };
  return newData;
};

function postHydrationData() {
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
};

let activityIdInfo = document.getElementById('activity-userID-input')
let activityDateInfo = document.getElementById('activity-date-input')
let activityNumStepsInfo = document.getElementById('activity-numSteps-input')
let activityMinsActiveInfo = document.getElementById('activity-minsActive-input')
let activityFlightsOfStairsInfo = document.getElementById('activity-flightsOfStairs-input')

function buildActivityObject() {
  let newData = {userID: parseInt(activityIdInfo.value),
  date: activityDateInfo.value,
  numSteps: parseInt(activityNumStepsInfo.value),
  minutesActive: parseInt(activityMinsActiveInfo.value),
  flightsOfStairs: parseInt(activityFlightsOfStairsInfo.value)};
  return newData;
};

function postActivityData() {
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
};

document.querySelector('#submit-sleep-info').addEventListener('click', postSleepData);
document.querySelector('#submit-hydration-info').addEventListener('click', postHydrationData);
document.querySelector('#submit-activity-info').addEventListener('click', postActivityData);

const sidebarName = document.getElementById('sidebarUserName');
const stepGoalCard = document.getElementById('userStepGoalCard');
const avStepGoalCard = document.getElementById('averageStepsGoalCard');
const headerText = document.getElementById('headerText');
const userAddress = document.getElementById('userAddress');
const userEmail = document.getElementById('userEmail');
const userStridelength = document.getElementById('userStridelength');
const friendList = document.getElementById('friendList');
const hydrationToday = document.getElementById('hydrationToday');
const hydrationAverage = document.getElementById('hydrationAverage');
const hydrationThisWeek = document.getElementById('hydrationThisWeek');
const hydrationEarlierWeek = document.getElementById('hydrationEarlierWeek');
const historicalWeek = document.querySelectorAll('.historicalWeek');
const sleepToday = document.getElementById('sleepToday');
const sleepQualityToday = document.getElementById('sleepQualityToday');
const avUserSleepQuality = document.getElementById('avUserSleepQuality');
const sleepThisWeek = document.getElementById('sleepThisWeek');
const sleepEarlierWeek = document.getElementById('sleepEarlierWeek');
const friendChallengeListToday = document.getElementById('friendChallengeListToday');
const friendChallengeListHistory = document.getElementById('friendChallengeListHistory');
const bigWinner = document.getElementById('bigWinner');
const userStepsToday = document.getElementById('userStepsToday');
const avgStepsToday = document.getElementById('avgStepsToday');
const userStairsToday = document.getElementById('userStairsToday');
const avgStairsToday = document.getElementById('avgStairsToday');
const userMinutesToday = document.getElementById('userMinutesToday');
const avgMinutesToday = document.getElementById('avgMinutesToday');
const userStepsThisWeek = document.getElementById('userStepsThisWeek');
const userStairsThisWeek = document.getElementById('userStairsThisWeek');
const userMinutesThisWeek = document.getElementById('userMinutesThisWeek');
const bestUserSteps = document.getElementById('bestUserSteps');
const streakList = document.getElementById('streakList');
const streakListMinutes = document.getElementById('streakListMinutes')

function startApp() {
  getCurrentInfo();
};

function getCurrentInfo() {
  const userNowId = Math.floor(Math.random() * 50);
  const userNow = userRepo.getUserFromID(userNowId);
  const today = userRepo.getCurrentDate(userNowId, hydrationRepo.hydrationData);
  const randomHistory = getRandomDate(userRepo, userNowId, hydrationRepo.hydrationData);
  const winnerNow = activityRepo.getWinnerId(userNow, today, userRepo);
  displayUserInfo(userNow, userNowId, today, randomHistory, winnerNow);
};

function displayUserInfo(userNow, userNowId, today, randomHistory, winnerNow) {
  addInfoToSidebar(userNow, userRepo);
  addHydrationInfo(userNowId, hydrationRepo, today, userRepo, randomHistory);
  addSleepInfo(userNowId, sleepRepo, today, userRepo, randomHistory);
  addActivityInfo(userNowId, activityRepo, today, userRepo, randomHistory, userNow, winnerNow);
  addFriendGameInfo(userNowId, activityRepo, userRepo, today, randomHistory, userNow);
  historicalWeek.forEach(instance => instance.insertAdjacentHTML('afterBegin', `Week of ${randomHistory}`));
};

function createUsers(userData) {
  return userData.reduce((userList, userInfo) => {
    let user = new User(userInfo);
    userList.push(user);
    return userList;
  }, [])
};

function addInfoToSidebar(user, userRepo) {
  sidebarName.innerText = user.name;
  headerText.innerText = `${user.getFirstName()}'s Activity Tracker`;
  stepGoalCard.innerText = `Your daily step goal is ${user.dailyStepGoal}.`;
  avStepGoalCard.innerText = `The average daily step goal is ${userRepo.calculateAverageStepGoal()}.`;
  userAddress.innerText = user.address;
  userEmail.innerText = user.email;
  userStridelength.innerText = `Your stridelength is ${user.strideLength} meters.`;
  friendList.insertAdjacentHTML('afterBegin', makeFriendHTML(user, userRepo));
};

function makeFriendHTML(user, userRepo) {
  const friends = user.getFriendsNames(userRepo);
  const createFriends = friends.map(friendName => `<li class='historical-list-listItem'>${friendName}</li>`).join('');
  return createFriends;
};

function getRandomDate(userRepo, id, dataSet) {
  let sortedArray = userRepo.makeSortedUserArray(id, dataSet);
  return sortedArray[Math.floor(Math.random() * sortedArray.length + 1)].date
};

function addHydrationInfo(id, hydrationInfo, dateString, userRepo, laterDateString) {
  const dailyOunces = hydrationInfo.calculateDailyOunces(id, dateString);
  hydrationToday.insertAdjacentHTML('afterBegin', `<p>You drank</p><p><span class="number">${dailyOunces}</span></p><p>oz water today.</p>`);
  const averageOunces = hydrationInfo.calculateAverageDailyOunces(id);
  hydrationAverage.insertAdjacentHTML('afterBegin', `<p>Your average water intake is</p><p><span class="number">${averageOunces}</span></p> <p>oz per day.</p>`);
  const firstWeekOunces = hydrationInfo.calculateFirstWeekOunces(userRepo, id);
  hydrationThisWeek.insertAdjacentHTML('afterBegin', makeHydrationHTML(id, hydrationInfo, userRepo, firstWeekOunces));
  const randomWeekOunces = hydrationInfo.calculateRandomWeekOunces(laterDateString, id, userRepo);
  hydrationEarlierWeek.insertAdjacentHTML('afterBegin', makeHydrationHTML(id, hydrationInfo, userRepo, randomWeekOunces));
};

function makeHydrationHTML(id, hydrationInfo, userRepo, relevantData) {
  const hydration = relevantData.map(drinkData => `<li class="historical-list-listItem">On ${drinkData}oz</li>`).join('');
  return hydration;
};

function addSleepInfo(id, sleepInfo, dateString, userRepo) {
  const sleepHours = sleepInfo.calculateDailyTotal(id, dateString, 'hoursSlept');
  sleepToday.insertAdjacentHTML("afterBegin", `<p>You slept</p> <p><span class="number">${sleepHours}</span></p> <p>hours today.</p>`);
  const sleepQuality = sleepInfo.calculateDailyTotal(id, dateString, 'sleepQuality');
  sleepQualityToday.insertAdjacentHTML("afterBegin", `<p>Your sleep quality was</p> <p><span class="number">${sleepQuality}</span></p><p>out of 5.</p>`);
  const averageSleepQuality = Math.round(sleepInfo.calculateAllUserSleepQuality() *100)/100;
  avUserSleepQuality.insertAdjacentHTML("afterBegin", `<p>The average user's sleep quality is</p> <p><span class="number">${averageSleepQuality}</span></p><p>out of 5.</p>`);
  const weekSleepTotal = sleepInfo.calculateWeekTotal(dateString, id, userRepo, 'hoursSlept');
  sleepThisWeek.insertAdjacentHTML('afterBegin', makeSleepHTML(id, sleepInfo, userRepo, weekSleepTotal));
  const weekSleepQuality = sleepInfo.calculateWeekTotal(dateString, id, userRepo, 'sleepQuality');
  sleepEarlierWeek.insertAdjacentHTML('afterBegin', makeSleepHTML(id, sleepInfo, userRepo, weekSleepQuality));
}

function makeSleepHTML(id, sleepInfo, userRepo, relevantData) {
  const sleepHours = relevantData.map(sleepData => `<li class="historical-list-listItem">On ${sleepData} hours</li>`).join('');
  return sleepHours;
}

function addActivityInfo(id, activityInfo, dateString, userRepo, winnerId, user) {
  const userDailyActiveMinutes = activityInfo.getDailyUserData(id, dateString, userRepo, 'minutesActive');
  userMinutesToday.insertAdjacentHTML("afterBegin", `<p>Active Minutes:</p><p>You</p><p><span class="number">${userDailyActiveMinutes}</span></p>`);
  const usersAverage = activityInfo.getAllUsersAverageForDay(dateString, userRepo, 'minutesActive');
  avgMinutesToday.insertAdjacentHTML("afterBegin", `<p>Active Minutes:</p><p>All Users</p><p><span class="number">${usersAverage}</span></p>`);
  createDailyActivityData(id, activityInfo, dateString, userRepo);
  createWeeklyActivityData(id, activityInfo, dateString, userRepo, winnerId, user);
}

function createDailyActivityData(id, activityInfo, dateString, userRepo) {
  const userDailyFlights = activityInfo.getDailyUserData(id, dateString, userRepo, 'flightsOfStairs');
  userStairsToday.insertAdjacentHTML("afterBegin", `<p>Stair Count:</p><p>You</><p><span class="number">${userDailyFlights}</span></p>`);
  const usersAverageDailyFlights = activityInfo.getAllUsersAverageForDay(dateString, userRepo, 'flightsOfStairs');
  avgStairsToday.insertAdjacentHTML("afterBegin", `<p>Stair Count: </p><p>All Users</p><p><span class="number">${usersAverageDailyFlights}</span></p>`);
  const userSteps = activityInfo.getDailyUserData(id, dateString, userRepo, 'numSteps');
  userStepsToday.insertAdjacentHTML("afterBegin", `<p>Step Count:</p><p>You</p><p><span class="number">${userSteps}</span></p>`);
  const usersAverageDailySteps = activityInfo.getAllUsersAverageForDay(dateString, userRepo, 'numSteps');
  avgStepsToday.insertAdjacentHTML("afterBegin", `<p>Step Count:</p><p>All Users</p><p><span class="number">${usersAverageDailyFlights}</span></p>`);
}

function createWeeklyActivityData(id, activityInfo, dateString, userRepo, winnerId, user) {
  const weeklySteps = makeActivityHTML(activityInfo.getWeeklyUserData(id, dateString, userRepo, "numSteps"), "steps");
  userStepsThisWeek.insertAdjacentHTML("afterBegin", weeklySteps);
  const weeklyFlights = makeActivityHTML(activityInfo.getWeeklyUserData(id, dateString, userRepo, "flightsOfStairs"), "flights");
  userStairsThisWeek.insertAdjacentHTML("afterBegin", weeklyFlights);
  const minutesActive = makeActivityHTML(activityInfo.getWeeklyUserData(id, dateString, userRepo, "minutesActive"), "minutes");
  userMinutesThisWeek.insertAdjacentHTML("afterBegin", minutesActive);
  const bestSteps = makeActivityHTML(activityInfo.getWeeklyUserData(winnerId, dateString, userRepo, "numSteps"), 'steps');
  bestUserSteps.insertAdjacentHTML("afterBegin", bestSteps);
}

function makeActivityHTML(relevantData, relevantDataName) {
  return relevantData.map(activityData => `<li class="historical-list-listItem">On ${activityData} ${relevantDataName}</li>`).join('');
}

function addFriendGameInfo(id, activityInfo, userRepo, dateString, laterDateString, user) {
  const challengeWinner = activityInfo.getChallengeListAndWinner(user, dateString, userRepo);
  friendChallengeListToday.insertAdjacentHTML("afterBegin", makeFriendChallengeHTML(id, challengeWinner));
  const stepStreak = activityInfo.getStreakDays(userRepo, id, 'numSteps');
  streakList.insertAdjacentHTML("afterBegin", makeStepStreakHTML(id, stepStreak));
  const minutesStreak = activityInfo.getStreakDays(userRepo, id, 'minutesActive');
  streakListMinutes.insertAdjacentHTML("afterBegin", makeStepStreakHTML(id, minutesStreak));
  const challengeList = activityInfo.getChallengeListAndWinner(user, dateString, userRepo);
  friendChallengeListHistory.insertAdjacentHTML("afterBegin", makeFriendChallengeHTML(id, challengeList));
  const winnerInfo = activityInfo.showcaseWinner(user, dateString, userRepo);
  bigWinner.insertAdjacentHTML('afterBegin', `THIS WEEK'S WINNER! ${winnerInfo} steps`);
}

function makeFriendChallengeHTML(id, relevantData) {
  const friendInfo = relevantData.map(friendChallengeData => `<li class="historical-list-listItem">Your friend ${friendChallengeData} average steps.</li>`).join('');
  return friendInfo
}

function makeStepStreakHTML(id, relevantData) {
  const streakInfo = relevantData.map(streakData => `<li class="historical-list-listItem">${streakData}!</li>`).join('');
  return streakInfo
}
