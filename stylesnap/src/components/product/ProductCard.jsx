import React, { useState } from 'react';
import { FaHeart, FaStar, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart, openCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product);
    openCart();
  };

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        {!imageLoaded && <div className="image-skeleton"></div>}
        <img
          src={product.image}
          alt={product.name}
          className={`product-image ${imageLoaded ? 'loaded' : ''}`}
          onLoad={() => setImageLoaded(true)}
        />
        
        <button 
          className={`wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
          onClick={toggleWishlist}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <FaHeart />
        </button>

        {product.originalPrice && (
          <div className="sale-badge">Sale</div>
        )}

        {!product.inStock && (
          <div className="out-of-stock-overlay">
            <span>Out of Stock</span>
          </div>
        )}
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`star ${index < Math.floor(product.rating) ? 'filled' : ''}`}
              />
            ))}
          </div>
          <span className="rating-text">({product.reviewCount})</span>
        </div>

        <div className="product-price">
          {product.originalPrice ? (
            <>
              <span className="current-price">${product.price}</span>
              <span className="original-price">${product.originalPrice}</span>
              <span className="discount">
                {Math.round((1 - product.price / product.originalPrice) * 100)}% off
              </span>
            </>
          ) : (
            <span className="current-price">${product.price}</span>
          )}
        </div>

        <button
          className={`add-to-cart-btn ${!product.inStock ? 'disabled' : ''}`}
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          <FaShoppingCart className="cart-icon" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;