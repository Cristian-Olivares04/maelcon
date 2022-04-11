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
router.put("/status/:ID_USUARIO", [authJwt.verifyTokenSQL], moduleAdminCtrl.updateUserStatus);
router.post("/role/", [authJwt.verifyTokenSQL], moduleAdminCtrl.createRoles);
router.put("/role/:ID_ROL", [authJwt.verifyTokenSQL], moduleAdminCtrl.updateRole);
router.post("/object/", [authJwt.verifyTokenSQL], moduleAdminCtrl.createObject);
router.put("/object/:ID_OBJETO", [authJwt.verifyTokenSQL], moduleAdminCtrl.updateObject);
router.post("/permission/", [authJwt.verifyTokenSQL], moduleAdminCtrl.createPermission);
router.put("/permission/:ID_OBJETO", [authJwt.verifyTokenSQL], moduleAdminCtrl.updatePermission);
router.post("/paymentMethod/", [authJwt.verifyTokenSQL], moduleAdminCtrl.createPaymentMethod);
router.put("/paymentMethod/:ID_PAGO", [authJwt.verifyTokenSQL], moduleAdminCtrl.updatePaymentMethod);
router.post("/parameter/", [authJwt.verifyTokenSQL], moduleAdminCtrl.createParameter);
router.put("/parameter/:ID_PARAMETRO", [authJwt.verifyTokenSQL], moduleAdminCtrl.updateParameter);
router.get("/userPermissions/:ID_USUARIO", [authJwt.verifyTokenSQL], moduleAdminCtrl.getPermissions);
router.get("/checkUser/", [authJwt.verifyTokenSQL], moduleAdminCtrl.checkUser);
router.get("/getRoles/", [authJwt.verifyTokenSQL], moduleAdminCtrl.getRoles);
router.get("/getRoles/:ID_ROL", [authJwt.verifyTokenSQL], moduleAdminCtrl.getRoleByID);
router.get("/getObjects/", [authJwt.verifyTokenSQL], moduleAdminCtrl.getObjects);
router.get("/getObjects/:ID_OBJETO", [authJwt.verifyTokenSQL], moduleAdminCtrl.getObjectByID);
router.get("/getPaymentMethods/", [authJwt.verifyTokenSQL], moduleAdminCtrl.getPaymentMethods);
router.get("/getPaymentMethods/:ID_PAGO", [authJwt.verifyTokenSQL], moduleAdminCtrl.getPaymentMethodByID);
router.get("/getParameters/",
/*[authJwt.verifyTokenSQL],*/
moduleAdminCtrl.getParameters);
router.get("/getParameters/:ID_PARAMETRO", [authJwt.verifyTokenSQL], moduleAdminCtrl.getParameterById);
router.get("/getLogs/", [authJwt.verifyTokenSQL], moduleAdminCtrl.getLogs);
router.get("/getLogs/:ID_BITACORA", [authJwt.verifyTokenSQL], moduleAdminCtrl.getLogById);
router.get("/comission/", [authJwt.verifyTokenSQL], moduleAdminCtrl.getComissions);
router.get("/comission/:ID_USUARIO", [authJwt.verifyTokenSQL], moduleAdminCtrl.getComissionById);
router.post("/backupDB/",
/*[authJwt.verifyTokenSQL],*/
moduleAdminCtrl.postBackupDB);
var _default = router;
exports["default"] = _default;