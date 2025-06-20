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
    resetFilters
}) => {
    if (!show) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-24 px-4">
            <motion.div
                ref={filterRef}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gray-900 p-6 rounded-lg shadow-xl w-full max-w-md"
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">FILTERS</h3>
                    <button 
                        onClick={resetFilters}
                        className="text-sm text-purple-400 hover:text-purple-300"
                    >
                        Reset All
                    </button>
                </div>
                
                {/* Price Range Filter */}
                <div className="mb-6">
                    <h4 className="text-white font-medium mb-2">Price Range</h4>
                    <div className="flex flex-col space-y-2">
                        <div className="flex justify-between text-sm text-gray-400">
                            <span>Rs. {priceRange[0]}</span>
                            <span>Rs. {priceRange[1]}</span>
                        </div>
                        <input 
                            type="range" 
                            min="0" 
                            max={Math.max(...products.map(product => product.regularPrice))} 
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                            className="w-full accent-purple-500"
                        />
                    </div>
                </div>
                
                {/* Category Filter - only show if categories exist */}
                {availableCategories.length > 0 && (
                    <div className="mb-6">
                        <h4 className="text-white font-medium mb-2">Categories</h4>
                        <div className="space-y-2">
                            {availableCategories.map((category, index) => (
                                <div key={index} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`category-${index}`}
                                        checked={selectedCategories.includes(category)}
                                        onChange={() => handleCategoryChange(category)}
                                        className="mr-2 accent-purple-500"
                                    />
                                    <label htmlFor={`category-${index}`} className="text-gray-300 capitalize">
                                        {category}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {/* Vendor Filter */}
                <div className="mb-6">
                    <h4 className="text-white font-medium mb-2">Vendor</h4>
                    <div className="space-y-2">
                        {vendors.map((vendor, index) => (
                            <div key={index} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`vendor-${index}`}
                                    checked={selectedVendors.includes(vendor)}
                                    onChange={() => handleVendorChange(vendor)}
                                    className="mr-2 accent-purple-500"
                                />
                                <label htmlFor={`vendor-${index}`} className="text-gray-300">
                                    {vendor}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="flex justify-end">
                    <button 
                        onClick={onClose}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 px-4 rounded-lg text-sm font-medium"
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
            default: // featured - default sort
                // Keep as is - featuring sorting is determined by the initial order
                break;
        }
        
        setFilteredProducts(result);
    }, [priceRange, sortBy, selectedCategories, selectedVendors, products, setFilteredProducts]);

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
        setSortBy('featured');
    };

    return (
        <div className="mb-8 relative">
            <div className="flex justify-between items-center">
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center space-x-2 text-white bg-gray-800 hover:bg-gray-700 py-2 px-4 rounded-lg transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    <span>Filters</span>
                </button>
                
                <div className="flex items-center space-x-2">
                    <label htmlFor="sort" className="text-white">Sort by:</label>
                    <select
                        id="sort"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-gray-800 text-white py-2 px-4 rounded-lg border-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="featured">Featured</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="newest">Newest</option>
                        <option value="popular">Most Popular</option>
                        <option value="discount">Biggest Discount</option>
                    </select>
                </div>
            </div>
            
            <AnimatePresence>
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
                    resetFilters={resetFilters}
                />
            </AnimatePresence>
        </div>
    );
};

export default FilterSort; 