"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getShoppingReport = exports.getSalesReport = exports.getBinnacleReport = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _databaseSQL = _interopRequireDefault(require("../databaseSQL"));

var getSalesReport = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, FECHA_INICIO, FECHA_FIN, information, mensaje, _mensaje;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, FECHA_INICIO = _req$body.FECHA_INICIO, FECHA_FIN = _req$body.FECHA_FIN;
            _context.next = 4;
            return _databaseSQL["default"].query("CALL OBTENER_VENTAS_FECHAS(?,?,@MENSAJE, @CODIGO);", [FECHA_INICIO, FECHA_FIN]);

          case 4:
            information = _context.sent;
            mensaje = JSON.parse(JSON.stringify(information[0]));
            res.status(200).json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }],
              data: JSON.parse(JSON.stringify(information))
            });
            _context.next = 15;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            _context.next = 13;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 13:
            _mensaje = _context.sent;
            res.status(401).json({
              error: _context.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje))
            });

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));

  return function getSalesReport(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getSalesReport = getSalesReport;

var getShoppingReport = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body2, FECHA_INICIO, FECHA_FIN, information, mensaje, _mensaje2;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body2 = req.body, FECHA_INICIO = _req$body2.FECHA_INICIO, FECHA_FIN = _req$body2.FECHA_FIN;
            _context2.next = 4;
            return _databaseSQL["default"].query("CALL OBTENER_COMPRAS_FECHAS(?,?,@MENSAJE, @CODIGO);", [FECHA_INICIO, FECHA_FIN]);

          case 4:
            information = _context2.sent;
            mensaje = JSON.parse(JSON.stringify(information[0]));
            res.status(200).json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }],
              data: JSON.parse(JSON.stringify(information))
            });
            _context2.next = 15;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            _context2.next = 13;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 13:
            _mensaje2 = _context2.sent;
            res.status(401).json({
              error: _context2.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje2))
            });

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));

  return function getShoppingReport(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getShoppingReport = getShoppingReport;

var getBinnacleReport = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body3, FECHA_INICIO, FECHA_FIN, information, mensaje, _mensaje3;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _req$body3 = req.body, FECHA_INICIO = _req$body3.FECHA_INICIO, FECHA_FIN = _req$body3.FECHA_FIN;
            _context3.next = 4;
            return _databaseSQL["default"].query("CALL OBTENER_BITACORA_FECHAS(?,?,@MENSAJE, @CODIGO);", [FECHA_INICIO, FECHA_FIN]);

          case 4:
            information = _context3.sent;
            mensaje = JSON.parse(JSON.stringify(information[0]));
            res.status(200).json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }],
              data: JSON.parse(JSON.stringify(information))
            });
            _context3.next = 15;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            _context3.next = 13;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 13:
            _mensaje3 = _context3.sent;
            res.status(401).json({
              error: _context3.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje3))
            });

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 9]]);
  }));

  return function getBinnacleReport(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getBinnacleReport = getBinnacleReport;