describe('FeaPaymentController', function() {

  beforeEach(module('feaPayment.controller'));

  it('should initial facebook API', inject(function($controller) {
    var scope = {},
        ctrl = $controller('feaPayment.controller', {$scope: scope});

    expect().toBe();
  }));

})