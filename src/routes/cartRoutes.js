const express = require('express');
const router = express.Router();
const CartController = require("../controllers/cartController");
const authMiddleware = require('../middleware/auth'); 



router.use(authMiddleware);

router.get('/', CartController.getCart);
router.get('/count', CartController.getCartCount); // untuk badge UI
router.post('/', CartController.addToCart);
router.put('/items/:cartItemId', CartController.updateCartItem);
router.delete('/items/:cartItemId', CartController.removeCartItem);
router.delete('/', CartController.clearCart);

module.exports = router;