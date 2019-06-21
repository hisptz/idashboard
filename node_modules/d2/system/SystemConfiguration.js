"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Api = _interopRequireDefault(require("../api/Api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Handles communication with the configuration endpoint. Can be used to get or set configuration options.
 *
 * @memberof module:system
 */
var SystemConfiguration =
/*#__PURE__*/
function () {
  function SystemConfiguration() {
    var api = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _Api.default.getApi();

    _classCallCheck(this, SystemConfiguration);

    this.api = api;
    this.configuration = undefined;
    this.configPromise = null;
  }
  /**
   * Fetches all system configuration settings from the API and caches them so that future
   * calls to this function won't call the API again.
   *
   * @param {boolean} [ignoreCache=false] If set to true, calls the API regardless of cache status
   * @returns {Promise} Promise that resolves with all the individual configuration options from the api.
   */


  _createClass(SystemConfiguration, [{
    key: "all",
    value: function all(ignoreCache) {
      var _this = this;

      if (this.configPromise === null || ignoreCache === true) {
        this.configPromise = this.api.get('configuration').then(function (configuration) {
          _this.configuration = configuration;
          return _this.configuration;
        });
      }

      return this.configPromise;
    }
    /**
     * Returns the value of the specified configuration option.
     *
     * This is a convenience method that works exactly the same as calling `configuration.all()[name]`.
     *
     * @param key {String}
     * @param {boolean} [ignoreCache=false] If set to true, calls the API regardless of cache status
     * @returns {Promise}
     */

  }, {
    key: "get",
    value: function get(key, ignoreCache) {
      return this.all(ignoreCache).then(function (config) {
        if (config.hasOwnProperty(key)) {
          return Promise.resolve(config[key]);
        }

        return Promise.reject("Unknown config option: ".concat(key));
      });
    }
    /**
     * Send a query to the API to change the value of a configuration key to the specified value.
     *
     * @param key {String}
     * @param value {String|null}
     * @returns {Promise}
     */

    /* eslint-disable complexity */

  }, {
    key: "set",
    value: function set(key, value) {
      var that = this;
      var req;

      if (key === 'systemId') {
        return Promise.reject('The system ID can\'t be changed');
      } else if ((key === 'feedbackRecipients' || key === 'selfRegistrationOrgUnit' || key === 'selfRegistrationRole') && (value === 'null' || value === null)) {
        // Only valid UIDs are accepted when POST'ing, so we have to use DELETE in stead of POST'ing a null value.
        req = this.api.delete(['configuration', key].join('/'));
      } else if (key === 'corsWhitelist') {
        // The corsWhitelist endpoint expects a JSON array (of URLs), while here value is expected to be a string.
        req = this.api.post(['configuration', key].join('/'), value.trim().split('\n'));
      } else {
        req = this.api.post(['configuration', key].join('/'), value, {
          dataType: 'text',
          contentType: 'text/plain'
        });
      }

      return req.then(function () {
        // Ideally we'd update the cache here, but doing so requires another trip to the server
        // For now, just bust the cache to ensure it's not incorrect
        that.configuration = undefined;
        return Promise.resolve();
      }).catch(function () {
        return Promise.reject("No configuration found for ".concat(key));
      });
    }
    /* eslint-enable complexity */

  }]);

  return SystemConfiguration;
}();

var _default = SystemConfiguration;
exports.default = _default;
//# sourceMappingURL=SystemConfiguration.js.map