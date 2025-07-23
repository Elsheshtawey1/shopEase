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
              <li>Company Info</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Blog</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Customer Service</h4>
            <ul>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>Returns</li>
              <li>
                <Link to="/faq" className="faq-Footer">
                  FAQs
                </Link>
              </li>
              <li>Shipping Info</li>
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
              <a href="#">
                <FaFacebookF />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
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
