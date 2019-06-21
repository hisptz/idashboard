"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPeriodGeneratorsForLocale = createPeriodGeneratorsForLocale;

var _daily = require("./daily");

var _weekly = require("./weekly");

var _monthly = require("./monthly");

var _biMonthly = require("./bi-monthly");

var _quarterly = require("./quarterly");

var _sixMonthly = require("./six-monthly");

var _sixMonthlyApril = require("./six-monthly-april");

var _yearly = require("./yearly");

var _financialOctober = require("./financial-october");

var _financialJuly = require("./financial-july");

var _financialApril = require("./financial-april");

/**
 * @module period/generators
 */

/**
 *
 * @param locale
 * @returns {{generateDailyPeriodsForYear: (function(*=): *), generateWeeklyPeriodsForYear: (function(*=): *), generateMonthlyPeriodsForYear: (function(*=): *), generateBiMonthlyPeriodsForYear: (function(*=): *), generateQuarterlyPeriodsForYear: (function(*=): *), generateSixMonthlyPeriodsForYear: (function(*=): *), generateSixMonthlyAprilPeriodsForYear: (function(*=): *), generateYearlyPeriodsUpToYear: (function(*=, *=): *), generateFinancialOctoberPeriodsUpToYear: (function(*=, *=): *), generateFinancialJulyPeriodsUpToYear: (function(*=, *=): *), generateFinancialAprilPeriodsUpToYear: (function(*=, *=): *)}}
 */
function createPeriodGeneratorsForLocale() {
  var locale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'en';
  // eslint-disable-line import/prefer-default-export
  return {
    generateDailyPeriodsForYear: function generateDailyPeriodsForYear(year) {
      return (0, _daily.generateDailyPeriodsForYear)(year, locale);
    },
    generateWeeklyPeriodsForYear: function generateWeeklyPeriodsForYear(year) {
      return (0, _weekly.generateWeeklyPeriodsForYear)(year, locale);
    },
    generateMonthlyPeriodsForYear: function generateMonthlyPeriodsForYear(year) {
      return (0, _monthly.generateMonthlyPeriodsForYear)(year, locale);
    },
    generateBiMonthlyPeriodsForYear: function generateBiMonthlyPeriodsForYear(year) {
      return (0, _biMonthly.generateBiMonthlyPeriodsForYear)(year, locale);
    },
    generateQuarterlyPeriodsForYear: function generateQuarterlyPeriodsForYear(year) {
      return (0, _quarterly.generateQuarterlyPeriodsForYear)(year, locale);
    },
    generateSixMonthlyPeriodsForYear: function generateSixMonthlyPeriodsForYear(year) {
      return (0, _sixMonthly.generateSixMonthlyPeriodsForYear)(year, locale);
    },
    generateSixMonthlyAprilPeriodsForYear: function generateSixMonthlyAprilPeriodsForYear(year) {
      return (0, _sixMonthlyApril.generateSixMonthlyAprilPeriodsForYear)(year, locale);
    },
    generateYearlyPeriodsUpToYear: function generateYearlyPeriodsUpToYear(year, numberOfYears) {
      return (0, _yearly.generateYearlyPeriodsUpToYear)(year, numberOfYears, locale);
    },
    generateFinancialOctoberPeriodsUpToYear: function generateFinancialOctoberPeriodsUpToYear(year, numberOfYears) {
      return (0, _financialOctober.generateFinancialOctoberPeriodsUpToYear)(year, numberOfYears, locale);
    },
    generateFinancialJulyPeriodsUpToYear: function generateFinancialJulyPeriodsUpToYear(year, numberOfYears) {
      return (0, _financialJuly.generateFinancialJulyPeriodsUpToYear)(year, numberOfYears, locale);
    },
    generateFinancialAprilPeriodsUpToYear: function generateFinancialAprilPeriodsUpToYear(year, numberOfYears) {
      return (0, _financialApril.generateFinancialAprilPeriodsUpToYear)(year, numberOfYears, locale);
    }
  };
}
//# sourceMappingURL=index.js.map