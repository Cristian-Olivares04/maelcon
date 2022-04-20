import { Router } from "express";

import * as moduleHelpersCtrl from "../modules/module.helpers";

const router = Router();

router.get("/helpInfo/", moduleHelpersCtrl.getHelpData);

router.get("/data/", moduleHelpersCtrl.getHelpActiveData);

router.put("/helpInfo/:ID_INFO", moduleHelpersCtrl.updateHelpData);

router.post("/helpInfo/", moduleHelpersCtrl.createHelpData);

router.delete("/helpInfo/:ID_INFO", moduleHelpersCtrl.deleteHelpData);

export default router;
