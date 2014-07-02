'use strict';
//--------------------------------
// Module: Common Data
// Service: CONST variables
//--------------------------------
angular.module('commonData', [])
.service('CONST', function() {

  return {

    //bank list
    bankList : [
      {code: 'TAISHIN', name: '台新銀行'},
      {code: 'HUANAN', name: '華南銀行'},
      {code: 'ESUN', name: '玉山銀行'},
      {code: 'FUBON', name: '富邦銀行'},
      {code: 'BOT', name: '臺灣銀行'},
      {code: 'CHINATRUST', name: '中國信託'},
      {code: 'FIRST', name: '第一銀行'}
    ],

    //ticket list
    ticketList : [
      {name: '學生限定票', style: 'for-student', modalStyle: 'student-ticket', price: 'NT$ 600', date: {start: '7/2/2014', end: '7/24/2014'}},
      {name: '早鳥搶先票', style: 'for-earlybird', modalStyle: 'earlybird-ticket', price: 'NT$ 900', date: {start: '7/2/2014', end: '7/10/2014'}},
      {name: '最後卡位票', style: 'for-almost', modalStyle: 'lastrush-ticket', price: 'NT$ 1200', date: {start: '7/11/2014', end: '7/24/2014'}}
    ],

    //template path
    baseDir : 'javascripts/directives/'
  };

});