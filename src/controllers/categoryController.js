const { Category } = require("../models");

class CategoryController {
  static async createCategory(req, res) {
    const { name, description } = req.body;
    try {
      const categoryExists = await Category.findOne({ where: { name } });
      if (categoryExists) {
        return res.status(409).json({ error: "Category already exists" });
      }

      const category = await Category.create({ name, description });

      return res.status(201).json(category);
    } catch (error) {
      return res.status(500).json({ error: error.message });
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
      return res.status(200).json({
        totalItem: count,
        totalPage: Math.ceil(count / limit),
        currentPage: page,
        categories: rows,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getCategoryById(req, res) {
    const { id } = req.params;
    try {
      const category = await Category.findByPk(id);
      if (category) {
        return res.status(200).json(category);
      } else {
        return res.status(404).json({ error: "Category not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async updateCategory(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
      const category = await Category.findByPk(id);
      if (category) {
        const categoryExists = await Category.findOne({ where: { name } });
        if (categoryExists && categoryExists.id !== id) {
          return res.status(409).json({ error: "Category already exists" });
        }

        const updatedCategory = await category.update({ name, description });
        return res.status(200).json(updatedCategory);
      } else {
        return res.status(404).json({ error: "Category not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async deleteCategory(req, res) {
    const { id } = req.params;
    try {
      const category = await Category.findByPk(id);
      if (category) {
        await category.destroy();
        return res
          .status(200)
          .json({ message: `Category with ID ${id} deleted successfully` });
      } else {
        return res.status(404).json({ error: "Category not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
module.exports = CategoryController;
