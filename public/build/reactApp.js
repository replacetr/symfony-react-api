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
    axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/api/orders").then(response => {
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

  render() {
    console.log("state->", this.state);
    const {
      data,
      jsonData
    } = this.state;
    const objData = JSON.parse(jsonData);
    console.log(objData);
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "container"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      onClick: () => this.tinguk()
    }, "log"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, objData.length && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Json__WEBPACK_IMPORTED_MODULE_3__["default"], {
      objData: objData
    }))));
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



react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component_App__WEBPACK_IMPORTED_MODULE_2__["default"], null), document.getElementById('root'));

/***/ })

},[["./assets/js/react-app/react-app.js","runtime","vendors~crop~reactApp","vendors~reactApp"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvcmVhY3QtYXBwL2NvbXBvbmVudC9BcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3JlYWN0LWFwcC9jb21wb25lbnQvQm9yYW5nLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9yZWFjdC1hcHAvY29tcG9uZW50L0pzb24uanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3JlYWN0LWFwcC9yZWFjdC1hcHAuanMiXSwibmFtZXMiOlsiQXBwIiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsInN0YXRlIiwiZGF0YSIsImpzb25EYXRhIiwidGluZ3VrIiwiYmluZCIsImNvbXBvbmVudERpZE1vdW50IiwiYXhpb3MiLCJnZXQiLCJ0aGVuIiwicmVzcG9uc2UiLCJjb25zb2xlIiwibG9nIiwiY2F0Y2giLCJlIiwiZGF0YUZyb20iLCJzZXNzaW9uU3RvcmFnZSIsImdldEl0ZW0iLCJzZXRTdGF0ZSIsInJlbmRlciIsIm9iakRhdGEiLCJKU09OIiwicGFyc2UiLCJsZW5ndGgiLCJCb3JhbmciLCJtYXAiLCJpZCIsInByb2R1Y3RJbWFnZSIsIkpzb24iLCJpIiwiUmVhY3RET00iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNQSxHQUFOLFNBQWtCQywrQ0FBbEIsQ0FBNEI7QUFDMUJDLGFBQVcsQ0FBQ0MsS0FBRCxFQUFRO0FBQ2pCLFVBQU1BLEtBQU47QUFDQSxTQUFLQyxLQUFMLEdBQWE7QUFDWEMsVUFBSSxFQUFFLElBREs7QUFFWEMsY0FBUSxFQUFFO0FBRkMsS0FBYjtBQUtBLFNBQUtDLE1BQUwsR0FBYyxLQUFLQSxNQUFMLENBQVlDLElBQVosQ0FBaUIsSUFBakIsQ0FBZDtBQUNEOztBQUVEQyxtQkFBaUIsR0FBRztBQUNsQkMsZ0RBQUssQ0FDRkMsR0FESCxDQUNPLGFBRFAsRUFFR0MsSUFGSCxDQUVRQyxRQUFRLElBQUk7QUFDaEJDLGFBQU8sQ0FBQ0MsR0FBUixDQUFZLFVBQVosRUFBd0JGLFFBQVEsQ0FBQ1IsSUFBakM7QUFDRCxLQUpILEVBS0dXLEtBTEgsQ0FLU0MsQ0FBQyxJQUFJO0FBQ1ZILGFBQU8sQ0FBQ0MsR0FBUixDQUFZRSxDQUFaO0FBQ0QsS0FQSDtBQVFEOztBQUVEVixRQUFNLEdBQUc7QUFDUCxVQUFNVyxRQUFRLEdBQUdDLGNBQWMsQ0FBQ0MsT0FBZixDQUF1QixNQUF2QixDQUFqQjtBQUNBLFNBQUtDLFFBQUwsQ0FBYztBQUFFZixjQUFRLEVBQUVZO0FBQVosS0FBZDtBQUNBSixXQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLWCxLQUFqQjtBQUNEOztBQUNEa0IsUUFBTSxHQUFHO0FBQ1BSLFdBQU8sQ0FBQ0MsR0FBUixDQUFZLFNBQVosRUFBdUIsS0FBS1gsS0FBNUI7QUFDQSxVQUFNO0FBQUVDLFVBQUY7QUFBUUM7QUFBUixRQUFxQixLQUFLRixLQUFoQztBQUVBLFVBQU1tQixPQUFPLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXbkIsUUFBWCxDQUFoQjtBQUNBUSxXQUFPLENBQUNDLEdBQVIsQ0FBWVEsT0FBWjtBQUVBLFdBQ0Usd0VBQ0U7QUFBSyxlQUFTLEVBQUM7QUFBZixPQUNFO0FBQVEsYUFBTyxFQUFFLE1BQU0sS0FBS2hCLE1BQUw7QUFBdkIsYUFERixFQUVFLHVFQUFLZ0IsT0FBTyxDQUFDRyxNQUFSLElBQWtCLDJEQUFDLDZDQUFEO0FBQU0sYUFBTyxFQUFFSDtBQUFmLE1BQXZCLENBRkYsQ0FERixDQURGO0FBZ0JEOztBQWxEeUI7O0FBcURidkIsa0VBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMURBO0FBRWUsTUFBTTJCLE1BQU4sU0FBcUIxQiwrQ0FBckIsQ0FBK0I7QUFBQTtBQUFBOztBQUFBLG1DQUNwQyxFQURvQztBQUFBOztBQUU1Q3FCLFFBQU0sR0FBRztBQUNQLFVBQU07QUFBRWpCO0FBQUYsUUFBVyxLQUFLRixLQUF0QjtBQUNBLFdBQ0Usd0VBQ0dFLElBQUksQ0FBQ3VCLEdBQUwsQ0FBU1gsQ0FBQyxJQUNUO0FBQUssZUFBUyxFQUFDLFdBQWY7QUFBMkIsU0FBRyxFQUFFQSxDQUFDLENBQUNZO0FBQWxDLE9BQ0U7QUFBSyxTQUFHLEVBQUcsV0FBVVosQ0FBQyxDQUFDYSxZQUFhO0FBQXBDLE1BREYsQ0FERCxDQURILENBREY7QUFTRDs7QUFiMkMsQzs7Ozs7Ozs7Ozs7O0FDRjlDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFZSxNQUFNQyxJQUFOLFNBQW1COUIsK0NBQW5CLENBQTZCO0FBQzFDcUIsUUFBTSxHQUFHO0FBQ1AsVUFBTTtBQUFFQztBQUFGLFFBQWMsS0FBS3BCLEtBQXpCO0FBQ0EsV0FDRSx3RUFDR29CLE9BQU8sQ0FBQ0ssR0FBUixDQUFZLENBQUNYLENBQUQsRUFBSWUsQ0FBSixLQUNYO0FBQUksU0FBRyxFQUFFQTtBQUFULE9BQWFmLENBQUMsQ0FBQ1ksRUFBZixDQURELENBREgsQ0FERjtBQU9EOztBQVZ5QyxDOzs7Ozs7Ozs7Ozs7QUNGNUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBSUFJLGdEQUFRLENBQUNYLE1BQVQsQ0FBZ0IsMkRBQUMsc0RBQUQsT0FBaEIsRUFBeUJZLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixNQUF4QixDQUF6QixFIiwiZmlsZSI6InJlYWN0QXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XHJcbmltcG9ydCBCb3JhbmcgZnJvbSBcIi4vQm9yYW5nXCI7XHJcbmltcG9ydCBKc29uIGZyb20gXCIuL0pzb25cIjtcclxuXHJcbmNsYXNzIEFwcCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGRhdGE6IG51bGwsXHJcbiAgICAgIGpzb25EYXRhOiBcInt9XCJcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy50aW5ndWsgPSB0aGlzLnRpbmd1ay5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICBheGlvc1xyXG4gICAgICAuZ2V0KFwiL2FwaS9vcmRlcnNcIilcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicmVzcG9uc2VcIiwgcmVzcG9uc2UuZGF0YSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICB0aW5ndWsoKSB7XHJcbiAgICBjb25zdCBkYXRhRnJvbSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJkYXRhXCIpO1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGpzb25EYXRhOiBkYXRhRnJvbSB9KTtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUpO1xyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcInN0YXRlLT5cIiwgdGhpcy5zdGF0ZSk7XHJcbiAgICBjb25zdCB7IGRhdGEsIGpzb25EYXRhIH0gPSB0aGlzLnN0YXRlO1xyXG5cclxuICAgIGNvbnN0IG9iakRhdGEgPSBKU09OLnBhcnNlKGpzb25EYXRhKTtcclxuICAgIGNvbnNvbGUubG9nKG9iakRhdGEpO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cclxuICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gdGhpcy50aW5ndWsoKX0+bG9nPC9idXR0b24+XHJcbiAgICAgICAgICA8dWw+e29iakRhdGEubGVuZ3RoICYmIDxKc29uIG9iakRhdGE9e29iakRhdGF9IC8+fTwvdWw+XHJcbiAgICAgICAgICB7LyogXHJcbiAgICAgICAgXHJcbiAgICAgICAgICB7LyogZGF0YSB7IWRhdGEgJiYgPGgzPkxvYWRpbmcuLi48L2gzPn1cclxuICAgICAgICAgIHtkYXRhICYmIChcclxuICAgICAgICAgICAgPHVsPlxyXG4gICAgICAgICAgICAgIDxCb3JhbmcgZGF0YT17ZGF0YX0gLz5cclxuICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICl9ICovfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcHA7XHJcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvcmFuZyBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgc3RhdGUgPSB7fTtcclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IGRhdGEgfSA9IHRoaXMucHJvcHM7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIHtkYXRhLm1hcChlID0+IChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCIga2V5PXtlLmlkfT5cclxuICAgICAgICAgICAgPGltZyBzcmM9e2AvaW1hZ2VzLyR7ZS5wcm9kdWN0SW1hZ2V9YH0gLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkpfVxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpzb24gZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHsgb2JqRGF0YSB9ID0gdGhpcy5wcm9wcztcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAge29iakRhdGEubWFwKChlLCBpKSA9PiAoXHJcbiAgICAgICAgICA8bGkga2V5PXtpfT57ZS5pZH08L2xpPlxyXG4gICAgICAgICkpfVxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgQXBwIGZyb20gJy4vY29tcG9uZW50L0FwcCdcclxuXHJcblxyXG5cclxuUmVhY3RET00ucmVuZGVyKDxBcHAgLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JykpO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9