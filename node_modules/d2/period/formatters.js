"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toLocaleDayFormat = toLocaleDayFormat;
// For 'en': January 1, 2017
// For 'nl': 1 januari 2017
// For 'zh': 2017年1月1日
var localeDayFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

var getFormatterMemoized = function () {
  var formatters = new Map();
  return function (locale, options) {
    if (formatters.has(locale) && formatters.get(locale).has(options)) {
      return formatters.get(locale).get(options);
    }

    var formatter = new Intl.DateTimeFormat(locale, options);
    formatters.set(locale, new Map([[options, formatter]]));
    return formatter;
  };
}();

function toLocaleDayFormat(date) {
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';
  // eslint-disable-line import/prefer-default-export
  return getFormatterMemoized(locale, localeDayFormatOptions).format(date);
}
//# sourceMappingURL=formatters.js.map