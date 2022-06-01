import { Router } from "express";
import * as moduleAdminCtrl from "../modules/module.admin";
import * as authJwt from "../middlewares/authJwt";
import upload from "../middlewares/upload";

const router = Router();

router.put(
  "/status/:ID_USUARIO",
  [authJwt.verifyTokenSQL, authJwt.verifyAuth(5, 3)],
  moduleAdminCtrl.updateUserStatus
);

router.post(
  "/role/",
  [authJwt.verifyTokenSQL, authJwt.verifyAuth(5, 1)],
  moduleAdminCtrl.createRoles
);

router.put(
  "/role/:ID_ROL",
  [authJwt.verifyTokenSQL, authJwt.verifyAuth(5, 3)],
  moduleAdminCtrl.updateRole
);

router.post(
  "/object/",
  [authJwt.verifyTokenSQL, authJwt.verifyAuth(5, 1)],
  moduleAdminCtrl.createObject
);

router.put(
  "/object/:ID_OBJETO",
  [authJwt.verifyTokenSQL, authJwt.verifyAuth(5, 3)],
  moduleAdminCtrl.updateObject
);

router.post(
  "/permission/",
  [authJwt.verifyTokenSQL, authJwt.verifyAuth(5, 1)],
  moduleAdminCtrl.createPermission
);

router.put(
  "/permission/:ID_OBJETO",
  [authJwt.verifyTokenSQL, authJwt.verifyAuth(5, 3)],
  moduleAdminCtrl.updatePermission
);

router.post(
  "/paymentMethod/",
  [authJwt.verifyTokenSQL, authJwt.verifyAuth(5, 1)],
  moduleAdminCtrl.createPaymentMethod
);

router.put(
  "/paymentMethod/:ID_PAGO",
  [authJwt.verifyTokenSQL, authJwt.verifyAuth(5, 3)],
  moduleAdminCtrl.updatePaymentMethod
);

router.post(
  "/parameter/",
  [authJwt.verifyTokenSQL, authJwt.verifyAuth(5, 1)],
  moduleAdminCtrl.createParameter
);

router.put(
  "/parameter/",
  [authJwt.verifyTokenSQL, authJwt.verifyAuth(5, 3)],
  moduleAdminCtrl.updateParameter
);

router.get(
  "/userPermissions/:ID_USUARIO",
  [authJwt.verifyTokenSQL, authJwt.verifyAuth(5, 4)],
  moduleAdminCtrl.getPermissions
);

router.get(
  "/rolePermissions/",
  [authJwt.verifyTokenSQL, authJwt.verifyAuth(5, 4)],
  moduleAdminCtrl.getPermissionsByRole
);

router.get(
  "/checkUser/",
  [authJwt.verifyTokenSQL, authJwt.verifyAuth(5, 4)],
  moduleAdminCtrl.checkUser
);

router.get(
  "/getRoles/",
  [authJwt.verifyTokenSQL, authJwt.verifyAuth(5, 4)],
  moduleAdminCtrl.getRoles
);

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
  [authJwt.verifyTokenSQL, authJwt.verifyAuth(5, 4)],
  moduleAdminCtrl.getObjectByID
);

router.get(
  "/getPaymentMethods/",
  [authJwt.verifyTokenSQL, authJwt.verifyAuth(5, 4)],
  moduleAdminCtrl.getPaymentMethods
);

router.get(
  "/getPaymentMethods/:ID_PAGO",
  [authJwt.verifyTokenSQL, authJwt.verifyAuth(5, 4)],
  moduleAdminCtrl.getPaymentMethodByID
);

router.get(
  "/getParameters/",
  [authJwt.verifyTokenSQL, authJwt.verifyAuth(5, 4)],
  moduleAdminCtrl.getParameters
);

router.get(
  "/getParameters/:ID_PARAMETRO",
  [authJwt.verifyTokenSQL, authJwt.verifyAuth(5, 4)],
  moduleAdminCtrl.getParameterById
);

router.get(
  "/getLogs/",
  [authJwt.verifyTokenSQL, authJwt.verifyAuth(5, 4)],
  moduleAdminCtrl.getLogs
);

router.get(
  "/getLogs/:ID_BITACORA",
  [authJwt.verifyTokenSQL, authJwt.verifyAuth(5, 4)],
  moduleAdminCtrl.getLogById
);

router.get(
  "/comission/",
  [authJwt.verifyTokenSQL, authJwt.verifyAuth(5, 4)],
  moduleAdminCtrl.getComissions
);

router.get(
  "/comission/:ID_USUARIO",
  [authJwt.verifyTokenSQL, authJwt.verifyAuth(5, 4)],
  moduleAdminCtrl.getComissionById
);

router.post(
  "/backupDB/",
  [authJwt.verifyTokenSQL, authJwt.verifyAuth(5, 1)],
  moduleAdminCtrl.postBackupDB
);
router.post(
  "/backupDB2/",
  [authJwt.verifyTokenSQL, authJwt.verifyAuth(5, 1)],
  moduleAdminCtrl.postBackupDB2
);
router.get(
  "/jobs/",
  [authJwt.verifyTokenSQL, authJwt.verifyAuth(5, 4)],
  moduleAdminCtrl.getJobs
);

router.post(
  "/jobs/",
  [authJwt.verifyTokenSQL, authJwt.verifyAuth(5, 1)],
  moduleAdminCtrl.createJob
);

router.put(
  "/jobs/:ID_PUESTO",
  [authJwt.verifyTokenSQL, authJwt.verifyAuth(5, 3)],
  moduleAdminCtrl.updateJob
);

//Para actualizar usuario
router.put(
  "/updateUser/:ID_USUARIO",
  [authJwt.verifyTokenSQL, authJwt.verifyAuth(5, 3), upload.uploadUserIMG],
  moduleAdminCtrl.updateUserByAdmin
);

export default router;
