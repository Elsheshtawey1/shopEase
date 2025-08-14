import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiUser, FiShoppingCart, FiHeart, FiMenu, FiX, FiSearch } from "react-icons/fi";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import "../style/NavBar.css";
import Container from "./Container";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { setSearch } from "../redux/searchSlice";

const Navbar = () => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const searchValue = useSelector((state) => state.search);
  const products = useSelector((state) => state.app.product);
  const wishlist = useSelector((state) => state.app.wishlist);
  const cart = useSelector((state) => state.app.product);

  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    dispatch(setSearch(value));

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    // فلترة المنتجات وعرض أول 5 فقط
    const filtered = products.filter((p) => p.title.toLowerCase().includes(value.toLowerCase()));
    setSuggestions(filtered.slice(0, 5));
  };

  const handleSuggestionClick = (title) => {
    dispatch(setSearch(title));
    setSuggestions([]);
  };

  return (
    <>
      {/* شريط العروض */}
      <div className="offer-bar">
        <div className="offer-text">
          <p className="animated-offer">{t("specialOffer")}</p>
        </div>
        <div className="social-icons-nav">
          <a href="https://www.linkedin.com/in/mohamed-elsheshtawey/" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://www.linkedin.com/in/mohamed-elsheshtawey/" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://www.linkedin.com/in/mohamed-elsheshtawey/" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* النافبار */}
      <nav className="navbar">
        <Container>
          <div className="navbar-container">
            <div className="logo">MyLogo</div>

            <div className={`nav-links ${menuOpen ? "open" : ""}`}>
              {/* مربع البحث مع القائمة المنسدلة */}
              <div className="search-bar" style={{ position: "relative" }}>
                <input type="text" value={searchValue} onChange={handleSearchChange} placeholder={t("searchPlaceholder")} aria-label={t("searchPlaceholder")} />
                <button className="search-button">
                  <FiSearch />
                </button>

                {suggestions.length > 0 && (
                  <ul
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
                      background: "#fff",
                      border: "1px solid #ccc",
                      zIndex: 1000,
                      listStyle: "none",
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    {suggestions.map((item) => (
                      <li
                        key={item.id}
                        style={{
                          padding: "8px",
                          cursor: "pointer",
                          borderBottom: "1px solid #eee",
                        }}
                        onClick={() => handleSuggestionClick(item.title)}
                      >
                        {item.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* روابط القائمة */}
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

            {/* الأيقونات */}
            <div className="right-icons">
              <NavLink to="/ProfilePage" className="icon profile-icon">
                <FiUser />
              </NavLink>
              <NavLink to="/wishlist" className="icon wishlist-icon">
                <FiHeart />
                <span className="cart-count">{wishlist.length}</span>
              </NavLink>
              <NavLink to="/cart" className="icon">
                <FiShoppingCart />
                <span className="cart-count">{cart.length}</span>
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
