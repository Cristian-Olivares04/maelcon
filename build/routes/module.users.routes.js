"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var moduleUserCtrl = _interopRequireWildcard(require("../modules/module.users"));

var _middlewares = require("../middlewares");

var _upload = _interopRequireDefault(require("../middlewares/upload"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = (0, _express.Router)();
router.post("/", _upload["default"].uploadUserIMG, moduleUserCtrl.createUser);
router.get("/",
/*[authJwt.verifyTokenSQL],*/
moduleUserCtrl.getUsersSQL);
router.get("/:ID_USUARIO", //[authJwt.verifyToken, authJwt.isAdmin],
moduleUserCtrl.getUserSQL);
router.get("/myinfo/userInfo", [_middlewares.authJwt.verifyTokenSQL], moduleUserCtrl.getMyUser);
router["delete"]("/:ID_USUARIO", //[authJwt.verifyToken, authJwt.isAdmin],
moduleUserCtrl.deleteUserById);
router.put("/:ID_USUARIO", //[authJwt.verifyToken, authJwt.isAdmin],
_upload["default"].uploadUserIMG, moduleUserCtrl.updateUserByIdPA);
router.post("/SQA/:ID_USUARIO", moduleUserCtrl.securityQA);
router.put("/SQA/:ID_USUARIO", moduleUserCtrl.updateSecurytyQA);
router.put("/uptPWD/:ID_USUARIO", moduleUserCtrl.updatePassword);
router.get("/getSQ/:ID_USUARIO", moduleUserCtrl.getSecurityQuestion);
router.get("/getSA/:ID_USUARIO", moduleUserCtrl.getSecurityAnswer);
router.get("/lostPassword/:CORREO", moduleUserCtrl.getSecurityQuestionByEmail);
router.post("/lostPasswordA/:CORREO", moduleUserCtrl.getAnswerByEmail);
router.get("/passwordRecovery/:CORREO", moduleUserCtrl.generatePasswordRecoveryTokenByEmail);
router.post("/passwordRecoveryToken/:token", moduleUserCtrl.verifyRecoveryToken);
var _default = router;
exports["default"] = _default;