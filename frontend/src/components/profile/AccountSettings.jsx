import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AccountSettings = ({ user }) => {
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        
        // Validate passwords
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage({ text: 'New passwords do not match', type: 'error' });
            return;
        }

        if (passwordData.newPassword.length < 6) {
            setMessage({ text: 'Password must be at least 6 characters', type: 'error' });
            return;
        }

        setLoading(true);
        setMessage({ text: '', type: '' });

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/auth/change-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword
                })
            });

            const data = await res.json();
            
            if (res.ok) {
                setMessage({ text: 'Password updated successfully!', type: 'success' });
                setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
            } else {
                setMessage({ text: data.message || 'Failed to update password', type: 'error' });
            }
        } catch (err) {
            setMessage({ text: 'An error occurred. Please try again.', type: 'error' });
            console.error('Error updating password:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        setLoading(true);
        
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/auth/delete-account', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                logout();
                navigate('/');
            } else {
                const data = await res.json();
                setMessage({ text: data.message || 'Failed to delete account', type: 'error' });
                setShowDeleteConfirm(false);
            }
        } catch (err) {
            setMessage({ text: 'An error occurred. Please try again.', type: 'error' });
            console.error('Error deleting account:', err);
            setShowDeleteConfirm(false);
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>

            {message.text && (
                <div className={`p-4 rounded-md mb-6 ${message.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {message.text}
                </div>
            )}

            <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Change Password</h3>
                <form onSubmit={handlePasswordChange}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-400 mb-2">Current Password</label>
                            <input
                                type="password"
                                name="currentPassword"
                                value={passwordData.currentPassword}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-800 text-white border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2">New Password</label>
                            <input
                                type="password"
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handleChange}
                                required
                                minLength={6}
                                className="w-full bg-gray-800 text-white border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2">Confirm New Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={passwordData.confirmPassword}
                                onChange={handleChange}
                                required
                                minLength={6}
                                className="w-full bg-gray-800 text-white border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <motion.button
                            type="submit"
                            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update Password'}
                        </motion.button>
                    </div>
                </form>
            </div>

            <div className="border-t border-gray-700 pt-8">
                <h3 className="text-xl font-semibold text-white mb-4">Danger Zone</h3>
                <p className="text-gray-400 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                </p>

                {!showDeleteConfirm ? (
                    <motion.button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Delete Account
                    </motion.button>
                ) : (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-md p-4">
                        <p className="text-white mb-4">Are you sure you want to delete your account? This action cannot be undone.</p>
                        <div className="flex space-x-4">
                            <motion.button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="px-6 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-800 transition-colors duration-200"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={loading}
                            >
                                Cancel
                            </motion.button>
                            <motion.button
                                onClick={handleDeleteAccount}
                                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={loading}
                            >
                                {loading ? 'Deleting...' : 'Yes, Delete My Account'}
                            </motion.button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountSettings; 