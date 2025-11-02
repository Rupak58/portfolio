import React, { useState, useEffect } from 'react';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilters from '../components/product/ProductFilters';
import { products as mockProducts } from '../data/mockData';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  // Simulate API loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter products
  useEffect(() => {
    let filtered = products;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price filter
    if (priceRange.min) {
      filtered = filtered.filter(product => product.price >= parseFloat(priceRange.min));
    }
    if (priceRange.max) {
      filtered = filtered.filter(product => product.price <= parseFloat(priceRange.max));
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, priceRange]);

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setPriceRange({ min: '', max: '' });
  };

  return (
    <div className="products-page">
      <div className="container">
        <div className="page-header">
          <h1>Shop All Products</h1>
          <p>Discover our amazing collection of fashion items</p>
        </div>

        <div className="products-layout">
          {/* Filters Sidebar */}
          <div className="filters-column">
            <ProductFilters
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Products Grid */}
          <div className="products-column">
            <ProductGrid 
              products={filteredProducts} 
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;