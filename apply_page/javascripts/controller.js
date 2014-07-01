'use strict';

angular.module('feaPayment',['socialNetworkApi', 'commonDirective', 'commonData'])
.controller('paymentCtrl',['$scope', '$http', 'facebookApi', 'CONST', function($scope, $http, facebookApi, CONST) {

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

  $scope.paymentSubmit = function() {

  };

}]);