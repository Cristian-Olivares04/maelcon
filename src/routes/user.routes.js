import { Router } from "express";
import * as userCtrl from "../controllers/users.controller";
import { authJwt, verifySignUp } from "../middlewares";

const router = Router();

router.post("/", userCtrl.createUser);

router.get(
  "/",
  /* [authJwt.verifyToken, authJwt.isAdmin] */ userCtrl.getUsersSQL
);
router.get(
  "/:ID_PERSONA",
  //[authJwt.verifyToken, authJwt.isAdmin],
  userCtrl.getUserByIdSQL
);
router.delete(
  "/:ID_PERSONA",
  //[authJwt.verifyToken, authJwt.isAdmin],
  userCtrl.deleteUserByIdSQL
);
router.put(
  "/:ID_PERSONA",
  //[authJwt.verifyToken, authJwt.isAdmin],
  userCtrl.updateUserByIdSQL
);
router.post("/", userCtrl.createUser);
export default router;
