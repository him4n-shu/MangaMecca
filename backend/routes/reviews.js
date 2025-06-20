const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Review = require('../models/Review');
const User = require('../models/User');

// Get all reviews for a product
router.get('/product/:productId', async (req, res) => {
    try {
        const reviews = await Review.find({ productId: req.params.productId })
            .sort({ createdAt: -1 })
            .populate('user', 'name');

        res.json(reviews);
    } catch (err) {
        console.error('Error fetching reviews:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get review statistics for a product (average rating and count)
router.get('/product/:productId/stats', async (req, res) => {
    try {
        const stats = await Review.aggregate([
            { $match: { productId: req.params.productId } },
            { 
                $group: { 
                    _id: null,
                    averageRating: { $avg: '$rating' },
                    reviewCount: { $sum: 1 },
                    ratings: {
                        $push: '$rating'
                    }
                } 
            }
        ]);

        if (stats.length === 0) {
            return res.json({
                averageRating: 0,
                reviewCount: 0,
                ratingDistribution: {
                    1: 0, 2: 0, 3: 0, 4: 0, 5: 0
                }
            });
        }

        // Calculate rating distribution
        const ratingDistribution = {
            1: 0, 2: 0, 3: 0, 4: 0, 5: 0
        };

        stats[0].ratings.forEach(rating => {
            ratingDistribution[rating] += 1;
        });

        res.json({
            averageRating: parseFloat(stats[0].averageRating.toFixed(1)),
            reviewCount: stats[0].reviewCount,
            ratingDistribution
        });
    } catch (err) {
        console.error('Error fetching review stats:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all reviews by a user
router.get('/user', auth, async (req, res) => {
    try {
        const reviews = await Review.find({ user: req.user.id })
            .sort({ createdAt: -1 });

        res.json(reviews);
    } catch (err) {
        console.error('Error fetching user reviews:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new review
router.post('/', auth, async (req, res) => {
    try {
        const { productId, rating, title, comment } = req.body;

        // Check if user already reviewed this product
        const existingReview = await Review.findOne({
            user: req.user.id,
            productId
        });

        if (existingReview) {
            return res.status(400).json({ message: 'You have already reviewed this product' });
        }

        const review = new Review({
            user: req.user.id,
            productId,
            rating,
            title,
            comment
        });

        await review.save();

        // Populate user info before sending response
        const populatedReview = await Review.findById(review._id).populate('user', 'name');

        res.status(201).json(populatedReview);
    } catch (err) {
        console.error('Error creating review:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a review
router.put('/:id', auth, async (req, res) => {
    try {
        const { rating, title, comment } = req.body;
        
        // Find review and check ownership
        const review = await Review.findById(req.params.id);
        
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        
        // Check if the review belongs to the user
        if (review.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized to update this review' });
        }
        
        // Update fields
        review.rating = rating;
        review.title = title;
        review.comment = comment;
        review.updatedAt = Date.now();
        
        await review.save();
        
        res.json(review);
    } catch (err) {
        console.error('Error updating review:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a review
router.delete('/:id', auth, async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        
        // Check if the review belongs to the user
        if (review.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized to delete this review' });
        }
        
        await Review.findByIdAndDelete(req.params.id);
        
        res.json({ message: 'Review deleted successfully' });
    } catch (err) {
        console.error('Error deleting review:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 