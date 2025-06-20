import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import OptimizedImage from './common/OptimizedImage';

export const mangaItems = [
    {
        id: 1,
        title: "One Piece Vol. 1",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/manga-image/One Piece.jpg",
        vendor: "MANGAMECCA",
        category: "Shonen"
    },
    {
        id: 2,
        title: "Naruto Vol. 1",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/manga-image/Naruto.jpg",
        vendor: "MANGAMECCA",
        category: "Shonen"
    },
    {
        id: 3,
        title: "Attack on Titan Vol. 1",
        regularPrice: 1199.00,
        salePrice: 499.00,
        image: "/manga-image/Attack on Titan.jpg",
        vendor: "MANGAMECCA",
        category: "Seinen"
    },
    {
        id: 4,
        title: "Death Note Vol. 1",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/manga-image/Death Note.jpg",
        vendor: "MANGAMECCA",
        category: "Shonen"
    },
    {
        id: 5,
        title: "Jujutsu Kaisen Vol. 1",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/manga-image/Jujutsu Kaisen.jpg",
        vendor: "MANGAMECCA",
        category: "Shonen"
    },
    {
        id: 6,
        title: "Dragon Ball Super Vol. 1",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/manga-image/Dragon Ball Super.jpg",
        vendor: "MANGAMECCA",
        category: "Shonen"
    },
    {
        id: 7,
        title: "Tokyo Ghoul Vol. 1",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/manga-image/Tokyo Ghoul.jpg",
        vendor: "MANGAMECCA",
        category: "Seinen"
    },
    {
        id: 8,
        title: "Fullmetal Alchemist Vol. 1",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/manga-image/Fullmetal Alchemist-Brotherhood.jpg",
        vendor: "MANGAMECCA",
        category: "Shonen"
    },
    {
        id: 9,
        title: "One Punch Man Vol. 1",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/manga-image/One Punch Man.jpg",
        vendor: "MANGAMECCA",
        category: "Seinen"
    },
    {
        id: 10,
        title: "Hunter x Hunter Vol. 1",
        regularPrice: 1199.00,
        salePrice: 499.00,
        image: "/manga-image/Hunter x Hunter.jpg",
        vendor: "MANGAMECCA",
        category: "Shonen"
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
        <section className="container-padding">
            <div className="flex justify-between items-center mb-4 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white" data-aos="fade-right">Manga</h2>
                <Link to="/manga">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-1 md:px-6 md:py-2 border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-colors duration-300 rounded text-xs md:text-sm font-medium tap-target"
                    >
                        View All
                    </motion.button>
                </Link>
            </div>
            <div className="responsive-grid">
                {mangaItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className="group relative"
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                        data-aos-duration="800"
                        whileHover={{ scale: 1.03 }}
                    >
                        <Link to={`/manga/${item.id}`} className="block">
                            <div className="relative">
                                <OptimizedImage
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full aspect-portrait"
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                    priority={index < 4} // Load first 4 images with priority
                                />
                            </div>
                            <div className="mt-2 md:mt-4 space-y-1 md:space-y-2">
                                <h3 className="text-xs md:text-sm font-medium text-white line-clamp-2">{item.title}</h3>
                                <div className="flex items-center space-x-2">
                                    <p className="text-xs md:text-sm text-gray-400 line-through">Rs. {item.regularPrice.toFixed(2)}</p>
                                    <p className="text-xs md:text-sm font-semibold text-white">Rs. {item.salePrice.toFixed(2)}</p>
                                </div>
                            </div>
                        </Link>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-colors duration-300 py-1 md:py-2 text-xs md:text-sm font-medium rounded mt-2 tap-target"
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

export default MangaSection; 