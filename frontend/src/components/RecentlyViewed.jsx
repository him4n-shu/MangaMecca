import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import OptimizedImage from './common/OptimizedImage';

const RecentlyViewed = ({ excludeProductId = null }) => {
  const { recentlyViewed, clearRecentlyViewed } = useRecentlyViewed();
  
  // Filter out the current product if excludeProductId is provided
  const filteredProducts = excludeProductId 
    ? recentlyViewed.filter(product => product.id !== parseInt(excludeProductId, 10))
    : recentlyViewed;
  
  // If no products to show, return null
  if (filteredProducts.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Recently Viewed</h2>
        {filteredProducts.length > 1 && (
          <button 
            onClick={clearRecentlyViewed}
            className="text-sm text-purple-400 hover:text-purple-300"
          >
            Clear All
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredProducts.slice(0, 5).map((product) => (
          <motion.div
            key={product.id}
            className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
            whileHover={{ y: -5 }}
          >
            <Link to={`/${product.category}/${product.id}`} className="block">
              <div className="aspect-w-3 aspect-h-4 w-full">
                <OptimizedImage
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full"
                  objectFit="cover"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
              </div>
              <div className="p-4">
                <h3 className="text-white font-medium truncate">{product.title}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  {product.regularPrice > product.salePrice && (
                    <p className="text-gray-400 line-through text-sm">Rs. {product.regularPrice.toFixed(2)}</p>
                  )}
                  <p className="text-white font-semibold">Rs. {product.salePrice.toFixed(2)}</p>
                </div>
                {product.rating && (
                  <div className="flex items-center mt-1">
                    <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm text-gray-400 ml-1">{product.rating}</span>
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed; 