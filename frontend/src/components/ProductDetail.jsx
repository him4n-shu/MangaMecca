import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import ReviewList from './reviews/ReviewList';
import OptimizedImage from './common/OptimizedImage';
import Breadcrumb from './common/Breadcrumb';
import RecentlyViewed from './RecentlyViewed';
import ProductRecommendations from './ProductRecommendations';

// Import all product data
import { mangaItems } from './MangaSection';
import { comicsItems } from './ComicsSection';
import { posterItems } from './PostersSection';
import { figureItems } from './ActionFiguresSection';
import { keychainItems } from './KeychainsSection';

const ProductDetail = () => {
    const { category, productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [buttonText, setButtonText] = useState('Add to Cart');
    const { addToCart, cart } = useCart();
    const { user } = useAuth();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const { addToRecentlyViewed } = useRecentlyViewed();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('description');

    useEffect(() => {
        setLoading(true);

        // Get all products combined
        const allProducts = {
            manga: mangaItems,
            comics: comicsItems,
            posters: posterItems,
            'action-figures': figureItems,
            keychains: keychainItems
        };

        const productIdNumber = parseInt(productId, 10);
        
        // Find the product in the appropriate category
        const categoryProducts = allProducts[category] || [];

        const foundProduct = categoryProducts.find(p => p.id === productIdNumber);

        if (foundProduct) {
            // Add more detailed information to product
            const enhancedProduct = {
                ...foundProduct,
                description: getProductDescription(foundProduct, category),
                specifications: getProductSpecifications(foundProduct, category),
                relatedProducts: getRelatedProducts(foundProduct, category, categoryProducts),
                category: category // Ensure category is included
            };
            
            setProduct(enhancedProduct);
            
            // Add to recently viewed
            addToRecentlyViewed(enhancedProduct);
        }
        
        setLoading(false);
    }, [category, productId, addToRecentlyViewed]);

    // Function to generate product descriptions
    const getProductDescription = (product, category) => {
        switch (category) {
            case 'manga':
                return `Experience the captivating story of ${product.title}. This volume takes readers on an epic journey with stunning artwork and compelling storytelling that fans have come to love. Follow the main characters through their adventures in a world full of action, emotion, and unexpected twists. This manga volume is beautifully illustrated with attention to detail that brings the story to life. A must-have for any manga collection and perfect for both newcomers and longtime fans of the series.`;
            
            case 'comics':
                return `Dive into the action-packed world of ${product.title}. Featuring iconic characters and breathtaking artwork by renowned artists, this comic book stands as a milestone in the superhero genre. The story combines thrilling action sequences with thought-provoking themes and character development that has made this title a fan-favorite. Each page brings stunning visuals and compelling storytelling that will keep you engaged from cover to cover. Whether you're a longtime collector or new to comics, this issue is essential reading.`;
            
            case 'posters':
                return `Decorate your space with this high-quality ${product.title}. Printed on premium paper with vibrant colors that won't fade, this poster captures iconic imagery that fans will instantly recognize. The poster features stunning artwork with rich detail and vibrant colors that pop against any wall. Perfect for fans who want to showcase their passion for anime and manga in their home, office, or dorm room. This officially licensed poster is a collector's item that maintains its quality and appearance over time.`;
            
            case 'action-figures':
                return `Add this highly detailed ${product.title} to your collection. Featuring multiple points of articulation and screen-accurate design, this figure captures the essence of the character perfectly. The figure is crafted with premium materials and hand-painted with precision to ensure every detail from the anime/manga is represented. The figure comes in a display-ready pose but can be adjusted to create dynamic action scenes. Collectors and fans alike will appreciate the attention to detail and quality craftsmanship of this limited edition figure.`;
            
            case 'keychains':
                return `Carry your favorite character wherever you go with this ${product.title}. Made from durable materials with fine attention to detail, this keychain features a high-quality metal ring and clasp that securely attaches to your keys or bag. The character design is faithful to the original artwork and created with durable materials that resist wear and fading. This keychain is both a practical accessory and a great collectible for fans who want to show their love for the series in their everyday life.`;
            
            default:
                return 'A high-quality product for anime and manga enthusiasts, featuring excellent craftsmanship and attention to detail that fans have come to expect from MangaMecca. This officially licensed item is perfect for collectors and casual fans alike.';
        }
    };

    // Function to generate product specifications
    const getProductSpecifications = (product, category) => {
        switch (category) {
            case 'manga':
                return {
                    "Publisher": "MangaMecca Publishing",
                    "Language": "English",
                    "Paperback": "192-224 pages",
                    "Dimensions": "5 x 7.5 inches",
                    "ISBN": `978-1-234567-${Math.floor(Math.random() * 90) + 10}-${Math.floor(Math.random() * 9)}`,
                    "Release Date": "2023",
                    "Age Rating": "Teen (13+)",
                    "Series": product.title.split("Vol.")[0].trim(),
                    "Volume": product.title.includes("Vol.") ? product.title.split("Vol.")[1].trim() : "1"
                };
                
            case 'comics':
                return {
                    "Publisher": "MangaMecca Comics",
                    "Language": "English",
                    "Paperback": "32-48 pages",
                    "Dimensions": "6.625 x 10.25 inches",
                    "ISBN": `978-1-234567-${Math.floor(Math.random() * 90) + 10}-${Math.floor(Math.random() * 9)}`,
                    "Release Date": "2023",
                    "Age Rating": "Teen (13+)",
                    "Creator": "Various Top Industry Artists",
                    "Edition": "First Edition"
                };
                
            case 'posters':
                return {
                    "Material": "Premium 250gsm Glossy Paper",
                    "Dimensions": "24 x 36 inches",
                    "Finish": "Semi-Gloss",
                    "Printed in": "Japan",
                    "SKU": `POSTER-${Math.floor(Math.random() * 10000)}`,
                    "Officially Licensed": "Yes",
                    "Includes": "Mounting Suggestions",
                    "Frame": "Not Included, Sold Separately"
                };
                
            case 'action-figures':
                return {
                    "Material": "High-Quality PVC & ABS",
                    "Height": "7-9 inches",
                    "Points of Articulation": "20+",
                    "Manufacturer": "MangaMecca Toys",
                    "Release Date": "2023",
                    "SKU": `FIGURE-${Math.floor(Math.random() * 10000)}`,
                    "Accessories Included": "Character-Specific Accessories & Stand",
                    "Series": product.title.replace("Figure", "").trim(),
                    "Limited Edition": "Yes"
                };
                
            case 'keychains':
                return {
                    "Material": "Metal & PVC",
                    "Length": "2.5 inches",
                    "Weight": "30g",
                    "Manufacturer": "MangaMecca Accessories",
                    "SKU": `KEYCHAIN-${Math.floor(Math.random() * 10000)}`,
                    "Clasp Type": "Spring-Loaded",
                    "Officially Licensed": "Yes",
                    "Packaging": "Collector's Box"
                };
                
            default:
                return {
                    "Brand": "MangaMecca",
                    "Material": "Premium Quality",
                    "Made In": "Japan",
                    "SKU": `ITEM-${Math.floor(Math.random() * 10000)}`,
                    "Officially Licensed": "Yes"
                };
        }
    };

    // Function to get 4 related products from the same category
    const getRelatedProducts = (product, category, categoryProducts) => {
        // Filter out current product and get up to 4 random products
        const filtered = categoryProducts.filter(p => p.id !== product.id);
        
        // If we have less than 4 products after filtering, return all
        if (filtered.length <= 4) return filtered;
        
        // Otherwise, shuffle and return 4
        return [...filtered]
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);
    };

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        if (!user) {
            navigate('/login');
            return;
        }

        if (product) {
            // Add product to cart with specified quantity
            for (let i = 0; i < quantity; i++) {
                addToCart(product);
            }
            
            setButtonText('Added to Cart!');
            setTimeout(() => {
                setButtonText('Add to Cart');
            }, 2000);
        }
    };

    const handleToggleWishlist = () => {
        if (!user) {
            navigate('/login');
            return;
        }

        if (product) {
            if (isInWishlist(product.id)) {
                removeFromWishlist(product.id);
            } else {
                addToWishlist(product);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="max-w-[1200px] mx-auto px-4 py-12 text-center">
                <h1 className="text-3xl font-bold text-white mb-6">PRODUCT NOT FOUND</h1>
                <p className="text-gray-400 mb-8">Sorry, we couldn't find the product you're looking for.</p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg"
                    onClick={() => navigate(-1)}
                >
                    Go Back
                </motion.button>
            </div>
        );
    }

    return (
        <div className="container-padding max-w-[1200px] mx-auto py-6 md:py-12">
            {/* Breadcrumb */}
            <Breadcrumb items={[
                { label: 'Home', path: '/' },
                { label: category.charAt(0).toUpperCase() + category.slice(1), path: `/${category}` },
                { label: product.title, path: null }
            ]} />

            {/* Product Main Section */}
            <div className="mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Product Image */}
                <div className="relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <OptimizedImage
                            src={product.image}
                            alt={product.title}
                            className="w-full rounded-lg shadow-lg"
                            priority={true}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    </motion.div>
                </div>

                {/* Product Info */}
                <div className="space-y-4 md:space-y-6">
                    <motion.h1 
                        className="text-2xl md:text-4xl font-bold text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {product.title}
                    </motion.h1>

                    <motion.div 
                        className="flex flex-wrap items-center gap-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg key={star} className={`w-5 h-5 ${star <= (product.rating || 4) ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                            <span className="ml-2 text-gray-300 text-sm">({Math.floor(Math.random() * 50) + 10} reviews)</span>
                        </div>
                        <span className="px-2 py-1 bg-purple-900 bg-opacity-40 text-purple-300 text-xs rounded-full">
                            {product.category}
                        </span>
                    </motion.div>

                    <motion.div 
                        className="flex items-center space-x-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <p className="text-3xl font-bold text-white">Rs. {product.salePrice.toFixed(2)}</p>
                        <p className="text-xl text-gray-400 line-through">Rs. {product.regularPrice.toFixed(2)}</p>
                        <span className="px-2 py-1 bg-green-900 bg-opacity-40 text-green-300 text-xs rounded-full">
                            {Math.round((1 - product.salePrice / product.regularPrice) * 100)}% OFF
                        </span>
                    </motion.div>

                    <motion.div 
                        className="pt-4 border-t border-gray-800"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <p className="text-gray-300 text-sm md:text-base">
                            {product.description.substring(0, 150)}...
                        </p>
                    </motion.div>

                    <motion.div 
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <div className="flex items-center border border-gray-700 rounded-lg">
                            <button 
                                className="px-3 py-2 text-white hover:bg-gray-800 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500 tap-target"
                                onClick={() => handleQuantityChange(quantity - 1)}
                                disabled={quantity <= 1}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                            </button>
                            <span className="px-4 py-2 text-white">{quantity}</span>
                            <button 
                                className="px-3 py-2 text-white hover:bg-gray-800 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-purple-500 tap-target"
                                onClick={() => handleQuantityChange(quantity + 1)}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg shadow-lg hover:shadow-purple-500/20 transition-all duration-300 text-sm md:text-base font-medium tap-target"
                            onClick={handleAddToCart}
                        >
                            {buttonText}
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`p-3 rounded-lg ${isInWishlist(product.id) ? 'bg-pink-600 text-white' : 'bg-gray-800 text-gray-300'} hover:bg-pink-600 hover:text-white transition-colors duration-300 tap-target`}
                            onClick={handleToggleWishlist}
                        >
                            <svg className="w-6 h-6" fill={isInWishlist(product.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </motion.button>
                    </motion.div>

                    <motion.div 
                        className="pt-4 text-sm text-gray-400"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <p>Vendor: <span className="text-white">{product.vendor}</span></p>
                        <p>SKU: <span className="text-white">MM-{category.substring(0, 3).toUpperCase()}-{product.id}</span></p>
                        <p>Availability: <span className="text-green-400">In Stock</span></p>
                    </motion.div>
                </div>
            </div>

            {/* Product Tabs */}
            <div className="mt-12 border-t border-gray-800 pt-8">
                <div className="flex flex-wrap gap-2 border-b border-gray-800">
                    <button 
                        className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-200 ${activeTab === 'description' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'}`}
                        onClick={() => setActiveTab('description')}
                    >
                        Description
                    </button>
                    <button 
                        className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-200 ${activeTab === 'specifications' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'}`}
                        onClick={() => setActiveTab('specifications')}
                    >
                        Specifications
                    </button>
                    <button 
                        className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-200 ${activeTab === 'reviews' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'}`}
                        onClick={() => setActiveTab('reviews')}
                    >
                        Reviews
                    </button>
                </div>

                <div className="py-6">
                    {activeTab === 'description' && (
                        <div className="text-gray-300 space-y-4">
                            <p>{product.description}</p>
                        </div>
                    )}
                    
                    {activeTab === 'specifications' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(product.specifications).map(([key, value]) => (
                                <div key={key} className="flex">
                                    <span className="w-1/2 text-gray-400">{key}:</span>
                                    <span className="w-1/2 text-white">{value}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {activeTab === 'reviews' && (
                        <ReviewList productId={product.id} />
                    )}
                </div>
            </div>

            {/* Related Products */}
            {product.relatedProducts && product.relatedProducts.length > 0 && (
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-white mb-6">Related Products</h2>
                    <div className="responsive-grid">
                        {product.relatedProducts.map((item) => (
                            <motion.div
                                key={item.id}
                                className="group relative"
                                whileHover={{ scale: 1.03 }}
                            >
                                <Link to={`/${category}/${item.id}`} className="block">
                                    <div className="relative">
                                        <OptimizedImage
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full aspect-portrait rounded"
                                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
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
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* Recently Viewed */}
            <RecentlyViewed currentProductId={product.id} />
        </div>
    );
};

export default ProductDetail; 