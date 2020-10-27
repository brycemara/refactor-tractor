import './css/base.scss';
import './css/style.scss';

import './images/person walking on path.jpg';
import './images/The Rock.jpg';

import userData from './data/users';
import hydrationData from './data/hydration';
import sleepData from './data/sleep';
import activityData from './data/activity';

import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
import UserRepo from './User-repo';

let sidebarName = document.getElementById('sidebarUserName');
let stepGoalCard = document.getElementById('userStepGoalCard');
let avStepGoalCard = document.getElementById('averageStepsGoalCard');
let headerText = document.getElementById('headerText');
let userAddress = document.getElementById('userAddress');
let userEmail = document.getElementById('userEmail');
let userStridelength = document.getElementById('userStridelength');
let friendList = document.getElementById('friendList');
let hydrationToday = document.getElementById('hydrationToday');
let hydrationAverage = document.getElementById('hydrationAverage');
let hydrationThisWeek = document.getElementById('hydrationThisWeek');
let hydrationEarlierWeek = document.getElementById('hydrationEarlierWeek');
let historicalWeek = document.querySelectorAll('.historicalWeek');
let sleepToday = document.getElementById('sleepToday');
let sleepQualityToday = document.getElementById('sleepQualityToday');
let avUserSleepQuality = document.getElementById('avUserSleepQuality');
let sleepThisWeek = document.getElementById('sleepThisWeek');
let sleepEarlierWeek = document.getElementById('sleepEarlierWeek');
let friendChallengeListToday = document.getElementById('friendChallengeListToday');
let friendChallengeListHistory = document.getElementById('friendChallengeListHistory');
let bigWinner = document.getElementById('bigWinner');
let userStepsToday = document.getElementById('userStepsToday');
let avgStepsToday = document.getElementById('avgStepsToday');
let userStairsToday = document.getElementById('userStairsToday');
let avgStairsToday = document.getElementById('avgStairsToday');
let userMinutesToday = document.getElementById('userMinutesToday');
let avgMinutesToday = document.getElementById('avgMinutesToday');
let userStepsThisWeek = document.getElementById('userStepsThisWeek');
let userStairsThisWeek = document.getElementById('userStairsThisWeek');
let userMinutesThisWeek = document.getElementById('userMinutesThisWeek');
let bestUserSteps = document.getElementById('bestUserSteps');
let streakList = document.getElementById('streakList');
let streakListMinutes = document.getElementById('streakListMinutes')
let userList = makeUsers();
let userRepo = new UserRepo(userList);
let hydrationRepo = new Hydration(hydrationData);
let sleepRepo = new Sleep(sleepData);
let activityRepo = new Activity(activityData);

window.onload = () => {
  startApp();
};

function startApp() {
  let userNowId = Math.floor(Math.random() * 50);
  let userNow = userRepo.getDataFromID(userNowId);
  let today = userRepo.getToday(userNowId, hydrationRepo.hydrationData);
  let randomHistory = makeRandomDate(userRepo, userNowId, hydrationRepo.hydrationData);
  let winnerNow = activityRepo.getWinnerId(userNow, today, userRepo);
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

function makeUsers() {
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

function makeRandomDate(userRepo, id, dataSet) {
  let sortedArray = userRepo.makeSortedUserArray(id, dataSet);
  return sortedArray[Math.floor(Math.random() * sortedArray.length + 1)].date
};

function addHydrationInfo(id, hydrationInfo, dateString, userRepo, laterDateString) {
  const dailyOunces = hydrationInfo.calculateDailyOunces(id, dateString);
  hydrationToday.insertAdjacentHTML('afterBegin', `<p>You drank</p><p><span class="number">${dailyOunces}</span></p><p>oz water today.</p>`);
  const averageOunces = hydrationInfo.calculateAverageOunces(id);
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

function addSleepInfo(id, sleepInfo, dateString, userRepo, laterDateString) {
  const sleepHours = sleepInfo.calculateDailyTotal(id, dateString, 'hoursSlept');
  sleepToday.insertAdjacentHTML("afterBegin", `<p>You slept</p> <p><span class="number">${sleepHours}</span></p> <p>hours today.</p>`);
  const sleepQuality = sleepInfo.calculateDailyTotal(id, dateString, 'sleepQuality');
  sleepQualityToday.insertAdjacentHTML("afterBegin", `<p>Your sleep quality was</p> <p><span class="number">${sleepQuality}</span></p><p>out of 5.</p>`);
  const averageSleepQuality = Math.round(sleepInfo.calculateAllUserSleepQuality() *100)/100;
  avUserSleepQuality.insertAdjacentHTML("afterBegin", `<p>The average user's sleep quality is</p> <p><span class="number">${averageSleepQuality}</span></p><p>out of 5.</p>`);
  const weekSleepTotal = sleepInfo.calculateWeekTotal(dateString, id, userRepo, 'hoursSlept');
  sleepThisWeek.insertAdjacentHTML('afterBegin', makeSleepHTML(id, sleepInfo, userRepo, weekSleepTotal));
  const weekSleepQuality = sleepInfo.calculateWeekTotal(laterDateString, id, userRepo, 'sleepQuality');
  sleepEarlierWeek.insertAdjacentHTML('afterBegin', makeSleepHTML(id, sleepInfo, userRepo, weekSleepQuality));
}

function makeSleepHTML(id, sleepInfo, userRepo, relevantData) {
  const sleepHours = relevantData.map(sleepData => `<li class="historical-list-listItem">On ${sleepData} hours</li>`).join('');
  return sleepHours;
}

function addActivityInfo(id, activityInfo, dateString, userRepo, winnerId, user) {
  const userDailyActiveMinutes = activityInfo.userDataForToday(id, dateString, userRepo, 'minutesActive');
  userMinutesToday.insertAdjacentHTML("afterBegin", `<p>Active Minutes:</p><p>You</p><p><span class="number">${userDailyActiveMinutes}</span></p>`);
  const usersAverage = activityInfo.getAllUserAverageForDay(dateString, userRepo, 'minutesActive');
  avgMinutesToday.insertAdjacentHTML("afterBegin", `<p>Active Minutes:</p><p>All Users</p><p><span class="number">${usersAverage}</span></p>`);
  createDailyActivityData(id, activityInfo, dateString, userRepo);
  createWeeklyActivityData(id, activityInfo, dateString, userRepo, winnerId, user);
}

function createDailyActivityData(id, activityInfo, dateString, userRepo) {
  const userDailyFlights = activityInfo.userDataForToday(id, dateString, userRepo, 'flightsOfStairs');
  userStairsToday.insertAdjacentHTML("afterBegin", `<p>Stair Count:</p><p>You</><p><span class="number">${userDailyFlights}</span></p>`);
  const usersAverageDailyFlights = activityInfo.getAllUserAverageForDay(dateString, userRepo, 'flightsOfStairs');
  avgStairsToday.insertAdjacentHTML("afterBegin", `<p>Stair Count: </p><p>All Users</p><p><span class="number">${usersAverageDailyFlights}</span></p>`);
  const userSteps = activityInfo.userDataForToday(id, dateString, userRepo, 'numSteps');
  userStepsToday.insertAdjacentHTML("afterBegin", `<p>Step Count:</p><p>You</p><p><span class="number">${userSteps}</span></p>`);
  const usersAverageDailySteps = activityInfo.getAllUserAverageForDay(dateString, userRepo, 'numSteps');
  avgStepsToday.insertAdjacentHTML("afterBegin", `<p>Step Count:</p><p>All Users</p><p><span class="number">${usersAverageDailyFlights}</span></p>`);
}

function createWeeklyActivityData(id, activityInfo, dateString, userRepo, winnerId, user) {
  const weeklySteps = createActivityHTML(activityInfo.userDataForWeek(id, dateString, userRepo, "numSteps"), "steps");
  userStepsThisWeek.insertAdjacentHTML("afterBegin", weeklySteps);
  const weeklyFlights = createActivityHTML(activityInfo.userDataForWeek(id, dateString, userRepo, "flightsOfStairs"), "flights");
  userStairsThisWeek.insertAdjacentHTML("afterBegin", weeklyFlights);
  const minutesActive = createActivityHTML(activityInfo.userDataForWeek(id, dateString, userRepo, "minutesActive"), "minutes");
  userMinutesThisWeek.insertAdjacentHTML("afterBegin", minutesActive);
  const bestSteps = createActivityHTML(activityInfo.userDataForWeek(winnerId, dateString, userRepo, "numSteps"), 'steps');
  bestUserSteps.insertAdjacentHTML("afterBegin", bestSteps);
}

function createActivityHTML(relevantData, relevantDataName) {
  return relevantData.map(activityData => `<li class="historical-list-listItem">On ${activityData} ${relevantDataName}</li>`).join('');
}

function addFriendGameInfo(id, activityInfo, userRepo, dateString, laterDateString, user) {
  const challengeWinner = activityInfo.showChallengeListAndWinner(user, dateString, userRepo);
  friendChallengeListToday.insertAdjacentHTML("afterBegin", makeFriendChallengeHTML(id, challengeWinner));
  const stepStreak = activityInfo.getStreak(userRepo, id, 'numSteps');
  streakList.insertAdjacentHTML("afterBegin", makeStepStreakHTML(id, stepStreak));
  const minutesStreak = activityInfo.getStreak(userRepo, id, 'minutesActive');
  streakListMinutes.insertAdjacentHTML("afterBegin", makeStepStreakHTML(id, minutesStreak));
  const challengeList = activityInfo.showChallengeListAndWinner(user, dateString, userRepo);
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
