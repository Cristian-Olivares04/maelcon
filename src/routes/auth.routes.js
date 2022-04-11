import { Router } from "express";
import * as authCtrl from "../controllers/auth.controller";
import { verifySignUp } from "../middlewares";
import upload from "../middlewares/upload";

const router = Router();

router.post("/signin", authCtrl.singInSQL);

router.post(
  "/signup",
  //[verifySignUp.checkUser, verifySignUp.checkRoles],
  upload.uploadUserIMG,
  authCtrl.singUpSQL
);

export default router;
