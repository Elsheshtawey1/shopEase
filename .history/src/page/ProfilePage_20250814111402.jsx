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
const OrderItem = React.memo(({ order, onCancel, t }) => {
  return (
    <li className="order-item">
      <div>
        <strong>
          {t("order")} #{order.id}
        </strong>{" "}
        — {t("date")}: {order.date}
      </div>
      <div>
        {t("total")}: ${order.totalPrice.toFixed(2)}
      </div>
      <div>
        {t("shippingTo")}: {order.shippingAddress.city}, {order.shippingAddress.country}
      </div>
      <button className="btn-cancel-order" onClick={() => onCancel(order.id)}>
        {t("cancelOrder")}
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
  const theme = useSelector((state) => state.theme.mode);

  const { t, i18n } = useTranslation();

  // تغيير اللغة وتحديث اتجاه الصفحة
  const selectLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setShowLangMenu(false);
  };

  // Logout function
  const handleLogout = () => {
    MySwal.fire({
      title: t("areYouSure"),
      text: t("confirmLogout"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--color-primary)",
      cancelButtonColor: "var(--color-error)",
      confirmButtonText: t("yesLogout"),
    }).then((result) => {
      if (result.isConfirmed) {
        const auth = getAuth();
        signOut(auth)
          .then(() => {
            dispatch(logoutUser());
            Swal.fire(t("loggedOut"), t("logoutSuccess"), "success");
            navigate("/");
          })
          .catch(() => {
            Swal.fire(t("error"), t("somethingWentWrong"), "error");
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

  // Cancel an order
  const cancelOrder = (orderId) => {
    MySwal.fire({
      title: t("cancelOrderQ"),
      text: t("confirmCancelOrder"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--color-error)",
      cancelButtonColor: "var(--color-primary)",
      confirmButtonText: t("yesCancel"),
      cancelButtonText: t("noKeep"),
    }).then((result) => {
      if (result.isConfirmed) {
        let savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
        savedOrders = savedOrders.filter((order) => order.id !== orderId);
        localStorage.setItem("orders", JSON.stringify(savedOrders));
        setOrders((prev) => prev.filter((order) => order.id !== orderId));
        Swal.fire(t("canceled"), t("orderCanceled"), "success");
      }
    });
  };

  // Toggle dark/light theme
  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      document.body.setAttribute("data-theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  // Mask email
  const maskEmail = (email) => {
    if (!email) return t("notProvided");
    const [name, domain] = email.split("@");
    const maskedName = name.length > 2 ? name[0] + "*".repeat(name.length - 2) + name[name.length - 1] : name[0] + "*";
    return `${maskedName}@${domain}`;
  };

  return (
    <div className={`profile-page-container ${darkMode ? "dark" : ""}`}>
      {/* Header */}
      <header className="profile-header">
        <h1>{t("myProfile")}</h1>
        <div className="profile-actions">
          {/* Language selector */}
          <div className="lang-selector">
            <button onClick={() => setShowLangMenu((prev) => !prev)} aria-label={t("toggleLangMenu")} className="btn-translate">
              🌐 {i18n.language === "en" ? "English" : "عربي"}
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

          {/* Theme toggle */}
          <button onClick={() => dispatch(toggleTheme())}>{theme === "dark" ? "🌙 Dark" : "☀️ Light"}</button>
        </div>
      </header>

      {/* Main content */}
      <main className="profile-main-content">
        {/* Left panel */}
        <section className="user-info-panel">
          <div className="avatar-wrapper">
            <img src={user?.avatar || "/img/undraw_male-avatar_zkzx.svg"} alt={`${user?.userName || t("guest")}`} className="profile-avatar" />
          </div>

          {user ? (
            <>
              <h2>{user.userName || t("user")}</h2>
              <p className="user-email">
                {t("email")}: {maskEmail(user.email)}
              </p>
              <button className="btn-logout" onClick={handleLogout}>
                {t("logout")}
              </button>
            </>
          ) : (
            <>
              <h2>{t("guestAccount")}</h2>
              <p>{t("pleaseRegister")}</p>
              <NavLink to="/Registration" className="btn-register">
                {t("registerLogin")}
              </NavLink>
            </>
          )}
        </section>

        {/* Right panel */}
        <section className="orders-panel">
          <h3>{t("myOrders")}</h3>
          {user ? (
            orders.length === 0 ? (
              <p>{t("noOrders")}</p>
            ) : (
              <ul className="orders-list">
                {orders.map((order) => (
                  <OrderItem key={order.id} order={order} onCancel={cancelOrder} t={t} />
                ))}
              </ul>
            )
          ) : (
            <p>{t("pleaseLoginOrders")}</p>
          )}

          {/* Support section */}
          <div className="support-section">
            <h4>{t("needHelp")}</h4>
            <p>{t("supportText")}</p>
            <NavLink to="/Contact" className="btn-support">
              {t("contactSupport")}
            </NavLink>
          </div>
        </section>
      </main>
    </div>
  );
}
