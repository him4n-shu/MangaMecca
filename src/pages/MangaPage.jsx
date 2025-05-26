import React from 'react';
import { motion } from 'framer-motion';
import MangaSection from '../components/MangaSection';

const MangaPage = () => {
    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-4">Manga Collection</h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Discover our extensive collection of manga from popular series to hidden gems.
                    From action-packed adventures to heartwarming stories, find your next favorite read.
                </p>
            </div>
            <MangaSection />
        </div>
    );
};

export default MangaPage; 