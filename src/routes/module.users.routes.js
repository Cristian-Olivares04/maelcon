import { Router } from "express";
import * as moduleUserCtrl from "../modules/module.users";
import { authJwt, verifySignUp } from "../middlewares";

const router = Router();

router.post("/", moduleUserCtrl.createUser);

router.get("/", /*[authJwt.verifyTokenSQL],*/ moduleUserCtrl.getUsersSQL);
router.get(
  "/:ID_USUARIO",
  //[authJwt.verifyToken, authJwt.isAdmin],
  moduleUserCtrl.getUserSQL
);
router.delete(
  "/:ID_USUARIO",
  //[authJwt.verifyToken, authJwt.isAdmin],
  moduleUserCtrl.deleteUserById
);
router.put(
  "/:ID_USUARIO",
  //[authJwt.verifyToken, authJwt.isAdmin],
  moduleUserCtrl.updateUserByIdPA
);

router.post("/SQA/:ID_USUARIO", moduleUserCtrl.securityQA);

router.put("/SQA/:ID_USUARIO", moduleUserCtrl.updateSecurytyQA);

router.put("/uptPWD/:ID_USUARIO", moduleUserCtrl.updatePassword);

router.get("/getSQ/:ID_USUARIO", moduleUserCtrl.getSecurityQuestion);

router.get("/getSA/:ID_USUARIO", moduleUserCtrl.getSecurityAnswer);

export default router;
