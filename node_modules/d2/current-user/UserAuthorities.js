"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var auths = Symbol('authorities');
/**
 * Simple wrapper class for the user authorities list
 *
 * @memberof module:current-user
 */

var UserAuthorities =
/*#__PURE__*/
function () {
  /**
   * Creates the UserAuthorities object based off the given set of the user's authorities.
   *
   * @param {string[]} authorities A set of the user's authorities.
   */
  function UserAuthorities() {
    var authorities = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, UserAuthorities);

    this[auths] = new Set(authorities);
  }
  /**
   * Checks if the given authority is in the user's authority list.
   *
   * If the user has the 'ALL' authority any request for a authority will return `true`.
   *
   * @param {string} authority The authority to check for
   */


  _createClass(UserAuthorities, [{
    key: "has",
    value: function has(authority) {
      if (this[auths].has('ALL')) {
        return true;
      }

      return this[auths].has(authority);
    }
    /**
     * Factory method for a UserAuthorities instance
     *
     * @param {string[]} authorities A set of the user's authorities as recieved from the api.
     */

  }], [{
    key: "create",
    value: function create(authorities) {
      return new UserAuthorities(authorities);
    }
  }]);

  return UserAuthorities;
}();

var _default = UserAuthorities;
exports.default = _default;
//# sourceMappingURL=UserAuthorities.js.map