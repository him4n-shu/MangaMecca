import React from 'react';
import { motion } from 'framer-motion';

const allActionFigureItems = [
    {
        id: 1,
        title: "Kakashi Hatake Figure",
        regularPrice: 1499.00,
        salePrice: 699.00,
        image: "/action figure-image/kakashi.jpg",
    },
    {
        id: 2,
        title: "Roronoa Zoro Figure",
        regularPrice: 1499.00,
        salePrice: 799.00,
        image: "/action figure-image/zoro.jpg",
    },
    {
        id: 3,
        title: "Itachi Uchiha Figure",
        regularPrice: 1499.00,
        salePrice: 699.00,
        image: "/action figure-image/itachi.jpg",
    },
    {
        id: 4,
        title: "Monkey D. Luffy Figure",
        regularPrice: 1499.00,
        salePrice: 799.00,
        image: "/action figure-image/luffy.jpg",
    },
    {
        id: 5,
        title: "Satoru Gojo Figure",
        regularPrice: 1499.00,
        salePrice: 699.00,
        image: "/action figure-image/gojo.jpg",
    },
    {
        id: 6,
        title: "Giyu Tomioka Figure",
        regularPrice: 1499.00,
        salePrice: 699.00,
        image: "/action figure-image/giyu.jpg",
    },
    {
        id: 7,
        title: "Kyojuro Rengoku Figure",
        regularPrice: 1499.00,
        salePrice: 699.00,
        image: "/action figure-image/rengoku.jpg",
    },
    {
        id: 8,
        title: "Levi Ackerman Figure",
        regularPrice: 1499.00,
        salePrice: 799.00,
        image: "/action figure-image/levi.jpg",
    },
    {
        id: 9,
        title: "Might Guy Figure",
        regularPrice: 1499.00,
        salePrice: 699.00,
        image: "/action figure-image/might guy.jpg",
    },
    {
        id: 10,
        title: "Minato Namikaze Figure",
        regularPrice: 1499.00,
        salePrice: 799.00,
        image: "/action figure-image/forth hokage.jpg",
    },
    {
        id: 11,
        title: "Jiraiya Figure",
        regularPrice: 1499.00,
        salePrice: 699.00,
        image: "/action figure-image/Jiraiya.jpg",
    },
    {
        id: 12,
        title: "Obito Uchiha Figure",
        regularPrice: 1499.00,
        salePrice: 699.00,
        image: "/action figure-image/obito.jpg",
    },
    {
        id: 13,
        title: "Death Note Figure Set",
        regularPrice: 1499.00,
        salePrice: 799.00,
        image: "/action figure-image/deathnote.jpg",
    },
    {
        id: 14,
        title: "Demon Slayer Figure Set",
        regularPrice: 1499.00,
        salePrice: 799.00,
        image: "/action figure-image/demon slayer.jpg",
    },
    {
        id: 15,
        title: "Itachi Susanoo Figure",
        regularPrice: 1499.00,
        salePrice: 799.00,
        image: "/action figure-image/itachi2.jpg",
    }
];

const ActionFiguresPage = () => {
    return (
        <div className="max-w-[1400px] mx-auto px-8 py-8">
            <h1 className="text-4xl font-bold mb-8 text-white" data-aos="fade-right">All Action Figures</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-10">
                {allActionFigureItems.map((item, index) => (
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

export default ActionFiguresPage; 