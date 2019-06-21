"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _check = require("../lib/check");

var _utils = require("../lib/utils");

var _Model = _interopRequireDefault(require("./Model"));

var _ModelDefinition = _interopRequireDefault(require("./ModelDefinition"));

var _Pager = _interopRequireDefault(require("../pager/Pager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _throwIfContainsOtherThanModelObjects(values) {
  if (values && values[Symbol.iterator]) {
    var toCheck = _toConsumableArray(values);

    toCheck.forEach(function (value) {
      if (!(value instanceof _Model.default)) {
        (0, _utils.throwError)('Values of a ModelCollection must be instances of Model');
      }
    });
  }
}

function _throwIfContainsModelWithoutUid(values) {
  if (values && values[Symbol.iterator]) {
    var toCheck = _toConsumableArray(values);

    toCheck.forEach(function (value) {
      if (!(0, _check.isValidUid)(value.id)) {
        (0, _utils.throwError)('Can not add a Model without id to a ModelCollection');
      }
    });
  }
}
/**
 * Collection of `Model` objects that can be interacted upon. Can contain a pager object to easily navigate
 * pages within the system.
 *
 * @memberof module:model
 */


var ModelCollection =
/*#__PURE__*/
function () {
  /**
   * @constructor
   *
   * @param {ModelDefinition} modelDefinition The `ModelDefinition` that this collection is for. This defines the type of models that
   * are allowed to be added to the collection.
   * @param {Model[]} values Initial values that should be added to the collection.
   * @param {Object} pagerData Object with pager data. This object contains data that will be put into the `Pager` instance.
   *
   * @description
   *
   * Creates a new `ModelCollection` object based on the passed `modelDefinition`. Additionally values can be added by passing
   * `Model` objects in the `values` parameter. The collection also exposes a pager object which can be used to navigate through
   * the pages in the collection. For more information see the `Pager` class.
   */
  function ModelCollection(modelDefinition, values, pagerData) {
    var _this = this;

    _classCallCheck(this, ModelCollection);

    (0, _check.checkType)(modelDefinition, _ModelDefinition.default);
    /**
     * @property {ModelDefinition} modelDefinition The `ModelDefinition` that this collection is for. This defines the type of models that
     * are allowed to be added to the collection.
     */

    this.modelDefinition = modelDefinition;
    /**
     * @property {Pager} pager Pager object that is created from the pagerData that was passed when the collection was constructed. If no pager data was present
     * the pager will have default values.
     */

    this.pager = new _Pager.default(pagerData, modelDefinition); // We can not extend the Map object right away in v8 contexts.

    this.valuesContainerMap = new Map();
    this[Symbol.iterator] = this.valuesContainerMap[Symbol.iterator].bind(this.valuesContainerMap);

    _throwIfContainsOtherThanModelObjects(values);

    _throwIfContainsModelWithoutUid(values); // Add the values separately as not all Iterators return the same values


    if ((0, _check.isArray)(values)) {
      values.forEach(function (value) {
        return _this.valuesContainerMap.set(value.id, value);
      });
    }
  }
  /**
   * @property {Number} size The number of Model objects that are in the collection.
   *
   * @description
   * Contains the number of Model objects that are in this collection. If the collection is a collection with a pager. This
   * does not take into account all the items in the database. Therefore when a pager is present on the collection
   * the size will return the items on that page. To get the total number of items consult the pager.
   */


  _createClass(ModelCollection, [{
    key: "add",

    /**
     * Adds a Model instance to the collection. The model is checked if it is a correct instance of `Model` and if it has
     * a valid id. A valid id is a uid string of 11 alphanumeric characters.
     *
     * @param {Model} value Model instance to add to the collection.
     * @returns {ModelCollection} Returns itself for chaining purposes.
     *
     * @throws {Error} When the passed value is not an instance of `Model`
     * @throws {Error} Throws error when the passed value does not have a valid id.
     */
    value: function add(value) {
      _throwIfContainsOtherThanModelObjects([value]);

      _throwIfContainsModelWithoutUid([value]);

      this.set(value.id, value);
      return this;
    }
    /**
     * If working with the Map type object is inconvenient this method can be used to return the values
     * of the collection as an Array object.
     *
     * @returns {Array} Returns the values of the collection as an array.
     */

  }, {
    key: "toArray",
    value: function toArray() {
      var resultArray = [];
      this.forEach(function (model) {
        resultArray.push(model);
      });
      return resultArray;
    }
  }, {
    key: "clear",

    /**
     * Clear the collection and remove all it's values.
     *
     * @returns {this} Returns itself for chaining purposes;
     */
    // TODO: Reset the pager?
    value: function clear() {
      return this.valuesContainerMap.clear.call(this.valuesContainerMap);
    }
  }, {
    key: "delete",
    value: function _delete() {
      var _this$valuesContainer;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (_this$valuesContainer = this.valuesContainerMap.delete).call.apply(_this$valuesContainer, [this.valuesContainerMap].concat(args));
    }
  }, {
    key: "entries",
    value: function entries() {
      return this.valuesContainerMap.entries.call(this.valuesContainerMap);
    } // FIXME: This calls the forEach function with the values Map and not with the ModelCollection as the third argument

  }, {
    key: "forEach",
    value: function forEach() {
      var _this$valuesContainer2;

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return (_this$valuesContainer2 = this.valuesContainerMap.forEach).call.apply(_this$valuesContainer2, [this.valuesContainerMap].concat(args));
    }
  }, {
    key: "get",
    value: function get() {
      var _this$valuesContainer3;

      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return (_this$valuesContainer3 = this.valuesContainerMap.get).call.apply(_this$valuesContainer3, [this.valuesContainerMap].concat(args));
    }
  }, {
    key: "has",
    value: function has() {
      var _this$valuesContainer4;

      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return (_this$valuesContainer4 = this.valuesContainerMap.has).call.apply(_this$valuesContainer4, [this.valuesContainerMap].concat(args));
    }
  }, {
    key: "keys",
    value: function keys() {
      return this.valuesContainerMap.keys.call(this.valuesContainerMap);
    }
  }, {
    key: "set",
    value: function set() {
      var _this$valuesContainer5;

      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return (_this$valuesContainer5 = this.valuesContainerMap.set).call.apply(_this$valuesContainer5, [this.valuesContainerMap].concat(args));
    }
  }, {
    key: "values",
    value: function values() {
      return this.valuesContainerMap.values.call(this.valuesContainerMap);
    }
  }, {
    key: "size",
    get: function get() {
      return this.valuesContainerMap.size;
    }
  }], [{
    key: "create",
    value: function create(modelDefinition, values, pagerData) {
      return new ModelCollection(modelDefinition, values, pagerData);
    }
  }, {
    key: "throwIfContainsOtherThanModelObjects",
    value: function throwIfContainsOtherThanModelObjects(value) {
      return _throwIfContainsOtherThanModelObjects(value);
    }
  }, {
    key: "throwIfContainsModelWithoutUid",
    value: function throwIfContainsModelWithoutUid(value) {
      return _throwIfContainsModelWithoutUid(value);
    }
  }]);

  return ModelCollection;
}();

var _default = ModelCollection;
exports.default = _default;
//# sourceMappingURL=ModelCollection.js.map