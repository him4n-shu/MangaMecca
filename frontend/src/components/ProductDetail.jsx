import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ReviewList from './reviews/ReviewList';
import OptimizedImage from './common/OptimizedImage';

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
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('description');

    useEffect(() => {
        setLoading(true);
        console.log("Looking for product:", { category, productId });

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
        console.log("Category products:", categoryProducts);

        const foundProduct = categoryProducts.find(p => p.id === productIdNumber);
        console.log("Found product:", foundProduct);

        if (foundProduct) {
            // Add more detailed information to product
            setProduct({
                ...foundProduct,
                description: getProductDescription(foundProduct, category),
                specifications: getProductSpecifications(foundProduct, category),
                relatedProducts: getRelatedProducts(foundProduct, category, categoryProducts)
            });
        }
        
        setLoading(false);
    }, [category, productId]);

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
        <div className="max-w-[1200px] mx-auto px-4 py-12">
            {/* Breadcrumb */}
            <div className="mb-8">
                <nav className="flex" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <a href="/" className="text-gray-400 hover:text-white">Home</a>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="w-3 h-3 text-gray-500 mx-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                </svg>
                                <a href={`/${category}`} className="text-gray-400 hover:text-white capitalize">{category.replace('-', ' ')}</a>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="w-3 h-3 text-gray-500 mx-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                </svg>
                                <span className="text-gray-500">{product.title}</span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                {/* Product Image */}
                <div data-aos="fade-right">
                    <div className="relative aspect-square overflow-hidden rounded-lg shadow-xl bg-gray-900">
                        <OptimizedImage 
                            src={product.image} 
                            alt={product.title}
                            className="w-full h-full p-4"
                            objectFit="contain"
                            priority={true} // Always load main product image with priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>

                {/* Product Info */}
                <div data-aos="fade-left" className="space-y-6">
                    <h1 className="text-4xl font-bold text-white">{product.title}</h1>
                    
                    <div className="flex items-center space-x-4">
                        <span className="text-3xl font-bold text-white">Rs. {product.salePrice.toFixed(2)}</span>
                        <span className="text-xl text-gray-400 line-through">Rs. {product.regularPrice.toFixed(2)}</span>
                        <span className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-3 py-1 rounded-full text-sm">
                            {Math.round((1 - product.salePrice / product.regularPrice) * 100)}% OFF
                        </span>
                    </div>
                    
                    <div className="flex flex-col space-y-4">
                        {/* Quantity Selector */}
                        <div className="flex items-center space-x-4">
                            <span className="text-white">Quantity:</span>
                            <div className="flex items-center">
                                <button 
                                    className="w-8 h-8 bg-gray-800 rounded-l-lg flex items-center justify-center text-white hover:bg-gray-700"
                                    onClick={() => handleQuantityChange(quantity - 1)}
                                    disabled={quantity <= 1}
                                >
                                    -
                                </button>
                                <input 
                                    type="number" 
                                    min="1" 
                                    value={quantity} 
                                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                                    className="w-12 h-8 bg-gray-800 text-center text-white border-none"
                                />
                                <button 
                                    className="w-8 h-8 bg-gray-800 rounded-r-lg flex items-center justify-center text-white hover:bg-gray-700"
                                    onClick={() => handleQuantityChange(quantity + 1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        
                        {/* Add to Cart Button */}
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-8 rounded-lg text-lg font-semibold flex items-center justify-center"
                            onClick={handleAddToCart}
                        >
                            {buttonText}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Product Tabs (Description, Specifications) */}
            <div className="mt-12">
                <div className="border-b border-gray-700 mb-4">
                    <nav className="flex space-x-8">
                        <button
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'description'
                                    ? 'border-purple-500 text-white'
                                    : 'border-transparent text-gray-400 hover:text-gray-300'
                            }`}
                            onClick={() => setActiveTab('description')}
                        >
                            Description
                        </button>
                        <button
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'specifications'
                                    ? 'border-purple-500 text-white'
                                    : 'border-transparent text-gray-400 hover:text-gray-300'
                            }`}
                            onClick={() => setActiveTab('specifications')}
                        >
                            Specifications
                        </button>
                    </nav>
                </div>

                <div className="py-4">
                    {activeTab === 'description' ? (
                        <div className="prose prose-invert max-w-none">
                            <p className="text-gray-300">{product.description}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {Object.entries(product.specifications).map(([key, value]) => (
                                <div key={key} className="border-b border-gray-700 pb-3">
                                    <dt className="text-gray-400 text-sm">{key}</dt>
                                    <dd className="mt-1 text-white">{value}</dd>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Reviews Section */}
            <ReviewList productId={productId} />

            {/* Related Products */}
            <div className="mt-16">
                <h2 className="text-2xl font-bold text-white mb-6">You May Also Like</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {product.relatedProducts.map((relatedProduct) => (
                        <motion.div
                            key={relatedProduct.id}
                            className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
                            whileHover={{ y: -5 }}
                            onClick={() => navigate(`/${category}/${relatedProduct.id}`)}
                        >
                            <OptimizedImage
                                src={relatedProduct.image}
                                alt={relatedProduct.title}
                                className="w-full h-48"
                                objectFit="cover"
                                sizes="(max-width: 768px) 50vw, 25vw"
                            />
                            <div className="p-4">
                                <h3 className="text-white font-medium truncate">{relatedProduct.title}</h3>
                                <div className="flex items-center space-x-2 mt-1">
                                    <p className="text-gray-400 line-through text-sm">Rs. {relatedProduct.regularPrice.toFixed(2)}</p>
                                    <p className="text-white font-semibold">Rs. {relatedProduct.salePrice.toFixed(2)}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail; 