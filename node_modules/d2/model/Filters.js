"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _check = require("../lib/check");

var _utils = require("../lib/utils");

var _Filter = _interopRequireDefault(require("../model/Filter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @description
 * Collection class that contains filters that are to be applied when loading Model objects from the api.
 *
 * @memberof module:model
 */
var Filters =
/*#__PURE__*/
function () {
  /**
   * Creates a new Filters instance.
   *
   * The Filters instance keeps a list of all the applied filters for a modelDefinition.
   *
   * @param {ModelDefinition} modelDefinition The ModelDefinition for which this Filters object should create filters.
   * @param {Filter[]} filters A list of Filter objects
   */
  function Filters(modelDefinition) {
    var filters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, Filters);

    /**
     * @type {Array<Filter>}
     * @private
     */
    this.filters = filters;
    this.modelDefinition = modelDefinition;
    this.rootJunction = null;
  }
  /**
   * Shortcut for triggering the creation of a Filter. This is the function that is triggered when creating new
   * filters on a ModelDefinition. The Filter will receive a callback that can be used to add the finalized filter
   * to the list of filters.
   *
   * @param {string} propertyName The property that the filter should apply to. (e.g. `name`)
   * @returns {Filter} The created filter object for `propertyName`.
   */


  _createClass(Filters, [{
    key: "on",
    value: function on(propertyName) {
      var addFilter = this.add.bind(this);
      return _Filter.default.getFilter(addFilter).on(propertyName);
    }
    /**
     * Utility method to add a filter to the list of filters.
     *
     * @private
     * @param {Filter} filter The Filter to be added to the list of current filters.
     * @returns {ModelDefinition} The modelDefiniton that the filter applies to. This is used to support calling `.list()`
     * on the modelDefinition after the filter was created.
     * @throws {TypeError} Thrown when the given filter is not a Filter object.
     */

  }, {
    key: "add",
    value: function add(filter) {
      if (!(0, _check.isType)(filter, _Filter.default)) {
        throw new TypeError('filter should be an instance of Filter');
      }

      this.filters.push(filter);
      return this.modelDefinition;
    }
    /**
     * @deprecated
     * @returns {Promise} Proxy the list() call on the filters object.
     */

  }, {
    key: "list",
    value: function list() {
      return this.modelDefinition.list();
    }
    /**
     * Get an array of DHIS2 metadata filter values to send to the API.
     *
     * This will return ['id:eq:UYXOT4A7JMI', 'name:like:ANC'] for filters created as follows
     * dataElement
     *  .filter().on('id').equals(UYXOT4A7JMI)
     *  .filter().on('name').like('ANC')
     *
     * @returns {Array<string>} A list of query param values to be used with the filter key.
     */

  }, {
    key: "getQueryFilterValues",
    value: function getQueryFilterValues() {
      return this.filters.map(function (filter) {
        return filter.getQueryParamFormat();
      });
    }
    /**
     * @deprecated Deprecated since 2.28, use getQueryFilterValues instead.
     * @returns {Array.<string>}
     */

  }, {
    key: "getFilters",
    value: function getFilters() {
      return this.getQueryFilterValues();
    }
    /**
     * Get a list of Filter objects that are in applied in this Filters instance
     *
     * @returns {Array<Filter>} The list of Filter objects.
     */

  }, {
    key: "getFilterList",
    value: function getFilterList() {
      return this.filters.map(_utils.identity);
    }
    /**
     * The logic mode to use on the filters.
     *
     * Default behavior is AND.
     * Note that the logic will be used across all the filters, which
     * means with OR, results will be returned when any of the filter match.
     * It MUST be called last on the chain of filters when called
     * through modelDefinition.filter().
     * @see {@link https://docs.dhis2.org/master/en/developer/html/webapi_metadata_object_filter.html|Object filter Docs }
     * @example
     * d2.programs.filter().on('name').like('Child')
     * .filter().logicMode('OR').on('code').equals('Child')
     * @param {string} junction The logic operator to use. One of ['OR', 'AND'];
     */

  }, {
    key: "logicMode",
    value: function logicMode(junction) {
      (0, _check.checkValidRootJunction)(junction);
      this.rootJunction = junction;
      return this;
    }
    /**
     * Factory method to create a Filters object.
     *
     * @param {ModelDefinition} modelDefinition The modelDefinition that the filters should apply to.
     * @param {Filter[]} priorFilters List of previously applied filters that the new filter list should start with.
     * @returns {Filters} A Filters object for the given modelDefinition.
     */

  }], [{
    key: "getFilters",
    value: function getFilters(modelDefinition) {
      var priorFilters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      return new Filters(modelDefinition, priorFilters);
    }
  }]);

  return Filters;
}();

var _default = Filters;
exports.default = _default;
//# sourceMappingURL=Filters.js.map