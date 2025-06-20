import React from 'react';
import { motion } from 'framer-motion';

const allPosterItems = [
    {
        id: 1,
        title: "Naruto Poster",
        regularPrice: 999.00,
        salePrice: 299.00,
        image: "/poster-image/Naruto.jpg",
    },
    {
        id: 2,
        title: "Team 7 Naruto Poster",
        regularPrice: 999.00,
        salePrice: 299.00,
        image: "/poster-image/Team 7 Naruto.jpg",
    },
    {
        id: 3,
        title: "Naruto and Sasuke Poster",
        regularPrice: 999.00,
        salePrice: 299.00,
        image: "/poster-image/Naruto and Sasuke.jpg",
    },
    {
        id: 4,
        title: "Naruto Character Eyes Poster",
        regularPrice: 999.00,
        salePrice: 299.00,
        image: "/poster-image/Naruto Character Eyes.jpg",
    },
    {
        id: 5,
        title: "Pain Eyes Poster",
        regularPrice: 999.00,
        salePrice: 299.00,
        image: "/poster-image/Pain Eyes.jpg",
    },
    {
        id: 6,
        title: "Itachi Uchiha Poster",
        regularPrice: 999.00,
        salePrice: 299.00,
        image: "/poster-image/Itachi.jpg",
    },
    {
        id: 7,
        title: "Hinata Hyuga Poster",
        regularPrice: 999.00,
        salePrice: 299.00,
        image: "/poster-image/Hinata.jpg",
    },
    {
        id: 8,
        title: "Naruto Funny Poster",
        regularPrice: 999.00,
        salePrice: 299.00,
        image: "/poster-image/Naruto Funny.jpg",
    },
    {
        id: 9,
        title: "Monkey D. Luffy Poster",
        regularPrice: 999.00,
        salePrice: 299.00,
        image: "/poster-image/Luffy.jpg",
    },
    {
        id: 10,
        title: "Levi Ackerman Poster",
        regularPrice: 999.00,
        salePrice: 299.00,
        image: "/poster-image/Levi.jpg",
    },
    {
        id: 11,
        title: "Kyojuro Rengoku Poster",
        regularPrice: 999.00,
        salePrice: 299.00,
        image: "/poster-image/Rengoku.jpg",
    },
    {
        id: 12,
        title: "Nezuko Kamado Poster",
        regularPrice: 999.00,
        salePrice: 299.00,
        image: "/poster-image/Nezuko Kamado.jpg",
    },
    {
        id: 13,
        title: "Zenitsu Agatsuma Poster",
        regularPrice: 999.00,
        salePrice: 299.00,
        image: "/poster-image/Zenitsu Agatsuma.jpg",
    },
    {
        id: 14,
        title: "Shinobu Kocho Poster",
        regularPrice: 999.00,
        salePrice: 299.00,
        image: "/poster-image/Shinobu.jpg",
    },
    {
        id: 15,
        title: "Muzan Kibutsuji Poster",
        regularPrice: 999.00,
        salePrice: 299.00,
        image: "/poster-image/Muzan.jpg",
    },
    {
        id: 16,
        title: "Death Note Poster",
        regularPrice: 999.00,
        salePrice: 299.00,
        image: "/poster-image/Death Note.jpg",
    },
    {
        id: 17,
        title: "Sung Jinwoo Poster",
        regularPrice: 999.00,
        salePrice: 299.00,
        image: "/poster-image/Sung Jinwoo.jpg",
    },
    {
        id: 18,
        title: "Solo Leveling Absolute Being Poster",
        regularPrice: 999.00,
        salePrice: 299.00,
        image: "/poster-image/Absolute Being Solo Levelling.jpg",
    },
    {
        id: 19,
        title: "Iron Man Poster",
        regularPrice: 999.00,
        salePrice: 299.00,
        image: "/poster-image/Iron Man.jpg",
    },
    {
        id: 20,
        title: "Moon Knight Poster",
        regularPrice: 999.00,
        salePrice: 299.00,
        image: "/poster-image/Moon Knight.jpg",
    }
];

const PostersPage = () => {
    return (
        <div className="max-w-[1400px] mx-auto px-8 py-8">
            <h1 className="text-4xl font-bold mb-8 text-white" data-aos="fade-right">All Posters</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-10">
                {allPosterItems.map((item, index) => (
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

export default PostersPage; 