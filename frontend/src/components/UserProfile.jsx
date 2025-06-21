import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import ProfileInfo from './profile/ProfileInfo';
import OrderHistory from './profile/OrderHistory';
import SavedItems from './profile/SavedItems';
import AccountSettings from './profile/AccountSettings';

// Get API base URL from environment or default to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const UserProfile = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            fetchUserData();
        }
    }, [isAuthenticated]);

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!res.ok) {
                throw new Error('Failed to fetch user data');
            }

            const data = await res.json();
            setUserData(data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching user data:', err);
            setError('Failed to load profile data. Please try again.');
            setLoading(false);
        }
    };

    const tabs = [
        { id: 'profile', label: 'Profile Info' },
        { id: 'orders', label: 'Order History' },
        { id: 'saved', label: 'Saved Items' },
        { id: 'settings', label: 'Account Settings' }
    ];

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-500/20 text-red-400 p-4 rounded-md">
                    {error}
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-yellow-500/20 text-yellow-400 p-4 rounded-md">
                    Please log in to view your profile.
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-white mb-8">My Account</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Sidebar Navigation */}
                <div className="md:col-span-1">
                    <div className="bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center space-x-4 mb-6 p-2">
                            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                                <span className="text-xl font-bold text-white">
                                    {userData?.name ? userData.name.charAt(0).toUpperCase() : 'U'}
                                </span>
                            </div>
                            <div>
                                <h2 className="text-white font-medium">{userData?.name || 'User'}</h2>
                                <p className="text-gray-400 text-sm">{userData?.email || ''}</p>
                            </div>
                        </div>

                        <nav>
                            <ul className="space-y-2">
                                {tabs.map((tab) => (
                                    <li key={tab.id}>
                                        <motion.button
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 ${
                                                activeTab === tab.id
                                                    ? 'bg-purple-600 text-white'
                                                    : 'text-gray-300 hover:bg-gray-700'
                                            }`}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {tab.label}
                                        </motion.button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>

                {/* Content Area */}
                <div className="md:col-span-3">
                    <div className="bg-gray-800 rounded-lg p-6">
                        {activeTab === 'profile' && <ProfileInfo user={userData} />}
                        {activeTab === 'orders' && <OrderHistory />}
                        {activeTab === 'saved' && <SavedItems />}
                        {activeTab === 'settings' && <AccountSettings user={userData} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile; 