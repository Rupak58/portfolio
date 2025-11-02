import React, { useState } from 'react';
import { FaShoppingBag, FaHeart, FaUser, FaSearch, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import './Header.css';

const Header = () => {
  const { toggleCart, totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
      setShowSuggestions(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setShowSuggestions(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <FaShoppingBag className="logo-icon" />
            <span className="brand">StyleSnap</span>
          </Link>

          <form className="search-container" onSubmit={handleSearch}>
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Search for products, brands, and more..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
              />
              <FaSearch className="search-icon" />
              
              {searchTerm && (
                <button 
                  type="button"
                  className="clear-search-btn"
                  onClick={clearSearch}
                >
                  <FaTimes />
                </button>
              )}
            </div>
            
            {showSuggestions && searchTerm && (
              <div className="search-suggestions">
                <div className="suggestion-item">
                  <FaSearch className="suggestion-icon" />
                  <span>Search for "{searchTerm}"</span>
                </div>
              </div>
            )}
          </form>

          <div className="nav-icons">
            <Link to="/wishlist" className="icon-btn" title="Wishlist">
              <FaHeart className="icon" />
              {wishlistItems.length > 0 && <span className="badge">{wishlistItems.length}</span>}
            </Link>
            <button className="icon-btn" title="Account">
              <FaUser className="icon" />
            </button>
            <button 
              className="icon-btn" 
              title="Cart"
              onClick={toggleCart}
            >
              <FaShoppingBag className="icon" />
              {totalItems > 0 && <span className="badge">{totalItems}</span>}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;