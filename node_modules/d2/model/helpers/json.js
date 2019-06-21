"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getJSONForProperties = getJSONForProperties;
exports.getOwnedPropertyJSON = getOwnedPropertyJSON;

var _check = require("../../lib/check");

var _utils = require("../../lib/utils");

/**
 * Map propertyName to modelType
 * The model with propertyName will be treated as a regular array
 * (no collection) if the combination of [propertyName, modelType] exists in the object
 * Empty arrays means it applies to any modelType.
 *
 * @private
 */
var NON_MODEL_COLLECTIONS = {
  aggregationLevels: ['dataElement'],
  grantTypes: ['oAuth2Client'],
  translations: [],
  deliveryChannels: ['programNotificationTemplate', 'dataSetNotificationTemplate'],
  redirectUris: ['oAuth2Client'],
  organisationUnitLevels: ['validationRule'],
  favorites: [],
  columns: [],
  rows: [],
  filters: [],
  yearlySeries: [],
  interpretations: ['chart']
};

var isNonModelCollection = function isNonModelCollection(propertyName, modelType) {
  var modelTypes = NON_MODEL_COLLECTIONS[propertyName];

  if (!modelTypes) {
    return false;
  }

  return (0, _check.contains)(modelType, modelTypes) || (0, _check.isEmpty)(modelTypes);
};

function isPlainValue(collection) {
  return function isPlainValueInCollection(property) {
    return collection.indexOf(property) === -1;
  };
}

function isCollectionProperty(collection) {
  return function (property) {
    return !isPlainValue(collection)(property);
  };
}

function isReferenceProperty(collection) {
  return function (property) {
    return collection.indexOf(property) >= 0;
  };
} // TODO: Misnamed as it does not actually return JSON


function getJSONForProperties(model, properties) {
  var keepFullModels = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var objectToSave = {};
  var collectionPropertiesNames = model.getCollectionChildrenPropertyNames() // Even though attributeValues are considered collections, they are handled separately due to their
  // difference in structure.
  .filter(function (propertyName) {
    return propertyName !== 'attributeValues';
  });
  var propertyNames = Object.keys(model.modelDefinition.modelValidations).filter(function (propertyName) {
    return properties.indexOf(propertyName) >= 0;
  }).filter(function (propertyName) {
    return model.dataValues[propertyName] !== undefined && model.dataValues[propertyName] !== null;
  }); // Handle plain values

  propertyNames.filter(isPlainValue(collectionPropertiesNames)).filter(function (v) {
    return !isReferenceProperty(model.getReferenceProperties())(v);
  }).forEach(function (propertyName) {
    objectToSave[propertyName] = model.dataValues[propertyName];
  }); // Handle reference properties

  propertyNames.filter(isPlainValue(collectionPropertiesNames)).filter(isReferenceProperty(model.getReferenceProperties())).forEach(function (propertyName) {
    objectToSave[propertyName] = {
      id: model.dataValues[propertyName].id
    };
  }); // Handle non-embedded collection properties

  propertyNames.filter(isCollectionProperty(collectionPropertiesNames)).forEach(function (propertyName) {
    // TODO: This is not the proper way to do this. We should check if the array contains Models
    // These objects are not marked as embedded objects but they behave like they are
    if (isNonModelCollection(propertyName, model.modelDefinition.name)) {
      objectToSave[propertyName] = Array.from(model.dataValues[propertyName]);
      return;
    }

    var values = Array.isArray(model.dataValues[propertyName]) ? model.dataValues[propertyName] : Array.from(model.dataValues[propertyName].values()); // If the collection is a embedded collection we can save it as is.

    if (model.getEmbeddedObjectCollectionPropertyNames().indexOf(propertyName) !== -1) {
      objectToSave[propertyName] = values;
      return;
    } // Transform an object collection to an array of objects with id properties


    objectToSave[propertyName] = values.filter((0, _utils.pick)('id')) // For any other types we return an object with just an id
    .map(function (childModel) {
      if (keepFullModels && (0, _check.isFunction)(childModel.clone)) {
        return childModel.clone();
      }

      return {
        id: childModel.id
      };
    });
  });
  return objectToSave;
} // TODO: Misnamed as it does not actually return JSON


function getOwnedPropertyJSON(model) {
  var ownedProperties = model.modelDefinition.getOwnedPropertyNames();
  return getJSONForProperties(model, ownedProperties);
}
//# sourceMappingURL=json.js.map