import React from 'react';
import Checkout from '../components/Checkout';
import PageLayout from '../components/common/PageLayout';

const CheckoutPage = () => {
  return (
    <PageLayout
      breadcrumbItems={[
        { label: 'Home', path: '/' },
        { label: 'Cart', path: '/cart' },
        { label: 'Checkout', path: '/checkout' }
      ]}
      title="Checkout"
      showRecommendations={false}
    >
      <Checkout />
    </PageLayout>
  );
};

export default CheckoutPage; 