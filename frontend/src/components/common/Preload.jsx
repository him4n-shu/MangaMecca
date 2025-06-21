import React from 'react';
import { useEffect } from 'react';

/**
 * Preload component that adds resource hints for critical assets
 * This helps with performance by preloading or prefetching resources
 */
const Preload = () => {
  useEffect(() => {
    // Add preload links for critical fonts
    const preloadFonts = [
      '/font/mangat.ttf',
      '/font/mangatb.ttf'
    ];
    
    // Add preconnect for external domains
    const preconnectDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];
    
    // Create and append preload links for fonts
    preloadFonts.forEach(font => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = font;
      link.as = 'font';
      link.type = 'font/ttf';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
    
    // Create and append preconnect links
    preconnectDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
    
    // Clean up function to remove the links when component unmounts
    return () => {
      document.querySelectorAll('link[rel="preload"][as="font"], link[rel="preconnect"]').forEach(link => {
        document.head.removeChild(link);
      });
    };
  }, []);
  
  return null; // This component doesn't render anything
};

export default Preload; 