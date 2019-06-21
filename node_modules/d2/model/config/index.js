"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultValuesForModelType = getDefaultValuesForModelType;
exports.fieldsForSchemas = exports.defaultValues = void 0;

var _organisationUnitGroupSet = _interopRequireDefault(require("./model-defaults/organisationUnitGroupSet"));

var _category = _interopRequireDefault(require("./model-defaults/category"));

var _categoryOptionGroupSet = _interopRequireDefault(require("./model-defaults/categoryOptionGroupSet"));

var _dataElement = _interopRequireDefault(require("./model-defaults/dataElement"));

var _dataElementGroupSet = _interopRequireDefault(require("./model-defaults/dataElementGroupSet"));

var _dataSet = _interopRequireDefault(require("./model-defaults/dataSet"));

var _externalMapLayer = _interopRequireDefault(require("./model-defaults/externalMapLayer"));

var _validationNotificationTemplate = _interopRequireDefault(require("./model-defaults/validationNotificationTemplate"));

var _validationRule = _interopRequireDefault(require("./model-defaults/validationRule"));

var _program = _interopRequireDefault(require("./model-defaults/program"));

var _programNotificationTemplate = _interopRequireDefault(require("./model-defaults/programNotificationTemplate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultValues = new Map([['organisationUnitGroupSet', _organisationUnitGroupSet.default], ['category', _category.default], ['categoryOptionGroupSet', _categoryOptionGroupSet.default], ['dataElement', _dataElement.default], ['dataElementGroupSet', _dataElementGroupSet.default], ['dataSet', _dataSet.default], ['externalMapLayer', _externalMapLayer.default], ['validationNotificationTemplate', _validationNotificationTemplate.default], ['validationRule', _validationRule.default], ['program', _program.default], ['programNotificationTemplate', _programNotificationTemplate.default]]);
exports.defaultValues = defaultValues;

function getDefaultValuesForModelType(modelDefinitionName) {
  if (defaultValues.has(modelDefinitionName)) {
    return defaultValues.get(modelDefinitionName);
  }

  return {};
}

var schemaFields = ['apiEndpoint', 'name', 'displayName', 'authorities', 'singular', 'plural', 'shareable', 'metadata', 'klass', 'identifiableObject', 'translatable'];
var schemaPropertyFields = ['href', 'writable', 'collection', 'collectionName', 'name', 'propertyType', 'persisted', 'required', 'min', 'max', 'ordered', 'unique', 'constants', 'owner', 'itemPropertyType', 'translationKey', 'embeddedObject'];
var fieldsForSchemas = schemaFields.concat("properties[".concat(schemaPropertyFields.join(','), "]")).join(',');
exports.fieldsForSchemas = fieldsForSchemas;
//# sourceMappingURL=index.js.map