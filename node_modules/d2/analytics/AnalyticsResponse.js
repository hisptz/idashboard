"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AnalyticsResponseHeader = _interopRequireDefault(require("./AnalyticsResponseHeader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var booleanMap = {
  0: 'No',
  // XXX i18n.no || 'No',
  1: 'Yes' // i18n.yes || 'Yes',

};
var OUNAME = 'ouname';
var OU = 'ou';
var DEFAULT_COLLECT_IGNORE_HEADERS = ['psi', 'ps', 'eventdate', 'longitude', 'latitude', 'ouname', 'oucode', 'eventdate', 'eventdate'];
var DEFAULT_PREFIX_IGNORE_HEADERS = ['dy'].concat(DEFAULT_COLLECT_IGNORE_HEADERS);

var getParseMiddleware = function getParseMiddleware(type) {
  switch (type) {
    case 'STRING':
    case 'TEXT':
      return function (value) {
        return "".concat(value);
      };

    case 'INTEGER':
    case 'NUMBER':
      return function (value) {
        return !Number.isNaN(+value) && Number.isFinite(+value) ? parseFloat(+value) : value;
      };

    default:
      return function (value) {
        return value;
      };
  }
};

var isPrefixHeader = function isPrefixHeader(header, dimensions) {
  if (DEFAULT_PREFIX_IGNORE_HEADERS.includes(header.name)) {
    return false;
  }

  return Boolean(Array.isArray(dimensions) && dimensions.length === 0);
};

var isCollectHeader = function isCollectHeader(header, dimensions) {
  if (DEFAULT_COLLECT_IGNORE_HEADERS.includes(header.name)) {
    return false;
  }

  return Boolean(Array.isArray(dimensions) && dimensions.length === 0);
};

var getPrefixedId = function getPrefixedId(id, prefix) {
  return "".concat(prefix || '', " ").concat(id);
};

var getNameByIdsByValueType = function getNameByIdsByValueType(id, valueType) {
  if (valueType === 'BOOLEAN') {
    return booleanMap[id];
  }

  return id;
};

var AnalyticsResponse =
/*#__PURE__*/
function () {
  function AnalyticsResponse(response) {
    _classCallCheck(this, AnalyticsResponse);

    if (response) {
      this.response = response;
      this.headers = this.extractHeaders();
      this.rows = this.extractRows();
      this.metaData = this.extractMetadata();
    }
  }

  _createClass(AnalyticsResponse, [{
    key: "extractHeaders",
    value: function extractHeaders() {
      var dimensions = this.response.metaData.dimensions;
      var headers = this.response.headers || [];
      return headers.map(function (header, index) {
        return new _AnalyticsResponseHeader.default(header, {
          isPrefix: isPrefixHeader(header, dimensions[header.name]),
          isCollect: isCollectHeader(header, dimensions[header.name]),
          index: index
        });
      });
    }
  }, {
    key: "extractRows",
    value: function extractRows() {
      var headersWithOptionSet = this.headers.filter(function (header) {
        return header.optionSet;
      });
      var rows = this.response.rows;

      if (headersWithOptionSet.length) {
        rows = rows.slice();
        var optionCodeIdMap = this.optionCodeIdMap(); // replace option code with option uid

        headersWithOptionSet.forEach(function (header) {
          rows.forEach(function (row, index) {
            var id = optionCodeIdMap[header.name][row[header.index]];

            if (id) {
              rows[index][header.index] = id;
            }
          });
        });
      }

      return rows;
    }
  }, {
    key: "extractMetadata",
    value: function extractMetadata() {
      var _this = this;

      var metaData = _objectSpread({}, this.response.metaData);

      var dimensions = metaData.dimensions,
          items = metaData.items; // populate metaData dimensions and items

      this.headers.filter(function (header) {
        return !DEFAULT_COLLECT_IGNORE_HEADERS.includes(header.name);
      }).forEach(function (header) {
        var ids; // collect row values

        if (header.isCollect) {
          ids = _this.getSortedUniqueRowIdStringsByHeader(header);
          dimensions[header.name] = ids;
        } else {
          ids = dimensions[header.name];
        }

        if (header.isPrefix) {
          // create prefixed dimensions array
          dimensions[header.name] = ids.map(function (id) {
            return getPrefixedId(id, header.name);
          }); // create items

          dimensions[header.name].forEach(function (prefixedId, index) {
            var id = ids[index];
            var valueType = header.valueType;
            var name = getNameByIdsByValueType(id, valueType);
            items[prefixedId] = {
              name: name
            };
          });
        }
      }); // for events, add items from 'ouname'

      if (this.hasHeader(OUNAME) && this.hasHeader(OU)) {
        var ouNameHeaderIndex = this.getHeader(OUNAME).getIndex();
        var ouHeaderIndex = this.getHeader(OU).getIndex();
        var ouId;
        var ouName;
        this.rows.forEach(function (row) {
          ouId = row[ouHeaderIndex];

          if (items[ouId] === undefined) {
            ouName = row[ouNameHeaderIndex];
            items[ouId] = {
              name: ouName
            };
          }
        });
      }

      return metaData;
    }
  }, {
    key: "getHeader",
    value: function getHeader(name) {
      return this.headers.find(function (header) {
        return header.name === name;
      });
    }
  }, {
    key: "hasHeader",
    value: function hasHeader(name) {
      return this.getHeader(name) !== undefined;
    }
  }, {
    key: "getSortedUniqueRowIdStringsByHeader",
    value: function getSortedUniqueRowIdStringsByHeader(header) {
      var parseByType = getParseMiddleware(header.valueType);
      var parseString = getParseMiddleware('STRING');
      var rowIds = Array.from( // unique values
      new Set(this.rows.map(function (responseRow) {
        return parseByType(responseRow[header.index]);
      })) // remove empty values
      ).filter(function (id) {
        return id !== '';
      });
      return rowIds.sort().map(function (id) {
        return parseString(id);
      });
    }
  }, {
    key: "optionCodeIdMap",
    value: function optionCodeIdMap() {
      var _this$response$metaDa = this.response.metaData,
          dimensions = _this$response$metaDa.dimensions,
          items = _this$response$metaDa.items;
      var map = {};
      this.headers.filter(function (header) {
        return typeof header.optionSet === 'string';
      }).forEach(function (header) {
        var optionIds = dimensions[header.name];
        map[header.name] = optionIds.map(function (id) {
          return _defineProperty({}, items[id].code, id);
        }).reduce(function (acc, obj) {
          return Object.assign(acc, obj);
        }, {});
      });
      return map;
    }
  }, {
    key: "sortOrganisationUnitsHierarchy",
    value: function sortOrganisationUnitsHierarchy() {
      var _this2 = this;

      var organisationUnits = this.metaData.dimensions.ou;
      organisationUnits.forEach(function (organisationUnit, i) {
        var hierarchyPrefix = _this2.metaData.ouHierarchy[organisationUnit];
        var hierarchyIds = [organisationUnit];
        var hierarchyNames = [];
        hierarchyPrefix.split('/').reverse().forEach(function (ouId) {
          hierarchyIds.unshift(ouId);
        });
        hierarchyIds.forEach(function (ouId) {
          if (_this2.metaData.items[ouId]) {
            hierarchyNames.push(_this2.metaData.items[ouId].name);
          }
        });
        organisationUnits[i] = {
          id: organisationUnit,
          fullName: hierarchyNames.join(' / ')
        };
      }); // XXX how does this work with different languages/collations?

      organisationUnits.sort(function (a, b) {
        var aFullName = a.fullName;
        var bFullName = b.fullName;

        if (aFullName < bFullName) {
          return -1;
        }

        return aFullName > bFullName ? 1 : 0;
      });
      this.metaData.dimensions.ou = organisationUnits.map(function (ou) {
        return ou.id;
      });
    }
  }]);

  return AnalyticsResponse;
}();

var _default = AnalyticsResponse;
exports.default = _default;
//# sourceMappingURL=AnalyticsResponse.js.map