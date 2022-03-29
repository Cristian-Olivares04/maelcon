"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _promiseMysql = _interopRequireDefault(require("promise-mysql"));

var _keys = _interopRequireDefault(require("./keys"));

var pool = _promiseMysql["default"].createPool(_keys["default"].database);

pool.getConnection().then(function (connect) {
  pool.releaseConnection(connect);
  console.log("DBSQL is connected...");
})["catch"](function (error) {
  console.log(error.message);
});
var _default = pool;
exports["default"] = _default;