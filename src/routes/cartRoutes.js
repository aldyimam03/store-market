const express = require('express');
const router = express.Router();
const CartController = require("../controllers/cartController");
const authMiddleware = require('../middleware/auth'); 



router.use(authMiddleware);

router.get('/', CartController.getCart);
router.get('/count', CartController.getCartCount); // untuk badge UI
router.post('/', CartController.addToCart);

// PUT /api/cart/items/:cartItemId - Update quantity item di cart
router.put('/items/:cartItemId', CartController.updateCartItem);

// DELETE /api/cart/items/:cartItemId - Hapus item dari cart
router.delete('/items/:cartItemId', CartController.removeCartItem);

// DELETE /api/cart - Clear semua items dari cart
router.delete('/', CartController.clearCart);

module.exports = router;