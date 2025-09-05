const express = require("express");
const OrderController = require("../controllers/orderController");
const router = express.Router();
const authMiddleware = require('../middleware/auth'); 

router.use(authMiddleware);

router.post("/", OrderController.createOrder);
router.get("/", OrderController.getOrders);
router.get("/:id", OrderController.getOrderById);
router.put("/status/:id", OrderController.updateStatus);
router.delete("/:id", OrderController.cancelOrder);

module.exports = router;
