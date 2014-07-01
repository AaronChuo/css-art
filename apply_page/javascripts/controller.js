'use strict';

angular.module('feaPayment',['socialNetworkApi', 'commonDirective', 'commonData'])
.controller('paymentCtrl',['$scope', '$q', 'facebookApi', 'CONST', function($scope, $q, facebookApi, CONST) {

  //payment API
  $scope.creditCardApi = 'http://fea.tw/credit';
  $scope.atmApi = 'http://fea.tw/atm';

  $scope.bankList = CONST.bankList;

  $scope.paymentMethod = 'credit';
  $scope.bank = '';
  $scope.name = '';
  $scope.email = '';
  $scope.cellphone = '';
  $scope.vegetarian = 0;

  $scope.showModal = 0;

  $scope.modalToggle = function(wrapperClass, headingText) {
    event.preventDefault();
    $scope.wrapperColor = wrapperClass || 'lastRushStyle';
    $scope.amTitle = headingText || '最後卡位票';
    $scope.showModal = ($scope.showModal) ? 0 : 1;
  };

  var deferred = $q.defer();
  var promise = deferred.promise;
  var appId = '329424167209772';

  facebookApi.initFbApi(appId);

  $scope.fbLogin = function() {
    facebookApi.getMe();
  };

  $scope.setTicketType = function(type) {
    if(type >= 0 && type < price.length) {
      $scope.priceSelected = price[type];
    }
  };

  $scope.$watch(facebookApi.getFbData(), function(newValue, oldValue) {
    if(newValue !== oldValue) {
      console.log(facebookApi.getFbData());
    }
  });

}]);