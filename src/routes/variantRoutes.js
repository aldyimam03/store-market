const express = require("express");
const {
  createVariant,
  getAllVariants,
  getVariantById,
  updateVariant,
  deleteVariant,
} = require("../controllers/variantController");

const router = express.Router();

router.post("/", createVariant);
router.get("/", getAllVariants);
router.get("/:id", getVariantById);
router.put("/:id", updateVariant);
router.delete("/:id", deleteVariant);

module.exports = router;
