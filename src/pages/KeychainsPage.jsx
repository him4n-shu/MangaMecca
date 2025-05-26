import React from 'react';
import { motion } from 'framer-motion';

const allKeychainItems = [
    {
        id: 1,
        title: "Naruto Keychain",
        regularPrice: 499.00,
        salePrice: 199.00,
        image: "/anime-keychain-image/naruto.webp",
    },
    {
        id: 2,
        title: "One Piece Luffy Gear 5 Keychain",
        regularPrice: 499.00,
        salePrice: 249.00,
        image: "/anime-keychain-image/gear 5 luffy.webp",
    },
    {
        id: 3,
        title: "Akatsuki Cloud Keychain",
        regularPrice: 499.00,
        salePrice: 199.00,
        image: "/anime-keychain-image/akatsuki.webp",
    },
    {
        id: 4,
        title: "Giyu Tomioka Keychain",
        regularPrice: 499.00,
        salePrice: 199.00,
        image: "/anime-keychain-image/giyu.webp",
    },
    {
        id: 5,
        title: "Leaf Village Symbol Keychain",
        regularPrice: 499.00,
        salePrice: 249.00,
        image: "/anime-keychain-image/leaf-village.webp",
    },
    {
        id: 6,
        title: "Kakashi Hatake Keychain",
        regularPrice: 499.00,
        salePrice: 199.00,
        image: "/anime-keychain-image/kakashi.webp",
    },
    {
        id: 7,
        title: "Chainsaw Man Keychain",
        regularPrice: 499.00,
        salePrice: 199.00,
        image: "/anime-keychain-image/chainshaw man.webp",
    },
    {
        id: 8,
        title: "One Piece Inspired Keychain",
        regularPrice: 499.00,
        salePrice: 249.00,
        image: "/anime-keychain-image/one-piece inspired.webp",
    },
    {
        id: 9,
        title: "Franky Keychain",
        regularPrice: 499.00,
        salePrice: 199.00,
        image: "/anime-keychain-image/franky.webp",
    },
    {
        id: 10,
        title: "Ryuk Keychain",
        regularPrice: 499.00,
        salePrice: 199.00,
        image: "/anime-keychain-image/ryuk.webp",
    }
];

const KeychainsPage = () => {
    return (
        <div className="max-w-[1400px] mx-auto px-8 py-8">
            <h1 className="text-4xl font-bold mb-8 text-white" data-aos="fade-right">All Keychains</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-10">
                {allKeychainItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className="group relative"
                        data-aos="fade-up"
                        data-aos-delay={index * 50}
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
                            >
                                Add to cart
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default KeychainsPage; 