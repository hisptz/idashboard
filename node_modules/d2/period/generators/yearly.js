"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateYearlyPeriodsUpToYear = generateYearlyPeriodsUpToYear;

var _check = require("../../lib/check");

var _helpers = require("../helpers");

function generateYearlyPeriodsUpToYear() {
  var year = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.getCurrentYear)();
  var numberOfYears = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  // eslint-disable-line import/prefer-default-export
  (0, _helpers.validateIfValueIsInteger)(year);

  if (!(0, _check.isInteger)(numberOfYears) || numberOfYears < 1) {
    throw new Error('Yearly generator parameter `numberOfYears` should be an integer larger than 0.');
  }

  var periods = [];
  var date = new Date("31 Dec ".concat(year));

  while (year - date.getFullYear() < numberOfYears) {
    var period = {};
    period.endDate = (0, _helpers.formatAsISODate)(date);
    date.setMonth(0, 1);
    period.startDate = (0, _helpers.formatAsISODate)(date);
    period.name = date.getFullYear().toString();
    period.id = date.getFullYear().toString();
    periods.push(period);
    date.setDate(0);
  } // Years are collected backwards. If isReverse is true, then do nothing. Else reverse to correct order and return.


  return periods.reverse();
}
//# sourceMappingURL=yearly.js.map