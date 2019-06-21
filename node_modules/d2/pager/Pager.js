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
 * @description
 * Pager object that can be used to navigate pages within a `Modelcollection`
 *
 * @memberof module:model
 */

/**
  * @memberof module:model
  */
// TODO: Move to the model map
var Pager =
/*#__PURE__*/
function () {
  /**
   * @constructor
   *
   * @param {Object} [pager={page: 1, pageCount: 1}] Paging information object.
   * @param {Object} [pagingHandler={list: () => Promise.reject('No handler available')}] Paging handler object. The requirement for this object is that it has a list method.
   *
   * @description
   * Returns a newly created pager object with methods to navigate pages.
   */
  function Pager() {
    var pager = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      page: 1,
      pageCount: 1,
      query: {}
    };
    var pagingHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      list: function list() {
        return Promise.reject('No handler available');
      }
    };

    _classCallCheck(this, Pager);

    /**
     * @property {number} page Current page number
     */
    this.page = pager.page;
    /**
     * @property {number} pageCount The total number of pages available
     */

    this.pageCount = pager.pageCount;
    /**
     * @property {number} total The total number of items available.
     *
     * @description
     * This represents the total number of items available in the system. Note it is not the number of items
     * on the current page.
     */

    this.total = pager.total;
    /**
     * @property {string} nextPage The url to the next page.
     *
     * @description
     * If there is no next page then this will be undefined.
     */

    this.nextPage = pager.nextPage;
    /**
     * @property {string} prevPage The url to the previous page
     *
     * @description
     * If there is no previous page then this will be undefined.
     */

    this.prevPage = pager.prevPage;
    /**
     * @property {object} query Query parameters
     *
     * @description
     * Query parameters are used for things like filtering and field selection. Used to guarantee that pages are
     * from the same collection.
     */

    this.query = pager.query;
    this.pagingHandler = pagingHandler;
  }
  /**
   * @returns {Boolean} Result is true when there is a next page, false when there is not.
   *
   * @description
   * Check whether there is a next page.
   */


  _createClass(Pager, [{
    key: "hasNextPage",
    value: function hasNextPage() {
      return (0, _check.isDefined)(this.nextPage);
    }
    /**
     * Check whether there is a previous page.
     *
     * @returns {Boolean} Result is true when there is a previous page, false when there is not.
     */

  }, {
    key: "hasPreviousPage",
    value: function hasPreviousPage() {
      return (0, _check.isDefined)(this.prevPage);
    }
    /**
     * @description
     * Loads the next page in the collection if there is one. If no additional pages are available the Promise will reject.
     *
     * @returns {Promise} Promise that resolves with a new `ModelCollection` containing the next page's data. Or rejects with
     * a string when there is no next page for this collection or when the request for the next page failed.
     *
     * @example
     * d2.models.organisationUnit
     *   .list()
     *   .then(collection => {
     *     collection.pager.getNextPage()
     *       .then(secondPageCollection => {
     *         console.log(secondPageCollection.toArray());
     *       });
     *   });
     */

  }, {
    key: "getNextPage",
    value: function getNextPage() {
      if (this.hasNextPage()) {
        return this.goToPage(this.page + 1);
      }

      return Promise.reject('There is no next page for this collection');
    }
    /**
     * @description
     * Loads the previous page in the collection if there is one. If no previous pages are available the Promise will reject.
     *
     * @returns {Promise} Promise that resolves with a new `ModelCollection` containing the previous page's data. Or rejects with
     * a string when there is no previous page for this collection or when the request for the previous page failed.
     *
     * @example
     * d2.models.organisationUnit
     *   .list()
     *   .then(collection => {
     *     collection.pager.goToPage(3)
     *       .then(collection => collection.pager.getPreviousPage())
     *       .then(secondPageCollection => {
     *         console.log(secondPageCollection.toArray());
     *       });
     *   });
     */

  }, {
    key: "getPreviousPage",
    value: function getPreviousPage() {
      if (this.hasPreviousPage()) {
        return this.goToPage(this.page - 1);
      }

      return Promise.reject('There is no previous page for this collection');
    }
    /**
     * Loads a specific page for the collection. If the requested page is out of the range of available pages (e.g < 0 or > page count)
     * the Promise will reject with an error.
     *
     * @param {Number} pageNr The number of the page you wish to navigate to.
     * @returns {Promise} Promise that resolves with a new `ModelCollection` containing the data for the requested page.
     *
     * @example
     * d2.models.organisationUnit
     *   .list()
     *   .then(collection => {
     *     collection.pager.goToPage(4)
     *       .then(fourthPageCollection => {
     *         console.log(fourthPageCollection.toArray());
     *       });
     *   });
     */
    // TODO: Throwing the errors here is not really consistent with the rejection of promises for the getNextPage and getPreviousPage

  }, {
    key: "goToPage",
    value: function goToPage(pageNr) {
      if (pageNr < 1) {
        throw new Error('PageNr can not be less than 1');
      }

      if (pageNr > this.pageCount) {
        throw new Error("PageNr can not be larger than the total page count of ".concat(this.pageCount));
      }

      return this.pagingHandler.list(Object.assign({}, this.query, {
        page: pageNr
      }));
    }
  }]);

  return Pager;
}();

var _default = Pager;
exports.default = _default;
//# sourceMappingURL=Pager.js.map