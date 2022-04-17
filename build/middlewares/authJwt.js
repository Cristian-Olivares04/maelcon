"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyTokenSQL = exports.verifyAuth = void 0;

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

            if (user) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              mensaje: "El usuario no ha sido encontrado",
              codigo: 404
            }));

          case 11:
            next();
            _context.next = 17;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            res.status(404).json({
              mensaje: "Acceso no autorizado",
              codigo: 2
            });

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 14]]);
  }));

  return function verifyTokenSQL(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.verifyTokenSQL = verifyTokenSQL;

var verifyAuth = function verifyAuth(module, operation) {
  try {
    return /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
        var id, permisos, authValue;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = req.userId;
                _context2.next = 3;
                return _databaseSQL["default"].query("CALL OBTENER_PERMISOS_RUTA(?,?,?,@MENSAJE, @CODIGO)", [id, module, operation]);

              case 3:
                permisos = _context2.sent;
                authValue = Object.values(JSON.parse(JSON.stringify(permisos))[0][0]);

                if (!(authValue[0] === 0)) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", res.status(301).json({
                  mensaje: "No se cuentan con los permisos suficientes para acceder a la ruta"
                }));

              case 7:
                next();

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
      };
    }();
  } catch (error) {
    res.json({
      message: "Acceso no autorizado, requiere permisos adicionales.",
      error: error
    });
  }
};

exports.verifyAuth = verifyAuth;