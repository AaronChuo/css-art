'use strict';

angular.module('config', [])
.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('<%{').endSymbol('}%>');
});