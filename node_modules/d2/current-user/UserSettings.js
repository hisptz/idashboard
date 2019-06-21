"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Api = _interopRequireDefault(require("../api/Api"));

var _check = require("../lib/check");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @description
 * Handles communication with the userSettings endpoint. Can be used to get or save userSettings.
 *
 * @memberof module:current-user
 */
var UserSettings =
/*#__PURE__*/
function () {
  function UserSettings(userSettings) {
    var api = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Api.default.getApi();

    _classCallCheck(this, UserSettings);

    this.api = api;

    if (userSettings) {
      this.settings = userSettings;
    }
  }
  /**
   * @returns {Promise} Promise that resolves with the usersettings object from the api.
   *
   * @description
   * Loads all the user settings of current user and returns them as an object from the promise.
   * ```js
   * d2.currentUser.userSettings.all()
   *  .then(userSettings => {
   *    console.log('UI Locale: ' + userSettings.keyUiLocale);
   *  });
   * ```
   */


  _createClass(UserSettings, [{
    key: "all",
    value: function all() {
      var _this = this;

      return this.settings ? Promise.resolve(this.settings) : this.api.get('userSettings').then(function (userSettings) {
        _this.settings = userSettings;
        return Promise.resolve(_this.settings);
      });
    }
    /**
     * @param {String} key The identifier of the user setting that should be retrieved.
     * @returns {Promise} A promise that resolves with the value or will fail if the value is not available.
     *
     * @description
     * ```js
     * d2.currentUser.userSettings.get('keyUiLocale')
     *  .then(userSettingValue => {
     *    console.log('UI Locale: ' + userSettingValue);
     *  });
     * ```
     */

  }, {
    key: "get",
    value: function get(key) {
      var _this2 = this;

      if (this.settings && this.settings[key]) {
        return Promise.resolve(this.settings[key]);
      }

      function processValue(value) {
        // Attempt to parse the response as JSON. If this fails we return the value as is.
        try {
          return JSON.parse(value);
        } catch (e) {
          return value;
        }
      }

      return new Promise(function (resolve, reject) {
        if (!(0, _check.isString)(key)) {
          throw new TypeError('A "key" parameter should be specified when calling get() on userSettings');
        }

        _this2.api.get(['userSettings', key].join('/')).then(function (response) {
          var value = processValue(response); // Store the value on the user settings object

          _this2[key] = value;

          if (value) {
            resolve(value);
          }

          reject(new Error('The requested userSetting has no value or does not exist.'));
        });
      });
    }
    /**
     * @param {String} key The identifier of the user setting that should be saved.
     * @param {String} value The new value of the user setting.
     * @returns {Promise} A promise that will resolve when the new value has been saved, or fail if saving fails.
     *
     * @description
     * ```js
     * d2.currentUser.userSettings.set('keyUiLocale', 'fr')
     *  .then(() => {
     *   console.log('UI Locale is now "fr");
     *  });
     * ```
     */

  }, {
    key: "set",
    value: function set(key, value) {
      delete this.settings;
      var settingUrl = ['userSettings', key].join('/');

      if (value === null || "".concat(value).length === 0) {
        return this.api.delete(settingUrl);
      }

      return this.api.post(settingUrl, value, {
        headers: {
          'Content-Type': 'text/plain'
        }
      });
    }
  }]);

  return UserSettings;
}();

var _default = UserSettings;
exports.default = _default;
//# sourceMappingURL=UserSettings.js.map