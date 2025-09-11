"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.hasMany(models.Product, {
        foreignKey: "categoryId",
        as: "products",
        onDelete: "CASCADE",
      });
    }
  }
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-76DDUbZf_DdfcQw4-qFsL1ZETOjGKtfDkg&s",
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
