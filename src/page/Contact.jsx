import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaClock, FaFacebook, FaInstagram, FaWhatsapp, FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";
import "../style/Contact.css";
import { Link } from "react-router-dom";
const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent successfully!", { position: "bottom-right" });
    }, 1500);
  };

  const reasons = ["Order Issue", "Shipping Delay", "Return / Refund", "Business Inquiry", "Other"];

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>Need help with your order? Want to partner with us? We’d love to hear from you!</p>
        <Link to="/Faq" className="faq-link">
          Check our FAQ before contacting us
        </Link>
      </div>

      <div className="contact-body">
        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />

          <div className="reason-options">
            {reasons.map((reason) => (
              <div key={reason} className={`reason-option ${selectedReason === reason ? "selected" : ""}`} onClick={() => setSelectedReason(reason)}>
                {reason}
              </div>
            ))}
          </div>

          <textarea placeholder="Your Message" rows="5" required></textarea>

          <button type="submit" disabled={loading}>
            {loading ? (
              "Sending..."
            ) : (
              <>
                <FaPaperPlane /> Send Message
              </>
            )}
          </button>
        </form>

        <div className="contact-info">
          <h2>Customer Support</h2>
          <p>
            <FaEnvelope /> support@yourecom.com
          </p>
          <p>
            <FaPhone /> +20 123 456 789
          </p>
          <p>
            <FaClock /> Sat - Thu, 10 AM - 6 PM
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
