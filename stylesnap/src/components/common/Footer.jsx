import React from 'react';
import { FaShoppingBag, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-grid">
            {/* Brand */}
            <div>
              <div className="footer-brand">
                <FaShoppingBag className="footer-logo" />
                <span className="footer-brand-text">StyleSnap</span>
              </div>
              <p className="footer-description">
                Your one-stop destination for modern fashion and style. 
                Discover the latest trends and shop with confidence.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3>Quick Links</h3>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Shop</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3>Customer Service</h3>
              <ul className="footer-links">
                <li><a href="#shipping">Shipping Info</a></li>
                <li><a href="#returns">Returns & Exchanges</a></li>
                <li><a href="#size-guide">Size Guide</a></li>
                <li><a href="#faq">FAQs</a></li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3>Connect With Us</h3>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="Facebook">
                  <FaFacebook />
                </a>
                <a href="#" className="social-link" aria-label="Twitter">
                  <FaTwitter />
                </a>
                <a href="#" className="social-link" aria-label="Instagram">
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 StyleSnap. All rights reserved. | Built with React</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;