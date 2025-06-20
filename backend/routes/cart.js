const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Cart = require('../models/Cart');

// Get cart
router.get('/', auth, async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id });
        
        if (!cart) {
            cart = new Cart({
                user: req.user.id,
                items: [],
                totalAmount: 0
            });
            await cart.save();
        }
        
        res.json(cart);
    } catch (err) {
        console.error('Error fetching cart:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add item to cart
router.post('/add', auth, async (req, res) => {
    try {
        const { productId, title, price, quantity, image, category } = req.body;
        
        let cart = await Cart.findOne({ user: req.user.id });
        
        if (!cart) {
            cart = new Cart({
                user: req.user.id,
                items: [],
                totalAmount: 0
            });
        }
        
        // Check if item already exists in cart
        const existingItemIndex = cart.items.findIndex(item => item.productId === productId);
        
        if (existingItemIndex > -1) {
            // Update quantity if item exists
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            // Add new item
            cart.items.push({
                productId,
                title,
                price,
                quantity,
                image,
                category
            });
        }
        
        // Calculate total amount
        cart.totalAmount = cart.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
        
        await cart.save();
        
        res.json(cart);
    } catch (err) {
        console.error('Error adding to cart:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update cart item quantity
router.put('/update/:productId', auth, async (req, res) => {
    try {
        const { quantity } = req.body;
        const { productId } = req.params;
        
        let cart = await Cart.findOne({ user: req.user.id });
        
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        
        // Find the item
        const itemIndex = cart.items.findIndex(item => item.productId === productId);
        
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }
        
        // Update quantity
        if (quantity <= 0) {
            // Remove item if quantity is 0 or negative
            cart.items.splice(itemIndex, 1);
        } else {
            cart.items[itemIndex].quantity = quantity;
        }
        
        // Recalculate total
        cart.totalAmount = cart.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
        
        await cart.save();
        
        res.json(cart);
    } catch (err) {
        console.error('Error updating cart:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Remove item from cart
router.delete('/remove/:productId', auth, async (req, res) => {
    try {
        const { productId } = req.params;
        
        let cart = await Cart.findOne({ user: req.user.id });
        
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        
        // Remove item
        cart.items = cart.items.filter(item => item.productId !== productId);
        
        // Recalculate total
        cart.totalAmount = cart.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
        
        await cart.save();
        
        res.json(cart);
    } catch (err) {
        console.error('Error removing from cart:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Clear cart
router.delete('/clear', auth, async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id });
        
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        
        cart.items = [];
        cart.totalAmount = 0;
        
        await cart.save();
        
        res.json({ message: 'Cart cleared successfully', cart });
    } catch (err) {
        console.error('Error clearing cart:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 