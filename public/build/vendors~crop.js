(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~crop"],{

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


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3JvcHBlcmpzL2Rpc3QvY3JvcHBlci5taW4uY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcm9wcGVyanMvc3JjL2pzL2NoYW5nZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3JvcHBlcmpzL3NyYy9qcy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nyb3BwZXJqcy9zcmMvanMvY3JvcHBlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3JvcHBlcmpzL3NyYy9qcy9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3JvcHBlcmpzL3NyYy9qcy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nyb3BwZXJqcy9zcmMvanMvaGFuZGxlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nyb3BwZXJqcy9zcmMvanMvbWV0aG9kcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3JvcHBlcmpzL3NyYy9qcy9wcmV2aWV3LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcm9wcGVyanMvc3JjL2pzL3JlbmRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3JvcHBlcmpzL3NyYy9qcy90ZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3JvcHBlcmpzL3NyYy9qcy91dGlsaXRpZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsdUM7Ozs7Ozs7Ozs7OztBQ0FBO0FBQUE7QUFBQTtBQWNxQjtBQU1BOztBQUVOO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsU0FBUyxTQUFTO0FBQ2xCLFNBQVMsY0FBYztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztB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QVk7QUFDN0I7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjtBQUNPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InZlbmRvcnN+Y3JvcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImltcG9ydCB7XG4gIEFDVElPTl9BTEwsXG4gIEFDVElPTl9DUk9QLFxuICBBQ1RJT05fRUFTVCxcbiAgQUNUSU9OX01PVkUsXG4gIEFDVElPTl9OT1JUSCxcbiAgQUNUSU9OX05PUlRIX0VBU1QsXG4gIEFDVElPTl9OT1JUSF9XRVNULFxuICBBQ1RJT05fU09VVEgsXG4gIEFDVElPTl9TT1VUSF9FQVNULFxuICBBQ1RJT05fU09VVEhfV0VTVCxcbiAgQUNUSU9OX1dFU1QsXG4gIEFDVElPTl9aT09NLFxuICBDTEFTU19ISURERU4sXG59IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7XG4gIGZvckVhY2gsXG4gIGdldE1heFpvb21SYXRpbyxcbiAgZ2V0T2Zmc2V0LFxuICByZW1vdmVDbGFzcyxcbn0gZnJvbSAnLi91dGlsaXRpZXMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNoYW5nZShldmVudCkge1xuICAgIGNvbnN0IHtcbiAgICAgIG9wdGlvbnMsXG4gICAgICBjYW52YXNEYXRhLFxuICAgICAgY29udGFpbmVyRGF0YSxcbiAgICAgIGNyb3BCb3hEYXRhLFxuICAgICAgcG9pbnRlcnMsXG4gICAgfSA9IHRoaXM7XG4gICAgbGV0IHsgYWN0aW9uIH0gPSB0aGlzO1xuICAgIGxldCB7IGFzcGVjdFJhdGlvIH0gPSBvcHRpb25zO1xuICAgIGxldCB7XG4gICAgICBsZWZ0LFxuICAgICAgdG9wLFxuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgfSA9IGNyb3BCb3hEYXRhO1xuICAgIGNvbnN0IHJpZ2h0ID0gbGVmdCArIHdpZHRoO1xuICAgIGNvbnN0IGJvdHRvbSA9IHRvcCArIGhlaWdodDtcbiAgICBsZXQgbWluTGVmdCA9IDA7XG4gICAgbGV0IG1pblRvcCA9IDA7XG4gICAgbGV0IG1heFdpZHRoID0gY29udGFpbmVyRGF0YS53aWR0aDtcbiAgICBsZXQgbWF4SGVpZ2h0ID0gY29udGFpbmVyRGF0YS5oZWlnaHQ7XG4gICAgbGV0IHJlbmRlcmFibGUgPSB0cnVlO1xuICAgIGxldCBvZmZzZXQ7XG5cbiAgICAvLyBMb2NraW5nIGFzcGVjdCByYXRpbyBpbiBcImZyZWUgbW9kZVwiIGJ5IGhvbGRpbmcgc2hpZnQga2V5XG4gICAgaWYgKCFhc3BlY3RSYXRpbyAmJiBldmVudC5zaGlmdEtleSkge1xuICAgICAgYXNwZWN0UmF0aW8gPSB3aWR0aCAmJiBoZWlnaHQgPyB3aWR0aCAvIGhlaWdodCA6IDE7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubGltaXRlZCkge1xuICAgICAgKHsgbWluTGVmdCwgbWluVG9wIH0gPSBjcm9wQm94RGF0YSk7XG4gICAgICBtYXhXaWR0aCA9IG1pbkxlZnQgKyBNYXRoLm1pbihcbiAgICAgICAgY29udGFpbmVyRGF0YS53aWR0aCxcbiAgICAgICAgY2FudmFzRGF0YS53aWR0aCxcbiAgICAgICAgY2FudmFzRGF0YS5sZWZ0ICsgY2FudmFzRGF0YS53aWR0aCxcbiAgICAgICk7XG4gICAgICBtYXhIZWlnaHQgPSBtaW5Ub3AgKyBNYXRoLm1pbihcbiAgICAgICAgY29udGFpbmVyRGF0YS5oZWlnaHQsXG4gICAgICAgIGNhbnZhc0RhdGEuaGVpZ2h0LFxuICAgICAgICBjYW52YXNEYXRhLnRvcCArIGNhbnZhc0RhdGEuaGVpZ2h0LFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBwb2ludGVyID0gcG9pbnRlcnNbT2JqZWN0LmtleXMocG9pbnRlcnMpWzBdXTtcbiAgICBjb25zdCByYW5nZSA9IHtcbiAgICAgIHg6IHBvaW50ZXIuZW5kWCAtIHBvaW50ZXIuc3RhcnRYLFxuICAgICAgeTogcG9pbnRlci5lbmRZIC0gcG9pbnRlci5zdGFydFksXG4gICAgfTtcbiAgICBjb25zdCBjaGVjayA9IChzaWRlKSA9PiB7XG4gICAgICBzd2l0Y2ggKHNpZGUpIHtcbiAgICAgICAgY2FzZSBBQ1RJT05fRUFTVDpcbiAgICAgICAgICBpZiAocmlnaHQgKyByYW5nZS54ID4gbWF4V2lkdGgpIHtcbiAgICAgICAgICAgIHJhbmdlLnggPSBtYXhXaWR0aCAtIHJpZ2h0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgQUNUSU9OX1dFU1Q6XG4gICAgICAgICAgaWYgKGxlZnQgKyByYW5nZS54IDwgbWluTGVmdCkge1xuICAgICAgICAgICAgcmFuZ2UueCA9IG1pbkxlZnQgLSBsZWZ0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgQUNUSU9OX05PUlRIOlxuICAgICAgICAgIGlmICh0b3AgKyByYW5nZS55IDwgbWluVG9wKSB7XG4gICAgICAgICAgICByYW5nZS55ID0gbWluVG9wIC0gdG9wO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgQUNUSU9OX1NPVVRIOlxuICAgICAgICAgIGlmIChib3R0b20gKyByYW5nZS55ID4gbWF4SGVpZ2h0KSB7XG4gICAgICAgICAgICByYW5nZS55ID0gbWF4SGVpZ2h0IC0gYm90dG9tO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICB9XG4gICAgfTtcblxuICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICAvLyBNb3ZlIGNyb3AgYm94XG4gICAgICBjYXNlIEFDVElPTl9BTEw6XG4gICAgICAgIGxlZnQgKz0gcmFuZ2UueDtcbiAgICAgICAgdG9wICs9IHJhbmdlLnk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvLyBSZXNpemUgY3JvcCBib3hcbiAgICAgIGNhc2UgQUNUSU9OX0VBU1Q6XG4gICAgICAgIGlmIChyYW5nZS54ID49IDAgJiYgKHJpZ2h0ID49IG1heFdpZHRoIHx8IChhc3BlY3RSYXRpb1xuICAgICAgICAgICYmICh0b3AgPD0gbWluVG9wIHx8IGJvdHRvbSA+PSBtYXhIZWlnaHQpKSkpIHtcbiAgICAgICAgICByZW5kZXJhYmxlID0gZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjaGVjayhBQ1RJT05fRUFTVCk7XG4gICAgICAgIHdpZHRoICs9IHJhbmdlLng7XG5cbiAgICAgICAgaWYgKHdpZHRoIDwgMCkge1xuICAgICAgICAgIGFjdGlvbiA9IEFDVElPTl9XRVNUO1xuICAgICAgICAgIHdpZHRoID0gLXdpZHRoO1xuICAgICAgICAgIGxlZnQgLT0gd2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYXNwZWN0UmF0aW8pIHtcbiAgICAgICAgICBoZWlnaHQgPSB3aWR0aCAvIGFzcGVjdFJhdGlvO1xuICAgICAgICAgIHRvcCArPSAoY3JvcEJveERhdGEuaGVpZ2h0IC0gaGVpZ2h0KSAvIDI7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBBQ1RJT05fTk9SVEg6XG4gICAgICAgIGlmIChyYW5nZS55IDw9IDAgJiYgKHRvcCA8PSBtaW5Ub3AgfHwgKGFzcGVjdFJhdGlvXG4gICAgICAgICAgJiYgKGxlZnQgPD0gbWluTGVmdCB8fCByaWdodCA+PSBtYXhXaWR0aCkpKSkge1xuICAgICAgICAgIHJlbmRlcmFibGUgPSBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNoZWNrKEFDVElPTl9OT1JUSCk7XG4gICAgICAgIGhlaWdodCAtPSByYW5nZS55O1xuICAgICAgICB0b3AgKz0gcmFuZ2UueTtcblxuICAgICAgICBpZiAoaGVpZ2h0IDwgMCkge1xuICAgICAgICAgIGFjdGlvbiA9IEFDVElPTl9TT1VUSDtcbiAgICAgICAgICBoZWlnaHQgPSAtaGVpZ2h0O1xuICAgICAgICAgIHRvcCAtPSBoZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYXNwZWN0UmF0aW8pIHtcbiAgICAgICAgICB3aWR0aCA9IGhlaWdodCAqIGFzcGVjdFJhdGlvO1xuICAgICAgICAgIGxlZnQgKz0gKGNyb3BCb3hEYXRhLndpZHRoIC0gd2lkdGgpIC8gMjtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEFDVElPTl9XRVNUOlxuICAgICAgICBpZiAocmFuZ2UueCA8PSAwICYmIChsZWZ0IDw9IG1pbkxlZnQgfHwgKGFzcGVjdFJhdGlvXG4gICAgICAgICAgJiYgKHRvcCA8PSBtaW5Ub3AgfHwgYm90dG9tID49IG1heEhlaWdodCkpKSkge1xuICAgICAgICAgIHJlbmRlcmFibGUgPSBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNoZWNrKEFDVElPTl9XRVNUKTtcbiAgICAgICAgd2lkdGggLT0gcmFuZ2UueDtcbiAgICAgICAgbGVmdCArPSByYW5nZS54O1xuXG4gICAgICAgIGlmICh3aWR0aCA8IDApIHtcbiAgICAgICAgICBhY3Rpb24gPSBBQ1RJT05fRUFTVDtcbiAgICAgICAgICB3aWR0aCA9IC13aWR0aDtcbiAgICAgICAgICBsZWZ0IC09IHdpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFzcGVjdFJhdGlvKSB7XG4gICAgICAgICAgaGVpZ2h0ID0gd2lkdGggLyBhc3BlY3RSYXRpbztcbiAgICAgICAgICB0b3AgKz0gKGNyb3BCb3hEYXRhLmhlaWdodCAtIGhlaWdodCkgLyAyO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgQUNUSU9OX1NPVVRIOlxuICAgICAgICBpZiAocmFuZ2UueSA+PSAwICYmIChib3R0b20gPj0gbWF4SGVpZ2h0IHx8IChhc3BlY3RSYXRpb1xuICAgICAgICAgICYmIChsZWZ0IDw9IG1pbkxlZnQgfHwgcmlnaHQgPj0gbWF4V2lkdGgpKSkpIHtcbiAgICAgICAgICByZW5kZXJhYmxlID0gZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjaGVjayhBQ1RJT05fU09VVEgpO1xuICAgICAgICBoZWlnaHQgKz0gcmFuZ2UueTtcblxuICAgICAgICBpZiAoaGVpZ2h0IDwgMCkge1xuICAgICAgICAgIGFjdGlvbiA9IEFDVElPTl9OT1JUSDtcbiAgICAgICAgICBoZWlnaHQgPSAtaGVpZ2h0O1xuICAgICAgICAgIHRvcCAtPSBoZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYXNwZWN0UmF0aW8pIHtcbiAgICAgICAgICB3aWR0aCA9IGhlaWdodCAqIGFzcGVjdFJhdGlvO1xuICAgICAgICAgIGxlZnQgKz0gKGNyb3BCb3hEYXRhLndpZHRoIC0gd2lkdGgpIC8gMjtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEFDVElPTl9OT1JUSF9FQVNUOlxuICAgICAgICBpZiAoYXNwZWN0UmF0aW8pIHtcbiAgICAgICAgICBpZiAocmFuZ2UueSA8PSAwICYmICh0b3AgPD0gbWluVG9wIHx8IHJpZ2h0ID49IG1heFdpZHRoKSkge1xuICAgICAgICAgICAgcmVuZGVyYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY2hlY2soQUNUSU9OX05PUlRIKTtcbiAgICAgICAgICBoZWlnaHQgLT0gcmFuZ2UueTtcbiAgICAgICAgICB0b3AgKz0gcmFuZ2UueTtcbiAgICAgICAgICB3aWR0aCA9IGhlaWdodCAqIGFzcGVjdFJhdGlvO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNoZWNrKEFDVElPTl9OT1JUSCk7XG4gICAgICAgICAgY2hlY2soQUNUSU9OX0VBU1QpO1xuXG4gICAgICAgICAgaWYgKHJhbmdlLnggPj0gMCkge1xuICAgICAgICAgICAgaWYgKHJpZ2h0IDwgbWF4V2lkdGgpIHtcbiAgICAgICAgICAgICAgd2lkdGggKz0gcmFuZ2UueDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmFuZ2UueSA8PSAwICYmIHRvcCA8PSBtaW5Ub3ApIHtcbiAgICAgICAgICAgICAgcmVuZGVyYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aWR0aCArPSByYW5nZS54O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChyYW5nZS55IDw9IDApIHtcbiAgICAgICAgICAgIGlmICh0b3AgPiBtaW5Ub3ApIHtcbiAgICAgICAgICAgICAgaGVpZ2h0IC09IHJhbmdlLnk7XG4gICAgICAgICAgICAgIHRvcCArPSByYW5nZS55O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBoZWlnaHQgLT0gcmFuZ2UueTtcbiAgICAgICAgICAgIHRvcCArPSByYW5nZS55O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh3aWR0aCA8IDAgJiYgaGVpZ2h0IDwgMCkge1xuICAgICAgICAgIGFjdGlvbiA9IEFDVElPTl9TT1VUSF9XRVNUO1xuICAgICAgICAgIGhlaWdodCA9IC1oZWlnaHQ7XG4gICAgICAgICAgd2lkdGggPSAtd2lkdGg7XG4gICAgICAgICAgdG9wIC09IGhlaWdodDtcbiAgICAgICAgICBsZWZ0IC09IHdpZHRoO1xuICAgICAgICB9IGVsc2UgaWYgKHdpZHRoIDwgMCkge1xuICAgICAgICAgIGFjdGlvbiA9IEFDVElPTl9OT1JUSF9XRVNUO1xuICAgICAgICAgIHdpZHRoID0gLXdpZHRoO1xuICAgICAgICAgIGxlZnQgLT0gd2lkdGg7XG4gICAgICAgIH0gZWxzZSBpZiAoaGVpZ2h0IDwgMCkge1xuICAgICAgICAgIGFjdGlvbiA9IEFDVElPTl9TT1VUSF9FQVNUO1xuICAgICAgICAgIGhlaWdodCA9IC1oZWlnaHQ7XG4gICAgICAgICAgdG9wIC09IGhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEFDVElPTl9OT1JUSF9XRVNUOlxuICAgICAgICBpZiAoYXNwZWN0UmF0aW8pIHtcbiAgICAgICAgICBpZiAocmFuZ2UueSA8PSAwICYmICh0b3AgPD0gbWluVG9wIHx8IGxlZnQgPD0gbWluTGVmdCkpIHtcbiAgICAgICAgICAgIHJlbmRlcmFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNoZWNrKEFDVElPTl9OT1JUSCk7XG4gICAgICAgICAgaGVpZ2h0IC09IHJhbmdlLnk7XG4gICAgICAgICAgdG9wICs9IHJhbmdlLnk7XG4gICAgICAgICAgd2lkdGggPSBoZWlnaHQgKiBhc3BlY3RSYXRpbztcbiAgICAgICAgICBsZWZ0ICs9IGNyb3BCb3hEYXRhLndpZHRoIC0gd2lkdGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2hlY2soQUNUSU9OX05PUlRIKTtcbiAgICAgICAgICBjaGVjayhBQ1RJT05fV0VTVCk7XG5cbiAgICAgICAgICBpZiAocmFuZ2UueCA8PSAwKSB7XG4gICAgICAgICAgICBpZiAobGVmdCA+IG1pbkxlZnQpIHtcbiAgICAgICAgICAgICAgd2lkdGggLT0gcmFuZ2UueDtcbiAgICAgICAgICAgICAgbGVmdCArPSByYW5nZS54O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyYW5nZS55IDw9IDAgJiYgdG9wIDw9IG1pblRvcCkge1xuICAgICAgICAgICAgICByZW5kZXJhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdpZHRoIC09IHJhbmdlLng7XG4gICAgICAgICAgICBsZWZ0ICs9IHJhbmdlLng7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHJhbmdlLnkgPD0gMCkge1xuICAgICAgICAgICAgaWYgKHRvcCA+IG1pblRvcCkge1xuICAgICAgICAgICAgICBoZWlnaHQgLT0gcmFuZ2UueTtcbiAgICAgICAgICAgICAgdG9wICs9IHJhbmdlLnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhlaWdodCAtPSByYW5nZS55O1xuICAgICAgICAgICAgdG9wICs9IHJhbmdlLnk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHdpZHRoIDwgMCAmJiBoZWlnaHQgPCAwKSB7XG4gICAgICAgICAgYWN0aW9uID0gQUNUSU9OX1NPVVRIX0VBU1Q7XG4gICAgICAgICAgaGVpZ2h0ID0gLWhlaWdodDtcbiAgICAgICAgICB3aWR0aCA9IC13aWR0aDtcbiAgICAgICAgICB0b3AgLT0gaGVpZ2h0O1xuICAgICAgICAgIGxlZnQgLT0gd2lkdGg7XG4gICAgICAgIH0gZWxzZSBpZiAod2lkdGggPCAwKSB7XG4gICAgICAgICAgYWN0aW9uID0gQUNUSU9OX05PUlRIX0VBU1Q7XG4gICAgICAgICAgd2lkdGggPSAtd2lkdGg7XG4gICAgICAgICAgbGVmdCAtPSB3aWR0aDtcbiAgICAgICAgfSBlbHNlIGlmIChoZWlnaHQgPCAwKSB7XG4gICAgICAgICAgYWN0aW9uID0gQUNUSU9OX1NPVVRIX1dFU1Q7XG4gICAgICAgICAgaGVpZ2h0ID0gLWhlaWdodDtcbiAgICAgICAgICB0b3AgLT0gaGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgQUNUSU9OX1NPVVRIX1dFU1Q6XG4gICAgICAgIGlmIChhc3BlY3RSYXRpbykge1xuICAgICAgICAgIGlmIChyYW5nZS54IDw9IDAgJiYgKGxlZnQgPD0gbWluTGVmdCB8fCBib3R0b20gPj0gbWF4SGVpZ2h0KSkge1xuICAgICAgICAgICAgcmVuZGVyYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY2hlY2soQUNUSU9OX1dFU1QpO1xuICAgICAgICAgIHdpZHRoIC09IHJhbmdlLng7XG4gICAgICAgICAgbGVmdCArPSByYW5nZS54O1xuICAgICAgICAgIGhlaWdodCA9IHdpZHRoIC8gYXNwZWN0UmF0aW87XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2hlY2soQUNUSU9OX1NPVVRIKTtcbiAgICAgICAgICBjaGVjayhBQ1RJT05fV0VTVCk7XG5cbiAgICAgICAgICBpZiAocmFuZ2UueCA8PSAwKSB7XG4gICAgICAgICAgICBpZiAobGVmdCA+IG1pbkxlZnQpIHtcbiAgICAgICAgICAgICAgd2lkdGggLT0gcmFuZ2UueDtcbiAgICAgICAgICAgICAgbGVmdCArPSByYW5nZS54O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyYW5nZS55ID49IDAgJiYgYm90dG9tID49IG1heEhlaWdodCkge1xuICAgICAgICAgICAgICByZW5kZXJhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdpZHRoIC09IHJhbmdlLng7XG4gICAgICAgICAgICBsZWZ0ICs9IHJhbmdlLng7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHJhbmdlLnkgPj0gMCkge1xuICAgICAgICAgICAgaWYgKGJvdHRvbSA8IG1heEhlaWdodCkge1xuICAgICAgICAgICAgICBoZWlnaHQgKz0gcmFuZ2UueTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaGVpZ2h0ICs9IHJhbmdlLnk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHdpZHRoIDwgMCAmJiBoZWlnaHQgPCAwKSB7XG4gICAgICAgICAgYWN0aW9uID0gQUNUSU9OX05PUlRIX0VBU1Q7XG4gICAgICAgICAgaGVpZ2h0ID0gLWhlaWdodDtcbiAgICAgICAgICB3aWR0aCA9IC13aWR0aDtcbiAgICAgICAgICB0b3AgLT0gaGVpZ2h0O1xuICAgICAgICAgIGxlZnQgLT0gd2lkdGg7XG4gICAgICAgIH0gZWxzZSBpZiAod2lkdGggPCAwKSB7XG4gICAgICAgICAgYWN0aW9uID0gQUNUSU9OX1NPVVRIX0VBU1Q7XG4gICAgICAgICAgd2lkdGggPSAtd2lkdGg7XG4gICAgICAgICAgbGVmdCAtPSB3aWR0aDtcbiAgICAgICAgfSBlbHNlIGlmIChoZWlnaHQgPCAwKSB7XG4gICAgICAgICAgYWN0aW9uID0gQUNUSU9OX05PUlRIX1dFU1Q7XG4gICAgICAgICAgaGVpZ2h0ID0gLWhlaWdodDtcbiAgICAgICAgICB0b3AgLT0gaGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgQUNUSU9OX1NPVVRIX0VBU1Q6XG4gICAgICAgIGlmIChhc3BlY3RSYXRpbykge1xuICAgICAgICAgIGlmIChyYW5nZS54ID49IDAgJiYgKHJpZ2h0ID49IG1heFdpZHRoIHx8IGJvdHRvbSA+PSBtYXhIZWlnaHQpKSB7XG4gICAgICAgICAgICByZW5kZXJhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjaGVjayhBQ1RJT05fRUFTVCk7XG4gICAgICAgICAgd2lkdGggKz0gcmFuZ2UueDtcbiAgICAgICAgICBoZWlnaHQgPSB3aWR0aCAvIGFzcGVjdFJhdGlvO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNoZWNrKEFDVElPTl9TT1VUSCk7XG4gICAgICAgICAgY2hlY2soQUNUSU9OX0VBU1QpO1xuXG4gICAgICAgICAgaWYgKHJhbmdlLnggPj0gMCkge1xuICAgICAgICAgICAgaWYgKHJpZ2h0IDwgbWF4V2lkdGgpIHtcbiAgICAgICAgICAgICAgd2lkdGggKz0gcmFuZ2UueDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmFuZ2UueSA+PSAwICYmIGJvdHRvbSA+PSBtYXhIZWlnaHQpIHtcbiAgICAgICAgICAgICAgcmVuZGVyYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aWR0aCArPSByYW5nZS54O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChyYW5nZS55ID49IDApIHtcbiAgICAgICAgICAgIGlmIChib3R0b20gPCBtYXhIZWlnaHQpIHtcbiAgICAgICAgICAgICAgaGVpZ2h0ICs9IHJhbmdlLnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhlaWdodCArPSByYW5nZS55O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh3aWR0aCA8IDAgJiYgaGVpZ2h0IDwgMCkge1xuICAgICAgICAgIGFjdGlvbiA9IEFDVElPTl9OT1JUSF9XRVNUO1xuICAgICAgICAgIGhlaWdodCA9IC1oZWlnaHQ7XG4gICAgICAgICAgd2lkdGggPSAtd2lkdGg7XG4gICAgICAgICAgdG9wIC09IGhlaWdodDtcbiAgICAgICAgICBsZWZ0IC09IHdpZHRoO1xuICAgICAgICB9IGVsc2UgaWYgKHdpZHRoIDwgMCkge1xuICAgICAgICAgIGFjdGlvbiA9IEFDVElPTl9TT1VUSF9XRVNUO1xuICAgICAgICAgIHdpZHRoID0gLXdpZHRoO1xuICAgICAgICAgIGxlZnQgLT0gd2lkdGg7XG4gICAgICAgIH0gZWxzZSBpZiAoaGVpZ2h0IDwgMCkge1xuICAgICAgICAgIGFjdGlvbiA9IEFDVElPTl9OT1JUSF9FQVNUO1xuICAgICAgICAgIGhlaWdodCA9IC1oZWlnaHQ7XG4gICAgICAgICAgdG9wIC09IGhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvLyBNb3ZlIGNhbnZhc1xuICAgICAgY2FzZSBBQ1RJT05fTU9WRTpcbiAgICAgICAgdGhpcy5tb3ZlKHJhbmdlLngsIHJhbmdlLnkpO1xuICAgICAgICByZW5kZXJhYmxlID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvLyBab29tIGNhbnZhc1xuICAgICAgY2FzZSBBQ1RJT05fWk9PTTpcbiAgICAgICAgdGhpcy56b29tKGdldE1heFpvb21SYXRpbyhwb2ludGVycyksIGV2ZW50KTtcbiAgICAgICAgcmVuZGVyYWJsZSA9IGZhbHNlO1xuICAgICAgICBicmVhaztcblxuICAgICAgLy8gQ3JlYXRlIGNyb3AgYm94XG4gICAgICBjYXNlIEFDVElPTl9DUk9QOlxuICAgICAgICBpZiAoIXJhbmdlLnggfHwgIXJhbmdlLnkpIHtcbiAgICAgICAgICByZW5kZXJhYmxlID0gZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBvZmZzZXQgPSBnZXRPZmZzZXQodGhpcy5jcm9wcGVyKTtcbiAgICAgICAgbGVmdCA9IHBvaW50ZXIuc3RhcnRYIC0gb2Zmc2V0LmxlZnQ7XG4gICAgICAgIHRvcCA9IHBvaW50ZXIuc3RhcnRZIC0gb2Zmc2V0LnRvcDtcbiAgICAgICAgd2lkdGggPSBjcm9wQm94RGF0YS5taW5XaWR0aDtcbiAgICAgICAgaGVpZ2h0ID0gY3JvcEJveERhdGEubWluSGVpZ2h0O1xuXG4gICAgICAgIGlmIChyYW5nZS54ID4gMCkge1xuICAgICAgICAgIGFjdGlvbiA9IHJhbmdlLnkgPiAwID8gQUNUSU9OX1NPVVRIX0VBU1QgOiBBQ1RJT05fTk9SVEhfRUFTVDtcbiAgICAgICAgfSBlbHNlIGlmIChyYW5nZS54IDwgMCkge1xuICAgICAgICAgIGxlZnQgLT0gd2lkdGg7XG4gICAgICAgICAgYWN0aW9uID0gcmFuZ2UueSA+IDAgPyBBQ1RJT05fU09VVEhfV0VTVCA6IEFDVElPTl9OT1JUSF9XRVNUO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJhbmdlLnkgPCAwKSB7XG4gICAgICAgICAgdG9wIC09IGhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNob3cgdGhlIGNyb3AgYm94IGlmIGlzIGhpZGRlblxuICAgICAgICBpZiAoIXRoaXMuY3JvcHBlZCkge1xuICAgICAgICAgIHJlbW92ZUNsYXNzKHRoaXMuY3JvcEJveCwgQ0xBU1NfSElEREVOKTtcbiAgICAgICAgICB0aGlzLmNyb3BwZWQgPSB0cnVlO1xuXG4gICAgICAgICAgaWYgKHRoaXMubGltaXRlZCkge1xuICAgICAgICAgICAgdGhpcy5saW1pdENyb3BCb3godHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgfVxuXG4gICAgaWYgKHJlbmRlcmFibGUpIHtcbiAgICAgIGNyb3BCb3hEYXRhLndpZHRoID0gd2lkdGg7XG4gICAgICBjcm9wQm94RGF0YS5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICBjcm9wQm94RGF0YS5sZWZ0ID0gbGVmdDtcbiAgICAgIGNyb3BCb3hEYXRhLnRvcCA9IHRvcDtcbiAgICAgIHRoaXMuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgdGhpcy5yZW5kZXJDcm9wQm94KCk7XG4gICAgfVxuXG4gICAgLy8gT3ZlcnJpZGVcbiAgICBmb3JFYWNoKHBvaW50ZXJzLCAocCkgPT4ge1xuICAgICAgcC5zdGFydFggPSBwLmVuZFg7XG4gICAgICBwLnN0YXJ0WSA9IHAuZW5kWTtcbiAgICB9KTtcbiAgfSxcbn07XG4iLCJleHBvcnQgY29uc3QgSVNfQlJPV1NFUiA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnO1xuZXhwb3J0IGNvbnN0IFdJTkRPVyA9IElTX0JST1dTRVIgPyB3aW5kb3cgOiB7fTtcbmV4cG9ydCBjb25zdCBJU19UT1VDSF9ERVZJQ0UgPSBJU19CUk9XU0VSID8gJ29udG91Y2hzdGFydCcgaW4gV0lORE9XLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCA6IGZhbHNlO1xuZXhwb3J0IGNvbnN0IEhBU19QT0lOVEVSX0VWRU5UID0gSVNfQlJPV1NFUiA/ICdQb2ludGVyRXZlbnQnIGluIFdJTkRPVyA6IGZhbHNlO1xuZXhwb3J0IGNvbnN0IE5BTUVTUEFDRSA9ICdjcm9wcGVyJztcblxuLy8gQWN0aW9uc1xuZXhwb3J0IGNvbnN0IEFDVElPTl9BTEwgPSAnYWxsJztcbmV4cG9ydCBjb25zdCBBQ1RJT05fQ1JPUCA9ICdjcm9wJztcbmV4cG9ydCBjb25zdCBBQ1RJT05fTU9WRSA9ICdtb3ZlJztcbmV4cG9ydCBjb25zdCBBQ1RJT05fWk9PTSA9ICd6b29tJztcbmV4cG9ydCBjb25zdCBBQ1RJT05fRUFTVCA9ICdlJztcbmV4cG9ydCBjb25zdCBBQ1RJT05fV0VTVCA9ICd3JztcbmV4cG9ydCBjb25zdCBBQ1RJT05fU09VVEggPSAncyc7XG5leHBvcnQgY29uc3QgQUNUSU9OX05PUlRIID0gJ24nO1xuZXhwb3J0IGNvbnN0IEFDVElPTl9OT1JUSF9FQVNUID0gJ25lJztcbmV4cG9ydCBjb25zdCBBQ1RJT05fTk9SVEhfV0VTVCA9ICdudyc7XG5leHBvcnQgY29uc3QgQUNUSU9OX1NPVVRIX0VBU1QgPSAnc2UnO1xuZXhwb3J0IGNvbnN0IEFDVElPTl9TT1VUSF9XRVNUID0gJ3N3JztcblxuLy8gQ2xhc3Nlc1xuZXhwb3J0IGNvbnN0IENMQVNTX0NST1AgPSBgJHtOQU1FU1BBQ0V9LWNyb3BgO1xuZXhwb3J0IGNvbnN0IENMQVNTX0RJU0FCTEVEID0gYCR7TkFNRVNQQUNFfS1kaXNhYmxlZGA7XG5leHBvcnQgY29uc3QgQ0xBU1NfSElEREVOID0gYCR7TkFNRVNQQUNFfS1oaWRkZW5gO1xuZXhwb3J0IGNvbnN0IENMQVNTX0hJREUgPSBgJHtOQU1FU1BBQ0V9LWhpZGVgO1xuZXhwb3J0IGNvbnN0IENMQVNTX0lOVklTSUJMRSA9IGAke05BTUVTUEFDRX0taW52aXNpYmxlYDtcbmV4cG9ydCBjb25zdCBDTEFTU19NT0RBTCA9IGAke05BTUVTUEFDRX0tbW9kYWxgO1xuZXhwb3J0IGNvbnN0IENMQVNTX01PVkUgPSBgJHtOQU1FU1BBQ0V9LW1vdmVgO1xuXG4vLyBEYXRhIGtleXNcbmV4cG9ydCBjb25zdCBEQVRBX0FDVElPTiA9IGAke05BTUVTUEFDRX1BY3Rpb25gO1xuZXhwb3J0IGNvbnN0IERBVEFfUFJFVklFVyA9IGAke05BTUVTUEFDRX1QcmV2aWV3YDtcblxuLy8gRHJhZyBtb2Rlc1xuZXhwb3J0IGNvbnN0IERSQUdfTU9ERV9DUk9QID0gJ2Nyb3AnO1xuZXhwb3J0IGNvbnN0IERSQUdfTU9ERV9NT1ZFID0gJ21vdmUnO1xuZXhwb3J0IGNvbnN0IERSQUdfTU9ERV9OT05FID0gJ25vbmUnO1xuXG4vLyBFdmVudHNcbmV4cG9ydCBjb25zdCBFVkVOVF9DUk9QID0gJ2Nyb3AnO1xuZXhwb3J0IGNvbnN0IEVWRU5UX0NST1BfRU5EID0gJ2Nyb3BlbmQnO1xuZXhwb3J0IGNvbnN0IEVWRU5UX0NST1BfTU9WRSA9ICdjcm9wbW92ZSc7XG5leHBvcnQgY29uc3QgRVZFTlRfQ1JPUF9TVEFSVCA9ICdjcm9wc3RhcnQnO1xuZXhwb3J0IGNvbnN0IEVWRU5UX0RCTENMSUNLID0gJ2RibGNsaWNrJztcbmV4cG9ydCBjb25zdCBFVkVOVF9UT1VDSF9TVEFSVCA9IElTX1RPVUNIX0RFVklDRSA/ICd0b3VjaHN0YXJ0JyA6ICdtb3VzZWRvd24nO1xuZXhwb3J0IGNvbnN0IEVWRU5UX1RPVUNIX01PVkUgPSBJU19UT1VDSF9ERVZJQ0UgPyAndG91Y2htb3ZlJyA6ICdtb3VzZW1vdmUnO1xuZXhwb3J0IGNvbnN0IEVWRU5UX1RPVUNIX0VORCA9IElTX1RPVUNIX0RFVklDRSA/ICd0b3VjaGVuZCB0b3VjaGNhbmNlbCcgOiAnbW91c2V1cCc7XG5leHBvcnQgY29uc3QgRVZFTlRfUE9JTlRFUl9ET1dOID0gSEFTX1BPSU5URVJfRVZFTlQgPyAncG9pbnRlcmRvd24nIDogRVZFTlRfVE9VQ0hfU1RBUlQ7XG5leHBvcnQgY29uc3QgRVZFTlRfUE9JTlRFUl9NT1ZFID0gSEFTX1BPSU5URVJfRVZFTlQgPyAncG9pbnRlcm1vdmUnIDogRVZFTlRfVE9VQ0hfTU9WRTtcbmV4cG9ydCBjb25zdCBFVkVOVF9QT0lOVEVSX1VQID0gSEFTX1BPSU5URVJfRVZFTlQgPyAncG9pbnRlcnVwIHBvaW50ZXJjYW5jZWwnIDogRVZFTlRfVE9VQ0hfRU5EO1xuZXhwb3J0IGNvbnN0IEVWRU5UX1JFQURZID0gJ3JlYWR5JztcbmV4cG9ydCBjb25zdCBFVkVOVF9SRVNJWkUgPSAncmVzaXplJztcbmV4cG9ydCBjb25zdCBFVkVOVF9XSEVFTCA9ICd3aGVlbCc7XG5leHBvcnQgY29uc3QgRVZFTlRfWk9PTSA9ICd6b29tJztcblxuLy8gTWltZSB0eXBlc1xuZXhwb3J0IGNvbnN0IE1JTUVfVFlQRV9KUEVHID0gJ2ltYWdlL2pwZWcnO1xuXG4vLyBSZWdFeHBzXG5leHBvcnQgY29uc3QgUkVHRVhQX0FDVElPTlMgPSAvXmV8d3xzfG58c2V8c3d8bmV8bnd8YWxsfGNyb3B8bW92ZXx6b29tJC87XG5leHBvcnQgY29uc3QgUkVHRVhQX0RBVEFfVVJMX0pQRUcgPSAvXmRhdGE6aW1hZ2VcXC9qcGVnO2Jhc2U2NCwvO1xuZXhwb3J0IGNvbnN0IFJFR0VYUF9UQUdfTkFNRSA9IC9eaW1nfGNhbnZhcyQvaTtcblxuLy8gTWlzY1xuLy8gSW5zcGlyZWQgYnkgdGhlIGRlZmF1bHQgd2lkdGggYW5kIGhlaWdodCBvZiBhIGNhbnZhcyBlbGVtZW50LlxuZXhwb3J0IGNvbnN0IE1JTl9DT05UQUlORVJfV0lEVEggPSAyMDA7XG5leHBvcnQgY29uc3QgTUlOX0NPTlRBSU5FUl9IRUlHSFQgPSAxMDA7XG4iLCJpbXBvcnQgREVGQVVMVFMgZnJvbSAnLi9kZWZhdWx0cyc7XG5pbXBvcnQgVEVNUExBVEUgZnJvbSAnLi90ZW1wbGF0ZSc7XG5pbXBvcnQgcmVuZGVyIGZyb20gJy4vcmVuZGVyJztcbmltcG9ydCBwcmV2aWV3IGZyb20gJy4vcHJldmlldyc7XG5pbXBvcnQgZXZlbnRzIGZyb20gJy4vZXZlbnRzJztcbmltcG9ydCBoYW5kbGVycyBmcm9tICcuL2hhbmRsZXJzJztcbmltcG9ydCBjaGFuZ2UgZnJvbSAnLi9jaGFuZ2UnO1xuaW1wb3J0IG1ldGhvZHMgZnJvbSAnLi9tZXRob2RzJztcbmltcG9ydCB7XG4gIEFDVElPTl9BTEwsXG4gIENMQVNTX0hJRERFTixcbiAgQ0xBU1NfSElERSxcbiAgQ0xBU1NfSU5WSVNJQkxFLFxuICBDTEFTU19NT1ZFLFxuICBEQVRBX0FDVElPTixcbiAgRVZFTlRfUkVBRFksXG4gIE1JTUVfVFlQRV9KUEVHLFxuICBOQU1FU1BBQ0UsXG4gIFJFR0VYUF9EQVRBX1VSTF9KUEVHLFxuICBSRUdFWFBfVEFHX05BTUUsXG4gIFdJTkRPVyxcbn0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHtcbiAgYWRkQ2xhc3MsXG4gIGFkZExpc3RlbmVyLFxuICBhZGRUaW1lc3RhbXAsXG4gIGFycmF5QnVmZmVyVG9EYXRhVVJMLFxuICBhc3NpZ24sXG4gIGRhdGFVUkxUb0FycmF5QnVmZmVyLFxuICBkaXNwYXRjaEV2ZW50LFxuICBpc0Nyb3NzT3JpZ2luVVJMLFxuICBpc0Z1bmN0aW9uLFxuICBpc1BsYWluT2JqZWN0LFxuICBwYXJzZU9yaWVudGF0aW9uLFxuICByZW1vdmVDbGFzcyxcbiAgcmVzZXRBbmRHZXRPcmllbnRhdGlvbixcbiAgc2V0RGF0YSxcbn0gZnJvbSAnLi91dGlsaXRpZXMnO1xuXG5jb25zdCBBbm90aGVyQ3JvcHBlciA9IFdJTkRPVy5Dcm9wcGVyO1xuXG5jbGFzcyBDcm9wcGVyIHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBDcm9wcGVyLlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgLSBUaGUgdGFyZ2V0IGVsZW1lbnQgZm9yIGNyb3BwaW5nLlxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIC0gVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIG9wdGlvbnMgPSB7fSkge1xuICAgIGlmICghZWxlbWVudCB8fCAhUkVHRVhQX1RBR19OQU1FLnRlc3QoZWxlbWVudC50YWdOYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgZmlyc3QgYXJndW1lbnQgaXMgcmVxdWlyZWQgYW5kIG11c3QgYmUgYW4gPGltZz4gb3IgPGNhbnZhcz4gZWxlbWVudC4nKTtcbiAgICB9XG5cbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMub3B0aW9ucyA9IGFzc2lnbih7fSwgREVGQVVMVFMsIGlzUGxhaW5PYmplY3Qob3B0aW9ucykgJiYgb3B0aW9ucyk7XG4gICAgdGhpcy5jcm9wcGVkID0gZmFsc2U7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMucG9pbnRlcnMgPSB7fTtcbiAgICB0aGlzLnJlYWR5ID0gZmFsc2U7XG4gICAgdGhpcy5yZWxvYWRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnJlcGxhY2VkID0gZmFsc2U7XG4gICAgdGhpcy5zaXplZCA9IGZhbHNlO1xuICAgIHRoaXMuc2l6aW5nID0gZmFsc2U7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnN0IHsgZWxlbWVudCB9ID0gdGhpcztcbiAgICBjb25zdCB0YWdOYW1lID0gZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgbGV0IHVybDtcblxuICAgIGlmIChlbGVtZW50W05BTUVTUEFDRV0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBlbGVtZW50W05BTUVTUEFDRV0gPSB0aGlzO1xuXG4gICAgaWYgKHRhZ05hbWUgPT09ICdpbWcnKSB7XG4gICAgICB0aGlzLmlzSW1nID0gdHJ1ZTtcblxuICAgICAgLy8gZS5nLjogXCJpbWcvcGljdHVyZS5qcGdcIlxuICAgICAgdXJsID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3NyYycpIHx8ICcnO1xuICAgICAgdGhpcy5vcmlnaW5hbFVybCA9IHVybDtcblxuICAgICAgLy8gU3RvcCB3aGVuIGl0J3MgYSBibGFuayBpbWFnZVxuICAgICAgaWYgKCF1cmwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBlLmcuOiBcImh0dHA6Ly9leGFtcGxlLmNvbS9pbWcvcGljdHVyZS5qcGdcIlxuICAgICAgdXJsID0gZWxlbWVudC5zcmM7XG4gICAgfSBlbHNlIGlmICh0YWdOYW1lID09PSAnY2FudmFzJyAmJiB3aW5kb3cuSFRNTENhbnZhc0VsZW1lbnQpIHtcbiAgICAgIHVybCA9IGVsZW1lbnQudG9EYXRhVVJMKCk7XG4gICAgfVxuXG4gICAgdGhpcy5sb2FkKHVybCk7XG4gIH1cblxuICBsb2FkKHVybCkge1xuICAgIGlmICghdXJsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy51cmwgPSB1cmw7XG4gICAgdGhpcy5pbWFnZURhdGEgPSB7fTtcblxuICAgIGNvbnN0IHsgZWxlbWVudCwgb3B0aW9ucyB9ID0gdGhpcztcblxuICAgIGlmICghb3B0aW9ucy5yb3RhdGFibGUgJiYgIW9wdGlvbnMuc2NhbGFibGUpIHtcbiAgICAgIG9wdGlvbnMuY2hlY2tPcmllbnRhdGlvbiA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIE9ubHkgSUUxMCsgc3VwcG9ydHMgVHlwZWQgQXJyYXlzXG4gICAgaWYgKCFvcHRpb25zLmNoZWNrT3JpZW50YXRpb24gfHwgIXdpbmRvdy5BcnJheUJ1ZmZlcikge1xuICAgICAgdGhpcy5jbG9uZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFJlYWQgQXJyYXlCdWZmZXIgZnJvbSBEYXRhIFVSTCBvZiBKUEVHIGltYWdlcyBkaXJlY3RseSBmb3IgYmV0dGVyIHBlcmZvcm1hbmNlLlxuICAgIGlmIChSRUdFWFBfREFUQV9VUkxfSlBFRy50ZXN0KHVybCkpIHtcbiAgICAgIHRoaXMucmVhZChkYXRhVVJMVG9BcnJheUJ1ZmZlcih1cmwpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICBjb25zdCBjbG9uZSA9IHRoaXMuY2xvbmUuYmluZCh0aGlzKTtcblxuICAgIHRoaXMucmVsb2FkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLnhociA9IHhocjtcblxuICAgIC8vIDEuIENyb3NzIG9yaWdpbiByZXF1ZXN0cyBhcmUgb25seSBzdXBwb3J0ZWQgZm9yIHByb3RvY29sIHNjaGVtZXM6XG4gICAgLy8gaHR0cCwgaHR0cHMsIGRhdGEsIGNocm9tZSwgY2hyb21lLWV4dGVuc2lvbi5cbiAgICAvLyAyLiBBY2Nlc3MgdG8gWE1MSHR0cFJlcXVlc3QgZnJvbSBhIERhdGEgVVJMIHdpbGwgYmUgYmxvY2tlZCBieSBDT1JTIHBvbGljeVxuICAgIC8vIGluIHNvbWUgYnJvd3NlcnMgYXMgSUUxMSBhbmQgU2FmYXJpLlxuICAgIHhoci5vbmFib3J0ID0gY2xvbmU7XG4gICAgeGhyLm9uZXJyb3IgPSBjbG9uZTtcbiAgICB4aHIub250aW1lb3V0ID0gY2xvbmU7XG5cbiAgICB4aHIub25wcm9ncmVzcyA9ICgpID0+IHtcbiAgICAgIGlmICh4aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ2NvbnRlbnQtdHlwZScpICE9PSBNSU1FX1RZUEVfSlBFRykge1xuICAgICAgICB4aHIuYWJvcnQoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgeGhyLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIHRoaXMucmVhZCh4aHIucmVzcG9uc2UpO1xuICAgIH07XG5cbiAgICB4aHIub25sb2FkZW5kID0gKCkgPT4ge1xuICAgICAgdGhpcy5yZWxvYWRpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMueGhyID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gQnVzdCBjYWNoZSB3aGVuIHRoZXJlIGlzIGEgXCJjcm9zc09yaWdpblwiIHByb3BlcnR5IHRvIGF2b2lkIGJyb3dzZXIgY2FjaGUgZXJyb3JcbiAgICBpZiAob3B0aW9ucy5jaGVja0Nyb3NzT3JpZ2luICYmIGlzQ3Jvc3NPcmlnaW5VUkwodXJsKSAmJiBlbGVtZW50LmNyb3NzT3JpZ2luKSB7XG4gICAgICB1cmwgPSBhZGRUaW1lc3RhbXAodXJsKTtcbiAgICB9XG5cbiAgICB4aHIub3BlbignR0VUJywgdXJsKTtcbiAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcbiAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gZWxlbWVudC5jcm9zc09yaWdpbiA9PT0gJ3VzZS1jcmVkZW50aWFscyc7XG4gICAgeGhyLnNlbmQoKTtcbiAgfVxuXG4gIHJlYWQoYXJyYXlCdWZmZXIpIHtcbiAgICBjb25zdCB7IG9wdGlvbnMsIGltYWdlRGF0YSB9ID0gdGhpcztcblxuICAgIC8vIFJlc2V0IHRoZSBvcmllbnRhdGlvbiB2YWx1ZSB0byBpdHMgZGVmYXVsdCB2YWx1ZSAxXG4gICAgLy8gYXMgc29tZSBpT1MgYnJvd3NlcnMgd2lsbCByZW5kZXIgaW1hZ2Ugd2l0aCBpdHMgb3JpZW50YXRpb25cbiAgICBjb25zdCBvcmllbnRhdGlvbiA9IHJlc2V0QW5kR2V0T3JpZW50YXRpb24oYXJyYXlCdWZmZXIpO1xuICAgIGxldCByb3RhdGUgPSAwO1xuICAgIGxldCBzY2FsZVggPSAxO1xuICAgIGxldCBzY2FsZVkgPSAxO1xuXG4gICAgaWYgKG9yaWVudGF0aW9uID4gMSkge1xuICAgICAgLy8gR2VuZXJhdGUgYSBuZXcgVVJMIHdoaWNoIGhhcyB0aGUgZGVmYXVsdCBvcmllbnRhdGlvbiB2YWx1ZVxuICAgICAgdGhpcy51cmwgPSBhcnJheUJ1ZmZlclRvRGF0YVVSTChhcnJheUJ1ZmZlciwgTUlNRV9UWVBFX0pQRUcpO1xuICAgICAgKHsgcm90YXRlLCBzY2FsZVgsIHNjYWxlWSB9ID0gcGFyc2VPcmllbnRhdGlvbihvcmllbnRhdGlvbikpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnJvdGF0YWJsZSkge1xuICAgICAgaW1hZ2VEYXRhLnJvdGF0ZSA9IHJvdGF0ZTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5zY2FsYWJsZSkge1xuICAgICAgaW1hZ2VEYXRhLnNjYWxlWCA9IHNjYWxlWDtcbiAgICAgIGltYWdlRGF0YS5zY2FsZVkgPSBzY2FsZVk7XG4gICAgfVxuXG4gICAgdGhpcy5jbG9uZSgpO1xuICB9XG5cbiAgY2xvbmUoKSB7XG4gICAgY29uc3QgeyBlbGVtZW50LCB1cmwgfSA9IHRoaXM7XG4gICAgbGV0IGNyb3NzT3JpZ2luO1xuICAgIGxldCBjcm9zc09yaWdpblVybDtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY2hlY2tDcm9zc09yaWdpbiAmJiBpc0Nyb3NzT3JpZ2luVVJMKHVybCkpIHtcbiAgICAgICh7IGNyb3NzT3JpZ2luIH0gPSBlbGVtZW50KTtcblxuICAgICAgaWYgKGNyb3NzT3JpZ2luKSB7XG4gICAgICAgIGNyb3NzT3JpZ2luVXJsID0gdXJsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3Jvc3NPcmlnaW4gPSAnYW5vbnltb3VzJztcblxuICAgICAgICAvLyBCdXN0IGNhY2hlIHdoZW4gdGhlcmUgaXMgbm90IGEgXCJjcm9zc09yaWdpblwiIHByb3BlcnR5XG4gICAgICAgIGNyb3NzT3JpZ2luVXJsID0gYWRkVGltZXN0YW1wKHVybCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5jcm9zc09yaWdpbiA9IGNyb3NzT3JpZ2luO1xuICAgIHRoaXMuY3Jvc3NPcmlnaW5VcmwgPSBjcm9zc09yaWdpblVybDtcblxuICAgIGNvbnN0IGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cbiAgICBpZiAoY3Jvc3NPcmlnaW4pIHtcbiAgICAgIGltYWdlLmNyb3NzT3JpZ2luID0gY3Jvc3NPcmlnaW47XG4gICAgfVxuXG4gICAgaW1hZ2Uuc3JjID0gY3Jvc3NPcmlnaW5VcmwgfHwgdXJsO1xuICAgIHRoaXMuaW1hZ2UgPSBpbWFnZTtcbiAgICBpbWFnZS5vbmxvYWQgPSB0aGlzLnN0YXJ0LmJpbmQodGhpcyk7XG4gICAgaW1hZ2Uub25lcnJvciA9IHRoaXMuc3RvcC5iaW5kKHRoaXMpO1xuICAgIGFkZENsYXNzKGltYWdlLCBDTEFTU19ISURFKTtcbiAgICBlbGVtZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGltYWdlLCBlbGVtZW50Lm5leHRTaWJsaW5nKTtcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIGNvbnN0IGltYWdlID0gdGhpcy5pc0ltZyA/IHRoaXMuZWxlbWVudCA6IHRoaXMuaW1hZ2U7XG5cbiAgICBpbWFnZS5vbmxvYWQgPSBudWxsO1xuICAgIGltYWdlLm9uZXJyb3IgPSBudWxsO1xuICAgIHRoaXMuc2l6aW5nID0gdHJ1ZTtcblxuICAgIGNvbnN0IElTX1NBRkFSSSA9IFdJTkRPVy5uYXZpZ2F0b3IgJiYgL14oPzouKD8hY2hyb21lfGFuZHJvaWQpKSpzYWZhcmkvaS50ZXN0KFdJTkRPVy5uYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICBjb25zdCBkb25lID0gKG5hdHVyYWxXaWR0aCwgbmF0dXJhbEhlaWdodCkgPT4ge1xuICAgICAgYXNzaWduKHRoaXMuaW1hZ2VEYXRhLCB7XG4gICAgICAgIG5hdHVyYWxXaWR0aCxcbiAgICAgICAgbmF0dXJhbEhlaWdodCxcbiAgICAgICAgYXNwZWN0UmF0aW86IG5hdHVyYWxXaWR0aCAvIG5hdHVyYWxIZWlnaHQsXG4gICAgICB9KTtcbiAgICAgIHRoaXMuc2l6aW5nID0gZmFsc2U7XG4gICAgICB0aGlzLnNpemVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuYnVpbGQoKTtcbiAgICB9O1xuXG4gICAgLy8gTW9kZXJuIGJyb3dzZXJzIChleGNlcHQgU2FmYXJpKVxuICAgIGlmIChpbWFnZS5uYXR1cmFsV2lkdGggJiYgIUlTX1NBRkFSSSkge1xuICAgICAgZG9uZShpbWFnZS5uYXR1cmFsV2lkdGgsIGltYWdlLm5hdHVyYWxIZWlnaHQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNpemluZ0ltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG4gICAgdGhpcy5zaXppbmdJbWFnZSA9IHNpemluZ0ltYWdlO1xuXG4gICAgc2l6aW5nSW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgZG9uZShzaXppbmdJbWFnZS53aWR0aCwgc2l6aW5nSW1hZ2UuaGVpZ2h0KTtcblxuICAgICAgaWYgKCFJU19TQUZBUkkpIHtcbiAgICAgICAgYm9keS5yZW1vdmVDaGlsZChzaXppbmdJbWFnZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHNpemluZ0ltYWdlLnNyYyA9IGltYWdlLnNyYztcblxuICAgIC8vIGlPUyBTYWZhcmkgd2lsbCBjb252ZXJ0IHRoZSBpbWFnZSBhdXRvbWF0aWNhbGx5XG4gICAgLy8gd2l0aCBpdHMgb3JpZW50YXRpb24gb25jZSBhcHBlbmQgaXQgaW50byBET00gKCMyNzkpXG4gICAgaWYgKCFJU19TQUZBUkkpIHtcbiAgICAgIHNpemluZ0ltYWdlLnN0eWxlLmNzc1RleHQgPSAoXG4gICAgICAgICdsZWZ0OjA7J1xuICAgICAgICArICdtYXgtaGVpZ2h0Om5vbmUhaW1wb3J0YW50OydcbiAgICAgICAgKyAnbWF4LXdpZHRoOm5vbmUhaW1wb3J0YW50OydcbiAgICAgICAgKyAnbWluLWhlaWdodDowIWltcG9ydGFudDsnXG4gICAgICAgICsgJ21pbi13aWR0aDowIWltcG9ydGFudDsnXG4gICAgICAgICsgJ29wYWNpdHk6MDsnXG4gICAgICAgICsgJ3Bvc2l0aW9uOmFic29sdXRlOydcbiAgICAgICAgKyAndG9wOjA7J1xuICAgICAgICArICd6LWluZGV4Oi0xOydcbiAgICAgICk7XG4gICAgICBib2R5LmFwcGVuZENoaWxkKHNpemluZ0ltYWdlKTtcbiAgICB9XG4gIH1cblxuICBzdG9wKCkge1xuICAgIGNvbnN0IHsgaW1hZ2UgfSA9IHRoaXM7XG5cbiAgICBpbWFnZS5vbmxvYWQgPSBudWxsO1xuICAgIGltYWdlLm9uZXJyb3IgPSBudWxsO1xuICAgIGltYWdlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaW1hZ2UpO1xuICAgIHRoaXMuaW1hZ2UgPSBudWxsO1xuICB9XG5cbiAgYnVpbGQoKSB7XG4gICAgaWYgKCF0aGlzLnNpemVkIHx8IHRoaXMucmVhZHkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB7IGVsZW1lbnQsIG9wdGlvbnMsIGltYWdlIH0gPSB0aGlzO1xuXG4gICAgLy8gQ3JlYXRlIGNyb3BwZXIgZWxlbWVudHNcbiAgICBjb25zdCBjb250YWluZXIgPSBlbGVtZW50LnBhcmVudE5vZGU7XG4gICAgY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IFRFTVBMQVRFO1xuXG4gICAgY29uc3QgY3JvcHBlciA9IHRlbXBsYXRlLnF1ZXJ5U2VsZWN0b3IoYC4ke05BTUVTUEFDRX0tY29udGFpbmVyYCk7XG4gICAgY29uc3QgY2FudmFzID0gY3JvcHBlci5xdWVyeVNlbGVjdG9yKGAuJHtOQU1FU1BBQ0V9LWNhbnZhc2ApO1xuICAgIGNvbnN0IGRyYWdCb3ggPSBjcm9wcGVyLnF1ZXJ5U2VsZWN0b3IoYC4ke05BTUVTUEFDRX0tZHJhZy1ib3hgKTtcbiAgICBjb25zdCBjcm9wQm94ID0gY3JvcHBlci5xdWVyeVNlbGVjdG9yKGAuJHtOQU1FU1BBQ0V9LWNyb3AtYm94YCk7XG4gICAgY29uc3QgZmFjZSA9IGNyb3BCb3gucXVlcnlTZWxlY3RvcihgLiR7TkFNRVNQQUNFfS1mYWNlYCk7XG5cbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICB0aGlzLmNyb3BwZXIgPSBjcm9wcGVyO1xuICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICAgIHRoaXMuZHJhZ0JveCA9IGRyYWdCb3g7XG4gICAgdGhpcy5jcm9wQm94ID0gY3JvcEJveDtcbiAgICB0aGlzLnZpZXdCb3ggPSBjcm9wcGVyLnF1ZXJ5U2VsZWN0b3IoYC4ke05BTUVTUEFDRX0tdmlldy1ib3hgKTtcbiAgICB0aGlzLmZhY2UgPSBmYWNlO1xuXG4gICAgY2FudmFzLmFwcGVuZENoaWxkKGltYWdlKTtcblxuICAgIC8vIEhpZGUgdGhlIG9yaWdpbmFsIGltYWdlXG4gICAgYWRkQ2xhc3MoZWxlbWVudCwgQ0xBU1NfSElEREVOKTtcblxuICAgIC8vIEluc2VydHMgdGhlIGNyb3BwZXIgYWZ0ZXIgdG8gdGhlIGN1cnJlbnQgaW1hZ2VcbiAgICBjb250YWluZXIuaW5zZXJ0QmVmb3JlKGNyb3BwZXIsIGVsZW1lbnQubmV4dFNpYmxpbmcpO1xuXG4gICAgLy8gU2hvdyB0aGUgaW1hZ2UgaWYgaXMgaGlkZGVuXG4gICAgaWYgKCF0aGlzLmlzSW1nKSB7XG4gICAgICByZW1vdmVDbGFzcyhpbWFnZSwgQ0xBU1NfSElERSk7XG4gICAgfVxuXG4gICAgdGhpcy5pbml0UHJldmlldygpO1xuICAgIHRoaXMuYmluZCgpO1xuXG4gICAgb3B0aW9ucy5pbml0aWFsQXNwZWN0UmF0aW8gPSBNYXRoLm1heCgwLCBvcHRpb25zLmluaXRpYWxBc3BlY3RSYXRpbykgfHwgTmFOO1xuICAgIG9wdGlvbnMuYXNwZWN0UmF0aW8gPSBNYXRoLm1heCgwLCBvcHRpb25zLmFzcGVjdFJhdGlvKSB8fCBOYU47XG4gICAgb3B0aW9ucy52aWV3TW9kZSA9IE1hdGgubWF4KDAsIE1hdGgubWluKDMsIE1hdGgucm91bmQob3B0aW9ucy52aWV3TW9kZSkpKSB8fCAwO1xuXG4gICAgYWRkQ2xhc3MoY3JvcEJveCwgQ0xBU1NfSElEREVOKTtcblxuICAgIGlmICghb3B0aW9ucy5ndWlkZXMpIHtcbiAgICAgIGFkZENsYXNzKGNyb3BCb3guZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHtOQU1FU1BBQ0V9LWRhc2hlZGApLCBDTEFTU19ISURERU4pO1xuICAgIH1cblxuICAgIGlmICghb3B0aW9ucy5jZW50ZXIpIHtcbiAgICAgIGFkZENsYXNzKGNyb3BCb3guZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHtOQU1FU1BBQ0V9LWNlbnRlcmApLCBDTEFTU19ISURERU4pO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmJhY2tncm91bmQpIHtcbiAgICAgIGFkZENsYXNzKGNyb3BwZXIsIGAke05BTUVTUEFDRX0tYmdgKTtcbiAgICB9XG5cbiAgICBpZiAoIW9wdGlvbnMuaGlnaGxpZ2h0KSB7XG4gICAgICBhZGRDbGFzcyhmYWNlLCBDTEFTU19JTlZJU0lCTEUpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmNyb3BCb3hNb3ZhYmxlKSB7XG4gICAgICBhZGRDbGFzcyhmYWNlLCBDTEFTU19NT1ZFKTtcbiAgICAgIHNldERhdGEoZmFjZSwgREFUQV9BQ1RJT04sIEFDVElPTl9BTEwpO1xuICAgIH1cblxuICAgIGlmICghb3B0aW9ucy5jcm9wQm94UmVzaXphYmxlKSB7XG4gICAgICBhZGRDbGFzcyhjcm9wQm94LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7TkFNRVNQQUNFfS1saW5lYCksIENMQVNTX0hJRERFTik7XG4gICAgICBhZGRDbGFzcyhjcm9wQm94LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7TkFNRVNQQUNFfS1wb2ludGApLCBDTEFTU19ISURERU4pO1xuICAgIH1cblxuICAgIHRoaXMucmVuZGVyKCk7XG4gICAgdGhpcy5yZWFkeSA9IHRydWU7XG4gICAgdGhpcy5zZXREcmFnTW9kZShvcHRpb25zLmRyYWdNb2RlKTtcblxuICAgIGlmIChvcHRpb25zLmF1dG9Dcm9wKSB7XG4gICAgICB0aGlzLmNyb3AoKTtcbiAgICB9XG5cbiAgICB0aGlzLnNldERhdGEob3B0aW9ucy5kYXRhKTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKG9wdGlvbnMucmVhZHkpKSB7XG4gICAgICBhZGRMaXN0ZW5lcihlbGVtZW50LCBFVkVOVF9SRUFEWSwgb3B0aW9ucy5yZWFkeSwge1xuICAgICAgICBvbmNlOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGlzcGF0Y2hFdmVudChlbGVtZW50LCBFVkVOVF9SRUFEWSk7XG4gIH1cblxuICB1bmJ1aWxkKCkge1xuICAgIGlmICghdGhpcy5yZWFkeSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMucmVhZHkgPSBmYWxzZTtcbiAgICB0aGlzLnVuYmluZCgpO1xuICAgIHRoaXMucmVzZXRQcmV2aWV3KCk7XG4gICAgdGhpcy5jcm9wcGVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5jcm9wcGVyKTtcbiAgICByZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnQsIENMQVNTX0hJRERFTik7XG4gIH1cblxuICB1bmNyZWF0ZSgpIHtcbiAgICBpZiAodGhpcy5yZWFkeSkge1xuICAgICAgdGhpcy51bmJ1aWxkKCk7XG4gICAgICB0aGlzLnJlYWR5ID0gZmFsc2U7XG4gICAgICB0aGlzLmNyb3BwZWQgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2l6aW5nKSB7XG4gICAgICB0aGlzLnNpemluZ0ltYWdlLm9ubG9hZCA9IG51bGw7XG4gICAgICB0aGlzLnNpemluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5zaXplZCA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5yZWxvYWRpbmcpIHtcbiAgICAgIHRoaXMueGhyLm9uYWJvcnQgPSBudWxsO1xuICAgICAgdGhpcy54aHIuYWJvcnQoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaW1hZ2UpIHtcbiAgICAgIHRoaXMuc3RvcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG5vIGNvbmZsaWN0IGNyb3BwZXIgY2xhc3MuXG4gICAqIEByZXR1cm5zIHtDcm9wcGVyfSBUaGUgY3JvcHBlciBjbGFzcy5cbiAgICovXG4gIHN0YXRpYyBub0NvbmZsaWN0KCkge1xuICAgIHdpbmRvdy5Dcm9wcGVyID0gQW5vdGhlckNyb3BwZXI7XG4gICAgcmV0dXJuIENyb3BwZXI7XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlIHRoZSBkZWZhdWx0IG9wdGlvbnMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG5ldyBkZWZhdWx0IG9wdGlvbnMuXG4gICAqL1xuICBzdGF0aWMgc2V0RGVmYXVsdHMob3B0aW9ucykge1xuICAgIGFzc2lnbihERUZBVUxUUywgaXNQbGFpbk9iamVjdChvcHRpb25zKSAmJiBvcHRpb25zKTtcbiAgfVxufVxuXG5hc3NpZ24oQ3JvcHBlci5wcm90b3R5cGUsIHJlbmRlciwgcHJldmlldywgZXZlbnRzLCBoYW5kbGVycywgY2hhbmdlLCBtZXRob2RzKTtcblxuZXhwb3J0IGRlZmF1bHQgQ3JvcHBlcjtcbiIsImltcG9ydCB7IERSQUdfTU9ERV9DUk9QIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIC8vIERlZmluZSB0aGUgdmlldyBtb2RlIG9mIHRoZSBjcm9wcGVyXG4gIHZpZXdNb2RlOiAwLCAvLyAwLCAxLCAyLCAzXG5cbiAgLy8gRGVmaW5lIHRoZSBkcmFnZ2luZyBtb2RlIG9mIHRoZSBjcm9wcGVyXG4gIGRyYWdNb2RlOiBEUkFHX01PREVfQ1JPUCwgLy8gJ2Nyb3AnLCAnbW92ZScgb3IgJ25vbmUnXG5cbiAgLy8gRGVmaW5lIHRoZSBpbml0aWFsIGFzcGVjdCByYXRpbyBvZiB0aGUgY3JvcCBib3hcbiAgaW5pdGlhbEFzcGVjdFJhdGlvOiBOYU4sXG5cbiAgLy8gRGVmaW5lIHRoZSBhc3BlY3QgcmF0aW8gb2YgdGhlIGNyb3AgYm94XG4gIGFzcGVjdFJhdGlvOiBOYU4sXG5cbiAgLy8gQW4gb2JqZWN0IHdpdGggdGhlIHByZXZpb3VzIGNyb3BwaW5nIHJlc3VsdCBkYXRhXG4gIGRhdGE6IG51bGwsXG5cbiAgLy8gQSBzZWxlY3RvciBmb3IgYWRkaW5nIGV4dHJhIGNvbnRhaW5lcnMgdG8gcHJldmlld1xuICBwcmV2aWV3OiAnJyxcblxuICAvLyBSZS1yZW5kZXIgdGhlIGNyb3BwZXIgd2hlbiByZXNpemUgdGhlIHdpbmRvd1xuICByZXNwb25zaXZlOiB0cnVlLFxuXG4gIC8vIFJlc3RvcmUgdGhlIGNyb3BwZWQgYXJlYSBhZnRlciByZXNpemUgdGhlIHdpbmRvd1xuICByZXN0b3JlOiB0cnVlLFxuXG4gIC8vIENoZWNrIGlmIHRoZSBjdXJyZW50IGltYWdlIGlzIGEgY3Jvc3Mtb3JpZ2luIGltYWdlXG4gIGNoZWNrQ3Jvc3NPcmlnaW46IHRydWUsXG5cbiAgLy8gQ2hlY2sgdGhlIGN1cnJlbnQgaW1hZ2UncyBFeGlmIE9yaWVudGF0aW9uIGluZm9ybWF0aW9uXG4gIGNoZWNrT3JpZW50YXRpb246IHRydWUsXG5cbiAgLy8gU2hvdyB0aGUgYmxhY2sgbW9kYWxcbiAgbW9kYWw6IHRydWUsXG5cbiAgLy8gU2hvdyB0aGUgZGFzaGVkIGxpbmVzIGZvciBndWlkaW5nXG4gIGd1aWRlczogdHJ1ZSxcblxuICAvLyBTaG93IHRoZSBjZW50ZXIgaW5kaWNhdG9yIGZvciBndWlkaW5nXG4gIGNlbnRlcjogdHJ1ZSxcblxuICAvLyBTaG93IHRoZSB3aGl0ZSBtb2RhbCB0byBoaWdobGlnaHQgdGhlIGNyb3AgYm94XG4gIGhpZ2hsaWdodDogdHJ1ZSxcblxuICAvLyBTaG93IHRoZSBncmlkIGJhY2tncm91bmRcbiAgYmFja2dyb3VuZDogdHJ1ZSxcblxuICAvLyBFbmFibGUgdG8gY3JvcCB0aGUgaW1hZ2UgYXV0b21hdGljYWxseSB3aGVuIGluaXRpYWxpemVcbiAgYXV0b0Nyb3A6IHRydWUsXG5cbiAgLy8gRGVmaW5lIHRoZSBwZXJjZW50YWdlIG9mIGF1dG9tYXRpYyBjcm9wcGluZyBhcmVhIHdoZW4gaW5pdGlhbGl6ZXNcbiAgYXV0b0Nyb3BBcmVhOiAwLjgsXG5cbiAgLy8gRW5hYmxlIHRvIG1vdmUgdGhlIGltYWdlXG4gIG1vdmFibGU6IHRydWUsXG5cbiAgLy8gRW5hYmxlIHRvIHJvdGF0ZSB0aGUgaW1hZ2VcbiAgcm90YXRhYmxlOiB0cnVlLFxuXG4gIC8vIEVuYWJsZSB0byBzY2FsZSB0aGUgaW1hZ2VcbiAgc2NhbGFibGU6IHRydWUsXG5cbiAgLy8gRW5hYmxlIHRvIHpvb20gdGhlIGltYWdlXG4gIHpvb21hYmxlOiB0cnVlLFxuXG4gIC8vIEVuYWJsZSB0byB6b29tIHRoZSBpbWFnZSBieSBkcmFnZ2luZyB0b3VjaFxuICB6b29tT25Ub3VjaDogdHJ1ZSxcblxuICAvLyBFbmFibGUgdG8gem9vbSB0aGUgaW1hZ2UgYnkgd2hlZWxpbmcgbW91c2VcbiAgem9vbU9uV2hlZWw6IHRydWUsXG5cbiAgLy8gRGVmaW5lIHpvb20gcmF0aW8gd2hlbiB6b29tIHRoZSBpbWFnZSBieSB3aGVlbGluZyBtb3VzZVxuICB3aGVlbFpvb21SYXRpbzogMC4xLFxuXG4gIC8vIEVuYWJsZSB0byBtb3ZlIHRoZSBjcm9wIGJveFxuICBjcm9wQm94TW92YWJsZTogdHJ1ZSxcblxuICAvLyBFbmFibGUgdG8gcmVzaXplIHRoZSBjcm9wIGJveFxuICBjcm9wQm94UmVzaXphYmxlOiB0cnVlLFxuXG4gIC8vIFRvZ2dsZSBkcmFnIG1vZGUgYmV0d2VlbiBcImNyb3BcIiBhbmQgXCJtb3ZlXCIgd2hlbiBjbGljayB0d2ljZSBvbiB0aGUgY3JvcHBlclxuICB0b2dnbGVEcmFnTW9kZU9uRGJsY2xpY2s6IHRydWUsXG5cbiAgLy8gU2l6ZSBsaW1pdGF0aW9uXG4gIG1pbkNhbnZhc1dpZHRoOiAwLFxuICBtaW5DYW52YXNIZWlnaHQ6IDAsXG4gIG1pbkNyb3BCb3hXaWR0aDogMCxcbiAgbWluQ3JvcEJveEhlaWdodDogMCxcbiAgbWluQ29udGFpbmVyV2lkdGg6IDIwMCxcbiAgbWluQ29udGFpbmVySGVpZ2h0OiAxMDAsXG5cbiAgLy8gU2hvcnRjdXRzIG9mIGV2ZW50c1xuICByZWFkeTogbnVsbCxcbiAgY3JvcHN0YXJ0OiBudWxsLFxuICBjcm9wbW92ZTogbnVsbCxcbiAgY3JvcGVuZDogbnVsbCxcbiAgY3JvcDogbnVsbCxcbiAgem9vbTogbnVsbCxcbn07XG4iLCJpbXBvcnQge1xuICBFVkVOVF9DUk9QLFxuICBFVkVOVF9DUk9QX0VORCxcbiAgRVZFTlRfQ1JPUF9NT1ZFLFxuICBFVkVOVF9DUk9QX1NUQVJULFxuICBFVkVOVF9EQkxDTElDSyxcbiAgRVZFTlRfUE9JTlRFUl9ET1dOLFxuICBFVkVOVF9QT0lOVEVSX01PVkUsXG4gIEVWRU5UX1BPSU5URVJfVVAsXG4gIEVWRU5UX1JFU0laRSxcbiAgRVZFTlRfV0hFRUwsXG4gIEVWRU5UX1pPT00sXG59IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7XG4gIGFkZExpc3RlbmVyLFxuICBpc0Z1bmN0aW9uLFxuICByZW1vdmVMaXN0ZW5lcixcbn0gZnJvbSAnLi91dGlsaXRpZXMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGJpbmQoKSB7XG4gICAgY29uc3QgeyBlbGVtZW50LCBvcHRpb25zLCBjcm9wcGVyIH0gPSB0aGlzO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24ob3B0aW9ucy5jcm9wc3RhcnQpKSB7XG4gICAgICBhZGRMaXN0ZW5lcihlbGVtZW50LCBFVkVOVF9DUk9QX1NUQVJULCBvcHRpb25zLmNyb3BzdGFydCk7XG4gICAgfVxuXG4gICAgaWYgKGlzRnVuY3Rpb24ob3B0aW9ucy5jcm9wbW92ZSkpIHtcbiAgICAgIGFkZExpc3RlbmVyKGVsZW1lbnQsIEVWRU5UX0NST1BfTU9WRSwgb3B0aW9ucy5jcm9wbW92ZSk7XG4gICAgfVxuXG4gICAgaWYgKGlzRnVuY3Rpb24ob3B0aW9ucy5jcm9wZW5kKSkge1xuICAgICAgYWRkTGlzdGVuZXIoZWxlbWVudCwgRVZFTlRfQ1JPUF9FTkQsIG9wdGlvbnMuY3JvcGVuZCk7XG4gICAgfVxuXG4gICAgaWYgKGlzRnVuY3Rpb24ob3B0aW9ucy5jcm9wKSkge1xuICAgICAgYWRkTGlzdGVuZXIoZWxlbWVudCwgRVZFTlRfQ1JPUCwgb3B0aW9ucy5jcm9wKTtcbiAgICB9XG5cbiAgICBpZiAoaXNGdW5jdGlvbihvcHRpb25zLnpvb20pKSB7XG4gICAgICBhZGRMaXN0ZW5lcihlbGVtZW50LCBFVkVOVF9aT09NLCBvcHRpb25zLnpvb20pO1xuICAgIH1cblxuICAgIGFkZExpc3RlbmVyKGNyb3BwZXIsIEVWRU5UX1BPSU5URVJfRE9XTiwgKHRoaXMub25Dcm9wU3RhcnQgPSB0aGlzLmNyb3BTdGFydC5iaW5kKHRoaXMpKSk7XG5cbiAgICBpZiAob3B0aW9ucy56b29tYWJsZSAmJiBvcHRpb25zLnpvb21PbldoZWVsKSB7XG4gICAgICBhZGRMaXN0ZW5lcihjcm9wcGVyLCBFVkVOVF9XSEVFTCwgKHRoaXMub25XaGVlbCA9IHRoaXMud2hlZWwuYmluZCh0aGlzKSksIHtcbiAgICAgICAgcGFzc2l2ZTogZmFsc2UsXG4gICAgICAgIGNhcHR1cmU6IHRydWUsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy50b2dnbGVEcmFnTW9kZU9uRGJsY2xpY2spIHtcbiAgICAgIGFkZExpc3RlbmVyKGNyb3BwZXIsIEVWRU5UX0RCTENMSUNLLCAodGhpcy5vbkRibGNsaWNrID0gdGhpcy5kYmxjbGljay5iaW5kKHRoaXMpKSk7XG4gICAgfVxuXG4gICAgYWRkTGlzdGVuZXIoXG4gICAgICBlbGVtZW50Lm93bmVyRG9jdW1lbnQsXG4gICAgICBFVkVOVF9QT0lOVEVSX01PVkUsXG4gICAgICAodGhpcy5vbkNyb3BNb3ZlID0gdGhpcy5jcm9wTW92ZS5iaW5kKHRoaXMpKSxcbiAgICApO1xuICAgIGFkZExpc3RlbmVyKFxuICAgICAgZWxlbWVudC5vd25lckRvY3VtZW50LFxuICAgICAgRVZFTlRfUE9JTlRFUl9VUCxcbiAgICAgICh0aGlzLm9uQ3JvcEVuZCA9IHRoaXMuY3JvcEVuZC5iaW5kKHRoaXMpKSxcbiAgICApO1xuXG4gICAgaWYgKG9wdGlvbnMucmVzcG9uc2l2ZSkge1xuICAgICAgYWRkTGlzdGVuZXIod2luZG93LCBFVkVOVF9SRVNJWkUsICh0aGlzLm9uUmVzaXplID0gdGhpcy5yZXNpemUuYmluZCh0aGlzKSkpO1xuICAgIH1cbiAgfSxcblxuICB1bmJpbmQoKSB7XG4gICAgY29uc3QgeyBlbGVtZW50LCBvcHRpb25zLCBjcm9wcGVyIH0gPSB0aGlzO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24ob3B0aW9ucy5jcm9wc3RhcnQpKSB7XG4gICAgICByZW1vdmVMaXN0ZW5lcihlbGVtZW50LCBFVkVOVF9DUk9QX1NUQVJULCBvcHRpb25zLmNyb3BzdGFydCk7XG4gICAgfVxuXG4gICAgaWYgKGlzRnVuY3Rpb24ob3B0aW9ucy5jcm9wbW92ZSkpIHtcbiAgICAgIHJlbW92ZUxpc3RlbmVyKGVsZW1lbnQsIEVWRU5UX0NST1BfTU9WRSwgb3B0aW9ucy5jcm9wbW92ZSk7XG4gICAgfVxuXG4gICAgaWYgKGlzRnVuY3Rpb24ob3B0aW9ucy5jcm9wZW5kKSkge1xuICAgICAgcmVtb3ZlTGlzdGVuZXIoZWxlbWVudCwgRVZFTlRfQ1JPUF9FTkQsIG9wdGlvbnMuY3JvcGVuZCk7XG4gICAgfVxuXG4gICAgaWYgKGlzRnVuY3Rpb24ob3B0aW9ucy5jcm9wKSkge1xuICAgICAgcmVtb3ZlTGlzdGVuZXIoZWxlbWVudCwgRVZFTlRfQ1JPUCwgb3B0aW9ucy5jcm9wKTtcbiAgICB9XG5cbiAgICBpZiAoaXNGdW5jdGlvbihvcHRpb25zLnpvb20pKSB7XG4gICAgICByZW1vdmVMaXN0ZW5lcihlbGVtZW50LCBFVkVOVF9aT09NLCBvcHRpb25zLnpvb20pO1xuICAgIH1cblxuICAgIHJlbW92ZUxpc3RlbmVyKGNyb3BwZXIsIEVWRU5UX1BPSU5URVJfRE9XTiwgdGhpcy5vbkNyb3BTdGFydCk7XG5cbiAgICBpZiAob3B0aW9ucy56b29tYWJsZSAmJiBvcHRpb25zLnpvb21PbldoZWVsKSB7XG4gICAgICByZW1vdmVMaXN0ZW5lcihjcm9wcGVyLCBFVkVOVF9XSEVFTCwgdGhpcy5vbldoZWVsLCB7XG4gICAgICAgIHBhc3NpdmU6IGZhbHNlLFxuICAgICAgICBjYXB0dXJlOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMudG9nZ2xlRHJhZ01vZGVPbkRibGNsaWNrKSB7XG4gICAgICByZW1vdmVMaXN0ZW5lcihjcm9wcGVyLCBFVkVOVF9EQkxDTElDSywgdGhpcy5vbkRibGNsaWNrKTtcbiAgICB9XG5cbiAgICByZW1vdmVMaXN0ZW5lcihlbGVtZW50Lm93bmVyRG9jdW1lbnQsIEVWRU5UX1BPSU5URVJfTU9WRSwgdGhpcy5vbkNyb3BNb3ZlKTtcbiAgICByZW1vdmVMaXN0ZW5lcihlbGVtZW50Lm93bmVyRG9jdW1lbnQsIEVWRU5UX1BPSU5URVJfVVAsIHRoaXMub25Dcm9wRW5kKTtcblxuICAgIGlmIChvcHRpb25zLnJlc3BvbnNpdmUpIHtcbiAgICAgIHJlbW92ZUxpc3RlbmVyKHdpbmRvdywgRVZFTlRfUkVTSVpFLCB0aGlzLm9uUmVzaXplKTtcbiAgICB9XG4gIH0sXG59O1xuIiwiaW1wb3J0IHtcbiAgQUNUSU9OX0NST1AsXG4gIEFDVElPTl9aT09NLFxuICBDTEFTU19DUk9QLFxuICBDTEFTU19NT0RBTCxcbiAgREFUQV9BQ1RJT04sXG4gIERSQUdfTU9ERV9DUk9QLFxuICBEUkFHX01PREVfTU9WRSxcbiAgRFJBR19NT0RFX05PTkUsXG4gIEVWRU5UX0NST1BfRU5ELFxuICBFVkVOVF9DUk9QX01PVkUsXG4gIEVWRU5UX0NST1BfU1RBUlQsXG4gIE1JTl9DT05UQUlORVJfV0lEVEgsXG4gIE1JTl9DT05UQUlORVJfSEVJR0hULFxuICBSRUdFWFBfQUNUSU9OUyxcbn0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHtcbiAgYWRkQ2xhc3MsXG4gIGFzc2lnbixcbiAgZGlzcGF0Y2hFdmVudCxcbiAgZm9yRWFjaCxcbiAgZ2V0RGF0YSxcbiAgZ2V0UG9pbnRlcixcbiAgaGFzQ2xhc3MsXG4gIGlzTnVtYmVyLFxuICB0b2dnbGVDbGFzcyxcbn0gZnJvbSAnLi91dGlsaXRpZXMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHJlc2l6ZSgpIHtcbiAgICBjb25zdCB7IG9wdGlvbnMsIGNvbnRhaW5lciwgY29udGFpbmVyRGF0YSB9ID0gdGhpcztcbiAgICBjb25zdCBtaW5Db250YWluZXJXaWR0aCA9IE51bWJlcihvcHRpb25zLm1pbkNvbnRhaW5lcldpZHRoKSB8fCBNSU5fQ09OVEFJTkVSX1dJRFRIO1xuICAgIGNvbnN0IG1pbkNvbnRhaW5lckhlaWdodCA9IE51bWJlcihvcHRpb25zLm1pbkNvbnRhaW5lckhlaWdodCkgfHwgTUlOX0NPTlRBSU5FUl9IRUlHSFQ7XG5cbiAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCBjb250YWluZXJEYXRhLndpZHRoIDw9IG1pbkNvbnRhaW5lcldpZHRoXG4gICAgICB8fCBjb250YWluZXJEYXRhLmhlaWdodCA8PSBtaW5Db250YWluZXJIZWlnaHQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCByYXRpbyA9IGNvbnRhaW5lci5vZmZzZXRXaWR0aCAvIGNvbnRhaW5lckRhdGEud2lkdGg7XG5cbiAgICAvLyBSZXNpemUgd2hlbiB3aWR0aCBjaGFuZ2VkIG9yIGhlaWdodCBjaGFuZ2VkXG4gICAgaWYgKHJhdGlvICE9PSAxIHx8IGNvbnRhaW5lci5vZmZzZXRIZWlnaHQgIT09IGNvbnRhaW5lckRhdGEuaGVpZ2h0KSB7XG4gICAgICBsZXQgY2FudmFzRGF0YTtcbiAgICAgIGxldCBjcm9wQm94RGF0YTtcblxuICAgICAgaWYgKG9wdGlvbnMucmVzdG9yZSkge1xuICAgICAgICBjYW52YXNEYXRhID0gdGhpcy5nZXRDYW52YXNEYXRhKCk7XG4gICAgICAgIGNyb3BCb3hEYXRhID0gdGhpcy5nZXRDcm9wQm94RGF0YSgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnJlbmRlcigpO1xuXG4gICAgICBpZiAob3B0aW9ucy5yZXN0b3JlKSB7XG4gICAgICAgIHRoaXMuc2V0Q2FudmFzRGF0YShmb3JFYWNoKGNhbnZhc0RhdGEsIChuLCBpKSA9PiB7XG4gICAgICAgICAgY2FudmFzRGF0YVtpXSA9IG4gKiByYXRpbztcbiAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLnNldENyb3BCb3hEYXRhKGZvckVhY2goY3JvcEJveERhdGEsIChuLCBpKSA9PiB7XG4gICAgICAgICAgY3JvcEJveERhdGFbaV0gPSBuICogcmF0aW87XG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgZGJsY2xpY2soKSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5vcHRpb25zLmRyYWdNb2RlID09PSBEUkFHX01PREVfTk9ORSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc2V0RHJhZ01vZGUoaGFzQ2xhc3ModGhpcy5kcmFnQm94LCBDTEFTU19DUk9QKSA/IERSQUdfTU9ERV9NT1ZFIDogRFJBR19NT0RFX0NST1ApO1xuICB9LFxuXG4gIHdoZWVsKGV2ZW50KSB7XG4gICAgY29uc3QgcmF0aW8gPSBOdW1iZXIodGhpcy5vcHRpb25zLndoZWVsWm9vbVJhdGlvKSB8fCAwLjE7XG4gICAgbGV0IGRlbHRhID0gMTtcblxuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIC8vIExpbWl0IHdoZWVsIHNwZWVkIHRvIHByZXZlbnQgem9vbSB0b28gZmFzdCAoIzIxKVxuICAgIGlmICh0aGlzLndoZWVsaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy53aGVlbGluZyA9IHRydWU7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMud2hlZWxpbmcgPSBmYWxzZTtcbiAgICB9LCA1MCk7XG5cbiAgICBpZiAoZXZlbnQuZGVsdGFZKSB7XG4gICAgICBkZWx0YSA9IGV2ZW50LmRlbHRhWSA+IDAgPyAxIDogLTE7XG4gICAgfSBlbHNlIGlmIChldmVudC53aGVlbERlbHRhKSB7XG4gICAgICBkZWx0YSA9IC1ldmVudC53aGVlbERlbHRhIC8gMTIwO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQuZGV0YWlsKSB7XG4gICAgICBkZWx0YSA9IGV2ZW50LmRldGFpbCA+IDAgPyAxIDogLTE7XG4gICAgfVxuXG4gICAgdGhpcy56b29tKC1kZWx0YSAqIHJhdGlvLCBldmVudCk7XG4gIH0sXG5cbiAgY3JvcFN0YXJ0KGV2ZW50KSB7XG4gICAgY29uc3QgeyBidXR0b25zLCBidXR0b24gfSA9IGV2ZW50O1xuXG4gICAgaWYgKFxuICAgICAgdGhpcy5kaXNhYmxlZFxuXG4gICAgICAvLyBObyBwcmltYXJ5IGJ1dHRvbiAoVXN1YWxseSB0aGUgbGVmdCBidXR0b24pXG4gICAgICAvLyBOb3RlIHRoYXQgdG91Y2ggZXZlbnRzIGhhdmUgbm8gYGJ1dHRvbnNgIG9yIGBidXR0b25gIHByb3BlcnR5XG4gICAgICB8fCAoaXNOdW1iZXIoYnV0dG9ucykgJiYgYnV0dG9ucyAhPT0gMSlcbiAgICAgIHx8IChpc051bWJlcihidXR0b24pICYmIGJ1dHRvbiAhPT0gMClcblxuICAgICAgLy8gT3BlbiBjb250ZXh0IG1lbnVcbiAgICAgIHx8IGV2ZW50LmN0cmxLZXlcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB7IG9wdGlvbnMsIHBvaW50ZXJzIH0gPSB0aGlzO1xuICAgIGxldCBhY3Rpb247XG5cbiAgICBpZiAoZXZlbnQuY2hhbmdlZFRvdWNoZXMpIHtcbiAgICAgIC8vIEhhbmRsZSB0b3VjaCBldmVudFxuICAgICAgZm9yRWFjaChldmVudC5jaGFuZ2VkVG91Y2hlcywgKHRvdWNoKSA9PiB7XG4gICAgICAgIHBvaW50ZXJzW3RvdWNoLmlkZW50aWZpZXJdID0gZ2V0UG9pbnRlcih0b3VjaCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSGFuZGxlIG1vdXNlIGV2ZW50IGFuZCBwb2ludGVyIGV2ZW50XG4gICAgICBwb2ludGVyc1tldmVudC5wb2ludGVySWQgfHwgMF0gPSBnZXRQb2ludGVyKGV2ZW50KTtcbiAgICB9XG5cbiAgICBpZiAoT2JqZWN0LmtleXMocG9pbnRlcnMpLmxlbmd0aCA+IDEgJiYgb3B0aW9ucy56b29tYWJsZSAmJiBvcHRpb25zLnpvb21PblRvdWNoKSB7XG4gICAgICBhY3Rpb24gPSBBQ1RJT05fWk9PTTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWN0aW9uID0gZ2V0RGF0YShldmVudC50YXJnZXQsIERBVEFfQUNUSU9OKTtcbiAgICB9XG5cbiAgICBpZiAoIVJFR0VYUF9BQ1RJT05TLnRlc3QoYWN0aW9uKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChkaXNwYXRjaEV2ZW50KHRoaXMuZWxlbWVudCwgRVZFTlRfQ1JPUF9TVEFSVCwge1xuICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICBhY3Rpb24sXG4gICAgfSkgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gVGhpcyBsaW5lIGlzIHJlcXVpcmVkIGZvciBwcmV2ZW50aW5nIHBhZ2Ugem9vbWluZyBpbiBpT1MgYnJvd3NlcnNcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdGhpcy5hY3Rpb24gPSBhY3Rpb247XG4gICAgdGhpcy5jcm9wcGluZyA9IGZhbHNlO1xuXG4gICAgaWYgKGFjdGlvbiA9PT0gQUNUSU9OX0NST1ApIHtcbiAgICAgIHRoaXMuY3JvcHBpbmcgPSB0cnVlO1xuICAgICAgYWRkQ2xhc3ModGhpcy5kcmFnQm94LCBDTEFTU19NT0RBTCk7XG4gICAgfVxuICB9LFxuXG4gIGNyb3BNb3ZlKGV2ZW50KSB7XG4gICAgY29uc3QgeyBhY3Rpb24gfSA9IHRoaXM7XG5cbiAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCAhYWN0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgeyBwb2ludGVycyB9ID0gdGhpcztcblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAoZGlzcGF0Y2hFdmVudCh0aGlzLmVsZW1lbnQsIEVWRU5UX0NST1BfTU9WRSwge1xuICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICBhY3Rpb24sXG4gICAgfSkgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LmNoYW5nZWRUb3VjaGVzKSB7XG4gICAgICBmb3JFYWNoKGV2ZW50LmNoYW5nZWRUb3VjaGVzLCAodG91Y2gpID0+IHtcbiAgICAgICAgLy8gVGhlIGZpcnN0IHBhcmFtZXRlciBzaG91bGQgbm90IGJlIHVuZGVmaW5lZCAoIzQzMilcbiAgICAgICAgYXNzaWduKHBvaW50ZXJzW3RvdWNoLmlkZW50aWZpZXJdIHx8IHt9LCBnZXRQb2ludGVyKHRvdWNoLCB0cnVlKSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXNzaWduKHBvaW50ZXJzW2V2ZW50LnBvaW50ZXJJZCB8fCAwXSB8fCB7fSwgZ2V0UG9pbnRlcihldmVudCwgdHJ1ZSkpO1xuICAgIH1cblxuICAgIHRoaXMuY2hhbmdlKGV2ZW50KTtcbiAgfSxcblxuICBjcm9wRW5kKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB7IGFjdGlvbiwgcG9pbnRlcnMgfSA9IHRoaXM7XG5cbiAgICBpZiAoZXZlbnQuY2hhbmdlZFRvdWNoZXMpIHtcbiAgICAgIGZvckVhY2goZXZlbnQuY2hhbmdlZFRvdWNoZXMsICh0b3VjaCkgPT4ge1xuICAgICAgICBkZWxldGUgcG9pbnRlcnNbdG91Y2guaWRlbnRpZmllcl07XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHBvaW50ZXJzW2V2ZW50LnBvaW50ZXJJZCB8fCAwXTtcbiAgICB9XG5cbiAgICBpZiAoIWFjdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAoIU9iamVjdC5rZXlzKHBvaW50ZXJzKS5sZW5ndGgpIHtcbiAgICAgIHRoaXMuYWN0aW9uID0gJyc7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY3JvcHBpbmcpIHtcbiAgICAgIHRoaXMuY3JvcHBpbmcgPSBmYWxzZTtcbiAgICAgIHRvZ2dsZUNsYXNzKHRoaXMuZHJhZ0JveCwgQ0xBU1NfTU9EQUwsIHRoaXMuY3JvcHBlZCAmJiB0aGlzLm9wdGlvbnMubW9kYWwpO1xuICAgIH1cblxuICAgIGRpc3BhdGNoRXZlbnQodGhpcy5lbGVtZW50LCBFVkVOVF9DUk9QX0VORCwge1xuICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICBhY3Rpb24sXG4gICAgfSk7XG4gIH0sXG59O1xuIiwiaW1wb3J0IHtcbiAgQ0xBU1NfQ1JPUCxcbiAgQ0xBU1NfRElTQUJMRUQsXG4gIENMQVNTX0hJRERFTixcbiAgQ0xBU1NfTU9EQUwsXG4gIENMQVNTX01PVkUsXG4gIERBVEFfQUNUSU9OLFxuICBEUkFHX01PREVfQ1JPUCxcbiAgRFJBR19NT0RFX01PVkUsXG4gIERSQUdfTU9ERV9OT05FLFxuICBFVkVOVF9aT09NLFxuICBOQU1FU1BBQ0UsXG59IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7XG4gIGFkZENsYXNzLFxuICBhc3NpZ24sXG4gIGRpc3BhdGNoRXZlbnQsXG4gIGZvckVhY2gsXG4gIGdldEFkanVzdGVkU2l6ZXMsXG4gIGdldE9mZnNldCxcbiAgZ2V0UG9pbnRlcnNDZW50ZXIsXG4gIGdldFNvdXJjZUNhbnZhcyxcbiAgaXNOdW1iZXIsXG4gIGlzUGxhaW5PYmplY3QsXG4gIGlzVW5kZWZpbmVkLFxuICBub3JtYWxpemVEZWNpbWFsTnVtYmVyLFxuICByZW1vdmVDbGFzcyxcbiAgc2V0RGF0YSxcbiAgdG9nZ2xlQ2xhc3MsXG59IGZyb20gJy4vdXRpbGl0aWVzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAvLyBTaG93IHRoZSBjcm9wIGJveCBtYW51YWxseVxuICBjcm9wKCkge1xuICAgIGlmICh0aGlzLnJlYWR5ICYmICF0aGlzLmNyb3BwZWQgJiYgIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuY3JvcHBlZCA9IHRydWU7XG4gICAgICB0aGlzLmxpbWl0Q3JvcEJveCh0cnVlLCB0cnVlKTtcblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5tb2RhbCkge1xuICAgICAgICBhZGRDbGFzcyh0aGlzLmRyYWdCb3gsIENMQVNTX01PREFMKTtcbiAgICAgIH1cblxuICAgICAgcmVtb3ZlQ2xhc3ModGhpcy5jcm9wQm94LCBDTEFTU19ISURERU4pO1xuICAgICAgdGhpcy5zZXRDcm9wQm94RGF0YSh0aGlzLmluaXRpYWxDcm9wQm94RGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLy8gUmVzZXQgdGhlIGltYWdlIGFuZCBjcm9wIGJveCB0byB0aGVpciBpbml0aWFsIHN0YXRlc1xuICByZXNldCgpIHtcbiAgICBpZiAodGhpcy5yZWFkeSAmJiAhdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5pbWFnZURhdGEgPSBhc3NpZ24oe30sIHRoaXMuaW5pdGlhbEltYWdlRGF0YSk7XG4gICAgICB0aGlzLmNhbnZhc0RhdGEgPSBhc3NpZ24oe30sIHRoaXMuaW5pdGlhbENhbnZhc0RhdGEpO1xuICAgICAgdGhpcy5jcm9wQm94RGF0YSA9IGFzc2lnbih7fSwgdGhpcy5pbml0aWFsQ3JvcEJveERhdGEpO1xuICAgICAgdGhpcy5yZW5kZXJDYW52YXMoKTtcblxuICAgICAgaWYgKHRoaXMuY3JvcHBlZCkge1xuICAgICAgICB0aGlzLnJlbmRlckNyb3BCb3goKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICAvLyBDbGVhciB0aGUgY3JvcCBib3hcbiAgY2xlYXIoKSB7XG4gICAgaWYgKHRoaXMuY3JvcHBlZCAmJiAhdGhpcy5kaXNhYmxlZCkge1xuICAgICAgYXNzaWduKHRoaXMuY3JvcEJveERhdGEsIHtcbiAgICAgICAgbGVmdDogMCxcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgaGVpZ2h0OiAwLFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuY3JvcHBlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5yZW5kZXJDcm9wQm94KCk7XG4gICAgICB0aGlzLmxpbWl0Q2FudmFzKHRydWUsIHRydWUpO1xuXG4gICAgICAvLyBSZW5kZXIgY2FudmFzIGFmdGVyIGNyb3AgYm94IHJlbmRlcmVkXG4gICAgICB0aGlzLnJlbmRlckNhbnZhcygpO1xuICAgICAgcmVtb3ZlQ2xhc3ModGhpcy5kcmFnQm94LCBDTEFTU19NT0RBTCk7XG4gICAgICBhZGRDbGFzcyh0aGlzLmNyb3BCb3gsIENMQVNTX0hJRERFTik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlcGxhY2UgdGhlIGltYWdlJ3Mgc3JjIGFuZCByZWJ1aWxkIHRoZSBjcm9wcGVyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSBUaGUgbmV3IFVSTC5cbiAgICogQHBhcmFtIHtib29sZWFufSBbaGFzU2FtZVNpemVdIC0gSW5kaWNhdGUgaWYgdGhlIG5ldyBpbWFnZSBoYXMgdGhlIHNhbWUgc2l6ZSBhcyB0aGUgb2xkIG9uZS5cbiAgICogQHJldHVybnMge0Nyb3BwZXJ9IHRoaXNcbiAgICovXG4gIHJlcGxhY2UodXJsLCBoYXNTYW1lU2l6ZSA9IGZhbHNlKSB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkICYmIHVybCkge1xuICAgICAgaWYgKHRoaXMuaXNJbWcpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LnNyYyA9IHVybDtcbiAgICAgIH1cblxuICAgICAgaWYgKGhhc1NhbWVTaXplKSB7XG4gICAgICAgIHRoaXMudXJsID0gdXJsO1xuICAgICAgICB0aGlzLmltYWdlLnNyYyA9IHVybDtcblxuICAgICAgICBpZiAodGhpcy5yZWFkeSkge1xuICAgICAgICAgIHRoaXMudmlld0JveEltYWdlLnNyYyA9IHVybDtcblxuICAgICAgICAgIGZvckVhY2godGhpcy5wcmV2aWV3cywgKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpWzBdLnNyYyA9IHVybDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuaXNJbWcpIHtcbiAgICAgICAgICB0aGlzLnJlcGxhY2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub3B0aW9ucy5kYXRhID0gbnVsbDtcbiAgICAgICAgdGhpcy51bmNyZWF0ZSgpO1xuICAgICAgICB0aGlzLmxvYWQodXJsKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICAvLyBFbmFibGUgKHVuZnJlZXplKSB0aGUgY3JvcHBlclxuICBlbmFibGUoKSB7XG4gICAgaWYgKHRoaXMucmVhZHkgJiYgdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgcmVtb3ZlQ2xhc3ModGhpcy5jcm9wcGVyLCBDTEFTU19ESVNBQkxFRCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLy8gRGlzYWJsZSAoZnJlZXplKSB0aGUgY3JvcHBlclxuICBkaXNhYmxlKCkge1xuICAgIGlmICh0aGlzLnJlYWR5ICYmICF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIGFkZENsYXNzKHRoaXMuY3JvcHBlciwgQ0xBU1NfRElTQUJMRUQpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEZXN0cm95IHRoZSBjcm9wcGVyIGFuZCByZW1vdmUgdGhlIGluc3RhbmNlIGZyb20gdGhlIGltYWdlXG4gICAqIEByZXR1cm5zIHtDcm9wcGVyfSB0aGlzXG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIGNvbnN0IHsgZWxlbWVudCB9ID0gdGhpcztcblxuICAgIGlmICghZWxlbWVudFtOQU1FU1BBQ0VdKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBlbGVtZW50W05BTUVTUEFDRV0gPSB1bmRlZmluZWQ7XG5cbiAgICBpZiAodGhpcy5pc0ltZyAmJiB0aGlzLnJlcGxhY2VkKSB7XG4gICAgICBlbGVtZW50LnNyYyA9IHRoaXMub3JpZ2luYWxVcmw7XG4gICAgfVxuXG4gICAgdGhpcy51bmNyZWF0ZSgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIC8qKlxuICAgKiBNb3ZlIHRoZSBjYW52YXMgd2l0aCByZWxhdGl2ZSBvZmZzZXRzXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXRYIC0gVGhlIHJlbGF0aXZlIG9mZnNldCBkaXN0YW5jZSBvbiB0aGUgeC1heGlzLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW29mZnNldFk9b2Zmc2V0WF0gLSBUaGUgcmVsYXRpdmUgb2Zmc2V0IGRpc3RhbmNlIG9uIHRoZSB5LWF4aXMuXG4gICAqIEByZXR1cm5zIHtDcm9wcGVyfSB0aGlzXG4gICAqL1xuICBtb3ZlKG9mZnNldFgsIG9mZnNldFkgPSBvZmZzZXRYKSB7XG4gICAgY29uc3QgeyBsZWZ0LCB0b3AgfSA9IHRoaXMuY2FudmFzRGF0YTtcblxuICAgIHJldHVybiB0aGlzLm1vdmVUbyhcbiAgICAgIGlzVW5kZWZpbmVkKG9mZnNldFgpID8gb2Zmc2V0WCA6IChsZWZ0ICsgTnVtYmVyKG9mZnNldFgpKSxcbiAgICAgIGlzVW5kZWZpbmVkKG9mZnNldFkpID8gb2Zmc2V0WSA6ICh0b3AgKyBOdW1iZXIob2Zmc2V0WSkpLFxuICAgICk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIE1vdmUgdGhlIGNhbnZhcyB0byBhbiBhYnNvbHV0ZSBwb2ludFxuICAgKiBAcGFyYW0ge251bWJlcn0geCAtIFRoZSB4LWF4aXMgY29vcmRpbmF0ZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFt5PXhdIC0gVGhlIHktYXhpcyBjb29yZGluYXRlLlxuICAgKiBAcmV0dXJucyB7Q3JvcHBlcn0gdGhpc1xuICAgKi9cbiAgbW92ZVRvKHgsIHkgPSB4KSB7XG4gICAgY29uc3QgeyBjYW52YXNEYXRhIH0gPSB0aGlzO1xuICAgIGxldCBjaGFuZ2VkID0gZmFsc2U7XG5cbiAgICB4ID0gTnVtYmVyKHgpO1xuICAgIHkgPSBOdW1iZXIoeSk7XG5cbiAgICBpZiAodGhpcy5yZWFkeSAmJiAhdGhpcy5kaXNhYmxlZCAmJiB0aGlzLm9wdGlvbnMubW92YWJsZSkge1xuICAgICAgaWYgKGlzTnVtYmVyKHgpKSB7XG4gICAgICAgIGNhbnZhc0RhdGEubGVmdCA9IHg7XG4gICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNOdW1iZXIoeSkpIHtcbiAgICAgICAgY2FudmFzRGF0YS50b3AgPSB5O1xuICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJDYW52YXModHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFpvb20gdGhlIGNhbnZhcyB3aXRoIGEgcmVsYXRpdmUgcmF0aW9cbiAgICogQHBhcmFtIHtudW1iZXJ9IHJhdGlvIC0gVGhlIHRhcmdldCByYXRpby5cbiAgICogQHBhcmFtIHtFdmVudH0gX29yaWdpbmFsRXZlbnQgLSBUaGUgb3JpZ2luYWwgZXZlbnQgaWYgYW55LlxuICAgKiBAcmV0dXJucyB7Q3JvcHBlcn0gdGhpc1xuICAgKi9cbiAgem9vbShyYXRpbywgX29yaWdpbmFsRXZlbnQpIHtcbiAgICBjb25zdCB7IGNhbnZhc0RhdGEgfSA9IHRoaXM7XG5cbiAgICByYXRpbyA9IE51bWJlcihyYXRpbyk7XG5cbiAgICBpZiAocmF0aW8gPCAwKSB7XG4gICAgICByYXRpbyA9IDEgLyAoMSAtIHJhdGlvKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmF0aW8gPSAxICsgcmF0aW87XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuem9vbVRvKChjYW52YXNEYXRhLndpZHRoICogcmF0aW8pIC8gY2FudmFzRGF0YS5uYXR1cmFsV2lkdGgsIG51bGwsIF9vcmlnaW5hbEV2ZW50KTtcbiAgfSxcblxuICAvKipcbiAgICogWm9vbSB0aGUgY2FudmFzIHRvIGFuIGFic29sdXRlIHJhdGlvXG4gICAqIEBwYXJhbSB7bnVtYmVyfSByYXRpbyAtIFRoZSB0YXJnZXQgcmF0aW8uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwaXZvdCAtIFRoZSB6b29tIHBpdm90IHBvaW50IGNvb3JkaW5hdGUuXG4gICAqIEBwYXJhbSB7RXZlbnR9IF9vcmlnaW5hbEV2ZW50IC0gVGhlIG9yaWdpbmFsIGV2ZW50IGlmIGFueS5cbiAgICogQHJldHVybnMge0Nyb3BwZXJ9IHRoaXNcbiAgICovXG4gIHpvb21UbyhyYXRpbywgcGl2b3QsIF9vcmlnaW5hbEV2ZW50KSB7XG4gICAgY29uc3QgeyBvcHRpb25zLCBjYW52YXNEYXRhIH0gPSB0aGlzO1xuICAgIGNvbnN0IHtcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgICAgbmF0dXJhbFdpZHRoLFxuICAgICAgbmF0dXJhbEhlaWdodCxcbiAgICB9ID0gY2FudmFzRGF0YTtcblxuICAgIHJhdGlvID0gTnVtYmVyKHJhdGlvKTtcblxuICAgIGlmIChyYXRpbyA+PSAwICYmIHRoaXMucmVhZHkgJiYgIXRoaXMuZGlzYWJsZWQgJiYgb3B0aW9ucy56b29tYWJsZSkge1xuICAgICAgY29uc3QgbmV3V2lkdGggPSBuYXR1cmFsV2lkdGggKiByYXRpbztcbiAgICAgIGNvbnN0IG5ld0hlaWdodCA9IG5hdHVyYWxIZWlnaHQgKiByYXRpbztcblxuICAgICAgaWYgKGRpc3BhdGNoRXZlbnQodGhpcy5lbGVtZW50LCBFVkVOVF9aT09NLCB7XG4gICAgICAgIHJhdGlvLFxuICAgICAgICBvbGRSYXRpbzogd2lkdGggLyBuYXR1cmFsV2lkdGgsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IF9vcmlnaW5hbEV2ZW50LFxuICAgICAgfSkgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBpZiAoX29yaWdpbmFsRXZlbnQpIHtcbiAgICAgICAgY29uc3QgeyBwb2ludGVycyB9ID0gdGhpcztcbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gZ2V0T2Zmc2V0KHRoaXMuY3JvcHBlcik7XG4gICAgICAgIGNvbnN0IGNlbnRlciA9IHBvaW50ZXJzICYmIE9iamVjdC5rZXlzKHBvaW50ZXJzKS5sZW5ndGggPyBnZXRQb2ludGVyc0NlbnRlcihwb2ludGVycykgOiB7XG4gICAgICAgICAgcGFnZVg6IF9vcmlnaW5hbEV2ZW50LnBhZ2VYLFxuICAgICAgICAgIHBhZ2VZOiBfb3JpZ2luYWxFdmVudC5wYWdlWSxcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBab29tIGZyb20gdGhlIHRyaWdnZXJpbmcgcG9pbnQgb2YgdGhlIGV2ZW50XG4gICAgICAgIGNhbnZhc0RhdGEubGVmdCAtPSAobmV3V2lkdGggLSB3aWR0aCkgKiAoXG4gICAgICAgICAgKChjZW50ZXIucGFnZVggLSBvZmZzZXQubGVmdCkgLSBjYW52YXNEYXRhLmxlZnQpIC8gd2lkdGhcbiAgICAgICAgKTtcbiAgICAgICAgY2FudmFzRGF0YS50b3AgLT0gKG5ld0hlaWdodCAtIGhlaWdodCkgKiAoXG4gICAgICAgICAgKChjZW50ZXIucGFnZVkgLSBvZmZzZXQudG9wKSAtIGNhbnZhc0RhdGEudG9wKSAvIGhlaWdodFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHBpdm90KSAmJiBpc051bWJlcihwaXZvdC54KSAmJiBpc051bWJlcihwaXZvdC55KSkge1xuICAgICAgICBjYW52YXNEYXRhLmxlZnQgLT0gKG5ld1dpZHRoIC0gd2lkdGgpICogKFxuICAgICAgICAgIChwaXZvdC54IC0gY2FudmFzRGF0YS5sZWZ0KSAvIHdpZHRoXG4gICAgICAgICk7XG4gICAgICAgIGNhbnZhc0RhdGEudG9wIC09IChuZXdIZWlnaHQgLSBoZWlnaHQpICogKFxuICAgICAgICAgIChwaXZvdC55IC0gY2FudmFzRGF0YS50b3ApIC8gaGVpZ2h0XG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBab29tIGZyb20gdGhlIGNlbnRlciBvZiB0aGUgY2FudmFzXG4gICAgICAgIGNhbnZhc0RhdGEubGVmdCAtPSAobmV3V2lkdGggLSB3aWR0aCkgLyAyO1xuICAgICAgICBjYW52YXNEYXRhLnRvcCAtPSAobmV3SGVpZ2h0IC0gaGVpZ2h0KSAvIDI7XG4gICAgICB9XG5cbiAgICAgIGNhbnZhc0RhdGEud2lkdGggPSBuZXdXaWR0aDtcbiAgICAgIGNhbnZhc0RhdGEuaGVpZ2h0ID0gbmV3SGVpZ2h0O1xuICAgICAgdGhpcy5yZW5kZXJDYW52YXModHJ1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJvdGF0ZSB0aGUgY2FudmFzIHdpdGggYSByZWxhdGl2ZSBkZWdyZWVcbiAgICogQHBhcmFtIHtudW1iZXJ9IGRlZ3JlZSAtIFRoZSByb3RhdGUgZGVncmVlLlxuICAgKiBAcmV0dXJucyB7Q3JvcHBlcn0gdGhpc1xuICAgKi9cbiAgcm90YXRlKGRlZ3JlZSkge1xuICAgIHJldHVybiB0aGlzLnJvdGF0ZVRvKCh0aGlzLmltYWdlRGF0YS5yb3RhdGUgfHwgMCkgKyBOdW1iZXIoZGVncmVlKSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJvdGF0ZSB0aGUgY2FudmFzIHRvIGFuIGFic29sdXRlIGRlZ3JlZVxuICAgKiBAcGFyYW0ge251bWJlcn0gZGVncmVlIC0gVGhlIHJvdGF0ZSBkZWdyZWUuXG4gICAqIEByZXR1cm5zIHtDcm9wcGVyfSB0aGlzXG4gICAqL1xuICByb3RhdGVUbyhkZWdyZWUpIHtcbiAgICBkZWdyZWUgPSBOdW1iZXIoZGVncmVlKTtcblxuICAgIGlmIChpc051bWJlcihkZWdyZWUpICYmIHRoaXMucmVhZHkgJiYgIXRoaXMuZGlzYWJsZWQgJiYgdGhpcy5vcHRpb25zLnJvdGF0YWJsZSkge1xuICAgICAgdGhpcy5pbWFnZURhdGEucm90YXRlID0gZGVncmVlICUgMzYwO1xuICAgICAgdGhpcy5yZW5kZXJDYW52YXModHJ1ZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFNjYWxlIHRoZSBpbWFnZSBvbiB0aGUgeC1heGlzLlxuICAgKiBAcGFyYW0ge251bWJlcn0gc2NhbGVYIC0gVGhlIHNjYWxlIHJhdGlvIG9uIHRoZSB4LWF4aXMuXG4gICAqIEByZXR1cm5zIHtDcm9wcGVyfSB0aGlzXG4gICAqL1xuICBzY2FsZVgoc2NhbGVYKSB7XG4gICAgY29uc3QgeyBzY2FsZVkgfSA9IHRoaXMuaW1hZ2VEYXRhO1xuXG4gICAgcmV0dXJuIHRoaXMuc2NhbGUoc2NhbGVYLCBpc051bWJlcihzY2FsZVkpID8gc2NhbGVZIDogMSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFNjYWxlIHRoZSBpbWFnZSBvbiB0aGUgeS1heGlzLlxuICAgKiBAcGFyYW0ge251bWJlcn0gc2NhbGVZIC0gVGhlIHNjYWxlIHJhdGlvIG9uIHRoZSB5LWF4aXMuXG4gICAqIEByZXR1cm5zIHtDcm9wcGVyfSB0aGlzXG4gICAqL1xuICBzY2FsZVkoc2NhbGVZKSB7XG4gICAgY29uc3QgeyBzY2FsZVggfSA9IHRoaXMuaW1hZ2VEYXRhO1xuXG4gICAgcmV0dXJuIHRoaXMuc2NhbGUoaXNOdW1iZXIoc2NhbGVYKSA/IHNjYWxlWCA6IDEsIHNjYWxlWSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFNjYWxlIHRoZSBpbWFnZVxuICAgKiBAcGFyYW0ge251bWJlcn0gc2NhbGVYIC0gVGhlIHNjYWxlIHJhdGlvIG9uIHRoZSB4LWF4aXMuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbc2NhbGVZPXNjYWxlWF0gLSBUaGUgc2NhbGUgcmF0aW8gb24gdGhlIHktYXhpcy5cbiAgICogQHJldHVybnMge0Nyb3BwZXJ9IHRoaXNcbiAgICovXG4gIHNjYWxlKHNjYWxlWCwgc2NhbGVZID0gc2NhbGVYKSB7XG4gICAgY29uc3QgeyBpbWFnZURhdGEgfSA9IHRoaXM7XG4gICAgbGV0IHRyYW5zZm9ybWVkID0gZmFsc2U7XG5cbiAgICBzY2FsZVggPSBOdW1iZXIoc2NhbGVYKTtcbiAgICBzY2FsZVkgPSBOdW1iZXIoc2NhbGVZKTtcblxuICAgIGlmICh0aGlzLnJlYWR5ICYmICF0aGlzLmRpc2FibGVkICYmIHRoaXMub3B0aW9ucy5zY2FsYWJsZSkge1xuICAgICAgaWYgKGlzTnVtYmVyKHNjYWxlWCkpIHtcbiAgICAgICAgaW1hZ2VEYXRhLnNjYWxlWCA9IHNjYWxlWDtcbiAgICAgICAgdHJhbnNmb3JtZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNOdW1iZXIoc2NhbGVZKSkge1xuICAgICAgICBpbWFnZURhdGEuc2NhbGVZID0gc2NhbGVZO1xuICAgICAgICB0cmFuc2Zvcm1lZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0cmFuc2Zvcm1lZCkge1xuICAgICAgICB0aGlzLnJlbmRlckNhbnZhcyh0cnVlLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICAvKipcbiAgICogR2V0IHRoZSBjcm9wcGVkIGFyZWEgcG9zaXRpb24gYW5kIHNpemUgZGF0YSAoYmFzZSBvbiB0aGUgb3JpZ2luYWwgaW1hZ2UpXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3JvdW5kZWQ9ZmFsc2VdIC0gSW5kaWNhdGUgaWYgcm91bmQgdGhlIGRhdGEgdmFsdWVzIG9yIG5vdC5cbiAgICogQHJldHVybnMge09iamVjdH0gVGhlIHJlc3VsdCBjcm9wcGVkIGRhdGEuXG4gICAqL1xuICBnZXREYXRhKHJvdW5kZWQgPSBmYWxzZSkge1xuICAgIGNvbnN0IHtcbiAgICAgIG9wdGlvbnMsXG4gICAgICBpbWFnZURhdGEsXG4gICAgICBjYW52YXNEYXRhLFxuICAgICAgY3JvcEJveERhdGEsXG4gICAgfSA9IHRoaXM7XG4gICAgbGV0IGRhdGE7XG5cbiAgICBpZiAodGhpcy5yZWFkeSAmJiB0aGlzLmNyb3BwZWQpIHtcbiAgICAgIGRhdGEgPSB7XG4gICAgICAgIHg6IGNyb3BCb3hEYXRhLmxlZnQgLSBjYW52YXNEYXRhLmxlZnQsXG4gICAgICAgIHk6IGNyb3BCb3hEYXRhLnRvcCAtIGNhbnZhc0RhdGEudG9wLFxuICAgICAgICB3aWR0aDogY3JvcEJveERhdGEud2lkdGgsXG4gICAgICAgIGhlaWdodDogY3JvcEJveERhdGEuaGVpZ2h0LFxuICAgICAgfTtcblxuICAgICAgY29uc3QgcmF0aW8gPSBpbWFnZURhdGEud2lkdGggLyBpbWFnZURhdGEubmF0dXJhbFdpZHRoO1xuXG4gICAgICBmb3JFYWNoKGRhdGEsIChuLCBpKSA9PiB7XG4gICAgICAgIGRhdGFbaV0gPSBuIC8gcmF0aW87XG4gICAgICB9KTtcblxuICAgICAgaWYgKHJvdW5kZWQpIHtcbiAgICAgICAgLy8gSW4gY2FzZSByb3VuZGluZyBvZmYgbGVhZHMgdG8gZXh0cmEgMXB4IGluIHJpZ2h0IG9yIGJvdHRvbSBib3JkZXJcbiAgICAgICAgLy8gd2Ugc2hvdWxkIHJvdW5kIHRoZSB0b3AtbGVmdCBjb3JuZXIgYW5kIHRoZSBkaW1lbnNpb24gKCMzNDMpLlxuICAgICAgICBjb25zdCBib3R0b20gPSBNYXRoLnJvdW5kKGRhdGEueSArIGRhdGEuaGVpZ2h0KTtcbiAgICAgICAgY29uc3QgcmlnaHQgPSBNYXRoLnJvdW5kKGRhdGEueCArIGRhdGEud2lkdGgpO1xuXG4gICAgICAgIGRhdGEueCA9IE1hdGgucm91bmQoZGF0YS54KTtcbiAgICAgICAgZGF0YS55ID0gTWF0aC5yb3VuZChkYXRhLnkpO1xuICAgICAgICBkYXRhLndpZHRoID0gcmlnaHQgLSBkYXRhLng7XG4gICAgICAgIGRhdGEuaGVpZ2h0ID0gYm90dG9tIC0gZGF0YS55O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBkYXRhID0ge1xuICAgICAgICB4OiAwLFxuICAgICAgICB5OiAwLFxuICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgaGVpZ2h0OiAwLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5yb3RhdGFibGUpIHtcbiAgICAgIGRhdGEucm90YXRlID0gaW1hZ2VEYXRhLnJvdGF0ZSB8fCAwO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnNjYWxhYmxlKSB7XG4gICAgICBkYXRhLnNjYWxlWCA9IGltYWdlRGF0YS5zY2FsZVggfHwgMTtcbiAgICAgIGRhdGEuc2NhbGVZID0gaW1hZ2VEYXRhLnNjYWxlWSB8fCAxO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9LFxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGNyb3BwZWQgYXJlYSBwb3NpdGlvbiBhbmQgc2l6ZSB3aXRoIG5ldyBkYXRhXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gVGhlIG5ldyBkYXRhLlxuICAgKiBAcmV0dXJucyB7Q3JvcHBlcn0gdGhpc1xuICAgKi9cbiAgc2V0RGF0YShkYXRhKSB7XG4gICAgY29uc3QgeyBvcHRpb25zLCBpbWFnZURhdGEsIGNhbnZhc0RhdGEgfSA9IHRoaXM7XG4gICAgY29uc3QgY3JvcEJveERhdGEgPSB7fTtcblxuICAgIGlmICh0aGlzLnJlYWR5ICYmICF0aGlzLmRpc2FibGVkICYmIGlzUGxhaW5PYmplY3QoZGF0YSkpIHtcbiAgICAgIGxldCB0cmFuc2Zvcm1lZCA9IGZhbHNlO1xuXG4gICAgICBpZiAob3B0aW9ucy5yb3RhdGFibGUpIHtcbiAgICAgICAgaWYgKGlzTnVtYmVyKGRhdGEucm90YXRlKSAmJiBkYXRhLnJvdGF0ZSAhPT0gaW1hZ2VEYXRhLnJvdGF0ZSkge1xuICAgICAgICAgIGltYWdlRGF0YS5yb3RhdGUgPSBkYXRhLnJvdGF0ZTtcbiAgICAgICAgICB0cmFuc2Zvcm1lZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMuc2NhbGFibGUpIHtcbiAgICAgICAgaWYgKGlzTnVtYmVyKGRhdGEuc2NhbGVYKSAmJiBkYXRhLnNjYWxlWCAhPT0gaW1hZ2VEYXRhLnNjYWxlWCkge1xuICAgICAgICAgIGltYWdlRGF0YS5zY2FsZVggPSBkYXRhLnNjYWxlWDtcbiAgICAgICAgICB0cmFuc2Zvcm1lZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNOdW1iZXIoZGF0YS5zY2FsZVkpICYmIGRhdGEuc2NhbGVZICE9PSBpbWFnZURhdGEuc2NhbGVZKSB7XG4gICAgICAgICAgaW1hZ2VEYXRhLnNjYWxlWSA9IGRhdGEuc2NhbGVZO1xuICAgICAgICAgIHRyYW5zZm9ybWVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodHJhbnNmb3JtZWQpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJDYW52YXModHJ1ZSwgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJhdGlvID0gaW1hZ2VEYXRhLndpZHRoIC8gaW1hZ2VEYXRhLm5hdHVyYWxXaWR0aDtcblxuICAgICAgaWYgKGlzTnVtYmVyKGRhdGEueCkpIHtcbiAgICAgICAgY3JvcEJveERhdGEubGVmdCA9IChkYXRhLnggKiByYXRpbykgKyBjYW52YXNEYXRhLmxlZnQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc051bWJlcihkYXRhLnkpKSB7XG4gICAgICAgIGNyb3BCb3hEYXRhLnRvcCA9IChkYXRhLnkgKiByYXRpbykgKyBjYW52YXNEYXRhLnRvcDtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzTnVtYmVyKGRhdGEud2lkdGgpKSB7XG4gICAgICAgIGNyb3BCb3hEYXRhLndpZHRoID0gZGF0YS53aWR0aCAqIHJhdGlvO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNOdW1iZXIoZGF0YS5oZWlnaHQpKSB7XG4gICAgICAgIGNyb3BCb3hEYXRhLmhlaWdodCA9IGRhdGEuaGVpZ2h0ICogcmF0aW87XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2V0Q3JvcEJveERhdGEoY3JvcEJveERhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGNvbnRhaW5lciBzaXplIGRhdGEuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSByZXN1bHQgY29udGFpbmVyIGRhdGEuXG4gICAqL1xuICBnZXRDb250YWluZXJEYXRhKCkge1xuICAgIHJldHVybiB0aGlzLnJlYWR5ID8gYXNzaWduKHt9LCB0aGlzLmNvbnRhaW5lckRhdGEpIDoge307XG4gIH0sXG5cbiAgLyoqXG4gICAqIEdldCB0aGUgaW1hZ2UgcG9zaXRpb24gYW5kIHNpemUgZGF0YS5cbiAgICogQHJldHVybnMge09iamVjdH0gVGhlIHJlc3VsdCBpbWFnZSBkYXRhLlxuICAgKi9cbiAgZ2V0SW1hZ2VEYXRhKCkge1xuICAgIHJldHVybiB0aGlzLnNpemVkID8gYXNzaWduKHt9LCB0aGlzLmltYWdlRGF0YSkgOiB7fTtcbiAgfSxcblxuICAvKipcbiAgICogR2V0IHRoZSBjYW52YXMgcG9zaXRpb24gYW5kIHNpemUgZGF0YS5cbiAgICogQHJldHVybnMge09iamVjdH0gVGhlIHJlc3VsdCBjYW52YXMgZGF0YS5cbiAgICovXG4gIGdldENhbnZhc0RhdGEoKSB7XG4gICAgY29uc3QgeyBjYW52YXNEYXRhIH0gPSB0aGlzO1xuICAgIGNvbnN0IGRhdGEgPSB7fTtcblxuICAgIGlmICh0aGlzLnJlYWR5KSB7XG4gICAgICBmb3JFYWNoKFtcbiAgICAgICAgJ2xlZnQnLFxuICAgICAgICAndG9wJyxcbiAgICAgICAgJ3dpZHRoJyxcbiAgICAgICAgJ2hlaWdodCcsXG4gICAgICAgICduYXR1cmFsV2lkdGgnLFxuICAgICAgICAnbmF0dXJhbEhlaWdodCcsXG4gICAgICBdLCAobikgPT4ge1xuICAgICAgICBkYXRhW25dID0gY2FudmFzRGF0YVtuXTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9LFxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGNhbnZhcyBwb3NpdGlvbiBhbmQgc2l6ZSB3aXRoIG5ldyBkYXRhLlxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIFRoZSBuZXcgY2FudmFzIGRhdGEuXG4gICAqIEByZXR1cm5zIHtDcm9wcGVyfSB0aGlzXG4gICAqL1xuICBzZXRDYW52YXNEYXRhKGRhdGEpIHtcbiAgICBjb25zdCB7IGNhbnZhc0RhdGEgfSA9IHRoaXM7XG4gICAgY29uc3QgeyBhc3BlY3RSYXRpbyB9ID0gY2FudmFzRGF0YTtcblxuICAgIGlmICh0aGlzLnJlYWR5ICYmICF0aGlzLmRpc2FibGVkICYmIGlzUGxhaW5PYmplY3QoZGF0YSkpIHtcbiAgICAgIGlmIChpc051bWJlcihkYXRhLmxlZnQpKSB7XG4gICAgICAgIGNhbnZhc0RhdGEubGVmdCA9IGRhdGEubGVmdDtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzTnVtYmVyKGRhdGEudG9wKSkge1xuICAgICAgICBjYW52YXNEYXRhLnRvcCA9IGRhdGEudG9wO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNOdW1iZXIoZGF0YS53aWR0aCkpIHtcbiAgICAgICAgY2FudmFzRGF0YS53aWR0aCA9IGRhdGEud2lkdGg7XG4gICAgICAgIGNhbnZhc0RhdGEuaGVpZ2h0ID0gZGF0YS53aWR0aCAvIGFzcGVjdFJhdGlvO1xuICAgICAgfSBlbHNlIGlmIChpc051bWJlcihkYXRhLmhlaWdodCkpIHtcbiAgICAgICAgY2FudmFzRGF0YS5oZWlnaHQgPSBkYXRhLmhlaWdodDtcbiAgICAgICAgY2FudmFzRGF0YS53aWR0aCA9IGRhdGEuaGVpZ2h0ICogYXNwZWN0UmF0aW87XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVuZGVyQ2FudmFzKHRydWUpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGNyb3AgYm94IHBvc2l0aW9uIGFuZCBzaXplIGRhdGEuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSByZXN1bHQgY3JvcCBib3ggZGF0YS5cbiAgICovXG4gIGdldENyb3BCb3hEYXRhKCkge1xuICAgIGNvbnN0IHsgY3JvcEJveERhdGEgfSA9IHRoaXM7XG4gICAgbGV0IGRhdGE7XG5cbiAgICBpZiAodGhpcy5yZWFkeSAmJiB0aGlzLmNyb3BwZWQpIHtcbiAgICAgIGRhdGEgPSB7XG4gICAgICAgIGxlZnQ6IGNyb3BCb3hEYXRhLmxlZnQsXG4gICAgICAgIHRvcDogY3JvcEJveERhdGEudG9wLFxuICAgICAgICB3aWR0aDogY3JvcEJveERhdGEud2lkdGgsXG4gICAgICAgIGhlaWdodDogY3JvcEJveERhdGEuaGVpZ2h0LFxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YSB8fCB7fTtcbiAgfSxcblxuICAvKipcbiAgICogU2V0IHRoZSBjcm9wIGJveCBwb3NpdGlvbiBhbmQgc2l6ZSB3aXRoIG5ldyBkYXRhLlxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIFRoZSBuZXcgY3JvcCBib3ggZGF0YS5cbiAgICogQHJldHVybnMge0Nyb3BwZXJ9IHRoaXNcbiAgICovXG4gIHNldENyb3BCb3hEYXRhKGRhdGEpIHtcbiAgICBjb25zdCB7IGNyb3BCb3hEYXRhIH0gPSB0aGlzO1xuICAgIGNvbnN0IHsgYXNwZWN0UmF0aW8gfSA9IHRoaXMub3B0aW9ucztcbiAgICBsZXQgd2lkdGhDaGFuZ2VkO1xuICAgIGxldCBoZWlnaHRDaGFuZ2VkO1xuXG4gICAgaWYgKHRoaXMucmVhZHkgJiYgdGhpcy5jcm9wcGVkICYmICF0aGlzLmRpc2FibGVkICYmIGlzUGxhaW5PYmplY3QoZGF0YSkpIHtcbiAgICAgIGlmIChpc051bWJlcihkYXRhLmxlZnQpKSB7XG4gICAgICAgIGNyb3BCb3hEYXRhLmxlZnQgPSBkYXRhLmxlZnQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc051bWJlcihkYXRhLnRvcCkpIHtcbiAgICAgICAgY3JvcEJveERhdGEudG9wID0gZGF0YS50b3A7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc051bWJlcihkYXRhLndpZHRoKSAmJiBkYXRhLndpZHRoICE9PSBjcm9wQm94RGF0YS53aWR0aCkge1xuICAgICAgICB3aWR0aENoYW5nZWQgPSB0cnVlO1xuICAgICAgICBjcm9wQm94RGF0YS53aWR0aCA9IGRhdGEud2lkdGg7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc051bWJlcihkYXRhLmhlaWdodCkgJiYgZGF0YS5oZWlnaHQgIT09IGNyb3BCb3hEYXRhLmhlaWdodCkge1xuICAgICAgICBoZWlnaHRDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgY3JvcEJveERhdGEuaGVpZ2h0ID0gZGF0YS5oZWlnaHQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChhc3BlY3RSYXRpbykge1xuICAgICAgICBpZiAod2lkdGhDaGFuZ2VkKSB7XG4gICAgICAgICAgY3JvcEJveERhdGEuaGVpZ2h0ID0gY3JvcEJveERhdGEud2lkdGggLyBhc3BlY3RSYXRpbztcbiAgICAgICAgfSBlbHNlIGlmIChoZWlnaHRDaGFuZ2VkKSB7XG4gICAgICAgICAgY3JvcEJveERhdGEud2lkdGggPSBjcm9wQm94RGF0YS5oZWlnaHQgKiBhc3BlY3RSYXRpbztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLnJlbmRlckNyb3BCb3goKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICAvKipcbiAgICogR2V0IGEgY2FudmFzIGRyYXduIHRoZSBjcm9wcGVkIGltYWdlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIC0gVGhlIGNvbmZpZyBvcHRpb25zLlxuICAgKiBAcmV0dXJucyB7SFRNTENhbnZhc0VsZW1lbnR9IC0gVGhlIHJlc3VsdCBjYW52YXMuXG4gICAqL1xuICBnZXRDcm9wcGVkQ2FudmFzKG9wdGlvbnMgPSB7fSkge1xuICAgIGlmICghdGhpcy5yZWFkeSB8fCAhd2luZG93LkhUTUxDYW52YXNFbGVtZW50KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCB7IGNhbnZhc0RhdGEgfSA9IHRoaXM7XG4gICAgY29uc3Qgc291cmNlID0gZ2V0U291cmNlQ2FudmFzKHRoaXMuaW1hZ2UsIHRoaXMuaW1hZ2VEYXRhLCBjYW52YXNEYXRhLCBvcHRpb25zKTtcblxuICAgIC8vIFJldHVybnMgdGhlIHNvdXJjZSBjYW52YXMgaWYgaXQgaXMgbm90IGNyb3BwZWQuXG4gICAgaWYgKCF0aGlzLmNyb3BwZWQpIHtcbiAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgfVxuXG4gICAgbGV0IHtcbiAgICAgIHg6IGluaXRpYWxYLFxuICAgICAgeTogaW5pdGlhbFksXG4gICAgICB3aWR0aDogaW5pdGlhbFdpZHRoLFxuICAgICAgaGVpZ2h0OiBpbml0aWFsSGVpZ2h0LFxuICAgIH0gPSB0aGlzLmdldERhdGEoKTtcbiAgICBjb25zdCByYXRpbyA9IHNvdXJjZS53aWR0aCAvIE1hdGguZmxvb3IoY2FudmFzRGF0YS5uYXR1cmFsV2lkdGgpO1xuXG4gICAgaWYgKHJhdGlvICE9PSAxKSB7XG4gICAgICBpbml0aWFsWCAqPSByYXRpbztcbiAgICAgIGluaXRpYWxZICo9IHJhdGlvO1xuICAgICAgaW5pdGlhbFdpZHRoICo9IHJhdGlvO1xuICAgICAgaW5pdGlhbEhlaWdodCAqPSByYXRpbztcbiAgICB9XG5cbiAgICBjb25zdCBhc3BlY3RSYXRpbyA9IGluaXRpYWxXaWR0aCAvIGluaXRpYWxIZWlnaHQ7XG4gICAgY29uc3QgbWF4U2l6ZXMgPSBnZXRBZGp1c3RlZFNpemVzKHtcbiAgICAgIGFzcGVjdFJhdGlvLFxuICAgICAgd2lkdGg6IG9wdGlvbnMubWF4V2lkdGggfHwgSW5maW5pdHksXG4gICAgICBoZWlnaHQ6IG9wdGlvbnMubWF4SGVpZ2h0IHx8IEluZmluaXR5LFxuICAgIH0pO1xuICAgIGNvbnN0IG1pblNpemVzID0gZ2V0QWRqdXN0ZWRTaXplcyh7XG4gICAgICBhc3BlY3RSYXRpbyxcbiAgICAgIHdpZHRoOiBvcHRpb25zLm1pbldpZHRoIHx8IDAsXG4gICAgICBoZWlnaHQ6IG9wdGlvbnMubWluSGVpZ2h0IHx8IDAsXG4gICAgfSwgJ2NvdmVyJyk7XG4gICAgbGV0IHtcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgIH0gPSBnZXRBZGp1c3RlZFNpemVzKHtcbiAgICAgIGFzcGVjdFJhdGlvLFxuICAgICAgd2lkdGg6IG9wdGlvbnMud2lkdGggfHwgKHJhdGlvICE9PSAxID8gc291cmNlLndpZHRoIDogaW5pdGlhbFdpZHRoKSxcbiAgICAgIGhlaWdodDogb3B0aW9ucy5oZWlnaHQgfHwgKHJhdGlvICE9PSAxID8gc291cmNlLmhlaWdodCA6IGluaXRpYWxIZWlnaHQpLFxuICAgIH0pO1xuXG4gICAgd2lkdGggPSBNYXRoLm1pbihtYXhTaXplcy53aWR0aCwgTWF0aC5tYXgobWluU2l6ZXMud2lkdGgsIHdpZHRoKSk7XG4gICAgaGVpZ2h0ID0gTWF0aC5taW4obWF4U2l6ZXMuaGVpZ2h0LCBNYXRoLm1heChtaW5TaXplcy5oZWlnaHQsIGhlaWdodCkpO1xuXG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgY2FudmFzLndpZHRoID0gbm9ybWFsaXplRGVjaW1hbE51bWJlcih3aWR0aCk7XG4gICAgY2FudmFzLmhlaWdodCA9IG5vcm1hbGl6ZURlY2ltYWxOdW1iZXIoaGVpZ2h0KTtcblxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gb3B0aW9ucy5maWxsQ29sb3IgfHwgJ3RyYW5zcGFyZW50JztcbiAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgY29uc3QgeyBpbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0cnVlLCBpbWFnZVNtb290aGluZ1F1YWxpdHkgfSA9IG9wdGlvbnM7XG5cbiAgICBjb250ZXh0LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGltYWdlU21vb3RoaW5nRW5hYmxlZDtcblxuICAgIGlmIChpbWFnZVNtb290aGluZ1F1YWxpdHkpIHtcbiAgICAgIGNvbnRleHQuaW1hZ2VTbW9vdGhpbmdRdWFsaXR5ID0gaW1hZ2VTbW9vdGhpbmdRdWFsaXR5O1xuICAgIH1cblxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DYW52YXNSZW5kZXJpbmdDb250ZXh0MkQuZHJhd0ltYWdlXG4gICAgY29uc3Qgc291cmNlV2lkdGggPSBzb3VyY2Uud2lkdGg7XG4gICAgY29uc3Qgc291cmNlSGVpZ2h0ID0gc291cmNlLmhlaWdodDtcblxuICAgIC8vIFNvdXJjZSBjYW52YXMgcGFyYW1ldGVyc1xuICAgIGxldCBzcmNYID0gaW5pdGlhbFg7XG4gICAgbGV0IHNyY1kgPSBpbml0aWFsWTtcbiAgICBsZXQgc3JjV2lkdGg7XG4gICAgbGV0IHNyY0hlaWdodDtcblxuICAgIC8vIERlc3RpbmF0aW9uIGNhbnZhcyBwYXJhbWV0ZXJzXG4gICAgbGV0IGRzdFg7XG4gICAgbGV0IGRzdFk7XG4gICAgbGV0IGRzdFdpZHRoO1xuICAgIGxldCBkc3RIZWlnaHQ7XG5cbiAgICBpZiAoc3JjWCA8PSAtaW5pdGlhbFdpZHRoIHx8IHNyY1ggPiBzb3VyY2VXaWR0aCkge1xuICAgICAgc3JjWCA9IDA7XG4gICAgICBzcmNXaWR0aCA9IDA7XG4gICAgICBkc3RYID0gMDtcbiAgICAgIGRzdFdpZHRoID0gMDtcbiAgICB9IGVsc2UgaWYgKHNyY1ggPD0gMCkge1xuICAgICAgZHN0WCA9IC1zcmNYO1xuICAgICAgc3JjWCA9IDA7XG4gICAgICBzcmNXaWR0aCA9IE1hdGgubWluKHNvdXJjZVdpZHRoLCBpbml0aWFsV2lkdGggKyBzcmNYKTtcbiAgICAgIGRzdFdpZHRoID0gc3JjV2lkdGg7XG4gICAgfSBlbHNlIGlmIChzcmNYIDw9IHNvdXJjZVdpZHRoKSB7XG4gICAgICBkc3RYID0gMDtcbiAgICAgIHNyY1dpZHRoID0gTWF0aC5taW4oaW5pdGlhbFdpZHRoLCBzb3VyY2VXaWR0aCAtIHNyY1gpO1xuICAgICAgZHN0V2lkdGggPSBzcmNXaWR0aDtcbiAgICB9XG5cbiAgICBpZiAoc3JjV2lkdGggPD0gMCB8fCBzcmNZIDw9IC1pbml0aWFsSGVpZ2h0IHx8IHNyY1kgPiBzb3VyY2VIZWlnaHQpIHtcbiAgICAgIHNyY1kgPSAwO1xuICAgICAgc3JjSGVpZ2h0ID0gMDtcbiAgICAgIGRzdFkgPSAwO1xuICAgICAgZHN0SGVpZ2h0ID0gMDtcbiAgICB9IGVsc2UgaWYgKHNyY1kgPD0gMCkge1xuICAgICAgZHN0WSA9IC1zcmNZO1xuICAgICAgc3JjWSA9IDA7XG4gICAgICBzcmNIZWlnaHQgPSBNYXRoLm1pbihzb3VyY2VIZWlnaHQsIGluaXRpYWxIZWlnaHQgKyBzcmNZKTtcbiAgICAgIGRzdEhlaWdodCA9IHNyY0hlaWdodDtcbiAgICB9IGVsc2UgaWYgKHNyY1kgPD0gc291cmNlSGVpZ2h0KSB7XG4gICAgICBkc3RZID0gMDtcbiAgICAgIHNyY0hlaWdodCA9IE1hdGgubWluKGluaXRpYWxIZWlnaHQsIHNvdXJjZUhlaWdodCAtIHNyY1kpO1xuICAgICAgZHN0SGVpZ2h0ID0gc3JjSGVpZ2h0O1xuICAgIH1cblxuICAgIGNvbnN0IHBhcmFtcyA9IFtcbiAgICAgIHNyY1gsXG4gICAgICBzcmNZLFxuICAgICAgc3JjV2lkdGgsXG4gICAgICBzcmNIZWlnaHQsXG4gICAgXTtcblxuICAgIC8vIEF2b2lkIFwiSW5kZXhTaXplRXJyb3JcIlxuICAgIGlmIChkc3RXaWR0aCA+IDAgJiYgZHN0SGVpZ2h0ID4gMCkge1xuICAgICAgY29uc3Qgc2NhbGUgPSB3aWR0aCAvIGluaXRpYWxXaWR0aDtcblxuICAgICAgcGFyYW1zLnB1c2goXG4gICAgICAgIGRzdFggKiBzY2FsZSxcbiAgICAgICAgZHN0WSAqIHNjYWxlLFxuICAgICAgICBkc3RXaWR0aCAqIHNjYWxlLFxuICAgICAgICBkc3RIZWlnaHQgKiBzY2FsZSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gQWxsIHRoZSBudW1lcmljYWwgcGFyYW1ldGVycyBzaG91bGQgYmUgaW50ZWdlciBmb3IgYGRyYXdJbWFnZWBcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vZmVuZ3l1YW5jaGVuL2Nyb3BwZXIvaXNzdWVzLzQ3NlxuICAgIGNvbnRleHQuZHJhd0ltYWdlKHNvdXJjZSwgLi4ucGFyYW1zLm1hcChwYXJhbSA9PiBNYXRoLmZsb29yKG5vcm1hbGl6ZURlY2ltYWxOdW1iZXIocGFyYW0pKSkpO1xuXG4gICAgcmV0dXJuIGNhbnZhcztcbiAgfSxcblxuICAvKipcbiAgICogQ2hhbmdlIHRoZSBhc3BlY3QgcmF0aW8gb2YgdGhlIGNyb3AgYm94LlxuICAgKiBAcGFyYW0ge251bWJlcn0gYXNwZWN0UmF0aW8gLSBUaGUgbmV3IGFzcGVjdCByYXRpby5cbiAgICogQHJldHVybnMge0Nyb3BwZXJ9IHRoaXNcbiAgICovXG4gIHNldEFzcGVjdFJhdGlvKGFzcGVjdFJhdGlvKSB7XG4gICAgY29uc3QgeyBvcHRpb25zIH0gPSB0aGlzO1xuXG4gICAgaWYgKCF0aGlzLmRpc2FibGVkICYmICFpc1VuZGVmaW5lZChhc3BlY3RSYXRpbykpIHtcbiAgICAgIC8vIDAgLT4gTmFOXG4gICAgICBvcHRpb25zLmFzcGVjdFJhdGlvID0gTWF0aC5tYXgoMCwgYXNwZWN0UmF0aW8pIHx8IE5hTjtcblxuICAgICAgaWYgKHRoaXMucmVhZHkpIHtcbiAgICAgICAgdGhpcy5pbml0Q3JvcEJveCgpO1xuXG4gICAgICAgIGlmICh0aGlzLmNyb3BwZWQpIHtcbiAgICAgICAgICB0aGlzLnJlbmRlckNyb3BCb3goKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIC8qKlxuICAgKiBDaGFuZ2UgdGhlIGRyYWcgbW9kZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG1vZGUgLSBUaGUgbmV3IGRyYWcgbW9kZS5cbiAgICogQHJldHVybnMge0Nyb3BwZXJ9IHRoaXNcbiAgICovXG4gIHNldERyYWdNb2RlKG1vZGUpIHtcbiAgICBjb25zdCB7IG9wdGlvbnMsIGRyYWdCb3gsIGZhY2UgfSA9IHRoaXM7XG5cbiAgICBpZiAodGhpcy5yZWFkeSAmJiAhdGhpcy5kaXNhYmxlZCkge1xuICAgICAgY29uc3QgY3JvcHBhYmxlID0gbW9kZSA9PT0gRFJBR19NT0RFX0NST1A7XG4gICAgICBjb25zdCBtb3ZhYmxlID0gb3B0aW9ucy5tb3ZhYmxlICYmIG1vZGUgPT09IERSQUdfTU9ERV9NT1ZFO1xuXG4gICAgICBtb2RlID0gKGNyb3BwYWJsZSB8fCBtb3ZhYmxlKSA/IG1vZGUgOiBEUkFHX01PREVfTk9ORTtcblxuICAgICAgb3B0aW9ucy5kcmFnTW9kZSA9IG1vZGU7XG4gICAgICBzZXREYXRhKGRyYWdCb3gsIERBVEFfQUNUSU9OLCBtb2RlKTtcbiAgICAgIHRvZ2dsZUNsYXNzKGRyYWdCb3gsIENMQVNTX0NST1AsIGNyb3BwYWJsZSk7XG4gICAgICB0b2dnbGVDbGFzcyhkcmFnQm94LCBDTEFTU19NT1ZFLCBtb3ZhYmxlKTtcblxuICAgICAgaWYgKCFvcHRpb25zLmNyb3BCb3hNb3ZhYmxlKSB7XG4gICAgICAgIC8vIFN5bmMgZHJhZyBtb2RlIHRvIGNyb3AgYm94IHdoZW4gaXQgaXMgbm90IG1vdmFibGVcbiAgICAgICAgc2V0RGF0YShmYWNlLCBEQVRBX0FDVElPTiwgbW9kZSk7XG4gICAgICAgIHRvZ2dsZUNsYXNzKGZhY2UsIENMQVNTX0NST1AsIGNyb3BwYWJsZSk7XG4gICAgICAgIHRvZ2dsZUNsYXNzKGZhY2UsIENMQVNTX01PVkUsIG1vdmFibGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxufTtcbiIsImltcG9ydCB7IERBVEFfUFJFVklFVyB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7XG4gIGFzc2lnbixcbiAgZm9yRWFjaCxcbiAgZ2V0RGF0YSxcbiAgZ2V0VHJhbnNmb3JtcyxcbiAgcmVtb3ZlRGF0YSxcbiAgc2V0RGF0YSxcbiAgc2V0U3R5bGUsXG59IGZyb20gJy4vdXRpbGl0aWVzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0UHJldmlldygpIHtcbiAgICBjb25zdCB7IGNyb3NzT3JpZ2luIH0gPSB0aGlzO1xuICAgIGNvbnN0IHsgcHJldmlldyB9ID0gdGhpcy5vcHRpb25zO1xuICAgIGNvbnN0IHVybCA9IGNyb3NzT3JpZ2luID8gdGhpcy5jcm9zc09yaWdpblVybCA6IHRoaXMudXJsO1xuICAgIGNvbnN0IGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cbiAgICBpZiAoY3Jvc3NPcmlnaW4pIHtcbiAgICAgIGltYWdlLmNyb3NzT3JpZ2luID0gY3Jvc3NPcmlnaW47XG4gICAgfVxuXG4gICAgaW1hZ2Uuc3JjID0gdXJsO1xuICAgIHRoaXMudmlld0JveC5hcHBlbmRDaGlsZChpbWFnZSk7XG4gICAgdGhpcy52aWV3Qm94SW1hZ2UgPSBpbWFnZTtcblxuICAgIGlmICghcHJldmlldykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBwcmV2aWV3cyA9IHByZXZpZXc7XG5cbiAgICBpZiAodHlwZW9mIHByZXZpZXcgPT09ICdzdHJpbmcnKSB7XG4gICAgICBwcmV2aWV3cyA9IHRoaXMuZWxlbWVudC5vd25lckRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocHJldmlldyk7XG4gICAgfSBlbHNlIGlmIChwcmV2aWV3LnF1ZXJ5U2VsZWN0b3IpIHtcbiAgICAgIHByZXZpZXdzID0gW3ByZXZpZXddO1xuICAgIH1cblxuICAgIHRoaXMucHJldmlld3MgPSBwcmV2aWV3cztcblxuICAgIGZvckVhY2gocHJldmlld3MsIChlbCkgPT4ge1xuICAgICAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cbiAgICAgIC8vIFNhdmUgdGhlIG9yaWdpbmFsIHNpemUgZm9yIHJlY292ZXJcbiAgICAgIHNldERhdGEoZWwsIERBVEFfUFJFVklFVywge1xuICAgICAgICB3aWR0aDogZWwub2Zmc2V0V2lkdGgsXG4gICAgICAgIGhlaWdodDogZWwub2Zmc2V0SGVpZ2h0LFxuICAgICAgICBodG1sOiBlbC5pbm5lckhUTUwsXG4gICAgICB9KTtcblxuICAgICAgaWYgKGNyb3NzT3JpZ2luKSB7XG4gICAgICAgIGltZy5jcm9zc09yaWdpbiA9IGNyb3NzT3JpZ2luO1xuICAgICAgfVxuXG4gICAgICBpbWcuc3JjID0gdXJsO1xuXG4gICAgICAvKipcbiAgICAgICAqIE92ZXJyaWRlIGltZyBlbGVtZW50IHN0eWxlc1xuICAgICAgICogQWRkIGBkaXNwbGF5OmJsb2NrYCB0byBhdm9pZCBtYXJnaW4gdG9wIGlzc3VlXG4gICAgICAgKiBBZGQgYGhlaWdodDphdXRvYCB0byBvdmVycmlkZSBgaGVpZ2h0YCBhdHRyaWJ1dGUgb24gSUU4XG4gICAgICAgKiAoT2NjdXIgb25seSB3aGVuIG1hcmdpbi10b3AgPD0gLWhlaWdodClcbiAgICAgICAqL1xuICAgICAgaW1nLnN0eWxlLmNzc1RleHQgPSAoXG4gICAgICAgICdkaXNwbGF5OmJsb2NrOydcbiAgICAgICAgKyAnd2lkdGg6MTAwJTsnXG4gICAgICAgICsgJ2hlaWdodDphdXRvOydcbiAgICAgICAgKyAnbWluLXdpZHRoOjAhaW1wb3J0YW50OydcbiAgICAgICAgKyAnbWluLWhlaWdodDowIWltcG9ydGFudDsnXG4gICAgICAgICsgJ21heC13aWR0aDpub25lIWltcG9ydGFudDsnXG4gICAgICAgICsgJ21heC1oZWlnaHQ6bm9uZSFpbXBvcnRhbnQ7J1xuICAgICAgICArICdpbWFnZS1vcmllbnRhdGlvbjowZGVnIWltcG9ydGFudDtcIidcbiAgICAgICk7XG5cbiAgICAgIGVsLmlubmVySFRNTCA9ICcnO1xuICAgICAgZWwuYXBwZW5kQ2hpbGQoaW1nKTtcbiAgICB9KTtcbiAgfSxcblxuICByZXNldFByZXZpZXcoKSB7XG4gICAgZm9yRWFjaCh0aGlzLnByZXZpZXdzLCAoZWxlbWVudCkgPT4ge1xuICAgICAgY29uc3QgZGF0YSA9IGdldERhdGEoZWxlbWVudCwgREFUQV9QUkVWSUVXKTtcblxuICAgICAgc2V0U3R5bGUoZWxlbWVudCwge1xuICAgICAgICB3aWR0aDogZGF0YS53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBkYXRhLmhlaWdodCxcbiAgICAgIH0pO1xuXG4gICAgICBlbGVtZW50LmlubmVySFRNTCA9IGRhdGEuaHRtbDtcbiAgICAgIHJlbW92ZURhdGEoZWxlbWVudCwgREFUQV9QUkVWSUVXKTtcbiAgICB9KTtcbiAgfSxcblxuICBwcmV2aWV3KCkge1xuICAgIGNvbnN0IHsgaW1hZ2VEYXRhLCBjYW52YXNEYXRhLCBjcm9wQm94RGF0YSB9ID0gdGhpcztcbiAgICBjb25zdCB7IHdpZHRoOiBjcm9wQm94V2lkdGgsIGhlaWdodDogY3JvcEJveEhlaWdodCB9ID0gY3JvcEJveERhdGE7XG4gICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSBpbWFnZURhdGE7XG4gICAgY29uc3QgbGVmdCA9IGNyb3BCb3hEYXRhLmxlZnQgLSBjYW52YXNEYXRhLmxlZnQgLSBpbWFnZURhdGEubGVmdDtcbiAgICBjb25zdCB0b3AgPSBjcm9wQm94RGF0YS50b3AgLSBjYW52YXNEYXRhLnRvcCAtIGltYWdlRGF0YS50b3A7XG5cbiAgICBpZiAoIXRoaXMuY3JvcHBlZCB8fCB0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0U3R5bGUodGhpcy52aWV3Qm94SW1hZ2UsIGFzc2lnbih7XG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodCxcbiAgICB9LCBnZXRUcmFuc2Zvcm1zKGFzc2lnbih7XG4gICAgICB0cmFuc2xhdGVYOiAtbGVmdCxcbiAgICAgIHRyYW5zbGF0ZVk6IC10b3AsXG4gICAgfSwgaW1hZ2VEYXRhKSkpKTtcblxuICAgIGZvckVhY2godGhpcy5wcmV2aWV3cywgKGVsZW1lbnQpID0+IHtcbiAgICAgIGNvbnN0IGRhdGEgPSBnZXREYXRhKGVsZW1lbnQsIERBVEFfUFJFVklFVyk7XG4gICAgICBjb25zdCBvcmlnaW5hbFdpZHRoID0gZGF0YS53aWR0aDtcbiAgICAgIGNvbnN0IG9yaWdpbmFsSGVpZ2h0ID0gZGF0YS5oZWlnaHQ7XG4gICAgICBsZXQgbmV3V2lkdGggPSBvcmlnaW5hbFdpZHRoO1xuICAgICAgbGV0IG5ld0hlaWdodCA9IG9yaWdpbmFsSGVpZ2h0O1xuICAgICAgbGV0IHJhdGlvID0gMTtcblxuICAgICAgaWYgKGNyb3BCb3hXaWR0aCkge1xuICAgICAgICByYXRpbyA9IG9yaWdpbmFsV2lkdGggLyBjcm9wQm94V2lkdGg7XG4gICAgICAgIG5ld0hlaWdodCA9IGNyb3BCb3hIZWlnaHQgKiByYXRpbztcbiAgICAgIH1cblxuICAgICAgaWYgKGNyb3BCb3hIZWlnaHQgJiYgbmV3SGVpZ2h0ID4gb3JpZ2luYWxIZWlnaHQpIHtcbiAgICAgICAgcmF0aW8gPSBvcmlnaW5hbEhlaWdodCAvIGNyb3BCb3hIZWlnaHQ7XG4gICAgICAgIG5ld1dpZHRoID0gY3JvcEJveFdpZHRoICogcmF0aW87XG4gICAgICAgIG5ld0hlaWdodCA9IG9yaWdpbmFsSGVpZ2h0O1xuICAgICAgfVxuXG4gICAgICBzZXRTdHlsZShlbGVtZW50LCB7XG4gICAgICAgIHdpZHRoOiBuZXdXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBuZXdIZWlnaHQsXG4gICAgICB9KTtcblxuICAgICAgc2V0U3R5bGUoZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJylbMF0sIGFzc2lnbih7XG4gICAgICAgIHdpZHRoOiB3aWR0aCAqIHJhdGlvLFxuICAgICAgICBoZWlnaHQ6IGhlaWdodCAqIHJhdGlvLFxuICAgICAgfSwgZ2V0VHJhbnNmb3Jtcyhhc3NpZ24oe1xuICAgICAgICB0cmFuc2xhdGVYOiAtbGVmdCAqIHJhdGlvLFxuICAgICAgICB0cmFuc2xhdGVZOiAtdG9wICogcmF0aW8sXG4gICAgICB9LCBpbWFnZURhdGEpKSkpO1xuICAgIH0pO1xuICB9LFxufTtcbiIsImltcG9ydCB7XG4gIEFDVElPTl9BTEwsXG4gIEFDVElPTl9NT1ZFLFxuICBDTEFTU19ISURERU4sXG4gIERBVEFfQUNUSU9OLFxuICBFVkVOVF9DUk9QLFxufSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQge1xuICBhZGRDbGFzcyxcbiAgYXNzaWduLFxuICBkaXNwYXRjaEV2ZW50LFxuICBnZXRBZGp1c3RlZFNpemVzLFxuICBnZXRSb3RhdGVkU2l6ZXMsXG4gIGdldFRyYW5zZm9ybXMsXG4gIHJlbW92ZUNsYXNzLFxuICBzZXREYXRhLFxuICBzZXRTdHlsZSxcbn0gZnJvbSAnLi91dGlsaXRpZXMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLmluaXRDb250YWluZXIoKTtcbiAgICB0aGlzLmluaXRDYW52YXMoKTtcbiAgICB0aGlzLmluaXRDcm9wQm94KCk7XG4gICAgdGhpcy5yZW5kZXJDYW52YXMoKTtcblxuICAgIGlmICh0aGlzLmNyb3BwZWQpIHtcbiAgICAgIHRoaXMucmVuZGVyQ3JvcEJveCgpO1xuICAgIH1cbiAgfSxcblxuICBpbml0Q29udGFpbmVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGVsZW1lbnQsXG4gICAgICBvcHRpb25zLFxuICAgICAgY29udGFpbmVyLFxuICAgICAgY3JvcHBlcixcbiAgICB9ID0gdGhpcztcblxuICAgIGFkZENsYXNzKGNyb3BwZXIsIENMQVNTX0hJRERFTik7XG4gICAgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgQ0xBU1NfSElEREVOKTtcblxuICAgIGNvbnN0IGNvbnRhaW5lckRhdGEgPSB7XG4gICAgICB3aWR0aDogTWF0aC5tYXgoXG4gICAgICAgIGNvbnRhaW5lci5vZmZzZXRXaWR0aCxcbiAgICAgICAgTnVtYmVyKG9wdGlvbnMubWluQ29udGFpbmVyV2lkdGgpIHx8IDIwMCxcbiAgICAgICksXG4gICAgICBoZWlnaHQ6IE1hdGgubWF4KFxuICAgICAgICBjb250YWluZXIub2Zmc2V0SGVpZ2h0LFxuICAgICAgICBOdW1iZXIob3B0aW9ucy5taW5Db250YWluZXJIZWlnaHQpIHx8IDEwMCxcbiAgICAgICksXG4gICAgfTtcblxuICAgIHRoaXMuY29udGFpbmVyRGF0YSA9IGNvbnRhaW5lckRhdGE7XG5cbiAgICBzZXRTdHlsZShjcm9wcGVyLCB7XG4gICAgICB3aWR0aDogY29udGFpbmVyRGF0YS53aWR0aCxcbiAgICAgIGhlaWdodDogY29udGFpbmVyRGF0YS5oZWlnaHQsXG4gICAgfSk7XG5cbiAgICBhZGRDbGFzcyhlbGVtZW50LCBDTEFTU19ISURERU4pO1xuICAgIHJlbW92ZUNsYXNzKGNyb3BwZXIsIENMQVNTX0hJRERFTik7XG4gIH0sXG5cbiAgLy8gQ2FudmFzIChpbWFnZSB3cmFwcGVyKVxuICBpbml0Q2FudmFzKCkge1xuICAgIGNvbnN0IHsgY29udGFpbmVyRGF0YSwgaW1hZ2VEYXRhIH0gPSB0aGlzO1xuICAgIGNvbnN0IHsgdmlld01vZGUgfSA9IHRoaXMub3B0aW9ucztcbiAgICBjb25zdCByb3RhdGVkID0gTWF0aC5hYnMoaW1hZ2VEYXRhLnJvdGF0ZSkgJSAxODAgPT09IDkwO1xuICAgIGNvbnN0IG5hdHVyYWxXaWR0aCA9IHJvdGF0ZWQgPyBpbWFnZURhdGEubmF0dXJhbEhlaWdodCA6IGltYWdlRGF0YS5uYXR1cmFsV2lkdGg7XG4gICAgY29uc3QgbmF0dXJhbEhlaWdodCA9IHJvdGF0ZWQgPyBpbWFnZURhdGEubmF0dXJhbFdpZHRoIDogaW1hZ2VEYXRhLm5hdHVyYWxIZWlnaHQ7XG4gICAgY29uc3QgYXNwZWN0UmF0aW8gPSBuYXR1cmFsV2lkdGggLyBuYXR1cmFsSGVpZ2h0O1xuICAgIGxldCBjYW52YXNXaWR0aCA9IGNvbnRhaW5lckRhdGEud2lkdGg7XG4gICAgbGV0IGNhbnZhc0hlaWdodCA9IGNvbnRhaW5lckRhdGEuaGVpZ2h0O1xuXG4gICAgaWYgKGNvbnRhaW5lckRhdGEuaGVpZ2h0ICogYXNwZWN0UmF0aW8gPiBjb250YWluZXJEYXRhLndpZHRoKSB7XG4gICAgICBpZiAodmlld01vZGUgPT09IDMpIHtcbiAgICAgICAgY2FudmFzV2lkdGggPSBjb250YWluZXJEYXRhLmhlaWdodCAqIGFzcGVjdFJhdGlvO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FudmFzSGVpZ2h0ID0gY29udGFpbmVyRGF0YS53aWR0aCAvIGFzcGVjdFJhdGlvO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodmlld01vZGUgPT09IDMpIHtcbiAgICAgIGNhbnZhc0hlaWdodCA9IGNvbnRhaW5lckRhdGEud2lkdGggLyBhc3BlY3RSYXRpbztcbiAgICB9IGVsc2Uge1xuICAgICAgY2FudmFzV2lkdGggPSBjb250YWluZXJEYXRhLmhlaWdodCAqIGFzcGVjdFJhdGlvO1xuICAgIH1cblxuICAgIGNvbnN0IGNhbnZhc0RhdGEgPSB7XG4gICAgICBhc3BlY3RSYXRpbyxcbiAgICAgIG5hdHVyYWxXaWR0aCxcbiAgICAgIG5hdHVyYWxIZWlnaHQsXG4gICAgICB3aWR0aDogY2FudmFzV2lkdGgsXG4gICAgICBoZWlnaHQ6IGNhbnZhc0hlaWdodCxcbiAgICB9O1xuXG4gICAgY2FudmFzRGF0YS5sZWZ0ID0gKGNvbnRhaW5lckRhdGEud2lkdGggLSBjYW52YXNXaWR0aCkgLyAyO1xuICAgIGNhbnZhc0RhdGEudG9wID0gKGNvbnRhaW5lckRhdGEuaGVpZ2h0IC0gY2FudmFzSGVpZ2h0KSAvIDI7XG4gICAgY2FudmFzRGF0YS5vbGRMZWZ0ID0gY2FudmFzRGF0YS5sZWZ0O1xuICAgIGNhbnZhc0RhdGEub2xkVG9wID0gY2FudmFzRGF0YS50b3A7XG5cbiAgICB0aGlzLmNhbnZhc0RhdGEgPSBjYW52YXNEYXRhO1xuICAgIHRoaXMubGltaXRlZCA9ICh2aWV3TW9kZSA9PT0gMSB8fCB2aWV3TW9kZSA9PT0gMik7XG4gICAgdGhpcy5saW1pdENhbnZhcyh0cnVlLCB0cnVlKTtcbiAgICB0aGlzLmluaXRpYWxJbWFnZURhdGEgPSBhc3NpZ24oe30sIGltYWdlRGF0YSk7XG4gICAgdGhpcy5pbml0aWFsQ2FudmFzRGF0YSA9IGFzc2lnbih7fSwgY2FudmFzRGF0YSk7XG4gIH0sXG5cbiAgbGltaXRDYW52YXMoc2l6ZUxpbWl0ZWQsIHBvc2l0aW9uTGltaXRlZCkge1xuICAgIGNvbnN0IHtcbiAgICAgIG9wdGlvbnMsXG4gICAgICBjb250YWluZXJEYXRhLFxuICAgICAgY2FudmFzRGF0YSxcbiAgICAgIGNyb3BCb3hEYXRhLFxuICAgIH0gPSB0aGlzO1xuICAgIGNvbnN0IHsgdmlld01vZGUgfSA9IG9wdGlvbnM7XG4gICAgY29uc3QgeyBhc3BlY3RSYXRpbyB9ID0gY2FudmFzRGF0YTtcbiAgICBjb25zdCBjcm9wcGVkID0gdGhpcy5jcm9wcGVkICYmIGNyb3BCb3hEYXRhO1xuXG4gICAgaWYgKHNpemVMaW1pdGVkKSB7XG4gICAgICBsZXQgbWluQ2FudmFzV2lkdGggPSBOdW1iZXIob3B0aW9ucy5taW5DYW52YXNXaWR0aCkgfHwgMDtcbiAgICAgIGxldCBtaW5DYW52YXNIZWlnaHQgPSBOdW1iZXIob3B0aW9ucy5taW5DYW52YXNIZWlnaHQpIHx8IDA7XG5cbiAgICAgIGlmICh2aWV3TW9kZSA+IDEpIHtcbiAgICAgICAgbWluQ2FudmFzV2lkdGggPSBNYXRoLm1heChtaW5DYW52YXNXaWR0aCwgY29udGFpbmVyRGF0YS53aWR0aCk7XG4gICAgICAgIG1pbkNhbnZhc0hlaWdodCA9IE1hdGgubWF4KG1pbkNhbnZhc0hlaWdodCwgY29udGFpbmVyRGF0YS5oZWlnaHQpO1xuXG4gICAgICAgIGlmICh2aWV3TW9kZSA9PT0gMykge1xuICAgICAgICAgIGlmIChtaW5DYW52YXNIZWlnaHQgKiBhc3BlY3RSYXRpbyA+IG1pbkNhbnZhc1dpZHRoKSB7XG4gICAgICAgICAgICBtaW5DYW52YXNXaWR0aCA9IG1pbkNhbnZhc0hlaWdodCAqIGFzcGVjdFJhdGlvO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtaW5DYW52YXNIZWlnaHQgPSBtaW5DYW52YXNXaWR0aCAvIGFzcGVjdFJhdGlvO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh2aWV3TW9kZSA+IDApIHtcbiAgICAgICAgaWYgKG1pbkNhbnZhc1dpZHRoKSB7XG4gICAgICAgICAgbWluQ2FudmFzV2lkdGggPSBNYXRoLm1heChcbiAgICAgICAgICAgIG1pbkNhbnZhc1dpZHRoLFxuICAgICAgICAgICAgY3JvcHBlZCA/IGNyb3BCb3hEYXRhLndpZHRoIDogMCxcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKG1pbkNhbnZhc0hlaWdodCkge1xuICAgICAgICAgIG1pbkNhbnZhc0hlaWdodCA9IE1hdGgubWF4KFxuICAgICAgICAgICAgbWluQ2FudmFzSGVpZ2h0LFxuICAgICAgICAgICAgY3JvcHBlZCA/IGNyb3BCb3hEYXRhLmhlaWdodCA6IDAsXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmIChjcm9wcGVkKSB7XG4gICAgICAgICAgbWluQ2FudmFzV2lkdGggPSBjcm9wQm94RGF0YS53aWR0aDtcbiAgICAgICAgICBtaW5DYW52YXNIZWlnaHQgPSBjcm9wQm94RGF0YS5oZWlnaHQ7XG5cbiAgICAgICAgICBpZiAobWluQ2FudmFzSGVpZ2h0ICogYXNwZWN0UmF0aW8gPiBtaW5DYW52YXNXaWR0aCkge1xuICAgICAgICAgICAgbWluQ2FudmFzV2lkdGggPSBtaW5DYW52YXNIZWlnaHQgKiBhc3BlY3RSYXRpbztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWluQ2FudmFzSGVpZ2h0ID0gbWluQ2FudmFzV2lkdGggLyBhc3BlY3RSYXRpbztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgKHsgd2lkdGg6IG1pbkNhbnZhc1dpZHRoLCBoZWlnaHQ6IG1pbkNhbnZhc0hlaWdodCB9ID0gZ2V0QWRqdXN0ZWRTaXplcyh7XG4gICAgICAgIGFzcGVjdFJhdGlvLFxuICAgICAgICB3aWR0aDogbWluQ2FudmFzV2lkdGgsXG4gICAgICAgIGhlaWdodDogbWluQ2FudmFzSGVpZ2h0LFxuICAgICAgfSkpO1xuXG4gICAgICBjYW52YXNEYXRhLm1pbldpZHRoID0gbWluQ2FudmFzV2lkdGg7XG4gICAgICBjYW52YXNEYXRhLm1pbkhlaWdodCA9IG1pbkNhbnZhc0hlaWdodDtcbiAgICAgIGNhbnZhc0RhdGEubWF4V2lkdGggPSBJbmZpbml0eTtcbiAgICAgIGNhbnZhc0RhdGEubWF4SGVpZ2h0ID0gSW5maW5pdHk7XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uTGltaXRlZCkge1xuICAgICAgaWYgKHZpZXdNb2RlID4gKGNyb3BwZWQgPyAwIDogMSkpIHtcbiAgICAgICAgY29uc3QgbmV3Q2FudmFzTGVmdCA9IGNvbnRhaW5lckRhdGEud2lkdGggLSBjYW52YXNEYXRhLndpZHRoO1xuICAgICAgICBjb25zdCBuZXdDYW52YXNUb3AgPSBjb250YWluZXJEYXRhLmhlaWdodCAtIGNhbnZhc0RhdGEuaGVpZ2h0O1xuXG4gICAgICAgIGNhbnZhc0RhdGEubWluTGVmdCA9IE1hdGgubWluKDAsIG5ld0NhbnZhc0xlZnQpO1xuICAgICAgICBjYW52YXNEYXRhLm1pblRvcCA9IE1hdGgubWluKDAsIG5ld0NhbnZhc1RvcCk7XG4gICAgICAgIGNhbnZhc0RhdGEubWF4TGVmdCA9IE1hdGgubWF4KDAsIG5ld0NhbnZhc0xlZnQpO1xuICAgICAgICBjYW52YXNEYXRhLm1heFRvcCA9IE1hdGgubWF4KDAsIG5ld0NhbnZhc1RvcCk7XG5cbiAgICAgICAgaWYgKGNyb3BwZWQgJiYgdGhpcy5saW1pdGVkKSB7XG4gICAgICAgICAgY2FudmFzRGF0YS5taW5MZWZ0ID0gTWF0aC5taW4oXG4gICAgICAgICAgICBjcm9wQm94RGF0YS5sZWZ0LFxuICAgICAgICAgICAgY3JvcEJveERhdGEubGVmdCArIChjcm9wQm94RGF0YS53aWR0aCAtIGNhbnZhc0RhdGEud2lkdGgpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgY2FudmFzRGF0YS5taW5Ub3AgPSBNYXRoLm1pbihcbiAgICAgICAgICAgIGNyb3BCb3hEYXRhLnRvcCxcbiAgICAgICAgICAgIGNyb3BCb3hEYXRhLnRvcCArIChjcm9wQm94RGF0YS5oZWlnaHQgLSBjYW52YXNEYXRhLmhlaWdodCksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjYW52YXNEYXRhLm1heExlZnQgPSBjcm9wQm94RGF0YS5sZWZ0O1xuICAgICAgICAgIGNhbnZhc0RhdGEubWF4VG9wID0gY3JvcEJveERhdGEudG9wO1xuXG4gICAgICAgICAgaWYgKHZpZXdNb2RlID09PSAyKSB7XG4gICAgICAgICAgICBpZiAoY2FudmFzRGF0YS53aWR0aCA+PSBjb250YWluZXJEYXRhLndpZHRoKSB7XG4gICAgICAgICAgICAgIGNhbnZhc0RhdGEubWluTGVmdCA9IE1hdGgubWluKDAsIG5ld0NhbnZhc0xlZnQpO1xuICAgICAgICAgICAgICBjYW52YXNEYXRhLm1heExlZnQgPSBNYXRoLm1heCgwLCBuZXdDYW52YXNMZWZ0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNhbnZhc0RhdGEuaGVpZ2h0ID49IGNvbnRhaW5lckRhdGEuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgIGNhbnZhc0RhdGEubWluVG9wID0gTWF0aC5taW4oMCwgbmV3Q2FudmFzVG9wKTtcbiAgICAgICAgICAgICAgY2FudmFzRGF0YS5tYXhUb3AgPSBNYXRoLm1heCgwLCBuZXdDYW52YXNUb3ApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FudmFzRGF0YS5taW5MZWZ0ID0gLWNhbnZhc0RhdGEud2lkdGg7XG4gICAgICAgIGNhbnZhc0RhdGEubWluVG9wID0gLWNhbnZhc0RhdGEuaGVpZ2h0O1xuICAgICAgICBjYW52YXNEYXRhLm1heExlZnQgPSBjb250YWluZXJEYXRhLndpZHRoO1xuICAgICAgICBjYW52YXNEYXRhLm1heFRvcCA9IGNvbnRhaW5lckRhdGEuaGVpZ2h0O1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICByZW5kZXJDYW52YXMoY2hhbmdlZCwgdHJhbnNmb3JtZWQpIHtcbiAgICBjb25zdCB7IGNhbnZhc0RhdGEsIGltYWdlRGF0YSB9ID0gdGhpcztcblxuICAgIGlmICh0cmFuc2Zvcm1lZCkge1xuICAgICAgY29uc3QgeyB3aWR0aDogbmF0dXJhbFdpZHRoLCBoZWlnaHQ6IG5hdHVyYWxIZWlnaHQgfSA9IGdldFJvdGF0ZWRTaXplcyh7XG4gICAgICAgIHdpZHRoOiBpbWFnZURhdGEubmF0dXJhbFdpZHRoICogTWF0aC5hYnMoaW1hZ2VEYXRhLnNjYWxlWCB8fCAxKSxcbiAgICAgICAgaGVpZ2h0OiBpbWFnZURhdGEubmF0dXJhbEhlaWdodCAqIE1hdGguYWJzKGltYWdlRGF0YS5zY2FsZVkgfHwgMSksXG4gICAgICAgIGRlZ3JlZTogaW1hZ2VEYXRhLnJvdGF0ZSB8fCAwLFxuICAgICAgfSk7XG4gICAgICBjb25zdCB3aWR0aCA9IGNhbnZhc0RhdGEud2lkdGggKiAobmF0dXJhbFdpZHRoIC8gY2FudmFzRGF0YS5uYXR1cmFsV2lkdGgpO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gY2FudmFzRGF0YS5oZWlnaHQgKiAobmF0dXJhbEhlaWdodCAvIGNhbnZhc0RhdGEubmF0dXJhbEhlaWdodCk7XG5cbiAgICAgIGNhbnZhc0RhdGEubGVmdCAtPSAod2lkdGggLSBjYW52YXNEYXRhLndpZHRoKSAvIDI7XG4gICAgICBjYW52YXNEYXRhLnRvcCAtPSAoaGVpZ2h0IC0gY2FudmFzRGF0YS5oZWlnaHQpIC8gMjtcbiAgICAgIGNhbnZhc0RhdGEud2lkdGggPSB3aWR0aDtcbiAgICAgIGNhbnZhc0RhdGEuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgY2FudmFzRGF0YS5hc3BlY3RSYXRpbyA9IG5hdHVyYWxXaWR0aCAvIG5hdHVyYWxIZWlnaHQ7XG4gICAgICBjYW52YXNEYXRhLm5hdHVyYWxXaWR0aCA9IG5hdHVyYWxXaWR0aDtcbiAgICAgIGNhbnZhc0RhdGEubmF0dXJhbEhlaWdodCA9IG5hdHVyYWxIZWlnaHQ7XG4gICAgICB0aGlzLmxpbWl0Q2FudmFzKHRydWUsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBpZiAoY2FudmFzRGF0YS53aWR0aCA+IGNhbnZhc0RhdGEubWF4V2lkdGhcbiAgICAgIHx8IGNhbnZhc0RhdGEud2lkdGggPCBjYW52YXNEYXRhLm1pbldpZHRoKSB7XG4gICAgICBjYW52YXNEYXRhLmxlZnQgPSBjYW52YXNEYXRhLm9sZExlZnQ7XG4gICAgfVxuXG4gICAgaWYgKGNhbnZhc0RhdGEuaGVpZ2h0ID4gY2FudmFzRGF0YS5tYXhIZWlnaHRcbiAgICAgIHx8IGNhbnZhc0RhdGEuaGVpZ2h0IDwgY2FudmFzRGF0YS5taW5IZWlnaHQpIHtcbiAgICAgIGNhbnZhc0RhdGEudG9wID0gY2FudmFzRGF0YS5vbGRUb3A7XG4gICAgfVxuXG4gICAgY2FudmFzRGF0YS53aWR0aCA9IE1hdGgubWluKFxuICAgICAgTWF0aC5tYXgoY2FudmFzRGF0YS53aWR0aCwgY2FudmFzRGF0YS5taW5XaWR0aCksXG4gICAgICBjYW52YXNEYXRhLm1heFdpZHRoLFxuICAgICk7XG4gICAgY2FudmFzRGF0YS5oZWlnaHQgPSBNYXRoLm1pbihcbiAgICAgIE1hdGgubWF4KGNhbnZhc0RhdGEuaGVpZ2h0LCBjYW52YXNEYXRhLm1pbkhlaWdodCksXG4gICAgICBjYW52YXNEYXRhLm1heEhlaWdodCxcbiAgICApO1xuXG4gICAgdGhpcy5saW1pdENhbnZhcyhmYWxzZSwgdHJ1ZSk7XG5cbiAgICBjYW52YXNEYXRhLmxlZnQgPSBNYXRoLm1pbihcbiAgICAgIE1hdGgubWF4KGNhbnZhc0RhdGEubGVmdCwgY2FudmFzRGF0YS5taW5MZWZ0KSxcbiAgICAgIGNhbnZhc0RhdGEubWF4TGVmdCxcbiAgICApO1xuICAgIGNhbnZhc0RhdGEudG9wID0gTWF0aC5taW4oXG4gICAgICBNYXRoLm1heChjYW52YXNEYXRhLnRvcCwgY2FudmFzRGF0YS5taW5Ub3ApLFxuICAgICAgY2FudmFzRGF0YS5tYXhUb3AsXG4gICAgKTtcbiAgICBjYW52YXNEYXRhLm9sZExlZnQgPSBjYW52YXNEYXRhLmxlZnQ7XG4gICAgY2FudmFzRGF0YS5vbGRUb3AgPSBjYW52YXNEYXRhLnRvcDtcblxuICAgIHNldFN0eWxlKHRoaXMuY2FudmFzLCBhc3NpZ24oe1xuICAgICAgd2lkdGg6IGNhbnZhc0RhdGEud2lkdGgsXG4gICAgICBoZWlnaHQ6IGNhbnZhc0RhdGEuaGVpZ2h0LFxuICAgIH0sIGdldFRyYW5zZm9ybXMoe1xuICAgICAgdHJhbnNsYXRlWDogY2FudmFzRGF0YS5sZWZ0LFxuICAgICAgdHJhbnNsYXRlWTogY2FudmFzRGF0YS50b3AsXG4gICAgfSkpKTtcblxuICAgIHRoaXMucmVuZGVySW1hZ2UoY2hhbmdlZCk7XG5cbiAgICBpZiAodGhpcy5jcm9wcGVkICYmIHRoaXMubGltaXRlZCkge1xuICAgICAgdGhpcy5saW1pdENyb3BCb3godHJ1ZSwgdHJ1ZSk7XG4gICAgfVxuICB9LFxuXG4gIHJlbmRlckltYWdlKGNoYW5nZWQpIHtcbiAgICBjb25zdCB7IGNhbnZhc0RhdGEsIGltYWdlRGF0YSB9ID0gdGhpcztcbiAgICBjb25zdCB3aWR0aCA9IGltYWdlRGF0YS5uYXR1cmFsV2lkdGggKiAoY2FudmFzRGF0YS53aWR0aCAvIGNhbnZhc0RhdGEubmF0dXJhbFdpZHRoKTtcbiAgICBjb25zdCBoZWlnaHQgPSBpbWFnZURhdGEubmF0dXJhbEhlaWdodCAqIChjYW52YXNEYXRhLmhlaWdodCAvIGNhbnZhc0RhdGEubmF0dXJhbEhlaWdodCk7XG5cbiAgICBhc3NpZ24oaW1hZ2VEYXRhLCB7XG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodCxcbiAgICAgIGxlZnQ6IChjYW52YXNEYXRhLndpZHRoIC0gd2lkdGgpIC8gMixcbiAgICAgIHRvcDogKGNhbnZhc0RhdGEuaGVpZ2h0IC0gaGVpZ2h0KSAvIDIsXG4gICAgfSk7XG4gICAgc2V0U3R5bGUodGhpcy5pbWFnZSwgYXNzaWduKHtcbiAgICAgIHdpZHRoOiBpbWFnZURhdGEud2lkdGgsXG4gICAgICBoZWlnaHQ6IGltYWdlRGF0YS5oZWlnaHQsXG4gICAgfSwgZ2V0VHJhbnNmb3Jtcyhhc3NpZ24oe1xuICAgICAgdHJhbnNsYXRlWDogaW1hZ2VEYXRhLmxlZnQsXG4gICAgICB0cmFuc2xhdGVZOiBpbWFnZURhdGEudG9wLFxuICAgIH0sIGltYWdlRGF0YSkpKSk7XG5cbiAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgdGhpcy5vdXRwdXQoKTtcbiAgICB9XG4gIH0sXG5cbiAgaW5pdENyb3BCb3goKSB7XG4gICAgY29uc3QgeyBvcHRpb25zLCBjYW52YXNEYXRhIH0gPSB0aGlzO1xuICAgIGNvbnN0IGFzcGVjdFJhdGlvID0gb3B0aW9ucy5hc3BlY3RSYXRpbyB8fCBvcHRpb25zLmluaXRpYWxBc3BlY3RSYXRpbztcbiAgICBjb25zdCBhdXRvQ3JvcEFyZWEgPSBOdW1iZXIob3B0aW9ucy5hdXRvQ3JvcEFyZWEpIHx8IDAuODtcbiAgICBjb25zdCBjcm9wQm94RGF0YSA9IHtcbiAgICAgIHdpZHRoOiBjYW52YXNEYXRhLndpZHRoLFxuICAgICAgaGVpZ2h0OiBjYW52YXNEYXRhLmhlaWdodCxcbiAgICB9O1xuXG4gICAgaWYgKGFzcGVjdFJhdGlvKSB7XG4gICAgICBpZiAoY2FudmFzRGF0YS5oZWlnaHQgKiBhc3BlY3RSYXRpbyA+IGNhbnZhc0RhdGEud2lkdGgpIHtcbiAgICAgICAgY3JvcEJveERhdGEuaGVpZ2h0ID0gY3JvcEJveERhdGEud2lkdGggLyBhc3BlY3RSYXRpbztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNyb3BCb3hEYXRhLndpZHRoID0gY3JvcEJveERhdGEuaGVpZ2h0ICogYXNwZWN0UmF0aW87XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5jcm9wQm94RGF0YSA9IGNyb3BCb3hEYXRhO1xuICAgIHRoaXMubGltaXRDcm9wQm94KHRydWUsIHRydWUpO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSBhdXRvIGNyb3AgYXJlYVxuICAgIGNyb3BCb3hEYXRhLndpZHRoID0gTWF0aC5taW4oXG4gICAgICBNYXRoLm1heChjcm9wQm94RGF0YS53aWR0aCwgY3JvcEJveERhdGEubWluV2lkdGgpLFxuICAgICAgY3JvcEJveERhdGEubWF4V2lkdGgsXG4gICAgKTtcbiAgICBjcm9wQm94RGF0YS5oZWlnaHQgPSBNYXRoLm1pbihcbiAgICAgIE1hdGgubWF4KGNyb3BCb3hEYXRhLmhlaWdodCwgY3JvcEJveERhdGEubWluSGVpZ2h0KSxcbiAgICAgIGNyb3BCb3hEYXRhLm1heEhlaWdodCxcbiAgICApO1xuXG4gICAgLy8gVGhlIHdpZHRoL2hlaWdodCBvZiBhdXRvIGNyb3AgYXJlYSBtdXN0IGxhcmdlIHRoYW4gXCJtaW5XaWR0aC9IZWlnaHRcIlxuICAgIGNyb3BCb3hEYXRhLndpZHRoID0gTWF0aC5tYXgoXG4gICAgICBjcm9wQm94RGF0YS5taW5XaWR0aCxcbiAgICAgIGNyb3BCb3hEYXRhLndpZHRoICogYXV0b0Nyb3BBcmVhLFxuICAgICk7XG4gICAgY3JvcEJveERhdGEuaGVpZ2h0ID0gTWF0aC5tYXgoXG4gICAgICBjcm9wQm94RGF0YS5taW5IZWlnaHQsXG4gICAgICBjcm9wQm94RGF0YS5oZWlnaHQgKiBhdXRvQ3JvcEFyZWEsXG4gICAgKTtcbiAgICBjcm9wQm94RGF0YS5sZWZ0ID0gKFxuICAgICAgY2FudmFzRGF0YS5sZWZ0ICsgKChjYW52YXNEYXRhLndpZHRoIC0gY3JvcEJveERhdGEud2lkdGgpIC8gMilcbiAgICApO1xuICAgIGNyb3BCb3hEYXRhLnRvcCA9IChcbiAgICAgIGNhbnZhc0RhdGEudG9wICsgKChjYW52YXNEYXRhLmhlaWdodCAtIGNyb3BCb3hEYXRhLmhlaWdodCkgLyAyKVxuICAgICk7XG4gICAgY3JvcEJveERhdGEub2xkTGVmdCA9IGNyb3BCb3hEYXRhLmxlZnQ7XG4gICAgY3JvcEJveERhdGEub2xkVG9wID0gY3JvcEJveERhdGEudG9wO1xuXG4gICAgdGhpcy5pbml0aWFsQ3JvcEJveERhdGEgPSBhc3NpZ24oe30sIGNyb3BCb3hEYXRhKTtcbiAgfSxcblxuICBsaW1pdENyb3BCb3goc2l6ZUxpbWl0ZWQsIHBvc2l0aW9uTGltaXRlZCkge1xuICAgIGNvbnN0IHtcbiAgICAgIG9wdGlvbnMsXG4gICAgICBjb250YWluZXJEYXRhLFxuICAgICAgY2FudmFzRGF0YSxcbiAgICAgIGNyb3BCb3hEYXRhLFxuICAgICAgbGltaXRlZCxcbiAgICB9ID0gdGhpcztcbiAgICBjb25zdCB7IGFzcGVjdFJhdGlvIH0gPSBvcHRpb25zO1xuXG4gICAgaWYgKHNpemVMaW1pdGVkKSB7XG4gICAgICBsZXQgbWluQ3JvcEJveFdpZHRoID0gTnVtYmVyKG9wdGlvbnMubWluQ3JvcEJveFdpZHRoKSB8fCAwO1xuICAgICAgbGV0IG1pbkNyb3BCb3hIZWlnaHQgPSBOdW1iZXIob3B0aW9ucy5taW5Dcm9wQm94SGVpZ2h0KSB8fCAwO1xuICAgICAgbGV0IG1heENyb3BCb3hXaWR0aCA9IGxpbWl0ZWQgPyBNYXRoLm1pbihcbiAgICAgICAgY29udGFpbmVyRGF0YS53aWR0aCxcbiAgICAgICAgY2FudmFzRGF0YS53aWR0aCxcbiAgICAgICAgY2FudmFzRGF0YS53aWR0aCArIGNhbnZhc0RhdGEubGVmdCxcbiAgICAgICAgY29udGFpbmVyRGF0YS53aWR0aCAtIGNhbnZhc0RhdGEubGVmdCxcbiAgICAgICkgOiBjb250YWluZXJEYXRhLndpZHRoO1xuICAgICAgbGV0IG1heENyb3BCb3hIZWlnaHQgPSBsaW1pdGVkID8gTWF0aC5taW4oXG4gICAgICAgIGNvbnRhaW5lckRhdGEuaGVpZ2h0LFxuICAgICAgICBjYW52YXNEYXRhLmhlaWdodCxcbiAgICAgICAgY2FudmFzRGF0YS5oZWlnaHQgKyBjYW52YXNEYXRhLnRvcCxcbiAgICAgICAgY29udGFpbmVyRGF0YS5oZWlnaHQgLSBjYW52YXNEYXRhLnRvcCxcbiAgICAgICkgOiBjb250YWluZXJEYXRhLmhlaWdodDtcblxuICAgICAgLy8gVGhlIG1pbi9tYXhDcm9wQm94V2lkdGgvSGVpZ2h0IG11c3QgYmUgbGVzcyB0aGFuIGNvbnRhaW5lcidzIHdpZHRoL2hlaWdodFxuICAgICAgbWluQ3JvcEJveFdpZHRoID0gTWF0aC5taW4obWluQ3JvcEJveFdpZHRoLCBjb250YWluZXJEYXRhLndpZHRoKTtcbiAgICAgIG1pbkNyb3BCb3hIZWlnaHQgPSBNYXRoLm1pbihtaW5Dcm9wQm94SGVpZ2h0LCBjb250YWluZXJEYXRhLmhlaWdodCk7XG5cbiAgICAgIGlmIChhc3BlY3RSYXRpbykge1xuICAgICAgICBpZiAobWluQ3JvcEJveFdpZHRoICYmIG1pbkNyb3BCb3hIZWlnaHQpIHtcbiAgICAgICAgICBpZiAobWluQ3JvcEJveEhlaWdodCAqIGFzcGVjdFJhdGlvID4gbWluQ3JvcEJveFdpZHRoKSB7XG4gICAgICAgICAgICBtaW5Dcm9wQm94SGVpZ2h0ID0gbWluQ3JvcEJveFdpZHRoIC8gYXNwZWN0UmF0aW87XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1pbkNyb3BCb3hXaWR0aCA9IG1pbkNyb3BCb3hIZWlnaHQgKiBhc3BlY3RSYXRpbztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAobWluQ3JvcEJveFdpZHRoKSB7XG4gICAgICAgICAgbWluQ3JvcEJveEhlaWdodCA9IG1pbkNyb3BCb3hXaWR0aCAvIGFzcGVjdFJhdGlvO1xuICAgICAgICB9IGVsc2UgaWYgKG1pbkNyb3BCb3hIZWlnaHQpIHtcbiAgICAgICAgICBtaW5Dcm9wQm94V2lkdGggPSBtaW5Dcm9wQm94SGVpZ2h0ICogYXNwZWN0UmF0aW87XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWF4Q3JvcEJveEhlaWdodCAqIGFzcGVjdFJhdGlvID4gbWF4Q3JvcEJveFdpZHRoKSB7XG4gICAgICAgICAgbWF4Q3JvcEJveEhlaWdodCA9IG1heENyb3BCb3hXaWR0aCAvIGFzcGVjdFJhdGlvO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1heENyb3BCb3hXaWR0aCA9IG1heENyb3BCb3hIZWlnaHQgKiBhc3BlY3RSYXRpbztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgbWluV2lkdGgvSGVpZ2h0IG11c3QgYmUgbGVzcyB0aGFuIG1heFdpZHRoL0hlaWdodFxuICAgICAgY3JvcEJveERhdGEubWluV2lkdGggPSBNYXRoLm1pbihtaW5Dcm9wQm94V2lkdGgsIG1heENyb3BCb3hXaWR0aCk7XG4gICAgICBjcm9wQm94RGF0YS5taW5IZWlnaHQgPSBNYXRoLm1pbihtaW5Dcm9wQm94SGVpZ2h0LCBtYXhDcm9wQm94SGVpZ2h0KTtcbiAgICAgIGNyb3BCb3hEYXRhLm1heFdpZHRoID0gbWF4Q3JvcEJveFdpZHRoO1xuICAgICAgY3JvcEJveERhdGEubWF4SGVpZ2h0ID0gbWF4Q3JvcEJveEhlaWdodDtcbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb25MaW1pdGVkKSB7XG4gICAgICBpZiAobGltaXRlZCkge1xuICAgICAgICBjcm9wQm94RGF0YS5taW5MZWZ0ID0gTWF0aC5tYXgoMCwgY2FudmFzRGF0YS5sZWZ0KTtcbiAgICAgICAgY3JvcEJveERhdGEubWluVG9wID0gTWF0aC5tYXgoMCwgY2FudmFzRGF0YS50b3ApO1xuICAgICAgICBjcm9wQm94RGF0YS5tYXhMZWZ0ID0gTWF0aC5taW4oXG4gICAgICAgICAgY29udGFpbmVyRGF0YS53aWR0aCxcbiAgICAgICAgICBjYW52YXNEYXRhLmxlZnQgKyBjYW52YXNEYXRhLndpZHRoLFxuICAgICAgICApIC0gY3JvcEJveERhdGEud2lkdGg7XG4gICAgICAgIGNyb3BCb3hEYXRhLm1heFRvcCA9IE1hdGgubWluKFxuICAgICAgICAgIGNvbnRhaW5lckRhdGEuaGVpZ2h0LFxuICAgICAgICAgIGNhbnZhc0RhdGEudG9wICsgY2FudmFzRGF0YS5oZWlnaHQsXG4gICAgICAgICkgLSBjcm9wQm94RGF0YS5oZWlnaHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjcm9wQm94RGF0YS5taW5MZWZ0ID0gMDtcbiAgICAgICAgY3JvcEJveERhdGEubWluVG9wID0gMDtcbiAgICAgICAgY3JvcEJveERhdGEubWF4TGVmdCA9IGNvbnRhaW5lckRhdGEud2lkdGggLSBjcm9wQm94RGF0YS53aWR0aDtcbiAgICAgICAgY3JvcEJveERhdGEubWF4VG9wID0gY29udGFpbmVyRGF0YS5oZWlnaHQgLSBjcm9wQm94RGF0YS5oZWlnaHQ7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHJlbmRlckNyb3BCb3goKSB7XG4gICAgY29uc3QgeyBvcHRpb25zLCBjb250YWluZXJEYXRhLCBjcm9wQm94RGF0YSB9ID0gdGhpcztcblxuICAgIGlmIChjcm9wQm94RGF0YS53aWR0aCA+IGNyb3BCb3hEYXRhLm1heFdpZHRoXG4gICAgICB8fCBjcm9wQm94RGF0YS53aWR0aCA8IGNyb3BCb3hEYXRhLm1pbldpZHRoKSB7XG4gICAgICBjcm9wQm94RGF0YS5sZWZ0ID0gY3JvcEJveERhdGEub2xkTGVmdDtcbiAgICB9XG5cbiAgICBpZiAoY3JvcEJveERhdGEuaGVpZ2h0ID4gY3JvcEJveERhdGEubWF4SGVpZ2h0XG4gICAgICB8fCBjcm9wQm94RGF0YS5oZWlnaHQgPCBjcm9wQm94RGF0YS5taW5IZWlnaHQpIHtcbiAgICAgIGNyb3BCb3hEYXRhLnRvcCA9IGNyb3BCb3hEYXRhLm9sZFRvcDtcbiAgICB9XG5cbiAgICBjcm9wQm94RGF0YS53aWR0aCA9IE1hdGgubWluKFxuICAgICAgTWF0aC5tYXgoY3JvcEJveERhdGEud2lkdGgsIGNyb3BCb3hEYXRhLm1pbldpZHRoKSxcbiAgICAgIGNyb3BCb3hEYXRhLm1heFdpZHRoLFxuICAgICk7XG4gICAgY3JvcEJveERhdGEuaGVpZ2h0ID0gTWF0aC5taW4oXG4gICAgICBNYXRoLm1heChjcm9wQm94RGF0YS5oZWlnaHQsIGNyb3BCb3hEYXRhLm1pbkhlaWdodCksXG4gICAgICBjcm9wQm94RGF0YS5tYXhIZWlnaHQsXG4gICAgKTtcblxuICAgIHRoaXMubGltaXRDcm9wQm94KGZhbHNlLCB0cnVlKTtcblxuICAgIGNyb3BCb3hEYXRhLmxlZnQgPSBNYXRoLm1pbihcbiAgICAgIE1hdGgubWF4KGNyb3BCb3hEYXRhLmxlZnQsIGNyb3BCb3hEYXRhLm1pbkxlZnQpLFxuICAgICAgY3JvcEJveERhdGEubWF4TGVmdCxcbiAgICApO1xuICAgIGNyb3BCb3hEYXRhLnRvcCA9IE1hdGgubWluKFxuICAgICAgTWF0aC5tYXgoY3JvcEJveERhdGEudG9wLCBjcm9wQm94RGF0YS5taW5Ub3ApLFxuICAgICAgY3JvcEJveERhdGEubWF4VG9wLFxuICAgICk7XG4gICAgY3JvcEJveERhdGEub2xkTGVmdCA9IGNyb3BCb3hEYXRhLmxlZnQ7XG4gICAgY3JvcEJveERhdGEub2xkVG9wID0gY3JvcEJveERhdGEudG9wO1xuXG4gICAgaWYgKG9wdGlvbnMubW92YWJsZSAmJiBvcHRpb25zLmNyb3BCb3hNb3ZhYmxlKSB7XG4gICAgICAvLyBUdXJuIHRvIG1vdmUgdGhlIGNhbnZhcyB3aGVuIHRoZSBjcm9wIGJveCBpcyBlcXVhbCB0byB0aGUgY29udGFpbmVyXG4gICAgICBzZXREYXRhKHRoaXMuZmFjZSwgREFUQV9BQ1RJT04sIGNyb3BCb3hEYXRhLndpZHRoID49IGNvbnRhaW5lckRhdGEud2lkdGhcbiAgICAgICAgJiYgY3JvcEJveERhdGEuaGVpZ2h0ID49IGNvbnRhaW5lckRhdGEuaGVpZ2h0ID8gQUNUSU9OX01PVkUgOiBBQ1RJT05fQUxMKTtcbiAgICB9XG5cbiAgICBzZXRTdHlsZSh0aGlzLmNyb3BCb3gsIGFzc2lnbih7XG4gICAgICB3aWR0aDogY3JvcEJveERhdGEud2lkdGgsXG4gICAgICBoZWlnaHQ6IGNyb3BCb3hEYXRhLmhlaWdodCxcbiAgICB9LCBnZXRUcmFuc2Zvcm1zKHtcbiAgICAgIHRyYW5zbGF0ZVg6IGNyb3BCb3hEYXRhLmxlZnQsXG4gICAgICB0cmFuc2xhdGVZOiBjcm9wQm94RGF0YS50b3AsXG4gICAgfSkpKTtcblxuICAgIGlmICh0aGlzLmNyb3BwZWQgJiYgdGhpcy5saW1pdGVkKSB7XG4gICAgICB0aGlzLmxpbWl0Q2FudmFzKHRydWUsIHRydWUpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5vdXRwdXQoKTtcbiAgICB9XG4gIH0sXG5cbiAgb3V0cHV0KCkge1xuICAgIHRoaXMucHJldmlldygpO1xuICAgIGRpc3BhdGNoRXZlbnQodGhpcy5lbGVtZW50LCBFVkVOVF9DUk9QLCB0aGlzLmdldERhdGEoKSk7XG4gIH0sXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgKFxuICAnPGRpdiBjbGFzcz1cImNyb3BwZXItY29udGFpbmVyXCIgdG91Y2gtYWN0aW9uPVwibm9uZVwiPidcbiAgICArICc8ZGl2IGNsYXNzPVwiY3JvcHBlci13cmFwLWJveFwiPidcbiAgICAgICsgJzxkaXYgY2xhc3M9XCJjcm9wcGVyLWNhbnZhc1wiPjwvZGl2PidcbiAgICArICc8L2Rpdj4nXG4gICAgKyAnPGRpdiBjbGFzcz1cImNyb3BwZXItZHJhZy1ib3hcIj48L2Rpdj4nXG4gICAgKyAnPGRpdiBjbGFzcz1cImNyb3BwZXItY3JvcC1ib3hcIj4nXG4gICAgICArICc8c3BhbiBjbGFzcz1cImNyb3BwZXItdmlldy1ib3hcIj48L3NwYW4+J1xuICAgICAgKyAnPHNwYW4gY2xhc3M9XCJjcm9wcGVyLWRhc2hlZCBkYXNoZWQtaFwiPjwvc3Bhbj4nXG4gICAgICArICc8c3BhbiBjbGFzcz1cImNyb3BwZXItZGFzaGVkIGRhc2hlZC12XCI+PC9zcGFuPidcbiAgICAgICsgJzxzcGFuIGNsYXNzPVwiY3JvcHBlci1jZW50ZXJcIj48L3NwYW4+J1xuICAgICAgKyAnPHNwYW4gY2xhc3M9XCJjcm9wcGVyLWZhY2VcIj48L3NwYW4+J1xuICAgICAgKyAnPHNwYW4gY2xhc3M9XCJjcm9wcGVyLWxpbmUgbGluZS1lXCIgZGF0YS1jcm9wcGVyLWFjdGlvbj1cImVcIj48L3NwYW4+J1xuICAgICAgKyAnPHNwYW4gY2xhc3M9XCJjcm9wcGVyLWxpbmUgbGluZS1uXCIgZGF0YS1jcm9wcGVyLWFjdGlvbj1cIm5cIj48L3NwYW4+J1xuICAgICAgKyAnPHNwYW4gY2xhc3M9XCJjcm9wcGVyLWxpbmUgbGluZS13XCIgZGF0YS1jcm9wcGVyLWFjdGlvbj1cIndcIj48L3NwYW4+J1xuICAgICAgKyAnPHNwYW4gY2xhc3M9XCJjcm9wcGVyLWxpbmUgbGluZS1zXCIgZGF0YS1jcm9wcGVyLWFjdGlvbj1cInNcIj48L3NwYW4+J1xuICAgICAgKyAnPHNwYW4gY2xhc3M9XCJjcm9wcGVyLXBvaW50IHBvaW50LWVcIiBkYXRhLWNyb3BwZXItYWN0aW9uPVwiZVwiPjwvc3Bhbj4nXG4gICAgICArICc8c3BhbiBjbGFzcz1cImNyb3BwZXItcG9pbnQgcG9pbnQtblwiIGRhdGEtY3JvcHBlci1hY3Rpb249XCJuXCI+PC9zcGFuPidcbiAgICAgICsgJzxzcGFuIGNsYXNzPVwiY3JvcHBlci1wb2ludCBwb2ludC13XCIgZGF0YS1jcm9wcGVyLWFjdGlvbj1cIndcIj48L3NwYW4+J1xuICAgICAgKyAnPHNwYW4gY2xhc3M9XCJjcm9wcGVyLXBvaW50IHBvaW50LXNcIiBkYXRhLWNyb3BwZXItYWN0aW9uPVwic1wiPjwvc3Bhbj4nXG4gICAgICArICc8c3BhbiBjbGFzcz1cImNyb3BwZXItcG9pbnQgcG9pbnQtbmVcIiBkYXRhLWNyb3BwZXItYWN0aW9uPVwibmVcIj48L3NwYW4+J1xuICAgICAgKyAnPHNwYW4gY2xhc3M9XCJjcm9wcGVyLXBvaW50IHBvaW50LW53XCIgZGF0YS1jcm9wcGVyLWFjdGlvbj1cIm53XCI+PC9zcGFuPidcbiAgICAgICsgJzxzcGFuIGNsYXNzPVwiY3JvcHBlci1wb2ludCBwb2ludC1zd1wiIGRhdGEtY3JvcHBlci1hY3Rpb249XCJzd1wiPjwvc3Bhbj4nXG4gICAgICArICc8c3BhbiBjbGFzcz1cImNyb3BwZXItcG9pbnQgcG9pbnQtc2VcIiBkYXRhLWNyb3BwZXItYWN0aW9uPVwic2VcIj48L3NwYW4+J1xuICAgICsgJzwvZGl2PidcbiAgKyAnPC9kaXY+J1xuKTtcbiIsImltcG9ydCB7IElTX0JST1dTRVIsIFdJTkRPVyB9IGZyb20gJy4vY29uc3RhbnRzJztcblxuLyoqXG4gKiBDaGVjayBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgbm90IGEgbnVtYmVyLlxuICovXG5leHBvcnQgY29uc3QgaXNOYU4gPSBOdW1iZXIuaXNOYU4gfHwgV0lORE9XLmlzTmFOO1xuXG4vKipcbiAqIENoZWNrIGlmIHRoZSBnaXZlbiB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGdpdmVuIHZhbHVlIGlzIGEgbnVtYmVyLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiAhaXNOYU4odmFsdWUpO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIHRoZSBnaXZlbiB2YWx1ZSBpcyBhIHBvc2l0aXZlIG51bWJlci5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGdpdmVuIHZhbHVlIGlzIGEgcG9zaXRpdmUgbnVtYmVyLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmV4cG9ydCBjb25zdCBpc1Bvc2l0aXZlTnVtYmVyID0gdmFsdWUgPT4gdmFsdWUgPiAwICYmIHZhbHVlIDwgSW5maW5pdHk7XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlIGdpdmVuIHZhbHVlIGlzIHVuZGVmaW5lZC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGdpdmVuIHZhbHVlIGlzIHVuZGVmaW5lZCwgZWxzZSBgZmFsc2VgLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCc7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlIGdpdmVuIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGdpdmVuIHZhbHVlIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgIT09IG51bGw7XG59XG5cbmNvbnN0IHsgaGFzT3duUHJvcGVydHkgfSA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlIGdpdmVuIHZhbHVlIGlzIGEgcGxhaW4gb2JqZWN0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgYSBwbGFpbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IHsgY29uc3RydWN0b3IgfSA9IHZhbHVlO1xuICAgIGNvbnN0IHsgcHJvdG90eXBlIH0gPSBjb25zdHJ1Y3RvcjtcblxuICAgIHJldHVybiBjb25zdHJ1Y3RvciAmJiBwcm90b3R5cGUgJiYgaGFzT3duUHJvcGVydHkuY2FsbChwcm90b3R5cGUsICdpc1Byb3RvdHlwZU9mJyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlIGdpdmVuIHZhbHVlIGlzIGEgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IHZhbHVlIC0gVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBnaXZlbiB2YWx1ZSBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbic7XG59XG5cbmNvbnN0IHsgc2xpY2UgfSA9IEFycmF5LnByb3RvdHlwZTtcblxuLyoqXG4gKiBDb252ZXJ0IGFycmF5LWxpa2Ugb3IgaXRlcmFibGUgb2JqZWN0IHRvIGFuIGFycmF5LlxuICogQHBhcmFtIHsqfSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgbmV3IGFycmF5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9BcnJheSh2YWx1ZSkge1xuICByZXR1cm4gQXJyYXkuZnJvbSA/IEFycmF5LmZyb20odmFsdWUpIDogc2xpY2UuY2FsbCh2YWx1ZSk7XG59XG5cbi8qKlxuICogSXRlcmF0ZSB0aGUgZ2l2ZW4gZGF0YS5cbiAqIEBwYXJhbSB7Kn0gZGF0YSAtIFRoZSBkYXRhIHRvIGl0ZXJhdGUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBwcm9jZXNzIGZ1bmN0aW9uIGZvciBlYWNoIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7Kn0gVGhlIG9yaWdpbmFsIGRhdGEuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JFYWNoKGRhdGEsIGNhbGxiYWNrKSB7XG4gIGlmIChkYXRhICYmIGlzRnVuY3Rpb24oY2FsbGJhY2spKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkgfHwgaXNOdW1iZXIoZGF0YS5sZW5ndGgpLyogYXJyYXktbGlrZSAqLykge1xuICAgICAgdG9BcnJheShkYXRhKS5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoZGF0YSwgdmFsdWUsIGtleSwgZGF0YSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgY2FsbGJhY2suY2FsbChkYXRhLCBkYXRhW2tleV0sIGtleSwgZGF0YSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBFeHRlbmQgdGhlIGdpdmVuIG9iamVjdC5cbiAqIEBwYXJhbSB7Kn0gdGFyZ2V0IC0gVGhlIHRhcmdldCBvYmplY3QgdG8gZXh0ZW5kLlxuICogQHBhcmFtIHsqfSBhcmdzIC0gVGhlIHJlc3Qgb2JqZWN0cyBmb3IgbWVyZ2luZyB0byB0aGUgdGFyZ2V0IG9iamVjdC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBleHRlbmRlZCBvYmplY3QuXG4gKi9cbmV4cG9ydCBjb25zdCBhc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIC4uLmFyZ3MpIHtcbiAgaWYgKGlzT2JqZWN0KHRhcmdldCkgJiYgYXJncy5sZW5ndGggPiAwKSB7XG4gICAgYXJncy5mb3JFYWNoKChhcmcpID0+IHtcbiAgICAgIGlmIChpc09iamVjdChhcmcpKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKGFyZykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBhcmdba2V5XTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxuY29uc3QgUkVHRVhQX0RFQ0lNQUxTID0gL1xcLlxcZCooPzowfDkpezEyfVxcZCokLztcblxuLyoqXG4gKiBOb3JtYWxpemUgZGVjaW1hbCBudW1iZXIuXG4gKiBDaGVjayBvdXQge0BsaW5rIGh0dHA6Ly8wLjMwMDAwMDAwMDAwMDAwMDA0LmNvbS99XG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gbm9ybWFsaXplLlxuICogQHBhcmFtIHtudW1iZXJ9IFt0aW1lcz0xMDAwMDAwMDAwMDBdIC0gVGhlIHRpbWVzIGZvciBub3JtYWxpemluZy5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIG5vcm1hbGl6ZWQgbnVtYmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplRGVjaW1hbE51bWJlcih2YWx1ZSwgdGltZXMgPSAxMDAwMDAwMDAwMDApIHtcbiAgcmV0dXJuIFJFR0VYUF9ERUNJTUFMUy50ZXN0KHZhbHVlKSA/IChNYXRoLnJvdW5kKHZhbHVlICogdGltZXMpIC8gdGltZXMpIDogdmFsdWU7XG59XG5cbmNvbnN0IFJFR0VYUF9TVUZGSVggPSAvXndpZHRofGhlaWdodHxsZWZ0fHRvcHxtYXJnaW5MZWZ0fG1hcmdpblRvcCQvO1xuXG4vKipcbiAqIEFwcGx5IHN0eWxlcyB0byB0aGUgZ2l2ZW4gZWxlbWVudC5cbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCAtIFRoZSB0YXJnZXQgZWxlbWVudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZXMgLSBUaGUgc3R5bGVzIGZvciBhcHBseWluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldFN0eWxlKGVsZW1lbnQsIHN0eWxlcykge1xuICBjb25zdCB7IHN0eWxlIH0gPSBlbGVtZW50O1xuXG4gIGZvckVhY2goc3R5bGVzLCAodmFsdWUsIHByb3BlcnR5KSA9PiB7XG4gICAgaWYgKFJFR0VYUF9TVUZGSVgudGVzdChwcm9wZXJ0eSkgJiYgaXNOdW1iZXIodmFsdWUpKSB7XG4gICAgICB2YWx1ZSA9IGAke3ZhbHVlfXB4YDtcbiAgICB9XG5cbiAgICBzdHlsZVtwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlIGdpdmVuIGVsZW1lbnQgaGFzIGEgc3BlY2lhbCBjbGFzcy5cbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCAtIFRoZSBlbGVtZW50IHRvIGNoZWNrLlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIC0gVGhlIGNsYXNzIHRvIHNlYXJjaC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgc3BlY2lhbCBjbGFzcyB3YXMgZm91bmQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNDbGFzcyhlbGVtZW50LCB2YWx1ZSkge1xuICByZXR1cm4gZWxlbWVudC5jbGFzc0xpc3RcbiAgICA/IGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKHZhbHVlKVxuICAgIDogZWxlbWVudC5jbGFzc05hbWUuaW5kZXhPZih2YWx1ZSkgPiAtMTtcbn1cblxuLyoqXG4gKiBBZGQgY2xhc3NlcyB0byB0aGUgZ2l2ZW4gZWxlbWVudC5cbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCAtIFRoZSB0YXJnZXQgZWxlbWVudC5cbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAtIFRoZSBjbGFzc2VzIHRvIGJlIGFkZGVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkQ2xhc3MoZWxlbWVudCwgdmFsdWUpIHtcbiAgaWYgKCF2YWx1ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChpc051bWJlcihlbGVtZW50Lmxlbmd0aCkpIHtcbiAgICBmb3JFYWNoKGVsZW1lbnQsIChlbGVtKSA9PiB7XG4gICAgICBhZGRDbGFzcyhlbGVtLCB2YWx1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0KSB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKHZhbHVlKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBjbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZS50cmltKCk7XG5cbiAgaWYgKCFjbGFzc05hbWUpIHtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9IHZhbHVlO1xuICB9IGVsc2UgaWYgKGNsYXNzTmFtZS5pbmRleE9mKHZhbHVlKSA8IDApIHtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGAke2NsYXNzTmFtZX0gJHt2YWx1ZX1gO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlIGNsYXNzZXMgZnJvbSB0aGUgZ2l2ZW4gZWxlbWVudC5cbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCAtIFRoZSB0YXJnZXQgZWxlbWVudC5cbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAtIFRoZSBjbGFzc2VzIHRvIGJlIHJlbW92ZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVDbGFzcyhlbGVtZW50LCB2YWx1ZSkge1xuICBpZiAoIXZhbHVlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGlzTnVtYmVyKGVsZW1lbnQubGVuZ3RoKSkge1xuICAgIGZvckVhY2goZWxlbWVudCwgKGVsZW0pID0+IHtcbiAgICAgIHJlbW92ZUNsYXNzKGVsZW0sIHZhbHVlKTtcbiAgICB9KTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoZWxlbWVudC5jbGFzc0xpc3QpIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodmFsdWUpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChlbGVtZW50LmNsYXNzTmFtZS5pbmRleE9mKHZhbHVlKSA+PSAwKSB7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKHZhbHVlLCAnJyk7XG4gIH1cbn1cblxuLyoqXG4gKiBBZGQgb3IgcmVtb3ZlIGNsYXNzZXMgZnJvbSB0aGUgZ2l2ZW4gZWxlbWVudC5cbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCAtIFRoZSB0YXJnZXQgZWxlbWVudC5cbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAtIFRoZSBjbGFzc2VzIHRvIGJlIHRvZ2dsZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGFkZGVkIC0gQWRkIG9ubHkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVDbGFzcyhlbGVtZW50LCB2YWx1ZSwgYWRkZWQpIHtcbiAgaWYgKCF2YWx1ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChpc051bWJlcihlbGVtZW50Lmxlbmd0aCkpIHtcbiAgICBmb3JFYWNoKGVsZW1lbnQsIChlbGVtKSA9PiB7XG4gICAgICB0b2dnbGVDbGFzcyhlbGVtLCB2YWx1ZSwgYWRkZWQpO1xuICAgIH0pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIElFMTAtMTEgZG9lc24ndCBzdXBwb3J0IHRoZSBzZWNvbmQgcGFyYW1ldGVyIG9mIGBjbGFzc0xpc3QudG9nZ2xlYFxuICBpZiAoYWRkZWQpIHtcbiAgICBhZGRDbGFzcyhlbGVtZW50LCB2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgdmFsdWUpO1xuICB9XG59XG5cbmNvbnN0IFJFR0VYUF9DQU1FTF9DQVNFID0gLyhbYS16XFxkXSkoW0EtWl0pL2c7XG5cbi8qKlxuICogVHJhbnNmb3JtIHRoZSBnaXZlbiBzdHJpbmcgZnJvbSBjYW1lbENhc2UgdG8ga2ViYWItY2FzZVxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIC0gVGhlIHZhbHVlIHRvIHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSB0cmFuc2Zvcm1lZCB2YWx1ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvUGFyYW1DYXNlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZS5yZXBsYWNlKFJFR0VYUF9DQU1FTF9DQVNFLCAnJDEtJDInKS50b0xvd2VyQ2FzZSgpO1xufVxuXG4vKipcbiAqIEdldCBkYXRhIGZyb20gdGhlIGdpdmVuIGVsZW1lbnQuXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgLSBUaGUgdGFyZ2V0IGVsZW1lbnQuXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBkYXRhIGtleSB0byBnZXQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZGF0YSB2YWx1ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldERhdGEoZWxlbWVudCwgbmFtZSkge1xuICBpZiAoaXNPYmplY3QoZWxlbWVudFtuYW1lXSkpIHtcbiAgICByZXR1cm4gZWxlbWVudFtuYW1lXTtcbiAgfVxuXG4gIGlmIChlbGVtZW50LmRhdGFzZXQpIHtcbiAgICByZXR1cm4gZWxlbWVudC5kYXRhc2V0W25hbWVdO1xuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnQuZ2V0QXR0cmlidXRlKGBkYXRhLSR7dG9QYXJhbUNhc2UobmFtZSl9YCk7XG59XG5cbi8qKlxuICogU2V0IGRhdGEgdG8gdGhlIGdpdmVuIGVsZW1lbnQuXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgLSBUaGUgdGFyZ2V0IGVsZW1lbnQuXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBkYXRhIGtleSB0byBzZXQuXG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0YSAtIFRoZSBkYXRhIHZhbHVlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0RGF0YShlbGVtZW50LCBuYW1lLCBkYXRhKSB7XG4gIGlmIChpc09iamVjdChkYXRhKSkge1xuICAgIGVsZW1lbnRbbmFtZV0gPSBkYXRhO1xuICB9IGVsc2UgaWYgKGVsZW1lbnQuZGF0YXNldCkge1xuICAgIGVsZW1lbnQuZGF0YXNldFtuYW1lXSA9IGRhdGE7XG4gIH0gZWxzZSB7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoYGRhdGEtJHt0b1BhcmFtQ2FzZShuYW1lKX1gLCBkYXRhKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZSBkYXRhIGZyb20gdGhlIGdpdmVuIGVsZW1lbnQuXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgLSBUaGUgdGFyZ2V0IGVsZW1lbnQuXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBkYXRhIGtleSB0byByZW1vdmUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVEYXRhKGVsZW1lbnQsIG5hbWUpIHtcbiAgaWYgKGlzT2JqZWN0KGVsZW1lbnRbbmFtZV0pKSB7XG4gICAgdHJ5IHtcbiAgICAgIGRlbGV0ZSBlbGVtZW50W25hbWVdO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBlbGVtZW50W25hbWVdID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfSBlbHNlIGlmIChlbGVtZW50LmRhdGFzZXQpIHtcbiAgICAvLyAjMTI4IFNhZmFyaSBub3QgYWxsb3dzIHRvIGRlbGV0ZSBkYXRhc2V0IHByb3BlcnR5XG4gICAgdHJ5IHtcbiAgICAgIGRlbGV0ZSBlbGVtZW50LmRhdGFzZXRbbmFtZV07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGVsZW1lbnQuZGF0YXNldFtuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYGRhdGEtJHt0b1BhcmFtQ2FzZShuYW1lKX1gKTtcbiAgfVxufVxuXG5jb25zdCBSRUdFWFBfU1BBQ0VTID0gL1xcc1xccyovO1xuY29uc3Qgb25jZVN1cHBvcnRlZCA9ICgoKSA9PiB7XG4gIGxldCBzdXBwb3J0ZWQgPSBmYWxzZTtcblxuICBpZiAoSVNfQlJPV1NFUikge1xuICAgIGxldCBvbmNlID0gZmFsc2U7XG4gICAgY29uc3QgbGlzdGVuZXIgPSAoKSA9PiB7fTtcbiAgICBjb25zdCBvcHRpb25zID0gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnb25jZScsIHtcbiAgICAgIGdldCgpIHtcbiAgICAgICAgc3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIG9uY2U7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIFRoaXMgc2V0dGVyIGNhbiBmaXggYSBgVHlwZUVycm9yYCBpbiBzdHJpY3QgbW9kZVxuICAgICAgICoge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0Vycm9ycy9HZXR0ZXJfb25seX1cbiAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gc2V0XG4gICAgICAgKi9cbiAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICBvbmNlID0gdmFsdWU7XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgV0lORE9XLmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBsaXN0ZW5lciwgb3B0aW9ucyk7XG4gICAgV0lORE9XLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBsaXN0ZW5lciwgb3B0aW9ucyk7XG4gIH1cblxuICByZXR1cm4gc3VwcG9ydGVkO1xufSkoKTtcblxuLyoqXG4gKiBSZW1vdmUgZXZlbnQgbGlzdGVuZXIgZnJvbSB0aGUgdGFyZ2V0IGVsZW1lbnQuXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgLSBUaGUgZXZlbnQgdGFyZ2V0LlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSBUaGUgZXZlbnQgdHlwZShzKS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIC0gVGhlIGV2ZW50IGxpc3RlbmVyLlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgZXZlbnQgb3B0aW9ucy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKGVsZW1lbnQsIHR5cGUsIGxpc3RlbmVyLCBvcHRpb25zID0ge30pIHtcbiAgbGV0IGhhbmRsZXIgPSBsaXN0ZW5lcjtcblxuICB0eXBlLnRyaW0oKS5zcGxpdChSRUdFWFBfU1BBQ0VTKS5mb3JFYWNoKChldmVudCkgPT4ge1xuICAgIGlmICghb25jZVN1cHBvcnRlZCkge1xuICAgICAgY29uc3QgeyBsaXN0ZW5lcnMgfSA9IGVsZW1lbnQ7XG5cbiAgICAgIGlmIChsaXN0ZW5lcnMgJiYgbGlzdGVuZXJzW2V2ZW50XSAmJiBsaXN0ZW5lcnNbZXZlbnRdW2xpc3RlbmVyXSkge1xuICAgICAgICBoYW5kbGVyID0gbGlzdGVuZXJzW2V2ZW50XVtsaXN0ZW5lcl07XG4gICAgICAgIGRlbGV0ZSBsaXN0ZW5lcnNbZXZlbnRdW2xpc3RlbmVyXTtcblxuICAgICAgICBpZiAoT2JqZWN0LmtleXMobGlzdGVuZXJzW2V2ZW50XSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgZGVsZXRlIGxpc3RlbmVyc1tldmVudF07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoT2JqZWN0LmtleXMobGlzdGVuZXJzKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBkZWxldGUgZWxlbWVudC5saXN0ZW5lcnM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpO1xuICB9KTtcbn1cblxuLyoqXG4gKiBBZGQgZXZlbnQgbGlzdGVuZXIgdG8gdGhlIHRhcmdldCBlbGVtZW50LlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IC0gVGhlIGV2ZW50IHRhcmdldC5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gVGhlIGV2ZW50IHR5cGUocykuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciAtIFRoZSBldmVudCBsaXN0ZW5lci5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIGV2ZW50IG9wdGlvbnMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGRMaXN0ZW5lcihlbGVtZW50LCB0eXBlLCBsaXN0ZW5lciwgb3B0aW9ucyA9IHt9KSB7XG4gIGxldCBoYW5kbGVyID0gbGlzdGVuZXI7XG5cbiAgdHlwZS50cmltKCkuc3BsaXQoUkVHRVhQX1NQQUNFUykuZm9yRWFjaCgoZXZlbnQpID0+IHtcbiAgICBpZiAob3B0aW9ucy5vbmNlICYmICFvbmNlU3VwcG9ydGVkKSB7XG4gICAgICBjb25zdCB7IGxpc3RlbmVycyA9IHt9IH0gPSBlbGVtZW50O1xuXG4gICAgICBoYW5kbGVyID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgZGVsZXRlIGxpc3RlbmVyc1tldmVudF1bbGlzdGVuZXJdO1xuICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpO1xuICAgICAgICBsaXN0ZW5lci5hcHBseShlbGVtZW50LCBhcmdzKTtcbiAgICAgIH07XG5cbiAgICAgIGlmICghbGlzdGVuZXJzW2V2ZW50XSkge1xuICAgICAgICBsaXN0ZW5lcnNbZXZlbnRdID0ge307XG4gICAgICB9XG5cbiAgICAgIGlmIChsaXN0ZW5lcnNbZXZlbnRdW2xpc3RlbmVyXSkge1xuICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyc1tldmVudF1bbGlzdGVuZXJdLCBvcHRpb25zKTtcbiAgICAgIH1cblxuICAgICAgbGlzdGVuZXJzW2V2ZW50XVtsaXN0ZW5lcl0gPSBoYW5kbGVyO1xuICAgICAgZWxlbWVudC5saXN0ZW5lcnMgPSBsaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKTtcbiAgfSk7XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggZXZlbnQgb24gdGhlIHRhcmdldCBlbGVtZW50LlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IC0gVGhlIGV2ZW50IHRhcmdldC5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gVGhlIGV2ZW50IHR5cGUocykuXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIFRoZSBhZGRpdGlvbmFsIGV2ZW50IGRhdGEuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gSW5kaWNhdGUgaWYgdGhlIGV2ZW50IGlzIGRlZmF1bHQgcHJldmVudGVkIG9yIG5vdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpc3BhdGNoRXZlbnQoZWxlbWVudCwgdHlwZSwgZGF0YSkge1xuICBsZXQgZXZlbnQ7XG5cbiAgLy8gRXZlbnQgYW5kIEN1c3RvbUV2ZW50IG9uIElFOS0xMSBhcmUgZ2xvYmFsIG9iamVjdHMsIG5vdCBjb25zdHJ1Y3RvcnNcbiAgaWYgKGlzRnVuY3Rpb24oRXZlbnQpICYmIGlzRnVuY3Rpb24oQ3VzdG9tRXZlbnQpKSB7XG4gICAgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQodHlwZSwge1xuICAgICAgZGV0YWlsOiBkYXRhLFxuICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICBldmVudC5pbml0Q3VzdG9tRXZlbnQodHlwZSwgdHJ1ZSwgdHJ1ZSwgZGF0YSk7XG4gIH1cblxuICByZXR1cm4gZWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIG9mZnNldCBiYXNlIG9uIHRoZSBkb2N1bWVudC5cbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCAtIFRoZSB0YXJnZXQgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBvZmZzZXQgZGF0YS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE9mZnNldChlbGVtZW50KSB7XG4gIGNvbnN0IGJveCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgcmV0dXJuIHtcbiAgICBsZWZ0OiBib3gubGVmdCArICh3aW5kb3cucGFnZVhPZmZzZXQgLSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50TGVmdCksXG4gICAgdG9wOiBib3gudG9wICsgKHdpbmRvdy5wYWdlWU9mZnNldCAtIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRUb3ApLFxuICB9O1xufVxuXG5jb25zdCB7IGxvY2F0aW9uIH0gPSBXSU5ET1c7XG5jb25zdCBSRUdFWFBfT1JJR0lOUyA9IC9eKFxcdys6KVxcL1xcLyhbXjovPyNdKik6PyhcXGQqKS9pO1xuXG4vKipcbiAqIENoZWNrIGlmIHRoZSBnaXZlbiBVUkwgaXMgYSBjcm9zcyBvcmlnaW4gVVJMLlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCAtIFRoZSB0YXJnZXQgVVJMLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBnaXZlbiBVUkwgaXMgYSBjcm9zcyBvcmlnaW4gVVJMLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0Nyb3NzT3JpZ2luVVJMKHVybCkge1xuICBjb25zdCBwYXJ0cyA9IHVybC5tYXRjaChSRUdFWFBfT1JJR0lOUyk7XG5cbiAgcmV0dXJuIHBhcnRzICE9PSBudWxsICYmIChcbiAgICBwYXJ0c1sxXSAhPT0gbG9jYXRpb24ucHJvdG9jb2xcbiAgICB8fCBwYXJ0c1syXSAhPT0gbG9jYXRpb24uaG9zdG5hbWVcbiAgICB8fCBwYXJ0c1szXSAhPT0gbG9jYXRpb24ucG9ydFxuICApO1xufVxuXG4vKipcbiAqIEFkZCB0aW1lc3RhbXAgdG8gdGhlIGdpdmVuIFVSTC5cbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSBUaGUgdGFyZ2V0IFVSTC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSByZXN1bHQgVVJMLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkVGltZXN0YW1wKHVybCkge1xuICBjb25zdCB0aW1lc3RhbXAgPSBgdGltZXN0YW1wPSR7KG5ldyBEYXRlKCkpLmdldFRpbWUoKX1gO1xuXG4gIHJldHVybiB1cmwgKyAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgdGltZXN0YW1wO1xufVxuXG4vKipcbiAqIEdldCB0cmFuc2Zvcm1zIGJhc2Ugb24gdGhlIGdpdmVuIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogLSBUaGUgdGFyZ2V0IG9iamVjdC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IEEgc3RyaW5nIGNvbnRhaW5zIHRyYW5zZm9ybSB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc2Zvcm1zKHtcbiAgcm90YXRlLFxuICBzY2FsZVgsXG4gIHNjYWxlWSxcbiAgdHJhbnNsYXRlWCxcbiAgdHJhbnNsYXRlWSxcbn0pIHtcbiAgY29uc3QgdmFsdWVzID0gW107XG5cbiAgaWYgKGlzTnVtYmVyKHRyYW5zbGF0ZVgpICYmIHRyYW5zbGF0ZVggIT09IDApIHtcbiAgICB2YWx1ZXMucHVzaChgdHJhbnNsYXRlWCgke3RyYW5zbGF0ZVh9cHgpYCk7XG4gIH1cblxuICBpZiAoaXNOdW1iZXIodHJhbnNsYXRlWSkgJiYgdHJhbnNsYXRlWSAhPT0gMCkge1xuICAgIHZhbHVlcy5wdXNoKGB0cmFuc2xhdGVZKCR7dHJhbnNsYXRlWX1weClgKTtcbiAgfVxuXG4gIC8vIFJvdGF0ZSBzaG91bGQgY29tZSBmaXJzdCBiZWZvcmUgc2NhbGUgdG8gbWF0Y2ggb3JpZW50YXRpb24gdHJhbnNmb3JtXG4gIGlmIChpc051bWJlcihyb3RhdGUpICYmIHJvdGF0ZSAhPT0gMCkge1xuICAgIHZhbHVlcy5wdXNoKGByb3RhdGUoJHtyb3RhdGV9ZGVnKWApO1xuICB9XG5cbiAgaWYgKGlzTnVtYmVyKHNjYWxlWCkgJiYgc2NhbGVYICE9PSAxKSB7XG4gICAgdmFsdWVzLnB1c2goYHNjYWxlWCgke3NjYWxlWH0pYCk7XG4gIH1cblxuICBpZiAoaXNOdW1iZXIoc2NhbGVZKSAmJiBzY2FsZVkgIT09IDEpIHtcbiAgICB2YWx1ZXMucHVzaChgc2NhbGVZKCR7c2NhbGVZfSlgKTtcbiAgfVxuXG4gIGNvbnN0IHRyYW5zZm9ybSA9IHZhbHVlcy5sZW5ndGggPyB2YWx1ZXMuam9pbignICcpIDogJ25vbmUnO1xuXG4gIHJldHVybiB7XG4gICAgV2Via2l0VHJhbnNmb3JtOiB0cmFuc2Zvcm0sXG4gICAgbXNUcmFuc2Zvcm06IHRyYW5zZm9ybSxcbiAgICB0cmFuc2Zvcm0sXG4gIH07XG59XG5cbi8qKlxuICogR2V0IHRoZSBtYXggcmF0aW8gb2YgYSBncm91cCBvZiBwb2ludGVycy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwb2ludGVycyAtIFRoZSB0YXJnZXQgcG9pbnRlcnMuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgcmVzdWx0IHJhdGlvLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWF4Wm9vbVJhdGlvKHBvaW50ZXJzKSB7XG4gIGNvbnN0IHBvaW50ZXJzMiA9IGFzc2lnbih7fSwgcG9pbnRlcnMpO1xuICBjb25zdCByYXRpb3MgPSBbXTtcblxuICBmb3JFYWNoKHBvaW50ZXJzLCAocG9pbnRlciwgcG9pbnRlcklkKSA9PiB7XG4gICAgZGVsZXRlIHBvaW50ZXJzMltwb2ludGVySWRdO1xuXG4gICAgZm9yRWFjaChwb2ludGVyczIsIChwb2ludGVyMikgPT4ge1xuICAgICAgY29uc3QgeDEgPSBNYXRoLmFicyhwb2ludGVyLnN0YXJ0WCAtIHBvaW50ZXIyLnN0YXJ0WCk7XG4gICAgICBjb25zdCB5MSA9IE1hdGguYWJzKHBvaW50ZXIuc3RhcnRZIC0gcG9pbnRlcjIuc3RhcnRZKTtcbiAgICAgIGNvbnN0IHgyID0gTWF0aC5hYnMocG9pbnRlci5lbmRYIC0gcG9pbnRlcjIuZW5kWCk7XG4gICAgICBjb25zdCB5MiA9IE1hdGguYWJzKHBvaW50ZXIuZW5kWSAtIHBvaW50ZXIyLmVuZFkpO1xuICAgICAgY29uc3QgejEgPSBNYXRoLnNxcnQoKHgxICogeDEpICsgKHkxICogeTEpKTtcbiAgICAgIGNvbnN0IHoyID0gTWF0aC5zcXJ0KCh4MiAqIHgyKSArICh5MiAqIHkyKSk7XG4gICAgICBjb25zdCByYXRpbyA9ICh6MiAtIHoxKSAvIHoxO1xuXG4gICAgICByYXRpb3MucHVzaChyYXRpbyk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJhdGlvcy5zb3J0KChhLCBiKSA9PiBNYXRoLmFicyhhKSA8IE1hdGguYWJzKGIpKTtcblxuICByZXR1cm4gcmF0aW9zWzBdO1xufVxuXG4vKipcbiAqIEdldCBhIHBvaW50ZXIgZnJvbSBhbiBldmVudCBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgLSBUaGUgdGFyZ2V0IGV2ZW50IG9iamVjdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gZW5kT25seSAtIEluZGljYXRlcyBpZiBvbmx5IHJldHVybnMgdGhlIGVuZCBwb2ludCBjb29yZGluYXRlIG9yIG5vdC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSByZXN1bHQgcG9pbnRlciBjb250YWlucyBzdGFydCBhbmQvb3IgZW5kIHBvaW50IGNvb3JkaW5hdGVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0UG9pbnRlcih7IHBhZ2VYLCBwYWdlWSB9LCBlbmRPbmx5KSB7XG4gIGNvbnN0IGVuZCA9IHtcbiAgICBlbmRYOiBwYWdlWCxcbiAgICBlbmRZOiBwYWdlWSxcbiAgfTtcblxuICByZXR1cm4gZW5kT25seSA/IGVuZCA6IGFzc2lnbih7XG4gICAgc3RhcnRYOiBwYWdlWCxcbiAgICBzdGFydFk6IHBhZ2VZLFxuICB9LCBlbmQpO1xufVxuXG4vKipcbiAqIEdldCB0aGUgY2VudGVyIHBvaW50IGNvb3JkaW5hdGUgb2YgYSBncm91cCBvZiBwb2ludGVycy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludGVycyAtIFRoZSB0YXJnZXQgcG9pbnRlcnMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgY2VudGVyIHBvaW50IGNvb3JkaW5hdGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRQb2ludGVyc0NlbnRlcihwb2ludGVycykge1xuICBsZXQgcGFnZVggPSAwO1xuICBsZXQgcGFnZVkgPSAwO1xuICBsZXQgY291bnQgPSAwO1xuXG4gIGZvckVhY2gocG9pbnRlcnMsICh7IHN0YXJ0WCwgc3RhcnRZIH0pID0+IHtcbiAgICBwYWdlWCArPSBzdGFydFg7XG4gICAgcGFnZVkgKz0gc3RhcnRZO1xuICAgIGNvdW50ICs9IDE7XG4gIH0pO1xuXG4gIHBhZ2VYIC89IGNvdW50O1xuICBwYWdlWSAvPSBjb3VudDtcblxuICByZXR1cm4ge1xuICAgIHBhZ2VYLFxuICAgIHBhZ2VZLFxuICB9O1xufVxuXG4vKipcbiAqIEdldCB0aGUgbWF4IHNpemVzIGluIGEgcmVjdGFuZ2xlIHVuZGVyIHRoZSBnaXZlbiBhc3BlY3QgcmF0aW8uXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIFRoZSBvcmlnaW5hbCBzaXplcy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbdHlwZT0nY29udGFpbiddIC0gVGhlIGFkanVzdCB0eXBlLlxuICogQHJldHVybnMge09iamVjdH0gVGhlIHJlc3VsdCBzaXplcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEFkanVzdGVkU2l6ZXMoXG4gIHtcbiAgICBhc3BlY3RSYXRpbyxcbiAgICBoZWlnaHQsXG4gICAgd2lkdGgsXG4gIH0sXG4gIHR5cGUgPSAnY29udGFpbicsIC8vIG9yICdjb3Zlcidcbikge1xuICBjb25zdCBpc1ZhbGlkV2lkdGggPSBpc1Bvc2l0aXZlTnVtYmVyKHdpZHRoKTtcbiAgY29uc3QgaXNWYWxpZEhlaWdodCA9IGlzUG9zaXRpdmVOdW1iZXIoaGVpZ2h0KTtcblxuICBpZiAoaXNWYWxpZFdpZHRoICYmIGlzVmFsaWRIZWlnaHQpIHtcbiAgICBjb25zdCBhZGp1c3RlZFdpZHRoID0gaGVpZ2h0ICogYXNwZWN0UmF0aW87XG5cbiAgICBpZiAoKHR5cGUgPT09ICdjb250YWluJyAmJiBhZGp1c3RlZFdpZHRoID4gd2lkdGgpIHx8ICh0eXBlID09PSAnY292ZXInICYmIGFkanVzdGVkV2lkdGggPCB3aWR0aCkpIHtcbiAgICAgIGhlaWdodCA9IHdpZHRoIC8gYXNwZWN0UmF0aW87XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpZHRoID0gaGVpZ2h0ICogYXNwZWN0UmF0aW87XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzVmFsaWRXaWR0aCkge1xuICAgIGhlaWdodCA9IHdpZHRoIC8gYXNwZWN0UmF0aW87XG4gIH0gZWxzZSBpZiAoaXNWYWxpZEhlaWdodCkge1xuICAgIHdpZHRoID0gaGVpZ2h0ICogYXNwZWN0UmF0aW87XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHdpZHRoLFxuICAgIGhlaWdodCxcbiAgfTtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIG5ldyBzaXplcyBvZiBhIHJlY3RhbmdsZSBhZnRlciByb3RhdGVkLlxuICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBUaGUgb3JpZ2luYWwgc2l6ZXMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgcmVzdWx0IHNpemVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Um90YXRlZFNpemVzKHsgd2lkdGgsIGhlaWdodCwgZGVncmVlIH0pIHtcbiAgZGVncmVlID0gTWF0aC5hYnMoZGVncmVlKSAlIDE4MDtcblxuICBpZiAoZGVncmVlID09PSA5MCkge1xuICAgIHJldHVybiB7XG4gICAgICB3aWR0aDogaGVpZ2h0LFxuICAgICAgaGVpZ2h0OiB3aWR0aCxcbiAgICB9O1xuICB9XG5cbiAgY29uc3QgYXJjID0gKChkZWdyZWUgJSA5MCkgKiBNYXRoLlBJKSAvIDE4MDtcbiAgY29uc3Qgc2luQXJjID0gTWF0aC5zaW4oYXJjKTtcbiAgY29uc3QgY29zQXJjID0gTWF0aC5jb3MoYXJjKTtcbiAgY29uc3QgbmV3V2lkdGggPSAod2lkdGggKiBjb3NBcmMpICsgKGhlaWdodCAqIHNpbkFyYyk7XG4gIGNvbnN0IG5ld0hlaWdodCA9ICh3aWR0aCAqIHNpbkFyYykgKyAoaGVpZ2h0ICogY29zQXJjKTtcblxuICByZXR1cm4gZGVncmVlID4gOTAgPyB7XG4gICAgd2lkdGg6IG5ld0hlaWdodCxcbiAgICBoZWlnaHQ6IG5ld1dpZHRoLFxuICB9IDoge1xuICAgIHdpZHRoOiBuZXdXaWR0aCxcbiAgICBoZWlnaHQ6IG5ld0hlaWdodCxcbiAgfTtcbn1cblxuLyoqXG4gKiBHZXQgYSBjYW52YXMgd2hpY2ggZHJldyB0aGUgZ2l2ZW4gaW1hZ2UuXG4gKiBAcGFyYW0ge0hUTUxJbWFnZUVsZW1lbnR9IGltYWdlIC0gVGhlIGltYWdlIGZvciBkcmF3aW5nLlxuICogQHBhcmFtIHtPYmplY3R9IGltYWdlRGF0YSAtIFRoZSBpbWFnZSBkYXRhLlxuICogQHBhcmFtIHtPYmplY3R9IGNhbnZhc0RhdGEgLSBUaGUgY2FudmFzIGRhdGEuXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zLlxuICogQHJldHVybnMge0hUTUxDYW52YXNFbGVtZW50fSBUaGUgcmVzdWx0IGNhbnZhcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNvdXJjZUNhbnZhcyhcbiAgaW1hZ2UsXG4gIHtcbiAgICBhc3BlY3RSYXRpbzogaW1hZ2VBc3BlY3RSYXRpbyxcbiAgICBuYXR1cmFsV2lkdGg6IGltYWdlTmF0dXJhbFdpZHRoLFxuICAgIG5hdHVyYWxIZWlnaHQ6IGltYWdlTmF0dXJhbEhlaWdodCxcbiAgICByb3RhdGUgPSAwLFxuICAgIHNjYWxlWCA9IDEsXG4gICAgc2NhbGVZID0gMSxcbiAgfSxcbiAge1xuICAgIGFzcGVjdFJhdGlvLFxuICAgIG5hdHVyYWxXaWR0aCxcbiAgICBuYXR1cmFsSGVpZ2h0LFxuICB9LFxuICB7XG4gICAgZmlsbENvbG9yID0gJ3RyYW5zcGFyZW50JyxcbiAgICBpbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0cnVlLFxuICAgIGltYWdlU21vb3RoaW5nUXVhbGl0eSA9ICdsb3cnLFxuICAgIG1heFdpZHRoID0gSW5maW5pdHksXG4gICAgbWF4SGVpZ2h0ID0gSW5maW5pdHksXG4gICAgbWluV2lkdGggPSAwLFxuICAgIG1pbkhlaWdodCA9IDAsXG4gIH0sXG4pIHtcbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgY29uc3QgbWF4U2l6ZXMgPSBnZXRBZGp1c3RlZFNpemVzKHtcbiAgICBhc3BlY3RSYXRpbyxcbiAgICB3aWR0aDogbWF4V2lkdGgsXG4gICAgaGVpZ2h0OiBtYXhIZWlnaHQsXG4gIH0pO1xuICBjb25zdCBtaW5TaXplcyA9IGdldEFkanVzdGVkU2l6ZXMoe1xuICAgIGFzcGVjdFJhdGlvLFxuICAgIHdpZHRoOiBtaW5XaWR0aCxcbiAgICBoZWlnaHQ6IG1pbkhlaWdodCxcbiAgfSwgJ2NvdmVyJyk7XG4gIGNvbnN0IHdpZHRoID0gTWF0aC5taW4obWF4U2l6ZXMud2lkdGgsIE1hdGgubWF4KG1pblNpemVzLndpZHRoLCBuYXR1cmFsV2lkdGgpKTtcbiAgY29uc3QgaGVpZ2h0ID0gTWF0aC5taW4obWF4U2l6ZXMuaGVpZ2h0LCBNYXRoLm1heChtaW5TaXplcy5oZWlnaHQsIG5hdHVyYWxIZWlnaHQpKTtcblxuICAvLyBOb3RlOiBzaG91bGQgYWx3YXlzIHVzZSBpbWFnZSdzIG5hdHVyYWwgc2l6ZXMgZm9yIGRyYXdpbmcgYXNcbiAgLy8gaW1hZ2VEYXRhLm5hdHVyYWxXaWR0aCA9PT0gY2FudmFzRGF0YS5uYXR1cmFsSGVpZ2h0IHdoZW4gcm90YXRlICUgMTgwID09PSA5MFxuICBjb25zdCBkZXN0TWF4U2l6ZXMgPSBnZXRBZGp1c3RlZFNpemVzKHtcbiAgICBhc3BlY3RSYXRpbzogaW1hZ2VBc3BlY3RSYXRpbyxcbiAgICB3aWR0aDogbWF4V2lkdGgsXG4gICAgaGVpZ2h0OiBtYXhIZWlnaHQsXG4gIH0pO1xuICBjb25zdCBkZXN0TWluU2l6ZXMgPSBnZXRBZGp1c3RlZFNpemVzKHtcbiAgICBhc3BlY3RSYXRpbzogaW1hZ2VBc3BlY3RSYXRpbyxcbiAgICB3aWR0aDogbWluV2lkdGgsXG4gICAgaGVpZ2h0OiBtaW5IZWlnaHQsXG4gIH0sICdjb3ZlcicpO1xuICBjb25zdCBkZXN0V2lkdGggPSBNYXRoLm1pbihcbiAgICBkZXN0TWF4U2l6ZXMud2lkdGgsXG4gICAgTWF0aC5tYXgoZGVzdE1pblNpemVzLndpZHRoLCBpbWFnZU5hdHVyYWxXaWR0aCksXG4gICk7XG4gIGNvbnN0IGRlc3RIZWlnaHQgPSBNYXRoLm1pbihcbiAgICBkZXN0TWF4U2l6ZXMuaGVpZ2h0LFxuICAgIE1hdGgubWF4KGRlc3RNaW5TaXplcy5oZWlnaHQsIGltYWdlTmF0dXJhbEhlaWdodCksXG4gICk7XG4gIGNvbnN0IHBhcmFtcyA9IFtcbiAgICAtZGVzdFdpZHRoIC8gMixcbiAgICAtZGVzdEhlaWdodCAvIDIsXG4gICAgZGVzdFdpZHRoLFxuICAgIGRlc3RIZWlnaHQsXG4gIF07XG5cbiAgY2FudmFzLndpZHRoID0gbm9ybWFsaXplRGVjaW1hbE51bWJlcih3aWR0aCk7XG4gIGNhbnZhcy5oZWlnaHQgPSBub3JtYWxpemVEZWNpbWFsTnVtYmVyKGhlaWdodCk7XG4gIGNvbnRleHQuZmlsbFN0eWxlID0gZmlsbENvbG9yO1xuICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICBjb250ZXh0LnNhdmUoKTtcbiAgY29udGV4dC50cmFuc2xhdGUod2lkdGggLyAyLCBoZWlnaHQgLyAyKTtcbiAgY29udGV4dC5yb3RhdGUoKHJvdGF0ZSAqIE1hdGguUEkpIC8gMTgwKTtcbiAgY29udGV4dC5zY2FsZShzY2FsZVgsIHNjYWxlWSk7XG4gIGNvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gaW1hZ2VTbW9vdGhpbmdFbmFibGVkO1xuICBjb250ZXh0LmltYWdlU21vb3RoaW5nUXVhbGl0eSA9IGltYWdlU21vb3RoaW5nUXVhbGl0eTtcbiAgY29udGV4dC5kcmF3SW1hZ2UoaW1hZ2UsIC4uLnBhcmFtcy5tYXAocGFyYW0gPT4gTWF0aC5mbG9vcihub3JtYWxpemVEZWNpbWFsTnVtYmVyKHBhcmFtKSkpKTtcbiAgY29udGV4dC5yZXN0b3JlKCk7XG4gIHJldHVybiBjYW52YXM7XG59XG5cbmNvbnN0IHsgZnJvbUNoYXJDb2RlIH0gPSBTdHJpbmc7XG5cbi8qKlxuICogR2V0IHN0cmluZyBmcm9tIGNoYXIgY29kZSBpbiBkYXRhIHZpZXcuXG4gKiBAcGFyYW0ge0RhdGFWaWV3fSBkYXRhVmlldyAtIFRoZSBkYXRhIHZpZXcgZm9yIHJlYWQuXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhcnQgLSBUaGUgc3RhcnQgaW5kZXguXG4gKiBAcGFyYW0ge251bWJlcn0gbGVuZ3RoIC0gVGhlIHJlYWQgbGVuZ3RoLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIHJlYWQgcmVzdWx0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RyaW5nRnJvbUNoYXJDb2RlKGRhdGFWaWV3LCBzdGFydCwgbGVuZ3RoKSB7XG4gIGxldCBzdHIgPSAnJztcblxuICBsZW5ndGggKz0gc3RhcnQ7XG5cbiAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICBzdHIgKz0gZnJvbUNoYXJDb2RlKGRhdGFWaWV3LmdldFVpbnQ4KGkpKTtcbiAgfVxuXG4gIHJldHVybiBzdHI7XG59XG5cbmNvbnN0IFJFR0VYUF9EQVRBX1VSTF9IRUFEID0gL15kYXRhOi4qLC87XG5cbi8qKlxuICogVHJhbnNmb3JtIERhdGEgVVJMIHRvIGFycmF5IGJ1ZmZlci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhVVJMIC0gVGhlIERhdGEgVVJMIHRvIHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtBcnJheUJ1ZmZlcn0gVGhlIHJlc3VsdCBhcnJheSBidWZmZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkYXRhVVJMVG9BcnJheUJ1ZmZlcihkYXRhVVJMKSB7XG4gIGNvbnN0IGJhc2U2NCA9IGRhdGFVUkwucmVwbGFjZShSRUdFWFBfREFUQV9VUkxfSEVBRCwgJycpO1xuICBjb25zdCBiaW5hcnkgPSBhdG9iKGJhc2U2NCk7XG4gIGNvbnN0IGFycmF5QnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKGJpbmFyeS5sZW5ndGgpO1xuICBjb25zdCB1aW50OCA9IG5ldyBVaW50OEFycmF5KGFycmF5QnVmZmVyKTtcblxuICBmb3JFYWNoKHVpbnQ4LCAodmFsdWUsIGkpID0+IHtcbiAgICB1aW50OFtpXSA9IGJpbmFyeS5jaGFyQ29kZUF0KGkpO1xuICB9KTtcblxuICByZXR1cm4gYXJyYXlCdWZmZXI7XG59XG5cbi8qKlxuICogVHJhbnNmb3JtIGFycmF5IGJ1ZmZlciB0byBEYXRhIFVSTC5cbiAqIEBwYXJhbSB7QXJyYXlCdWZmZXJ9IGFycmF5QnVmZmVyIC0gVGhlIGFycmF5IGJ1ZmZlciB0byB0cmFuc2Zvcm0uXG4gKiBAcGFyYW0ge3N0cmluZ30gbWltZVR5cGUgLSBUaGUgbWltZSB0eXBlIG9mIHRoZSBEYXRhIFVSTC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSByZXN1bHQgRGF0YSBVUkwuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcnJheUJ1ZmZlclRvRGF0YVVSTChhcnJheUJ1ZmZlciwgbWltZVR5cGUpIHtcbiAgY29uc3QgY2h1bmtzID0gW107XG5cbiAgLy8gQ2h1bmsgVHlwZWQgQXJyYXkgZm9yIGJldHRlciBwZXJmb3JtYW5jZSAoIzQzNSlcbiAgY29uc3QgY2h1bmtTaXplID0gODE5MjtcbiAgbGV0IHVpbnQ4ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlCdWZmZXIpO1xuXG4gIHdoaWxlICh1aW50OC5sZW5ndGggPiAwKSB7XG4gICAgLy8gWFhYOiBCYWJlbCdzIGB0b0NvbnN1bWFibGVBcnJheWAgaGVscGVyIHdpbGwgdGhyb3cgZXJyb3IgaW4gSUUgb3IgU2FmYXJpIDlcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLXNwcmVhZFxuICAgIGNodW5rcy5wdXNoKGZyb21DaGFyQ29kZS5hcHBseShudWxsLCB0b0FycmF5KHVpbnQ4LnN1YmFycmF5KDAsIGNodW5rU2l6ZSkpKSk7XG4gICAgdWludDggPSB1aW50OC5zdWJhcnJheShjaHVua1NpemUpO1xuICB9XG5cbiAgcmV0dXJuIGBkYXRhOiR7bWltZVR5cGV9O2Jhc2U2NCwke2J0b2EoY2h1bmtzLmpvaW4oJycpKX1gO1xufVxuXG4vKipcbiAqIEdldCBvcmllbnRhdGlvbiB2YWx1ZSBmcm9tIGdpdmVuIGFycmF5IGJ1ZmZlci5cbiAqIEBwYXJhbSB7QXJyYXlCdWZmZXJ9IGFycmF5QnVmZmVyIC0gVGhlIGFycmF5IGJ1ZmZlciB0byByZWFkLlxuICogQHJldHVybnMge251bWJlcn0gVGhlIHJlYWQgb3JpZW50YXRpb24gdmFsdWUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXNldEFuZEdldE9yaWVudGF0aW9uKGFycmF5QnVmZmVyKSB7XG4gIGNvbnN0IGRhdGFWaWV3ID0gbmV3IERhdGFWaWV3KGFycmF5QnVmZmVyKTtcbiAgbGV0IG9yaWVudGF0aW9uO1xuXG4gIC8vIElnbm9yZXMgcmFuZ2UgZXJyb3Igd2hlbiB0aGUgaW1hZ2UgZG9lcyBub3QgaGF2ZSBjb3JyZWN0IEV4aWYgaW5mb3JtYXRpb25cbiAgdHJ5IHtcbiAgICBsZXQgbGl0dGxlRW5kaWFuO1xuICAgIGxldCBhcHAxU3RhcnQ7XG4gICAgbGV0IGlmZFN0YXJ0O1xuXG4gICAgLy8gT25seSBoYW5kbGUgSlBFRyBpbWFnZSAoc3RhcnQgYnkgMHhGRkQ4KVxuICAgIGlmIChkYXRhVmlldy5nZXRVaW50OCgwKSA9PT0gMHhGRiAmJiBkYXRhVmlldy5nZXRVaW50OCgxKSA9PT0gMHhEOCkge1xuICAgICAgY29uc3QgbGVuZ3RoID0gZGF0YVZpZXcuYnl0ZUxlbmd0aDtcbiAgICAgIGxldCBvZmZzZXQgPSAyO1xuXG4gICAgICB3aGlsZSAob2Zmc2V0ICsgMSA8IGxlbmd0aCkge1xuICAgICAgICBpZiAoZGF0YVZpZXcuZ2V0VWludDgob2Zmc2V0KSA9PT0gMHhGRiAmJiBkYXRhVmlldy5nZXRVaW50OChvZmZzZXQgKyAxKSA9PT0gMHhFMSkge1xuICAgICAgICAgIGFwcDFTdGFydCA9IG9mZnNldDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIG9mZnNldCArPSAxO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChhcHAxU3RhcnQpIHtcbiAgICAgIGNvbnN0IGV4aWZJRENvZGUgPSBhcHAxU3RhcnQgKyA0O1xuICAgICAgY29uc3QgdGlmZk9mZnNldCA9IGFwcDFTdGFydCArIDEwO1xuXG4gICAgICBpZiAoZ2V0U3RyaW5nRnJvbUNoYXJDb2RlKGRhdGFWaWV3LCBleGlmSURDb2RlLCA0KSA9PT0gJ0V4aWYnKSB7XG4gICAgICAgIGNvbnN0IGVuZGlhbm5lc3MgPSBkYXRhVmlldy5nZXRVaW50MTYodGlmZk9mZnNldCk7XG5cbiAgICAgICAgbGl0dGxlRW5kaWFuID0gZW5kaWFubmVzcyA9PT0gMHg0OTQ5O1xuXG4gICAgICAgIGlmIChsaXR0bGVFbmRpYW4gfHwgZW5kaWFubmVzcyA9PT0gMHg0RDREIC8qIGJpZ0VuZGlhbiAqLykge1xuICAgICAgICAgIGlmIChkYXRhVmlldy5nZXRVaW50MTYodGlmZk9mZnNldCArIDIsIGxpdHRsZUVuZGlhbikgPT09IDB4MDAyQSkge1xuICAgICAgICAgICAgY29uc3QgZmlyc3RJRkRPZmZzZXQgPSBkYXRhVmlldy5nZXRVaW50MzIodGlmZk9mZnNldCArIDQsIGxpdHRsZUVuZGlhbik7XG5cbiAgICAgICAgICAgIGlmIChmaXJzdElGRE9mZnNldCA+PSAweDAwMDAwMDA4KSB7XG4gICAgICAgICAgICAgIGlmZFN0YXJ0ID0gdGlmZk9mZnNldCArIGZpcnN0SUZET2Zmc2V0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpZmRTdGFydCkge1xuICAgICAgY29uc3QgbGVuZ3RoID0gZGF0YVZpZXcuZ2V0VWludDE2KGlmZFN0YXJ0LCBsaXR0bGVFbmRpYW4pO1xuICAgICAgbGV0IG9mZnNldDtcbiAgICAgIGxldCBpO1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgb2Zmc2V0ID0gaWZkU3RhcnQgKyAoaSAqIDEyKSArIDI7XG5cbiAgICAgICAgaWYgKGRhdGFWaWV3LmdldFVpbnQxNihvZmZzZXQsIGxpdHRsZUVuZGlhbikgPT09IDB4MDExMiAvKiBPcmllbnRhdGlvbiAqLykge1xuICAgICAgICAgIC8vIDggaXMgdGhlIG9mZnNldCBvZiB0aGUgY3VycmVudCB0YWcncyB2YWx1ZVxuICAgICAgICAgIG9mZnNldCArPSA4O1xuXG4gICAgICAgICAgLy8gR2V0IHRoZSBvcmlnaW5hbCBvcmllbnRhdGlvbiB2YWx1ZVxuICAgICAgICAgIG9yaWVudGF0aW9uID0gZGF0YVZpZXcuZ2V0VWludDE2KG9mZnNldCwgbGl0dGxlRW5kaWFuKTtcblxuICAgICAgICAgIC8vIE92ZXJyaWRlIHRoZSBvcmllbnRhdGlvbiB3aXRoIGl0cyBkZWZhdWx0IHZhbHVlXG4gICAgICAgICAgZGF0YVZpZXcuc2V0VWludDE2KG9mZnNldCwgMSwgbGl0dGxlRW5kaWFuKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBvcmllbnRhdGlvbiA9IDE7XG4gIH1cblxuICByZXR1cm4gb3JpZW50YXRpb247XG59XG5cbi8qKlxuICogUGFyc2UgRXhpZiBPcmllbnRhdGlvbiB2YWx1ZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBvcmllbnRhdGlvbiAtIFRoZSBvcmllbnRhdGlvbiB0byBwYXJzZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBwYXJzZWQgcmVzdWx0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VPcmllbnRhdGlvbihvcmllbnRhdGlvbikge1xuICBsZXQgcm90YXRlID0gMDtcbiAgbGV0IHNjYWxlWCA9IDE7XG4gIGxldCBzY2FsZVkgPSAxO1xuXG4gIHN3aXRjaCAob3JpZW50YXRpb24pIHtcbiAgICAvLyBGbGlwIGhvcml6b250YWxcbiAgICBjYXNlIDI6XG4gICAgICBzY2FsZVggPSAtMTtcbiAgICAgIGJyZWFrO1xuXG4gICAgLy8gUm90YXRlIGxlZnQgMTgwwrBcbiAgICBjYXNlIDM6XG4gICAgICByb3RhdGUgPSAtMTgwO1xuICAgICAgYnJlYWs7XG5cbiAgICAvLyBGbGlwIHZlcnRpY2FsXG4gICAgY2FzZSA0OlxuICAgICAgc2NhbGVZID0gLTE7XG4gICAgICBicmVhaztcblxuICAgIC8vIEZsaXAgdmVydGljYWwgYW5kIHJvdGF0ZSByaWdodCA5MMKwXG4gICAgY2FzZSA1OlxuICAgICAgcm90YXRlID0gOTA7XG4gICAgICBzY2FsZVkgPSAtMTtcbiAgICAgIGJyZWFrO1xuXG4gICAgLy8gUm90YXRlIHJpZ2h0IDkwwrBcbiAgICBjYXNlIDY6XG4gICAgICByb3RhdGUgPSA5MDtcbiAgICAgIGJyZWFrO1xuXG4gICAgLy8gRmxpcCBob3Jpem9udGFsIGFuZCByb3RhdGUgcmlnaHQgOTDCsFxuICAgIGNhc2UgNzpcbiAgICAgIHJvdGF0ZSA9IDkwO1xuICAgICAgc2NhbGVYID0gLTE7XG4gICAgICBicmVhaztcblxuICAgIC8vIFJvdGF0ZSBsZWZ0IDkwwrBcbiAgICBjYXNlIDg6XG4gICAgICByb3RhdGUgPSAtOTA7XG4gICAgICBicmVhaztcblxuICAgIGRlZmF1bHQ6XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJvdGF0ZSxcbiAgICBzY2FsZVgsXG4gICAgc2NhbGVZLFxuICB9O1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==