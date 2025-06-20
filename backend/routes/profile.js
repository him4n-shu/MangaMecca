const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Order = require('../models/Order');

// Get user profile
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error('Error fetching user profile:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update user profile
router.put('/', auth, async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;
        
        // Build profile object
        const profileFields = {};
        if (name) profileFields.name = name;
        if (email) profileFields.email = email;
        if (phone) profileFields.phone = phone;
        if (address) profileFields.address = address;
        
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: profileFields },
            { new: true }
        ).select('-password');
        
        res.json(user);
    } catch (err) {
        console.error('Error updating user profile:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get user orders
router.get('/orders', auth, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error('Error fetching user orders:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add item to saved items
router.post('/saved-items/:itemId', auth, async (req, res) => {
    try {
        const itemId = req.params.itemId;
        
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Check if item is already saved
        if (user.savedItems.includes(itemId)) {
            return res.status(400).json({ message: 'Item already saved' });
        }
        
        user.savedItems.push(itemId);
        await user.save();
        
        res.json({ message: 'Item saved successfully', savedItems: user.savedItems });
    } catch (err) {
        console.error('Error adding saved item:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Remove item from saved items
router.delete('/saved-items/:itemId', auth, async (req, res) => {
    try {
        const itemId = req.params.itemId;
        
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Filter out the item to remove
        user.savedItems = user.savedItems.filter(item => item !== itemId);
        await user.save();
        
        res.json({ message: 'Item removed successfully', savedItems: user.savedItems });
    } catch (err) {
        console.error('Error removing saved item:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 