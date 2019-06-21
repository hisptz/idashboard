"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throwError = throwError;
exports.curry = curry;
exports.addLockedProperty = addLockedProperty;
exports.copyOwnProperties = copyOwnProperties;
exports.pick = pick;
exports.updateAPIUrlWithBaseUrlVersionNumber = updateAPIUrlWithBaseUrlVersionNumber;
exports.customEncodeURIComponent = customEncodeURIComponent;
exports.identity = identity;
exports.Deferred = exports.pickOr = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @module lib/utils
 */
function throwError(message) {
  throw new Error(message);
} // TODO: Throw an error when `toCurry` is not a function


function curry(toCurry, parameter) {
  return function curried() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return toCurry.apply(this, [parameter].concat(args));
  };
}

function addLockedProperty(object, name, value) {
  var propertyDescriptor = {
    enumerable: true,
    configurable: false,
    writable: false,
    value: value
  };
  Object.defineProperty(object, name, propertyDescriptor);
}

function copyOwnProperties(to, from) {
  Object.keys(from).filter(function (key) {
    return from.hasOwnProperty(key);
  }).forEach(function (key) {
    to[key] = from[key]; // eslint-disable-line no-param-reassign
  });
  return to;
}
/**
 * Curried get function to pick a property from an object
 * Will safely pick a property from an object and guards against the infamous "can not read property of undefined".
 *
 * @param {String} propertyPath
 * @param {Any} defaultValue A default value to be returned when no value was found at the path
 * @returns Function
 *
 * get :: String -> Object -> Any
 */


function pick(propertyPath) {
  var propertiesToGet = propertyPath.split('.');
  return function (item) {
    return propertiesToGet.reduce(function (result, property) {
      if (result) {
        return result[property];
      }

      return undefined;
    }, item);
  };
}

var pickOr = function pickOr(pathProperty, defaultValue) {
  return function (item) {
    var pathResult = pick(pathProperty)(item);
    return pathResult !== undefined ? pathResult : defaultValue;
  };
};

exports.pickOr = pickOr;

var Deferred =
/*#__PURE__*/
function () {
  function Deferred() {
    var _this = this;

    _classCallCheck(this, Deferred);

    this.promise = new Promise(function (resolve, reject) {
      _this.resolve = resolve;
      _this.reject = reject;
    });
  }

  _createClass(Deferred, null, [{
    key: "create",
    value: function create() {
      return new Deferred();
    }
  }]);

  return Deferred;
}();

exports.Deferred = Deferred;

function updateAPIUrlWithBaseUrlVersionNumber(apiUrl, baseUrl) {
  if (!baseUrl || !apiUrl) {
    return apiUrl;
  }

  var apiUrlWithVersionRexExp = /api\/([1-9][0-9])/;
  var apiVersionMatch = baseUrl.match(apiUrlWithVersionRexExp);
  var baseUrlHasVersion = apiVersionMatch && apiVersionMatch[1];
  var apiUrlHasVersion = apiUrl && !apiUrlWithVersionRexExp.test(apiUrl);

  if (baseUrlHasVersion && apiUrlHasVersion) {
    var version = apiVersionMatch[1]; // Inject the current api version number into the endPoint urls

    return apiUrl.replace(/api/, "api/".concat(version));
  }

  return apiUrl;
} // Define our very own special list of characters that we don't want to encode in the URI


var whitelistURI = ',&$=/;:';
var whitelistURICodes = whitelistURI.split('').map(function (c) {
  return encodeURIComponent(c);
});
var whitelistRegExp = new RegExp("(?:".concat(whitelistURICodes.join('|'), ")"), 'g');
/**
 * Encode all invalid URI characters, except the ones we've decided we don't want to
 */

function customEncodeURIComponent(uri) {
  // return uri;
  return encodeURIComponent(uri).replace(whitelistRegExp, decodeURIComponent);
}

function identity(value) {
  return value;
}
//# sourceMappingURL=utils.js.map