import React from 'react';
import { motion } from 'framer-motion';

const allComicItems = [
    {
        id: 1,
        title: "Watchmen",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/comic-image/Watchmen.jpg",
    },
    {
        id: 2,
        title: "The Dark Knight Returns",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/comic-image/Batman - The Dark Knight Returns.jpg",
    },
    {
        id: 3,
        title: "The Sandman",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/comic-image/The Sandman.jpg",
    },
    {
        id: 4,
        title: "Kingdom Come",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/comic-image/Kingdom Come.jpg",
    },
    {
        id: 5,
        title: "All-Star Superman",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/comic-image/All Star Superman.jpg",
    },
    {
        id: 6,
        title: "Batman: Year One",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/comic-image/Batman - Year One.jpg",
    },
    {
        id: 7,
        title: "The Killing Joke",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/comic-image/Batman The Killing Joke.jpg",
    },
    {
        id: 8,
        title: "Saga of the Swamp Thing",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/comic-image/Saga of the Swamp Thing.jpg",
    },
    {
        id: 9,
        title: "Marvels",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/comic-image/Marvels.jpg",
    },
    {
        id: 10,
        title: "Preacher",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/comic-image/Preacher.jpg",
    },
    {
        id: 11,
        title: "Y: The Last Man",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/comic-image/Y the Last Man.jpg",
    },
    {
        id: 12,
        title: "Fables",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/comic-image/Fables.jpg",
    },
    {
        id: 13,
        title: "Daredevil",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/comic-image/Daredevil.jpg",
    },
    {
        id: 14,
        title: "Astro City",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/comic-image/Astro City.jpg",
    },
    {
        id: 15,
        title: "Maus",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/comic-image/Maus.jpg",
    },
    {
        id: 16,
        title: "Amazing Spider-Man",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/comic-image/Amazing Spider-Man.jpg",
    },
    {
        id: 17,
        title: "Uncanny X-Men",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/comic-image/Uncanny X-Men.jpg",
    },
    {
        id: 18,
        title: "Fantastic Four",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/comic-image/Fantastic Four.jpg",
    },
    {
        id: 19,
        title: "Captain America",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/comic-image/Captain America.jpg",
    },
    {
        id: 20,
        title: "Bone",
        regularPrice: 999.00,
        salePrice: 399.00,
        image: "/comic-image/Bone.jpg",
    }
];

const ComicsPage = () => {
    return (
        <div className="max-w-[1400px] mx-auto px-8 py-8">
            <h1 className="text-4xl font-bold mb-8 text-white" data-aos="fade-right">All Comics</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-10">
                {allComicItems.map((item, index) => (
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

export default ComicsPage; 