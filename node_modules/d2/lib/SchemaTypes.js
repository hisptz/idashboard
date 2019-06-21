"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("./utils");

var _check = require("./check");

var getTypes = function getTypes() {
  return ['TEXT', 'NUMBER', 'INTEGER', 'BOOLEAN', 'EMAIL', 'PASSWORD', 'URL', 'PHONENUMBER', 'GEOLOCATION', // TODO: Geo location could be an advanced type of 2 numbers / strings?
  'COLOR', 'COMPLEX', 'COLLECTION', 'REFERENCE', 'DATE', 'COMPLEX', 'IDENTIFIER', 'CONSTANT'];
};

var typeLookup = function typeLookup(propertyType) {
  if (getTypes().indexOf(propertyType) >= 0 && (0, _check.isString)(propertyType)) {
    return propertyType;
  }

  var message = ['Type from schema "', propertyType, '" not found available type list.'].join('');
  return (0, _utils.throwError)(message);
};

var SchemaTypes = {
  getTypes: getTypes,
  typeLookup: typeLookup
};
var _default = SchemaTypes;
exports.default = _default;
//# sourceMappingURL=SchemaTypes.js.map