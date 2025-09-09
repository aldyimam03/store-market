const { Product, Variant } = require("../models");
const { generateSKU } = require("../utils/sku");
const { Op } = require("sequelize");
const {
  successResponse,
  createdResponse,
  internalServerErrorResponse,
  forbiddenResponse,
  notFoundResponse,
  conflictResponse,
} = require("../utils/responses.js");

class VariantController {
  static async createVariant(req, res) {
    const { name, description, price, stock, productId } = req.body;

    if (req.user.role !== "admin") {
      return forbiddenResponse(res, "Forbidden");
    }

    try {
      const product = await Product.findByPk(productId);
      if (!product) {
        return notFoundResponse(res, `Product with ID ${productId} not found`);
      }

      const variantExists = await Variant.findOne({
        where: {
          name: name.trim(),
          productId: productId,
        },
      });

      if (variantExists) {
        return conflictResponse(
          res,
          "Variant with this name already exists for this product"
        );
      }

      const { sku } = await generateSKU(productId, name);

      const variant = await Variant.create({
        name: name.trim(),
        description,
        price,
        stock,
        sku,
        productId,
      });

      return createdResponse(res, "Variant created successfully", variant);
    } catch (error) {
      console.error("Error creating variant:", error);
      return internalServerErrorResponse(res, "Internal server error");
    }
  }

  static async getAllVariants(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const { count, rows } = await Variant.findAndCountAll({
        limit,
        offset,
        order: [["createdAt", "DESC"]],
      });

      return successResponse(res, "Variants retrieved successfully", {
        totalItem: count,
        totalPage: Math.ceil(count / limit),
        currentPage: page,
        variants: rows,
      });
    } catch (error) {
      console.error("Error fetching variants:", error);
      return internalServerErrorResponse(res, "Internal server error");
    }
  }

  static async getVariantById(req, res) {
    const { id } = req.params;
    try {
      const variant = await Variant.findByPk(id);
      if (!variant) {
        return notFoundResponse(res, `Variant with ID ${id} not found`);
      }
      return successResponse(res, "Variant retrieved successfully", variant);
    } catch (error) {
      console.error("Error fetching variant:", error);
      return internalServerErrorResponse(res, "Internal server error");
    }
  }

  static async getVariantByName(req, res) {
    const { name } = req.query;
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const { count, rows } = await Variant.findAndCountAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
        limit,
        offset,
      });

      if (rows.length === 0) {
        return notFoundResponse(res, `Variant with name ${name} not found`);
      }

      return successResponse(res, "Variants retrieved successfully", {
        totalVariants: count,
        totalPage: Math.ceil(count / limit),
        currentPage: page,
        variants: rows,
      });
    } catch (error) {
      console.error("Error fetching variant:", error);
      return internalServerErrorResponse(res, error.message);
    }
  }

  static async updateVariant(req, res) {
    const { id } = req.params;
    const { name, description, price, stock, productId } = req.body;

    if (req.user.role !== "admin") {
      return forbiddenResponse(res, "Forbidden");
    }

    try {
      const variant = await Variant.findByPk(id);
      if (!variant) {
        return notFoundResponse(res, `Variant with ID ${id} not found`);
      }

      if (productId && productId !== variant.productId) {
        const product = await Product.findByPk(productId);
        if (!product) {
          return notFoundResponse(
            res,
            `Product with ID ${productId} not found`
          );
        }
      }

      if (name && name.trim() !== variant.name) {
        const duplicateVariant = await Variant.findOne({
          where: {
            name: name.trim(),
            productId: productId || variant.productId,
            id: { [Op.ne]: id },
          },
        });

        if (duplicateVariant) {
          return conflictResponse(
            res,
            "Variant with this name already exists for this product"
          );
        }

        try {
          const { sku } = await generateSKU(
            productId || variant.productId,
            name
          );
          await variant.update({
            name: name.trim(),
            description,
            price,
            stock,
            productId,
            sku,
          });
        } catch (error) {
          return internalServerErrorResponse(
            res,
            "Failed to generate new SKU",
            error.message
          );
        }
      } else {
        await variant.update({
          description,
          price,
          stock,
          productId,
        });
      }

      const updatedVariant = await Variant.findByPk(id);
      return successResponse(
        res,
        "Variant updated successfully",
        updatedVariant
      );
    } catch (error) {
      console.error("Error updating variant:", error);
      return internalServerErrorResponse(
        res,
        "Internal server error",
        error.message
      );
    }
  }

  static async deleteVariant(req, res) {
    const { id } = req.params;

    if (req.user.role !== "admin") {
      return forbiddenResponse(res, "Forbidden");
    }

    try {
      const variant = await Variant.findByPk(id);
      if (!variant) {
        return notFoundResponse(res, `Variant with ID ${id} not found`);
      }
      await variant.destroy();
      return successResponse(res, `Variant with ID ${id} deleted successfully`);
    } catch (error) {
      console.error("Error deleting variant:", error);
      return internalServerErrorResponse(
        res,
        "Internal server error",
        error.message
      );
    }
  }
}

module.exports = VariantController;
