/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/app.js":
/*!****************************!*\
  !*** ./src/scripts/app.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _chat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chat.js */ \"./src/scripts/chat.js\");\n\n\nfunction chalu() {\n  (0,_chat_js__WEBPACK_IMPORTED_MODULE_0__.ch)(); // .then( ()=> {console.log('chat added')} )\n  // .catch( (err)=> {console.log(err)})\n}\n\nchalu();\n\n//# sourceURL=webpack://realtimechatroom/./src/scripts/app.js?");

/***/ }),

/***/ "./src/scripts/chat.js":
/*!*****************************!*\
  !*** ./src/scripts/chat.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ch\": () => /* binding */ ch\n/* harmony export */ });\n// add chat\n// set real-time listner ot get new chats\n// update username\n// update room\nclass chatRoom {\n  constructor() {\n    // this.room = room;\n    // this.username = username;\n    // db.chat will connect you to the database\n    // 'chats' will point to the collection you\n    // you want to retrieve data from\n    this.chats = db.collection('chats');\n  }\n\n  async addchats(room, username, message) {\n    // format chat\n    const now = new Date(); // will tell when user has submited chat\n\n    const chat = {\n      room,\n      username,\n      message,\n      // ?? firebase.firestore.Timestamp\n      created_at: firebase.firestore.Timestamp.fromDate(now)\n    }; //save chat document\n    // ?? add\n\n    const response = await this.chats.add(chat);\n    return response;\n  }\n\n  getChats(callback) {\n    this.chats // ?? onSnapshot\n    .onSnapshot(snapshot => {\n      // ?? docChanges \n      snapshot.docChanges().forEach(change => {\n        // ?? data type 'added'\n        if (change.type === 'added') {\n          callback(change.doc.data());\n        }\n      });\n    });\n  }\n\n}\n\nfunction ch() {\n  const chatroom = new chatRoom(); // return chatroom.addchats( 'gaming', 'knight', 'hello eveyone')\n\n  return chatroom.getChats(data => {\n    console.log(data);\n  });\n}\n\n//# sourceURL=webpack://realtimechatroom/./src/scripts/chat.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/scripts/app.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;