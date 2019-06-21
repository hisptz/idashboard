"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _check = require("../../lib/check");

var _utils = require("../../lib/utils");

var getValue = (0, _utils.pick)('value');
var getAttributeValueAttributeName = (0, _utils.pick)('attribute.name');

function createPropertyDefinitionsForAttributes(attributeProperties, getAttributeValues, setAttributeValues, setDirty) {
  return Object.keys(attributeProperties).reduce(function (propertyDefinitions, attributeName) {
    propertyDefinitions[attributeName] = {
      // eslint-disable-line no-param-reassign
      enumerable: true,
      get: function get() {
        var attributeValues = getAttributeValues();
        return attributeValues.filter(function (attributeValue) {
          return getAttributeValueAttributeName(attributeValue) === attributeName;
        }).reduce(function (current, attributeValue) {
          return attributeValue.value;
        }, undefined);
      },
      set: function set(value) {
        var attributeValue = getAttributeValues().filter(function (av) {
          return av.attribute.name === attributeName;
        }).reduce(function (current, av) {
          return av;
        }, undefined);

        if ((0, _check.areDefinedAndEqual)(getValue(attributeValue), value)) {
          return; // Don't do anything if the value stayed the same
        }

        if (attributeValue) {
          // Remove the attributeValue from the array of attributeValues on the object
          // This is done because the server can not handle them properly when empty strings
          // as values are sent. It will properly remove the attributeValue
          // on the server side when they are not being send to the server at all.
          if ((0, _check.isNullUndefinedOrEmptyString)(value)) {
            var remainingAttributeValues = getAttributeValues().filter(function (av) {
              return av !== attributeValue;
            });
            setAttributeValues(remainingAttributeValues);
          }

          attributeValue.value = value;
        } else {
          // Add the new attribute value to the attributeValues collection
          setAttributeValues(getAttributeValues().concat({
            value: value,
            attribute: {
              id: attributeProperties[attributeName].id,
              name: attributeProperties[attributeName].name
            }
          }));
        } // Set the model to be dirty


        setDirty();
      }
    };
    return propertyDefinitions;
  }, {});
}

var _default = createPropertyDefinitionsForAttributes;
exports.default = _default;
//# sourceMappingURL=attibutes.js.map