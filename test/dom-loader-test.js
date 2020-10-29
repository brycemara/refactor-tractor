const chai = require('chai');
const expect = chai.expect;

const spies = require('chai-spies');
chai.use(spies);

const domDisplay = require('../src/DOM-loader');

describe.only('domDisplay', function() {

  before( function() {
    global.domDisplay = {};
    chai.spy.on(domDisplay, ['createDailyActivityData', 'createWeeklyActivityData', 'makeActivityHTML'], () => {})
  });

  it('should create daily activity data to insert in HTML', function() {
    domDisplay.createDailyActivityData();

    console.log('domDisplay', domDisplay);

    expect(domDisplay.createDailyActivityData).to.have.been.called(1);

  });

})
