import { Router } from "express";
import * as productsCtrl from "../controllers/products.controllers";
import { authJwt } from "../middlewares";

const router = Router();

router.get("/", productsCtrl.getProducts);
router.get("/products/:companyID", authJwt.verifyToken, productsCtrl.getProductByCompany)
router.get("/:productId", productsCtrl.getProductById);
router.put(
  "/:productId",
  [authJwt.verifyToken, authJwt.isAdmin],
  productsCtrl.updateProductById
);
router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin],
  productsCtrl.createProduct
);
router.delete(
  "/:productId",
  [authJwt.verifyToken, authJwt.isAdmin],
  productsCtrl.deleteProductById
);

export default router;
