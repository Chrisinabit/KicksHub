import { FaFacebook, FaInstagram, FaTwitter,FaYoutube } from 'react-icons/fa';
import { useState } from 'react';

const Footer = () => {
  const[email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit =(e) => {
    e.preventDefault();
    console.log('Subscribed with:', email)

    setIsSubscribed(true);
    setTimeout(()=> setIsSubscribed(false), 3000);
  };



  return (

    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Quick Links */}
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* Column 2: Support */}
          <div className="footer-column">
            <h3>Support</h3>
            <ul className="footer-links">
              <li><a href="/shipping">Shipping</a></li>
              <li><a href="/returns">Returns</a></li>
              <li><a href="/faq">FAQ</a></li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div className="footer-column">
            <h3>Subscribe for Updates</h3>
            <form onSubmit={handleSubmit} className="newsletter-form">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" disabled={isSubscribed}>
                {isSubscribed ? 'Thank You!' : 'Subscribe'}
              </button>
            </form>
            {isSubscribed && (
              <p className="subscription-message">You'll hear from us soon!</p>
            )}
          </div>

          {/* Column 4: Social Icons */}
          <div className="footer-column">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="https://instagram.com" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://twitter.com" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="https://facebook.com" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="https://youtube.com" aria-label="YouTube">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} KicksHub. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}



export default Footer;



