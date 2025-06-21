import React, { useState, useEffect, useRef } from 'react';
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
    objectFit = 'cover',
    blurDataUrl = null,
    loading = 'lazy'
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const imageRef = useRef(null);
    
    // Set up intersection observer to detect when image is in viewport
    useEffect(() => {
        if (!priority && 'IntersectionObserver' in window) {
            const observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        setIsInView(true);
                        observer.disconnect();
                    }
                },
                { 
                    rootMargin: '300px', // Increased from 200px for earlier loading
                    threshold: 0.01 // Trigger when even 1% of the image is visible
                }
            );
            
            if (imageRef.current) {
                observer.observe(imageRef.current);
            }
            
            return () => {
                if (imageRef.current) {
                    observer.unobserve(imageRef.current);
                }
            };
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
        
        // Check if -small and -medium versions exist
        const hasSmall = basePath.includes('-small') ? false : true;
        const hasMedium = basePath.includes('-medium') ? false : true;
        
        // Generate srcset with different sizes
        return `
            ${hasSmall ? `${basePath}-small${extension} 400w,` : ''}
            ${hasMedium ? `${basePath}-medium${extension} 800w,` : ''}
            ${src} 1200w
        `.trim();
    };
    
    // Handle image load complete
    const handleImageLoaded = () => {
        setIsLoaded(true);
    };

    // Generate a tiny placeholder if blurDataUrl is not provided
    const placeholder = blurDataUrl || `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="${width || 100}" height="${height || 100}" viewBox="0 0 ${width || 100} ${height || 100}"><rect width="100%" height="100%" fill="${placeholderColor.replace('#', '%23')}"/></svg>`;
    
    // Determine loading attribute
    const loadingAttribute = priority ? 'eager' : loading;
    
    // Determine fetchPriority attribute
    const fetchPriorityAttribute = priority ? 'high' : 'auto';
    
    return (
        <div 
            ref={imageRef}
            className={`relative overflow-hidden ${className}`}
            style={{ 
                paddingBottom: height ? 'auto' : `${aspectRatio}%`,
                background: placeholderColor,
                width: width ? `${width}px` : '100%',
                height: height ? `${height}px` : 'auto',
                cursor: onClick ? 'pointer' : 'default'
            }}
            onClick={onClick}
        >
            {/* Blur-up placeholder image */}
            {!isLoaded && (
                <div 
                    className="absolute inset-0 w-full h-full bg-cover bg-center blur-sm scale-105"
                    style={{ 
                        backgroundImage: `url(${placeholder})`,
                        filter: 'blur(20px)',
                        transform: 'scale(1.1)'
                    }}
                    aria-hidden="true"
                />
            )}

            {(isInView || priority) && (
                <motion.img
                    src={src}
                    alt={alt}
                    loading={loadingAttribute}
                    decoding="async"
                    onLoad={handleImageLoaded}
                    initial={animation ? { opacity: 0 } : { opacity: 1 }}
                    animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 w-full h-full"
                    style={{ objectFit }}
                    sizes={sizes}
                    srcSet={generateSrcSet()}
                    fetchPriority={fetchPriorityAttribute}
                />
            )}
            
            {/* Placeholder shimmer effect */}
            {!isLoaded && (
                <div 
                    className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" 
                    aria-hidden="true"
                />
            )}
        </div>
    );
};

export default OptimizedImage; 