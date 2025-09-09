const {
  Order,
  OrderItem,
  Cart,
  CartItem,
  Product,
  Variant,
  User,
  PaymentMethod,
} = require("../models");
const {
  successResponse,
  createdResponse,
  internalServerErrorResponse,
  forbiddenResponse,
  notFoundResponse,
  badRequestResponse,
} = require("../utils/responses.js");

class OrderController {
  static async createOrder(req, res) {
    try {
      const userId = req.user.id;

      const user = await User.findByPk(userId);
      if (!user) {
        return notFoundResponse(res, "User not found");
      }

      const { cartId, paymentMethodId, shippingAddress } = req.body;

      // 1. Ambil cart user
      const cart = await Cart.findOne({
        where: { id: cartId, userId },
        include: [
          {
            model: CartItem,
            as: "items",
            include: [
              { model: Product, as: "product" },
              { model: Variant, as: "variant" },
            ],
          },
        ],
      });

      if (!cart || cart.items.length === 0) {
        return badRequestResponse(res, "Cart is empty");
      }

      // 2. Hitung total
      let totalAmount = 0;
      const orderItemsData = cart.items.map((ci) => {
        const price = ci.variant.price;
        const subtotal = price * ci.quantity;
        totalAmount += subtotal;

        return {
          productId: ci.product.id,
          variantId: ci.variant.id,
          price,
          quantity: ci.quantity,
          subtotal,
        };
      });

      const paymentMethodRecord = await PaymentMethod.findByPk(
        paymentMethodId,
        {
          attributes: ["id", "name"],
        }
      );
      if (!paymentMethodRecord) {
        return notFoundResponse(res, "Payment method not found");
      }

      // 3. Buat order
      const order = await Order.create({
        userId,
        status: "pending",
        totalAmount,
        paymentMethodId,
        shippingAddress,
      });

      // 5. Masukkan order items
      for (const item of orderItemsData) {
        await OrderItem.create({ ...item, orderId: order.id });
      }

      // 6. Kosongkan cart (optional)
      await CartItem.destroy({ where: { cartId: cart.id } });

      // 7. Format response dengan menambahkan paymentMethod object
      const orderResponse = {
        ...order.toJSON(),
        paymentMethod: {
          id: paymentMethodRecord.id,
          name: paymentMethodRecord.name,
        },
      };

      createdResponse(res, "Order created successfully", {
        order: orderResponse,
        items: orderItemsData,
      });
    } catch (error) {
      return internalServerErrorResponse(res, error.message);
    }
  }

  static async getOrders(req, res) {
    try {
      const userId = req.user.id;

      const user = await User.findByPk(userId);
      if (!user) {
        return notFoundResponse(res, "User not found");
      }

      const role = req.user.role;

      const where = role === "admin" ? {} : { userId };

      const orders = await Order.findAll({
        where,
        include: [
          {
            model: OrderItem,
            include: [Product, Variant],
          },
          { model: User, attributes: ["id", "name", "email"] },
        ],
      });

      return successResponse(res, "Orders retrieved successfully", orders);
    } catch (error) {
      console.error(error);
      return internalServerErrorResponse(res, error.message);
    }
  }

  static async getOrderById(req, res) {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id, {
        include: [
          {
            model: OrderItem,
            include: [Product, Variant],
          },
          { model: User, attributes: ["id", "name", "email"] },
        ],
      });

      if (!order) {
        return notFoundResponse(res, "Order not found");
      }

      if (req.user.role !== "admin" && order.userId !== req.user.id) {
        return forbiddenResponse(res, "Forbidden");
      }

      return successResponse(res, "Order retrieved successfully", order);
    } catch (error) {
      return internalServerErrorResponse(res, error.message);
    }
  }

  static async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const order = await Order.findByPk(id);
      if (!order) return notFoundResponse(res, "Order not found");

      if (req.user.role !== "admin") {
        return forbiddenResponse(res, "Only admin can update order status");
      }

      order.status = status;
      await order.save();

      return successResponse(res, "Status updated successfully", order);
    } catch (error) {
      console.error(error);
      return internalServerErrorResponse(res, error.message);
    }
  }

  static async cancelOrder(req, res) {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id);

      if (!order) return notFoundResponse(res, "Order not found");

      if (order.userId !== req.user.id && req.user.role !== "admin") {
        return forbiddenResponse(res, "Forbidden");
      }

      if (order.status !== "pending") {
        return badRequestResponse(res, "Order cannot be canceled");
      }

      order.status = "canceled";
      await order.save();

      return successResponse(res, "Order canceled successfully", order);
    } catch (error) {
      console.error(error);
      return internalServerErrorResponse(res, error.message);
    }
  }
}
module.exports = OrderController;
