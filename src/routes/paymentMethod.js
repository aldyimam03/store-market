const express = require("express");
const PaymentMethodController = require("../controllers/paymentMethodController");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { validate, paymentMethodSchema } = require("../middleware/validation");

router.use(authMiddleware);

router.post(
  "/",
  validate(paymentMethodSchema),
  PaymentMethodController.createPaymentMethod
);
router.get("/", PaymentMethodController.getAllPaymentMethods);
router.get("/:id", PaymentMethodController.getPaymentMethodById);
router.get("/search/by-name", PaymentMethodController.getPaymentMethodByName);
router.put(
  "/:id",
  validate(paymentMethodSchema),
  PaymentMethodController.updatePaymentMethod
);
router.delete("/:id", PaymentMethodController.deletePaymentMethod);

module.exports = router;
