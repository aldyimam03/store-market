const express = require("express");
const ProductController = require("../controllers/productController");
const { validate, productSchema } = require("../middleware/validation");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Frontend Consumed Routes
router.get("/public/products", ProductController.getProducts);
router.get("/public/products/:id", ProductController.getProductById);

router.use(authMiddleware); 

router.post("/", validate(productSchema), ProductController.createProduct);
router.get("/", ProductController.getProducts);
router.get("/:id", ProductController.getProductById);
router.get("/search/by-name", ProductController.getProductsByName);
router.put("/:id", validate(productSchema), ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

module.exports = router;
