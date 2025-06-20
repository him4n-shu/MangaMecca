import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

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
                
                const res = await fetch('/api/auth/verify', {
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
            const res = await fetch('/api/auth/login', {
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
            const res = await fetch('/api/auth/signup', {
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

    return (
        <AuthContext.Provider 
            value={{ 
                user, 
                loading, 
                error, 
                isAuthenticated,
                login, 
                signup, 
                logout,
                updateUserInfo
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext; 