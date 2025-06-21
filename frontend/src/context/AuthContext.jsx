import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Get API base URL from environment or default to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check if user is already logged in on mount
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const token = localStorage.getItem('token');
                
                if (!token) {
                    setLoading(false);
                    return;
                }
                
                const res = await fetch(`${API_BASE_URL}/api/auth/verify`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (res.ok) {
                    const userData = await res.json();
                    setUser(userData);
                    setIsAuthenticated(true);
                } else {
                    // Token invalid or expired
                    localStorage.removeItem('token');
                }
            } catch (err) {
                console.error('Auth verification error:', err);
                localStorage.removeItem('token');
            } finally {
                setLoading(false);
            }
        };
        
        checkAuthStatus();
    }, []);

    const login = async (email, password) => {
        setError(null);
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            
            const data = await res.json();
            
            if (res.ok) {
                localStorage.setItem('token', data.token);
                setUser(data.user);
                setIsAuthenticated(true);
                return { success: true };
            } else {
                setError(data.message || 'Login failed');
                return { success: false, message: data.message };
            }
        } catch (err) {
            setError('An error occurred during login');
            console.error('Login error:', err);
            return { success: false, message: 'An error occurred during login' };
        }
    };

    const signup = async (userData) => {
        setError(null);
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            
            const data = await res.json();
            
            if (res.ok) {
                localStorage.setItem('token', data.token);
                setUser(data.user);
                setIsAuthenticated(true);
                return { success: true };
            } else {
                setError(data.message || 'Signup failed');
                return { success: false, message: data.message };
            }
        } catch (err) {
            setError('An error occurred during signup');
            console.error('Signup error:', err);
            return { success: false, message: 'An error occurred during signup' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
    };

    const updateUserInfo = (updatedUserData) => {
        setUser(prev => ({
            ...prev,
            ...updatedUserData
        }));
    };

    const requestPasswordReset = async (email) => {
        setError(null);
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/request-password-reset`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            
            const data = await res.json();
            
            if (res.ok) {
                return { success: true, message: data.message };
            } else {
                setError(data.message || 'Password reset request failed');
                return { success: false, message: data.message };
            }
        } catch (err) {
            setError('An error occurred during password reset request');
            console.error('Password reset request error:', err);
            return { success: false, message: 'An error occurred during password reset request' };
        }
    };

    const resetPassword = async (token, newPassword) => {
        setError(null);
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, newPassword })
            });
            
            const data = await res.json();
            
            if (res.ok) {
                return { success: true, message: data.message };
            } else {
                setError(data.message || 'Password reset failed');
                return { success: false, message: data.message };
            }
        } catch (err) {
            setError('An error occurred during password reset');
            console.error('Password reset error:', err);
            return { success: false, message: 'An error occurred during password reset' };
        }
    };

    const deleteAccount = async (password) => {
        setError(null);
        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                setError('Not authenticated');
                return { success: false, message: 'Not authenticated' };
            }
            
            const res = await fetch(`${API_BASE_URL}/api/auth/delete-account`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password })
            });
            
            const data = await res.json();
            
            if (res.ok) {
                logout();
                return { success: true, message: data.message };
            } else {
                setError(data.message || 'Failed to delete account');
                return { success: false, message: data.message };
            }
        } catch (err) {
            setError('An error occurred while deleting account');
            console.error('Delete account error:', err);
            return { success: false, message: 'An error occurred while deleting account' };
        }
    };

    const updatePassword = async (currentPassword, newPassword) => {
        setError(null);
        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                setError('Not authenticated');
                return { success: false, message: 'Not authenticated' };
            }
            
            const res = await fetch(`${API_BASE_URL}/api/auth/update-password`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ currentPassword, newPassword })
            });
            
            const data = await res.json();
            
            if (res.ok) {
                return { success: true, message: data.message };
            } else {
                setError(data.message || 'Failed to update password');
                return { success: false, message: data.message };
            }
        } catch (err) {
            setError('An error occurred while updating password');
            console.error('Update password error:', err);
            return { success: false, message: 'An error occurred while updating password' };
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            error,
            isAuthenticated,
            login,
            signup,
            logout,
            updateUserInfo,
            requestPasswordReset,
            resetPassword,
            deleteAccount,
            updatePassword
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext; 