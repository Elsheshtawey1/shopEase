import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import "../style/Footer.css";
import Container from "./Container";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <div className="footer-main">
          <div className="footer-column">
            <h4>About Us</h4>
            <ul>
              <li>
                <Link to="/companyinfo">Company Info</Link>
              </li>
              <li>
                <Link to="/careers">Careers</Link>
              </li>
              <li>
                <Link to="/press">Press</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Customer Service</h4>
            <ul>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/Returns">Returns</Link>
              </li>
              <li>
                <Link to="/faq" className="faq-Footer">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/ShippingInfo">ShippingInfo</Link>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Shop</h4>
            <ul>
              <li>Men</li>
              <li>Women</li>
              <li>Electronics</li>
              <li>Home & Garden</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="https://www.linkedin.com/in/mohamed-elsheshtawey/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://www.linkedin.com/in/mohamed-elsheshtawey/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com/in/mohamed-elsheshtawey/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="https://www.linkedin.com/in/mohamed-elsheshtawey/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} YourStore. All rights reserved.elsheshtawey</p>
          <p>for more information, contact us</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
