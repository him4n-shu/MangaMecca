import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

// Get API base URL from environment or default to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const SavedItems = () => {
    const [savedItems, setSavedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { addToCart } = useCart();
    const [buttonStates, setButtonStates] = useState({});

    useEffect(() => {
        fetchSavedItems();
    }, []);

    const fetchSavedItems = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!res.ok) {
                throw new Error('Failed to fetch saved items');
            }

            const userData = await res.json();
            
            if (userData.savedItems && userData.savedItems.length > 0) {
                // Fetch details for each saved item
                const itemDetailsPromises = userData.savedItems.map(async (itemId) => {
                    try {
                        const itemRes = await fetch(`${API_BASE_URL}/api/products/${itemId}`, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });
                        
                        if (itemRes.ok) {
                            return await itemRes.json();
                        }
                        return null;
                    } catch (err) {
                        console.error(`Error fetching item ${itemId}:`, err);
                        return null;
                    }
                });
                
                const itemsDetails = await Promise.all(itemDetailsPromises);
                const validItems = itemsDetails.filter(item => item !== null);
                setSavedItems(validItems);
            } else {
                setSavedItems([]);
            }
            
            setLoading(false);
        } catch (err) {
            console.error('Error fetching saved items:', err);
            setError('Failed to load saved items. Please try again.');
            setLoading(false);
        }
    };

    const handleRemoveItem = async (itemId) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/profile/saved-items/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!res.ok) {
                throw new Error('Failed to remove item');
            }

            setSavedItems(prevItems => prevItems.filter(item => item.id !== itemId));
        } catch (err) {
            console.error('Error removing saved item:', err);
            setError('Failed to remove item. Please try again.');
        }
    };

    const handleAddToCart = (item) => {
        addToCart(item);
        setButtonStates(prev => ({
            ...prev,
            [item.id]: 'Added!'
        }));
        setTimeout(() => {
            setButtonStates(prev => ({ ...prev, [item.id]: undefined }));
        }, 1000);
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

    if (savedItems.length === 0) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-white mb-4">No Saved Items</h2>
                <p className="text-gray-400 mb-6">You haven't saved any items yet.</p>
                <Link to="/categories">
                    <motion.button
                        className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Browse Products
                    </motion.button>
                </Link>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-6">Saved Items</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedItems.map((item) => (
                    <motion.div
                        key={item.id}
                        className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ y: -5 }}
                    >
                        <Link to={`/${item.category}/${item.id}`} className="block">
                            <div className="relative">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-48 object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-white font-medium mb-2">{item.title}</h3>
                                <div className="flex items-center space-x-2 mb-4">
                                    <p className="text-gray-400 line-through">Rs. {item.regularPrice.toFixed(2)}</p>
                                    <p className="text-white font-semibold">Rs. {item.salePrice.toFixed(2)}</p>
                                </div>
                            </div>
                        </Link>
                        <div className="p-4 pt-0 flex space-x-2">
                            <motion.button
                                onClick={() => handleAddToCart(item)}
                                className="flex-1 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {buttonStates[item.id] || 'Add to Cart'}
                            </motion.button>
                            <motion.button
                                onClick={() => handleRemoveItem(item.id)}
                                className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-200"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default SavedItems; 