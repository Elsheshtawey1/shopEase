import React from "react";
import { Link } from "react-router-dom";
import "../style/InfoPages.css";

const CompanyInfo = () => {
  return (
    <div className="info-page">
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <span>Company Info</span>
      </div>
      <h1>About Our Company</h1>
      <p>
        We are a global e-commerce platform dedicated to providing the highest quality products at competitive prices. Since our launch, we’ve served millions of customers with a seamless online
        shopping experience.
      </p>

      <section>
        <h2>Our Mission</h2>
        <p>To simplify the online shopping journey by offering trustworthy products, fast shipping, and exceptional customer service.</p>
      </section>

      <section>
        <h2>Our Values</h2>
        <ul>
          <li>Customer Obsession</li>
          <li>Innovation</li>
          <li>Integrity</li>
          <li>Sustainability</li>
        </ul>
      </section>

      <section>
        <h2>Contact & Support</h2>
        <p>
          For inquiries, please visit our <Link to="/contact">Contact Us</Link> page.
        </p>
      </section>
    </div>
  );
};

export default CompanyInfo;
