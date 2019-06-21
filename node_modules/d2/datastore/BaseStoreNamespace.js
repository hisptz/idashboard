"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Api = _interopRequireDefault(require("../api/Api"));

var _check = require("../lib/check");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @private
 * @description
 * Represents a namespace in the dataStore that can be used to be used to interact with
 * the remote API.
 *
 * @property {Array} keys an array of the loaded keys.
 * @property {String} namespace name of this namespace as on the server.
 *
 * @memberof module:datastore
 */
var BaseStoreNamespace =
/*#__PURE__*/
function () {
  /**
   * @param {string} namespace - the name of the namespace this represents.
   * @param {string[]} keys - preloaded keys for this namespace.
   * @param {module:api.Api} api - the api implementation, used for testing.
   * @param {string} endPoint - the relative API-endpoint, one of ['dataStore, userDataStore'].
   */
  function BaseStoreNamespace(namespace, keys) {
    var api = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Api.default.getApi();
    var endPoint = arguments.length > 3 ? arguments[3] : undefined;

    _classCallCheck(this, BaseStoreNamespace);

    if (!(0, _check.isString)(namespace)) {
      throw new Error('BaseStoreNamespace must be called with a string to identify the Namespace');
    }

    if (!(0, _check.isString)(endPoint)) {
      throw new Error('BaseStoreNamespace must be called with an endPoint');
    }

    if (this.constructor === BaseStoreNamespace) {
      throw new Error('Can\'t instantiate abstract class!');
    }

    this.api = api;
    /**
     * The name of the namespace
     * @type {string}
     */

    this.namespace = namespace;
    /**
     * an array of the loaded keys.
     * @type {string[]}
     */

    this.keys = keys || [];
    this.endPoint = endPoint;
  }
  /**
   * Get the keys for this namespace.
   *
   * @returns {Promise} - The internal list of keys for current namespace.
   */


  _createClass(BaseStoreNamespace, [{
    key: "getKeys",
    value: function getKeys() {
      var _this = this;

      return this.api.get([this.endPoint, this.namespace].join('/')).then(function (response) {
        if (response && (0, _check.isArray)(response)) {
          _this.keys = response;
          return response;
        }

        return Promise.reject(new Error('The requested namespace has no keys or does not exist.'));
      });
    }
    /**
     * Retrieves the value of given key in current namespace.
     *
     * @param key - key to retrieve.
     * @returns {Promise} - The value of the given key.
     */

  }, {
    key: "get",
    value: function get(key) {
      return this.api.get([this.endPoint, this.namespace, key].join('/'));
    }
    /**
     * Sets the value of given key to given value.
     *
     * This will also create a new namespace on the API-end if it does not exist.
     * If the key exists <a href='#update'> update</a> will be called, unless <code>overrideUpdate</code> equals
     * true.
     *
     * @param key - key in this namespace to set.
     * @param value - JSON-value to be set.
     * @param [overrideUpdate=false] - If true a post-request is sent even if key exists.
     * @param [encrypt=false] - If the value should be encrypted on the server.
     * @returns {Promise} - the response body from the {@link module:api.Api#get API}.
     */

  }, {
    key: "set",
    value: function set(key, value) {
      var _this2 = this;

      var overrideUpdate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var encrypt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (!overrideUpdate && this.keys.includes(key)) {
        return this.update(key, value);
      }

      var queryParams = encrypt === true ? '?encrypt=true' : '';
      return this.api.post([this.endPoint, this.namespace, key + queryParams].join('/'), value).then(function (resp) {
        _this2.keys = [].concat(_toConsumableArray(_this2.keys), [key]);
        return resp;
      });
    }
    /**
     * Deletes given key from the API.
     * @param {string} key - key to delete.
     * @returns {Promise} - the response body from the {@link module:api.Api#get API}.
     */

  }, {
    key: "delete",
    value: function _delete(key) {
      var _this3 = this;

      if (!(0, _check.isString)(key)) {
        return Promise.reject(new Error("Expected key to be string, but got ".concat(_typeof(key))));
      }

      return this.api.delete([this.endPoint, this.namespace, key].join('/')).then(function (resp) {
        _this3.keys = _this3.keys.filter(function (elem) {
          return elem !== key;
        });
        return resp;
      });
    }
    /**
     * Updates a key with given value.
     * @param key - key to update.
     * @param value - value to update to.
     * @returns {Promise} - the response body from the {@link module:api.Api#get API}.
     */

  }, {
    key: "update",
    value: function update(key, value) {
      return this.api.update([this.endPoint, this.namespace, key].join('/'), value);
    }
  }]);

  return BaseStoreNamespace;
}();

var _default = BaseStoreNamespace;
exports.default = _default;
//# sourceMappingURL=BaseStoreNamespace.js.map