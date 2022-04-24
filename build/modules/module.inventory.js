"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProduct = exports.updateExpireDate = exports.updateCategory = exports.updateAvailable = exports.getKardex = exports.getInventoryByProduct = exports.getInventory = exports.getCategoryByID = exports.getCategories = exports.createProduct = exports.createCategory = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _databaseSQL = _interopRequireDefault(require("../databaseSQL"));

var cloudinary_services = require("../utils/cloudinary_services");

var createCategory = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, CATEGORIA, DESCRIPCION, mensaje, _mensaje;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, CATEGORIA = _req$body.CATEGORIA, DESCRIPCION = _req$body.DESCRIPCION;
            _context.next = 4;
            return _databaseSQL["default"].query("CALL CREAR_CATEGORIA(?,?,@MENSAJE, @CODIGO)", [CATEGORIA, DESCRIPCION]);

          case 4:
            _context.next = 6;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 6:
            mensaje = _context.sent;
            res.json(JSON.parse(JSON.stringify(mensaje)));
            _context.next = 16;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            _context.next = 14;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 14:
            _mensaje = _context.sent;
            res.status(401).json({
              error: _context.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje))
            });

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function createCategory(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createCategory = createCategory;

var updateCategory = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var ID_CATEGORIA, _req$body2, CATEGORIA, DESCRIPCION, mensaje, _mensaje2;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            ID_CATEGORIA = req.params.ID_CATEGORIA;
            _req$body2 = req.body, CATEGORIA = _req$body2.CATEGORIA, DESCRIPCION = _req$body2.DESCRIPCION;
            _context2.next = 5;
            return _databaseSQL["default"].query("CALL MODIFICAR_CATEGORIA(?,?,?,@MENSAJE, @CODIGO)", [ID_CATEGORIA, CATEGORIA, DESCRIPCION]);

          case 5:
            _context2.next = 7;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 7:
            mensaje = _context2.sent;
            res.json(JSON.parse(JSON.stringify(mensaje)));
            _context2.next = 17;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);
            _context2.next = 15;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 15:
            _mensaje2 = _context2.sent;
            res.status(401).json({
              error: _context2.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje2))
            });

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 11]]);
  }));

  return function updateCategory(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.updateCategory = updateCategory;

var createProduct = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body3, ID_PROVEEDOR, NOMBRE, MARCA, DESCRIPCION, IMG, ESTADO, ID_CATEGORIA, img, mensaje, _mensaje3;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _req$body3 = req.body, ID_PROVEEDOR = _req$body3.ID_PROVEEDOR, NOMBRE = _req$body3.NOMBRE, MARCA = _req$body3.MARCA, DESCRIPCION = _req$body3.DESCRIPCION, IMG = _req$body3.IMG, ESTADO = _req$body3.ESTADO, ID_CATEGORIA = _req$body3.ID_CATEGORIA;

            if (!req.file) {
              _context3.next = 9;
              break;
            }

            _context3.next = 5;
            return cloudinary_services.uploadImage(req.file.path, 'Maelcon/Productos');

          case 5:
            img = _context3.sent;
            console.log(img);
            _context3.next = 10;
            break;

          case 9:
            img = 'https://res.cloudinary.com/maelcon/image/upload/v1649628573/Maelcon/Productos/images_yucxd8.png';

          case 10:
            _context3.next = 12;
            return _databaseSQL["default"].query("CALL CREAR_PRODUCTO(?,?,?,?,?,?,?,@MENSAJE, @CODIGO)", [ID_PROVEEDOR, NOMBRE, MARCA, DESCRIPCION, img, ESTADO, ID_CATEGORIA]);

          case 12:
            _context3.next = 14;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 14:
            mensaje = _context3.sent;
            res.json(JSON.parse(JSON.stringify(mensaje)));
            _context3.next = 24;
            break;

          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](0);
            _context3.next = 22;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 22:
            _mensaje3 = _context3.sent;
            res.status(401).json({
              error: _context3.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje3))
            });

          case 24:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 18]]);
  }));

  return function createProduct(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.createProduct = createProduct;

var updateProduct = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var ID_PRODUCTO, _req$body4, ID_PROVEEDOR, NOMBRE, MARCA, DESCRIPCION, IMG, ESTADO, ID_CATEGORIA, img, productoAct, mensaje, _mensaje4;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            ID_PRODUCTO = req.params.ID_PRODUCTO;
            _req$body4 = req.body, ID_PROVEEDOR = _req$body4.ID_PROVEEDOR, NOMBRE = _req$body4.NOMBRE, MARCA = _req$body4.MARCA, DESCRIPCION = _req$body4.DESCRIPCION, IMG = _req$body4.IMG, ESTADO = _req$body4.ESTADO, ID_CATEGORIA = _req$body4.ID_CATEGORIA;

            if (!req.file) {
              _context4.next = 10;
              break;
            }

            _context4.next = 6;
            return cloudinary_services.uploadImage(req.file.path, 'Maelcon/Productos');

          case 6:
            img = _context4.sent;
            console.log(img);
            _context4.next = 15;
            break;

          case 10:
            _context4.next = 12;
            return _databaseSQL["default"].query("CALL OBTENER_PRODUCTO(?, @MENSAJE, @CODIGO)", [ID_PRODUCTO]);

          case 12:
            productoAct = _context4.sent;
            console.log(productoAct[0][0].IMG_PRODUCTO);
            img = productoAct[0][0].IMG_PRODUCTO;

          case 15:
            _context4.next = 17;
            return _databaseSQL["default"].query("CALL MODIFICAR_PRODUCTO(?,?,?,?,?,?,?,?,@MENSAJE, @CODIGO)", [ID_PRODUCTO, ID_PROVEEDOR, NOMBRE, MARCA, DESCRIPCION, img, ESTADO, ID_CATEGORIA]);

          case 17:
            _context4.next = 19;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 19:
            mensaje = _context4.sent;
            res.json(JSON.parse(JSON.stringify(mensaje)));
            _context4.next = 29;
            break;

          case 23:
            _context4.prev = 23;
            _context4.t0 = _context4["catch"](0);
            _context4.next = 27;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 27:
            _mensaje4 = _context4.sent;
            res.status(401).json({
              error: _context4.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje4))
            });

          case 29:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 23]]);
  }));

  return function updateProduct(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateProduct = updateProduct;

var updateAvailable = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var ID_INVENTARIO, _req$body5, PRECIO_VENTA, ESTADO, mensaje, _mensaje5;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            ID_INVENTARIO = req.params.ID_INVENTARIO;
            _req$body5 = req.body, PRECIO_VENTA = _req$body5.PRECIO_VENTA, ESTADO = _req$body5.ESTADO;
            _context5.next = 5;
            return _databaseSQL["default"].query("CALL MODIFICAR_INVENTARIO(?,?,?,@MENSAJE, @CODIGO)", [ID_INVENTARIO, PRECIO_VENTA, ESTADO]);

          case 5:
            _context5.next = 7;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 7:
            mensaje = _context5.sent;
            res.json(JSON.parse(JSON.stringify(mensaje)));
            _context5.next = 17;
            break;

          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5["catch"](0);
            _context5.next = 15;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 15:
            _mensaje5 = _context5.sent;
            res.status(401).json({
              error: _context5.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje5))
            });

          case 17:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 11]]);
  }));

  return function updateAvailable(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.updateAvailable = updateAvailable;

var updateExpireDate = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var ID_KARDEX, FECHA_VENCIMIENTO, mensaje, _mensaje6;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            ID_KARDEX = req.params.ID_KARDEX;
            FECHA_VENCIMIENTO = req.body.FECHA_VENCIMIENTO;
            _context6.next = 5;
            return _databaseSQL["default"].query("CALL ACTUALIZAR_KARDEX(?,?,@MENSAJE, @CODIGO)", [ID_KARDEX, FECHA_VENCIMIENTO]);

          case 5:
            _context6.next = 7;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 7:
            mensaje = _context6.sent;
            res.json(JSON.parse(JSON.stringify(mensaje)));
            _context6.next = 17;
            break;

          case 11:
            _context6.prev = 11;
            _context6.t0 = _context6["catch"](0);
            _context6.next = 15;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 15:
            _mensaje6 = _context6.sent;
            res.status(401).json({
              error: _context6.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje6))
            });

          case 17:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 11]]);
  }));

  return function updateExpireDate(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.updateExpireDate = updateExpireDate;

var getInventory = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var inventory, mensaje, _mensaje7;

    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _databaseSQL["default"].query("CALL OBTENER_INVENTARIO(@MENSAJE, @CODIGO)");

          case 3:
            inventory = _context7.sent;
            _context7.next = 6;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 6:
            mensaje = _context7.sent;
            res.json({
              mensaje: JSON.parse(JSON.stringify(mensaje)),
              inventario: JSON.parse(JSON.stringify(inventory[0]))
            });
            _context7.next = 16;
            break;

          case 10:
            _context7.prev = 10;
            _context7.t0 = _context7["catch"](0);
            _context7.next = 14;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 14:
            _mensaje7 = _context7.sent;
            res.status(401).json({
              error: _context7.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje7))
            });

          case 16:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 10]]);
  }));

  return function getInventory(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.getInventory = getInventory;

var getInventoryByProduct = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var inventory, mensaje, _mensaje8;

    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return _databaseSQL["default"].query("CALL OBTENER_INVENTARIO_PROD(@MENSAJE, @CODIGO)");

          case 3:
            inventory = _context8.sent;
            _context8.next = 6;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 6:
            mensaje = _context8.sent;
            res.json({
              mensaje: JSON.parse(JSON.stringify(mensaje)),
              inventario: JSON.parse(JSON.stringify(inventory[0]))
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

  return function getInventoryByProduct(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.getInventoryByProduct = getInventoryByProduct;

var getCategories = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var categories, mensaje, _mensaje9;

    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return _databaseSQL["default"].query("CALL OBTENER_CATEGORIAS(@MENSAJE, @CODIGO)");

          case 3:
            categories = _context9.sent;
            _context9.next = 6;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 6:
            mensaje = _context9.sent;
            res.json({
              mensaje: JSON.parse(JSON.stringify(mensaje)),
              inventario: JSON.parse(JSON.stringify(categories[0]))
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

  return function getCategories(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

exports.getCategories = getCategories;

var getCategoryByID = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var ID_CATEGORIA, categories, mensaje, _mensaje10;

    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            ID_CATEGORIA = req.params.ID_CATEGORIA;
            _context10.next = 4;
            return _databaseSQL["default"].query("CALL OBTENER_CATEGORIA(?,@MENSAJE, @CODIGO)", [ID_CATEGORIA]);

          case 4:
            categories = _context10.sent;
            _context10.next = 7;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 7:
            mensaje = _context10.sent;
            res.json({
              mensaje: JSON.parse(JSON.stringify(mensaje)),
              inventario: JSON.parse(JSON.stringify(categories[0]))
            });
            _context10.next = 17;
            break;

          case 11:
            _context10.prev = 11;
            _context10.t0 = _context10["catch"](0);
            _context10.next = 15;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 15:
            _mensaje10 = _context10.sent;
            res.status(401).json({
              error: _context10.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje10))
            });

          case 17:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[0, 11]]);
  }));

  return function getCategoryByID(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

exports.getCategoryByID = getCategoryByID;

var getKardex = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
    var kardex, mensaje, _mensaje11;

    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            _context11.next = 3;
            return _databaseSQL["default"].query("CALL OBTENER_KARDEX(@MENSAJE, @CODIGO)");

          case 3:
            kardex = _context11.sent;
            _context11.next = 6;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 6:
            mensaje = _context11.sent;
            res.json({
              mensaje: JSON.parse(JSON.stringify(mensaje)),
              inventario: JSON.parse(JSON.stringify(kardex[0]))
            });
            _context11.next = 16;
            break;

          case 10:
            _context11.prev = 10;
            _context11.t0 = _context11["catch"](0);
            _context11.next = 14;
            return _databaseSQL["default"].query("SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;");

          case 14:
            _mensaje11 = _context11.sent;
            res.status(401).json({
              error: _context11.t0.message,
              mensaje: JSON.parse(JSON.stringify(_mensaje11))
            });

          case 16:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[0, 10]]);
  }));

  return function getKardex(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();

exports.getKardex = getKardex;