import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPhone, FaEnvelope, FaClock, FaFacebook, FaInstagram, FaWhatsapp, FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";
import "../style/Contact.css";
import { Link } from "react-router-dom";

const Contact = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      toast.success(t("message_sent_success"), { position: "bottom-right" });
      e.target.reset();
    }, 1500);
  };

  const reasons = [t("order_issue"), t("shipping_delay"), t("return_refund"), t("business_inquiry"), t("other")];

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>{t("contact_us")}</h1>
        <p>{t("contact_us_subtitle")}</p>
        <Link to="/Faq" className="faq-link">
          {t("check_faq")}
        </Link>
      </div>

      <div className="contact-body">
        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" placeholder={t("your_name")} required />
          <input type="email" placeholder={t("your_email")} required />

          <div className="reason-options">
            {reasons.map((reason) => (
              <div key={reason} className={`reason-option ${selectedReason === reason ? "selected" : ""}`} onClick={() => setSelectedReason(reason)}>
                {reason}
              </div>
            ))}
          </div>

          <textarea placeholder={t("your_message")} rows="5" required></textarea>

          <button type="submit" disabled={loading}>
            {loading ? (
              t("sending")
            ) : (
              <>
                <FaPaperPlane /> {t("send_message")}
              </>
            )}
          </button>
        </form>

        <div className="contact-info">
          <h2>{t("customer_support")}</h2>
          <p>
            <FaEnvelope /> {t("support_email")}
          </p>
          <p>
            <FaPhone /> {t("support_phone")}
          </p>
          <p>
            <FaClock /> {t("support_hours")}
          </p>

          <div className="social-icons">
            <a href="#">
              <FaFacebook />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
