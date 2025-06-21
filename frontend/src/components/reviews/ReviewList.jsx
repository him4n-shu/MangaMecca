import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReviewItem from './ReviewItem';
import ReviewStats from './ReviewStats';
import ReviewForm from './ReviewForm';
import { useAuth } from '../../context/AuthContext';

// Get API base URL from environment or default to deployed backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://mangamecca.onrender.com';

const ReviewList = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [stats, setStats] = useState({
        averageRating: 0,
        reviewCount: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showReviewForm, setShowReviewForm] = useState(false);
    const { user, isAuthenticated } = useAuth();
    const [userHasReviewed, setUserHasReviewed] = useState(false);

    useEffect(() => {
        fetchReviews();
        fetchStats();
    }, [productId]);

    const fetchReviews = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/reviews/product/${productId}`);
            if (!res.ok) {
                throw new Error('Failed to fetch reviews');
            }
            const data = await res.json();
            setReviews(data);
            
            // Check if the current user has already reviewed this product
            if (isAuthenticated && user) {
                const hasReviewed = data.some(review => review.user._id === user.id);
                setUserHasReviewed(hasReviewed);
            }
            
            setLoading(false);
        } catch (err) {
            console.error('Error fetching reviews:', err);
            setError('Failed to load reviews. Please try again.');
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/reviews/product/${productId}/stats`);
            if (!res.ok) {
                throw new Error('Failed to fetch review statistics');
            }
            const data = await res.json();
            setStats(data);
        } catch (err) {
            console.error('Error fetching review statistics:', err);
        }
    };

    const handleAddReview = async (reviewData) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...reviewData,
                    productId
                })
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to add review');
            }

            const newReview = await res.json();
            
            // Update reviews and stats
            setReviews([newReview, ...reviews]);
            setUserHasReviewed(true);
            setShowReviewForm(false);
            fetchStats(); // Refresh statistics
        } catch (err) {
            console.error('Error adding review:', err);
            setError(err.message || 'Failed to add review. Please try again.');
        }
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/reviews/${reviewId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!res.ok) {
                throw new Error('Failed to delete review');
            }

            // Update reviews and stats
            setReviews(reviews.filter(review => review._id !== reviewId));
            setUserHasReviewed(false);
            fetchStats(); // Refresh statistics
        } catch (err) {
            console.error('Error deleting review:', err);
            setError('Failed to delete review. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">Customer Reviews</h2>
            
            <ReviewStats stats={stats} />
            
            {isAuthenticated && !userHasReviewed && !showReviewForm && (
                <div className="mt-6 mb-8">
                    <motion.button
                        onClick={() => setShowReviewForm(true)}
                        className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Write a Review
                    </motion.button>
                </div>
            )}
            
            {isAuthenticated && !userHasReviewed && showReviewForm && (
                <div className="mt-6 mb-8">
                    <ReviewForm 
                        onSubmit={handleAddReview} 
                        onCancel={() => setShowReviewForm(false)}
                    />
                </div>
            )}
            
            {error && (
                <div className="bg-red-500/20 text-red-400 p-4 rounded-md mb-4">
                    {error}
                </div>
            )}
            
            <div className="space-y-6">
                {reviews.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-400">No reviews yet. Be the first to review this product!</p>
                    </div>
                ) : (
                    reviews.map(review => (
                        <ReviewItem 
                            key={review._id} 
                            review={review} 
                            currentUserId={user?.id} 
                            onDelete={handleDeleteReview}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default ReviewList; 