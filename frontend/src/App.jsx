import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import ProductDetail from './components/ProductDetail';
import MangaPage from './pages/MangaPage';
import ComicsPage from './pages/ComicsPage';
import PostersPage from './pages/PostersPage';
import ActionFiguresPage from './pages/ActionFiguresPage';
import KeychainsPage from './pages/KeychainsPage';
import CartPage from './pages/CartPage';
import Categories from './components/Categories';
import SearchResults from './components/SearchResults';
import Profile from './components/profile/Profile';
import Wishlist from './components/Wishlist';
import CheckoutPage from './pages/CheckoutPage';
import PasswordResetPage from './components/PasswordResetPage';
import NotFound from './components/NotFound';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext';

function App() {
  useEffect(() => {
    // Initialize AOS animation library
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out',
      mirror: false,
      disable: window.innerWidth < 768 ? true : false // Disable animations on mobile for better performance
    });
  }, []);

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <RecentlyViewedProvider>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow w-full mx-auto max-w-[1400px] py-4 md:py-8">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/manga" element={<MangaPage />} />
                    <Route path="/manga/:productId" element={<ProductDetail />} />
                    <Route path="/comics" element={<ComicsPage />} />
                    <Route path="/comics/:productId" element={<ProductDetail />} />
                    <Route path="/posters" element={<PostersPage />} />
                    <Route path="/posters/:productId" element={<ProductDetail />} />
                    <Route path="/action-figures" element={<ActionFiguresPage />} />
                    <Route path="/action-figures/:productId" element={<ProductDetail />} />
                    <Route path="/keychains" element={<KeychainsPage />} />
                    <Route path="/keychains/:productId" element={<ProductDetail />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/profile/*" element={<Profile />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/reset-password" element={<PasswordResetPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </RecentlyViewedProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
