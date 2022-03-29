"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUserByIdPA = exports.updateUserById = exports.updateSecurytyQA = exports.updatePassword = exports.securityQA = exports.getUsersSQL = exports.getUsers = exports.getUserSQL = exports.getUserById = exports.getSecurityQuestion = exports.getSecurityAnswer = exports.deleteUserById = exports.createUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _router = require("express/lib/router");

var _databaseSQL = _interopRequireDefault(require("../databaseSQL"));

var encrypt = _interopRequireWildcard(require("../middlewares/encrypt"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var createUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, ID_PUESTO, NOMBRE, APELLIDO, GENERO, RTN, TELEFONO, SUELDO, ID_ROL, USUARIO, CONTRASENA, IMG_USUARIO, CORREO_ELECTRONICO, CREADO_POR, FECHA_VENCIMIENTO, pass2, mensaje;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, ID_PUESTO = _req$body.ID_PUESTO, NOMBRE = _req$body.NOMBRE, APELLIDO = _req$body.APELLIDO, GENERO = _req$body.GENERO, RTN = _req$body.RTN, TELEFONO = _req$body.TELEFONO, SUELDO = _req$body.SUELDO, ID_ROL = _req$body.ID_ROL, USUARIO = _req$body.USUARIO, CONTRASENA = _req$body.CONTRASENA, IMG_USUARIO = _req$body.IMG_USUARIO, CORREO_ELECTRONICO = _req$body.CORREO_ELECTRONICO, CREADO_POR = _req$body.CREADO_POR, FECHA_VENCIMIENTO = _req$body.FECHA_VENCIMIENTO;
            _context.next = 3;
            return encrypt.encryptPassword(CONTRASENA);

          case 3:
            pass2 = _context.sent;
            _context.next = 6;
            return _databaseSQL["default"].query("CALL CREAR_MS_USUARIO(\n        ".concat(ID_PUESTO, ",\n        ").concat(NOMBRE, ",\n        ").concat(APELLIDO, ",\n        ").concat(GENERO, ",\n        ").concat(RTN, ",\n        ").concat(TELEFONO, ",\n        ").concat(SUELDO, ",\n        ").concat(ID_ROL, ",\n        ").concat(USUARIO, ",\n        '").concat(pass2, "',\n        ").concat(IMG_USUARIO, ",\n        ").concat(CORREO_ELECTRONICO, ",\n        ").concat(CREADO_POR, ",\n        ").concat(FECHA_VENCIMIENTO, ",\n        @MENSAJE, \n        @CODIGO);"));

          case 6:
            _context.next = 8;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 8:
            mensaje = _context.sent;
            res.json(JSON.parse(JSON.stringify(mensaje)));

          case 10:
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
            res.json(JSON.parse(JSON.stringify(usuarios)));

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
            res.json(JSON.parse(JSON.stringify(usuario)));

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
    var ID_USUARIO, id;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            ID_USUARIO = req.params.ID_USUARIO;
            id = parseInt(ID_USUARIO, 10);
            _context4.next = 4;
            return _databaseSQL["default"].query("UPDATE tbl_ms_usuario set ? WHERE ID_USUARIO = ?", [req.body, id]);

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
    var ID_USUARIO, _req$body2, NOMBRE, APELLIDO, ID_PUESTO, TELEFONO, SUELDO, ID_ROL, IMG_USUARIO, MODIFICADO_POR, mensaje;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            ID_USUARIO = req.params.ID_USUARIO;
            _req$body2 = req.body, NOMBRE = _req$body2.NOMBRE, APELLIDO = _req$body2.APELLIDO, ID_PUESTO = _req$body2.ID_PUESTO, TELEFONO = _req$body2.TELEFONO, SUELDO = _req$body2.SUELDO, ID_ROL = _req$body2.ID_ROL, IMG_USUARIO = _req$body2.IMG_USUARIO, MODIFICADO_POR = _req$body2.MODIFICADO_POR;
            console.log(ID_USUARIO, NOMBRE, APELLIDO, ID_PUESTO, TELEFONO, SUELDO, ID_ROL, IMG_USUARIO, MODIFICADO_POR);
            _context6.next = 6;
            return _databaseSQL["default"].query("CALL ACTUALIZAR_MS_USUARIO(".concat(ID_USUARIO, ",").concat(NOMBRE, ",").concat(APELLIDO, ",").concat(ID_PUESTO, ",").concat(TELEFONO, ",").concat(SUELDO, ",").concat(ID_ROL, ",").concat(IMG_USUARIO, ",").concat(MODIFICADO_POR, ",@MENSAJE,@CODIGO);"));

          case 6:
            _context6.next = 8;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 8:
            mensaje = _context6.sent;
            res.json(JSON.parse(JSON.stringify(mensaje)));
            _context6.next = 15;
            break;

          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6["catch"](0);
            res.json(_context6.t0);

          case 15:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 12]]);
  }));

  return function updateUserByIdPA(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.updateUserByIdPA = updateUserByIdPA;

var securityQA = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var ID_USUARIO, _req$body3, PREGUNTA, RESPUESTA, CREADO_POR, pass, mensaje;

    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            ID_USUARIO = req.params.ID_USUARIO;
            _req$body3 = req.body, PREGUNTA = _req$body3.PREGUNTA, RESPUESTA = _req$body3.RESPUESTA, CREADO_POR = _req$body3.CREADO_POR;
            _context7.next = 5;
            return encrypt.encryptPassword(RESPUESTA);

          case 5:
            pass = _context7.sent;
            _context7.next = 8;
            return _databaseSQL["default"].query("CALL CREAR_MS_PREGUNTA_RECUPERACION(".concat(ID_USUARIO, ",").concat(PREGUNTA, ",'").concat(pass, "',").concat(CREADO_POR, ",@MENSAJE, @CODIGO);"));

          case 8:
            _context7.next = 10;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 10:
            mensaje = _context7.sent;
            res.json(JSON.parse(JSON.stringify(mensaje)));
            _context7.next = 17;
            break;

          case 14:
            _context7.prev = 14;
            _context7.t0 = _context7["catch"](0);
            res.json(_context7.t0);

          case 17:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 14]]);
  }));

  return function securityQA(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.securityQA = securityQA;

var updateSecurytyQA = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var ID_USUARIO, _req$body4, PREGUNTA, RESPUESTA, MODIFICADO_POR, pass, mensaje;

    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            ID_USUARIO = req.params.ID_USUARIO;
            _req$body4 = req.body, PREGUNTA = _req$body4.PREGUNTA, RESPUESTA = _req$body4.RESPUESTA, MODIFICADO_POR = _req$body4.MODIFICADO_POR;
            _context8.next = 5;
            return encrypt.encryptPassword(RESPUESTA);

          case 5:
            pass = _context8.sent;
            _context8.next = 8;
            return _databaseSQL["default"].query("CALL ACTUALIZAR_MS_PREGUNTA_RECUPERACION(".concat(ID_USUARIO, ",").concat(PREGUNTA, ",'").concat(pass, "',").concat(MODIFICADO_POR, ",@MENSAJE, @CODIGO);"));

          case 8:
            _context8.next = 10;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 10:
            mensaje = _context8.sent;
            res.json(JSON.parse(JSON.stringify(mensaje)));
            _context8.next = 17;
            break;

          case 14:
            _context8.prev = 14;
            _context8.t0 = _context8["catch"](0);
            res.json(_context8.t0);

          case 17:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 14]]);
  }));

  return function updateSecurytyQA(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.updateSecurytyQA = updateSecurytyQA;

var updatePassword = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var ID_USUARIO, _req$body5, MODIFICADO_POR, CONTRASENA, password, mensaje;

    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            ID_USUARIO = req.params.ID_USUARIO;
            _req$body5 = req.body, MODIFICADO_POR = _req$body5.MODIFICADO_POR, CONTRASENA = _req$body5.CONTRASENA;
            _context9.next = 5;
            return encrypt.encryptPassword(CONTRASENA);

          case 5:
            password = _context9.sent;
            _context9.next = 8;
            return _databaseSQL["default"].query("CALL MODIFICAR_CONTRASENA(?,?,?, @MENSAJE, @CODIGO);", [ID_USUARIO, MODIFICADO_POR, password]);

          case 8:
            _context9.next = 10;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 10:
            mensaje = _context9.sent;
            res.json(JSON.parse(JSON.stringify(mensaje)));
            _context9.next = 17;
            break;

          case 14:
            _context9.prev = 14;
            _context9.t0 = _context9["catch"](0);
            res.json(_context9.t0);

          case 17:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 14]]);
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

var getUsersSQL = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
    var user, mensaje, _mensaje;

    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            _context12.next = 3;
            return _databaseSQL["default"].query("CALL OBTENER_USUARIOS(@MENSAJE, @CODIGO)");

          case 3:
            user = _context12.sent;
            _context12.next = 6;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 6:
            mensaje = _context12.sent;
            res.json({
              mensaje: JSON.parse(JSON.stringify(mensaje)),
              usuario: JSON.parse(JSON.stringify(user[0]))
            });
            _context12.next = 16;
            break;

          case 10:
            _context12.prev = 10;
            _context12.t0 = _context12["catch"](0);
            _context12.next = 14;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 14:
            _mensaje = _context12.sent;
            res.status(401).json({
              error: _context12.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje))
            });

          case 16:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[0, 10]]);
  }));

  return function getUsersSQL(_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();

exports.getUsersSQL = getUsersSQL;

var getUserSQL = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
    var ID_USUARIO, user, mensaje, _mensaje2;

    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            ID_USUARIO = req.params.ID_USUARIO;
            _context13.next = 4;
            return _databaseSQL["default"].query("CALL OBTENER_USUARIO(?,@MENSAJE, @CODIGO)", [ID_USUARIO]);

          case 4:
            user = _context13.sent;
            _context13.next = 7;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 7:
            mensaje = _context13.sent;
            res.json({
              mensaje: JSON.parse(JSON.stringify(mensaje)),
              usuario: JSON.parse(JSON.stringify(user[0]))
            });
            _context13.next = 17;
            break;

          case 11:
            _context13.prev = 11;
            _context13.t0 = _context13["catch"](0);
            _context13.next = 15;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 15:
            _mensaje2 = _context13.sent;
            res.status(401).json({
              error: _context13.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje2))
            });

          case 17:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[0, 11]]);
  }));

  return function getUserSQL(_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}();

exports.getUserSQL = getUserSQL;