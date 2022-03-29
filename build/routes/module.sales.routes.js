"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var moduleSalesCtrl = _interopRequireWildcard(require("../modules/module.sales"));

var _middlewares = require("../middlewares");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = (0, _express.Router)();
router.post("/client/", moduleSalesCtrl.createClient);
router.put("/client/:ID_CLIENTE", moduleSalesCtrl.updateClient);
router.post("/saleHeader/", moduleSalesCtrl.createSaleHeader);
router.put("/saleHeader/:ID_VENTA", moduleSalesCtrl.updateSaleHeader);
router.post("/addProduct2Sale/:ID_VENTA", moduleSalesCtrl.addProduct2Sale);
router.put("/addProduct2Sale/:ID_VENTA", moduleSalesCtrl.updateProductOnSale);
router["delete"]("/addProduct2Sale/:ID_VENTA", moduleSalesCtrl.deleteProductOnSale);
router["delete"]("/sale/:ID_VENTA", moduleSalesCtrl.deleteSale);
router.post("/sale/:ID_VENTA", moduleSalesCtrl.processSale);
router.get("/client/", moduleSalesCtrl.getClients);
router.get("/client/:ID_CLIENTE", moduleSalesCtrl.getClientByID);
router.get("/sale/:ID_VENTA", moduleSalesCtrl.getSaleByID);
router.get("/sale/", moduleSalesCtrl.getSales);
router.get("/saleDetail/:ID_VENTA", moduleSalesCtrl.getSaleDetailByID);
router.get("/saleDetail/", moduleSalesCtrl.getSalesDetail);
router.get("/saleFull/:ID_VENTA", moduleSalesCtrl.getSaleCompleteByID);
var _default = router;
exports["default"] = _default;