const { Category, Product } = require("../models");

class ProductController {
  static async createProduct(req, res) {
    const { name, description, categoryId } = req.body;
    try {
      const categoryExists = await Category.findByPk(categoryId);
      if (!categoryExists) {
        return res.status(404).json({ error: "Category not found" });
      }

      const productExists = await Product.findOne({
        where: {
          name,
          categoryId,
        },
      });
      if (productExists) {
        return res
          .status(409)
          .json({ error: "Product already exists in this category" });
      }

      const product = await Product.create({ name, description, categoryId });

      return res.status(201).json(product);
    } catch (error) {
      return res.status(500).json({ error: error.message });
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

      return res.status(200).json({
        totalItem: count,
        totalPage: Math.ceil(count / limit),
        currentPage: page,
        products: rows,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
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
        return res.status(200).json(product);
      } else {
        return res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async updateProduct(req, res) {
    const { id } = req.params;
    const { name, description, categoryId } = req.body;
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      if (categoryId && categoryId !== product.categoryId) {
        const categoryExists = await Category.findByPk(categoryId);
        if (!categoryExists) {
          return res.status(404).json({ error: "Category not found" });
        }
      }

      if (name && (name !== product.name || categoryId !== product.categoryId)) {
        const productExists = await Product.findOne({
          where: {
            name,
            categoryId: categoryId || product.categoryId,
          },
        });
        if (productExists && productExists.id != id) {
          return res.status(409).json({
            error: "Product with this name already exists in this category",
          });
        }
      }

      const updatedProduct = await product.update({
        name,
        description,
        categoryId,
      });
      return res.status(200).json(updatedProduct);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async deleteProduct(req, res) {
    const { id } = req.params;
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      await product.destroy();
      return res
        .status(200)
        .json({ message: `Product with ID ${id} deleted successfully` });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProductController;
