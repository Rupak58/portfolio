import React from 'react';
import { categories } from '../../data/mockData';
import './ProductFilters.css';

const ProductFilters = ({ 
  selectedCategory, 
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  onClearFilters 
}) => {
  return (
    <div className="filters-sidebar">
      <div className="filters-header">
        <h3>Filters</h3>
        <button 
          className="clear-filters-btn"
          onClick={onClearFilters}
        >
          Clear All
        </button>
      </div>

      {/* Category Filter */}
      <div className="filter-group">
        <h4>Category</h4>
        <div className="filter-options">
          {categories.map(category => (
            <label key={category.id} className="filter-option">
              <input
                type="radio"
                name="category"
                value={category.id}
                checked={selectedCategory === category.id}
                onChange={(e) => onCategoryChange(e.target.value)}
              />
              <span className="checkmark"></span>
              {category.name}
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="filter-group">
        <h4>Price Range</h4>
        <div className="price-inputs">
          <div className="price-input">
            <label>Min</label>
            <input
              type="number"
              placeholder="0"
              value={priceRange.min}
              onChange={(e) => onPriceRangeChange({
                ...priceRange,
                min: e.target.value
              })}
            />
          </div>
          <div className="price-input">
            <label>Max</label>
            <input
              type="number"
              placeholder="1000"
              value={priceRange.max}
              onChange={(e) => onPriceRangeChange({
                ...priceRange,
                max: e.target.value
              })}
            />
          </div>
        </div>
      </div>

      {/* Availability Filter */}
      <div className="filter-group">
        <h4>Availability</h4>
        <div className="filter-options">
          <label className="filter-option">
            <input type="checkbox" defaultChecked />
            <span className="checkmark"></span>
            In Stock Only
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;