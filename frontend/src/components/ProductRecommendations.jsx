import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import OptimizedImage from './common/OptimizedImage';

// Import all product data
import { mangaItems } from './MangaSection';
import { comicsItems } from './ComicsSection';
import { posterItems } from './PostersSection';
import { figureItems } from './ActionFiguresSection';
import { keychainItems } from './KeychainsSection';

const ProductRecommendations = ({ currentProductId = null, currentCategory = null, limit = 5 }) => {
  const { recentlyViewed } = useRecentlyViewed();
  const [recommendations, setRecommendations] = useState([]);
  
  useEffect(() => {
    // Combine all products
    const allProducts = [
      ...mangaItems.map(item => ({ ...item, category: 'manga' })),
      ...comicsItems.map(item => ({ ...item, category: 'comics' })),
      ...posterItems.map(item => ({ ...item, category: 'posters' })),
      ...figureItems.map(item => ({ ...item, category: 'action-figures' })),
      ...keychainItems.map(item => ({ ...item, category: 'keychains' }))
    ];
    
    // Generate recommendations based on browsing history
    const generateRecommendations = () => {
      // If no browsing history, return random products
      if (recentlyViewed.length === 0) {
        return getRandomProducts(allProducts, limit, currentProductId);
      }
      
      // Get categories and tags from recently viewed products
      const viewedCategories = new Set(recentlyViewed.map(product => product.category));
      
      // Filter products by categories the user has viewed
      let recommendedProducts = allProducts.filter(product => 
        viewedCategories.has(product.category) && 
        product.id !== parseInt(currentProductId, 10)
      );
      
      // If we don't have enough recommendations, add some random products
      if (recommendedProducts.length < limit) {
        const randomProducts = getRandomProducts(
          allProducts.filter(p => p.id !== parseInt(currentProductId, 10)), 
          limit - recommendedProducts.length,
          currentProductId
        );
        recommendedProducts = [...recommendedProducts, ...randomProducts];
      }
      
      // Prioritize products from the same category as the current product
      if (currentCategory) {
        recommendedProducts.sort((a, b) => {
          if (a.category === currentCategory && b.category !== currentCategory) return -1;
          if (a.category !== currentCategory && b.category === currentCategory) return 1;
          return 0;
        });
      }
      
      // Remove duplicates and limit to requested number
      const uniqueProducts = [...new Map(recommendedProducts.map(item => [item.id, item])).values()];
      return uniqueProducts.slice(0, limit);
    };
    
    setRecommendations(generateRecommendations());
  }, [recentlyViewed, currentProductId, currentCategory, limit]);
  
  // Helper function to get random products
  const getRandomProducts = (products, count, excludeId) => {
    const filtered = products.filter(p => p.id !== parseInt(excludeId, 10));
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  
  if (recommendations.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-white mb-6">Recommended For You</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {recommendations.map((product) => (
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

export default ProductRecommendations; 