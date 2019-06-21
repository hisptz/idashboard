"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Api = _interopRequireDefault(require("../api/Api"));

var _AnalyticsRequest = _interopRequireDefault(require("./AnalyticsRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @private
 * @description
 * Base class for communicating with the analytics API endpoint.
 * Its subclasses can be used to get analytics data.
 *
 * @param {Instance} [api=<Api>] Api instance to use for the requests
 *
 * @requires module:api/Api
 *
 * @memberof module:analytics
 * @abstract
 */
var AnalyticsBase =
/*#__PURE__*/
function () {
  function AnalyticsBase() {
    var api = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _Api.default.getApi();

    _classCallCheck(this, AnalyticsBase);

    this.api = api;
  }
  /**
   * Loads the analytics data and returns them as an object from the promise.
   * Two parallel requests are made against the analytics api.
   * One for getting only the metaData and one for getting the actual data.
   * This is for caching purposes, as in many situations the metaData request changes while
   * the data one will be the same and thus have the same response.
   * This methods takes care of adding the default extra parameters to both requests.
   *
   * @param {!AnalyticsRequest} req Analytics request object with the request details
   *
   * @returns {Promise} Promise that resolves with the analytics data and metaData from the api.
   *
   * @example
   * const req = new d2.analytics.request()
   *  .addDataDimension(['Uvn6LCg7dVU','OdiHJayrsKo'])
   *  .addPeriodDimension('LAST_4_QUARTERS')
   *  .addOrgUnitDimension(['lc3eMKXaEfw','PMa2VCrupOd']);
   *
   * d2.analytics.aggregate
   *  .get(req)
   *  .then(analyticsData => console.log('Analytics data', analyticsData))
   *
   * // { metaData: { ... }, rows: [ ... ], headers: [ ... ], height: 0, width: 0 }
   */


  _createClass(AnalyticsBase, [{
    key: "get",
    value: function get(req) {
      // keep metaData and data requests separate for caching purposes
      var metaDataReq = new _AnalyticsRequest.default(req).withSkipMeta(false).withSkipData(true).withIncludeMetadataDetails(true);
      var dataReq = new _AnalyticsRequest.default(req).withSkipData(false).withSkipMeta(true); // parallelize requests

      return Promise.all([this.fetch(dataReq, {
        sorted: true
      }), this.fetch(metaDataReq)]).then(function (responses) {
        return Promise.resolve(_objectSpread({}, responses[0], {
          metaData: responses[1].metaData
        }));
      });
    }
    /**
     * @private
     * @description
     * This method does not manipulate the request object, but directly requests the data from the api
     * based on the request's configuration.
     *
     * @param {!AnalyticsRequest} req Request object
     * @param {Object} options Optional configurations, ie. for sorting dimensions
     *
     * @returns {Promise} Promise that resolves with the data from the api.
     *
     * @example
     * const req = new d2.analytics.request()
     *  .fromModel(chartModel)
     *  .withSkipData();
     *
     * d2.analytics.aggregate
     *  .fetch(req)
     *  .then(analyticsData => console.log('Analytics data', analyticsData))
     *
     * // { metaData: { ... }, rows: [], height: 0, width: 0 }
     */

  }, {
    key: "fetch",
    value: function fetch(req, options) {
      return this.api.get(req.buildUrl(options), req.buildQuery(options)).then(function (data) {
        return Promise.resolve(data);
      });
    }
  }]);

  return AnalyticsBase;
}();

var _default = AnalyticsBase;
exports.default = _default;
//# sourceMappingURL=AnalyticsBase.js.map