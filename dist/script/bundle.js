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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _chat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chat */ \"./src/scripts/chat.js\");\n/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui */ \"./src/scripts/ui.js\");\n\n\nconst chatList = document.querySelector('.chat-list');\nconst newChatForm = document.querySelector('.new-chat');\nconst updateMssg = document.querySelector('.update-mssg');\nconst rooms = document.querySelector('.chat-rooms');\n\nfunction chalu() {\n  const username = localStorage.username ? localStorage.username : 'anon';\n  const chatroom = new _chat__WEBPACK_IMPORTED_MODULE_0__.chatRoom('general', username);\n  const chatui = new _ui__WEBPACK_IMPORTED_MODULE_1__.ChatUI(chatList);\n  const newNameForm = document.querySelector('.new-name'); // add new chat\n\n  newChatForm.addEventListener('submit', e => {\n    e.preventDefault();\n    const message = newChatForm.message.value.trim();\n    chatroom.addchats(message).then(() => {\n      newChatForm.reset();\n    }).catch(err => {\n      console.log(err);\n    });\n  });\n  chatroom.getChats(data => {\n    chatui.render(data);\n  }); // update username\n\n  newNameForm.addEventListener('submit', e => {\n    e.preventDefault();\n    const newName = newNameForm.name.value.trim();\n    chatroom.updateName(newName);\n    newNameForm.reset();\n    updateMssg.innerHTML = `Your Name Was Updated to ${newName}`;\n    setTimeout(() => {\n      updateMssg.innerHTML = '';\n    }, 3000);\n  }); // update room\n\n  rooms.addEventListener('click', e => {\n    if (e.target.tagName === 'BUTTON') {\n      chatui.clear();\n      chatroom.updateRoom(e.target.getAttribute('id'));\n      chatroom.getChats(chat => {\n        chatui.render(chat);\n      });\n    }\n  });\n}\n\nchalu();\n\n//# sourceURL=webpack://realtimechatroom/./src/scripts/app.js?");

/***/ }),

/***/ "./src/scripts/chat.js":
/*!*****************************!*\
  !*** ./src/scripts/chat.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"chatRoom\": () => /* binding */ chatRoom\n/* harmony export */ });\n// add chat\n// set real-time listner ot get new chats\n// update username\n// update room\nconst updateMssg = document.querySelector('.update-mssg');\nclass chatRoom {\n  constructor(room, username) {\n    this.room = room;\n    this.username = username; // db.chat will connect you to the database\n    // 'chats' will point to the collection you\n    // you want to retrieve data from\n\n    this.chats = db.collection('chats');\n    this.unsub;\n  }\n\n  async addchats(message) {\n    // format chat\n    const now = new Date(); // will tell when user has submited chat\n\n    const chat = {\n      room: this.room,\n      username: this.username,\n      message,\n      // ?? firebase.firestore.Timestamp\n      created_at: firebase.firestore.Timestamp.fromDate(now)\n    }; //save chat document\n    // ?? add\n\n    const response = await this.chats.add(chat);\n    return response;\n  }\n\n  getChats(callback) {\n    this.unsub = this.chats.where('room', '==', this.room).orderBy('created_at') // ?? onSnapshot\n    .onSnapshot(snapshot => {\n      // ?? docChanges \n      snapshot.docChanges().forEach(change => {\n        // ?? data type 'added'\n        if (change.type === 'added') {\n          callback(change.doc.data());\n        }\n      });\n    });\n  }\n\n  updateName(username) {\n    this.username = username;\n    localStorage.setItem('username', username);\n  }\n\n  updateRoom(room) {\n    this.room = room;\n    updateMssg.innerHTML = `Chatroom Changed to ${room}`;\n    setTimeout(() => {\n      updateMssg.innerHTML = '';\n    }, 3000);\n\n    if (this.unsub) {\n      this.unsub();\n    }\n  }\n\n}\n\n//# sourceURL=webpack://realtimechatroom/./src/scripts/chat.js?");

/***/ }),

/***/ "./src/scripts/ui.js":
/*!***************************!*\
  !*** ./src/scripts/ui.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ChatUI\": () => /* binding */ ChatUI\n/* harmony export */ });\nclass ChatUI {\n  constructor(list) {\n    this.list = list;\n  }\n\n  clear() {\n    this.list.innerHTML = '';\n  }\n\n  render(data) {\n    const when = dateFns.distanceInWordsToNow(data.created_at.toDate(), {\n      addSuffix: true\n    }); // const when = data.created_at.toDate();\n\n    const html = `\n        <li class=\"list-group-item\">\n            <span class=\"username\"> ${data.username}</span>\n            <span class=\"message\">${data.message}</span>\n            <div class=\"time\">${when}</div>\n        </li>\n        `;\n    this.list.innerHTML += html;\n  }\n\n}\n\n//# sourceURL=webpack://realtimechatroom/./src/scripts/ui.js?");

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