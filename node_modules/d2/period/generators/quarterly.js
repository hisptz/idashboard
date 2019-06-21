"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateQuarterlyPeriodsForYear = generateQuarterlyPeriodsForYear;

var _helpers = require("../helpers");

/**
 * Generate Quarterly periods for a year.
 *
 * This will generate four quarters for a given year. The generated quarterly periods looks as follows.
 *
 * {
 *   startDate: '2017-10-01',
 *   endDate: '2017-12-31',
 *   name: 'October - December 2017',
 *   id: '2017Q4',
 * }
 *
 * The id is an unofficial ISO 8601 style notation for quarters. The old period generator used to have
 * and `iso` field but as some of the notations are not official ISO 8601 notations this property has been removed.
 * In most cases the `id` property contained the same value so this can be used instead.
 *
 * @private
 *
 * @param {Integer} [year=new Date().getFullYear()] The year to generate the daily periods for.
 * @param {String} [locale='en-gb'] The locale to use when getting month names.
 */
function generateQuarterlyPeriodsForYear() {
  var year = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.getCurrentYear)();
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en-gb';
  // eslint-disable-line import/prefer-default-export
  (0, _helpers.validateIfValueIsInteger)(year);
  var periods = [];
  var date = new Date("31 Dec ".concat(year));
  var quarter = 4;
  var monthNames = (0, _helpers.getMonthNamesForLocale)(locale);

  while (date.getFullYear() === year) {
    var period = {};
    period.endDate = (0, _helpers.formatAsISODate)(date);
    date.setDate(0);
    date.setDate(0);
    date.setDate(1);
    period.startDate = (0, _helpers.formatAsISODate)(date);
    period.name = "".concat(monthNames[date.getMonth()], " - ").concat(monthNames[date.getMonth() + 2], " ").concat(date.getFullYear());
    period.id = "".concat(year, "Q").concat(quarter);
    periods.push(period);
    date.setDate(0);
    quarter -= 1;
  } // Quarters are collected backwards. So we reverse to get the chronological order.


  return periods.reverse();
}
//# sourceMappingURL=quarterly.js.map