import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingBag } from 'react-icons/fa';
import { useWishlist } from '../hooks/useWishlist';
import ProductGrid from '../components/product/ProductGrid';
import './Wishlist.css';

const Wishlist = () => {
  const { items: wishlistItems } = useWishlist();

  return (
    <div className="wishlist-page">
      <div className="container">
        <div className="page-header">
          <div className="wishlist-header">
            <FaHeart className="wishlist-icon" />
            <div>
              <h1>My Wishlist</h1>
              <p>{wishlistItems.length} items saved for later</p>
            </div>
          </div>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="empty-wishlist">
            <FaHeart className="empty-icon" />
            <h2>Your wishlist is empty</h2>
            <p>Save your favorite items here for easy access later!</p>
            <Link to="/products" className="btn-primary">
              <FaShoppingBag className="btn-icon" />
              Start Shopping
            </Link>
          </div>
        ) : (
          <ProductGrid products={wishlistItems} />
        )}
      </div>
    </div>
  );
};

export default Wishlist;