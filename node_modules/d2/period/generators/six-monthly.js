"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateSixMonthlyPeriodsForYear = generateSixMonthlyPeriodsForYear;

var _helpers = require("../helpers");

function generateSixMonthlyPeriodsForYear() {
  var year = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.getCurrentYear)();
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';
  // eslint-disable-line import/prefer-default-export
  (0, _helpers.validateIfValueIsInteger)(year);
  var monthNames = (0, _helpers.getMonthNamesForLocale)(locale);
  return [{
    startDate: "".concat(year, "-01-01"),
    endDate: "".concat(year, "-06-30"),
    name: "".concat(monthNames[0], " - ").concat(monthNames[5], " ").concat(year),
    id: "".concat(year, "S1")
  }, {
    startDate: "".concat(year, "-07-01"),
    endDate: "".concat(year, "-12-31"),
    name: "".concat(monthNames[6], " - ").concat(monthNames[11], " ").concat(year),
    id: "".concat(year, "S2")
  }];
}
//# sourceMappingURL=six-monthly.js.map