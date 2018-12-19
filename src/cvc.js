'use strict'

var cvc = require('creditcards').cvc
var bind = require('function-bind')

module.exports = factory

factory.$inject = []
function factory () {
  return {
    restrict: 'A',
    require: 'ngModel',
    compile: function (element, attributes) {
      attributes.$set('maxlength', 4)
      attributes.$set('pattern', '[0-9]*')
      attributes.$set('xAutocompletetype', 'cc-csc')

      return function (scope, element, attributes, ngModel) {
        scope.cc_type = false
        ngModel.$validators.ccCvc = function (value) {
          return ngModel.$isEmpty(ngModel.$viewValue) || cvc.isValid(value, scope.cc_type)
        }

        scope.$watch(attributes.ccType, function (ccType) {
          scope.cc_type = ccType
          ccType = ccType ? ccType.replace(/\s/, '').toLowerCase() : false
          attributes.$set('maxlength', !ccType || ccType === 'americanexpress' ? 4 : 3)
          bind.call(ngModel.$validate, ngModel)()
        })
      }
    }
  }
}
