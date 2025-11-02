import { useState, useMemo } from 'react';
import { products } from '../data/mockData';

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) {
      return products;
    }

    setIsSearching(true);
    const term = searchTerm.toLowerCase().trim();
    
    const results = products.filter(product => 
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term)
    );

    // Simulate API delay
    setTimeout(() => setIsSearching(false), 300);
    return results;
  }, [searchTerm]);

  const clearSearch = () => {
    setSearchTerm('');
  };

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    isSearching,
    clearSearch
  };
};