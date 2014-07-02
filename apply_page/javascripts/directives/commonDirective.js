'use strict';
//--------------------------------
// Module: Common Directives
// Directive List:
//  - awesomeModal
//--------------------------------
angular.module('commonDirective', ['commonData'])
.directive('awesomeModal', ['CONST', function(CONST) {

  return {
    restrict: 'EA',
    transclude: true,
    templateUrl: CONST.baseDir + 'awesomeModal.tpl.html',
    link: function($scope, element, attr) {

    }
  };

}]);