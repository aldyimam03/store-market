const express = require("express");
const authRoutes = require("../routes/authRoutes");
const categoryRoutes = require("../routes/categoryRoutes");
const productRoutes = require("../routes/productRoutes");
const variantRoutes = require("../routes/variantRoutes");
const cartRoutes = require("../routes/cartRoutes");
const orderRoutes = require("../routes/orderRoutes");
const paymentMethodRoutes = require("../routes/paymentMethod");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/variants", variantRoutes);
router.use("/carts", cartRoutes);
router.use("/orders", orderRoutes);
router.use("/payment-methods", paymentMethodRoutes);

module.exports = router;