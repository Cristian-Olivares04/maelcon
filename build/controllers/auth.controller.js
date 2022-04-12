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

var email = require('../utils/email');

var cloudinary_services = require("../utils/cloudinary_services");

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
    var _req$body, NOMBRE, APELLIDO, GENERO, RTN, TELEFONO, USUARIO, CONTRASENA, IMG_USUARIO, CORREO_ELECTRONICO, PREGUNTA, RESPUESTA, password, img, mensaje, info, contentHTML, _mensaje;

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

            if (!req.file) {
              _context2.next = 12;
              break;
            }

            _context2.next = 8;
            return cloudinary_services.uploadImage(req.file.path, 'Maelcon/');

          case 8:
            img = _context2.sent;
            console.log(img);
            _context2.next = 13;
            break;

          case 12:
            img = 'https://res.cloudinary.com/maelcon/image/upload/v1649551517/Maelcon/Perfiles/tgjtgsblxyubftltsxra.png';

          case 13:
            _context2.next = 15;
            return _databaseSQL["default"].query("CALL REGISTRAR_MS_USUARIO(?,?,?,?,?,?,?,?,?,?,?,@MENSAJE, @CODIGO);", [NOMBRE, APELLIDO, GENERO, RTN, TELEFONO, USUARIO, password, img, CORREO_ELECTRONICO, PREGUNTA, RESPUESTA]);

          case 15:
            _context2.next = 17;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 17:
            mensaje = _context2.sent;
            info = JSON.parse(JSON.stringify(mensaje));

            if (!(info[0]["CODIGO"] == 1)) {
              _context2.next = 23;
              break;
            }

            contentHTML = "\n      <table style=\"max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;\">\n    \n      <tr>\n        <td style=\"padding: 0\">\n          <img style=\"padding: 0; display: block\" src=\"https://res.cloudinary.com/maelcon/image/upload/v1649635374/Maelcon/BLG2011-YM-AMS-VirtualWelcome-Card_ufn1k5.png\" width=\"100%\">\n        </td>\n      </tr>\n      \n      <tr>\n        <td style=\"background-color: #ecf0f1\">\n          <div style=\"color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif\">\n            <h2 style=\"color: #e67e22; margin: 0 0 7px\">Hola ".concat(NOMBRE, " ").concat(APELLIDO, "!</h2>\n            <p style=\"margin: 2px; font-size: 15px\">\n              Bienvenido al sistema de Maelcon, se ha recibido su solicitud de creaci\xF3n de usuario debe esperar\n              hasta que un administradar active su cuenta, los modulos de trabajo son variados y el \n              administrador ser\xE1 el encargado de asignar tus areas.\n              <b>Posibles areas de trabajo:</b></p>\n            <ul style=\"font-size: 15px;  margin: 10px 0\">\n              <li>Modulo de compras.</li>\n              <li>Modulo de ventas.</li>\n              <li>Administrador de usuarios.</li>\n              <li>Administrador de sistema.</li>\n              <li>Control de inventarios y productos.</li>\n            </ul>\n            <div style=\"width: 100%;margin:20px 0; display: inline-block;text-align: center\">\n              <img style=\"padding: 0; width: 150px; margin: 5px\" src=\"https://res.cloudinary.com/maelcon/image/upload/v1649559247/Maelcon/descarga_oxoktv.jpg\">\n            </div>\n            <div style=\"width: 100%; text-align: center\">\n              <a style=\"text-decoration: none; border-radius: 5px; padding: 11px 23px; color: white; background-color: #3498db\" href=\"https://www.google.com\">Ir a la p\xE1gina</a>\t\n            </div>\n            <p style=\"color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0\">Maelcon S de R.L. 2022</p>\n          </div>\n        </td>\n      </tr>\n    </table>\n      ");
            _context2.next = 23;
            return email.sendEmail(CORREO_ELECTRONICO, "Solicitud de registro enviada ✔", contentHTML);

          case 23:
            res.json(info);
            _context2.next = 32;
            break;

          case 26:
            _context2.prev = 26;
            _context2.t0 = _context2["catch"](0);
            _context2.next = 30;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 30:
            _mensaje = _context2.sent;
            res.status(401).json({
              error: _context2.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje))
            });

          case 32:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 26]]);
  }));

  return function singUpSQL(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.singUpSQL = singUpSQL;