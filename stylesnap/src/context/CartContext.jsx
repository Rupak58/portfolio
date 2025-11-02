import React, { useReducer, useEffect } from 'react';
import { CartContext } from './CartContextConstants';

// Cart item creator function
const createCartItem = ({ product, quantity = 1, selectedSize = '', selectedColor = '' }) => ({
  id: product.id,
  name: product.name,
  price: product.price,
  image: product.image,
  quantity,
  selectedSize,
  selectedColor,
  inStock: product.inStock,
  maxQuantity: 10
});

// Initial state
const initialState = {
  items: [],
  isCartOpen: false,
  totalItems: 0,
  totalPrice: 0
};

// Action types
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  TOGGLE_CART: 'TOGGLE_CART',
  LOAD_CART: 'LOAD_CART'
};

// Helper function to update cart totals
const updateCartTotals = (state) => {
  const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  return {
    ...state,
    totalItems,
    totalPrice: parseFloat(totalPrice.toFixed(2))
  };
};

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product, selectedSize, selectedColor } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => 
          item.id === product.id && 
          item.selectedSize === selectedSize && 
          item.selectedColor === selectedColor
      );

      let newItems;
      
      if (existingItemIndex >= 0) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { 
                ...item, 
                quantity: Math.min(item.quantity + 1, item.maxQuantity)
              }
            : item
        );
      } else {
        const newItem = createCartItem({ 
          product, 
          selectedSize, 
          selectedColor 
        });
        newItems = [...state.items, newItem];
      }

      return updateCartTotals({ ...state, items: newItems });
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const { itemId, selectedSize, selectedColor } = action.payload;
      const newItems = state.items.filter(
        item => 
          !(item.id === itemId && 
            item.selectedSize === selectedSize && 
            item.selectedColor === selectedColor)
      );
      return updateCartTotals({ ...state, items: newItems });
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { itemId, selectedSize, selectedColor, quantity } = action.payload;
      const newItems = state.items.map(item =>
        item.id === itemId && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
          ? { ...item, quantity: Math.min(Math.max(1, quantity), item.maxQuantity) }
          : item
      );
      return updateCartTotals({ ...state, items: newItems });
    }

    case CART_ACTIONS.CLEAR_CART:
      return updateCartTotals({ ...state, items: [] });

    case CART_ACTIONS.TOGGLE_CART:
      return { ...state, isCartOpen: !state.isCartOpen };

    case CART_ACTIONS.LOAD_CART:
      return updateCartTotals({ ...state, items: action.payload });

    default:
      return state;
  }
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('stylesnap-cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: cartData });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('stylesnap-cart', JSON.stringify(state.items));
  }, [state.items]);

  // Action creators
  const addToCart = (product, selectedSize = '', selectedColor = '') => {
    dispatch({ 
      type: CART_ACTIONS.ADD_ITEM, 
      payload: { product, selectedSize, selectedColor } 
    });
  };

  const removeFromCart = (itemId, selectedSize = '', selectedColor = '') => {
    dispatch({ 
      type: CART_ACTIONS.REMOVE_ITEM, 
      payload: { itemId, selectedSize, selectedColor } 
    });
  };

  const updateQuantity = (itemId, selectedSize, selectedColor, quantity) => {
    dispatch({ 
      type: CART_ACTIONS.UPDATE_QUANTITY, 
      payload: { itemId, selectedSize, selectedColor, quantity } 
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const toggleCart = () => {
    dispatch({ type: CART_ACTIONS.TOGGLE_CART });
  };

  const openCart = () => {
    if (!state.isCartOpen) {
      dispatch({ type: CART_ACTIONS.TOGGLE_CART });
    }
  };

  const closeCart = () => {
    if (state.isCartOpen) {
      dispatch({ type: CART_ACTIONS.TOGGLE_CART });
    }
  };

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};