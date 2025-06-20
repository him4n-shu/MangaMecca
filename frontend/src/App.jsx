import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Categories from './components/Categories';
import MangaPage from './pages/MangaPage';
import ComicsPage from './pages/ComicsPage';
import PostersPage from './pages/PostersPage';
import ActionFiguresPage from './pages/ActionFiguresPage';
import KeychainsPage from './pages/KeychainsPage';
import { AuthProvider } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import SearchResults from './components/SearchResults';
import ProductDetail from './components/ProductDetail';
import UserProfile from './components/UserProfile';

// Separate component to use the useCart hook
const AppContent = () => {
  const { animation } = useCart();

  useEffect(() => {
    AOS.init({
      duration: 800,
      offset: 100,
      once: true,
      easing: 'ease-in-out',
      delay: 100,
      anchorPlacement: 'top-bottom'
    });
    window.addEventListener('load', AOS.refresh);
    return () => window.removeEventListener('load', AOS.refresh);
  }, []);

  return (
    <Router>
      <Navbar />
      <main className="container mx-auto px-4 py-8 relative bg-[#111] min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/manga" element={<MangaPage />} />
          <Route path="/comics" element={<ComicsPage />} />
          <Route path="/posters" element={<PostersPage />} />
          <Route path="/action-figures" element={<ActionFiguresPage />} />
          <Route path="/keychains" element={<KeychainsPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/profile" element={<UserProfile />} />
          {/* Product detail routes */}
          <Route path="/:category/:productId" element={<ProductDetail />} />
        </Routes>
      </main>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
