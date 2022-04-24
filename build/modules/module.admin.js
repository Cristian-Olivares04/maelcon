"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUserStatus = exports.updateRole = exports.updatePermission = exports.updatePaymentMethod = exports.updateParameter = exports.updateObject = exports.updateJob = exports.postBackupDB2 = exports.postBackupDB = exports.getRoles = exports.getRoleByID = exports.getPermissionsByRole = exports.getPermissions = exports.getPaymentMethods = exports.getPaymentMethodByID = exports.getParameters = exports.getParameterById = exports.getObjects = exports.getObjectByID = exports.getLogs = exports.getLogById = exports.getJobs = exports.getComissions = exports.getComissionById = exports.createRoles = exports.createPermission = exports.createPaymentMethod = exports.createParameter = exports.createObject = exports.createJob = exports.checkUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _regeneratorRuntime2 = require("regenerator-runtime");

var _databaseSQL = _interopRequireDefault(require("../databaseSQL"));

var _backup = _interopRequireDefault(require("../utils/backup"));

var _keys = _interopRequireDefault(require("../keys"));

var _mysqldump = _interopRequireDefault(require("mysqldump"));

var _directory = require("../backups/directory");

var fs = require("fs");

var moment = require("moment");

var updateUserStatus = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var ID_USUARIO, _req$body, ESTADO, MODIFICADO_POR, objetos, mensaje;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            ID_USUARIO = req.params.ID_USUARIO;
            _req$body = req.body, ESTADO = _req$body.ESTADO, MODIFICADO_POR = _req$body.MODIFICADO_POR;
            _context.next = 5;
            return _databaseSQL["default"].query("CALL ESTADO_USUARIO(?,?,?, @MENSAJE, @CODIGO);", [ID_USUARIO, ESTADO, MODIFICADO_POR]);

          case 5:
            objetos = _context.sent;
            mensaje = JSON.parse(JSON.stringify(objetos[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }]
            });
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            res.json(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function updateUserStatus(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.updateUserStatus = updateUserStatus;

var createRoles = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body2, ROL, DESCRIPCION, CREADO_POR, Objetos, mensaje;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body2 = req.body, ROL = _req$body2.ROL, DESCRIPCION = _req$body2.DESCRIPCION, CREADO_POR = _req$body2.CREADO_POR;
            _context2.next = 4;
            return _databaseSQL["default"].query("CALL CREAR_MS_ROL(?,?,?,@MENSAJE, @CODIGO);", [ROL, DESCRIPCION, CREADO_POR]);

          case 4:
            Objetos = _context2.sent;
            mensaje = JSON.parse(JSON.stringify(Objetos[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }]
            });
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            res.json(_context2.t0);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));

  return function createRoles(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.createRoles = createRoles;

var updateRole = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var ID_ROL, _req$body3, ROL, DESCRIPCION, MODIFICADO_POR, objetos, mensaje;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            ID_ROL = req.params.ID_ROL;
            _req$body3 = req.body, ROL = _req$body3.ROL, DESCRIPCION = _req$body3.DESCRIPCION, MODIFICADO_POR = _req$body3.MODIFICADO_POR;
            _context3.next = 5;
            return _databaseSQL["default"].query("CALL ACTUALIZAR_MS_ROL(?,?,?,?, @MENSAJE, @CODIGO);", [ID_ROL, ROL, DESCRIPCION, MODIFICADO_POR]);

          case 5:
            objetos = _context3.sent;
            mensaje = JSON.parse(JSON.stringify(objetos[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }]
            });
            _context3.next = 13;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            res.json(_context3.t0);

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 10]]);
  }));

  return function updateRole(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.updateRole = updateRole;

var createObject = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$body4, OBJETOS, TIPO_OBJETO, DESCRIPCION, CREADO_POR, objetos, mensaje;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _req$body4 = req.body, OBJETOS = _req$body4.OBJETOS, TIPO_OBJETO = _req$body4.TIPO_OBJETO, DESCRIPCION = _req$body4.DESCRIPCION, CREADO_POR = _req$body4.CREADO_POR;
            _context4.next = 4;
            return _databaseSQL["default"].query("CALL CREAR_OBJETOS(?,?,?,?,@MENSAJE, @CODIGO)", [OBJETOS, TIPO_OBJETO, DESCRIPCION, CREADO_POR]);

          case 4:
            objetos = _context4.sent;
            mensaje = JSON.parse(JSON.stringify(objetos[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }]
            });
            _context4.next = 12;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](0);
            res.json(_context4.t0);

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 9]]);
  }));

  return function createObject(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.createObject = createObject;

var updateObject = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var ID_OBJETO, _req$body5, OBJETOS, TIPO_OBJETO, DESCRIPCION, MODIFICADO_POR, objetos, mensaje;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            ID_OBJETO = req.params.ID_OBJETO;
            _req$body5 = req.body, OBJETOS = _req$body5.OBJETOS, TIPO_OBJETO = _req$body5.TIPO_OBJETO, DESCRIPCION = _req$body5.DESCRIPCION, MODIFICADO_POR = _req$body5.MODIFICADO_POR;
            _context5.next = 5;
            return _databaseSQL["default"].query("CALL MODIFICAR_OBJETOS(?,?,?,?,?,@MENSAJE, @CODIGO)", [ID_OBJETO, OBJETOS, TIPO_OBJETO, DESCRIPCION, MODIFICADO_POR]);

          case 5:
            objetos = _context5.sent;
            mensaje = JSON.parse(JSON.stringify(objetos[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }]
            });
            _context5.next = 13;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);
            res.json(_context5.t0);

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 10]]);
  }));

  return function updateObject(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.updateObject = updateObject;

var createPermission = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var _req$body6, ID_OBJETO, ID_ROL, INSERTAR, ELIMINAR, ACTUALIZAR, CONSULTAR, CREADO_POR, objetos, mensaje;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _req$body6 = req.body, ID_OBJETO = _req$body6.ID_OBJETO, ID_ROL = _req$body6.ID_ROL, INSERTAR = _req$body6.INSERTAR, ELIMINAR = _req$body6.ELIMINAR, ACTUALIZAR = _req$body6.ACTUALIZAR, CONSULTAR = _req$body6.CONSULTAR, CREADO_POR = _req$body6.CREADO_POR;
            _context6.next = 4;
            return _databaseSQL["default"].query("CALL CREAR_PERMISOS(?,?,?,?,?,?,?,@MENSAJE,@CODIGO);", [ID_OBJETO, ID_ROL, INSERTAR, ELIMINAR, ACTUALIZAR, CONSULTAR, CREADO_POR]);

          case 4:
            objetos = _context6.sent;
            mensaje = JSON.parse(JSON.stringify(objetos[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }]
            });
            _context6.next = 12;
            break;

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](0);
            res.json(_context6.t0);

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 9]]);
  }));

  return function createPermission(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.createPermission = createPermission;

var updatePermission = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var ID_OBJETO, _req$body7, ID_ROL, INSERTAR, ELIMINAR, ACTUALIZAR, CONSULTAR, MODIFICADO_POR, objetos, mensaje;

    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            ID_OBJETO = req.params.ID_OBJETO;
            _req$body7 = req.body, ID_ROL = _req$body7.ID_ROL, INSERTAR = _req$body7.INSERTAR, ELIMINAR = _req$body7.ELIMINAR, ACTUALIZAR = _req$body7.ACTUALIZAR, CONSULTAR = _req$body7.CONSULTAR, MODIFICADO_POR = _req$body7.MODIFICADO_POR;
            _context7.next = 5;
            return _databaseSQL["default"].query("CALL ACTUALIZAR_PERMISOS(?,?,?,?,?,?,?,@MENSAJE,@CODIGO);", [ID_OBJETO, ID_ROL, INSERTAR, ELIMINAR, ACTUALIZAR, CONSULTAR, MODIFICADO_POR]);

          case 5:
            objetos = _context7.sent;
            mensaje = JSON.parse(JSON.stringify(objetos[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }]
            });
            _context7.next = 13;
            break;

          case 10:
            _context7.prev = 10;
            _context7.t0 = _context7["catch"](0);
            res.json(_context7.t0);

          case 13:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 10]]);
  }));

  return function updatePermission(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.updatePermission = updatePermission;

var createPaymentMethod = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var _req$body8, FORMA_PAGO, DESCRIPCION, objetos, mensaje, _mensaje;

    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _req$body8 = req.body, FORMA_PAGO = _req$body8.FORMA_PAGO, DESCRIPCION = _req$body8.DESCRIPCION;
            _context8.next = 4;
            return _databaseSQL["default"].query("CALL CREAR_METODO_PAGO(?,?,@MENSAJE, @CODIGO)", [FORMA_PAGO, DESCRIPCION]);

          case 4:
            objetos = _context8.sent;
            mensaje = JSON.parse(JSON.stringify(objetos[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }]
            });
            _context8.next = 15;
            break;

          case 9:
            _context8.prev = 9;
            _context8.t0 = _context8["catch"](0);
            _context8.next = 13;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 13:
            _mensaje = _context8.sent;
            res.status(401).json({
              error: _context8.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje))
            });

          case 15:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 9]]);
  }));

  return function createPaymentMethod(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.createPaymentMethod = createPaymentMethod;

var updatePaymentMethod = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var ID_PAGO, _req$body9, FORMA_PAGO, DESCRIPCION, objetos, mensaje, _mensaje2;

    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            ID_PAGO = req.params.ID_PAGO;
            _req$body9 = req.body, FORMA_PAGO = _req$body9.FORMA_PAGO, DESCRIPCION = _req$body9.DESCRIPCION;
            _context9.next = 5;
            return _databaseSQL["default"].query("CALL MODIFICAR_METODO_PAGO(?,?,?,@MENSAJE, @CODIGO)", [ID_PAGO, FORMA_PAGO, DESCRIPCION]);

          case 5:
            objetos = _context9.sent;
            mensaje = JSON.parse(JSON.stringify(objetos[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }]
            });
            _context9.next = 16;
            break;

          case 10:
            _context9.prev = 10;
            _context9.t0 = _context9["catch"](0);
            _context9.next = 14;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 14:
            _mensaje2 = _context9.sent;
            res.status(401).json({
              error: _context9.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje2))
            });

          case 16:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 10]]);
  }));

  return function updatePaymentMethod(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

exports.updatePaymentMethod = updatePaymentMethod;

var createParameter = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var _req$body10, PARAMETRO, ID_USUARIO, VALOR, FECHA_CREACION, FECHA_MODIFICACION, objetos, mensaje, _mensaje3;

    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _req$body10 = req.body, PARAMETRO = _req$body10.PARAMETRO, ID_USUARIO = _req$body10.ID_USUARIO, VALOR = _req$body10.VALOR, FECHA_CREACION = _req$body10.FECHA_CREACION, FECHA_MODIFICACION = _req$body10.FECHA_MODIFICACION;
            _context10.next = 4;
            return _databaseSQL["default"].query("CALL CREAR_MS_PARAMETRO(?,?,?,?,?,@MENSAJE, @CODIGO)", [PARAMETRO, ID_USUARIO, VALOR]);

          case 4:
            objetos = _context10.sent;
            mensaje = JSON.parse(JSON.stringify(objetos[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }]
            });
            _context10.next = 15;
            break;

          case 9:
            _context10.prev = 9;
            _context10.t0 = _context10["catch"](0);
            _context10.next = 13;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 13:
            _mensaje3 = _context10.sent;
            res.status(401).json({
              error: _context10.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje3))
            });

          case 15:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[0, 9]]);
  }));

  return function createParameter(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

exports.createParameter = createParameter;

var updateParameter = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
    var parameters, i, _req$body$i, ID_PARAMETRO, ID_USUARIO, VALOR, mensaje, _mensaje4;

    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            parameters = req.body;
            i = 0;

          case 3:
            if (!(i < parameters.length)) {
              _context11.next = 11;
              break;
            }

            _req$body$i = req.body[i], ID_PARAMETRO = _req$body$i.ID_PARAMETRO, ID_USUARIO = _req$body$i.ID_USUARIO, VALOR = _req$body$i.VALOR;
            console.log(req.body[i]);
            _context11.next = 8;
            return _databaseSQL["default"].query("CALL ACTUALIZAR_MS_PARAMETRO(?,?,?,@MENSAJE, @CODIGO)", [ID_PARAMETRO, ID_USUARIO, VALOR]);

          case 8:
            i++;
            _context11.next = 3;
            break;

          case 11:
            mensaje = {
              MENSAJE: "Parametros actualizados exitosamente.",
              CODIGO: 1
            };
            res.json(JSON.parse(JSON.stringify(mensaje)));
            _context11.next = 19;
            break;

          case 15:
            _context11.prev = 15;
            _context11.t0 = _context11["catch"](0);
            _mensaje4 = {
              MENSAJE: "Ha ocurrido un error inesperado, parametros no actualizados.",
              CODIGO: 0
            };
            res.status(401).json({
              error: _context11.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje4))
            });

          case 19:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[0, 15]]);
  }));

  return function updateParameter(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();

exports.updateParameter = updateParameter;

var getPermissions = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
    var ID_USUARIO, permisos, mensaje, _mensaje5;

    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            ID_USUARIO = req.params.ID_USUARIO;
            _context12.next = 4;
            return _databaseSQL["default"].query("CALL OBTENER_PERMISOS(?,@MENSAJE, @CODIGO)", [ID_USUARIO]);

          case 4:
            permisos = _context12.sent;
            mensaje = JSON.parse(JSON.stringify(permisos[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }],
              permisos: JSON.parse(JSON.stringify(permisos[0]))
            });
            _context12.next = 15;
            break;

          case 9:
            _context12.prev = 9;
            _context12.t0 = _context12["catch"](0);
            _context12.next = 13;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 13:
            _mensaje5 = _context12.sent;
            res.status(401).json({
              error: _context12.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje5))
            });

          case 15:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[0, 9]]);
  }));

  return function getPermissions(_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();

exports.getPermissions = getPermissions;

var checkUser = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
    var CORREO, user, mensaje, _mensaje6;

    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            CORREO = req.body.CORREO;
            _context13.next = 4;
            return _databaseSQL["default"].query("CALL COMPROBAR_USUARIO(?,@MENSAJE, @CODIGO)", [CORREO]);

          case 4:
            user = _context13.sent;
            mensaje = JSON.parse(JSON.stringify(user[1]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }],
              usuario: JSON.parse(JSON.stringify(user[0]))
            });
            _context13.next = 15;
            break;

          case 9:
            _context13.prev = 9;
            _context13.t0 = _context13["catch"](0);
            _context13.next = 13;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 13:
            _mensaje6 = _context13.sent;
            res.status(401).json({
              error: _context13.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje6))
            });

          case 15:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[0, 9]]);
  }));

  return function checkUser(_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}();

exports.checkUser = checkUser;

var getRoles = /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res) {
    var roles, mensaje, _mensaje7;

    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            _context14.next = 3;
            return _databaseSQL["default"].query("CALL OBTENER_ROLES(@MENSAJE, @CODIGO)");

          case 3:
            roles = _context14.sent;
            mensaje = JSON.parse(JSON.stringify(roles[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }],
              roles: JSON.parse(JSON.stringify(roles[0]))
            });
            _context14.next = 14;
            break;

          case 8:
            _context14.prev = 8;
            _context14.t0 = _context14["catch"](0);
            _context14.next = 12;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 12:
            _mensaje7 = _context14.sent;
            res.status(401).json({
              error: _context14.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje7))
            });

          case 14:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, null, [[0, 8]]);
  }));

  return function getRoles(_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}();

exports.getRoles = getRoles;

var getRoleByID = /*#__PURE__*/function () {
  var _ref15 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(req, res) {
    var ID_ROL, rol, mensaje, _mensaje8;

    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.prev = 0;
            ID_ROL = req.params.ID_ROL;
            _context15.next = 4;
            return _databaseSQL["default"].query("CALL OBTENER_ROL(?,@MENSAJE, @CODIGO)", [ID_ROL]);

          case 4:
            rol = _context15.sent;
            mensaje = JSON.parse(JSON.stringify(rol[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }],
              rol: JSON.parse(JSON.stringify(rol[0]))
            });
            _context15.next = 15;
            break;

          case 9:
            _context15.prev = 9;
            _context15.t0 = _context15["catch"](0);
            _context15.next = 13;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 13:
            _mensaje8 = _context15.sent;
            res.status(401).json({
              error: _context15.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje8))
            });

          case 15:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, null, [[0, 9]]);
  }));

  return function getRoleByID(_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}();

exports.getRoleByID = getRoleByID;

var getObjects = /*#__PURE__*/function () {
  var _ref16 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(req, res) {
    var Objetos, mensaje, _mensaje9;

    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.prev = 0;
            _context16.next = 3;
            return _databaseSQL["default"].query("CALL OBTENER_OBJETOS(@MENSAJE, @CODIGO)");

          case 3:
            Objetos = _context16.sent;
            mensaje = JSON.parse(JSON.stringify(Objetos[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }],
              Objetos: JSON.parse(JSON.stringify(Objetos[0]))
            });
            _context16.next = 14;
            break;

          case 8:
            _context16.prev = 8;
            _context16.t0 = _context16["catch"](0);
            _context16.next = 12;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 12:
            _mensaje9 = _context16.sent;
            res.status(401).json({
              error: _context16.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje9))
            });

          case 14:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, null, [[0, 8]]);
  }));

  return function getObjects(_x31, _x32) {
    return _ref16.apply(this, arguments);
  };
}();

exports.getObjects = getObjects;

var getObjectByID = /*#__PURE__*/function () {
  var _ref17 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(req, res) {
    var ID_OBJETO, OBJETO, mensaje, _mensaje10;

    return _regenerator["default"].wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.prev = 0;
            ID_OBJETO = req.params.ID_OBJETO;
            _context17.next = 4;
            return _databaseSQL["default"].query("CALL OBTENER_OBJETO(?,@MENSAJE, @CODIGO)", [ID_OBJETO]);

          case 4:
            OBJETO = _context17.sent;
            mm;
            mensaje = JSON.parse(JSON.stringify(OBJETO[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }],
              OBJETO: JSON.parse(JSON.stringify(OBJETO[0]))
            });
            _context17.next = 16;
            break;

          case 10:
            _context17.prev = 10;
            _context17.t0 = _context17["catch"](0);
            _context17.next = 14;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 14:
            _mensaje10 = _context17.sent;
            res.status(401).json({
              error: _context17.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje10))
            });

          case 16:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17, null, [[0, 10]]);
  }));

  return function getObjectByID(_x33, _x34) {
    return _ref17.apply(this, arguments);
  };
}();

exports.getObjectByID = getObjectByID;

var getPaymentMethods = /*#__PURE__*/function () {
  var _ref18 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18(req, res) {
    var met_pag, mensaje, _mensaje11;

    return _regenerator["default"].wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.prev = 0;
            _context18.next = 3;
            return _databaseSQL["default"].query("CALL OBTENER_MET_PAGO(@MENSAJE, @CODIGO)");

          case 3:
            met_pag = _context18.sent;
            mensaje = JSON.parse(JSON.stringify(met_pag[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }],
              Objetos: JSON.parse(JSON.stringify(met_pag[0]))
            });
            _context18.next = 14;
            break;

          case 8:
            _context18.prev = 8;
            _context18.t0 = _context18["catch"](0);
            _context18.next = 12;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 12:
            _mensaje11 = _context18.sent;
            res.status(401).json({
              error: _context18.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje11))
            });

          case 14:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18, null, [[0, 8]]);
  }));

  return function getPaymentMethods(_x35, _x36) {
    return _ref18.apply(this, arguments);
  };
}();

exports.getPaymentMethods = getPaymentMethods;

var getPaymentMethodByID = /*#__PURE__*/function () {
  var _ref19 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19(req, res) {
    var ID_PAGO, PAGO, mensaje, _mensaje12;

    return _regenerator["default"].wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _context19.prev = 0;
            ID_PAGO = req.params.ID_PAGO;
            _context19.next = 4;
            return _databaseSQL["default"].query("CALL OBTENER_MET_PAGO_ID(?,@MENSAJE, @CODIGO)", [ID_PAGO]);

          case 4:
            PAGO = _context19.sent;
            mensaje = JSON.parse(JSON.stringify(PAGO[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }],
              OBJETO: JSON.parse(JSON.stringify(PAGO[0]))
            });
            _context19.next = 15;
            break;

          case 9:
            _context19.prev = 9;
            _context19.t0 = _context19["catch"](0);
            _context19.next = 13;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 13:
            _mensaje12 = _context19.sent;
            res.status(401).json({
              error: _context19.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje12))
            });

          case 15:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19, null, [[0, 9]]);
  }));

  return function getPaymentMethodByID(_x37, _x38) {
    return _ref19.apply(this, arguments);
  };
}();

exports.getPaymentMethodByID = getPaymentMethodByID;

var getParameters = /*#__PURE__*/function () {
  var _ref20 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20(req, res) {
    var parametros, mensaje, _mensaje13;

    return _regenerator["default"].wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _context20.prev = 0;
            _context20.next = 3;
            return _databaseSQL["default"].query("CALL OBTENER_PARAMETROS(@MENSAJE, @CODIGO)");

          case 3:
            parametros = _context20.sent;
            mensaje = JSON.parse(JSON.stringify(parametros[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }],
              parametros: JSON.parse(JSON.stringify(parametros[0]))
            });
            _context20.next = 14;
            break;

          case 8:
            _context20.prev = 8;
            _context20.t0 = _context20["catch"](0);
            _context20.next = 12;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 12:
            _mensaje13 = _context20.sent;
            res.status(401).json({
              error: _context20.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje13))
            });

          case 14:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20, null, [[0, 8]]);
  }));

  return function getParameters(_x39, _x40) {
    return _ref20.apply(this, arguments);
  };
}();

exports.getParameters = getParameters;

var getParameterById = /*#__PURE__*/function () {
  var _ref21 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21(req, res) {
    var ID_PARAMETRO, PARAMETRO, mensaje, _mensaje14;

    return _regenerator["default"].wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            _context21.prev = 0;
            ID_PARAMETRO = req.params.ID_PARAMETRO;
            _context21.next = 4;
            return _databaseSQL["default"].query("CALL OBTENER_PARAMETRO(?,@MENSAJE, @CODIGO)", [ID_PARAMETRO]);

          case 4:
            PARAMETRO = _context21.sent;
            mensaje = JSON.parse(JSON.stringify(PARAMETRO[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }],
              parametro: JSON.parse(JSON.stringify(PARAMETRO[0]))
            });
            _context21.next = 15;
            break;

          case 9:
            _context21.prev = 9;
            _context21.t0 = _context21["catch"](0);
            _context21.next = 13;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 13:
            _mensaje14 = _context21.sent;
            res.status(401).json({
              error: _context21.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje14))
            });

          case 15:
          case "end":
            return _context21.stop();
        }
      }
    }, _callee21, null, [[0, 9]]);
  }));

  return function getParameterById(_x41, _x42) {
    return _ref21.apply(this, arguments);
  };
}();

exports.getParameterById = getParameterById;

var getLogs = /*#__PURE__*/function () {
  var _ref22 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22(req, res) {
    var BITACORA, mensaje, _mensaje15;

    return _regenerator["default"].wrap(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            _context22.prev = 0;
            _context22.next = 3;
            return _databaseSQL["default"].query("CALL OBTENER_BITACORA(@MENSAJE, @CODIGO)");

          case 3:
            BITACORA = _context22.sent;
            mensaje = JSON.parse(JSON.stringify(BITACORA[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }],
              BITACORA: JSON.parse(JSON.stringify(BITACORA[0]))
            });
            _context22.next = 14;
            break;

          case 8:
            _context22.prev = 8;
            _context22.t0 = _context22["catch"](0);
            _context22.next = 12;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 12:
            _mensaje15 = _context22.sent;
            res.status(401).json({
              error: _context22.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje15))
            });

          case 14:
          case "end":
            return _context22.stop();
        }
      }
    }, _callee22, null, [[0, 8]]);
  }));

  return function getLogs(_x43, _x44) {
    return _ref22.apply(this, arguments);
  };
}();

exports.getLogs = getLogs;

var getLogById = /*#__PURE__*/function () {
  var _ref23 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23(req, res) {
    var ID_BITACORA, BITACORA, mensaje, _mensaje16;

    return _regenerator["default"].wrap(function _callee23$(_context23) {
      while (1) {
        switch (_context23.prev = _context23.next) {
          case 0:
            _context23.prev = 0;
            ID_BITACORA = req.params.ID_BITACORA;
            _context23.next = 4;
            return _databaseSQL["default"].query("CALL OBTENER_BITACORA_ID(?,@MENSAJE, @CODIGO)", [ID_BITACORA]);

          case 4:
            BITACORA = _context23.sent;
            mensaje = JSON.parse(JSON.stringify(BITACORA[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }],
              bitacora: JSON.parse(JSON.stringify(BITACORA[0]))
            });
            _context23.next = 15;
            break;

          case 9:
            _context23.prev = 9;
            _context23.t0 = _context23["catch"](0);
            _context23.next = 13;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 13:
            _mensaje16 = _context23.sent;
            res.status(401).json({
              error: _context23.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje16))
            });

          case 15:
          case "end":
            return _context23.stop();
        }
      }
    }, _callee23, null, [[0, 9]]);
  }));

  return function getLogById(_x45, _x46) {
    return _ref23.apply(this, arguments);
  };
}();

exports.getLogById = getLogById;

var getComissions = /*#__PURE__*/function () {
  var _ref24 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee24(req, res) {
    var COMISION, mensaje, _mensaje17;

    return _regenerator["default"].wrap(function _callee24$(_context24) {
      while (1) {
        switch (_context24.prev = _context24.next) {
          case 0:
            _context24.prev = 0;
            _context24.next = 3;
            return _databaseSQL["default"].query("CALL OBTENER_COMISIONES(@MENSAJE, @CODIGO)");

          case 3:
            COMISION = _context24.sent;
            mensaje = JSON.parse(JSON.stringify(COMISION[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }],
              COMISION: JSON.parse(JSON.stringify(COMISION[0]))
            });
            _context24.next = 14;
            break;

          case 8:
            _context24.prev = 8;
            _context24.t0 = _context24["catch"](0);
            _context24.next = 12;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 12:
            _mensaje17 = _context24.sent;
            res.status(401).json({
              error: _context24.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje17))
            });

          case 14:
          case "end":
            return _context24.stop();
        }
      }
    }, _callee24, null, [[0, 8]]);
  }));

  return function getComissions(_x47, _x48) {
    return _ref24.apply(this, arguments);
  };
}();

exports.getComissions = getComissions;

var getPermissionsByRole = /*#__PURE__*/function () {
  var _ref25 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee25(req, res) {
    var rolePermissions, mensaje, _mensaje18;

    return _regenerator["default"].wrap(function _callee25$(_context25) {
      while (1) {
        switch (_context25.prev = _context25.next) {
          case 0:
            _context25.prev = 0;
            _context25.next = 3;
            return _databaseSQL["default"].query("CALL OBTENER_PERMISOS_ROL(@MENSAJE, @CODIGO)");

          case 3:
            rolePermissions = _context25.sent;
            mensaje = JSON.parse(JSON.stringify(rolePermissions[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }],
              permisosRol: JSON.parse(JSON.stringify(rolePermissions[0]))
            });
            _context25.next = 14;
            break;

          case 8:
            _context25.prev = 8;
            _context25.t0 = _context25["catch"](0);
            _context25.next = 12;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 12:
            _mensaje18 = _context25.sent;
            res.status(401).json({
              error: _context25.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje18))
            });

          case 14:
          case "end":
            return _context25.stop();
        }
      }
    }, _callee25, null, [[0, 8]]);
  }));

  return function getPermissionsByRole(_x49, _x50) {
    return _ref25.apply(this, arguments);
  };
}();

exports.getPermissionsByRole = getPermissionsByRole;

var getComissionById = /*#__PURE__*/function () {
  var _ref26 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee26(req, res) {
    var ID_USUARIO, COMISION, mensaje, _mensaje19;

    return _regenerator["default"].wrap(function _callee26$(_context26) {
      while (1) {
        switch (_context26.prev = _context26.next) {
          case 0:
            _context26.prev = 0;
            ID_USUARIO = req.params.ID_USUARIO;
            _context26.next = 4;
            return _databaseSQL["default"].query("CALL OBTENER_COMISIONES_USUARIO(?,@MENSAJE, @CODIGO, @COMISIONES_TOTAL)", [ID_USUARIO]);

          case 4:
            COMISION = _context26.sent;
            mensaje = JSON.parse(JSON.stringify(COMISION[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"],
                COMISIONES_TOTAL: mensaje[0]["COMISIONES_TOTAL"]
              }],
              COMISION: JSON.parse(JSON.stringify(COMISION[0]))
            });
            _context26.next = 15;
            break;

          case 9:
            _context26.prev = 9;
            _context26.t0 = _context26["catch"](0);
            _context26.next = 13;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 13:
            _mensaje19 = _context26.sent;
            res.status(401).json({
              error: _context26.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje19))
            });

          case 15:
          case "end":
            return _context26.stop();
        }
      }
    }, _callee26, null, [[0, 9]]);
  }));

  return function getComissionById(_x51, _x52) {
    return _ref26.apply(this, arguments);
  };
}();

exports.getComissionById = getComissionById;

var postBackupDB = /*#__PURE__*/function () {
  var _ref27 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee27(req, res) {
    var mensaje;
    return _regenerator["default"].wrap(function _callee27$(_context27) {
      while (1) {
        switch (_context27.prev = _context27.next) {
          case 0:
            _context27.prev = 0;
            _context27.next = 3;
            return _backup["default"].backupDB(req.body.name);

          case 3:
            mensaje = _context27.sent;
            res.json(mensaje);
            _context27.next = 10;
            break;

          case 7:
            _context27.prev = 7;
            _context27.t0 = _context27["catch"](0);
            res.status(401).json({
              error: _context27.t0.message
            });

          case 10:
          case "end":
            return _context27.stop();
        }
      }
    }, _callee27, null, [[0, 7]]);
  }));

  return function postBackupDB(_x53, _x54) {
    return _ref27.apply(this, arguments);
  };
}();

exports.postBackupDB = postBackupDB;

var postBackupDB2 = /*#__PURE__*/function () {
  var _ref28 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee28(req, res) {
    var fileName, wstream;
    return _regenerator["default"].wrap(function _callee28$(_context28) {
      while (1) {
        switch (_context28.prev = _context28.next) {
          case 0:
            _context28.prev = 0;
            fileName = "".concat(req.body.name, "_").concat(moment().format("YYYY_MM_DD"), ".sql");
            wstream = fs.createWriteStream("".concat(_directory.dir, "/").concat(fileName));
            _context28.next = 5;
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
            res.download(wstream.path);
            _context28.next = 11;
            break;

          case 8:
            _context28.prev = 8;
            _context28.t0 = _context28["catch"](0);
            res.status(401).json({
              error: _context28.t0.message
            });

          case 11:
          case "end":
            return _context28.stop();
        }
      }
    }, _callee28, null, [[0, 8]]);
  }));

  return function postBackupDB2(_x55, _x56) {
    return _ref28.apply(this, arguments);
  };
}();

exports.postBackupDB2 = postBackupDB2;

var createJob = /*#__PURE__*/function () {
  var _ref29 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee29(req, res) {
    var _req$body11, PUESTO, DESCRIPCION, objetos, mensaje, _mensaje20;

    return _regenerator["default"].wrap(function _callee29$(_context29) {
      while (1) {
        switch (_context29.prev = _context29.next) {
          case 0:
            _context29.prev = 0;
            _req$body11 = req.body, PUESTO = _req$body11.PUESTO, DESCRIPCION = _req$body11.DESCRIPCION;
            _context29.next = 4;
            return _databaseSQL["default"].query("CALL CREAR_MP_PUESTO(?,?,@MENSAJE, @CODIGO);", [PUESTO, DESCRIPCION]);

          case 4:
            objetos = _context29.sent;
            mensaje = JSON.parse(JSON.stringify(objetos[0]));
            res.status(200).json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }]
            });
            _context29.next = 15;
            break;

          case 9:
            _context29.prev = 9;
            _context29.t0 = _context29["catch"](0);
            _context29.next = 13;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 13:
            _mensaje20 = _context29.sent;
            res.status(401).json({
              error: _context29.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje20))
            });

          case 15:
          case "end":
            return _context29.stop();
        }
      }
    }, _callee29, null, [[0, 9]]);
  }));

  return function createJob(_x57, _x58) {
    return _ref29.apply(this, arguments);
  };
}();

exports.createJob = createJob;

var updateJob = /*#__PURE__*/function () {
  var _ref30 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee30(req, res) {
    var ID_PUESTO, _req$body12, PUESTO, DESCRIPCION, objetos, mensaje, _mensaje21;

    return _regenerator["default"].wrap(function _callee30$(_context30) {
      while (1) {
        switch (_context30.prev = _context30.next) {
          case 0:
            _context30.prev = 0;
            ID_PUESTO = req.params.ID_PUESTO;
            _req$body12 = req.body, PUESTO = _req$body12.PUESTO, DESCRIPCION = _req$body12.DESCRIPCION;
            _context30.next = 5;
            return _databaseSQL["default"].query("CALL ACTUALIZAR_MP_PUESTO(?,?,?,@MENSAJE, @CODIGO);", [ID_PUESTO, PUESTO, DESCRIPCION]);

          case 5:
            objetos = _context30.sent;
            mensaje = JSON.parse(JSON.stringify(objetos[0]));
            res.status(200).json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }]
            });
            _context30.next = 16;
            break;

          case 10:
            _context30.prev = 10;
            _context30.t0 = _context30["catch"](0);
            _context30.next = 14;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 14:
            _mensaje21 = _context30.sent;
            res.status(401).json({
              error: _context30.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje21))
            });

          case 16:
          case "end":
            return _context30.stop();
        }
      }
    }, _callee30, null, [[0, 10]]);
  }));

  return function updateJob(_x59, _x60) {
    return _ref30.apply(this, arguments);
  };
}();

exports.updateJob = updateJob;

var getJobs = /*#__PURE__*/function () {
  var _ref31 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee31(req, res) {
    var puestos, mensaje, _mensaje22;

    return _regenerator["default"].wrap(function _callee31$(_context31) {
      while (1) {
        switch (_context31.prev = _context31.next) {
          case 0:
            _context31.prev = 0;
            _context31.next = 3;
            return _databaseSQL["default"].query("CALL OBTENER_PUESTOS(@MENSAJE, @CODIGO);");

          case 3:
            puestos = _context31.sent;
            mensaje = JSON.parse(JSON.stringify(puestos[0]));
            res.status(200).json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }],
              puestos: JSON.parse(JSON.stringify(puestos))[0]
            });
            _context31.next = 14;
            break;

          case 8:
            _context31.prev = 8;
            _context31.t0 = _context31["catch"](0);
            _context31.next = 12;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 12:
            _mensaje22 = _context31.sent;
            res.status(401).json({
              error: _context31.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje22))
            });

          case 14:
          case "end":
            return _context31.stop();
        }
      }
    }, _callee31, null, [[0, 8]]);
  }));

  return function getJobs(_x61, _x62) {
    return _ref31.apply(this, arguments);
  };
}();

exports.getJobs = getJobs;