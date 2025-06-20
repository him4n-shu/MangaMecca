import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [animation, setAnimation] = useState({ isVisible: false, position: { x: 0, y: 0 } });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load cart from database when component mounts or user changes
  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      setError(null);
      
      try {
        if (user) {
          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error('No authentication token found');
          }

          console.log('Loading cart for user:', user._id);
          const response = await fetch('/api/cart', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (!response.ok) {
            throw new Error(`Failed to load cart: ${response.statusText}`);
          }

          const data = await response.json();
          console.log('Cart data loaded:', data);
          
          setCart(data.items || []);
          setSavedItems(data.savedItems || []);
        } else {
          // For non-logged in users, use localStorage
          const savedCart = localStorage.getItem('cart');
          const savedForLater = localStorage.getItem('savedItems');
          if (savedCart) {
            setCart(JSON.parse(savedCart));
          }
          if (savedForLater) {
            setSavedItems(JSON.parse(savedForLater));
          }
        }
      } catch (err) {
        console.error('Error loading cart:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [user]);

  // Save cart to database whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      if (loading) return; // Don't save while initial loading

      try {
        if (user) {
          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error('No authentication token found');
          }

          console.log('Saving cart for user:', user._id);
          const response = await fetch('/api/cart', {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ items: cart, savedItems })
          });

          if (!response.ok) {
            throw new Error(`Failed to save cart: ${response.statusText}`);
          }

          const data = await response.json();
          console.log('Cart saved successfully:', data);
        } else {
          // For non-logged in users, use localStorage
          localStorage.setItem('cart', JSON.stringify(cart));
          localStorage.setItem('savedItems', JSON.stringify(savedItems));
        }
      } catch (err) {
        console.error('Error saving cart:', err);
        setError(err.message);
      }
    };

    saveCart();
  }, [cart, savedItems, user, loading]);

  const addToCart = (item, event) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      let newCart;
      
      if (existingItem) {
        newCart = prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        newCart = [...prevCart, { ...item, quantity: 1 }];
      }

      // Show animation if event is provided
      if (event && event.target) {
        const rect = event.target.getBoundingClientRect();
        setAnimation({
          isVisible: true,
          position: { x: rect.left, y: rect.top }
        });

        setTimeout(() => {
          setAnimation({ isVisible: false, position: { x: 0, y: 0 } });
        }, 1000);
      }

      return newCart;
    });

    // Remove from saved items if it was there
    setSavedItems(prevSaved => prevSaved.filter(savedItem => savedItem.id !== item.id));
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity < 1) return;
    setCart(prevCart => prevCart.map(item =>
      item.id === itemId
        ? { ...item, quantity }
        : item
    ));
  };

  const saveForLater = (item) => {
    setSavedItems(prevSaved => [...prevSaved, { ...item, savedAt: new Date().toISOString() }]);
    removeFromCart(item.id);
  };

  const moveToCart = (item) => {
    addToCart(item);
    setSavedItems(prevSaved => prevSaved.filter(savedItem => savedItem.id !== item.id));
  };

  const removeFromSaved = (itemId) => {
    setSavedItems(prevSaved => prevSaved.filter(item => item.id !== itemId));
  };

  const clearCart = async () => {
    try {
      if (user) {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        console.log('Clearing cart for user:', user._id);
        const response = await fetch('/api/cart', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to clear cart: ${response.statusText}`);
        }

        console.log('Cart cleared successfully');
      }
      setCart([]);
      setSavedItems([]);
    } catch (err) {
      console.error('Error clearing cart:', err);
      setError(err.message);
    }
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.salePrice * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      savedItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      saveForLater,
      moveToCart,
      removeFromSaved,
      clearCart,
      getTotalItems,
      getTotalPrice,
      animation,
      loading,
      error
    }}>
      {children}
    </CartContext.Provider>
  );
}; 