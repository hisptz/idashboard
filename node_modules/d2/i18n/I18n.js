"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Api = _interopRequireDefault(require("../api/Api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * I18n class for dealing with translations
 */
var I18n =
/*#__PURE__*/
function () {
  function I18n() {
    var sources = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var api = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Api.default.getApi();

    _classCallCheck(this, I18n);

    this.sources = sources;
    this.api = api;
    this.strings = new Set();
    this.translations = undefined;
  }
  /**
   * Adds a .properties file to the list of sources to load translations from
   *
   * Files are loaded in the order they're added, and the first translation of each string that's encountered will be
   * used.
   *
   * @param {String} path
   */


  _createClass(I18n, [{
    key: "addSource",
    value: function addSource(path) {
      this.sources.push(path);
    }
    /**
     * Adds one or more strings to the list of strings to translate
     *
     * @param {(String[]|String)} strings
     */

  }, {
    key: "addStrings",
    value: function addStrings(strings) {
      var _this = this;

      if (typeof strings === 'string' && strings.trim().length > 0) {
        this.strings.add(strings.trim());
      } else {
        Array.from(strings).filter(function (string) {
          return string && "".concat(string).trim().length > 0;
        }).forEach(function (string) {
          return _this.strings.add(string);
        });
      }
    }
    /**
     * Load translations
     *
     * First, all properties files (specified with addSource) are loaded.
     * Then, if any untranslated strings remain, these are POSTed to the i18n endpoint of the DHIS2 API.
     *
     * @returns {Promise}
     */

  }, {
    key: "load",
    value: function load() {
      var _this2 = this;

      var i18n = this;
      i18n.translations = {};

      function parseProperties(text) {
        return text.split('\n').reduce(function (props, line) {
          var _line$split$map = line.split('=').map(function (out) {
            return out.trim();
          }),
              _line$split$map2 = _slicedToArray(_line$split$map, 2),
              key = _line$split$map2[0],
              value = _line$split$map2[1];

          if (key !== undefined && value !== undefined && !props.hasOwnProperty(key)) {
            props[key] = value // eslint-disable-line no-param-reassign
            .replace(/\\u([0-9a-f]{4})/gi, function (match, grp) {
              return String.fromCharCode(parseInt(grp, 16));
            });
          }

          return props;
        }, {});
      }

      var propFiles = [];
      this.sources.forEach(function (source) {
        propFiles.push(i18n.api.request('GET', source).then(function (data) {
          return Promise.resolve(parseProperties(data));
        }, // Resolve errors to an empty object, so that one missing file doesn't prevent
        // the rest from being loaded
        function () {
          return Promise.resolve({});
        }));
      });
      return Promise.all(propFiles).then(function (propFile) {
        propFile.forEach(function (props) {
          Object.keys(props).forEach(function (str) {
            if (!i18n.translations.hasOwnProperty(str)) {
              i18n.translations[str] = props[str];
            }

            _this2.strings.delete(str);
          });
        });

        if (_this2.strings.size > 0) {
          return i18n.api.post('i18n', Array.from(i18n.strings)).then(function (res) {
            Object.keys(res).filter(function (str) {
              return str !== res[str];
            }).forEach(function (str) {
              i18n.translations[str] = res[str];
              i18n.strings.delete(str);
            });
            return Promise.resolve(i18n.translations);
          });
        }

        return Promise.resolve(i18n.translations);
      });
    }
    /**
     * Gets the translated version of the specified string
     *
     * If no translation exists for the specified string, the string is returned as is with two asterisks on each side,
     * in order to easily identify missing translations in the UI
     *
     * @param string
     * @returns {String}
     */

  }, {
    key: "getTranslation",
    value: function getTranslation(string) {
      var variables = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (this.translations === undefined) {
        throw new Error('Tried to translate before loading translations!');
      }

      var translatedString = this.translations.hasOwnProperty(string) ? this.translations[string] : "** ".concat(string, " **");

      if (Object.keys(variables).length) {
        return translatedString.replace(/\$\$(.+?)\$\$/gi, function (match, partial) {
          return variables[partial] || '';
        });
      }

      return translatedString;
    }
    /**
     * Check if a translation exists for the specified string
     *
     * @param string
     * @returns {boolean} True if a translation exists, false otherwise
     */

  }, {
    key: "isTranslated",
    value: function isTranslated(string) {
      if (this.translations === undefined) {
        throw new Error('Tried to translate before loading translations!');
      }

      return this.translations.hasOwnProperty(string);
    }
    /**
     * Get the list of strings that don't have translations
     *
     * If no translations have been loaded yet, `undefined` is returned in stead.
     *
     * @returns {Array|undefined} Array of untranslated strings, or undefined if translations haven't been loaded
     */

  }, {
    key: "getUntranslatedStrings",
    value: function getUntranslatedStrings() {
      return this.translations ? Array.from(this.strings) : undefined;
    }
    /**
     * Return a new instance of this class
     *
     * @returns {I18n}
     */

  }], [{
    key: "getI18n",
    value: function getI18n() {
      return new I18n();
    }
  }]);

  return I18n;
}();

var _default = I18n;
exports.default = _default;
//# sourceMappingURL=I18n.js.map