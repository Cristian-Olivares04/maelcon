import { Router } from "express";
import * as moduleAdminCtrl from "../modules/module.admin";
import * as authJwt from "../middlewares/authJwt";

const router = Router();

router.put(
  "/status/:ID_USUARIO",
  [authJwt.verifyTokenSQL],
  moduleAdminCtrl.updateUserStatus
);

router.post("/role/", [authJwt.verifyTokenSQL], moduleAdminCtrl.createRoles);

router.put(
  "/role/:ID_ROL",
  [authJwt.verifyTokenSQL],
  moduleAdminCtrl.updateRole
);

router.post("/object/", [authJwt.verifyTokenSQL], moduleAdminCtrl.createObject);

router.put(
  "/object/:ID_OBJETO",
  [authJwt.verifyTokenSQL],
  moduleAdminCtrl.updateObject
);

router.post(
  "/permission/",
  [authJwt.verifyTokenSQL],
  moduleAdminCtrl.createPermission
);

router.put(
  "/permission/:ID_OBJETO",
  [authJwt.verifyTokenSQL],
  moduleAdminCtrl.updatePermission
);

router.post(
  "/paymentMethod/",
  [authJwt.verifyTokenSQL],
  moduleAdminCtrl.createPaymentMethod
);

router.put(
  "/paymentMethod/:ID_PAGO",
  [authJwt.verifyTokenSQL],
  moduleAdminCtrl.updatePaymentMethod
);

router.post(
  "/parameter/",
  [authJwt.verifyTokenSQL],
  moduleAdminCtrl.createParameter
);

router.put(
  "/parameter/:ID_PARAMETRO",
  [authJwt.verifyTokenSQL],
  moduleAdminCtrl.updateParameter
);

router.get(
  "/userPermissions/:ID_USUARIO",
  [authJwt.verifyTokenSQL],
  moduleAdminCtrl.getPermissions
);

router.get("/checkUser/", [authJwt.verifyTokenSQL], moduleAdminCtrl.checkUser);

router.get("/getRoles/", [authJwt.verifyTokenSQL], moduleAdminCtrl.getRoles);

router.get(
  "/getRoles/:ID_ROL",
  [authJwt.verifyTokenSQL],
  moduleAdminCtrl.getRoleByID
);

router.get(
  "/getObjects/",
  [authJwt.verifyTokenSQL],
  moduleAdminCtrl.getObjects
);

router.get(
  "/getObjects/:ID_OBJETO",
  [authJwt.verifyTokenSQL],
  moduleAdminCtrl.getObjectByID
);

router.get(
  "/getPaymentMethods/",
  [authJwt.verifyTokenSQL],
  moduleAdminCtrl.getPaymentMethods
);

router.get(
  "/getPaymentMethods/:ID_PAGO",
  [authJwt.verifyTokenSQL],
  moduleAdminCtrl.getPaymentMethodByID
);

router.get(
  "/getParameters/",
  /*[authJwt.verifyTokenSQL],*/
  moduleAdminCtrl.getParameters
);

router.get(
  "/getParameters/:ID_PARAMETRO",
  [authJwt.verifyTokenSQL],
  moduleAdminCtrl.getParameterById
);

router.get("/getLogs/", [authJwt.verifyTokenSQL], moduleAdminCtrl.getLogs);

router.get(
  "/getLogs/:ID_BITACORA",
  [authJwt.verifyTokenSQL],
  moduleAdminCtrl.getLogById
);

router.get(
  "/comission/",
  [authJwt.verifyTokenSQL],
  moduleAdminCtrl.getComissions
);

router.get(
  "/comission/:ID_USUARIO",
  [authJwt.verifyTokenSQL],
  moduleAdminCtrl.getComissionById
);

router.post(
  "/backupDB/",
  /*[authJwt.verifyTokenSQL],*/
  moduleAdminCtrl.postBackupDB
);

export default router;