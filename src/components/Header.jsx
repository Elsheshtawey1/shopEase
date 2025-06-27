import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiUser, FiShoppingCart, FiHeart, FiMenu, FiX, FiSearch } from "react-icons/fi";
import { FaFacebookF, FaTwitter, FaInstagram,} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import "../style/NavBar.css";
import Container from "./Container";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { logoutUser } from "../redux/appSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
const Navbar = () => {
  const dispatch =useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const product = useSelector((state) => state.app.product);
  const user = useSelector((state) => state.app.user);
  const handleLogout = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "Do you really want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
      cancelButtonText: "No, keep me logged in",
    })
      .then((result) => {
        if (result.isConfirmed) {
          const auth = getAuth();
          signOut(auth).then(() => {
            dispatch(logoutUser());
            Swal.fire("Logged out!", "You have been logged out successfully.", "success");
            // Sign-out successful.
          });
        }
      })
      .catch((error) => {
        // An error happened.
        toast.error(error.message);
      });
  }
  return (
    <>
      <div className="offer-bar">
        <div className="offer-text">
          <p className="animated-offer">🎉 Special Offer: Get 20% off on your first purchase!</p>
        </div>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
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
                <input type="text" placeholder="Search..." />
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

            {/* fav icon */}
            <div className="right-icons">
              {/*login */}
              <NavLink to={user ? "/" : "/Registration"} className="icon user-icon">
                {user ? <span className="username">{user.userName || "User"}</span> : <FiUser />}
              </NavLink>

              {/* logout */}
              {user && (
                <button className="logout-button" onClick={handleLogout}>
                  <FiLogOut />
                </button>
              )}

              {/* <NavLink to="/favorites" className="icon">
                <FiHeart />
              </NavLink> */}
              {/* cart icon */}
              <NavLink to="/cart" className="icon">
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
