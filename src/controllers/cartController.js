const { Cart, CartItem, Product, Variant, User } = require("../models");

class CartController {
  // 1. Mendapatkan cart user beserta semua items
  static async getCart(req, res) {
    try {
      const userId = req.user.id; // Dari middleware auth

      let cart = await Cart.findOne({
        where: { userId },
        include: [
          {
            model: CartItem,
            as: "items",
            include: [
              {
                model: Product,
                as: "product",
                attributes: ["id", "name", "description"],
              },
              {
                model: Variant,
                as: "variant",
                attributes: ["id", "name", "price", "stock", "sku"],
                required: false, // LEFT JOIN karena variant bisa null
              },
            ],
          },
        ],
      });

      // Jika cart belum ada, buat cart baru
      if (!cart) {
        cart = await Cart.create({ userId });
        cart.items = []; // Set items kosong untuk response
      }

      // Calculate total
      const total = cart.items.reduce((sum, item) => {
        const itemPrice = item.variant
          ? item.variant.price
          : item.product.price;
        return sum + itemPrice * item.quantity;
      }, 0);

      res.json({
        success: true,
        data: {
          cart: {
            id: cart.id,
            userId: cart.userId,
            items: cart.items,
            totalItems: cart.items.reduce(
              (sum, item) => sum + item.quantity,
              0
            ),
            totalPrice: total,
            createdAt: cart.createdAt,
            updatedAt: cart.updatedAt,
          },
        },
      });
    } catch (error) {
      console.error("Error getting cart:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  // 2. Menambah item ke cart
  static async addToCart(req, res) {
    try {
      const userId = req.user.id;
      const { productId, variantId, quantity = 1 } = req.body;

      // Validasi input
      if (!productId) {
        return res.status(400).json({
          success: false,
          message: "Product ID is required",
        });
      }

      // Cek apakah product ada
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      // Jika ada variantId, cek apakah variant ada dan belong ke product ini
      let variant = null;
      if (variantId) {
        variant = await Variant.findOne({
          where: {
            id: variantId,
            productId: productId,
          },
        });

        if (!variant) {
          return res.status(404).json({
            success: false,
            message: "Variant not found for this product",
          });
        }

        // Cek stock variant
        if (variant.stock < quantity) {
          return res.status(400).json({
            success: false,
            message: `Only ${variant.stock} items available in stock`,
          });
        }
      }

      // Cari atau buat cart user
      let cart = await Cart.findOne({ where: { userId } });
      if (!cart) {
        cart = await Cart.create({ userId });
      }

      // Cek apakah item sudah ada di cart (same product + variant)
      let cartItem = await CartItem.findOne({
        where: {
          cartId: cart.id,
          productId,
          variantId: variantId || null,
        },
      });

      if (cartItem) {
        // Update quantity jika item sudah ada
        const newQuantity = cartItem.quantity + quantity;

        // Cek stock lagi untuk total quantity
        if (variant && variant.stock < newQuantity) {
          return res.status(400).json({
            success: false,
            message: `Cannot add ${quantity} more items. Only ${
              variant.stock - cartItem.quantity
            } items available`,
          });
        }

        cartItem.quantity = newQuantity;
        await cartItem.save();
      } else {
        // Buat cart item baru
        cartItem = await CartItem.create({
          cartId: cart.id,
          productId,
          variantId: variantId || null,
          quantity,
        });
      }

      // Hitung jumlah stock di variant kalau sudah di taruh di cart
      if (variant) {
        variant.stock -= quantity;
        await variant.save();
      }

      // Fetch updated cart item dengan relasi
      const updatedCartItem = await CartItem.findByPk(cartItem.id, {
        include: [
          {
            model: Product,
            as: "product",
            attributes: ["id", "name"],
          },
          {
            model: Variant,
            as: "variant",
            attributes: ["id", "name", "price", "stock", "sku"],
            required: false,
          },
        ],
      });

      res.status(201).json({
        success: true,
        message: "Item added to cart successfully",
        data: {
          cartItem: updatedCartItem,
        },
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  // 3. Update quantity item di cart
  static async updateCartItem(req, res) {
    try {
      const userId = req.user.id;
      const { cartItemId } = req.params;
      const { quantity } = req.body;

      // Validasi quantity
      if (!quantity || quantity < 1) {
        return res.status(400).json({
          success: false,
          message: "Quantity must be at least 1",
        });
      }

      // Cari cart item yang belong ke user
      const cartItem = await CartItem.findOne({
        where: { id: cartItemId },
        include: [
          {
            model: Cart,
            as: "cart",
            where: { userId },
          },
          {
            model: Variant,
            as: "variant",
            required: false,
          },
        ],
      });

      if (!cartItem) {
        return res.status(404).json({
          success: false,
          message: "Cart item not found",
        });
      }

      // Cek stock jika ada variant
      if (cartItem.variant && cartItem.variant.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: `Only ${cartItem.variant.stock} items available in stock`,
        });
      }

      // Update quantity
      cartItem.quantity = quantity;
      await cartItem.save();

      // Fetch updated cart item dengan relasi
      const updatedCartItem = await CartItem.findByPk(cartItem.id, {
        include: [
          {
            model: Product,
            as: "product",
            attributes: ["id", "name"],
          },
          {
            model: Variant,
            as: "variant",
            attributes: ["id", "name", "price", "stock", "sku"],
            required: false,
          },
        ],
      });

      // Hitung jumlah stock di variant kalau sudah di update di cart
      if (cartItem.variant) {
        cartItem.variant.stock -= cartItem.quantity;
        await cartItem.variant.save();
      }

      res.json({
        success: true,
        message: "Cart item updated successfully",
        data: {
          cartItem: updatedCartItem,
        },
      });
    } catch (error) {
      console.error("Error updating cart item:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  // 4. Hapus item dari cart
  static async removeCartItem(req, res) {
    try {
      const userId = req.user.id;
      const { cartItemId } = req.params;

      // Cari cart item yang belong ke user
      const cartItem = await CartItem.findOne({
        where: { id: cartItemId },
        include: [
          {
            model: Cart,
            as: "cart",
            where: { userId },
          },
        ],
      });

      if (!cartItem) {
        return res.status(404).json({
          success: false,
          message: "Cart item not found",
        });
      }

      // Hapus cart item
      await cartItem.destroy();

      res.json({
        success: true,
        message: "Item removed from cart successfully",
      });
    } catch (error) {
      console.error("Error removing cart item:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  // 5. Clear semua items dari cart
  static async clearCart(req, res) {
    try {
      const userId = req.user.id;

      // Cari cart user
      const cart = await Cart.findOne({ where: { userId } });

      if (!cart) {
        return res.status(404).json({
          success: false,
          message: "Cart not found",
        });
      }

      // Hapus semua cart items
      await CartItem.destroy({
        where: { cartId: cart.id },
      });

      res.json({
        success: true,
        message: "Cart cleared successfully",
      });
    } catch (error) {
      console.error("Error clearing cart:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  // 6. Get cart item count (untuk badge di UI)
  static async getCartCount(req, res) {
    try {
      const userId = req.user.id;

      const cart = await Cart.findOne({
        where: { userId },
        include: [
          {
            model: CartItem,
            as: "items",
            attributes: ["quantity"],
          },
        ],
      });

      const totalItems = cart
        ? cart.items.reduce((sum, item) => sum + item.quantity, 0)
        : 0;

      res.json({
        success: true,
        data: {
          count: totalItems,
        },
      });
    } catch (error) {
      console.error("Error getting cart count:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }
}

module.exports = CartController;
