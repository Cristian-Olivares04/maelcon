import { Router } from "express";
import * as ordersCtrl from "../controllers/order.controller";
import { authJwt } from "../middlewares";
const router = Router();

router.get("/", authJwt.verifyToken, ordersCtrl.getOrders);
router.get("/:orderId", authJwt.verifyToken, ordersCtrl.getOrderById);
router.put("/:orderId", [authJwt.verifyToken, authJwt.isAdmin], ordersCtrl.updateOrderById);
router.post("/", authJwt.verifyToken, ordersCtrl.createOrder);
router.delete("/:orderId",[ authJwt.verifyToken, authJwt.isAdmin], ordersCtrl.deleteOrderById);

export default router;
