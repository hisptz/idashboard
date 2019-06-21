"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _check = require("../lib/check");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FILTER_COMPARATORS = {
  /**
   * @function equals
   * @memberof module:model.Filter.prototype
   * @returns {Filter} Returns the modified filter for chaining
   *
   * @description
   * This method can be used to add a equals filter value
   */
  equals: 'eq',

  /**
   * @function like
   * @memberof module:model.Filter.prototype
   * @returns {Filter} Returns the modified filter for chaining
   *
   * @description
   * This method can be used to add a like filter value
   */
  like: 'like',

  /**
   * @function ilike
   * @memberof module:model.Filter.prototype
   * @returns {Filter} Returns the modified filter for chaining
   *
   * @description
   * This method can be used to add a ilike filter value
   */
  ilike: 'ilike',

  /**
   * @function
   * @memberof module:model.Filter.prototype
   * @returns {Filter} Returns the modified filter for chaining
   *
   * @description
   * This method can be used to add a ne filter value
   */
  notEqual: 'ne',

  /**
   * @function
   * @memberof module:model.Filter.prototype
   * @returns {Filter} Returns the modified filter for chaining
   *
   * @description
   * This method can be used to add a token filter value
   */
  token: 'token',

  /**
   * @function
   * @memberof module:model.Filter.prototype
   * @returns {Filter} Returns the modified filter for chaining
   *
   * @description
   * This method can be used to add a !token filter value
   */
  nToken: '!token'
};
/**
 * Filter class that can be used to build api endpoint filters using a semi-natural language style.
 *
 * @memberof module:model
 */

var Filter =
/*#__PURE__*/
function () {
  /**
   * @constructor
   * @param {Function} addFilterCallback Callback that will be used to notify Filters that the filter is completed
   * so it can be added to the list of filters.
   */
  function Filter(addFilterCallback) {
    _classCallCheck(this, Filter);

    this.addFilterCallback = addFilterCallback;
    this.propertyName = 'name';
    this.comparator = 'like';
    this.filterValue = undefined;
  }
  /**
   * @param {String} propertyName Property name that the filter should be applied on.
   * @returns {Filter}
   */


  _createClass(Filter, [{
    key: "on",
    value: function on(propertyName) {
      (0, _check.checkDefined)(propertyName, 'Property name to filter on');
      this.propertyName = propertyName;
      return this;
    }
    /**
     * Utility function used to get the query parameter value in a DHIS2 metadata filter format that can be
     * send to the api. This returned value is appended to the `filter=` part of the query.
     *
     * @private
     * @note {warning} Usually not used directly and only used by Filters to create the query param values.
     *
     * @returns {string} The query param value to be appended to `filter=`
     */

  }, {
    key: "getQueryParamFormat",
    value: function getQueryParamFormat() {
      return [this.propertyName, this.comparator, this.filterValue].join(':');
    }
    /**
     * @static
     *
     * @param {Function} addFilterCallback Callback to be called when the filter is completed.
     *
     * @returns {Filter} A instance of the Filter class that can be used to create
     * filters.
     *
     * @description
     * Create a filter instance
     */

  }, {
    key: "operator",

    /**
     * Utility function to add an operator with filterValue
     * @param {*} operator to use
     * @param {*} filterValue to filter on
     */
    value: function operator(_operator, filterValue) {
      (0, _check.checkDefined)(_operator, 'operator');
      (0, _check.checkDefined)(filterValue, 'filterValue');
      this.comparator = _operator;
      this.filterValue = filterValue;
      return this.addFilterCallback(this);
    }
  }], [{
    key: "getFilter",
    value: function getFilter(addFilterCallback) {
      return new Filter(addFilterCallback);
    }
  }]);

  return Filter;
}(); // Add the filters to the Filter prototype


Object.keys(FILTER_COMPARATORS).forEach(function (filter) {
  Object.defineProperty(Filter.prototype, filter, {
    value: function filterGetter(filterValue) {
      (0, _check.checkDefined)(filterValue, 'filterValue');
      this.comparator = FILTER_COMPARATORS[filter];
      this.filterValue = filterValue;
      return this.addFilterCallback(this);
    }
  });
});
var _default = Filter;
exports.default = _default;
//# sourceMappingURL=Filter.js.map