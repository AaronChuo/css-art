'use strict';

angular.module('feaPayment',['socialNetworkApi', 'commonDirective', 'commonData'])
.controller('paymentCtrl',['$scope', '$q', '$http', 'facebookApi', 'CONST', function($scope, $q, $http, facebookApi, CONST) {

//-------------------------
// private variable & init
//-------------------------

  var deferred = $q.defer();
  var promise = deferred.promise;
  var appId = '329424167209772';

  facebookApi.initFbApi(appId);

//-------------------------
// public variable
//-------------------------

  //payment API
  $scope.creditCardApi = 'http://fea.tw/credit';
  $scope.atmApi = 'http://fea.tw/atm';

  $scope.bankList = CONST.bankList;

  //form
  $scope.paymentMethod = 'credit';
  $scope.bank = '';
  $scope.name = '';
  $scope.email = '';
  $scope.cellphone = '';
  $scope.vegetarian = 0;
  $scope.price = 1200;
  $scope.fbdata = '';

  //ticket
  $scope.ticketList = CONST.ticketList;
  $scope.modal = {
    wrapperStyle: 'lastrush-ticket',
    amTitle: '最後卡位票',
    show: 0
  };

  //the link of google map on mobile device
  $scope.mapLink = 'https://www.google.com.tw/maps/place/%E4%B8%AD%E5%8E%9F%E5%A4%A7%E5%AD%B8/@24.956901,121.242803,17z/data=!3m1!4b1!4m2!3m1!1s0x3468221447a0f021:0x2b86d2650bb8bcff';

//-------------------------
// private function
//-------------------------

  //get ticket remain
  var getTicketRemain = function() {
    var api = 'http://fea.tw/workshop/';
    var data = {method: 'get_remain'};
    var deferred = $q.defer();

    $http.post(api, data)
    .success(function(data, status, headers, config) {
      deferred.resolve(data);
    })
    .error(function(data, status, headers, config) {
      deferred.reject(status);
    });

    deferred.promise.then(
      function(data) {
        console.log(data);
      },
      function(err) {
        console.log(err);
      }
    );
  };

  //set ticket

  //time calculation
  var calcTime = function() {
    var now = new Date();

    now = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    console.log('今天是 '+now);

    //judge sell time
    for(var i in $scope.ticketList) {
      var ticket = $scope.ticketList[i];
      var startDate = new Date(ticket.date.start);
      var endDate = new Date(ticket.date.end);
      var disableReason = '', formatDate;
      console.log(ticket.name+': '+startDate+' ~ '+endDate);

      //out of sell time
      if(now < startDate) {
        formatDate = (startDate.getMonth()+1) + '/' + (startDate.getDate()+1);
        disableReason = ' ' + formatDate + ' 開放';
      } else if(now >= endDate) {
        formatDate = (startDate.getMonth()+1) + '/' + (startDate.getDate()+1);
        disableReason = '已結束';
      }

      if(disableReason !== '') {
        disableTicket(i, disableReason);
        console.log(ticket.name+disableReason);
      }
    }
  };

  //disable ticket
  var disableTicket = function(ticketIndex, disableReason) {
    var i = ticketIndex, r = disableReason;
    $scope.ticketList[i].disable = 1;
    $scope.ticketList[i].style += ' disabled';
    $scope.ticketList[i].r = ' 《' + r + '》';
  };

  calcTime();
  getTicketRemain();

//-------------------------
// public function
//-------------------------

  //modal toggling
  $scope.modalToggle = function(ticket) {
    //event.preventDefault();

    if(ticket) {
      if(!ticket.disable) {
        $scope.modal.wrapperStyle = ticket.modalStyle;
        $scope.modal.amTitle = ticket.name;
        $scope.price = ticket.price;
        $scope.modal.show = 1;
      } else {
        $scope.modal.show = 0;
      }
    } else {
      $scope.modal.show = 0;
    }
  };

  //facebook login and get api
  $scope.fbLogin = function() {
    facebookApi.getFbData().then(function(data) {
      //console.log('result:' + data);
      $scope.name = data.name;
      $scope.email = data.email;
      $scope.fbdata = JSON.stringify(data);
    },
    function(err) {
      console.log(err);
    });
  };

}]);