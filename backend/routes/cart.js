import express from 'express';
import Cart from '../models/Cart.js';
import { auth } from './auth.js';

const router = express.Router();

// Get user's cart
router.get('/', auth, async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            cart = new Cart({ user: req.user._id, items: [], savedItems: [] });
            await cart.save();
        }
        res.json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update cart
router.put('/', auth, async (req, res) => {
    try {
        const { items, savedItems } = req.body;
        let cart = await Cart.findOne({ user: req.user._id });
        
        if (!cart) {
            cart = new Cart({ user: req.user._id });
        }
        
        cart.items = items;
        cart.savedItems = savedItems;
        await cart.save();
        
        res.json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Clear cart
router.delete('/', auth, async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id });
        if (cart) {
            cart.items = [];
            cart.savedItems = [];
            await cart.save();
        }
        res.json({ message: 'Cart cleared' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router; 