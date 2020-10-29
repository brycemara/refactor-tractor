const chai = require('chai');
const expect = chai.expect;

const spies = require('chai-spies');
chai.use(spies);

describe.only('fetchApi', function() {

  before(function() {
    global.fetchApi = {};
    chai.spy.on(fetchApi, ['fetchUserData', 'fetchSleepData', 'fetchHydrationData', 'fetchActivityData', 'fetch', 'postHydrationData', 'postSleepData', 'postActivityData'], () => {})
  });

  it('should be able to fetch user data', function() {
    fetchApi.fetchUserData();

    expect(fetchApi.fetchUserData).to.have.been.called(1);
    expect(fetchApi.fetchUserData).to.have.been.called.with();
  });

  it('should be able to fetch sleep data', function() {
    fetchApi.fetchSleepData();

    expect(fetchApi.fetchSleepData).to.have.been.called(1);
    expect(fetchApi.fetchSleepData).to.have.been.called.with();
  });

  it('should be able to fetch hydration data', function() {
    fetchApi.fetchHydrationData();

    expect(fetchApi.fetchHydrationData).to.have.been.called(1);
    expect(fetchApi.fetchHydrationData).to.have.been.called.with();
  });

  it('should be able to fetch activity data', function() {
    fetchApi.fetchActivityData();

    expect(fetchApi.fetchActivityData).to.have.been.called(1);
    expect(fetchApi.fetchActivityData).to.have.been.called.with();
  });

  it('should be able to post sleep data', function() {
    fetchApi.postSleepData();

    expect(fetchApi.postSleepData).to.have.been.called(1);
    expect(fetchApi.postSleepData).to.have.been.called.with();
  });

  it('should be able to post hydration data', function() {
    fetchApi.postHydrationData();

    expect(fetchApi.postHydrationData).to.have.been.called(1);
    expect(fetchApi.postHydrationData).to.have.been.called.with();
  });

  it('should be able to post activity data', function() {
    fetchApi.postActivityData();

    expect(fetchApi.postActivityData).to.have.been.called(1);
    expect(fetchApi.postActivityData).to.have.been.called.with();
  });
});
