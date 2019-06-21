"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseStore2 = _interopRequireDefault(require("./BaseStore"));

var _UserDataStoreNamespace = _interopRequireDefault(require("./UserDataStoreNamespace"));

var _Api = _interopRequireDefault(require("../api/Api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * @augments module:datastore.BaseStore
 * @description
 * Represents the UserDataStore that can be interacted with. This can be used to get instances of UserDataStoreNamespace, which
 * can be used to interact with the {@link module:current-user.UserDataStoreNamespace namespace API}.
 *
 * The store is a key-value store, where a namespace contains a list of keys, and
 * a key corresponds to an arbitrary JSON-object. The store is per-user, and only the currently logged-in user
 * has access to the namespaces.
 *
 * Note that a namespace cannot exist without at least one key-value pair, for this reason
 * you need to call {@link module:current-user.UserDataStoreNamespace#set set()} after {@link module:current-user.UserDataStore#create create()} to save a namespace
 * with a key and a value.
 *
 * @example <caption>Getting a value with promise-syntax</caption>
 * import { init } from 'd2';
 *
 * init({baseUrl: 'https://play.dhis2.org/demo/api'})
 *   .then((d2) => {
 *     d2.currentUser.dataStore.get('namespace').then(namespace => {
 *          namespace.get('key').then(value => console.log(value))
 *      });
 *   });
 *
 * @example <caption>Creation of namespace with async-syntax</caption>
 * const namespace = await d2.currentUser.dataStore.create('new namespace', false);
 * // The namespace is not actually created on the server before 'set' is called
 * await namespace.set('new key', value);
 *
 * @memberof module:current-user
 */
var UserDataStore =
/*#__PURE__*/
function (_BaseStore) {
  _inherits(UserDataStore, _BaseStore);

  function UserDataStore() {
    var api = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _Api.default.getApi();
    var endPoint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'userDataStore';

    _classCallCheck(this, UserDataStore);

    return _possibleConstructorReturn(this, _getPrototypeOf(UserDataStore).call(this, api, endPoint, _UserDataStoreNamespace.default));
  }
  /**
   * @description
   * Tries to get the given namespace from the server, and returns an instance of 'UserDataStore' that
   * may be used to interact with this namespace. See {@link module:current-user.UserDataStoreNamespace UserDataStoreNamespace}.
   *
   * @example <caption>Getting a namespace</caption>
   * d2.currentUser.dataStore.get('namespace').then(namespace => {
   *     namespace.set('new key', value);
   *});
   *
   * @param {string} namespace - Namespace to get.
   * @param {boolean} [autoLoad=true] - If true, autoloads the keys of the namespace from the server.
   * If false, an instance of the namespace is returned without any keys (no request is sent to the server).
   *
   * @returns {Promise<UserDataStoreNamespace>} An instance of a UserDataStoreNamespace representing the namespace that can be interacted with.
   */


  _createClass(UserDataStore, [{
    key: "get",
    value: function get(namespace) {
      var autoLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      return _get(_getPrototypeOf(UserDataStore.prototype), "get", this).call(this, namespace, autoLoad);
    }
    /**
     * Creates a namespace. Ensures that the namespace does not exists on the server.
     * Note that for the namespace to be saved on the server, you need to call {@link module:current-user.UserDataStoreNamespace#set set}.
     *
     * @example <caption>Creating a namespace</caption>
     * d2.currentUser.dataStore.create('new namespace').then(namespace => {
     *     namespace.set('new key', value);
     * });
     * @param {string} namespace The namespace to create.
     * @returns {Promise<UserDataStoreNamespace>} An instance of the current store-Namespace-instance representing the namespace that can be interacted with, or
     * an error if namespace exists.
     */

  }, {
    key: "create",
    value: function create(namespace) {
      return _get(_getPrototypeOf(UserDataStore.prototype), "create", this).call(this, namespace);
    }
    /**
     * @static
     *
     * @returns {UserDataStore} Object with the userDataStore interaction properties
     *
     * @description
     * Get a new instance of the userDataStore object. This will function as a singleton - when a UserDataStore object has been created
     * when requesting getUserDataStore again, the original version will be returned.
     */

  }], [{
    key: "getUserDataStore",
    value: function getUserDataStore() {
      if (!UserDataStore.getUserDataStore.dataStore) {
        UserDataStore.getUserDataStore.dataStore = new UserDataStore(_Api.default.getApi(), 'userDataStore');
      }

      return UserDataStore.getUserDataStore.dataStore;
    }
  }]);

  return UserDataStore;
}(_BaseStore2.default);

var _default = UserDataStore;
exports.default = _default;
//# sourceMappingURL=UserDataStore.js.map