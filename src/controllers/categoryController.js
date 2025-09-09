const { Category } = require("../models");
const {
  successResponse,
  createdResponse,
  internalServerErrorResponse,
  forbiddenResponse,
  notFoundResponse,
  conflictResponse,
} = require("../utils/responses.js");
const { Op } = require("sequelize");

class CategoryController {
  static async createCategory(req, res) {
    const { name, description } = req.body;

    if (req.user.role !== "admin") {
      return forbiddenResponse(res, "Forbidden");
    }

    try {
      const categoryExists = await Category.findOne({ where: { name } });
      if (categoryExists) {
        return conflictResponse(res, "Category already exists");
      }

      const category = await Category.create({ name, description });

      return createdResponse(res, "Category created successfully", category);
    } catch (error) {
      return internalServerErrorResponse(res, error.message);
    }
  }

  static async getAllCategories(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const { count, rows } = await Category.findAndCountAll({
        limit,
        offset,
      });
      return successResponse(res, "Categories retrieved successfully", {
        totalItem: count,
        totalPage: Math.ceil(count / limit),
        currentPage: page,
        categories: rows,
      });
    } catch (error) {
      return internalServerErrorResponse(res, error.message);
    }
  }

  static async getCategoryById(req, res) {
    const { id } = req.params;
    try {
      const category = await Category.findByPk(id);
      if (category) {
        return successResponse(res, "Category retrieved successfully", {});
      } else {
        return notFoundResponse(res, `Category with this id ${id} not found`);
      }
    } catch (error) {
      return internalServerErrorResponse(res, error.message);
    }
  }

  static async getCategoryByName(req, res) {
    const { name } = req.query;
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const { count, rows } = await Category.findAndCountAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
        limit,
        offset,
      });

      if (rows.length > 0) {
        return successResponse(res, "Categories retrieved successfully", {
          totalCategories: count,
          totalPage: Math.ceil(count / limit),
          currentPage: page,
          categories: rows,
        });
      } else {
        return notFoundResponse(res, `Category not found with name ${name}`);
      }
    } catch (error) {
      return internalServerErrorResponse(res, error.message);
    }
  }

  static async updateCategory(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;

    if (req.user.role !== "admin") {
      return forbiddenResponse(res, "Forbidden");
    }

    try {
      const category = await Category.findByPk(id);
      if (category) {
        const categoryExists = await Category.findOne({ where: { name } });
        if (categoryExists && categoryExists.id !== id) {
          return conflictResponse(res, "Category already exists");
        }

        const updatedCategory = await category.update({ name, description });
        return successResponse(
          res,
          "Category updated successfully",
          updatedCategory
        );
      } else {
        return notFoundResponse(res, "Category not found");
      }
    } catch (error) {
      return internalServerErrorResponse(res, error.message);
    }
  }

  static async deleteCategory(req, res) {
    const { id } = req.params;

    if (req.user.role !== "admin") {
      return forbiddenResponse(res, "Forbidden");
    }

    try {
      const category = await Category.findByPk(id);
      if (category) {
        await category.destroy();
        return successResponse(
          res,
          `Category with ID ${id} deleted successfully`
        );
      } else {
        return notFoundResponse(res, "Category not found");
      }
    } catch (error) {
      return internalServerErrorResponse(res, error.message);
    }
  }
}
module.exports = CategoryController;
