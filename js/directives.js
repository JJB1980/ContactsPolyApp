'use strict';

/* Directives */


angular.module('ContactsApp.directives', []).

directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

/*
directive('myDatePicker', function() {
  return {
        restrict: 'C',
        require: 'ngModel',
         link: function (scope, element, attrs, ngModelCtrl) {
            element.datepicker({
                dateFormat: 'dd/mm/yy',
                onSelect: function (date) {
                    scope.$apply(function () {
                            ngModelCtrl.$setViewValue(date);
                    });
                }
            });
        }
    };
});*/

