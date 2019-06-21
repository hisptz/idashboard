"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateMonthlyPeriodsForYear = generateMonthlyPeriodsForYear;

var _helpers = require("../helpers");

function generateMonthlyPeriodsForYear() {
  var year = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.getCurrentYear)();
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';
  // eslint-disable-line import/prefer-default-export
  (0, _helpers.validateIfValueIsInteger)(year);
  var periods = [];
  var date = new Date("31 Dec ".concat(year));

  while (date.getFullYear() === year) {
    var monthName = date.toLocaleDateString(locale, {
      month: 'long'
    });
    var period = {};
    period.endDate = (0, _helpers.formatAsISODate)(date);
    date.setDate(1);
    period.startDate = (0, _helpers.formatAsISODate)(date);
    period.name = "".concat(monthName, " ").concat(date.getFullYear());
    period.id = (0, _helpers.getYYYYMM)(date);
    periods.push(period);
    date.setDate(0);
  } // Months are collected backwards. So we reverse to get the chronological order.


  return periods.reverse();
}
//# sourceMappingURL=monthly.js.map