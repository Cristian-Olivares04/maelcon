"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.singUpSQL = exports.singInSQL = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _databaseSQL = _interopRequireDefault(require("../databaseSQL"));

var encrypt = _interopRequireWildcard(require("../middlewares/encrypt"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var singInSQL = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var usuario, user, validatePassword, tokenSQL, mensaje;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _databaseSQL["default"].query("CALL COMPROBAR_USUARIO(?,@MENSAJE,@CODIGO)", [req.body.CORREO_ELECTRONICO]);

          case 3:
            usuario = _context.sent;
            user = JSON.parse(JSON.stringify(usuario[0]));

            if (user) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              mensaje: "usuario SQL no encontrado"
            }));

          case 7:
            _context.next = 9;
            return encrypt.comparePassword(req.body.CONTRASENA, user[0].CONTRASENA);

          case 9:
            validatePassword = _context.sent;

            if (validatePassword) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              mensaje: "Contrasena SQL erronea",
              token: null
            }));

          case 12:
            tokenSQL = _jsonwebtoken["default"].sign({
              id: user[0].ID_USUARIO
            }, _config["default"].SECRET, {
              expiresIn: 120
            });
            res.json({
              token: tokenSQL,
              user: user
            });
            _context.next = 22;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](0);
            _context.next = 20;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 20:
            mensaje = _context.sent;
            res.status(401).json({
              error: _context.t0.message,
              mensaje: JSON.parse(JSON.stringify(mensaje))
            });

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 16]]);
  }));

  return function singInSQL(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.singInSQL = singInSQL;

var singUpSQL = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, NOMBRE, APELLIDO, GENERO, RTN, TELEFONO, USUARIO, CONTRASENA, IMG_USUARIO, CORREO_ELECTRONICO, PREGUNTA, RESPUESTA, password, mensaje, _mensaje;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body = req.body, NOMBRE = _req$body.NOMBRE, APELLIDO = _req$body.APELLIDO, GENERO = _req$body.GENERO, RTN = _req$body.RTN, TELEFONO = _req$body.TELEFONO, USUARIO = _req$body.USUARIO, CONTRASENA = _req$body.CONTRASENA, IMG_USUARIO = _req$body.IMG_USUARIO, CORREO_ELECTRONICO = _req$body.CORREO_ELECTRONICO, PREGUNTA = _req$body.PREGUNTA, RESPUESTA = _req$body.RESPUESTA;
            _context2.next = 4;
            return encrypt.encryptPassword(CONTRASENA);

          case 4:
            password = _context2.sent;
            _context2.next = 7;
            return _databaseSQL["default"].query("CALL REGISTRAR_MS_USUARIO(?,?,?,?,?,?,?,?,?,?,?,@MENSAJE, @CODIGO);", [NOMBRE, APELLIDO, GENERO, RTN, TELEFONO, USUARIO, password, IMG_USUARIO, CORREO_ELECTRONICO, PREGUNTA, RESPUESTA]);

          case 7:
            _context2.next = 9;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 9:
            mensaje = _context2.sent;
            res.json(JSON.parse(JSON.stringify(mensaje)));
            _context2.next = 19;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](0);
            _context2.next = 17;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 17:
            _mensaje = _context2.sent;
            res.status(401).json({
              error: _context2.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje))
            });

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 13]]);
  }));

  return function singUpSQL(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.singUpSQL = singUpSQL;