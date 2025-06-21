import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PasswordResetPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState('request'); // 'request' or 'reset'
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { requestPasswordReset, resetPassword } = useAuth();

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsSubmitting(true);

    try {
      const result = await requestPasswordReset(email);
      if (result.success) {
        setMessage(result.message || 'Password reset email sent. Please check your inbox.');
      } else {
        setError(result.message || 'Failed to request password reset');
      }
    } catch (err) {
      setError('An error occurred while requesting password reset');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await resetPassword(token, newPassword);
      if (result.success) {
        setMessage(result.message || 'Password reset successful. You can now log in with your new password.');
      } else {
        setError(result.message || 'Failed to reset password');
      }
    } catch (err) {
      setError('An error occurred while resetting password');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Parse token from URL if present
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const resetToken = queryParams.get('token');
    if (resetToken) {
      setToken(resetToken);
      setStep('reset');
    }
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 opacity-80"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="none">
          <defs>
            <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff6b6b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#4ecdc4" stopOpacity="0.4" />
            </radialGradient>
          </defs>
          
          {/* Manga-style elements */}
          <circle cx="100" cy="100" r="80" fill="url(#grad1)">
            <animate attributeName="cy" values="100;120;100" dur="10s" repeatCount="indefinite" />
          </circle>
          
          <circle cx="700" cy="200" r="120" fill="url(#grad1)">
            <animate attributeName="cy" values="200;170;200" dur="12s" repeatCount="indefinite" />
          </circle>
          
          <path d="M0,400 Q200,350 400,400 T800,400" stroke="#fff" strokeWidth="2" fill="none">
            <animate attributeName="d" values="M0,400 Q200,350 400,400 T800,400; M0,380 Q200,450 400,380 T800,380; M0,400 Q200,350 400,400 T800,400" dur="15s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-lg bg-black/40 rounded-2xl shadow-2xl border border-purple-500/20 p-8">
          <div className="text-center mb-8">
            <motion.div 
              className="mx-auto h-16 w-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-1">
              {step === 'request' ? 'Reset Your Password' : 'Create New Password'}
            </h2>
            <p className="text-gray-300 text-sm">
              {step === 'request' 
                ? 'Enter your email to receive a password reset link' 
                : 'Enter your new password below'}
            </p>
          </div>
          
          {message && (
            <motion.div 
              className="mb-6 p-4 rounded-lg bg-green-500/20 border border-green-500/30 text-green-300"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{message}</span>
              </div>
            </motion.div>
          )}
          
          {error && (
            <motion.div 
              className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            </motion.div>
          )}
          
          {step === 'request' ? (
            <motion.form 
              onSubmit={handleRequestReset}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email address"
                    disabled={isSubmitting}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
              
              <div>
                <motion.button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </div>
                  ) : 'Send Reset Link'}
                </motion.button>
              </div>
              
              <div className="text-center mt-4">
                <Link to="/login" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                  Back to login
                </Link>
              </div>
            </motion.form>
          ) : (
            <motion.form 
              onSubmit={handleResetPassword}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    placeholder="Enter new password"
                    disabled={isSubmitting}
                    minLength={8}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-400">Must be at least 8 characters long</p>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Confirm new password"
                    disabled={isSubmitting}
                    minLength={8}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
              
              <div>
                <motion.button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Resetting...
                    </div>
                  ) : 'Reset Password'}
                </motion.button>
              </div>
              
              <div className="text-center mt-4">
                <Link to="/login" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                  Back to login
                </Link>
              </div>
            </motion.form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage; 