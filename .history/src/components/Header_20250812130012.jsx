import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiUser, FiShoppingCart, FiHeart, FiMenu, FiX, FiSearch } from "react-icons/fi";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import "../style/NavBar.css";
import Container from "./Container";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const product = useSelector((state) => state.app.product);
  const wishlist = useSelector((state) => state.app.wishlist);

  return (
    <>
      <div className="offer-bar">
        <div className="offer-text">
          <p className="animated-offer">🎉 Special Offer: Get 20% off on your first purchase!</p>
        </div>
        <div className="social-icons-nav">
          <a href="https://www.linkedin.com/in/mohamed-elsheshtawey/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="https://www.linkedin.com/in/mohamed-elsheshtawey/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="https://www.linkedin.com/in/mohamed-elsheshtawey/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
        </div>
      </div>

      <nav className="navbar">
        <Container>
          <div className="navbar-container">
            {/* Left: Logo */}
            <div className="logo">MyLogo</div>

            {/* Nav Links (includes search bar) */}
            <div className={`nav-links ${menuOpen ? "open" : ""}`}>
              {/* Search Bar */}
              <div className="search-bar">
                <input type="text" placeholder="Search products..." aria-label="Search products" />
                <button className="search-button">
                  <FiSearch />
                </button>
              </div>

              {/* Navigation Links */}
              <NavLink to="/" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
                Home
              </NavLink>
              <NavLink to="/AllProductsPage" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
                Products
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
                About
              </NavLink>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
                Contact
              </NavLink>
            </div>

            {/* Right Icons */}
            <div className="right-icons">
              {/* Profile Icon */}
              <NavLink to="/ProfilePage" className="icon profile-icon" title="Profile" aria-label="Profile">
                <FiUser />
              </NavLink>
              {/* Wishlist Icon */}
              <NavLink to="/wishlist" className="icon wishlist-icon" title="Wishlist" aria-label="Wishlist">
                <FiHeart />
                <span className="cart-count">{wishlist.length}</span>
              </NavLink>

              {/* Cart Icon */}
              <NavLink to="/cart" className="icon" title="Cart" aria-label="Cart">
                <FiShoppingCart />
                <span className="cart-count">{product.length}</span>
              </NavLink>

              {/* Mobile Menu Toggle */}
              <div className="menu-toggle" onClick={toggleMenu}>
                {menuOpen ? <FiX /> : <FiMenu />}
              </div>
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
};

export default Navbar;
