import React from 'react';

const StarRating = ({ rating, size = 'md', interactive = false, onChange }) => {
    const stars = [1, 2, 3, 4, 5];
    
    const getSizeClasses = () => {
        switch (size) {
            case 'sm':
                return 'w-4 h-4';
            case 'md':
                return 'w-5 h-5';
            case 'lg':
                return 'w-6 h-6';
            default:
                return 'w-5 h-5';
        }
    };
    
    const handleClick = (value) => {
        if (interactive && onChange) {
            onChange(value);
        }
    };
    
    return (
        <div className="flex">
            {stars.map((star) => (
                <Star 
                    key={star}
                    filled={star <= Math.round(rating)}
                    size={getSizeClasses()}
                    interactive={interactive}
                    onClick={() => handleClick(star)}
                />
            ))}
        </div>
    );
};

const Star = ({ filled, size, interactive, onClick }) => {
    return (
        <div 
            className={`${interactive ? 'cursor-pointer' : ''}`}
            onClick={onClick}
        >
            <svg 
                className={`${size} ${filled ? 'text-yellow-400' : 'text-gray-500'}`} 
                fill={filled ? 'currentColor' : 'none'} 
                stroke="currentColor" 
                viewBox="0 0 24 24"
            >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
            </svg>
        </div>
    );
};

export default StarRating; 