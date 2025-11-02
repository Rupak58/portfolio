import React from 'react';
import ProductCard from './ProductCard';
import LoadingSpinner from '../common/LoadingSpinner';
import './ProductGrid.css';

const ProductGrid = ({ products, loading = false }) => {
  if (loading) {
    return (
      <div className="products-loading">
        <LoadingSpinner size="large" />
        <p>Loading amazing products...</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="products-empty">
        <div className="empty-icon">🛍️</div>
        <h3>No products found</h3>
        <p>Try adjusting your filters or search terms</p>
      </div>
    );
  }

  return (
    <div className="product-grid-container">
      <div className="products-count">
        Showing {products.length} product{products.length !== 1 ? 's' : ''}
      </div>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;