import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

// Get API base URL from environment or default to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load wishlist from database when component mounts or user changes
  useEffect(() => {
    const loadWishlist = async () => {
      setLoading(true);
      setError(null);
      
      try {
        if (user) {
          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error('No authentication token found');
          }

          const response = await fetch(`${API_BASE_URL}/api/profile/wishlist`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (!response.ok) {
            throw new Error(`Failed to load wishlist: ${response.statusText}`);
          }

          const data = await response.json();
          setWishlist(data.wishlist || []);
        } else {
          // For non-logged in users, use localStorage
          const savedWishlist = localStorage.getItem('wishlist');
          if (savedWishlist) {
            setWishlist(JSON.parse(savedWishlist));
          } else {
            setWishlist([]);
          }
        }
      } catch (err) {
        console.error('Error loading wishlist:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, [user]);

  // Save wishlist to database whenever it changes
  useEffect(() => {
    const saveWishlist = async () => {
      if (loading) return; // Don't save while initial loading

      try {
        if (user) {
          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error('No authentication token found');
          }

          const response = await fetch(`${API_BASE_URL}/api/profile/wishlist`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ wishlist })
          });

          if (!response.ok) {
            throw new Error(`Failed to save wishlist: ${response.statusText}`);
          }

          const data = await response.json();
        } else {
          // For non-logged in users, use localStorage
          localStorage.setItem('wishlist', JSON.stringify(wishlist));
        }
      } catch (err) {
        console.error('Error saving wishlist:', err);
        setError(err.message);
      }
    };

    saveWishlist();
  }, [wishlist, user, loading]);

  const addToWishlist = async (product) => {
    try {
      if (user) {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_BASE_URL}/api/profile/wishlist`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ productId: product.id })
        });

        if (!response.ok) {
          throw new Error(`Failed to add to wishlist: ${response.statusText}`);
        }
      }
      
      if (!wishlist.find(item => item.id === product.id)) {
        setWishlist(prev => [...prev, product]);
      }
    } catch (err) {
      console.error('Error adding to wishlist:', err);
      setError(err.message);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      if (user) {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_BASE_URL}/api/profile/wishlist/${productId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to remove from wishlist: ${response.statusText}`);
        }
      }
      
      setWishlist(prev => prev.filter(item => item.id !== productId));
      localStorage.removeItem('wishlist');
    } catch (err) {
      console.error('Error removing from wishlist:', err);
      setError(err.message);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const clearWishlist = async () => {
    try {
      if (user) {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_BASE_URL}/api/profile/wishlist`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to clear wishlist: ${response.statusText}`);
        }
      }
      setWishlist([]);
      localStorage.removeItem('wishlist');
    } catch (err) {
      console.error('Error clearing wishlist:', err);
      setError(err.message);
    }
  };

  return (
    <WishlistContext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist,
      loading,
      error
    }}>
      {children}
    </WishlistContext.Provider>
  );
}; 