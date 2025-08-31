const express = require("express");
const { registerController } = require("../controllers/authController");
const { validate, registerSchema } = require("../middleware/validation");

const router = express.Router();

router.post("/register", validate(registerSchema), registerController);

module.exports = router;
