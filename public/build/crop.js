(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["crop"],{

/***/ "./assets/js/cropper/testcrop.js":
/*!***************************************!*\
  !*** ./assets/js/cropper/testcrop.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var cropperjs_src_js_cropper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cropperjs/src/js/cropper */ "./node_modules/cropperjs/src/js/cropper.js");
/* harmony import */ var _vendor_friendsofsymfony_jsrouting_bundle_Resources_public_js_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router */ "./vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router.js");
/* harmony import */ var _vendor_friendsofsymfony_jsrouting_bundle_Resources_public_js_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_vendor_friendsofsymfony_jsrouting_bundle_Resources_public_js_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _public_js_fos_js_routes_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../public/js/fos_js_routes.json */ "./public/js/fos_js_routes.json");
var _public_js_fos_js_routes_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../../public/js/fos_js_routes.json */ "./public/js/fos_js_routes.json", 1);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
__webpack_require__(/*! ../../../node_modules/cropperjs/dist/cropper.min.css */ "./node_modules/cropperjs/dist/cropper.min.css");

 // cropperjs/dist/cropper'

 //'../../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router'

 //'../../../public/js/fos_js_routes.json'


_vendor_friendsofsymfony_jsrouting_bundle_Resources_public_js_router__WEBPACK_IMPORTED_MODULE_1___default.a.setRoutingData(_public_js_fos_js_routes_json__WEBPACK_IMPORTED_MODULE_2__);
let cropper;
var preview = document.getElementById('avatar');
var file_input = document.getElementById('test_product_image');

window.previewFile = function () {
  let file = file_input.files[0];
  let reader = new FileReader();
  reader.addEventListener('load', function (event) {
    preview.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
};

preview.addEventListener('load', function (event) {
  cropper = new cropperjs_src_js_cropper__WEBPACK_IMPORTED_MODULE_0__["default"](preview, {
    aspectRatio: 1 / 1
  });
});
let form = document.getElementById('testing');
form.addEventListener('submit', function (event) {
  event.preventDefault();
  cropper.getCroppedCanvas({
    maxHeight: 1000,
    maxWidth: 1000
  }).toBlob(function (blob) {
    // ajaxWithAxios(blob)
    kudakepang(blob);
  });
});

function ajaxWithAxios(blob) {
  let url = _vendor_friendsofsymfony_jsrouting_bundle_Resources_public_js_router__WEBPACK_IMPORTED_MODULE_1___default.a.generate('image');
  let data = new FormData(form);
  data.append('file', blob);
  axios__WEBPACK_IMPORTED_MODULE_3___default()({
    method: 'post',
    url: url,
    data: data,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  }).then(response => {
    console.log(response);
  }).catch(error => {
    console.error(error);
  });
}

var thumb = document.getElementById('thumb');

/***/ }),

/***/ "./public/js/fos_js_routes.json":
/*!**************************************!*\
  !*** ./public/js/fos_js_routes.json ***!
  \**************************************/
/*! exports provided: base_url, routes, prefix, host, port, scheme, default */
/***/ (function(module) {

module.exports = {"base_url":"","routes":{"index":{"tokens":[["text","/"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":[],"schemes":[]},"add_product":{"tokens":[["text","/addproduct"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":[],"schemes":[]},"image":{"tokens":[["text","/image"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]}},"prefix":"","host":"localhost","port":"","scheme":"http"};

/***/ }),

/***/ "./vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router.js":
/*!********************************************************************************!*\
  !*** ./vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
  var routing = factory();

  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (routing.Routing),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function () {
  'use strict';
  /**
   * @fileoverview This file defines the Router class.
   *
   * You can compile this file by running the following command from the Resources folder:
   *
   *    npm install && npm run build
   */

  /**
   * Class Router
   */

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Router = function () {
    /**
     * @constructor
     * @param {Router.Context=} context
     * @param {Object.<string, Router.Route>=} routes
     */
    function Router(context, routes) {
      _classCallCheck(this, Router);

      this.context_ = context || {
        base_url: '',
        prefix: '',
        host: '',
        port: '',
        scheme: ''
      };
      this.setRoutes(routes || {});
    }
    /**
     * Returns the current instance.
     * @returns {Router}
     */


    _createClass(Router, [{
      key: 'setRoutingData',

      /**
       * Sets data for the current instance
       * @param {Object} data
       */
      value: function setRoutingData(data) {
        this.setBaseUrl(data['base_url']);
        this.setRoutes(data['routes']);

        if ('prefix' in data) {
          this.setPrefix(data['prefix']);
        }

        if ('port' in data) {
          this.setPort(data['port']);
        }

        this.setHost(data['host']);
        this.setScheme(data['scheme']);
      }
      /**
       * @param {Object.<string, Router.Route>} routes
       */

    }, {
      key: 'setRoutes',
      value: function setRoutes(routes) {
        this.routes_ = Object.freeze(routes);
      }
      /**
       * @return {Object.<string, Router.Route>} routes
       */

    }, {
      key: 'getRoutes',
      value: function getRoutes() {
        return this.routes_;
      }
      /**
       * @param {string} baseUrl
       */

    }, {
      key: 'setBaseUrl',
      value: function setBaseUrl(baseUrl) {
        this.context_.base_url = baseUrl;
      }
      /**
       * @return {string}
       */

    }, {
      key: 'getBaseUrl',
      value: function getBaseUrl() {
        return this.context_.base_url;
      }
      /**
       * @param {string} prefix
       */

    }, {
      key: 'setPrefix',
      value: function setPrefix(prefix) {
        this.context_.prefix = prefix;
      }
      /**
       * @param {string} scheme
       */

    }, {
      key: 'setScheme',
      value: function setScheme(scheme) {
        this.context_.scheme = scheme;
      }
      /**
       * @return {string}
       */

    }, {
      key: 'getScheme',
      value: function getScheme() {
        return this.context_.scheme;
      }
      /**
       * @param {string} host
       */

    }, {
      key: 'setHost',
      value: function setHost(host) {
        this.context_.host = host;
      }
      /**
       * @return {string}
       */

    }, {
      key: 'getHost',
      value: function getHost() {
        return this.context_.host;
      }
      /**
       * @param {string} port
      */

    }, {
      key: 'setPort',
      value: function setPort(port) {
        this.context_.port = port;
      }
      /**
       * @return {string}
       */

    }, {
      key: 'getPort',
      value: function getPort() {
        return this.context_.port;
      }
    }, {
      key: 'buildQueryParams',

      /**
       * Builds query string params added to a URL.
       * Port of jQuery's $.param() function, so credit is due there.
       *
       * @param {string} prefix
       * @param {Array|Object|string} params
       * @param {Function} add
       */
      value: function buildQueryParams(prefix, params, add) {
        var _this = this;

        var name = void 0;
        var rbracket = new RegExp(/\[\]$/);

        if (params instanceof Array) {
          params.forEach(function (val, i) {
            if (rbracket.test(prefix)) {
              add(prefix, val);
            } else {
              _this.buildQueryParams(prefix + '[' + ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' ? i : '') + ']', val, add);
            }
          });
        } else if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {
          for (name in params) {
            this.buildQueryParams(prefix + '[' + name + ']', params[name], add);
          }
        } else {
          add(prefix, params);
        }
      }
      /**
       * Returns a raw route object.
       *
       * @param {string} name
       * @return {Router.Route}
       */

    }, {
      key: 'getRoute',
      value: function getRoute(name) {
        var prefixedName = this.context_.prefix + name;

        if (!(prefixedName in this.routes_)) {
          // Check first for default route before failing
          if (!(name in this.routes_)) {
            throw new Error('The route "' + name + '" does not exist.');
          }
        } else {
          name = prefixedName;
        }

        return this.routes_[name];
      }
      /**
       * Generates the URL for a route.
       *
       * @param {string} name
       * @param {Object.<string, string>} opt_params
       * @param {boolean} absolute
       * @return {string}
       */

    }, {
      key: 'generate',
      value: function generate(name, opt_params) {
        var absolute = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        var route = this.getRoute(name),
            params = opt_params || {},
            unusedParams = _extends({}, params),
            url = '',
            optional = true,
            host = '',
            port = typeof this.getPort() == "undefined" || this.getPort() === null ? '' : this.getPort();

        route.tokens.forEach(function (token) {
          if ('text' === token[0]) {
            url = token[1] + url;
            optional = false;
            return;
          }

          if ('variable' === token[0]) {
            var hasDefault = route.defaults && token[3] in route.defaults;

            if (false === optional || !hasDefault || token[3] in params && params[token[3]] != route.defaults[token[3]]) {
              var value = void 0;

              if (token[3] in params) {
                value = params[token[3]];
                delete unusedParams[token[3]];
              } else if (hasDefault) {
                value = route.defaults[token[3]];
              } else if (optional) {
                return;
              } else {
                throw new Error('The route "' + name + '" requires the parameter "' + token[3] + '".');
              }

              var empty = true === value || false === value || '' === value;

              if (!empty || !optional) {
                var encodedValue = encodeURIComponent(value).replace(/%2F/g, '/');

                if ('null' === encodedValue && null === value) {
                  encodedValue = '';
                }

                url = token[1] + encodedValue + url;
              }

              optional = false;
            } else if (hasDefault && token[3] in unusedParams) {
              delete unusedParams[token[3]];
            }

            return;
          }

          throw new Error('The token type "' + token[0] + '" is not supported.');
        });

        if (url === '') {
          url = '/';
        }

        route.hosttokens.forEach(function (token) {
          var value = void 0;

          if ('text' === token[0]) {
            host = token[1] + host;
            return;
          }

          if ('variable' === token[0]) {
            if (token[3] in params) {
              value = params[token[3]];
              delete unusedParams[token[3]];
            } else if (route.defaults && token[3] in route.defaults) {
              value = route.defaults[token[3]];
            }

            host = token[1] + value + host;
          }
        }); // Foo-bar!

        url = this.context_.base_url + url;

        if (route.requirements && "_scheme" in route.requirements && this.getScheme() != route.requirements["_scheme"]) {
          url = route.requirements["_scheme"] + "://" + (host || this.getHost()) + url;
        } else if ("undefined" !== typeof route.schemes && "undefined" !== typeof route.schemes[0] && this.getScheme() !== route.schemes[0]) {
          url = route.schemes[0] + "://" + (host || this.getHost()) + url;
        } else if (host && this.getHost() !== host + ('' === port ? '' : ':' + port)) {
          url = this.getScheme() + "://" + host + ('' === port ? '' : ':' + port) + url;
        } else if (absolute === true) {
          url = this.getScheme() + "://" + this.getHost() + url;
        }

        if (Object.keys(unusedParams).length > 0) {
          var prefix = void 0;
          var queryParams = [];

          var add = function add(key, value) {
            // if value is a function then call it and assign it's return value as value
            value = typeof value === 'function' ? value() : value; // change null to empty string

            value = value === null ? '' : value;
            queryParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
          };

          for (prefix in unusedParams) {
            this.buildQueryParams(prefix, unusedParams[prefix], add);
          }

          url = url + '?' + queryParams.join('&').replace(/%20/g, '+');
        }

        return url;
      }
    }], [{
      key: 'getInstance',
      value: function getInstance() {
        return Routing;
      }
      /**
       * Configures the current Router instance with the provided data.
       * @param {Object} data
       */

    }, {
      key: 'setData',
      value: function setData(data) {
        var router = Router.getInstance();
        router.setRoutingData(data);
      }
    }]);

    return Router;
  }();
  /**
   * @typedef {{
   *     tokens: (Array.<Array.<string>>),
   *     defaults: (Object.<string, string>),
   *     requirements: Object,
   *     hosttokens: (Array.<string>)
   * }}
   */


  Router.Route;
  /**
   * @typedef {{
   *     base_url: (string)
   * }}
   */

  Router.Context;
  /**
   * Router singleton.
   * @const
   * @type {Router}
   */

  var Routing = new Router();
  return {
    Router: Router,
    Routing: Routing
  };
});

/***/ })

},[["./assets/js/cropper/testcrop.js","runtime","vendors~crop"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvY3JvcHBlci90ZXN0Y3JvcC5qcyIsIndlYnBhY2s6Ly8vLi92ZW5kb3IvZnJpZW5kc29mc3ltZm9ueS9qc3JvdXRpbmctYnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvanMvcm91dGVyLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJSb3V0aW5nIiwic2V0Um91dGluZ0RhdGEiLCJSb3V0ZXMiLCJjcm9wcGVyIiwicHJldmlldyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJmaWxlX2lucHV0Iiwid2luZG93IiwicHJldmlld0ZpbGUiLCJmaWxlIiwiZmlsZXMiLCJyZWFkZXIiLCJGaWxlUmVhZGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50Iiwic3JjIiwicmVzdWx0IiwicmVhZEFzRGF0YVVSTCIsIkNyb3BwZXIiLCJhc3BlY3RSYXRpbyIsImZvcm0iLCJwcmV2ZW50RGVmYXVsdCIsImdldENyb3BwZWRDYW52YXMiLCJtYXhIZWlnaHQiLCJtYXhXaWR0aCIsInRvQmxvYiIsImJsb2IiLCJrdWRha2VwYW5nIiwiYWpheFdpdGhBeGlvcyIsInVybCIsImdlbmVyYXRlIiwiZGF0YSIsIkZvcm1EYXRhIiwiYXBwZW5kIiwiYXhpb3MiLCJtZXRob2QiLCJoZWFkZXJzIiwidGhlbiIsInJlc3BvbnNlIiwiY29uc29sZSIsImxvZyIsImNhdGNoIiwiZXJyb3IiLCJ0aHVtYiIsInJvb3QiLCJmYWN0b3J5Iiwicm91dGluZyIsImRlZmluZSIsIl9leHRlbmRzIiwiT2JqZWN0IiwiYXNzaWduIiwidGFyZ2V0IiwiaSIsImFyZ3VtZW50cyIsImxlbmd0aCIsInNvdXJjZSIsImtleSIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsIl90eXBlb2YiLCJTeW1ib2wiLCJpdGVyYXRvciIsIm9iaiIsImNvbnN0cnVjdG9yIiwiX2NyZWF0ZUNsYXNzIiwiZGVmaW5lUHJvcGVydGllcyIsInByb3BzIiwiZGVzY3JpcHRvciIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsImRlZmluZVByb3BlcnR5IiwiQ29uc3RydWN0b3IiLCJwcm90b1Byb3BzIiwic3RhdGljUHJvcHMiLCJfY2xhc3NDYWxsQ2hlY2siLCJpbnN0YW5jZSIsIlR5cGVFcnJvciIsIlJvdXRlciIsImNvbnRleHQiLCJyb3V0ZXMiLCJjb250ZXh0XyIsImJhc2VfdXJsIiwicHJlZml4IiwiaG9zdCIsInBvcnQiLCJzY2hlbWUiLCJzZXRSb3V0ZXMiLCJ2YWx1ZSIsInNldEJhc2VVcmwiLCJzZXRQcmVmaXgiLCJzZXRQb3J0Iiwic2V0SG9zdCIsInNldFNjaGVtZSIsInJvdXRlc18iLCJmcmVlemUiLCJnZXRSb3V0ZXMiLCJiYXNlVXJsIiwiZ2V0QmFzZVVybCIsImdldFNjaGVtZSIsImdldEhvc3QiLCJnZXRQb3J0IiwiYnVpbGRRdWVyeVBhcmFtcyIsInBhcmFtcyIsImFkZCIsIl90aGlzIiwibmFtZSIsInJicmFja2V0IiwiUmVnRXhwIiwiQXJyYXkiLCJmb3JFYWNoIiwidmFsIiwidGVzdCIsImdldFJvdXRlIiwicHJlZml4ZWROYW1lIiwiRXJyb3IiLCJvcHRfcGFyYW1zIiwiYWJzb2x1dGUiLCJ1bmRlZmluZWQiLCJyb3V0ZSIsInVudXNlZFBhcmFtcyIsIm9wdGlvbmFsIiwidG9rZW5zIiwidG9rZW4iLCJoYXNEZWZhdWx0IiwiZGVmYXVsdHMiLCJlbXB0eSIsImVuY29kZWRWYWx1ZSIsImVuY29kZVVSSUNvbXBvbmVudCIsInJlcGxhY2UiLCJob3N0dG9rZW5zIiwicmVxdWlyZW1lbnRzIiwic2NoZW1lcyIsImtleXMiLCJxdWVyeVBhcmFtcyIsInB1c2giLCJqb2luIiwiZ2V0SW5zdGFuY2UiLCJzZXREYXRhIiwicm91dGVyIiwiUm91dGUiLCJDb250ZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLG1CQUFPLENB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QUFLLEVBQUUsU0FBU2tELE9BQVQsQ0FBaUI1RyxJQUFqQixFQUF1QjtBQUMxQixZQUFJNkcsTUFBTSxHQUFHN0QsTUFBTSxDQUFDMkQsV0FBUCxFQUFiO0FBRUFFLGNBQU0sQ0FBQzVJLGNBQVAsQ0FBc0IrQixJQUF0QjtBQUNIO0FBTkYsS0FYQyxDQTlUUSxDQUFaOztBQWtWQSxXQUFPZ0QsTUFBUDtBQUNILEdBdldZLEVBQWI7QUF5V0E7Ozs7Ozs7Ozs7QUFVQUEsUUFBTSxDQUFDOEQsS0FBUDtBQUVBOzs7Ozs7QUFLQTlELFFBQU0sQ0FBQytELE9BQVA7QUFFQTs7Ozs7O0FBS0EsTUFBSS9JLE9BQU8sR0FBRyxJQUFJZ0YsTUFBSixFQUFkO0FBRUksU0FBTztBQUFFQSxVQUFNLEVBQUVBLE1BQVY7QUFBa0JoRixXQUFPLEVBQUVBO0FBQTNCLEdBQVA7QUFDSCxDQTVhQSxDQUFELEMiLCJmaWxlIjoiY3JvcC5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jcm9wcGVyanMvZGlzdC9jcm9wcGVyLm1pbi5jc3MnKVxyXG5cclxuXHJcbmltcG9ydCBDcm9wcGVyIGZyb20gJ2Nyb3BwZXJqcy9zcmMvanMvY3JvcHBlcidcclxuLy8gY3JvcHBlcmpzL2Rpc3QvY3JvcHBlcidcclxuaW1wb3J0IFJvdXRpbmcgZnJvbSAnLi4vLi4vLi4vdmVuZG9yL2ZyaWVuZHNvZnN5bWZvbnkvanNyb3V0aW5nLWJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2pzL3JvdXRlcidcclxuLy8nLi4vLi4vdmVuZG9yL2ZyaWVuZHNvZnN5bWZvbnkvanNyb3V0aW5nLWJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2pzL3JvdXRlcidcclxuaW1wb3J0IFJvdXRlcyBmcm9tICcuLi8uLi8uLi9wdWJsaWMvanMvZm9zX2pzX3JvdXRlcy5qc29uJ1xyXG4vLycuLi8uLi8uLi9wdWJsaWMvanMvZm9zX2pzX3JvdXRlcy5qc29uJ1xyXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnXHJcblxyXG5cclxuUm91dGluZy5zZXRSb3V0aW5nRGF0YShSb3V0ZXMpXHJcblxyXG5sZXQgY3JvcHBlcjtcclxudmFyIHByZXZpZXcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXZhdGFyJylcclxudmFyIGZpbGVfaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGVzdF9wcm9kdWN0X2ltYWdlJylcclxud2luZG93LnByZXZpZXdGaWxlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IGZpbGUgPSBmaWxlX2lucHV0LmZpbGVzWzBdXHJcbiAgICBsZXQgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxyXG5cclxuICAgIHJlYWRlci5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgcHJldmlldy5zcmMgPSByZWFkZXIucmVzdWx0XHJcbiAgICB9LCBmYWxzZSlcclxuXHJcbiAgICBpZiAoZmlsZSkge1xyXG4gICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpXHJcbiAgICB9XHJcbn1cclxuXHJcbnByZXZpZXcuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgY3JvcHBlciA9IG5ldyBDcm9wcGVyKHByZXZpZXcsIHtcclxuICAgICAgICBhc3BlY3RSYXRpbzogMSAvIDFcclxuICAgIH0pXHJcbn0pXHJcblxyXG5sZXQgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXN0aW5nJylcclxuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuICAgIGNyb3BwZXIuZ2V0Q3JvcHBlZENhbnZhcyh7XHJcbiAgICAgICAgbWF4SGVpZ2h0OiAxMDAwLFxyXG4gICAgICAgIG1heFdpZHRoOiAxMDAwXHJcbiAgICB9KS50b0Jsb2IoZnVuY3Rpb24gKGJsb2IpIHtcclxuICAgICAgICAvLyBhamF4V2l0aEF4aW9zKGJsb2IpXHJcbiAgICAgICAgXHJcbiAgICAgICAga3VkYWtlcGFuZyhibG9iKVxyXG4gICAgfSlcclxufSlcclxuZnVuY3Rpb24gYWpheFdpdGhBeGlvcyhibG9iKSB7XHJcbiAgICBsZXQgdXJsID0gUm91dGluZy5nZW5lcmF0ZSgnaW1hZ2UnKVxyXG4gICAgbGV0IGRhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSlcclxuICAgIGRhdGEuYXBwZW5kKCdmaWxlJywgYmxvYilcclxuICAgIFxyXG4gICAgYXhpb3Moe1xyXG4gICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgfSlcclxuICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgfSlcclxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKVxyXG4gICAgfSlcclxufVxyXG5cclxudmFyIHRodW1iID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RodW1iJylcclxuIiwiKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG4gICAgdmFyIHJvdXRpbmcgPSBmYWN0b3J5KCk7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgICAgIGRlZmluZShbXSwgcm91dGluZy5Sb3V0aW5nKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgICAgIC8vIE5vZGUuIERvZXMgbm90IHdvcmsgd2l0aCBzdHJpY3QgQ29tbW9uSlMsIGJ1dFxuICAgICAgICAvLyBvbmx5IENvbW1vbkpTLWxpa2UgZW52aXJvbm1lbnRzIHRoYXQgc3VwcG9ydCBtb2R1bGUuZXhwb3J0cyxcbiAgICAgICAgLy8gbGlrZSBOb2RlLlxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IHJvdXRpbmcuUm91dGluZztcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBCcm93c2VyIGdsb2JhbHMgKHJvb3QgaXMgd2luZG93KVxuICAgICAgICByb290LlJvdXRpbmcgPSByb3V0aW5nLlJvdXRpbmc7XG4gICAgICAgIHJvb3QuZm9zID0ge1xuICAgICAgICAgICAgUm91dGVyOiByb3V0aW5nLlJvdXRlclxuICAgICAgICB9O1xuICAgIH1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBAZmlsZW92ZXJ2aWV3IFRoaXMgZmlsZSBkZWZpbmVzIHRoZSBSb3V0ZXIgY2xhc3MuXG4gKlxuICogWW91IGNhbiBjb21waWxlIHRoaXMgZmlsZSBieSBydW5uaW5nIHRoZSBmb2xsb3dpbmcgY29tbWFuZCBmcm9tIHRoZSBSZXNvdXJjZXMgZm9sZGVyOlxuICpcbiAqICAgIG5wbSBpbnN0YWxsICYmIG5wbSBydW4gYnVpbGRcbiAqL1xuXG4vKipcbiAqIENsYXNzIFJvdXRlclxuICovXG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIFJvdXRlciA9IGZ1bmN0aW9uICgpIHtcblxuICAgIC8qKlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7Um91dGVyLkNvbnRleHQ9fSBjb250ZXh0XG4gICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywgUm91dGVyLlJvdXRlPj19IHJvdXRlc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIFJvdXRlcihjb250ZXh0LCByb3V0ZXMpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFJvdXRlcik7XG5cbiAgICAgICAgdGhpcy5jb250ZXh0XyA9IGNvbnRleHQgfHwgeyBiYXNlX3VybDogJycsIHByZWZpeDogJycsIGhvc3Q6ICcnLCBwb3J0OiAnJywgc2NoZW1lOiAnJyB9O1xuICAgICAgICB0aGlzLnNldFJvdXRlcyhyb3V0ZXMgfHwge30pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGN1cnJlbnQgaW5zdGFuY2UuXG4gICAgICogQHJldHVybnMge1JvdXRlcn1cbiAgICAgKi9cblxuXG4gICAgX2NyZWF0ZUNsYXNzKFJvdXRlciwgW3tcbiAgICAgICAga2V5OiAnc2V0Um91dGluZ0RhdGEnLFxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldHMgZGF0YSBmb3IgdGhlIGN1cnJlbnQgaW5zdGFuY2VcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRSb3V0aW5nRGF0YShkYXRhKSB7XG4gICAgICAgICAgICB0aGlzLnNldEJhc2VVcmwoZGF0YVsnYmFzZV91cmwnXSk7XG4gICAgICAgICAgICB0aGlzLnNldFJvdXRlcyhkYXRhWydyb3V0ZXMnXSk7XG5cbiAgICAgICAgICAgIGlmICgncHJlZml4JyBpbiBkYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQcmVmaXgoZGF0YVsncHJlZml4J10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCdwb3J0JyBpbiBkYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQb3J0KGRhdGFbJ3BvcnQnXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2V0SG9zdChkYXRhWydob3N0J10pO1xuICAgICAgICAgICAgdGhpcy5zZXRTY2hlbWUoZGF0YVsnc2NoZW1lJ10pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsIFJvdXRlci5Sb3V0ZT59IHJvdXRlc1xuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnc2V0Um91dGVzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNldFJvdXRlcyhyb3V0ZXMpIHtcbiAgICAgICAgICAgIHRoaXMucm91dGVzXyA9IE9iamVjdC5mcmVlemUocm91dGVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3QuPHN0cmluZywgUm91dGVyLlJvdXRlPn0gcm91dGVzXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdnZXRSb3V0ZXMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Um91dGVzKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm91dGVzXztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVybFxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnc2V0QmFzZVVybCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRCYXNlVXJsKGJhc2VVcmwpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dF8uYmFzZV91cmwgPSBiYXNlVXJsO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2dldEJhc2VVcmwnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0QmFzZVVybCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRleHRfLmJhc2VfdXJsO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcmVmaXhcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3NldFByZWZpeCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRQcmVmaXgocHJlZml4KSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHRfLnByZWZpeCA9IHByZWZpeDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2NoZW1lXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzZXRTY2hlbWUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2V0U2NoZW1lKHNjaGVtZSkge1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0Xy5zY2hlbWUgPSBzY2hlbWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0U2NoZW1lJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldFNjaGVtZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRleHRfLnNjaGVtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gaG9zdFxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnc2V0SG9zdCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRIb3N0KGhvc3QpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dF8uaG9zdCA9IGhvc3Q7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0SG9zdCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRIb3N0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dF8uaG9zdDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gcG9ydFxuICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzZXRQb3J0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNldFBvcnQocG9ydCkge1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0Xy5wb3J0ID0gcG9ydDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdnZXRQb3J0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldFBvcnQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0Xy5wb3J0O1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdidWlsZFF1ZXJ5UGFyYW1zJyxcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBCdWlsZHMgcXVlcnkgc3RyaW5nIHBhcmFtcyBhZGRlZCB0byBhIFVSTC5cbiAgICAgICAgICogUG9ydCBvZiBqUXVlcnkncyAkLnBhcmFtKCkgZnVuY3Rpb24sIHNvIGNyZWRpdCBpcyBkdWUgdGhlcmUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcmVmaXhcbiAgICAgICAgICogQHBhcmFtIHtBcnJheXxPYmplY3R8c3RyaW5nfSBwYXJhbXNcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gYWRkXG4gICAgICAgICAqL1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYnVpbGRRdWVyeVBhcmFtcyhwcmVmaXgsIHBhcmFtcywgYWRkKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICB2YXIgbmFtZSA9IHZvaWQgMDtcbiAgICAgICAgICAgIHZhciByYnJhY2tldCA9IG5ldyBSZWdFeHAoL1xcW1xcXSQvKTtcblxuICAgICAgICAgICAgaWYgKHBhcmFtcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmZvckVhY2goZnVuY3Rpb24gKHZhbCwgaSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmJyYWNrZXQudGVzdChwcmVmaXgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZGQocHJlZml4LCB2YWwpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuYnVpbGRRdWVyeVBhcmFtcyhwcmVmaXggKyAnWycgKyAoKHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHZhbCkpID09PSAnb2JqZWN0JyA/IGkgOiAnJykgKyAnXScsIHZhbCwgYWRkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgodHlwZW9mIHBhcmFtcyA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YocGFyYW1zKSkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgZm9yIChuYW1lIGluIHBhcmFtcykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkUXVlcnlQYXJhbXMocHJlZml4ICsgJ1snICsgbmFtZSArICddJywgcGFyYW1zW25hbWVdLCBhZGQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWRkKHByZWZpeCwgcGFyYW1zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIGEgcmF3IHJvdXRlIG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgICAgICogQHJldHVybiB7Um91dGVyLlJvdXRlfVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0Um91dGUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Um91dGUobmFtZSkge1xuICAgICAgICAgICAgdmFyIHByZWZpeGVkTmFtZSA9IHRoaXMuY29udGV4dF8ucHJlZml4ICsgbmFtZTtcblxuICAgICAgICAgICAgaWYgKCEocHJlZml4ZWROYW1lIGluIHRoaXMucm91dGVzXykpIHtcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBmaXJzdCBmb3IgZGVmYXVsdCByb3V0ZSBiZWZvcmUgZmFpbGluZ1xuICAgICAgICAgICAgICAgIGlmICghKG5hbWUgaW4gdGhpcy5yb3V0ZXNfKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSByb3V0ZSBcIicgKyBuYW1lICsgJ1wiIGRvZXMgbm90IGV4aXN0LicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmFtZSA9IHByZWZpeGVkTmFtZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm91dGVzX1tuYW1lXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZW5lcmF0ZXMgdGhlIFVSTCBmb3IgYSByb3V0ZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywgc3RyaW5nPn0gb3B0X3BhcmFtc1xuICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGFic29sdXRlXG4gICAgICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2dlbmVyYXRlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdlbmVyYXRlKG5hbWUsIG9wdF9wYXJhbXMpIHtcbiAgICAgICAgICAgIHZhciBhYnNvbHV0ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZmFsc2U7XG5cbiAgICAgICAgICAgIHZhciByb3V0ZSA9IHRoaXMuZ2V0Um91dGUobmFtZSksXG4gICAgICAgICAgICAgICAgcGFyYW1zID0gb3B0X3BhcmFtcyB8fCB7fSxcbiAgICAgICAgICAgICAgICB1bnVzZWRQYXJhbXMgPSBfZXh0ZW5kcyh7fSwgcGFyYW1zKSxcbiAgICAgICAgICAgICAgICB1cmwgPSAnJyxcbiAgICAgICAgICAgICAgICBvcHRpb25hbCA9IHRydWUsXG4gICAgICAgICAgICAgICAgaG9zdCA9ICcnLFxuICAgICAgICAgICAgICAgIHBvcnQgPSB0eXBlb2YgdGhpcy5nZXRQb3J0KCkgPT0gXCJ1bmRlZmluZWRcIiB8fCB0aGlzLmdldFBvcnQoKSA9PT0gbnVsbCA/ICcnIDogdGhpcy5nZXRQb3J0KCk7XG5cbiAgICAgICAgICAgIHJvdXRlLnRva2Vucy5mb3JFYWNoKGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgICAgICAgICAgIGlmICgndGV4dCcgPT09IHRva2VuWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIHVybCA9IHRva2VuWzFdICsgdXJsO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25hbCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoJ3ZhcmlhYmxlJyA9PT0gdG9rZW5bMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGhhc0RlZmF1bHQgPSByb3V0ZS5kZWZhdWx0cyAmJiB0b2tlblszXSBpbiByb3V0ZS5kZWZhdWx0cztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZhbHNlID09PSBvcHRpb25hbCB8fCAhaGFzRGVmYXVsdCB8fCB0b2tlblszXSBpbiBwYXJhbXMgJiYgcGFyYW1zW3Rva2VuWzNdXSAhPSByb3V0ZS5kZWZhdWx0c1t0b2tlblszXV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHZvaWQgMDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuWzNdIGluIHBhcmFtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gcGFyYW1zW3Rva2VuWzNdXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgdW51c2VkUGFyYW1zW3Rva2VuWzNdXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRGVmYXVsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gcm91dGUuZGVmYXVsdHNbdG9rZW5bM11dO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRpb25hbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgcm91dGUgXCInICsgbmFtZSArICdcIiByZXF1aXJlcyB0aGUgcGFyYW1ldGVyIFwiJyArIHRva2VuWzNdICsgJ1wiLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZW1wdHkgPSB0cnVlID09PSB2YWx1ZSB8fCBmYWxzZSA9PT0gdmFsdWUgfHwgJycgPT09IHZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWVtcHR5IHx8ICFvcHRpb25hbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbmNvZGVkVmFsdWUgPSBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpLnJlcGxhY2UoLyUyRi9nLCAnLycpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCdudWxsJyA9PT0gZW5jb2RlZFZhbHVlICYmIG51bGwgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuY29kZWRWYWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9IHRva2VuWzFdICsgZW5jb2RlZFZhbHVlICsgdXJsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25hbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGhhc0RlZmF1bHQgJiYgdG9rZW5bM10gaW4gdW51c2VkUGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgdW51c2VkUGFyYW1zW3Rva2VuWzNdXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSB0b2tlbiB0eXBlIFwiJyArIHRva2VuWzBdICsgJ1wiIGlzIG5vdCBzdXBwb3J0ZWQuJyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHVybCA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICB1cmwgPSAnLyc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJvdXRlLmhvc3R0b2tlbnMuZm9yRWFjaChmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB2b2lkIDA7XG5cbiAgICAgICAgICAgICAgICBpZiAoJ3RleHQnID09PSB0b2tlblswXSkge1xuICAgICAgICAgICAgICAgICAgICBob3N0ID0gdG9rZW5bMV0gKyBob3N0O1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoJ3ZhcmlhYmxlJyA9PT0gdG9rZW5bMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuWzNdIGluIHBhcmFtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBwYXJhbXNbdG9rZW5bM11dO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHVudXNlZFBhcmFtc1t0b2tlblszXV07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm91dGUuZGVmYXVsdHMgJiYgdG9rZW5bM10gaW4gcm91dGUuZGVmYXVsdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gcm91dGUuZGVmYXVsdHNbdG9rZW5bM11dO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaG9zdCA9IHRva2VuWzFdICsgdmFsdWUgKyBob3N0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gRm9vLWJhciFcbiAgICAgICAgICAgIHVybCA9IHRoaXMuY29udGV4dF8uYmFzZV91cmwgKyB1cmw7XG4gICAgICAgICAgICBpZiAocm91dGUucmVxdWlyZW1lbnRzICYmIFwiX3NjaGVtZVwiIGluIHJvdXRlLnJlcXVpcmVtZW50cyAmJiB0aGlzLmdldFNjaGVtZSgpICE9IHJvdXRlLnJlcXVpcmVtZW50c1tcIl9zY2hlbWVcIl0pIHtcbiAgICAgICAgICAgICAgICB1cmwgPSByb3V0ZS5yZXF1aXJlbWVudHNbXCJfc2NoZW1lXCJdICsgXCI6Ly9cIiArIChob3N0IHx8IHRoaXMuZ2V0SG9zdCgpKSArIHVybDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIHJvdXRlLnNjaGVtZXMgJiYgXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIHJvdXRlLnNjaGVtZXNbMF0gJiYgdGhpcy5nZXRTY2hlbWUoKSAhPT0gcm91dGUuc2NoZW1lc1swXSkge1xuICAgICAgICAgICAgICAgIHVybCA9IHJvdXRlLnNjaGVtZXNbMF0gKyBcIjovL1wiICsgKGhvc3QgfHwgdGhpcy5nZXRIb3N0KCkpICsgdXJsO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChob3N0ICYmIHRoaXMuZ2V0SG9zdCgpICE9PSBob3N0ICsgKCcnID09PSBwb3J0ID8gJycgOiAnOicgKyBwb3J0KSkge1xuICAgICAgICAgICAgICAgIHVybCA9IHRoaXMuZ2V0U2NoZW1lKCkgKyBcIjovL1wiICsgaG9zdCArICgnJyA9PT0gcG9ydCA/ICcnIDogJzonICsgcG9ydCkgKyB1cmw7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFic29sdXRlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgdXJsID0gdGhpcy5nZXRTY2hlbWUoKSArIFwiOi8vXCIgKyB0aGlzLmdldEhvc3QoKSArIHVybDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKHVudXNlZFBhcmFtcykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciBwcmVmaXggPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgdmFyIHF1ZXJ5UGFyYW1zID0gW107XG4gICAgICAgICAgICAgICAgdmFyIGFkZCA9IGZ1bmN0aW9uIGFkZChrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHZhbHVlIGlzIGEgZnVuY3Rpb24gdGhlbiBjYWxsIGl0IGFuZCBhc3NpZ24gaXQncyByZXR1cm4gdmFsdWUgYXMgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicgPyB2YWx1ZSgpIDogdmFsdWU7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2hhbmdlIG51bGwgdG8gZW1wdHkgc3RyaW5nXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgPT09IG51bGwgPyAnJyA6IHZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5UGFyYW1zLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgZm9yIChwcmVmaXggaW4gdW51c2VkUGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVpbGRRdWVyeVBhcmFtcyhwcmVmaXgsIHVudXNlZFBhcmFtc1twcmVmaXhdLCBhZGQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHVybCA9IHVybCArICc/JyArIHF1ZXJ5UGFyYW1zLmpvaW4oJyYnKS5yZXBsYWNlKC8lMjAvZywgJysnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHVybDtcbiAgICAgICAgfVxuICAgIH1dLCBbe1xuICAgICAgICBrZXk6ICdnZXRJbnN0YW5jZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBSb3V0aW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbmZpZ3VyZXMgdGhlIGN1cnJlbnQgUm91dGVyIGluc3RhbmNlIHdpdGggdGhlIHByb3ZpZGVkIGRhdGEuXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzZXREYXRhJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNldERhdGEoZGF0YSkge1xuICAgICAgICAgICAgdmFyIHJvdXRlciA9IFJvdXRlci5nZXRJbnN0YW5jZSgpO1xuXG4gICAgICAgICAgICByb3V0ZXIuc2V0Um91dGluZ0RhdGEoZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gUm91dGVyO1xufSgpO1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgICAgdG9rZW5zOiAoQXJyYXkuPEFycmF5LjxzdHJpbmc+PiksXG4gKiAgICAgZGVmYXVsdHM6IChPYmplY3QuPHN0cmluZywgc3RyaW5nPiksXG4gKiAgICAgcmVxdWlyZW1lbnRzOiBPYmplY3QsXG4gKiAgICAgaG9zdHRva2VuczogKEFycmF5LjxzdHJpbmc+KVxuICogfX1cbiAqL1xuXG5cblJvdXRlci5Sb3V0ZTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICAgIGJhc2VfdXJsOiAoc3RyaW5nKVxuICogfX1cbiAqL1xuUm91dGVyLkNvbnRleHQ7XG5cbi8qKlxuICogUm91dGVyIHNpbmdsZXRvbi5cbiAqIEBjb25zdFxuICogQHR5cGUge1JvdXRlcn1cbiAqL1xudmFyIFJvdXRpbmcgPSBuZXcgUm91dGVyKCk7XG5cbiAgICByZXR1cm4geyBSb3V0ZXI6IFJvdXRlciwgUm91dGluZzogUm91dGluZyB9O1xufSkpOyJdLCJzb3VyY2VSb290IjoiIn0=