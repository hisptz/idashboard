"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateBiMonthlyPeriodsForYear = generateBiMonthlyPeriodsForYear;

var _helpers = require("../helpers");

function generateBiMonthlyPeriodsForYear() {
  var year = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.getCurrentYear)();
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';
  // eslint-disable-line import/prefer-default-export
  (0, _helpers.validateIfValueIsInteger)(year);
  var periods = [];
  var date = new Date("31 Dec ".concat(year));

  while (date.getFullYear() === year) {
    var period = {};
    period.endDate = (0, _helpers.formatAsISODate)(date);
    date.setDate(0);
    date.setDate(1);
    var firstMonth = date.toLocaleDateString(locale, {
      month: 'long'
    });
    var lastMonth = (0, _helpers.addMonths)(1, date).toLocaleDateString(locale, {
      month: 'long'
    });
    period.startDate = (0, _helpers.formatAsISODate)(date);
    period.name = "".concat(firstMonth, " - ").concat(lastMonth, " ").concat(date.getFullYear());
    period.id = (0, _helpers.getBiMonthlyId)(date);
    periods.push(period);
    date.setDate(0);
  } // Bi-months are collected backwards. So we reverse to get the chronological order.


  return periods.reverse();
}
//# sourceMappingURL=bi-monthly.js.map