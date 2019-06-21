"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AnalyticsRequest = _interopRequireDefault(require("./AnalyticsRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * @private
 * @description
 * AnalyticsRequest filters mixin function
 *
 * @param {*} base The base class to mix onto
 * @return {module:analytics.AnalyticsRequestFiltersMixin} The mixin class
 * @mixin
 */
var AnalyticsRequestFiltersMixin = function AnalyticsRequestFiltersMixin(base) {
  return (
    /*#__PURE__*/

    /**
     * @private
     * @description
     * AnalyticsRequest filters mixin class
     *
     * @alias module:analytics.AnalyticsRequestFiltersMixin
     */
    function (_base) {
      _inherits(_class, _base);

      function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class).apply(this, arguments));
      }

      _createClass(_class, [{
        key: "addDataFilter",

        /**
         * Adds/updates the dx dimension filter to use in the request.
         *
         * @param {!(String|Array)} items The dimension items to add to the dx dimension filter
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .addDataFilter(['fbfJHSPpUQD', 'cYeuwXTCPkU'])
         *    .addDataFilter('BfMAe6Itzgt.REPORTING_RATE');
         *
         * // filter=dx:fbfJHSPpUQD;cYeuwXTCPkU;BfMAe6Itzgt.REPORTING_RATE
         */
        value: function addDataFilter(items) {
          return this.addFilter('dx', items);
        }
        /**
         * Adds/updates the pe dimension filter to use in the request.
         *
         * @param {!(String|Array)} items The dimension items to add to the pe dimension filter
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .addPeriodFilter(['201701', '201702'])
         *    .addPeriodFilter('LAST_4_QUARTERS')
         *
         * // filter=pe:201701;201702;LAST_4_QUARTERS
         */

      }, {
        key: "addPeriodFilter",
        value: function addPeriodFilter(items) {
          return this.addFilter('pe', items);
        }
        /**
         * Adds/updates the ou dimension filter to use in the request.
         *
         * @param {!(String|Array)} items The dimension items to add to the ou dimension filter
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .addOrgUnitFilter(['O6uvpzGd5pu', 'lc3eMKXaEfw'])
         *    .addOrgUnitFilter('OU_GROUP-w0gFTTmsUcF')
         *
         * // filter=ou:O6uvpzGd5pu;lc3eMKXaEfw;OU_GROUP-w0gFTTmsUcF
         */

      }, {
        key: "addOrgUnitFilter",
        value: function addOrgUnitFilter(items) {
          return this.addFilter('ou', items);
        }
        /**
         * Adds a filter to the request.
         *
         * @param {!String} dimension The dimension to add as filter to the request
         * @param {(String|Array)} items The dimension items to add to the dimension filter
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .addFilter('Bpx0589u8y0', ['oRVt7g429ZO', 'MAs88nJc9nL'])
         *    .addFilter('qrur9Dvnyt5-Yf6UHoPkdS6');
         *
         * // filter=Bpx0589u8y0:oRVt7g429ZO;MAs88nJc9nL&filter=qrur9Dvnyt5-Yf6UHoPkdS6
         */

      }, {
        key: "addFilter",
        value: function addFilter(dimension, items) {
          var filterIndex = 0;
          var existingFilter = this.filters.find(function (item, index) {
            if (item.dimension === dimension) {
              filterIndex = index;
              return item;
            }

            return false;
          });
          var updatedItems = [];
          var existingItems = [];

          if (existingFilter) {
            existingItems = existingFilter.items || [];
          }

          if (typeof items === 'string') {
            updatedItems = _toConsumableArray(new Set([].concat(_toConsumableArray(existingItems), [items])));
          } else if (Array.isArray(items)) {
            updatedItems = _toConsumableArray(new Set([].concat(_toConsumableArray(existingItems), _toConsumableArray(items))));
          }

          if (existingFilter) {
            this.filters.splice(filterIndex, 1, {
              dimension: dimension,
              items: updatedItems
            });
          } else {
            this.filters.push({
              dimension: dimension,
              items: updatedItems
            });
          }

          return new _AnalyticsRequest.default(this);
        }
      }]);

      return _class;
    }(base)
  );
};

var _default = AnalyticsRequestFiltersMixin;
exports.default = _default;
//# sourceMappingURL=AnalyticsRequestFiltersMixin.js.map