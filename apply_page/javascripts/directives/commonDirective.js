'use strict';
//--------------------------------
// Module: Common Directives
// Directive List:
//  - awesomeModal
//--------------------------------
angular.module('commonDirective', [])
.directive('awesomeModal', function() {

  var BASE_DIR = 'javascripts/directives/';

  return {
    restrict: 'EA',
    templateUrl: BASE_DIR + 'awesomeModal.tpl.html',
    link: function(scope, element, attr) {

      //attributes binding
      scope.title = attr.title;
      scope.show = attr.show;

      console.log(attr);
      console.log(element);
    }
  };

});