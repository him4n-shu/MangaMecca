import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import OptimizedImage from './common/OptimizedImage';
import Breadcrumb from './common/Breadcrumb';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, loading, error } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-white mb-6">Error Loading Wishlist</h1>
        <p className="text-gray-400 mb-8">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <Breadcrumb 
        items={[
          { label: 'Home', path: '/' },
          { label: 'Wishlist', path: '/wishlist' }
        ]} 
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Your Wishlist</h1>
        <p className="text-gray-400">
          {wishlist.length === 0 
            ? 'Your wishlist is empty. Browse our products and add items to your wishlist!' 
            : `You have ${wishlist.length} item${wishlist.length === 1 ? '' : 's'} in your wishlist.`}
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-16 bg-gray-900/50 rounded-lg">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h2 className="text-xl font-semibold text-white mb-2">Your wishlist is empty</h2>
          <p className="text-gray-400 mb-6">Discover products and add them to your wishlist</p>
          <Link 
            to="/categories" 
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg"
          >
            Browse Categories
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-gray-900/50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Link to={`/${item.category}/${item.id}`} className="block relative">
                <div className="aspect-w-3 aspect-h-4 w-full">
                  <OptimizedImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full"
                  />
                </div>
                <div className="absolute top-2 right-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeFromWishlist(item.id);
                    }}
                    className="p-2 bg-gray-900/80 rounded-full hover:bg-red-500 transition-colors duration-200"
                    aria-label="Remove from wishlist"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </svg>
                  </button>
                </div>
              </Link>
              <div className="p-4">
                <Link to={`/${item.category}/${item.id}`} className="block">
                  <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{item.title}</h3>
                </Link>
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <span className="text-lg font-bold text-white">${item.salePrice}</span>
                    {item.originalPrice && item.originalPrice > item.salePrice && (
                      <span className="text-sm text-gray-400 line-through ml-2">${item.originalPrice}</span>
                    )}
                  </div>
                  {item.rating && (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm text-gray-400 ml-1">{item.rating}</span>
                    </div>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(item);
                    }}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity duration-200 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist; 