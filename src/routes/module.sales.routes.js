import { Router } from "express";
import * as moduleSalesCtrl from "../modules/module.sales";
import { authJwt, verifySignUp } from "../middlewares";

const router = Router();

router.post("/client/", moduleSalesCtrl.createClient);

router.put("/client/:ID_CLIENTE", moduleSalesCtrl.updateClient);

router.post("/saleHeader/", moduleSalesCtrl.createSaleHeader);

router.put("/saleHeader/:ID_VENTA", moduleSalesCtrl.updateSaleHeader);

router.post("/addProduct2Sale/:ID_VENTA", moduleSalesCtrl.addProduct2Sale);

router.put("/addProduct2Sale/:ID_VENTA", moduleSalesCtrl.updateProductOnSale);

router.delete(
  "/addProduct2Sale/:ID_VENTA",
  moduleSalesCtrl.deleteProductOnSale
);

router.delete("/sale/:ID_VENTA", moduleSalesCtrl.deleteSale);

router.post("/sale/:ID_VENTA", moduleSalesCtrl.processSale);

router.get("/client/", moduleSalesCtrl.getClients);

router.get("/client/:ID_CLIENTE", moduleSalesCtrl.getClientByID);

router.get("/sale/:ID_VENTA", moduleSalesCtrl.getSaleByID);

router.get("/sale/", moduleSalesCtrl.getSales);

router.get("/saleDetail/:ID_VENTA", moduleSalesCtrl.getSaleDetailByID);

router.get("/saleDetail/", moduleSalesCtrl.getSalesDetail);

router.get("/saleFull/:ID_VENTA", moduleSalesCtrl.getSaleCompleteByID);

export default router;
