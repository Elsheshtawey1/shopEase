import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiUser, FiShoppingCart, FiHeart, FiMenu, FiX, FiSearch } from "react-icons/fi";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import Container from "./Container";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { setSearch } from "../redux/searchSlice";

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

    const filtered = products.filter((p) => p.title.toLowerCase().includes(value.toLowerCase()));
    setSuggestions(filtered.slice(0, 5));
  };

  const handleSuggestionClick = (product) => {
    setSuggestions([]);
    dispatch(setSearch(""));
    navigate(`/product/${product.id}`); // روح لصفحة المنتج
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
      {/* شريط العروض */}
      <div className="bg-gray-900 text-white flex justify-between px-4 py-2 text-sm">
        <p className="animate-pulse">{t("specialOffer")}</p>
        <div className="flex gap-3">
          <FaFacebookF className="cursor-pointer hover:text-blue-400" />
          <FaTwitter className="cursor-pointer hover:text-sky-400" />
          <FaInstagram className="cursor-pointer hover:text-pink-400" />
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-white shadow sticky top-0 z-50">
        <Container>
          <div className="flex items-center justify-between py-3">
            <div className="text-xl font-bold">MyLogo</div>

            <div className={`md:flex gap-6 items-center ${menuOpen ? "block" : "hidden"}`}>
              {/* Search */}
              <div className="relative" ref={searchRef}>
                <input
                  type="text"
                  value={searchValue}
                  onChange={handleSearchChange}
                  placeholder={t("searchPlaceholder")}
                  className="border rounded-full px-4 py-2 w-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="absolute right-3 top-2.5 text-gray-500">
                  <FiSearch />
                </button>

                {/* Dropdown */}
                {suggestions.length > 0 && (
                  <ul className="absolute mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden z-50">
                    {suggestions.map((item) => (
                      <li key={item.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition" onClick={() => handleSuggestionClick(item)}>
                        {item.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Links */}
              <NavLink to="/" className="hover:text-blue-600">
                {t("nav.home")}
              </NavLink>
              <NavLink to="/AllProductsPage" className="hover:text-blue-600">
                {t("nav.products")}
              </NavLink>
              <NavLink to="/about" className="hover:text-blue-600">
                {t("nav.about")}
              </NavLink>
              <NavLink to="/contact" className="hover:text-blue-600">
                {t("nav.contact")}
              </NavLink>
            </div>

            {/* Icons */}
            <div className="flex gap-4 items-center">
              <NavLink to="/ProfilePage" className="relative hover:text-blue-600">
                <FiUser size={20} />
              </NavLink>
              <NavLink to="/wishlist" className="relative hover:text-blue-600">
                <FiHeart size={20} />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">{wishlist.length}</span>
              </NavLink>
              <NavLink to="/cart" className="relative hover:text-blue-600">
                <FiShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full px-1">{cart.length}</span>
              </NavLink>

              {/* Menu toggle */}
              <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
                {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </div>
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
};

export default Navbar;
