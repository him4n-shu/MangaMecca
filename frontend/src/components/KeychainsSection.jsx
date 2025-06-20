import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import OptimizedImage from './common/OptimizedImage';

export const keychainItems = [
    {
        id: 1,
        title: "Naruto Keychain",
        regularPrice: 499.00,
        salePrice: 199.00,
        image: "/anime-keychain-image/naruto.webp",
        vendor: "MANGAMECCA"
    },
    {
        id: 2,
        title: "One Piece Luffy Gear 5 Keychain",
        regularPrice: 499.00,
        salePrice: 249.00,
        image: "/anime-keychain-image/gear 5 luffy.webp",
        vendor: "MANGAMECCA"
    },
    {
        id: 3,
        title: "Akatsuki Cloud Keychain",
        regularPrice: 499.00,
        salePrice: 199.00,
        image: "/anime-keychain-image/akatsuki.webp",
        vendor: "MANGAMECCA"
    },
    {
        id: 4,
        title: "Giyu Tomioka Keychain",
        regularPrice: 499.00,
        salePrice: 199.00,
        image: "/anime-keychain-image/giyu.webp",
        vendor: "MANGAMECCA"
    },
    {
        id: 5,
        title: "Leaf Village Symbol Keychain",
        regularPrice: 499.00,
        salePrice: 249.00,
        image: "/anime-keychain-image/leaf-village.webp",
        vendor: "MANGAMECCA"
    }
];

const KeychainsSection = () => {
    const { addToCart, cart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [buttonStates, setButtonStates] = useState({});

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
        <section>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-white" data-aos="fade-right">Keychains</h2>
                <Link to="/keychains">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-colors duration-300 rounded text-sm font-medium"
                    >
                        View All
                    </motion.button>
                </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-10">
                {keychainItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className="group relative"
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                        data-aos-duration="800"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Link to={`/keychains/${item.id}`} className="block">
                            <div className="relative">
                                <OptimizedImage
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full aspect-portrait"
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                    priority={index < 4}
                                />
                            </div>
                            <div className="mt-4 space-y-2">
                                <h3 className="text-sm font-medium text-white">{item.title}</h3>
                                <div className="flex items-center space-x-2">
                                    <p className="text-gray-400 line-through">Rs. {item.regularPrice.toFixed(2)}</p>
                                    <p className="font-semibold text-white">Rs. {item.salePrice.toFixed(2)}</p>
                                </div>
                            </div>
                        </Link>
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
        </section>
    );
};

export default KeychainsSection; 