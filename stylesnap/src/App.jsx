import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import CartDrawer from './components/cart/CartDrawer';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import './styles/index.css';

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductList />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <Footer />
          <CartDrawer />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;