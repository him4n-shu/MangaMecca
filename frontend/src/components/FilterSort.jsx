import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactDOM from 'react-dom';

// Filter dropdown component that will be rendered in a portal
const FilterDropdown = ({ 
    show, 
    onClose, 
    filterRef, 
    products, 
    priceRange, 
    setPriceRange, 
    selectedCategories, 
    handleCategoryChange, 
    availableCategories,
    vendors,
    selectedVendors,
    handleVendorChange,
    minRating,
    setMinRating,
    resetFilters
}) => {
    if (!show) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-16 md:pt-24 px-4">
            <motion.div
                ref={filterRef}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gray-900 p-4 md:p-6 rounded-lg shadow-xl w-full max-w-md max-h-[80vh] overflow-y-auto"
            >
                <div className="flex justify-between items-center mb-4 md:mb-6">
                    <h3 className="text-lg md:text-xl font-bold text-white">FILTERS</h3>
                    <button 
                        onClick={resetFilters}
                        className="text-xs md:text-sm text-purple-400 hover:text-purple-300 focus-visible"
                    >
                        Reset All
                    </button>
                </div>
                
                {/* Price Range Filter */}
                <div className="mb-4 md:mb-6">
                    <h4 className="text-sm md:text-base text-white font-medium mb-2">Price Range</h4>
                    <div className="flex flex-col space-y-2">
                        <div className="flex justify-between text-xs md:text-sm text-gray-400">
                            <span>Rs. {priceRange[0]}</span>
                            <span>Rs. {priceRange[1]}</span>
                        </div>
                        <input 
                            type="range" 
                            min="0" 
                            max={Math.max(...products.map(product => product.regularPrice))} 
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                            className="w-full accent-purple-500 tap-target"
                        />
                    </div>
                </div>
                
                {/* Rating Filter */}
                <div className="mb-4 md:mb-6">
                    <h4 className="text-sm md:text-base text-white font-medium mb-2">Minimum Rating</h4>
                    <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                                key={rating}
                                onClick={() => setMinRating(rating)}
                                className={`flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded ${
                                    minRating === rating ? 'bg-purple-600' : 'bg-gray-800'
                                } tap-target focus-visible`}
                                aria-label={`Set minimum rating to ${rating}`}
                            >
                                <span className={`text-xs md:text-sm ${minRating === rating ? 'text-white' : 'text-gray-400'}`}>
                                    {rating}★
                                </span>
                            </button>
                        ))}
                        {minRating > 0 && (
                            <button
                                onClick={() => setMinRating(0)}
                                className="text-xs text-purple-400 hover:text-purple-300 ml-2 focus-visible"
                                aria-label="Clear rating filter"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>
                
                {/* Category Filter - only show if categories exist */}
                {availableCategories.length > 0 && (
                    <div className="mb-4 md:mb-6">
                        <h4 className="text-sm md:text-base text-white font-medium mb-2">Categories</h4>
                        <div className="space-y-1 md:space-y-2 max-h-40 overflow-y-auto pr-2">
                            {availableCategories.map((category, index) => (
                                <div key={index} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`category-${index}`}
                                        checked={selectedCategories.includes(category)}
                                        onChange={() => handleCategoryChange(category)}
                                        className="mr-2 accent-purple-500 w-4 h-4"
                                    />
                                    <label htmlFor={`category-${index}`} className="text-sm md:text-base text-gray-300 capitalize">
                                        {category}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {/* Vendor Filter */}
                <div className="mb-4 md:mb-6">
                    <h4 className="text-sm md:text-base text-white font-medium mb-2">Vendor</h4>
                    <div className="space-y-1 md:space-y-2 max-h-40 overflow-y-auto pr-2">
                        {vendors.map((vendor, index) => (
                            <div key={index} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`vendor-${index}`}
                                    checked={selectedVendors.includes(vendor)}
                                    onChange={() => handleVendorChange(vendor)}
                                    className="mr-2 accent-purple-500 w-4 h-4"
                                />
                                <label htmlFor={`vendor-${index}`} className="text-sm md:text-base text-gray-300">
                                    {vendor}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="flex justify-end">
                    <button 
                        onClick={onClose}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 px-4 rounded-lg text-sm font-medium tap-target focus-visible"
                    >
                        Apply Filters
                    </button>
                </div>
            </motion.div>
        </div>,
        document.body
    );
};

const FilterSort = ({ products, setFilteredProducts }) => {
    // State for filters and sort
    const [priceRange, setPriceRange] = useState([0, 2000]);
    const [sortBy, setSortBy] = useState('featured');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [availableCategories, setAvailableCategories] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [vendors, setVendors] = useState([]);
    const [selectedVendors, setSelectedVendors] = useState([]);
    const [minRating, setMinRating] = useState(0);
    
    const filterRef = useRef(null);

    // Extract unique categories and vendors when products change
    useEffect(() => {
        if (products && products.length > 0) {
            // Get unique categories if they exist in products
            if (products[0].category) {
                const categories = [...new Set(products.map(product => product.category))];
                setAvailableCategories(categories);
            }
            
            // Get unique vendors
            const uniqueVendors = [...new Set(products.map(product => product.vendor))];
            setVendors(uniqueVendors);
            
            // Find max price for range
            const maxPrice = Math.max(...products.map(product => product.regularPrice));
            setPriceRange([0, maxPrice]);
        }
    }, [products]);

    // Close filters when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setShowFilters(false);
            }
        };
        
        if (showFilters) {
            document.addEventListener('mousedown', handleClickOutside);
            // Prevent body scrolling when filter is open
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'auto';
        };
    }, [showFilters]);

    // Apply filters and sort
    useEffect(() => {
        if (!products) return;
        
        let result = [...products];
        
        // Apply price filter
        result = result.filter(
            product => product.salePrice >= priceRange[0] && product.salePrice <= priceRange[1]
        );
        
        // Apply category filter if selected
        if (selectedCategories.length > 0) {
            result = result.filter(product => selectedCategories.includes(product.category));
        }
        
        // Apply vendor filter if selected
        if (selectedVendors.length > 0) {
            result = result.filter(product => selectedVendors.includes(product.vendor));
        }
        
        // Apply rating filter
        if (minRating > 0) {
            result = result.filter(product => (product.rating || 0) >= minRating);
        }
        
        // Apply sorting
        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.salePrice - b.salePrice);
                break;
            case 'price-desc':
                result.sort((a, b) => b.salePrice - a.salePrice);
                break;
            case 'newest':
                // Simulated - in a real app, would sort by release date
                result.sort((a, b) => b.id - a.id);
                break;
            case 'popular':
                // Simulated - in a real app, would sort by popularity data
                result.sort((a, b) => (b.salePrice / b.regularPrice) - (a.salePrice / a.regularPrice));
                break;
            case 'discount':
                result.sort((a, b) => {
                    const discountA = (a.regularPrice - a.salePrice) / a.regularPrice;
                    const discountB = (b.regularPrice - b.salePrice) / b.regularPrice;
                    return discountB - discountA;
                });
                break;
            case 'rating-desc':
                result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            default: // featured - default sort
                // Keep as is - featuring sorting is determined by the initial order
                break;
        }
        
        setFilteredProducts(result);
    }, [priceRange, sortBy, selectedCategories, selectedVendors, minRating, products, setFilteredProducts]);

    const handleCategoryChange = (category) => {
        setSelectedCategories(prev => {
            if (prev.includes(category)) {
                return prev.filter(c => c !== category);
            } else {
                return [...prev, category];
            }
        });
    };
    
    const handleVendorChange = (vendor) => {
        setSelectedVendors(prev => {
            if (prev.includes(vendor)) {
                return prev.filter(v => v !== vendor);
            } else {
                return [...prev, vendor];
            }
        });
    };

    const resetFilters = () => {
        setPriceRange([0, Math.max(...products.map(product => product.regularPrice))]);
        setSelectedCategories([]);
        setSelectedVendors([]);
        setMinRating(0);
        setSortBy('featured');
    };

    return (
        <div className="mb-6">
            <div className="flex flex-wrap gap-2 md:gap-4 items-center justify-between">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowFilters(true)}
                        className="flex items-center space-x-1 md:space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm tap-target focus-visible"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                        <span>Filter</span>
                        {(selectedCategories.length > 0 || selectedVendors.length > 0 || minRating > 0 || priceRange[1] < Math.max(...products.map(product => product.regularPrice))) && (
                            <span className="bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-1">
                                !
                            </span>
                        )}
                    </button>
                    
                    <div className="hidden md:flex items-center">
                        {/* Filter tags - only show on larger screens */}
                        {selectedCategories.length > 0 && (
                            <div className="flex items-center bg-gray-800 text-white px-2 py-1 rounded text-xs">
                                <span>{selectedCategories.length} {selectedCategories.length === 1 ? 'category' : 'categories'}</span>
                                <button 
                                    onClick={() => setSelectedCategories([])} 
                                    className="ml-1 text-gray-400 hover:text-white focus-visible"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        )}
                        
                        {selectedVendors.length > 0 && (
                            <div className="flex items-center bg-gray-800 text-white px-2 py-1 rounded text-xs ml-2">
                                <span>{selectedVendors.length} {selectedVendors.length === 1 ? 'vendor' : 'vendors'}</span>
                                <button 
                                    onClick={() => setSelectedVendors([])} 
                                    className="ml-1 text-gray-400 hover:text-white focus-visible"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        )}
                        
                        {minRating > 0 && (
                            <div className="flex items-center bg-gray-800 text-white px-2 py-1 rounded text-xs ml-2">
                                <span>★ {minRating}+</span>
                                <button 
                                    onClick={() => setMinRating(0)} 
                                    className="ml-1 text-gray-400 hover:text-white focus-visible"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="relative">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="appearance-none bg-gray-800 text-white px-3 py-1.5 md:px-4 md:py-2 pr-8 rounded-lg text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 tap-target"
                    >
                        <option value="featured">Featured</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="newest">Newest</option>
                        <option value="popular">Popular</option>
                        <option value="discount">Biggest Discount</option>
                    </select>
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>
            
            {/* Mobile active filters indicator */}
            <div className="flex md:hidden mt-2 flex-wrap gap-1">
                {selectedCategories.length > 0 && (
                    <div className="text-xs text-gray-400">
                        {selectedCategories.length} {selectedCategories.length === 1 ? 'category' : 'categories'}
                    </div>
                )}
                
                {selectedVendors.length > 0 && (
                    <div className="text-xs text-gray-400 ml-1">
                        {selectedVendors.length} {selectedVendors.length === 1 ? 'vendor' : 'vendors'}
                    </div>
                )}
                
                {minRating > 0 && (
                    <div className="text-xs text-gray-400 ml-1">
                        ★ {minRating}+
                    </div>
                )}
                
                {(selectedCategories.length > 0 || selectedVendors.length > 0 || minRating > 0) && (
                    <button 
                        onClick={resetFilters}
                        className="text-xs text-purple-400 hover:text-purple-300 ml-1 focus-visible"
                    >
                        Clear all
                    </button>
                )}
            </div>
            
            <AnimatePresence>
                {showFilters && (
                    <FilterDropdown
                        show={showFilters}
                        onClose={() => setShowFilters(false)}
                        filterRef={filterRef}
                        products={products}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        selectedCategories={selectedCategories}
                        handleCategoryChange={handleCategoryChange}
                        availableCategories={availableCategories}
                        vendors={vendors}
                        selectedVendors={selectedVendors}
                        handleVendorChange={handleVendorChange}
                        minRating={minRating}
                        setMinRating={setMinRating}
                        resetFilters={resetFilters}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default FilterSort; 