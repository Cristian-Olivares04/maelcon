import { Router } from "express";
import * as authCtrl from "../controllers/auth.controller";
import { verifySignUp } from "../middlewares";

const router = Router();

router.post("/signin", authCtrl.singInSQL);

router.post(
  "/signup",
  //[verifySignUp.checkUser, verifySignUp.checkRoles],
  authCtrl.singUpSQL
);

export default router;
