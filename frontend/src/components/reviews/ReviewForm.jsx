import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ReviewForm = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        rating: 5,
        title: '',
        comment: ''
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'rating' ? parseInt(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate form
        if (!formData.title.trim()) {
            setError('Please provide a review title');
            return;
        }
        
        if (!formData.comment.trim()) {
            setError('Please provide review comments');
            return;
        }
        
        setIsSubmitting(true);
        setError('');
        
        try {
            await onSubmit(formData);
        } catch (err) {
            setError(err.message || 'Failed to submit review');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Write Your Review</h3>
            
            {error && (
                <div className="bg-red-500/20 text-red-400 p-3 rounded-md mb-4">
                    {error}
                </div>
            )}
            
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Rating</label>
                    <div className="flex space-x-4">
                        {[1, 2, 3, 4, 5].map(rating => (
                            <label key={rating} className="flex items-center">
                                <input
                                    type="radio"
                                    name="rating"
                                    value={rating}
                                    checked={formData.rating === rating}
                                    onChange={handleChange}
                                    className="hidden"
                                />
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                                    formData.rating === rating 
                                        ? 'bg-purple-600 text-white' 
                                        : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                                }`}>
                                    {rating}
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
                
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-300 mb-2">
                        Review Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Summarize your experience"
                        maxLength={100}
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />
                </div>
                
                <div className="mb-4">
                    <label htmlFor="comment" className="block text-gray-300 mb-2">
                        Review Comments
                    </label>
                    <textarea
                        id="comment"
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                        placeholder="Share your experience with this product"
                        rows={5}
                        maxLength={1000}
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />
                    <p className="text-xs text-gray-400 mt-1">
                        {formData.comment.length}/1000 characters
                    </p>
                </div>
                
                <div className="flex justify-end space-x-3">
                    <motion.button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </motion.button>
                    <motion.button
                        type="submit"
                        className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </motion.button>
                </div>
            </form>
        </div>
    );
};

export default ReviewForm; 