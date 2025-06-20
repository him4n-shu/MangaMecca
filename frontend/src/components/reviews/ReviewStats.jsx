import React from 'react';
import StarRating from './StarRating';

const ReviewStats = ({ stats }) => {
    const { averageRating, reviewCount, ratingDistribution } = stats;
    
    // Find the maximum count to calculate percentage widths
    const maxCount = Math.max(...Object.values(ratingDistribution));
    
    return (
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center">
                <div className="flex flex-col items-center mr-6 pb-4 md:pb-0 md:border-r md:border-gray-700 md:pr-6">
                    <div className="text-3xl font-bold text-white mb-1">{averageRating.toFixed(1)}</div>
                    <StarRating rating={averageRating} size="md" />
                    <div className="text-sm text-gray-400 mt-2">{reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}</div>
                </div>
                
                <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map(rating => (
                        <div key={rating} className="flex items-center">
                            <div className="w-12 text-sm text-gray-400">{rating} star</div>
                            <div className="flex-1 h-2 bg-gray-700 rounded-full mx-2">
                                <div 
                                    className={`h-2 rounded-full ${getRatingColor(rating)}`}
                                    style={{ 
                                        width: maxCount > 0 ? `${(ratingDistribution[rating] / maxCount) * 100}%` : '0%'
                                    }}
                                ></div>
                            </div>
                            <div className="w-8 text-right text-sm text-gray-400">
                                {ratingDistribution[rating]}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Helper function to get color based on rating
const getRatingColor = (rating) => {
    switch (rating) {
        case 5:
            return 'bg-green-500';
        case 4:
            return 'bg-green-400';
        case 3:
            return 'bg-yellow-500';
        case 2:
            return 'bg-orange-500';
        case 1:
            return 'bg-red-500';
        default:
            return 'bg-gray-500';
    }
};

export default ReviewStats; 