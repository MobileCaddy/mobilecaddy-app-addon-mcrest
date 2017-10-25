
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


  describe('config', function(){

    beforeEach(inject(function (_McRestService_) {
        McRestService = _McRestService_;
    }));

    it ('should have default version', function(){
      expect(McRestService._getApiVersion()).toBe("v40.0");
    });

    it ('should have default version, no apiVersion supplied', function(){
      McRestService.config({});
      expect(McRestService._getApiVersion()).toBe("v40.0");
    });

    it ('should reject invalid apiVersion - no "v"', function(){
      expect(McRestService.config({apiVersion: "12.22"})).toBe(false);
      expect(McRestService._getApiVersion()).toBe("v40.0");
      expect(loggerMock.error).toHaveBeenCalled();
    });

    it ('should reject invalid apiVersion - alphas', function(){
     expect( McRestService.config({apiVersion: "v1v.22"})).toBe(false);
      expect(McRestService._getApiVersion()).toBe("v40.0");
      expect(loggerMock.error).toHaveBeenCalled();
    });

    it ('should reject invalid apiVersion - too many decimals', function(){
      expect(McRestService.config({apiVersion: "v12.345"})).toBe(false);
      expect(McRestService._getApiVersion()).toBe("v40.0");
      expect(loggerMock.error).toHaveBeenCalled();
    });

    it ('should update for correct apiVersion, 2 decimals', function(){
      expect(McRestService.config({apiVersion: "v12.34"})).toBe(true);
      expect(McRestService._getApiVersion()).toBe("v12.34");
    });

    it ('should update for correct apiVersion, 1 decimal', function(){
      expect(McRestService.config({apiVersion: "v12.0"})).toBe(true);
      expect(McRestService._getApiVersion()).toBe("v12.0");
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