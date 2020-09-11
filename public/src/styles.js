(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["styles"],{

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/styles.css":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--13-1!./node_modules/postcss-loader/src??embedded!./src/styles.css ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(true);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;500;700&display=swap);"]);
// Module
exports.push([module.i, "/* ngx-spinner{\n    position: absolute;\n} */\n\n.none-pointer{\n    pointer-events: none;\n}\n\n::-webkit-scrollbar{\n    width:12px;\n}\n\n::-webkit-scrollbar-thumb{\n    border-width:1px 1px 1px 2px;\n    border-color: #777;\n    background-color: #aaa;\n}\n\n::-webkit-scrollbar-thumb:hover{\n    border-width: 1px 1px 1px 2px;\n    border-color: #555;\n    background-color: #777;\n}\n\n::-webkit-scrollbar-track{\n    border-width:0;\n}\n\n::-webkit-scrollbar-track:hover{\n    border-left: solid 1px #aaa;\n    background-color: #eee;\n}\n\nhtml, body{\n    margin: 0;\n    padding: 0;\n    min-height:100vh;\n}\n\n.content{\n    background-image: url(\"/assets/img/background/header-back.png\");\n    background-size: cover;\n    background-repeat: no-repeat;\n    background-position: center center;\n    display: grid;\n    justify-items: center;\n    align-items: center;\n    width: 100%;\n    min-height: 100vh;\n    position: relative;\n}\n\n.admin-content{\n    background-image: none;\n    background-color: #21355B;\n}\n\n.blur{\n    filter: blur(2px);\n}\n\n*, select, input{\n    outline: none;\n    font-family: 'Montserrat', sans-serif !important;\n}\n\n@media (min-width: 1471px){\n    .standart-padding{\n        padding-right: 300px;\n        padding-left: 300px;\n    }\n}\n\n@media (min-width: 1267px) and (max-width: 1470px){\n    .standart-padding{\n        padding-right: 200px;\n        padding-left: 200px;\n    }\n    \n}\n\n@media (min-width: 1161px) and (max-width: 1266px){\n    .standart-padding{\n        padding-right: 150px;\n        padding-left: 150px;\n    }\n    \n}\n\n@media (max-width: 1160px){\n    .standart-padding{\n        padding-right: 50px;\n        padding-left: 50px;\n\n    }\n}\n\n.indent{\n    padding: 0px 400px;\n}\n\ndiv{\n    box-sizing: border-box;\n}\n\na, button, input[type=submit]{\n    cursor: pointer;\n    box-sizing: border-box;\n}\n\na{\n    text-decoration: none;\n    color: white;\n}\n\n.thin-style{\n    font-weight: 100;\n}\n\n.bold-style{\n    font-weight: 700;\n}\n\n.light-style{\n    font-weight: 300;\n}\n\n.regular-style{\n    font-weight: 400;\n}\n\n.medium-style{\n    font-weight: 500;\n}\n\n.semibold-style{\n    font-weight: 600;\n}\n\n.pointer{\n    cursor: pointer;\n}\n\n.relative{\n    position: relative;\n}\n\n.absolute{\n    position: absolute;\n}\n\n.font-24{\n    font-size: 24px;\n}\n\n.gradient{\n    align-self: center;\n    display: grid;\n    align-items: center;\n    background: linear-gradient(to left, #7a01ff, #e967ff, #69ecf3);\n    padding: 3px;\n    border-radius: 25px;\n}\n\n.nameOfDescript{\n    margin: 0px;\n    padding: 0px;\n    font-size: 30pt;\n}\n\n.window{\n    display: grid;\n    justify-items: center;\n    align-items: start;\n\n    position: relative;\n\n    padding: 3% 5%;\n    width: 55%;\n    height: 75%;\n    box-sizing: border-box;\n\n    background-color: #0F1D38;\n    border-radius: 30px;\n\n    color: white;\n}\n\n.admin-window{\n    width: 80%;\n    min-height: 80%;\n}\n\n@media(max-width: 700px){\n    .admin-window{\n        width: 100%;\n        height: 100%;\n        border-radius: 0%;\n\n    }\n}\n\n.discord-login-btn{\n    display: grid;\n    place-items: center;\n    justify-self: center;\n    align-self: center;\n    grid-template-columns: auto 1fr;\n    grid-column-gap: 9px;\n\n    padding: 7px 10px;\n    border-radius: 30px;\n    border: 2px solid #E5E5E5;\n\n    background-color: #21355B;\n    box-sizing: border-box;\n\n    font-size: 12px;\n    color: white;\n\n    margin: 0px 10px;\n    transition: 0.25s;\n}\n\n.discord-login-btn:hover{\n    padding: 7px 20px;\n    margin: 0px;\n}\n\n.window .simple-input{\n    border-radius: 20px;\n    width: 100%;\n    position: relative;\n    height: 42px;\n    background-color: #21355B;\n    border: 2px solid #E5E5E5;\n    box-sizing: border-box;\n    display: grid;\n    justify-items: stretch;\n    align-items: stretch;\n}\n\n.simple-input input[type=\"text\"]{\n    box-sizing: border-box;\n    padding: 20px 0px;\n    text-align: center;\n    background: none;\n    border: none;\n    max-height: 40px;\n    font-size: 18px;\n    color: white;\n}\n\n.simple-input button{\n    box-sizing: border-box;\n    display: grid;\n    border: 2px solid #E5E5E5;\n    place-items: center;\n    background: #21355B;\n    /* max-height: 40px; */\n    position: absolute;\n    font-size: 18px;\n    color: white;\n    width: 52px;\n    height: 42px;\n    border-radius: 20px;\n    top: -2px;\n    right: -2px;\n}\n\n.simple-input button img{\n    transition: 0.2s;\n}\n\n.simple-input button:hover img{\n    margin-left: 10px;\n}\n\nngx-spinner{\n    z-index: 1;\n}\n\n.admin-input{\n    padding: 5px 15px;\n\n    background-color: #21355B;\n    border: 2px solid #E5E5E5;\n    border-radius: 30px;\n    color: white;\n    justify-self: center;\n    align-self: center;\n    text-align: center;\n\n    transition: 0.2s;\n}\n\nbutton.admin-input{\n    padding: 2px 20px;\n}\n\nbutton.admin-input:hover{\n    padding: 2px 25px;\n}\n\n.admin-modal{\n    display: grid;\n    grid-row-gap: 15px;\n    padding: 10px 30px;\n    justify-self: center;\n    background-color: #21355B;\n    border: 2px solid #E5E5E5;\n    border-radius: 30px;\n    width: 260px;\n}\n\n.admin-modal h3{\n    margin: 0px;\n    font-size: 14px;\n    justify-self: center;\n}\n\n.admin-modal form{\n    display: grid;\n    row-gap: 25px;\n}\n\n.admin-modal .inputs{\n    display: grid;\n    row-gap: 10px;\n    grid-template-rows: repeat(4, 1fr);\n}\n\n.admin-modal .label{\n    display: grid;\n    grid-template-columns: 0.6fr auto;\n    column-gap: 5px;\n    font-size: 12px !important;\n    align-items: stretch;\n}\n\n.admin-modal .label label{\n    align-self: center;\n}\n\n.admin-modal select,.admin-modal input, .admin-modal textarea, .admin-modal .input{\n    font-size: 12px;\n    background: none;\n    border-radius: 30px;\n    border: 2px solid #E5E5E5;\n    color: white;\n    text-align: center;\n    text-align-last:center;\n    width: 130px;\n    height: 22px;\n    justify-self: end;\n    box-sizing: border-box;\n}\n\n.admin-modal textarea{\n    height: 100%;\n    border-radius: 10px;\n    text-align: start;\n}\n\n.admin-modal select option{\n    color: black;\n}\n\n.admin-modal input[type=\"date\"]::-webkit-calendar-picker-indicator{\n    display: none;\n}\n\n.admin-modal button{\n    font-size: 10px;\n}\n\n.admin-modal .message{\n    font-size: 12px;\n    justify-self: center;\n    text-align: center;\n}\n\n.danger-message{\n    color: red;\n}\n\n.success-message{\n    color: green;\n}", "",{"version":3,"sources":["styles.css"],"names":[],"mappings":"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","file":"styles.css","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;500;700&display=swap');\n\n/* ngx-spinner{\n    position: absolute;\n} */\n.none-pointer{\n    pointer-events: none;\n}\n\n\n\n::-webkit-scrollbar{\n    width:12px;\n}\n  \n::-webkit-scrollbar-thumb{\n    border-width:1px 1px 1px 2px;\n    border-color: #777;\n    background-color: #aaa;\n}\n  \n::-webkit-scrollbar-thumb:hover{\n    border-width: 1px 1px 1px 2px;\n    border-color: #555;\n    background-color: #777;\n}\n  \n::-webkit-scrollbar-track{\n    border-width:0;\n}\n  \n::-webkit-scrollbar-track:hover{\n    border-left: solid 1px #aaa;\n    background-color: #eee;\n}\n\nhtml, body{\n    margin: 0;\n    padding: 0;\n    min-height:100vh;\n}\n\n\n.content{\n    background-image: url(\"/assets/img/background/header-back.png\");\n    background-size: cover;\n    background-repeat: no-repeat;\n    background-position: center center;\n    display: grid;\n    justify-items: center;\n    align-items: center;\n    width: 100%;\n    min-height: 100vh;\n    position: relative;\n}\n\n.admin-content{\n    background-image: none;\n    background-color: #21355B;\n}\n\n.blur{\n    filter: blur(2px);\n}\n\n\n*, select, input{\n    outline: none;\n    font-family: 'Montserrat', sans-serif !important;\n}\n\n\n@media (min-width: 1471px){\n    .standart-padding{\n        padding-right: 300px;\n        padding-left: 300px;\n    }\n}\n@media (min-width: 1267px) and (max-width: 1470px){\n    .standart-padding{\n        padding-right: 200px;\n        padding-left: 200px;\n    }\n    \n}\n@media (min-width: 1161px) and (max-width: 1266px){\n    .standart-padding{\n        padding-right: 150px;\n        padding-left: 150px;\n    }\n    \n}\n@media (max-width: 1160px){\n    .standart-padding{\n        padding-right: 50px;\n        padding-left: 50px;\n\n    }\n}\n\n.indent{\n    padding: 0px 400px;\n}\n\ndiv{\n    box-sizing: border-box;\n}\n\na, button, input[type=submit]{\n    cursor: pointer;\n    box-sizing: border-box;\n}\na{\n    text-decoration: none;\n    color: white;\n}\n.thin-style{\n    font-weight: 100;\n}\n.bold-style{\n    font-weight: 700;\n}\n.light-style{\n    font-weight: 300;\n}\n.regular-style{\n    font-weight: 400;\n}\n.medium-style{\n    font-weight: 500;\n}\n.semibold-style{\n    font-weight: 600;\n}\n.pointer{\n    cursor: pointer;\n}\n.relative{\n    position: relative;\n}\n.absolute{\n    position: absolute;\n}\n\n\n.font-24{\n    font-size: 24px;\n}\n\n.gradient{\n    align-self: center;\n    display: grid;\n    align-items: center;\n    background: linear-gradient(to left, #7a01ff, #e967ff, #69ecf3);\n    padding: 3px;\n    border-radius: 25px;\n}\n\n.nameOfDescript{\n    margin: 0px;\n    padding: 0px;\n    font-size: 30pt;\n}\n\n.window{\n    display: grid;\n    justify-items: center;\n    align-items: start;\n\n    position: relative;\n\n    padding: 3% 5%;\n    width: 55%;\n    height: 75%;\n    box-sizing: border-box;\n\n    background-color: #0F1D38;\n    border-radius: 30px;\n\n    color: white;\n}\n\n.admin-window{\n    width: 80%;\n    min-height: 80%;\n}\n\n@media(max-width: 700px){\n    .admin-window{\n        width: 100%;\n        height: 100%;\n        border-radius: 0%;\n\n    }\n}\n\n.discord-login-btn{\n    display: grid;\n    place-items: center;\n    justify-self: center;\n    align-self: center;\n    grid-template-columns: auto 1fr;\n    grid-column-gap: 9px;\n\n    padding: 7px 10px;\n    border-radius: 30px;\n    border: 2px solid #E5E5E5;\n\n    background-color: #21355B;\n    box-sizing: border-box;\n\n    font-size: 12px;\n    color: white;\n\n    margin: 0px 10px;\n    transition: 0.25s;\n}\n\n.discord-login-btn:hover{\n    padding: 7px 20px;\n    margin: 0px;\n}\n\n.window .simple-input{\n    border-radius: 20px;\n    width: 100%;\n    position: relative;\n    height: 42px;\n    background-color: #21355B;\n    border: 2px solid #E5E5E5;\n    box-sizing: border-box;\n    display: grid;\n    justify-items: stretch;\n    align-items: stretch;\n}\n\n.simple-input input[type=\"text\"]{\n    box-sizing: border-box;\n    padding: 20px 0px;\n    text-align: center;\n    background: none;\n    border: none;\n    max-height: 40px;\n    font-size: 18px;\n    color: white;\n}\n\n.simple-input button{\n    box-sizing: border-box;\n    display: grid;\n    border: 2px solid #E5E5E5;\n    place-items: center;\n    background: #21355B;\n    /* max-height: 40px; */\n    position: absolute;\n    font-size: 18px;\n    color: white;\n    width: 52px;\n    height: 42px;\n    border-radius: 20px;\n    top: -2px;\n    right: -2px;\n}\n\n.simple-input button img{\n    transition: 0.2s;\n}\n.simple-input button:hover img{\n    margin-left: 10px;\n}\n\n\nngx-spinner{\n    z-index: 1;\n}\n\n\n.admin-input{\n    padding: 5px 15px;\n\n    background-color: #21355B;\n    border: 2px solid #E5E5E5;\n    border-radius: 30px;\n    color: white;\n    justify-self: center;\n    align-self: center;\n    text-align: center;\n\n    transition: 0.2s;\n}\n\nbutton.admin-input{\n    padding: 2px 20px;\n}\n\nbutton.admin-input:hover{\n    padding: 2px 25px;\n}\n\n\n\n\n.admin-modal{\n    display: grid;\n    grid-row-gap: 15px;\n    padding: 10px 30px;\n    justify-self: center;\n    background-color: #21355B;\n    border: 2px solid #E5E5E5;\n    border-radius: 30px;\n    width: 260px;\n}\n\n.admin-modal h3{\n    margin: 0px;\n    font-size: 14px;\n    justify-self: center;\n}\n\n.admin-modal form{\n    display: grid;\n    row-gap: 25px;\n}\n\n.admin-modal .inputs{\n    display: grid;\n    row-gap: 10px;\n    grid-template-rows: repeat(4, 1fr);\n}\n\n.admin-modal .label{\n    display: grid;\n    grid-template-columns: 0.6fr auto;\n    column-gap: 5px;\n    font-size: 12px !important;\n    align-items: stretch;\n}\n\n.admin-modal .label label{\n    align-self: center;\n}\n\n.admin-modal select,.admin-modal input, .admin-modal textarea, .admin-modal .input{\n    font-size: 12px;\n    background: none;\n    border-radius: 30px;\n    border: 2px solid #E5E5E5;\n    color: white;\n    text-align: center;\n    text-align-last:center;\n    width: 130px;\n    height: 22px;\n    justify-self: end;\n    box-sizing: border-box;\n}\n\n.admin-modal textarea{\n    height: 100%;\n    border-radius: 10px;\n    text-align: start;\n}\n\n.admin-modal select option{\n    color: black;\n}\n\n.admin-modal input[type=\"date\"]::-webkit-calendar-picker-indicator{\n    display: none;\n}\n\n.admin-modal button{\n    font-size: 10px;\n}\n\n.admin-modal .message{\n    font-size: 12px;\n    justify-self: center;\n    text-align: center;\n}\n\n\n\n.danger-message{\n    color: red;\n}\n.success-message{\n    color: green;\n}"]}]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--13-1!../node_modules/postcss-loader/src??embedded!./styles.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/styles.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ 2:
/*!******************************!*\
  !*** multi ./src/styles.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/xozewitc/Projects/quasar/client/src/styles.css */"./src/styles.css");


/***/ })

},[[2,"runtime"]]]);
//# sourceMappingURL=styles.js.map