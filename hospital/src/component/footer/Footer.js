import React, { useState } from 'react';
import './footer.css';
import logo from '../../assets_frontend/logo.png';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed with ${email}`);
    setEmail('');
  };

  return (
    <div className="footer-container">
      <div className="footer flex justify-between items-start p-6">
        {/* Left side */}
        <div className="footer-left">
          <img src={logo} alt="Logo" className="footer-logo pb-4" />
          <p className="footer-description">
            We provide comprehensive medical services, ensuring the best care for our patients through advanced diagnoses and treatment methods.
          </p>
        </div>
        
        {/* Center side */}
        <div className="footer-center">
          <h3 className="footer-heading">Company</h3>
          <p className="footer-link">Home</p>
          <p className="footer-link">About Us</p>
          <p className="footer-link">Services</p>
          <p className="footer-link">Contact Us</p>
          <p className="footer-link">Privacy Policy</p>
        </div>
        
        {/* Right side */}
        <div className="footer-right">
          <h3 className="footer-heading">Get in Touch</h3>
          <p className="footer-contact">+1-212-456-7890</p>
          <p className="footer-contact">greatstackdev@gmail.com</p>
          
          {/* Newsletter Subscription */}
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Subscribe to our newsletter" 
              className="newsletter-input" 
              required 
            />
            <button type="submit" className="newsletter-button">Subscribe</button>
          </form>
          
          {/* Social Media Links */}
          <div className="social-media">
            <a href="#" className="social-icon"><FaFacebookF /></a>
            <a href="#" className="social-icon"><FaTwitter /></a>
            <a href="#" className="social-icon"><FaLinkedinIn /></a>
            <a href="#" className="social-icon"><FaInstagram /></a>
          </div>
        </div>
      </div>
      
      <div className="created">
        <hr />
        <p>Created by Ahmed Mustapha</p>
      </div>
    </div>
  );
}

export default Footer;