"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _check = require("../lib/check");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Contains all the `ModelDefinition`s that are available. The definitions are properties on the object.
 * This would be used as a main entry point to do any interaction.
 *
 * After calling the initialise function `d2({baseUrl: 'dhis/api'})` this object is the `models` property
 * that allows you to access
 *
 * @example
 * models.dataElement.getList();
 *
 * @memberof module:model
 */
var ModelDefinitions =
/*#__PURE__*/
function () {
  function ModelDefinitions() {
    _classCallCheck(this, ModelDefinitions);
  }

  _createClass(ModelDefinitions, [{
    key: "add",
    // TODO: Elaborate this documentation

    /**
     * This will allow you to add your own custom ModelDefinitions.
     *
     * The Definition object should have the following properties
     * `modelName, modelNamePlural, modelOptions, properties, validations`
     *
     * @param {ModelDefinition} modelDefinition Add a model definition to the definitions collection
     *
     * @example
     * models.add({name: 'MyDefinition', plural: 'MyDefinitions', endPointname: '/myDefinition'});
     */
    value: function add(modelDefinition) {
      try {
        (0, _check.checkType)(modelDefinition.name, 'string');
      } catch (e) {
        throw new Error('Name should be set on the passed ModelDefinition to add one');
      }

      if (this[modelDefinition.name]) {
        throw new Error(['Model', modelDefinition.name, 'already exists'].join(' '));
      }

      this[modelDefinition.name] = modelDefinition;

      if ((0, _check.isType)(modelDefinition.plural, 'string')) {
        this[modelDefinition.plural] = modelDefinition;
      }
    }
    /**
     * Map through the modelDefinitions like you would with a simple `Array.map()`
     *
     * @param {Function} transformer Transformer function that will be run for each `ModelDefinition`
     * @returns {Array} Array with the `ModelDefinition` objects.
     *
     * @example
     * models.mapThroughDefinitions(definition => console.log(definition.name);
     *
     * @note {info} When mapping through the definition list `transformer` is called with the just the definition
     * Unlike other map functions, no index or the full object is being passed.
     *
     * @note {warn} The resulting array contains references to the actual objects. It does not work like immutable array functions.
     *
     */

  }, {
    key: "mapThroughDefinitions",
    value: function mapThroughDefinitions(transformer) {
      var _this = this;

      (0, _check.checkType)(transformer, 'function', 'transformer');
      return Object.keys(this).filter(function (modelDefinition) {
        return _this.hasOwnProperty(modelDefinition) && !(_this[modelDefinition].plural === modelDefinition);
      }).map(function (modelDefinition) {
        return transformer(_this[modelDefinition]);
      });
    }
  }]);

  return ModelDefinitions;
}(); // Model definitions singleton!


function getModelDefinitions() {
  if (getModelDefinitions.modelDefinitions) {
    return getModelDefinitions.modelDefinitions;
  }

  return getModelDefinitions.modelDefinitions = new ModelDefinitions();
}

ModelDefinitions.getModelDefinitions = getModelDefinitions;
var _default = ModelDefinitions;
exports.default = _default;
//# sourceMappingURL=ModelDefinitions.js.map