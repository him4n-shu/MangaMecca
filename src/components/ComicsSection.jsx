import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const comicItems = [
    {
        id: 1,
        title: "Amazing Spider-Man",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/comic-image/Amazing Spider-Man.jpg",
        vendor: "MANGASTORE"
    },
    {
        id: 2,
        title: "Batman: The Dark Knight Returns",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/comic-image/Batman - The Dark Knight Returns.jpg",
        vendor: "MANGASTORE"
    },
    {
        id: 3,
        title: "Uncanny X-Men",
        regularPrice: 999.00,
        salePrice: 299.00,
        image: "/comic-image/Uncanny X-Men.jpg",
        vendor: "MANGASTORE"
    },
    {
        id: 4,
        title: "All Star Superman",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/comic-image/All Star Superman.jpg",
        vendor: "MANGASTORE"
    },
    {
        id: 5,
        title: "Watchmen",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/comic-image/Watchmen.jpg",
        vendor: "MANGASTORE"
    },
    {
        id: 6,
        title: "Batman: Year One",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/comic-image/Batman - Year One.jpg",
        vendor: "MANGASTORE"
    },
    {
        id: 7,
        title: "The Sandman",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/comic-image/The Sandman.jpg",
        vendor: "MANGASTORE"
    },
    {
        id: 8,
        title: "Kingdom Come",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/comic-image/Kingdom Come.jpg",
        vendor: "MANGASTORE"
    },
    {
        id: 9,
        title: "Marvels",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/comic-image/Marvels.jpg",
        vendor: "MANGASTORE"
    },
    {
        id: 10,
        title: "Captain America",
        regularPrice: 999.00,
        salePrice: 299.00,
        image: "/comic-image/Captain America.jpg",
        vendor: "MANGASTORE"
    }
];

const ComicsSection = () => {
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
                <h2 className="text-3xl font-bold text-white" data-aos="fade-right">Comics</h2>
                <Link to="/comics">
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
                {comicItems.map((item, index) => (
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

export default ComicsSection; 