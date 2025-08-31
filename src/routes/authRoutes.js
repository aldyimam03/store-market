const express = require("express");
const { registerController, loginController, getProfileController } = require("../controllers/authController");
const { validate, registerSchema, loginSchema } = require("../middleware/validation");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/register", validate(registerSchema), registerController);
router.post("/login", validate(loginSchema), loginController);
router.get("/profile", authMiddleware, getProfileController);

module.exports = router;
