import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const bestSellerItems = [
    {
        id: 1,
        title: "One Piece Vol. 1",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/manga-image/One Piece.jpg",
        vendor: "MANGASTORE",
        category: "Manga"
    },
    {
        id: 2,
        title: "Demon Slayer Action Figure",
        regularPrice: 2499.00,
        salePrice: 1999.00,
        image: "/action figure-image/demon slayer.jpg",
        vendor: "MANGASTORE",
        category: "Action Figures"
    },
    {
        id: 3,
        title: "Batman: The Dark Knight Returns",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/comic-image/Batman - The Dark Knight Returns.jpg",
        vendor: "MANGASTORE",
        category: "Comics"
    },
    {
        id: 4,
        title: "Gear 5 Luffy Keychain",
        regularPrice: 499.00,
        salePrice: 299.00,
        image: "/anime-keychain-image/gear 5 luffy.webp",
        vendor: "MANGASTORE",
        category: "Keychains"
    },
    {
        id: 5,
        title: "Rengoku Poster",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/poster-image/Rengoku.jpg",
        vendor: "MANGASTORE",
        category: "Posters"
    }
];

const BestSellersSection = () => {
    const { addToCart, cart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [buttonStates, setButtonStates] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [direction, setDirection] = useState(0);

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

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prevIndex) => 
            prevIndex === bestSellerItems.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? bestSellerItems.length - 1 : prevIndex - 1
        );
    };

    useEffect(() => {
        let interval;
        if (isAutoPlaying) {
            interval = setInterval(() => {
                setDirection(1);
                setCurrentIndex((prevIndex) => 
                    prevIndex === bestSellerItems.length - 1 ? 0 : prevIndex + 1
                );
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying, currentIndex]);

    const handleMouseEnter = () => setIsAutoPlaying(false);
    const handleMouseLeave = () => setIsAutoPlaying(true);

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.995,
            filter: "blur(3px)",
            rotateY: direction > 0 ? 5 : -5
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            rotateY: 0
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.995,
            filter: "blur(3px)",
            rotateY: direction < 0 ? 5 : -5
        })
    };

    const transition = {
        x: { 
            type: "spring", 
            stiffness: 120, 
            damping: 15,
            mass: 1.2,
            duration: 0.4
        },
        opacity: { 
            duration: 0.2,
            ease: [0.22, 1, 0.36, 1]
        },
        scale: {
            duration: 0.2,
            ease: [0.22, 1, 0.36, 1]
        },
        filter: {
            duration: 0.2,
            ease: [0.22, 1, 0.36, 1]
        },
        rotateY: {
            duration: 0.2,
            ease: [0.22, 1, 0.36, 1]
        }
    };

    return (
        <section>
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-3">
                    <h2 className="text-3xl font-bold text-white" data-aos="fade-right">Best Sellers</h2>
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-full">
                        Hot
                    </span>
                </div>
                <Link to="/categories">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-colors duration-300 rounded text-sm font-medium"
                    >
                        View All Categories
                    </motion.button>
                </Link>
            </div>

            <div 
                className="relative overflow-hidden h-[600px] perspective-1000"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <AnimatePresence 
                    initial={false} 
                    custom={direction} 
                    mode="sync"
                >
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={transition}
                        className="absolute w-full preserve-3d"
                    >
                        <div className="max-w-4xl mx-auto">
                            <motion.div
                                className="group relative"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ 
                                    delay: 0,
                                    duration: 0.2,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="relative">
                                    <img
                                        src={bestSellerItems[currentIndex].image}
                                        alt={bestSellerItems[currentIndex].title}
                                        className="w-full h-[400px] object-cover rounded-lg shadow-2xl"
                                        loading="lazy"
                                    />
                                    <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-full">
                                        {bestSellerItems[currentIndex].category}
                                    </div>
                                </div>
                                <div className="mt-6 text-center">
                                    <h3 className="text-xl font-medium text-white mb-2">{bestSellerItems[currentIndex].title}</h3>
                                    <div className="flex items-center justify-center space-x-3 mb-4">
                                        <p className="text-gray-400 line-through">Rs. {bestSellerItems[currentIndex].regularPrice.toFixed(2)}</p>
                                        <p className="text-2xl font-bold text-white">Rs. {bestSellerItems[currentIndex].salePrice.toFixed(2)}</p>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                                        onClick={(e) => handleAddToCart(bestSellerItems[currentIndex], e)}
                                    >
                                        {buttonStates[bestSellerItems[currentIndex].id] || 'Add to cart'}
                                    </motion.button>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <motion.button
                    onClick={prevSlide}
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 0, 0, 0.8)" }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-300 z-10 shadow-lg hover:shadow-purple-500/25 border border-white/10"
                >
                    <svg 
                        className="w-6 h-6" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M15 19l-7-7 7-7" 
                        />
                    </svg>
                </motion.button>
                <motion.button
                    onClick={nextSlide}
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 0, 0, 0.8)" }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-300 z-10 shadow-lg hover:shadow-purple-500/25 border border-white/10"
                >
                    <svg 
                        className="w-6 h-6" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M9 5l7 7-7 7" 
                        />
                    </svg>
                </motion.button>

                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center space-x-3">
                    {bestSellerItems.map((_, index) => (
                        <motion.button
                            key={index}
                            onClick={() => {
                                setDirection(index > currentIndex ? 1 : -1);
                                setCurrentIndex(index);
                            }}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                index === currentIndex 
                                    ? 'bg-purple-500 w-8 shadow-lg shadow-purple-500/50' 
                                    : 'bg-gray-500/50 hover:bg-gray-400/50 backdrop-blur-sm'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BestSellersSection; 