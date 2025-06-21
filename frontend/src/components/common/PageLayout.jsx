import React from 'react';
import Breadcrumb from './Breadcrumb';
import ProductRecommendations from '../ProductRecommendations';

/**
 * PageLayout component for consistent page structure
 * @param {Object} props
 * @param {Array} props.breadcrumbItems - Array of breadcrumb items with label and path
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {React.ReactNode} props.children - Page content
 * @param {string} props.currentCategory - Current category for recommendations
 * @param {boolean} props.showRecommendations - Whether to show recommendations
 */
const PageLayout = ({ 
  breadcrumbItems, 
  title, 
  description, 
  children, 
  currentCategory = null,
  showRecommendations = true
}) => {
  return (
    <div className="container-padding space-y-6 md:space-y-8">
      {/* Breadcrumb */}
      {breadcrumbItems && breadcrumbItems.length > 0 && (
        <Breadcrumb items={breadcrumbItems} />
      )}
      
      {/* Page Header */}
      {(title || description) && (
        <div className="text-center px-4">
          {title && (
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4" data-aos="fade-up">
              {title}
            </h1>
          )}
          {description && (
            <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
              {description}
            </p>
          )}
        </div>
      )}
      
      {/* Page Content */}
      <div className="w-full">
        {children}
      </div>
      
      {/* Product Recommendations */}
      {showRecommendations && (
        <div className="mt-8 md:mt-16">
          <ProductRecommendations currentCategory={currentCategory} />
        </div>
      )}
    </div>
  );
};

export default PageLayout; 