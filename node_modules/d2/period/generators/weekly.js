"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateWeeklyPeriodsForYear = generateWeeklyPeriodsForYear;

var _helpers = require("../helpers");

/**
 * Generate weekly periods types
 *
 * @private
 *
 * @param {Integer} [year] The year to generate the weeks for.
 */
function generateWeeklyPeriodsForYear() {
  var year = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _helpers.getCurrentYear)();
  // eslint-disable-line import/prefer-default-export
  (0, _helpers.validateIfValueIsInteger)(year);
  var periods = [];
  var weeksInYear = (0, _helpers.is53WeekISOYear)(year) ? 53 : 52;
  var startDate = (0, _helpers.getFirstDayInFirstISOWeekForYear)(year);

  for (var week = 1; week <= weeksInYear; week += 1) {
    var endDate = (0, _helpers.getLastDayOfTheWeekForFirstDayOfTheWeek)(startDate);
    var period = {
      startDate: (0, _helpers.formatAsISODate)(startDate),
      endDate: (0, _helpers.formatAsISODate)(endDate),
      name: "W".concat(week, " - ").concat((0, _helpers.formatAsISODate)(startDate), " - ").concat((0, _helpers.formatAsISODate)(endDate)),
      id: "".concat(year, "W").concat(week)
    };
    periods.push(period); // Go to the start of the next week +7 days

    startDate = (0, _helpers.addDays)(7, startDate);
  }

  return periods;
}
//# sourceMappingURL=weekly.js.map