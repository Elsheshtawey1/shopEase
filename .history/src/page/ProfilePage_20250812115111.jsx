import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { logoutUser } from "../redux/appSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { NavLink, useNavigate } from "react-router-dom";
import "../style/profile-page.css";
import { useTranslation } from "react-i18next";

const MySwal = withReactContent(Swal);

// Memoized OrderItem component to avoid unnecessary re-renders
const OrderItem = React.memo(({ order, onCancel }) => {
  return (
    <li className="order-item">
      <div>
        <strong>Order #{order.id}</strong> — Date: {order.date}
      </div>
      <div>Total: ${order.totalPrice.toFixed(2)}</div>
      <div>
        Shipping To: {order.shippingAddress.city}, {order.shippingAddress.country}
      </div>
      <button className="btn-cancel-order" onClick={() => onCancel(order.id)}>
        Cancel Order
      </button>
    </li>
  );
});

export default function ProfilePage() {
  const user = useSelector((state) => state.app.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [language, setLanguage] = useState("en"); // Store selected language 
  
const { t, i18n } = useTranslation();

const selectLanguage = (lang) => {
  i18n.changeLanguage(lang); // تغيير اللغة فعليًا
  setShowLangMenu(false);
};

  // Logout function
  const handleLogout = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "Do you really want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--color-primary)",
      cancelButtonColor: "var(--color-error)",
      confirmButtonText: "Yes, log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        const auth = getAuth();
        signOut(auth)
          .then(() => {
            dispatch(logoutUser());
            Swal.fire("Logged out!", "You have been logged out successfully.", "success");
            navigate("/");
          })
          .catch(() => {
            Swal.fire("Error", "Something went wrong!", "error");
          });
      }
    });
  };

  // Load user's orders from localStorage filtered by user email
  useEffect(() => {
    if (user?.email) {
      const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      const userOrders = savedOrders.filter((order) => order.userEmail === user.email);
      setOrders(userOrders);
    }
  }, [user]);

  // Cancel an order with confirmation dialog and update storage & state
  const cancelOrder = (orderId) => {
    MySwal.fire({
      title: "Cancel Order?",
      text: "Are you sure you want to cancel this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--color-error)",
      cancelButtonColor: "var(--color-primary)",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        // Remove order from localStorage
        let savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
        savedOrders = savedOrders.filter((order) => order.id !== orderId);
        localStorage.setItem("orders", JSON.stringify(savedOrders));
        // Update orders state
        setOrders((prev) => prev.filter((order) => order.id !== orderId));
        Swal.fire("Canceled!", "The order has been canceled.", "success");
      }
    });
  };

  // Toggle dark/light theme and update the body data attribute accordingly
  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      document.body.setAttribute("data-theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  // Toggle the language selector dropdown visibility
  const toggleLangMenu = () => setShowLangMenu((prev) => !prev);

  // Select a language and close the language menu
  const selectLanguage = (lang) => {
    setLanguage(lang);
    setShowLangMenu(false);
    // Add actual language switch logic here if using i18n or similar
  };

  // Mask the user's email for privacy (e.g. j***e@example.com)
  const maskEmail = (email) => {
    if (!email) return "Not provided";
    const [name, domain] = email.split("@");
    const maskedName = name.length > 2 ? name[0] + "*".repeat(name.length - 2) + name[name.length - 1] : name[0] + "*";
    return `${maskedName}@${domain}`;
  };

  return (
    <div className={`profile-page-container ${darkMode ? "dark" : ""}`}>
      {/* Header */}
      <header className="profile-header">
        <h1>My Profile</h1>
        <div className="profile-actions">
          {/* Language selector */}
          <div className="lang-selector">
            <button onClick={toggleLangMenu} aria-label="Toggle Language Menu" className="btn-translate">
              🌐 {language === "en" ? "English" : "عربي"}
            </button>
            {showLangMenu && (
              <ul className="lang-menu">
                <li>
                  <button onClick={() => selectLanguage("en")}>English</button>
                </li>
                <li>
                  <button onClick={() => selectLanguage("ar")}>عربي</button>
                </li>
              </ul>
            )}
          </div>

          {/* Theme toggle button */}
          <button onClick={toggleTheme} aria-label="Toggle Theme" className="btn-theme-toggle">
            {darkMode ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </header>

      {/* Main content area */}
      <main className="profile-main-content">
        {/* Left panel: User information */}
        <section className="user-info-panel">
          <div className="avatar-wrapper">
            <img src={user?.avatar || "/img/undraw_male-avatar_zkzx.svg"} alt={`${user?.userName || "Guest"} avatar`} className="profile-avatar" />
          </div>

          {user ? (
            <>
              <h2>{user.userName || "User"}</h2>
              <p className="user-email">Email: {maskEmail(user.email)}</p>
              <button className="btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <h2>Guest Account</h2>
              <p>Please register or login to enjoy full features.</p>
              <NavLink to="/Registration" className="btn-register">
                Register / Login
              </NavLink>
            </>
          )}
        </section>

        {/* Right panel: Orders management */}
        <section className="orders-panel">
          <h3>My Orders</h3>
          {user ? (
            orders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              <ul className="orders-list">
                {orders.map((order) => (
                  <OrderItem key={order.id} order={order} onCancel={cancelOrder} />
                ))}
              </ul>
            )
          ) : (
            <p>Please login to view and manage your orders.</p>
          )}

          {/* Support section */}
          <div className="support-section">
            <h4>Need help?</h4>
            <p>If you have any issues or need support, please contact us.</p>
            <NavLink to="/Contact" className="btn-support">
              Contact Support
            </NavLink>
          </div>
        </section>
      </main>
    </div>
  );
}
