import React, { useState } from 'react';
import { FaLock, FaCreditCard, FaTruck, FaCheckCircle } from 'react-icons/fa';
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate order processing
    setTimeout(() => {
      setOrderPlaced(true);
      clearCart();
    }, 2000);
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="empty-checkout">
            <FaCreditCard className="empty-icon" />
            <h2>Your cart is empty</h2>
            <p>Add some items to your cart before checking out</p>
            <button 
              className="btn-primary"
              onClick={() => navigate('/products')}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="order-success">
            <FaCheckCircle className="success-icon" />
            <h1>Order Confirmed!</h1>
            <p>Thank you for your purchase. Your order has been successfully placed.</p>
            <div className="order-details">
              <p><strong>Order Number:</strong> #STYLE{Date.now().toString().slice(-6)}</p>
              <p><strong>Estimated Delivery:</strong> 3-5 business days</p>
              <p><strong>Total Amount:</strong> ${totalPrice}</p>
            </div>
            <div className="success-actions">
              <button 
                className="btn-primary"
                onClick={() => navigate('/products')}
              >
                Continue Shopping
              </button>
              <button 
                className="btn-secondary"
                onClick={() => navigate('/')}
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-header">
          <h1><FaLock className="lock-icon" /> Checkout</h1>
          <p>Complete your purchase securely</p>
        </div>

        <div className="checkout-layout">
          {/* Checkout Form */}
          <div className="checkout-form-section">
            <form onSubmit={handleSubmit} className="checkout-form">
              {/* Contact Information */}
              <div className="form-section">
                <h2>Contact Information</h2>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="form-section">
                <h2>Shipping Address</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Main Street"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="zipCode">ZIP Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      required
                      value={formData.zipCode}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="form-section">
                <h2>Payment Information</h2>
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    required
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      required
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      maxLength="5"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      required
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      maxLength="3"
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="place-order-btn">
                <FaCreditCard className="btn-icon" />
                Place Order - ${totalPrice}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="order-summary-section">
            <div className="order-summary">
              <h2>Order Summary</h2>
              
              <div className="order-items">
                {items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="order-item">
                    <img src={item.image} alt={item.name} className="item-image" />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      {(item.selectedSize || item.selectedColor) && (
                        <div className="item-variants">
                          {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                          {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                        </div>
                      )}
                      <div className="item-quantity">Qty: {item.quantity}</div>
                    </div>
                    <div className="item-price">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              <div className="order-totals">
                <div className="total-row">
                  <span>Subtotal:</span>
                  <span>${totalPrice}</span>
                </div>
                <div className="total-row">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="total-row">
                  <span>Tax:</span>
                  <span>${(totalPrice * 0.08).toFixed(2)}</span>
                </div>
                <div className="total-row grand-total">
                  <span>Total:</span>
                  <span>${(totalPrice * 1.08).toFixed(2)}</span>
                </div>
              </div>

              <div className="shipping-info">
                <FaTruck className="shipping-icon" />
                <div>
                  <strong>Free Shipping</strong>
                  <p>Delivery in 3-5 business days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;