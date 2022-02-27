import { Router } from "express";
import * as authCtrl from "../controllers/auth.controller";
import {verifySignUp} from "../middlewares";

const router = Router();

router.post("/signin", authCtrl.singIn);

router.post("/signup", [verifySignUp.checkUser,verifySignUp.checkRoles],authCtrl.singUp);

export default router;
