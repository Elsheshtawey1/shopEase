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

  const ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT_ID;

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    if (selectedReason) {
      formData.append("reason", selectedReason);
    }

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (res.ok) {
        toast.success(t("message_sent_success"), { position: "bottom-right" });
        e.target.reset();
        setSelectedReason("");
      } else {
        toast.error(t("message_sent_error"), { position: "bottom-right" });
      }
    } catch (error) {
      toast.error(t("network_error"), { position: "bottom-right" });
    } finally {
      setLoading(false);
    }
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
        <form className="contact-form" onSubmit={handleSubmit} aria-label={t("contact_form")} role="form">
          <input type="text" name="name" placeholder={t("your_name")} required />
          <input type="email" name="email" placeholder={t("your_email")} required />

          <div className="reason-options">
            {reasons.map((reason) => (
              <div key={reason} className={`reason-option ${selectedReason === reason ? "selected" : ""}`} onClick={() => setSelectedReason(reason)}>
                {reason}
              </div>
            ))}
          </div>

          {/* نخليها تبعت حتى لو المستخدم منساش يختار */}
          <input type="hidden" name="reason" value={selectedReason} />

          <textarea name="message" placeholder={t("your_message")} rows="5" required></textarea>

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
