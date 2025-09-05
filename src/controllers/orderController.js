const {
  Order,
  OrderItem,
  Cart,
  CartItem,
  Product,
  Variant,
  User,
} = require("../models");

class OrderController {
  static async createOrder(req, res) {
    try {
      const userId = req.user.id;
      const { cartId, paymentMethod, shippingAddress } = req.body;

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
        return res.status(400).json({ error: "Cart is empty" });
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

      // 3. Buat order
      const order = await Order.create({
        userId,
        status: "pending",
        totalAmount,
        paymentMethod,
        shippingAddress,
      });

      // 4. Masukkan order items
      for (const item of orderItemsData) {
        await OrderItem.create({ ...item, orderId: order.id });
      }

      // 5. Kosongkan cart (optional)
      await CartItem.destroy({ where: { cartId: cart.id } });

      res.status(201).json({
        message: "Order created successfully",
        order,
        items: orderItemsData,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getOrders(req, res) {
    try {
      const userId = req.user.id;
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

      return res.json(orders);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
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
        return res.status(404).json({ error: "Order not found" });
      }

      if (req.user.role !== "admin" && order.userId !== req.user.id) {
        return res.status(403).json({ error: "Forbidden" });
      }

      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const order = await Order.findByPk(id);
      if (!order) return res.status(404).json({ message: "Order not found" });

      if (req.user.role !== "admin") {
        return res
          .status(403)
          .json({ message: "Only admin can update status" });
      }

      order.status = status;
      await order.save();

      return res.json({ message: "Status updated", order });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async cancelOrder(req, res) {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id);

      if (!order) return res.status(404).json({ message: "Order not found" });

      if (order.userId !== req.user.id && req.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
      }

      if (order.status !== "pending") {
        return res.status(400).json({ message: "Order cannot be canceled" });
      }

      order.status = "canceled";
      await order.save();

      return res.json({ message: "Order canceled", order });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
module.exports = OrderController;
