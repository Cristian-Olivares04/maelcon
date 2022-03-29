"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var moduleAdminCtrl = _interopRequireWildcard(require("../modules/module.admin"));

var authJwt = _interopRequireWildcard(require("../middlewares/authJwt"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = (0, _express.Router)();
router.put("/status/:ID_USUARIO", //[authJwt.verifyTokenSQL],
moduleAdminCtrl.updateUserStatus);
router.post("/role/", moduleAdminCtrl.createRoles);
router.put("/role/:ID_ROL", moduleAdminCtrl.updateRole);
router.post("/object/", moduleAdminCtrl.createObject);
router.put("/object/:ID_OBJETO", moduleAdminCtrl.updateObject);
router.post("/permission/", moduleAdminCtrl.createPermission);
router.put("/permission/:ID_OBJETO", moduleAdminCtrl.updatePermission);
router.post("/paymentMethod/", moduleAdminCtrl.createPaymentMethod);
router.put("/paymentMethod/:ID_PAGO", moduleAdminCtrl.updatePaymentMethod);
router.post("/parameter/", moduleAdminCtrl.createParameter);
router.put("/parameter/:ID_PARAMETRO", moduleAdminCtrl.updateParameter);
router.get("/userPermissions/:ID_USUARIO", moduleAdminCtrl.getPermissions);
router.get("/checkUser/", moduleAdminCtrl.checkUser);
router.get("/getRoles/", moduleAdminCtrl.getRoles);
router.get("/getRoles/:ID_ROL", moduleAdminCtrl.getRoleByID);
router.get("/getObjects/", moduleAdminCtrl.getObjects);
router.get("/getObjects/:ID_OBJETO", moduleAdminCtrl.getObjectByID);
router.get("/getPaymentMethods/", moduleAdminCtrl.getPaymentMethods);
router.get("/getPaymentMethods/:ID_PAGO", moduleAdminCtrl.getPaymentMethodByID);
router.get("/getParameters/", moduleAdminCtrl.getParameters);
router.get("/getParameters/:ID_PARAMETRO", moduleAdminCtrl.getParameterById);
router.get("/getLogs/", moduleAdminCtrl.getLogs);
router.get("/getLogs/:ID_BITACORA", moduleAdminCtrl.getLogById);
router.get("/comission/", moduleAdminCtrl.getComissions);
router.get("/comission/:ID_USUARIO", moduleAdminCtrl.getComissionById);
var _default = router;
exports["default"] = _default;