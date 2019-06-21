"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AnalyticsRequest = _interopRequireDefault(require("./AnalyticsRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
 * AnalyticsRequest properties mixin function
 *
 * @param {*} base The base class to mix onto
 * @return {module:analytics.AnalyticsRequestPropertiesMixin} The mixin class
 */
var AnalyticsRequestPropertiesMixin = function AnalyticsRequestPropertiesMixin(base) {
  return (
    /*#__PURE__*/

    /**
     * @private
     * @description
     * AnalyticsRequest properties mixin
     *
     * @alias module:analytics.AnalyticsRequestPropertiesMixin
     */
    function (_base) {
      _inherits(_class, _base);

      function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class).apply(this, arguments));
      }

      _createClass(_class, [{
        key: "withParameters",

        /**
         * Sets the query parameters of the request
         *
         * @param {!Object} parameters The query parameters to add/modify to the request
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *   .withParameters({ completedOnly: true, aggregationType: 'AVERAGE' });
         */
        value: function withParameters(params) {
          if (params) {
            this.parameters = _objectSpread({}, this.parameters, params);
          }

          return new _AnalyticsRequest.default(this);
        }
        /**
         * Sets the URL path for the request.
         * It appends the given path to the request's URL.
         *
         * @param {!String} path The path of the response
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withPath('aggregate');
         */

      }, {
        key: "withPath",
        value: function withPath(path) {
          if (path) {
            this.path = path;
          }

          return new _AnalyticsRequest.default(this);
        }
        /**
         * Sets the response format for the request.
         * It appends the file extension to the request's path.
         *
         * @param {String} [format=json] The format of the response
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withFormat('xml');
         */

      }, {
        key: "withFormat",
        value: function withFormat() {
          var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'json';
          this.format = format;
          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the aggregationType query parameter to the request.
         *
         * @param {String} aggregationType The aggregationType value
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withAggregationType('SUM');
         */

      }, {
        key: "withAggregationType",
        value: function withAggregationType(value) {
          var aggregationType = value.toUpperCase();
          var aggregationTypes = new Set(['AVERAGE', 'AVERAGE_SUM_ORG_UNIT', 'COUNT', 'LAST', 'LAST_AVERAGE_ORG_UNIT', 'MIN', 'MAX', 'STDDEV', 'SUM', 'VARIANCE']);

          if (aggregationTypes.has(aggregationType)) {
            this.parameters.aggregationType = aggregationType;
          } else if (aggregationType !== 'DEFAULT') {
            console.warn("d2.analytics.request.withAggregationType(): \"".concat(value, "\" not listed as possible value"));
            this.parameters.aggregationType = value;
          }

          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the measureCriteria query parameter to the request.
         *
         * @param {!String} measureCriteria The measureCriteria value
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withMeasureCriteria('GE:10;LT:50');
         */

      }, {
        key: "withMeasureCriteria",
        value: function withMeasureCriteria(criteria) {
          if (criteria) {
            this.parameters.measureCriteria = criteria;
          }

          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the preAggregationMeasureCriteria query parameter to the request.
         *
         * @param {!String} preAggregationMeasureCriteria The preAggregationMeasureCriteria value
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withPreAggregationMeasureCriteria('GE:10;LT:50');
         */

      }, {
        key: "withPreAggregationMeasureCriteria",
        value: function withPreAggregationMeasureCriteria(criteria) {
          if (criteria) {
            this.parameters.preAggregationMeasureCriteria = criteria;
          }

          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the skipMeta query parameter to the request.
         *
         * @param {Boolean} [skipMeta=true] The skipMeta value
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withSkipMeta();
         */

      }, {
        key: "withSkipMeta",
        value: function withSkipMeta() {
          var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
          this.parameters.skipMeta = flag;
          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the skipData query parameter to the request.
         *
         * @param {Boolean} [skipData=true] The skipData value
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withSkipData();
         */

      }, {
        key: "withSkipData",
        value: function withSkipData() {
          var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
          this.parameters.skipData = flag;
          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the hierarchyMeta query parameter to the request.
         *
         * @param {Boolean} [hierarchyMeta=true] The hierarchyMeta value
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withHierarchyMeta();
         */

      }, {
        key: "withHierarchyMeta",
        value: function withHierarchyMeta() {
          var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
          this.parameters.hierarchyMeta = flag;
          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the ignoreLimit query parameter to the request.
         *
         * @param {Boolean} [ignoreLimit=true] The ignoreLimit value
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withIgnoreLimit();
         */

      }, {
        key: "withIgnoreLimit",
        value: function withIgnoreLimit() {
          var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
          this.parameters.ignoreLimit = flag;
          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the tableLayout query parameter to the request.
         *
         * @param {Boolean} [tableLayout=true] The tableLayout value
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withTableLayout();
         */

      }, {
        key: "withTableLayout",
        value: function withTableLayout() {
          var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
          this.parameters.tableLayout = flag;
          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the hideEmptyRows query parameter to the request.
         *
         * @param {Boolean} [hideEmptyRows=true] The hideEmptyRows value
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withHideEmptyRows();
         */

      }, {
        key: "withHideEmptyRows",
        value: function withHideEmptyRows() {
          var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
          this.parameters.hideEmptyRows = flag;
          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the hideEmptyColumns query parameter to the request.
         *
         * @param {Boolean} [hideEmptyColumns=true] The hideEmptyColumns value
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withHideEmptyColumns();
         */

      }, {
        key: "withHideEmptyColumns",
        value: function withHideEmptyColumns() {
          var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
          this.parameters.hideEmptyColumns = flag;
          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the showHierarchy query parameter to the request.
         *
         * @param {Boolean} [showHierarchy=true] The showHierarchy value
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withShowHierarchy();
         */

      }, {
        key: "withShowHierarchy",
        value: function withShowHierarchy() {
          var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
          this.parameters.showHierarchy = flag;
          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the includeNumDen query parameter to the request.
         *
         * @param {Boolean} [includeNumDen=true] The includeNumDen value
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withIncludeNumDen();
         */

      }, {
        key: "withIncludeNumDen",
        value: function withIncludeNumDen() {
          var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
          this.parameters.includeNumDen = flag;
          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the includeMetadataDetails query parameter to the request.
         *
         * @param {Boolean} [includeMetadataDetails=true] The includeMetadataDetails value
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withIncludeMetadataDetails();
         */

      }, {
        key: "withIncludeMetadataDetails",
        value: function withIncludeMetadataDetails() {
          var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
          this.parameters.includeMetadataDetails = flag;
          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the displayProperty query parameter to the request.
         *
         * @param {!String} displayProperty The displayProperty value
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withDisplayProperty('SHORTNAME');
         */

      }, {
        key: "withDisplayProperty",
        value: function withDisplayProperty(value) {
          var displayProperty = value.toUpperCase();
          var displayProperties = new Set(['NAME', 'SHORTNAME']);

          if (displayProperties.has(displayProperty)) {
            this.parameters.displayProperty = displayProperty;
          } else {
            console.warn("d2.analytics.request.withDisplayProperty(): \"".concat(value, "\" not listed as possible value"));
            this.parameters.displayProperty = value;
          }

          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the displayProperty query parameter to the request.
         *
         * @param {!String} displayProperty The displayProperty value
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withDisplayProperty('SHORTNAME');
         */

      }, {
        key: "withOutputIdScheme",
        value: function withOutputIdScheme(scheme) {
          if (scheme) {
            this.parameters.outputIdScheme = scheme;
          }

          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the inputIdScheme query parameter to the request.
         *
         * @param {!String} inputIdScheme The inputIdScheme value
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withInputIdScheme('CODE');
         */

      }, {
        key: "withInputIdScheme",
        value: function withInputIdScheme(scheme) {
          if (scheme) {
            this.parameters.inputIdScheme = scheme;
          }

          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the approvalLevel query parameter to the request.
         *
         * @param {!String} approvalLevel The approvalLevel value
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withApprovalLevel('');
         */

      }, {
        key: "withApprovalLevel",
        value: function withApprovalLevel(level) {
          if (level) {
            this.parameters.approvalLevel = level;
          }

          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the relativePeriodDate query parameter to the request.
         *
         * @param {!String} relativePeriodDate The relativePeriodDate value
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withRelativePeriodDate('LAST_12_MONTHS');
         */

      }, {
        key: "withRelativePeriodDate",
        value: function withRelativePeriodDate(date) {
          if (date) {
            this.parameters.relativePeriodDate = date;
          }

          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the userOrgUnit query parameter to the request.
         *
         * @param {!String} userOrgUnit The userOrgUnit value
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withUserOrgUnit('O6uvpzGd5pu');
         */

      }, {
        key: "withUserOrgUnit",
        value: function withUserOrgUnit(orgUnit) {
          if (orgUnit) {
            this.parameters.userOrgUnit = orgUnit;
          }

          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the columns query parameter to the request.
         *
         * @param {!String} columns The dimensions identifiers (separated by ;)
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withColumns('dx;ou');
         */

      }, {
        key: "withColumns",
        value: function withColumns(dimensions) {
          if (dimensions) {
            this.parameters.columns = dimensions;
          }

          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the rows query parameter to the request.
         *
         * @param {!String} rows The dimensions identifiers (separated by ;)
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withRows('pe');
         */

      }, {
        key: "withRows",
        value: function withRows(dimensions) {
          if (dimensions) {
            this.parameters.rows = dimensions;
          }

          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the startDate query parameter to the request.
         *
         * @param {!String} startDate The startDate value
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withStartDate('2017-11-28');
         */

      }, {
        key: "withStartDate",
        value: function withStartDate(date) {
          if (date) {
            this.parameters.startDate = date;
          }

          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the endDate query parameter to the request.
         *
         * @param {!String} endDate The endDate value
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withEndDate('2017-12-31');
         */

      }, {
        key: "withEndDate",
        value: function withEndDate(date) {
          if (date) {
            this.parameters.endDate = date;
          }

          return new _AnalyticsRequest.default(this);
        }
        /**
         * Sets the program for the request.
         * It appends the program id to the request's path.
         *
         * @param {!String} program The program id
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withProgram('eBAyeGv0exc');
         */

      }, {
        key: "withProgram",
        value: function withProgram(program) {
          if (program) {
            this.program = program;
          }

          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the stage query parameter to the request.
         *
         * @param {!String} stage The stage value
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withStage('Zj7UnCAulEk');
         */

      }, {
        key: "withStage",
        value: function withStage(stage) {
          if (stage) {
            this.parameters.stage = stage;
          }

          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the eventStatus query parameter to the request.
         *
         * @param {!String} eventStatus The eventStatus value
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withEventStatus('COMPLETED');
         */

      }, {
        key: "withEventStatus",
        value: function withEventStatus(value) {
          var eventStatus = value.toUpperCase();
          var eventStatuses = new Set(['ACTIVE', 'COMPLETED', 'SCHEDULED', 'OVERDUE', 'SKIPPED']);

          if (eventStatuses.has(eventStatus)) {
            this.parameters.eventStatus = eventStatus;
          } else {
            console.warn("d2.analytics.request.withEventStatus(): \"".concat(value, "\" not listed as possible value"));
            this.parameters.eventStatus = value;
          }

          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the programStatus query parameter to the request.
         *
         * @param {!String} programStatus The programStatus value
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withProgramStatus('COMPLETED');
         */

      }, {
        key: "withProgramStatus",
        value: function withProgramStatus(value) {
          var programStatus = value.toUpperCase();
          var programStatuses = new Set(['ACTIVE', 'COMPLETED', 'CANCELLED']);

          if (programStatuses.has(programStatus)) {
            this.parameters.programStatus = programStatus;
          } else {
            console.warn("d2.analytics.request.withProgramStatus(): \"".concat(value, "\" not listed as possible value"));
            this.parameters.programStatus = value;
          }

          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the ouMode query parameter to the request.
         *
         * @param {!String} ouMode The ouMode value
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withOuMode('CHILDREN');
         */

      }, {
        key: "withOuMode",
        value: function withOuMode(value) {
          var ouMode = value.toUpperCase();
          var ouModes = new Set(['DESCENDANTS', 'CHILDREN', 'SELECTED']);

          if (ouModes.has(ouMode)) {
            this.parameters.ouMode = ouMode;
          } else {
            console.warn("d2.analytics.request.withOuMode(): \"".concat(value, "\" not listed as possible value"));
            this.parameters.ouMode = value;
          }

          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the asc query parameter to the request.
         *
         * @param {!String} value The dimensions to be sorted ascending
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withAsc('EVENTDATE');
         */

      }, {
        key: "withAsc",
        value: function withAsc(value) {
          if (value) {
            this.parameters.asc = value;
          }

          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the desc query parameter to the request.
         *
         * @param {!String} value The dimensions to be sorted descending
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withDesc('OUNAME');
         */

      }, {
        key: "withDesc",
        value: function withDesc(value) {
          if (value) {
            this.parameters.desc = value;
          }

          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the coordinatesOnly query parameter to the request.
         *
         * @param {Boolean} [coordinatesOnly=true] The coordinatesOnly value
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withCoordinatesOnly();
         */

      }, {
        key: "withCoordinatesOnly",
        value: function withCoordinatesOnly() {
          var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
          this.parameters.coordinatesOnly = flag;
          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the page query parameter to the request.
         *
         * @param {!Number} [page=1] The page number
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withPage(2);
         */

      }, {
        key: "withPage",
        value: function withPage() {
          var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
          this.parameters.page = page;
          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the pageSize query parameter to the request.
         *
         * @param {!Number} [size=50] The number of items per page
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withPageSize(10);
         */

      }, {
        key: "withPageSize",
        value: function withPageSize() {
          var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 50;
          this.parameters.pageSize = size;
          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the value query parameter to the request.
         *
         * @param {!String} value A data element or attribute identifier
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withValue('UXz7xuGCEhU');
         */

      }, {
        key: "withValue",
        value: function withValue(value) {
          // must be a data element or attribute of numeric value type
          if (value) {
            this.parameters.value = value;
          }

          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the sortOrder query parameter to the request.
         *
         * @param {!String} sortOrder The sortOrder value
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withSortOrder('DESC');
         */

      }, {
        key: "withSortOrder",
        value: function withSortOrder(value) {
          var sortOrder = value.toUpperCase();
          var sortOrders = new Set(['ASC', 'DESC']);

          if (sortOrders.has(sortOrder)) {
            this.parameters.sortOrder = sortOrder;
          } else {
            console.warn("d2.analytics.request.withSortOrder(): \"".concat(value, "\" not listed as possible value"));
            this.parameters.sortOrder = value;
          }

          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the limit query parameter to the request.
         *
         * @param {!Number} limit The maximum number of records to return
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withLimit('5000');
         */

      }, {
        key: "withLimit",
        value: function withLimit(value) {
          if (value) {
            var limit = value > 10000 ? 10000 : value;
            this.parameters.limit = limit;
          }

          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the outputType query parameter to the request.
         *
         * @param {!String} outputType The output type
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withOutputType('ENROLLMENT');
         */

      }, {
        key: "withOutputType",
        value: function withOutputType(value) {
          var type = value.toUpperCase();
          var outputTypes = new Set(['EVENT', 'ENROLLMENT', 'TRACKED_ENTITY_INSTANCE']);

          if (outputTypes.has(type)) {
            this.parameters.outputType = type;
          } else {
            console.warn("d2.analytics.request.withOutputType(): \"".concat(value, "\" not listed as possible value"));
            this.parameters.outputType = value;
          }

          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the collapseDataDimensions query parameter to the request.
         *
         * @param {Boolean} [collapseDataDimensions=true] The collapseDataDimensions value
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withCollapseDataDimensions();
         */

      }, {
        key: "withCollapseDataDimensions",
        value: function withCollapseDataDimensions() {
          var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
          this.parameters.collapseDataDimensions = flag;
          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the skipRounding query parameter to the request.
         *
         * @param {Boolean} [skipRounding=true] The skipRounding value
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withSkipRounding();
         */

      }, {
        key: "withSkipRounding",
        value: function withSkipRounding() {
          var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
          this.parameters.skipRounding = flag;
          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the aggregateData query parameter to the request.
         *
         * @param {Boolean} [aggregateData=true] The aggregateData value
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withAggregateData();
         */

      }, {
        key: "withAggregateData",
        value: function withAggregateData() {
          var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
          this.parameters.aggregateData = flag;
          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the clusterSize query parameter to the request.
         *
         * @param {!Number} clusterSize The size of cluster in meters
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withClusterSize(1000);
         */

      }, {
        key: "withClusterSize",
        value: function withClusterSize(size) {
          if (size) {
            this.parameters.clusterSize = size;
          }

          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the coordinateField query parameter to the request.
         *
         * @param {!String} [coordinateField=EVENT] The field to base geospatial event analytics on
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withCoordinateField('<attribute-id>');
         */

      }, {
        key: "withCoordinateField",
        value: function withCoordinateField() {
          var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'EVENT';
          // EVENT, <attribute-id>, <dataelement-id>
          this.parameters.coordinateField = field;
          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the bbox query parameter to the request.
         *
         * @param {!String} bbox The bounding box coordinates in the format "min lng, min lat, max lng, max lat"
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withBbox('11.1768827285209, 60.141691309755, 11.1694071634997, 60.287796722512');
         */

      }, {
        key: "withBbox",
        value: function withBbox(bbox) {
          if (bbox) {
            this.parameters.bbox = bbox;
          }

          return new _AnalyticsRequest.default(this);
        }
        /**
         * Adds the includeClusterPoints query parameter to the request.
         *
         * @param {Boolean} [includeClusterPoints=true] The includeClusterPoints value
         *
         * @returns {AnalyticsRequest} A new instance of the class for chaining purposes
         *
         * @example
         * const req = new d2.analytics.request()
         *    .withIncludeClusterPoints();
         */

      }, {
        key: "withIncludeClusterPoints",
        value: function withIncludeClusterPoints() {
          var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
          this.parameters.includeClusterPoints = flag;
          return new _AnalyticsRequest.default(this);
        }
      }]);

      return _class;
    }(base)
  );
};

var _default = AnalyticsRequestPropertiesMixin;
exports.default = _default;
//# sourceMappingURL=AnalyticsRequestPropertiesMixin.js.map