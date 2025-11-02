import React from 'react';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { useCart } from '../../context/CartContext'; // Change this import
import './CartItem.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(item.id, item.selectedSize, item.selectedColor);
    } else {
      updateQuantity(item.id, item.selectedSize, item.selectedColor, newQuantity);
    }
  };

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="item-image" />
      
      <div className="item-details">
        <h4 className="item-name">{item.name}</h4>
        
        {/* Variants */}
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
        
        {/* Quantity Controls */}
        <div className="quantity-controls">
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <FaMinus />
          </button>
          
          <span className="quantity">{item.quantity}</span>
          
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(item.quantity + 1)}
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
  );
};

export default CartItem;