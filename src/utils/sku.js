const { Product, Variant, Category } = require("../models");

const generateSKU = async (productId, variantName) => {
  try {
    const product = await Product.findByPk(productId, {
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name"],
        },
      ],
    });

    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }

    const categoryPrefix = product.category.name.substring(0, 3).toUpperCase();
    const productPrefix = product.name.substring(0, 3).toUpperCase();
    const variantWords = variantName.trim().split(" ");
    const variantFullPrefix = variantWords
      .map((word) => word.toUpperCase())
      .join("-");

    const skuPrefix = `${categoryPrefix}-${productPrefix}-${variantFullPrefix}`;
    const existingVariants = await Variant.count({
      where: { productId },
    });
    const sequenceNumber = String(existingVariants + 1).padStart(3, "0");

    const sku = `${skuPrefix}-${sequenceNumber}`;

    return { sku, skuPrefix };
  } catch (error) {
    const timestamp = Date.now().toString().slice(-6);
    return { sku: `VAR-${timestamp}`, skuPrefix: `VAR-${timestamp}` };
  }
};

const updateSKU = async (variantId, newVariantName) => {
  try {
    const variant = await Variant.findByPk(variantId);
    if (!variant) {
      throw new Error(`Variant with ID ${variantId} not found`);
    }

    const { sku, skuPrefix } = await generateSKU(
      variant.productId,
      newVariantName
    );

    await variant.update({ name: newVariantName, sku });

    return { sku, skuPrefix };
  } catch (error) {
    console.error("Error updating SKU:", error.message);
    throw new Error(error.message || "Failed to update SKU");
  }
};

module.exports = { generateSKU, updateSKU };
