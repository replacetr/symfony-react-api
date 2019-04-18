(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~crop"],{

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(/*! ./../helpers/btoa */ "./node_modules/axios/lib/helpers/btoa.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ( true &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(/*! ./../defaults */ "./node_modules/axios/lib/defaults.js");
var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");
var isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/btoa.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/btoa.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/is-buffer/index.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/cropperjs/dist/cropper.min.css":
/*!*****************************************************!*\
  !*** ./node_modules/cropperjs/dist/cropper.min.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/cropperjs/src/js/change.js":
/*!*************************************************!*\
  !*** ./node_modules/cropperjs/src/js/change.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./node_modules/cropperjs/src/js/constants.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utilities */ "./node_modules/cropperjs/src/js/utilities.js");



/* harmony default export */ __webpack_exports__["default"] = ({
  change(event) {
    const {
      options,
      canvasData,
      containerData,
      cropBoxData,
      pointers,
    } = this;
    let { action } = this;
    let { aspectRatio } = options;
    let {
      left,
      top,
      width,
      height,
    } = cropBoxData;
    const right = left + width;
    const bottom = top + height;
    let minLeft = 0;
    let minTop = 0;
    let maxWidth = containerData.width;
    let maxHeight = containerData.height;
    let renderable = true;
    let offset;

    // Locking aspect ratio in "free mode" by holding shift key
    if (!aspectRatio && event.shiftKey) {
      aspectRatio = width && height ? width / height : 1;
    }

    if (this.limited) {
      ({ minLeft, minTop } = cropBoxData);
      maxWidth = minLeft + Math.min(
        containerData.width,
        canvasData.width,
        canvasData.left + canvasData.width,
      );
      maxHeight = minTop + Math.min(
        containerData.height,
        canvasData.height,
        canvasData.top + canvasData.height,
      );
    }

    const pointer = pointers[Object.keys(pointers)[0]];
    const range = {
      x: pointer.endX - pointer.startX,
      y: pointer.endY - pointer.startY,
    };
    const check = (side) => {
      switch (side) {
        case _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_EAST"]:
          if (right + range.x > maxWidth) {
            range.x = maxWidth - right;
          }

          break;

        case _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_WEST"]:
          if (left + range.x < minLeft) {
            range.x = minLeft - left;
          }

          break;

        case _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_NORTH"]:
          if (top + range.y < minTop) {
            range.y = minTop - top;
          }

          break;

        case _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_SOUTH"]:
          if (bottom + range.y > maxHeight) {
            range.y = maxHeight - bottom;
          }

          break;

        default:
      }
    };

    switch (action) {
      // Move crop box
      case _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_ALL"]:
        left += range.x;
        top += range.y;
        break;

      // Resize crop box
      case _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_EAST"]:
        if (range.x >= 0 && (right >= maxWidth || (aspectRatio
          && (top <= minTop || bottom >= maxHeight)))) {
          renderable = false;
          break;
        }

        check(_constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_EAST"]);
        width += range.x;

        if (width < 0) {
          action = _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_WEST"];
          width = -width;
          left -= width;
        }

        if (aspectRatio) {
          height = width / aspectRatio;
          top += (cropBoxData.height - height) / 2;
        }

        break;

      case _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_NORTH"]:
        if (range.y <= 0 && (top <= minTop || (aspectRatio
          && (left <= minLeft || right >= maxWidth)))) {
          renderable = false;
          break;
        }

        check(_constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_NORTH"]);
        height -= range.y;
        top += range.y;

        if (height < 0) {
          action = _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_SOUTH"];
          height = -height;
          top -= height;
        }

        if (aspectRatio) {
          width = height * aspectRatio;
          left += (cropBoxData.width - width) / 2;
        }

        break;

      case _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_WEST"]:
        if (range.x <= 0 && (left <= minLeft || (aspectRatio
          && (top <= minTop || bottom >= maxHeight)))) {
          renderable = false;
          break;
        }

        check(_constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_WEST"]);
        width -= range.x;
        left += range.x;

        if (width < 0) {
          action = _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_EAST"];
          width = -width;
          left -= width;
        }

        if (aspectRatio) {
          height = width / aspectRatio;
          top += (cropBoxData.height - height) / 2;
        }

        break;

      case _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_SOUTH"]:
        if (range.y >= 0 && (bottom >= maxHeight || (aspectRatio
          && (left <= minLeft || right >= maxWidth)))) {
          renderable = false;
          break;
        }

        check(_constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_SOUTH"]);
        height += range.y;

        if (height < 0) {
          action = _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_NORTH"];
          height = -height;
          top -= height;
        }

        if (aspectRatio) {
          width = height * aspectRatio;
          left += (cropBoxData.width - width) / 2;
        }

        break;

      case _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_NORTH_EAST"]:
        if (aspectRatio) {
          if (range.y <= 0 && (top <= minTop || right >= maxWidth)) {
            renderable = false;
            break;
          }

          check(_constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_NORTH"]);
          height -= range.y;
          top += range.y;
          width = height * aspectRatio;
        } else {
          check(_constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_NORTH"]);
          check(_constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_EAST"]);

          if (range.x >= 0) {
            if (right < maxWidth) {
              width += range.x;
            } else if (range.y <= 0 && top <= minTop) {
              renderable = false;
            }
          } else {
            width += range.x;
          }

          if (range.y <= 0) {
            if (top > minTop) {
              height -= range.y;
              top += range.y;
            }
          } else {
            height -= range.y;
            top += range.y;
          }
        }

        if (width < 0 && height < 0) {
          action = _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_SOUTH_WEST"];
          height = -height;
          width = -width;
          top -= height;
          left -= width;
        } else if (width < 0) {
          action = _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_NORTH_WEST"];
          width = -width;
          left -= width;
        } else if (height < 0) {
          action = _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_SOUTH_EAST"];
          height = -height;
          top -= height;
        }

        break;

      case _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_NORTH_WEST"]:
        if (aspectRatio) {
          if (range.y <= 0 && (top <= minTop || left <= minLeft)) {
            renderable = false;
            break;
          }

          check(_constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_NORTH"]);
          height -= range.y;
          top += range.y;
          width = height * aspectRatio;
          left += cropBoxData.width - width;
        } else {
          check(_constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_NORTH"]);
          check(_constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_WEST"]);

          if (range.x <= 0) {
            if (left > minLeft) {
              width -= range.x;
              left += range.x;
            } else if (range.y <= 0 && top <= minTop) {
              renderable = false;
            }
          } else {
            width -= range.x;
            left += range.x;
          }

          if (range.y <= 0) {
            if (top > minTop) {
              height -= range.y;
              top += range.y;
            }
          } else {
            height -= range.y;
            top += range.y;
          }
        }

        if (width < 0 && height < 0) {
          action = _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_SOUTH_EAST"];
          height = -height;
          width = -width;
          top -= height;
          left -= width;
        } else if (width < 0) {
          action = _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_NORTH_EAST"];
          width = -width;
          left -= width;
        } else if (height < 0) {
          action = _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_SOUTH_WEST"];
          height = -height;
          top -= height;
        }

        break;

      case _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_SOUTH_WEST"]:
        if (aspectRatio) {
          if (range.x <= 0 && (left <= minLeft || bottom >= maxHeight)) {
            renderable = false;
            break;
          }

          check(_constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_WEST"]);
          width -= range.x;
          left += range.x;
          height = width / aspectRatio;
        } else {
          check(_constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_SOUTH"]);
          check(_constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_WEST"]);

          if (range.x <= 0) {
            if (left > minLeft) {
              width -= range.x;
              left += range.x;
            } else if (range.y >= 0 && bottom >= maxHeight) {
              renderable = false;
            }
          } else {
            width -= range.x;
            left += range.x;
          }

          if (range.y >= 0) {
            if (bottom < maxHeight) {
              height += range.y;
            }
          } else {
            height += range.y;
          }
        }

        if (width < 0 && height < 0) {
          action = _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_NORTH_EAST"];
          height = -height;
          width = -width;
          top -= height;
          left -= width;
        } else if (width < 0) {
          action = _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_SOUTH_EAST"];
          width = -width;
          left -= width;
        } else if (height < 0) {
          action = _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_NORTH_WEST"];
          height = -height;
          top -= height;
        }

        break;

      case _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_SOUTH_EAST"]:
        if (aspectRatio) {
          if (range.x >= 0 && (right >= maxWidth || bottom >= maxHeight)) {
            renderable = false;
            break;
          }

          check(_constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_EAST"]);
          width += range.x;
          height = width / aspectRatio;
        } else {
          check(_constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_SOUTH"]);
          check(_constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_EAST"]);

          if (range.x >= 0) {
            if (right < maxWidth) {
              width += range.x;
            } else if (range.y >= 0 && bottom >= maxHeight) {
              renderable = false;
            }
          } else {
            width += range.x;
          }

          if (range.y >= 0) {
            if (bottom < maxHeight) {
              height += range.y;
            }
          } else {
            height += range.y;
          }
        }

        if (width < 0 && height < 0) {
          action = _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_NORTH_WEST"];
          height = -height;
          width = -width;
          top -= height;
          left -= width;
        } else if (width < 0) {
          action = _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_SOUTH_WEST"];
          width = -width;
          left -= width;
        } else if (height < 0) {
          action = _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_NORTH_EAST"];
          height = -height;
          top -= height;
        }

        break;

      // Move canvas
      case _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_MOVE"]:
        this.move(range.x, range.y);
        renderable = false;
        break;

      // Zoom canvas
      case _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_ZOOM"]:
        this.zoom(Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["getMaxZoomRatio"])(pointers), event);
        renderable = false;
        break;

      // Create crop box
      case _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_CROP"]:
        if (!range.x || !range.y) {
          renderable = false;
          break;
        }

        offset = Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["getOffset"])(this.cropper);
        left = pointer.startX - offset.left;
        top = pointer.startY - offset.top;
        width = cropBoxData.minWidth;
        height = cropBoxData.minHeight;

        if (range.x > 0) {
          action = range.y > 0 ? _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_SOUTH_EAST"] : _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_NORTH_EAST"];
        } else if (range.x < 0) {
          left -= width;
          action = range.y > 0 ? _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_SOUTH_WEST"] : _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_NORTH_WEST"];
        }

        if (range.y < 0) {
          top -= height;
        }

        // Show the crop box if is hidden
        if (!this.cropped) {
          Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["removeClass"])(this.cropBox, _constants__WEBPACK_IMPORTED_MODULE_0__["CLASS_HIDDEN"]);
          this.cropped = true;

          if (this.limited) {
            this.limitCropBox(true, true);
          }
        }

        break;

      default:
    }

    if (renderable) {
      cropBoxData.width = width;
      cropBoxData.height = height;
      cropBoxData.left = left;
      cropBoxData.top = top;
      this.action = action;
      this.renderCropBox();
    }

    // Override
    Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["forEach"])(pointers, (p) => {
      p.startX = p.endX;
      p.startY = p.endY;
    });
  },
});


/***/ }),

/***/ "./node_modules/cropperjs/src/js/constants.js":
/*!****************************************************!*\
  !*** ./node_modules/cropperjs/src/js/constants.js ***!
  \****************************************************/
/*! exports provided: IS_BROWSER, WINDOW, IS_TOUCH_DEVICE, HAS_POINTER_EVENT, NAMESPACE, ACTION_ALL, ACTION_CROP, ACTION_MOVE, ACTION_ZOOM, ACTION_EAST, ACTION_WEST, ACTION_SOUTH, ACTION_NORTH, ACTION_NORTH_EAST, ACTION_NORTH_WEST, ACTION_SOUTH_EAST, ACTION_SOUTH_WEST, CLASS_CROP, CLASS_DISABLED, CLASS_HIDDEN, CLASS_HIDE, CLASS_INVISIBLE, CLASS_MODAL, CLASS_MOVE, DATA_ACTION, DATA_PREVIEW, DRAG_MODE_CROP, DRAG_MODE_MOVE, DRAG_MODE_NONE, EVENT_CROP, EVENT_CROP_END, EVENT_CROP_MOVE, EVENT_CROP_START, EVENT_DBLCLICK, EVENT_TOUCH_START, EVENT_TOUCH_MOVE, EVENT_TOUCH_END, EVENT_POINTER_DOWN, EVENT_POINTER_MOVE, EVENT_POINTER_UP, EVENT_READY, EVENT_RESIZE, EVENT_WHEEL, EVENT_ZOOM, MIME_TYPE_JPEG, REGEXP_ACTIONS, REGEXP_DATA_URL_JPEG, REGEXP_TAG_NAME, MIN_CONTAINER_WIDTH, MIN_CONTAINER_HEIGHT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IS_BROWSER", function() { return IS_BROWSER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WINDOW", function() { return WINDOW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IS_TOUCH_DEVICE", function() { return IS_TOUCH_DEVICE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HAS_POINTER_EVENT", function() { return HAS_POINTER_EVENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NAMESPACE", function() { return NAMESPACE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_ALL", function() { return ACTION_ALL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_CROP", function() { return ACTION_CROP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_MOVE", function() { return ACTION_MOVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_ZOOM", function() { return ACTION_ZOOM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_EAST", function() { return ACTION_EAST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_WEST", function() { return ACTION_WEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_SOUTH", function() { return ACTION_SOUTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_NORTH", function() { return ACTION_NORTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_NORTH_EAST", function() { return ACTION_NORTH_EAST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_NORTH_WEST", function() { return ACTION_NORTH_WEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_SOUTH_EAST", function() { return ACTION_SOUTH_EAST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_SOUTH_WEST", function() { return ACTION_SOUTH_WEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLASS_CROP", function() { return CLASS_CROP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLASS_DISABLED", function() { return CLASS_DISABLED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLASS_HIDDEN", function() { return CLASS_HIDDEN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLASS_HIDE", function() { return CLASS_HIDE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLASS_INVISIBLE", function() { return CLASS_INVISIBLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLASS_MODAL", function() { return CLASS_MODAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLASS_MOVE", function() { return CLASS_MOVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATA_ACTION", function() { return DATA_ACTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATA_PREVIEW", function() { return DATA_PREVIEW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DRAG_MODE_CROP", function() { return DRAG_MODE_CROP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DRAG_MODE_MOVE", function() { return DRAG_MODE_MOVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DRAG_MODE_NONE", function() { return DRAG_MODE_NONE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_CROP", function() { return EVENT_CROP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_CROP_END", function() { return EVENT_CROP_END; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_CROP_MOVE", function() { return EVENT_CROP_MOVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_CROP_START", function() { return EVENT_CROP_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_DBLCLICK", function() { return EVENT_DBLCLICK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_TOUCH_START", function() { return EVENT_TOUCH_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_TOUCH_MOVE", function() { return EVENT_TOUCH_MOVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_TOUCH_END", function() { return EVENT_TOUCH_END; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_POINTER_DOWN", function() { return EVENT_POINTER_DOWN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_POINTER_MOVE", function() { return EVENT_POINTER_MOVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_POINTER_UP", function() { return EVENT_POINTER_UP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_READY", function() { return EVENT_READY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_RESIZE", function() { return EVENT_RESIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_WHEEL", function() { return EVENT_WHEEL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_ZOOM", function() { return EVENT_ZOOM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MIME_TYPE_JPEG", function() { return MIME_TYPE_JPEG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REGEXP_ACTIONS", function() { return REGEXP_ACTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REGEXP_DATA_URL_JPEG", function() { return REGEXP_DATA_URL_JPEG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REGEXP_TAG_NAME", function() { return REGEXP_TAG_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MIN_CONTAINER_WIDTH", function() { return MIN_CONTAINER_WIDTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MIN_CONTAINER_HEIGHT", function() { return MIN_CONTAINER_HEIGHT; });
const IS_BROWSER = typeof window !== 'undefined';
const WINDOW = IS_BROWSER ? window : {};
const IS_TOUCH_DEVICE = IS_BROWSER ? 'ontouchstart' in WINDOW.document.documentElement : false;
const HAS_POINTER_EVENT = IS_BROWSER ? 'PointerEvent' in WINDOW : false;
const NAMESPACE = 'cropper';

// Actions
const ACTION_ALL = 'all';
const ACTION_CROP = 'crop';
const ACTION_MOVE = 'move';
const ACTION_ZOOM = 'zoom';
const ACTION_EAST = 'e';
const ACTION_WEST = 'w';
const ACTION_SOUTH = 's';
const ACTION_NORTH = 'n';
const ACTION_NORTH_EAST = 'ne';
const ACTION_NORTH_WEST = 'nw';
const ACTION_SOUTH_EAST = 'se';
const ACTION_SOUTH_WEST = 'sw';

// Classes
const CLASS_CROP = `${NAMESPACE}-crop`;
const CLASS_DISABLED = `${NAMESPACE}-disabled`;
const CLASS_HIDDEN = `${NAMESPACE}-hidden`;
const CLASS_HIDE = `${NAMESPACE}-hide`;
const CLASS_INVISIBLE = `${NAMESPACE}-invisible`;
const CLASS_MODAL = `${NAMESPACE}-modal`;
const CLASS_MOVE = `${NAMESPACE}-move`;

// Data keys
const DATA_ACTION = `${NAMESPACE}Action`;
const DATA_PREVIEW = `${NAMESPACE}Preview`;

// Drag modes
const DRAG_MODE_CROP = 'crop';
const DRAG_MODE_MOVE = 'move';
const DRAG_MODE_NONE = 'none';

// Events
const EVENT_CROP = 'crop';
const EVENT_CROP_END = 'cropend';
const EVENT_CROP_MOVE = 'cropmove';
const EVENT_CROP_START = 'cropstart';
const EVENT_DBLCLICK = 'dblclick';
const EVENT_TOUCH_START = IS_TOUCH_DEVICE ? 'touchstart' : 'mousedown';
const EVENT_TOUCH_MOVE = IS_TOUCH_DEVICE ? 'touchmove' : 'mousemove';
const EVENT_TOUCH_END = IS_TOUCH_DEVICE ? 'touchend touchcancel' : 'mouseup';
const EVENT_POINTER_DOWN = HAS_POINTER_EVENT ? 'pointerdown' : EVENT_TOUCH_START;
const EVENT_POINTER_MOVE = HAS_POINTER_EVENT ? 'pointermove' : EVENT_TOUCH_MOVE;
const EVENT_POINTER_UP = HAS_POINTER_EVENT ? 'pointerup pointercancel' : EVENT_TOUCH_END;
const EVENT_READY = 'ready';
const EVENT_RESIZE = 'resize';
const EVENT_WHEEL = 'wheel';
const EVENT_ZOOM = 'zoom';

// Mime types
const MIME_TYPE_JPEG = 'image/jpeg';

// RegExps
const REGEXP_ACTIONS = /^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/;
const REGEXP_DATA_URL_JPEG = /^data:image\/jpeg;base64,/;
const REGEXP_TAG_NAME = /^img|canvas$/i;

// Misc
// Inspired by the default width and height of a canvas element.
const MIN_CONTAINER_WIDTH = 200;
const MIN_CONTAINER_HEIGHT = 100;


/***/ }),

/***/ "./node_modules/cropperjs/src/js/cropper.js":
/*!**************************************************!*\
  !*** ./node_modules/cropperjs/src/js/cropper.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _defaults__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defaults */ "./node_modules/cropperjs/src/js/defaults.js");
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./template */ "./node_modules/cropperjs/src/js/template.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render */ "./node_modules/cropperjs/src/js/render.js");
/* harmony import */ var _preview__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./preview */ "./node_modules/cropperjs/src/js/preview.js");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./events */ "./node_modules/cropperjs/src/js/events.js");
/* harmony import */ var _handlers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./handlers */ "./node_modules/cropperjs/src/js/handlers.js");
/* harmony import */ var _change__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./change */ "./node_modules/cropperjs/src/js/change.js");
/* harmony import */ var _methods__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./methods */ "./node_modules/cropperjs/src/js/methods.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./constants */ "./node_modules/cropperjs/src/js/constants.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utilities */ "./node_modules/cropperjs/src/js/utilities.js");











const AnotherCropper = _constants__WEBPACK_IMPORTED_MODULE_8__["WINDOW"].Cropper;

class Cropper {
  /**
   * Create a new Cropper.
   * @param {Element} element - The target element for cropping.
   * @param {Object} [options={}] - The configuration options.
   */
  constructor(element, options = {}) {
    if (!element || !_constants__WEBPACK_IMPORTED_MODULE_8__["REGEXP_TAG_NAME"].test(element.tagName)) {
      throw new Error('The first argument is required and must be an <img> or <canvas> element.');
    }

    this.element = element;
    this.options = Object(_utilities__WEBPACK_IMPORTED_MODULE_9__["assign"])({}, _defaults__WEBPACK_IMPORTED_MODULE_0__["default"], Object(_utilities__WEBPACK_IMPORTED_MODULE_9__["isPlainObject"])(options) && options);
    this.cropped = false;
    this.disabled = false;
    this.pointers = {};
    this.ready = false;
    this.reloading = false;
    this.replaced = false;
    this.sized = false;
    this.sizing = false;
    this.init();
  }

  init() {
    const { element } = this;
    const tagName = element.tagName.toLowerCase();
    let url;

    if (element[_constants__WEBPACK_IMPORTED_MODULE_8__["NAMESPACE"]]) {
      return;
    }

    element[_constants__WEBPACK_IMPORTED_MODULE_8__["NAMESPACE"]] = this;

    if (tagName === 'img') {
      this.isImg = true;

      // e.g.: "img/picture.jpg"
      url = element.getAttribute('src') || '';
      this.originalUrl = url;

      // Stop when it's a blank image
      if (!url) {
        return;
      }

      // e.g.: "http://example.com/img/picture.jpg"
      url = element.src;
    } else if (tagName === 'canvas' && window.HTMLCanvasElement) {
      url = element.toDataURL();
    }

    this.load(url);
  }

  load(url) {
    if (!url) {
      return;
    }

    this.url = url;
    this.imageData = {};

    const { element, options } = this;

    if (!options.rotatable && !options.scalable) {
      options.checkOrientation = false;
    }

    // Only IE10+ supports Typed Arrays
    if (!options.checkOrientation || !window.ArrayBuffer) {
      this.clone();
      return;
    }

    // Read ArrayBuffer from Data URL of JPEG images directly for better performance.
    if (_constants__WEBPACK_IMPORTED_MODULE_8__["REGEXP_DATA_URL_JPEG"].test(url)) {
      this.read(Object(_utilities__WEBPACK_IMPORTED_MODULE_9__["dataURLToArrayBuffer"])(url));
      return;
    }

    const xhr = new XMLHttpRequest();
    const clone = this.clone.bind(this);

    this.reloading = true;
    this.xhr = xhr;

    // 1. Cross origin requests are only supported for protocol schemes:
    // http, https, data, chrome, chrome-extension.
    // 2. Access to XMLHttpRequest from a Data URL will be blocked by CORS policy
    // in some browsers as IE11 and Safari.
    xhr.onabort = clone;
    xhr.onerror = clone;
    xhr.ontimeout = clone;

    xhr.onprogress = () => {
      if (xhr.getResponseHeader('content-type') !== _constants__WEBPACK_IMPORTED_MODULE_8__["MIME_TYPE_JPEG"]) {
        xhr.abort();
      }
    };

    xhr.onload = () => {
      this.read(xhr.response);
    };

    xhr.onloadend = () => {
      this.reloading = false;
      this.xhr = null;
    };

    // Bust cache when there is a "crossOrigin" property to avoid browser cache error
    if (options.checkCrossOrigin && Object(_utilities__WEBPACK_IMPORTED_MODULE_9__["isCrossOriginURL"])(url) && element.crossOrigin) {
      url = Object(_utilities__WEBPACK_IMPORTED_MODULE_9__["addTimestamp"])(url);
    }

    xhr.open('GET', url);
    xhr.responseType = 'arraybuffer';
    xhr.withCredentials = element.crossOrigin === 'use-credentials';
    xhr.send();
  }

  read(arrayBuffer) {
    const { options, imageData } = this;

    // Reset the orientation value to its default value 1
    // as some iOS browsers will render image with its orientation
    const orientation = Object(_utilities__WEBPACK_IMPORTED_MODULE_9__["resetAndGetOrientation"])(arrayBuffer);
    let rotate = 0;
    let scaleX = 1;
    let scaleY = 1;

    if (orientation > 1) {
      // Generate a new URL which has the default orientation value
      this.url = Object(_utilities__WEBPACK_IMPORTED_MODULE_9__["arrayBufferToDataURL"])(arrayBuffer, _constants__WEBPACK_IMPORTED_MODULE_8__["MIME_TYPE_JPEG"]);
      ({ rotate, scaleX, scaleY } = Object(_utilities__WEBPACK_IMPORTED_MODULE_9__["parseOrientation"])(orientation));
    }

    if (options.rotatable) {
      imageData.rotate = rotate;
    }

    if (options.scalable) {
      imageData.scaleX = scaleX;
      imageData.scaleY = scaleY;
    }

    this.clone();
  }

  clone() {
    const { element, url } = this;
    let crossOrigin;
    let crossOriginUrl;

    if (this.options.checkCrossOrigin && Object(_utilities__WEBPACK_IMPORTED_MODULE_9__["isCrossOriginURL"])(url)) {
      ({ crossOrigin } = element);

      if (crossOrigin) {
        crossOriginUrl = url;
      } else {
        crossOrigin = 'anonymous';

        // Bust cache when there is not a "crossOrigin" property
        crossOriginUrl = Object(_utilities__WEBPACK_IMPORTED_MODULE_9__["addTimestamp"])(url);
      }
    }

    this.crossOrigin = crossOrigin;
    this.crossOriginUrl = crossOriginUrl;

    const image = document.createElement('img');

    if (crossOrigin) {
      image.crossOrigin = crossOrigin;
    }

    image.src = crossOriginUrl || url;
    this.image = image;
    image.onload = this.start.bind(this);
    image.onerror = this.stop.bind(this);
    Object(_utilities__WEBPACK_IMPORTED_MODULE_9__["addClass"])(image, _constants__WEBPACK_IMPORTED_MODULE_8__["CLASS_HIDE"]);
    element.parentNode.insertBefore(image, element.nextSibling);
  }

  start() {
    const image = this.isImg ? this.element : this.image;

    image.onload = null;
    image.onerror = null;
    this.sizing = true;

    const IS_SAFARI = _constants__WEBPACK_IMPORTED_MODULE_8__["WINDOW"].navigator && /^(?:.(?!chrome|android))*safari/i.test(_constants__WEBPACK_IMPORTED_MODULE_8__["WINDOW"].navigator.userAgent);
    const done = (naturalWidth, naturalHeight) => {
      Object(_utilities__WEBPACK_IMPORTED_MODULE_9__["assign"])(this.imageData, {
        naturalWidth,
        naturalHeight,
        aspectRatio: naturalWidth / naturalHeight,
      });
      this.sizing = false;
      this.sized = true;
      this.build();
    };

    // Modern browsers (except Safari)
    if (image.naturalWidth && !IS_SAFARI) {
      done(image.naturalWidth, image.naturalHeight);
      return;
    }

    const sizingImage = document.createElement('img');
    const body = document.body || document.documentElement;

    this.sizingImage = sizingImage;

    sizingImage.onload = () => {
      done(sizingImage.width, sizingImage.height);

      if (!IS_SAFARI) {
        body.removeChild(sizingImage);
      }
    };

    sizingImage.src = image.src;

    // iOS Safari will convert the image automatically
    // with its orientation once append it into DOM (#279)
    if (!IS_SAFARI) {
      sizingImage.style.cssText = (
        'left:0;'
        + 'max-height:none!important;'
        + 'max-width:none!important;'
        + 'min-height:0!important;'
        + 'min-width:0!important;'
        + 'opacity:0;'
        + 'position:absolute;'
        + 'top:0;'
        + 'z-index:-1;'
      );
      body.appendChild(sizingImage);
    }
  }

  stop() {
    const { image } = this;

    image.onload = null;
    image.onerror = null;
    image.parentNode.removeChild(image);
    this.image = null;
  }

  build() {
    if (!this.sized || this.ready) {
      return;
    }

    const { element, options, image } = this;

    // Create cropper elements
    const container = element.parentNode;
    const template = document.createElement('div');

    template.innerHTML = _template__WEBPACK_IMPORTED_MODULE_1__["default"];

    const cropper = template.querySelector(`.${_constants__WEBPACK_IMPORTED_MODULE_8__["NAMESPACE"]}-container`);
    const canvas = cropper.querySelector(`.${_constants__WEBPACK_IMPORTED_MODULE_8__["NAMESPACE"]}-canvas`);
    const dragBox = cropper.querySelector(`.${_constants__WEBPACK_IMPORTED_MODULE_8__["NAMESPACE"]}-drag-box`);
    const cropBox = cropper.querySelector(`.${_constants__WEBPACK_IMPORTED_MODULE_8__["NAMESPACE"]}-crop-box`);
    const face = cropBox.querySelector(`.${_constants__WEBPACK_IMPORTED_MODULE_8__["NAMESPACE"]}-face`);

    this.container = container;
    this.cropper = cropper;
    this.canvas = canvas;
    this.dragBox = dragBox;
    this.cropBox = cropBox;
    this.viewBox = cropper.querySelector(`.${_constants__WEBPACK_IMPORTED_MODULE_8__["NAMESPACE"]}-view-box`);
    this.face = face;

    canvas.appendChild(image);

    // Hide the original image
    Object(_utilities__WEBPACK_IMPORTED_MODULE_9__["addClass"])(element, _constants__WEBPACK_IMPORTED_MODULE_8__["CLASS_HIDDEN"]);

    // Inserts the cropper after to the current image
    container.insertBefore(cropper, element.nextSibling);

    // Show the image if is hidden
    if (!this.isImg) {
      Object(_utilities__WEBPACK_IMPORTED_MODULE_9__["removeClass"])(image, _constants__WEBPACK_IMPORTED_MODULE_8__["CLASS_HIDE"]);
    }

    this.initPreview();
    this.bind();

    options.initialAspectRatio = Math.max(0, options.initialAspectRatio) || NaN;
    options.aspectRatio = Math.max(0, options.aspectRatio) || NaN;
    options.viewMode = Math.max(0, Math.min(3, Math.round(options.viewMode))) || 0;

    Object(_utilities__WEBPACK_IMPORTED_MODULE_9__["addClass"])(cropBox, _constants__WEBPACK_IMPORTED_MODULE_8__["CLASS_HIDDEN"]);

    if (!options.guides) {
      Object(_utilities__WEBPACK_IMPORTED_MODULE_9__["addClass"])(cropBox.getElementsByClassName(`${_constants__WEBPACK_IMPORTED_MODULE_8__["NAMESPACE"]}-dashed`), _constants__WEBPACK_IMPORTED_MODULE_8__["CLASS_HIDDEN"]);
    }

    if (!options.center) {
      Object(_utilities__WEBPACK_IMPORTED_MODULE_9__["addClass"])(cropBox.getElementsByClassName(`${_constants__WEBPACK_IMPORTED_MODULE_8__["NAMESPACE"]}-center`), _constants__WEBPACK_IMPORTED_MODULE_8__["CLASS_HIDDEN"]);
    }

    if (options.background) {
      Object(_utilities__WEBPACK_IMPORTED_MODULE_9__["addClass"])(cropper, `${_constants__WEBPACK_IMPORTED_MODULE_8__["NAMESPACE"]}-bg`);
    }

    if (!options.highlight) {
      Object(_utilities__WEBPACK_IMPORTED_MODULE_9__["addClass"])(face, _constants__WEBPACK_IMPORTED_MODULE_8__["CLASS_INVISIBLE"]);
    }

    if (options.cropBoxMovable) {
      Object(_utilities__WEBPACK_IMPORTED_MODULE_9__["addClass"])(face, _constants__WEBPACK_IMPORTED_MODULE_8__["CLASS_MOVE"]);
      Object(_utilities__WEBPACK_IMPORTED_MODULE_9__["setData"])(face, _constants__WEBPACK_IMPORTED_MODULE_8__["DATA_ACTION"], _constants__WEBPACK_IMPORTED_MODULE_8__["ACTION_ALL"]);
    }

    if (!options.cropBoxResizable) {
      Object(_utilities__WEBPACK_IMPORTED_MODULE_9__["addClass"])(cropBox.getElementsByClassName(`${_constants__WEBPACK_IMPORTED_MODULE_8__["NAMESPACE"]}-line`), _constants__WEBPACK_IMPORTED_MODULE_8__["CLASS_HIDDEN"]);
      Object(_utilities__WEBPACK_IMPORTED_MODULE_9__["addClass"])(cropBox.getElementsByClassName(`${_constants__WEBPACK_IMPORTED_MODULE_8__["NAMESPACE"]}-point`), _constants__WEBPACK_IMPORTED_MODULE_8__["CLASS_HIDDEN"]);
    }

    this.render();
    this.ready = true;
    this.setDragMode(options.dragMode);

    if (options.autoCrop) {
      this.crop();
    }

    this.setData(options.data);

    if (Object(_utilities__WEBPACK_IMPORTED_MODULE_9__["isFunction"])(options.ready)) {
      Object(_utilities__WEBPACK_IMPORTED_MODULE_9__["addListener"])(element, _constants__WEBPACK_IMPORTED_MODULE_8__["EVENT_READY"], options.ready, {
        once: true,
      });
    }

    Object(_utilities__WEBPACK_IMPORTED_MODULE_9__["dispatchEvent"])(element, _constants__WEBPACK_IMPORTED_MODULE_8__["EVENT_READY"]);
  }

  unbuild() {
    if (!this.ready) {
      return;
    }

    this.ready = false;
    this.unbind();
    this.resetPreview();
    this.cropper.parentNode.removeChild(this.cropper);
    Object(_utilities__WEBPACK_IMPORTED_MODULE_9__["removeClass"])(this.element, _constants__WEBPACK_IMPORTED_MODULE_8__["CLASS_HIDDEN"]);
  }

  uncreate() {
    if (this.ready) {
      this.unbuild();
      this.ready = false;
      this.cropped = false;
    } else if (this.sizing) {
      this.sizingImage.onload = null;
      this.sizing = false;
      this.sized = false;
    } else if (this.reloading) {
      this.xhr.onabort = null;
      this.xhr.abort();
    } else if (this.image) {
      this.stop();
    }
  }

  /**
   * Get the no conflict cropper class.
   * @returns {Cropper} The cropper class.
   */
  static noConflict() {
    window.Cropper = AnotherCropper;
    return Cropper;
  }

  /**
   * Change the default options.
   * @param {Object} options - The new default options.
   */
  static setDefaults(options) {
    Object(_utilities__WEBPACK_IMPORTED_MODULE_9__["assign"])(_defaults__WEBPACK_IMPORTED_MODULE_0__["default"], Object(_utilities__WEBPACK_IMPORTED_MODULE_9__["isPlainObject"])(options) && options);
  }
}

Object(_utilities__WEBPACK_IMPORTED_MODULE_9__["assign"])(Cropper.prototype, _render__WEBPACK_IMPORTED_MODULE_2__["default"], _preview__WEBPACK_IMPORTED_MODULE_3__["default"], _events__WEBPACK_IMPORTED_MODULE_4__["default"], _handlers__WEBPACK_IMPORTED_MODULE_5__["default"], _change__WEBPACK_IMPORTED_MODULE_6__["default"], _methods__WEBPACK_IMPORTED_MODULE_7__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Cropper);


/***/ }),

/***/ "./node_modules/cropperjs/src/js/defaults.js":
/*!***************************************************!*\
  !*** ./node_modules/cropperjs/src/js/defaults.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./node_modules/cropperjs/src/js/constants.js");


/* harmony default export */ __webpack_exports__["default"] = ({
  // Define the view mode of the cropper
  viewMode: 0, // 0, 1, 2, 3

  // Define the dragging mode of the cropper
  dragMode: _constants__WEBPACK_IMPORTED_MODULE_0__["DRAG_MODE_CROP"], // 'crop', 'move' or 'none'

  // Define the initial aspect ratio of the crop box
  initialAspectRatio: NaN,

  // Define the aspect ratio of the crop box
  aspectRatio: NaN,

  // An object with the previous cropping result data
  data: null,

  // A selector for adding extra containers to preview
  preview: '',

  // Re-render the cropper when resize the window
  responsive: true,

  // Restore the cropped area after resize the window
  restore: true,

  // Check if the current image is a cross-origin image
  checkCrossOrigin: true,

  // Check the current image's Exif Orientation information
  checkOrientation: true,

  // Show the black modal
  modal: true,

  // Show the dashed lines for guiding
  guides: true,

  // Show the center indicator for guiding
  center: true,

  // Show the white modal to highlight the crop box
  highlight: true,

  // Show the grid background
  background: true,

  // Enable to crop the image automatically when initialize
  autoCrop: true,

  // Define the percentage of automatic cropping area when initializes
  autoCropArea: 0.8,

  // Enable to move the image
  movable: true,

  // Enable to rotate the image
  rotatable: true,

  // Enable to scale the image
  scalable: true,

  // Enable to zoom the image
  zoomable: true,

  // Enable to zoom the image by dragging touch
  zoomOnTouch: true,

  // Enable to zoom the image by wheeling mouse
  zoomOnWheel: true,

  // Define zoom ratio when zoom the image by wheeling mouse
  wheelZoomRatio: 0.1,

  // Enable to move the crop box
  cropBoxMovable: true,

  // Enable to resize the crop box
  cropBoxResizable: true,

  // Toggle drag mode between "crop" and "move" when click twice on the cropper
  toggleDragModeOnDblclick: true,

  // Size limitation
  minCanvasWidth: 0,
  minCanvasHeight: 0,
  minCropBoxWidth: 0,
  minCropBoxHeight: 0,
  minContainerWidth: 200,
  minContainerHeight: 100,

  // Shortcuts of events
  ready: null,
  cropstart: null,
  cropmove: null,
  cropend: null,
  crop: null,
  zoom: null,
});


/***/ }),

/***/ "./node_modules/cropperjs/src/js/events.js":
/*!*************************************************!*\
  !*** ./node_modules/cropperjs/src/js/events.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./node_modules/cropperjs/src/js/constants.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utilities */ "./node_modules/cropperjs/src/js/utilities.js");



/* harmony default export */ __webpack_exports__["default"] = ({
  bind() {
    const { element, options, cropper } = this;

    if (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(options.cropstart)) {
      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["addListener"])(element, _constants__WEBPACK_IMPORTED_MODULE_0__["EVENT_CROP_START"], options.cropstart);
    }

    if (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(options.cropmove)) {
      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["addListener"])(element, _constants__WEBPACK_IMPORTED_MODULE_0__["EVENT_CROP_MOVE"], options.cropmove);
    }

    if (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(options.cropend)) {
      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["addListener"])(element, _constants__WEBPACK_IMPORTED_MODULE_0__["EVENT_CROP_END"], options.cropend);
    }

    if (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(options.crop)) {
      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["addListener"])(element, _constants__WEBPACK_IMPORTED_MODULE_0__["EVENT_CROP"], options.crop);
    }

    if (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(options.zoom)) {
      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["addListener"])(element, _constants__WEBPACK_IMPORTED_MODULE_0__["EVENT_ZOOM"], options.zoom);
    }

    Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["addListener"])(cropper, _constants__WEBPACK_IMPORTED_MODULE_0__["EVENT_POINTER_DOWN"], (this.onCropStart = this.cropStart.bind(this)));

    if (options.zoomable && options.zoomOnWheel) {
      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["addListener"])(cropper, _constants__WEBPACK_IMPORTED_MODULE_0__["EVENT_WHEEL"], (this.onWheel = this.wheel.bind(this)), {
        passive: false,
        capture: true,
      });
    }

    if (options.toggleDragModeOnDblclick) {
      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["addListener"])(cropper, _constants__WEBPACK_IMPORTED_MODULE_0__["EVENT_DBLCLICK"], (this.onDblclick = this.dblclick.bind(this)));
    }

    Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["addListener"])(
      element.ownerDocument,
      _constants__WEBPACK_IMPORTED_MODULE_0__["EVENT_POINTER_MOVE"],
      (this.onCropMove = this.cropMove.bind(this)),
    );
    Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["addListener"])(
      element.ownerDocument,
      _constants__WEBPACK_IMPORTED_MODULE_0__["EVENT_POINTER_UP"],
      (this.onCropEnd = this.cropEnd.bind(this)),
    );

    if (options.responsive) {
      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["addListener"])(window, _constants__WEBPACK_IMPORTED_MODULE_0__["EVENT_RESIZE"], (this.onResize = this.resize.bind(this)));
    }
  },

  unbind() {
    const { element, options, cropper } = this;

    if (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(options.cropstart)) {
      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["removeListener"])(element, _constants__WEBPACK_IMPORTED_MODULE_0__["EVENT_CROP_START"], options.cropstart);
    }

    if (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(options.cropmove)) {
      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["removeListener"])(element, _constants__WEBPACK_IMPORTED_MODULE_0__["EVENT_CROP_MOVE"], options.cropmove);
    }

    if (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(options.cropend)) {
      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["removeListener"])(element, _constants__WEBPACK_IMPORTED_MODULE_0__["EVENT_CROP_END"], options.cropend);
    }

    if (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(options.crop)) {
      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["removeListener"])(element, _constants__WEBPACK_IMPORTED_MODULE_0__["EVENT_CROP"], options.crop);
    }

    if (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(options.zoom)) {
      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["removeListener"])(element, _constants__WEBPACK_IMPORTED_MODULE_0__["EVENT_ZOOM"], options.zoom);
    }

    Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["removeListener"])(cropper, _constants__WEBPACK_IMPORTED_MODULE_0__["EVENT_POINTER_DOWN"], this.onCropStart);

    if (options.zoomable && options.zoomOnWheel) {
      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["removeListener"])(cropper, _constants__WEBPACK_IMPORTED_MODULE_0__["EVENT_WHEEL"], this.onWheel, {
        passive: false,
        capture: true,
      });
    }

    if (options.toggleDragModeOnDblclick) {
      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["removeListener"])(cropper, _constants__WEBPACK_IMPORTED_MODULE_0__["EVENT_DBLCLICK"], this.onDblclick);
    }

    Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["removeListener"])(element.ownerDocument, _constants__WEBPACK_IMPORTED_MODULE_0__["EVENT_POINTER_MOVE"], this.onCropMove);
    Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["removeListener"])(element.ownerDocument, _constants__WEBPACK_IMPORTED_MODULE_0__["EVENT_POINTER_UP"], this.onCropEnd);

    if (options.responsive) {
      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["removeListener"])(window, _constants__WEBPACK_IMPORTED_MODULE_0__["EVENT_RESIZE"], this.onResize);
    }
  },
});


/***/ }),

/***/ "./node_modules/cropperjs/src/js/handlers.js":
/*!***************************************************!*\
  !*** ./node_modules/cropperjs/src/js/handlers.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./node_modules/cropperjs/src/js/constants.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utilities */ "./node_modules/cropperjs/src/js/utilities.js");



/* harmony default export */ __webpack_exports__["default"] = ({
  resize() {
    const { options, container, containerData } = this;
    const minContainerWidth = Number(options.minContainerWidth) || _constants__WEBPACK_IMPORTED_MODULE_0__["MIN_CONTAINER_WIDTH"];
    const minContainerHeight = Number(options.minContainerHeight) || _constants__WEBPACK_IMPORTED_MODULE_0__["MIN_CONTAINER_HEIGHT"];

    if (this.disabled || containerData.width <= minContainerWidth
      || containerData.height <= minContainerHeight) {
      return;
    }

    const ratio = container.offsetWidth / containerData.width;

    // Resize when width changed or height changed
    if (ratio !== 1 || container.offsetHeight !== containerData.height) {
      let canvasData;
      let cropBoxData;

      if (options.restore) {
        canvasData = this.getCanvasData();
        cropBoxData = this.getCropBoxData();
      }

      this.render();

      if (options.restore) {
        this.setCanvasData(Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["forEach"])(canvasData, (n, i) => {
          canvasData[i] = n * ratio;
        }));
        this.setCropBoxData(Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["forEach"])(cropBoxData, (n, i) => {
          cropBoxData[i] = n * ratio;
        }));
      }
    }
  },

  dblclick() {
    if (this.disabled || this.options.dragMode === _constants__WEBPACK_IMPORTED_MODULE_0__["DRAG_MODE_NONE"]) {
      return;
    }

    this.setDragMode(Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["hasClass"])(this.dragBox, _constants__WEBPACK_IMPORTED_MODULE_0__["CLASS_CROP"]) ? _constants__WEBPACK_IMPORTED_MODULE_0__["DRAG_MODE_MOVE"] : _constants__WEBPACK_IMPORTED_MODULE_0__["DRAG_MODE_CROP"]);
  },

  wheel(event) {
    const ratio = Number(this.options.wheelZoomRatio) || 0.1;
    let delta = 1;

    if (this.disabled) {
      return;
    }

    event.preventDefault();

    // Limit wheel speed to prevent zoom too fast (#21)
    if (this.wheeling) {
      return;
    }

    this.wheeling = true;

    setTimeout(() => {
      this.wheeling = false;
    }, 50);

    if (event.deltaY) {
      delta = event.deltaY > 0 ? 1 : -1;
    } else if (event.wheelDelta) {
      delta = -event.wheelDelta / 120;
    } else if (event.detail) {
      delta = event.detail > 0 ? 1 : -1;
    }

    this.zoom(-delta * ratio, event);
  },

  cropStart(event) {
    const { buttons, button } = event;

    if (
      this.disabled

      // No primary button (Usually the left button)
      // Note that touch events have no `buttons` or `button` property
      || (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(buttons) && buttons !== 1)
      || (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(button) && button !== 0)

      // Open context menu
      || event.ctrlKey
    ) {
      return;
    }

    const { options, pointers } = this;
    let action;

    if (event.changedTouches) {
      // Handle touch event
      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["forEach"])(event.changedTouches, (touch) => {
        pointers[touch.identifier] = Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["getPointer"])(touch);
      });
    } else {
      // Handle mouse event and pointer event
      pointers[event.pointerId || 0] = Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["getPointer"])(event);
    }

    if (Object.keys(pointers).length > 1 && options.zoomable && options.zoomOnTouch) {
      action = _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_ZOOM"];
    } else {
      action = Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["getData"])(event.target, _constants__WEBPACK_IMPORTED_MODULE_0__["DATA_ACTION"]);
    }

    if (!_constants__WEBPACK_IMPORTED_MODULE_0__["REGEXP_ACTIONS"].test(action)) {
      return;
    }

    if (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["dispatchEvent"])(this.element, _constants__WEBPACK_IMPORTED_MODULE_0__["EVENT_CROP_START"], {
      originalEvent: event,
      action,
    }) === false) {
      return;
    }

    // This line is required for preventing page zooming in iOS browsers
    event.preventDefault();

    this.action = action;
    this.cropping = false;

    if (action === _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_CROP"]) {
      this.cropping = true;
      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["addClass"])(this.dragBox, _constants__WEBPACK_IMPORTED_MODULE_0__["CLASS_MODAL"]);
    }
  },

  cropMove(event) {
    const { action } = this;

    if (this.disabled || !action) {
      return;
    }

    const { pointers } = this;

    event.preventDefault();

    if (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["dispatchEvent"])(this.element, _constants__WEBPACK_IMPORTED_MODULE_0__["EVENT_CROP_MOVE"], {
      originalEvent: event,
      action,
    }) === false) {
      return;
    }

    if (event.changedTouches) {
      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["forEach"])(event.changedTouches, (touch) => {
        // The first parameter should not be undefined (#432)
        Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["assign"])(pointers[touch.identifier] || {}, Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["getPointer"])(touch, true));
      });
    } else {
      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["assign"])(pointers[event.pointerId || 0] || {}, Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["getPointer"])(event, true));
    }

    this.change(event);
  },

  cropEnd(event) {
    if (this.disabled) {
      return;
    }

    const { action, pointers } = this;

    if (event.changedTouches) {
      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["forEach"])(event.changedTouches, (touch) => {
        delete pointers[touch.identifier];
      });
    } else {
      delete pointers[event.pointerId || 0];
    }

    if (!action) {
      return;
    }

    event.preventDefault();

    if (!Object.keys(pointers).length) {
      this.action = '';
    }

    if (this.cropping) {
      this.cropping = false;
      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["toggleClass"])(this.dragBox, _constants__WEBPACK_IMPORTED_MODULE_0__["CLASS_MODAL"], this.cropped && this.options.modal);
    }

    Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["dispatchEvent"])(this.element, _constants__WEBPACK_IMPORTED_MODULE_0__["EVENT_CROP_END"], {
      originalEvent: event,
      action,
    });
  },
});


/***/ }),

/***/ "./node_modules/cropperjs/src/js/methods.js":
/*!**************************************************!*\
  !*** ./node_modules/cropperjs/src/js/methods.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./node_modules/cropperjs/src/js/constants.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utilities */ "./node_modules/cropperjs/src/js/utilities.js");



/* harmony default export */ __webpack_exports__["default"] = ({
  // Show the crop box manually
  crop() {
    if (this.ready && !this.cropped && !this.disabled) {
      this.cropped = true;
      this.limitCropBox(true, true);

      if (this.options.modal) {
        Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["addClass"])(this.dragBox, _constants__WEBPACK_IMPORTED_MODULE_0__["CLASS_MODAL"]);
      }

      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["removeClass"])(this.cropBox, _constants__WEBPACK_IMPORTED_MODULE_0__["CLASS_HIDDEN"]);
      this.setCropBoxData(this.initialCropBoxData);
    }

    return this;
  },

  // Reset the image and crop box to their initial states
  reset() {
    if (this.ready && !this.disabled) {
      this.imageData = Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["assign"])({}, this.initialImageData);
      this.canvasData = Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["assign"])({}, this.initialCanvasData);
      this.cropBoxData = Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["assign"])({}, this.initialCropBoxData);
      this.renderCanvas();

      if (this.cropped) {
        this.renderCropBox();
      }
    }

    return this;
  },

  // Clear the crop box
  clear() {
    if (this.cropped && !this.disabled) {
      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["assign"])(this.cropBoxData, {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      });

      this.cropped = false;
      this.renderCropBox();
      this.limitCanvas(true, true);

      // Render canvas after crop box rendered
      this.renderCanvas();
      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["removeClass"])(this.dragBox, _constants__WEBPACK_IMPORTED_MODULE_0__["CLASS_MODAL"]);
      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["addClass"])(this.cropBox, _constants__WEBPACK_IMPORTED_MODULE_0__["CLASS_HIDDEN"]);
    }

    return this;
  },

  /**
   * Replace the image's src and rebuild the cropper
   * @param {string} url - The new URL.
   * @param {boolean} [hasSameSize] - Indicate if the new image has the same size as the old one.
   * @returns {Cropper} this
   */
  replace(url, hasSameSize = false) {
    if (!this.disabled && url) {
      if (this.isImg) {
        this.element.src = url;
      }

      if (hasSameSize) {
        this.url = url;
        this.image.src = url;

        if (this.ready) {
          this.viewBoxImage.src = url;

          Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["forEach"])(this.previews, (element) => {
            element.getElementsByTagName('img')[0].src = url;
          });
        }
      } else {
        if (this.isImg) {
          this.replaced = true;
        }

        this.options.data = null;
        this.uncreate();
        this.load(url);
      }
    }

    return this;
  },

  // Enable (unfreeze) the cropper
  enable() {
    if (this.ready && this.disabled) {
      this.disabled = false;
      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["removeClass"])(this.cropper, _constants__WEBPACK_IMPORTED_MODULE_0__["CLASS_DISABLED"]);
    }

    return this;
  },

  // Disable (freeze) the cropper
  disable() {
    if (this.ready && !this.disabled) {
      this.disabled = true;
      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["addClass"])(this.cropper, _constants__WEBPACK_IMPORTED_MODULE_0__["CLASS_DISABLED"]);
    }

    return this;
  },

  /**
   * Destroy the cropper and remove the instance from the image
   * @returns {Cropper} this
   */
  destroy() {
    const { element } = this;

    if (!element[_constants__WEBPACK_IMPORTED_MODULE_0__["NAMESPACE"]]) {
      return this;
    }

    element[_constants__WEBPACK_IMPORTED_MODULE_0__["NAMESPACE"]] = undefined;

    if (this.isImg && this.replaced) {
      element.src = this.originalUrl;
    }

    this.uncreate();
    return this;
  },

  /**
   * Move the canvas with relative offsets
   * @param {number} offsetX - The relative offset distance on the x-axis.
   * @param {number} [offsetY=offsetX] - The relative offset distance on the y-axis.
   * @returns {Cropper} this
   */
  move(offsetX, offsetY = offsetX) {
    const { left, top } = this.canvasData;

    return this.moveTo(
      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isUndefined"])(offsetX) ? offsetX : (left + Number(offsetX)),
      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isUndefined"])(offsetY) ? offsetY : (top + Number(offsetY)),
    );
  },

  /**
   * Move the canvas to an absolute point
   * @param {number} x - The x-axis coordinate.
   * @param {number} [y=x] - The y-axis coordinate.
   * @returns {Cropper} this
   */
  moveTo(x, y = x) {
    const { canvasData } = this;
    let changed = false;

    x = Number(x);
    y = Number(y);

    if (this.ready && !this.disabled && this.options.movable) {
      if (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(x)) {
        canvasData.left = x;
        changed = true;
      }

      if (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(y)) {
        canvasData.top = y;
        changed = true;
      }

      if (changed) {
        this.renderCanvas(true);
      }
    }

    return this;
  },

  /**
   * Zoom the canvas with a relative ratio
   * @param {number} ratio - The target ratio.
   * @param {Event} _originalEvent - The original event if any.
   * @returns {Cropper} this
   */
  zoom(ratio, _originalEvent) {
    const { canvasData } = this;

    ratio = Number(ratio);

    if (ratio < 0) {
      ratio = 1 / (1 - ratio);
    } else {
      ratio = 1 + ratio;
    }

    return this.zoomTo((canvasData.width * ratio) / canvasData.naturalWidth, null, _originalEvent);
  },

  /**
   * Zoom the canvas to an absolute ratio
   * @param {number} ratio - The target ratio.
   * @param {Object} pivot - The zoom pivot point coordinate.
   * @param {Event} _originalEvent - The original event if any.
   * @returns {Cropper} this
   */
  zoomTo(ratio, pivot, _originalEvent) {
    const { options, canvasData } = this;
    const {
      width,
      height,
      naturalWidth,
      naturalHeight,
    } = canvasData;

    ratio = Number(ratio);

    if (ratio >= 0 && this.ready && !this.disabled && options.zoomable) {
      const newWidth = naturalWidth * ratio;
      const newHeight = naturalHeight * ratio;

      if (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["dispatchEvent"])(this.element, _constants__WEBPACK_IMPORTED_MODULE_0__["EVENT_ZOOM"], {
        ratio,
        oldRatio: width / naturalWidth,
        originalEvent: _originalEvent,
      }) === false) {
        return this;
      }

      if (_originalEvent) {
        const { pointers } = this;
        const offset = Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["getOffset"])(this.cropper);
        const center = pointers && Object.keys(pointers).length ? Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["getPointersCenter"])(pointers) : {
          pageX: _originalEvent.pageX,
          pageY: _originalEvent.pageY,
        };

        // Zoom from the triggering point of the event
        canvasData.left -= (newWidth - width) * (
          ((center.pageX - offset.left) - canvasData.left) / width
        );
        canvasData.top -= (newHeight - height) * (
          ((center.pageY - offset.top) - canvasData.top) / height
        );
      } else if (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isPlainObject"])(pivot) && Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(pivot.x) && Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(pivot.y)) {
        canvasData.left -= (newWidth - width) * (
          (pivot.x - canvasData.left) / width
        );
        canvasData.top -= (newHeight - height) * (
          (pivot.y - canvasData.top) / height
        );
      } else {
        // Zoom from the center of the canvas
        canvasData.left -= (newWidth - width) / 2;
        canvasData.top -= (newHeight - height) / 2;
      }

      canvasData.width = newWidth;
      canvasData.height = newHeight;
      this.renderCanvas(true);
    }

    return this;
  },

  /**
   * Rotate the canvas with a relative degree
   * @param {number} degree - The rotate degree.
   * @returns {Cropper} this
   */
  rotate(degree) {
    return this.rotateTo((this.imageData.rotate || 0) + Number(degree));
  },

  /**
   * Rotate the canvas to an absolute degree
   * @param {number} degree - The rotate degree.
   * @returns {Cropper} this
   */
  rotateTo(degree) {
    degree = Number(degree);

    if (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(degree) && this.ready && !this.disabled && this.options.rotatable) {
      this.imageData.rotate = degree % 360;
      this.renderCanvas(true, true);
    }

    return this;
  },

  /**
   * Scale the image on the x-axis.
   * @param {number} scaleX - The scale ratio on the x-axis.
   * @returns {Cropper} this
   */
  scaleX(scaleX) {
    const { scaleY } = this.imageData;

    return this.scale(scaleX, Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(scaleY) ? scaleY : 1);
  },

  /**
   * Scale the image on the y-axis.
   * @param {number} scaleY - The scale ratio on the y-axis.
   * @returns {Cropper} this
   */
  scaleY(scaleY) {
    const { scaleX } = this.imageData;

    return this.scale(Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(scaleX) ? scaleX : 1, scaleY);
  },

  /**
   * Scale the image
   * @param {number} scaleX - The scale ratio on the x-axis.
   * @param {number} [scaleY=scaleX] - The scale ratio on the y-axis.
   * @returns {Cropper} this
   */
  scale(scaleX, scaleY = scaleX) {
    const { imageData } = this;
    let transformed = false;

    scaleX = Number(scaleX);
    scaleY = Number(scaleY);

    if (this.ready && !this.disabled && this.options.scalable) {
      if (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(scaleX)) {
        imageData.scaleX = scaleX;
        transformed = true;
      }

      if (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(scaleY)) {
        imageData.scaleY = scaleY;
        transformed = true;
      }

      if (transformed) {
        this.renderCanvas(true, true);
      }
    }

    return this;
  },

  /**
   * Get the cropped area position and size data (base on the original image)
   * @param {boolean} [rounded=false] - Indicate if round the data values or not.
   * @returns {Object} The result cropped data.
   */
  getData(rounded = false) {
    const {
      options,
      imageData,
      canvasData,
      cropBoxData,
    } = this;
    let data;

    if (this.ready && this.cropped) {
      data = {
        x: cropBoxData.left - canvasData.left,
        y: cropBoxData.top - canvasData.top,
        width: cropBoxData.width,
        height: cropBoxData.height,
      };

      const ratio = imageData.width / imageData.naturalWidth;

      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["forEach"])(data, (n, i) => {
        data[i] = n / ratio;
      });

      if (rounded) {
        // In case rounding off leads to extra 1px in right or bottom border
        // we should round the top-left corner and the dimension (#343).
        const bottom = Math.round(data.y + data.height);
        const right = Math.round(data.x + data.width);

        data.x = Math.round(data.x);
        data.y = Math.round(data.y);
        data.width = right - data.x;
        data.height = bottom - data.y;
      }
    } else {
      data = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      };
    }

    if (options.rotatable) {
      data.rotate = imageData.rotate || 0;
    }

    if (options.scalable) {
      data.scaleX = imageData.scaleX || 1;
      data.scaleY = imageData.scaleY || 1;
    }

    return data;
  },

  /**
   * Set the cropped area position and size with new data
   * @param {Object} data - The new data.
   * @returns {Cropper} this
   */
  setData(data) {
    const { options, imageData, canvasData } = this;
    const cropBoxData = {};

    if (this.ready && !this.disabled && Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isPlainObject"])(data)) {
      let transformed = false;

      if (options.rotatable) {
        if (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(data.rotate) && data.rotate !== imageData.rotate) {
          imageData.rotate = data.rotate;
          transformed = true;
        }
      }

      if (options.scalable) {
        if (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(data.scaleX) && data.scaleX !== imageData.scaleX) {
          imageData.scaleX = data.scaleX;
          transformed = true;
        }

        if (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(data.scaleY) && data.scaleY !== imageData.scaleY) {
          imageData.scaleY = data.scaleY;
          transformed = true;
        }
      }

      if (transformed) {
        this.renderCanvas(true, true);
      }

      const ratio = imageData.width / imageData.naturalWidth;

      if (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(data.x)) {
        cropBoxData.left = (data.x * ratio) + canvasData.left;
      }

      if (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(data.y)) {
        cropBoxData.top = (data.y * ratio) + canvasData.top;
      }

      if (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(data.width)) {
        cropBoxData.width = data.width * ratio;
      }

      if (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(data.height)) {
        cropBoxData.height = data.height * ratio;
      }

      this.setCropBoxData(cropBoxData);
    }

    return this;
  },

  /**
   * Get the container size data.
   * @returns {Object} The result container data.
   */
  getContainerData() {
    return this.ready ? Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["assign"])({}, this.containerData) : {};
  },

  /**
   * Get the image position and size data.
   * @returns {Object} The result image data.
   */
  getImageData() {
    return this.sized ? Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["assign"])({}, this.imageData) : {};
  },

  /**
   * Get the canvas position and size data.
   * @returns {Object} The result canvas data.
   */
  getCanvasData() {
    const { canvasData } = this;
    const data = {};

    if (this.ready) {
      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["forEach"])([
        'left',
        'top',
        'width',
        'height',
        'naturalWidth',
        'naturalHeight',
      ], (n) => {
        data[n] = canvasData[n];
      });
    }

    return data;
  },

  /**
   * Set the canvas position and size with new data.
   * @param {Object} data - The new canvas data.
   * @returns {Cropper} this
   */
  setCanvasData(data) {
    const { canvasData } = this;
    const { aspectRatio } = canvasData;

    if (this.ready && !this.disabled && Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isPlainObject"])(data)) {
      if (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(data.left)) {
        canvasData.left = data.left;
      }

      if (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(data.top)) {
        canvasData.top = data.top;
      }

      if (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(data.width)) {
        canvasData.width = data.width;
        canvasData.height = data.width / aspectRatio;
      } else if (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(data.height)) {
        canvasData.height = data.height;
        canvasData.width = data.height * aspectRatio;
      }

      this.renderCanvas(true);
    }

    return this;
  },

  /**
   * Get the crop box position and size data.
   * @returns {Object} The result crop box data.
   */
  getCropBoxData() {
    const { cropBoxData } = this;
    let data;

    if (this.ready && this.cropped) {
      data = {
        left: cropBoxData.left,
        top: cropBoxData.top,
        width: cropBoxData.width,
        height: cropBoxData.height,
      };
    }

    return data || {};
  },

  /**
   * Set the crop box position and size with new data.
   * @param {Object} data - The new crop box data.
   * @returns {Cropper} this
   */
  setCropBoxData(data) {
    const { cropBoxData } = this;
    const { aspectRatio } = this.options;
    let widthChanged;
    let heightChanged;

    if (this.ready && this.cropped && !this.disabled && Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isPlainObject"])(data)) {
      if (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(data.left)) {
        cropBoxData.left = data.left;
      }

      if (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(data.top)) {
        cropBoxData.top = data.top;
      }

      if (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(data.width) && data.width !== cropBoxData.width) {
        widthChanged = true;
        cropBoxData.width = data.width;
      }

      if (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(data.height) && data.height !== cropBoxData.height) {
        heightChanged = true;
        cropBoxData.height = data.height;
      }

      if (aspectRatio) {
        if (widthChanged) {
          cropBoxData.height = cropBoxData.width / aspectRatio;
        } else if (heightChanged) {
          cropBoxData.width = cropBoxData.height * aspectRatio;
        }
      }

      this.renderCropBox();
    }

    return this;
  },

  /**
   * Get a canvas drawn the cropped image.
   * @param {Object} [options={}] - The config options.
   * @returns {HTMLCanvasElement} - The result canvas.
   */
  getCroppedCanvas(options = {}) {
    if (!this.ready || !window.HTMLCanvasElement) {
      return null;
    }

    const { canvasData } = this;
    const source = Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["getSourceCanvas"])(this.image, this.imageData, canvasData, options);

    // Returns the source canvas if it is not cropped.
    if (!this.cropped) {
      return source;
    }

    let {
      x: initialX,
      y: initialY,
      width: initialWidth,
      height: initialHeight,
    } = this.getData();
    const ratio = source.width / Math.floor(canvasData.naturalWidth);

    if (ratio !== 1) {
      initialX *= ratio;
      initialY *= ratio;
      initialWidth *= ratio;
      initialHeight *= ratio;
    }

    const aspectRatio = initialWidth / initialHeight;
    const maxSizes = Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["getAdjustedSizes"])({
      aspectRatio,
      width: options.maxWidth || Infinity,
      height: options.maxHeight || Infinity,
    });
    const minSizes = Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["getAdjustedSizes"])({
      aspectRatio,
      width: options.minWidth || 0,
      height: options.minHeight || 0,
    }, 'cover');
    let {
      width,
      height,
    } = Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["getAdjustedSizes"])({
      aspectRatio,
      width: options.width || (ratio !== 1 ? source.width : initialWidth),
      height: options.height || (ratio !== 1 ? source.height : initialHeight),
    });

    width = Math.min(maxSizes.width, Math.max(minSizes.width, width));
    height = Math.min(maxSizes.height, Math.max(minSizes.height, height));

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["normalizeDecimalNumber"])(width);
    canvas.height = Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["normalizeDecimalNumber"])(height);

    context.fillStyle = options.fillColor || 'transparent';
    context.fillRect(0, 0, width, height);

    const { imageSmoothingEnabled = true, imageSmoothingQuality } = options;

    context.imageSmoothingEnabled = imageSmoothingEnabled;

    if (imageSmoothingQuality) {
      context.imageSmoothingQuality = imageSmoothingQuality;
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.drawImage
    const sourceWidth = source.width;
    const sourceHeight = source.height;

    // Source canvas parameters
    let srcX = initialX;
    let srcY = initialY;
    let srcWidth;
    let srcHeight;

    // Destination canvas parameters
    let dstX;
    let dstY;
    let dstWidth;
    let dstHeight;

    if (srcX <= -initialWidth || srcX > sourceWidth) {
      srcX = 0;
      srcWidth = 0;
      dstX = 0;
      dstWidth = 0;
    } else if (srcX <= 0) {
      dstX = -srcX;
      srcX = 0;
      srcWidth = Math.min(sourceWidth, initialWidth + srcX);
      dstWidth = srcWidth;
    } else if (srcX <= sourceWidth) {
      dstX = 0;
      srcWidth = Math.min(initialWidth, sourceWidth - srcX);
      dstWidth = srcWidth;
    }

    if (srcWidth <= 0 || srcY <= -initialHeight || srcY > sourceHeight) {
      srcY = 0;
      srcHeight = 0;
      dstY = 0;
      dstHeight = 0;
    } else if (srcY <= 0) {
      dstY = -srcY;
      srcY = 0;
      srcHeight = Math.min(sourceHeight, initialHeight + srcY);
      dstHeight = srcHeight;
    } else if (srcY <= sourceHeight) {
      dstY = 0;
      srcHeight = Math.min(initialHeight, sourceHeight - srcY);
      dstHeight = srcHeight;
    }

    const params = [
      srcX,
      srcY,
      srcWidth,
      srcHeight,
    ];

    // Avoid "IndexSizeError"
    if (dstWidth > 0 && dstHeight > 0) {
      const scale = width / initialWidth;

      params.push(
        dstX * scale,
        dstY * scale,
        dstWidth * scale,
        dstHeight * scale,
      );
    }

    // All the numerical parameters should be integer for `drawImage`
    // https://github.com/fengyuanchen/cropper/issues/476
    context.drawImage(source, ...params.map(param => Math.floor(Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["normalizeDecimalNumber"])(param))));

    return canvas;
  },

  /**
   * Change the aspect ratio of the crop box.
   * @param {number} aspectRatio - The new aspect ratio.
   * @returns {Cropper} this
   */
  setAspectRatio(aspectRatio) {
    const { options } = this;

    if (!this.disabled && !Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["isUndefined"])(aspectRatio)) {
      // 0 -> NaN
      options.aspectRatio = Math.max(0, aspectRatio) || NaN;

      if (this.ready) {
        this.initCropBox();

        if (this.cropped) {
          this.renderCropBox();
        }
      }
    }

    return this;
  },

  /**
   * Change the drag mode.
   * @param {string} mode - The new drag mode.
   * @returns {Cropper} this
   */
  setDragMode(mode) {
    const { options, dragBox, face } = this;

    if (this.ready && !this.disabled) {
      const croppable = mode === _constants__WEBPACK_IMPORTED_MODULE_0__["DRAG_MODE_CROP"];
      const movable = options.movable && mode === _constants__WEBPACK_IMPORTED_MODULE_0__["DRAG_MODE_MOVE"];

      mode = (croppable || movable) ? mode : _constants__WEBPACK_IMPORTED_MODULE_0__["DRAG_MODE_NONE"];

      options.dragMode = mode;
      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["setData"])(dragBox, _constants__WEBPACK_IMPORTED_MODULE_0__["DATA_ACTION"], mode);
      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["toggleClass"])(dragBox, _constants__WEBPACK_IMPORTED_MODULE_0__["CLASS_CROP"], croppable);
      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["toggleClass"])(dragBox, _constants__WEBPACK_IMPORTED_MODULE_0__["CLASS_MOVE"], movable);

      if (!options.cropBoxMovable) {
        // Sync drag mode to crop box when it is not movable
        Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["setData"])(face, _constants__WEBPACK_IMPORTED_MODULE_0__["DATA_ACTION"], mode);
        Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["toggleClass"])(face, _constants__WEBPACK_IMPORTED_MODULE_0__["CLASS_CROP"], croppable);
        Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["toggleClass"])(face, _constants__WEBPACK_IMPORTED_MODULE_0__["CLASS_MOVE"], movable);
      }
    }

    return this;
  },
});


/***/ }),

/***/ "./node_modules/cropperjs/src/js/preview.js":
/*!**************************************************!*\
  !*** ./node_modules/cropperjs/src/js/preview.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./node_modules/cropperjs/src/js/constants.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utilities */ "./node_modules/cropperjs/src/js/utilities.js");



/* harmony default export */ __webpack_exports__["default"] = ({
  initPreview() {
    const { crossOrigin } = this;
    const { preview } = this.options;
    const url = crossOrigin ? this.crossOriginUrl : this.url;
    const image = document.createElement('img');

    if (crossOrigin) {
      image.crossOrigin = crossOrigin;
    }

    image.src = url;
    this.viewBox.appendChild(image);
    this.viewBoxImage = image;

    if (!preview) {
      return;
    }

    let previews = preview;

    if (typeof preview === 'string') {
      previews = this.element.ownerDocument.querySelectorAll(preview);
    } else if (preview.querySelector) {
      previews = [preview];
    }

    this.previews = previews;

    Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["forEach"])(previews, (el) => {
      const img = document.createElement('img');

      // Save the original size for recover
      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["setData"])(el, _constants__WEBPACK_IMPORTED_MODULE_0__["DATA_PREVIEW"], {
        width: el.offsetWidth,
        height: el.offsetHeight,
        html: el.innerHTML,
      });

      if (crossOrigin) {
        img.crossOrigin = crossOrigin;
      }

      img.src = url;

      /**
       * Override img element styles
       * Add `display:block` to avoid margin top issue
       * Add `height:auto` to override `height` attribute on IE8
       * (Occur only when margin-top <= -height)
       */
      img.style.cssText = (
        'display:block;'
        + 'width:100%;'
        + 'height:auto;'
        + 'min-width:0!important;'
        + 'min-height:0!important;'
        + 'max-width:none!important;'
        + 'max-height:none!important;'
        + 'image-orientation:0deg!important;"'
      );

      el.innerHTML = '';
      el.appendChild(img);
    });
  },

  resetPreview() {
    Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["forEach"])(this.previews, (element) => {
      const data = Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["getData"])(element, _constants__WEBPACK_IMPORTED_MODULE_0__["DATA_PREVIEW"]);

      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["setStyle"])(element, {
        width: data.width,
        height: data.height,
      });

      element.innerHTML = data.html;
      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["removeData"])(element, _constants__WEBPACK_IMPORTED_MODULE_0__["DATA_PREVIEW"]);
    });
  },

  preview() {
    const { imageData, canvasData, cropBoxData } = this;
    const { width: cropBoxWidth, height: cropBoxHeight } = cropBoxData;
    const { width, height } = imageData;
    const left = cropBoxData.left - canvasData.left - imageData.left;
    const top = cropBoxData.top - canvasData.top - imageData.top;

    if (!this.cropped || this.disabled) {
      return;
    }

    Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["setStyle"])(this.viewBoxImage, Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["assign"])({
      width,
      height,
    }, Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["getTransforms"])(Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["assign"])({
      translateX: -left,
      translateY: -top,
    }, imageData))));

    Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["forEach"])(this.previews, (element) => {
      const data = Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["getData"])(element, _constants__WEBPACK_IMPORTED_MODULE_0__["DATA_PREVIEW"]);
      const originalWidth = data.width;
      const originalHeight = data.height;
      let newWidth = originalWidth;
      let newHeight = originalHeight;
      let ratio = 1;

      if (cropBoxWidth) {
        ratio = originalWidth / cropBoxWidth;
        newHeight = cropBoxHeight * ratio;
      }

      if (cropBoxHeight && newHeight > originalHeight) {
        ratio = originalHeight / cropBoxHeight;
        newWidth = cropBoxWidth * ratio;
        newHeight = originalHeight;
      }

      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["setStyle"])(element, {
        width: newWidth,
        height: newHeight,
      });

      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["setStyle"])(element.getElementsByTagName('img')[0], Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["assign"])({
        width: width * ratio,
        height: height * ratio,
      }, Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["getTransforms"])(Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["assign"])({
        translateX: -left * ratio,
        translateY: -top * ratio,
      }, imageData))));
    });
  },
});


/***/ }),

/***/ "./node_modules/cropperjs/src/js/render.js":
/*!*************************************************!*\
  !*** ./node_modules/cropperjs/src/js/render.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./node_modules/cropperjs/src/js/constants.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utilities */ "./node_modules/cropperjs/src/js/utilities.js");



/* harmony default export */ __webpack_exports__["default"] = ({
  render() {
    this.initContainer();
    this.initCanvas();
    this.initCropBox();
    this.renderCanvas();

    if (this.cropped) {
      this.renderCropBox();
    }
  },

  initContainer() {
    const {
      element,
      options,
      container,
      cropper,
    } = this;

    Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["addClass"])(cropper, _constants__WEBPACK_IMPORTED_MODULE_0__["CLASS_HIDDEN"]);
    Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["removeClass"])(element, _constants__WEBPACK_IMPORTED_MODULE_0__["CLASS_HIDDEN"]);

    const containerData = {
      width: Math.max(
        container.offsetWidth,
        Number(options.minContainerWidth) || 200,
      ),
      height: Math.max(
        container.offsetHeight,
        Number(options.minContainerHeight) || 100,
      ),
    };

    this.containerData = containerData;

    Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["setStyle"])(cropper, {
      width: containerData.width,
      height: containerData.height,
    });

    Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["addClass"])(element, _constants__WEBPACK_IMPORTED_MODULE_0__["CLASS_HIDDEN"]);
    Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["removeClass"])(cropper, _constants__WEBPACK_IMPORTED_MODULE_0__["CLASS_HIDDEN"]);
  },

  // Canvas (image wrapper)
  initCanvas() {
    const { containerData, imageData } = this;
    const { viewMode } = this.options;
    const rotated = Math.abs(imageData.rotate) % 180 === 90;
    const naturalWidth = rotated ? imageData.naturalHeight : imageData.naturalWidth;
    const naturalHeight = rotated ? imageData.naturalWidth : imageData.naturalHeight;
    const aspectRatio = naturalWidth / naturalHeight;
    let canvasWidth = containerData.width;
    let canvasHeight = containerData.height;

    if (containerData.height * aspectRatio > containerData.width) {
      if (viewMode === 3) {
        canvasWidth = containerData.height * aspectRatio;
      } else {
        canvasHeight = containerData.width / aspectRatio;
      }
    } else if (viewMode === 3) {
      canvasHeight = containerData.width / aspectRatio;
    } else {
      canvasWidth = containerData.height * aspectRatio;
    }

    const canvasData = {
      aspectRatio,
      naturalWidth,
      naturalHeight,
      width: canvasWidth,
      height: canvasHeight,
    };

    canvasData.left = (containerData.width - canvasWidth) / 2;
    canvasData.top = (containerData.height - canvasHeight) / 2;
    canvasData.oldLeft = canvasData.left;
    canvasData.oldTop = canvasData.top;

    this.canvasData = canvasData;
    this.limited = (viewMode === 1 || viewMode === 2);
    this.limitCanvas(true, true);
    this.initialImageData = Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["assign"])({}, imageData);
    this.initialCanvasData = Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["assign"])({}, canvasData);
  },

  limitCanvas(sizeLimited, positionLimited) {
    const {
      options,
      containerData,
      canvasData,
      cropBoxData,
    } = this;
    const { viewMode } = options;
    const { aspectRatio } = canvasData;
    const cropped = this.cropped && cropBoxData;

    if (sizeLimited) {
      let minCanvasWidth = Number(options.minCanvasWidth) || 0;
      let minCanvasHeight = Number(options.minCanvasHeight) || 0;

      if (viewMode > 1) {
        minCanvasWidth = Math.max(minCanvasWidth, containerData.width);
        minCanvasHeight = Math.max(minCanvasHeight, containerData.height);

        if (viewMode === 3) {
          if (minCanvasHeight * aspectRatio > minCanvasWidth) {
            minCanvasWidth = minCanvasHeight * aspectRatio;
          } else {
            minCanvasHeight = minCanvasWidth / aspectRatio;
          }
        }
      } else if (viewMode > 0) {
        if (minCanvasWidth) {
          minCanvasWidth = Math.max(
            minCanvasWidth,
            cropped ? cropBoxData.width : 0,
          );
        } else if (minCanvasHeight) {
          minCanvasHeight = Math.max(
            minCanvasHeight,
            cropped ? cropBoxData.height : 0,
          );
        } else if (cropped) {
          minCanvasWidth = cropBoxData.width;
          minCanvasHeight = cropBoxData.height;

          if (minCanvasHeight * aspectRatio > minCanvasWidth) {
            minCanvasWidth = minCanvasHeight * aspectRatio;
          } else {
            minCanvasHeight = minCanvasWidth / aspectRatio;
          }
        }
      }

      ({ width: minCanvasWidth, height: minCanvasHeight } = Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["getAdjustedSizes"])({
        aspectRatio,
        width: minCanvasWidth,
        height: minCanvasHeight,
      }));

      canvasData.minWidth = minCanvasWidth;
      canvasData.minHeight = minCanvasHeight;
      canvasData.maxWidth = Infinity;
      canvasData.maxHeight = Infinity;
    }

    if (positionLimited) {
      if (viewMode > (cropped ? 0 : 1)) {
        const newCanvasLeft = containerData.width - canvasData.width;
        const newCanvasTop = containerData.height - canvasData.height;

        canvasData.minLeft = Math.min(0, newCanvasLeft);
        canvasData.minTop = Math.min(0, newCanvasTop);
        canvasData.maxLeft = Math.max(0, newCanvasLeft);
        canvasData.maxTop = Math.max(0, newCanvasTop);

        if (cropped && this.limited) {
          canvasData.minLeft = Math.min(
            cropBoxData.left,
            cropBoxData.left + (cropBoxData.width - canvasData.width),
          );
          canvasData.minTop = Math.min(
            cropBoxData.top,
            cropBoxData.top + (cropBoxData.height - canvasData.height),
          );
          canvasData.maxLeft = cropBoxData.left;
          canvasData.maxTop = cropBoxData.top;

          if (viewMode === 2) {
            if (canvasData.width >= containerData.width) {
              canvasData.minLeft = Math.min(0, newCanvasLeft);
              canvasData.maxLeft = Math.max(0, newCanvasLeft);
            }

            if (canvasData.height >= containerData.height) {
              canvasData.minTop = Math.min(0, newCanvasTop);
              canvasData.maxTop = Math.max(0, newCanvasTop);
            }
          }
        }
      } else {
        canvasData.minLeft = -canvasData.width;
        canvasData.minTop = -canvasData.height;
        canvasData.maxLeft = containerData.width;
        canvasData.maxTop = containerData.height;
      }
    }
  },

  renderCanvas(changed, transformed) {
    const { canvasData, imageData } = this;

    if (transformed) {
      const { width: naturalWidth, height: naturalHeight } = Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["getRotatedSizes"])({
        width: imageData.naturalWidth * Math.abs(imageData.scaleX || 1),
        height: imageData.naturalHeight * Math.abs(imageData.scaleY || 1),
        degree: imageData.rotate || 0,
      });
      const width = canvasData.width * (naturalWidth / canvasData.naturalWidth);
      const height = canvasData.height * (naturalHeight / canvasData.naturalHeight);

      canvasData.left -= (width - canvasData.width) / 2;
      canvasData.top -= (height - canvasData.height) / 2;
      canvasData.width = width;
      canvasData.height = height;
      canvasData.aspectRatio = naturalWidth / naturalHeight;
      canvasData.naturalWidth = naturalWidth;
      canvasData.naturalHeight = naturalHeight;
      this.limitCanvas(true, false);
    }

    if (canvasData.width > canvasData.maxWidth
      || canvasData.width < canvasData.minWidth) {
      canvasData.left = canvasData.oldLeft;
    }

    if (canvasData.height > canvasData.maxHeight
      || canvasData.height < canvasData.minHeight) {
      canvasData.top = canvasData.oldTop;
    }

    canvasData.width = Math.min(
      Math.max(canvasData.width, canvasData.minWidth),
      canvasData.maxWidth,
    );
    canvasData.height = Math.min(
      Math.max(canvasData.height, canvasData.minHeight),
      canvasData.maxHeight,
    );

    this.limitCanvas(false, true);

    canvasData.left = Math.min(
      Math.max(canvasData.left, canvasData.minLeft),
      canvasData.maxLeft,
    );
    canvasData.top = Math.min(
      Math.max(canvasData.top, canvasData.minTop),
      canvasData.maxTop,
    );
    canvasData.oldLeft = canvasData.left;
    canvasData.oldTop = canvasData.top;

    Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["setStyle"])(this.canvas, Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["assign"])({
      width: canvasData.width,
      height: canvasData.height,
    }, Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["getTransforms"])({
      translateX: canvasData.left,
      translateY: canvasData.top,
    })));

    this.renderImage(changed);

    if (this.cropped && this.limited) {
      this.limitCropBox(true, true);
    }
  },

  renderImage(changed) {
    const { canvasData, imageData } = this;
    const width = imageData.naturalWidth * (canvasData.width / canvasData.naturalWidth);
    const height = imageData.naturalHeight * (canvasData.height / canvasData.naturalHeight);

    Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["assign"])(imageData, {
      width,
      height,
      left: (canvasData.width - width) / 2,
      top: (canvasData.height - height) / 2,
    });
    Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["setStyle"])(this.image, Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["assign"])({
      width: imageData.width,
      height: imageData.height,
    }, Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["getTransforms"])(Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["assign"])({
      translateX: imageData.left,
      translateY: imageData.top,
    }, imageData))));

    if (changed) {
      this.output();
    }
  },

  initCropBox() {
    const { options, canvasData } = this;
    const aspectRatio = options.aspectRatio || options.initialAspectRatio;
    const autoCropArea = Number(options.autoCropArea) || 0.8;
    const cropBoxData = {
      width: canvasData.width,
      height: canvasData.height,
    };

    if (aspectRatio) {
      if (canvasData.height * aspectRatio > canvasData.width) {
        cropBoxData.height = cropBoxData.width / aspectRatio;
      } else {
        cropBoxData.width = cropBoxData.height * aspectRatio;
      }
    }

    this.cropBoxData = cropBoxData;
    this.limitCropBox(true, true);

    // Initialize auto crop area
    cropBoxData.width = Math.min(
      Math.max(cropBoxData.width, cropBoxData.minWidth),
      cropBoxData.maxWidth,
    );
    cropBoxData.height = Math.min(
      Math.max(cropBoxData.height, cropBoxData.minHeight),
      cropBoxData.maxHeight,
    );

    // The width/height of auto crop area must large than "minWidth/Height"
    cropBoxData.width = Math.max(
      cropBoxData.minWidth,
      cropBoxData.width * autoCropArea,
    );
    cropBoxData.height = Math.max(
      cropBoxData.minHeight,
      cropBoxData.height * autoCropArea,
    );
    cropBoxData.left = (
      canvasData.left + ((canvasData.width - cropBoxData.width) / 2)
    );
    cropBoxData.top = (
      canvasData.top + ((canvasData.height - cropBoxData.height) / 2)
    );
    cropBoxData.oldLeft = cropBoxData.left;
    cropBoxData.oldTop = cropBoxData.top;

    this.initialCropBoxData = Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["assign"])({}, cropBoxData);
  },

  limitCropBox(sizeLimited, positionLimited) {
    const {
      options,
      containerData,
      canvasData,
      cropBoxData,
      limited,
    } = this;
    const { aspectRatio } = options;

    if (sizeLimited) {
      let minCropBoxWidth = Number(options.minCropBoxWidth) || 0;
      let minCropBoxHeight = Number(options.minCropBoxHeight) || 0;
      let maxCropBoxWidth = limited ? Math.min(
        containerData.width,
        canvasData.width,
        canvasData.width + canvasData.left,
        containerData.width - canvasData.left,
      ) : containerData.width;
      let maxCropBoxHeight = limited ? Math.min(
        containerData.height,
        canvasData.height,
        canvasData.height + canvasData.top,
        containerData.height - canvasData.top,
      ) : containerData.height;

      // The min/maxCropBoxWidth/Height must be less than container's width/height
      minCropBoxWidth = Math.min(minCropBoxWidth, containerData.width);
      minCropBoxHeight = Math.min(minCropBoxHeight, containerData.height);

      if (aspectRatio) {
        if (minCropBoxWidth && minCropBoxHeight) {
          if (minCropBoxHeight * aspectRatio > minCropBoxWidth) {
            minCropBoxHeight = minCropBoxWidth / aspectRatio;
          } else {
            minCropBoxWidth = minCropBoxHeight * aspectRatio;
          }
        } else if (minCropBoxWidth) {
          minCropBoxHeight = minCropBoxWidth / aspectRatio;
        } else if (minCropBoxHeight) {
          minCropBoxWidth = minCropBoxHeight * aspectRatio;
        }

        if (maxCropBoxHeight * aspectRatio > maxCropBoxWidth) {
          maxCropBoxHeight = maxCropBoxWidth / aspectRatio;
        } else {
          maxCropBoxWidth = maxCropBoxHeight * aspectRatio;
        }
      }

      // The minWidth/Height must be less than maxWidth/Height
      cropBoxData.minWidth = Math.min(minCropBoxWidth, maxCropBoxWidth);
      cropBoxData.minHeight = Math.min(minCropBoxHeight, maxCropBoxHeight);
      cropBoxData.maxWidth = maxCropBoxWidth;
      cropBoxData.maxHeight = maxCropBoxHeight;
    }

    if (positionLimited) {
      if (limited) {
        cropBoxData.minLeft = Math.max(0, canvasData.left);
        cropBoxData.minTop = Math.max(0, canvasData.top);
        cropBoxData.maxLeft = Math.min(
          containerData.width,
          canvasData.left + canvasData.width,
        ) - cropBoxData.width;
        cropBoxData.maxTop = Math.min(
          containerData.height,
          canvasData.top + canvasData.height,
        ) - cropBoxData.height;
      } else {
        cropBoxData.minLeft = 0;
        cropBoxData.minTop = 0;
        cropBoxData.maxLeft = containerData.width - cropBoxData.width;
        cropBoxData.maxTop = containerData.height - cropBoxData.height;
      }
    }
  },

  renderCropBox() {
    const { options, containerData, cropBoxData } = this;

    if (cropBoxData.width > cropBoxData.maxWidth
      || cropBoxData.width < cropBoxData.minWidth) {
      cropBoxData.left = cropBoxData.oldLeft;
    }

    if (cropBoxData.height > cropBoxData.maxHeight
      || cropBoxData.height < cropBoxData.minHeight) {
      cropBoxData.top = cropBoxData.oldTop;
    }

    cropBoxData.width = Math.min(
      Math.max(cropBoxData.width, cropBoxData.minWidth),
      cropBoxData.maxWidth,
    );
    cropBoxData.height = Math.min(
      Math.max(cropBoxData.height, cropBoxData.minHeight),
      cropBoxData.maxHeight,
    );

    this.limitCropBox(false, true);

    cropBoxData.left = Math.min(
      Math.max(cropBoxData.left, cropBoxData.minLeft),
      cropBoxData.maxLeft,
    );
    cropBoxData.top = Math.min(
      Math.max(cropBoxData.top, cropBoxData.minTop),
      cropBoxData.maxTop,
    );
    cropBoxData.oldLeft = cropBoxData.left;
    cropBoxData.oldTop = cropBoxData.top;

    if (options.movable && options.cropBoxMovable) {
      // Turn to move the canvas when the crop box is equal to the container
      Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["setData"])(this.face, _constants__WEBPACK_IMPORTED_MODULE_0__["DATA_ACTION"], cropBoxData.width >= containerData.width
        && cropBoxData.height >= containerData.height ? _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_MOVE"] : _constants__WEBPACK_IMPORTED_MODULE_0__["ACTION_ALL"]);
    }

    Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["setStyle"])(this.cropBox, Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["assign"])({
      width: cropBoxData.width,
      height: cropBoxData.height,
    }, Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["getTransforms"])({
      translateX: cropBoxData.left,
      translateY: cropBoxData.top,
    })));

    if (this.cropped && this.limited) {
      this.limitCanvas(true, true);
    }

    if (!this.disabled) {
      this.output();
    }
  },

  output() {
    this.preview();
    Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["dispatchEvent"])(this.element, _constants__WEBPACK_IMPORTED_MODULE_0__["EVENT_CROP"], this.getData());
  },
});


/***/ }),

/***/ "./node_modules/cropperjs/src/js/template.js":
/*!***************************************************!*\
  !*** ./node_modules/cropperjs/src/js/template.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ('<div class="cropper-container" touch-action="none">'
    + '<div class="cropper-wrap-box">'
      + '<div class="cropper-canvas"></div>'
    + '</div>'
    + '<div class="cropper-drag-box"></div>'
    + '<div class="cropper-crop-box">'
      + '<span class="cropper-view-box"></span>'
      + '<span class="cropper-dashed dashed-h"></span>'
      + '<span class="cropper-dashed dashed-v"></span>'
      + '<span class="cropper-center"></span>'
      + '<span class="cropper-face"></span>'
      + '<span class="cropper-line line-e" data-cropper-action="e"></span>'
      + '<span class="cropper-line line-n" data-cropper-action="n"></span>'
      + '<span class="cropper-line line-w" data-cropper-action="w"></span>'
      + '<span class="cropper-line line-s" data-cropper-action="s"></span>'
      + '<span class="cropper-point point-e" data-cropper-action="e"></span>'
      + '<span class="cropper-point point-n" data-cropper-action="n"></span>'
      + '<span class="cropper-point point-w" data-cropper-action="w"></span>'
      + '<span class="cropper-point point-s" data-cropper-action="s"></span>'
      + '<span class="cropper-point point-ne" data-cropper-action="ne"></span>'
      + '<span class="cropper-point point-nw" data-cropper-action="nw"></span>'
      + '<span class="cropper-point point-sw" data-cropper-action="sw"></span>'
      + '<span class="cropper-point point-se" data-cropper-action="se"></span>'
    + '</div>'
  + '</div>');


/***/ }),

/***/ "./node_modules/cropperjs/src/js/utilities.js":
/*!****************************************************!*\
  !*** ./node_modules/cropperjs/src/js/utilities.js ***!
  \****************************************************/
/*! exports provided: isNaN, isNumber, isPositiveNumber, isUndefined, isObject, isPlainObject, isFunction, toArray, forEach, assign, normalizeDecimalNumber, setStyle, hasClass, addClass, removeClass, toggleClass, toParamCase, getData, setData, removeData, removeListener, addListener, dispatchEvent, getOffset, isCrossOriginURL, addTimestamp, getTransforms, getMaxZoomRatio, getPointer, getPointersCenter, getAdjustedSizes, getRotatedSizes, getSourceCanvas, getStringFromCharCode, dataURLToArrayBuffer, arrayBufferToDataURL, resetAndGetOrientation, parseOrientation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNaN", function() { return isNaN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumber", function() { return isNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPositiveNumber", function() { return isPositiveNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isUndefined", function() { return isUndefined; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return isObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPlainObject", function() { return isPlainObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return isFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toArray", function() { return toArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forEach", function() { return forEach; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assign", function() { return assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizeDecimalNumber", function() { return normalizeDecimalNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setStyle", function() { return setStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasClass", function() { return hasClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addClass", function() { return addClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeClass", function() { return removeClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleClass", function() { return toggleClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toParamCase", function() { return toParamCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getData", function() { return getData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setData", function() { return setData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeData", function() { return removeData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeListener", function() { return removeListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addListener", function() { return addListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dispatchEvent", function() { return dispatchEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOffset", function() { return getOffset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isCrossOriginURL", function() { return isCrossOriginURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addTimestamp", function() { return addTimestamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTransforms", function() { return getTransforms; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMaxZoomRatio", function() { return getMaxZoomRatio; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPointer", function() { return getPointer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPointersCenter", function() { return getPointersCenter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAdjustedSizes", function() { return getAdjustedSizes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRotatedSizes", function() { return getRotatedSizes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSourceCanvas", function() { return getSourceCanvas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStringFromCharCode", function() { return getStringFromCharCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dataURLToArrayBuffer", function() { return dataURLToArrayBuffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayBufferToDataURL", function() { return arrayBufferToDataURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetAndGetOrientation", function() { return resetAndGetOrientation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseOrientation", function() { return parseOrientation; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./node_modules/cropperjs/src/js/constants.js");


/**
 * Check if the given value is not a number.
 */
const isNaN = Number.isNaN || _constants__WEBPACK_IMPORTED_MODULE_0__["WINDOW"].isNaN;

/**
 * Check if the given value is a number.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is a number, else `false`.
 */
function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}

/**
 * Check if the given value is a positive number.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is a positive number, else `false`.
 */
const isPositiveNumber = value => value > 0 && value < Infinity;

/**
 * Check if the given value is undefined.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is undefined, else `false`.
 */
function isUndefined(value) {
  return typeof value === 'undefined';
}

/**
 * Check if the given value is an object.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is an object, else `false`.
 */
function isObject(value) {
  return typeof value === 'object' && value !== null;
}

const { hasOwnProperty } = Object.prototype;

/**
 * Check if the given value is a plain object.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is a plain object, else `false`.
 */
function isPlainObject(value) {
  if (!isObject(value)) {
    return false;
  }

  try {
    const { constructor } = value;
    const { prototype } = constructor;

    return constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
  } catch (error) {
    return false;
  }
}

/**
 * Check if the given value is a function.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is a function, else `false`.
 */
function isFunction(value) {
  return typeof value === 'function';
}

const { slice } = Array.prototype;

/**
 * Convert array-like or iterable object to an array.
 * @param {*} value - The value to convert.
 * @returns {Array} Returns a new array.
 */
function toArray(value) {
  return Array.from ? Array.from(value) : slice.call(value);
}

/**
 * Iterate the given data.
 * @param {*} data - The data to iterate.
 * @param {Function} callback - The process function for each element.
 * @returns {*} The original data.
 */
function forEach(data, callback) {
  if (data && isFunction(callback)) {
    if (Array.isArray(data) || isNumber(data.length)/* array-like */) {
      toArray(data).forEach((value, key) => {
        callback.call(data, value, key, data);
      });
    } else if (isObject(data)) {
      Object.keys(data).forEach((key) => {
        callback.call(data, data[key], key, data);
      });
    }
  }

  return data;
}

/**
 * Extend the given object.
 * @param {*} target - The target object to extend.
 * @param {*} args - The rest objects for merging to the target object.
 * @returns {Object} The extended object.
 */
const assign = Object.assign || function assign(target, ...args) {
  if (isObject(target) && args.length > 0) {
    args.forEach((arg) => {
      if (isObject(arg)) {
        Object.keys(arg).forEach((key) => {
          target[key] = arg[key];
        });
      }
    });
  }

  return target;
};

const REGEXP_DECIMALS = /\.\d*(?:0|9){12}\d*$/;

/**
 * Normalize decimal number.
 * Check out {@link http://0.30000000000000004.com/}
 * @param {number} value - The value to normalize.
 * @param {number} [times=100000000000] - The times for normalizing.
 * @returns {number} Returns the normalized number.
 */
function normalizeDecimalNumber(value, times = 100000000000) {
  return REGEXP_DECIMALS.test(value) ? (Math.round(value * times) / times) : value;
}

const REGEXP_SUFFIX = /^width|height|left|top|marginLeft|marginTop$/;

/**
 * Apply styles to the given element.
 * @param {Element} element - The target element.
 * @param {Object} styles - The styles for applying.
 */
function setStyle(element, styles) {
  const { style } = element;

  forEach(styles, (value, property) => {
    if (REGEXP_SUFFIX.test(property) && isNumber(value)) {
      value = `${value}px`;
    }

    style[property] = value;
  });
}

/**
 * Check if the given element has a special class.
 * @param {Element} element - The element to check.
 * @param {string} value - The class to search.
 * @returns {boolean} Returns `true` if the special class was found.
 */
function hasClass(element, value) {
  return element.classList
    ? element.classList.contains(value)
    : element.className.indexOf(value) > -1;
}

/**
 * Add classes to the given element.
 * @param {Element} element - The target element.
 * @param {string} value - The classes to be added.
 */
function addClass(element, value) {
  if (!value) {
    return;
  }

  if (isNumber(element.length)) {
    forEach(element, (elem) => {
      addClass(elem, value);
    });
    return;
  }

  if (element.classList) {
    element.classList.add(value);
    return;
  }

  const className = element.className.trim();

  if (!className) {
    element.className = value;
  } else if (className.indexOf(value) < 0) {
    element.className = `${className} ${value}`;
  }
}

/**
 * Remove classes from the given element.
 * @param {Element} element - The target element.
 * @param {string} value - The classes to be removed.
 */
function removeClass(element, value) {
  if (!value) {
    return;
  }

  if (isNumber(element.length)) {
    forEach(element, (elem) => {
      removeClass(elem, value);
    });
    return;
  }

  if (element.classList) {
    element.classList.remove(value);
    return;
  }

  if (element.className.indexOf(value) >= 0) {
    element.className = element.className.replace(value, '');
  }
}

/**
 * Add or remove classes from the given element.
 * @param {Element} element - The target element.
 * @param {string} value - The classes to be toggled.
 * @param {boolean} added - Add only.
 */
function toggleClass(element, value, added) {
  if (!value) {
    return;
  }

  if (isNumber(element.length)) {
    forEach(element, (elem) => {
      toggleClass(elem, value, added);
    });
    return;
  }

  // IE10-11 doesn't support the second parameter of `classList.toggle`
  if (added) {
    addClass(element, value);
  } else {
    removeClass(element, value);
  }
}

const REGEXP_CAMEL_CASE = /([a-z\d])([A-Z])/g;

/**
 * Transform the given string from camelCase to kebab-case
 * @param {string} value - The value to transform.
 * @returns {string} The transformed value.
 */
function toParamCase(value) {
  return value.replace(REGEXP_CAMEL_CASE, '$1-$2').toLowerCase();
}

/**
 * Get data from the given element.
 * @param {Element} element - The target element.
 * @param {string} name - The data key to get.
 * @returns {string} The data value.
 */
function getData(element, name) {
  if (isObject(element[name])) {
    return element[name];
  }

  if (element.dataset) {
    return element.dataset[name];
  }

  return element.getAttribute(`data-${toParamCase(name)}`);
}

/**
 * Set data to the given element.
 * @param {Element} element - The target element.
 * @param {string} name - The data key to set.
 * @param {string} data - The data value.
 */
function setData(element, name, data) {
  if (isObject(data)) {
    element[name] = data;
  } else if (element.dataset) {
    element.dataset[name] = data;
  } else {
    element.setAttribute(`data-${toParamCase(name)}`, data);
  }
}

/**
 * Remove data from the given element.
 * @param {Element} element - The target element.
 * @param {string} name - The data key to remove.
 */
function removeData(element, name) {
  if (isObject(element[name])) {
    try {
      delete element[name];
    } catch (error) {
      element[name] = undefined;
    }
  } else if (element.dataset) {
    // #128 Safari not allows to delete dataset property
    try {
      delete element.dataset[name];
    } catch (error) {
      element.dataset[name] = undefined;
    }
  } else {
    element.removeAttribute(`data-${toParamCase(name)}`);
  }
}

const REGEXP_SPACES = /\s\s*/;
const onceSupported = (() => {
  let supported = false;

  if (_constants__WEBPACK_IMPORTED_MODULE_0__["IS_BROWSER"]) {
    let once = false;
    const listener = () => {};
    const options = Object.defineProperty({}, 'once', {
      get() {
        supported = true;
        return once;
      },

      /**
       * This setter can fix a `TypeError` in strict mode
       * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Getter_only}
       * @param {boolean} value - The value to set
       */
      set(value) {
        once = value;
      },
    });

    _constants__WEBPACK_IMPORTED_MODULE_0__["WINDOW"].addEventListener('test', listener, options);
    _constants__WEBPACK_IMPORTED_MODULE_0__["WINDOW"].removeEventListener('test', listener, options);
  }

  return supported;
})();

/**
 * Remove event listener from the target element.
 * @param {Element} element - The event target.
 * @param {string} type - The event type(s).
 * @param {Function} listener - The event listener.
 * @param {Object} options - The event options.
 */
function removeListener(element, type, listener, options = {}) {
  let handler = listener;

  type.trim().split(REGEXP_SPACES).forEach((event) => {
    if (!onceSupported) {
      const { listeners } = element;

      if (listeners && listeners[event] && listeners[event][listener]) {
        handler = listeners[event][listener];
        delete listeners[event][listener];

        if (Object.keys(listeners[event]).length === 0) {
          delete listeners[event];
        }

        if (Object.keys(listeners).length === 0) {
          delete element.listeners;
        }
      }
    }

    element.removeEventListener(event, handler, options);
  });
}

/**
 * Add event listener to the target element.
 * @param {Element} element - The event target.
 * @param {string} type - The event type(s).
 * @param {Function} listener - The event listener.
 * @param {Object} options - The event options.
 */
function addListener(element, type, listener, options = {}) {
  let handler = listener;

  type.trim().split(REGEXP_SPACES).forEach((event) => {
    if (options.once && !onceSupported) {
      const { listeners = {} } = element;

      handler = (...args) => {
        delete listeners[event][listener];
        element.removeEventListener(event, handler, options);
        listener.apply(element, args);
      };

      if (!listeners[event]) {
        listeners[event] = {};
      }

      if (listeners[event][listener]) {
        element.removeEventListener(event, listeners[event][listener], options);
      }

      listeners[event][listener] = handler;
      element.listeners = listeners;
    }

    element.addEventListener(event, handler, options);
  });
}

/**
 * Dispatch event on the target element.
 * @param {Element} element - The event target.
 * @param {string} type - The event type(s).
 * @param {Object} data - The additional event data.
 * @returns {boolean} Indicate if the event is default prevented or not.
 */
function dispatchEvent(element, type, data) {
  let event;

  // Event and CustomEvent on IE9-11 are global objects, not constructors
  if (isFunction(Event) && isFunction(CustomEvent)) {
    event = new CustomEvent(type, {
      detail: data,
      bubbles: true,
      cancelable: true,
    });
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(type, true, true, data);
  }

  return element.dispatchEvent(event);
}

/**
 * Get the offset base on the document.
 * @param {Element} element - The target element.
 * @returns {Object} The offset data.
 */
function getOffset(element) {
  const box = element.getBoundingClientRect();

  return {
    left: box.left + (window.pageXOffset - document.documentElement.clientLeft),
    top: box.top + (window.pageYOffset - document.documentElement.clientTop),
  };
}

const { location } = _constants__WEBPACK_IMPORTED_MODULE_0__["WINDOW"];
const REGEXP_ORIGINS = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;

/**
 * Check if the given URL is a cross origin URL.
 * @param {string} url - The target URL.
 * @returns {boolean} Returns `true` if the given URL is a cross origin URL, else `false`.
 */
function isCrossOriginURL(url) {
  const parts = url.match(REGEXP_ORIGINS);

  return parts !== null && (
    parts[1] !== location.protocol
    || parts[2] !== location.hostname
    || parts[3] !== location.port
  );
}

/**
 * Add timestamp to the given URL.
 * @param {string} url - The target URL.
 * @returns {string} The result URL.
 */
function addTimestamp(url) {
  const timestamp = `timestamp=${(new Date()).getTime()}`;

  return url + (url.indexOf('?') === -1 ? '?' : '&') + timestamp;
}

/**
 * Get transforms base on the given object.
 * @param {Object} obj - The target object.
 * @returns {string} A string contains transform values.
 */
function getTransforms({
  rotate,
  scaleX,
  scaleY,
  translateX,
  translateY,
}) {
  const values = [];

  if (isNumber(translateX) && translateX !== 0) {
    values.push(`translateX(${translateX}px)`);
  }

  if (isNumber(translateY) && translateY !== 0) {
    values.push(`translateY(${translateY}px)`);
  }

  // Rotate should come first before scale to match orientation transform
  if (isNumber(rotate) && rotate !== 0) {
    values.push(`rotate(${rotate}deg)`);
  }

  if (isNumber(scaleX) && scaleX !== 1) {
    values.push(`scaleX(${scaleX})`);
  }

  if (isNumber(scaleY) && scaleY !== 1) {
    values.push(`scaleY(${scaleY})`);
  }

  const transform = values.length ? values.join(' ') : 'none';

  return {
    WebkitTransform: transform,
    msTransform: transform,
    transform,
  };
}

/**
 * Get the max ratio of a group of pointers.
 * @param {string} pointers - The target pointers.
 * @returns {number} The result ratio.
 */
function getMaxZoomRatio(pointers) {
  const pointers2 = assign({}, pointers);
  const ratios = [];

  forEach(pointers, (pointer, pointerId) => {
    delete pointers2[pointerId];

    forEach(pointers2, (pointer2) => {
      const x1 = Math.abs(pointer.startX - pointer2.startX);
      const y1 = Math.abs(pointer.startY - pointer2.startY);
      const x2 = Math.abs(pointer.endX - pointer2.endX);
      const y2 = Math.abs(pointer.endY - pointer2.endY);
      const z1 = Math.sqrt((x1 * x1) + (y1 * y1));
      const z2 = Math.sqrt((x2 * x2) + (y2 * y2));
      const ratio = (z2 - z1) / z1;

      ratios.push(ratio);
    });
  });

  ratios.sort((a, b) => Math.abs(a) < Math.abs(b));

  return ratios[0];
}

/**
 * Get a pointer from an event object.
 * @param {Object} event - The target event object.
 * @param {boolean} endOnly - Indicates if only returns the end point coordinate or not.
 * @returns {Object} The result pointer contains start and/or end point coordinates.
 */
function getPointer({ pageX, pageY }, endOnly) {
  const end = {
    endX: pageX,
    endY: pageY,
  };

  return endOnly ? end : assign({
    startX: pageX,
    startY: pageY,
  }, end);
}

/**
 * Get the center point coordinate of a group of pointers.
 * @param {Object} pointers - The target pointers.
 * @returns {Object} The center point coordinate.
 */
function getPointersCenter(pointers) {
  let pageX = 0;
  let pageY = 0;
  let count = 0;

  forEach(pointers, ({ startX, startY }) => {
    pageX += startX;
    pageY += startY;
    count += 1;
  });

  pageX /= count;
  pageY /= count;

  return {
    pageX,
    pageY,
  };
}

/**
 * Get the max sizes in a rectangle under the given aspect ratio.
 * @param {Object} data - The original sizes.
 * @param {string} [type='contain'] - The adjust type.
 * @returns {Object} The result sizes.
 */
function getAdjustedSizes(
  {
    aspectRatio,
    height,
    width,
  },
  type = 'contain', // or 'cover'
) {
  const isValidWidth = isPositiveNumber(width);
  const isValidHeight = isPositiveNumber(height);

  if (isValidWidth && isValidHeight) {
    const adjustedWidth = height * aspectRatio;

    if ((type === 'contain' && adjustedWidth > width) || (type === 'cover' && adjustedWidth < width)) {
      height = width / aspectRatio;
    } else {
      width = height * aspectRatio;
    }
  } else if (isValidWidth) {
    height = width / aspectRatio;
  } else if (isValidHeight) {
    width = height * aspectRatio;
  }

  return {
    width,
    height,
  };
}

/**
 * Get the new sizes of a rectangle after rotated.
 * @param {Object} data - The original sizes.
 * @returns {Object} The result sizes.
 */
function getRotatedSizes({ width, height, degree }) {
  degree = Math.abs(degree) % 180;

  if (degree === 90) {
    return {
      width: height,
      height: width,
    };
  }

  const arc = ((degree % 90) * Math.PI) / 180;
  const sinArc = Math.sin(arc);
  const cosArc = Math.cos(arc);
  const newWidth = (width * cosArc) + (height * sinArc);
  const newHeight = (width * sinArc) + (height * cosArc);

  return degree > 90 ? {
    width: newHeight,
    height: newWidth,
  } : {
    width: newWidth,
    height: newHeight,
  };
}

/**
 * Get a canvas which drew the given image.
 * @param {HTMLImageElement} image - The image for drawing.
 * @param {Object} imageData - The image data.
 * @param {Object} canvasData - The canvas data.
 * @param {Object} options - The options.
 * @returns {HTMLCanvasElement} The result canvas.
 */
function getSourceCanvas(
  image,
  {
    aspectRatio: imageAspectRatio,
    naturalWidth: imageNaturalWidth,
    naturalHeight: imageNaturalHeight,
    rotate = 0,
    scaleX = 1,
    scaleY = 1,
  },
  {
    aspectRatio,
    naturalWidth,
    naturalHeight,
  },
  {
    fillColor = 'transparent',
    imageSmoothingEnabled = true,
    imageSmoothingQuality = 'low',
    maxWidth = Infinity,
    maxHeight = Infinity,
    minWidth = 0,
    minHeight = 0,
  },
) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const maxSizes = getAdjustedSizes({
    aspectRatio,
    width: maxWidth,
    height: maxHeight,
  });
  const minSizes = getAdjustedSizes({
    aspectRatio,
    width: minWidth,
    height: minHeight,
  }, 'cover');
  const width = Math.min(maxSizes.width, Math.max(minSizes.width, naturalWidth));
  const height = Math.min(maxSizes.height, Math.max(minSizes.height, naturalHeight));

  // Note: should always use image's natural sizes for drawing as
  // imageData.naturalWidth === canvasData.naturalHeight when rotate % 180 === 90
  const destMaxSizes = getAdjustedSizes({
    aspectRatio: imageAspectRatio,
    width: maxWidth,
    height: maxHeight,
  });
  const destMinSizes = getAdjustedSizes({
    aspectRatio: imageAspectRatio,
    width: minWidth,
    height: minHeight,
  }, 'cover');
  const destWidth = Math.min(
    destMaxSizes.width,
    Math.max(destMinSizes.width, imageNaturalWidth),
  );
  const destHeight = Math.min(
    destMaxSizes.height,
    Math.max(destMinSizes.height, imageNaturalHeight),
  );
  const params = [
    -destWidth / 2,
    -destHeight / 2,
    destWidth,
    destHeight,
  ];

  canvas.width = normalizeDecimalNumber(width);
  canvas.height = normalizeDecimalNumber(height);
  context.fillStyle = fillColor;
  context.fillRect(0, 0, width, height);
  context.save();
  context.translate(width / 2, height / 2);
  context.rotate((rotate * Math.PI) / 180);
  context.scale(scaleX, scaleY);
  context.imageSmoothingEnabled = imageSmoothingEnabled;
  context.imageSmoothingQuality = imageSmoothingQuality;
  context.drawImage(image, ...params.map(param => Math.floor(normalizeDecimalNumber(param))));
  context.restore();
  return canvas;
}

const { fromCharCode } = String;

/**
 * Get string from char code in data view.
 * @param {DataView} dataView - The data view for read.
 * @param {number} start - The start index.
 * @param {number} length - The read length.
 * @returns {string} The read result.
 */
function getStringFromCharCode(dataView, start, length) {
  let str = '';

  length += start;

  for (let i = start; i < length; i += 1) {
    str += fromCharCode(dataView.getUint8(i));
  }

  return str;
}

const REGEXP_DATA_URL_HEAD = /^data:.*,/;

/**
 * Transform Data URL to array buffer.
 * @param {string} dataURL - The Data URL to transform.
 * @returns {ArrayBuffer} The result array buffer.
 */
function dataURLToArrayBuffer(dataURL) {
  const base64 = dataURL.replace(REGEXP_DATA_URL_HEAD, '');
  const binary = atob(base64);
  const arrayBuffer = new ArrayBuffer(binary.length);
  const uint8 = new Uint8Array(arrayBuffer);

  forEach(uint8, (value, i) => {
    uint8[i] = binary.charCodeAt(i);
  });

  return arrayBuffer;
}

/**
 * Transform array buffer to Data URL.
 * @param {ArrayBuffer} arrayBuffer - The array buffer to transform.
 * @param {string} mimeType - The mime type of the Data URL.
 * @returns {string} The result Data URL.
 */
function arrayBufferToDataURL(arrayBuffer, mimeType) {
  const chunks = [];

  // Chunk Typed Array for better performance (#435)
  const chunkSize = 8192;
  let uint8 = new Uint8Array(arrayBuffer);

  while (uint8.length > 0) {
    // XXX: Babel's `toConsumableArray` helper will throw error in IE or Safari 9
    // eslint-disable-next-line prefer-spread
    chunks.push(fromCharCode.apply(null, toArray(uint8.subarray(0, chunkSize))));
    uint8 = uint8.subarray(chunkSize);
  }

  return `data:${mimeType};base64,${btoa(chunks.join(''))}`;
}

/**
 * Get orientation value from given array buffer.
 * @param {ArrayBuffer} arrayBuffer - The array buffer to read.
 * @returns {number} The read orientation value.
 */
function resetAndGetOrientation(arrayBuffer) {
  const dataView = new DataView(arrayBuffer);
  let orientation;

  // Ignores range error when the image does not have correct Exif information
  try {
    let littleEndian;
    let app1Start;
    let ifdStart;

    // Only handle JPEG image (start by 0xFFD8)
    if (dataView.getUint8(0) === 0xFF && dataView.getUint8(1) === 0xD8) {
      const length = dataView.byteLength;
      let offset = 2;

      while (offset + 1 < length) {
        if (dataView.getUint8(offset) === 0xFF && dataView.getUint8(offset + 1) === 0xE1) {
          app1Start = offset;
          break;
        }

        offset += 1;
      }
    }

    if (app1Start) {
      const exifIDCode = app1Start + 4;
      const tiffOffset = app1Start + 10;

      if (getStringFromCharCode(dataView, exifIDCode, 4) === 'Exif') {
        const endianness = dataView.getUint16(tiffOffset);

        littleEndian = endianness === 0x4949;

        if (littleEndian || endianness === 0x4D4D /* bigEndian */) {
          if (dataView.getUint16(tiffOffset + 2, littleEndian) === 0x002A) {
            const firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian);

            if (firstIFDOffset >= 0x00000008) {
              ifdStart = tiffOffset + firstIFDOffset;
            }
          }
        }
      }
    }

    if (ifdStart) {
      const length = dataView.getUint16(ifdStart, littleEndian);
      let offset;
      let i;

      for (i = 0; i < length; i += 1) {
        offset = ifdStart + (i * 12) + 2;

        if (dataView.getUint16(offset, littleEndian) === 0x0112 /* Orientation */) {
          // 8 is the offset of the current tag's value
          offset += 8;

          // Get the original orientation value
          orientation = dataView.getUint16(offset, littleEndian);

          // Override the orientation with its default value
          dataView.setUint16(offset, 1, littleEndian);
          break;
        }
      }
    }
  } catch (error) {
    orientation = 1;
  }

  return orientation;
}

/**
 * Parse Exif Orientation value.
 * @param {number} orientation - The orientation to parse.
 * @returns {Object} The parsed result.
 */
function parseOrientation(orientation) {
  let rotate = 0;
  let scaleX = 1;
  let scaleY = 1;

  switch (orientation) {
    // Flip horizontal
    case 2:
      scaleX = -1;
      break;

    // Rotate left 180°
    case 3:
      rotate = -180;
      break;

    // Flip vertical
    case 4:
      scaleY = -1;
      break;

    // Flip vertical and rotate right 90°
    case 5:
      rotate = 90;
      scaleY = -1;
      break;

    // Rotate right 90°
    case 6:
      rotate = 90;
      break;

    // Flip horizontal and rotate right 90°
    case 7:
      rotate = 90;
      scaleX = -1;
      break;

    // Rotate left 90°
    case 8:
      rotate = -90;
      break;

    default:
  }

  return {
    rotate,
    scaleX,
    scaleY,
  };
}


/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2VuaGFuY2VFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J0b2EuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcm9wcGVyanMvZGlzdC9jcm9wcGVyLm1pbi5jc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nyb3BwZXJqcy9zcmMvanMvY2hhbmdlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcm9wcGVyanMvc3JjL2pzL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3JvcHBlcmpzL3NyYy9qcy9jcm9wcGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcm9wcGVyanMvc3JjL2pzL2RlZmF1bHRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcm9wcGVyanMvc3JjL2pzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3JvcHBlcmpzL3NyYy9qcy9oYW5kbGVycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3JvcHBlcmpzL3NyYy9qcy9tZXRob2RzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcm9wcGVyanMvc3JjL2pzL3ByZXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nyb3BwZXJqcy9zcmMvanMvcmVuZGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcm9wcGVyanMvc3JjL2pzL3RlbXBsYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcm9wcGVyanMvc3JjL2pzL3V0aWxpdGllcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaXMtYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsaUJBQWlCLG1CQUFPLENBQUMsc0RBQWEsRTs7Ozs7Ozs7Ozs7O0FDQXpCOztBQUViLFlBQVksbUJBQU8sQ0FBQyxxREFBWTtBQUNoQyxhQUFhLG1CQUFPLENBQUMsaUVBQWtCO0FBQ3ZDLGVBQWUsbUJBQU8sQ0FBQywyRUFBdUI7QUFDOUMsbUJBQW1CLG1CQUFPLENBQUMsbUZBQTJCO0FBQ3RELHNCQUFzQixtQkFBTyxDQUFDLHlGQUE4QjtBQUM1RCxrQkFBa0IsbUJBQU8sQ0FBQyx5RUFBcUI7QUFDL0MseUZBQXlGLG1CQUFPLENBQUMsbUVBQW1COztBQUVwSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRDQUE0QztBQUM1Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSxLQUErQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FB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QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDcEJBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVUiLCJmaWxlIjoidmVuZG9yc35jcm9wLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9heGlvcycpOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHNldHRsZSA9IHJlcXVpcmUoJy4vLi4vY29yZS9zZXR0bGUnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL2NyZWF0ZUVycm9yJyk7XG52YXIgYnRvYSA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuYnRvYSAmJiB3aW5kb3cuYnRvYS5iaW5kKHdpbmRvdykpIHx8IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idG9hJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24geGhyQWRhcHRlcihjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdERhdGEgPSBjb25maWcuZGF0YTtcbiAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKHJlcXVlc3REYXRhKSkge1xuICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzWydDb250ZW50LVR5cGUnXTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH1cblxuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgdmFyIGxvYWRFdmVudCA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnO1xuICAgIHZhciB4RG9tYWluID0gZmFsc2U7XG5cbiAgICAvLyBGb3IgSUUgOC85IENPUlMgc3VwcG9ydFxuICAgIC8vIE9ubHkgc3VwcG9ydHMgUE9TVCBhbmQgR0VUIGNhbGxzIGFuZCBkb2Vzbid0IHJldHVybnMgdGhlIHJlc3BvbnNlIGhlYWRlcnMuXG4gICAgLy8gRE9OJ1QgZG8gdGhpcyBmb3IgdGVzdGluZyBiL2MgWE1MSHR0cFJlcXVlc3QgaXMgbW9ja2VkLCBub3QgWERvbWFpblJlcXVlc3QuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAndGVzdCcgJiZcbiAgICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgd2luZG93LlhEb21haW5SZXF1ZXN0ICYmICEoJ3dpdGhDcmVkZW50aWFscycgaW4gcmVxdWVzdCkgJiZcbiAgICAgICAgIWlzVVJMU2FtZU9yaWdpbihjb25maWcudXJsKSkge1xuICAgICAgcmVxdWVzdCA9IG5ldyB3aW5kb3cuWERvbWFpblJlcXVlc3QoKTtcbiAgICAgIGxvYWRFdmVudCA9ICdvbmxvYWQnO1xuICAgICAgeERvbWFpbiA9IHRydWU7XG4gICAgICByZXF1ZXN0Lm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbiBoYW5kbGVQcm9ncmVzcygpIHt9O1xuICAgICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge307XG4gICAgfVxuXG4gICAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICAgIGlmIChjb25maWcuYXV0aCkge1xuICAgICAgdmFyIHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICB2YXIgcGFzc3dvcmQgPSBjb25maWcuYXV0aC5wYXNzd29yZCB8fCAnJztcbiAgICAgIHJlcXVlc3RIZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdC5vcGVuKGNvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgYnVpbGRVUkwoY29uZmlnLnVybCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLCB0cnVlKTtcblxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gY29uZmlnLnRpbWVvdXQ7XG5cbiAgICAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlXG4gICAgcmVxdWVzdFtsb2FkRXZlbnRdID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCB8fCAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0ICYmICF4RG9tYWluKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuICAgICAgdmFyIHJlc3BvbnNlSGVhZGVycyA9ICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgPyBwYXJzZUhlYWRlcnMocmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSkgOiBudWxsO1xuICAgICAgdmFyIHJlc3BvbnNlRGF0YSA9ICFjb25maWcucmVzcG9uc2VUeXBlIHx8IGNvbmZpZy5yZXNwb25zZVR5cGUgPT09ICd0ZXh0JyA/IHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIHZhciByZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICAvLyBJRSBzZW5kcyAxMjIzIGluc3RlYWQgb2YgMjA0IChodHRwczovL2dpdGh1Yi5jb20vYXhpb3MvYXhpb3MvaXNzdWVzLzIwMSlcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyA9PT0gMTIyMyA/IDIwNCA6IHJlcXVlc3Quc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXF1ZXN0LnN0YXR1cyA9PT0gMTIyMyA/ICdObyBDb250ZW50JyA6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdDogcmVxdWVzdFxuICAgICAgfTtcblxuICAgICAgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGxvdyBsZXZlbCBuZXR3b3JrIGVycm9yc1xuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIGhhbmRsZUVycm9yKCkge1xuICAgICAgLy8gUmVhbCBlcnJvcnMgYXJlIGhpZGRlbiBmcm9tIHVzIGJ5IHRoZSBicm93c2VyXG4gICAgICAvLyBvbmVycm9yIHNob3VsZCBvbmx5IGZpcmUgaWYgaXQncyBhIG5ldHdvcmsgZXJyb3JcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcignTmV0d29yayBFcnJvcicsIGNvbmZpZywgbnVsbCwgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIHRpbWVvdXRcbiAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7XG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ3RpbWVvdXQgb2YgJyArIGNvbmZpZy50aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJywgY29uZmlnLCAnRUNPTk5BQk9SVEVEJyxcbiAgICAgICAgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gICAgLy8gU3BlY2lmaWNhbGx5IG5vdCBpZiB3ZSdyZSBpbiBhIHdlYiB3b3JrZXIsIG9yIHJlYWN0LW5hdGl2ZS5cbiAgICBpZiAodXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSkge1xuICAgICAgdmFyIGNvb2tpZXMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29va2llcycpO1xuXG4gICAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAgIHZhciB4c3JmVmFsdWUgPSAoY29uZmlnLndpdGhDcmVkZW50aWFscyB8fCBpc1VSTFNhbWVPcmlnaW4oY29uZmlnLnVybCkpICYmIGNvbmZpZy54c3JmQ29va2llTmFtZSA/XG4gICAgICAgICAgY29va2llcy5yZWFkKGNvbmZpZy54c3JmQ29va2llTmFtZSkgOlxuICAgICAgICAgIHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVyc1tjb25maWcueHNyZkhlYWRlck5hbWVdID0geHNyZlZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdERhdGEgPT09ICd1bmRlZmluZWQnICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xuICAgICAgICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICAgICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBPdGhlcndpc2UgYWRkIGhlYWRlciB0byB0aGUgcmVxdWVzdFxuICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoY29uZmlnLndpdGhDcmVkZW50aWFscykge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIEFkZCByZXNwb25zZVR5cGUgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBFeHBlY3RlZCBET01FeGNlcHRpb24gdGhyb3duIGJ5IGJyb3dzZXJzIG5vdCBjb21wYXRpYmxlIFhNTEh0dHBSZXF1ZXN0IExldmVsIDIuXG4gICAgICAgIC8vIEJ1dCwgdGhpcyBjYW4gYmUgc3VwcHJlc3NlZCBmb3IgJ2pzb24nIHR5cGUgYXMgaXQgY2FuIGJlIHBhcnNlZCBieSBkZWZhdWx0ICd0cmFuc2Zvcm1SZXNwb25zZScgZnVuY3Rpb24uXG4gICAgICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlICE9PSAnanNvbicpIHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHByb2dyZXNzIGlmIG5lZWRlZFxuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIC8vIE5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCB1cGxvYWQgZXZlbnRzXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25VcGxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJyAmJiByZXF1ZXN0LnVwbG9hZCkge1xuICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25VcGxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgY29uZmlnLmNhbmNlbFRva2VuLnByb21pc2UudGhlbihmdW5jdGlvbiBvbkNhbmNlbGVkKGNhbmNlbCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHJlamVjdChjYW5jZWwpO1xuICAgICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHJlcXVlc3REYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlcXVlc3REYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgQXhpb3MgPSByZXF1aXJlKCcuL2NvcmUvQXhpb3MnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICogQHJldHVybiB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgdmFyIGNvbnRleHQgPSBuZXcgQXhpb3MoZGVmYXVsdENvbmZpZyk7XG4gIHZhciBpbnN0YW5jZSA9IGJpbmQoQXhpb3MucHJvdG90eXBlLnJlcXVlc3QsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgYXhpb3MucHJvdG90eXBlIHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MucHJvdG90eXBlLCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0KTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxudmFyIGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbmF4aW9zLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpbnN0YW5jZUNvbmZpZykge1xuICByZXR1cm4gY3JlYXRlSW5zdGFuY2UodXRpbHMubWVyZ2UoZGVmYXVsdHMsIGluc3RhbmNlQ29uZmlnKSk7XG59O1xuXG4vLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cbmF4aW9zLkNhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbCcpO1xuYXhpb3MuQ2FuY2VsVG9rZW4gPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWxUb2tlbicpO1xuYXhpb3MuaXNDYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9pc0NhbmNlbCcpO1xuXG4vLyBFeHBvc2UgYWxsL3NwcmVhZFxuYXhpb3MuYWxsID0gZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuYXhpb3Muc3ByZWFkID0gcmVxdWlyZSgnLi9oZWxwZXJzL3NwcmVhZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGF4aW9zO1xuXG4vLyBBbGxvdyB1c2Ugb2YgZGVmYXVsdCBpbXBvcnQgc3ludGF4IGluIFR5cGVTY3JpcHRcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBheGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBBIGBDYW5jZWxgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsKG1lc3NhZ2UpIHtcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbn1cblxuQ2FuY2VsLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gJ0NhbmNlbCcgKyAodGhpcy5tZXNzYWdlID8gJzogJyArIHRoaXMubWVzc2FnZSA6ICcnKTtcbn07XG5cbkNhbmNlbC5wcm90b3R5cGUuX19DQU5DRUxfXyA9IHRydWU7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2FuY2VsID0gcmVxdWlyZSgnLi9DYW5jZWwnKTtcblxuLyoqXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBDYW5jZWxUb2tlbihleGVjdXRvcikge1xuICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIHJlc29sdmVQcm9taXNlO1xuICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgdmFyIHRva2VuID0gdGhpcztcbiAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UpIHtcbiAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsKG1lc3NhZ2UpO1xuICAgIHJlc29sdmVQcm9taXNlKHRva2VuLnJlYXNvbik7XG4gIH0pO1xufVxuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbkNhbmNlbFRva2VuLnByb3RvdHlwZS50aHJvd0lmUmVxdWVzdGVkID0gZnVuY3Rpb24gdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgdGhyb3cgdGhpcy5yZWFzb247XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBjb250YWlucyBhIG5ldyBgQ2FuY2VsVG9rZW5gIGFuZCBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLFxuICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAqL1xuQ2FuY2VsVG9rZW4uc291cmNlID0gZnVuY3Rpb24gc291cmNlKCkge1xuICB2YXIgY2FuY2VsO1xuICB2YXIgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgIGNhbmNlbCA9IGM7XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIHRva2VuOiB0b2tlbixcbiAgICBjYW5jZWw6IGNhbmNlbFxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWxUb2tlbjtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLy4uL2RlZmF1bHRzJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgSW50ZXJjZXB0b3JNYW5hZ2VyID0gcmVxdWlyZSgnLi9JbnRlcmNlcHRvck1hbmFnZXInKTtcbnZhciBkaXNwYXRjaFJlcXVlc3QgPSByZXF1aXJlKCcuL2Rpc3BhdGNoUmVxdWVzdCcpO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBBeGlvcyhpbnN0YW5jZUNvbmZpZykge1xuICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWc7XG4gIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpXG4gIH07XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXG4gKi9cbkF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gcmVxdWVzdChjb25maWcpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uZmlnID0gdXRpbHMubWVyZ2Uoe1xuICAgICAgdXJsOiBhcmd1bWVudHNbMF1cbiAgICB9LCBhcmd1bWVudHNbMV0pO1xuICB9XG5cbiAgY29uZmlnID0gdXRpbHMubWVyZ2UoZGVmYXVsdHMsIHttZXRob2Q6ICdnZXQnfSwgdGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgY29uZmlnLm1ldGhvZCA9IGNvbmZpZy5tZXRob2QudG9Mb3dlckNhc2UoKTtcblxuICAvLyBIb29rIHVwIGludGVyY2VwdG9ycyBtaWRkbGV3YXJlXG4gIHZhciBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QsIHVuZGVmaW5lZF07XG4gIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4udW5zaGlmdChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB3aGlsZSAoY2hhaW4ubGVuZ3RoKSB7XG4gICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbi5zaGlmdCgpLCBjaGFpbi5zaGlmdCgpKTtcbiAgfVxuXG4gIHJldHVybiBwcm9taXNlO1xufTtcblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBeGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBJbnRlcmNlcHRvck1hbmFnZXIoKSB7XG4gIHRoaXMuaGFuZGxlcnMgPSBbXTtcbn1cblxuLyoqXG4gKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpIHtcbiAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICBmdWxmaWxsZWQ6IGZ1bGZpbGxlZCxcbiAgICByZWplY3RlZDogcmVqZWN0ZWRcbiAgfSk7XG4gIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5lamVjdCA9IGZ1bmN0aW9uIGVqZWN0KGlkKSB7XG4gIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgfVxufTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICpcbiAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZuKSB7XG4gIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICBmbihoKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcmNlcHRvck1hbmFnZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBlbmhhbmNlRXJyb3IgPSByZXF1aXJlKCcuL2VuaGFuY2VFcnJvcicpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGVFcnJvcihtZXNzYWdlLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIHZhciBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgcmV0dXJuIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgdHJhbnNmb3JtRGF0YSA9IHJlcXVpcmUoJy4vdHJhbnNmb3JtRGF0YScpO1xudmFyIGlzQ2FuY2VsID0gcmVxdWlyZSgnLi4vY2FuY2VsL2lzQ2FuY2VsJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0cycpO1xudmFyIGlzQWJzb2x1dGVVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTCcpO1xudmFyIGNvbWJpbmVVUkxzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2NvbWJpbmVVUkxzJyk7XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgLy8gU3VwcG9ydCBiYXNlVVJMIGNvbmZpZ1xuICBpZiAoY29uZmlnLmJhc2VVUkwgJiYgIWlzQWJzb2x1dGVVUkwoY29uZmlnLnVybCkpIHtcbiAgICBjb25maWcudXJsID0gY29tYmluZVVSTHMoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuICB9XG5cbiAgLy8gRW5zdXJlIGhlYWRlcnMgZXhpc3RcbiAgY29uZmlnLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycyB8fCB7fTtcblxuICAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICBjb25maWcuZGF0YSxcbiAgICBjb25maWcuaGVhZGVycyxcbiAgICBjb25maWcudHJhbnNmb3JtUmVxdWVzdFxuICApO1xuXG4gIC8vIEZsYXR0ZW4gaGVhZGVyc1xuICBjb25maWcuaGVhZGVycyA9IHV0aWxzLm1lcmdlKFxuICAgIGNvbmZpZy5oZWFkZXJzLmNvbW1vbiB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVyc1tjb25maWcubWV0aG9kXSB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVycyB8fCB7fVxuICApO1xuXG4gIHV0aWxzLmZvckVhY2goXG4gICAgWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sXG4gICAgZnVuY3Rpb24gY2xlYW5IZWFkZXJDb25maWcobWV0aG9kKSB7XG4gICAgICBkZWxldGUgY29uZmlnLmhlYWRlcnNbbWV0aG9kXTtcbiAgICB9XG4gICk7XG5cbiAgdmFyIGFkYXB0ZXIgPSBjb25maWcuYWRhcHRlciB8fCBkZWZhdWx0cy5hZGFwdGVyO1xuXG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgIHJlc3BvbnNlLmRhdGEsXG4gICAgICByZXNwb25zZS5oZWFkZXJzLFxuICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgKTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzLFxuICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXBkYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBjb25maWcsIGVycm9yIGNvZGUsIGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvciBUaGUgZXJyb3IgdG8gdXBkYXRlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgZXJyb3IuY29uZmlnID0gY29uZmlnO1xuICBpZiAoY29kZSkge1xuICAgIGVycm9yLmNvZGUgPSBjb2RlO1xuICB9XG4gIGVycm9yLnJlcXVlc3QgPSByZXF1ZXN0O1xuICBlcnJvci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICByZXR1cm4gZXJyb3I7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUVycm9yJyk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICAvLyBOb3RlOiBzdGF0dXMgaXMgbm90IGV4cG9zZWQgYnkgWERvbWFpblJlcXVlc3RcbiAgaWYgKCFyZXNwb25zZS5zdGF0dXMgfHwgIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QoY3JlYXRlRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgbnVsbCxcbiAgICAgIHJlc3BvbnNlLnJlcXVlc3QsXG4gICAgICByZXNwb25zZVxuICAgICkpO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8qKlxuICogVHJhbnNmb3JtIHRoZSBkYXRhIGZvciBhIHJlcXVlc3Qgb3IgYSByZXNwb25zZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBiZSB0cmFuc2Zvcm1lZFxuICogQHBhcmFtIHtBcnJheX0gaGVhZGVycyBUaGUgaGVhZGVycyBmb3IgdGhlIHJlcXVlc3Qgb3IgcmVzcG9uc2VcbiAqIEBwYXJhbSB7QXJyYXl8RnVuY3Rpb259IGZucyBBIHNpbmdsZSBmdW5jdGlvbiBvciBBcnJheSBvZiBmdW5jdGlvbnNcbiAqIEByZXR1cm5zIHsqfSBUaGUgcmVzdWx0aW5nIHRyYW5zZm9ybWVkIGRhdGFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGRhdGEsIGhlYWRlcnMsIGZucykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbihkYXRhLCBoZWFkZXJzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgbm9ybWFsaXplSGVhZGVyTmFtZSA9IHJlcXVpcmUoJy4vaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lJyk7XG5cbnZhciBERUZBVUxUX0NPTlRFTlRfVFlQRSA9IHtcbiAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG5mdW5jdGlvbiBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgdmFsdWUpIHtcbiAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzKSAmJiB1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzWydDb250ZW50LVR5cGUnXSkpIHtcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRBZGFwdGVyKCkge1xuICB2YXIgYWRhcHRlcjtcbiAgaWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3IgYnJvd3NlcnMgdXNlIFhIUiBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMveGhyJyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIG5vZGUgdXNlIEhUVFAgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL2h0dHAnKTtcbiAgfVxuICByZXR1cm4gYWRhcHRlcjtcbn1cblxudmFyIGRlZmF1bHRzID0ge1xuICBhZGFwdGVyOiBnZXREZWZhdWx0QWRhcHRlcigpLFxuXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdDb250ZW50LVR5cGUnKTtcbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzU3RyZWFtKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0ZpbGUoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQmxvYihkYXRhKVxuICAgICkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc09iamVjdChkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkgeyAvKiBJZ25vcmUgKi8gfVxuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgLyoqXG4gICAqIEEgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gYWJvcnQgYSByZXF1ZXN0LiBJZiBzZXQgdG8gMCAoZGVmYXVsdCkgYVxuICAgKiB0aW1lb3V0IGlzIG5vdCBjcmVhdGVkLlxuICAgKi9cbiAgdGltZW91dDogMCxcblxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG5cbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfVxufTtcblxuZGVmYXVsdHMuaGVhZGVycyA9IHtcbiAgY29tbW9uOiB7XG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gIH1cbn07XG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIGJ0b2EgcG9seWZpbGwgZm9yIElFPDEwIGNvdXJ0ZXN5IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXZpZGNoYW1iZXJzL0Jhc2U2NC5qc1xuXG52YXIgY2hhcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz0nO1xuXG5mdW5jdGlvbiBFKCkge1xuICB0aGlzLm1lc3NhZ2UgPSAnU3RyaW5nIGNvbnRhaW5zIGFuIGludmFsaWQgY2hhcmFjdGVyJztcbn1cbkUucHJvdG90eXBlID0gbmV3IEVycm9yO1xuRS5wcm90b3R5cGUuY29kZSA9IDU7XG5FLnByb3RvdHlwZS5uYW1lID0gJ0ludmFsaWRDaGFyYWN0ZXJFcnJvcic7XG5cbmZ1bmN0aW9uIGJ0b2EoaW5wdXQpIHtcbiAgdmFyIHN0ciA9IFN0cmluZyhpbnB1dCk7XG4gIHZhciBvdXRwdXQgPSAnJztcbiAgZm9yIChcbiAgICAvLyBpbml0aWFsaXplIHJlc3VsdCBhbmQgY291bnRlclxuICAgIHZhciBibG9jaywgY2hhckNvZGUsIGlkeCA9IDAsIG1hcCA9IGNoYXJzO1xuICAgIC8vIGlmIHRoZSBuZXh0IHN0ciBpbmRleCBkb2VzIG5vdCBleGlzdDpcbiAgICAvLyAgIGNoYW5nZSB0aGUgbWFwcGluZyB0YWJsZSB0byBcIj1cIlxuICAgIC8vICAgY2hlY2sgaWYgZCBoYXMgbm8gZnJhY3Rpb25hbCBkaWdpdHNcbiAgICBzdHIuY2hhckF0KGlkeCB8IDApIHx8IChtYXAgPSAnPScsIGlkeCAlIDEpO1xuICAgIC8vIFwiOCAtIGlkeCAlIDEgKiA4XCIgZ2VuZXJhdGVzIHRoZSBzZXF1ZW5jZSAyLCA0LCA2LCA4XG4gICAgb3V0cHV0ICs9IG1hcC5jaGFyQXQoNjMgJiBibG9jayA+PiA4IC0gaWR4ICUgMSAqIDgpXG4gICkge1xuICAgIGNoYXJDb2RlID0gc3RyLmNoYXJDb2RlQXQoaWR4ICs9IDMgLyA0KTtcbiAgICBpZiAoY2hhckNvZGUgPiAweEZGKSB7XG4gICAgICB0aHJvdyBuZXcgRSgpO1xuICAgIH1cbiAgICBibG9jayA9IGJsb2NrIDw8IDggfCBjaGFyQ29kZTtcbiAgfVxuICByZXR1cm4gb3V0cHV0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ0b2E7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkuXG4gICAgcmVwbGFjZSgvJTQwL2dpLCAnQCcpLlxuICAgIHJlcGxhY2UoLyUzQS9naSwgJzonKS5cbiAgICByZXBsYWNlKC8lMjQvZywgJyQnKS5cbiAgICByZXBsYWNlKC8lMkMvZ2ksICcsJykuXG4gICAgcmVwbGFjZSgvJTIwL2csICcrJykuXG4gICAgcmVwbGFjZSgvJTVCL2dpLCAnWycpLlxuICAgIHJlcGxhY2UoLyU1RC9naSwgJ10nKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIFVSTCBieSBhcHBlbmRpbmcgcGFyYW1zIHRvIHRoZSBlbmRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBiYXNlIG9mIHRoZSB1cmwgKGUuZy4sIGh0dHA6Ly93d3cuZ29vZ2xlLmNvbSlcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcGFyYW1zXSBUaGUgcGFyYW1zIHRvIGJlIGFwcGVuZGVkXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHVybFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkVVJMKHVybCwgcGFyYW1zLCBwYXJhbXNTZXJpYWxpemVyKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB2YXIgc2VyaWFsaXplZFBhcmFtcztcbiAgaWYgKHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zU2VyaWFsaXplcihwYXJhbXMpO1xuICB9IGVsc2UgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKHBhcmFtcykpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHBhcnRzID0gW107XG5cbiAgICB1dGlscy5mb3JFYWNoKHBhcmFtcywgZnVuY3Rpb24gc2VyaWFsaXplKHZhbCwga2V5KSB7XG4gICAgICBpZiAodmFsID09PSBudWxsIHx8IHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHV0aWxzLmlzQXJyYXkodmFsKSkge1xuICAgICAgICBrZXkgPSBrZXkgKyAnW10nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsID0gW3ZhbF07XG4gICAgICB9XG5cbiAgICAgIHV0aWxzLmZvckVhY2godmFsLCBmdW5jdGlvbiBwYXJzZVZhbHVlKHYpIHtcbiAgICAgICAgaWYgKHV0aWxzLmlzRGF0ZSh2KSkge1xuICAgICAgICAgIHYgPSB2LnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QodikpIHtcbiAgICAgICAgICB2ID0gSlNPTi5zdHJpbmdpZnkodik7XG4gICAgICAgIH1cbiAgICAgICAgcGFydHMucHVzaChlbmNvZGUoa2V5KSArICc9JyArIGVuY29kZSh2KSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJ0cy5qb2luKCcmJyk7XG4gIH1cblxuICBpZiAoc2VyaWFsaXplZFBhcmFtcykge1xuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgVVJMXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbiAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSkge1xuICAgICAgICB2YXIgY29va2llID0gW107XG4gICAgICAgIGNvb2tpZS5wdXNoKG5hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcblxuICAgICAgICBpZiAodXRpbHMuaXNOdW1iZXIoZXhwaXJlcykpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnZXhwaXJlcz0nICsgbmV3IERhdGUoZXhwaXJlcykudG9HTVRTdHJpbmcoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcocGF0aCkpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgncGF0aD0nICsgcGF0aCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcoZG9tYWluKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdkb21haW49JyArIGRvbWFpbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VjdXJlID09PSB0cnVlKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ3NlY3VyZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgICB9LFxuXG4gICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG5hbWUpIHtcbiAgICAgICAgdmFyIG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgICAgcmV0dXJuIChtYXRjaCA/IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFszXSkgOiBudWxsKTtcbiAgICAgIH0sXG5cbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG5hbWUpIHtcbiAgICAgICAgdGhpcy53cml0ZShuYW1lLCAnJywgRGF0ZS5ub3coKSAtIDg2NDAwMDAwKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHt9LFxuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHsgcmV0dXJuIG51bGw7IH0sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICByZXR1cm4gL14oW2Etel1bYS16XFxkXFwrXFwtXFwuXSo6KT9cXC9cXC8vaS50ZXN0KHVybCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3RcbiAgLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG4gIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgdmFyIG1zaWUgPSAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIHZhciB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICB2YXIgb3JpZ2luVVJMO1xuXG4gICAgLyoqXG4gICAgKiBQYXJzZSBhIFVSTCB0byBkaXNjb3ZlciBpdCdzIGNvbXBvbmVudHNcbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gYmUgcGFyc2VkXG4gICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICovXG4gICAgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmwpIHtcbiAgICAgIHZhciBocmVmID0gdXJsO1xuXG4gICAgICBpZiAobXNpZSkge1xuICAgICAgICAvLyBJRSBuZWVkcyBhdHRyaWJ1dGUgc2V0IHR3aWNlIHRvIG5vcm1hbGl6ZSBwcm9wZXJ0aWVzXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICAgIH1cblxuICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG5cbiAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgIGhvc3Q6IHVybFBhcnNpbmdOb2RlLmhvc3QsXG4gICAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgICAgaG9zdG5hbWU6IHVybFBhcnNpbmdOb2RlLmhvc3RuYW1lLFxuICAgICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/XG4gICAgICAgICAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgIC8qKlxuICAgICogRGV0ZXJtaW5lIGlmIGEgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4gYXMgdGhlIGN1cnJlbnQgbG9jYXRpb25cbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdFVSTCBUaGUgVVJMIHRvIHRlc3RcbiAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luLCBvdGhlcndpc2UgZmFsc2VcbiAgICAqL1xuICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgICAgdmFyIHBhcnNlZCA9ICh1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgIHJldHVybiAocGFyc2VkLnByb3RvY29sID09PSBvcmlnaW5VUkwucHJvdG9jb2wgJiZcbiAgICAgICAgICAgIHBhcnNlZC5ob3N0ID09PSBvcmlnaW5VUkwuaG9zdCk7XG4gICAgfTtcbiAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsIG5vcm1hbGl6ZWROYW1lKSB7XG4gIHV0aWxzLmZvckVhY2goaGVhZGVycywgZnVuY3Rpb24gcHJvY2Vzc0hlYWRlcih2YWx1ZSwgbmFtZSkge1xuICAgIGlmIChuYW1lICE9PSBub3JtYWxpemVkTmFtZSAmJiBuYW1lLnRvVXBwZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWROYW1lLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZE5hbWVdID0gdmFsdWU7XG4gICAgICBkZWxldGUgaGVhZGVyc1tuYW1lXTtcbiAgICB9XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vLyBIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xudmFyIGlnbm9yZUR1cGxpY2F0ZU9mID0gW1xuICAnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLFxuICAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsXG4gICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJyxcbiAgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCdcbl07XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga2V5O1xuICB2YXIgdmFsO1xuICB2YXIgaTtcblxuICBpZiAoIWhlYWRlcnMpIHsgcmV0dXJuIHBhcnNlZDsgfVxuXG4gIHV0aWxzLmZvckVhY2goaGVhZGVycy5zcGxpdCgnXFxuJyksIGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoMCwgaSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cihpICsgMSkpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgaWYgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mLmluZGV4T2Yoa2V5KSA+PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09ICdzZXQtY29va2llJykge1xuICAgICAgICBwYXJzZWRba2V5XSA9IChwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldIDogW10pLmNvbmNhdChbdmFsXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNwcmVhZChjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcChhcnIpIHtcbiAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkobnVsbCwgYXJyKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBpc0J1ZmZlciA9IHJlcXVpcmUoJ2lzLWJ1ZmZlcicpO1xuXG4vKmdsb2JhbCB0b1N0cmluZzp0cnVlKi9cblxuLy8gdXRpbHMgaXMgYSBsaWJyYXJ5IG9mIGdlbmVyaWMgaGVscGVyIGZ1bmN0aW9ucyBub24tc3BlY2lmaWMgdG8gYXhpb3NcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Zvcm1EYXRhKHZhbCkge1xuICByZXR1cm4gKHR5cGVvZiBGb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcpICYmICh2YWwgaW5zdGFuY2VvZiBGb3JtRGF0YSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlclZpZXcodmFsKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJykgJiYgKEFycmF5QnVmZmVyLmlzVmlldykpIHtcbiAgICByZXN1bHQgPSBBcnJheUJ1ZmZlci5pc1ZpZXcodmFsKTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSAodmFsKSAmJiAodmFsLmJ1ZmZlcikgJiYgKHZhbC5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcik7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyaW5nLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIE51bWJlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOdW1iZXIodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnbnVtYmVyJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0RhdGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0ZpbGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZpbGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJsb2JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Jsb2IodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEJsb2JdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyZWFtKHZhbCkge1xuICByZXR1cm4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VSTFNlYXJjaFBhcmFtcyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiBVUkxTZWFyY2hQYXJhbXMgIT09ICd1bmRlZmluZWQnICYmIHZhbCBpbnN0YW5jZW9mIFVSTFNlYXJjaFBhcmFtcztcbn1cblxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5mdW5jdGlvbiB0cmltKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqLywgJycpLnJlcGxhY2UoL1xccyokLywgJycpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudFxuICpcbiAqIFRoaXMgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXIsIGFuZCByZWFjdC1uYXRpdmUuXG4gKiBCb3RoIGVudmlyb25tZW50cyBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LCBidXQgbm90IGZ1bGx5IHN0YW5kYXJkIGdsb2JhbHMuXG4gKlxuICogd2ViIHdvcmtlcnM6XG4gKiAgdHlwZW9mIHdpbmRvdyAtPiB1bmRlZmluZWRcbiAqICB0eXBlb2YgZG9jdW1lbnQgLT4gdW5kZWZpbmVkXG4gKlxuICogcmVhY3QtbmF0aXZlOlxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdSZWFjdE5hdGl2ZSdcbiAqL1xuZnVuY3Rpb24gaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuICApO1xufVxuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbikge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBtZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0eXBlb2YgcmVzdWx0W2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5mdW5jdGlvbiBleHRlbmQoYSwgYiwgdGhpc0FyZykge1xuICBmb3JFYWNoKGIsIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHRoaXNBcmcgJiYgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc0FycmF5OiBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyOiBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcjogaXNCdWZmZXIsXG4gIGlzRm9ybURhdGE6IGlzRm9ybURhdGEsXG4gIGlzQXJyYXlCdWZmZXJWaWV3OiBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmc6IGlzU3RyaW5nLFxuICBpc051bWJlcjogaXNOdW1iZXIsXG4gIGlzT2JqZWN0OiBpc09iamVjdCxcbiAgaXNVbmRlZmluZWQ6IGlzVW5kZWZpbmVkLFxuICBpc0RhdGU6IGlzRGF0ZSxcbiAgaXNGaWxlOiBpc0ZpbGUsXG4gIGlzQmxvYjogaXNCbG9iLFxuICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbTogaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zOiBpc1VSTFNlYXJjaFBhcmFtcyxcbiAgaXNTdGFuZGFyZEJyb3dzZXJFbnY6IGlzU3RhbmRhcmRCcm93c2VyRW52LFxuICBmb3JFYWNoOiBmb3JFYWNoLFxuICBtZXJnZTogbWVyZ2UsXG4gIGV4dGVuZDogZXh0ZW5kLFxuICB0cmltOiB0cmltXG59O1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiaW1wb3J0IHtcbiAgQUNUSU9OX0FMTCxcbiAgQUNUSU9OX0NST1AsXG4gIEFDVElPTl9FQVNULFxuICBBQ1RJT05fTU9WRSxcbiAgQUNUSU9OX05PUlRILFxuICBBQ1RJT05fTk9SVEhfRUFTVCxcbiAgQUNUSU9OX05PUlRIX1dFU1QsXG4gIEFDVElPTl9TT1VUSCxcbiAgQUNUSU9OX1NPVVRIX0VBU1QsXG4gIEFDVElPTl9TT1VUSF9XRVNULFxuICBBQ1RJT05fV0VTVCxcbiAgQUNUSU9OX1pPT00sXG4gIENMQVNTX0hJRERFTixcbn0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHtcbiAgZm9yRWFjaCxcbiAgZ2V0TWF4Wm9vbVJhdGlvLFxuICBnZXRPZmZzZXQsXG4gIHJlbW92ZUNsYXNzLFxufSBmcm9tICcuL3V0aWxpdGllcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY2hhbmdlKGV2ZW50KSB7XG4gICAgY29uc3Qge1xuICAgICAgb3B0aW9ucyxcbiAgICAgIGNhbnZhc0RhdGEsXG4gICAgICBjb250YWluZXJEYXRhLFxuICAgICAgY3JvcEJveERhdGEsXG4gICAgICBwb2ludGVycyxcbiAgICB9ID0gdGhpcztcbiAgICBsZXQgeyBhY3Rpb24gfSA9IHRoaXM7XG4gICAgbGV0IHsgYXNwZWN0UmF0aW8gfSA9IG9wdGlvbnM7XG4gICAgbGV0IHtcbiAgICAgIGxlZnQsXG4gICAgICB0b3AsXG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodCxcbiAgICB9ID0gY3JvcEJveERhdGE7XG4gICAgY29uc3QgcmlnaHQgPSBsZWZ0ICsgd2lkdGg7XG4gICAgY29uc3QgYm90dG9tID0gdG9wICsgaGVpZ2h0O1xuICAgIGxldCBtaW5MZWZ0ID0gMDtcbiAgICBsZXQgbWluVG9wID0gMDtcbiAgICBsZXQgbWF4V2lkdGggPSBjb250YWluZXJEYXRhLndpZHRoO1xuICAgIGxldCBtYXhIZWlnaHQgPSBjb250YWluZXJEYXRhLmhlaWdodDtcbiAgICBsZXQgcmVuZGVyYWJsZSA9IHRydWU7XG4gICAgbGV0IG9mZnNldDtcblxuICAgIC8vIExvY2tpbmcgYXNwZWN0IHJhdGlvIGluIFwiZnJlZSBtb2RlXCIgYnkgaG9sZGluZyBzaGlmdCBrZXlcbiAgICBpZiAoIWFzcGVjdFJhdGlvICYmIGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICBhc3BlY3RSYXRpbyA9IHdpZHRoICYmIGhlaWdodCA/IHdpZHRoIC8gaGVpZ2h0IDogMTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5saW1pdGVkKSB7XG4gICAgICAoeyBtaW5MZWZ0LCBtaW5Ub3AgfSA9IGNyb3BCb3hEYXRhKTtcbiAgICAgIG1heFdpZHRoID0gbWluTGVmdCArIE1hdGgubWluKFxuICAgICAgICBjb250YWluZXJEYXRhLndpZHRoLFxuICAgICAgICBjYW52YXNEYXRhLndpZHRoLFxuICAgICAgICBjYW52YXNEYXRhLmxlZnQgKyBjYW52YXNEYXRhLndpZHRoLFxuICAgICAgKTtcbiAgICAgIG1heEhlaWdodCA9IG1pblRvcCArIE1hdGgubWluKFxuICAgICAgICBjb250YWluZXJEYXRhLmhlaWdodCxcbiAgICAgICAgY2FudmFzRGF0YS5oZWlnaHQsXG4gICAgICAgIGNhbnZhc0RhdGEudG9wICsgY2FudmFzRGF0YS5oZWlnaHQsXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IHBvaW50ZXIgPSBwb2ludGVyc1tPYmplY3Qua2V5cyhwb2ludGVycylbMF1dO1xuICAgIGNvbnN0IHJhbmdlID0ge1xuICAgICAgeDogcG9pbnRlci5lbmRYIC0gcG9pbnRlci5zdGFydFgsXG4gICAgICB5OiBwb2ludGVyLmVuZFkgLSBwb2ludGVyLnN0YXJ0WSxcbiAgICB9O1xuICAgIGNvbnN0IGNoZWNrID0gKHNpZGUpID0+IHtcbiAgICAgIHN3aXRjaCAoc2lkZSkge1xuICAgICAgICBjYXNlIEFDVElPTl9FQVNUOlxuICAgICAgICAgIGlmIChyaWdodCArIHJhbmdlLnggPiBtYXhXaWR0aCkge1xuICAgICAgICAgICAgcmFuZ2UueCA9IG1heFdpZHRoIC0gcmlnaHQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBBQ1RJT05fV0VTVDpcbiAgICAgICAgICBpZiAobGVmdCArIHJhbmdlLnggPCBtaW5MZWZ0KSB7XG4gICAgICAgICAgICByYW5nZS54ID0gbWluTGVmdCAtIGxlZnQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBBQ1RJT05fTk9SVEg6XG4gICAgICAgICAgaWYgKHRvcCArIHJhbmdlLnkgPCBtaW5Ub3ApIHtcbiAgICAgICAgICAgIHJhbmdlLnkgPSBtaW5Ub3AgLSB0b3A7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBBQ1RJT05fU09VVEg6XG4gICAgICAgICAgaWYgKGJvdHRvbSArIHJhbmdlLnkgPiBtYXhIZWlnaHQpIHtcbiAgICAgICAgICAgIHJhbmdlLnkgPSBtYXhIZWlnaHQgLSBib3R0b207XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgIC8vIE1vdmUgY3JvcCBib3hcbiAgICAgIGNhc2UgQUNUSU9OX0FMTDpcbiAgICAgICAgbGVmdCArPSByYW5nZS54O1xuICAgICAgICB0b3AgKz0gcmFuZ2UueTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8vIFJlc2l6ZSBjcm9wIGJveFxuICAgICAgY2FzZSBBQ1RJT05fRUFTVDpcbiAgICAgICAgaWYgKHJhbmdlLnggPj0gMCAmJiAocmlnaHQgPj0gbWF4V2lkdGggfHwgKGFzcGVjdFJhdGlvXG4gICAgICAgICAgJiYgKHRvcCA8PSBtaW5Ub3AgfHwgYm90dG9tID49IG1heEhlaWdodCkpKSkge1xuICAgICAgICAgIHJlbmRlcmFibGUgPSBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNoZWNrKEFDVElPTl9FQVNUKTtcbiAgICAgICAgd2lkdGggKz0gcmFuZ2UueDtcblxuICAgICAgICBpZiAod2lkdGggPCAwKSB7XG4gICAgICAgICAgYWN0aW9uID0gQUNUSU9OX1dFU1Q7XG4gICAgICAgICAgd2lkdGggPSAtd2lkdGg7XG4gICAgICAgICAgbGVmdCAtPSB3aWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhc3BlY3RSYXRpbykge1xuICAgICAgICAgIGhlaWdodCA9IHdpZHRoIC8gYXNwZWN0UmF0aW87XG4gICAgICAgICAgdG9wICs9IChjcm9wQm94RGF0YS5oZWlnaHQgLSBoZWlnaHQpIC8gMjtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEFDVElPTl9OT1JUSDpcbiAgICAgICAgaWYgKHJhbmdlLnkgPD0gMCAmJiAodG9wIDw9IG1pblRvcCB8fCAoYXNwZWN0UmF0aW9cbiAgICAgICAgICAmJiAobGVmdCA8PSBtaW5MZWZ0IHx8IHJpZ2h0ID49IG1heFdpZHRoKSkpKSB7XG4gICAgICAgICAgcmVuZGVyYWJsZSA9IGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2hlY2soQUNUSU9OX05PUlRIKTtcbiAgICAgICAgaGVpZ2h0IC09IHJhbmdlLnk7XG4gICAgICAgIHRvcCArPSByYW5nZS55O1xuXG4gICAgICAgIGlmIChoZWlnaHQgPCAwKSB7XG4gICAgICAgICAgYWN0aW9uID0gQUNUSU9OX1NPVVRIO1xuICAgICAgICAgIGhlaWdodCA9IC1oZWlnaHQ7XG4gICAgICAgICAgdG9wIC09IGhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhc3BlY3RSYXRpbykge1xuICAgICAgICAgIHdpZHRoID0gaGVpZ2h0ICogYXNwZWN0UmF0aW87XG4gICAgICAgICAgbGVmdCArPSAoY3JvcEJveERhdGEud2lkdGggLSB3aWR0aCkgLyAyO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgQUNUSU9OX1dFU1Q6XG4gICAgICAgIGlmIChyYW5nZS54IDw9IDAgJiYgKGxlZnQgPD0gbWluTGVmdCB8fCAoYXNwZWN0UmF0aW9cbiAgICAgICAgICAmJiAodG9wIDw9IG1pblRvcCB8fCBib3R0b20gPj0gbWF4SGVpZ2h0KSkpKSB7XG4gICAgICAgICAgcmVuZGVyYWJsZSA9IGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2hlY2soQUNUSU9OX1dFU1QpO1xuICAgICAgICB3aWR0aCAtPSByYW5nZS54O1xuICAgICAgICBsZWZ0ICs9IHJhbmdlLng7XG5cbiAgICAgICAgaWYgKHdpZHRoIDwgMCkge1xuICAgICAgICAgIGFjdGlvbiA9IEFDVElPTl9FQVNUO1xuICAgICAgICAgIHdpZHRoID0gLXdpZHRoO1xuICAgICAgICAgIGxlZnQgLT0gd2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYXNwZWN0UmF0aW8pIHtcbiAgICAgICAgICBoZWlnaHQgPSB3aWR0aCAvIGFzcGVjdFJhdGlvO1xuICAgICAgICAgIHRvcCArPSAoY3JvcEJveERhdGEuaGVpZ2h0IC0gaGVpZ2h0KSAvIDI7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBBQ1RJT05fU09VVEg6XG4gICAgICAgIGlmIChyYW5nZS55ID49IDAgJiYgKGJvdHRvbSA+PSBtYXhIZWlnaHQgfHwgKGFzcGVjdFJhdGlvXG4gICAgICAgICAgJiYgKGxlZnQgPD0gbWluTGVmdCB8fCByaWdodCA+PSBtYXhXaWR0aCkpKSkge1xuICAgICAgICAgIHJlbmRlcmFibGUgPSBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNoZWNrKEFDVElPTl9TT1VUSCk7XG4gICAgICAgIGhlaWdodCArPSByYW5nZS55O1xuXG4gICAgICAgIGlmIChoZWlnaHQgPCAwKSB7XG4gICAgICAgICAgYWN0aW9uID0gQUNUSU9OX05PUlRIO1xuICAgICAgICAgIGhlaWdodCA9IC1oZWlnaHQ7XG4gICAgICAgICAgdG9wIC09IGhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhc3BlY3RSYXRpbykge1xuICAgICAgICAgIHdpZHRoID0gaGVpZ2h0ICogYXNwZWN0UmF0aW87XG4gICAgICAgICAgbGVmdCArPSAoY3JvcEJveERhdGEud2lkdGggLSB3aWR0aCkgLyAyO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgQUNUSU9OX05PUlRIX0VBU1Q6XG4gICAgICAgIGlmIChhc3BlY3RSYXRpbykge1xuICAgICAgICAgIGlmIChyYW5nZS55IDw9IDAgJiYgKHRvcCA8PSBtaW5Ub3AgfHwgcmlnaHQgPj0gbWF4V2lkdGgpKSB7XG4gICAgICAgICAgICByZW5kZXJhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjaGVjayhBQ1RJT05fTk9SVEgpO1xuICAgICAgICAgIGhlaWdodCAtPSByYW5nZS55O1xuICAgICAgICAgIHRvcCArPSByYW5nZS55O1xuICAgICAgICAgIHdpZHRoID0gaGVpZ2h0ICogYXNwZWN0UmF0aW87XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2hlY2soQUNUSU9OX05PUlRIKTtcbiAgICAgICAgICBjaGVjayhBQ1RJT05fRUFTVCk7XG5cbiAgICAgICAgICBpZiAocmFuZ2UueCA+PSAwKSB7XG4gICAgICAgICAgICBpZiAocmlnaHQgPCBtYXhXaWR0aCkge1xuICAgICAgICAgICAgICB3aWR0aCArPSByYW5nZS54O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyYW5nZS55IDw9IDAgJiYgdG9wIDw9IG1pblRvcCkge1xuICAgICAgICAgICAgICByZW5kZXJhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdpZHRoICs9IHJhbmdlLng7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHJhbmdlLnkgPD0gMCkge1xuICAgICAgICAgICAgaWYgKHRvcCA+IG1pblRvcCkge1xuICAgICAgICAgICAgICBoZWlnaHQgLT0gcmFuZ2UueTtcbiAgICAgICAgICAgICAgdG9wICs9IHJhbmdlLnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhlaWdodCAtPSByYW5nZS55O1xuICAgICAgICAgICAgdG9wICs9IHJhbmdlLnk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHdpZHRoIDwgMCAmJiBoZWlnaHQgPCAwKSB7XG4gICAgICAgICAgYWN0aW9uID0gQUNUSU9OX1NPVVRIX1dFU1Q7XG4gICAgICAgICAgaGVpZ2h0ID0gLWhlaWdodDtcbiAgICAgICAgICB3aWR0aCA9IC13aWR0aDtcbiAgICAgICAgICB0b3AgLT0gaGVpZ2h0O1xuICAgICAgICAgIGxlZnQgLT0gd2lkdGg7XG4gICAgICAgIH0gZWxzZSBpZiAod2lkdGggPCAwKSB7XG4gICAgICAgICAgYWN0aW9uID0gQUNUSU9OX05PUlRIX1dFU1Q7XG4gICAgICAgICAgd2lkdGggPSAtd2lkdGg7XG4gICAgICAgICAgbGVmdCAtPSB3aWR0aDtcbiAgICAgICAgfSBlbHNlIGlmIChoZWlnaHQgPCAwKSB7XG4gICAgICAgICAgYWN0aW9uID0gQUNUSU9OX1NPVVRIX0VBU1Q7XG4gICAgICAgICAgaGVpZ2h0ID0gLWhlaWdodDtcbiAgICAgICAgICB0b3AgLT0gaGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgQUNUSU9OX05PUlRIX1dFU1Q6XG4gICAgICAgIGlmIChhc3BlY3RSYXRpbykge1xuICAgICAgICAgIGlmIChyYW5nZS55IDw9IDAgJiYgKHRvcCA8PSBtaW5Ub3AgfHwgbGVmdCA8PSBtaW5MZWZ0KSkge1xuICAgICAgICAgICAgcmVuZGVyYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY2hlY2soQUNUSU9OX05PUlRIKTtcbiAgICAgICAgICBoZWlnaHQgLT0gcmFuZ2UueTtcbiAgICAgICAgICB0b3AgKz0gcmFuZ2UueTtcbiAgICAgICAgICB3aWR0aCA9IGhlaWdodCAqIGFzcGVjdFJhdGlvO1xuICAgICAgICAgIGxlZnQgKz0gY3JvcEJveERhdGEud2lkdGggLSB3aWR0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjaGVjayhBQ1RJT05fTk9SVEgpO1xuICAgICAgICAgIGNoZWNrKEFDVElPTl9XRVNUKTtcblxuICAgICAgICAgIGlmIChyYW5nZS54IDw9IDApIHtcbiAgICAgICAgICAgIGlmIChsZWZ0ID4gbWluTGVmdCkge1xuICAgICAgICAgICAgICB3aWR0aCAtPSByYW5nZS54O1xuICAgICAgICAgICAgICBsZWZ0ICs9IHJhbmdlLng7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJhbmdlLnkgPD0gMCAmJiB0b3AgPD0gbWluVG9wKSB7XG4gICAgICAgICAgICAgIHJlbmRlcmFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2lkdGggLT0gcmFuZ2UueDtcbiAgICAgICAgICAgIGxlZnQgKz0gcmFuZ2UueDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocmFuZ2UueSA8PSAwKSB7XG4gICAgICAgICAgICBpZiAodG9wID4gbWluVG9wKSB7XG4gICAgICAgICAgICAgIGhlaWdodCAtPSByYW5nZS55O1xuICAgICAgICAgICAgICB0b3AgKz0gcmFuZ2UueTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaGVpZ2h0IC09IHJhbmdlLnk7XG4gICAgICAgICAgICB0b3AgKz0gcmFuZ2UueTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAod2lkdGggPCAwICYmIGhlaWdodCA8IDApIHtcbiAgICAgICAgICBhY3Rpb24gPSBBQ1RJT05fU09VVEhfRUFTVDtcbiAgICAgICAgICBoZWlnaHQgPSAtaGVpZ2h0O1xuICAgICAgICAgIHdpZHRoID0gLXdpZHRoO1xuICAgICAgICAgIHRvcCAtPSBoZWlnaHQ7XG4gICAgICAgICAgbGVmdCAtPSB3aWR0aDtcbiAgICAgICAgfSBlbHNlIGlmICh3aWR0aCA8IDApIHtcbiAgICAgICAgICBhY3Rpb24gPSBBQ1RJT05fTk9SVEhfRUFTVDtcbiAgICAgICAgICB3aWR0aCA9IC13aWR0aDtcbiAgICAgICAgICBsZWZ0IC09IHdpZHRoO1xuICAgICAgICB9IGVsc2UgaWYgKGhlaWdodCA8IDApIHtcbiAgICAgICAgICBhY3Rpb24gPSBBQ1RJT05fU09VVEhfV0VTVDtcbiAgICAgICAgICBoZWlnaHQgPSAtaGVpZ2h0O1xuICAgICAgICAgIHRvcCAtPSBoZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBBQ1RJT05fU09VVEhfV0VTVDpcbiAgICAgICAgaWYgKGFzcGVjdFJhdGlvKSB7XG4gICAgICAgICAgaWYgKHJhbmdlLnggPD0gMCAmJiAobGVmdCA8PSBtaW5MZWZ0IHx8IGJvdHRvbSA+PSBtYXhIZWlnaHQpKSB7XG4gICAgICAgICAgICByZW5kZXJhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjaGVjayhBQ1RJT05fV0VTVCk7XG4gICAgICAgICAgd2lkdGggLT0gcmFuZ2UueDtcbiAgICAgICAgICBsZWZ0ICs9IHJhbmdlLng7XG4gICAgICAgICAgaGVpZ2h0ID0gd2lkdGggLyBhc3BlY3RSYXRpbztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjaGVjayhBQ1RJT05fU09VVEgpO1xuICAgICAgICAgIGNoZWNrKEFDVElPTl9XRVNUKTtcblxuICAgICAgICAgIGlmIChyYW5nZS54IDw9IDApIHtcbiAgICAgICAgICAgIGlmIChsZWZ0ID4gbWluTGVmdCkge1xuICAgICAgICAgICAgICB3aWR0aCAtPSByYW5nZS54O1xuICAgICAgICAgICAgICBsZWZ0ICs9IHJhbmdlLng7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJhbmdlLnkgPj0gMCAmJiBib3R0b20gPj0gbWF4SGVpZ2h0KSB7XG4gICAgICAgICAgICAgIHJlbmRlcmFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2lkdGggLT0gcmFuZ2UueDtcbiAgICAgICAgICAgIGxlZnQgKz0gcmFuZ2UueDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocmFuZ2UueSA+PSAwKSB7XG4gICAgICAgICAgICBpZiAoYm90dG9tIDwgbWF4SGVpZ2h0KSB7XG4gICAgICAgICAgICAgIGhlaWdodCArPSByYW5nZS55O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBoZWlnaHQgKz0gcmFuZ2UueTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAod2lkdGggPCAwICYmIGhlaWdodCA8IDApIHtcbiAgICAgICAgICBhY3Rpb24gPSBBQ1RJT05fTk9SVEhfRUFTVDtcbiAgICAgICAgICBoZWlnaHQgPSAtaGVpZ2h0O1xuICAgICAgICAgIHdpZHRoID0gLXdpZHRoO1xuICAgICAgICAgIHRvcCAtPSBoZWlnaHQ7XG4gICAgICAgICAgbGVmdCAtPSB3aWR0aDtcbiAgICAgICAgfSBlbHNlIGlmICh3aWR0aCA8IDApIHtcbiAgICAgICAgICBhY3Rpb24gPSBBQ1RJT05fU09VVEhfRUFTVDtcbiAgICAgICAgICB3aWR0aCA9IC13aWR0aDtcbiAgICAgICAgICBsZWZ0IC09IHdpZHRoO1xuICAgICAgICB9IGVsc2UgaWYgKGhlaWdodCA8IDApIHtcbiAgICAgICAgICBhY3Rpb24gPSBBQ1RJT05fTk9SVEhfV0VTVDtcbiAgICAgICAgICBoZWlnaHQgPSAtaGVpZ2h0O1xuICAgICAgICAgIHRvcCAtPSBoZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBBQ1RJT05fU09VVEhfRUFTVDpcbiAgICAgICAgaWYgKGFzcGVjdFJhdGlvKSB7XG4gICAgICAgICAgaWYgKHJhbmdlLnggPj0gMCAmJiAocmlnaHQgPj0gbWF4V2lkdGggfHwgYm90dG9tID49IG1heEhlaWdodCkpIHtcbiAgICAgICAgICAgIHJlbmRlcmFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNoZWNrKEFDVElPTl9FQVNUKTtcbiAgICAgICAgICB3aWR0aCArPSByYW5nZS54O1xuICAgICAgICAgIGhlaWdodCA9IHdpZHRoIC8gYXNwZWN0UmF0aW87XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2hlY2soQUNUSU9OX1NPVVRIKTtcbiAgICAgICAgICBjaGVjayhBQ1RJT05fRUFTVCk7XG5cbiAgICAgICAgICBpZiAocmFuZ2UueCA+PSAwKSB7XG4gICAgICAgICAgICBpZiAocmlnaHQgPCBtYXhXaWR0aCkge1xuICAgICAgICAgICAgICB3aWR0aCArPSByYW5nZS54O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyYW5nZS55ID49IDAgJiYgYm90dG9tID49IG1heEhlaWdodCkge1xuICAgICAgICAgICAgICByZW5kZXJhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdpZHRoICs9IHJhbmdlLng7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHJhbmdlLnkgPj0gMCkge1xuICAgICAgICAgICAgaWYgKGJvdHRvbSA8IG1heEhlaWdodCkge1xuICAgICAgICAgICAgICBoZWlnaHQgKz0gcmFuZ2UueTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaGVpZ2h0ICs9IHJhbmdlLnk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHdpZHRoIDwgMCAmJiBoZWlnaHQgPCAwKSB7XG4gICAgICAgICAgYWN0aW9uID0gQUNUSU9OX05PUlRIX1dFU1Q7XG4gICAgICAgICAgaGVpZ2h0ID0gLWhlaWdodDtcbiAgICAgICAgICB3aWR0aCA9IC13aWR0aDtcbiAgICAgICAgICB0b3AgLT0gaGVpZ2h0O1xuICAgICAgICAgIGxlZnQgLT0gd2lkdGg7XG4gICAgICAgIH0gZWxzZSBpZiAod2lkdGggPCAwKSB7XG4gICAgICAgICAgYWN0aW9uID0gQUNUSU9OX1NPVVRIX1dFU1Q7XG4gICAgICAgICAgd2lkdGggPSAtd2lkdGg7XG4gICAgICAgICAgbGVmdCAtPSB3aWR0aDtcbiAgICAgICAgfSBlbHNlIGlmIChoZWlnaHQgPCAwKSB7XG4gICAgICAgICAgYWN0aW9uID0gQUNUSU9OX05PUlRIX0VBU1Q7XG4gICAgICAgICAgaGVpZ2h0ID0gLWhlaWdodDtcbiAgICAgICAgICB0b3AgLT0gaGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8vIE1vdmUgY2FudmFzXG4gICAgICBjYXNlIEFDVElPTl9NT1ZFOlxuICAgICAgICB0aGlzLm1vdmUocmFuZ2UueCwgcmFuZ2UueSk7XG4gICAgICAgIHJlbmRlcmFibGUgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8vIFpvb20gY2FudmFzXG4gICAgICBjYXNlIEFDVElPTl9aT09NOlxuICAgICAgICB0aGlzLnpvb20oZ2V0TWF4Wm9vbVJhdGlvKHBvaW50ZXJzKSwgZXZlbnQpO1xuICAgICAgICByZW5kZXJhYmxlID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvLyBDcmVhdGUgY3JvcCBib3hcbiAgICAgIGNhc2UgQUNUSU9OX0NST1A6XG4gICAgICAgIGlmICghcmFuZ2UueCB8fCAhcmFuZ2UueSkge1xuICAgICAgICAgIHJlbmRlcmFibGUgPSBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIG9mZnNldCA9IGdldE9mZnNldCh0aGlzLmNyb3BwZXIpO1xuICAgICAgICBsZWZ0ID0gcG9pbnRlci5zdGFydFggLSBvZmZzZXQubGVmdDtcbiAgICAgICAgdG9wID0gcG9pbnRlci5zdGFydFkgLSBvZmZzZXQudG9wO1xuICAgICAgICB3aWR0aCA9IGNyb3BCb3hEYXRhLm1pbldpZHRoO1xuICAgICAgICBoZWlnaHQgPSBjcm9wQm94RGF0YS5taW5IZWlnaHQ7XG5cbiAgICAgICAgaWYgKHJhbmdlLnggPiAwKSB7XG4gICAgICAgICAgYWN0aW9uID0gcmFuZ2UueSA+IDAgPyBBQ1RJT05fU09VVEhfRUFTVCA6IEFDVElPTl9OT1JUSF9FQVNUO1xuICAgICAgICB9IGVsc2UgaWYgKHJhbmdlLnggPCAwKSB7XG4gICAgICAgICAgbGVmdCAtPSB3aWR0aDtcbiAgICAgICAgICBhY3Rpb24gPSByYW5nZS55ID4gMCA/IEFDVElPTl9TT1VUSF9XRVNUIDogQUNUSU9OX05PUlRIX1dFU1Q7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmFuZ2UueSA8IDApIHtcbiAgICAgICAgICB0b3AgLT0gaGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2hvdyB0aGUgY3JvcCBib3ggaWYgaXMgaGlkZGVuXG4gICAgICAgIGlmICghdGhpcy5jcm9wcGVkKSB7XG4gICAgICAgICAgcmVtb3ZlQ2xhc3ModGhpcy5jcm9wQm94LCBDTEFTU19ISURERU4pO1xuICAgICAgICAgIHRoaXMuY3JvcHBlZCA9IHRydWU7XG5cbiAgICAgICAgICBpZiAodGhpcy5saW1pdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmxpbWl0Q3JvcEJveCh0cnVlLCB0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICB9XG5cbiAgICBpZiAocmVuZGVyYWJsZSkge1xuICAgICAgY3JvcEJveERhdGEud2lkdGggPSB3aWR0aDtcbiAgICAgIGNyb3BCb3hEYXRhLmhlaWdodCA9IGhlaWdodDtcbiAgICAgIGNyb3BCb3hEYXRhLmxlZnQgPSBsZWZ0O1xuICAgICAgY3JvcEJveERhdGEudG9wID0gdG9wO1xuICAgICAgdGhpcy5hY3Rpb24gPSBhY3Rpb247XG4gICAgICB0aGlzLnJlbmRlckNyb3BCb3goKTtcbiAgICB9XG5cbiAgICAvLyBPdmVycmlkZVxuICAgIGZvckVhY2gocG9pbnRlcnMsIChwKSA9PiB7XG4gICAgICBwLnN0YXJ0WCA9IHAuZW5kWDtcbiAgICAgIHAuc3RhcnRZID0gcC5lbmRZO1xuICAgIH0pO1xuICB9LFxufTtcbiIsImV4cG9ydCBjb25zdCBJU19CUk9XU0VSID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCc7XG5leHBvcnQgY29uc3QgV0lORE9XID0gSVNfQlJPV1NFUiA/IHdpbmRvdyA6IHt9O1xuZXhwb3J0IGNvbnN0IElTX1RPVUNIX0RFVklDRSA9IElTX0JST1dTRVIgPyAnb250b3VjaHN0YXJ0JyBpbiBXSU5ET1cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IDogZmFsc2U7XG5leHBvcnQgY29uc3QgSEFTX1BPSU5URVJfRVZFTlQgPSBJU19CUk9XU0VSID8gJ1BvaW50ZXJFdmVudCcgaW4gV0lORE9XIDogZmFsc2U7XG5leHBvcnQgY29uc3QgTkFNRVNQQUNFID0gJ2Nyb3BwZXInO1xuXG4vLyBBY3Rpb25zXG5leHBvcnQgY29uc3QgQUNUSU9OX0FMTCA9ICdhbGwnO1xuZXhwb3J0IGNvbnN0IEFDVElPTl9DUk9QID0gJ2Nyb3AnO1xuZXhwb3J0IGNvbnN0IEFDVElPTl9NT1ZFID0gJ21vdmUnO1xuZXhwb3J0IGNvbnN0IEFDVElPTl9aT09NID0gJ3pvb20nO1xuZXhwb3J0IGNvbnN0IEFDVElPTl9FQVNUID0gJ2UnO1xuZXhwb3J0IGNvbnN0IEFDVElPTl9XRVNUID0gJ3cnO1xuZXhwb3J0IGNvbnN0IEFDVElPTl9TT1VUSCA9ICdzJztcbmV4cG9ydCBjb25zdCBBQ1RJT05fTk9SVEggPSAnbic7XG5leHBvcnQgY29uc3QgQUNUSU9OX05PUlRIX0VBU1QgPSAnbmUnO1xuZXhwb3J0IGNvbnN0IEFDVElPTl9OT1JUSF9XRVNUID0gJ253JztcbmV4cG9ydCBjb25zdCBBQ1RJT05fU09VVEhfRUFTVCA9ICdzZSc7XG5leHBvcnQgY29uc3QgQUNUSU9OX1NPVVRIX1dFU1QgPSAnc3cnO1xuXG4vLyBDbGFzc2VzXG5leHBvcnQgY29uc3QgQ0xBU1NfQ1JPUCA9IGAke05BTUVTUEFDRX0tY3JvcGA7XG5leHBvcnQgY29uc3QgQ0xBU1NfRElTQUJMRUQgPSBgJHtOQU1FU1BBQ0V9LWRpc2FibGVkYDtcbmV4cG9ydCBjb25zdCBDTEFTU19ISURERU4gPSBgJHtOQU1FU1BBQ0V9LWhpZGRlbmA7XG5leHBvcnQgY29uc3QgQ0xBU1NfSElERSA9IGAke05BTUVTUEFDRX0taGlkZWA7XG5leHBvcnQgY29uc3QgQ0xBU1NfSU5WSVNJQkxFID0gYCR7TkFNRVNQQUNFfS1pbnZpc2libGVgO1xuZXhwb3J0IGNvbnN0IENMQVNTX01PREFMID0gYCR7TkFNRVNQQUNFfS1tb2RhbGA7XG5leHBvcnQgY29uc3QgQ0xBU1NfTU9WRSA9IGAke05BTUVTUEFDRX0tbW92ZWA7XG5cbi8vIERhdGEga2V5c1xuZXhwb3J0IGNvbnN0IERBVEFfQUNUSU9OID0gYCR7TkFNRVNQQUNFfUFjdGlvbmA7XG5leHBvcnQgY29uc3QgREFUQV9QUkVWSUVXID0gYCR7TkFNRVNQQUNFfVByZXZpZXdgO1xuXG4vLyBEcmFnIG1vZGVzXG5leHBvcnQgY29uc3QgRFJBR19NT0RFX0NST1AgPSAnY3JvcCc7XG5leHBvcnQgY29uc3QgRFJBR19NT0RFX01PVkUgPSAnbW92ZSc7XG5leHBvcnQgY29uc3QgRFJBR19NT0RFX05PTkUgPSAnbm9uZSc7XG5cbi8vIEV2ZW50c1xuZXhwb3J0IGNvbnN0IEVWRU5UX0NST1AgPSAnY3JvcCc7XG5leHBvcnQgY29uc3QgRVZFTlRfQ1JPUF9FTkQgPSAnY3JvcGVuZCc7XG5leHBvcnQgY29uc3QgRVZFTlRfQ1JPUF9NT1ZFID0gJ2Nyb3Btb3ZlJztcbmV4cG9ydCBjb25zdCBFVkVOVF9DUk9QX1NUQVJUID0gJ2Nyb3BzdGFydCc7XG5leHBvcnQgY29uc3QgRVZFTlRfREJMQ0xJQ0sgPSAnZGJsY2xpY2snO1xuZXhwb3J0IGNvbnN0IEVWRU5UX1RPVUNIX1NUQVJUID0gSVNfVE9VQ0hfREVWSUNFID8gJ3RvdWNoc3RhcnQnIDogJ21vdXNlZG93bic7XG5leHBvcnQgY29uc3QgRVZFTlRfVE9VQ0hfTU9WRSA9IElTX1RPVUNIX0RFVklDRSA/ICd0b3VjaG1vdmUnIDogJ21vdXNlbW92ZSc7XG5leHBvcnQgY29uc3QgRVZFTlRfVE9VQ0hfRU5EID0gSVNfVE9VQ0hfREVWSUNFID8gJ3RvdWNoZW5kIHRvdWNoY2FuY2VsJyA6ICdtb3VzZXVwJztcbmV4cG9ydCBjb25zdCBFVkVOVF9QT0lOVEVSX0RPV04gPSBIQVNfUE9JTlRFUl9FVkVOVCA/ICdwb2ludGVyZG93bicgOiBFVkVOVF9UT1VDSF9TVEFSVDtcbmV4cG9ydCBjb25zdCBFVkVOVF9QT0lOVEVSX01PVkUgPSBIQVNfUE9JTlRFUl9FVkVOVCA/ICdwb2ludGVybW92ZScgOiBFVkVOVF9UT1VDSF9NT1ZFO1xuZXhwb3J0IGNvbnN0IEVWRU5UX1BPSU5URVJfVVAgPSBIQVNfUE9JTlRFUl9FVkVOVCA/ICdwb2ludGVydXAgcG9pbnRlcmNhbmNlbCcgOiBFVkVOVF9UT1VDSF9FTkQ7XG5leHBvcnQgY29uc3QgRVZFTlRfUkVBRFkgPSAncmVhZHknO1xuZXhwb3J0IGNvbnN0IEVWRU5UX1JFU0laRSA9ICdyZXNpemUnO1xuZXhwb3J0IGNvbnN0IEVWRU5UX1dIRUVMID0gJ3doZWVsJztcbmV4cG9ydCBjb25zdCBFVkVOVF9aT09NID0gJ3pvb20nO1xuXG4vLyBNaW1lIHR5cGVzXG5leHBvcnQgY29uc3QgTUlNRV9UWVBFX0pQRUcgPSAnaW1hZ2UvanBlZyc7XG5cbi8vIFJlZ0V4cHNcbmV4cG9ydCBjb25zdCBSRUdFWFBfQUNUSU9OUyA9IC9eZXx3fHN8bnxzZXxzd3xuZXxud3xhbGx8Y3JvcHxtb3ZlfHpvb20kLztcbmV4cG9ydCBjb25zdCBSRUdFWFBfREFUQV9VUkxfSlBFRyA9IC9eZGF0YTppbWFnZVxcL2pwZWc7YmFzZTY0LC87XG5leHBvcnQgY29uc3QgUkVHRVhQX1RBR19OQU1FID0gL15pbWd8Y2FudmFzJC9pO1xuXG4vLyBNaXNjXG4vLyBJbnNwaXJlZCBieSB0aGUgZGVmYXVsdCB3aWR0aCBhbmQgaGVpZ2h0IG9mIGEgY2FudmFzIGVsZW1lbnQuXG5leHBvcnQgY29uc3QgTUlOX0NPTlRBSU5FUl9XSURUSCA9IDIwMDtcbmV4cG9ydCBjb25zdCBNSU5fQ09OVEFJTkVSX0hFSUdIVCA9IDEwMDtcbiIsImltcG9ydCBERUZBVUxUUyBmcm9tICcuL2RlZmF1bHRzJztcbmltcG9ydCBURU1QTEFURSBmcm9tICcuL3RlbXBsYXRlJztcbmltcG9ydCByZW5kZXIgZnJvbSAnLi9yZW5kZXInO1xuaW1wb3J0IHByZXZpZXcgZnJvbSAnLi9wcmV2aWV3JztcbmltcG9ydCBldmVudHMgZnJvbSAnLi9ldmVudHMnO1xuaW1wb3J0IGhhbmRsZXJzIGZyb20gJy4vaGFuZGxlcnMnO1xuaW1wb3J0IGNoYW5nZSBmcm9tICcuL2NoYW5nZSc7XG5pbXBvcnQgbWV0aG9kcyBmcm9tICcuL21ldGhvZHMnO1xuaW1wb3J0IHtcbiAgQUNUSU9OX0FMTCxcbiAgQ0xBU1NfSElEREVOLFxuICBDTEFTU19ISURFLFxuICBDTEFTU19JTlZJU0lCTEUsXG4gIENMQVNTX01PVkUsXG4gIERBVEFfQUNUSU9OLFxuICBFVkVOVF9SRUFEWSxcbiAgTUlNRV9UWVBFX0pQRUcsXG4gIE5BTUVTUEFDRSxcbiAgUkVHRVhQX0RBVEFfVVJMX0pQRUcsXG4gIFJFR0VYUF9UQUdfTkFNRSxcbiAgV0lORE9XLFxufSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQge1xuICBhZGRDbGFzcyxcbiAgYWRkTGlzdGVuZXIsXG4gIGFkZFRpbWVzdGFtcCxcbiAgYXJyYXlCdWZmZXJUb0RhdGFVUkwsXG4gIGFzc2lnbixcbiAgZGF0YVVSTFRvQXJyYXlCdWZmZXIsXG4gIGRpc3BhdGNoRXZlbnQsXG4gIGlzQ3Jvc3NPcmlnaW5VUkwsXG4gIGlzRnVuY3Rpb24sXG4gIGlzUGxhaW5PYmplY3QsXG4gIHBhcnNlT3JpZW50YXRpb24sXG4gIHJlbW92ZUNsYXNzLFxuICByZXNldEFuZEdldE9yaWVudGF0aW9uLFxuICBzZXREYXRhLFxufSBmcm9tICcuL3V0aWxpdGllcyc7XG5cbmNvbnN0IEFub3RoZXJDcm9wcGVyID0gV0lORE9XLkNyb3BwZXI7XG5cbmNsYXNzIENyb3BwZXIge1xuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IENyb3BwZXIuXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCAtIFRoZSB0YXJnZXQgZWxlbWVudCBmb3IgY3JvcHBpbmcuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gLSBUaGUgY29uZmlndXJhdGlvbiBvcHRpb25zLlxuICAgKi9cbiAgY29uc3RydWN0b3IoZWxlbWVudCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgaWYgKCFlbGVtZW50IHx8ICFSRUdFWFBfVEFHX05BTUUudGVzdChlbGVtZW50LnRhZ05hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBmaXJzdCBhcmd1bWVudCBpcyByZXF1aXJlZCBhbmQgbXVzdCBiZSBhbiA8aW1nPiBvciA8Y2FudmFzPiBlbGVtZW50LicpO1xuICAgIH1cblxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5vcHRpb25zID0gYXNzaWduKHt9LCBERUZBVUxUUywgaXNQbGFpbk9iamVjdChvcHRpb25zKSAmJiBvcHRpb25zKTtcbiAgICB0aGlzLmNyb3BwZWQgPSBmYWxzZTtcbiAgICB0aGlzLmRpc2FibGVkID0gZmFsc2U7XG4gICAgdGhpcy5wb2ludGVycyA9IHt9O1xuICAgIHRoaXMucmVhZHkgPSBmYWxzZTtcbiAgICB0aGlzLnJlbG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMucmVwbGFjZWQgPSBmYWxzZTtcbiAgICB0aGlzLnNpemVkID0gZmFsc2U7XG4gICAgdGhpcy5zaXppbmcgPSBmYWxzZTtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgY29uc3QgeyBlbGVtZW50IH0gPSB0aGlzO1xuICAgIGNvbnN0IHRhZ05hbWUgPSBlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcbiAgICBsZXQgdXJsO1xuXG4gICAgaWYgKGVsZW1lbnRbTkFNRVNQQUNFXSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGVsZW1lbnRbTkFNRVNQQUNFXSA9IHRoaXM7XG5cbiAgICBpZiAodGFnTmFtZSA9PT0gJ2ltZycpIHtcbiAgICAgIHRoaXMuaXNJbWcgPSB0cnVlO1xuXG4gICAgICAvLyBlLmcuOiBcImltZy9waWN0dXJlLmpwZ1wiXG4gICAgICB1cmwgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnc3JjJykgfHwgJyc7XG4gICAgICB0aGlzLm9yaWdpbmFsVXJsID0gdXJsO1xuXG4gICAgICAvLyBTdG9wIHdoZW4gaXQncyBhIGJsYW5rIGltYWdlXG4gICAgICBpZiAoIXVybCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGUuZy46IFwiaHR0cDovL2V4YW1wbGUuY29tL2ltZy9waWN0dXJlLmpwZ1wiXG4gICAgICB1cmwgPSBlbGVtZW50LnNyYztcbiAgICB9IGVsc2UgaWYgKHRhZ05hbWUgPT09ICdjYW52YXMnICYmIHdpbmRvdy5IVE1MQ2FudmFzRWxlbWVudCkge1xuICAgICAgdXJsID0gZWxlbWVudC50b0RhdGFVUkwoKTtcbiAgICB9XG5cbiAgICB0aGlzLmxvYWQodXJsKTtcbiAgfVxuXG4gIGxvYWQodXJsKSB7XG4gICAgaWYgKCF1cmwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnVybCA9IHVybDtcbiAgICB0aGlzLmltYWdlRGF0YSA9IHt9O1xuXG4gICAgY29uc3QgeyBlbGVtZW50LCBvcHRpb25zIH0gPSB0aGlzO1xuXG4gICAgaWYgKCFvcHRpb25zLnJvdGF0YWJsZSAmJiAhb3B0aW9ucy5zY2FsYWJsZSkge1xuICAgICAgb3B0aW9ucy5jaGVja09yaWVudGF0aW9uID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gT25seSBJRTEwKyBzdXBwb3J0cyBUeXBlZCBBcnJheXNcbiAgICBpZiAoIW9wdGlvbnMuY2hlY2tPcmllbnRhdGlvbiB8fCAhd2luZG93LkFycmF5QnVmZmVyKSB7XG4gICAgICB0aGlzLmNsb25lKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gUmVhZCBBcnJheUJ1ZmZlciBmcm9tIERhdGEgVVJMIG9mIEpQRUcgaW1hZ2VzIGRpcmVjdGx5IGZvciBiZXR0ZXIgcGVyZm9ybWFuY2UuXG4gICAgaWYgKFJFR0VYUF9EQVRBX1VSTF9KUEVHLnRlc3QodXJsKSkge1xuICAgICAgdGhpcy5yZWFkKGRhdGFVUkxUb0FycmF5QnVmZmVyKHVybCkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIGNvbnN0IGNsb25lID0gdGhpcy5jbG9uZS5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5yZWxvYWRpbmcgPSB0cnVlO1xuICAgIHRoaXMueGhyID0geGhyO1xuXG4gICAgLy8gMS4gQ3Jvc3Mgb3JpZ2luIHJlcXVlc3RzIGFyZSBvbmx5IHN1cHBvcnRlZCBmb3IgcHJvdG9jb2wgc2NoZW1lczpcbiAgICAvLyBodHRwLCBodHRwcywgZGF0YSwgY2hyb21lLCBjaHJvbWUtZXh0ZW5zaW9uLlxuICAgIC8vIDIuIEFjY2VzcyB0byBYTUxIdHRwUmVxdWVzdCBmcm9tIGEgRGF0YSBVUkwgd2lsbCBiZSBibG9ja2VkIGJ5IENPUlMgcG9saWN5XG4gICAgLy8gaW4gc29tZSBicm93c2VycyBhcyBJRTExIGFuZCBTYWZhcmkuXG4gICAgeGhyLm9uYWJvcnQgPSBjbG9uZTtcbiAgICB4aHIub25lcnJvciA9IGNsb25lO1xuICAgIHhoci5vbnRpbWVvdXQgPSBjbG9uZTtcblxuICAgIHhoci5vbnByb2dyZXNzID0gKCkgPT4ge1xuICAgICAgaWYgKHhoci5nZXRSZXNwb25zZUhlYWRlcignY29udGVudC10eXBlJykgIT09IE1JTUVfVFlQRV9KUEVHKSB7XG4gICAgICAgIHhoci5hYm9ydCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB4aHIub25sb2FkID0gKCkgPT4ge1xuICAgICAgdGhpcy5yZWFkKHhoci5yZXNwb25zZSk7XG4gICAgfTtcblxuICAgIHhoci5vbmxvYWRlbmQgPSAoKSA9PiB7XG4gICAgICB0aGlzLnJlbG9hZGluZyA9IGZhbHNlO1xuICAgICAgdGhpcy54aHIgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBCdXN0IGNhY2hlIHdoZW4gdGhlcmUgaXMgYSBcImNyb3NzT3JpZ2luXCIgcHJvcGVydHkgdG8gYXZvaWQgYnJvd3NlciBjYWNoZSBlcnJvclxuICAgIGlmIChvcHRpb25zLmNoZWNrQ3Jvc3NPcmlnaW4gJiYgaXNDcm9zc09yaWdpblVSTCh1cmwpICYmIGVsZW1lbnQuY3Jvc3NPcmlnaW4pIHtcbiAgICAgIHVybCA9IGFkZFRpbWVzdGFtcCh1cmwpO1xuICAgIH1cblxuICAgIHhoci5vcGVuKCdHRVQnLCB1cmwpO1xuICAgIHhoci5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xuICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSBlbGVtZW50LmNyb3NzT3JpZ2luID09PSAndXNlLWNyZWRlbnRpYWxzJztcbiAgICB4aHIuc2VuZCgpO1xuICB9XG5cbiAgcmVhZChhcnJheUJ1ZmZlcikge1xuICAgIGNvbnN0IHsgb3B0aW9ucywgaW1hZ2VEYXRhIH0gPSB0aGlzO1xuXG4gICAgLy8gUmVzZXQgdGhlIG9yaWVudGF0aW9uIHZhbHVlIHRvIGl0cyBkZWZhdWx0IHZhbHVlIDFcbiAgICAvLyBhcyBzb21lIGlPUyBicm93c2VycyB3aWxsIHJlbmRlciBpbWFnZSB3aXRoIGl0cyBvcmllbnRhdGlvblxuICAgIGNvbnN0IG9yaWVudGF0aW9uID0gcmVzZXRBbmRHZXRPcmllbnRhdGlvbihhcnJheUJ1ZmZlcik7XG4gICAgbGV0IHJvdGF0ZSA9IDA7XG4gICAgbGV0IHNjYWxlWCA9IDE7XG4gICAgbGV0IHNjYWxlWSA9IDE7XG5cbiAgICBpZiAob3JpZW50YXRpb24gPiAxKSB7XG4gICAgICAvLyBHZW5lcmF0ZSBhIG5ldyBVUkwgd2hpY2ggaGFzIHRoZSBkZWZhdWx0IG9yaWVudGF0aW9uIHZhbHVlXG4gICAgICB0aGlzLnVybCA9IGFycmF5QnVmZmVyVG9EYXRhVVJMKGFycmF5QnVmZmVyLCBNSU1FX1RZUEVfSlBFRyk7XG4gICAgICAoeyByb3RhdGUsIHNjYWxlWCwgc2NhbGVZIH0gPSBwYXJzZU9yaWVudGF0aW9uKG9yaWVudGF0aW9uKSk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMucm90YXRhYmxlKSB7XG4gICAgICBpbWFnZURhdGEucm90YXRlID0gcm90YXRlO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnNjYWxhYmxlKSB7XG4gICAgICBpbWFnZURhdGEuc2NhbGVYID0gc2NhbGVYO1xuICAgICAgaW1hZ2VEYXRhLnNjYWxlWSA9IHNjYWxlWTtcbiAgICB9XG5cbiAgICB0aGlzLmNsb25lKCk7XG4gIH1cblxuICBjbG9uZSgpIHtcbiAgICBjb25zdCB7IGVsZW1lbnQsIHVybCB9ID0gdGhpcztcbiAgICBsZXQgY3Jvc3NPcmlnaW47XG4gICAgbGV0IGNyb3NzT3JpZ2luVXJsO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jaGVja0Nyb3NzT3JpZ2luICYmIGlzQ3Jvc3NPcmlnaW5VUkwodXJsKSkge1xuICAgICAgKHsgY3Jvc3NPcmlnaW4gfSA9IGVsZW1lbnQpO1xuXG4gICAgICBpZiAoY3Jvc3NPcmlnaW4pIHtcbiAgICAgICAgY3Jvc3NPcmlnaW5VcmwgPSB1cmw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjcm9zc09yaWdpbiA9ICdhbm9ueW1vdXMnO1xuXG4gICAgICAgIC8vIEJ1c3QgY2FjaGUgd2hlbiB0aGVyZSBpcyBub3QgYSBcImNyb3NzT3JpZ2luXCIgcHJvcGVydHlcbiAgICAgICAgY3Jvc3NPcmlnaW5VcmwgPSBhZGRUaW1lc3RhbXAodXJsKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmNyb3NzT3JpZ2luID0gY3Jvc3NPcmlnaW47XG4gICAgdGhpcy5jcm9zc09yaWdpblVybCA9IGNyb3NzT3JpZ2luVXJsO1xuXG4gICAgY29uc3QgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgIGlmIChjcm9zc09yaWdpbikge1xuICAgICAgaW1hZ2UuY3Jvc3NPcmlnaW4gPSBjcm9zc09yaWdpbjtcbiAgICB9XG5cbiAgICBpbWFnZS5zcmMgPSBjcm9zc09yaWdpblVybCB8fCB1cmw7XG4gICAgdGhpcy5pbWFnZSA9IGltYWdlO1xuICAgIGltYWdlLm9ubG9hZCA9IHRoaXMuc3RhcnQuYmluZCh0aGlzKTtcbiAgICBpbWFnZS5vbmVycm9yID0gdGhpcy5zdG9wLmJpbmQodGhpcyk7XG4gICAgYWRkQ2xhc3MoaW1hZ2UsIENMQVNTX0hJREUpO1xuICAgIGVsZW1lbnQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoaW1hZ2UsIGVsZW1lbnQubmV4dFNpYmxpbmcpO1xuICB9XG5cbiAgc3RhcnQoKSB7XG4gICAgY29uc3QgaW1hZ2UgPSB0aGlzLmlzSW1nID8gdGhpcy5lbGVtZW50IDogdGhpcy5pbWFnZTtcblxuICAgIGltYWdlLm9ubG9hZCA9IG51bGw7XG4gICAgaW1hZ2Uub25lcnJvciA9IG51bGw7XG4gICAgdGhpcy5zaXppbmcgPSB0cnVlO1xuXG4gICAgY29uc3QgSVNfU0FGQVJJID0gV0lORE9XLm5hdmlnYXRvciAmJiAvXig/Oi4oPyFjaHJvbWV8YW5kcm9pZCkpKnNhZmFyaS9pLnRlc3QoV0lORE9XLm5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIGNvbnN0IGRvbmUgPSAobmF0dXJhbFdpZHRoLCBuYXR1cmFsSGVpZ2h0KSA9PiB7XG4gICAgICBhc3NpZ24odGhpcy5pbWFnZURhdGEsIHtcbiAgICAgICAgbmF0dXJhbFdpZHRoLFxuICAgICAgICBuYXR1cmFsSGVpZ2h0LFxuICAgICAgICBhc3BlY3RSYXRpbzogbmF0dXJhbFdpZHRoIC8gbmF0dXJhbEhlaWdodCxcbiAgICAgIH0pO1xuICAgICAgdGhpcy5zaXppbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuc2l6ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5idWlsZCgpO1xuICAgIH07XG5cbiAgICAvLyBNb2Rlcm4gYnJvd3NlcnMgKGV4Y2VwdCBTYWZhcmkpXG4gICAgaWYgKGltYWdlLm5hdHVyYWxXaWR0aCAmJiAhSVNfU0FGQVJJKSB7XG4gICAgICBkb25lKGltYWdlLm5hdHVyYWxXaWR0aCwgaW1hZ2UubmF0dXJhbEhlaWdodCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc2l6aW5nSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgICB0aGlzLnNpemluZ0ltYWdlID0gc2l6aW5nSW1hZ2U7XG5cbiAgICBzaXppbmdJbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICBkb25lKHNpemluZ0ltYWdlLndpZHRoLCBzaXppbmdJbWFnZS5oZWlnaHQpO1xuXG4gICAgICBpZiAoIUlTX1NBRkFSSSkge1xuICAgICAgICBib2R5LnJlbW92ZUNoaWxkKHNpemluZ0ltYWdlKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc2l6aW5nSW1hZ2Uuc3JjID0gaW1hZ2Uuc3JjO1xuXG4gICAgLy8gaU9TIFNhZmFyaSB3aWxsIGNvbnZlcnQgdGhlIGltYWdlIGF1dG9tYXRpY2FsbHlcbiAgICAvLyB3aXRoIGl0cyBvcmllbnRhdGlvbiBvbmNlIGFwcGVuZCBpdCBpbnRvIERPTSAoIzI3OSlcbiAgICBpZiAoIUlTX1NBRkFSSSkge1xuICAgICAgc2l6aW5nSW1hZ2Uuc3R5bGUuY3NzVGV4dCA9IChcbiAgICAgICAgJ2xlZnQ6MDsnXG4gICAgICAgICsgJ21heC1oZWlnaHQ6bm9uZSFpbXBvcnRhbnQ7J1xuICAgICAgICArICdtYXgtd2lkdGg6bm9uZSFpbXBvcnRhbnQ7J1xuICAgICAgICArICdtaW4taGVpZ2h0OjAhaW1wb3J0YW50OydcbiAgICAgICAgKyAnbWluLXdpZHRoOjAhaW1wb3J0YW50OydcbiAgICAgICAgKyAnb3BhY2l0eTowOydcbiAgICAgICAgKyAncG9zaXRpb246YWJzb2x1dGU7J1xuICAgICAgICArICd0b3A6MDsnXG4gICAgICAgICsgJ3otaW5kZXg6LTE7J1xuICAgICAgKTtcbiAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoc2l6aW5nSW1hZ2UpO1xuICAgIH1cbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgY29uc3QgeyBpbWFnZSB9ID0gdGhpcztcblxuICAgIGltYWdlLm9ubG9hZCA9IG51bGw7XG4gICAgaW1hZ2Uub25lcnJvciA9IG51bGw7XG4gICAgaW1hZ2UucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpbWFnZSk7XG4gICAgdGhpcy5pbWFnZSA9IG51bGw7XG4gIH1cblxuICBidWlsZCgpIHtcbiAgICBpZiAoIXRoaXMuc2l6ZWQgfHwgdGhpcy5yZWFkeSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHsgZWxlbWVudCwgb3B0aW9ucywgaW1hZ2UgfSA9IHRoaXM7XG5cbiAgICAvLyBDcmVhdGUgY3JvcHBlciBlbGVtZW50c1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gVEVNUExBVEU7XG5cbiAgICBjb25zdCBjcm9wcGVyID0gdGVtcGxhdGUucXVlcnlTZWxlY3RvcihgLiR7TkFNRVNQQUNFfS1jb250YWluZXJgKTtcbiAgICBjb25zdCBjYW52YXMgPSBjcm9wcGVyLnF1ZXJ5U2VsZWN0b3IoYC4ke05BTUVTUEFDRX0tY2FudmFzYCk7XG4gICAgY29uc3QgZHJhZ0JveCA9IGNyb3BwZXIucXVlcnlTZWxlY3RvcihgLiR7TkFNRVNQQUNFfS1kcmFnLWJveGApO1xuICAgIGNvbnN0IGNyb3BCb3ggPSBjcm9wcGVyLnF1ZXJ5U2VsZWN0b3IoYC4ke05BTUVTUEFDRX0tY3JvcC1ib3hgKTtcbiAgICBjb25zdCBmYWNlID0gY3JvcEJveC5xdWVyeVNlbGVjdG9yKGAuJHtOQU1FU1BBQ0V9LWZhY2VgKTtcblxuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgIHRoaXMuY3JvcHBlciA9IGNyb3BwZXI7XG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gICAgdGhpcy5kcmFnQm94ID0gZHJhZ0JveDtcbiAgICB0aGlzLmNyb3BCb3ggPSBjcm9wQm94O1xuICAgIHRoaXMudmlld0JveCA9IGNyb3BwZXIucXVlcnlTZWxlY3RvcihgLiR7TkFNRVNQQUNFfS12aWV3LWJveGApO1xuICAgIHRoaXMuZmFjZSA9IGZhY2U7XG5cbiAgICBjYW52YXMuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xuXG4gICAgLy8gSGlkZSB0aGUgb3JpZ2luYWwgaW1hZ2VcbiAgICBhZGRDbGFzcyhlbGVtZW50LCBDTEFTU19ISURERU4pO1xuXG4gICAgLy8gSW5zZXJ0cyB0aGUgY3JvcHBlciBhZnRlciB0byB0aGUgY3VycmVudCBpbWFnZVxuICAgIGNvbnRhaW5lci5pbnNlcnRCZWZvcmUoY3JvcHBlciwgZWxlbWVudC5uZXh0U2libGluZyk7XG5cbiAgICAvLyBTaG93IHRoZSBpbWFnZSBpZiBpcyBoaWRkZW5cbiAgICBpZiAoIXRoaXMuaXNJbWcpIHtcbiAgICAgIHJlbW92ZUNsYXNzKGltYWdlLCBDTEFTU19ISURFKTtcbiAgICB9XG5cbiAgICB0aGlzLmluaXRQcmV2aWV3KCk7XG4gICAgdGhpcy5iaW5kKCk7XG5cbiAgICBvcHRpb25zLmluaXRpYWxBc3BlY3RSYXRpbyA9IE1hdGgubWF4KDAsIG9wdGlvbnMuaW5pdGlhbEFzcGVjdFJhdGlvKSB8fCBOYU47XG4gICAgb3B0aW9ucy5hc3BlY3RSYXRpbyA9IE1hdGgubWF4KDAsIG9wdGlvbnMuYXNwZWN0UmF0aW8pIHx8IE5hTjtcbiAgICBvcHRpb25zLnZpZXdNb2RlID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMywgTWF0aC5yb3VuZChvcHRpb25zLnZpZXdNb2RlKSkpIHx8IDA7XG5cbiAgICBhZGRDbGFzcyhjcm9wQm94LCBDTEFTU19ISURERU4pO1xuXG4gICAgaWYgKCFvcHRpb25zLmd1aWRlcykge1xuICAgICAgYWRkQ2xhc3MoY3JvcEJveC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke05BTUVTUEFDRX0tZGFzaGVkYCksIENMQVNTX0hJRERFTik7XG4gICAgfVxuXG4gICAgaWYgKCFvcHRpb25zLmNlbnRlcikge1xuICAgICAgYWRkQ2xhc3MoY3JvcEJveC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke05BTUVTUEFDRX0tY2VudGVyYCksIENMQVNTX0hJRERFTik7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuYmFja2dyb3VuZCkge1xuICAgICAgYWRkQ2xhc3MoY3JvcHBlciwgYCR7TkFNRVNQQUNFfS1iZ2ApO1xuICAgIH1cblxuICAgIGlmICghb3B0aW9ucy5oaWdobGlnaHQpIHtcbiAgICAgIGFkZENsYXNzKGZhY2UsIENMQVNTX0lOVklTSUJMRSk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuY3JvcEJveE1vdmFibGUpIHtcbiAgICAgIGFkZENsYXNzKGZhY2UsIENMQVNTX01PVkUpO1xuICAgICAgc2V0RGF0YShmYWNlLCBEQVRBX0FDVElPTiwgQUNUSU9OX0FMTCk7XG4gICAgfVxuXG4gICAgaWYgKCFvcHRpb25zLmNyb3BCb3hSZXNpemFibGUpIHtcbiAgICAgIGFkZENsYXNzKGNyb3BCb3guZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHtOQU1FU1BBQ0V9LWxpbmVgKSwgQ0xBU1NfSElEREVOKTtcbiAgICAgIGFkZENsYXNzKGNyb3BCb3guZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHtOQU1FU1BBQ0V9LXBvaW50YCksIENMQVNTX0hJRERFTik7XG4gICAgfVxuXG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgICB0aGlzLnJlYWR5ID0gdHJ1ZTtcbiAgICB0aGlzLnNldERyYWdNb2RlKG9wdGlvbnMuZHJhZ01vZGUpO1xuXG4gICAgaWYgKG9wdGlvbnMuYXV0b0Nyb3ApIHtcbiAgICAgIHRoaXMuY3JvcCgpO1xuICAgIH1cblxuICAgIHRoaXMuc2V0RGF0YShvcHRpb25zLmRhdGEpO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24ob3B0aW9ucy5yZWFkeSkpIHtcbiAgICAgIGFkZExpc3RlbmVyKGVsZW1lbnQsIEVWRU5UX1JFQURZLCBvcHRpb25zLnJlYWR5LCB7XG4gICAgICAgIG9uY2U6IHRydWUsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBkaXNwYXRjaEV2ZW50KGVsZW1lbnQsIEVWRU5UX1JFQURZKTtcbiAgfVxuXG4gIHVuYnVpbGQoKSB7XG4gICAgaWYgKCF0aGlzLnJlYWR5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5yZWFkeSA9IGZhbHNlO1xuICAgIHRoaXMudW5iaW5kKCk7XG4gICAgdGhpcy5yZXNldFByZXZpZXcoKTtcbiAgICB0aGlzLmNyb3BwZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmNyb3BwZXIpO1xuICAgIHJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudCwgQ0xBU1NfSElEREVOKTtcbiAgfVxuXG4gIHVuY3JlYXRlKCkge1xuICAgIGlmICh0aGlzLnJlYWR5KSB7XG4gICAgICB0aGlzLnVuYnVpbGQoKTtcbiAgICAgIHRoaXMucmVhZHkgPSBmYWxzZTtcbiAgICAgIHRoaXMuY3JvcHBlZCA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zaXppbmcpIHtcbiAgICAgIHRoaXMuc2l6aW5nSW1hZ2Uub25sb2FkID0gbnVsbDtcbiAgICAgIHRoaXMuc2l6aW5nID0gZmFsc2U7XG4gICAgICB0aGlzLnNpemVkID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmICh0aGlzLnJlbG9hZGluZykge1xuICAgICAgdGhpcy54aHIub25hYm9ydCA9IG51bGw7XG4gICAgICB0aGlzLnhoci5hYm9ydCgpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pbWFnZSkge1xuICAgICAgdGhpcy5zdG9wKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbm8gY29uZmxpY3QgY3JvcHBlciBjbGFzcy5cbiAgICogQHJldHVybnMge0Nyb3BwZXJ9IFRoZSBjcm9wcGVyIGNsYXNzLlxuICAgKi9cbiAgc3RhdGljIG5vQ29uZmxpY3QoKSB7XG4gICAgd2luZG93LkNyb3BwZXIgPSBBbm90aGVyQ3JvcHBlcjtcbiAgICByZXR1cm4gQ3JvcHBlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGFuZ2UgdGhlIGRlZmF1bHQgb3B0aW9ucy5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgbmV3IGRlZmF1bHQgb3B0aW9ucy5cbiAgICovXG4gIHN0YXRpYyBzZXREZWZhdWx0cyhvcHRpb25zKSB7XG4gICAgYXNzaWduKERFRkFVTFRTLCBpc1BsYWluT2JqZWN0KG9wdGlvbnMpICYmIG9wdGlvbnMpO1xuICB9XG59XG5cbmFzc2lnbihDcm9wcGVyLnByb3RvdHlwZSwgcmVuZGVyLCBwcmV2aWV3LCBldmVudHMsIGhhbmRsZXJzLCBjaGFuZ2UsIG1ldGhvZHMpO1xuXG5leHBvcnQgZGVmYXVsdCBDcm9wcGVyO1xuIiwiaW1wb3J0IHsgRFJBR19NT0RFX0NST1AgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLy8gRGVmaW5lIHRoZSB2aWV3IG1vZGUgb2YgdGhlIGNyb3BwZXJcbiAgdmlld01vZGU6IDAsIC8vIDAsIDEsIDIsIDNcblxuICAvLyBEZWZpbmUgdGhlIGRyYWdnaW5nIG1vZGUgb2YgdGhlIGNyb3BwZXJcbiAgZHJhZ01vZGU6IERSQUdfTU9ERV9DUk9QLCAvLyAnY3JvcCcsICdtb3ZlJyBvciAnbm9uZSdcblxuICAvLyBEZWZpbmUgdGhlIGluaXRpYWwgYXNwZWN0IHJhdGlvIG9mIHRoZSBjcm9wIGJveFxuICBpbml0aWFsQXNwZWN0UmF0aW86IE5hTixcblxuICAvLyBEZWZpbmUgdGhlIGFzcGVjdCByYXRpbyBvZiB0aGUgY3JvcCBib3hcbiAgYXNwZWN0UmF0aW86IE5hTixcblxuICAvLyBBbiBvYmplY3Qgd2l0aCB0aGUgcHJldmlvdXMgY3JvcHBpbmcgcmVzdWx0IGRhdGFcbiAgZGF0YTogbnVsbCxcblxuICAvLyBBIHNlbGVjdG9yIGZvciBhZGRpbmcgZXh0cmEgY29udGFpbmVycyB0byBwcmV2aWV3XG4gIHByZXZpZXc6ICcnLFxuXG4gIC8vIFJlLXJlbmRlciB0aGUgY3JvcHBlciB3aGVuIHJlc2l6ZSB0aGUgd2luZG93XG4gIHJlc3BvbnNpdmU6IHRydWUsXG5cbiAgLy8gUmVzdG9yZSB0aGUgY3JvcHBlZCBhcmVhIGFmdGVyIHJlc2l6ZSB0aGUgd2luZG93XG4gIHJlc3RvcmU6IHRydWUsXG5cbiAgLy8gQ2hlY2sgaWYgdGhlIGN1cnJlbnQgaW1hZ2UgaXMgYSBjcm9zcy1vcmlnaW4gaW1hZ2VcbiAgY2hlY2tDcm9zc09yaWdpbjogdHJ1ZSxcblxuICAvLyBDaGVjayB0aGUgY3VycmVudCBpbWFnZSdzIEV4aWYgT3JpZW50YXRpb24gaW5mb3JtYXRpb25cbiAgY2hlY2tPcmllbnRhdGlvbjogdHJ1ZSxcblxuICAvLyBTaG93IHRoZSBibGFjayBtb2RhbFxuICBtb2RhbDogdHJ1ZSxcblxuICAvLyBTaG93IHRoZSBkYXNoZWQgbGluZXMgZm9yIGd1aWRpbmdcbiAgZ3VpZGVzOiB0cnVlLFxuXG4gIC8vIFNob3cgdGhlIGNlbnRlciBpbmRpY2F0b3IgZm9yIGd1aWRpbmdcbiAgY2VudGVyOiB0cnVlLFxuXG4gIC8vIFNob3cgdGhlIHdoaXRlIG1vZGFsIHRvIGhpZ2hsaWdodCB0aGUgY3JvcCBib3hcbiAgaGlnaGxpZ2h0OiB0cnVlLFxuXG4gIC8vIFNob3cgdGhlIGdyaWQgYmFja2dyb3VuZFxuICBiYWNrZ3JvdW5kOiB0cnVlLFxuXG4gIC8vIEVuYWJsZSB0byBjcm9wIHRoZSBpbWFnZSBhdXRvbWF0aWNhbGx5IHdoZW4gaW5pdGlhbGl6ZVxuICBhdXRvQ3JvcDogdHJ1ZSxcblxuICAvLyBEZWZpbmUgdGhlIHBlcmNlbnRhZ2Ugb2YgYXV0b21hdGljIGNyb3BwaW5nIGFyZWEgd2hlbiBpbml0aWFsaXplc1xuICBhdXRvQ3JvcEFyZWE6IDAuOCxcblxuICAvLyBFbmFibGUgdG8gbW92ZSB0aGUgaW1hZ2VcbiAgbW92YWJsZTogdHJ1ZSxcblxuICAvLyBFbmFibGUgdG8gcm90YXRlIHRoZSBpbWFnZVxuICByb3RhdGFibGU6IHRydWUsXG5cbiAgLy8gRW5hYmxlIHRvIHNjYWxlIHRoZSBpbWFnZVxuICBzY2FsYWJsZTogdHJ1ZSxcblxuICAvLyBFbmFibGUgdG8gem9vbSB0aGUgaW1hZ2VcbiAgem9vbWFibGU6IHRydWUsXG5cbiAgLy8gRW5hYmxlIHRvIHpvb20gdGhlIGltYWdlIGJ5IGRyYWdnaW5nIHRvdWNoXG4gIHpvb21PblRvdWNoOiB0cnVlLFxuXG4gIC8vIEVuYWJsZSB0byB6b29tIHRoZSBpbWFnZSBieSB3aGVlbGluZyBtb3VzZVxuICB6b29tT25XaGVlbDogdHJ1ZSxcblxuICAvLyBEZWZpbmUgem9vbSByYXRpbyB3aGVuIHpvb20gdGhlIGltYWdlIGJ5IHdoZWVsaW5nIG1vdXNlXG4gIHdoZWVsWm9vbVJhdGlvOiAwLjEsXG5cbiAgLy8gRW5hYmxlIHRvIG1vdmUgdGhlIGNyb3AgYm94XG4gIGNyb3BCb3hNb3ZhYmxlOiB0cnVlLFxuXG4gIC8vIEVuYWJsZSB0byByZXNpemUgdGhlIGNyb3AgYm94XG4gIGNyb3BCb3hSZXNpemFibGU6IHRydWUsXG5cbiAgLy8gVG9nZ2xlIGRyYWcgbW9kZSBiZXR3ZWVuIFwiY3JvcFwiIGFuZCBcIm1vdmVcIiB3aGVuIGNsaWNrIHR3aWNlIG9uIHRoZSBjcm9wcGVyXG4gIHRvZ2dsZURyYWdNb2RlT25EYmxjbGljazogdHJ1ZSxcblxuICAvLyBTaXplIGxpbWl0YXRpb25cbiAgbWluQ2FudmFzV2lkdGg6IDAsXG4gIG1pbkNhbnZhc0hlaWdodDogMCxcbiAgbWluQ3JvcEJveFdpZHRoOiAwLFxuICBtaW5Dcm9wQm94SGVpZ2h0OiAwLFxuICBtaW5Db250YWluZXJXaWR0aDogMjAwLFxuICBtaW5Db250YWluZXJIZWlnaHQ6IDEwMCxcblxuICAvLyBTaG9ydGN1dHMgb2YgZXZlbnRzXG4gIHJlYWR5OiBudWxsLFxuICBjcm9wc3RhcnQ6IG51bGwsXG4gIGNyb3Btb3ZlOiBudWxsLFxuICBjcm9wZW5kOiBudWxsLFxuICBjcm9wOiBudWxsLFxuICB6b29tOiBudWxsLFxufTtcbiIsImltcG9ydCB7XG4gIEVWRU5UX0NST1AsXG4gIEVWRU5UX0NST1BfRU5ELFxuICBFVkVOVF9DUk9QX01PVkUsXG4gIEVWRU5UX0NST1BfU1RBUlQsXG4gIEVWRU5UX0RCTENMSUNLLFxuICBFVkVOVF9QT0lOVEVSX0RPV04sXG4gIEVWRU5UX1BPSU5URVJfTU9WRSxcbiAgRVZFTlRfUE9JTlRFUl9VUCxcbiAgRVZFTlRfUkVTSVpFLFxuICBFVkVOVF9XSEVFTCxcbiAgRVZFTlRfWk9PTSxcbn0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHtcbiAgYWRkTGlzdGVuZXIsXG4gIGlzRnVuY3Rpb24sXG4gIHJlbW92ZUxpc3RlbmVyLFxufSBmcm9tICcuL3V0aWxpdGllcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYmluZCgpIHtcbiAgICBjb25zdCB7IGVsZW1lbnQsIG9wdGlvbnMsIGNyb3BwZXIgfSA9IHRoaXM7XG5cbiAgICBpZiAoaXNGdW5jdGlvbihvcHRpb25zLmNyb3BzdGFydCkpIHtcbiAgICAgIGFkZExpc3RlbmVyKGVsZW1lbnQsIEVWRU5UX0NST1BfU1RBUlQsIG9wdGlvbnMuY3JvcHN0YXJ0KTtcbiAgICB9XG5cbiAgICBpZiAoaXNGdW5jdGlvbihvcHRpb25zLmNyb3Btb3ZlKSkge1xuICAgICAgYWRkTGlzdGVuZXIoZWxlbWVudCwgRVZFTlRfQ1JPUF9NT1ZFLCBvcHRpb25zLmNyb3Btb3ZlKTtcbiAgICB9XG5cbiAgICBpZiAoaXNGdW5jdGlvbihvcHRpb25zLmNyb3BlbmQpKSB7XG4gICAgICBhZGRMaXN0ZW5lcihlbGVtZW50LCBFVkVOVF9DUk9QX0VORCwgb3B0aW9ucy5jcm9wZW5kKTtcbiAgICB9XG5cbiAgICBpZiAoaXNGdW5jdGlvbihvcHRpb25zLmNyb3ApKSB7XG4gICAgICBhZGRMaXN0ZW5lcihlbGVtZW50LCBFVkVOVF9DUk9QLCBvcHRpb25zLmNyb3ApO1xuICAgIH1cblxuICAgIGlmIChpc0Z1bmN0aW9uKG9wdGlvbnMuem9vbSkpIHtcbiAgICAgIGFkZExpc3RlbmVyKGVsZW1lbnQsIEVWRU5UX1pPT00sIG9wdGlvbnMuem9vbSk7XG4gICAgfVxuXG4gICAgYWRkTGlzdGVuZXIoY3JvcHBlciwgRVZFTlRfUE9JTlRFUl9ET1dOLCAodGhpcy5vbkNyb3BTdGFydCA9IHRoaXMuY3JvcFN0YXJ0LmJpbmQodGhpcykpKTtcblxuICAgIGlmIChvcHRpb25zLnpvb21hYmxlICYmIG9wdGlvbnMuem9vbU9uV2hlZWwpIHtcbiAgICAgIGFkZExpc3RlbmVyKGNyb3BwZXIsIEVWRU5UX1dIRUVMLCAodGhpcy5vbldoZWVsID0gdGhpcy53aGVlbC5iaW5kKHRoaXMpKSwge1xuICAgICAgICBwYXNzaXZlOiBmYWxzZSxcbiAgICAgICAgY2FwdHVyZTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnRvZ2dsZURyYWdNb2RlT25EYmxjbGljaykge1xuICAgICAgYWRkTGlzdGVuZXIoY3JvcHBlciwgRVZFTlRfREJMQ0xJQ0ssICh0aGlzLm9uRGJsY2xpY2sgPSB0aGlzLmRibGNsaWNrLmJpbmQodGhpcykpKTtcbiAgICB9XG5cbiAgICBhZGRMaXN0ZW5lcihcbiAgICAgIGVsZW1lbnQub3duZXJEb2N1bWVudCxcbiAgICAgIEVWRU5UX1BPSU5URVJfTU9WRSxcbiAgICAgICh0aGlzLm9uQ3JvcE1vdmUgPSB0aGlzLmNyb3BNb3ZlLmJpbmQodGhpcykpLFxuICAgICk7XG4gICAgYWRkTGlzdGVuZXIoXG4gICAgICBlbGVtZW50Lm93bmVyRG9jdW1lbnQsXG4gICAgICBFVkVOVF9QT0lOVEVSX1VQLFxuICAgICAgKHRoaXMub25Dcm9wRW5kID0gdGhpcy5jcm9wRW5kLmJpbmQodGhpcykpLFxuICAgICk7XG5cbiAgICBpZiAob3B0aW9ucy5yZXNwb25zaXZlKSB7XG4gICAgICBhZGRMaXN0ZW5lcih3aW5kb3csIEVWRU5UX1JFU0laRSwgKHRoaXMub25SZXNpemUgPSB0aGlzLnJlc2l6ZS5iaW5kKHRoaXMpKSk7XG4gICAgfVxuICB9LFxuXG4gIHVuYmluZCgpIHtcbiAgICBjb25zdCB7IGVsZW1lbnQsIG9wdGlvbnMsIGNyb3BwZXIgfSA9IHRoaXM7XG5cbiAgICBpZiAoaXNGdW5jdGlvbihvcHRpb25zLmNyb3BzdGFydCkpIHtcbiAgICAgIHJlbW92ZUxpc3RlbmVyKGVsZW1lbnQsIEVWRU5UX0NST1BfU1RBUlQsIG9wdGlvbnMuY3JvcHN0YXJ0KTtcbiAgICB9XG5cbiAgICBpZiAoaXNGdW5jdGlvbihvcHRpb25zLmNyb3Btb3ZlKSkge1xuICAgICAgcmVtb3ZlTGlzdGVuZXIoZWxlbWVudCwgRVZFTlRfQ1JPUF9NT1ZFLCBvcHRpb25zLmNyb3Btb3ZlKTtcbiAgICB9XG5cbiAgICBpZiAoaXNGdW5jdGlvbihvcHRpb25zLmNyb3BlbmQpKSB7XG4gICAgICByZW1vdmVMaXN0ZW5lcihlbGVtZW50LCBFVkVOVF9DUk9QX0VORCwgb3B0aW9ucy5jcm9wZW5kKTtcbiAgICB9XG5cbiAgICBpZiAoaXNGdW5jdGlvbihvcHRpb25zLmNyb3ApKSB7XG4gICAgICByZW1vdmVMaXN0ZW5lcihlbGVtZW50LCBFVkVOVF9DUk9QLCBvcHRpb25zLmNyb3ApO1xuICAgIH1cblxuICAgIGlmIChpc0Z1bmN0aW9uKG9wdGlvbnMuem9vbSkpIHtcbiAgICAgIHJlbW92ZUxpc3RlbmVyKGVsZW1lbnQsIEVWRU5UX1pPT00sIG9wdGlvbnMuem9vbSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlTGlzdGVuZXIoY3JvcHBlciwgRVZFTlRfUE9JTlRFUl9ET1dOLCB0aGlzLm9uQ3JvcFN0YXJ0KTtcblxuICAgIGlmIChvcHRpb25zLnpvb21hYmxlICYmIG9wdGlvbnMuem9vbU9uV2hlZWwpIHtcbiAgICAgIHJlbW92ZUxpc3RlbmVyKGNyb3BwZXIsIEVWRU5UX1dIRUVMLCB0aGlzLm9uV2hlZWwsIHtcbiAgICAgICAgcGFzc2l2ZTogZmFsc2UsXG4gICAgICAgIGNhcHR1cmU6IHRydWUsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy50b2dnbGVEcmFnTW9kZU9uRGJsY2xpY2spIHtcbiAgICAgIHJlbW92ZUxpc3RlbmVyKGNyb3BwZXIsIEVWRU5UX0RCTENMSUNLLCB0aGlzLm9uRGJsY2xpY2spO1xuICAgIH1cblxuICAgIHJlbW92ZUxpc3RlbmVyKGVsZW1lbnQub3duZXJEb2N1bWVudCwgRVZFTlRfUE9JTlRFUl9NT1ZFLCB0aGlzLm9uQ3JvcE1vdmUpO1xuICAgIHJlbW92ZUxpc3RlbmVyKGVsZW1lbnQub3duZXJEb2N1bWVudCwgRVZFTlRfUE9JTlRFUl9VUCwgdGhpcy5vbkNyb3BFbmQpO1xuXG4gICAgaWYgKG9wdGlvbnMucmVzcG9uc2l2ZSkge1xuICAgICAgcmVtb3ZlTGlzdGVuZXIod2luZG93LCBFVkVOVF9SRVNJWkUsIHRoaXMub25SZXNpemUpO1xuICAgIH1cbiAgfSxcbn07XG4iLCJpbXBvcnQge1xuICBBQ1RJT05fQ1JPUCxcbiAgQUNUSU9OX1pPT00sXG4gIENMQVNTX0NST1AsXG4gIENMQVNTX01PREFMLFxuICBEQVRBX0FDVElPTixcbiAgRFJBR19NT0RFX0NST1AsXG4gIERSQUdfTU9ERV9NT1ZFLFxuICBEUkFHX01PREVfTk9ORSxcbiAgRVZFTlRfQ1JPUF9FTkQsXG4gIEVWRU5UX0NST1BfTU9WRSxcbiAgRVZFTlRfQ1JPUF9TVEFSVCxcbiAgTUlOX0NPTlRBSU5FUl9XSURUSCxcbiAgTUlOX0NPTlRBSU5FUl9IRUlHSFQsXG4gIFJFR0VYUF9BQ1RJT05TLFxufSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQge1xuICBhZGRDbGFzcyxcbiAgYXNzaWduLFxuICBkaXNwYXRjaEV2ZW50LFxuICBmb3JFYWNoLFxuICBnZXREYXRhLFxuICBnZXRQb2ludGVyLFxuICBoYXNDbGFzcyxcbiAgaXNOdW1iZXIsXG4gIHRvZ2dsZUNsYXNzLFxufSBmcm9tICcuL3V0aWxpdGllcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcmVzaXplKCkge1xuICAgIGNvbnN0IHsgb3B0aW9ucywgY29udGFpbmVyLCBjb250YWluZXJEYXRhIH0gPSB0aGlzO1xuICAgIGNvbnN0IG1pbkNvbnRhaW5lcldpZHRoID0gTnVtYmVyKG9wdGlvbnMubWluQ29udGFpbmVyV2lkdGgpIHx8IE1JTl9DT05UQUlORVJfV0lEVEg7XG4gICAgY29uc3QgbWluQ29udGFpbmVySGVpZ2h0ID0gTnVtYmVyKG9wdGlvbnMubWluQ29udGFpbmVySGVpZ2h0KSB8fCBNSU5fQ09OVEFJTkVSX0hFSUdIVDtcblxuICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IGNvbnRhaW5lckRhdGEud2lkdGggPD0gbWluQ29udGFpbmVyV2lkdGhcbiAgICAgIHx8IGNvbnRhaW5lckRhdGEuaGVpZ2h0IDw9IG1pbkNvbnRhaW5lckhlaWdodCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHJhdGlvID0gY29udGFpbmVyLm9mZnNldFdpZHRoIC8gY29udGFpbmVyRGF0YS53aWR0aDtcblxuICAgIC8vIFJlc2l6ZSB3aGVuIHdpZHRoIGNoYW5nZWQgb3IgaGVpZ2h0IGNoYW5nZWRcbiAgICBpZiAocmF0aW8gIT09IDEgfHwgY29udGFpbmVyLm9mZnNldEhlaWdodCAhPT0gY29udGFpbmVyRGF0YS5oZWlnaHQpIHtcbiAgICAgIGxldCBjYW52YXNEYXRhO1xuICAgICAgbGV0IGNyb3BCb3hEYXRhO1xuXG4gICAgICBpZiAob3B0aW9ucy5yZXN0b3JlKSB7XG4gICAgICAgIGNhbnZhc0RhdGEgPSB0aGlzLmdldENhbnZhc0RhdGEoKTtcbiAgICAgICAgY3JvcEJveERhdGEgPSB0aGlzLmdldENyb3BCb3hEYXRhKCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgICAgIGlmIChvcHRpb25zLnJlc3RvcmUpIHtcbiAgICAgICAgdGhpcy5zZXRDYW52YXNEYXRhKGZvckVhY2goY2FudmFzRGF0YSwgKG4sIGkpID0+IHtcbiAgICAgICAgICBjYW52YXNEYXRhW2ldID0gbiAqIHJhdGlvO1xuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMuc2V0Q3JvcEJveERhdGEoZm9yRWFjaChjcm9wQm94RGF0YSwgKG4sIGkpID0+IHtcbiAgICAgICAgICBjcm9wQm94RGF0YVtpXSA9IG4gKiByYXRpbztcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBkYmxjbGljaygpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCB0aGlzLm9wdGlvbnMuZHJhZ01vZGUgPT09IERSQUdfTU9ERV9OT05FKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zZXREcmFnTW9kZShoYXNDbGFzcyh0aGlzLmRyYWdCb3gsIENMQVNTX0NST1ApID8gRFJBR19NT0RFX01PVkUgOiBEUkFHX01PREVfQ1JPUCk7XG4gIH0sXG5cbiAgd2hlZWwoZXZlbnQpIHtcbiAgICBjb25zdCByYXRpbyA9IE51bWJlcih0aGlzLm9wdGlvbnMud2hlZWxab29tUmF0aW8pIHx8IDAuMTtcbiAgICBsZXQgZGVsdGEgPSAxO1xuXG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgLy8gTGltaXQgd2hlZWwgc3BlZWQgdG8gcHJldmVudCB6b29tIHRvbyBmYXN0ICgjMjEpXG4gICAgaWYgKHRoaXMud2hlZWxpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLndoZWVsaW5nID0gdHJ1ZTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy53aGVlbGluZyA9IGZhbHNlO1xuICAgIH0sIDUwKTtcblxuICAgIGlmIChldmVudC5kZWx0YVkpIHtcbiAgICAgIGRlbHRhID0gZXZlbnQuZGVsdGFZID4gMCA/IDEgOiAtMTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LndoZWVsRGVsdGEpIHtcbiAgICAgIGRlbHRhID0gLWV2ZW50LndoZWVsRGVsdGEgLyAxMjA7XG4gICAgfSBlbHNlIGlmIChldmVudC5kZXRhaWwpIHtcbiAgICAgIGRlbHRhID0gZXZlbnQuZGV0YWlsID4gMCA/IDEgOiAtMTtcbiAgICB9XG5cbiAgICB0aGlzLnpvb20oLWRlbHRhICogcmF0aW8sIGV2ZW50KTtcbiAgfSxcblxuICBjcm9wU3RhcnQoZXZlbnQpIHtcbiAgICBjb25zdCB7IGJ1dHRvbnMsIGJ1dHRvbiB9ID0gZXZlbnQ7XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLmRpc2FibGVkXG5cbiAgICAgIC8vIE5vIHByaW1hcnkgYnV0dG9uIChVc3VhbGx5IHRoZSBsZWZ0IGJ1dHRvbilcbiAgICAgIC8vIE5vdGUgdGhhdCB0b3VjaCBldmVudHMgaGF2ZSBubyBgYnV0dG9uc2Agb3IgYGJ1dHRvbmAgcHJvcGVydHlcbiAgICAgIHx8IChpc051bWJlcihidXR0b25zKSAmJiBidXR0b25zICE9PSAxKVxuICAgICAgfHwgKGlzTnVtYmVyKGJ1dHRvbikgJiYgYnV0dG9uICE9PSAwKVxuXG4gICAgICAvLyBPcGVuIGNvbnRleHQgbWVudVxuICAgICAgfHwgZXZlbnQuY3RybEtleVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHsgb3B0aW9ucywgcG9pbnRlcnMgfSA9IHRoaXM7XG4gICAgbGV0IGFjdGlvbjtcblxuICAgIGlmIChldmVudC5jaGFuZ2VkVG91Y2hlcykge1xuICAgICAgLy8gSGFuZGxlIHRvdWNoIGV2ZW50XG4gICAgICBmb3JFYWNoKGV2ZW50LmNoYW5nZWRUb3VjaGVzLCAodG91Y2gpID0+IHtcbiAgICAgICAgcG9pbnRlcnNbdG91Y2guaWRlbnRpZmllcl0gPSBnZXRQb2ludGVyKHRvdWNoKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBIYW5kbGUgbW91c2UgZXZlbnQgYW5kIHBvaW50ZXIgZXZlbnRcbiAgICAgIHBvaW50ZXJzW2V2ZW50LnBvaW50ZXJJZCB8fCAwXSA9IGdldFBvaW50ZXIoZXZlbnQpO1xuICAgIH1cblxuICAgIGlmIChPYmplY3Qua2V5cyhwb2ludGVycykubGVuZ3RoID4gMSAmJiBvcHRpb25zLnpvb21hYmxlICYmIG9wdGlvbnMuem9vbU9uVG91Y2gpIHtcbiAgICAgIGFjdGlvbiA9IEFDVElPTl9aT09NO1xuICAgIH0gZWxzZSB7XG4gICAgICBhY3Rpb24gPSBnZXREYXRhKGV2ZW50LnRhcmdldCwgREFUQV9BQ1RJT04pO1xuICAgIH1cblxuICAgIGlmICghUkVHRVhQX0FDVElPTlMudGVzdChhY3Rpb24pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGRpc3BhdGNoRXZlbnQodGhpcy5lbGVtZW50LCBFVkVOVF9DUk9QX1NUQVJULCB7XG4gICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgIGFjdGlvbixcbiAgICB9KSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBUaGlzIGxpbmUgaXMgcmVxdWlyZWQgZm9yIHByZXZlbnRpbmcgcGFnZSB6b29taW5nIGluIGlPUyBicm93c2Vyc1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICB0aGlzLmFjdGlvbiA9IGFjdGlvbjtcbiAgICB0aGlzLmNyb3BwaW5nID0gZmFsc2U7XG5cbiAgICBpZiAoYWN0aW9uID09PSBBQ1RJT05fQ1JPUCkge1xuICAgICAgdGhpcy5jcm9wcGluZyA9IHRydWU7XG4gICAgICBhZGRDbGFzcyh0aGlzLmRyYWdCb3gsIENMQVNTX01PREFMKTtcbiAgICB9XG4gIH0sXG5cbiAgY3JvcE1vdmUoZXZlbnQpIHtcbiAgICBjb25zdCB7IGFjdGlvbiB9ID0gdGhpcztcblxuICAgIGlmICh0aGlzLmRpc2FibGVkIHx8ICFhY3Rpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB7IHBvaW50ZXJzIH0gPSB0aGlzO1xuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGlmIChkaXNwYXRjaEV2ZW50KHRoaXMuZWxlbWVudCwgRVZFTlRfQ1JPUF9NT1ZFLCB7XG4gICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgIGFjdGlvbixcbiAgICB9KSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZXZlbnQuY2hhbmdlZFRvdWNoZXMpIHtcbiAgICAgIGZvckVhY2goZXZlbnQuY2hhbmdlZFRvdWNoZXMsICh0b3VjaCkgPT4ge1xuICAgICAgICAvLyBUaGUgZmlyc3QgcGFyYW1ldGVyIHNob3VsZCBub3QgYmUgdW5kZWZpbmVkICgjNDMyKVxuICAgICAgICBhc3NpZ24ocG9pbnRlcnNbdG91Y2guaWRlbnRpZmllcl0gfHwge30sIGdldFBvaW50ZXIodG91Y2gsIHRydWUpKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBhc3NpZ24ocG9pbnRlcnNbZXZlbnQucG9pbnRlcklkIHx8IDBdIHx8IHt9LCBnZXRQb2ludGVyKGV2ZW50LCB0cnVlKSk7XG4gICAgfVxuXG4gICAgdGhpcy5jaGFuZ2UoZXZlbnQpO1xuICB9LFxuXG4gIGNyb3BFbmQoZXZlbnQpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHsgYWN0aW9uLCBwb2ludGVycyB9ID0gdGhpcztcblxuICAgIGlmIChldmVudC5jaGFuZ2VkVG91Y2hlcykge1xuICAgICAgZm9yRWFjaChldmVudC5jaGFuZ2VkVG91Y2hlcywgKHRvdWNoKSA9PiB7XG4gICAgICAgIGRlbGV0ZSBwb2ludGVyc1t0b3VjaC5pZGVudGlmaWVyXTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgcG9pbnRlcnNbZXZlbnQucG9pbnRlcklkIHx8IDBdO1xuICAgIH1cblxuICAgIGlmICghYWN0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGlmICghT2JqZWN0LmtleXMocG9pbnRlcnMpLmxlbmd0aCkge1xuICAgICAgdGhpcy5hY3Rpb24gPSAnJztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jcm9wcGluZykge1xuICAgICAgdGhpcy5jcm9wcGluZyA9IGZhbHNlO1xuICAgICAgdG9nZ2xlQ2xhc3ModGhpcy5kcmFnQm94LCBDTEFTU19NT0RBTCwgdGhpcy5jcm9wcGVkICYmIHRoaXMub3B0aW9ucy5tb2RhbCk7XG4gICAgfVxuXG4gICAgZGlzcGF0Y2hFdmVudCh0aGlzLmVsZW1lbnQsIEVWRU5UX0NST1BfRU5ELCB7XG4gICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgIGFjdGlvbixcbiAgICB9KTtcbiAgfSxcbn07XG4iLCJpbXBvcnQge1xuICBDTEFTU19DUk9QLFxuICBDTEFTU19ESVNBQkxFRCxcbiAgQ0xBU1NfSElEREVOLFxuICBDTEFTU19NT0RBTCxcbiAgQ0xBU1NfTU9WRSxcbiAgREFUQV9BQ1RJT04sXG4gIERSQUdfTU9ERV9DUk9QLFxuICBEUkFHX01PREVfTU9WRSxcbiAgRFJBR19NT0RFX05PTkUsXG4gIEVWRU5UX1pPT00sXG4gIE5BTUVTUEFDRSxcbn0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHtcbiAgYWRkQ2xhc3MsXG4gIGFzc2lnbixcbiAgZGlzcGF0Y2hFdmVudCxcbiAgZm9yRWFjaCxcbiAgZ2V0QWRqdXN0ZWRTaXplcyxcbiAgZ2V0T2Zmc2V0LFxuICBnZXRQb2ludGVyc0NlbnRlcixcbiAgZ2V0U291cmNlQ2FudmFzLFxuICBpc051bWJlcixcbiAgaXNQbGFpbk9iamVjdCxcbiAgaXNVbmRlZmluZWQsXG4gIG5vcm1hbGl6ZURlY2ltYWxOdW1iZXIsXG4gIHJlbW92ZUNsYXNzLFxuICBzZXREYXRhLFxuICB0b2dnbGVDbGFzcyxcbn0gZnJvbSAnLi91dGlsaXRpZXMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIC8vIFNob3cgdGhlIGNyb3AgYm94IG1hbnVhbGx5XG4gIGNyb3AoKSB7XG4gICAgaWYgKHRoaXMucmVhZHkgJiYgIXRoaXMuY3JvcHBlZCAmJiAhdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5jcm9wcGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMubGltaXRDcm9wQm94KHRydWUsIHRydWUpO1xuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLm1vZGFsKSB7XG4gICAgICAgIGFkZENsYXNzKHRoaXMuZHJhZ0JveCwgQ0xBU1NfTU9EQUwpO1xuICAgICAgfVxuXG4gICAgICByZW1vdmVDbGFzcyh0aGlzLmNyb3BCb3gsIENMQVNTX0hJRERFTik7XG4gICAgICB0aGlzLnNldENyb3BCb3hEYXRhKHRoaXMuaW5pdGlhbENyb3BCb3hEYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICAvLyBSZXNldCB0aGUgaW1hZ2UgYW5kIGNyb3AgYm94IHRvIHRoZWlyIGluaXRpYWwgc3RhdGVzXG4gIHJlc2V0KCkge1xuICAgIGlmICh0aGlzLnJlYWR5ICYmICF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLmltYWdlRGF0YSA9IGFzc2lnbih7fSwgdGhpcy5pbml0aWFsSW1hZ2VEYXRhKTtcbiAgICAgIHRoaXMuY2FudmFzRGF0YSA9IGFzc2lnbih7fSwgdGhpcy5pbml0aWFsQ2FudmFzRGF0YSk7XG4gICAgICB0aGlzLmNyb3BCb3hEYXRhID0gYXNzaWduKHt9LCB0aGlzLmluaXRpYWxDcm9wQm94RGF0YSk7XG4gICAgICB0aGlzLnJlbmRlckNhbnZhcygpO1xuXG4gICAgICBpZiAodGhpcy5jcm9wcGVkKSB7XG4gICAgICAgIHRoaXMucmVuZGVyQ3JvcEJveCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIC8vIENsZWFyIHRoZSBjcm9wIGJveFxuICBjbGVhcigpIHtcbiAgICBpZiAodGhpcy5jcm9wcGVkICYmICF0aGlzLmRpc2FibGVkKSB7XG4gICAgICBhc3NpZ24odGhpcy5jcm9wQm94RGF0YSwge1xuICAgICAgICBsZWZ0OiAwLFxuICAgICAgICB0b3A6IDAsXG4gICAgICAgIHdpZHRoOiAwLFxuICAgICAgICBoZWlnaHQ6IDAsXG4gICAgICB9KTtcblxuICAgICAgdGhpcy5jcm9wcGVkID0gZmFsc2U7XG4gICAgICB0aGlzLnJlbmRlckNyb3BCb3goKTtcbiAgICAgIHRoaXMubGltaXRDYW52YXModHJ1ZSwgdHJ1ZSk7XG5cbiAgICAgIC8vIFJlbmRlciBjYW52YXMgYWZ0ZXIgY3JvcCBib3ggcmVuZGVyZWRcbiAgICAgIHRoaXMucmVuZGVyQ2FudmFzKCk7XG4gICAgICByZW1vdmVDbGFzcyh0aGlzLmRyYWdCb3gsIENMQVNTX01PREFMKTtcbiAgICAgIGFkZENsYXNzKHRoaXMuY3JvcEJveCwgQ0xBU1NfSElEREVOKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICAvKipcbiAgICogUmVwbGFjZSB0aGUgaW1hZ2UncyBzcmMgYW5kIHJlYnVpbGQgdGhlIGNyb3BwZXJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybCAtIFRoZSBuZXcgVVJMLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtoYXNTYW1lU2l6ZV0gLSBJbmRpY2F0ZSBpZiB0aGUgbmV3IGltYWdlIGhhcyB0aGUgc2FtZSBzaXplIGFzIHRoZSBvbGQgb25lLlxuICAgKiBAcmV0dXJucyB7Q3JvcHBlcn0gdGhpc1xuICAgKi9cbiAgcmVwbGFjZSh1cmwsIGhhc1NhbWVTaXplID0gZmFsc2UpIHtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQgJiYgdXJsKSB7XG4gICAgICBpZiAodGhpcy5pc0ltZykge1xuICAgICAgICB0aGlzLmVsZW1lbnQuc3JjID0gdXJsO1xuICAgICAgfVxuXG4gICAgICBpZiAoaGFzU2FtZVNpemUpIHtcbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gdXJsO1xuXG4gICAgICAgIGlmICh0aGlzLnJlYWR5KSB7XG4gICAgICAgICAgdGhpcy52aWV3Qm94SW1hZ2Uuc3JjID0gdXJsO1xuXG4gICAgICAgICAgZm9yRWFjaCh0aGlzLnByZXZpZXdzLCAoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJylbMF0uc3JjID0gdXJsO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5pc0ltZykge1xuICAgICAgICAgIHRoaXMucmVwbGFjZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vcHRpb25zLmRhdGEgPSBudWxsO1xuICAgICAgICB0aGlzLnVuY3JlYXRlKCk7XG4gICAgICAgIHRoaXMubG9hZCh1cmwpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIC8vIEVuYWJsZSAodW5mcmVlemUpIHRoZSBjcm9wcGVyXG4gIGVuYWJsZSgpIHtcbiAgICBpZiAodGhpcy5yZWFkeSAmJiB0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICByZW1vdmVDbGFzcyh0aGlzLmNyb3BwZXIsIENMQVNTX0RJU0FCTEVEKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICAvLyBEaXNhYmxlIChmcmVlemUpIHRoZSBjcm9wcGVyXG4gIGRpc2FibGUoKSB7XG4gICAgaWYgKHRoaXMucmVhZHkgJiYgIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgYWRkQ2xhc3ModGhpcy5jcm9wcGVyLCBDTEFTU19ESVNBQkxFRCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgdGhlIGNyb3BwZXIgYW5kIHJlbW92ZSB0aGUgaW5zdGFuY2UgZnJvbSB0aGUgaW1hZ2VcbiAgICogQHJldHVybnMge0Nyb3BwZXJ9IHRoaXNcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgY29uc3QgeyBlbGVtZW50IH0gPSB0aGlzO1xuXG4gICAgaWYgKCFlbGVtZW50W05BTUVTUEFDRV0pIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGVsZW1lbnRbTkFNRVNQQUNFXSA9IHVuZGVmaW5lZDtcblxuICAgIGlmICh0aGlzLmlzSW1nICYmIHRoaXMucmVwbGFjZWQpIHtcbiAgICAgIGVsZW1lbnQuc3JjID0gdGhpcy5vcmlnaW5hbFVybDtcbiAgICB9XG5cbiAgICB0aGlzLnVuY3JlYXRlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLyoqXG4gICAqIE1vdmUgdGhlIGNhbnZhcyB3aXRoIHJlbGF0aXZlIG9mZnNldHNcbiAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldFggLSBUaGUgcmVsYXRpdmUgb2Zmc2V0IGRpc3RhbmNlIG9uIHRoZSB4LWF4aXMuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbb2Zmc2V0WT1vZmZzZXRYXSAtIFRoZSByZWxhdGl2ZSBvZmZzZXQgZGlzdGFuY2Ugb24gdGhlIHktYXhpcy5cbiAgICogQHJldHVybnMge0Nyb3BwZXJ9IHRoaXNcbiAgICovXG4gIG1vdmUob2Zmc2V0WCwgb2Zmc2V0WSA9IG9mZnNldFgpIHtcbiAgICBjb25zdCB7IGxlZnQsIHRvcCB9ID0gdGhpcy5jYW52YXNEYXRhO1xuXG4gICAgcmV0dXJuIHRoaXMubW92ZVRvKFxuICAgICAgaXNVbmRlZmluZWQob2Zmc2V0WCkgPyBvZmZzZXRYIDogKGxlZnQgKyBOdW1iZXIob2Zmc2V0WCkpLFxuICAgICAgaXNVbmRlZmluZWQob2Zmc2V0WSkgPyBvZmZzZXRZIDogKHRvcCArIE51bWJlcihvZmZzZXRZKSksXG4gICAgKTtcbiAgfSxcblxuICAvKipcbiAgICogTW92ZSB0aGUgY2FudmFzIHRvIGFuIGFic29sdXRlIHBvaW50XG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IC0gVGhlIHgtYXhpcyBjb29yZGluYXRlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW3k9eF0gLSBUaGUgeS1heGlzIGNvb3JkaW5hdGUuXG4gICAqIEByZXR1cm5zIHtDcm9wcGVyfSB0aGlzXG4gICAqL1xuICBtb3ZlVG8oeCwgeSA9IHgpIHtcbiAgICBjb25zdCB7IGNhbnZhc0RhdGEgfSA9IHRoaXM7XG4gICAgbGV0IGNoYW5nZWQgPSBmYWxzZTtcblxuICAgIHggPSBOdW1iZXIoeCk7XG4gICAgeSA9IE51bWJlcih5KTtcblxuICAgIGlmICh0aGlzLnJlYWR5ICYmICF0aGlzLmRpc2FibGVkICYmIHRoaXMub3B0aW9ucy5tb3ZhYmxlKSB7XG4gICAgICBpZiAoaXNOdW1iZXIoeCkpIHtcbiAgICAgICAgY2FudmFzRGF0YS5sZWZ0ID0geDtcbiAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc051bWJlcih5KSkge1xuICAgICAgICBjYW52YXNEYXRhLnRvcCA9IHk7XG4gICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgICB0aGlzLnJlbmRlckNhbnZhcyh0cnVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICAvKipcbiAgICogWm9vbSB0aGUgY2FudmFzIHdpdGggYSByZWxhdGl2ZSByYXRpb1xuICAgKiBAcGFyYW0ge251bWJlcn0gcmF0aW8gLSBUaGUgdGFyZ2V0IHJhdGlvLlxuICAgKiBAcGFyYW0ge0V2ZW50fSBfb3JpZ2luYWxFdmVudCAtIFRoZSBvcmlnaW5hbCBldmVudCBpZiBhbnkuXG4gICAqIEByZXR1cm5zIHtDcm9wcGVyfSB0aGlzXG4gICAqL1xuICB6b29tKHJhdGlvLCBfb3JpZ2luYWxFdmVudCkge1xuICAgIGNvbnN0IHsgY2FudmFzRGF0YSB9ID0gdGhpcztcblxuICAgIHJhdGlvID0gTnVtYmVyKHJhdGlvKTtcblxuICAgIGlmIChyYXRpbyA8IDApIHtcbiAgICAgIHJhdGlvID0gMSAvICgxIC0gcmF0aW8pO1xuICAgIH0gZWxzZSB7XG4gICAgICByYXRpbyA9IDEgKyByYXRpbztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy56b29tVG8oKGNhbnZhc0RhdGEud2lkdGggKiByYXRpbykgLyBjYW52YXNEYXRhLm5hdHVyYWxXaWR0aCwgbnVsbCwgX29yaWdpbmFsRXZlbnQpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBab29tIHRoZSBjYW52YXMgdG8gYW4gYWJzb2x1dGUgcmF0aW9cbiAgICogQHBhcmFtIHtudW1iZXJ9IHJhdGlvIC0gVGhlIHRhcmdldCByYXRpby5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBpdm90IC0gVGhlIHpvb20gcGl2b3QgcG9pbnQgY29vcmRpbmF0ZS5cbiAgICogQHBhcmFtIHtFdmVudH0gX29yaWdpbmFsRXZlbnQgLSBUaGUgb3JpZ2luYWwgZXZlbnQgaWYgYW55LlxuICAgKiBAcmV0dXJucyB7Q3JvcHBlcn0gdGhpc1xuICAgKi9cbiAgem9vbVRvKHJhdGlvLCBwaXZvdCwgX29yaWdpbmFsRXZlbnQpIHtcbiAgICBjb25zdCB7IG9wdGlvbnMsIGNhbnZhc0RhdGEgfSA9IHRoaXM7XG4gICAgY29uc3Qge1xuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgICBuYXR1cmFsV2lkdGgsXG4gICAgICBuYXR1cmFsSGVpZ2h0LFxuICAgIH0gPSBjYW52YXNEYXRhO1xuXG4gICAgcmF0aW8gPSBOdW1iZXIocmF0aW8pO1xuXG4gICAgaWYgKHJhdGlvID49IDAgJiYgdGhpcy5yZWFkeSAmJiAhdGhpcy5kaXNhYmxlZCAmJiBvcHRpb25zLnpvb21hYmxlKSB7XG4gICAgICBjb25zdCBuZXdXaWR0aCA9IG5hdHVyYWxXaWR0aCAqIHJhdGlvO1xuICAgICAgY29uc3QgbmV3SGVpZ2h0ID0gbmF0dXJhbEhlaWdodCAqIHJhdGlvO1xuXG4gICAgICBpZiAoZGlzcGF0Y2hFdmVudCh0aGlzLmVsZW1lbnQsIEVWRU5UX1pPT00sIHtcbiAgICAgICAgcmF0aW8sXG4gICAgICAgIG9sZFJhdGlvOiB3aWR0aCAvIG5hdHVyYWxXaWR0aCxcbiAgICAgICAgb3JpZ2luYWxFdmVudDogX29yaWdpbmFsRXZlbnQsXG4gICAgICB9KSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGlmIChfb3JpZ2luYWxFdmVudCkge1xuICAgICAgICBjb25zdCB7IHBvaW50ZXJzIH0gPSB0aGlzO1xuICAgICAgICBjb25zdCBvZmZzZXQgPSBnZXRPZmZzZXQodGhpcy5jcm9wcGVyKTtcbiAgICAgICAgY29uc3QgY2VudGVyID0gcG9pbnRlcnMgJiYgT2JqZWN0LmtleXMocG9pbnRlcnMpLmxlbmd0aCA/IGdldFBvaW50ZXJzQ2VudGVyKHBvaW50ZXJzKSA6IHtcbiAgICAgICAgICBwYWdlWDogX29yaWdpbmFsRXZlbnQucGFnZVgsXG4gICAgICAgICAgcGFnZVk6IF9vcmlnaW5hbEV2ZW50LnBhZ2VZLFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFpvb20gZnJvbSB0aGUgdHJpZ2dlcmluZyBwb2ludCBvZiB0aGUgZXZlbnRcbiAgICAgICAgY2FudmFzRGF0YS5sZWZ0IC09IChuZXdXaWR0aCAtIHdpZHRoKSAqIChcbiAgICAgICAgICAoKGNlbnRlci5wYWdlWCAtIG9mZnNldC5sZWZ0KSAtIGNhbnZhc0RhdGEubGVmdCkgLyB3aWR0aFxuICAgICAgICApO1xuICAgICAgICBjYW52YXNEYXRhLnRvcCAtPSAobmV3SGVpZ2h0IC0gaGVpZ2h0KSAqIChcbiAgICAgICAgICAoKGNlbnRlci5wYWdlWSAtIG9mZnNldC50b3ApIC0gY2FudmFzRGF0YS50b3ApIC8gaGVpZ2h0XG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKGlzUGxhaW5PYmplY3QocGl2b3QpICYmIGlzTnVtYmVyKHBpdm90LngpICYmIGlzTnVtYmVyKHBpdm90LnkpKSB7XG4gICAgICAgIGNhbnZhc0RhdGEubGVmdCAtPSAobmV3V2lkdGggLSB3aWR0aCkgKiAoXG4gICAgICAgICAgKHBpdm90LnggLSBjYW52YXNEYXRhLmxlZnQpIC8gd2lkdGhcbiAgICAgICAgKTtcbiAgICAgICAgY2FudmFzRGF0YS50b3AgLT0gKG5ld0hlaWdodCAtIGhlaWdodCkgKiAoXG4gICAgICAgICAgKHBpdm90LnkgLSBjYW52YXNEYXRhLnRvcCkgLyBoZWlnaHRcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFpvb20gZnJvbSB0aGUgY2VudGVyIG9mIHRoZSBjYW52YXNcbiAgICAgICAgY2FudmFzRGF0YS5sZWZ0IC09IChuZXdXaWR0aCAtIHdpZHRoKSAvIDI7XG4gICAgICAgIGNhbnZhc0RhdGEudG9wIC09IChuZXdIZWlnaHQgLSBoZWlnaHQpIC8gMjtcbiAgICAgIH1cblxuICAgICAgY2FudmFzRGF0YS53aWR0aCA9IG5ld1dpZHRoO1xuICAgICAgY2FudmFzRGF0YS5oZWlnaHQgPSBuZXdIZWlnaHQ7XG4gICAgICB0aGlzLnJlbmRlckNhbnZhcyh0cnVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICAvKipcbiAgICogUm90YXRlIHRoZSBjYW52YXMgd2l0aCBhIHJlbGF0aXZlIGRlZ3JlZVxuICAgKiBAcGFyYW0ge251bWJlcn0gZGVncmVlIC0gVGhlIHJvdGF0ZSBkZWdyZWUuXG4gICAqIEByZXR1cm5zIHtDcm9wcGVyfSB0aGlzXG4gICAqL1xuICByb3RhdGUoZGVncmVlKSB7XG4gICAgcmV0dXJuIHRoaXMucm90YXRlVG8oKHRoaXMuaW1hZ2VEYXRhLnJvdGF0ZSB8fCAwKSArIE51bWJlcihkZWdyZWUpKTtcbiAgfSxcblxuICAvKipcbiAgICogUm90YXRlIHRoZSBjYW52YXMgdG8gYW4gYWJzb2x1dGUgZGVncmVlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBkZWdyZWUgLSBUaGUgcm90YXRlIGRlZ3JlZS5cbiAgICogQHJldHVybnMge0Nyb3BwZXJ9IHRoaXNcbiAgICovXG4gIHJvdGF0ZVRvKGRlZ3JlZSkge1xuICAgIGRlZ3JlZSA9IE51bWJlcihkZWdyZWUpO1xuXG4gICAgaWYgKGlzTnVtYmVyKGRlZ3JlZSkgJiYgdGhpcy5yZWFkeSAmJiAhdGhpcy5kaXNhYmxlZCAmJiB0aGlzLm9wdGlvbnMucm90YXRhYmxlKSB7XG4gICAgICB0aGlzLmltYWdlRGF0YS5yb3RhdGUgPSBkZWdyZWUgJSAzNjA7XG4gICAgICB0aGlzLnJlbmRlckNhbnZhcyh0cnVlLCB0cnVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICAvKipcbiAgICogU2NhbGUgdGhlIGltYWdlIG9uIHRoZSB4LWF4aXMuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzY2FsZVggLSBUaGUgc2NhbGUgcmF0aW8gb24gdGhlIHgtYXhpcy5cbiAgICogQHJldHVybnMge0Nyb3BwZXJ9IHRoaXNcbiAgICovXG4gIHNjYWxlWChzY2FsZVgpIHtcbiAgICBjb25zdCB7IHNjYWxlWSB9ID0gdGhpcy5pbWFnZURhdGE7XG5cbiAgICByZXR1cm4gdGhpcy5zY2FsZShzY2FsZVgsIGlzTnVtYmVyKHNjYWxlWSkgPyBzY2FsZVkgOiAxKTtcbiAgfSxcblxuICAvKipcbiAgICogU2NhbGUgdGhlIGltYWdlIG9uIHRoZSB5LWF4aXMuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzY2FsZVkgLSBUaGUgc2NhbGUgcmF0aW8gb24gdGhlIHktYXhpcy5cbiAgICogQHJldHVybnMge0Nyb3BwZXJ9IHRoaXNcbiAgICovXG4gIHNjYWxlWShzY2FsZVkpIHtcbiAgICBjb25zdCB7IHNjYWxlWCB9ID0gdGhpcy5pbWFnZURhdGE7XG5cbiAgICByZXR1cm4gdGhpcy5zY2FsZShpc051bWJlcihzY2FsZVgpID8gc2NhbGVYIDogMSwgc2NhbGVZKTtcbiAgfSxcblxuICAvKipcbiAgICogU2NhbGUgdGhlIGltYWdlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzY2FsZVggLSBUaGUgc2NhbGUgcmF0aW8gb24gdGhlIHgtYXhpcy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtzY2FsZVk9c2NhbGVYXSAtIFRoZSBzY2FsZSByYXRpbyBvbiB0aGUgeS1heGlzLlxuICAgKiBAcmV0dXJucyB7Q3JvcHBlcn0gdGhpc1xuICAgKi9cbiAgc2NhbGUoc2NhbGVYLCBzY2FsZVkgPSBzY2FsZVgpIHtcbiAgICBjb25zdCB7IGltYWdlRGF0YSB9ID0gdGhpcztcbiAgICBsZXQgdHJhbnNmb3JtZWQgPSBmYWxzZTtcblxuICAgIHNjYWxlWCA9IE51bWJlcihzY2FsZVgpO1xuICAgIHNjYWxlWSA9IE51bWJlcihzY2FsZVkpO1xuXG4gICAgaWYgKHRoaXMucmVhZHkgJiYgIXRoaXMuZGlzYWJsZWQgJiYgdGhpcy5vcHRpb25zLnNjYWxhYmxlKSB7XG4gICAgICBpZiAoaXNOdW1iZXIoc2NhbGVYKSkge1xuICAgICAgICBpbWFnZURhdGEuc2NhbGVYID0gc2NhbGVYO1xuICAgICAgICB0cmFuc2Zvcm1lZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc051bWJlcihzY2FsZVkpKSB7XG4gICAgICAgIGltYWdlRGF0YS5zY2FsZVkgPSBzY2FsZVk7XG4gICAgICAgIHRyYW5zZm9ybWVkID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRyYW5zZm9ybWVkKSB7XG4gICAgICAgIHRoaXMucmVuZGVyQ2FudmFzKHRydWUsIHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGNyb3BwZWQgYXJlYSBwb3NpdGlvbiBhbmQgc2l6ZSBkYXRhIChiYXNlIG9uIHRoZSBvcmlnaW5hbCBpbWFnZSlcbiAgICogQHBhcmFtIHtib29sZWFufSBbcm91bmRlZD1mYWxzZV0gLSBJbmRpY2F0ZSBpZiByb3VuZCB0aGUgZGF0YSB2YWx1ZXMgb3Igbm90LlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgcmVzdWx0IGNyb3BwZWQgZGF0YS5cbiAgICovXG4gIGdldERhdGEocm91bmRlZCA9IGZhbHNlKSB7XG4gICAgY29uc3Qge1xuICAgICAgb3B0aW9ucyxcbiAgICAgIGltYWdlRGF0YSxcbiAgICAgIGNhbnZhc0RhdGEsXG4gICAgICBjcm9wQm94RGF0YSxcbiAgICB9ID0gdGhpcztcbiAgICBsZXQgZGF0YTtcblxuICAgIGlmICh0aGlzLnJlYWR5ICYmIHRoaXMuY3JvcHBlZCkge1xuICAgICAgZGF0YSA9IHtcbiAgICAgICAgeDogY3JvcEJveERhdGEubGVmdCAtIGNhbnZhc0RhdGEubGVmdCxcbiAgICAgICAgeTogY3JvcEJveERhdGEudG9wIC0gY2FudmFzRGF0YS50b3AsXG4gICAgICAgIHdpZHRoOiBjcm9wQm94RGF0YS53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBjcm9wQm94RGF0YS5oZWlnaHQsXG4gICAgICB9O1xuXG4gICAgICBjb25zdCByYXRpbyA9IGltYWdlRGF0YS53aWR0aCAvIGltYWdlRGF0YS5uYXR1cmFsV2lkdGg7XG5cbiAgICAgIGZvckVhY2goZGF0YSwgKG4sIGkpID0+IHtcbiAgICAgICAgZGF0YVtpXSA9IG4gLyByYXRpbztcbiAgICAgIH0pO1xuXG4gICAgICBpZiAocm91bmRlZCkge1xuICAgICAgICAvLyBJbiBjYXNlIHJvdW5kaW5nIG9mZiBsZWFkcyB0byBleHRyYSAxcHggaW4gcmlnaHQgb3IgYm90dG9tIGJvcmRlclxuICAgICAgICAvLyB3ZSBzaG91bGQgcm91bmQgdGhlIHRvcC1sZWZ0IGNvcm5lciBhbmQgdGhlIGRpbWVuc2lvbiAoIzM0MykuXG4gICAgICAgIGNvbnN0IGJvdHRvbSA9IE1hdGgucm91bmQoZGF0YS55ICsgZGF0YS5oZWlnaHQpO1xuICAgICAgICBjb25zdCByaWdodCA9IE1hdGgucm91bmQoZGF0YS54ICsgZGF0YS53aWR0aCk7XG5cbiAgICAgICAgZGF0YS54ID0gTWF0aC5yb3VuZChkYXRhLngpO1xuICAgICAgICBkYXRhLnkgPSBNYXRoLnJvdW5kKGRhdGEueSk7XG4gICAgICAgIGRhdGEud2lkdGggPSByaWdodCAtIGRhdGEueDtcbiAgICAgICAgZGF0YS5oZWlnaHQgPSBib3R0b20gLSBkYXRhLnk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGEgPSB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDAsXG4gICAgICAgIHdpZHRoOiAwLFxuICAgICAgICBoZWlnaHQ6IDAsXG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnJvdGF0YWJsZSkge1xuICAgICAgZGF0YS5yb3RhdGUgPSBpbWFnZURhdGEucm90YXRlIHx8IDA7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuc2NhbGFibGUpIHtcbiAgICAgIGRhdGEuc2NhbGVYID0gaW1hZ2VEYXRhLnNjYWxlWCB8fCAxO1xuICAgICAgZGF0YS5zY2FsZVkgPSBpbWFnZURhdGEuc2NhbGVZIHx8IDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFNldCB0aGUgY3JvcHBlZCBhcmVhIHBvc2l0aW9uIGFuZCBzaXplIHdpdGggbmV3IGRhdGFcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBUaGUgbmV3IGRhdGEuXG4gICAqIEByZXR1cm5zIHtDcm9wcGVyfSB0aGlzXG4gICAqL1xuICBzZXREYXRhKGRhdGEpIHtcbiAgICBjb25zdCB7IG9wdGlvbnMsIGltYWdlRGF0YSwgY2FudmFzRGF0YSB9ID0gdGhpcztcbiAgICBjb25zdCBjcm9wQm94RGF0YSA9IHt9O1xuXG4gICAgaWYgKHRoaXMucmVhZHkgJiYgIXRoaXMuZGlzYWJsZWQgJiYgaXNQbGFpbk9iamVjdChkYXRhKSkge1xuICAgICAgbGV0IHRyYW5zZm9ybWVkID0gZmFsc2U7XG5cbiAgICAgIGlmIChvcHRpb25zLnJvdGF0YWJsZSkge1xuICAgICAgICBpZiAoaXNOdW1iZXIoZGF0YS5yb3RhdGUpICYmIGRhdGEucm90YXRlICE9PSBpbWFnZURhdGEucm90YXRlKSB7XG4gICAgICAgICAgaW1hZ2VEYXRhLnJvdGF0ZSA9IGRhdGEucm90YXRlO1xuICAgICAgICAgIHRyYW5zZm9ybWVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy5zY2FsYWJsZSkge1xuICAgICAgICBpZiAoaXNOdW1iZXIoZGF0YS5zY2FsZVgpICYmIGRhdGEuc2NhbGVYICE9PSBpbWFnZURhdGEuc2NhbGVYKSB7XG4gICAgICAgICAgaW1hZ2VEYXRhLnNjYWxlWCA9IGRhdGEuc2NhbGVYO1xuICAgICAgICAgIHRyYW5zZm9ybWVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc051bWJlcihkYXRhLnNjYWxlWSkgJiYgZGF0YS5zY2FsZVkgIT09IGltYWdlRGF0YS5zY2FsZVkpIHtcbiAgICAgICAgICBpbWFnZURhdGEuc2NhbGVZID0gZGF0YS5zY2FsZVk7XG4gICAgICAgICAgdHJhbnNmb3JtZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0cmFuc2Zvcm1lZCkge1xuICAgICAgICB0aGlzLnJlbmRlckNhbnZhcyh0cnVlLCB0cnVlKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmF0aW8gPSBpbWFnZURhdGEud2lkdGggLyBpbWFnZURhdGEubmF0dXJhbFdpZHRoO1xuXG4gICAgICBpZiAoaXNOdW1iZXIoZGF0YS54KSkge1xuICAgICAgICBjcm9wQm94RGF0YS5sZWZ0ID0gKGRhdGEueCAqIHJhdGlvKSArIGNhbnZhc0RhdGEubGVmdDtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzTnVtYmVyKGRhdGEueSkpIHtcbiAgICAgICAgY3JvcEJveERhdGEudG9wID0gKGRhdGEueSAqIHJhdGlvKSArIGNhbnZhc0RhdGEudG9wO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNOdW1iZXIoZGF0YS53aWR0aCkpIHtcbiAgICAgICAgY3JvcEJveERhdGEud2lkdGggPSBkYXRhLndpZHRoICogcmF0aW87XG4gICAgICB9XG5cbiAgICAgIGlmIChpc051bWJlcihkYXRhLmhlaWdodCkpIHtcbiAgICAgICAgY3JvcEJveERhdGEuaGVpZ2h0ID0gZGF0YS5oZWlnaHQgKiByYXRpbztcbiAgICAgIH1cblxuICAgICAgdGhpcy5zZXRDcm9wQm94RGF0YShjcm9wQm94RGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY29udGFpbmVyIHNpemUgZGF0YS5cbiAgICogQHJldHVybnMge09iamVjdH0gVGhlIHJlc3VsdCBjb250YWluZXIgZGF0YS5cbiAgICovXG4gIGdldENvbnRhaW5lckRhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVhZHkgPyBhc3NpZ24oe30sIHRoaXMuY29udGFpbmVyRGF0YSkgOiB7fTtcbiAgfSxcblxuICAvKipcbiAgICogR2V0IHRoZSBpbWFnZSBwb3NpdGlvbiBhbmQgc2l6ZSBkYXRhLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgcmVzdWx0IGltYWdlIGRhdGEuXG4gICAqL1xuICBnZXRJbWFnZURhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2l6ZWQgPyBhc3NpZ24oe30sIHRoaXMuaW1hZ2VEYXRhKSA6IHt9O1xuICB9LFxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGNhbnZhcyBwb3NpdGlvbiBhbmQgc2l6ZSBkYXRhLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgcmVzdWx0IGNhbnZhcyBkYXRhLlxuICAgKi9cbiAgZ2V0Q2FudmFzRGF0YSgpIHtcbiAgICBjb25zdCB7IGNhbnZhc0RhdGEgfSA9IHRoaXM7XG4gICAgY29uc3QgZGF0YSA9IHt9O1xuXG4gICAgaWYgKHRoaXMucmVhZHkpIHtcbiAgICAgIGZvckVhY2goW1xuICAgICAgICAnbGVmdCcsXG4gICAgICAgICd0b3AnLFxuICAgICAgICAnd2lkdGgnLFxuICAgICAgICAnaGVpZ2h0JyxcbiAgICAgICAgJ25hdHVyYWxXaWR0aCcsXG4gICAgICAgICduYXR1cmFsSGVpZ2h0JyxcbiAgICAgIF0sIChuKSA9PiB7XG4gICAgICAgIGRhdGFbbl0gPSBjYW52YXNEYXRhW25dO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFNldCB0aGUgY2FudmFzIHBvc2l0aW9uIGFuZCBzaXplIHdpdGggbmV3IGRhdGEuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gVGhlIG5ldyBjYW52YXMgZGF0YS5cbiAgICogQHJldHVybnMge0Nyb3BwZXJ9IHRoaXNcbiAgICovXG4gIHNldENhbnZhc0RhdGEoZGF0YSkge1xuICAgIGNvbnN0IHsgY2FudmFzRGF0YSB9ID0gdGhpcztcbiAgICBjb25zdCB7IGFzcGVjdFJhdGlvIH0gPSBjYW52YXNEYXRhO1xuXG4gICAgaWYgKHRoaXMucmVhZHkgJiYgIXRoaXMuZGlzYWJsZWQgJiYgaXNQbGFpbk9iamVjdChkYXRhKSkge1xuICAgICAgaWYgKGlzTnVtYmVyKGRhdGEubGVmdCkpIHtcbiAgICAgICAgY2FudmFzRGF0YS5sZWZ0ID0gZGF0YS5sZWZ0O1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNOdW1iZXIoZGF0YS50b3ApKSB7XG4gICAgICAgIGNhbnZhc0RhdGEudG9wID0gZGF0YS50b3A7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc051bWJlcihkYXRhLndpZHRoKSkge1xuICAgICAgICBjYW52YXNEYXRhLndpZHRoID0gZGF0YS53aWR0aDtcbiAgICAgICAgY2FudmFzRGF0YS5oZWlnaHQgPSBkYXRhLndpZHRoIC8gYXNwZWN0UmF0aW87XG4gICAgICB9IGVsc2UgaWYgKGlzTnVtYmVyKGRhdGEuaGVpZ2h0KSkge1xuICAgICAgICBjYW52YXNEYXRhLmhlaWdodCA9IGRhdGEuaGVpZ2h0O1xuICAgICAgICBjYW52YXNEYXRhLndpZHRoID0gZGF0YS5oZWlnaHQgKiBhc3BlY3RSYXRpbztcbiAgICAgIH1cblxuICAgICAgdGhpcy5yZW5kZXJDYW52YXModHJ1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY3JvcCBib3ggcG9zaXRpb24gYW5kIHNpemUgZGF0YS5cbiAgICogQHJldHVybnMge09iamVjdH0gVGhlIHJlc3VsdCBjcm9wIGJveCBkYXRhLlxuICAgKi9cbiAgZ2V0Q3JvcEJveERhdGEoKSB7XG4gICAgY29uc3QgeyBjcm9wQm94RGF0YSB9ID0gdGhpcztcbiAgICBsZXQgZGF0YTtcblxuICAgIGlmICh0aGlzLnJlYWR5ICYmIHRoaXMuY3JvcHBlZCkge1xuICAgICAgZGF0YSA9IHtcbiAgICAgICAgbGVmdDogY3JvcEJveERhdGEubGVmdCxcbiAgICAgICAgdG9wOiBjcm9wQm94RGF0YS50b3AsXG4gICAgICAgIHdpZHRoOiBjcm9wQm94RGF0YS53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBjcm9wQm94RGF0YS5oZWlnaHQsXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBkYXRhIHx8IHt9O1xuICB9LFxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGNyb3AgYm94IHBvc2l0aW9uIGFuZCBzaXplIHdpdGggbmV3IGRhdGEuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gVGhlIG5ldyBjcm9wIGJveCBkYXRhLlxuICAgKiBAcmV0dXJucyB7Q3JvcHBlcn0gdGhpc1xuICAgKi9cbiAgc2V0Q3JvcEJveERhdGEoZGF0YSkge1xuICAgIGNvbnN0IHsgY3JvcEJveERhdGEgfSA9IHRoaXM7XG4gICAgY29uc3QgeyBhc3BlY3RSYXRpbyB9ID0gdGhpcy5vcHRpb25zO1xuICAgIGxldCB3aWR0aENoYW5nZWQ7XG4gICAgbGV0IGhlaWdodENoYW5nZWQ7XG5cbiAgICBpZiAodGhpcy5yZWFkeSAmJiB0aGlzLmNyb3BwZWQgJiYgIXRoaXMuZGlzYWJsZWQgJiYgaXNQbGFpbk9iamVjdChkYXRhKSkge1xuICAgICAgaWYgKGlzTnVtYmVyKGRhdGEubGVmdCkpIHtcbiAgICAgICAgY3JvcEJveERhdGEubGVmdCA9IGRhdGEubGVmdDtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzTnVtYmVyKGRhdGEudG9wKSkge1xuICAgICAgICBjcm9wQm94RGF0YS50b3AgPSBkYXRhLnRvcDtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzTnVtYmVyKGRhdGEud2lkdGgpICYmIGRhdGEud2lkdGggIT09IGNyb3BCb3hEYXRhLndpZHRoKSB7XG4gICAgICAgIHdpZHRoQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgIGNyb3BCb3hEYXRhLndpZHRoID0gZGF0YS53aWR0aDtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzTnVtYmVyKGRhdGEuaGVpZ2h0KSAmJiBkYXRhLmhlaWdodCAhPT0gY3JvcEJveERhdGEuaGVpZ2h0KSB7XG4gICAgICAgIGhlaWdodENoYW5nZWQgPSB0cnVlO1xuICAgICAgICBjcm9wQm94RGF0YS5oZWlnaHQgPSBkYXRhLmhlaWdodDtcbiAgICAgIH1cblxuICAgICAgaWYgKGFzcGVjdFJhdGlvKSB7XG4gICAgICAgIGlmICh3aWR0aENoYW5nZWQpIHtcbiAgICAgICAgICBjcm9wQm94RGF0YS5oZWlnaHQgPSBjcm9wQm94RGF0YS53aWR0aCAvIGFzcGVjdFJhdGlvO1xuICAgICAgICB9IGVsc2UgaWYgKGhlaWdodENoYW5nZWQpIHtcbiAgICAgICAgICBjcm9wQm94RGF0YS53aWR0aCA9IGNyb3BCb3hEYXRhLmhlaWdodCAqIGFzcGVjdFJhdGlvO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVuZGVyQ3JvcEJveCgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIC8qKlxuICAgKiBHZXQgYSBjYW52YXMgZHJhd24gdGhlIGNyb3BwZWQgaW1hZ2UuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gLSBUaGUgY29uZmlnIG9wdGlvbnMuXG4gICAqIEByZXR1cm5zIHtIVE1MQ2FudmFzRWxlbWVudH0gLSBUaGUgcmVzdWx0IGNhbnZhcy5cbiAgICovXG4gIGdldENyb3BwZWRDYW52YXMob3B0aW9ucyA9IHt9KSB7XG4gICAgaWYgKCF0aGlzLnJlYWR5IHx8ICF3aW5kb3cuSFRNTENhbnZhc0VsZW1lbnQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHsgY2FudmFzRGF0YSB9ID0gdGhpcztcbiAgICBjb25zdCBzb3VyY2UgPSBnZXRTb3VyY2VDYW52YXModGhpcy5pbWFnZSwgdGhpcy5pbWFnZURhdGEsIGNhbnZhc0RhdGEsIG9wdGlvbnMpO1xuXG4gICAgLy8gUmV0dXJucyB0aGUgc291cmNlIGNhbnZhcyBpZiBpdCBpcyBub3QgY3JvcHBlZC5cbiAgICBpZiAoIXRoaXMuY3JvcHBlZCkge1xuICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICB9XG5cbiAgICBsZXQge1xuICAgICAgeDogaW5pdGlhbFgsXG4gICAgICB5OiBpbml0aWFsWSxcbiAgICAgIHdpZHRoOiBpbml0aWFsV2lkdGgsXG4gICAgICBoZWlnaHQ6IGluaXRpYWxIZWlnaHQsXG4gICAgfSA9IHRoaXMuZ2V0RGF0YSgpO1xuICAgIGNvbnN0IHJhdGlvID0gc291cmNlLndpZHRoIC8gTWF0aC5mbG9vcihjYW52YXNEYXRhLm5hdHVyYWxXaWR0aCk7XG5cbiAgICBpZiAocmF0aW8gIT09IDEpIHtcbiAgICAgIGluaXRpYWxYICo9IHJhdGlvO1xuICAgICAgaW5pdGlhbFkgKj0gcmF0aW87XG4gICAgICBpbml0aWFsV2lkdGggKj0gcmF0aW87XG4gICAgICBpbml0aWFsSGVpZ2h0ICo9IHJhdGlvO1xuICAgIH1cblxuICAgIGNvbnN0IGFzcGVjdFJhdGlvID0gaW5pdGlhbFdpZHRoIC8gaW5pdGlhbEhlaWdodDtcbiAgICBjb25zdCBtYXhTaXplcyA9IGdldEFkanVzdGVkU2l6ZXMoe1xuICAgICAgYXNwZWN0UmF0aW8sXG4gICAgICB3aWR0aDogb3B0aW9ucy5tYXhXaWR0aCB8fCBJbmZpbml0eSxcbiAgICAgIGhlaWdodDogb3B0aW9ucy5tYXhIZWlnaHQgfHwgSW5maW5pdHksXG4gICAgfSk7XG4gICAgY29uc3QgbWluU2l6ZXMgPSBnZXRBZGp1c3RlZFNpemVzKHtcbiAgICAgIGFzcGVjdFJhdGlvLFxuICAgICAgd2lkdGg6IG9wdGlvbnMubWluV2lkdGggfHwgMCxcbiAgICAgIGhlaWdodDogb3B0aW9ucy5taW5IZWlnaHQgfHwgMCxcbiAgICB9LCAnY292ZXInKTtcbiAgICBsZXQge1xuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgfSA9IGdldEFkanVzdGVkU2l6ZXMoe1xuICAgICAgYXNwZWN0UmF0aW8sXG4gICAgICB3aWR0aDogb3B0aW9ucy53aWR0aCB8fCAocmF0aW8gIT09IDEgPyBzb3VyY2Uud2lkdGggOiBpbml0aWFsV2lkdGgpLFxuICAgICAgaGVpZ2h0OiBvcHRpb25zLmhlaWdodCB8fCAocmF0aW8gIT09IDEgPyBzb3VyY2UuaGVpZ2h0IDogaW5pdGlhbEhlaWdodCksXG4gICAgfSk7XG5cbiAgICB3aWR0aCA9IE1hdGgubWluKG1heFNpemVzLndpZHRoLCBNYXRoLm1heChtaW5TaXplcy53aWR0aCwgd2lkdGgpKTtcbiAgICBoZWlnaHQgPSBNYXRoLm1pbihtYXhTaXplcy5oZWlnaHQsIE1hdGgubWF4KG1pblNpemVzLmhlaWdodCwgaGVpZ2h0KSk7XG5cbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICBjYW52YXMud2lkdGggPSBub3JtYWxpemVEZWNpbWFsTnVtYmVyKHdpZHRoKTtcbiAgICBjYW52YXMuaGVpZ2h0ID0gbm9ybWFsaXplRGVjaW1hbE51bWJlcihoZWlnaHQpO1xuXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBvcHRpb25zLmZpbGxDb2xvciB8fCAndHJhbnNwYXJlbnQnO1xuICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICBjb25zdCB7IGltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRydWUsIGltYWdlU21vb3RoaW5nUXVhbGl0eSB9ID0gb3B0aW9ucztcblxuICAgIGNvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gaW1hZ2VTbW9vdGhpbmdFbmFibGVkO1xuXG4gICAgaWYgKGltYWdlU21vb3RoaW5nUXVhbGl0eSkge1xuICAgICAgY29udGV4dC5pbWFnZVNtb290aGluZ1F1YWxpdHkgPSBpbWFnZVNtb290aGluZ1F1YWxpdHk7XG4gICAgfVxuXG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRC5kcmF3SW1hZ2VcbiAgICBjb25zdCBzb3VyY2VXaWR0aCA9IHNvdXJjZS53aWR0aDtcbiAgICBjb25zdCBzb3VyY2VIZWlnaHQgPSBzb3VyY2UuaGVpZ2h0O1xuXG4gICAgLy8gU291cmNlIGNhbnZhcyBwYXJhbWV0ZXJzXG4gICAgbGV0IHNyY1ggPSBpbml0aWFsWDtcbiAgICBsZXQgc3JjWSA9IGluaXRpYWxZO1xuICAgIGxldCBzcmNXaWR0aDtcbiAgICBsZXQgc3JjSGVpZ2h0O1xuXG4gICAgLy8gRGVzdGluYXRpb24gY2FudmFzIHBhcmFtZXRlcnNcbiAgICBsZXQgZHN0WDtcbiAgICBsZXQgZHN0WTtcbiAgICBsZXQgZHN0V2lkdGg7XG4gICAgbGV0IGRzdEhlaWdodDtcblxuICAgIGlmIChzcmNYIDw9IC1pbml0aWFsV2lkdGggfHwgc3JjWCA+IHNvdXJjZVdpZHRoKSB7XG4gICAgICBzcmNYID0gMDtcbiAgICAgIHNyY1dpZHRoID0gMDtcbiAgICAgIGRzdFggPSAwO1xuICAgICAgZHN0V2lkdGggPSAwO1xuICAgIH0gZWxzZSBpZiAoc3JjWCA8PSAwKSB7XG4gICAgICBkc3RYID0gLXNyY1g7XG4gICAgICBzcmNYID0gMDtcbiAgICAgIHNyY1dpZHRoID0gTWF0aC5taW4oc291cmNlV2lkdGgsIGluaXRpYWxXaWR0aCArIHNyY1gpO1xuICAgICAgZHN0V2lkdGggPSBzcmNXaWR0aDtcbiAgICB9IGVsc2UgaWYgKHNyY1ggPD0gc291cmNlV2lkdGgpIHtcbiAgICAgIGRzdFggPSAwO1xuICAgICAgc3JjV2lkdGggPSBNYXRoLm1pbihpbml0aWFsV2lkdGgsIHNvdXJjZVdpZHRoIC0gc3JjWCk7XG4gICAgICBkc3RXaWR0aCA9IHNyY1dpZHRoO1xuICAgIH1cblxuICAgIGlmIChzcmNXaWR0aCA8PSAwIHx8IHNyY1kgPD0gLWluaXRpYWxIZWlnaHQgfHwgc3JjWSA+IHNvdXJjZUhlaWdodCkge1xuICAgICAgc3JjWSA9IDA7XG4gICAgICBzcmNIZWlnaHQgPSAwO1xuICAgICAgZHN0WSA9IDA7XG4gICAgICBkc3RIZWlnaHQgPSAwO1xuICAgIH0gZWxzZSBpZiAoc3JjWSA8PSAwKSB7XG4gICAgICBkc3RZID0gLXNyY1k7XG4gICAgICBzcmNZID0gMDtcbiAgICAgIHNyY0hlaWdodCA9IE1hdGgubWluKHNvdXJjZUhlaWdodCwgaW5pdGlhbEhlaWdodCArIHNyY1kpO1xuICAgICAgZHN0SGVpZ2h0ID0gc3JjSGVpZ2h0O1xuICAgIH0gZWxzZSBpZiAoc3JjWSA8PSBzb3VyY2VIZWlnaHQpIHtcbiAgICAgIGRzdFkgPSAwO1xuICAgICAgc3JjSGVpZ2h0ID0gTWF0aC5taW4oaW5pdGlhbEhlaWdodCwgc291cmNlSGVpZ2h0IC0gc3JjWSk7XG4gICAgICBkc3RIZWlnaHQgPSBzcmNIZWlnaHQ7XG4gICAgfVxuXG4gICAgY29uc3QgcGFyYW1zID0gW1xuICAgICAgc3JjWCxcbiAgICAgIHNyY1ksXG4gICAgICBzcmNXaWR0aCxcbiAgICAgIHNyY0hlaWdodCxcbiAgICBdO1xuXG4gICAgLy8gQXZvaWQgXCJJbmRleFNpemVFcnJvclwiXG4gICAgaWYgKGRzdFdpZHRoID4gMCAmJiBkc3RIZWlnaHQgPiAwKSB7XG4gICAgICBjb25zdCBzY2FsZSA9IHdpZHRoIC8gaW5pdGlhbFdpZHRoO1xuXG4gICAgICBwYXJhbXMucHVzaChcbiAgICAgICAgZHN0WCAqIHNjYWxlLFxuICAgICAgICBkc3RZICogc2NhbGUsXG4gICAgICAgIGRzdFdpZHRoICogc2NhbGUsXG4gICAgICAgIGRzdEhlaWdodCAqIHNjYWxlLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBBbGwgdGhlIG51bWVyaWNhbCBwYXJhbWV0ZXJzIHNob3VsZCBiZSBpbnRlZ2VyIGZvciBgZHJhd0ltYWdlYFxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mZW5neXVhbmNoZW4vY3JvcHBlci9pc3N1ZXMvNDc2XG4gICAgY29udGV4dC5kcmF3SW1hZ2Uoc291cmNlLCAuLi5wYXJhbXMubWFwKHBhcmFtID0+IE1hdGguZmxvb3Iobm9ybWFsaXplRGVjaW1hbE51bWJlcihwYXJhbSkpKSk7XG5cbiAgICByZXR1cm4gY2FudmFzO1xuICB9LFxuXG4gIC8qKlxuICAgKiBDaGFuZ2UgdGhlIGFzcGVjdCByYXRpbyBvZiB0aGUgY3JvcCBib3guXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBhc3BlY3RSYXRpbyAtIFRoZSBuZXcgYXNwZWN0IHJhdGlvLlxuICAgKiBAcmV0dXJucyB7Q3JvcHBlcn0gdGhpc1xuICAgKi9cbiAgc2V0QXNwZWN0UmF0aW8oYXNwZWN0UmF0aW8pIHtcbiAgICBjb25zdCB7IG9wdGlvbnMgfSA9IHRoaXM7XG5cbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQgJiYgIWlzVW5kZWZpbmVkKGFzcGVjdFJhdGlvKSkge1xuICAgICAgLy8gMCAtPiBOYU5cbiAgICAgIG9wdGlvbnMuYXNwZWN0UmF0aW8gPSBNYXRoLm1heCgwLCBhc3BlY3RSYXRpbykgfHwgTmFOO1xuXG4gICAgICBpZiAodGhpcy5yZWFkeSkge1xuICAgICAgICB0aGlzLmluaXRDcm9wQm94KCk7XG5cbiAgICAgICAgaWYgKHRoaXMuY3JvcHBlZCkge1xuICAgICAgICAgIHRoaXMucmVuZGVyQ3JvcEJveCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLyoqXG4gICAqIENoYW5nZSB0aGUgZHJhZyBtb2RlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbW9kZSAtIFRoZSBuZXcgZHJhZyBtb2RlLlxuICAgKiBAcmV0dXJucyB7Q3JvcHBlcn0gdGhpc1xuICAgKi9cbiAgc2V0RHJhZ01vZGUobW9kZSkge1xuICAgIGNvbnN0IHsgb3B0aW9ucywgZHJhZ0JveCwgZmFjZSB9ID0gdGhpcztcblxuICAgIGlmICh0aGlzLnJlYWR5ICYmICF0aGlzLmRpc2FibGVkKSB7XG4gICAgICBjb25zdCBjcm9wcGFibGUgPSBtb2RlID09PSBEUkFHX01PREVfQ1JPUDtcbiAgICAgIGNvbnN0IG1vdmFibGUgPSBvcHRpb25zLm1vdmFibGUgJiYgbW9kZSA9PT0gRFJBR19NT0RFX01PVkU7XG5cbiAgICAgIG1vZGUgPSAoY3JvcHBhYmxlIHx8IG1vdmFibGUpID8gbW9kZSA6IERSQUdfTU9ERV9OT05FO1xuXG4gICAgICBvcHRpb25zLmRyYWdNb2RlID0gbW9kZTtcbiAgICAgIHNldERhdGEoZHJhZ0JveCwgREFUQV9BQ1RJT04sIG1vZGUpO1xuICAgICAgdG9nZ2xlQ2xhc3MoZHJhZ0JveCwgQ0xBU1NfQ1JPUCwgY3JvcHBhYmxlKTtcbiAgICAgIHRvZ2dsZUNsYXNzKGRyYWdCb3gsIENMQVNTX01PVkUsIG1vdmFibGUpO1xuXG4gICAgICBpZiAoIW9wdGlvbnMuY3JvcEJveE1vdmFibGUpIHtcbiAgICAgICAgLy8gU3luYyBkcmFnIG1vZGUgdG8gY3JvcCBib3ggd2hlbiBpdCBpcyBub3QgbW92YWJsZVxuICAgICAgICBzZXREYXRhKGZhY2UsIERBVEFfQUNUSU9OLCBtb2RlKTtcbiAgICAgICAgdG9nZ2xlQ2xhc3MoZmFjZSwgQ0xBU1NfQ1JPUCwgY3JvcHBhYmxlKTtcbiAgICAgICAgdG9nZ2xlQ2xhc3MoZmFjZSwgQ0xBU1NfTU9WRSwgbW92YWJsZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG59O1xuIiwiaW1wb3J0IHsgREFUQV9QUkVWSUVXIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHtcbiAgYXNzaWduLFxuICBmb3JFYWNoLFxuICBnZXREYXRhLFxuICBnZXRUcmFuc2Zvcm1zLFxuICByZW1vdmVEYXRhLFxuICBzZXREYXRhLFxuICBzZXRTdHlsZSxcbn0gZnJvbSAnLi91dGlsaXRpZXMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXRQcmV2aWV3KCkge1xuICAgIGNvbnN0IHsgY3Jvc3NPcmlnaW4gfSA9IHRoaXM7XG4gICAgY29uc3QgeyBwcmV2aWV3IH0gPSB0aGlzLm9wdGlvbnM7XG4gICAgY29uc3QgdXJsID0gY3Jvc3NPcmlnaW4gPyB0aGlzLmNyb3NzT3JpZ2luVXJsIDogdGhpcy51cmw7XG4gICAgY29uc3QgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgIGlmIChjcm9zc09yaWdpbikge1xuICAgICAgaW1hZ2UuY3Jvc3NPcmlnaW4gPSBjcm9zc09yaWdpbjtcbiAgICB9XG5cbiAgICBpbWFnZS5zcmMgPSB1cmw7XG4gICAgdGhpcy52aWV3Qm94LmFwcGVuZENoaWxkKGltYWdlKTtcbiAgICB0aGlzLnZpZXdCb3hJbWFnZSA9IGltYWdlO1xuXG4gICAgaWYgKCFwcmV2aWV3KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHByZXZpZXdzID0gcHJldmlldztcblxuICAgIGlmICh0eXBlb2YgcHJldmlldyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHByZXZpZXdzID0gdGhpcy5lbGVtZW50Lm93bmVyRG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChwcmV2aWV3KTtcbiAgICB9IGVsc2UgaWYgKHByZXZpZXcucXVlcnlTZWxlY3Rvcikge1xuICAgICAgcHJldmlld3MgPSBbcHJldmlld107XG4gICAgfVxuXG4gICAgdGhpcy5wcmV2aWV3cyA9IHByZXZpZXdzO1xuXG4gICAgZm9yRWFjaChwcmV2aWV3cywgKGVsKSA9PiB7XG4gICAgICBjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgICAgLy8gU2F2ZSB0aGUgb3JpZ2luYWwgc2l6ZSBmb3IgcmVjb3ZlclxuICAgICAgc2V0RGF0YShlbCwgREFUQV9QUkVWSUVXLCB7XG4gICAgICAgIHdpZHRoOiBlbC5vZmZzZXRXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBlbC5vZmZzZXRIZWlnaHQsXG4gICAgICAgIGh0bWw6IGVsLmlubmVySFRNTCxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoY3Jvc3NPcmlnaW4pIHtcbiAgICAgICAgaW1nLmNyb3NzT3JpZ2luID0gY3Jvc3NPcmlnaW47XG4gICAgICB9XG5cbiAgICAgIGltZy5zcmMgPSB1cmw7XG5cbiAgICAgIC8qKlxuICAgICAgICogT3ZlcnJpZGUgaW1nIGVsZW1lbnQgc3R5bGVzXG4gICAgICAgKiBBZGQgYGRpc3BsYXk6YmxvY2tgIHRvIGF2b2lkIG1hcmdpbiB0b3AgaXNzdWVcbiAgICAgICAqIEFkZCBgaGVpZ2h0OmF1dG9gIHRvIG92ZXJyaWRlIGBoZWlnaHRgIGF0dHJpYnV0ZSBvbiBJRThcbiAgICAgICAqIChPY2N1ciBvbmx5IHdoZW4gbWFyZ2luLXRvcCA8PSAtaGVpZ2h0KVxuICAgICAgICovXG4gICAgICBpbWcuc3R5bGUuY3NzVGV4dCA9IChcbiAgICAgICAgJ2Rpc3BsYXk6YmxvY2s7J1xuICAgICAgICArICd3aWR0aDoxMDAlOydcbiAgICAgICAgKyAnaGVpZ2h0OmF1dG87J1xuICAgICAgICArICdtaW4td2lkdGg6MCFpbXBvcnRhbnQ7J1xuICAgICAgICArICdtaW4taGVpZ2h0OjAhaW1wb3J0YW50OydcbiAgICAgICAgKyAnbWF4LXdpZHRoOm5vbmUhaW1wb3J0YW50OydcbiAgICAgICAgKyAnbWF4LWhlaWdodDpub25lIWltcG9ydGFudDsnXG4gICAgICAgICsgJ2ltYWdlLW9yaWVudGF0aW9uOjBkZWchaW1wb3J0YW50O1wiJ1xuICAgICAgKTtcblxuICAgICAgZWwuaW5uZXJIVE1MID0gJyc7XG4gICAgICBlbC5hcHBlbmRDaGlsZChpbWcpO1xuICAgIH0pO1xuICB9LFxuXG4gIHJlc2V0UHJldmlldygpIHtcbiAgICBmb3JFYWNoKHRoaXMucHJldmlld3MsIChlbGVtZW50KSA9PiB7XG4gICAgICBjb25zdCBkYXRhID0gZ2V0RGF0YShlbGVtZW50LCBEQVRBX1BSRVZJRVcpO1xuXG4gICAgICBzZXRTdHlsZShlbGVtZW50LCB7XG4gICAgICAgIHdpZHRoOiBkYXRhLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IGRhdGEuaGVpZ2h0LFxuICAgICAgfSk7XG5cbiAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gZGF0YS5odG1sO1xuICAgICAgcmVtb3ZlRGF0YShlbGVtZW50LCBEQVRBX1BSRVZJRVcpO1xuICAgIH0pO1xuICB9LFxuXG4gIHByZXZpZXcoKSB7XG4gICAgY29uc3QgeyBpbWFnZURhdGEsIGNhbnZhc0RhdGEsIGNyb3BCb3hEYXRhIH0gPSB0aGlzO1xuICAgIGNvbnN0IHsgd2lkdGg6IGNyb3BCb3hXaWR0aCwgaGVpZ2h0OiBjcm9wQm94SGVpZ2h0IH0gPSBjcm9wQm94RGF0YTtcbiAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IGltYWdlRGF0YTtcbiAgICBjb25zdCBsZWZ0ID0gY3JvcEJveERhdGEubGVmdCAtIGNhbnZhc0RhdGEubGVmdCAtIGltYWdlRGF0YS5sZWZ0O1xuICAgIGNvbnN0IHRvcCA9IGNyb3BCb3hEYXRhLnRvcCAtIGNhbnZhc0RhdGEudG9wIC0gaW1hZ2VEYXRhLnRvcDtcblxuICAgIGlmICghdGhpcy5jcm9wcGVkIHx8IHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRTdHlsZSh0aGlzLnZpZXdCb3hJbWFnZSwgYXNzaWduKHtcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgIH0sIGdldFRyYW5zZm9ybXMoYXNzaWduKHtcbiAgICAgIHRyYW5zbGF0ZVg6IC1sZWZ0LFxuICAgICAgdHJhbnNsYXRlWTogLXRvcCxcbiAgICB9LCBpbWFnZURhdGEpKSkpO1xuXG4gICAgZm9yRWFjaCh0aGlzLnByZXZpZXdzLCAoZWxlbWVudCkgPT4ge1xuICAgICAgY29uc3QgZGF0YSA9IGdldERhdGEoZWxlbWVudCwgREFUQV9QUkVWSUVXKTtcbiAgICAgIGNvbnN0IG9yaWdpbmFsV2lkdGggPSBkYXRhLndpZHRoO1xuICAgICAgY29uc3Qgb3JpZ2luYWxIZWlnaHQgPSBkYXRhLmhlaWdodDtcbiAgICAgIGxldCBuZXdXaWR0aCA9IG9yaWdpbmFsV2lkdGg7XG4gICAgICBsZXQgbmV3SGVpZ2h0ID0gb3JpZ2luYWxIZWlnaHQ7XG4gICAgICBsZXQgcmF0aW8gPSAxO1xuXG4gICAgICBpZiAoY3JvcEJveFdpZHRoKSB7XG4gICAgICAgIHJhdGlvID0gb3JpZ2luYWxXaWR0aCAvIGNyb3BCb3hXaWR0aDtcbiAgICAgICAgbmV3SGVpZ2h0ID0gY3JvcEJveEhlaWdodCAqIHJhdGlvO1xuICAgICAgfVxuXG4gICAgICBpZiAoY3JvcEJveEhlaWdodCAmJiBuZXdIZWlnaHQgPiBvcmlnaW5hbEhlaWdodCkge1xuICAgICAgICByYXRpbyA9IG9yaWdpbmFsSGVpZ2h0IC8gY3JvcEJveEhlaWdodDtcbiAgICAgICAgbmV3V2lkdGggPSBjcm9wQm94V2lkdGggKiByYXRpbztcbiAgICAgICAgbmV3SGVpZ2h0ID0gb3JpZ2luYWxIZWlnaHQ7XG4gICAgICB9XG5cbiAgICAgIHNldFN0eWxlKGVsZW1lbnQsIHtcbiAgICAgICAgd2lkdGg6IG5ld1dpZHRoLFxuICAgICAgICBoZWlnaHQ6IG5ld0hlaWdodCxcbiAgICAgIH0pO1xuXG4gICAgICBzZXRTdHlsZShlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKVswXSwgYXNzaWduKHtcbiAgICAgICAgd2lkdGg6IHdpZHRoICogcmF0aW8sXG4gICAgICAgIGhlaWdodDogaGVpZ2h0ICogcmF0aW8sXG4gICAgICB9LCBnZXRUcmFuc2Zvcm1zKGFzc2lnbih7XG4gICAgICAgIHRyYW5zbGF0ZVg6IC1sZWZ0ICogcmF0aW8sXG4gICAgICAgIHRyYW5zbGF0ZVk6IC10b3AgKiByYXRpbyxcbiAgICAgIH0sIGltYWdlRGF0YSkpKSk7XG4gICAgfSk7XG4gIH0sXG59O1xuIiwiaW1wb3J0IHtcbiAgQUNUSU9OX0FMTCxcbiAgQUNUSU9OX01PVkUsXG4gIENMQVNTX0hJRERFTixcbiAgREFUQV9BQ1RJT04sXG4gIEVWRU5UX0NST1AsXG59IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7XG4gIGFkZENsYXNzLFxuICBhc3NpZ24sXG4gIGRpc3BhdGNoRXZlbnQsXG4gIGdldEFkanVzdGVkU2l6ZXMsXG4gIGdldFJvdGF0ZWRTaXplcyxcbiAgZ2V0VHJhbnNmb3JtcyxcbiAgcmVtb3ZlQ2xhc3MsXG4gIHNldERhdGEsXG4gIHNldFN0eWxlLFxufSBmcm9tICcuL3V0aWxpdGllcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcmVuZGVyKCkge1xuICAgIHRoaXMuaW5pdENvbnRhaW5lcigpO1xuICAgIHRoaXMuaW5pdENhbnZhcygpO1xuICAgIHRoaXMuaW5pdENyb3BCb3goKTtcbiAgICB0aGlzLnJlbmRlckNhbnZhcygpO1xuXG4gICAgaWYgKHRoaXMuY3JvcHBlZCkge1xuICAgICAgdGhpcy5yZW5kZXJDcm9wQm94KCk7XG4gICAgfVxuICB9LFxuXG4gIGluaXRDb250YWluZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgZWxlbWVudCxcbiAgICAgIG9wdGlvbnMsXG4gICAgICBjb250YWluZXIsXG4gICAgICBjcm9wcGVyLFxuICAgIH0gPSB0aGlzO1xuXG4gICAgYWRkQ2xhc3MoY3JvcHBlciwgQ0xBU1NfSElEREVOKTtcbiAgICByZW1vdmVDbGFzcyhlbGVtZW50LCBDTEFTU19ISURERU4pO1xuXG4gICAgY29uc3QgY29udGFpbmVyRGF0YSA9IHtcbiAgICAgIHdpZHRoOiBNYXRoLm1heChcbiAgICAgICAgY29udGFpbmVyLm9mZnNldFdpZHRoLFxuICAgICAgICBOdW1iZXIob3B0aW9ucy5taW5Db250YWluZXJXaWR0aCkgfHwgMjAwLFxuICAgICAgKSxcbiAgICAgIGhlaWdodDogTWF0aC5tYXgoXG4gICAgICAgIGNvbnRhaW5lci5vZmZzZXRIZWlnaHQsXG4gICAgICAgIE51bWJlcihvcHRpb25zLm1pbkNvbnRhaW5lckhlaWdodCkgfHwgMTAwLFxuICAgICAgKSxcbiAgICB9O1xuXG4gICAgdGhpcy5jb250YWluZXJEYXRhID0gY29udGFpbmVyRGF0YTtcblxuICAgIHNldFN0eWxlKGNyb3BwZXIsIHtcbiAgICAgIHdpZHRoOiBjb250YWluZXJEYXRhLndpZHRoLFxuICAgICAgaGVpZ2h0OiBjb250YWluZXJEYXRhLmhlaWdodCxcbiAgICB9KTtcblxuICAgIGFkZENsYXNzKGVsZW1lbnQsIENMQVNTX0hJRERFTik7XG4gICAgcmVtb3ZlQ2xhc3MoY3JvcHBlciwgQ0xBU1NfSElEREVOKTtcbiAgfSxcblxuICAvLyBDYW52YXMgKGltYWdlIHdyYXBwZXIpXG4gIGluaXRDYW52YXMoKSB7XG4gICAgY29uc3QgeyBjb250YWluZXJEYXRhLCBpbWFnZURhdGEgfSA9IHRoaXM7XG4gICAgY29uc3QgeyB2aWV3TW9kZSB9ID0gdGhpcy5vcHRpb25zO1xuICAgIGNvbnN0IHJvdGF0ZWQgPSBNYXRoLmFicyhpbWFnZURhdGEucm90YXRlKSAlIDE4MCA9PT0gOTA7XG4gICAgY29uc3QgbmF0dXJhbFdpZHRoID0gcm90YXRlZCA/IGltYWdlRGF0YS5uYXR1cmFsSGVpZ2h0IDogaW1hZ2VEYXRhLm5hdHVyYWxXaWR0aDtcbiAgICBjb25zdCBuYXR1cmFsSGVpZ2h0ID0gcm90YXRlZCA/IGltYWdlRGF0YS5uYXR1cmFsV2lkdGggOiBpbWFnZURhdGEubmF0dXJhbEhlaWdodDtcbiAgICBjb25zdCBhc3BlY3RSYXRpbyA9IG5hdHVyYWxXaWR0aCAvIG5hdHVyYWxIZWlnaHQ7XG4gICAgbGV0IGNhbnZhc1dpZHRoID0gY29udGFpbmVyRGF0YS53aWR0aDtcbiAgICBsZXQgY2FudmFzSGVpZ2h0ID0gY29udGFpbmVyRGF0YS5oZWlnaHQ7XG5cbiAgICBpZiAoY29udGFpbmVyRGF0YS5oZWlnaHQgKiBhc3BlY3RSYXRpbyA+IGNvbnRhaW5lckRhdGEud2lkdGgpIHtcbiAgICAgIGlmICh2aWV3TW9kZSA9PT0gMykge1xuICAgICAgICBjYW52YXNXaWR0aCA9IGNvbnRhaW5lckRhdGEuaGVpZ2h0ICogYXNwZWN0UmF0aW87XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYW52YXNIZWlnaHQgPSBjb250YWluZXJEYXRhLndpZHRoIC8gYXNwZWN0UmF0aW87XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh2aWV3TW9kZSA9PT0gMykge1xuICAgICAgY2FudmFzSGVpZ2h0ID0gY29udGFpbmVyRGF0YS53aWR0aCAvIGFzcGVjdFJhdGlvO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYW52YXNXaWR0aCA9IGNvbnRhaW5lckRhdGEuaGVpZ2h0ICogYXNwZWN0UmF0aW87XG4gICAgfVxuXG4gICAgY29uc3QgY2FudmFzRGF0YSA9IHtcbiAgICAgIGFzcGVjdFJhdGlvLFxuICAgICAgbmF0dXJhbFdpZHRoLFxuICAgICAgbmF0dXJhbEhlaWdodCxcbiAgICAgIHdpZHRoOiBjYW52YXNXaWR0aCxcbiAgICAgIGhlaWdodDogY2FudmFzSGVpZ2h0LFxuICAgIH07XG5cbiAgICBjYW52YXNEYXRhLmxlZnQgPSAoY29udGFpbmVyRGF0YS53aWR0aCAtIGNhbnZhc1dpZHRoKSAvIDI7XG4gICAgY2FudmFzRGF0YS50b3AgPSAoY29udGFpbmVyRGF0YS5oZWlnaHQgLSBjYW52YXNIZWlnaHQpIC8gMjtcbiAgICBjYW52YXNEYXRhLm9sZExlZnQgPSBjYW52YXNEYXRhLmxlZnQ7XG4gICAgY2FudmFzRGF0YS5vbGRUb3AgPSBjYW52YXNEYXRhLnRvcDtcblxuICAgIHRoaXMuY2FudmFzRGF0YSA9IGNhbnZhc0RhdGE7XG4gICAgdGhpcy5saW1pdGVkID0gKHZpZXdNb2RlID09PSAxIHx8IHZpZXdNb2RlID09PSAyKTtcbiAgICB0aGlzLmxpbWl0Q2FudmFzKHRydWUsIHRydWUpO1xuICAgIHRoaXMuaW5pdGlhbEltYWdlRGF0YSA9IGFzc2lnbih7fSwgaW1hZ2VEYXRhKTtcbiAgICB0aGlzLmluaXRpYWxDYW52YXNEYXRhID0gYXNzaWduKHt9LCBjYW52YXNEYXRhKTtcbiAgfSxcblxuICBsaW1pdENhbnZhcyhzaXplTGltaXRlZCwgcG9zaXRpb25MaW1pdGVkKSB7XG4gICAgY29uc3Qge1xuICAgICAgb3B0aW9ucyxcbiAgICAgIGNvbnRhaW5lckRhdGEsXG4gICAgICBjYW52YXNEYXRhLFxuICAgICAgY3JvcEJveERhdGEsXG4gICAgfSA9IHRoaXM7XG4gICAgY29uc3QgeyB2aWV3TW9kZSB9ID0gb3B0aW9ucztcbiAgICBjb25zdCB7IGFzcGVjdFJhdGlvIH0gPSBjYW52YXNEYXRhO1xuICAgIGNvbnN0IGNyb3BwZWQgPSB0aGlzLmNyb3BwZWQgJiYgY3JvcEJveERhdGE7XG5cbiAgICBpZiAoc2l6ZUxpbWl0ZWQpIHtcbiAgICAgIGxldCBtaW5DYW52YXNXaWR0aCA9IE51bWJlcihvcHRpb25zLm1pbkNhbnZhc1dpZHRoKSB8fCAwO1xuICAgICAgbGV0IG1pbkNhbnZhc0hlaWdodCA9IE51bWJlcihvcHRpb25zLm1pbkNhbnZhc0hlaWdodCkgfHwgMDtcblxuICAgICAgaWYgKHZpZXdNb2RlID4gMSkge1xuICAgICAgICBtaW5DYW52YXNXaWR0aCA9IE1hdGgubWF4KG1pbkNhbnZhc1dpZHRoLCBjb250YWluZXJEYXRhLndpZHRoKTtcbiAgICAgICAgbWluQ2FudmFzSGVpZ2h0ID0gTWF0aC5tYXgobWluQ2FudmFzSGVpZ2h0LCBjb250YWluZXJEYXRhLmhlaWdodCk7XG5cbiAgICAgICAgaWYgKHZpZXdNb2RlID09PSAzKSB7XG4gICAgICAgICAgaWYgKG1pbkNhbnZhc0hlaWdodCAqIGFzcGVjdFJhdGlvID4gbWluQ2FudmFzV2lkdGgpIHtcbiAgICAgICAgICAgIG1pbkNhbnZhc1dpZHRoID0gbWluQ2FudmFzSGVpZ2h0ICogYXNwZWN0UmF0aW87XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1pbkNhbnZhc0hlaWdodCA9IG1pbkNhbnZhc1dpZHRoIC8gYXNwZWN0UmF0aW87XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHZpZXdNb2RlID4gMCkge1xuICAgICAgICBpZiAobWluQ2FudmFzV2lkdGgpIHtcbiAgICAgICAgICBtaW5DYW52YXNXaWR0aCA9IE1hdGgubWF4KFxuICAgICAgICAgICAgbWluQ2FudmFzV2lkdGgsXG4gICAgICAgICAgICBjcm9wcGVkID8gY3JvcEJveERhdGEud2lkdGggOiAwLFxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAobWluQ2FudmFzSGVpZ2h0KSB7XG4gICAgICAgICAgbWluQ2FudmFzSGVpZ2h0ID0gTWF0aC5tYXgoXG4gICAgICAgICAgICBtaW5DYW52YXNIZWlnaHQsXG4gICAgICAgICAgICBjcm9wcGVkID8gY3JvcEJveERhdGEuaGVpZ2h0IDogMCxcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKGNyb3BwZWQpIHtcbiAgICAgICAgICBtaW5DYW52YXNXaWR0aCA9IGNyb3BCb3hEYXRhLndpZHRoO1xuICAgICAgICAgIG1pbkNhbnZhc0hlaWdodCA9IGNyb3BCb3hEYXRhLmhlaWdodDtcblxuICAgICAgICAgIGlmIChtaW5DYW52YXNIZWlnaHQgKiBhc3BlY3RSYXRpbyA+IG1pbkNhbnZhc1dpZHRoKSB7XG4gICAgICAgICAgICBtaW5DYW52YXNXaWR0aCA9IG1pbkNhbnZhc0hlaWdodCAqIGFzcGVjdFJhdGlvO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtaW5DYW52YXNIZWlnaHQgPSBtaW5DYW52YXNXaWR0aCAvIGFzcGVjdFJhdGlvO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAoeyB3aWR0aDogbWluQ2FudmFzV2lkdGgsIGhlaWdodDogbWluQ2FudmFzSGVpZ2h0IH0gPSBnZXRBZGp1c3RlZFNpemVzKHtcbiAgICAgICAgYXNwZWN0UmF0aW8sXG4gICAgICAgIHdpZHRoOiBtaW5DYW52YXNXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBtaW5DYW52YXNIZWlnaHQsXG4gICAgICB9KSk7XG5cbiAgICAgIGNhbnZhc0RhdGEubWluV2lkdGggPSBtaW5DYW52YXNXaWR0aDtcbiAgICAgIGNhbnZhc0RhdGEubWluSGVpZ2h0ID0gbWluQ2FudmFzSGVpZ2h0O1xuICAgICAgY2FudmFzRGF0YS5tYXhXaWR0aCA9IEluZmluaXR5O1xuICAgICAgY2FudmFzRGF0YS5tYXhIZWlnaHQgPSBJbmZpbml0eTtcbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb25MaW1pdGVkKSB7XG4gICAgICBpZiAodmlld01vZGUgPiAoY3JvcHBlZCA/IDAgOiAxKSkge1xuICAgICAgICBjb25zdCBuZXdDYW52YXNMZWZ0ID0gY29udGFpbmVyRGF0YS53aWR0aCAtIGNhbnZhc0RhdGEud2lkdGg7XG4gICAgICAgIGNvbnN0IG5ld0NhbnZhc1RvcCA9IGNvbnRhaW5lckRhdGEuaGVpZ2h0IC0gY2FudmFzRGF0YS5oZWlnaHQ7XG5cbiAgICAgICAgY2FudmFzRGF0YS5taW5MZWZ0ID0gTWF0aC5taW4oMCwgbmV3Q2FudmFzTGVmdCk7XG4gICAgICAgIGNhbnZhc0RhdGEubWluVG9wID0gTWF0aC5taW4oMCwgbmV3Q2FudmFzVG9wKTtcbiAgICAgICAgY2FudmFzRGF0YS5tYXhMZWZ0ID0gTWF0aC5tYXgoMCwgbmV3Q2FudmFzTGVmdCk7XG4gICAgICAgIGNhbnZhc0RhdGEubWF4VG9wID0gTWF0aC5tYXgoMCwgbmV3Q2FudmFzVG9wKTtcblxuICAgICAgICBpZiAoY3JvcHBlZCAmJiB0aGlzLmxpbWl0ZWQpIHtcbiAgICAgICAgICBjYW52YXNEYXRhLm1pbkxlZnQgPSBNYXRoLm1pbihcbiAgICAgICAgICAgIGNyb3BCb3hEYXRhLmxlZnQsXG4gICAgICAgICAgICBjcm9wQm94RGF0YS5sZWZ0ICsgKGNyb3BCb3hEYXRhLndpZHRoIC0gY2FudmFzRGF0YS53aWR0aCksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjYW52YXNEYXRhLm1pblRvcCA9IE1hdGgubWluKFxuICAgICAgICAgICAgY3JvcEJveERhdGEudG9wLFxuICAgICAgICAgICAgY3JvcEJveERhdGEudG9wICsgKGNyb3BCb3hEYXRhLmhlaWdodCAtIGNhbnZhc0RhdGEuaGVpZ2h0KSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGNhbnZhc0RhdGEubWF4TGVmdCA9IGNyb3BCb3hEYXRhLmxlZnQ7XG4gICAgICAgICAgY2FudmFzRGF0YS5tYXhUb3AgPSBjcm9wQm94RGF0YS50b3A7XG5cbiAgICAgICAgICBpZiAodmlld01vZGUgPT09IDIpIHtcbiAgICAgICAgICAgIGlmIChjYW52YXNEYXRhLndpZHRoID49IGNvbnRhaW5lckRhdGEud2lkdGgpIHtcbiAgICAgICAgICAgICAgY2FudmFzRGF0YS5taW5MZWZ0ID0gTWF0aC5taW4oMCwgbmV3Q2FudmFzTGVmdCk7XG4gICAgICAgICAgICAgIGNhbnZhc0RhdGEubWF4TGVmdCA9IE1hdGgubWF4KDAsIG5ld0NhbnZhc0xlZnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY2FudmFzRGF0YS5oZWlnaHQgPj0gY29udGFpbmVyRGF0YS5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgY2FudmFzRGF0YS5taW5Ub3AgPSBNYXRoLm1pbigwLCBuZXdDYW52YXNUb3ApO1xuICAgICAgICAgICAgICBjYW52YXNEYXRhLm1heFRvcCA9IE1hdGgubWF4KDAsIG5ld0NhbnZhc1RvcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYW52YXNEYXRhLm1pbkxlZnQgPSAtY2FudmFzRGF0YS53aWR0aDtcbiAgICAgICAgY2FudmFzRGF0YS5taW5Ub3AgPSAtY2FudmFzRGF0YS5oZWlnaHQ7XG4gICAgICAgIGNhbnZhc0RhdGEubWF4TGVmdCA9IGNvbnRhaW5lckRhdGEud2lkdGg7XG4gICAgICAgIGNhbnZhc0RhdGEubWF4VG9wID0gY29udGFpbmVyRGF0YS5oZWlnaHQ7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHJlbmRlckNhbnZhcyhjaGFuZ2VkLCB0cmFuc2Zvcm1lZCkge1xuICAgIGNvbnN0IHsgY2FudmFzRGF0YSwgaW1hZ2VEYXRhIH0gPSB0aGlzO1xuXG4gICAgaWYgKHRyYW5zZm9ybWVkKSB7XG4gICAgICBjb25zdCB7IHdpZHRoOiBuYXR1cmFsV2lkdGgsIGhlaWdodDogbmF0dXJhbEhlaWdodCB9ID0gZ2V0Um90YXRlZFNpemVzKHtcbiAgICAgICAgd2lkdGg6IGltYWdlRGF0YS5uYXR1cmFsV2lkdGggKiBNYXRoLmFicyhpbWFnZURhdGEuc2NhbGVYIHx8IDEpLFxuICAgICAgICBoZWlnaHQ6IGltYWdlRGF0YS5uYXR1cmFsSGVpZ2h0ICogTWF0aC5hYnMoaW1hZ2VEYXRhLnNjYWxlWSB8fCAxKSxcbiAgICAgICAgZGVncmVlOiBpbWFnZURhdGEucm90YXRlIHx8IDAsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHdpZHRoID0gY2FudmFzRGF0YS53aWR0aCAqIChuYXR1cmFsV2lkdGggLyBjYW52YXNEYXRhLm5hdHVyYWxXaWR0aCk7XG4gICAgICBjb25zdCBoZWlnaHQgPSBjYW52YXNEYXRhLmhlaWdodCAqIChuYXR1cmFsSGVpZ2h0IC8gY2FudmFzRGF0YS5uYXR1cmFsSGVpZ2h0KTtcblxuICAgICAgY2FudmFzRGF0YS5sZWZ0IC09ICh3aWR0aCAtIGNhbnZhc0RhdGEud2lkdGgpIC8gMjtcbiAgICAgIGNhbnZhc0RhdGEudG9wIC09IChoZWlnaHQgLSBjYW52YXNEYXRhLmhlaWdodCkgLyAyO1xuICAgICAgY2FudmFzRGF0YS53aWR0aCA9IHdpZHRoO1xuICAgICAgY2FudmFzRGF0YS5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICBjYW52YXNEYXRhLmFzcGVjdFJhdGlvID0gbmF0dXJhbFdpZHRoIC8gbmF0dXJhbEhlaWdodDtcbiAgICAgIGNhbnZhc0RhdGEubmF0dXJhbFdpZHRoID0gbmF0dXJhbFdpZHRoO1xuICAgICAgY2FudmFzRGF0YS5uYXR1cmFsSGVpZ2h0ID0gbmF0dXJhbEhlaWdodDtcbiAgICAgIHRoaXMubGltaXRDYW52YXModHJ1ZSwgZmFsc2UpO1xuICAgIH1cblxuICAgIGlmIChjYW52YXNEYXRhLndpZHRoID4gY2FudmFzRGF0YS5tYXhXaWR0aFxuICAgICAgfHwgY2FudmFzRGF0YS53aWR0aCA8IGNhbnZhc0RhdGEubWluV2lkdGgpIHtcbiAgICAgIGNhbnZhc0RhdGEubGVmdCA9IGNhbnZhc0RhdGEub2xkTGVmdDtcbiAgICB9XG5cbiAgICBpZiAoY2FudmFzRGF0YS5oZWlnaHQgPiBjYW52YXNEYXRhLm1heEhlaWdodFxuICAgICAgfHwgY2FudmFzRGF0YS5oZWlnaHQgPCBjYW52YXNEYXRhLm1pbkhlaWdodCkge1xuICAgICAgY2FudmFzRGF0YS50b3AgPSBjYW52YXNEYXRhLm9sZFRvcDtcbiAgICB9XG5cbiAgICBjYW52YXNEYXRhLndpZHRoID0gTWF0aC5taW4oXG4gICAgICBNYXRoLm1heChjYW52YXNEYXRhLndpZHRoLCBjYW52YXNEYXRhLm1pbldpZHRoKSxcbiAgICAgIGNhbnZhc0RhdGEubWF4V2lkdGgsXG4gICAgKTtcbiAgICBjYW52YXNEYXRhLmhlaWdodCA9IE1hdGgubWluKFxuICAgICAgTWF0aC5tYXgoY2FudmFzRGF0YS5oZWlnaHQsIGNhbnZhc0RhdGEubWluSGVpZ2h0KSxcbiAgICAgIGNhbnZhc0RhdGEubWF4SGVpZ2h0LFxuICAgICk7XG5cbiAgICB0aGlzLmxpbWl0Q2FudmFzKGZhbHNlLCB0cnVlKTtcblxuICAgIGNhbnZhc0RhdGEubGVmdCA9IE1hdGgubWluKFxuICAgICAgTWF0aC5tYXgoY2FudmFzRGF0YS5sZWZ0LCBjYW52YXNEYXRhLm1pbkxlZnQpLFxuICAgICAgY2FudmFzRGF0YS5tYXhMZWZ0LFxuICAgICk7XG4gICAgY2FudmFzRGF0YS50b3AgPSBNYXRoLm1pbihcbiAgICAgIE1hdGgubWF4KGNhbnZhc0RhdGEudG9wLCBjYW52YXNEYXRhLm1pblRvcCksXG4gICAgICBjYW52YXNEYXRhLm1heFRvcCxcbiAgICApO1xuICAgIGNhbnZhc0RhdGEub2xkTGVmdCA9IGNhbnZhc0RhdGEubGVmdDtcbiAgICBjYW52YXNEYXRhLm9sZFRvcCA9IGNhbnZhc0RhdGEudG9wO1xuXG4gICAgc2V0U3R5bGUodGhpcy5jYW52YXMsIGFzc2lnbih7XG4gICAgICB3aWR0aDogY2FudmFzRGF0YS53aWR0aCxcbiAgICAgIGhlaWdodDogY2FudmFzRGF0YS5oZWlnaHQsXG4gICAgfSwgZ2V0VHJhbnNmb3Jtcyh7XG4gICAgICB0cmFuc2xhdGVYOiBjYW52YXNEYXRhLmxlZnQsXG4gICAgICB0cmFuc2xhdGVZOiBjYW52YXNEYXRhLnRvcCxcbiAgICB9KSkpO1xuXG4gICAgdGhpcy5yZW5kZXJJbWFnZShjaGFuZ2VkKTtcblxuICAgIGlmICh0aGlzLmNyb3BwZWQgJiYgdGhpcy5saW1pdGVkKSB7XG4gICAgICB0aGlzLmxpbWl0Q3JvcEJveCh0cnVlLCB0cnVlKTtcbiAgICB9XG4gIH0sXG5cbiAgcmVuZGVySW1hZ2UoY2hhbmdlZCkge1xuICAgIGNvbnN0IHsgY2FudmFzRGF0YSwgaW1hZ2VEYXRhIH0gPSB0aGlzO1xuICAgIGNvbnN0IHdpZHRoID0gaW1hZ2VEYXRhLm5hdHVyYWxXaWR0aCAqIChjYW52YXNEYXRhLndpZHRoIC8gY2FudmFzRGF0YS5uYXR1cmFsV2lkdGgpO1xuICAgIGNvbnN0IGhlaWdodCA9IGltYWdlRGF0YS5uYXR1cmFsSGVpZ2h0ICogKGNhbnZhc0RhdGEuaGVpZ2h0IC8gY2FudmFzRGF0YS5uYXR1cmFsSGVpZ2h0KTtcblxuICAgIGFzc2lnbihpbWFnZURhdGEsIHtcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgICAgbGVmdDogKGNhbnZhc0RhdGEud2lkdGggLSB3aWR0aCkgLyAyLFxuICAgICAgdG9wOiAoY2FudmFzRGF0YS5oZWlnaHQgLSBoZWlnaHQpIC8gMixcbiAgICB9KTtcbiAgICBzZXRTdHlsZSh0aGlzLmltYWdlLCBhc3NpZ24oe1xuICAgICAgd2lkdGg6IGltYWdlRGF0YS53aWR0aCxcbiAgICAgIGhlaWdodDogaW1hZ2VEYXRhLmhlaWdodCxcbiAgICB9LCBnZXRUcmFuc2Zvcm1zKGFzc2lnbih7XG4gICAgICB0cmFuc2xhdGVYOiBpbWFnZURhdGEubGVmdCxcbiAgICAgIHRyYW5zbGF0ZVk6IGltYWdlRGF0YS50b3AsXG4gICAgfSwgaW1hZ2VEYXRhKSkpKTtcblxuICAgIGlmIChjaGFuZ2VkKSB7XG4gICAgICB0aGlzLm91dHB1dCgpO1xuICAgIH1cbiAgfSxcblxuICBpbml0Q3JvcEJveCgpIHtcbiAgICBjb25zdCB7IG9wdGlvbnMsIGNhbnZhc0RhdGEgfSA9IHRoaXM7XG4gICAgY29uc3QgYXNwZWN0UmF0aW8gPSBvcHRpb25zLmFzcGVjdFJhdGlvIHx8IG9wdGlvbnMuaW5pdGlhbEFzcGVjdFJhdGlvO1xuICAgIGNvbnN0IGF1dG9Dcm9wQXJlYSA9IE51bWJlcihvcHRpb25zLmF1dG9Dcm9wQXJlYSkgfHwgMC44O1xuICAgIGNvbnN0IGNyb3BCb3hEYXRhID0ge1xuICAgICAgd2lkdGg6IGNhbnZhc0RhdGEud2lkdGgsXG4gICAgICBoZWlnaHQ6IGNhbnZhc0RhdGEuaGVpZ2h0LFxuICAgIH07XG5cbiAgICBpZiAoYXNwZWN0UmF0aW8pIHtcbiAgICAgIGlmIChjYW52YXNEYXRhLmhlaWdodCAqIGFzcGVjdFJhdGlvID4gY2FudmFzRGF0YS53aWR0aCkge1xuICAgICAgICBjcm9wQm94RGF0YS5oZWlnaHQgPSBjcm9wQm94RGF0YS53aWR0aCAvIGFzcGVjdFJhdGlvO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3JvcEJveERhdGEud2lkdGggPSBjcm9wQm94RGF0YS5oZWlnaHQgKiBhc3BlY3RSYXRpbztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmNyb3BCb3hEYXRhID0gY3JvcEJveERhdGE7XG4gICAgdGhpcy5saW1pdENyb3BCb3godHJ1ZSwgdHJ1ZSk7XG5cbiAgICAvLyBJbml0aWFsaXplIGF1dG8gY3JvcCBhcmVhXG4gICAgY3JvcEJveERhdGEud2lkdGggPSBNYXRoLm1pbihcbiAgICAgIE1hdGgubWF4KGNyb3BCb3hEYXRhLndpZHRoLCBjcm9wQm94RGF0YS5taW5XaWR0aCksXG4gICAgICBjcm9wQm94RGF0YS5tYXhXaWR0aCxcbiAgICApO1xuICAgIGNyb3BCb3hEYXRhLmhlaWdodCA9IE1hdGgubWluKFxuICAgICAgTWF0aC5tYXgoY3JvcEJveERhdGEuaGVpZ2h0LCBjcm9wQm94RGF0YS5taW5IZWlnaHQpLFxuICAgICAgY3JvcEJveERhdGEubWF4SGVpZ2h0LFxuICAgICk7XG5cbiAgICAvLyBUaGUgd2lkdGgvaGVpZ2h0IG9mIGF1dG8gY3JvcCBhcmVhIG11c3QgbGFyZ2UgdGhhbiBcIm1pbldpZHRoL0hlaWdodFwiXG4gICAgY3JvcEJveERhdGEud2lkdGggPSBNYXRoLm1heChcbiAgICAgIGNyb3BCb3hEYXRhLm1pbldpZHRoLFxuICAgICAgY3JvcEJveERhdGEud2lkdGggKiBhdXRvQ3JvcEFyZWEsXG4gICAgKTtcbiAgICBjcm9wQm94RGF0YS5oZWlnaHQgPSBNYXRoLm1heChcbiAgICAgIGNyb3BCb3hEYXRhLm1pbkhlaWdodCxcbiAgICAgIGNyb3BCb3hEYXRhLmhlaWdodCAqIGF1dG9Dcm9wQXJlYSxcbiAgICApO1xuICAgIGNyb3BCb3hEYXRhLmxlZnQgPSAoXG4gICAgICBjYW52YXNEYXRhLmxlZnQgKyAoKGNhbnZhc0RhdGEud2lkdGggLSBjcm9wQm94RGF0YS53aWR0aCkgLyAyKVxuICAgICk7XG4gICAgY3JvcEJveERhdGEudG9wID0gKFxuICAgICAgY2FudmFzRGF0YS50b3AgKyAoKGNhbnZhc0RhdGEuaGVpZ2h0IC0gY3JvcEJveERhdGEuaGVpZ2h0KSAvIDIpXG4gICAgKTtcbiAgICBjcm9wQm94RGF0YS5vbGRMZWZ0ID0gY3JvcEJveERhdGEubGVmdDtcbiAgICBjcm9wQm94RGF0YS5vbGRUb3AgPSBjcm9wQm94RGF0YS50b3A7XG5cbiAgICB0aGlzLmluaXRpYWxDcm9wQm94RGF0YSA9IGFzc2lnbih7fSwgY3JvcEJveERhdGEpO1xuICB9LFxuXG4gIGxpbWl0Q3JvcEJveChzaXplTGltaXRlZCwgcG9zaXRpb25MaW1pdGVkKSB7XG4gICAgY29uc3Qge1xuICAgICAgb3B0aW9ucyxcbiAgICAgIGNvbnRhaW5lckRhdGEsXG4gICAgICBjYW52YXNEYXRhLFxuICAgICAgY3JvcEJveERhdGEsXG4gICAgICBsaW1pdGVkLFxuICAgIH0gPSB0aGlzO1xuICAgIGNvbnN0IHsgYXNwZWN0UmF0aW8gfSA9IG9wdGlvbnM7XG5cbiAgICBpZiAoc2l6ZUxpbWl0ZWQpIHtcbiAgICAgIGxldCBtaW5Dcm9wQm94V2lkdGggPSBOdW1iZXIob3B0aW9ucy5taW5Dcm9wQm94V2lkdGgpIHx8IDA7XG4gICAgICBsZXQgbWluQ3JvcEJveEhlaWdodCA9IE51bWJlcihvcHRpb25zLm1pbkNyb3BCb3hIZWlnaHQpIHx8IDA7XG4gICAgICBsZXQgbWF4Q3JvcEJveFdpZHRoID0gbGltaXRlZCA/IE1hdGgubWluKFxuICAgICAgICBjb250YWluZXJEYXRhLndpZHRoLFxuICAgICAgICBjYW52YXNEYXRhLndpZHRoLFxuICAgICAgICBjYW52YXNEYXRhLndpZHRoICsgY2FudmFzRGF0YS5sZWZ0LFxuICAgICAgICBjb250YWluZXJEYXRhLndpZHRoIC0gY2FudmFzRGF0YS5sZWZ0LFxuICAgICAgKSA6IGNvbnRhaW5lckRhdGEud2lkdGg7XG4gICAgICBsZXQgbWF4Q3JvcEJveEhlaWdodCA9IGxpbWl0ZWQgPyBNYXRoLm1pbihcbiAgICAgICAgY29udGFpbmVyRGF0YS5oZWlnaHQsXG4gICAgICAgIGNhbnZhc0RhdGEuaGVpZ2h0LFxuICAgICAgICBjYW52YXNEYXRhLmhlaWdodCArIGNhbnZhc0RhdGEudG9wLFxuICAgICAgICBjb250YWluZXJEYXRhLmhlaWdodCAtIGNhbnZhc0RhdGEudG9wLFxuICAgICAgKSA6IGNvbnRhaW5lckRhdGEuaGVpZ2h0O1xuXG4gICAgICAvLyBUaGUgbWluL21heENyb3BCb3hXaWR0aC9IZWlnaHQgbXVzdCBiZSBsZXNzIHRoYW4gY29udGFpbmVyJ3Mgd2lkdGgvaGVpZ2h0XG4gICAgICBtaW5Dcm9wQm94V2lkdGggPSBNYXRoLm1pbihtaW5Dcm9wQm94V2lkdGgsIGNvbnRhaW5lckRhdGEud2lkdGgpO1xuICAgICAgbWluQ3JvcEJveEhlaWdodCA9IE1hdGgubWluKG1pbkNyb3BCb3hIZWlnaHQsIGNvbnRhaW5lckRhdGEuaGVpZ2h0KTtcblxuICAgICAgaWYgKGFzcGVjdFJhdGlvKSB7XG4gICAgICAgIGlmIChtaW5Dcm9wQm94V2lkdGggJiYgbWluQ3JvcEJveEhlaWdodCkge1xuICAgICAgICAgIGlmIChtaW5Dcm9wQm94SGVpZ2h0ICogYXNwZWN0UmF0aW8gPiBtaW5Dcm9wQm94V2lkdGgpIHtcbiAgICAgICAgICAgIG1pbkNyb3BCb3hIZWlnaHQgPSBtaW5Dcm9wQm94V2lkdGggLyBhc3BlY3RSYXRpbztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWluQ3JvcEJveFdpZHRoID0gbWluQ3JvcEJveEhlaWdodCAqIGFzcGVjdFJhdGlvO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChtaW5Dcm9wQm94V2lkdGgpIHtcbiAgICAgICAgICBtaW5Dcm9wQm94SGVpZ2h0ID0gbWluQ3JvcEJveFdpZHRoIC8gYXNwZWN0UmF0aW87XG4gICAgICAgIH0gZWxzZSBpZiAobWluQ3JvcEJveEhlaWdodCkge1xuICAgICAgICAgIG1pbkNyb3BCb3hXaWR0aCA9IG1pbkNyb3BCb3hIZWlnaHQgKiBhc3BlY3RSYXRpbztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtYXhDcm9wQm94SGVpZ2h0ICogYXNwZWN0UmF0aW8gPiBtYXhDcm9wQm94V2lkdGgpIHtcbiAgICAgICAgICBtYXhDcm9wQm94SGVpZ2h0ID0gbWF4Q3JvcEJveFdpZHRoIC8gYXNwZWN0UmF0aW87XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWF4Q3JvcEJveFdpZHRoID0gbWF4Q3JvcEJveEhlaWdodCAqIGFzcGVjdFJhdGlvO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBtaW5XaWR0aC9IZWlnaHQgbXVzdCBiZSBsZXNzIHRoYW4gbWF4V2lkdGgvSGVpZ2h0XG4gICAgICBjcm9wQm94RGF0YS5taW5XaWR0aCA9IE1hdGgubWluKG1pbkNyb3BCb3hXaWR0aCwgbWF4Q3JvcEJveFdpZHRoKTtcbiAgICAgIGNyb3BCb3hEYXRhLm1pbkhlaWdodCA9IE1hdGgubWluKG1pbkNyb3BCb3hIZWlnaHQsIG1heENyb3BCb3hIZWlnaHQpO1xuICAgICAgY3JvcEJveERhdGEubWF4V2lkdGggPSBtYXhDcm9wQm94V2lkdGg7XG4gICAgICBjcm9wQm94RGF0YS5tYXhIZWlnaHQgPSBtYXhDcm9wQm94SGVpZ2h0O1xuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbkxpbWl0ZWQpIHtcbiAgICAgIGlmIChsaW1pdGVkKSB7XG4gICAgICAgIGNyb3BCb3hEYXRhLm1pbkxlZnQgPSBNYXRoLm1heCgwLCBjYW52YXNEYXRhLmxlZnQpO1xuICAgICAgICBjcm9wQm94RGF0YS5taW5Ub3AgPSBNYXRoLm1heCgwLCBjYW52YXNEYXRhLnRvcCk7XG4gICAgICAgIGNyb3BCb3hEYXRhLm1heExlZnQgPSBNYXRoLm1pbihcbiAgICAgICAgICBjb250YWluZXJEYXRhLndpZHRoLFxuICAgICAgICAgIGNhbnZhc0RhdGEubGVmdCArIGNhbnZhc0RhdGEud2lkdGgsXG4gICAgICAgICkgLSBjcm9wQm94RGF0YS53aWR0aDtcbiAgICAgICAgY3JvcEJveERhdGEubWF4VG9wID0gTWF0aC5taW4oXG4gICAgICAgICAgY29udGFpbmVyRGF0YS5oZWlnaHQsXG4gICAgICAgICAgY2FudmFzRGF0YS50b3AgKyBjYW52YXNEYXRhLmhlaWdodCxcbiAgICAgICAgKSAtIGNyb3BCb3hEYXRhLmhlaWdodDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNyb3BCb3hEYXRhLm1pbkxlZnQgPSAwO1xuICAgICAgICBjcm9wQm94RGF0YS5taW5Ub3AgPSAwO1xuICAgICAgICBjcm9wQm94RGF0YS5tYXhMZWZ0ID0gY29udGFpbmVyRGF0YS53aWR0aCAtIGNyb3BCb3hEYXRhLndpZHRoO1xuICAgICAgICBjcm9wQm94RGF0YS5tYXhUb3AgPSBjb250YWluZXJEYXRhLmhlaWdodCAtIGNyb3BCb3hEYXRhLmhlaWdodDtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgcmVuZGVyQ3JvcEJveCgpIHtcbiAgICBjb25zdCB7IG9wdGlvbnMsIGNvbnRhaW5lckRhdGEsIGNyb3BCb3hEYXRhIH0gPSB0aGlzO1xuXG4gICAgaWYgKGNyb3BCb3hEYXRhLndpZHRoID4gY3JvcEJveERhdGEubWF4V2lkdGhcbiAgICAgIHx8IGNyb3BCb3hEYXRhLndpZHRoIDwgY3JvcEJveERhdGEubWluV2lkdGgpIHtcbiAgICAgIGNyb3BCb3hEYXRhLmxlZnQgPSBjcm9wQm94RGF0YS5vbGRMZWZ0O1xuICAgIH1cblxuICAgIGlmIChjcm9wQm94RGF0YS5oZWlnaHQgPiBjcm9wQm94RGF0YS5tYXhIZWlnaHRcbiAgICAgIHx8IGNyb3BCb3hEYXRhLmhlaWdodCA8IGNyb3BCb3hEYXRhLm1pbkhlaWdodCkge1xuICAgICAgY3JvcEJveERhdGEudG9wID0gY3JvcEJveERhdGEub2xkVG9wO1xuICAgIH1cblxuICAgIGNyb3BCb3hEYXRhLndpZHRoID0gTWF0aC5taW4oXG4gICAgICBNYXRoLm1heChjcm9wQm94RGF0YS53aWR0aCwgY3JvcEJveERhdGEubWluV2lkdGgpLFxuICAgICAgY3JvcEJveERhdGEubWF4V2lkdGgsXG4gICAgKTtcbiAgICBjcm9wQm94RGF0YS5oZWlnaHQgPSBNYXRoLm1pbihcbiAgICAgIE1hdGgubWF4KGNyb3BCb3hEYXRhLmhlaWdodCwgY3JvcEJveERhdGEubWluSGVpZ2h0KSxcbiAgICAgIGNyb3BCb3hEYXRhLm1heEhlaWdodCxcbiAgICApO1xuXG4gICAgdGhpcy5saW1pdENyb3BCb3goZmFsc2UsIHRydWUpO1xuXG4gICAgY3JvcEJveERhdGEubGVmdCA9IE1hdGgubWluKFxuICAgICAgTWF0aC5tYXgoY3JvcEJveERhdGEubGVmdCwgY3JvcEJveERhdGEubWluTGVmdCksXG4gICAgICBjcm9wQm94RGF0YS5tYXhMZWZ0LFxuICAgICk7XG4gICAgY3JvcEJveERhdGEudG9wID0gTWF0aC5taW4oXG4gICAgICBNYXRoLm1heChjcm9wQm94RGF0YS50b3AsIGNyb3BCb3hEYXRhLm1pblRvcCksXG4gICAgICBjcm9wQm94RGF0YS5tYXhUb3AsXG4gICAgKTtcbiAgICBjcm9wQm94RGF0YS5vbGRMZWZ0ID0gY3JvcEJveERhdGEubGVmdDtcbiAgICBjcm9wQm94RGF0YS5vbGRUb3AgPSBjcm9wQm94RGF0YS50b3A7XG5cbiAgICBpZiAob3B0aW9ucy5tb3ZhYmxlICYmIG9wdGlvbnMuY3JvcEJveE1vdmFibGUpIHtcbiAgICAgIC8vIFR1cm4gdG8gbW92ZSB0aGUgY2FudmFzIHdoZW4gdGhlIGNyb3AgYm94IGlzIGVxdWFsIHRvIHRoZSBjb250YWluZXJcbiAgICAgIHNldERhdGEodGhpcy5mYWNlLCBEQVRBX0FDVElPTiwgY3JvcEJveERhdGEud2lkdGggPj0gY29udGFpbmVyRGF0YS53aWR0aFxuICAgICAgICAmJiBjcm9wQm94RGF0YS5oZWlnaHQgPj0gY29udGFpbmVyRGF0YS5oZWlnaHQgPyBBQ1RJT05fTU9WRSA6IEFDVElPTl9BTEwpO1xuICAgIH1cblxuICAgIHNldFN0eWxlKHRoaXMuY3JvcEJveCwgYXNzaWduKHtcbiAgICAgIHdpZHRoOiBjcm9wQm94RGF0YS53aWR0aCxcbiAgICAgIGhlaWdodDogY3JvcEJveERhdGEuaGVpZ2h0LFxuICAgIH0sIGdldFRyYW5zZm9ybXMoe1xuICAgICAgdHJhbnNsYXRlWDogY3JvcEJveERhdGEubGVmdCxcbiAgICAgIHRyYW5zbGF0ZVk6IGNyb3BCb3hEYXRhLnRvcCxcbiAgICB9KSkpO1xuXG4gICAgaWYgKHRoaXMuY3JvcHBlZCAmJiB0aGlzLmxpbWl0ZWQpIHtcbiAgICAgIHRoaXMubGltaXRDYW52YXModHJ1ZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLm91dHB1dCgpO1xuICAgIH1cbiAgfSxcblxuICBvdXRwdXQoKSB7XG4gICAgdGhpcy5wcmV2aWV3KCk7XG4gICAgZGlzcGF0Y2hFdmVudCh0aGlzLmVsZW1lbnQsIEVWRU5UX0NST1AsIHRoaXMuZ2V0RGF0YSgpKTtcbiAgfSxcbn07XG4iLCJleHBvcnQgZGVmYXVsdCAoXG4gICc8ZGl2IGNsYXNzPVwiY3JvcHBlci1jb250YWluZXJcIiB0b3VjaC1hY3Rpb249XCJub25lXCI+J1xuICAgICsgJzxkaXYgY2xhc3M9XCJjcm9wcGVyLXdyYXAtYm94XCI+J1xuICAgICAgKyAnPGRpdiBjbGFzcz1cImNyb3BwZXItY2FudmFzXCI+PC9kaXY+J1xuICAgICsgJzwvZGl2PidcbiAgICArICc8ZGl2IGNsYXNzPVwiY3JvcHBlci1kcmFnLWJveFwiPjwvZGl2PidcbiAgICArICc8ZGl2IGNsYXNzPVwiY3JvcHBlci1jcm9wLWJveFwiPidcbiAgICAgICsgJzxzcGFuIGNsYXNzPVwiY3JvcHBlci12aWV3LWJveFwiPjwvc3Bhbj4nXG4gICAgICArICc8c3BhbiBjbGFzcz1cImNyb3BwZXItZGFzaGVkIGRhc2hlZC1oXCI+PC9zcGFuPidcbiAgICAgICsgJzxzcGFuIGNsYXNzPVwiY3JvcHBlci1kYXNoZWQgZGFzaGVkLXZcIj48L3NwYW4+J1xuICAgICAgKyAnPHNwYW4gY2xhc3M9XCJjcm9wcGVyLWNlbnRlclwiPjwvc3Bhbj4nXG4gICAgICArICc8c3BhbiBjbGFzcz1cImNyb3BwZXItZmFjZVwiPjwvc3Bhbj4nXG4gICAgICArICc8c3BhbiBjbGFzcz1cImNyb3BwZXItbGluZSBsaW5lLWVcIiBkYXRhLWNyb3BwZXItYWN0aW9uPVwiZVwiPjwvc3Bhbj4nXG4gICAgICArICc8c3BhbiBjbGFzcz1cImNyb3BwZXItbGluZSBsaW5lLW5cIiBkYXRhLWNyb3BwZXItYWN0aW9uPVwiblwiPjwvc3Bhbj4nXG4gICAgICArICc8c3BhbiBjbGFzcz1cImNyb3BwZXItbGluZSBsaW5lLXdcIiBkYXRhLWNyb3BwZXItYWN0aW9uPVwid1wiPjwvc3Bhbj4nXG4gICAgICArICc8c3BhbiBjbGFzcz1cImNyb3BwZXItbGluZSBsaW5lLXNcIiBkYXRhLWNyb3BwZXItYWN0aW9uPVwic1wiPjwvc3Bhbj4nXG4gICAgICArICc8c3BhbiBjbGFzcz1cImNyb3BwZXItcG9pbnQgcG9pbnQtZVwiIGRhdGEtY3JvcHBlci1hY3Rpb249XCJlXCI+PC9zcGFuPidcbiAgICAgICsgJzxzcGFuIGNsYXNzPVwiY3JvcHBlci1wb2ludCBwb2ludC1uXCIgZGF0YS1jcm9wcGVyLWFjdGlvbj1cIm5cIj48L3NwYW4+J1xuICAgICAgKyAnPHNwYW4gY2xhc3M9XCJjcm9wcGVyLXBvaW50IHBvaW50LXdcIiBkYXRhLWNyb3BwZXItYWN0aW9uPVwid1wiPjwvc3Bhbj4nXG4gICAgICArICc8c3BhbiBjbGFzcz1cImNyb3BwZXItcG9pbnQgcG9pbnQtc1wiIGRhdGEtY3JvcHBlci1hY3Rpb249XCJzXCI+PC9zcGFuPidcbiAgICAgICsgJzxzcGFuIGNsYXNzPVwiY3JvcHBlci1wb2ludCBwb2ludC1uZVwiIGRhdGEtY3JvcHBlci1hY3Rpb249XCJuZVwiPjwvc3Bhbj4nXG4gICAgICArICc8c3BhbiBjbGFzcz1cImNyb3BwZXItcG9pbnQgcG9pbnQtbndcIiBkYXRhLWNyb3BwZXItYWN0aW9uPVwibndcIj48L3NwYW4+J1xuICAgICAgKyAnPHNwYW4gY2xhc3M9XCJjcm9wcGVyLXBvaW50IHBvaW50LXN3XCIgZGF0YS1jcm9wcGVyLWFjdGlvbj1cInN3XCI+PC9zcGFuPidcbiAgICAgICsgJzxzcGFuIGNsYXNzPVwiY3JvcHBlci1wb2ludCBwb2ludC1zZVwiIGRhdGEtY3JvcHBlci1hY3Rpb249XCJzZVwiPjwvc3Bhbj4nXG4gICAgKyAnPC9kaXY+J1xuICArICc8L2Rpdj4nXG4pO1xuIiwiaW1wb3J0IHsgSVNfQlJPV1NFUiwgV0lORE9XIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vKipcbiAqIENoZWNrIGlmIHRoZSBnaXZlbiB2YWx1ZSBpcyBub3QgYSBudW1iZXIuXG4gKi9cbmV4cG9ydCBjb25zdCBpc05hTiA9IE51bWJlci5pc05hTiB8fCBXSU5ET1cuaXNOYU47XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlIGdpdmVuIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQHBhcmFtIHsqfSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgYSBudW1iZXIsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmICFpc05hTih2YWx1ZSk7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlIGdpdmVuIHZhbHVlIGlzIGEgcG9zaXRpdmUgbnVtYmVyLlxuICogQHBhcmFtIHsqfSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgYSBwb3NpdGl2ZSBudW1iZXIsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzUG9zaXRpdmVOdW1iZXIgPSB2YWx1ZSA9PiB2YWx1ZSA+IDAgJiYgdmFsdWUgPCBJbmZpbml0eTtcblxuLyoqXG4gKiBDaGVjayBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgdW5kZWZpbmVkLlxuICogQHBhcmFtIHsqfSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgdW5kZWZpbmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJztcbn1cblxuLyoqXG4gKiBDaGVjayBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgYW4gb2JqZWN0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAhPT0gbnVsbDtcbn1cblxuY29uc3QgeyBoYXNPd25Qcm9wZXJ0eSB9ID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBDaGVjayBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgYSBwbGFpbiBvYmplY3QuXG4gKiBAcGFyYW0geyp9IHZhbHVlIC0gVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBnaXZlbiB2YWx1ZSBpcyBhIHBsYWluIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgeyBjb25zdHJ1Y3RvciB9ID0gdmFsdWU7XG4gICAgY29uc3QgeyBwcm90b3R5cGUgfSA9IGNvbnN0cnVjdG9yO1xuXG4gICAgcmV0dXJuIGNvbnN0cnVjdG9yICYmIHByb3RvdHlwZSAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3RvdHlwZSwgJ2lzUHJvdG90eXBlT2YnKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLyoqXG4gKiBDaGVjayBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgYSBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGdpdmVuIHZhbHVlIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuY29uc3QgeyBzbGljZSB9ID0gQXJyYXkucHJvdG90eXBlO1xuXG4vKipcbiAqIENvbnZlcnQgYXJyYXktbGlrZSBvciBpdGVyYWJsZSBvYmplY3QgdG8gYW4gYXJyYXkuXG4gKiBAcGFyYW0geyp9IHZhbHVlIC0gVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYSBuZXcgYXJyYXkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0FycmF5KHZhbHVlKSB7XG4gIHJldHVybiBBcnJheS5mcm9tID8gQXJyYXkuZnJvbSh2YWx1ZSkgOiBzbGljZS5jYWxsKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBJdGVyYXRlIHRoZSBnaXZlbiBkYXRhLlxuICogQHBhcmFtIHsqfSBkYXRhIC0gVGhlIGRhdGEgdG8gaXRlcmF0ZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIHByb2Nlc3MgZnVuY3Rpb24gZm9yIGVhY2ggZWxlbWVudC5cbiAqIEByZXR1cm5zIHsqfSBUaGUgb3JpZ2luYWwgZGF0YS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvckVhY2goZGF0YSwgY2FsbGJhY2spIHtcbiAgaWYgKGRhdGEgJiYgaXNGdW5jdGlvbihjYWxsYmFjaykpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSB8fCBpc051bWJlcihkYXRhLmxlbmd0aCkvKiBhcnJheS1saWtlICovKSB7XG4gICAgICB0b0FycmF5KGRhdGEpLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgY2FsbGJhY2suY2FsbChkYXRhLCB2YWx1ZSwga2V5LCBkYXRhKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoaXNPYmplY3QoZGF0YSkpIHtcbiAgICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBjYWxsYmFjay5jYWxsKGRhdGEsIGRhdGFba2V5XSwga2V5LCBkYXRhKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkYXRhO1xufVxuXG4vKipcbiAqIEV4dGVuZCB0aGUgZ2l2ZW4gb2JqZWN0LlxuICogQHBhcmFtIHsqfSB0YXJnZXQgLSBUaGUgdGFyZ2V0IG9iamVjdCB0byBleHRlbmQuXG4gKiBAcGFyYW0geyp9IGFyZ3MgLSBUaGUgcmVzdCBvYmplY3RzIGZvciBtZXJnaW5nIHRvIHRoZSB0YXJnZXQgb2JqZWN0LlxuICogQHJldHVybnMge09iamVjdH0gVGhlIGV4dGVuZGVkIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNvbnN0IGFzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgLi4uYXJncykge1xuICBpZiAoaXNPYmplY3QodGFyZ2V0KSAmJiBhcmdzLmxlbmd0aCA+IDApIHtcbiAgICBhcmdzLmZvckVhY2goKGFyZykgPT4ge1xuICAgICAgaWYgKGlzT2JqZWN0KGFyZykpIHtcbiAgICAgICAgT2JqZWN0LmtleXMoYXJnKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IGFyZ1trZXldO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG5jb25zdCBSRUdFWFBfREVDSU1BTFMgPSAvXFwuXFxkKig/OjB8OSl7MTJ9XFxkKiQvO1xuXG4vKipcbiAqIE5vcm1hbGl6ZSBkZWNpbWFsIG51bWJlci5cbiAqIENoZWNrIG91dCB7QGxpbmsgaHR0cDovLzAuMzAwMDAwMDAwMDAwMDAwMDQuY29tL31cbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBub3JtYWxpemUuXG4gKiBAcGFyYW0ge251bWJlcn0gW3RpbWVzPTEwMDAwMDAwMDAwMF0gLSBUaGUgdGltZXMgZm9yIG5vcm1hbGl6aW5nLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgbm9ybWFsaXplZCBudW1iZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVEZWNpbWFsTnVtYmVyKHZhbHVlLCB0aW1lcyA9IDEwMDAwMDAwMDAwMCkge1xuICByZXR1cm4gUkVHRVhQX0RFQ0lNQUxTLnRlc3QodmFsdWUpID8gKE1hdGgucm91bmQodmFsdWUgKiB0aW1lcykgLyB0aW1lcykgOiB2YWx1ZTtcbn1cblxuY29uc3QgUkVHRVhQX1NVRkZJWCA9IC9ed2lkdGh8aGVpZ2h0fGxlZnR8dG9wfG1hcmdpbkxlZnR8bWFyZ2luVG9wJC87XG5cbi8qKlxuICogQXBwbHkgc3R5bGVzIHRvIHRoZSBnaXZlbiBlbGVtZW50LlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IC0gVGhlIHRhcmdldCBlbGVtZW50LlxuICogQHBhcmFtIHtPYmplY3R9IHN0eWxlcyAtIFRoZSBzdHlsZXMgZm9yIGFwcGx5aW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0U3R5bGUoZWxlbWVudCwgc3R5bGVzKSB7XG4gIGNvbnN0IHsgc3R5bGUgfSA9IGVsZW1lbnQ7XG5cbiAgZm9yRWFjaChzdHlsZXMsICh2YWx1ZSwgcHJvcGVydHkpID0+IHtcbiAgICBpZiAoUkVHRVhQX1NVRkZJWC50ZXN0KHByb3BlcnR5KSAmJiBpc051bWJlcih2YWx1ZSkpIHtcbiAgICAgIHZhbHVlID0gYCR7dmFsdWV9cHhgO1xuICAgIH1cblxuICAgIHN0eWxlW3Byb3BlcnR5XSA9IHZhbHVlO1xuICB9KTtcbn1cblxuLyoqXG4gKiBDaGVjayBpZiB0aGUgZ2l2ZW4gZWxlbWVudCBoYXMgYSBzcGVjaWFsIGNsYXNzLlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IC0gVGhlIGVsZW1lbnQgdG8gY2hlY2suXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgLSBUaGUgY2xhc3MgdG8gc2VhcmNoLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBzcGVjaWFsIGNsYXNzIHdhcyBmb3VuZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhc0NsYXNzKGVsZW1lbnQsIHZhbHVlKSB7XG4gIHJldHVybiBlbGVtZW50LmNsYXNzTGlzdFxuICAgID8gZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnModmFsdWUpXG4gICAgOiBlbGVtZW50LmNsYXNzTmFtZS5pbmRleE9mKHZhbHVlKSA+IC0xO1xufVxuXG4vKipcbiAqIEFkZCBjbGFzc2VzIHRvIHRoZSBnaXZlbiBlbGVtZW50LlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IC0gVGhlIHRhcmdldCBlbGVtZW50LlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIC0gVGhlIGNsYXNzZXMgdG8gYmUgYWRkZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGRDbGFzcyhlbGVtZW50LCB2YWx1ZSkge1xuICBpZiAoIXZhbHVlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGlzTnVtYmVyKGVsZW1lbnQubGVuZ3RoKSkge1xuICAgIGZvckVhY2goZWxlbWVudCwgKGVsZW0pID0+IHtcbiAgICAgIGFkZENsYXNzKGVsZW0sIHZhbHVlKTtcbiAgICB9KTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoZWxlbWVudC5jbGFzc0xpc3QpIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQodmFsdWUpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lLnRyaW0oKTtcblxuICBpZiAoIWNsYXNzTmFtZSkge1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gdmFsdWU7XG4gIH0gZWxzZSBpZiAoY2xhc3NOYW1lLmluZGV4T2YodmFsdWUpIDwgMCkge1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gYCR7Y2xhc3NOYW1lfSAke3ZhbHVlfWA7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmUgY2xhc3NlcyBmcm9tIHRoZSBnaXZlbiBlbGVtZW50LlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IC0gVGhlIHRhcmdldCBlbGVtZW50LlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIC0gVGhlIGNsYXNzZXMgdG8gYmUgcmVtb3ZlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUNsYXNzKGVsZW1lbnQsIHZhbHVlKSB7XG4gIGlmICghdmFsdWUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoaXNOdW1iZXIoZWxlbWVudC5sZW5ndGgpKSB7XG4gICAgZm9yRWFjaChlbGVtZW50LCAoZWxlbSkgPT4ge1xuICAgICAgcmVtb3ZlQ2xhc3MoZWxlbSwgdmFsdWUpO1xuICAgIH0pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChlbGVtZW50LmNsYXNzTGlzdCkge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh2YWx1ZSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGVsZW1lbnQuY2xhc3NOYW1lLmluZGV4T2YodmFsdWUpID49IDApIHtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2UodmFsdWUsICcnKTtcbiAgfVxufVxuXG4vKipcbiAqIEFkZCBvciByZW1vdmUgY2xhc3NlcyBmcm9tIHRoZSBnaXZlbiBlbGVtZW50LlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IC0gVGhlIHRhcmdldCBlbGVtZW50LlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIC0gVGhlIGNsYXNzZXMgdG8gYmUgdG9nZ2xlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gYWRkZWQgLSBBZGQgb25seS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZUNsYXNzKGVsZW1lbnQsIHZhbHVlLCBhZGRlZCkge1xuICBpZiAoIXZhbHVlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGlzTnVtYmVyKGVsZW1lbnQubGVuZ3RoKSkge1xuICAgIGZvckVhY2goZWxlbWVudCwgKGVsZW0pID0+IHtcbiAgICAgIHRvZ2dsZUNsYXNzKGVsZW0sIHZhbHVlLCBhZGRlZCk7XG4gICAgfSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gSUUxMC0xMSBkb2Vzbid0IHN1cHBvcnQgdGhlIHNlY29uZCBwYXJhbWV0ZXIgb2YgYGNsYXNzTGlzdC50b2dnbGVgXG4gIGlmIChhZGRlZCkge1xuICAgIGFkZENsYXNzKGVsZW1lbnQsIHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICByZW1vdmVDbGFzcyhlbGVtZW50LCB2YWx1ZSk7XG4gIH1cbn1cblxuY29uc3QgUkVHRVhQX0NBTUVMX0NBU0UgPSAvKFthLXpcXGRdKShbQS1aXSkvZztcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGdpdmVuIHN0cmluZyBmcm9tIGNhbWVsQ2FzZSB0byBrZWJhYi1jYXNlXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgLSBUaGUgdmFsdWUgdG8gdHJhbnNmb3JtLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIHRyYW5zZm9ybWVkIHZhbHVlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9QYXJhbUNhc2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoUkVHRVhQX0NBTUVMX0NBU0UsICckMS0kMicpLnRvTG93ZXJDYXNlKCk7XG59XG5cbi8qKlxuICogR2V0IGRhdGEgZnJvbSB0aGUgZ2l2ZW4gZWxlbWVudC5cbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCAtIFRoZSB0YXJnZXQgZWxlbWVudC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIGRhdGEga2V5IHRvIGdldC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBkYXRhIHZhbHVlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF0YShlbGVtZW50LCBuYW1lKSB7XG4gIGlmIChpc09iamVjdChlbGVtZW50W25hbWVdKSkge1xuICAgIHJldHVybiBlbGVtZW50W25hbWVdO1xuICB9XG5cbiAgaWYgKGVsZW1lbnQuZGF0YXNldCkge1xuICAgIHJldHVybiBlbGVtZW50LmRhdGFzZXRbbmFtZV07XG4gIH1cblxuICByZXR1cm4gZWxlbWVudC5nZXRBdHRyaWJ1dGUoYGRhdGEtJHt0b1BhcmFtQ2FzZShuYW1lKX1gKTtcbn1cblxuLyoqXG4gKiBTZXQgZGF0YSB0byB0aGUgZ2l2ZW4gZWxlbWVudC5cbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCAtIFRoZSB0YXJnZXQgZWxlbWVudC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIGRhdGEga2V5IHRvIHNldC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhIC0gVGhlIGRhdGEgdmFsdWUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXREYXRhKGVsZW1lbnQsIG5hbWUsIGRhdGEpIHtcbiAgaWYgKGlzT2JqZWN0KGRhdGEpKSB7XG4gICAgZWxlbWVudFtuYW1lXSA9IGRhdGE7XG4gIH0gZWxzZSBpZiAoZWxlbWVudC5kYXRhc2V0KSB7XG4gICAgZWxlbWVudC5kYXRhc2V0W25hbWVdID0gZGF0YTtcbiAgfSBlbHNlIHtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShgZGF0YS0ke3RvUGFyYW1DYXNlKG5hbWUpfWAsIGRhdGEpO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlIGRhdGEgZnJvbSB0aGUgZ2l2ZW4gZWxlbWVudC5cbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCAtIFRoZSB0YXJnZXQgZWxlbWVudC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIGRhdGEga2V5IHRvIHJlbW92ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZURhdGEoZWxlbWVudCwgbmFtZSkge1xuICBpZiAoaXNPYmplY3QoZWxlbWVudFtuYW1lXSkpIHtcbiAgICB0cnkge1xuICAgICAgZGVsZXRlIGVsZW1lbnRbbmFtZV07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGVsZW1lbnRbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9IGVsc2UgaWYgKGVsZW1lbnQuZGF0YXNldCkge1xuICAgIC8vICMxMjggU2FmYXJpIG5vdCBhbGxvd3MgdG8gZGVsZXRlIGRhdGFzZXQgcHJvcGVydHlcbiAgICB0cnkge1xuICAgICAgZGVsZXRlIGVsZW1lbnQuZGF0YXNldFtuYW1lXTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgZWxlbWVudC5kYXRhc2V0W25hbWVdID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShgZGF0YS0ke3RvUGFyYW1DYXNlKG5hbWUpfWApO1xuICB9XG59XG5cbmNvbnN0IFJFR0VYUF9TUEFDRVMgPSAvXFxzXFxzKi87XG5jb25zdCBvbmNlU3VwcG9ydGVkID0gKCgpID0+IHtcbiAgbGV0IHN1cHBvcnRlZCA9IGZhbHNlO1xuXG4gIGlmIChJU19CUk9XU0VSKSB7XG4gICAgbGV0IG9uY2UgPSBmYWxzZTtcbiAgICBjb25zdCBsaXN0ZW5lciA9ICgpID0+IHt9O1xuICAgIGNvbnN0IG9wdGlvbnMgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdvbmNlJywge1xuICAgICAgZ2V0KCkge1xuICAgICAgICBzdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gb25jZTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogVGhpcyBzZXR0ZXIgY2FuIGZpeCBhIGBUeXBlRXJyb3JgIGluIHN0cmljdCBtb2RlXG4gICAgICAgKiB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvRXJyb3JzL0dldHRlcl9vbmx5fVxuICAgICAgICogQHBhcmFtIHtib29sZWFufSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBzZXRcbiAgICAgICAqL1xuICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgIG9uY2UgPSB2YWx1ZTtcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBXSU5ET1cuYWRkRXZlbnRMaXN0ZW5lcigndGVzdCcsIGxpc3RlbmVyLCBvcHRpb25zKTtcbiAgICBXSU5ET1cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndGVzdCcsIGxpc3RlbmVyLCBvcHRpb25zKTtcbiAgfVxuXG4gIHJldHVybiBzdXBwb3J0ZWQ7XG59KSgpO1xuXG4vKipcbiAqIFJlbW92ZSBldmVudCBsaXN0ZW5lciBmcm9tIHRoZSB0YXJnZXQgZWxlbWVudC5cbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCAtIFRoZSBldmVudCB0YXJnZXQuXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIFRoZSBldmVudCB0eXBlKHMpLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgLSBUaGUgZXZlbnQgbGlzdGVuZXIuXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBldmVudCBvcHRpb25zLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIoZWxlbWVudCwgdHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMgPSB7fSkge1xuICBsZXQgaGFuZGxlciA9IGxpc3RlbmVyO1xuXG4gIHR5cGUudHJpbSgpLnNwbGl0KFJFR0VYUF9TUEFDRVMpLmZvckVhY2goKGV2ZW50KSA9PiB7XG4gICAgaWYgKCFvbmNlU3VwcG9ydGVkKSB7XG4gICAgICBjb25zdCB7IGxpc3RlbmVycyB9ID0gZWxlbWVudDtcblxuICAgICAgaWYgKGxpc3RlbmVycyAmJiBsaXN0ZW5lcnNbZXZlbnRdICYmIGxpc3RlbmVyc1tldmVudF1bbGlzdGVuZXJdKSB7XG4gICAgICAgIGhhbmRsZXIgPSBsaXN0ZW5lcnNbZXZlbnRdW2xpc3RlbmVyXTtcbiAgICAgICAgZGVsZXRlIGxpc3RlbmVyc1tldmVudF1bbGlzdGVuZXJdO1xuXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhsaXN0ZW5lcnNbZXZlbnRdKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBkZWxldGUgbGlzdGVuZXJzW2V2ZW50XTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhsaXN0ZW5lcnMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGRlbGV0ZSBlbGVtZW50Lmxpc3RlbmVycztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgb3B0aW9ucyk7XG4gIH0pO1xufVxuXG4vKipcbiAqIEFkZCBldmVudCBsaXN0ZW5lciB0byB0aGUgdGFyZ2V0IGVsZW1lbnQuXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgLSBUaGUgZXZlbnQgdGFyZ2V0LlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSBUaGUgZXZlbnQgdHlwZShzKS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIC0gVGhlIGV2ZW50IGxpc3RlbmVyLlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgZXZlbnQgb3B0aW9ucy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZExpc3RlbmVyKGVsZW1lbnQsIHR5cGUsIGxpc3RlbmVyLCBvcHRpb25zID0ge30pIHtcbiAgbGV0IGhhbmRsZXIgPSBsaXN0ZW5lcjtcblxuICB0eXBlLnRyaW0oKS5zcGxpdChSRUdFWFBfU1BBQ0VTKS5mb3JFYWNoKChldmVudCkgPT4ge1xuICAgIGlmIChvcHRpb25zLm9uY2UgJiYgIW9uY2VTdXBwb3J0ZWQpIHtcbiAgICAgIGNvbnN0IHsgbGlzdGVuZXJzID0ge30gfSA9IGVsZW1lbnQ7XG5cbiAgICAgIGhhbmRsZXIgPSAoLi4uYXJncykgPT4ge1xuICAgICAgICBkZWxldGUgbGlzdGVuZXJzW2V2ZW50XVtsaXN0ZW5lcl07XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgb3B0aW9ucyk7XG4gICAgICAgIGxpc3RlbmVyLmFwcGx5KGVsZW1lbnQsIGFyZ3MpO1xuICAgICAgfTtcblxuICAgICAgaWYgKCFsaXN0ZW5lcnNbZXZlbnRdKSB7XG4gICAgICAgIGxpc3RlbmVyc1tldmVudF0gPSB7fTtcbiAgICAgIH1cblxuICAgICAgaWYgKGxpc3RlbmVyc1tldmVudF1bbGlzdGVuZXJdKSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgbGlzdGVuZXJzW2V2ZW50XVtsaXN0ZW5lcl0sIG9wdGlvbnMpO1xuICAgICAgfVxuXG4gICAgICBsaXN0ZW5lcnNbZXZlbnRdW2xpc3RlbmVyXSA9IGhhbmRsZXI7XG4gICAgICBlbGVtZW50Lmxpc3RlbmVycyA9IGxpc3RlbmVycztcbiAgICB9XG5cbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpO1xuICB9KTtcbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBldmVudCBvbiB0aGUgdGFyZ2V0IGVsZW1lbnQuXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgLSBUaGUgZXZlbnQgdGFyZ2V0LlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSBUaGUgZXZlbnQgdHlwZShzKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gVGhlIGFkZGl0aW9uYWwgZXZlbnQgZGF0YS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBJbmRpY2F0ZSBpZiB0aGUgZXZlbnQgaXMgZGVmYXVsdCBwcmV2ZW50ZWQgb3Igbm90LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGlzcGF0Y2hFdmVudChlbGVtZW50LCB0eXBlLCBkYXRhKSB7XG4gIGxldCBldmVudDtcblxuICAvLyBFdmVudCBhbmQgQ3VzdG9tRXZlbnQgb24gSUU5LTExIGFyZSBnbG9iYWwgb2JqZWN0cywgbm90IGNvbnN0cnVjdG9yc1xuICBpZiAoaXNGdW5jdGlvbihFdmVudCkgJiYgaXNGdW5jdGlvbihDdXN0b21FdmVudCkpIHtcbiAgICBldmVudCA9IG5ldyBDdXN0b21FdmVudCh0eXBlLCB7XG4gICAgICBkZXRhaWw6IGRhdGEsXG4gICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgIGV2ZW50LmluaXRDdXN0b21FdmVudCh0eXBlLCB0cnVlLCB0cnVlLCBkYXRhKTtcbiAgfVxuXG4gIHJldHVybiBlbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xufVxuXG4vKipcbiAqIEdldCB0aGUgb2Zmc2V0IGJhc2Ugb24gdGhlIGRvY3VtZW50LlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IC0gVGhlIHRhcmdldCBlbGVtZW50LlxuICogQHJldHVybnMge09iamVjdH0gVGhlIG9mZnNldCBkYXRhLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0T2Zmc2V0KGVsZW1lbnQpIHtcbiAgY29uc3QgYm94ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICByZXR1cm4ge1xuICAgIGxlZnQ6IGJveC5sZWZ0ICsgKHdpbmRvdy5wYWdlWE9mZnNldCAtIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRMZWZ0KSxcbiAgICB0b3A6IGJveC50b3AgKyAod2luZG93LnBhZ2VZT2Zmc2V0IC0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFRvcCksXG4gIH07XG59XG5cbmNvbnN0IHsgbG9jYXRpb24gfSA9IFdJTkRPVztcbmNvbnN0IFJFR0VYUF9PUklHSU5TID0gL14oXFx3KzopXFwvXFwvKFteOi8/I10qKTo/KFxcZCopL2k7XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlIGdpdmVuIFVSTCBpcyBhIGNyb3NzIG9yaWdpbiBVUkwuXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIC0gVGhlIHRhcmdldCBVUkwuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGdpdmVuIFVSTCBpcyBhIGNyb3NzIG9yaWdpbiBVUkwsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQ3Jvc3NPcmlnaW5VUkwodXJsKSB7XG4gIGNvbnN0IHBhcnRzID0gdXJsLm1hdGNoKFJFR0VYUF9PUklHSU5TKTtcblxuICByZXR1cm4gcGFydHMgIT09IG51bGwgJiYgKFxuICAgIHBhcnRzWzFdICE9PSBsb2NhdGlvbi5wcm90b2NvbFxuICAgIHx8IHBhcnRzWzJdICE9PSBsb2NhdGlvbi5ob3N0bmFtZVxuICAgIHx8IHBhcnRzWzNdICE9PSBsb2NhdGlvbi5wb3J0XG4gICk7XG59XG5cbi8qKlxuICogQWRkIHRpbWVzdGFtcCB0byB0aGUgZ2l2ZW4gVVJMLlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCAtIFRoZSB0YXJnZXQgVVJMLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIHJlc3VsdCBVUkwuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGRUaW1lc3RhbXAodXJsKSB7XG4gIGNvbnN0IHRpbWVzdGFtcCA9IGB0aW1lc3RhbXA9JHsobmV3IERhdGUoKSkuZ2V0VGltZSgpfWA7XG5cbiAgcmV0dXJuIHVybCArICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyB0aW1lc3RhbXA7XG59XG5cbi8qKlxuICogR2V0IHRyYW5zZm9ybXMgYmFzZSBvbiB0aGUgZ2l2ZW4gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiAtIFRoZSB0YXJnZXQgb2JqZWN0LlxuICogQHJldHVybnMge3N0cmluZ30gQSBzdHJpbmcgY29udGFpbnMgdHJhbnNmb3JtIHZhbHVlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFRyYW5zZm9ybXMoe1xuICByb3RhdGUsXG4gIHNjYWxlWCxcbiAgc2NhbGVZLFxuICB0cmFuc2xhdGVYLFxuICB0cmFuc2xhdGVZLFxufSkge1xuICBjb25zdCB2YWx1ZXMgPSBbXTtcblxuICBpZiAoaXNOdW1iZXIodHJhbnNsYXRlWCkgJiYgdHJhbnNsYXRlWCAhPT0gMCkge1xuICAgIHZhbHVlcy5wdXNoKGB0cmFuc2xhdGVYKCR7dHJhbnNsYXRlWH1weClgKTtcbiAgfVxuXG4gIGlmIChpc051bWJlcih0cmFuc2xhdGVZKSAmJiB0cmFuc2xhdGVZICE9PSAwKSB7XG4gICAgdmFsdWVzLnB1c2goYHRyYW5zbGF0ZVkoJHt0cmFuc2xhdGVZfXB4KWApO1xuICB9XG5cbiAgLy8gUm90YXRlIHNob3VsZCBjb21lIGZpcnN0IGJlZm9yZSBzY2FsZSB0byBtYXRjaCBvcmllbnRhdGlvbiB0cmFuc2Zvcm1cbiAgaWYgKGlzTnVtYmVyKHJvdGF0ZSkgJiYgcm90YXRlICE9PSAwKSB7XG4gICAgdmFsdWVzLnB1c2goYHJvdGF0ZSgke3JvdGF0ZX1kZWcpYCk7XG4gIH1cblxuICBpZiAoaXNOdW1iZXIoc2NhbGVYKSAmJiBzY2FsZVggIT09IDEpIHtcbiAgICB2YWx1ZXMucHVzaChgc2NhbGVYKCR7c2NhbGVYfSlgKTtcbiAgfVxuXG4gIGlmIChpc051bWJlcihzY2FsZVkpICYmIHNjYWxlWSAhPT0gMSkge1xuICAgIHZhbHVlcy5wdXNoKGBzY2FsZVkoJHtzY2FsZVl9KWApO1xuICB9XG5cbiAgY29uc3QgdHJhbnNmb3JtID0gdmFsdWVzLmxlbmd0aCA/IHZhbHVlcy5qb2luKCcgJykgOiAnbm9uZSc7XG5cbiAgcmV0dXJuIHtcbiAgICBXZWJraXRUcmFuc2Zvcm06IHRyYW5zZm9ybSxcbiAgICBtc1RyYW5zZm9ybTogdHJhbnNmb3JtLFxuICAgIHRyYW5zZm9ybSxcbiAgfTtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIG1heCByYXRpbyBvZiBhIGdyb3VwIG9mIHBvaW50ZXJzLlxuICogQHBhcmFtIHtzdHJpbmd9IHBvaW50ZXJzIC0gVGhlIHRhcmdldCBwb2ludGVycy5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSByZXN1bHQgcmF0aW8uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRNYXhab29tUmF0aW8ocG9pbnRlcnMpIHtcbiAgY29uc3QgcG9pbnRlcnMyID0gYXNzaWduKHt9LCBwb2ludGVycyk7XG4gIGNvbnN0IHJhdGlvcyA9IFtdO1xuXG4gIGZvckVhY2gocG9pbnRlcnMsIChwb2ludGVyLCBwb2ludGVySWQpID0+IHtcbiAgICBkZWxldGUgcG9pbnRlcnMyW3BvaW50ZXJJZF07XG5cbiAgICBmb3JFYWNoKHBvaW50ZXJzMiwgKHBvaW50ZXIyKSA9PiB7XG4gICAgICBjb25zdCB4MSA9IE1hdGguYWJzKHBvaW50ZXIuc3RhcnRYIC0gcG9pbnRlcjIuc3RhcnRYKTtcbiAgICAgIGNvbnN0IHkxID0gTWF0aC5hYnMocG9pbnRlci5zdGFydFkgLSBwb2ludGVyMi5zdGFydFkpO1xuICAgICAgY29uc3QgeDIgPSBNYXRoLmFicyhwb2ludGVyLmVuZFggLSBwb2ludGVyMi5lbmRYKTtcbiAgICAgIGNvbnN0IHkyID0gTWF0aC5hYnMocG9pbnRlci5lbmRZIC0gcG9pbnRlcjIuZW5kWSk7XG4gICAgICBjb25zdCB6MSA9IE1hdGguc3FydCgoeDEgKiB4MSkgKyAoeTEgKiB5MSkpO1xuICAgICAgY29uc3QgejIgPSBNYXRoLnNxcnQoKHgyICogeDIpICsgKHkyICogeTIpKTtcbiAgICAgIGNvbnN0IHJhdGlvID0gKHoyIC0gejEpIC8gejE7XG5cbiAgICAgIHJhdGlvcy5wdXNoKHJhdGlvKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmF0aW9zLnNvcnQoKGEsIGIpID0+IE1hdGguYWJzKGEpIDwgTWF0aC5hYnMoYikpO1xuXG4gIHJldHVybiByYXRpb3NbMF07XG59XG5cbi8qKlxuICogR2V0IGEgcG9pbnRlciBmcm9tIGFuIGV2ZW50IG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIFRoZSB0YXJnZXQgZXZlbnQgb2JqZWN0LlxuICogQHBhcmFtIHtib29sZWFufSBlbmRPbmx5IC0gSW5kaWNhdGVzIGlmIG9ubHkgcmV0dXJucyB0aGUgZW5kIHBvaW50IGNvb3JkaW5hdGUgb3Igbm90LlxuICogQHJldHVybnMge09iamVjdH0gVGhlIHJlc3VsdCBwb2ludGVyIGNvbnRhaW5zIHN0YXJ0IGFuZC9vciBlbmQgcG9pbnQgY29vcmRpbmF0ZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRQb2ludGVyKHsgcGFnZVgsIHBhZ2VZIH0sIGVuZE9ubHkpIHtcbiAgY29uc3QgZW5kID0ge1xuICAgIGVuZFg6IHBhZ2VYLFxuICAgIGVuZFk6IHBhZ2VZLFxuICB9O1xuXG4gIHJldHVybiBlbmRPbmx5ID8gZW5kIDogYXNzaWduKHtcbiAgICBzdGFydFg6IHBhZ2VYLFxuICAgIHN0YXJ0WTogcGFnZVksXG4gIH0sIGVuZCk7XG59XG5cbi8qKlxuICogR2V0IHRoZSBjZW50ZXIgcG9pbnQgY29vcmRpbmF0ZSBvZiBhIGdyb3VwIG9mIHBvaW50ZXJzLlxuICogQHBhcmFtIHtPYmplY3R9IHBvaW50ZXJzIC0gVGhlIHRhcmdldCBwb2ludGVycy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBjZW50ZXIgcG9pbnQgY29vcmRpbmF0ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFBvaW50ZXJzQ2VudGVyKHBvaW50ZXJzKSB7XG4gIGxldCBwYWdlWCA9IDA7XG4gIGxldCBwYWdlWSA9IDA7XG4gIGxldCBjb3VudCA9IDA7XG5cbiAgZm9yRWFjaChwb2ludGVycywgKHsgc3RhcnRYLCBzdGFydFkgfSkgPT4ge1xuICAgIHBhZ2VYICs9IHN0YXJ0WDtcbiAgICBwYWdlWSArPSBzdGFydFk7XG4gICAgY291bnQgKz0gMTtcbiAgfSk7XG5cbiAgcGFnZVggLz0gY291bnQ7XG4gIHBhZ2VZIC89IGNvdW50O1xuXG4gIHJldHVybiB7XG4gICAgcGFnZVgsXG4gICAgcGFnZVksXG4gIH07XG59XG5cbi8qKlxuICogR2V0IHRoZSBtYXggc2l6ZXMgaW4gYSByZWN0YW5nbGUgdW5kZXIgdGhlIGdpdmVuIGFzcGVjdCByYXRpby5cbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gVGhlIG9yaWdpbmFsIHNpemVzLlxuICogQHBhcmFtIHtzdHJpbmd9IFt0eXBlPSdjb250YWluJ10gLSBUaGUgYWRqdXN0IHR5cGUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgcmVzdWx0IHNpemVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWRqdXN0ZWRTaXplcyhcbiAge1xuICAgIGFzcGVjdFJhdGlvLFxuICAgIGhlaWdodCxcbiAgICB3aWR0aCxcbiAgfSxcbiAgdHlwZSA9ICdjb250YWluJywgLy8gb3IgJ2NvdmVyJ1xuKSB7XG4gIGNvbnN0IGlzVmFsaWRXaWR0aCA9IGlzUG9zaXRpdmVOdW1iZXIod2lkdGgpO1xuICBjb25zdCBpc1ZhbGlkSGVpZ2h0ID0gaXNQb3NpdGl2ZU51bWJlcihoZWlnaHQpO1xuXG4gIGlmIChpc1ZhbGlkV2lkdGggJiYgaXNWYWxpZEhlaWdodCkge1xuICAgIGNvbnN0IGFkanVzdGVkV2lkdGggPSBoZWlnaHQgKiBhc3BlY3RSYXRpbztcblxuICAgIGlmICgodHlwZSA9PT0gJ2NvbnRhaW4nICYmIGFkanVzdGVkV2lkdGggPiB3aWR0aCkgfHwgKHR5cGUgPT09ICdjb3ZlcicgJiYgYWRqdXN0ZWRXaWR0aCA8IHdpZHRoKSkge1xuICAgICAgaGVpZ2h0ID0gd2lkdGggLyBhc3BlY3RSYXRpbztcbiAgICB9IGVsc2Uge1xuICAgICAgd2lkdGggPSBoZWlnaHQgKiBhc3BlY3RSYXRpbztcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNWYWxpZFdpZHRoKSB7XG4gICAgaGVpZ2h0ID0gd2lkdGggLyBhc3BlY3RSYXRpbztcbiAgfSBlbHNlIGlmIChpc1ZhbGlkSGVpZ2h0KSB7XG4gICAgd2lkdGggPSBoZWlnaHQgKiBhc3BlY3RSYXRpbztcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0LFxuICB9O1xufVxuXG4vKipcbiAqIEdldCB0aGUgbmV3IHNpemVzIG9mIGEgcmVjdGFuZ2xlIGFmdGVyIHJvdGF0ZWQuXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIFRoZSBvcmlnaW5hbCBzaXplcy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSByZXN1bHQgc2l6ZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRSb3RhdGVkU2l6ZXMoeyB3aWR0aCwgaGVpZ2h0LCBkZWdyZWUgfSkge1xuICBkZWdyZWUgPSBNYXRoLmFicyhkZWdyZWUpICUgMTgwO1xuXG4gIGlmIChkZWdyZWUgPT09IDkwKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdpZHRoOiBoZWlnaHQsXG4gICAgICBoZWlnaHQ6IHdpZHRoLFxuICAgIH07XG4gIH1cblxuICBjb25zdCBhcmMgPSAoKGRlZ3JlZSAlIDkwKSAqIE1hdGguUEkpIC8gMTgwO1xuICBjb25zdCBzaW5BcmMgPSBNYXRoLnNpbihhcmMpO1xuICBjb25zdCBjb3NBcmMgPSBNYXRoLmNvcyhhcmMpO1xuICBjb25zdCBuZXdXaWR0aCA9ICh3aWR0aCAqIGNvc0FyYykgKyAoaGVpZ2h0ICogc2luQXJjKTtcbiAgY29uc3QgbmV3SGVpZ2h0ID0gKHdpZHRoICogc2luQXJjKSArIChoZWlnaHQgKiBjb3NBcmMpO1xuXG4gIHJldHVybiBkZWdyZWUgPiA5MCA/IHtcbiAgICB3aWR0aDogbmV3SGVpZ2h0LFxuICAgIGhlaWdodDogbmV3V2lkdGgsXG4gIH0gOiB7XG4gICAgd2lkdGg6IG5ld1dpZHRoLFxuICAgIGhlaWdodDogbmV3SGVpZ2h0LFxuICB9O1xufVxuXG4vKipcbiAqIEdldCBhIGNhbnZhcyB3aGljaCBkcmV3IHRoZSBnaXZlbiBpbWFnZS5cbiAqIEBwYXJhbSB7SFRNTEltYWdlRWxlbWVudH0gaW1hZ2UgLSBUaGUgaW1hZ2UgZm9yIGRyYXdpbmcuXG4gKiBAcGFyYW0ge09iamVjdH0gaW1hZ2VEYXRhIC0gVGhlIGltYWdlIGRhdGEuXG4gKiBAcGFyYW0ge09iamVjdH0gY2FudmFzRGF0YSAtIFRoZSBjYW52YXMgZGF0YS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMuXG4gKiBAcmV0dXJucyB7SFRNTENhbnZhc0VsZW1lbnR9IFRoZSByZXN1bHQgY2FudmFzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U291cmNlQ2FudmFzKFxuICBpbWFnZSxcbiAge1xuICAgIGFzcGVjdFJhdGlvOiBpbWFnZUFzcGVjdFJhdGlvLFxuICAgIG5hdHVyYWxXaWR0aDogaW1hZ2VOYXR1cmFsV2lkdGgsXG4gICAgbmF0dXJhbEhlaWdodDogaW1hZ2VOYXR1cmFsSGVpZ2h0LFxuICAgIHJvdGF0ZSA9IDAsXG4gICAgc2NhbGVYID0gMSxcbiAgICBzY2FsZVkgPSAxLFxuICB9LFxuICB7XG4gICAgYXNwZWN0UmF0aW8sXG4gICAgbmF0dXJhbFdpZHRoLFxuICAgIG5hdHVyYWxIZWlnaHQsXG4gIH0sXG4gIHtcbiAgICBmaWxsQ29sb3IgPSAndHJhbnNwYXJlbnQnLFxuICAgIGltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRydWUsXG4gICAgaW1hZ2VTbW9vdGhpbmdRdWFsaXR5ID0gJ2xvdycsXG4gICAgbWF4V2lkdGggPSBJbmZpbml0eSxcbiAgICBtYXhIZWlnaHQgPSBJbmZpbml0eSxcbiAgICBtaW5XaWR0aCA9IDAsXG4gICAgbWluSGVpZ2h0ID0gMCxcbiAgfSxcbikge1xuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICBjb25zdCBtYXhTaXplcyA9IGdldEFkanVzdGVkU2l6ZXMoe1xuICAgIGFzcGVjdFJhdGlvLFxuICAgIHdpZHRoOiBtYXhXaWR0aCxcbiAgICBoZWlnaHQ6IG1heEhlaWdodCxcbiAgfSk7XG4gIGNvbnN0IG1pblNpemVzID0gZ2V0QWRqdXN0ZWRTaXplcyh7XG4gICAgYXNwZWN0UmF0aW8sXG4gICAgd2lkdGg6IG1pbldpZHRoLFxuICAgIGhlaWdodDogbWluSGVpZ2h0LFxuICB9LCAnY292ZXInKTtcbiAgY29uc3Qgd2lkdGggPSBNYXRoLm1pbihtYXhTaXplcy53aWR0aCwgTWF0aC5tYXgobWluU2l6ZXMud2lkdGgsIG5hdHVyYWxXaWR0aCkpO1xuICBjb25zdCBoZWlnaHQgPSBNYXRoLm1pbihtYXhTaXplcy5oZWlnaHQsIE1hdGgubWF4KG1pblNpemVzLmhlaWdodCwgbmF0dXJhbEhlaWdodCkpO1xuXG4gIC8vIE5vdGU6IHNob3VsZCBhbHdheXMgdXNlIGltYWdlJ3MgbmF0dXJhbCBzaXplcyBmb3IgZHJhd2luZyBhc1xuICAvLyBpbWFnZURhdGEubmF0dXJhbFdpZHRoID09PSBjYW52YXNEYXRhLm5hdHVyYWxIZWlnaHQgd2hlbiByb3RhdGUgJSAxODAgPT09IDkwXG4gIGNvbnN0IGRlc3RNYXhTaXplcyA9IGdldEFkanVzdGVkU2l6ZXMoe1xuICAgIGFzcGVjdFJhdGlvOiBpbWFnZUFzcGVjdFJhdGlvLFxuICAgIHdpZHRoOiBtYXhXaWR0aCxcbiAgICBoZWlnaHQ6IG1heEhlaWdodCxcbiAgfSk7XG4gIGNvbnN0IGRlc3RNaW5TaXplcyA9IGdldEFkanVzdGVkU2l6ZXMoe1xuICAgIGFzcGVjdFJhdGlvOiBpbWFnZUFzcGVjdFJhdGlvLFxuICAgIHdpZHRoOiBtaW5XaWR0aCxcbiAgICBoZWlnaHQ6IG1pbkhlaWdodCxcbiAgfSwgJ2NvdmVyJyk7XG4gIGNvbnN0IGRlc3RXaWR0aCA9IE1hdGgubWluKFxuICAgIGRlc3RNYXhTaXplcy53aWR0aCxcbiAgICBNYXRoLm1heChkZXN0TWluU2l6ZXMud2lkdGgsIGltYWdlTmF0dXJhbFdpZHRoKSxcbiAgKTtcbiAgY29uc3QgZGVzdEhlaWdodCA9IE1hdGgubWluKFxuICAgIGRlc3RNYXhTaXplcy5oZWlnaHQsXG4gICAgTWF0aC5tYXgoZGVzdE1pblNpemVzLmhlaWdodCwgaW1hZ2VOYXR1cmFsSGVpZ2h0KSxcbiAgKTtcbiAgY29uc3QgcGFyYW1zID0gW1xuICAgIC1kZXN0V2lkdGggLyAyLFxuICAgIC1kZXN0SGVpZ2h0IC8gMixcbiAgICBkZXN0V2lkdGgsXG4gICAgZGVzdEhlaWdodCxcbiAgXTtcblxuICBjYW52YXMud2lkdGggPSBub3JtYWxpemVEZWNpbWFsTnVtYmVyKHdpZHRoKTtcbiAgY2FudmFzLmhlaWdodCA9IG5vcm1hbGl6ZURlY2ltYWxOdW1iZXIoaGVpZ2h0KTtcbiAgY29udGV4dC5maWxsU3R5bGUgPSBmaWxsQ29sb3I7XG4gIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gIGNvbnRleHQuc2F2ZSgpO1xuICBjb250ZXh0LnRyYW5zbGF0ZSh3aWR0aCAvIDIsIGhlaWdodCAvIDIpO1xuICBjb250ZXh0LnJvdGF0ZSgocm90YXRlICogTWF0aC5QSSkgLyAxODApO1xuICBjb250ZXh0LnNjYWxlKHNjYWxlWCwgc2NhbGVZKTtcbiAgY29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBpbWFnZVNtb290aGluZ0VuYWJsZWQ7XG4gIGNvbnRleHQuaW1hZ2VTbW9vdGhpbmdRdWFsaXR5ID0gaW1hZ2VTbW9vdGhpbmdRdWFsaXR5O1xuICBjb250ZXh0LmRyYXdJbWFnZShpbWFnZSwgLi4ucGFyYW1zLm1hcChwYXJhbSA9PiBNYXRoLmZsb29yKG5vcm1hbGl6ZURlY2ltYWxOdW1iZXIocGFyYW0pKSkpO1xuICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgcmV0dXJuIGNhbnZhcztcbn1cblxuY29uc3QgeyBmcm9tQ2hhckNvZGUgfSA9IFN0cmluZztcblxuLyoqXG4gKiBHZXQgc3RyaW5nIGZyb20gY2hhciBjb2RlIGluIGRhdGEgdmlldy5cbiAqIEBwYXJhbSB7RGF0YVZpZXd9IGRhdGFWaWV3IC0gVGhlIGRhdGEgdmlldyBmb3IgcmVhZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCAtIFRoZSBzdGFydCBpbmRleC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGggLSBUaGUgcmVhZCBsZW5ndGguXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcmVhZCByZXN1bHQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdHJpbmdGcm9tQ2hhckNvZGUoZGF0YVZpZXcsIHN0YXJ0LCBsZW5ndGgpIHtcbiAgbGV0IHN0ciA9ICcnO1xuXG4gIGxlbmd0aCArPSBzdGFydDtcblxuICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgIHN0ciArPSBmcm9tQ2hhckNvZGUoZGF0YVZpZXcuZ2V0VWludDgoaSkpO1xuICB9XG5cbiAgcmV0dXJuIHN0cjtcbn1cblxuY29uc3QgUkVHRVhQX0RBVEFfVVJMX0hFQUQgPSAvXmRhdGE6LiosLztcblxuLyoqXG4gKiBUcmFuc2Zvcm0gRGF0YSBVUkwgdG8gYXJyYXkgYnVmZmVyLlxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGFVUkwgLSBUaGUgRGF0YSBVUkwgdG8gdHJhbnNmb3JtLlxuICogQHJldHVybnMge0FycmF5QnVmZmVyfSBUaGUgcmVzdWx0IGFycmF5IGJ1ZmZlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRhdGFVUkxUb0FycmF5QnVmZmVyKGRhdGFVUkwpIHtcbiAgY29uc3QgYmFzZTY0ID0gZGF0YVVSTC5yZXBsYWNlKFJFR0VYUF9EQVRBX1VSTF9IRUFELCAnJyk7XG4gIGNvbnN0IGJpbmFyeSA9IGF0b2IoYmFzZTY0KTtcbiAgY29uc3QgYXJyYXlCdWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIoYmluYXJ5Lmxlbmd0aCk7XG4gIGNvbnN0IHVpbnQ4ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlCdWZmZXIpO1xuXG4gIGZvckVhY2godWludDgsICh2YWx1ZSwgaSkgPT4ge1xuICAgIHVpbnQ4W2ldID0gYmluYXJ5LmNoYXJDb2RlQXQoaSk7XG4gIH0pO1xuXG4gIHJldHVybiBhcnJheUJ1ZmZlcjtcbn1cblxuLyoqXG4gKiBUcmFuc2Zvcm0gYXJyYXkgYnVmZmVyIHRvIERhdGEgVVJMLlxuICogQHBhcmFtIHtBcnJheUJ1ZmZlcn0gYXJyYXlCdWZmZXIgLSBUaGUgYXJyYXkgYnVmZmVyIHRvIHRyYW5zZm9ybS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtaW1lVHlwZSAtIFRoZSBtaW1lIHR5cGUgb2YgdGhlIERhdGEgVVJMLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIHJlc3VsdCBEYXRhIFVSTC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFycmF5QnVmZmVyVG9EYXRhVVJMKGFycmF5QnVmZmVyLCBtaW1lVHlwZSkge1xuICBjb25zdCBjaHVua3MgPSBbXTtcblxuICAvLyBDaHVuayBUeXBlZCBBcnJheSBmb3IgYmV0dGVyIHBlcmZvcm1hbmNlICgjNDM1KVxuICBjb25zdCBjaHVua1NpemUgPSA4MTkyO1xuICBsZXQgdWludDggPSBuZXcgVWludDhBcnJheShhcnJheUJ1ZmZlcik7XG5cbiAgd2hpbGUgKHVpbnQ4Lmxlbmd0aCA+IDApIHtcbiAgICAvLyBYWFg6IEJhYmVsJ3MgYHRvQ29uc3VtYWJsZUFycmF5YCBoZWxwZXIgd2lsbCB0aHJvdyBlcnJvciBpbiBJRSBvciBTYWZhcmkgOVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItc3ByZWFkXG4gICAgY2h1bmtzLnB1c2goZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIHRvQXJyYXkodWludDguc3ViYXJyYXkoMCwgY2h1bmtTaXplKSkpKTtcbiAgICB1aW50OCA9IHVpbnQ4LnN1YmFycmF5KGNodW5rU2l6ZSk7XG4gIH1cblxuICByZXR1cm4gYGRhdGE6JHttaW1lVHlwZX07YmFzZTY0LCR7YnRvYShjaHVua3Muam9pbignJykpfWA7XG59XG5cbi8qKlxuICogR2V0IG9yaWVudGF0aW9uIHZhbHVlIGZyb20gZ2l2ZW4gYXJyYXkgYnVmZmVyLlxuICogQHBhcmFtIHtBcnJheUJ1ZmZlcn0gYXJyYXlCdWZmZXIgLSBUaGUgYXJyYXkgYnVmZmVyIHRvIHJlYWQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgcmVhZCBvcmllbnRhdGlvbiB2YWx1ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0QW5kR2V0T3JpZW50YXRpb24oYXJyYXlCdWZmZXIpIHtcbiAgY29uc3QgZGF0YVZpZXcgPSBuZXcgRGF0YVZpZXcoYXJyYXlCdWZmZXIpO1xuICBsZXQgb3JpZW50YXRpb247XG5cbiAgLy8gSWdub3JlcyByYW5nZSBlcnJvciB3aGVuIHRoZSBpbWFnZSBkb2VzIG5vdCBoYXZlIGNvcnJlY3QgRXhpZiBpbmZvcm1hdGlvblxuICB0cnkge1xuICAgIGxldCBsaXR0bGVFbmRpYW47XG4gICAgbGV0IGFwcDFTdGFydDtcbiAgICBsZXQgaWZkU3RhcnQ7XG5cbiAgICAvLyBPbmx5IGhhbmRsZSBKUEVHIGltYWdlIChzdGFydCBieSAweEZGRDgpXG4gICAgaWYgKGRhdGFWaWV3LmdldFVpbnQ4KDApID09PSAweEZGICYmIGRhdGFWaWV3LmdldFVpbnQ4KDEpID09PSAweEQ4KSB7XG4gICAgICBjb25zdCBsZW5ndGggPSBkYXRhVmlldy5ieXRlTGVuZ3RoO1xuICAgICAgbGV0IG9mZnNldCA9IDI7XG5cbiAgICAgIHdoaWxlIChvZmZzZXQgKyAxIDwgbGVuZ3RoKSB7XG4gICAgICAgIGlmIChkYXRhVmlldy5nZXRVaW50OChvZmZzZXQpID09PSAweEZGICYmIGRhdGFWaWV3LmdldFVpbnQ4KG9mZnNldCArIDEpID09PSAweEUxKSB7XG4gICAgICAgICAgYXBwMVN0YXJ0ID0gb2Zmc2V0O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgb2Zmc2V0ICs9IDE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGFwcDFTdGFydCkge1xuICAgICAgY29uc3QgZXhpZklEQ29kZSA9IGFwcDFTdGFydCArIDQ7XG4gICAgICBjb25zdCB0aWZmT2Zmc2V0ID0gYXBwMVN0YXJ0ICsgMTA7XG5cbiAgICAgIGlmIChnZXRTdHJpbmdGcm9tQ2hhckNvZGUoZGF0YVZpZXcsIGV4aWZJRENvZGUsIDQpID09PSAnRXhpZicpIHtcbiAgICAgICAgY29uc3QgZW5kaWFubmVzcyA9IGRhdGFWaWV3LmdldFVpbnQxNih0aWZmT2Zmc2V0KTtcblxuICAgICAgICBsaXR0bGVFbmRpYW4gPSBlbmRpYW5uZXNzID09PSAweDQ5NDk7XG5cbiAgICAgICAgaWYgKGxpdHRsZUVuZGlhbiB8fCBlbmRpYW5uZXNzID09PSAweDRENEQgLyogYmlnRW5kaWFuICovKSB7XG4gICAgICAgICAgaWYgKGRhdGFWaWV3LmdldFVpbnQxNih0aWZmT2Zmc2V0ICsgMiwgbGl0dGxlRW5kaWFuKSA9PT0gMHgwMDJBKSB7XG4gICAgICAgICAgICBjb25zdCBmaXJzdElGRE9mZnNldCA9IGRhdGFWaWV3LmdldFVpbnQzMih0aWZmT2Zmc2V0ICsgNCwgbGl0dGxlRW5kaWFuKTtcblxuICAgICAgICAgICAgaWYgKGZpcnN0SUZET2Zmc2V0ID49IDB4MDAwMDAwMDgpIHtcbiAgICAgICAgICAgICAgaWZkU3RhcnQgPSB0aWZmT2Zmc2V0ICsgZmlyc3RJRkRPZmZzZXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlmZFN0YXJ0KSB7XG4gICAgICBjb25zdCBsZW5ndGggPSBkYXRhVmlldy5nZXRVaW50MTYoaWZkU3RhcnQsIGxpdHRsZUVuZGlhbik7XG4gICAgICBsZXQgb2Zmc2V0O1xuICAgICAgbGV0IGk7XG5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBvZmZzZXQgPSBpZmRTdGFydCArIChpICogMTIpICsgMjtcblxuICAgICAgICBpZiAoZGF0YVZpZXcuZ2V0VWludDE2KG9mZnNldCwgbGl0dGxlRW5kaWFuKSA9PT0gMHgwMTEyIC8qIE9yaWVudGF0aW9uICovKSB7XG4gICAgICAgICAgLy8gOCBpcyB0aGUgb2Zmc2V0IG9mIHRoZSBjdXJyZW50IHRhZydzIHZhbHVlXG4gICAgICAgICAgb2Zmc2V0ICs9IDg7XG5cbiAgICAgICAgICAvLyBHZXQgdGhlIG9yaWdpbmFsIG9yaWVudGF0aW9uIHZhbHVlXG4gICAgICAgICAgb3JpZW50YXRpb24gPSBkYXRhVmlldy5nZXRVaW50MTYob2Zmc2V0LCBsaXR0bGVFbmRpYW4pO1xuXG4gICAgICAgICAgLy8gT3ZlcnJpZGUgdGhlIG9yaWVudGF0aW9uIHdpdGggaXRzIGRlZmF1bHQgdmFsdWVcbiAgICAgICAgICBkYXRhVmlldy5zZXRVaW50MTYob2Zmc2V0LCAxLCBsaXR0bGVFbmRpYW4pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIG9yaWVudGF0aW9uID0gMTtcbiAgfVxuXG4gIHJldHVybiBvcmllbnRhdGlvbjtcbn1cblxuLyoqXG4gKiBQYXJzZSBFeGlmIE9yaWVudGF0aW9uIHZhbHVlLlxuICogQHBhcmFtIHtudW1iZXJ9IG9yaWVudGF0aW9uIC0gVGhlIG9yaWVudGF0aW9uIHRvIHBhcnNlLlxuICogQHJldHVybnMge09iamVjdH0gVGhlIHBhcnNlZCByZXN1bHQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZU9yaWVudGF0aW9uKG9yaWVudGF0aW9uKSB7XG4gIGxldCByb3RhdGUgPSAwO1xuICBsZXQgc2NhbGVYID0gMTtcbiAgbGV0IHNjYWxlWSA9IDE7XG5cbiAgc3dpdGNoIChvcmllbnRhdGlvbikge1xuICAgIC8vIEZsaXAgaG9yaXpvbnRhbFxuICAgIGNhc2UgMjpcbiAgICAgIHNjYWxlWCA9IC0xO1xuICAgICAgYnJlYWs7XG5cbiAgICAvLyBSb3RhdGUgbGVmdCAxODDCsFxuICAgIGNhc2UgMzpcbiAgICAgIHJvdGF0ZSA9IC0xODA7XG4gICAgICBicmVhaztcblxuICAgIC8vIEZsaXAgdmVydGljYWxcbiAgICBjYXNlIDQ6XG4gICAgICBzY2FsZVkgPSAtMTtcbiAgICAgIGJyZWFrO1xuXG4gICAgLy8gRmxpcCB2ZXJ0aWNhbCBhbmQgcm90YXRlIHJpZ2h0IDkwwrBcbiAgICBjYXNlIDU6XG4gICAgICByb3RhdGUgPSA5MDtcbiAgICAgIHNjYWxlWSA9IC0xO1xuICAgICAgYnJlYWs7XG5cbiAgICAvLyBSb3RhdGUgcmlnaHQgOTDCsFxuICAgIGNhc2UgNjpcbiAgICAgIHJvdGF0ZSA9IDkwO1xuICAgICAgYnJlYWs7XG5cbiAgICAvLyBGbGlwIGhvcml6b250YWwgYW5kIHJvdGF0ZSByaWdodCA5MMKwXG4gICAgY2FzZSA3OlxuICAgICAgcm90YXRlID0gOTA7XG4gICAgICBzY2FsZVggPSAtMTtcbiAgICAgIGJyZWFrO1xuXG4gICAgLy8gUm90YXRlIGxlZnQgOTDCsFxuICAgIGNhc2UgODpcbiAgICAgIHJvdGF0ZSA9IC05MDtcbiAgICAgIGJyZWFrO1xuXG4gICAgZGVmYXVsdDpcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcm90YXRlLFxuICAgIHNjYWxlWCxcbiAgICBzY2FsZVksXG4gIH07XG59XG4iLCIvKiFcbiAqIERldGVybWluZSBpZiBhbiBvYmplY3QgaXMgYSBCdWZmZXJcbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8aHR0cHM6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5cbi8vIFRoZSBfaXNCdWZmZXIgY2hlY2sgaXMgZm9yIFNhZmFyaSA1LTcgc3VwcG9ydCwgYmVjYXVzZSBpdCdzIG1pc3Npbmdcbi8vIE9iamVjdC5wcm90b3R5cGUuY29uc3RydWN0b3IuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICE9IG51bGwgJiYgKGlzQnVmZmVyKG9iaikgfHwgaXNTbG93QnVmZmVyKG9iaikgfHwgISFvYmouX2lzQnVmZmVyKVxufVxuXG5mdW5jdGlvbiBpc0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiAhIW9iai5jb25zdHJ1Y3RvciAmJiB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopXG59XG5cbi8vIEZvciBOb2RlIHYwLjEwIHN1cHBvcnQuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHkuXG5mdW5jdGlvbiBpc1Nsb3dCdWZmZXIgKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iai5yZWFkRmxvYXRMRSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLnNsaWNlID09PSAnZnVuY3Rpb24nICYmIGlzQnVmZmVyKG9iai5zbGljZSgwLCAwKSlcbn1cbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iXSwic291cmNlUm9vdCI6IiJ9