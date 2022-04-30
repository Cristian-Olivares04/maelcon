import { Router } from "express";

import * as moduleReportsCtrl from "../modules/module.reports";

const router = Router();

router.post("/salesReport/", moduleReportsCtrl.getSalesReport);

router.post("/shoppingReport/", moduleReportsCtrl.getShoppingReport);

router.post("/binnacleReport/", moduleReportsCtrl.getBinnacleReport);

export default router;
