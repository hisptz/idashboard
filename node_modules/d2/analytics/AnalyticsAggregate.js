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
 * Analytics aggregate class used to request aggregate analytics data from Web API.
 *
 * @memberof module:analytics
 *
 * @see https://docs.dhis2.org/master/en/developer/html/webapi_analytics.html
 */
var AnalyticsAggregate =
/*#__PURE__*/
function (_AnalyticsBase) {
  _inherits(AnalyticsAggregate, _AnalyticsBase);

  function AnalyticsAggregate() {
    _classCallCheck(this, AnalyticsAggregate);

    return _possibleConstructorReturn(this, _getPrototypeOf(AnalyticsAggregate).apply(this, arguments));
  }

  _createClass(AnalyticsAggregate, [{
    key: "getDataValueSet",

    /**
     * @param {!AnalyticsRequest} req Request object
     *
     * @returns {Promise} Promise that resolves with the analytics data value set data from the API.
     *
     * @example
     * const req = new d2.analytics.request()
     *  .addDataDimension(['Uvn6LCg7dVU','OdiHJayrsKo'])
     *  .addPeriodDimension('LAST_4_QUARTERS')
     *  .addOrgUnitDimension(['lc3eMKXaEfw','PMa2VCrupOd'])
     *  .addOrgUnitFilter('O6uvpzGd5pu')
     *  .withStartDate('2017-10-01')
     *  .withEndDate('2017-10-31');
     *
     * d2.analytics.aggregate.getDataValueSet(req)
     * .then(console.log);
     */
    value: function getDataValueSet(req) {
      return this.fetch(req.withPath('dataValueSet'));
    }
    /**
     * @param {!AnalyticsRequest} req Request object
     *
     * @returns {Promise} Promise that resolves with the raw data from the API.
     *
     * @example
     * const req = new d2.analytics.request()
     *  .addDataDimension(['Uvn6LCg7dVU','OdiHJayrsKo'])
     *  .addPeriodDimension('LAST_4_QUARTERS')
     *  .addOrgUnitDimension(['lc3eMKXaEfw', 'PMa2VCrupOd'])
     *  .addOrgUnitFilter('O6uvpzGd5pu');
     *  .withStartDate('2017-10-01')
     *  .withEndDate('2017-10-31')
     *  .withFormat('xml');
     *
     *  d2.analytics.aggregate.getRawData(req)
     *  .then(console.log);
     */

  }, {
    key: "getRawData",
    value: function getRawData(req) {
      return this.fetch(req.withPath('rawData'));
    }
    /**
     * @param {!AnalyticsRequest} req Request object
     *
     * @returns {Promise} Promise that resolves with the SQL statement used to query the database.
     *
     * @example
     * const req = new d2.analytics.request()
     *  .addDataDimension(['Uvn6LCg7dVU','OdiHJayrsKo'])
     *  .addPeriodDimension('LAST_4_QUARTERS')
     *  .addOrgUnitDimension(['lc3eMKXaEfw', 'PMa2VCrupOd'])
     *  .addOrgUnitFilter('O6uvpzGd5pu');
     *  .withStartDate('2017-10-01')
     *  .withEndDate('2017-10-31');
     *
     *  d2.analytics.aggregate.getDebugSql(req);
     *  .then(console.log);
     */

  }, {
    key: "getDebugSql",
    value: function getDebugSql(req) {
      return this.fetch(req.withPath('debug/sql'));
    }
  }]);

  return AnalyticsAggregate;
}(_AnalyticsBase2.default);

var _default = AnalyticsAggregate;
exports.default = _default;
//# sourceMappingURL=AnalyticsAggregate.js.map