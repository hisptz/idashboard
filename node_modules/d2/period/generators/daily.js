"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateDailyPeriodsForYear = generateDailyPeriodsForYear;

var _helpers = require("../helpers");

var _formatters = require("../formatters");

/**
 * Generate daily periods for the given year.
 *
 * @private
 * @param {Integer} [year=getCurrentYear()] The year to generate the daily periods for.
 */
function generateDailyPeriodsForYear() {
  var year = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.getCurrentYear)();
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';
  // eslint-disable-line import/prefer-default-export
  (0, _helpers.validateIfValueIsInteger)(year);
  var periods = [];
  var date = new Date(year, 0, 1); // As long as we are within the current year create daily periods

  while (date.getFullYear() === year) {
    var formattedDate = (0, _helpers.formatAsISODate)(date);
    var period = {
      startDate: formattedDate,
      endDate: formattedDate,
      name: (0, _formatters.toLocaleDayFormat)(date, locale),
      id: formattedDate.replace(/-/g, '')
    };
    periods.push(period); // Advance to the next day
    // date.setDate(date.getDate() + 1);

    date = (0, _helpers.addDays)(1, date);
  }

  return periods;
}
//# sourceMappingURL=daily.js.map