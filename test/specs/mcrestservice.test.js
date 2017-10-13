
describe('McRestService Unit Tests', function(){
  beforeEach(module('starter.services'));

  inject(function (_McRestService_) {
      McRestService = _McRestService_;
  });

	it('should pass', function () {
		expect(1).toBe(1);
	});

});