const express = require("express");
const AuthController = require("../controllers/authController");
const { validate, registerSchema, loginSchema } = require("../middleware/validation");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/register", validate(registerSchema), AuthController.register);
router.post("/login", validate(loginSchema), AuthController.login);
router.get("/profile", authMiddleware, AuthController.profile);

module.exports = router;
