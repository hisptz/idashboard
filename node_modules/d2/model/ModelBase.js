"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DIRTY_PROPERTY_LIST = void 0;

var _ModelValidation = _interopRequireDefault(require("./ModelValidation"));

var _json = require("./helpers/json");

var _models = require("./helpers/models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var modelValidator = _ModelValidation.default.getModelValidation();

var DIRTY_PROPERTY_LIST = Symbol('List to keep track of dirty properties');
/**
 * Base class that supplies functionality to the Model classes
 *
 * @memberof module:model
 */

exports.DIRTY_PROPERTY_LIST = DIRTY_PROPERTY_LIST;

var ModelBase =
/*#__PURE__*/
function () {
  function ModelBase() {
    _classCallCheck(this, ModelBase);

    var modelValidations = {
      modelValidations: {}
    };
    Object.defineProperty(this, 'modelDefinition', {
      writable: true,
      value: modelValidations
    });
  }
  /**
   * @returns {Promise} Returns a promise that resolves when the model has been saved or rejected with the result from
   * the `validate()` call.
   *
   * @definition
   * Will save model as a new object to the server using a POST request. This method would generally be used if
   * you're creating models with pre-specified IDs. Note that this does not check if the model is marked as dirty.
   */


  _createClass(ModelBase, [{
    key: "create",
    value: function create() {
      var _this = this;

      return this.validate().then(function (validationState) {
        if (!validationState.status) {
          return Promise.reject(validationState);
        }

        return _this.modelDefinition.saveNew(_this).then(function (apiResponse) {
          return _models.updateModelFromResponseStatus.call(_this, apiResponse);
        });
      });
    }
    /**
     * @returns {Promise} Returns a promise that resolves when the model has been saved
     * or rejects with the result from the `validate()` call.
     *
     * @description
     * Checks if the model is dirty. When the model is dirty it will check if the values of the model are valid by calling
     * `validate`. If this is correct it will attempt to save the [Model](#/model/Model) to the api.
     *
     * ```js
     * myModel.save()
     *   .then((message) => console.log(message));
     * ```
     */

  }, {
    key: "save",
    value: function save(includeChildren) {
      var _this2 = this;

      // Calling save when there's nothing to be saved is a no-op
      if (!this.isDirty(includeChildren)) {
        return Promise.resolve({});
      }

      return this.validate().then(function (validationState) {
        if (!validationState.status) {
          return Promise.reject(validationState);
        }

        return _this2.modelDefinition.save(_this2).then(function (apiResponse) {
          return _models.updateModelFromResponseStatus.call(_this2, apiResponse);
        });
      });
    }
    /**
     * @returns {Promise} Promise that resolves with an object with a status property that represents if the model
     * is valid or not the fields array will return the names of the fields that are invalid.
     *
     * @description
     * This will run the validations on the properties which have validations set. Normally these validations are defined
     * through the DHIS2 schema. It will check min/max for strings/numbers etc. Additionally it will
     * run model validations against the schema.
     *
     * ```js
     * myModel.validate()
     *  .then(myModelStatus => {
     *    if (myModelStatus.status === false) {
     *      myModelStatus.fields.forEach((fieldName) => console.log(fieldName));
     *    }
     * });
     * ```
     *
     * @deprecated The api now validates the object on save, so doing the additional request to validate the object
     * is not very useful anymore as the validation on POST/PUT is more extensive than the /api/schemas validation.
     */

  }, {
    key: "validate",
    value: function validate() {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        var validationMessages = [];

        function unique(current, property) {
          if (property && current.indexOf(property) === -1) {
            current.push(property);
          }

          return current;
        }

        function asyncRemoteValidation(model) {
          return modelValidator.validateAgainstSchema(model);
        } // Run async validation against the api


        asyncRemoteValidation(_this3).catch(function (remoteMessages) {
          // Errors are ok in this case
          if (Array.isArray(remoteMessages)) {
            return remoteMessages;
          }

          return Promise.reject(remoteMessages);
        }).then(function (remoteMessages) {
          validationMessages = validationMessages.concat(remoteMessages);
          var validationState = {
            status: remoteMessages.length === 0,
            fields: validationMessages.map(function (validationMessage) {
              return validationMessage.property;
            }).reduce(unique, []),
            messages: validationMessages
          };
          resolve(validationState);
        }).catch(function (message) {
          return reject(message);
        });
      });
    } // TODO: Cloning large graphs is very slow

  }, {
    key: "clone",
    value: function clone() {
      var modelClone = this.modelDefinition.create((0, _json.getJSONForProperties)(this, Object.keys(this.modelDefinition.modelValidations), true));

      if (this.isDirty()) {
        modelClone.dirty = this.isDirty(true);
      }

      return modelClone;
    }
    /**
     * Deletes the object from the server.
     *
     * This will fire a DELETE request to have the object be removed from the system.
     *
     * @returns {Promise} Resolves when the object was successfully deleted.
     */

  }, {
    key: "delete",
    value: function _delete() {
      return this.modelDefinition.delete(this);
    }
    /**
     * Check if the model is in a dirty state and is a candidate to be saved.
     *
     * It will check for direct properties that have been changed and if any of the children have been changed.
     *
     * @param {boolean} includeChildren If set to false only the models direct properties will be checked.
     * @returns {boolean} Returns true when the model is in a dirty state.
     */

  }, {
    key: "isDirty",
    value: function isDirty() {
      var includeChildren = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      return this.dirty || includeChildren === true && this.hasDirtyChildren();
    }
    /**
     * Utility method to reset the dirty state of the object.
     *
     * This is called after a successful save operation was done.
     *
     * @returns {ModelBase} Returns itself for potential chaining
     */

  }, {
    key: "resetDirtyState",
    value: function resetDirtyState() {
      this.dirty = false; // Also set it's children to be clean

      this.getDirtyChildren().forEach(function (value) {
        if (value.resetDirtyState) {
          value.resetDirtyState();
        } else {
          value.dirty = false; // eslint-disable-line no-param-reassign
        }
      });
      this[DIRTY_PROPERTY_LIST].clear();
      return this;
    }
    /**
     * Returns a list of properties that have been changed.
     *
     * @returns {Array<string>} The names of the properties that were changed.
     */

  }, {
    key: "getDirtyPropertyNames",
    value: function getDirtyPropertyNames() {
      return Array.from(this[DIRTY_PROPERTY_LIST].values());
    }
    /**
     * This will return the properties that are marked as `owner: true` in the schema definition for the model.
     *
     * @returns {Array<any>} Returns an array of properties that are owned by the object
     */
    // TODO: This name is very misleading and should probably be renamed to something like `getOwnerProperties` (would be a breaking change)

  }, {
    key: "getCollectionChildren",
    value: function getCollectionChildren() {
      var _this4 = this;

      return Object.keys(this).filter(function (propertyName) {
        return _this4[propertyName] && (0, _models.hasModelValidationForProperty)(_this4, propertyName) && (0, _models.pickOwnerFromModelValidation)(propertyName, _this4);
      }).map(function (propertyName) {
        return _this4[propertyName];
      });
    }
    /**
     * Gets the names of the properties that are collections on the object.
     *
     * These are usually the properties that contain ModelCollectionProperties.
     *
     * @returns {Array<string>} A list of property names that are marked as type `COLLECTION` in the schema.
     */

  }, {
    key: "getCollectionChildrenPropertyNames",
    value: function getCollectionChildrenPropertyNames() {
      var _this5 = this;

      return Object.keys(this).filter(function (propertyName) {
        return (0, _models.pickTypeFromModelValidation)(propertyName, _this5) === 'COLLECTION';
      });
    }
    /**
     * Gets the names of the properties that are references on the object.
     *
     * These are usually the properties that contain a Model of a different type. (e.g DataElement -> CategoryCombo)
     *
     * @returns {Array<string>} A list of property names that are marked as type `REFERENCE` in the schema.
     */

  }, {
    key: "getReferenceProperties",
    value: function getReferenceProperties() {
      var _this6 = this;

      return Object.keys(this).filter(function (propertyName) {
        return (0, _models.pickTypeFromModelValidation)(propertyName, _this6) === 'REFERENCE' && (0, _models.pickEmbeddedObjectFromModelValidation)(propertyName, _this6) === false;
      });
    }
    /**
     * Gets the names of the properties that are embedded objects.
     *
     * These the properties that are not represented by a different Model, but are just plain objects that are
     * embedded within the current object.
     *
     * @returns {Array<string>} A list of property names of embedded objects.
     */

  }, {
    key: "getEmbeddedObjectCollectionPropertyNames",
    value: function getEmbeddedObjectCollectionPropertyNames() {
      var _this7 = this;

      return this.getCollectionChildrenPropertyNames().filter(function (propertyName) {
        return (0, _models.pickEmbeddedObjectFromModelValidation)(propertyName, _this7);
      });
    }
    /**
     * Returns a list of child properties that are marked as dirty. This uses the `getCollectionChildren()` method
     * to retrieve the children properties and then checks if they are marked as dirty.
     *
     * The method does not check if direct properties are dirty as those are tracked on the Model itself.
     *
     * @returns {Array<any>}
     */

  }, {
    key: "getDirtyChildren",
    value: function getDirtyChildren() {
      return this.getCollectionChildren().filter(function (property) {
        return property && property.dirty === true;
      });
    }
    /**
     * Check if any of the Model's child collections are dirty.
     *
     * @returns {boolean} True when one of the children is dirty.
     */

  }, {
    key: "hasDirtyChildren",
    value: function hasDirtyChildren() {
      return this.getDirtyChildren().length > 0;
    }
    /**
     * This method is generally intended to, by default, usefully serialize Model objects during JSON serialization.
     *
     * This method will take all the properties that are defined on the schema and create an object with the keys and
     * values for those properties. This will remove any circular dependencies that could have occurred otherwise.
     *
     * @returns {Object}
     */

  }, {
    key: "toJSON",
    value: function toJSON() {
      return (0, _json.getJSONForProperties)(this, Object.keys(this.modelDefinition.modelValidations));
    }
  }]);

  return ModelBase;
}();

var _default = ModelBase;
exports.default = _default;
//# sourceMappingURL=ModelBase.js.map