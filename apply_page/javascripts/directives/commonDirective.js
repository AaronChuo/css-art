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

      // attributes binding
      // type: default | alert | confirm | media
      $scope.amType = attr.type || 'default';
      // title: heading text
      $scope.amTitle = attr.title;
      // show: display or not
      $scope.amShow = attr.show;

    }
  };

}]);