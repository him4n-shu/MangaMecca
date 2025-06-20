import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: 'Manga',
      image: '/manga-image/One Piece.jpg',
      path: '/manga',
      description: 'Explore our vast collection of manga series'
    },
    {
      id: 2,
      name: 'Action Figures',
      image: '/action figure-image/demon slayer.jpg',
      path: '/action-figures',
      description: 'High-quality anime and manga action figures'
    },
    {
      id: 3,
      name: 'Comics',
      image: '/comic-image/Batman - The Dark Knight Returns.jpg',
      path: '/comics',
      description: 'Western comics and graphic novels'
    },
    {
      id: 4,
      name: 'Keychains',
      image: '/anime-keychain-image/gear 5 luffy.webp',
      path: '/keychains',
      description: 'Collectible anime and manga keychains'
    },
    {
      id: 5,
      name: 'Posters',
      image: '/poster-image/Rengoku.jpg',
      path: '/posters',
      description: 'High-quality anime and manga posters'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: {
      scale: 1.03,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3
      }
    }
  };

  const overlayVariants = {
    hover: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      transition: {
        duration: 0.3
      }
    }
  };

  const titleVariants = {
    hover: {
      scale: 1.1,
      textShadow: "0px 0px 8px rgb(255,255,255)",
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };

  return (
    <motion.div 
      className="container mx-auto px-4 py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2 
        className="text-3xl font-bold text-center mb-8 text-white heading-primary heading-animated"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Browse Categories
      </motion.h2>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        {categories.map((category) => (
          <motion.div
            key={category.id}
            className="bg-[#222] rounded-lg shadow-lg overflow-hidden cursor-pointer"
            variants={cardVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => navigate(category.path)}
            layout
          >
            <div className="relative h-48 overflow-hidden">
              <motion.img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
                variants={imageVariants}
                onError={(e) => {
                  e.target.src = '/manga-image/Attack on Titan.jpg';
                }}
              />
              <motion.div 
                className="absolute inset-0 bg-black/40 flex items-center justify-center"
                variants={overlayVariants}
              >
                <motion.h3 
                  className="text-white text-2xl font-bold drop-shadow-lg heading-secondary"
                  variants={titleVariants}
                >
                  {category.name}
                </motion.h3>
              </motion.div>
            </div>
            <motion.div 
              className="p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-gray-300">{category.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Categories; 