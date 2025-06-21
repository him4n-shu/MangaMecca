import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import ProfileInfo from './ProfileInfo';
import OrderHistory from './OrderHistory';
import AccountSettings from './AccountSettings';
import SavedItems from './SavedItems';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  if (!user) {
    navigate('/login');
    return null;
  }

  const tabs = [
    { id: 'profile', label: 'Profile Info', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: 'orders', label: 'Order History', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
    { id: 'saved', label: 'Saved Items', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
    { id: 'settings', label: 'Account Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
  ];

  return (
    <div className="container-padding">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">My Account</h1>
      
      {/* Profile Navigation Tabs */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-2 md:space-x-4 min-w-max">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              to={`/profile/${tab.id === 'profile' ? '' : tab.id}`}
              className={`flex items-center px-3 py-2 md:px-4 md:py-3 rounded-lg transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <svg className="w-5 h-5 mr-1 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
              </svg>
              <span className="text-sm md:text-base">{tab.label}</span>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Profile Content */}
      <div className="bg-gray-900 rounded-lg p-4 md:p-6">
        <Routes>
          <Route path="/" element={<ProfileInfo />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/saved" element={<SavedItems />} />
          <Route path="/settings" element={<AccountSettings />} />
        </Routes>
      </div>
      
      {/* Logout Button */}
      <div className="mt-8 flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={logout}
          className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-red-500/20 transition-all duration-300"
        >
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </div>
        </motion.button>
      </div>
    </div>
  );
};

export default Profile; 