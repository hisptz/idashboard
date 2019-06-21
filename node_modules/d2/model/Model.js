"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _check = require("../lib/check");

var _utils = require("../lib/utils");

var _ModelBase2 = _interopRequireWildcard(require("./ModelBase"));

var _attibutes = _interopRequireDefault(require("./helpers/attibutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var pickAttributeValues = (0, _utils.pickOr)('attributeValues', []); // TODO: Perhaps we can generate model classes dynamically based on the schemas and inherit from this.

/**
 * @extends ModelBase
 *
 * @description
 * A Model represents an object from the DHIS2 Api. A model is created based of a ModelDefinition. The ModelDefinition
 * has the properties that the model should have.
 *
 * @memberof module:model
 */

var Model =
/*#__PURE__*/
function (_ModelBase) {
  _inherits(Model, _ModelBase);

  /**
   * @constructor
   *
   * @param {ModelDefinition} modelDefinition The model definition that corresponds with the model.
   * This is essential defining what type the model is representing.
   *
   * @description
   * Will create a new model instanced based on the model definition. When creating a new instance the model
   * definition needs to have both the modelValidations and modelProperties.
   *
   * The model properties will depend on the ModelDefinition. A model definition is based on a DHIS2 Schema.
   */
  function Model(modelDefinition) {
    var _this;

    _classCallCheck(this, Model);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Model).call(this));
    (0, _check.checkType)(modelDefinition, 'object', 'modelDefinition');
    (0, _check.checkType)(modelDefinition.modelProperties, 'object', 'modelProperties');
    /**
     * @property {ModelDefinition} modelDefinition Stores reference to the modelDefinition that was used when
     * creating the model. This property is not enumerable or writable and will therefore not show up when looping
     * over the object properties.
     */

    Object.defineProperty(_assertThisInitialized(_this), 'modelDefinition', {
      value: modelDefinition
    });
    /**
     * @property {Boolean} dirty Represents the state of the model. When the model is concidered `dirty`
     * there are pending changes.
     * This property is not enumerable or writable and will therefore not show up when looping
     * over the object properties.
     */

    Object.defineProperty(_assertThisInitialized(_this), 'dirty', {
      writable: true,
      value: false
    });
    /**
     * @private
     * @property {Object} dataValues Values object used to store the actual model values. Normally access to the
     * Model data will be done through accessor properties that are generated from the modelDefinition.
     *
     * @note {warning} This should not be accessed directly.
     */

    Object.defineProperty(_assertThisInitialized(_this), 'dataValues', {
      configurable: true,
      writable: true,
      value: {}
    });
    /**
     * Attach the modelDefinition modelProperties (the properties from the schema) onto the Model.
     *
     * For a data element model the modelProperties would be the following
     * https://play.dhis2.org/demo/api/schemas/dataElement.json?fields=properties
     */

    Object.defineProperties(_assertThisInitialized(_this), modelDefinition.modelProperties);
    var attributes = {};
    var attributeProperties = modelDefinition.attributeProperties;

    if ((0, _check.hasKeys)(attributeProperties)) {
      /**
       * @property {Object} attributes The attributes objects contains references to custom attributes defined
       * on the metadata object.
       *
       * @description
       * These properties are generated based of the attributes that are created for the the specific schema.
       * As these properties are not defined on the schemas they're put on a separate attributes object.
       * When there are no attributes defined for the object type, the attributes property will not be attached
       * to the model.
       *
       * @see https://docs.dhis2.org/2.27/en/user/html/dhis2_user_manual_en_full.html#manage_attribute
       */
      Object.defineProperty(_assertThisInitialized(_this), 'attributes', {
        value: attributes
      });

      var getAttributeValues = function getAttributeValues() {
        return pickAttributeValues(_assertThisInitialized(_this));
      };

      var setAttributeValues = function setAttributeValues(attributeValues) {
        return _this.attributeValues = attributeValues;
      };

      var setDirty = function setDirty() {
        return _this.dirty = true;
      };

      var attributeDefinitions = (0, _attibutes.default)(attributeProperties, getAttributeValues, setAttributeValues, setDirty);
      Object.defineProperties(attributes, attributeDefinitions);
    }

    _this[_ModelBase2.DIRTY_PROPERTY_LIST] = new Set([]);
    return _this;
  }
  /**
   * @static
   *
   * @param {ModelDefinition} modelDefinition ModelDefinition from which the model should be created
   * @returns {Model} Returns an instance of the model.
   *
   * @description The static method is a factory method to create Model objects. It calls `new Model()` with the passed `ModelDefinition`.
   *
   * ```js
   * let myModel = Model.create(modelDefinition);
   * ```
   */


  _createClass(Model, null, [{
    key: "create",
    value: function create(modelDefinition) {
      return new Model(modelDefinition);
    }
  }]);

  return Model;
}(_ModelBase2.default);

var _default = Model;
exports.default = _default;
//# sourceMappingURL=Model.js.map