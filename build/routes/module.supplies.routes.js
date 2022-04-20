"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var moduleSuppliesCtrl = _interopRequireWildcard(require("../modules/module.supplies"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = (0, _express.Router)();
router.post("/supplier/", moduleSuppliesCtrl.createSupplier);
router.put("/supplier/:ID_PROVEEDOR", moduleSuppliesCtrl.updateSupplier);
router.post("/supplyHeader/", moduleSuppliesCtrl.createSupplyHeader);
router.put("/supplyHeader/:ID_COMPRA", moduleSuppliesCtrl.updateSupplyHeader);
router.post("/addSupply/", moduleSuppliesCtrl.addSupply);
router.put("/updateSupply/", moduleSuppliesCtrl.updateSupply);
router["delete"]("/deleteSupply/", moduleSuppliesCtrl.deleteSupply);
router["delete"]("/eliminateSupply/:ID_COMPRA", moduleSuppliesCtrl.eliminateSupply);
router.post("/processSupply/:ID_COMPRA", moduleSuppliesCtrl.processSupply);
router.get("/supplies/", moduleSuppliesCtrl.getSupplies);
router.get("/supplies/:ID_PRODUCTO", moduleSuppliesCtrl.getSupplyByID);
router.get("/providers/", moduleSuppliesCtrl.getSuppliers);
router.get("/providers/:ID_PROVEEDOR", moduleSuppliesCtrl.getSupplierByID);
router.get("/purchases/", moduleSuppliesCtrl.getPurchases);
router.get("/purchases/:ID_COMPRA", moduleSuppliesCtrl.getPurchaseByID);
router.get("/productData/", moduleSuppliesCtrl.getProductData);
router.get("/productData/:ID_PRODUCTO", moduleSuppliesCtrl.getProductDataByID);
var _default = router;
exports["default"] = _default;