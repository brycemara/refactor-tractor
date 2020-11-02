import './css/base.scss';
import './css/style.scss';

import './images/person walking on path.jpg';
import './images/The Rock.jpg';

import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
import UserRepo from './User-repo';

import {fetchApi} from './Fetch-API';
import {domDisplay} from './DOM-loader';

let userList;
let userRepo;
let hydrationRepo;
let sleepRepo;
let activityRepo;

const fetchedUserData = fetchApi.fetchUserData();
const fetchedSleepData = fetchApi.fetchSleepData();
const fetchedHydrationData = fetchApi.fetchHydrationData();
const fetchedActivityData = fetchApi.fetchActivityData();

Promise.all([fetchedUserData, fetchedSleepData, fetchedHydrationData, fetchedActivityData]).then(values => {
  userList = createUsers(values[0]);
  userRepo = new UserRepo(userList);
  sleepRepo = new Sleep(values[1]);
  hydrationRepo = new Hydration(values[2]);
  activityRepo = new Activity(values[3]);
  startApp();
});

document.querySelector('#submit-sleep-info').addEventListener('click', fetchApi.postSleepData);
document.querySelector('#submit-hydration-info').addEventListener('click', fetchApi.postHydrationData);
document.querySelector('#submit-activity-info').addEventListener('click', fetchApi.postActivityData);

function startApp() {
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
  document.querySelectorAll('.historicalWeek').forEach(instance => instance.insertAdjacentHTML('afterBegin', `Week of ${randomHistory}`));
};

function createUsers(userData) {
  return userData.reduce((userList, userInfo) => {
    let user = new User(userInfo);
    userList.push(user);
    return userList;
  }, [])
};

function addInfoToSidebar(user, userRepo) {
  document.getElementById('sidebarUserName').innerText = user.name;
  document.getElementById('headerText').innerText = `${user.getFirstName()}'s Activity Tracker`;
  document.getElementById('userStepGoalCard').innerText = `Your daily step goal is ${user.dailyStepGoal}.`;
  document.getElementById('averageStepsGoalCard').innerText = `The average daily step goal is ${userRepo.calculateAverageStepGoal()}.`;
  document.getElementById('userAddress').innerText = user.address;
  document.getElementById('userEmail').innerText = user.email;
  document.getElementById('userStridelength').innerText = `Your stridelength is ${user.strideLength} meters.`;
  document.getElementById('friendList').insertAdjacentHTML('afterBegin', makeFriendHTML(user, userRepo));
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
  const dailyOunces = hydrationInfo.calculateDailyTotal(id, dateString, 'numOunces');
  document.getElementById('hydrationToday').insertAdjacentHTML('afterBegin', `<p>You drank</p><p><span class="number">${dailyOunces}</span></p><p>oz water today.</p>`);
  const averageOunces = hydrationInfo.calculateAverage(id, 'numOunces');
  document.getElementById('hydrationAverage').insertAdjacentHTML('afterBegin', `<p>Your average water intake is</p><p><span class="number">${averageOunces}</span></p> <p>oz per day.</p>`);
  const firstWeekOunces = hydrationInfo.calculateFirstWeekOunces(userRepo, id);
  document.getElementById('hydrationThisWeek').insertAdjacentHTML('afterBegin', makeHydrationHTML(id, hydrationInfo, userRepo, firstWeekOunces));
  const randomWeekOunces = hydrationInfo.calculateRandomWeekOunces(laterDateString, id, userRepo);
  document.getElementById('hydrationEarlierWeek').insertAdjacentHTML('afterBegin', makeHydrationHTML(id, hydrationInfo, userRepo, randomWeekOunces));
};

function makeHydrationHTML(id, hydrationInfo, userRepo, relevantData) {
  const hydration = relevantData.map(drinkData => `<li class="historical-list-listItem">On ${drinkData}oz</li>`).join('');
  return hydration;
};

function addSleepInfo(id, sleepInfo, dateString, userRepo) {
  const sleepHours = sleepInfo.calculateDailyTotal(id, dateString, 'hoursSlept');
  document.getElementById('sleepToday').insertAdjacentHTML("afterBegin", `<p>You slept</p> <p><span class="number">${sleepHours}</span></p> <p>hours today.</p>`);
  const sleepQuality = sleepInfo.calculateDailyTotal(id, dateString, 'sleepQuality');
  document.getElementById('sleepQualityToday').insertAdjacentHTML("afterBegin", `<p>Your sleep quality was</p> <p><span class="number">${sleepQuality}</span></p><p>out of 5.</p>`);
  const averageSleepQuality = Math.round(sleepInfo.calculateAllUserSleepQuality() *100)/100;
  document.getElementById('avUserSleepQuality').insertAdjacentHTML("afterBegin", `<p>The average user's sleep quality is</p> <p><span class="number">${averageSleepQuality}</span></p><p>out of 5.</p>`);
  const weekSleepTotal = sleepInfo.calculateWeekTotal(dateString, id, userRepo, 'hoursSlept');
  document.getElementById('sleepThisWeek').insertAdjacentHTML('afterBegin', makeSleepHTML(id, sleepInfo, userRepo, weekSleepTotal));
  const weekSleepQuality = sleepInfo.calculateWeekTotal(dateString, id, userRepo, 'sleepQuality');
  document.getElementById('sleepEarlierWeek').insertAdjacentHTML('afterBegin', makeSleepHTML(id, sleepInfo, userRepo, weekSleepQuality));
};

function makeSleepHTML(id, sleepInfo, userRepo, relevantData) {
  const sleepHours = relevantData.map(sleepData => `<li class="historical-list-listItem">On ${sleepData} hours</li>`).join('');
  return sleepHours;
};

function addActivityInfo(id, activityInfo, dateString, userRepo, randomHistory, user, winnerId) {
  const userDailyActiveMinutes = activityInfo.getDailyUserData(id, dateString, userRepo, 'minutesActive');
  document.getElementById('userMinutesToday').insertAdjacentHTML("afterBegin", `<p>Active Minutes:</p><p>You</p><p><span class="number">${userDailyActiveMinutes}</span></p>`);
  const usersAverage = activityInfo.getAllUsersAverageForDay(dateString, userRepo, 'minutesActive');
  document.getElementById('avgMinutesToday').insertAdjacentHTML("afterBegin", `<p>Active Minutes:</p><p>All Users</p><p><span class="number">${usersAverage}</span></p>`);
  const userDailyMiles = activityInfo.getDailyMiles(id, dateString, userRepo);
  document.getElementById('milesToday').insertAdjacentHTML("afterBegin", `<p>Your Daily Miles:</p><p><span class="number">${userDailyMiles}</span></p>`);
  domDisplay.createDailyActivityData(id, activityInfo, dateString, userRepo);
  domDisplay.createWeeklyActivityData(id, activityInfo, dateString, userRepo, randomHistory, user, winnerId);
};

function addFriendGameInfo(id, activityInfo, userRepo, dateString, laterDateString, user) {
  const challengeWinner = activityInfo.getChallengeListAndWinner(user, dateString, userRepo);
  document.getElementById('friendChallengeListToday').insertAdjacentHTML("afterBegin", makeFriendChallengeHTML(id, challengeWinner));
  const stepStreak = activityInfo.getStreakDays(userRepo, id, 'numSteps');
  document.getElementById('streakList').insertAdjacentHTML("afterBegin", makeStepStreakHTML(id, stepStreak));
  const minutesStreak = activityInfo.getStreakDays(userRepo, id, 'minutesActive');
  document.getElementById('streakListMinutes').insertAdjacentHTML("afterBegin", makeStepStreakHTML(id, minutesStreak));
  const challengeList = activityInfo.getChallengeListAndWinner(user, dateString, userRepo);
  document.getElementById('friendChallengeListHistory').insertAdjacentHTML("afterBegin", makeFriendChallengeHTML(id, challengeList));
  const winnerInfo = activityInfo.showcaseWinner(user, dateString, userRepo);
  document.getElementById('bigWinner').insertAdjacentHTML('afterBegin', `THIS WEEK'S WINNER! ${winnerInfo} steps`);
};

function makeFriendChallengeHTML(id, relevantData) {
  const friendInfo = relevantData.map(friendChallengeData => `<li class="historical-list-listItem">Your friend ${friendChallengeData} average steps.</li>`).join('');
  return friendInfo;
};

function makeStepStreakHTML(id, relevantData) {
  const streakInfo = relevantData.map(streakData => `<li class="historical-list-listItem">${streakData}!</li>`).join('');
  return streakInfo;
};
