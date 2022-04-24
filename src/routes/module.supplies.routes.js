import { Router } from "express";
import * as moduleSuppliesCtrl from "../modules/module.supplies";

const router = Router();

router.post("/supplier/", moduleSuppliesCtrl.createSupplier);

router.put("/supplier/:ID_PROVEEDOR", moduleSuppliesCtrl.updateSupplier);

router.post("/supplyHeader/", moduleSuppliesCtrl.createSupplyHeader);

router.put("/supplyHeader/:ID_COMPRA", moduleSuppliesCtrl.updateSupplyHeader);

router.post("/addSupply/", moduleSuppliesCtrl.addSupply);

router.put("/updateSupply/", moduleSuppliesCtrl.updateSupply);

router.delete("/deleteSupply/", moduleSuppliesCtrl.deleteSupply);

router.delete(
  "/eliminateSupply/:ID_COMPRA",
  moduleSuppliesCtrl.eliminateSupply
);

router.post("/processSupply/:ID_COMPRA", moduleSuppliesCtrl.processSupply);

router.get("/supplies/", moduleSuppliesCtrl.getSupplies);

router.get("/supplies/:ID_PRODUCTO", moduleSuppliesCtrl.getSupplyByID);

router.get("/providers/", moduleSuppliesCtrl.getSuppliers);

router.get("/providers/:ID_PROVEEDOR", moduleSuppliesCtrl.getSupplierByID);

router.get("/purchases/", moduleSuppliesCtrl.getPurchases);

router.get("/purchases/:ID_COMPRA", moduleSuppliesCtrl.getPurchaseByID);

router.get("/productData/", moduleSuppliesCtrl.getProductData);

router.get("/productData/:ID_PRODUCTO", moduleSuppliesCtrl.getProductDataByID);

//Obtener detalles de la compra
router.get("/detailsSupply/:ID_COMPRA", moduleSuppliesCtrl.getDetailsSupplyById);

export default router;
