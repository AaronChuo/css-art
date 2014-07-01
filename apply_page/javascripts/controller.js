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

  $scope.earlyBird = '';
  $scope.lastRush = 'disabled';

  var calcTime = function() {
    var now = new Date();
    now = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var earlyBirdEndDate = new Date('7/8/2014');
    if(now >= earlyBirdEndDate) {
      $scope.earlyBird = 'disabled';
      $scope.lastRush = '';
    } else {
      $scope.earlyBird = '';
      $scope.lastRush = 'disabled';
    }
  };

  $scope.showModal = 0;

  $scope.modalToggle = function(wrapperClass, headingText) {
    event.preventDefault();
    $scope.wrapperColor = wrapperClass || 'lastRushStyle';
    $scope.amTitle = headingText || '最後卡位票';
    $scope.showModal = ($scope.showModal) ? 0 : 1;
    if($scope.wrapperColor === 'studentStyle') {
      $scope.price = CONST.priceList[0];
    } else if($scope.wrapperColor === 'earlyBirdStyle') {
      $scope.price = CONST.priceList[1];
    } else {
      $scope.price = CONST.priceList[2];
    }
  };

  var deferred = $q.defer();
  var promise = deferred.promise;
  var appId = '329424167209772';

  facebookApi.initFbApi(appId);

  $scope.fbLogin = function() {
    facebookApi.getMe();
  };

  $scope.$watch(facebookApi.getFbData(), function(newValue, oldValue) {
    if(newValue !== oldValue) {
      console.log(facebookApi.getFbData());
    }
  });

}]);