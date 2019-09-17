(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.angularCreditCards = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(_dereq_,module,exports){
exports = module.exports = ap;
function ap (args, fn) {
    return function () {
        var rest = [].slice.call(arguments)
            , first = args.slice()
        first.push.apply(first, rest)
        return fn.apply(this, first);
    };
}

exports.pa = pa;
function pa (args, fn) {
    return function () {
        var rest = [].slice.call(arguments)
        rest.push.apply(rest, args)
        return fn.apply(this, rest);
    };
}

exports.apa = apa;
function apa (left, right, fn) {
    return function () {
        return fn.apply(this,
            left.concat.apply(left, arguments).concat(right)
        );
    };
}

exports.partial = partial;
function partial (fn) {
    var args = [].slice.call(arguments, 1);
    return ap(args, fn);
}

exports.partialRight = partialRight;
function partialRight (fn) {
    var args = [].slice.call(arguments, 1);
    return pa(args, fn);
}

exports.curry = curry;
function curry (fn) {
    return partial(partial, fn);
}

exports.curryRight = function curryRight (fn) {
    return partial(partialRight, fn);
}

},{}],2:[function(_dereq_,module,exports){
'use strict';

function find(array, predicate, context) {
  if (typeof Array.prototype.find === 'function') {
    return array.find(predicate, context);
  }

  context = context || this;
  var length = array.length;
  var i;

  if (typeof predicate !== 'function') {
    throw new TypeError(predicate + ' is not a function');
  }

  for (i = 0; i < length; i++) {
    if (predicate.call(context, array[i], i, array)) {
      return array[i];
    }
  }
}

module.exports = find;

},{}],3:[function(_dereq_,module,exports){
'use strict'

var isArray = _dereq_('isarray')

module.exports = function castArray (value) {
  return isArray(value) ? value : [value]
}

},{"isarray":32}],4:[function(_dereq_,module,exports){
'use strict'

module.exports = _dereq_('./types')

},{"./types":12}],5:[function(_dereq_,module,exports){
'use strict'

var assign = _dereq_('xtend/mutable')

module.exports = CardType

function CardType (data) {
  if (!(this instanceof CardType)) return new CardType(data)
  assign(this, data)
}

CardType.prototype.digits = 16
CardType.prototype.cvcLength = 3
CardType.prototype.luhn = true
CardType.prototype.groupPattern = /(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?/

CardType.prototype.group = function (number) {
  return (number.match(this.groupPattern) || [])
    .slice(1)
    .filter(Boolean)
}

CardType.prototype.test = function (number, eager) {
  return this[eager ? 'eagerPattern' : 'pattern'].test(number)
}

},{"xtend/mutable":36}],6:[function(_dereq_,module,exports){
'use strict'

var Type = _dereq_('../type')

module.exports = Type({
  name: 'American Express',
  digits: 15,
  pattern: /^3[47]\d{13}$/,
  eagerPattern: /^3[47]/,
  groupPattern: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
  cvcLength: 4
})

},{"../type":5}],7:[function(_dereq_,module,exports){
'use strict'

var Type = _dereq_('../type')

module.exports = Type({
  name: 'Dankort',
  pattern: /^5019\d{12}$/,
  eagerPattern: /^5019/
})

},{"../type":5}],8:[function(_dereq_,module,exports){
'use strict'

var Type = _dereq_('../type')

module.exports = Type({
  name: 'Diners Club',
  digits: 14,
  pattern: /^3(0[0-5]|[68]\d)\d{11}$/,
  eagerPattern: /^3(0|[68])/,
  groupPattern: /(\d{1,4})?(\d{1,6})?(\d{1,4})?/
})

},{"../type":5}],9:[function(_dereq_,module,exports){
'use strict'

var Type = _dereq_('../type')

module.exports = Type({
  name: 'Discover',
  pattern: /^6(011(0[0-9]|[2-4]\d|74|7[7-9]|8[6-9]|9[0-9])|4[4-9]\d{3}|5\d{4})\d{10}$/,
  eagerPattern: /^6(011(0[0-9]|[2-4]|74|7[7-9]|8[6-9]|9[0-9])|4[4-9]|5)/
})

},{"../type":5}],10:[function(_dereq_,module,exports){
'use strict'

var Type = _dereq_('../type')

module.exports = Type({
  name: 'Elo',
  pattern: /^(4[035]|5[0]|6[235])(6[7263]|9[90]|1[2416]|7[736]|8[9]|0[04579]|5[0])([0-9])([0-9])\d{10}$/,
  eagerPattern: /^(4[035]|5[0]|6[235])(6[7263]|9[90]|1[2416]|7[736]|8[9]|0[04579]|5[0])([0-9])([0-9])/,
  groupPattern: /(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?(\d{1,3})?/
})

},{"../type":5}],11:[function(_dereq_,module,exports){
'use strict'

var Type = _dereq_('../type')

module.exports = Type({
  name: 'Forbrugsforeningen',
  pattern: /^600722\d{10}$/,
  eagerPattern: /^600/
})

},{"../type":5}],12:[function(_dereq_,module,exports){
'use strict'

module.exports = [
  _dereq_('./visa'),
  _dereq_('./maestro'),
  _dereq_('./forbrugsforeningen'),
  _dereq_('./dankort'),
  _dereq_('./mastercard'),
  _dereq_('./american-express'),
  _dereq_('./diners-club'),
  _dereq_('./discover'),
  _dereq_('./jcb'),
  _dereq_('./unionpay'),
  _dereq_('./troy'),
  _dereq_('./elo'),
  _dereq_('./uatp')
]

},{"./american-express":6,"./dankort":7,"./diners-club":8,"./discover":9,"./elo":10,"./forbrugsforeningen":11,"./jcb":13,"./maestro":14,"./mastercard":15,"./troy":16,"./uatp":17,"./unionpay":18,"./visa":19}],13:[function(_dereq_,module,exports){
'use strict'

var Type = _dereq_('../type')

module.exports = Type({
  name: 'JCB',
  pattern: /^35\d{14}$/,
  eagerPattern: /^35/
})

},{"../type":5}],14:[function(_dereq_,module,exports){
'use strict'

var Type = _dereq_('../type')

module.exports = Type({
  name: 'Maestro',
  digits: [12, 19],
  pattern: /^(?:5[06789]\d\d|(?!6011[0234])(?!60117[4789])(?!60118[6789])(?!60119)(?!64[456789])(?!65)6\d{3})\d{8,15}$/,
  eagerPattern: /^(5(018|0[23]|[68])|6[37]|60111|60115|60117([56]|7[56])|60118[0-5]|64[0-3]|66)/,
  groupPattern: /(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?(\d{1,3})?/
})

},{"../type":5}],15:[function(_dereq_,module,exports){
'use strict'

var Type = _dereq_('../type')

module.exports = Type({
  name: 'Mastercard',
  pattern: /^(5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)\d{12}$/,
  eagerPattern: /^(2[3-7]|22[2-9]|5[1-5])/
})

},{"../type":5}],16:[function(_dereq_,module,exports){
'use strict'

var Type = _dereq_('../type')

module.exports = Type({
  name: 'Troy',
  pattern: /^9792\d{12}$/,
  eagerPattern: /^9792/
})

},{"../type":5}],17:[function(_dereq_,module,exports){
'use strict'

var Type = _dereq_('../type')

module.exports = Type({
  name: 'UATP',
  digits: 15,
  pattern: /^1\d{14}$/,
  eagerPattern: /^1/,
  groupPattern: /(\d{1,4})(\d{1,5})?(\d{1,6})?/
})

},{"../type":5}],18:[function(_dereq_,module,exports){
'use strict'

var Type = _dereq_('../type')

module.exports = Type({
  name: 'UnionPay',
  pattern: /^62[0-5]\d{13,16}$/,
  eagerPattern: /^62/,
  groupPattern: /(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?(\d{1,3})?/,
  luhn: false
})

},{"../type":5}],19:[function(_dereq_,module,exports){
'use strict'

var Type = _dereq_('../type')

module.exports = Type({
  name: 'Visa',
  digits: [13, 19],
  pattern: /^4\d{12}(\d{3}|\d{6})?$/,
  eagerPattern: /^4/,
  groupPattern: /(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?(\d{1,3})?/
})

},{"../type":5}],20:[function(_dereq_,module,exports){
'use strict'

var luhn = _dereq_('fast-luhn')
var Types = _dereq_('./types')

module.exports = Card

function Card (data) {
  var types = Types(data)

  return {
    types: data,
    parse: parseCard,
    format: formatCard,
    type: cardType,
    luhn: luhn,
    isValid: isCardValid
  }

  function parseCard (number) {
    if (typeof number !== 'string') return ''
    return number.replace(/[^\d]/g, '')
  }

  function formatCard (number, separator) {
    var type = getType(number, true)
    if (!type) return number
    return type.group(number).join(separator || ' ')
  }

  function cardType (number, eager) {
    var type = getType(number, eager)
    return type ? type.name : undefined
  }

  function isCardValid (number, type) {
    if (type) {
      type = types.get(type)
    } else {
      type = getType(number)
    }
    if (!type) return false
    return (!type.luhn || luhn(number)) && type.test(number)
  }

  function getType (number, eager) {
    return types.find(function (type) {
      return type.test(number, eager)
    })
  }
}

},{"./types":24,"fast-luhn":26}],21:[function(_dereq_,module,exports){
'use strict'

var Types = _dereq_('./types')
var cvcRegex = /^\d{3,4}$/

module.exports = Cvc

function Cvc (data) {
  var types = Types(data)

  return {
    isValid: cvcIsValid
  }

  function cvcIsValid (cvc, type) {
    if (typeof cvc !== 'string') return false
    if (!cvcRegex.test(cvc)) return false

    if (!type) {
      return types.some(function (type) {
        return type.cvcLength === cvc.length
      })
    }

    return types.get(type).cvcLength === cvc.length
  }
}

},{"./types":24}],22:[function(_dereq_,module,exports){
'use strict'

var isValidMonth = _dereq_('is-valid-month')
var parseIntStrict = _dereq_('parse-int')
var parseYear = _dereq_('parse-year')

module.exports = {
  isPast: isPast,
  month: {
    parse: parseMonth,
    isValid: isValidMonth
  },
  year: {
    parse: parseYear,
    format: formatExpYear,
    isValid: isExpYearValid,
    isPast: isExpYearPast
  }
}

function isPast (month, year) {
  return Date.now() >= new Date(year, month)
}

function parseMonth (month) {
  return parseIntStrict(month)
}

function formatExpYear (year, strip) {
  year = year.toString()
  return strip ? year.substr(2, 4) : year
}

function isExpYearValid (year) {
  if (typeof year !== 'number') return false
  year = parseIntStrict(year)
  return year > 0
}

function isExpYearPast (year) {
  return new Date().getFullYear() > year
}

},{"is-valid-month":31,"parse-int":34,"parse-year":35}],23:[function(_dereq_,module,exports){
'use strict'

var types = _dereq_('creditcards-types')
var Card = _dereq_('./card')
var Cvc = _dereq_('./cvc')
var expiration = _dereq_('./expiration')

module.exports = withTypes(types)
module.exports.withTypes = withTypes

function withTypes (types) {
  return {
    card: Card(types),
    cvc: Cvc(types),
    expiration: expiration
  }
}

},{"./card":20,"./cvc":21,"./expiration":22,"creditcards-types":4}],24:[function(_dereq_,module,exports){
'use strict'

var find = _dereq_('array-find')
var defaults = _dereq_('creditcards-types')

module.exports = CardTypes
module.exports.defaults = defaults

function CardTypes (types) {
  var map = types.reduce(function (acc, type) {
    acc[type.name] = type
    return acc
  }, {})

  return {
    find: find.bind(null, types),
    some: types.some.bind(types),
    get: get
  }

  function get (name) {
    var type = map[name]

    if (!type) {
      throw new Error('No type found for name: ' + name)
    }

    return type
  }
}

},{"array-find":2,"creditcards-types":4}],25:[function(_dereq_,module,exports){
'use strict'

var zeroFill = _dereq_('zero-fill')
var parseIntStrict = _dereq_('parse-int')

var pad = zeroFill(2)

module.exports = function expandYear (year, now) {
  now = now || new Date()
  var base = now.getFullYear().toString().substr(0, 2)
  year = parseIntStrict(year)
  return parseIntStrict(base + pad(year))
}

},{"parse-int":34,"zero-fill":37}],26:[function(_dereq_,module,exports){
'use strict'

module.exports = (function (array) {
  return function luhn (number) {
    if (typeof number !== 'string') throw new TypeError('Expected string input')
    if (!number) return false
    var length = number.length
    var bit = 1
    var sum = 0
    var value

    while (length) {
      value = parseInt(number.charAt(--length), 10)
      bit ^= 1
      sum += bit ? array[value] : value
    }

    return sum % 10 === 0
  }
}([0, 2, 4, 6, 8, 1, 3, 5, 7, 9]))

},{}],27:[function(_dereq_,module,exports){
'use strict';

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

},{}],28:[function(_dereq_,module,exports){
'use strict';

var implementation = _dereq_('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":27}],29:[function(_dereq_,module,exports){
'use strict';
var numberIsNan = _dereq_('number-is-nan');

module.exports = Number.isFinite || function (val) {
	return !(typeof val !== 'number' || numberIsNan(val) || val === Infinity || val === -Infinity);
};

},{"number-is-nan":33}],30:[function(_dereq_,module,exports){
// https://github.com/paulmillr/es6-shim
// http://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.isinteger
var isFinite = _dereq_("is-finite");
module.exports = Number.isInteger || function(val) {
  return typeof val === "number" &&
    isFinite(val) &&
    Math.floor(val) === val;
};

},{"is-finite":29}],31:[function(_dereq_,module,exports){
'use strict'

var isInteger = _dereq_('is-integer')

module.exports = function isValidMonth (month) {
  if (typeof month !== 'number' || !isInteger(month)) return false
  return month >= 1 && month <= 12
}

},{"is-integer":30}],32:[function(_dereq_,module,exports){
module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

},{}],33:[function(_dereq_,module,exports){
'use strict';
module.exports = Number.isNaN || function (x) {
	return x !== x;
};

},{}],34:[function(_dereq_,module,exports){
'use strict'

var isInteger = _dereq_('is-integer')
var isIntegerRegex = /^-?\d+$/

module.exports = function parseIntStrict (integer) {
  if (typeof integer === 'number') {
    return isInteger(integer) ? integer : undefined
  }
  if (typeof integer === 'string') {
    return isIntegerRegex.test(integer) ? parseInt(integer, 10) : undefined
  }
}

},{"is-integer":30}],35:[function(_dereq_,module,exports){
'use strict'

var parseIntStrict = _dereq_('parse-int')
var expandYear = _dereq_('expand-year')

module.exports = function parseYear (year, expand, now) {
  year = parseIntStrict(year)
  if (year == null) return
  if (!expand) return year
  return expandYear(year, now)
}

},{"expand-year":25,"parse-int":34}],36:[function(_dereq_,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],37:[function(_dereq_,module,exports){
/**
 * Given a number, return a zero-filled string.
 * From http://stackoverflow.com/questions/1267283/
 * @param  {number} width
 * @param  {number} number
 * @return {string}
 */
module.exports = function zeroFill (width, number, pad) {
  if (number === undefined) {
    return function (number, pad) {
      return zeroFill(width, number, pad)
    }
  }
  if (pad === undefined) pad = '0'
  width -= number.toString().length
  if (width > 0) return new Array(width + (/\./.test(number) ? 2 : 1)).join(pad) + number
  return number + ''
}

},{}],38:[function(_dereq_,module,exports){
'use strict'

var cvc = _dereq_('creditcards').cvc
var bind = _dereq_('function-bind')

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

},{"creditcards":23,"function-bind":28}],39:[function(_dereq_,module,exports){
'use strict'

var expiration = _dereq_('creditcards').expiration
var month = expiration.month
var year = expiration.year
var ap = _dereq_('ap')

exports = module.exports = function ccExp () {
  return {
    restrict: 'AE',
    require: 'ccExp',
    controller: CcExpController,
    link: function (scope, element, attributes, ccExp) {
      ccExp.$watch()
    }
  }
}

CcExpController.$inject = ['$scope', '$element']
function CcExpController ($scope, $element) {
  var nullFormCtrl = {
    $setValidity: noop
  }
  var parentForm = $element.inheritedData('$formController') || nullFormCtrl
  var ngModel = {
    year: {},
    month: {}
  }

  this.setMonth = function (monthCtrl) {
    ngModel.month = monthCtrl
  }
  this.setYear = function (yearCtrl) {
    ngModel.year = yearCtrl
  }

  function setValidity (exp) {
    var expMonth = exp.month
    var expYear = exp.year
    var valid = (expMonth == null && expYear == null) || (!!expMonth && !!expYear && !expiration.isPast(expMonth, expYear))
    parentForm.$setValidity('ccExp', valid, $element)
  }

  this.$watch = function $watchExp () {
    $scope.$watch(function watchExp () {
      return {
        month: ngModel.month.$modelValue,
        year: ngModel.year.$modelValue
      }
    }, setValidity, true)
  }
}

var nullCcExp = {
  setMonth: noop,
  setYear: noop
}

exports.month = function ccExpMonth () {
  return {
    restrict: 'A',
    require: ['ngModel', '^?ccExp'],
    compile: function (element, attributes) {
      attributes.$set('maxlength', 2)
      attributes.$set('pattern', '[0-9]*')
      attributes.$set('xAutocompletetype', 'cc-exp-month')

      return function (scope, element, attributes, controllers) {
        var ngModel = controllers[0]
        var ccExp = controllers[1] || nullCcExp

        ccExp.setMonth(ngModel)
        ngModel.$parsers.unshift(month.parse)
        ngModel.$validators.ccExpMonth = function validateExpMonth (value) {
          return ngModel.$isEmpty(ngModel.$viewValue) || month.isValid(value)
        }
      }
    }
  }
}

exports.year = function ccExpYear () {
  return {
    restrict: 'A',
    require: ['ngModel', '^?ccExp'],
    compile: function (element, attributes) {
      var fullYear = attributes.fullYear !== undefined

      attributes.$set('maxlength', fullYear ? 4 : 2)
      attributes.$set('pattern', '[0-9]*')
      attributes.$set('xAutocompletetype', 'cc-exp-year')

      return function (scope, element, attributes, controllers) {
        var ngModel = controllers[0]
        var ccExp = controllers[1] || nullCcExp

        ccExp.setYear(ngModel)

        ngModel.$parsers.unshift(ap.partialRight(year.parse, !fullYear))

        ngModel.$formatters.unshift(function formatExpYear (value) {
          return value ? year.format(value, !fullYear) : ''
        })

        ngModel.$validators.ccExpYear = function validateExpYear (value) {
          return ngModel.$isEmpty(ngModel.$viewValue) || (year.isValid(value) && !year.isPast(value))
        }
      }
    }
  }
}

function noop () {}

},{"ap":1,"creditcards":23}],40:[function(_dereq_,module,exports){
'use strict'

var card = _dereq_('creditcards').card
var array = _dereq_('cast-array')
var partial = _dereq_('ap').partial

module.exports = factory

factory.$inject = ['$parse', '$timeout']
function factory ($parse, $timeout) {
  return {
    restrict: 'A',
    require: ['ngModel', 'ccNumber'],
    controller: function () {
      this.type = null
      this.eagerType = null
    },
    compile: function ($element, $attributes) {
      $attributes.$set('pattern', '[0-9]*')
      $attributes.$set('xAutocompletetype', 'cc-number')

      return function ($scope, $element, $attributes, controllers) {
        var ngModel = controllers[0]
        var ccNumber = controllers[1]

        $scope.$watch($attributes.ngModel, function (number) {
          ngModel.$ccType = ccNumber.type = card.type(number)
        })

        function $viewValue () {
          return ngModel.$viewValue
        }

        function setCursorPostion (element, position) {
          $timeout(function () {
            if (element.setSelectionRange) {
              element.setSelectionRange(position, position)
            } else if (element.createTextRange) {
              var range = element.createTextRange()
              range.move('character', position)
              range.select()
            }
          }, 0)
        }

        if ($attributes.ccEagerType != null) {
          $scope.$watch($viewValue, function eagerTypeCheck (number) {
            number = card.parse(number)
            ngModel.$ccEagerType = ccNumber.eagerType = card.type(number, true)
          })
        }

        if ($attributes.ccType) {
          $scope.$watch($attributes.ccType, function () {
            ngModel.$validate()
          })
        }

        if ($attributes.ccFormat != null) {
          ngModel.$formatters.unshift(card.format)
          $element.on('input', function formatInput () {
            var input = $element.val()
            if (!input) return
            var element = $element[0]
            var formatted = card.format(card.parse(input))

            var selectionEnd = element.selectionEnd
            ngModel.$setViewValue(formatted)
            ngModel.$render()

            if (selectionEnd === input.length && input.length < formatted.length) {
              selectionEnd = formatted.length
            }
            setCursorPostion(element, selectionEnd)
          })
        }

        ngModel.$parsers.unshift(card.parse)

        ngModel.$validators.ccNumber = function validateCcNumber (number) {
          return ngModel.$isEmpty(ngModel.$viewValue) || card.isValid(number)
        }

        ngModel.$validators.ccNumberType = function validateCcNumberType (number) {
          if (ngModel.$isEmpty(ngModel.$viewValue)) return true
          var type = $parse($attributes.ccType)($scope)
          if (!type) card.isValid(number)
          return array(type).some(partial(card.isValid, number))
        }
      }
    }
  }
}

},{"ap":1,"cast-array":3,"creditcards":23}],41:[function(_dereq_,module,exports){
(function (global){
'use strict'

var angular = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null)
var creditcards = _dereq_('creditcards')
var number = _dereq_('./number')
var cvc = _dereq_('./cvc')
var expiration = _dereq_('./expiration')

module.exports = angular
  .module('credit-cards', [])
  .value('creditcards', creditcards)
  .directive('ccNumber', number)
  .directive('ccExp', expiration)
  .directive('ccExpMonth', expiration.month)
  .directive('ccExpYear', expiration.year)
  .directive('ccCvc', cvc)
  .name

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./cvc":38,"./expiration":39,"./number":40,"creditcards":23}]},{},[41])(41)
});