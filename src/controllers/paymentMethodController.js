const { PaymentMethod } = require("../models");
const {
  createdResponse,
  internalServerErrorResponse,
  successResponse,
  notFoundResponse,
  forbiddenResponse,
} = require("../utils/responses.js");
class PaymentMethodController {
  static async createPaymentMethod(req, res) {
    if (req.user.role !== "admin") {
      return forbiddenResponse(res, "Forbidden");
    }

    try {
      const { name } = req.body;
      const paymentMethod = await PaymentMethod.create({ name });
      return createdResponse(
        res,
        "Payment method created successfully",
        paymentMethod
      );
    } catch (error) {
      return internalServerErrorResponse(res, error.message);
    }
  }
  static async getAllPaymentMethods(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const { count, rows } = await PaymentMethod.findAndCountAll({
        limit,
        offset,
      });

      if (count === 0) {
        return notFoundResponse(res, "No payment methods found");
      }

      return successResponse(res, "Payment methods retrieved successfully", {
        totalPaymentMethods: count,
        totalPage: Math.ceil(count / limit),
        currentPage: page,
        paymentMethods: rows,
      });
    } catch (error) {
      return internalServerErrorResponse(res, error.message);
    }
  }

  static async getPaymentMethodById(req, res) {
    try {
      const { id } = req.params;
      const paymentMethod = await PaymentMethod.findByPk(id);
      if (!paymentMethod) {
        return notFoundResponse(res, "Payment method not found");
      }
      return successResponse(
        res,
        "Payment method retrieved successfully",
        paymentMethod
      );
    } catch (error) {
      return internalServerErrorResponse(res, error.message);
    }
  }

  static async getPaymentMethodByName(req, res) {
    try {
      const { name } = req.params;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const { count, rows } = await PaymentMethod.findAndCountAll({
        where: { name },
        limit,
        offset,
      });
      if (count === 0) {
        return notFoundResponse(res, "Payment method not found");
      }
      return successResponse(res, "Payment method retrieved successfully", {
        totalPaymentMethods: count,
        totalPage: Math.ceil(count / limit),
        currentPage: page,
        paymentMethods: rows,
      });
    } catch (error) {
      return internalServerErrorResponse(res, error.message);
    }
  }

  static async updatePaymentMethod(req, res) {
    if (req.user.role !== "admin") {
      return forbiddenResponse(res, "Forbidden");
    }
    try {
      const { id } = req.params;
      const { name } = req.body;
      const paymentMethod = await PaymentMethod.findByPk(id);
      if (!paymentMethod) {
        return notFoundResponse(res, "Payment method not found");
      }
      await paymentMethod.update({ name });
      return successResponse(
        res,
        "Payment method updated successfully",
        paymentMethod
      );
    } catch (error) {
      return internalServerErrorResponse(res, error.message);
    }
  }

  static async deletePaymentMethod(req, res) {
    if (req.user.role !== "admin") {
      return forbiddenResponse(res, "Forbidden");
    }
    try {
      const { id } = req.params;
      const paymentMethod = await PaymentMethod.findByPk(id);
      if (!paymentMethod) {
        return notFoundResponse(res, "Payment method not found");
      }
      await paymentMethod.destroy();
      return successResponse(
        res,
        `Payment method with ID ${id} deleted successfully`
      );
    } catch (error) {
      return internalServerErrorResponse(res, error.message);
    }
  }
}

module.exports = PaymentMethodController;
