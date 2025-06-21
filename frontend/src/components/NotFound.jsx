import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="container-padding min-h-[70vh] flex flex-col items-center justify-center text-center py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md"
      >
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold text-purple-500 mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Page Not Found</h2>
          <p className="text-gray-400 mb-8">
            Oops! The page you're looking for seems to have vanished into another dimension.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg w-full sm:w-auto"
            >
              Back to Home
            </motion.button>
          </Link>
          
          <Link to="/categories">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg w-full sm:w-auto"
            >
              Browse Categories
            </motion.button>
          </Link>
        </div>
        
        <div className="mt-12 text-gray-500 text-sm">
          <p>Lost? Here are some helpful links:</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4">
            <Link to="/manga" className="text-purple-400 hover:text-purple-300">Manga</Link>
            <Link to="/comics" className="text-purple-400 hover:text-purple-300">Comics</Link>
            <Link to="/posters" className="text-purple-400 hover:text-purple-300">Posters</Link>
            <Link to="/action-figures" className="text-purple-400 hover:text-purple-300">Action Figures</Link>
            <Link to="/keychains" className="text-purple-400 hover:text-purple-300">Keychains</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound; 