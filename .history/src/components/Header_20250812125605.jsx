import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FiUser, FiShoppingCart, FiHeart, FiMenu, FiX, FiSearch } from "react-icons/fi";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import "../style/NavBar.css";
import Container from "./Container";
import { useSelector } from "react-redux";

// استيراد ملفات الترجمة
import en from ".locales/en.json";
import ar from ".locales/ar.json";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState("en"); // اللغة الافتراضية

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const product = useSelector((state) => state.app.product);
  const wishlist = useSelector((state) => state.app.wishlist);

  // اختيار الترجمة حسب اللغة
  const t = lang === "ar" ? ar : en;

  // تغيير اتجاه الصفحة حسب اللغة
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <>
      <div className="offer-bar">
        <div className="offer-text">
          <p className="animated-offer">{t.offerText}</p>
        </div>
        <div className="social-icons-nav">
          <a href="#" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="#" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="#" aria-label="Instagram">
            <FaInstagram />
          </a>
        </div>

        {/* زر تغيير اللغة */}
        <div className="lang-switch">
          <button onClick={() => setLang(lang === "en" ? "ar" : "en")}>{lang === "en" ? "AR" : "EN"}</button>
        </div>
      </div>

      <nav className="navbar">
        <Container>
          <div className="navbar-container">
            <div className="logo">MyLogo</div>

            <div className={`nav-links ${menuOpen ? "open" : ""}`}>
              <div className="search-bar">
                <input type="text" placeholder={t.searchPlaceholder} aria-label={t.searchPlaceholder} />
                <button className="search-button">
                  <FiSearch />
                </button>
              </div>

              <NavLink to="/" className="nav-item">
                {t.home}
              </NavLink>
              <NavLink to="/AllProductsPage" className="nav-item">
                {t.products}
              </NavLink>
              <NavLink to="/about" className="nav-item">
                {t.about}
              </NavLink>
              <NavLink to="/contact" className="nav-item">
                {t.contact}
              </NavLink>
            </div>

            <div className="right-icons">
              <NavLink to="/ProfilePage" className="icon profile-icon" title={t.profile}>
                <FiUser />
              </NavLink>
              <NavLink to="/wishlist" className="icon wishlist-icon" title={t.wishlist}>
                <FiHeart />
                <span className="cart-count">{wishlist.length}</span>
              </NavLink>
              <NavLink to="/cart" className="icon" title={t.cart}>
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
