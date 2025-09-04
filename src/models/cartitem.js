"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CartItem.belongsTo(models.Cart, {
        foreignKey: "cartId",
        as: "cart",
      });
      CartItem.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
      });
      CartItem.belongsTo(models.Variant, {
        foreignKey: "variantId",
        as: "variant",
      });
    }
  }
  CartItem.init(
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Carts",
          key: "id",
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Products",
          key: "id",
        },
      },
      variantId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Variants",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "CartItem",
    }
  );
  return CartItem;
};
