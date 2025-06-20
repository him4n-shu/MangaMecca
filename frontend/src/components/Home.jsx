import React, { useEffect } from 'react';
import AOS from 'aos';
import BestSellersSection from './BestSellersSection';
import MangaSection from './MangaSection';
import ComicsSection from './ComicsSection';
import PostersSection from './PostersSection';
import ActionFiguresSection from './ActionFiguresSection';
import KeychainsSection from './KeychainsSection';

const Home = () => {
    useEffect(() => {
        AOS.refresh();
    }, []);

    return (
        <div className="max-w-[1400px] mx-auto px-8 py-8">
            <div className="space-y-24">
                <div data-aos="fade-up" data-aos-duration="1000">
                    <BestSellersSection />
                </div>
                <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                    <MangaSection />
                </div>
                <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
                    <ComicsSection />
                </div>
                <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                    <PostersSection />
                </div>
                <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500">
                    <ActionFiguresSection />
                </div>
                <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
                    <KeychainsSection />
                </div>
            </div>
        </div>
    );
};

export default Home; 