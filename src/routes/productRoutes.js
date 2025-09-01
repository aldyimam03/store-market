const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { validate, productSchema } = require("../middleware/validation");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/", validate(productSchema), authMiddleware, createProduct);
router.get("/", authMiddleware, getProducts);
router.get("/:id", authMiddleware, getProductById);
router.put("/:id", validate(productSchema), authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

// Frontend Consumed Routes
router.get("/public/", getProducts);
router.get("/public/:id", getProductById);

module.exports = router;
