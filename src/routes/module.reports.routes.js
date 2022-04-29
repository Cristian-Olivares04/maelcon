import { Router } from "express";

import * as moduleReportsCtrl from "../modules/module.reports";

const router = Router();

router.get("/salesReport/", moduleReportsCtrl.getSalesReport);

router.get("/shoppingReport/", moduleReportsCtrl.getShoppingReport);

router.get("/binnacleReport/", moduleReportsCtrl.getBinnacleReport);

export default router;
