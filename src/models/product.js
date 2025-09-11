"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category, {
        foreignKey: "categoryId",
        as: "category",
      });

      Product.hasMany(models.Variant, {
        foreignKey: "productId",
        as: "variants",
        onDelete: "CASCADE",
      });

      Product.hasMany(models.CartItem, {
        foreignKey: "productId",
        as: "cartItems",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-76DDUbZf_DdfcQw4-qFsL1ZETOjGKtfDkg&s",
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
