"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateFinancialAprilPeriodsUpToYear = generateFinancialAprilPeriodsUpToYear;

var _check = require("../../lib/check");

var _helpers = require("../helpers");

function generateFinancialAprilPeriodsUpToYear() {
  var year = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.getCurrentYear)();
  var numberOfYears = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'en';
  // eslint-disable-line import/prefer-default-export
  (0, _helpers.validateIfValueIsInteger)(year);

  if (!(0, _check.isInteger)(numberOfYears) || numberOfYears < 1) {
    throw new Error('FinancialApril generator parameter `numberOfYears` should be an integer larger than 0.');
  }

  var periods = [];
  var date = new Date(year + 1, 2, 31);
  var monthNames = (0, _helpers.getMonthNamesForLocale)(locale);

  for (var i = 0; i < numberOfYears; i++) {
    var period = {};
    period.endDate = (0, _helpers.formatAsISODate)(date);
    date.setYear(date.getFullYear() - 1);
    date.setDate(date.getDate() + 1);
    period.startDate = (0, _helpers.formatAsISODate)(date);
    period.name = "".concat(monthNames[3], " ").concat(date.getFullYear(), " - ").concat(monthNames[2], " ").concat(date.getFullYear() + 1);
    period.id = "".concat(date.getFullYear(), "April");
    periods.push(period);
    date.setDate(date.getDate() - 1);
  } // FinancialApril periods are collected backwards.


  return periods.reverse();
}
//# sourceMappingURL=financial-april.js.map