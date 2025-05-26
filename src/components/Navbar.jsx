import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import CartPreview from './CartPreview';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    setIsOpen(false); 
  };

  return (
    <nav className="h-24 flex items-center px-6 relative z-20 bg-[#111] shadow-navbar">
      {/* Left: Hamburger for mobile and main nav links */}
      <div className="flex items-center flex-1 md:flex-none">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none mr-4"
        >
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {/* Center-left: Main nav links */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/categories" className="nav-link">Categories</Link>
        </div>
      </div>
      {/* Center: Logo */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/favicon.svg" alt="MangaMecca" className="w-8 h-8" />
          <span className="text-2xl tracking-widest font-bold text-white heading-primary">
            MangaMecca
          </span>
        </Link>
      </div>
      {/* Right: Cart, Sign In, Log In */}
      <div className="flex-1 flex justify-end items-center space-x-8">
        <div className="relative hidden md:block">
          <button
            onMouseEnter={() => setIsCartOpen(true)}
            className="nav-link inline-flex items-center space-x-2 relative group"
          >
            <svg 
              className="w-6 h-6 transform group-hover:scale-110 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
              />
            </svg>
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                {totalItems}
              </span>
            )}
          </button>
          <CartPreview isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="relative overflow-hidden group bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative flex items-center space-x-2">
                  <span>Logout</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </span>
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="relative overflow-hidden group bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative flex items-center space-x-2">
                  <span>Login</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </span>
              </Link>
              <Link
                to="/signup"
                className="relative overflow-hidden group bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative flex items-center space-x-2">
                  <span>Sign Up</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute top-24 left-0 w-full bg-[#111] shadow-navbar md:hidden z-20">
          <div className="flex flex-col py-2">
            <Link to="/" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/categories" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Categories</Link>
            <Link to="/cart" className="mobile-nav-link relative flex items-center space-x-2" onClick={() => setIsOpen(false)}>
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            {user ? (
              <>
                <div className="mobile-nav-link text-gray-300">Welcome, {user.name}</div>
                <button
                  onClick={handleLogout}
                  className="mobile-nav-link text-left text-red-500 hover:text-red-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Login</Link>
                <Link to="/signup" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
      {/* Gradient shadow at bottom */}
      <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-3 bg-gradient-to-b from-transparent to-[#00ffb4]/10" />
    </nav>
  );
};

export default Navbar;