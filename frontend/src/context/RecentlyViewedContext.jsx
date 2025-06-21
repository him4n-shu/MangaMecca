import React, { createContext, useContext, useState, useEffect } from 'react';

const RecentlyViewedContext = createContext();

export const useRecentlyViewed = () => useContext(RecentlyViewedContext);

export const RecentlyViewedProvider = ({ children }) => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const MAX_ITEMS = 10; // Maximum number of items to store

  // Load recently viewed products from localStorage on mount
  useEffect(() => {
    const storedItems = localStorage.getItem('recentlyViewed');
    if (storedItems) {
      try {
        setRecentlyViewed(JSON.parse(storedItems));
      } catch (error) {
        console.error('Error parsing recently viewed items:', error);
        localStorage.removeItem('recentlyViewed');
      }
    }
  }, []);

  // Save to localStorage whenever the list changes
  useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  // Add a product to recently viewed
  const addToRecentlyViewed = (product) => {
    if (!product) return;
    
    setRecentlyViewed(prev => {
      // Remove the product if it already exists (to move it to the front)
      const filtered = prev.filter(item => item.id !== product.id);
      
      // Add the product to the front of the array
      const updated = [product, ...filtered];
      
      // Limit the array to MAX_ITEMS
      return updated.slice(0, MAX_ITEMS);
    });
  };

  // Clear recently viewed products
  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
    localStorage.removeItem('recentlyViewed');
  };

  return (
    <RecentlyViewedContext.Provider value={{
      recentlyViewed,
      addToRecentlyViewed,
      clearRecentlyViewed
    }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}; 