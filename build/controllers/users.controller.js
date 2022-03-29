"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUserByIdSQL = exports.getUsersSQL = exports.getUserByIdSQL = exports.encryptPassword = exports.deleteUserByIdSQL = exports.createUser = exports.comparePassword = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _User = _interopRequireDefault(require("../models/User"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _databaseSQL = _interopRequireDefault(require("../databaseSQL"));

var createUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _databaseSQL["default"].query("INSERT INTO tbl_personas set ?", [req.body]);

          case 2:
            res.json({
              message: "El usuario ha sido agregado correctamente"
            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); //MySQL


exports.createUser = createUser;

var getUsersSQL = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var usuarios;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _databaseSQL["default"].query("SELECT * FROM tbl_personas");

          case 2:
            usuarios = _context2.sent;
            res.json(JSON.parse(JSON.stringify(usuarios)));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getUsersSQL(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getUsersSQL = getUsersSQL;

var getUserByIdSQL = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var ID_PERSONA, id, usuario;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            ID_PERSONA = req.params.ID_PERSONA;
            id = parseInt(ID_PERSONA, 10);
            _context3.next = 4;
            return _databaseSQL["default"].query("SELECT * FROM tbl_personas WHERE ID_PERSONA = ?", [id]);

          case 4:
            usuario = _context3.sent;
            res.json(JSON.parse(JSON.stringify(usuario)));

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getUserByIdSQL(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getUserByIdSQL = getUserByIdSQL;

var updateUserByIdSQL = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var ID_PERSONA, id;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            ID_PERSONA = req.params.ID_PERSONA;
            id = parseInt(ID_PERSONA, 10);
            _context4.next = 4;
            return _databaseSQL["default"].query("UPDATE tbl_personas set ? WHERE ID_PERSONA = ?", [req.body, id]);

          case 4:
            res.json({
              message: "El usuario ha sido actualizado"
            });

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateUserByIdSQL(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateUserByIdSQL = updateUserByIdSQL;

var deleteUserByIdSQL = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var ID_PERSONA, id;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            ID_PERSONA = req.params.ID_PERSONA;
            id = parseInt(ID_PERSONA, 10);
            _context5.next = 4;
            return _databaseSQL["default"].query("DELETE FROM tbl_personas WHERE ID_PERSONA = ?", [id]);

          case 4:
            res.json({
              message: "El usuario ha sido eliminado"
            });

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function deleteUserByIdSQL(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}(); // Mongo DB
//Obtener Usuarios


exports.deleteUserByIdSQL = deleteUserByIdSQL;

var encryptPassword = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(password) {
    var salt;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _bcryptjs["default"].genSalt(10);

          case 2:
            salt = _context6.sent;
            _context6.next = 5;
            return _bcryptjs["default"].hash(password, salt);

          case 5:
            return _context6.abrupt("return", _context6.sent);

          case 6:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function encryptPassword(_x11) {
    return _ref6.apply(this, arguments);
  };
}();

exports.encryptPassword = encryptPassword;

var comparePassword = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(password, receivedPassword) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _bcryptjs["default"].compare(password, receivedPassword);

          case 2:
            return _context7.abrupt("return", _context7.sent);

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function comparePassword(_x12, _x13) {
    return _ref7.apply(this, arguments);
  };
}();

exports.comparePassword = comparePassword;