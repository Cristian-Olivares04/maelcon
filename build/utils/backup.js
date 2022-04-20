"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _keys = _interopRequireDefault(require("../keys"));

var _mysqldump = _interopRequireDefault(require("mysqldump"));

var moment = require('moment');

var fs = require('fs');

var backupDB = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(name, path) {
    var fileName, wstream;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            fileName = "".concat(name, "_").concat(moment().format('YYYY_MM_DD'), ".sql");
            wstream = fs.createWriteStream("".concat(path, "/").concat(fileName));
            _context.next = 5;
            return (0, _mysqldump["default"])({
              connection: {
                host: _keys["default"].database["host"],
                user: _keys["default"].database["user"],
                password: _keys["default"].database["password"],
                database: _keys["default"].database["database"]
              },
              dumpToFile: wstream.path
            });

          case 5:
            return _context.abrupt("return", {
              mensaje: "Respaldo de la base de datos creado.",
              codigo: 1
            });

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", _context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function backupDB(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.backupDB = backupDB;