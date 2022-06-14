"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyRecoveryToken = exports.updateUserByIdPA = exports.updateUserById = exports.updateSecurytyQA = exports.updatePassword = exports.securityQA = exports.getUsersSQL = exports.getUsers = exports.getUserSQL = exports.getUserById = exports.getSecurityQuestionByEmail = exports.getSecurityQuestion = exports.getSecurityAnswer = exports.getMyUser = exports.getAnswerByEmail = exports.generatePasswordRecoveryTokenByEmail = exports.deleteUserById = exports.createUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _router = require("express/lib/router");

var _databaseSQL = _interopRequireDefault(require("../databaseSQL"));

var encrypt = _interopRequireWildcard(require("../middlewares/encrypt"));

var _config = _interopRequireDefault(require("../config"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var cloudinary_services = require("../utils/cloudinary_services");

var email = require("../utils/email");

var createUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, ID_PUESTO, NOMBRE_PERSONA, APELLIDO_PERSONA, GENERO, RTN, TELEFONO, SUELDO, ID_ROL, USUARIO, CONTRASENA, IMG_USUARIO, CORREO_ELECTRONICO, CREADO_POR, FECHA_VENCIMIENTO, PREGUNTA, RESPUESTA, ESTADO, pass2, answer, img, objetos, mensaje, info, contentHTML;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, ID_PUESTO = _req$body.ID_PUESTO, NOMBRE_PERSONA = _req$body.NOMBRE_PERSONA, APELLIDO_PERSONA = _req$body.APELLIDO_PERSONA, GENERO = _req$body.GENERO, RTN = _req$body.RTN, TELEFONO = _req$body.TELEFONO, SUELDO = _req$body.SUELDO, ID_ROL = _req$body.ID_ROL, USUARIO = _req$body.USUARIO, CONTRASENA = _req$body.CONTRASENA, IMG_USUARIO = _req$body.IMG_USUARIO, CORREO_ELECTRONICO = _req$body.CORREO_ELECTRONICO, CREADO_POR = _req$body.CREADO_POR, FECHA_VENCIMIENTO = _req$body.FECHA_VENCIMIENTO, PREGUNTA = _req$body.PREGUNTA, RESPUESTA = _req$body.RESPUESTA, ESTADO = _req$body.ESTADO;
            _context.next = 3;
            return encrypt.encryptPassword(CONTRASENA);

          case 3:
            pass2 = _context.sent;
            _context.next = 6;
            return encrypt.encryptPassword(RESPUESTA);

          case 6:
            answer = _context.sent;
            img = ""; //Guarda foto

            if (!req.file) {
              _context.next = 14;
              break;
            }

            _context.next = 11;
            return cloudinary_services.uploadImage(req.file.path, "Maelcon/Perfiles");

          case 11:
            img = _context.sent;
            _context.next = 15;
            break;

          case 14:
            img = "https://res.cloudinary.com/maelcon/image/upload/v1649551517/Maelcon/Perfiles/tgjtgsblxyubftltsxra.png";

          case 15:
            _context.next = 17;
            return _databaseSQL["default"].query("CALL CREAR_MS_USUARIO(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@MENSAJE,@CODIGO);", [ID_PUESTO, NOMBRE_PERSONA, APELLIDO_PERSONA, GENERO, RTN, TELEFONO, SUELDO, ID_ROL, USUARIO, pass2, img, CORREO_ELECTRONICO, CREADO_POR, FECHA_VENCIMIENTO, PREGUNTA, answer]);

          case 17:
            objetos = _context.sent;
            mensaje = JSON.parse(JSON.stringify(objetos[0]));
            info = JSON.parse(JSON.stringify(mensaje));

            if (!(info[0]["CODIGO"] == 1)) {
              _context.next = 24;
              break;
            }

            contentHTML = "\n      <table style=\"max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;\">\n      <tr>\n        <td style=\"padding: 0\">\n          <img style=\"padding: 0; display: block\" src=\"https://res.cloudinary.com/maelcon/image/upload/v1649635374/Maelcon/BLG2011-YM-AMS-VirtualWelcome-Card_ufn1k5.png\" width=\"100%\">\n        </td>\n      </tr>\n      \n      <tr>\n        <td style=\"background-color: #ecf0f1\">\n          <div style=\"color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif\">\n            <h2 style=\"color: #e67e22; margin: 0 0 7px\">Hola ".concat(NOMBRE_PERSONA, " ").concat(APELLIDO_PERSONA, "!</h2>\n            <p style=\"margin: 2px; font-size: 15px\">\n              Bienvenido al sistema de Maelcon, al recibir este correo se confirma la creaci\xF3n de su usuario el cual\n              quedar\xE1 a la espera de ser dado de alta por un administrador, los modulos de trabajo son variados y el \n              administrador ser\xE1 el encargado de asignar tus areas.\n              <b>Posibles areas de trabajo:</b></p>\n            <ul style=\"font-size: 15px;  margin: 10px 0\">\n              <li>Modulo de compras.</li>\n              <li>Modulo de ventas.</li>\n              <li>Administrador de usuarios.</li>\n              <li>Administrador de sistema.</li>\n              <li>Control de inventarios y productos.</li>\n            </ul>\n            <div style=\"width: 100%;margin:20px 0; display: inline-block;text-align: center\">\n              <img style=\"padding: 0; width: 150px; margin: 5px\" src=\"https://res.cloudinary.com/maelcon/image/upload/v1649559247/Maelcon/descarga_oxoktv.jpg\">\n            </div>\n            <div style=\"width: 100%; text-align: center\">\n              <a style=\"text-decoration: none; border-radius: 5px; padding: 20px; color: white; background-color: #3498db\" href=\"https://maelcon.live/\">Ir a la p\xE1gina</a>\t\n            </div>\n            <p style=\"color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0\">Maelcon S de R.L. 2022</p>\n          </div>\n        </td>\n      </tr>\n    </table>\n      ");
            _context.next = 24;
            return email.sendEmail(CORREO_ELECTRONICO, "Confirmación de creación de cuenta ✔", contentHTML);

          case 24:
            res.json(info);

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createUser = createUser;

var getUsers = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var usuarios;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _databaseSQL["default"].query("SELECT * FROM tbl_ms_usuario");

          case 2:
            usuarios = _context2.sent;
            res.json({
              usuarios: JSON.parse(JSON.stringify(usuarios)),
              mensaje: [{
                MENSAJE: "Lista de Usuarios Retornada",
                CODIGO: 1
              }]
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getUsers(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getUsers = getUsers;

var getUserById = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var ID_USUARIO, id, usuario;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            ID_USUARIO = req.params.ID_USUARIO;
            id = parseInt(ID_USUARIO, 10);
            _context3.next = 4;
            return _databaseSQL["default"].query("SELECT * FROM tbl_ms_usuario WHERE ID_USUARIO = ?", [id]);

          case 4:
            usuario = _context3.sent;
            res.json({
              usuarios: JSON.parse(JSON.stringify(usuario)),
              mensaje: [{
                MENSAJE: "UsuariosRetornada",
                CODIGO: 1
              }]
            });

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getUserById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getUserById = getUserById;

var updateUserById = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var ID_USUARIO, _req$body2, ID_PUESTO, NOMBRE_PERSONA, APELLIDO_PERSONA, TELEFONO, SUELDO, ID_ROL, IMG_USUARIO, MODIFICADO_POR, img, objetos, mensaje, info;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            ID_USUARIO = req.params.ID_USUARIO;
            _req$body2 = req.body, ID_PUESTO = _req$body2.ID_PUESTO, NOMBRE_PERSONA = _req$body2.NOMBRE_PERSONA, APELLIDO_PERSONA = _req$body2.APELLIDO_PERSONA, TELEFONO = _req$body2.TELEFONO, SUELDO = _req$body2.SUELDO, ID_ROL = _req$body2.ID_ROL, IMG_USUARIO = _req$body2.IMG_USUARIO, MODIFICADO_POR = _req$body2.MODIFICADO_POR;
            img = ""; //Guarda foto

            if (!req.file) {
              _context4.next = 9;
              break;
            }

            _context4.next = 6;
            return cloudinary_services.uploadImage(req.file.path, "Maelcon/Perfiles");

          case 6:
            img = _context4.sent;
            _context4.next = 10;
            break;

          case 9:
            img = "https://res.cloudinary.com/maelcon/image/upload/v1649551517/Maelcon/Perfiles/tgjtgsblxyubftltsxra.png";

          case 10:
            _context4.next = 12;
            return _databaseSQL["default"].query("CALL ACTUALIZAR_MS_USUARIO(?,?,?,?,?,?,?,?,?,@MENSAJE,@CODIGO);", [ID_USUARIO, NOMBRE_PERSONA, APELLIDO_PERSONA, ID_PUESTO, TELEFONO, SUELDO, ID_ROL, img, MODIFICADO_POR]);

          case 12:
            objetos = _context4.sent;
            mensaje = JSON.parse(JSON.stringify(objetos[0]));
            info = JSON.parse(JSON.stringify(mensaje));
            res.json(objetos);

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateUserById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateUserById = updateUserById;

var deleteUserById = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var ID_USUARIO, id;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            ID_USUARIO = req.params.ID_USUARIO;
            id = parseInt(ID_USUARIO, 10);
            _context5.next = 4;
            return _databaseSQL["default"].query("DELETE FROM tbl_ms_usuario WHERE ID_USUARIO = ?", [id]);

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

  return function deleteUserById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}(); //Actualizar usuario


exports.deleteUserById = deleteUserById;

var updateUserByIdPA = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var ID_USUARIO, _req$body3, NOMBRE_PERSONA, APELLIDO_PERSONA, ID_PUESTO, TELEFONO, SUELDO, ID_ROL, IMG_USUARIO, MODIFICADO_POR, img, usuarioAct, objetos, mensaje;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            ID_USUARIO = req.params.ID_USUARIO;
            _req$body3 = req.body, NOMBRE_PERSONA = _req$body3.NOMBRE_PERSONA, APELLIDO_PERSONA = _req$body3.APELLIDO_PERSONA, ID_PUESTO = _req$body3.ID_PUESTO, TELEFONO = _req$body3.TELEFONO, SUELDO = _req$body3.SUELDO, ID_ROL = _req$body3.ID_ROL, IMG_USUARIO = _req$body3.IMG_USUARIO, MODIFICADO_POR = _req$body3.MODIFICADO_POR;

            if (!req.file) {
              _context6.next = 10;
              break;
            }

            _context6.next = 6;
            return cloudinary_services.uploadImage(req.file.path, "Maelcon/Perfiles");

          case 6:
            img = _context6.sent;
            console.log(img);
            _context6.next = 15;
            break;

          case 10:
            _context6.next = 12;
            return _databaseSQL["default"].query("CALL OBTENER_USUARIO(?, @MENSAJE, @CODIGO)", [ID_USUARIO]);

          case 12:
            usuarioAct = _context6.sent;
            console.log(usuarioAct);
            img = usuarioAct[0][0].IMG_USUARIO;

          case 15:
            _context6.next = 17;
            return _databaseSQL["default"].query("CALL ACTUALIZAR_MS_USUARIO(?,?,?,?,?,?,?,?,?,@MENSAJE,@CODIGO);", [ID_USUARIO, NOMBRE_PERSONA, APELLIDO_PERSONA, ID_PUESTO, TELEFONO, SUELDO, ID_ROL, img, MODIFICADO_POR]);

          case 17:
            objetos = _context6.sent;
            mensaje = JSON.parse(JSON.stringify(objetos[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }]
            });
            _context6.next = 25;
            break;

          case 22:
            _context6.prev = 22;
            _context6.t0 = _context6["catch"](0);
            res.json(_context6.t0);

          case 25:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 22]]);
  }));

  return function updateUserByIdPA(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.updateUserByIdPA = updateUserByIdPA;

var securityQA = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var ID_USUARIO, _req$body4, PREGUNTA, RESPUESTA, CREADO_POR, pass, objetos, mensaje;

    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            ID_USUARIO = req.params.ID_USUARIO;
            _req$body4 = req.body, PREGUNTA = _req$body4.PREGUNTA, RESPUESTA = _req$body4.RESPUESTA, CREADO_POR = _req$body4.CREADO_POR;
            _context7.next = 5;
            return encrypt.encryptPassword(RESPUESTA);

          case 5:
            pass = _context7.sent;
            _context7.next = 8;
            return _databaseSQL["default"].query("CALL CREAR_MS_PREGUNTA_RECUPERACION(?,?,?,?,@MENSAJE, @CODIGO);", [ID_USUARIO, PREGUNTA, pass, CREADO_POR]);

          case 8:
            objetos = _context7.sent;
            mensaje = JSON.parse(JSON.stringify(objetos[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }]
            });
            _context7.next = 16;
            break;

          case 13:
            _context7.prev = 13;
            _context7.t0 = _context7["catch"](0);
            res.json(_context7.t0);

          case 16:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 13]]);
  }));

  return function securityQA(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.securityQA = securityQA;

var updateSecurytyQA = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var ID_USUARIO, _req$body5, PREGUNTA, RESPUESTA, MODIFICADO_POR, pass, objetos, mensaje;

    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            ID_USUARIO = req.params.ID_USUARIO;
            _req$body5 = req.body, PREGUNTA = _req$body5.PREGUNTA, RESPUESTA = _req$body5.RESPUESTA, MODIFICADO_POR = _req$body5.MODIFICADO_POR;
            _context8.next = 5;
            return encrypt.encryptPassword(RESPUESTA);

          case 5:
            pass = _context8.sent;
            _context8.next = 8;
            return _databaseSQL["default"].query("CALL ACTUALIZAR_MS_PREGUNTA_RECUPERACION(?,?,?,?,@MENSAJE, @CODIGO);", [ID_USUARIO, PREGUNTA, pass, MODIFICADO_POR]);

          case 8:
            objetos = _context8.sent;
            mensaje = JSON.parse(JSON.stringify(objetos[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }]
            });
            _context8.next = 16;
            break;

          case 13:
            _context8.prev = 13;
            _context8.t0 = _context8["catch"](0);
            res.json(_context8.t0);

          case 16:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 13]]);
  }));

  return function updateSecurytyQA(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.updateSecurytyQA = updateSecurytyQA;

var updatePassword = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var ID_USUARIO, _req$body6, MODIFICADO_POR, CONTRASENA, password, objetos, mensaje, info, contentHTML, mensaje2, usuarioAct, correo;

    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            ID_USUARIO = req.params.ID_USUARIO;
            _req$body6 = req.body, MODIFICADO_POR = _req$body6.MODIFICADO_POR, CONTRASENA = _req$body6.CONTRASENA;
            _context9.next = 5;
            return encrypt.encryptPassword(CONTRASENA);

          case 5:
            password = _context9.sent;
            _context9.next = 8;
            return _databaseSQL["default"].query("CALL MODIFICAR_CONTRASENA(?,?,?, @MENSAJE, @CODIGO);", [ID_USUARIO, MODIFICADO_POR, password]);

          case 8:
            objetos = _context9.sent;
            _context9.next = 11;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 11:
            mensaje = _context9.sent;
            info = JSON.parse(JSON.stringify(mensaje));
            mensaje2 = JSON.parse(JSON.stringify(objetos[0]));
            _context9.next = 16;
            return _databaseSQL["default"].query("SELECT * FROM TBL_MS_USUARIO WHERE ID_USUARIO = ?", [ID_USUARIO]);

          case 16:
            usuarioAct = _context9.sent;
            correo = usuarioAct[0]["CORREO_ELECTRONICO"];

            if (!(info[0]["CODIGO"] == 1)) {
              _context9.next = 22;
              break;
            }

            contentHTML = "\n      <table style=\"max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;\">\n      <tr>\n        <td style=\"padding: 0\">\n          <img style=\"padding: 0; display: block\" src=\"https://res.cloudinary.com/maelcon/image/upload/v1649633845/Maelcon/strong_password_qmm0kb.png\" width=\"100%\">\n        </td>\n      </tr>\n      \n      <tr>\n        <td style=\"background-color: #ecf0f1\">\n          <div style=\"color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif\">\n            <h2 style=\"color: #e67e22; margin: 0 0 7px\">Cambio de contrase\xF1a \uD83D\uDD12</h2>\n            <p style=\"margin: 2px; font-size: 15px\">\n              Se ha registrado un cambio de contrase\xF1a para tu usuario, si no has sido tu reporte de forma inmediata esta actividad\n              irregular con el superior inmediato, de lo contrario ignore la advertencia.</p>\n            <div style=\"width: 100%;margin:20px 0; display: inline-block;text-align: center\">\n              <img style=\"padding: 0; width: 150px; margin: 5px\" src=\"https://res.cloudinary.com/maelcon/image/upload/v1649559247/Maelcon/descarga_oxoktv.jpg\">\n            </div>\n            <div style=\"width: 100%; text-align: center\">\n              <a style=\"text-decoration: none; border-radius: 5px; padding: 20px; color: white; background-color: #3498db\" href=\"https://maelcon.live/\">Ir a la p\xE1gina</a>\t\n            </div>\n            <p style=\"color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0\">Maelcon S de R.L. 2022</p>\n          </div>\n        </td>\n      </tr>\n    </table>\n      ";
            _context9.next = 22;
            return email.sendEmail(correo, "Cambio de contraseña exitoso ✔", contentHTML);

          case 22:
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }],
              info: info
            });
            _context9.next = 28;
            break;

          case 25:
            _context9.prev = 25;
            _context9.t0 = _context9["catch"](0);
            res.json(_context9.t0);

          case 28:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 25]]);
  }));

  return function updatePassword(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

exports.updatePassword = updatePassword;

var getSecurityQuestion = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var ID_USUARIO, pregunta;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            ID_USUARIO = req.params.ID_USUARIO;
            _context10.next = 4;
            return _databaseSQL["default"].query("CALL OBTENER_PREGUNTA_SEGURIDAD(?)", [ID_USUARIO]);

          case 4:
            pregunta = _context10.sent;
            res.json(JSON.parse(JSON.stringify(pregunta[0])));
            _context10.next = 11;
            break;

          case 8:
            _context10.prev = 8;
            _context10.t0 = _context10["catch"](0);
            res.json(_context10.t0);

          case 11:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[0, 8]]);
  }));

  return function getSecurityQuestion(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

exports.getSecurityQuestion = getSecurityQuestion;

var getSecurityAnswer = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
    var ID_USUARIO, respuesta;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            ID_USUARIO = req.params.ID_USUARIO;
            _context11.next = 4;
            return _databaseSQL["default"].query("CALL OBTENER_RESPUESTA_SEGURIDAD(?)", [ID_USUARIO]);

          case 4:
            respuesta = _context11.sent;
            res.json(JSON.parse(JSON.stringify(respuesta[0])));
            _context11.next = 11;
            break;

          case 8:
            _context11.prev = 8;
            _context11.t0 = _context11["catch"](0);
            res.json(_context11.t0);

          case 11:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[0, 8]]);
  }));

  return function getSecurityAnswer(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();

exports.getSecurityAnswer = getSecurityAnswer;

var getSecurityQuestionByEmail = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
    var CORREO, user, userData, pregunta, mensaje, processedQuestion, _mensaje;

    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            CORREO = req.params.CORREO;
            _context12.next = 4;
            return _databaseSQL["default"].query("CALL COMPROBAR_USUARIO(?,@MENSAJE, @CODIGO)", [CORREO]);

          case 4:
            user = _context12.sent;
            userData = JSON.parse(JSON.stringify(user[0][0]));

            if (!(userData["CODIGO"] == 0)) {
              _context12.next = 8;
              break;
            }

            return _context12.abrupt("return", res.json({
              mensaje: [userData]
            }));

          case 8:
            _context12.next = 10;
            return _databaseSQL["default"].query("CALL OBTENER_PREGUNTA_SEGURIDAD(?)", [userData["ID_USUARIO"]]);

          case 10:
            pregunta = _context12.sent;
            _context12.next = 13;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 13:
            mensaje = _context12.sent;
            processedQuestion = Object.values(JSON.parse(JSON.stringify(pregunta[0][0])));

            if (!(processedQuestion == "")) {
              _context12.next = 17;
              break;
            }

            return _context12.abrupt("return", res.json({
              mensaje: [{
                MENSAJE: "El usuario seleccionado no cuenta con una pregunta de seguridad",
                CODIGO: 0
              }]
            }));

          case 17:
            res.json({
              mensaje: JSON.parse(JSON.stringify(mensaje)),
              pregunta: processedQuestion
            });
            _context12.next = 26;
            break;

          case 20:
            _context12.prev = 20;
            _context12.t0 = _context12["catch"](0);
            _context12.next = 24;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 24:
            _mensaje = _context12.sent;
            res.status(401).json({
              error: _context12.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje))
            });

          case 26:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[0, 20]]);
  }));

  return function getSecurityQuestionByEmail(_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();

exports.getSecurityQuestionByEmail = getSecurityQuestionByEmail;

var getAnswerByEmail = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
    var CORREO, RESPUESTA, user, userData, respuesta, mensaje, processedAnswer, validatePassword, CONTRASENA, password, tokenSQL, contentHTML, confirmacion, _mensaje2;

    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            CORREO = req.params.CORREO;
            RESPUESTA = req.body.RESPUESTA;
            _context13.next = 5;
            return _databaseSQL["default"].query("CALL COMPROBAR_USUARIO(?,@MENSAJE, @CODIGO)", [CORREO]);

          case 5:
            user = _context13.sent;
            userData = Object.values(JSON.parse(JSON.stringify(user[0][0])));
            _context13.next = 9;
            return _databaseSQL["default"].query("CALL OBTENER_RESPUESTA_SEGURIDAD(?)", [userData[0]]);

          case 9:
            respuesta = _context13.sent;
            _context13.next = 12;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 12:
            mensaje = _context13.sent;
            processedAnswer = Object.values(JSON.parse(JSON.stringify(respuesta[0][0])));
            console.log(processedAnswer[0]);
            _context13.next = 17;
            return encrypt.comparePassword(RESPUESTA, processedAnswer[0]);

          case 17:
            validatePassword = _context13.sent;

            if (validatePassword) {
              _context13.next = 20;
              break;
            }

            return _context13.abrupt("return", res.json({
              mensaje: "Respuesta a pregunta de seguridad erronea"
            }));

          case 20:
            CONTRASENA = Math.floor(Math.random() * (999999 - 100000) - 100000);
            _context13.next = 23;
            return encrypt.encryptPassword(CONTRASENA.toString());

          case 23:
            password = _context13.sent;
            tokenSQL = _jsonwebtoken["default"].sign({
              id: userData[0],
              password: password,
              correo: CORREO
            }, _config["default"].SECRET, {
              expiresIn: 86400 * 7
            });
            confirmacion = JSON.parse(JSON.stringify(mensaje));

            if (!(confirmacion[0]["CODIGO"] == 1)) {
              _context13.next = 30;
              break;
            }

            contentHTML = "\n      <table style=\"max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;\">\n      <tr>\n        <td style=\"padding: 0\">\n          <img style=\"padding: 0; display: block\" src=\"https://res.cloudinary.com/maelcon/image/upload/v1649633845/Maelcon/strong_password_qmm0kb.png\" width=\"100%\">\n        </td>\n      </tr>\n      \n      <tr>\n        <td style=\"background-color: #ecf0f1\">\n          <div style=\"color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif\">\n            <h2 style=\"color: #e67e22; margin: 0 0 7px\">Cambio de contrase\xF1a \uD83D\uDD12</h2>\n            <p style=\"margin: 2px; font-size: 15px\">\n              Se ha registrado un reestablecimiento de contrase\xF1a para tu usuario, la duracion de este enlace es de 7 dias,\n               si no has sido tu reporte de forma inmediata esta actividad\n              irregular con el superior inmediato, de lo contrario ignore la advertencia.</p>\n            <a href=\"https://maelcon.live/#/recovery-password/".concat(tokenSQL, "\" style=\"\" target=\"_blank\">Haz click en este enlace para ingresar tu nueva contrase\xF1a</a>\n            <div style=\"width: 100%;margin:20px 0; display: inline-block;text-align: center\">\n              <img style=\"padding: 0; width: 150px; margin: 5px\" src=\"https://res.cloudinary.com/maelcon/image/upload/v1649559247/Maelcon/descarga_oxoktv.jpg\">\n            </div>\n            <div style=\"width: 100%; text-align: center\">\n              <a style=\"text-decoration: none; border-radius: 5px; padding: 20px; color: white; background-color: #3498db\" href=\"https://maelcon.live/\">Ir a la p\xE1gina</a>\t\n            </div>\n            <p style=\"color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0\">Maelcon S de R.L. 2022</p>\n          </div>\n        </td>\n      </tr>\n    </table>\n      ");
            _context13.next = 30;
            return email.sendEmail(CORREO, "Reestablecimiento de contraseña exitoso ✔", contentHTML);

          case 30:
            res.json({
              mensaje: JSON.parse(JSON.stringify(mensaje)),
              respuesta: validatePassword
            });
            _context13.next = 39;
            break;

          case 33:
            _context13.prev = 33;
            _context13.t0 = _context13["catch"](0);
            _context13.next = 37;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 37:
            _mensaje2 = _context13.sent;
            res.status(401).json({
              error: _context13.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje2))
            });

          case 39:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[0, 33]]);
  }));

  return function getAnswerByEmail(_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}();

exports.getAnswerByEmail = getAnswerByEmail;

var generatePasswordRecoveryTokenByEmail = /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res) {
    var CORREO, user, userData, CONTRASENA, password, tokenSQL, contentHTML, mensaje, confirmacion, _mensaje3;

    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            CORREO = req.params.CORREO;
            _context14.next = 4;
            return _databaseSQL["default"].query("CALL COMPROBAR_USUARIO(?,@MENSAJE, @CODIGO)", [CORREO]);

          case 4:
            user = _context14.sent;
            userData = Object.values(JSON.parse(JSON.stringify(user[0][0])));
            CONTRASENA = Math.floor(Math.random() * (999999 - 100000) - 100000);
            _context14.next = 9;
            return encrypt.encryptPassword(CONTRASENA.toString());

          case 9:
            password = _context14.sent;
            tokenSQL = _jsonwebtoken["default"].sign({
              id: userData[0],
              password: password,
              correo: CORREO
            }, _config["default"].SECRET, {
              expiresIn: 86400 * 7
            });
            _context14.next = 13;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 13:
            mensaje = _context14.sent;
            confirmacion = JSON.parse(JSON.stringify(mensaje));

            if (!(confirmacion[0]["CODIGO"] == 1)) {
              _context14.next = 19;
              break;
            }

            contentHTML = "\n      <table style=\"max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;\">\n      <tr>\n        <td style=\"padding: 0\">\n          <img style=\"padding: 0; display: block\" src=\"https://res.cloudinary.com/maelcon/image/upload/v1649633845/Maelcon/strong_password_qmm0kb.png\" width=\"100%\">\n        </td>\n      </tr>\n      \n      <tr>\n        <td style=\"background-color: #ecf0f1\">\n          <div style=\"color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif\">\n            <h2 style=\"color: #e67e22; margin: 0 0 7px\">Cambio de contrase\xF1a \uD83D\uDD12</h2>\n            <p style=\"margin: 2px; font-size: 15px\">\n              Se ha registrado un reestablecimiento de contrase\xF1a para tu usuario, la duracion de este enlace es de 7 dias,\n               si no has sido tu reporte de forma inmediata esta actividad\n              irregular con el superior inmediato, de lo contrario ignore la advertencia.</p>\n            <a href=\"https://maelcon.live/recovery-password/".concat(tokenSQL, "\" style=\"\" target=\"_blank\">Haz click en este enlace para ingresar tu nueva contrase\xF1a</a>\n            <div style=\"width: 100%;margin:20px 0; display: inline-block;text-align: center\">\n              <img style=\"padding: 0; width: 150px; margin: 5px\" src=\"https://res.cloudinary.com/maelcon/image/upload/v1649559247/Maelcon/descarga_oxoktv.jpg\">\n            </div>\n            <div style=\"width: 100%; text-align: center\">\n              <a style=\"text-decoration: none; border-radius: 5px; padding: 20px; color: white; background-color: #3498db\" href=\"https://maelcon.live/\">Ir a la p\xE1gina</a>\t\n            </div>\n            <p style=\"color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0\">Maelcon S de R.L. 2022</p>\n          </div>\n        </td>\n      </tr>\n    </table>\n      ");
            _context14.next = 19;
            return email.sendEmail(CORREO, "Reestablecimiento de contraseña exitoso ✔", contentHTML);

          case 19:
            res.json(tokenSQL);
            _context14.next = 28;
            break;

          case 22:
            _context14.prev = 22;
            _context14.t0 = _context14["catch"](0);
            _context14.next = 26;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 26:
            _mensaje3 = _context14.sent;
            res.status(401).json({
              error: _context14.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje3))
            });

          case 28:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, null, [[0, 22]]);
  }));

  return function generatePasswordRecoveryTokenByEmail(_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}();

exports.generatePasswordRecoveryTokenByEmail = generatePasswordRecoveryTokenByEmail;

var verifyRecoveryToken = /*#__PURE__*/function () {
  var _ref15 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(req, res) {
    var token, CONTRASENA, password, decoded, user, userData, updatedPassword, mensaje;
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.prev = 0;
            token = req.params.token;
            CONTRASENA = req.body.CONTRASENA;
            _context15.next = 5;
            return encrypt.encryptPassword(CONTRASENA);

          case 5:
            password = _context15.sent;

            if (token) {
              _context15.next = 8;
              break;
            }

            return _context15.abrupt("return", res.status(403).json({
              mensaje: "No se ha enviado ningun token"
            }));

          case 8:
            decoded = _jsonwebtoken["default"].verify(token, _config["default"].SECRET);
            _context15.next = 11;
            return _databaseSQL["default"].query("CALL COMPROBAR_USUARIO(?,@MENSAJE, @CODIGO)", [decoded["correo"]]);

          case 11:
            user = _context15.sent;
            userData = JSON.parse(JSON.stringify(user[0][0]));
            console.log(userData["ID_USUARIO"]);
            _context15.next = 16;
            return _databaseSQL["default"].query("CALL MODIFICAR_CONTRASENA(?,?,?, @MENSAJE, @CODIGO);", [userData["ID_USUARIO"], userData["ID_USUARIO"], password]);

          case 16:
            updatedPassword = _context15.sent;
            res.json(updatedPassword[0]);
            _context15.next = 28;
            break;

          case 20:
            _context15.prev = 20;
            _context15.t0 = _context15["catch"](0);
            _context15.next = 24;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 24:
            mensaje = _context15.sent;

            if (!(_context15.t0.message == "jwt expired")) {
              _context15.next = 27;
              break;
            }

            return _context15.abrupt("return", res.json({
              mensaje: [{
                MENSAJE: "El token ha expirado, restablecer contraseña de nuevo",
                CODIGO: 0
              }]
            }));

          case 27:
            res.status(401).json({
              error: _context15.t0.message,
              mensaje: JSON.parse(JSON.stringify(mensaje))
            });

          case 28:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, null, [[0, 20]]);
  }));

  return function verifyRecoveryToken(_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}();

exports.verifyRecoveryToken = verifyRecoveryToken;

var getUsersSQL = /*#__PURE__*/function () {
  var _ref16 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(req, res) {
    var user, mensaje, _mensaje4;

    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.prev = 0;
            _context16.next = 3;
            return _databaseSQL["default"].query("CALL OBTENER_USUARIOS(@MENSAJE, @CODIGO)");

          case 3:
            user = _context16.sent;
            mensaje = JSON.parse(JSON.stringify(user[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }],
              usuario: JSON.parse(JSON.stringify(user[0]))
            });
            _context16.next = 14;
            break;

          case 8:
            _context16.prev = 8;
            _context16.t0 = _context16["catch"](0);
            _context16.next = 12;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 12:
            _mensaje4 = _context16.sent;
            res.status(401).json({
              error: _context16.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje4))
            });

          case 14:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, null, [[0, 8]]);
  }));

  return function getUsersSQL(_x31, _x32) {
    return _ref16.apply(this, arguments);
  };
}();

exports.getUsersSQL = getUsersSQL;

var getUserSQL = /*#__PURE__*/function () {
  var _ref17 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(req, res) {
    var ID_USUARIO, user, mensaje, _mensaje5;

    return _regenerator["default"].wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.prev = 0;
            ID_USUARIO = req.params.ID_USUARIO;
            _context17.next = 4;
            return _databaseSQL["default"].query("CALL OBTENER_USUARIO(?,@MENSAJE, @CODIGO)", [ID_USUARIO]);

          case 4:
            user = _context17.sent;
            mensaje = JSON.parse(JSON.stringify(user[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }],
              usuario: JSON.parse(JSON.stringify(user[0]))
            });
            _context17.next = 15;
            break;

          case 9:
            _context17.prev = 9;
            _context17.t0 = _context17["catch"](0);
            _context17.next = 13;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 13:
            _mensaje5 = _context17.sent;
            res.status(401).json({
              error: _context17.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje5))
            });

          case 15:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17, null, [[0, 9]]);
  }));

  return function getUserSQL(_x33, _x34) {
    return _ref17.apply(this, arguments);
  };
}();

exports.getUserSQL = getUserSQL;

var getMyUser = /*#__PURE__*/function () {
  var _ref18 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18(req, res) {
    var ID_USUARIO, user, permisos, mensaje, _mensaje6;

    return _regenerator["default"].wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.prev = 0;
            ID_USUARIO = req.userId;
            _context18.next = 4;
            return _databaseSQL["default"].query("CALL OBTENER_USUARIO(?,@MENSAJE, @CODIGO)", [ID_USUARIO]);

          case 4:
            user = _context18.sent;
            _context18.next = 7;
            return _databaseSQL["default"].query("CALL OBTENER_PERMISOS(?,@MENSAJE, @CODIGO)", [ID_USUARIO]);

          case 7:
            permisos = _context18.sent;
            mensaje = JSON.parse(JSON.stringify(user[0]));
            console.log(ID_USUARIO);
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }],
              usuario: JSON.parse(JSON.stringify(user[0])),
              permisos: JSON.parse(JSON.stringify(permisos[0]))
            });
            _context18.next = 19;
            break;

          case 13:
            _context18.prev = 13;
            _context18.t0 = _context18["catch"](0);
            _context18.next = 17;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 17:
            _mensaje6 = _context18.sent;
            res.status(401).json({
              error: _context18.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje6))
            });

          case 19:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18, null, [[0, 13]]);
  }));

  return function getMyUser(_x35, _x36) {
    return _ref18.apply(this, arguments);
  };
}();

exports.getMyUser = getMyUser;