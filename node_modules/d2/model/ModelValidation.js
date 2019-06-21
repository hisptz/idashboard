"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _check = require("../lib/check");

var _Logger = _interopRequireDefault(require("../logger/Logger"));

var _Api = _interopRequireDefault(require("../api/Api"));

var _json = require("./helpers/json");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function extractValidationViolations(webmessage) {
  if (webmessage.response && webmessage.response.errorReports) {
    return webmessage.response.errorReports;
  }

  throw new Error('Response was not a WebMessage with the expected format');
}
/**
 * Handles validation of Model objects based on their modelDefinition.
 *
 * @memberof module:model
 */


var ModelValidation =
/*#__PURE__*/
function () {
  function ModelValidation(providedLogger) {
    _classCallCheck(this, ModelValidation);

    (0, _check.checkType)(providedLogger, 'object', 'logger (Logger)');
    this.logger = providedLogger;
  }
  /**
   * @deprecated Client side model validation is deprecated in favour of server side validation only.
   *
   * @returns {{status: boolean, messages: Array}} Returns {status: true, messages: []}
   */


  _createClass(ModelValidation, [{
    key: "validate",
    value: function validate() {
      this.logger.warn('Client side model validation is deprecated');
      throw new Error('Client side model validation is deprecated');
    }
    /**
     * Sends a POST request against the `api/schemas` endpoint to check if the model is valid.
     *
     * @param {Model} model The model that should be validated.
     * @returns {Array} Returns an array with validation messages if there are any.
     *
     * @note {warn} Currently only checks
     */

  }, {
    key: "validateAgainstSchema",
    value: function validateAgainstSchema(model) {
      // eslint-disable-line class-methods-use-this
      if (!(model && model.modelDefinition && model.modelDefinition.name)) {
        return Promise.reject('model.modelDefinition.name can not be found');
      }

      var url = "schemas/".concat(model.modelDefinition.name); // TODO: The function getOwnedPropertyJSON should probably not be exposed, perhaps we could have a getJSONForModel(ownedPropertiesOnly=true) method.

      return _Api.default.getApi().post(url, (0, _json.getOwnedPropertyJSON)(model)).then(function (webMessage) {
        if (webMessage.status === 'OK') {
          return [];
        }

        return Promise.reject(webMessage);
      }).catch(extractValidationViolations);
    }
    /**
     * Returns the `ModelValidation` singleton. Creates a new one if it does not yet exist.
     * Grabs a logger instance by calling `Logger.getLogger`
     *
     * @returns {ModelValidation} New or memoized instance of `ModelInstance`
     */

  }], [{
    key: "getModelValidation",
    value: function getModelValidation() {
      if (this.modelValidation) {
        return this.modelValidation;
      }

      return this.modelValidation = new ModelValidation(_Logger.default.getLogger(console));
    }
  }]);

  return ModelValidation;
}();

var _default = ModelValidation;
exports.default = _default;
//# sourceMappingURL=ModelValidation.js.map