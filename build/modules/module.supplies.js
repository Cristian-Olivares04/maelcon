"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateSupplyHeader = exports.updateSupply = exports.updateSupplier = exports.processSupply = exports.getSupplyByID = exports.getSupplies = exports.getSuppliers = exports.getSupplierByID = exports.getPurchases = exports.getPurchaseByID = exports.getProductDataByID = exports.getProductData = exports.getDetailsSupplyById = exports.eliminateSupply = exports.deleteSupply = exports.createSupplyHeader = exports.createSupplier = exports.addSupply = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _databaseSQL = _interopRequireDefault(require("../databaseSQL"));

var createSupplier = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, RTN, NOMBRE_PROVEEDOR, TELEFONO_PROVEEDOR, CORREO_PROVEEDOR, objetos, mensaje, _mensaje;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, RTN = _req$body.RTN, NOMBRE_PROVEEDOR = _req$body.NOMBRE_PROVEEDOR, TELEFONO_PROVEEDOR = _req$body.TELEFONO_PROVEEDOR, CORREO_PROVEEDOR = _req$body.CORREO_PROVEEDOR;
            _context.next = 4;
            return _databaseSQL["default"].query("CALL CREAR_PROVEEDOR(?,?,?,?,@MENSAJE, @CODIGO)", [RTN, NOMBRE, TELEFONO, CORREO]);

          case 4:
            objetos = _context.sent;
            mensaje = JSON.parse(JSON.stringify(objetos[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }]
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

  return function createSupplier(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createSupplier = createSupplier;

var updateSupplier = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var ID_PROVEEDOR, _req$body2, RTN, NOMBRE_PROVEEDOR, TELEFONO_PROVEEDOR, CORREO_PROVEEDOR, objetos, mensaje, _mensaje2;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            ID_PROVEEDOR = req.params.ID_PROVEEDOR;
            _req$body2 = req.body, RTN = _req$body2.RTN, NOMBRE_PROVEEDOR = _req$body2.NOMBRE_PROVEEDOR, TELEFONO_PROVEEDOR = _req$body2.TELEFONO_PROVEEDOR, CORREO_PROVEEDOR = _req$body2.CORREO_PROVEEDOR;
            _context2.next = 5;
            return _databaseSQL["default"].query("CALL MODIFICAR_PROVEEDOR(?,?,?,?,?,@MENSAJE, @CODIGO)", [ID_PROVEEDOR, RTN, NOMBRE_PROVEEDOR, TELEFONO_PROVEEDOR, CORREO_PROVEEDOR]);

          case 5:
            objetos = _context2.sent;
            mensaje = JSON.parse(JSON.stringify(objetos[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }]
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

  return function updateSupplier(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.updateSupplier = updateSupplier;

var createSupplyHeader = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body3, ID_USUARIO, ID_PROVEEDOR, ID_PAGO, OBSERVACION, objetos, mensaje, _mensaje3;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _req$body3 = req.body, ID_USUARIO = _req$body3.ID_USUARIO, ID_PROVEEDOR = _req$body3.ID_PROVEEDOR, ID_PAGO = _req$body3.ID_PAGO, OBSERVACION = _req$body3.OBSERVACION;
            _context3.next = 4;
            return _databaseSQL["default"].query("CALL ENCABEZADO_COMPRA(?,?,?,?,@MENSAJE, @CODIGO, @ID)", [ID_USUARIO, ID_PROVEEDOR, ID_PAGO, OBSERVACION]);

          case 4:
            objetos = _context3.sent;
            mensaje = JSON.parse(JSON.stringify(objetos[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }]
            });
            _context3.next = 15;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            _context3.next = 13;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO, @ID as ID;");

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

  return function createSupplyHeader(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.createSupplyHeader = createSupplyHeader;

var updateSupplyHeader = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var ID_COMPRA, _req$body4, ID_PAGO, OBSERVACION, objetos, mensaje, _mensaje4;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            ID_COMPRA = req.params.ID_COMPRA;
            _req$body4 = req.body, ID_PAGO = _req$body4.ID_PAGO, OBSERVACION = _req$body4.OBSERVACION;
            _context4.next = 5;
            return _databaseSQL["default"].query("CALL MODIFICAR_ENCABEZADO_COMPRA(?,?,?,@MENSAJE, @CODIGO)", [ID_COMPRA, ID_PAGO, OBSERVACION]);

          case 5:
            objetos = _context4.sent;
            mensaje = JSON.parse(JSON.stringify(objetos[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }]
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

  return function updateSupplyHeader(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateSupplyHeader = updateSupplyHeader;

var addSupply = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var _req$body5, ID_PRODUCTO, ID_COMPRA, PRECIO_UNITARIO, DESCRIPCION, CANTIDAD, objetos, mensaje, _mensaje5;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _req$body5 = req.body, ID_PRODUCTO = _req$body5.ID_PRODUCTO, ID_COMPRA = _req$body5.ID_COMPRA, PRECIO_UNITARIO = _req$body5.PRECIO_UNITARIO, DESCRIPCION = _req$body5.DESCRIPCION, CANTIDAD = _req$body5.CANTIDAD;
            _context5.next = 4;
            return _databaseSQL["default"].query("CALL AGREGAR_PRODUCTO_COMPRA(?,?,?,?,?,@MENSAJE, @CODIGO)", [ID_PRODUCTO, ID_COMPRA, PRECIO_UNITARIO, DESCRIPCION, CANTIDAD]);

          case 4:
            objetos = _context5.sent;
            mensaje = JSON.parse(JSON.stringify(objetos[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }]
            });
            _context5.next = 15;
            break;

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](0);
            _context5.next = 13;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 13:
            _mensaje5 = _context5.sent;
            res.status(401).json({
              error: _context5.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje5))
            });

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 9]]);
  }));

  return function addSupply(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.addSupply = addSupply;

var updateSupply = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var _req$body6, ID_PRODUCTO, ID_COMPRA, PRECIO_UNITARIO, DESCRIPCION, CANTIDAD, objetos, mensaje, _mensaje6;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _req$body6 = req.body, ID_PRODUCTO = _req$body6.ID_PRODUCTO, ID_COMPRA = _req$body6.ID_COMPRA, PRECIO_UNITARIO = _req$body6.PRECIO_UNITARIO, DESCRIPCION = _req$body6.DESCRIPCION, CANTIDAD = _req$body6.CANTIDAD;
            _context6.next = 4;
            return _databaseSQL["default"].query("CALL ACTUALIZAR_PRODUCTO_COMPRA(?,?,?,?,?,@MENSAJE, @CODIGO)", [ID_PRODUCTO, ID_COMPRA, PRECIO_UNITARIO, DESCRIPCION, CANTIDAD]);

          case 4:
            objetos = _context6.sent;
            mensaje = JSON.parse(JSON.stringify(objetos[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }]
            });
            _context6.next = 15;
            break;

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](0);
            _context6.next = 13;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 13:
            _mensaje6 = _context6.sent;
            res.status(401).json({
              error: _context6.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje6))
            });

          case 15:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 9]]);
  }));

  return function updateSupply(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.updateSupply = updateSupply;

var deleteSupply = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var _req$body7, ID_PRODUCTO, ID_COMPRA, objetos, mensaje, _mensaje7;

    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _req$body7 = req.body, ID_PRODUCTO = _req$body7.ID_PRODUCTO, ID_COMPRA = _req$body7.ID_COMPRA;
            _context7.next = 4;
            return _databaseSQL["default"].query("CALL ELIMINAR_PRODUCTO_COMPRA(?,?,@MENSAJE, @CODIGO)", [ID_PRODUCTO, ID_COMPRA]);

          case 4:
            objetos = _context7.sent;
            mensaje = JSON.parse(JSON.stringify(objetos[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }]
            });
            _context7.next = 15;
            break;

          case 9:
            _context7.prev = 9;
            _context7.t0 = _context7["catch"](0);
            _context7.next = 13;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 13:
            _mensaje7 = _context7.sent;
            res.status(401).json({
              error: _context7.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje7))
            });

          case 15:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 9]]);
  }));

  return function deleteSupply(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.deleteSupply = deleteSupply;

var processSupply = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var ID_COMPRA, ID_USUARIO, objetos, mensaje, _mensaje8;

    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            ID_COMPRA = req.params.ID_COMPRA;
            ID_USUARIO = req.body.ID_USUARIO;
            _context8.next = 5;
            return _databaseSQL["default"].query("CALL PROCESAR_COMPRA(?,?,@MENSAJE, @CODIGO)", [ID_COMPRA, ID_USUARIO]);

          case 5:
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

          case 10:
            _context8.prev = 10;
            _context8.t0 = _context8["catch"](0);
            _context8.next = 14;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 14:
            _mensaje8 = _context8.sent;
            res.status(401).json({
              error: _context8.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje8))
            });

          case 16:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 10]]);
  }));

  return function processSupply(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.processSupply = processSupply;

var eliminateSupply = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var ID_COMPRA, ID_USUARIO, objetos, mensaje, _mensaje9;

    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            ID_COMPRA = req.params.ID_COMPRA;
            ID_USUARIO = req.body.ID_USUARIO;
            _context9.next = 5;
            return _databaseSQL["default"].query("CALL ELIMINAR_COMPRA(?,?,@MENSAJE, @CODIGO)", [ID_COMPRA, ID_USUARIO]);

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
            _mensaje9 = _context9.sent;
            res.status(401).json({
              error: _context9.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje9))
            });

          case 16:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 10]]);
  }));

  return function eliminateSupply(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

exports.eliminateSupply = eliminateSupply;

var getSupplies = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var supplies, mensaje, _mensaje10;

    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _context10.next = 3;
            return _databaseSQL["default"].query("CALL OBTENER_PRODUCTOS(@MENSAJE, @CODIGO)");

          case 3:
            supplies = _context10.sent;
            mensaje = JSON.parse(JSON.stringify(supplies[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }],
              inventario: JSON.parse(JSON.stringify(supplies[0]))
            });
            _context10.next = 14;
            break;

          case 8:
            _context10.prev = 8;
            _context10.t0 = _context10["catch"](0);
            _context10.next = 12;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 12:
            _mensaje10 = _context10.sent;
            res.status(401).json({
              error: _context10.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje10))
            });

          case 14:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[0, 8]]);
  }));

  return function getSupplies(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

exports.getSupplies = getSupplies;

var getSupplyByID = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
    var ID_PRODUCTO, supply, mensaje, _mensaje11;

    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            ID_PRODUCTO = req.params.ID_PRODUCTO;
            _context11.next = 4;
            return _databaseSQL["default"].query("CALL OBTENER_PRODUCTO(?,@MENSAJE, @CODIGO)", [ID_PRODUCTO]);

          case 4:
            supply = _context11.sent;
            mensaje = JSON.parse(JSON.stringify(supply[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }],
              inventario: JSON.parse(JSON.stringify(supply[0]))
            });
            _context11.next = 15;
            break;

          case 9:
            _context11.prev = 9;
            _context11.t0 = _context11["catch"](0);
            _context11.next = 13;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 13:
            _mensaje11 = _context11.sent;
            res.status(401).json({
              error: _context11.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje11))
            });

          case 15:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[0, 9]]);
  }));

  return function getSupplyByID(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();

exports.getSupplyByID = getSupplyByID;

var getSuppliers = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
    var suppliers, mensaje, _mensaje12;

    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            _context12.next = 3;
            return _databaseSQL["default"].query("CALL OBTENER_PROVEEDORES(@MENSAJE, @CODIGO)");

          case 3:
            suppliers = _context12.sent;
            mensaje = JSON.parse(JSON.stringify(suppliers[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }],
              proveedores: JSON.parse(JSON.stringify(suppliers[0]))
            });
            _context12.next = 14;
            break;

          case 8:
            _context12.prev = 8;
            _context12.t0 = _context12["catch"](0);
            _context12.next = 12;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 12:
            _mensaje12 = _context12.sent;
            res.status(401).json({
              error: _context12.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje12))
            });

          case 14:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[0, 8]]);
  }));

  return function getSuppliers(_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();

exports.getSuppliers = getSuppliers;

var getSupplierByID = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
    var ID_PROVEEDOR, supplier, mensaje, _mensaje13;

    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            ID_PROVEEDOR = req.params.ID_PROVEEDOR;
            _context13.next = 4;
            return _databaseSQL["default"].query("CALL OBTENER_PROVEEDOR(?,@MENSAJE, @CODIGO)", [ID_PROVEEDOR]);

          case 4:
            supplier = _context13.sent;
            mensaje = JSON.parse(JSON.stringify(supplier[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }],
              inventario: JSON.parse(JSON.stringify(supplier[0]))
            });
            _context13.next = 15;
            break;

          case 9:
            _context13.prev = 9;
            _context13.t0 = _context13["catch"](0);
            _context13.next = 13;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 13:
            _mensaje13 = _context13.sent;
            res.status(401).json({
              error: _context13.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje13))
            });

          case 15:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[0, 9]]);
  }));

  return function getSupplierByID(_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}();

exports.getSupplierByID = getSupplierByID;

var getPurchases = /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res) {
    var purchase, mensaje, _mensaje14;

    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            _context14.next = 3;
            return _databaseSQL["default"].query("CALL OBTENER_COMPRAS(@MENSAJE, @CODIGO)");

          case 3:
            purchase = _context14.sent;
            mensaje = JSON.parse(JSON.stringify(purchase[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }],
              proveedores: JSON.parse(JSON.stringify(purchase[0]))
            });
            _context14.next = 14;
            break;

          case 8:
            _context14.prev = 8;
            _context14.t0 = _context14["catch"](0);
            _context14.next = 12;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 12:
            _mensaje14 = _context14.sent;
            res.status(401).json({
              error: _context14.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje14))
            });

          case 14:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, null, [[0, 8]]);
  }));

  return function getPurchases(_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}();

exports.getPurchases = getPurchases;

var getPurchaseByID = /*#__PURE__*/function () {
  var _ref15 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(req, res) {
    var ID_COMPRA, purchase, mensaje, _mensaje15;

    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.prev = 0;
            ID_COMPRA = req.params.ID_COMPRA;
            _context15.next = 4;
            return _databaseSQL["default"].query("CALL OBTENER_COMPRA(?,@MENSAJE, @CODIGO)", [ID_COMPRA]);

          case 4:
            purchase = _context15.sent;
            mensaje = JSON.parse(JSON.stringify(purchase[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }],
              inventario: JSON.parse(JSON.stringify(purchase[0]))
            });
            _context15.next = 15;
            break;

          case 9:
            _context15.prev = 9;
            _context15.t0 = _context15["catch"](0);
            _context15.next = 13;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 13:
            _mensaje15 = _context15.sent;
            res.status(401).json({
              error: _context15.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje15))
            });

          case 15:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, null, [[0, 9]]);
  }));

  return function getPurchaseByID(_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}();

exports.getPurchaseByID = getPurchaseByID;

var getProductData = /*#__PURE__*/function () {
  var _ref16 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(req, res) {
    var suppliers, mensaje, _mensaje16;

    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.prev = 0;
            _context16.next = 3;
            return _databaseSQL["default"].query("CALL OBTENER_PRODUCTOS_FULL(@MENSAJE, @CODIGO)");

          case 3:
            suppliers = _context16.sent;
            mensaje = JSON.parse(JSON.stringify(suppliers[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }],
              proveedores: JSON.parse(JSON.stringify(suppliers[0]))
            });
            _context16.next = 14;
            break;

          case 8:
            _context16.prev = 8;
            _context16.t0 = _context16["catch"](0);
            _context16.next = 12;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 12:
            _mensaje16 = _context16.sent;
            res.status(401).json({
              error: _context16.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje16))
            });

          case 14:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, null, [[0, 8]]);
  }));

  return function getProductData(_x31, _x32) {
    return _ref16.apply(this, arguments);
  };
}();

exports.getProductData = getProductData;

var getProductDataByID = /*#__PURE__*/function () {
  var _ref17 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(req, res) {
    var ID_PRODUCTO, supplier, mensaje, _mensaje17;

    return _regenerator["default"].wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.prev = 0;
            ID_PRODUCTO = req.params.ID_PRODUCTO;
            _context17.next = 4;
            return _databaseSQL["default"].query("CALL OBTENER_PRODUCTOS_FULL_ID(?,@MENSAJE, @CODIGO)", [ID_PRODUCTO]);

          case 4:
            supplier = _context17.sent;
            mensaje = JSON.parse(JSON.stringify(supplier[0]));
            res.json({
              mensaje: [{
                MENSAJE: mensaje[0]["MENSAJE"],
                CODIGO: mensaje[0]["CODIGO"]
              }],
              inventario: JSON.parse(JSON.stringify(supplier[0]))
            });
            _context17.next = 15;
            break;

          case 9:
            _context17.prev = 9;
            _context17.t0 = _context17["catch"](0);
            _context17.next = 13;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 13:
            _mensaje17 = _context17.sent;
            res.status(401).json({
              error: _context17.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje17))
            });

          case 15:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17, null, [[0, 9]]);
  }));

  return function getProductDataByID(_x33, _x34) {
    return _ref17.apply(this, arguments);
  };
}(); //Obtener detalles de la compra


exports.getProductDataByID = getProductDataByID;

var getDetailsSupplyById = /*#__PURE__*/function () {
  var _ref18 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18(req, res) {
    var ID_COMPRA, details, mensaje;
    return _regenerator["default"].wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.prev = 0;
            ID_COMPRA = req.params.ID_COMPRA;
            _context18.next = 4;
            return _databaseSQL["default"].query("CALL OBTENER_DETALLE_COMPRA(?,@MENSAJE, @CODIGO)", [ID_COMPRA]);

          case 4:
            details = _context18.sent;
            res.json({
              detalles: JSON.parse(JSON.stringify(details))
            });
            _context18.next = 14;
            break;

          case 8:
            _context18.prev = 8;
            _context18.t0 = _context18["catch"](0);
            _context18.next = 12;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 12:
            mensaje = _context18.sent;
            res.status(401).json({
              error: _context18.t0.message,
              mensaje: JSON.parse(JSON.stringify(mensaje))
            });

          case 14:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18, null, [[0, 8]]);
  }));

  return function getDetailsSupplyById(_x35, _x36) {
    return _ref18.apply(this, arguments);
  };
}();

exports.getDetailsSupplyById = getDetailsSupplyById;