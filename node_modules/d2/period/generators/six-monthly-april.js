"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateSixMonthlyAprilPeriodsForYear = generateSixMonthlyAprilPeriodsForYear;

var _helpers = require("../helpers");

function generateSixMonthlyAprilPeriodsForYear() {
  var year = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.getCurrentYear)();
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';
  // eslint-disable-line import/prefer-default-export
  (0, _helpers.validateIfValueIsInteger)(year);
  var monthNames = (0, _helpers.getMonthNamesForLocale)(locale);
  var periods = [];
  var period = {};
  period.startDate = "".concat(year, "-04-01");
  period.endDate = "".concat(year, "-09-30");
  period.name = "".concat(monthNames[3], " - ").concat(monthNames[8], " ").concat(year);
  period.iso = "".concat(year, "AprilS1");
  period.id = period.iso;
  periods.push(period);
  period = {};
  period.startDate = "".concat(year, "-10-01");
  period.endDate = "".concat(year + 1, "-03-31");
  period.name = "".concat(monthNames[9], " ").concat(year, " - ").concat(monthNames[2], " ").concat(year + 1);
  period.iso = "".concat(year, "AprilS2");
  period.id = period.iso;
  periods.push(period);
  return periods;
}
//# sourceMappingURL=six-monthly-april.js.map