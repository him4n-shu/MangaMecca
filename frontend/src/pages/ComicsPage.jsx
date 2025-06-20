import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import FilterSort from '../components/FilterSort';
import { comicsItems } from '../components/ComicsSection';

const ComicsPage = () => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [buttonStates, setButtonStates] = useState({});
    const { addToCart, cart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    // Initialize filtered products with all comics items
    useEffect(() => {
        setFilteredProducts(comicsItems);
    }, []);

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
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-4" data-aos="fade-up">Comics Collection</h1>
                <p className="text-gray-400 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
                    Explore our vast collection of comics from legendary publishers.
                    From classic superhero tales to groundbreaking graphic novels.
                </p>
            </div>
            
            {/* Filter and Sort */}
            <div data-aos="fade-up" data-aos-delay="200">
                <FilterSort products={comicsItems} setFilteredProducts={setFilteredProducts} />
            </div>

            {/* Results Count */}
            <div className="text-gray-400" data-aos="fade-up" data-aos-delay="250">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-10">
                {filteredProducts.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className="group relative"
                        data-aos="fade-up"
                        data-aos-delay={index * 50}
                        data-aos-duration="800"
                        whileHover={{ scale: 1.05 }}
                    >
                        <a href={`/comics/${item.id}`} className="block">
                            <div className="relative">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-auto object-cover aspect-[3/4] rounded-lg"
                                    loading="lazy"
                                />
                                {/* Discount tag */}
                                <div className="absolute top-2 left-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs font-bold px-2 py-1 rounded">
                                    {Math.round((1 - item.salePrice / item.regularPrice) * 100)}% OFF
                                </div>
                                {/* Category tag */}
                                {item.category && (
                                    <div className="absolute bottom-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                                        {item.category}
                                    </div>
                                )}
                            </div>
                            <div className="mt-4 space-y-2">
                                <h3 className="text-sm font-medium text-white">{item.title}</h3>
                                <div className="flex items-center space-x-2">
                                    <p className="text-gray-400 line-through">Rs. {item.regularPrice.toFixed(2)}</p>
                                    <p className="font-semibold text-white">Rs. {item.salePrice.toFixed(2)}</p>
                                </div>
                            </div>
                        </a>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-colors duration-300 py-2 text-sm font-medium rounded mt-2"
                            onClick={(e) => handleAddToCart(item, e)}
                        >
                            {buttonStates[item.id] || 'Add to cart'}
                        </motion.button>
                    </motion.div>
                ))}
            </div>

            {/* No Results Message */}
            {filteredProducts.length === 0 && (
                <div className="text-center py-16" data-aos="fade-up">
                    <h2 className="text-2xl text-gray-400 mb-4">No products found</h2>
                    <p className="text-gray-500 mb-8">Try adjusting your filters to find products</p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg transition-all duration-300"
                        onClick={() => {
                            // Reset filters by setting back to all products
                            setFilteredProducts(comicsItems);
                        }}
                    >
                        Reset Filters
                    </motion.button>
                </div>
            )}
        </div>
    );
};

export default ComicsPage; 