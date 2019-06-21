"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AnalyticsRequestDimensionsMixin = _interopRequireDefault(require("./AnalyticsRequestDimensionsMixin"));

var _AnalyticsRequestFiltersMixin = _interopRequireDefault(require("./AnalyticsRequestFiltersMixin"));

var _AnalyticsRequestPropertiesMixin = _interopRequireDefault(require("./AnalyticsRequestPropertiesMixin"));

var _AnalyticsRequestBase = _interopRequireDefault(require("./AnalyticsRequestBase"));

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
 * @description
 * Class for constructing a request object to use for communicating with the analytics API endpoint.
 *
 * @param {!Object} options Object with analytics request options
 *
 * @memberof module:analytics
 *
 * @extends module:analytics.AnalyticsRequestDimensionsMixin
 * @extends module:analytics.AnalyticsRequestFiltersMixin
 * @extends module:analytics.AnalyticsRequestPropertiesMixin
 * @extends module:analytics.AnalyticsRequestBase
 */
var AnalyticsRequest =
/*#__PURE__*/
function (_AnalyticsRequestDime) {
  _inherits(AnalyticsRequest, _AnalyticsRequestDime);

  function AnalyticsRequest() {
    _classCallCheck(this, AnalyticsRequest);

    return _possibleConstructorReturn(this, _getPrototypeOf(AnalyticsRequest).apply(this, arguments));
  }

  _createClass(AnalyticsRequest, [{
    key: "fromModel",

    /**
     * Extracts dimensions and filters from an analytic object model and add them to the request
     *
     * @param {Object} model The analytics object model from which extract the dimensions/filters
     * @param {Boolean} [passFilterAsDimension=false] Pass filters as dimension in the query string (used in dataValueSet requests)
     *
     * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
     *
     * @example
     * const req = new d2.analytics.request()
     *    .fromModel(model);
     *
     * // dimension=pe:LAST_12_MONTH&dimension=dx:fbfJHSPpUQD;cYeuwXTCPkU;Jtf34kNZhzP;hfdmMSPBgLG&filter=ou:ImspTQPwCqd
     *
     * const req2 = new d2.analytics.request()
     *    .fromModel(model, true);
     *
     * // dimension=pe:LAST_12_MONTH&dimension=dx:fbfJHSPpUQD;cYeuwXTCPkU;Jtf34kNZhzP;hfdmMSPBgLG&dimension=ou:ImspTQPwCqd
     */
    value: function fromModel(model) {
      var passFilterAsDimension = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var request = this; // extract dimensions from model

      var columns = model.columns || [];
      var rows = model.rows || [];
      columns.concat(rows).forEach(function (d) {
        var dimension = d.dimension;

        if (d.filter) {
          dimension += ":".concat(d.filter);
        }

        request = request.addDimension(dimension, d.items.map(function (item) {
          return item.id;
        }));
      }); // extract filters from model

      var filters = model.filters || [];
      filters.forEach(function (f) {
        request = passFilterAsDimension ? request.addDimension(f.dimension, f.items.map(function (item) {
          return item.id;
        })) : request.addFilter(f.dimension, f.items.map(function (item) {
          return item.id;
        }));
      });
      return request;
    }
  }]);

  return AnalyticsRequest;
}((0, _AnalyticsRequestDimensionsMixin.default)((0, _AnalyticsRequestFiltersMixin.default)((0, _AnalyticsRequestPropertiesMixin.default)(_AnalyticsRequestBase.default))));

var _default = AnalyticsRequest;
exports.default = _default;
//# sourceMappingURL=AnalyticsRequest.js.map