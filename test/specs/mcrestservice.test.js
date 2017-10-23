
describe('McRestService Unit Tests', function(){
  beforeEach(module('starter.services'));

  var appDataUtilsMock,
      syncRefreshMock,
      devUtilsMock,
    	loggerMock;


  beforeEach(function() {
    // loggerMock mock - we want to use these in out 'expects'
    loggerMock = jasmine.createSpyObj('logger', ['log', 'error']);
    appDataUtilsMock = jasmine.createSpyObj(['getCurrentValueFromAppSoup']);
    devUtilsMock = jasmine.createSpyObj(['getCachedAppSoupValue']);

    appDataUtilsMock.getCurrentValueFromAppSoup.and.callFake(function(){
      return new Promise(function(resolve, reject) {
        resolve("foo");
      });
    });

    devUtilsMock.getCachedAppSoupValue.and.callFake(function(){
      return new Promise(function(resolve, reject) {
        resolve("bar");
      });
    });


    module(function($provide) {
      $provide.value('appDataUtils', appDataUtilsMock);
      $provide.value('devUtils', devUtilsMock);
      $provide.value('syncRefresh', syncRefreshMock);
      $provide.value('logger', loggerMock);
    });
  });

  describe('setUpOauth', function() {

  beforeEach(inject(function (_McRestService_) {
      McRestService = _McRestService_;
  }));

  	it('should return pre-set oath', function (done) {
			McRestService._setoauth({});
      McRestService._setUpOauth().then(function(){
        done();
      }).catch(function(e){
        console.error(e);
        expect(true).toBe(false);
        done();
      });
		});

    it('should return pre-set oath', function (done) {
      McRestService._setoauth(false);
      McRestService._setUpOauth().then(function(){
        done();
      }).catch(function(e){
        console.error(e);
        expect(true).toBe(false);
        done();
      });
    });


  });


});