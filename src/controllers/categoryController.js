const { Category } = require("../models");

const createCategory = async (req, res) => {
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
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getCategoryById = async (req, res) => {
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
};

const updateCategory = async (req, res) => {
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
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (category) {
      await category.destroy();
      return res.status(200).json({ message: `Category with ID ${id} deleted successfully` });
    } else {
      return res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
