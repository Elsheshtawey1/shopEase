import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiUser, FiShoppingCart, FiHeart, FiMenu, FiX, FiSearch } from "react-icons/fi";
import "../style/NavBar.css";

const Navbar = ({ isLoggedIn = false, username = "User" }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left: Logo */}
        <div className="logo">MyLogo</div>

        {/* Nav Links (includes search bar) */}
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {/* Search Bar */}
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button className="search-button">
              <FiSearch />
            </button>
          </div>

          {/* Navigation Links */}
          <NavLink to="/" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
            Home
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
            Products
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
            Contact
          </NavLink>
        </div>

        {/* Right: Icons */}
        <div className="right-icons">
          <NavLink to="/favorites" className="icon">
            <FiHeart />
          </NavLink>
          <NavLink to="/cart" className="icon">
            <FiShoppingCart />
          </NavLink>
          <NavLink to="/Sign" className="icon user-icon">
            {isLoggedIn ? <span className="username">{username}</span> : <FiUser />}
          </NavLink>
          <div className="menu-toggle" onClick={toggleMenu}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
