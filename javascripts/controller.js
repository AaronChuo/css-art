'use strict';

angular.module('feaPayment.controllers',['socialNetworkApi'])
.controller('paymentCtrl',['$scope', 'facebookApi', function($scope, facebookApi) {

  //private
  var appId = '329424167209772';
  var personalData = {};

  //payment API
  $scope.creditCardApi = 'http://fea.tw/credit';
  $scope.atmApi = 'http://fea.tw/atm';

  //payment default
  $scope.bankCode = ['TAISHIN', 'HUANAN', 'ESUN', 'FUBON', 'BOT', 'CHINATRUST', 'FIRST'];
  $scope.price =[600, 900, 1200];

  facebookApi.initFbApi(appId);

  $scope.fbLogin = function() {
    personalData = facebookApi.getPerson();
    console.log(personalData);
  };

  $scope.setTicketType = function(type) {
    if(type >= 0 && type < price.length) {
      $scope.priceSelected = price[type];
    }
  };

}])
.directive('awesomeModal', function() {

  return {
    restrict: 'E',
    template: '<h2>good</h2>'
  };

});