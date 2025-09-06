const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const {
  successResponse,
  createdResponse,
  internalServerErrorResponse,
  notFoundResponse,
  conflictResponse,
  unauthorizedResponse,
} = require("../utils/responses.js");

class AuthController {
  static async register(req, res) {
    try {
      const { name, username, email, password, role } = req.body;

      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return conflictResponse(res, "Username already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        username,
        email,
        password: hashedPassword,
        role: role || "customer",
      });

      return createdResponse(res, "User registered successfully", {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      return internalServerErrorResponse(res, error.message);
    }
  }

  static async login(req, res) {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ where: { username } });
      if (!user) {
        return notFoundResponse(res, "User not found");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return unauthorizedResponse(res, "Invalid password or username");
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return successResponse(res, "Login successful", {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      return internalServerErrorResponse(res, error.message);
    }
  }

  static async profile(req, res) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: ["id", "username", "email", "role"],
      });

      if (!user) {
        return notFoundResponse(res, "User not found");
      }

      return successResponse(res, "User profile retrieved successfully", user);
    } catch (error) {
      return internalServerErrorResponse(res, error.message);
    }
  }
}

module.exports = AuthController;
