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
    axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/admin").then(response => {
      console.log("response", response.data);
      sessionStorage.setItem("data", JSON.stringify(response.data));
      this.setState({
        data: response.data
      });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvcmVhY3QtYXBwL2NvbXBvbmVudC9BcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3JlYWN0LWFwcC9jb21wb25lbnQvQm9yYW5nLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9yZWFjdC1hcHAvY29tcG9uZW50L0pzb24uanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3JlYWN0LWFwcC9yZWFjdC1hcHAuanMiXSwibmFtZXMiOlsiQXBwIiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsInN0YXRlIiwiZGF0YSIsImpzb25EYXRhIiwidGluZ3VrIiwiYmluZCIsImNvbXBvbmVudERpZE1vdW50IiwiYXhpb3MiLCJnZXQiLCJ0aGVuIiwicmVzcG9uc2UiLCJjb25zb2xlIiwibG9nIiwic2Vzc2lvblN0b3JhZ2UiLCJzZXRJdGVtIiwiSlNPTiIsInN0cmluZ2lmeSIsInNldFN0YXRlIiwiY2F0Y2giLCJlIiwiZGF0YUZyb20iLCJnZXRJdGVtIiwicmVuZGVyIiwib2JqRGF0YSIsInBhcnNlIiwibGVuZ3RoIiwiQm9yYW5nIiwibWFwIiwiaWQiLCJwcm9kdWN0SW1hZ2UiLCJKc29uIiwiaSIsIlJlYWN0RE9NIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTUEsR0FBTixTQUFrQkMsK0NBQWxCLENBQTRCO0FBQzFCQyxhQUFXLENBQUNDLEtBQUQsRUFBUTtBQUNqQixVQUFNQSxLQUFOO0FBQ0EsU0FBS0MsS0FBTCxHQUFhO0FBQ1hDLFVBQUksRUFBRSxJQURLO0FBRVhDLGNBQVEsRUFBRTtBQUZDLEtBQWI7QUFLQSxTQUFLQyxNQUFMLEdBQWMsS0FBS0EsTUFBTCxDQUFZQyxJQUFaLENBQWlCLElBQWpCLENBQWQ7QUFDRDs7QUFFREMsbUJBQWlCLEdBQUc7QUFDbEJDLGdEQUFLLENBQ0ZDLEdBREgsQ0FDTyxRQURQLEVBRUdDLElBRkgsQ0FFUUMsUUFBUSxJQUFJO0FBQ2hCQyxhQUFPLENBQUNDLEdBQVIsQ0FBWSxVQUFaLEVBQXdCRixRQUFRLENBQUNSLElBQWpDO0FBQ0FXLG9CQUFjLENBQUNDLE9BQWYsQ0FBdUIsTUFBdkIsRUFBK0JDLElBQUksQ0FBQ0MsU0FBTCxDQUFlTixRQUFRLENBQUNSLElBQXhCLENBQS9CO0FBQ0EsV0FBS2UsUUFBTCxDQUFjO0FBQUVmLFlBQUksRUFBRVEsUUFBUSxDQUFDUjtBQUFqQixPQUFkO0FBQ0QsS0FOSCxFQU9HZ0IsS0FQSCxDQU9TQyxDQUFDLElBQUk7QUFDVlIsYUFBTyxDQUFDQyxHQUFSLENBQVlPLENBQVo7QUFDRCxLQVRIO0FBVUQ7O0FBRURmLFFBQU0sR0FBRztBQUNQLFVBQU1nQixRQUFRLEdBQUdQLGNBQWMsQ0FBQ1EsT0FBZixDQUF1QixNQUF2QixDQUFqQjtBQUNBLFNBQUtKLFFBQUwsQ0FBYztBQUFFZCxjQUFRLEVBQUVpQjtBQUFaLEtBQWQ7QUFDQVQsV0FBTyxDQUFDQyxHQUFSLENBQVksS0FBS1gsS0FBakI7QUFDRDs7QUFDRHFCLFFBQU0sR0FBRztBQUNQWCxXQUFPLENBQUNDLEdBQVIsQ0FBWSxTQUFaLEVBQXVCLEtBQUtYLEtBQTVCO0FBQ0EsVUFBTTtBQUFFQyxVQUFGO0FBQVFDO0FBQVIsUUFBcUIsS0FBS0YsS0FBaEM7QUFFQSxVQUFNc0IsT0FBTyxHQUFHUixJQUFJLENBQUNTLEtBQUwsQ0FBV3JCLFFBQVgsQ0FBaEI7QUFDQVEsV0FBTyxDQUFDQyxHQUFSLENBQVlXLE9BQVo7QUFFQSxXQUNFLHdFQUNFO0FBQUssZUFBUyxFQUFDO0FBQWYsT0FDRTtBQUFRLGFBQU8sRUFBRSxNQUFNLEtBQUtuQixNQUFMO0FBQXZCLGFBREYsRUFFRSx1RUFBS21CLE9BQU8sQ0FBQ0UsTUFBUixJQUFrQiwyREFBQyw2Q0FBRDtBQUFNLGFBQU8sRUFBRUY7QUFBZixNQUF2QixDQUZGLENBREYsQ0FERjtBQWdCRDs7QUFwRHlCOztBQXVEYjFCLGtFQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVEQTtBQUVlLE1BQU02QixNQUFOLFNBQXFCNUIsK0NBQXJCLENBQStCO0FBQUE7QUFBQTs7QUFBQSxtQ0FDcEMsRUFEb0M7QUFBQTs7QUFFNUN3QixRQUFNLEdBQUc7QUFDUCxVQUFNO0FBQUVwQjtBQUFGLFFBQVcsS0FBS0YsS0FBdEI7QUFDQSxXQUNFLHdFQUNHRSxJQUFJLENBQUN5QixHQUFMLENBQVNSLENBQUMsSUFDVDtBQUFLLGVBQVMsRUFBQyxXQUFmO0FBQTJCLFNBQUcsRUFBRUEsQ0FBQyxDQUFDUztBQUFsQyxPQUNFO0FBQUssU0FBRyxFQUFHLFdBQVVULENBQUMsQ0FBQ1UsWUFBYTtBQUFwQyxNQURGLENBREQsQ0FESCxDQURGO0FBU0Q7O0FBYjJDLEM7Ozs7Ozs7Ozs7OztBQ0Y5QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRWUsTUFBTUMsSUFBTixTQUFtQmhDLCtDQUFuQixDQUE2QjtBQUMxQ3dCLFFBQU0sR0FBRztBQUNQLFVBQU07QUFBRUM7QUFBRixRQUFjLEtBQUt2QixLQUF6QjtBQUNBLFdBQ0Usd0VBQ0d1QixPQUFPLENBQUNJLEdBQVIsQ0FBWSxDQUFDUixDQUFELEVBQUlZLENBQUosS0FDWDtBQUFJLFNBQUcsRUFBRUE7QUFBVCxPQUFhWixDQUFDLENBQUNTLEVBQWYsQ0FERCxDQURILENBREY7QUFPRDs7QUFWeUMsQzs7Ozs7Ozs7Ozs7O0FDRjVDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUlBSSxnREFBUSxDQUFDVixNQUFULENBQWdCLDJEQUFDLHNEQUFELE9BQWhCLEVBQXlCVyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBekIsRSIsImZpbGUiOiJyZWFjdEFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xyXG5pbXBvcnQgQm9yYW5nIGZyb20gXCIuL0JvcmFuZ1wiO1xyXG5pbXBvcnQgSnNvbiBmcm9tIFwiLi9Kc29uXCI7XHJcblxyXG5jbGFzcyBBcHAgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBkYXRhOiBudWxsLFxyXG4gICAgICBqc29uRGF0YTogXCJ7fVwiXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMudGluZ3VrID0gdGhpcy50aW5ndWsuYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgYXhpb3NcclxuICAgICAgLmdldChcIi9hZG1pblwiKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJyZXNwb25zZVwiLCByZXNwb25zZS5kYXRhKTtcclxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwiZGF0YVwiLCBKU09OLnN0cmluZ2lmeShyZXNwb25zZS5kYXRhKSk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGRhdGE6IHJlc3BvbnNlLmRhdGEgfSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICB0aW5ndWsoKSB7XHJcbiAgICBjb25zdCBkYXRhRnJvbSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJkYXRhXCIpO1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGpzb25EYXRhOiBkYXRhRnJvbSB9KTtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUpO1xyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcInN0YXRlLT5cIiwgdGhpcy5zdGF0ZSk7XHJcbiAgICBjb25zdCB7IGRhdGEsIGpzb25EYXRhIH0gPSB0aGlzLnN0YXRlO1xyXG5cclxuICAgIGNvbnN0IG9iakRhdGEgPSBKU09OLnBhcnNlKGpzb25EYXRhKTtcclxuICAgIGNvbnNvbGUubG9nKG9iakRhdGEpO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cclxuICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gdGhpcy50aW5ndWsoKX0+bG9nPC9idXR0b24+XHJcbiAgICAgICAgICA8dWw+e29iakRhdGEubGVuZ3RoICYmIDxKc29uIG9iakRhdGE9e29iakRhdGF9IC8+fTwvdWw+XHJcbiAgICAgICAgICB7LyogXHJcbiAgICAgICAgXHJcbiAgICAgICAgICB7LyogZGF0YSB7IWRhdGEgJiYgPGgzPkxvYWRpbmcuLi48L2gzPn1cclxuICAgICAgICAgIHtkYXRhICYmIChcclxuICAgICAgICAgICAgPHVsPlxyXG4gICAgICAgICAgICAgIDxCb3JhbmcgZGF0YT17ZGF0YX0gLz5cclxuICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICl9ICovfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcHA7XHJcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvcmFuZyBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgc3RhdGUgPSB7fTtcclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IGRhdGEgfSA9IHRoaXMucHJvcHM7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIHtkYXRhLm1hcChlID0+IChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCIga2V5PXtlLmlkfT5cclxuICAgICAgICAgICAgPGltZyBzcmM9e2AvaW1hZ2VzLyR7ZS5wcm9kdWN0SW1hZ2V9YH0gLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkpfVxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpzb24gZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHsgb2JqRGF0YSB9ID0gdGhpcy5wcm9wcztcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAge29iakRhdGEubWFwKChlLCBpKSA9PiAoXHJcbiAgICAgICAgICA8bGkga2V5PXtpfT57ZS5pZH08L2xpPlxyXG4gICAgICAgICkpfVxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgQXBwIGZyb20gJy4vY29tcG9uZW50L0FwcCdcclxuXHJcblxyXG5cclxuUmVhY3RET00ucmVuZGVyKDxBcHAgLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JykpO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9