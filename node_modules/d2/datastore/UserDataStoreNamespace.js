"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Api = _interopRequireDefault(require("../api/Api"));

var _BaseStoreNamespace2 = _interopRequireDefault(require("./BaseStoreNamespace"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * @augments module:datastore.BaseStoreNamespace
 * @description
 * Represents a namespace in the dataStore that can be used to be used to interact with
 * the remote API.
 *
 * @property {array} keys an array of the loaded keys.
 * @property {string} namespace Name of the namespace as on the server.
 *
 * @memberof module:current-user
 */
var UserDataStoreNamespace =
/*#__PURE__*/
function (_BaseStoreNamespace) {
  _inherits(UserDataStoreNamespace, _BaseStoreNamespace);

  function UserDataStoreNamespace(namespace, keys) {
    var api = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Api.default.getApi();
    var endPoint = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'userDataStore';

    _classCallCheck(this, UserDataStoreNamespace);

    return _possibleConstructorReturn(this, _getPrototypeOf(UserDataStoreNamespace).call(this, namespace, keys, api, endPoint));
  }

  return UserDataStoreNamespace;
}(_BaseStoreNamespace2.default);

var _default = UserDataStoreNamespace;
exports.default = _default;
//# sourceMappingURL=UserDataStoreNamespace.js.map