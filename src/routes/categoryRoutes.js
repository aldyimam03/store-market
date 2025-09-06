const express = require("express");
const CategoryController = require("../controllers/categoryController");
const { validate, categorySchema } = require("../middleware/validation");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Frontend Consumed Routes
router.get("/public/", CategoryController.getAllCategories);
router.get("/public/:id", CategoryController.getCategoryById);

router.use(authMiddleware);

router.post("/", validate(categorySchema), CategoryController.createCategory);
router.get("/", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getCategoryById);
router.put("/:id", validate(categorySchema), CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);

module.exports = router;
