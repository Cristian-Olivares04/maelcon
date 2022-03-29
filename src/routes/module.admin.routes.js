import { Router } from "express";
import * as moduleAdminCtrl from "../modules/module.admin";
import * as authJwt from "../middlewares/authJwt";

const router = Router();

router.put(
  "/status/:ID_USUARIO",
  //[authJwt.verifyTokenSQL],
  moduleAdminCtrl.updateUserStatus
);

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

export default router;
