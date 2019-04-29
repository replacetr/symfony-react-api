(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["reactApp"],{

/***/ "./assets/js/react-app/component/App.js":
/*!**********************************************!*\
  !*** ./assets/js/react-app/component/App.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Borang__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Borang */ "./assets/js/react-app/component/Borang.js");
/* harmony import */ var _Json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Json */ "./assets/js/react-app/component/Json.js");
/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sidebar */ "./assets/js/react-app/component/sidebar.js");






class App extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      jsonData: "{}"
    };
    this.tinguk = this.tinguk.bind(this);
  }

  componentDidMount() {
    axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/api/admin/orders").then(response => {
      console.log("response", response.data);
    }).catch(e => {
      console.log(e);
    });
  }

  tinguk() {
    const dataFrom = sessionStorage.getItem("data");
    this.setState({
      jsonData: dataFrom
    });
    console.log(this.state);
  }

  deleteOrder() {
    axios__WEBPACK_IMPORTED_MODULE_1___default.a.delete("/api/admin/all").then(response => {
      console.log("response", response);
    }).catch(e => {
      console.log(e);
    });
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_sidebar__WEBPACK_IMPORTED_MODULE_4__["default"], null));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./assets/js/react-app/component/Borang.js":
/*!*************************************************!*\
  !*** ./assets/js/react-app/component/Borang.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Borang; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class Borang extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {});
  }

  render() {
    const {
      data
    } = this.props;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, data.map(e => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "container",
      key: e.id
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: `/images/${e.productImage}`
    }))));
  }

}

/***/ }),

/***/ "./assets/js/react-app/component/Json.js":
/*!***********************************************!*\
  !*** ./assets/js/react-app/component/Json.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Json; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

class Json extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    const {
      objData
    } = this.props;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, objData.map((e, i) => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      key: i
    }, e.id)));
  }

}

/***/ }),

/***/ "./assets/js/react-app/component/dashboard.css":
/*!*****************************************************!*\
  !*** ./assets/js/react-app/component/dashboard.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./assets/js/react-app/component/sidebar.js":
/*!**************************************************!*\
  !*** ./assets/js/react-app/component/sidebar.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Sidebar; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

class Sidebar extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("nav", {
      className: "col-md-2 d-none d-md-block bg-light sidebar"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "sidebar-sticky"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "nav flex-column"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: "nav-item"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: "nav-link",
      href: "#"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      "data-feather": "home"
    }), "Dashboard")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: "nav-item"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: "nav-link active",
      href: "#"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      "data-feather": "file"
    }), "Orders")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: "nav-item"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: "nav-link",
      href: "#"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      "data-feather": "users"
    }), "Customers")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: "nav-item dropdown "
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: "nav-link dropdown-toggle",
      "data-toggle": "dropdown",
      href: "#",
      role: "button",
      "aria-haspopup": "true",
      "aria-expanded": "true"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      "data-feather": "shopping-cart"
    }), " Product"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "dropdown-menu ",
      "x-placement": "bottom-start" // style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 38px, 0px);"

    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: "dropdown-item",
      href: "#cat"
    }, "Add Category"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: "dropdown-item",
      href: "#pro"
    }, "Add Product"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: "nav-item dropdown "
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: "nav-link dropdown-toggle",
      "data-toggle": "dropdown",
      href: "#",
      role: "button",
      "aria-haspopup": "true",
      "aria-expanded": "true"
    }, "email"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "dropdown-menu ",
      "x-placement": "bottom-start" // style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 38px, 0px);"

    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: "dropdown-item",
      href: "#logout"
    }, "Logout")))))));
  }

}

/***/ }),

/***/ "./assets/js/react-app/react-app.js":
/*!******************************************!*\
  !*** ./assets/js/react-app/react-app.js ***!
  \******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _component_App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./component/App */ "./assets/js/react-app/component/App.js");
/* harmony import */ var _react_app_component_dashboard_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../react-app/component/dashboard.css */ "./assets/js/react-app/component/dashboard.css");
/* harmony import */ var _react_app_component_dashboard_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_react_app_component_dashboard_css__WEBPACK_IMPORTED_MODULE_3__);




react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component_App__WEBPACK_IMPORTED_MODULE_2__["default"], null), document.getElementById("root"));

/***/ })

},[["./assets/js/react-app/react-app.js","runtime","vendors~crop~reactApp","vendors~reactApp"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvcmVhY3QtYXBwL2NvbXBvbmVudC9BcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3JlYWN0LWFwcC9jb21wb25lbnQvQm9yYW5nLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9yZWFjdC1hcHAvY29tcG9uZW50L0pzb24uanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3JlYWN0LWFwcC9jb21wb25lbnQvZGFzaGJvYXJkLmNzcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvcmVhY3QtYXBwL2NvbXBvbmVudC9zaWRlYmFyLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9yZWFjdC1hcHAvcmVhY3QtYXBwLmpzIl0sIm5hbWVzIjpbIkFwcCIsIkNvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJzdGF0ZSIsImRhdGEiLCJqc29uRGF0YSIsInRpbmd1ayIsImJpbmQiLCJjb21wb25lbnREaWRNb3VudCIsImF4aW9zIiwiZ2V0IiwidGhlbiIsInJlc3BvbnNlIiwiY29uc29sZSIsImxvZyIsImNhdGNoIiwiZSIsImRhdGFGcm9tIiwic2Vzc2lvblN0b3JhZ2UiLCJnZXRJdGVtIiwic2V0U3RhdGUiLCJkZWxldGVPcmRlciIsImRlbGV0ZSIsInJlbmRlciIsIkJvcmFuZyIsIm1hcCIsImlkIiwicHJvZHVjdEltYWdlIiwiSnNvbiIsIm9iakRhdGEiLCJpIiwiU2lkZWJhciIsIlJlYWN0RE9NIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQU1BLEdBQU4sU0FBa0JDLCtDQUFsQixDQUE0QjtBQUMxQkMsYUFBVyxDQUFDQyxLQUFELEVBQVE7QUFDakIsVUFBTUEsS0FBTjtBQUNBLFNBQUtDLEtBQUwsR0FBYTtBQUNY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LE9BQWhCLEVBQXlCVSxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBekIsRSIsImZpbGUiOiJyZWFjdEFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xyXG5pbXBvcnQgQm9yYW5nIGZyb20gXCIuL0JvcmFuZ1wiO1xyXG5pbXBvcnQgSnNvbiBmcm9tIFwiLi9Kc29uXCI7XHJcbmltcG9ydCBTaWRlYmFyIGZyb20gXCIuL3NpZGViYXJcIjtcclxuXHJcbmNsYXNzIEFwcCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGRhdGE6IG51bGwsXHJcbiAgICAgIGpzb25EYXRhOiBcInt9XCJcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy50aW5ndWsgPSB0aGlzLnRpbmd1ay5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICBheGlvc1xyXG4gICAgICAuZ2V0KFwiL2FwaS9hZG1pbi9vcmRlcnNcIilcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicmVzcG9uc2VcIiwgcmVzcG9uc2UuZGF0YSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICB0aW5ndWsoKSB7XHJcbiAgICBjb25zdCBkYXRhRnJvbSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJkYXRhXCIpO1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGpzb25EYXRhOiBkYXRhRnJvbSB9KTtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUpO1xyXG4gIH1cclxuICBkZWxldGVPcmRlcigpIHtcclxuICAgIGF4aW9zXHJcbiAgICAgIC5kZWxldGUoXCIvYXBpL2FkbWluL2FsbFwiKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJyZXNwb25zZVwiLCByZXNwb25zZSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPFNpZGViYXIgLz5cclxuICAgICAgICB7LyogPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5EZWxldCBBbGwgT3JkZXJzPC9kaXY+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBvbkNsaWNrPXsoKSA9PiB0aGlzLmRlbGV0ZU9yZGVyKCl9PlxyXG4gICAgICAgICAgRGVsZXRlXHJcbiAgICAgICAgPC9idXR0b24+ICovfVxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcHA7XHJcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvcmFuZyBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgc3RhdGUgPSB7fTtcclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IGRhdGEgfSA9IHRoaXMucHJvcHM7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIHtkYXRhLm1hcChlID0+IChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCIga2V5PXtlLmlkfT5cclxuICAgICAgICAgICAgPGltZyBzcmM9e2AvaW1hZ2VzLyR7ZS5wcm9kdWN0SW1hZ2V9YH0gLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkpfVxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpzb24gZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHsgb2JqRGF0YSB9ID0gdGhpcy5wcm9wcztcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAge29iakRhdGEubWFwKChlLCBpKSA9PiAoXHJcbiAgICAgICAgICA8bGkga2V5PXtpfT57ZS5pZH08L2xpPlxyXG4gICAgICAgICkpfVxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpZGViYXIgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxSZWFjdC5GcmFnbWVudD5cclxuICAgICAgICA8bmF2IGNsYXNzTmFtZT1cImNvbC1tZC0yIGQtbm9uZSBkLW1kLWJsb2NrIGJnLWxpZ2h0IHNpZGViYXJcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2lkZWJhci1zdGlja3lcIj5cclxuICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cIm5hdiBmbGV4LWNvbHVtblwiPlxyXG4gICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwibmF2LWxpbmtcIiBocmVmPVwiI1wiPlxyXG4gICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLWZlYXRoZXI9XCJob21lXCIgLz5cclxuICAgICAgICAgICAgICAgICAgRGFzaGJvYXJkXHJcbiAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cIm5hdi1saW5rIGFjdGl2ZVwiIGhyZWY9XCIjXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtZmVhdGhlcj1cImZpbGVcIiAvPlxyXG4gICAgICAgICAgICAgICAgICBPcmRlcnNcclxuICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICA8L2xpPlxyXG5cclxuICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cIm5hdi1saW5rXCIgaHJlZj1cIiNcIj5cclxuICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1mZWF0aGVyPVwidXNlcnNcIiAvPlxyXG4gICAgICAgICAgICAgICAgICBDdXN0b21lcnNcclxuICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICA8L2xpPlxyXG5cclxuICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW0gZHJvcGRvd24gXCI+XHJcbiAgICAgICAgICAgICAgICA8YVxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJuYXYtbGluayBkcm9wZG93bi10b2dnbGVcIlxyXG4gICAgICAgICAgICAgICAgICBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCJcclxuICAgICAgICAgICAgICAgICAgaHJlZj1cIiNcIlxyXG4gICAgICAgICAgICAgICAgICByb2xlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgICAgYXJpYS1oYXNwb3B1cD1cInRydWVcIlxyXG4gICAgICAgICAgICAgICAgICBhcmlhLWV4cGFuZGVkPVwidHJ1ZVwiXHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtZmVhdGhlcj1cInNob3BwaW5nLWNhcnRcIiAvPiBQcm9kdWN0XHJcbiAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImRyb3Bkb3duLW1lbnUgXCJcclxuICAgICAgICAgICAgICAgICAgeC1wbGFjZW1lbnQ9XCJib3R0b20tc3RhcnRcIlxyXG4gICAgICAgICAgICAgICAgICAvLyBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTsgd2lsbC1jaGFuZ2U6IHRyYW5zZm9ybTsgdG9wOiAwcHg7IGxlZnQ6IDBweDsgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwcHgsIDM4cHgsIDBweCk7XCJcclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiZHJvcGRvd24taXRlbVwiIGhyZWY9XCIjY2F0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgQWRkIENhdGVnb3J5XHJcbiAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiZHJvcGRvd24taXRlbVwiIGhyZWY9XCIjcHJvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgQWRkIFByb2R1Y3RcclxuICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9saT5cclxuXHJcbiAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtIGRyb3Bkb3duIFwiPlxyXG4gICAgICAgICAgICAgICAgPGFcclxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibmF2LWxpbmsgZHJvcGRvd24tdG9nZ2xlXCJcclxuICAgICAgICAgICAgICAgICAgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiXHJcbiAgICAgICAgICAgICAgICAgIGhyZWY9XCIjXCJcclxuICAgICAgICAgICAgICAgICAgcm9sZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAgIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCJcclxuICAgICAgICAgICAgICAgICAgYXJpYS1leHBhbmRlZD1cInRydWVcIlxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICBlbWFpbFxyXG4gICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJkcm9wZG93bi1tZW51IFwiXHJcbiAgICAgICAgICAgICAgICAgIHgtcGxhY2VtZW50PVwiYm90dG9tLXN0YXJ0XCJcclxuICAgICAgICAgICAgICAgICAgLy8gc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7IHdpbGwtY2hhbmdlOiB0cmFuc2Zvcm07IHRvcDogMHB4OyBsZWZ0OiAwcHg7IHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAzOHB4LCAwcHgpO1wiXHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImRyb3Bkb3duLWl0ZW1cIiBocmVmPVwiI2xvZ291dFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIExvZ291dFxyXG4gICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9uYXY+XHJcbiAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XHJcbmltcG9ydCBBcHAgZnJvbSBcIi4vY29tcG9uZW50L0FwcFwiO1xyXG5pbXBvcnQgXCIuLi9yZWFjdC1hcHAvY29tcG9uZW50L2Rhc2hib2FyZC5jc3NcIjtcclxuXHJcblJlYWN0RE9NLnJlbmRlcig8QXBwIC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIikpO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9