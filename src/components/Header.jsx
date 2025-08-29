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
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const searchRef = useRef(null);
  const navLinksRef = useRef(null); // ref للـ nav-links
  const navigate = useNavigate();

  const searchValue = useSelector((state) => state.search);
  const products = useSelector((state) => state.app.product);
  const wishlist = useSelector((state) => state.app.wishlist);
  const cart = useSelector((state) => state.app.product);

  const dispatch = useDispatch();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const performSearch = useCallback(
    debounce((value) => {
      if (value.trim() === "") {
        setSuggestions([]);
        setHighlightedIndex(-1);
        return;
      }
      const filtered = products.filter((p) => p.title.toLowerCase().includes(value.toLowerCase()));
      setSuggestions(filtered.slice(0, 5));
      setHighlightedIndex(-1);
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
    navigate(`/product/${item.id}`);
  };

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target) && navLinksRef.current && !navLinksRef.current.contains(event.target)) {
        dispatch(setSearch(""));
        setSuggestions([]);
        setHighlightedIndex(-1);
        setMenuOpen(false); // نقفل المينيو لو مفتوح
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

  return (
    <>
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

      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <Container>
          <div className="navbar-container">
            <div className="logo">MyLogo</div>

            <div className={`nav-links ${menuOpen ? "open" : ""}`} ref={navLinksRef}>
              <div className="search-bar" ref={searchRef}>
                <input
                  type="text"
                  value={searchValue}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  placeholder={t("searchPlaceholder")}
                  aria-label={t("searchPlaceholder")}
                  aria-expanded={suggestions.length > 0}
                  aria-haspopup="listbox"
                  aria-autocomplete="list"
                  aria-controls="search-suggestions"
                  aria-activedescendant={highlightedIndex >= 0 ? `suggestion-${highlightedIndex}` : undefined}
                />
                <button className="search-button" aria-label="Search">
                  <FiSearch />
                </button>

                {suggestions.length > 0 && (
                  <ul id="search-suggestions" role="listbox" className="search-dropdown" aria-label="Search suggestions">
                    {suggestions.map((item, index) => (
                      <li
                        key={item.id}
                        id={`suggestion-${index}`}
                        role="option"
                        aria-selected={index === highlightedIndex}
                        style={{
                          background: index === highlightedIndex ? "#eee" : "#fff",
                        }}
                        onClick={() => handleSuggestionClick(item)}
                        onMouseEnter={() => setHighlightedIndex(index)}
                      >
                        {item.title}
                      </li>
                    ))}
                  </ul>
                )}
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
              <NavLink to="/ProfilePage" className="icon profile-icon" aria-label="My profile">
                <FiUser />
                <span className="visually-hidden">My profile</span>
              </NavLink>
              <NavLink to="/wishlist" className="icon wishlist-icon" aria-label={`Wishlist (${wishlist.length} items)`} aria-live="polite">
                <FiHeart />
                <span className="cart-count">{wishlist.length}</span>
                <span className="visually-hidden">items in wishlist</span>
              </NavLink>
              <NavLink to="/cart" className="icon" aria-label={`Shopping cart (${cart.length} items)`} aria-live="polite">
                <FiShoppingCart />
                <span className="cart-count">{cart.length}</span>
                <span className="visually-hidden">items in cart</span>
              </NavLink>

              <button className="menu-toggle" onClick={toggleMenu} aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? "Close menu" : "Open menu"}>
                {menuOpen ? <FiX /> : <FiMenu />}
                <span className="visually-hidden">{menuOpen ? "Close menu" : "Open menu"}</span>
              </button>
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
};

export default Navbar;
