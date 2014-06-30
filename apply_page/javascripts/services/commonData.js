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

    //price list
    priceList : [600, 900, 1200],

    //template path
    baseDir : 'javascripts/directives/'
  };

});