import React, { useReducer, useEffect } from 'react';
import { WishlistContext } from './WishlistContextConstants';

// Initial state
const initialState = {
  items: []
};

// Action types
const WISHLIST_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  LOAD_WISHLIST: 'LOAD_WISHLIST'
};

// Wishlist reducer
const wishlistReducer = (state, action) => {
  switch (action.type) {
    case WISHLIST_ACTIONS.ADD_ITEM: {
      // Use block scope to fix the case declaration error
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state; // Item already in wishlist
      }
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    }

    case WISHLIST_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    case WISHLIST_ACTIONS.LOAD_WISHLIST:
      return {
        ...state,
        items: action.payload
      };

    default:
      return state;
  }
};

// Wishlist Provider Component
export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('stylesnap-wishlist');
    if (savedWishlist) {
      try {
        const wishlistData = JSON.parse(savedWishlist);
        dispatch({ type: WISHLIST_ACTIONS.LOAD_WISHLIST, payload: wishlistData });
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('stylesnap-wishlist', JSON.stringify(state.items));
  }, [state.items]);

  // Action creators
  const addToWishlist = (product) => {
    dispatch({ type: WISHLIST_ACTIONS.ADD_ITEM, payload: product });
  };

  const removeFromWishlist = (productId) => {
    dispatch({ type: WISHLIST_ACTIONS.REMOVE_ITEM, payload: productId });
  };

  const isInWishlist = (productId) => {
    return state.items.some(item => item.id === productId);
  };

  const value = {
    items: state.items,
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};