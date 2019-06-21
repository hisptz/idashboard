"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _check = require("../lib/check");

var _utils = require("../lib/utils");

var _ModelDefinitions = _interopRequireDefault(require("./ModelDefinitions"));

var _Model = _interopRequireDefault(require("./Model"));

var _ModelCollection = _interopRequireDefault(require("./ModelCollection"));

var _ModelCollectionProperty = _interopRequireDefault(require("./ModelCollectionProperty"));

var _SchemaTypes = _interopRequireDefault(require("../lib/SchemaTypes"));

var _Filters = _interopRequireDefault(require("./Filters"));

var _ModelBase = require("./ModelBase");

var _config = require("./config");

var _json = require("./helpers/json");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function createModelPropertyDescriptor(propertiesObject, schemaProperty) {
  var propertyName = schemaProperty.collection ? schemaProperty.collectionName : schemaProperty.name;
  var propertyDetails = {
    // Actual property descriptor properties
    configurable: false,
    enumerable: true,
    get: function get() {
      return this.dataValues[propertyName];
    }
  }; // Store available constants for ENUM type properties

  if (schemaProperty.constants) {
    propertyDetails.constants = schemaProperty.constants;
  } // Only add a setter for writable properties


  if (schemaProperty.writable) {
    propertyDetails.set = function dynamicPropertySetter(value) {
      // TODO: Objects and Arrays are considered unequal when their data is the same and therefore trigger a dirty
      if (!(0, _check.isObject)(value) && value !== this.dataValues[propertyName] || (0, _check.isObject)(value)) {
        this.dirty = true;

        this[_ModelBase.DIRTY_PROPERTY_LIST].add(propertyName);

        this.dataValues[propertyName] = value;
      }
    };
  }

  if (propertyName) {
    propertiesObject[propertyName] = propertyDetails; // eslint-disable-line no-param-reassign
  }
}

function createPropertiesObject(schemaProperties) {
  var propertiesObject = {};
  var createModelPropertyDescriptorOn = (0, _utils.curry)(createModelPropertyDescriptor, propertiesObject);
  (schemaProperties || []).forEach(createModelPropertyDescriptorOn);
  return propertiesObject;
}

function createValidationSetting(validationObject, schemaProperty) {
  var propertyName = schemaProperty.collection ? schemaProperty.collectionName : schemaProperty.name;
  var validationDetails = {
    persisted: schemaProperty.persisted,
    type: _SchemaTypes.default.typeLookup(schemaProperty.propertyType),
    required: schemaProperty.required,
    min: schemaProperty.min,
    max: schemaProperty.max,
    owner: schemaProperty.owner,
    unique: schemaProperty.unique,
    writable: schemaProperty.writable,
    ordered: Boolean(schemaProperty.ordered),
    embeddedObject: Boolean(schemaProperty.embeddedObject)
  };

  function getReferenceTypeFrom(property) {
    if (property.href) {
      return property.href.split('/').pop();
    }

    return undefined;
  } // Add a referenceType to be able to get a hold of the reference objects model.


  if (validationDetails.type === 'REFERENCE' || validationDetails.type === 'COLLECTION' && schemaProperty.itemPropertyType === 'REFERENCE') {
    validationDetails.referenceType = getReferenceTypeFrom(schemaProperty);
  }

  if (propertyName) {
    validationObject[propertyName] = validationDetails; // eslint-disable-line no-param-reassign
  }
}

function createValidations(schemaProperties) {
  var validationsObject = {};
  var createModelPropertyOn = (0, _utils.curry)(createValidationSetting, validationsObject);
  (schemaProperties || []).forEach(createModelPropertyOn);
  return validationsObject;
}

function shouldBeModelCollectionProperty(model, models) {
  return function shouldBeModelCollectionPropertyIterator(modelProperty) {
    return model && models && model.modelDefinition && model.modelDefinition.modelValidations && model.modelDefinition.modelValidations[modelProperty] && model.modelDefinition.modelValidations[modelProperty].type === 'COLLECTION' && models.hasOwnProperty(model.modelDefinition.modelValidations[modelProperty].referenceType);
  };
}

function isAnUpdate(modelToCheck) {
  return Boolean(modelToCheck.id);
}

var translatableProperties = new WeakMap();
/**
 * Definition of a Model. Basically this object contains the meta data related to the Model. Like `name`, `apiEndPoint`, `modelValidation`, etc.
 * It also has methods to create and load Models that are based on this definition. The Data element `ModelDefinition` would be used to create Data Element `Model`s
 *
 * Note: ModelDefinition has a property `api` that is used for the communication with the dhis2 api. The value of this
 * property is an instance of `Api`.
 *
 * @memberof module:model
 */

var ModelDefinition =
/*#__PURE__*/
function () {
  function ModelDefinition() {
    var schema = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var properties = arguments.length > 1 ? arguments[1] : undefined;
    var validations = arguments.length > 2 ? arguments[2] : undefined;
    var attributes = arguments.length > 3 ? arguments[3] : undefined;
    var authorities = arguments.length > 4 ? arguments[4] : undefined;

    _classCallCheck(this, ModelDefinition);

    (0, _check.checkType)(schema.singular, 'string');
    (0, _check.checkType)(schema.plural, 'string', 'Plural');
    (0, _utils.addLockedProperty)(this, 'name', schema.singular);
    (0, _utils.addLockedProperty)(this, 'displayName', schema.displayName);
    (0, _utils.addLockedProperty)(this, 'plural', schema.plural);
    (0, _utils.addLockedProperty)(this, 'isShareable', schema.shareable || false);
    (0, _utils.addLockedProperty)(this, 'isMetaData', schema.metadata || false);
    (0, _utils.addLockedProperty)(this, 'apiEndpoint', schema.apiEndpoint);
    (0, _utils.addLockedProperty)(this, 'javaClass', schema.klass);
    (0, _utils.addLockedProperty)(this, 'identifiableObject', schema && schema.identifiableObject);
    (0, _utils.addLockedProperty)(this, 'modelProperties', properties);
    (0, _utils.addLockedProperty)(this, 'modelValidations', validations);
    (0, _utils.addLockedProperty)(this, 'attributeProperties', attributes);
    (0, _utils.addLockedProperty)(this, 'authorities', authorities);
    (0, _utils.addLockedProperty)(this, 'translatable', schema.translatable || false);
    this.filters = _Filters.default.getFilters(this);
    translatableProperties.set(this, (schema.properties || []).filter(function (prop) {
      return prop.translationKey;
    }).map(function (_ref) {
      var name = _ref.name,
          translationKey = _ref.translationKey;
      return {
        name: name,
        translationKey: translationKey
      };
    })); // TODO: The function getOwnedPropertyJSON should probably not be exposed, perhaps we could have a getJSONForModel(ownedPropertiesOnly=true) method.

    this.getOwnedPropertyJSON = _json.getOwnedPropertyJSON.bind(this);
  }

  _createClass(ModelDefinition, [{
    key: "filter",
    value: function filter() {
      return this.clone().filters;
    }
    /**
     * Creates a fresh Model instance based on the `ModelDefinition`. If data is passed into the method that
     * data will be loaded into the matching properties of the model.
     *
     * @param {Object} [data] Data values that should be loaded into the model.
     *
     * @returns {Model} Returns the newly created model instance.
     *
     * @example
     * dataElement.create({name: 'ANC', id: 'd2sf33s3ssf'});
     */

  }, {
    key: "create",
    value: function create(data) {
      var model = _Model.default.create(this);

      var models = _ModelDefinitions.default.getModelDefinitions();

      var dataValues = data ? Object.assign({}, data) : (0, _config.getDefaultValuesForModelType)(model.modelDefinition.name);
      Object.keys(model).filter(shouldBeModelCollectionProperty(model, models)).forEach(function (modelProperty) {
        var referenceType = model.modelDefinition.modelValidations[modelProperty].referenceType;
        var values = [];

        if (Array.isArray(dataValues[modelProperty])) {
          values = dataValues[modelProperty].map(function (value) {
            return models[referenceType].create(value);
          });
        } else if (dataValues[modelProperty] === true || dataValues[modelProperty] === undefined) {
          values = dataValues[modelProperty];
        }

        dataValues[modelProperty] = _ModelCollectionProperty.default.create(model, models[referenceType], modelProperty, values);
        model.dataValues[modelProperty] = dataValues[modelProperty];
      });
      Object.keys(model).filter(function (modelProperty) {
        return !shouldBeModelCollectionProperty(model, models)(modelProperty);
      }).forEach(function (modelProperty) {
        model.dataValues[modelProperty] = dataValues[modelProperty];
      });
      return model;
    }
  }, {
    key: "clone",
    value: function clone() {
      var ModelDefinitionPrototype = Object.getPrototypeOf(this);
      var priorFilters = this.filters.getFilterList();
      var clonedDefinition = (0, _utils.copyOwnProperties)(Object.create(ModelDefinitionPrototype), this);
      clonedDefinition.filters = _Filters.default.getFilters(clonedDefinition, priorFilters);
      return clonedDefinition;
    }
    /**
     * Get a `Model` instance from the api loaded with data that relates to `identifier`.
     * This will do an API call and return a Promise that resolves with a `Model` or rejects with the api error message.
     *
     * @param {String} identifier
     * @param {Object} [queryParams={fields: ':all'}] Query parameters that should be passed to the GET query.
     * @returns {Promise} Resolves with a `Model` instance or an error message.
     *
     * @example
     * //Do a get request for the dataElement with given id (d2sf33s3ssf) and print it's name
     * //when that request is complete and the model is loaded.
     * dataElement.get('d2sf33s3ssf')
     *   .then(model => console.log(model.name));
     */

  }, {
    key: "get",
    value: function get(identifier) {
      var _this = this;

      var queryParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        fields: ':all,attributeValues[:all,attribute[id,name,displayName]]'
      };
      (0, _check.checkDefined)(identifier, 'Identifier');

      if (Array.isArray(identifier)) {
        return this.list({
          filter: ["id:in:[".concat(identifier.join(','), "]")]
        });
      } // TODO: should throw error if API has not been defined


      return this.api.get([this.apiEndpoint, identifier].join('/'), queryParams).then(function (data) {
        return _this.create(data);
      }).catch(function (response) {
        if (response.message) {
          return Promise.reject(response.message);
        }

        return Promise.reject(response);
      });
    }
    /**
     * Loads a list of models.
     *
     * @param {Object} [listParams={fields: ':all'}] Query parameters that should be passed to the GET query.
     * @returns {Promise} ModelCollection collection of models objects of the `ModelDefinition` type.
     *
     * @example
     * // Loads a list of models and prints their name.
     * dataElement.list()
     *   .then(modelCollection => {
     *     modelCollection.forEach(model => console.log(model.name));
     *   });
     */

  }, {
    key: "list",
    value: function list() {
      var _this2 = this;

      var listParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var apiEndpoint = listParams.apiEndpoint,
          extraParams = _objectWithoutProperties(listParams, ["apiEndpoint"]);

      var definedRootJunction = this.filters.rootJunction ? {
        rootJunction: this.filters.rootJunction
      } : {};
      var params = Object.assign({
        fields: ':all'
      }, definedRootJunction, extraParams);
      var definedFilters = this.filters.getQueryFilterValues();

      if (!(0, _check.isDefined)(params.filter)) {
        delete params.filter;

        if (definedFilters.length) {
          params.filter = definedFilters;
        }
      } // If listParams.apiEndpoint exists, send the request there in stead of this.apiEndpoint


      return this.api.get(apiEndpoint || this.apiEndpoint, params).then(function (responseData) {
        return _ModelCollection.default.create(_this2, responseData[_this2.plural].map(function (data) {
          return _this2.create(data);
        }), Object.assign(responseData.pager || {}, {
          query: params
        }));
      });
    }
    /**
     * This method is used by the `Model` instances to save the model when calling `model.save()`.
     *
     * @param {Model} model The model that should be saved to the server.
     * @returns {Promise} A promise which resolves when the save was successful
     * or rejects when it failed. The promise will resolve with the data that is
     * returned from the server.
     *
     * @note {warning} This should generally not be called directly.
     */
    // TODO: check the return status of the save to see if it was actually successful and not ignored

  }, {
    key: "save",
    value: function save(model) {
      if (isAnUpdate(model)) {
        var jsonPayload = _json.getOwnedPropertyJSON.bind(this)(model); // Fallback to modelDefinition if href is unavailable


        var updateUrl = model.dataValues.href ? (0, _utils.updateAPIUrlWithBaseUrlVersionNumber)(model.dataValues.href, this.api.baseUrl) : [model.modelDefinition.apiEndpoint, model.dataValues.id].join('/'); // Save the existing model

        return this.api.update(updateUrl, jsonPayload, true);
      }

      return this.saveNew(model);
    }
  }, {
    key: "saveNew",
    value: function saveNew(model) {
      var jsonPayload = _json.getOwnedPropertyJSON.bind(this)(model); // Its a new object


      return this.api.post(this.apiEndpoint, jsonPayload);
    }
    /**
     * This method returns a list of property names that that are defined
     * as "owner" properties on this schema. This means these properties are used
     * when saving the model to the server.
     *
     * @returns {String[]} Returns an array of property names.
     *
     * @example
     * dataElement.getOwnedPropertyNames()
     */

  }, {
    key: "getOwnedPropertyNames",
    value: function getOwnedPropertyNames() {
      var _this3 = this;

      return Object.keys(this.modelValidations).filter(function (propertyName) {
        return _this3.modelValidations[propertyName].owner;
      });
    }
    /**
     * This method is used by the `Model` instances to delete the model when calling `model.delete()`.
     *
     * @returns {Promise} Returns a promise to the deletion operation
     *
     * @note {warning} This should generally not be called directly.
     */

  }, {
    key: "delete",
    value: function _delete(model) {
      if (model.dataValues.href) {
        return this.api.delete(model.dataValues.href);
      }

      return this.api.delete([model.modelDefinition.apiEndpoint, model.dataValues.id].join('/'));
    }
    /**
     * Check for if the Model supports translations
     *
     * @returns {Boolean} True when the schema can be translated, false otherwise
     */

  }, {
    key: "isTranslatable",
    value: function isTranslatable() {
      return this.translatable;
    }
    /**
     * These properties can be translated using the DHIS2 _database_ translations.
     *
     * @returns {String[]} Returns a list of property names on the object that are translatable.
     */

  }, {
    key: "getTranslatableProperties",
    value: function getTranslatableProperties() {
      return translatableProperties.get(this).map((0, _utils.pick)('name'));
    }
    /**
     * This method is similar to getTranslatableProperties() but in addition to the property names also returns the
     * `translationKey` that is used to save the translations for the property names.
     *
     * @returns {Object[]} Returns an array with objects that have `name` and `translationKey` properties.
     */

  }, {
    key: "getTranslatablePropertiesWithKeys",
    value: function getTranslatablePropertiesWithKeys() {
      return translatableProperties.get(this);
    }
    /**
     * @static
     *
     * This method creates a new `ModelDefinition` based on a JSON structure called
     * a schema. A schema represents the structure of a domain model as it is
     * required by DHIS. Since these schemas can not be altered on the server from
     * the modelDefinition is frozen to prevent accidental changes to the definition.
     *
     * @param {Object} schema A schema definition received from the web api (/api/schemas)
     * @param {Object[]} attributes A list of attribute objects that describe custom attributes (/api/attributes)
     *
     * @returns {ModelDefinition} Frozen model definition object.
     *
     * @example
     * ModelDefinition.createFromSchema(schemaDefinition, attributes);
     *
     * @note {info} An example of a schema definition can be found on
     * https://apps.dhis2.org/demo/api/schemas/dataElement
     */

  }], [{
    key: "createFromSchema",
    value: function createFromSchema(schema) {
      var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var ModelDefinitionClass;
      (0, _check.checkType)(schema, Object, 'Schema');

      if (typeof ModelDefinition.specialClasses[schema.singular] === 'function') {
        ModelDefinitionClass = ModelDefinition.specialClasses[schema.singular];
      } else {
        ModelDefinitionClass = ModelDefinition;
      }

      return Object.freeze(new ModelDefinitionClass(schema, Object.freeze(createPropertiesObject(schema.properties)), Object.freeze(createValidations(schema.properties)), attributes.reduce(function (current, attributeDefinition) {
        current[attributeDefinition.name] = attributeDefinition; // eslint-disable-line no-param-reassign

        return current;
      }, {}), schema.authorities));
    }
  }]);

  return ModelDefinition;
}();

var UserModelDefinition =
/*#__PURE__*/
function (_ModelDefinition) {
  _inherits(UserModelDefinition, _ModelDefinition);

  function UserModelDefinition() {
    _classCallCheck(this, UserModelDefinition);

    return _possibleConstructorReturn(this, _getPrototypeOf(UserModelDefinition).apply(this, arguments));
  }

  _createClass(UserModelDefinition, [{
    key: "get",
    // TODO: userCredentials should always be included, no matter what the query params, that is currently not the case
    value: function get(identifier) {
      var queryParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        fields: ':all,userCredentials[:owner]'
      };
      return _get(_getPrototypeOf(UserModelDefinition.prototype), "get", this).call(this, identifier, queryParams);
    }
  }]);

  return UserModelDefinition;
}(ModelDefinition);

var DataSetModelDefinition =
/*#__PURE__*/
function (_ModelDefinition2) {
  _inherits(DataSetModelDefinition, _ModelDefinition2);

  function DataSetModelDefinition() {
    _classCallCheck(this, DataSetModelDefinition);

    return _possibleConstructorReturn(this, _getPrototypeOf(DataSetModelDefinition).apply(this, arguments));
  }

  _createClass(DataSetModelDefinition, [{
    key: "create",
    value: function create() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var hasData = Boolean(Object.keys(data).length); // Filter out the compulsoryDataElementOperands structure from the retrieved data
      // This structure does not follow the convention of a typical reference. We can not create a proper
      // ModelCollection for this collection.

      var dataClone = Object.keys(data).filter(function (key) {
        return key !== 'compulsoryDataElementOperands';
      }).reduce(function (obj, key) {
        obj[key] = data[key]; // eslint-disable-line no-param-reassign

        return obj;
      }, {}); // Create the model using the usual way of creating a model
      // Only pass data when there is data in the object passed to the constructor. This will guarantee
      // that the empty ModelCollections are created properly.

      var model = _get(_getPrototypeOf(DataSetModelDefinition.prototype), "create", this).call(this, hasData ? dataClone : undefined); // Set the compulsoryDataElementOperands onto the dataValues so it will be included during the save operations


      model.dataValues.compulsoryDataElementOperands = data.compulsoryDataElementOperands;
      return model;
    }
  }]);

  return DataSetModelDefinition;
}(ModelDefinition);

var OrganisationUnitModelDefinition =
/*#__PURE__*/
function (_ModelDefinition3) {
  _inherits(OrganisationUnitModelDefinition, _ModelDefinition3);

  function OrganisationUnitModelDefinition() {
    _classCallCheck(this, OrganisationUnitModelDefinition);

    return _possibleConstructorReturn(this, _getPrototypeOf(OrganisationUnitModelDefinition).apply(this, arguments));
  }

  _createClass(OrganisationUnitModelDefinition, [{
    key: "list",
    // If a 'root' is specified when listing organisation units the results will be limited to the root and its
    // descendants. This is special behavior for the organisation unit API endpoint, which is documented here:
    // https://dhis2.github.io/dhis2-docs/master/en/developer/html/webapi_organisation_units.html
    value: function list() {
      var extraParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var root = extraParams.root,
          params = _objectWithoutProperties(extraParams, ["root"]);

      if (extraParams.hasOwnProperty('root') && root) {
        params.apiEndpoint = "".concat(this.apiEndpoint, "/").concat(root);
      }

      return _get(_getPrototypeOf(OrganisationUnitModelDefinition.prototype), "list", this).call(this, params);
    }
  }]);

  return OrganisationUnitModelDefinition;
}(ModelDefinition);

ModelDefinition.specialClasses = {
  user: UserModelDefinition,
  dataSet: DataSetModelDefinition,
  organisationUnit: OrganisationUnitModelDefinition
};
var _default = ModelDefinition;
exports.default = _default;
//# sourceMappingURL=ModelDefinition.js.map