const { Category, Product } = require("../models");
const {
  successResponse,
  createdResponse,
  internalServerErrorResponse,
  forbiddenResponse,
  notFoundResponse,
  conflictResponse,
} = require("../utils/responses.js");
const { Op } = require("sequelize");

class ProductController {
  static async createProduct(req, res) {
    const { name, description, categoryId } = req.body;

    if (req.user.role !== "admin") {
      return forbiddenResponse(res, "Forbidden");
    }

    try {
      const categoryExists = await Category.findByPk(categoryId);
      if (!categoryExists) {
        return notFoundResponse(res, "Category not found");
      }

      const productExists = await Product.findOne({
        where: {
          name,
          categoryId,
        },
      });
      if (productExists) {
        return conflictResponse(res, "Product already exists in this category");
      }

      const product = await Product.create({ name, description, categoryId });

      return createdResponse(res, "Product created successfully", product);
    } catch (error) {
      return internalServerErrorResponse(res, error.message);
    }
  }

  static async getProducts(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const { count, rows } = await Product.findAndCountAll({
        include: [
          {
            model: Category,
            as: "category",
            attributes: ["id", "name", "description"],
          },
        ],
        limit,
        offset,
      });

      return successResponse(res, "Products retrieved successfully", {
        totalItem: count,
        totalPage: Math.ceil(count / limit),
        currentPage: page,
        products: rows,
      });
    } catch (error) {
      return internalServerErrorResponse(res, error.message);
    }
  }

  static async getProductById(req, res) {
    const { id } = req.params;
    try {
      const product = await Product.findByPk(id, {
        include: [
          {
            model: Category,
            as: "category",
            attributes: ["id", "name", "description"],
          },
        ],
      });

      if (product) {
        return successResponse(res, "Product retrieved successfully", product);
      } else {
        return notFoundResponse(res, "Product not found");
      }
    } catch (error) {
      return internalServerErrorResponse(res, error.message);
    }
  }

  static async getProductsByName(req, res) {
    const { name } = req.query;
    try {
      const products = await Product.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
        include: [
          {
            model: Category,
            as: "category",
            attributes: ["id", "name", "description"],
          },
        ],
      });
      if (products.length === 0) {
        return notFoundResponse(res, `Products not found with this name ${name}`);
      }
      return successResponse(res, "Products retrieved successfully", products);
    } catch (error) {
      return internalServerErrorResponse(res, error.message);
    }
  }

  static async updateProduct(req, res) {
    const { id } = req.params;
    const { name, description, categoryId } = req.body;

    if (req.user.role !== "admin") {
      return forbiddenResponse(res, "Forbidden");
    }

    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return notFoundResponse(res, "Product not found");
      }

      if (categoryId && categoryId !== product.categoryId) {
        const categoryExists = await Category.findByPk(categoryId);
        if (!categoryExists) {
          return notFoundResponse(res, "Category not found");
        }
      }

      if (
        name &&
        (name !== product.name || categoryId !== product.categoryId)
      ) {
        const productExists = await Product.findOne({
          where: {
            name,
            categoryId: categoryId || product.categoryId,
          },
        });
        if (productExists && productExists.id != id) {
          return conflictResponse(
            res,
            "Product with this name already exists in this category"
          );
        }
      }

      const updatedProduct = await product.update({
        name,
        description,
        categoryId,
      });
      return successResponse(
        res,
        "Product updated successfully",
        updatedProduct
      );
    } catch (error) {
      return internalServerErrorResponse(res, error.message);
    }
  }

  static async deleteProduct(req, res) {
    const { id } = req.params;

    if (req.user.role !== "admin") {
      return forbiddenResponse(res, "Forbidden");
    }

    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return notFoundResponse(res, "Product not found");
      }

      await product.destroy();
      return successResponse(res, `Product with ID ${id} deleted successfully`);
    } catch (error) {
      return internalServerErrorResponse(res, error.message);
    }
  }
}

module.exports = ProductController;
