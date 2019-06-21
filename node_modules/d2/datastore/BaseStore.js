"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseStoreNamespace = _interopRequireDefault(require("./BaseStoreNamespace"));

var _Api = _interopRequireDefault(require("../api/Api"));

var _check = require("../lib/check");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @private
 * @description
 * Represents a key-value store that can be interacted with. This can be used to get instances of Namespaces, which
 * can be used to interact with the relating namespace API.
 *
 * @memberof module:datastore
 * @abstract
 */
var BaseStore =
/*#__PURE__*/
function () {
  function BaseStore() {
    var api = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _Api.default.getApi();
    var endPoint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'dataStore';
    var NamespaceClass = arguments.length > 2 ? arguments[2] : undefined;

    _classCallCheck(this, BaseStore);

    if (this.constructor === BaseStore) {
      throw new Error("Can't instantiate abstract class!");
    }

    if (!(NamespaceClass.prototype instanceof _BaseStoreNamespace.default)) {
      throw new Error("NamespaceClass must be subclass of ".concat(_typeof(_BaseStoreNamespace.default)));
    }

    this.NamespaceClass = NamespaceClass;
    this.endPoint = endPoint;
    this.api = api;
  }
  /**
   * @description
   * Tries to get the given namespace from the server, and returns an instance of 'RetClass' that
   * may be used to interact with this namespace. See {@link DataStoreNamespace}.
   *
   * @param {string} namespace To get.
   * @param {boolean} [autoLoad=true] If true, autoloads the keys of the namespace from the server.
   * before the namespace is created. If false, an instance of he namespace is returned without any keys.
   * @returns {Promise<BaseStoreNamespace>} An instance of a current store-Namespace-instance representing the namespace that can be interacted with.
   * Or an error if namespace does not exist.
   */


  _createClass(BaseStore, [{
    key: "get",
    value: function get(namespace) {
      var _this = this;

      var autoLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (!autoLoad) {
        return new Promise(function (resolve) {
          resolve(new _this.NamespaceClass(namespace));
        });
      }

      return this.api.get([this.endPoint, namespace].join('/')).then(function (response) {
        if (response && (0, _check.isArray)(response)) {
          if (response.length < 1) {
            // fix for api bug returning empty array instead of 404
            return Promise.reject(new Error('The requested namespace has no keys or does not exist.'));
          }

          return new _this.NamespaceClass(namespace, response);
        }

        return Promise.reject(new Error('The requested namespace has no keys or does not exist.'));
      });
    }
    /**
     * Retrieves a list of all namespaces on the server.
     * @returns {Promise} An array of namespaces.
     */

  }, {
    key: "getAll",
    value: function getAll() {
      return this.api.get(this.endPoint).then(function (response) {
        if (response && (0, _check.isArray)(response)) {
          return response;
        }

        throw new Error('No namespaces exist.');
      });
    }
    /**
     * Convenience method to check if a namespace exists on the server.
     * @param {string} namespace - Namespace to check.
     * @returns {Promise<boolean>} True if namespace exists, false otherwise.
     */

  }, {
    key: "has",
    value: function has(namespace) {
      return this.api.get([this.endPoint, namespace].join('/')).then(function (response) {
        if (response && (0, _check.isArray)(response)) {
          if (response.length < 1) {
            // fix for api bug returning empty array instead of 404
            return Promise.reject(response);
          }

          return true;
        }

        return Promise.reject(new Error('Response is not an array!'));
      }).catch(function (e) {
        if (e.httpStatusCode === 404 || (0, _check.isArray)(e) && e.length < 1) {
          return Promise.resolve(false);
        }

        throw e;
      });
    }
    /**
     * Deletes a namespace
     *
     * @param {string} namespace The namespace to delete.
     * @returns {Promise} the response body from the {@link module:api.Api#get API}.
     */

  }, {
    key: "delete",
    value: function _delete(namespace) {
      return this.api.delete([this.endPoint, namespace].join('/'));
    }
    /**
     * Creates a namespace. Ensures that the namespace does not exists on the server.
     * Note that for the namespace to be saved on the server, you need to call {@link module:dataStore.BaseStoreNamespace.set set}.
     *
     * @param {string} namespace The namespace to create.
     * @returns {Promise<BaseStoreNamespace>} An instance of the current store-Namespace-instance representing the namespace that can be interacted with, or
     * an error if namespace exists.
     */

  }, {
    key: "create",
    value: function create(namespace) {
      var _this2 = this;

      return this.has(namespace).then(function (exists) {
        return exists ? Promise.reject(new Error('Namespace already exists.')) : new _this2.NamespaceClass(namespace);
      });
    }
  }]);

  return BaseStore;
}();

var _default = BaseStore;
exports.default = _default;
//# sourceMappingURL=BaseStore.js.map