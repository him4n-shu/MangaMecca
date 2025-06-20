import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const OptimizedImage = ({
    src,
    alt,
    className = '',
    width,
    height,
    sizes = '100vw',
    priority = false,
    onClick,
    placeholderColor = '#1f2937',
    animation = true,
    objectFit = 'cover'
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    
    // Set up intersection observer to detect when image is in viewport
    useEffect(() => {
        if (!priority && 'IntersectionObserver' in window) {
            const imageElement = document.getElementById(`image-${src.replace(/[^a-zA-Z0-9]/g, '-')}`);
            
            if (imageElement) {
                const observer = new IntersectionObserver(
                    (entries) => {
                        if (entries[0].isIntersecting) {
                            setIsInView(true);
                            observer.disconnect();
                        }
                    },
                    { rootMargin: '200px' } // Start loading when image is 200px from viewport
                );
                
                observer.observe(imageElement);
                
                return () => {
                    if (imageElement) {
                        observer.unobserve(imageElement);
                    }
                };
            }
        } else {
            // If priority is true or IntersectionObserver not supported, load immediately
            setIsInView(true);
        }
    }, [src, priority]);

    // Calculate aspect ratio for placeholder
    const aspectRatio = height && width ? (height / width) * 100 : 100;
    
    // Generate srcset for responsive images
    const generateSrcSet = () => {
        // Extract the file extension and path
        const lastDotIndex = src.lastIndexOf('.');
        if (lastDotIndex === -1) return src;
        
        const extension = src.substring(lastDotIndex);
        const basePath = src.substring(0, lastDotIndex);
        
        // Generate srcset with different sizes
        return `
            ${basePath}-small${extension} 400w,
            ${basePath}-medium${extension} 800w,
            ${src} 1200w
        `;
    };
    
    // Handle image load complete
    const handleImageLoaded = () => {
        setIsLoaded(true);
    };
    
    return (
        <div 
            id={`image-${src.replace(/[^a-zA-Z0-9]/g, '-')}`}
            className={`relative overflow-hidden ${className}`}
            style={{ 
                paddingBottom: `${aspectRatio}%`,
                background: placeholderColor,
                width: width ? `${width}px` : '100%',
                height: height ? `${height}px` : 'auto',
                cursor: onClick ? 'pointer' : 'default'
            }}
            onClick={onClick}
        >
            {(isInView || priority) && (
                <motion.img
                    src={src}
                    alt={alt}
                    loading={priority ? 'eager' : 'lazy'}
                    onLoad={handleImageLoaded}
                    initial={animation ? { opacity: 0 } : { opacity: 1 }}
                    animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectFit }}
                    sizes={sizes}
                    srcSet={generateSrcSet()}
                />
            )}
            
            {/* Placeholder shimmer effect */}
            {!isLoaded && (
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
            )}
        </div>
    );
};

export default OptimizedImage; 