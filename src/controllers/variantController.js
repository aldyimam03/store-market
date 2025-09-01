const { Product, Variant } = require("../models");
const { generateSKU, updateSKU } = require("../utils/sku");

const createVariant = async (req, res) => {
  const { name, description, price, stock, productId } = req.body;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res
        .status(404)
        .json({ error: `Product with ID ${productId} not found` });
    }

    const variantExists = await Variant.findOne({
      where: {
        name: name.trim(),
        productId: productId
      },
    });

    if (variantExists) {
      return res
        .status(409)
        .json({ error: "Variant with this name already exists for this product" });
    }

    const { sku, skuPrefix } = await generateSKU(productId, name);

    const variant = await Variant.create({
      name: name.trim(),
      description,
      price,
      stock,
      sku,
      productId,
    });

    res.status(201).json(variant);
  } catch (error) {
    console.error("Error creating variant:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllVariants = async (req, res) => {
  try {
    const variants = await Variant.findAll();
    res.status(200).json(variants);
  } catch (error) {
    console.error("Error fetching variants:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getVariantById = async (req, res) => {
  const { id } = req.params;
  try {
    const variant = await Variant.findByPk(id);
    if (!variant) {
      return res.status(404).json({ error: `Variant with ID ${id} not found` });
    }
    res.status(200).json(variant);
  } catch (error) {
    console.error("Error fetching variant:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateVariant = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, productId } = req.body;

  try {
    const variant = await Variant.findByPk(id);
    if (!variant) {
      return res.status(404).json({ error: `Variant with ID ${id} not found` });
    }

    if (productId && productId !== variant.productId) {
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ error: `Product with ID ${productId} not found` });
      }
    }

    if (name && name.trim() !== variant.name) {
      const duplicateVariant = await Variant.findOne({
        where: {
          name: name.trim(),
          productId: productId || variant.productId, 
          id: { [require("sequelize").Op.ne]: id } 
        },
      });

      if (duplicateVariant) {
        return res.status(409).json({ 
          error: "Variant with this name already exists for this product" 
        });
      }

      try {
        const { sku } = await generateSKU(productId || variant.productId, name);
        await variant.update({
          name: name.trim(),
          description,
          price,
          stock,
          productId,
          sku,
        });
      } catch (err) {
        return res.status(500).json({ error: "Failed to generate new SKU" });
      }
    } else {
      await variant.update({ 
        description, 
        price, 
        stock, 
        productId 
      });
    }

    const updatedVariant = await Variant.findByPk(id);
    res.status(200).json(updatedVariant);
  } catch (error) {
    console.error("Error updating variant:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteVariant = async (req, res) => {
  const { id } = req.params;
  try {
    const variant = await Variant.findByPk(id);
    if (!variant) {
      return res.status(404).json({ error: `Variant with ID ${id} not found` });
    }
    await variant.destroy();
    res
      .status(200)
      .json({ message: `Variant with ID ${id} deleted successfully` });
  } catch (error) {
    console.error("Error deleting variant:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createVariant,
  getAllVariants,
  getVariantById,
  updateVariant,
  deleteVariant,
};