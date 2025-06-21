const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Configure nodemailer
const transporter = nodemailer.createTransport({
    // Replace with your email service configuration
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'himanshu7554@gmail.com',
        pass: process.env.EMAIL_PASS || 'yhwgjsuvopjhxokj'
    }
});

// Register a new user
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        user = new User({
            name,
            email,
            password
        });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Create and return JWT token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'mangamecca-secret',
            { expiresIn: '7d' },
            (err, token) => {
                if (err) throw err;
                res.json({ 
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
                });
            }
        );
    } catch (err) {
        console.error('Error in signup:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create and return JWT token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'mangamecca-secret',
            { expiresIn: '7d' },
            (err, token) => {
                if (err) throw err;
                res.json({ 
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        address: user.address
                    }
                });
            }
        );
    } catch (err) {
        console.error('Error in login:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Verify token and get user data
router.get('/verify', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error('Error verifying token:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Request password reset
router.post('/request-password-reset', async (req, res) => {
    try {
        const { email } = req.body;
        
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Create reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetExpires = Date.now() + 1 * 60 * 60 * 1000; // 1 hour
        
        // Update user with reset token
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetExpires;
        await user.save();
        
        // Send reset email
        const resetUrl = `${req.protocol}://${req.get('host')}/reset-password?token=${resetToken}`;
        
        await transporter.sendMail({
            to: email,
            subject: 'MangaMecca - Password Reset',
            html: `
                <h1>Password Reset</h1>
                <p>You requested a password reset. Click the link below to reset your password:</p>
                <a href="${resetUrl}">${resetUrl}</a>
                <p>This link will expire in 1 hour.</p>
                <p>If you didn't request this, please ignore this email.</p>
            `
        });
        
        res.json({ message: 'Password reset email sent' });
    } catch (err) {
        console.error('Error requesting password reset:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Reset password with token
router.post('/reset-password', async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        
        // Find user with matching reset token
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });
        
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }
        
        // Update password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        
        await user.save();
        
        res.json({ message: 'Password reset successful' });
    } catch (err) {
        console.error('Error resetting password:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete account
router.delete('/delete-account', auth, async (req, res) => {
    try {
        const { password } = req.body;
        
        // Get user
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Verify current password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        
        // Delete user
        await User.findByIdAndDelete(req.user.id);
        
        res.json({ message: 'Account deleted successfully' });
    } catch (err) {
        console.error('Error deleting account:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update password
router.put('/update-password', auth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        
        // Get user
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }
        
        // Update password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        
        await user.save();
        
        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error('Error updating password:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
    try {
        const { name, phone, address } = req.body;
        
        // Update user profile
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { 
                name,
                phone,
                address
            },
            { new: true }
        ).select('-password');
        
        res.json(user);
    } catch (err) {
        console.error('Error updating profile:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 