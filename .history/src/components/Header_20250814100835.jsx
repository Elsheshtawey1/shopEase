import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiUser, FiShoppingCart, FiHeart, FiMenu, FiX, FiSearch } from "react-icons/fi";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import "../style/NavBar.css";
import Container from "./Container";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next"; 

const Navbar = () => {
  const { t } = useTranslation(); 
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const search =use
  const product = useSelector((state) => state.app.product);
  const wishlist = useSelector((state) => state.app.wishlist);

  return (
    <>
      <div className="offer-bar">
        <div className="offer-text">
          <p className="animated-offer">{t("specialOffer")}</p> 
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
            <div className="logo">MyLogo</div>

            <div className={`nav-links ${menuOpen ? "open" : ""}`}>
              <div className="search-bar">
                <input type="text" placeholder={t("searchPlaceholder")} aria-label={t("searchPlaceholder")} />
                <button className="search-button">
                  <FiSearch />
                </button>
              </div>

              <NavLink to="/" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
                {t("nav.home")}
              </NavLink>
              <NavLink to="/AllProductsPage" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
                {t("nav.products")}
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
                {t("nav.about")}
              </NavLink>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
                {t("nav.contact")}
              </NavLink>
            </div>

            <div className="right-icons">
              <NavLink to="/ProfilePage" className="icon profile-icon" title={t("profile")} aria-label={t("profile")}>
                <FiUser />
              </NavLink>
              <NavLink to="/wishlist" className="icon wishlist-icon" title={t("wishlist")} aria-label={t("wishlist")}>
                <FiHeart />
                <span className="cart-count">{wishlist.length}</span>
              </NavLink>
              <NavLink to="/cart" className="icon" title={t("cart")} aria-label={t("cart")}>
                <FiShoppingCart />
                <span className="cart-count">{product.length}</span>
              </NavLink>

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
