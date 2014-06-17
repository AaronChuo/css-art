'use strict';

angular.module('feaPayment.controllers',[]).controller('paymentCtrl',['$scope', '$http', function($scope, $http) {

  //payment API
  $scope.creditCardApi = 'http://fea.tw/credit';
  $scope.atmApi = 'http://fea.tw/atm';

  //payment data
  $scope.priceSelected = 2;
  $scope.bankSelected = 5;

  var bankCode = ['TAISHIN', 'HUANAN', 'ESUN', 'FUBON', 'BOT', 'CHINATRUST', 'FIRST'];
  var price =[600, 900, 1200];

  $scope.setTicketType = function(type) {
    $scope.priceSelected = type || 2;
  };

  $scope.setPaymentType = function(type) {
    $scope.bankSelected = type || 5;
  };

  $scope.toPay = function() {
    $scope
  };

}]);