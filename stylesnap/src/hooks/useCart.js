import { useContext } from 'react';
import { CartContext } from '../context/CartContextConstants';

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};