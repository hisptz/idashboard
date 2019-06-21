"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _check = require("../lib/check");

var _Api = _interopRequireDefault(require("../api/Api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @description
 * Handles communication with the systemSettings endpoint. Can be used to get or save systemSettings.
 *
 * @memberof module:system
 * @requires lib/check
 * @requires api/Api
 */
// TODO: Return the values from the local cache if we have not updated it? We could
var SystemSettings =
/*#__PURE__*/
function () {
  function SystemSettings() {
    var api = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _Api.default.getApi();

    _classCallCheck(this, SystemSettings);

    this.api = api;
  }
  /**
   * Loads all the system settings in the system and returns them as an object from the promise.
   *
   * @returns {Promise} Promise that resolves with the systemsettings object from the api.
   *
   * @example
   * d2.system.settings.all()
   *  .then(systemSettings => {
   *    console.log('Analytics was last updated on: ' + systemSettings.keyLastSuccessfulResourceTablesUpdate);
   *  });
   */


  _createClass(SystemSettings, [{
    key: "all",
    value: function all() {
      var _this = this;

      return this.settings ? Promise.resolve(this.settings) : this.api.get('systemSettings').then(function (settings) {
        _this.settings = settings;
        return Promise.resolve(_this.settings);
      });
    }
    /**
     * Get a single systemSetting for the given key.
     *
     * This will use the cached value of the key if it has been previously loaded.
     *
     * @param {String} systemSettingsKey The identifier of the system setting that should be retrieved.
     * @returns {Promise} A promise that resolves with the value or will fail if the value is not available.
     *
     * @example
     * d2.system.settings.get('keyLastSuccessfulResourceTablesUpdate')
     *  .then(systemSettingsValue => {
     *    console.log('Analytics was last updated on: ' + systemSettingsValue);
     *  });
     */

  }, {
    key: "get",
    value: function get(systemSettingsKey) {
      var _this2 = this;

      if (this.settings && this.settings[systemSettingsKey]) {
        return Promise.resolve(this.settings[systemSettingsKey]);
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
        if (!(0, _check.isString)(systemSettingsKey)) {
          throw new TypeError('A "key" parameter should be specified when calling get() on systemSettings');
        }

        var options = {
          headers: {
            accept: 'text/plain'
          }
        };

        _this2.api.get(['systemSettings', systemSettingsKey].join('/'), undefined, options).then(function (response) {
          if (response) {
            resolve(processValue(response));
          }

          reject(new Error('The requested systemSetting has no value or does not exist.'));
        });
      });
    }
  }, {
    key: "set",
    value: function set(systemSettingsKey, value) {
      var _this3 = this;

      var settingUrl = ['systemSettings', systemSettingsKey].join('/');

      if (value === null || "".concat(value).length === 0) {
        return this.api.delete(settingUrl).then(function (response) {
          // Update cache if present
          if (_this3.settings && _this3.settings[systemSettingsKey]) {
            delete _this3.settings[systemSettingsKey];
          }

          return response;
        });
      }

      return this.api.post(settingUrl, value, {
        headers: {
          'Content-Type': 'text/plain'
        }
      }).then(function (response) {
        // update cache if present
        if (_this3.settings) {
          _this3.settings[systemSettingsKey] = value;
        }

        return response;
      });
    }
  }]);

  return SystemSettings;
}();

var _default = SystemSettings;
exports.default = _default;
//# sourceMappingURL=SystemSettings.js.map