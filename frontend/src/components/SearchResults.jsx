import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

// Import all product data
import { mangaItems } from './MangaSection';
import { comicsItems } from './ComicsSection';
import { posterItems } from './PostersSection';
import { figureItems } from './ActionFiguresSection';
import { keychainItems } from './KeychainsSection';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [buttonStates, setButtonStates] = useState({});
    const { addToCart, cart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    // Function to search across all product categories
    useEffect(() => {
        setLoading(true);

        // Combine all product arrays
        const allProducts = [
            ...mangaItems.map(item => ({ ...item, category: 'Manga' })),
            ...comicsItems.map(item => ({ ...item, category: 'Comics' })),
            ...posterItems.map(item => ({ ...item, category: 'Posters' })),
            ...figureItems.map(item => ({ ...item, category: 'Action Figures' })),
            ...keychainItems.map(item => ({ ...item, category: 'Keychains' }))
        ];

        // Filter products based on search query
        const filteredResults = allProducts.filter(product => {
            const searchTerm = query.toLowerCase();
            return (
                product.title.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm) ||
                (product.vendor && product.vendor.toLowerCase().includes(searchTerm))
            );
        });

        setResults(filteredResults);
        setLoading(false);
    }, [query]);

    const handleAddToCart = (item, event) => {
        if (!user) {
            navigate('/login');
            return;
        }
        const inCart = cart.find((c) => c.id === item.id);
        addToCart(item, event);
        setButtonStates((prev) => ({
            ...prev,
            [item.id]: inCart ? `+1` : 'Added!'
        }));
        setTimeout(() => {
            setButtonStates((prev) => ({ ...prev, [item.id]: undefined }));
        }, 1000);
    };

    return (
        <div className="max-w-[1400px] mx-auto px-8 py-8">
            <h1 className="text-4xl font-bold text-white mb-8" data-aos="fade-up">
                Search Results for "{query}"
            </h1>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
            ) : results.length === 0 ? (
                <div className="text-center py-16" data-aos="fade-up">
                    <h2 className="text-2xl text-gray-400 mb-4">No products found</h2>
                    <p className="text-gray-500 mb-8">Try a different search term or browse our categories</p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg transition-all duration-300"
                        onClick={() => navigate('/categories')}
                    >
                        Browse Categories
                    </motion.button>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-10">
                    {results.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className="group relative"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            data-aos-duration="800"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="relative">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-auto object-cover aspect-[3/4]"
                                    loading="lazy"
                                />
                                <div className="absolute top-2 right-2 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded">
                                    {item.category}
                                </div>
                            </div>
                            <div className="mt-4 space-y-2">
                                <h3 className="text-sm font-medium text-white">{item.title}</h3>
                                <div className="flex items-center space-x-2">
                                    <p className="text-gray-400 line-through">Rs. {item.regularPrice.toFixed(2)}</p>
                                    <p className="font-semibold text-white">Rs. {item.salePrice.toFixed(2)}</p>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-colors duration-300 py-2 text-sm font-medium rounded"
                                    onClick={(e) => handleAddToCart(item, e)}
                                >
                                    {buttonStates[item.id] || 'Add to cart'}
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResults; 