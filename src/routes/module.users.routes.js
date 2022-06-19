import { Router } from "express";
import * as moduleUserCtrl from "../modules/module.users";
import { authJwt, verifySignUp } from "../middlewares";
import upload from "../middlewares/upload";

const router = Router();

router.post("/", upload.uploadUserIMG, moduleUserCtrl.createUser);

router.get("/", /*[authJwt.verifyTokenSQL],*/ moduleUserCtrl.getUsersSQL);
router.get(
  "/:ID_USUARIO",
  //[authJwt.verifyToken, authJwt.isAdmin],
  moduleUserCtrl.getUserSQL
);
router.get(
  "/myinfo/userInfo",
  [authJwt.verifyTokenSQL],
  moduleUserCtrl.getMyUser
);
router.delete(
  "/:ID_USUARIO",
  //[authJwt.verifyToken, authJwt.isAdmin],
  moduleUserCtrl.deleteUserById
);

router.put(
  "/:ID_USUARIO",
  //[authJwt.verifyToken, authJwt.isAdmin],
  upload.uploadUserIMG,
  moduleUserCtrl.updateUserByIdPA
);

router.post("/SQA/:ID_USUARIO", moduleUserCtrl.securityQA);

router.put("/SQA/:ID_USUARIO", moduleUserCtrl.updateSecurytyQA);

router.put("/uptPWD/:ID_USUARIO", moduleUserCtrl.updatePassword);

router.get("/getSQ/:ID_USUARIO", moduleUserCtrl.getSecurityQuestion);

router.get("/getSA/:ID_USUARIO", moduleUserCtrl.getSecurityAnswer);

router.get("/lostPassword/:CORREO", moduleUserCtrl.getSecurityQuestionByEmail);

router.post("/lostPasswordA/:CORREO", moduleUserCtrl.getAnswerByEmail);

router.get(
  "/passwordRecovery/:CORREO",
  moduleUserCtrl.generatePasswordRecoveryTokenByEmail
);

router.post(
  "/passwordRecoveryToken/:token",
  moduleUserCtrl.verifyRecoveryToken
);

router.get(
  "/firstLogin/:CORREO_ELECTRONICO",
  moduleUserCtrl.getFirstLogin
);

router.get(
  "/tokenSimple/:CORREO",
  moduleUserCtrl.getTokenByEmailSimple
);

router.put(
  "/updatePassGestion/:CORREO",
  moduleUserCtrl.uptPasswordGestion
);

export default router;
