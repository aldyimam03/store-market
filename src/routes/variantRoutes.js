const express = require("express");
const VariantController = require("../controllers/variantController");
const { validate, variantSchema } = require("../middleware/validation");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Frontend Consumed Routes
router.get("/public/variants", VariantController.getAllVariants);
router.get("/public/variants/:id", VariantController.getVariantById);

router.use(authMiddleware);

router.post("/", validate(variantSchema), VariantController.createVariant);
router.get("/", VariantController.getAllVariants);
router.get("/:id", VariantController.getVariantById);
router.get("/search/by-name", VariantController.getVariantByName);
router.put("/:id", validate(variantSchema), VariantController.updateVariant);
router.delete("/:id", VariantController.deleteVariant);

module.exports = router;
