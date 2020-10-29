const chai = require('chai');
const expect = chai.expect;

const spies = require('chai-spies');
chai.use(spies);

const domDisplay = require('../src/DOM-loader');

describe.only('domDisplay', function() {
  let relevantData;
  let relevantDataName;
  let id;
  let activityInfo;
  let dateString;
  let userRepo;
  let winnerId;
  let user;

  before(function() {
    global.domDisplay = {};
    chai.spy.on(domDisplay, ['createDailyActivityData', 'createWeeklyActivityData', 'makeActivityHTML'], () => {})
  });

  beforeEach(function() {
    relevantData = '';
    relevantDataName = '';
    id = 1;
    activityInfo = [];
    dateString = '';
    userRepo = [];
    winnerId = 1;
    user = {};
  });

  it('should create daily activity data to insert in HTML', function() {
    domDisplay.createDailyActivityData(id, activityInfo, dateString, userRepo);

    expect(domDisplay.createDailyActivityData).to.have.been.called(1);
    expect(domDisplay.createDailyActivityData).to.have.been.called.with(id, activityInfo, dateString, userRepo);
  });

  it('should create weekly activity data to insert in HTML', function() {
    domDisplay.createWeeklyActivityData(id, activityInfo, dateString, userRepo, winnerId, user);

    expect(domDisplay.createWeeklyActivityData).to.have.been.called(1);
    expect(domDisplay.createWeeklyActivityData).to.have.been.called.with(id, activityInfo, dateString, userRepo, winnerId, user);
  });

  it('should make Activity HTML block', function() {
    domDisplay.makeActivityHTML(relevantData, relevantDataName);

    expect(domDisplay.makeActivityHTML).to.have.been.called(1);
    expect(domDisplay.makeActivityHTML).to.have.been.called.with(relevantData, relevantDataName);
  });
});
