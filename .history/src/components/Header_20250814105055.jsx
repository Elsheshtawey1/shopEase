import React, { useState, useEffect, useRef, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
  const [highlightedIndex, setHighlightedIndex] = useState(-1); // ⬅ العنصر المحدد بالكيبورد

  const searchRef = useRef(null);
  const navigate = useNavigate();

  const searchValue = useSelector((state) => state.search);
  const products = useSelector((state) => state.app.product);
  const wishlist = useSelector((state) => state.app.wishlist);
  const cart = useSelector((state) => state.app.product);

  const dispatch = useDispatch();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Debounce للبحث
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  // البحث
  const performSearch = useCallback(
    debounce((value) => {
      if (value.trim() === "") {
        setSuggestions([]);
        setHighlightedIndex(-1);
        return;
      }
      const filtered = products.filter((p) => p.title.toLowerCase().includes(value.toLowerCase()));
      setSuggestions(filtered.slice(0, 5));
      setHighlightedIndex(-1); // reset
    }, 300),
    [products]
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    dispatch(setSearch(value));
    performSearch(value);
  };

  const handleSuggestionClick = (item) => {
    dispatch(setSearch(item.title));
    setSuggestions([]);
    navigate(`/product/${item.id}`); // ⬅ يوديك على صفحة المنتج
  };

  // التعامل مع الأسهم والـ Enter
  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[highlightedIndex]);
    }
  };

  // إغلاق عند الضغط خارج
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        dispatch(setSearch(""));
        setSuggestions([]);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

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
              {/* مربع البحث */}
              <div className="search-bar" style={{ position: "relative" }} ref={searchRef}>
                <input
                  type="text"
                  value={searchValue}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown} // ⬅ إضافة التحكم بالكيبورد
                  placeholder={t("searchPlaceholder")}
                  aria-label={t("searchPlaceholder")}
                  aria-expanded={suggestions.length > 0}
                  aria-haspopup="listbox"
                />
                <button className="search-button" aria-label="Search">
                  <FiSearch />
                </button>

                {suggestions.length > 0 && (
                  <ul
                    role="listbox"
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
                    {suggestions.map((item, index) => (
                      <li
                        key={item.id}
                        role="option"
                        style={{
                          padding: "8px",
                          cursor: "pointer",
                          background: index === highlightedIndex ? "#eee" : "#fff",
                          borderBottom: "1px solid #eee",
                        }}
                        onClick={() => handleSuggestionClick(item)}
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
