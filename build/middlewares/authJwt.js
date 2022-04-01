"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyTokenSQL = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _databaseSQL = _interopRequireDefault(require("../databaseSQL"));

var verifyTokenSQL = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var token, decoded, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            token = req.headers["auth-token"];

            if (token) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", res.status(403).json({
              mensaje: "No se ha enviado ningun token"
            }));

          case 4:
            decoded = _jsonwebtoken["default"].verify(token, _config["default"].SECRET);
            req.userId = decoded.id; //buscar en la base de datos

            _context.next = 8;
            return _databaseSQL["default"].query("SELECT * FROM tbl_ms_usuario WHERE ID_USUARIO = ?", [req.userId]);

          case 8:
            user = _context.sent;
            console.log(user);

            if (user) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              mensaje: "El usuario no ha sido encontrado",
              codigo: 404
            }));

          case 12:
            next();
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](0);
            res.status(404).json({
              mensaje: "Acceso no autorizado",
              codigo: 2
            });

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 15]]);
  }));

  return function verifyTokenSQL(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.verifyTokenSQL = verifyTokenSQL;