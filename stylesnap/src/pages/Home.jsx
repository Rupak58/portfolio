import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Welcome to StyleSnap</h1>
            <p>
              Discover the latest trends in fashion. Shop with confidence and style. 
              Quality products, amazing prices, and exceptional service.
            </p>
            <Link to="/products" className="hero-button">
              Start Shopping
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Why Choose StyleSnap?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Free Shipping</h3>
              <p>Free delivery on all orders over $50. Fast and reliable shipping to your doorstep.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">↩️</div>
              <h3>Easy Returns</h3>
              <p>30-day hassle-free return policy. Your satisfaction is guaranteed.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Payment</h3>
              <p>Your data is always protected with our secure payment processing.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3>Quality Products</h3>
              <p>Carefully curated collection of high-quality fashion items from trusted brands.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;