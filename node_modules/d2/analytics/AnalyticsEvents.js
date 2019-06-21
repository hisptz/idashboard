"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AnalyticsBase2 = _interopRequireDefault(require("./AnalyticsBase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * @extends module:analytics.AnalyticsBase
 *
 * @description
 * Analytics events class used to request analytics events data from Web API.
 *
 * @memberof module:analytics
 *
 * @see https://docs.dhis2.org/master/en/developer/html/webapi_event_analytics.html
 */
var AnalyticsEvents =
/*#__PURE__*/
function (_AnalyticsBase) {
  _inherits(AnalyticsEvents, _AnalyticsBase);

  function AnalyticsEvents() {
    _classCallCheck(this, AnalyticsEvents);

    return _possibleConstructorReturn(this, _getPrototypeOf(AnalyticsEvents).apply(this, arguments));
  }

  _createClass(AnalyticsEvents, [{
    key: "getAggregate",

    /**
     * @param {!AnalyticsRequest} req Request object
     *
     * @returns {Promise} Promise that resolves with the analytics aggregate data from the api.
     *
     * @example
     * const req = new d2.analytics.request()
     *  .withProgram('eBAyeGv0exc')
     *  .addDataDimension(['Uvn6LCg7dVU','OdiHJayrsKo'])
     *  .addPeriodDimension('LAST_4_QUARTERS')
     *  .addOrgUnitDimension(['lc3eMKXaEfw','PMa2VCrupOd'])
     *  .addOrgUnitFilter('O6uvpzGd5pu')
     *  .withStartDate('2017-10-01')
     *  .withEndDate('2017-10-31');
     *
     *  d2.analytics.events.getAggregate(req)
     *  .then(console.log);
     */
    value: function getAggregate(req) {
      return this.fetch(req.withPath('events/aggregate'));
    }
    /**
     * @param {!AnalyticsRequest} req Request object
     *
     * @returns {Promise} Promise that resolves with the analytics count data from the api.
     *
     * @example
     * const req = new d2.analytics.request()
     *  .withProgram('eBAyeGv0exc')
     *  .addDataDimension(['Uvn6LCg7dVU','OdiHJayrsKo'])
     *  .addPeriodDimension('LAST_4_QUARTERS')
     *  .addOrgUnitDimension(['lc3eMKXaEfw','PMa2VCrupOd'])
     *  .addOrgUnitFilter('O6uvpzGd5pu')
     *  .withStartDate('2017-10-01')
     *  .withEndDate('2017-10-31');
     *
     *  d2.analytics.events.getCount(req)
     *  .then(console.log);
     */

  }, {
    key: "getCount",
    value: function getCount(req) {
      return this.fetch(req.withPath('events/count'));
    }
    /**
     * @param {!AnalyticsRequest} req Request object
     * Must contain clusterSize and bbox parameters.
     *
     * @returns {Promise} Promise that resolves with the analytics cluster data from the api.
     *
     * @example
     * const req = new d2.analytics.request()
     *  .withProgram('eBAyeGv0exc')
     *  .addDataDimension(['Uvn6LCg7dVU','OdiHJayrsKo'])
     *  .addPeriodDimension('LAST_4_QUARTERS')
     *  .addOrgUnitDimension(['lc3eMKXaEfw','PMa2VCrupOd'])
     *  .addOrgUnitFilter('O6uvpzGd5pu')
     *  .withStartDate('2017-10-01')
     *  .withEndDate('2017-10-31')
     *  .withClusterSize(100000)
     *  .withBbox('-13.2682125,7.3721619,-10.4261178,9.904012');
     *
     *  d2.analytics.events.getCluster(req)
     *  .then(console.log);
     */

  }, {
    key: "getCluster",
    value: function getCluster(req) {
      return this.fetch(req.withPath('events/cluster'));
    }
    /**
     * @param {!AnalyticsRequest} req Request object
     *
     * @returns {Promise} Promise that resolves with the analytics query data from the api.
     *
     * @example
     * const req = new d2.analytics.request()
     *  .withProgram('eBAyeGv0exc')
     *  .addDataDimension(['Uvn6LCg7dVU','OdiHJayrsKo'])
     *  .addPeriodDimension('LAST_4_QUARTERS')
     *  .addOrgUnitDimension(['lc3eMKXaEfw','PMa2VCrupOd'])
     *  .addOrgUnitFilter('O6uvpzGd5pu')
     *  .withStartDate('2017-10-01')
     *  .withEndDate('2017-10-31');
     *
     *  d2.analytics.events.getQuery(req)
     *  .then(console.log);
     */

  }, {
    key: "getQuery",
    value: function getQuery(req) {
      return this.fetch(req.withPath('events/query'));
    }
  }]);

  return AnalyticsEvents;
}(_AnalyticsBase2.default);

var _default = AnalyticsEvents;
exports.default = _default;
//# sourceMappingURL=AnalyticsEvents.js.map