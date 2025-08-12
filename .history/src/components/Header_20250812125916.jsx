import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiUser, FiShoppingCart, FiHeart, FiMenu, FiX, FiSearch } from "react-icons/fi";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import "../style/NavBar.css";
import Container from "./Container";
import { useSelector } from "react-redux";

// استدعاء مكتبة الترجمة
import { useTranslation } from "react-i18next";

// إذا لم تهيء i18next في مكان آخر، هذا مثال بسيط لتهيئة سريعة (يمكن تحريكها لملف مستقل)
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      specialOffer: "🎉 Special Offer: Get 20% off on your first purchase!",
      logo: "MyLogo",
      searchPlaceholder: "Search products...",
      home: "Home",
      products: "Products",
      about: "About",
      contact: "Contact",
      profile: "Profile",
      wishlist: "Wishlist",
      cart: "Cart",
    },
  },
  ar: {
    translation: {
      specialOffer: "🎉 عرض خاص: احصل على خصم 20٪ على أول عملية شراء!",
      logo: "شعاري",
      searchPlaceholder: "ابحث عن المنتجات...",
      home: "الرئيسية",
      products: "المنتجات",
      about: "من نحن",
      contact: "اتصل بنا",
      profile: "الملف الشخصي",
      wishlist: "المفضلة",
      cart: "السلة",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // اللغة الافتراضية
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

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

      <nav className="navbar" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
        <Container>
          <div className="navbar-container">
            {/* Left: Logo */}
            <div className="logo">{t("logo")}</div>

            {/* Nav Links (includes search bar) */}
            <div className={`nav-links ${menuOpen ? "open" : ""}`}>
              {/* Search Bar */}
              <div className="search-bar">
                <input type="text" placeholder={t("searchPlaceholder")} aria-label={t("searchPlaceholder")} />
                <button className="search-button">
                  <FiSearch />
                </button>
              </div>

              {/* Navigation Links */}
              <NavLink to="/" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
                {t("home")}
              </NavLink>
              <NavLink to="/AllProductsPage" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
                {t("products")}
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
                {t("about")}
              </NavLink>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
                {t("contact")}
              </NavLink>
            </div>

            {/* Right Icons */}
            <div className="right-icons">
              {/* Profile Icon */}
              <NavLink to="/ProfilePage" className="icon profile-icon" title={t("profile")} aria-label={t("profile")}>
                <FiUser />
              </NavLink>
              {/* Wishlist Icon */}
              <NavLink to="/wishlist" className="icon wishlist-icon" title={t("wishlist")} aria-label={t("wishlist")}>
                <FiHeart />
                <span className="cart-count">{wishlist.length}</span>
              </NavLink>

              {/* Cart Icon */}
              <NavLink to="/cart" className="icon" title={t("cart")} aria-label={t("cart")}>
                <FiShoppingCart />
                <span className="cart-count">{product.length}</span>
              </NavLink>

              {/* Mobile Menu Toggle */}
              <div className="menu-toggle" onClick={toggleMenu}>
                {menuOpen ? <FiX /> : <FiMenu />}
              </div>

              {/* Language Switcher */}
              <select onChange={(e) => i18n.changeLanguage(e.target.value)} value={i18n.language} className="lang-switch" aria-label="Change Language">
                <option value="en">EN</option>
                <option value="ar">AR</option>
              </select>
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
};

export default Navbar;
