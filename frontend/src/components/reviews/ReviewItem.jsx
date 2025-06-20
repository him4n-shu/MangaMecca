import React from 'react';
import { motion } from 'framer-motion';
import StarRating from './StarRating';

const ReviewItem = ({ review, currentUserId, onDelete }) => {
    const isOwner = currentUserId === review.user._id;
    const formattedDate = new Date(review.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <motion.div
            className="bg-gray-800 rounded-lg p-4 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center space-x-2">
                        <StarRating rating={review.rating} size="sm" />
                        <h3 className="text-lg font-semibold text-white">{review.title}</h3>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                        By {review.user.name} on {formattedDate}
                    </p>
                </div>
                
                {isOwner && (
                    <motion.button
                        onClick={() => onDelete(review._id)}
                        className="text-gray-400 hover:text-red-400 transition-colors duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </motion.button>
                )}
            </div>
            
            <div className="mt-3">
                <p className="text-gray-300 whitespace-pre-line">{review.comment}</p>
            </div>
            
            {review.updatedAt !== review.createdAt && (
                <p className="text-xs text-gray-500 mt-2 italic">
                    (Edited on {new Date(review.updatedAt).toLocaleDateString()})
                </p>
            )}
        </motion.div>
    );
};

export default ReviewItem; 