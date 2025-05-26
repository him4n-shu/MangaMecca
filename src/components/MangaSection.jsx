import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const mangaItems = [
    {
        id: 1,
        title: "One Piece Vol. 1",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/manga-image/One Piece.jpg",
        vendor: "MANGASTORE"
    },
    {
        id: 2,
        title: "Naruto Vol. 1",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/manga-image/Naruto.jpg",
        vendor: "MANGASTORE"
    },
    {
        id: 3,
        title: "Attack on Titan Vol. 1",
        regularPrice: 1199.00,
        salePrice: 499.00,
        image: "/manga-image/Attack on Titan.jpg",
        vendor: "MANGASTORE"
    },
    {
        id: 4,
        title: "Death Note Vol. 1",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/manga-image/Death Note.jpg",
        vendor: "MANGASTORE"
    },
    {
        id: 5,
        title: "Jujutsu Kaisen Vol. 1",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/manga-image/Jujutsu Kaisen.jpg",
        vendor: "MANGASTORE"
    },
    {
        id: 6,
        title: "Dragon Ball Super Vol. 1",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/manga-image/Dragon Ball Super.jpg",
        vendor: "MANGASTORE"
    },
    {
        id: 7,
        title: "Tokyo Ghoul Vol. 1",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/manga-image/Tokyo Ghoul.jpg",
        vendor: "MANGASTORE"
    },
    {
        id: 8,
        title: "Fullmetal Alchemist Vol. 1",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/manga-image/Fullmetal Alchemist-Brotherhood.jpg",
        vendor: "MANGASTORE"
    },
    {
        id: 9,
        title: "One Punch Man Vol. 1",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/manga-image/One Punch Man.jpg",
        vendor: "MANGASTORE"
    },
    {
        id: 10,
        title: "Hunter x Hunter Vol. 1",
        regularPrice: 1199.00,
        salePrice: 499.00,
        image: "/manga-image/Hunter x Hunter.jpg",
        vendor: "MANGASTORE"
    }
];

const MangaSection = () => {
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
                <h2 className="text-3xl font-bold text-white" data-aos="fade-right">Manga</h2>
                <Link to="/manga">
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
                {mangaItems.map((item, index) => (
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
        </section>
    );
};

export default MangaSection; 