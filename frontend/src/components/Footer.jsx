import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Main Footer Content */}
        <div className="container-padding py-8 md:py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Column 1: Logo and About */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <img src="/favicon.svg" alt="MangaMecca" className="w-8 h-8" />
              <span className="text-xl tracking-widest font-bold text-white">
                MangaMecca
              </span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Your one-stop shop for manga, comics, action figures, and more! We bring the best of anime and comic culture to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.684-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.041 0 2.67.01 2.986.058 4.04.045.976.207 1.505.344 1.858.182.466.398.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058 2.67 0 2.987-.01 4.04-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041 0-2.67-.01-2.986-.058-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.048-1.37-.058-4.041-.058zm0 3.063a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27zm0 8.468a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666zm6.538-8.469a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">Home</Link></li>
              <li><Link to="/manga" className="text-gray-400 hover:text-white transition-colors text-sm">Manga</Link></li>
              <li><Link to="/comics" className="text-gray-400 hover:text-white transition-colors text-sm">Comics</Link></li>
              <li><Link to="/posters" className="text-gray-400 hover:text-white transition-colors text-sm">Posters</Link></li>
              <li><Link to="/action-figures" className="text-gray-400 hover:text-white transition-colors text-sm">Action Figures</Link></li>
              <li><Link to="/keychains" className="text-gray-400 hover:text-white transition-colors text-sm">Keychains</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors text-sm">Contact Us</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors text-sm">FAQs</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors text-sm">Shipping Policy</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors text-sm">Return Policy</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Stay Updated</h3>
            <p className="text-sm text-gray-400 mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                aria-label="Email for newsletter"
              />
              <button 
                type="submit" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-2">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>

        {/* Bottom Footer - Copyright */}
        <div className="container-padding py-4 border-t border-gray-800 text-center text-xs text-gray-500">
          <p>© {currentYear} MangaMecca. All rights reserved.</p>
          <p className="mt-1">Designed with ❤️ for anime and comic enthusiasts</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 