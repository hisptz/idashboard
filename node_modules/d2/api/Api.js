"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("isomorphic-fetch");

var _check = require("../lib/check");

var _utils = require("../lib/utils");

var _System = _interopRequireDefault(require("../system/System"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function getMergeStrategyParam() {
  var mergeType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'REPLACE';

  var system = _System.default.getSystem();

  if (system.version && Number(system.version.minor) <= 22) {
    return "mergeStrategy=".concat(mergeType);
  }

  return "mergeMode=".concat(mergeType);
}

function getUrl(baseUrl, url) {
  // If we are dealing with an absolute url use that instead
  if (new RegExp('^(:?https?:)?//').test(url)) {
    return url;
  }

  var urlParts = [];

  if (baseUrl) {
    urlParts.push(baseUrl);
  }

  urlParts.push(url);
  return urlParts.join('/').replace(new RegExp('(.(?:[^:]))//+', 'g'), '$1/').replace(new RegExp('/$'), '');
}
/**
 * @description
 * Used for interaction with the dhis2 api.
 *
 * This class is used as the backbone for d2 and handles all the interaction with the server. There is a singleton
 * available to be reused across your applications. The singleton can be grabbed from the d2 instance. The api methods all handle URL-encoding for you, so you can just pass them unencoded strings
 *
 * ```js
 * import { getInstance } from 'd2/lib/d2';
 *
 * getInstance()
 *  .then(d2 => {
 *      const api = d2.Api.getApi() // Returns the Api singleton.
 *
 *      api.get('resources');
 *  });
 * ```
 *
 * Uses {@link https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API|Fetch} to do network requests.
 *
 * @memberof module:api
 */


var Api =
/*#__PURE__*/
function () {
  /**
   * @constructor
   *
   * @param {Fetch} [fetchImpl] The fetch implementation to use. Can be used to pass a different implementation
   * similar to the fetch Api. Will default to `window.fetch` in a browser context.
   */
  function Api(fetchImpl) {
    _classCallCheck(this, Api);

    // Optionally provide fetch to the constructor so it can be mocked during testing
    if (typeof fetchImpl === 'function') {
      this.fetch = fetchImpl.bind(typeof window !== 'undefined' ? window : global);
    } else if (typeof fetch !== 'undefined') {
      this.fetch = fetch.bind(typeof window !== 'undefined' ? window : global);
    } else {
      throw new Error('Failed to initialise D2 Api: No fetch implementation is available');
    }

    this.baseUrl = '/api';
    this.defaultFetchOptions = {
      mode: 'cors',
      // requests to different origins fail
      credentials: 'include',
      // include cookies with same-origin requests
      cache: 'default' // See https://fetch.spec.whatwg.org/#concept-request-cache-mode

    };
    this.defaultHeaders = {
      'X-Requested-With': 'XMLHttpRequest'
    };
    this.unauthorizedCallback = null;
  }
  /**
   * Used for setting default headers that should be send with every request.
   *
   * @example
   * const api = Api.getApi();
   *
   * api.setDefaultHeaders({
   *  'x-requested-with': 'XMLHttpRequest', // Make sure the Api does not redirect when authorization is expired.
   * });
   *
   * @param {Object.<string, string>} headers Default headers that should be set on every request.
   */


  _createClass(Api, [{
    key: "setDefaultHeaders",
    value: function setDefaultHeaders(headers) {
      this.defaultHeaders = headers;
    }
    /**
     * When any request encounters a 401 - Unauthorized. This callback is called.
     * Useful for when you want an session expiration-handler API-wide.
     *
     * @param {*} cb - Function to call when any request recieves a 401. Called with the response from the server.
     */

  }, {
    key: "setUnauthorizedCallback",
    value: function setUnauthorizedCallback(cb) {
      if (typeof cb !== 'function') {
        throw new Error('Callback must be a function.');
      }

      this.unauthorizedCallback = cb;
    }
    /**
     * Performs a GET request.
     *
     * @param {string} url The url for the request, should be unencoded. Will return a rejected promise for malformed urls and urls that contain encoded query strings.
     * @param {*} data Any data that should be sent with the request. For a GET request these are encoded and turned into
     * query parameters. For POST and PUT requests it becomes the body.
     * @param {Object.<string, any>} options The request options are passed as options to the fetch request.
     * These options are passed as the {@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters|init}
     * parameter to the fetch request.
     *
     * @returns {Promise.<*>} The response body.
     */

  }, {
    key: "get",
    value: function get(url, data, options) {
      return this.request('GET', getUrl(this.baseUrl, url), data, options);
    }
    /* eslint-disable complexity */

    /**
     * Performs a POST request.
     *
     * @param {string} url The url for the request
     * @param {*} data Any data that should be send with the request this becomes the body for the POST request
     * @param {Object.<string, any>} options The request options are passed as options to the fetch request.
     * These options are passed as the {@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters|init}
     * parameter to the fetch request.
     *
     * @returns {Promise.<*>} The response body.
     */

  }, {
    key: "post",
    value: function post(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var requestUrl = getUrl(this.baseUrl, url);
      var payload = data; // Ensure that headers are defined and are treated without case sensitivity

      options.headers = new Headers(options.headers || {}); // eslint-disable-line

      if (data !== undefined) {
        if (data.constructor.name === 'FormData') {
          // Ensure that the browser will set the correct Content-Type header for FormData, including boundary
          options.headers.delete('Content-Type');
          payload = data;
        } else if (options.headers.has('Content-Type') && options.headers.get('Content-Type').toLocaleLowerCase().startsWith('text/')) {
          payload = String(data);
        } else {
          // Send JSON data by default
          options.headers.set('Content-Type', 'application/json');
          payload = JSON.stringify(data);
        }
      }

      return this.request('POST', requestUrl, payload, options);
    }
    /**
     * Performs a DELETE request.
     *
     * @param {string} url The url for the request
     * @param {Object.<string, any>} options The request options are passed as options to the fetch request.
     * These options are passed as the {@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters|init}
     * parameter to the fetch request.
     *
     * @returns {Promise.<*>} The response body.
     */

    /* eslint-enable complexity */

  }, {
    key: "delete",
    value: function _delete(url, options) {
      return this.request('DELETE', getUrl(this.baseUrl, url), undefined, options);
    }
    /**
     * Perform a PUT request.
     *
     * @param {string} url The url for the request
     * @param {*} data Any data that should be send with the request. This becomes the body of the PUT request.
     * @param {boolean} [useMergeStrategy=false]
     *
     * @returns {Promise.<*>} The response body.
     */

  }, {
    key: "update",
    value: function update(url, data) {
      var useMergeStrategy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      // Since we are currently using PUT to save the full state back, we have to use mergeMode=REPLACE
      // to clear out existing values
      var urlForUpdate = useMergeStrategy === true ? "".concat(url, "?").concat(getMergeStrategyParam()) : url;

      if (typeof data === 'string') {
        return this.request('PUT', getUrl(this.baseUrl, urlForUpdate), String(data), {
          headers: new Headers({
            'Content-Type': 'text/plain'
          })
        });
      }

      return this.request('PUT', getUrl(this.baseUrl, urlForUpdate), JSON.stringify(data));
    }
    /**
     * Perform a PATCH request.
     *
     * @param {string} url The url for the request
     * @param {*} data Any data that should be send with the request. This becomes the body of the PATCH request.
     *
     * @returns {Promise.<*>} The response body.
     */

  }, {
    key: "patch",
    value: function patch(url, data) {
      return this.request('PATCH', getUrl(this.baseUrl, url), JSON.stringify(data));
    }
    /**
     * General purpose request function for making http requests.
     *
     * The more specific functions like `delete`, `post` and `get`, utilize this function to make the requests.
     *
     * @param {string} method The HTTP request method (e.g. POST/GET/PATCH)
     * @param {string} url The url for the request
     * @param {*} data Any data that should be send with the request. For a GET request these are turned into
     * query parameters. For POST and PUT requests it becomes the body.
     * @param {Object.<string, any>} options The request options are passed as options to the fetch request.
     * These options are passed as the {@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters|init}
     * parameter to the fetch request.
     *
     * @returns {Promise.<*>} The response body.
     */

    /* eslint-disable complexity */

  }, {
    key: "request",
    value: function request(method, url, data) {
      var _this = this;

      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      (0, _check.checkType)(method, 'string', 'Request type');
      (0, _check.checkType)(url, 'string', 'Url');
      var api = this;
      var requestUrl = url;
      var query = '';

      if (requestUrl.indexOf('?') !== -1) {
        query = requestUrl.substr(requestUrl.indexOf('?') + 1);
        requestUrl = requestUrl.substr(0, requestUrl.indexOf('?'));
      } // Encode existing query parameters, since tomcat does not accept unencoded brackets. Throw
      // an error if they're already encoded to prevent double encoding.


      if (query) {
        var decodedURL;

        try {
          decodedURL = decodeURIComponent(query);
        } catch (err) {
          return Promise.reject(new Error('Query parameters in URL are invalid'));
        }

        var isEncoded = query !== decodedURL;

        if (isEncoded) {
          return Promise.reject(new Error('Cannot process URL-encoded URLs, pass an unencoded URL'));
        }

        query = (0, _utils.customEncodeURIComponent)(query);
      } // Transfer filter properties from the data object to the query string


      if (data && Array.isArray(data.filter)) {
        var encodedFilters = data.filter.map(function (filter) {
          return filter.split(':').map(encodeURIComponent).join(':');
        });
        query = "".concat(query).concat(query.length ? '&' : '', "filter=").concat(encodedFilters.join('&filter='));
        delete data.filter; // eslint-disable-line no-param-reassign
      } // When using the GET method, transform the data object to query parameters


      if (data && method === 'GET') {
        Object.keys(data).forEach(function (key) {
          query = "".concat(query).concat(query.length > 0 ? '&' : '') + "".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(data[key]));
        });
      }

      function getOptions(defaultHeaders, mergeOptions, requestData) {
        var resultOptions = Object.assign({}, api.defaultFetchOptions, mergeOptions);
        var headers = new Headers(mergeOptions.headers || {});
        Object.keys(defaultHeaders).filter(function (header) {
          return !headers.get(header);
        }).forEach(function (header) {
          return headers.set(header, defaultHeaders[header]);
        });
        resultOptions.method = method; // Only set content type when there is data to send
        // GET requests and requests without data do not need a Content-Type header
        // 0 and false are valid requestData values and therefore should have a content type

        if (resultOptions.method === 'GET' || !requestData && requestData !== 0 && requestData !== false) {
          headers.delete('Content-Type');
        } else if (requestData) {
          if (data.constructor.name === 'FormData') {
            headers.delete('Content-Type');
          } else if (!headers.get('Content-Type')) {
            headers.set('Content-Type', 'application/json');
          }

          resultOptions.body = requestData;
        }

        resultOptions.headers = headers;
        return resultOptions;
      }

      if (query.length) {
        requestUrl = "".concat(requestUrl, "?").concat(query);
      }

      var requestOptions = getOptions(this.defaultHeaders, options, data); // If the provided value is valid JSON, return the parsed JSON object. If not, return the raw value as is.

      function parseResponseData(value) {
        try {
          return JSON.parse(value);
        } catch (e) {
          return value;
        }
      }

      return new Promise(function (resolve, reject) {
        // fetch returns a promise that will resolve with any response received from the server
        // It will be rejected ONLY if no response is received from the server, i.e. because there's no internet
        _this.fetch(requestUrl, requestOptions).then(function (response) {
          // If the request failed, response.ok will be false and response.status will be the status code
          if (response.ok) {
            response.text().then(function (text) {
              return resolve(parseResponseData(text));
            });
          } else {
            response.text().then(function (text) {
              var parsedResponseData = parseResponseData(text);

              if (response.status === 401) {
                var request = {
                  method: method,
                  url: url,
                  data: data,
                  options: options
                };

                if (_this.unauthorizedCallback) {
                  _this.unauthorizedCallback(request, parsedResponseData);
                }
              }

              if (!process.env || process.env.npm_lifecycle_event !== 'test') {
                console.warn( // eslint-disable-line
                "API request failed with status ".concat(response.status, " ").concat(response.statusText, "\n"), "Request: ".concat(requestOptions.method, " ").concat(requestUrl));
              }

              reject(parsedResponseData);
            });
          }
        }).catch(function (err) {
          // It's not usually possible to get much info about the cause of the error programmatically, but
          // the user can check the browser console for more info
          if (!process.env || process.env.npm_lifecycle_event !== 'test') {
            console.error('Server connection error:', err); // eslint-disable-line
          }

          reject("Server connection failed for API request: ".concat(requestOptions.method, " ").concat(requestUrl));
        });
      });
    }
    /* eslint-enable complexity */

    /**
     * Sets the baseUrl that should be used for the api.
     *
     * When working against the dhis2 demo instance at {@link https://play.dhis2.org/demo} the
     * baseUrl would be set as `https://play.dhis2.org/demo/api`.
     *
     * This method is used when calling the `d2.init` method with the `baseUrl` config property
     * to configure the Api singleton.
     *
     * @param {string} baseUrl The base url to be used for the API.
     *
     * @returns {this} Itself for chaining purposes
     */

  }, {
    key: "setBaseUrl",
    value: function setBaseUrl(baseUrl) {
      (0, _check.checkType)(baseUrl, 'string', 'Base url');
      this.baseUrl = baseUrl;
      return this;
    }
  }]);

  return Api;
}();
/**
 * Retrieve the Api singleton or create one.
 *
 * When called for the first time it creates and Api singleton object.
 * Any subsequent calls will return the previously created singleton.
 *
 * @returns {Api} The Api singleton.
 * @memberof module:api~Api
 */


function getApi() {
  if (getApi.api) {
    return getApi.api;
  }

  return getApi.api = new Api();
}

Api.getApi = getApi;
var _default = Api;
exports.default = _default;
//# sourceMappingURL=Api.js.map