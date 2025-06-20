import React from 'react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.salePrice * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-400">Add some products to your cart!</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-16 text-white">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      <ul className="divide-y divide-gray-700 mb-6">
        {cart.map(item => (
          <li key={item.id} className="flex items-center justify-between py-4">
            <div>
              <div className="font-semibold">{item.title}</div>
              <div className="text-gray-400 text-sm">${item.salePrice} each</div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="px-2 py-1 bg-gray-700 rounded">-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 bg-gray-700 rounded">+</button>
            </div>
            <div className="w-24 text-right">${(item.salePrice * item.quantity).toFixed(2)}</div>
            <button onClick={() => removeFromCart(item.id)} className="ml-4 text-red-400 hover:text-red-600">Remove</button>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mb-6">
        <span className="font-bold text-lg">Total:</span>
        <span className="text-xl">${total.toFixed(2)}</span>
      </div>
      <div className="flex gap-4">
        <button onClick={clearCart} className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">Clear Cart</button>
        <button className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 text-white font-bold">Checkout</button>
      </div>
    </div>
  );
};

export default CartPage; 