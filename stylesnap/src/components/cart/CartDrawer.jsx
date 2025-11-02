import React from 'react';
import { FaTimes, FaShoppingBag, FaPlus, FaMinus, FaTrash, FaCreditCard } from 'react-icons/fa';
import { useCart } from '../../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import './CartDrawer.css';

const CartDrawer = () => {
  const { 
    isCartOpen, 
    closeCart, 
    items, 
    totalPrice, 
    totalItems, 
    updateQuantity, 
    removeFromCart,
    clearCart
  } = useCart();
  
  const navigate = useNavigate();

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(item.id, item.selectedSize, item.selectedColor);
    } else {
      updateQuantity(item.id, item.selectedSize, item.selectedColor, newQuantity);
    }
  };

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={closeCart}></div>
      
      <div className="cart-drawer">
        <div className="cart-header">
          <div className="cart-title">
            <FaShoppingBag className="cart-icon" />
            <h2>Your Cart ({totalItems})</h2>
          </div>
          <button className="close-btn" onClick={closeCart}>
            <FaTimes />
          </button>
        </div>

        <div className="cart-content">
          {items.length === 0 ? (
            <div className="empty-cart">
              <FaShoppingBag className="empty-cart-icon" />
              <h3>Your cart is empty</h3>
              <p>Add some products to get started!</p>
              <button className="btn-primary" onClick={closeCart}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="cart-item">
                    <img src={item.image} alt={item.name} className="item-image" />
                    
                    <div className="item-details">
                      <h4 className="item-name">{item.name}</h4>
                      
                      {(item.selectedSize || item.selectedColor) && (
                        <div className="item-variants">
                          {item.selectedSize && (
                            <span className="variant">Size: {item.selectedSize}</span>
                          )}
                          {item.selectedColor && (
                            <span className="variant">Color: {item.selectedColor}</span>
                          )}
                        </div>
                      )}
                      
                      <div className="item-price">${item.price}</div>
                      
                      <div className="quantity-controls">
                        <button
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(item, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <FaMinus />
                        </button>
                        
                        <span className="quantity">{item.quantity}</span>
                        
                        <button
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(item, item.quantity + 1)}
                          disabled={item.quantity >= item.maxQuantity}
                        >
                          <FaPlus />
                        </button>
                        
                        <button
                          className="remove-btn"
                          onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                          title="Remove item"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="clear-cart-section">
                <button className="clear-cart-btn" onClick={clearCart}>
                  Clear All Items
                </button>
              </div>
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-totals">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>${totalPrice}</span>
              </div>
              <div className="total-row">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="total-row grand-total">
                <span>Total:</span>
                <span>${totalPrice}</span>
              </div>
            </div>
            
            <button className="checkout-btn" onClick={handleCheckout}>
              <FaCreditCard className="btn-icon" />
              Proceed to Checkout
            </button>
            
            <button className="continue-shopping-btn" onClick={closeCart}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;