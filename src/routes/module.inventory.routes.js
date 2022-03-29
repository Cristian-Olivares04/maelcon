import { Router } from "express";
import * as moduleInventoryCtrl from "../modules/module.inventory";

const router = Router();

router.post("/category/", moduleInventoryCtrl.createCategory);

router.get("/category/", moduleInventoryCtrl.getCategories);

router.get("/category/:ID_CATEGORIA", moduleInventoryCtrl.getCategoryByID);

router.put("/category/:ID_CATEGORIA", moduleInventoryCtrl.updateCategory);

router.post("/product/", moduleInventoryCtrl.createProduct);

router.put("/product/:ID_PRODUCTO", moduleInventoryCtrl.updateProduct);

router.put(
  "/productAvailable/:ID_INVENTARIO",
  moduleInventoryCtrl.updateAvailable
);

router.put(
  "/productExpireDate/:ID_KARDEX",
  moduleInventoryCtrl.updateExpireDate
);

router.get("/", moduleInventoryCtrl.getInventory);

router.get("/existence/", moduleInventoryCtrl.getInventoryByProduct);

router.get("/kardex/", moduleInventoryCtrl.getKardex);

export default router;
