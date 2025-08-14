import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiUser, FiShoppingCart, FiHeart, FiMenu, FiX, FiSearch } from "react-icons/fi";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import Container from "./Container";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { setSearch } from "../redux/searchSlice";
import "../style/NavBar.css";

const Navbar = () => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const searchValue = useSelector((state) => state.search);
  const products = useSelector((state) => state.app.product);
  const wishlist = useSelector((state) => state.app.wishlist);
  const cart = useSelector((state) => state.app.product);

  const dispatch = useDispatch();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    dispatch(setSearch(value));

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = products.filter((p) =>
      p.title.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 5));
  };

  const handleSuggestionClick = (product) => {
    setSuggestions([]);
    dispatch(setSearch(""));
    navigate(`/product/${product.id}`);
  };

  // إخفاء القائمة عند الضغط خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="offer-bar">
        <div className="offer-text">
          <p className="animated-offer">{t("specialOffer")}</p>
        </div>
        <div className="social-icons-nav">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaInstagram /></a>
        </div>
      </div>

      <nav className="navbar">
        <Container>
          <div className="navbar-container">
            <div className="logo">MyLogo</div>

            <div className={`nav-links ${menuOpen ? "open" : ""}`}>
              {/* Search */}
              <div className="search-bar-wrapper" ref={searchRef}>
                <div className="search-bar">
                  <input
                    type="text"
                    value={searchValue}
                    onChange={handleSearchChange}
                    placeholder={t("searchPlaceholder")}
                  />
                  <button className="search-button">
                    <FiSearch />
                  </button>
                </div>

                {/* Dropdown */}
                {suggestions.length > 0 && (
                  <ul className="search-dropdown">
                    {suggestions.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => handleSuggestionClick(item)}
                      >
                        {item.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <NavLink to="/">{t("nav.home")}</NavLink>
              <NavLink to="/AllProductsPage">{t("nav.products")}</NavLink>
              <NavLink to="/about">{t("nav.about")}</NavLink>
              <NavLink to="/contact">{t("nav.contact")}</NavLink>
            </div>

            <div className="right-icons">
              <NavLink to="/ProfilePage"><FiUser /></NavLink>
              <NavLink to="/wishlist">
                <FiHeart />
                <span className="cart-count">{wishlist.length}</span>
              </NavLink>
              <NavLink to="/cart">
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
