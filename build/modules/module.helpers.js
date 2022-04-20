"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateHelpData = exports.getHelpData = exports.getHelpActiveData = exports.deleteHelpData = exports.createHelpData = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _databaseSQL = _interopRequireDefault(require("../databaseSQL"));

var updateHelpData = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var ID_INFO, _req$body, TITULO, ENLACE, ESTADO, mensaje, _mensaje;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            ID_INFO = req.params.ID_INFO;
            _req$body = req.body, TITULO = _req$body.TITULO, ENLACE = _req$body.ENLACE, ESTADO = _req$body.ESTADO;
            _context.next = 5;
            return _databaseSQL["default"].query("CALL ACTUALIZAR_INFORMACION_AYUDA(?,?,?,?,@MENSAJE, @CODIGO);", [ID_INFO, TITULO, ENLACE, ESTADO]);

          case 5:
            _context.next = 7;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 7:
            mensaje = _context.sent;
            res.status(200).json({
              mensaje: JSON.parse(JSON.stringify(mensaje))
            });
            _context.next = 17;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            _context.next = 15;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 15:
            _mensaje = _context.sent;
            res.status(401).json({
              error: _context.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje))
            });

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));

  return function updateHelpData(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.updateHelpData = updateHelpData;

var createHelpData = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body2, TITULO, ENLACE, ESTADO, mensaje, _mensaje2;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body2 = req.body, TITULO = _req$body2.TITULO, ENLACE = _req$body2.ENLACE, ESTADO = _req$body2.ESTADO;
            _context2.next = 4;
            return _databaseSQL["default"].query("CALL CREAR_INFORMACION_AYUDA(?,?,?,@MENSAJE, @CODIGO);", [TITULO, ENLACE, ESTADO]);

          case 4:
            _context2.next = 6;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 6:
            mensaje = _context2.sent;
            res.status(200).json({
              mensaje: JSON.parse(JSON.stringify(mensaje))
            });
            _context2.next = 16;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            _context2.next = 14;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 14:
            _mensaje2 = _context2.sent;
            res.status(401).json({
              error: _context2.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje2))
            });

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));

  return function createHelpData(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.createHelpData = createHelpData;

var deleteHelpData = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var ID_INFO, mensaje, _mensaje3;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            ID_INFO = req.params.ID_INFO;
            _context3.next = 4;
            return _databaseSQL["default"].query("CALL ELIMINAR_INFORMACION_AYUDA(?,@MENSAJE, @CODIGO);", [ID_INFO]);

          case 4:
            _context3.next = 6;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 6:
            mensaje = _context3.sent;
            res.status(200).json({
              mensaje: JSON.parse(JSON.stringify(mensaje))
            });
            _context3.next = 16;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            _context3.next = 14;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 14:
            _mensaje3 = _context3.sent;
            res.status(401).json({
              error: _context3.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje3))
            });

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 10]]);
  }));

  return function deleteHelpData(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.deleteHelpData = deleteHelpData;

var getHelpData = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var information, mensaje, _mensaje4;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _databaseSQL["default"].query("CALL OBTENER_INFORMACION(@MENSAJE, @CODIGO);");

          case 3:
            information = _context4.sent;
            _context4.next = 6;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 6:
            mensaje = _context4.sent;
            res.status(200).json({
              mensaje: JSON.parse(JSON.stringify(mensaje)),
              data: JSON.parse(JSON.stringify(information))[0]
            });
            _context4.next = 16;
            break;

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](0);
            _context4.next = 14;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 14:
            _mensaje4 = _context4.sent;
            res.status(401).json({
              error: _context4.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje4))
            });

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 10]]);
  }));

  return function getHelpData(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getHelpData = getHelpData;

var getHelpActiveData = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var information, mensaje, _mensaje5;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _databaseSQL["default"].query("CALL OBTENER_INFORMACION_ACTIVA(@MENSAJE, @CODIGO);");

          case 3:
            information = _context5.sent;
            _context5.next = 6;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 6:
            mensaje = _context5.sent;
            res.status(200).json({
              mensaje: JSON.parse(JSON.stringify(mensaje)),
              data: JSON.parse(JSON.stringify(information))[0]
            });
            _context5.next = 16;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);
            _context5.next = 14;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 14:
            _mensaje5 = _context5.sent;
            res.status(401).json({
              error: _context5.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje5))
            });

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 10]]);
  }));

  return function getHelpActiveData(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getHelpActiveData = getHelpActiveData;