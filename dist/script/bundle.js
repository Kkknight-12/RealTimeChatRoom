/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/app.js":
/*!****************************!*\
  !*** ./src/scripts/app.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _chat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chat */ \"./src/scripts/chat.js\");\n/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui */ \"./src/scripts/ui.js\");\n\n\nvar chatList = document.querySelector('.chat-list');\nvar newChatForm = document.querySelector('.new-chat');\nvar updateMssg = document.querySelector('.update-mssg');\nvar rooms = document.querySelector('.chat-rooms');\n\nfunction chalu() {\n  var username = localStorage.username ? localStorage.username : 'anon';\n  var chatroom = new _chat__WEBPACK_IMPORTED_MODULE_0__.chatRoom('general', username);\n  var chatui = new _ui__WEBPACK_IMPORTED_MODULE_1__.ChatUI(chatList);\n  var newNameForm = document.querySelector('.new-name'); // add new chat\n\n  newChatForm.addEventListener('submit', function (e) {\n    e.preventDefault();\n    var message = newChatForm.message.value.trim();\n    chatroom.addchats(message).then(function () {\n      newChatForm.reset();\n    }).catch(function (err) {\n      console.log(err);\n    });\n  });\n  chatroom.getChats(function (data) {\n    chatui.render(data);\n  }); // update username\n\n  newNameForm.addEventListener('submit', function (e) {\n    e.preventDefault();\n    var newName = newNameForm.name.value.trim();\n    chatroom.updateName(newName);\n    newNameForm.reset();\n    updateMssg.innerHTML = \"Your Name Was Updated to \".concat(newName);\n    setTimeout(function () {\n      updateMssg.innerHTML = '';\n    }, 3000);\n  }); // update room\n\n  rooms.addEventListener('click', function (e) {\n    if (e.target.tagName === 'BUTTON') {\n      chatui.clear();\n      chatroom.updateRoom(e.target.getAttribute('id'));\n      chatroom.getChats(function (chat) {\n        chatui.render(chat);\n      });\n    }\n  });\n}\n\nchalu();\n\n//# sourceURL=webpack://realtimechatroom/./src/scripts/app.js?");

/***/ }),

/***/ "./src/scripts/chat.js":
/*!*****************************!*\
  !*** ./src/scripts/chat.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"chatRoom\": function() { return /* binding */ chatRoom; }\n/* harmony export */ });\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n// add chat\n// set real-time listner ot get new chats\n// update username\n// update room\nvar updateMssg = document.querySelector('.update-mssg');\nvar chatRoom = /*#__PURE__*/function () {\n  function chatRoom(room, username) {\n    _classCallCheck(this, chatRoom);\n\n    this.room = room;\n    this.username = username; // db.chat will connect you to the database\n    // 'chats' will point to the collection you\n    // you want to retrieve data from\n\n    this.chats = db.collection('chats');\n    this.unsub;\n  }\n\n  _createClass(chatRoom, [{\n    key: \"addchats\",\n    value: function () {\n      var _addchats = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(message) {\n        var now, chat, response;\n        return regeneratorRuntime.wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                // format chat\n                now = new Date(); // will tell when user has submited chat\n\n                chat = {\n                  room: this.room,\n                  username: this.username,\n                  message: message,\n                  // ?? firebase.firestore.Timestamp\n                  created_at: firebase.firestore.Timestamp.fromDate(now)\n                }; //save chat document\n                // ?? add\n\n                _context.next = 4;\n                return this.chats.add(chat);\n\n              case 4:\n                response = _context.sent;\n                return _context.abrupt(\"return\", response);\n\n              case 6:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee, this);\n      }));\n\n      function addchats(_x) {\n        return _addchats.apply(this, arguments);\n      }\n\n      return addchats;\n    }()\n  }, {\n    key: \"getChats\",\n    value: function getChats(callback) {\n      this.unsub = this.chats.where('room', '==', this.room).orderBy('created_at') // ?? onSnapshot\n      .onSnapshot(function (snapshot) {\n        // ?? docChanges \n        snapshot.docChanges().forEach(function (change) {\n          // ?? data type 'added'\n          if (change.type === 'added') {\n            callback(change.doc.data());\n          }\n        });\n      });\n    }\n  }, {\n    key: \"updateName\",\n    value: function updateName(username) {\n      this.username = username;\n      localStorage.setItem('username', username);\n    }\n  }, {\n    key: \"updateRoom\",\n    value: function updateRoom(room) {\n      this.room = room;\n      updateMssg.innerHTML = \"Chatroom Changed to \".concat(room);\n      setTimeout(function () {\n        updateMssg.innerHTML = '';\n      }, 3000);\n\n      if (this.unsub) {\n        this.unsub();\n      }\n    }\n  }]);\n\n  return chatRoom;\n}();\n\n//# sourceURL=webpack://realtimechatroom/./src/scripts/chat.js?");

/***/ }),

/***/ "./src/scripts/ui.js":
/*!***************************!*\
  !*** ./src/scripts/ui.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ChatUI\": function() { return /* binding */ ChatUI; }\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar ChatUI = /*#__PURE__*/function () {\n  function ChatUI(list) {\n    _classCallCheck(this, ChatUI);\n\n    this.list = list;\n  }\n\n  _createClass(ChatUI, [{\n    key: \"clear\",\n    value: function clear() {\n      this.list.innerHTML = '';\n    }\n  }, {\n    key: \"render\",\n    value: function render(data) {\n      // const when = dateFns.distanceInWordsToNow(\n      //     data.created_at.toDate(),\n      //     { addSuffix: true }\n      // );\n      var when = data.created_at.toDate();\n      var html = \"\\n        <li class=\\\"list-group-item\\\">\\n            <span class=\\\"username\\\"> \".concat(data.username, \"</span>\\n            <span class=\\\"message\\\">\").concat(data.message, \"</span>\\n            <div class=\\\"time\\\">\").concat(when, \"</div>\\n        </li>\\n        \");\n      this.list.innerHTML += html;\n    }\n  }]);\n\n  return ChatUI;\n}();\n\n//# sourceURL=webpack://realtimechatroom/./src/scripts/ui.js?");

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
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/scripts/app.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;