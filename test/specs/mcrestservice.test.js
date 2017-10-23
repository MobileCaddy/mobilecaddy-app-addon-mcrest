
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

    it('should return non-pre-set oath', function (done) {
      McRestService._setoauth(false);
      McRestService._setUpOauth().then(function(){
        let oauth = McRestService._getoauth();
        expect(oauth.accessToken).toBe("foo");
        expect(oauth.refreshToken).toBe("foo");
        expect(oauth.instanceUrl).toBe("bar");
        done();
      }).catch(function(e){
        console.error(e);
        expect(true).toBe(false);
        done();
      });
    });

    it('should handle an error', function (done) {

      appDataUtilsMock.getCurrentValueFromAppSoup.and.callFake(function(){
        return new Promise(function(resolve, reject) {
          reject("ERROR");
        });
      });

      McRestService._setoauth(false);
      McRestService._setUpOauth().then(function(){
        expect(true).toBe(false);
        done();
      }).catch(function(e){
        console.error(e);
        expect(e).toBe("ERROR");
        done();
      });
    });


  });


});