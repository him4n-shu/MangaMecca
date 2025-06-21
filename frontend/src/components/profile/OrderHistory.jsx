import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Get API base URL from environment or default to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [expandedOrder, setExpandedOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/profile/orders`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!res.ok) {
                throw new Error('Failed to fetch orders');
            }

            const data = await res.json();
            setOrders(data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError('Failed to load order history. Please try again.');
            setLoading(false);
        }
    };

    const toggleOrderDetails = (orderId) => {
        if (expandedOrder === orderId) {
            setExpandedOrder(null);
        } else {
            setExpandedOrder(orderId);
        }
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'processing':
                return 'bg-yellow-500/20 text-yellow-400';
            case 'shipped':
                return 'bg-blue-500/20 text-blue-400';
            case 'delivered':
                return 'bg-green-500/20 text-green-400';
            case 'cancelled':
                return 'bg-red-500/20 text-red-400';
            default:
                return 'bg-gray-500/20 text-gray-400';
        }
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
            <div className="bg-red-500/20 text-red-400 p-4 rounded-md">
                {error}
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-white mb-4">No Orders Yet</h2>
                <p className="text-gray-400 mb-6">You haven't placed any orders yet.</p>
                <Link to="/categories">
                    <motion.button
                        className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Start Shopping
                    </motion.button>
                </Link>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-6">Order History</h2>

            <div className="space-y-6">
                {orders.map((order) => (
                    <motion.div
                        key={order._id}
                        className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div 
                            className="p-4 cursor-pointer flex justify-between items-center"
                            onClick={() => toggleOrderDetails(order._id)}
                        >
                            <div>
                                <p className="text-sm text-gray-400">Order #{order._id.substring(order._id.length - 8)}</p>
                                <p className="text-white font-medium">
                                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(order.orderStatus)}`}>
                                    {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                                </span>
                                <span className="text-white font-semibold">Rs. {order.totalAmount.toFixed(2)}</span>
                                <svg
                                    className={`w-5 h-5 text-gray-400 transition-transform ${expandedOrder === order._id ? 'transform rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>

                        {expandedOrder === order._id && (
                            <div className="p-4 border-t border-gray-700">
                                <h3 className="text-lg font-medium text-white mb-4">Order Items</h3>
                                <div className="space-y-4">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex items-center space-x-4">
                                            <div className="w-16 h-16 flex-shrink-0">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover rounded"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-white font-medium">{item.title}</p>
                                                <div className="flex justify-between mt-1">
                                                    <p className="text-gray-400">Qty: {item.quantity}</p>
                                                    <p className="text-white">Rs. {item.price.toFixed(2)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-700">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-400">Shipping Address</span>
                                        <span className="text-white">
                                            {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}, {order.shippingAddress.country}
                                        </span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-400">Payment Method</span>
                                        <span className="text-white">{order.paymentMethod}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-400">Payment Status</span>
                                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                                            order.paymentStatus === 'completed' ? 'bg-green-500/20 text-green-400' : 
                                            order.paymentStatus === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 
                                            'bg-red-500/20 text-red-400'
                                        }`}>
                                            {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between mt-4 pt-4 border-t border-gray-700">
                                        <span className="text-lg font-medium text-white">Total</span>
                                        <span className="text-lg font-bold text-white">Rs. {order.totalAmount.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistory; 