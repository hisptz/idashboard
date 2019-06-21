"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateUid = generateUid;
exports.isValidUid = isValidUid;

/**
 * @module uid
 *
 * @description
 * Client side implementation of the DHIS2 code (uid) generator.
 * ({@link https://github.com/dhis2/dhis2-core/blob/ad2d5dea959aff3146d8fe5796cf0b75eb6ee5d8/dhis-2/dhis-api/src/main/java/org/hisp/dhis/common/CodeGenerator.java|CodeGenerator.java})
 *
 * This module is used to generate and validate DHIS2 uids. A valid DHIS2 uid is a 11 character string which starts with a letter from the ISO basic Latin alphabet.
 */
var abc = 'abcdefghijklmnopqrstuvwxyz';
var letters = abc.concat(abc.toUpperCase());
var ALLOWED_CHARS = "0123456789".concat(letters);
var NUMBER_OF_CODEPOINTS = ALLOWED_CHARS.length;
var CODESIZE = 11;
var CODE_PATTERN = /^[a-zA-Z]{1}[a-zA-Z0-9]{10}$/;

function randomWithMax(max) {
  return Math.floor(Math.random() * max);
}
/**
 * Generate a valid DHIS2 uid. A valid DHIS2 uid is a 11 character string which starts with a letter from the ISO basic Latin alphabet.
 *
 * @return {string} A 11 character uid that always starts with a letter.
 *
 * @example
 * import { generateUid } from 'd2/lib/uid';
 *
 * generateUid();
 */


function generateUid() {
  // First char should be a letter
  var randomChars = letters.charAt(randomWithMax(letters.length));

  for (var i = 1; i < CODESIZE; i += 1) {
    randomChars += ALLOWED_CHARS.charAt(randomWithMax(NUMBER_OF_CODEPOINTS));
  } // return new String( randomChars );


  return randomChars;
}
/**
 * Tests whether the given code is valid.
 *
 * @param {string} code The code to validate.
 * @return {boolean} Returns true if the code is valid, false otherwise.
 *
 * @example
 * import { isValidUid } from 'd2/lib/uid';
 *
 * isValidUid('JkWynlWMjJR'); // true
 * isValidUid('0kWynlWMjJR'); // false (Uid can not start with a number)
 * isValidUid('AkWy$lWMjJR'); // false (Uid can only contain alphanumeric characters.
 */


function isValidUid(code) {
  if (code == null) {
    // eslint-disable-line eqeqeq
    return false;
  }

  return CODE_PATTERN.test(code);
}
//# sourceMappingURL=uid.js.map