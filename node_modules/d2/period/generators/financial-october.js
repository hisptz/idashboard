"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateFinancialOctoberPeriodsUpToYear = generateFinancialOctoberPeriodsUpToYear;

var _check = require("../../lib/check");

var _helpers = require("../helpers");

function generateFinancialOctoberPeriodsUpToYear() {
  var year = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.getCurrentYear)();
  var numberOfYears = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'en';
  // eslint-disable-line import/prefer-default-export
  (0, _helpers.validateIfValueIsInteger)(year);

  if (!(0, _check.isInteger)(numberOfYears) || numberOfYears < 1) {
    throw new Error('FinancialOctober generator parameter `numberOfYears` should be an integer larger than 0.');
  }

  var periods = [];
  var date = new Date("30 Sep ".concat(year + 1));
  var monthNames = (0, _helpers.getMonthNamesForLocale)(locale);

  for (var i = 0; i < numberOfYears; i++) {
    var period = {};
    period.endDate = (0, _helpers.formatAsISODate)(date);
    date.setYear(date.getFullYear() - 1);
    date.setDate(date.getDate() + 1);
    period.startDate = (0, _helpers.formatAsISODate)(date);
    period.name = "".concat(monthNames[9], " ").concat(date.getFullYear(), " - ").concat(monthNames[8], " ").concat(date.getFullYear() + 1);
    period.id = "".concat(date.getFullYear(), "Oct");
    periods.push(period);
    date.setDate(date.getDate() - 1);
  } // FinancialOctober periods are collected backwards. If isReverse is true, then do nothing. Else reverse to correct order and return.


  return periods.reverse();
}
//# sourceMappingURL=financial-october.js.map