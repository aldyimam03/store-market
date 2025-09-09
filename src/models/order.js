"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Order.hasMany(models.OrderItem, {
        foreignKey: "orderId",
      });
      Order.belongsTo(models.PaymentMethod, {
        foreignKey: "paymentMethodId",
        as: "paymentMethod",
      });
    }
  }
  Order.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: [
          "pending",
          "paid",
          "shipped",
          "delivered",
          "completed",
          "canceled",
        ],
        defaultValue: "pending",
        allowNull: false,
      },
      totalAmount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      paymentMethodId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      shippingAddress: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
