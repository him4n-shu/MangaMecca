import React from 'react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { 
    cart, 
    savedItems,
    removeFromCart, 
    updateQuantity, 
    getTotalPrice,
    saveForLater,
    moveToCart,
    removeFromSaved
  } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length > 0) {
      navigate('/checkout');
    }
  };

  if (cart.length === 0 && savedItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-white mb-4">Your Cart is Empty</h2>
        <p className="text-gray-400 mb-8">Add some items to your cart to see them here!</p>
        <Link
          to="/"
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-8">
          {cart.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">Cart Items ({cart.length})</h2>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-[#1a1a1a] rounded-lg p-4 flex items-center space-x-4"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-white">{item.title}</h3>
                    <p className="text-purple-400">Rs. {item.salePrice.toFixed(2)}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="text-gray-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className="text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-gray-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => saveForLater(item)}
                        className="text-purple-400 hover:text-purple-300"
                      >
                        Save for Later
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-white">
                      Rs. {(item.salePrice * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Saved Items */}
          {savedItems.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">Saved for Later ({savedItems.length})</h2>
              {savedItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-[#1a1a1a] rounded-lg p-4 flex items-center space-x-4"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-white">{item.title}</h3>
                    <p className="text-purple-400">Rs. {item.salePrice.toFixed(2)}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <button
                        onClick={() => moveToCart(item)}
                        className="text-purple-400 hover:text-purple-300"
                      >
                        Move to Cart
                      </button>
                      <button
                        onClick={() => removeFromSaved(item.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">
                      Saved on {new Date(item.savedAt).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary */}
        {cart.length > 0 && (
          <div className="lg:col-span-1">
            <div className="bg-[#1a1a1a] rounded-lg p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-white mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>Rs. {getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-purple-500/20 pt-4">
                  <div className="flex justify-between text-white font-semibold">
                    <span>Total</span>
                    <span>Rs. {getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <Link
                    to="/"
                    className="px-6 py-3 border border-gray-700 text-gray-400 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Continue Shopping
                  </Link>
                  <button
                    onClick={handleCheckout}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart; 