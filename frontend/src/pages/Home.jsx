/**
 * Home Page
 * Modernized landing page for the AI-Based Internship Recommendation System.
 */

import { Link } from 'react-router-dom';
// IMPORT UPDATED: Pointing to your specific file
import heroImage from '../assets/image.jpg'; 
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <div className="home-container">
        
        {/* --- Hero Section --- */}
        <section className="hero-section">
          <div className="hero-content">
            <span className="hero-tag">AI-Powered Career Growth</span>
            <h1 className="hero-title">
              Find Your Perfect <br />
              <span>Internship Match</span>
            </h1>
            <p className="hero-description">
              Stop searching blindly. Our intelligent recommendation system analyzes your 
              skills and interests to connect you with opportunities where you'll thrive.
            </p>
            <div className="hero-actions">
              <Link to="/login" className="btn btn-primary">
                Get Started Now
              </Link>
              <Link to="/register" className="btn btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
          
          <div className="hero-visual">
            {/* Displaying your generated art */}
            <img 
              src={heroImage} 
              alt="AI Internship Matching Platform" 
              className="hero-image"
            />
          </div>
        </section>

        {/* --- Features Section --- */}
        <section className="features-section">
          <div className="section-header">
            <h2 className="features-title">Why Choose Our Platform?</h2>
            <p className="features-subtitle">We bridge the gap between talent and opportunity.</p>
          </div>
          
          <div className="features-grid">
            
            {/* Feature 1 */}
            <div className="feature-card">
              <div className="icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/><path d="M5 4.939 8.5 8.424"/><path d="M19 4.939 15.5 8.424"/><path d="M12 4v4"/><path d="M12 16v4"/><path d="M5 19.061 8.5 15.576"/><path d="M19 19.061 15.5 15.576"/></svg>
              </div>
              <h3>Smart Matching</h3>
              <p>Our machine learning algorithms analyze your academic profile to suggest internships with the highest probability of selection.</p>
            </div>

            {/* Feature 2 */}
            <div className="feature-card">
              <div className="icon-container">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
              </div>
              <h3>Diverse Opportunities</h3>
              <p>From startups to MNCs, access a curated list of internships across Software Development, Data Science, and Design.</p>
            </div>

            {/* Feature 3 */}
            <div className="feature-card">
              <div className="icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              </div>
              <h3>Instant Apply</h3>
              <p>Streamlined application process. Upload your resume once and apply to multiple relevant positions with a single click.</p>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;