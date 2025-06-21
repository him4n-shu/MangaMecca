import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import CartPreview from './CartPreview';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    setIsOpen(false); 
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  return (
    <nav className={`sticky-fix top-0 z-50 transition-all duration-300 ${isScrolled ? 'h-16 md:h-20' : 'h-16 md:h-24'} flex items-center px-4 md:px-6 relative bg-[#111] shadow-navbar`}>
      {/* Left: Logo, Hamburger for mobile and main nav links */}
      <div className="flex items-center flex-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none mr-4 tap-target focus-visible"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 mr-4 md:mr-8">
          <img src="/favicon.svg" alt="MangaMecca" className="w-6 h-6 md:w-8 md:h-8" />
          <span className="text-lg md:text-2xl tracking-widest font-bold text-white heading-primary">
            MangaMecca
          </span>
        </Link>
        
        {/* Main nav links */}
        <div className="hidden md:flex space-x-4 lg:space-x-8">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/categories" className="nav-link">Categories</Link>
        </div>
      </div>
      
      {/* Right: Search, Cart, Sign In, Log In */}
      <div className="flex-1 flex justify-end items-center space-x-2 md:space-x-4">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="bg-gray-800 text-white rounded-full py-1.5 px-3 pr-8 md:py-2 md:px-4 md:pr-10 w-40 lg:w-64 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          />
          <button 
            type="submit" 
            className="absolute right-2 md:right-3 text-gray-400 hover:text-white focus-visible tap-target"
            aria-label="Search"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>

        {/* Wishlist Link (Desktop) */}
        <div className="relative hidden md:block">
          <Link
            to="/wishlist"
            className="nav-link inline-flex items-center space-x-2 relative group tap-target focus-visible"
            aria-label="Wishlist"
          >
            <svg 
              className="w-5 h-5 md:w-6 md:h-6 transform group-hover:scale-110 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
              />
            </svg>
            <span className="hidden lg:inline">Wishlist</span>
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 lg:-right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                {wishlistCount}
              </span>
            )}
          </Link>
        </div>

        <div className="relative hidden md:block">
          <button
            onMouseEnter={() => setIsCartOpen(true)}
            className="nav-link inline-flex items-center space-x-2 relative group tap-target focus-visible"
            aria-label="Cart"
          >
            <svg 
              className="w-5 h-5 md:w-6 md:h-6 transform group-hover:scale-110 transition-transform" 
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
            <span className="hidden lg:inline">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 lg:-right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                {totalItems}
              </span>
            )}
          </button>
          <CartPreview isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
        
        {/* Mobile cart and wishlist icons */}
        <div className="flex md:hidden space-x-1">
          <Link to="/wishlist" className="p-2 relative" aria-label="Wishlist">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link to="/cart" className="p-2 relative" aria-label="Cart">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <Link 
                to="/profile" 
                className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 focus-visible"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="hidden lg:inline">{user.name}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="relative overflow-hidden group bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 lg:px-6 py-1.5 lg:py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 focus-visible"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative flex items-center space-x-1 lg:space-x-2">
                  <span className="text-sm">Logout</span>
                  <svg className="w-3 h-3 lg:w-4 lg:h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </span>
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="relative overflow-hidden group bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 lg:px-6 py-1.5 lg:py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 focus-visible text-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative flex items-center space-x-1 lg:space-x-2">
                  <span>Login</span>
                  <svg className="w-3 h-3 lg:w-4 lg:h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </span>
              </Link>
              <Link
                to="/signup"
                className="relative overflow-hidden group bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 lg:px-6 py-1.5 lg:py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 focus-visible text-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative flex items-center space-x-1 lg:space-x-2">
                  <span>Sign Up</span>
                  <svg className="w-3 h-3 lg:w-4 lg:h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
          <div className="absolute top-16 left-0 w-full bg-[#111] shadow-navbar md:hidden z-50 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="flex flex-col py-2">
              {/* Mobile Search Bar */}
              <form onSubmit={handleSearch} className="px-4 py-2">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="bg-gray-800 text-white rounded-full py-2 px-4 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  />
                  <button 
                    type="submit" 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white focus-visible"
                    aria-label="Search"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </form>
              <Link to="/" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="/categories" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Categories</Link>
              <Link to="/wishlist" className="mobile-nav-link relative flex items-center space-x-2" onClick={() => setIsOpen(false)}>
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                  />
                </svg>
                <span>Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
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
                  <Link to="/profile" className="mobile-nav-link flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Profile</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="mobile-nav-link flex items-center space-x-2 text-left"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="mobile-nav-link flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span>Login</span>
                  </Link>
                  <Link to="/signup" className="mobile-nav-link flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
              
              <div className="mt-4 px-4 py-2 border-t border-gray-800">
                <h3 className="text-sm font-semibold text-gray-300 mb-2">Quick Links</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/manga" className="text-sm text-purple-400 hover:text-purple-300 py-1" onClick={() => setIsOpen(false)}>
                    Manga
                  </Link>
                  <Link to="/comics" className="text-sm text-purple-400 hover:text-purple-300 py-1" onClick={() => setIsOpen(false)}>
                    Comics
                  </Link>
                  <Link to="/posters" className="text-sm text-purple-400 hover:text-purple-300 py-1" onClick={() => setIsOpen(false)}>
                    Posters
                  </Link>
                  <Link to="/action-figures" className="text-sm text-purple-400 hover:text-purple-300 py-1" onClick={() => setIsOpen(false)}>
                    Action Figures
                  </Link>
                  <Link to="/keychains" className="text-sm text-purple-400 hover:text-purple-300 py-1" onClick={() => setIsOpen(false)}>
                    Keychains
                  </Link>
                </div>
              </div>
              
              <button 
                onClick={() => setIsOpen(false)}
                className="mt-4 mx-4 py-2 bg-gray-800 text-white rounded-lg flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Close Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;