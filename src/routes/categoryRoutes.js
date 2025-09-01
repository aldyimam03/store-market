const express = require("express");
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { validate, categorySchema } = require("../middleware/validation");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/", validate(categorySchema), authMiddleware, createCategory);
router.get("/", authMiddleware, getAllCategories);
router.get("/:id", authMiddleware, getCategoryById);
router.put("/:id", validate(categorySchema), authMiddleware, updateCategory);
router.delete("/:id", authMiddleware, deleteCategory);

// Frontend Consumed Routes
router.get("/public/", getAllCategories);
router.get("/public/:id", getCategoryById);

module.exports = router;
