// ShippingInfo.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "../style/InfoPages.css";

const ShippingInfo = () => {
  return (
    <main className="info-page">
      <nav className="breadcrumb">
        <NavLink to="/">Home</NavLink> / <span>Shipping Info</span>
      </nav>

      <h1>Shipping Information</h1>
      <p>We’re committed to delivering your orders swiftly, safely, and efficiently across the country.</p>

      <h2>Shipping Methods</h2>
      <p>We offer the following shipping options to suit your needs:</p>
      <ul>
        <li>
          <strong>Standard Shipping:</strong> 3-5 business days
        </li>
        <li>
          <strong>Express Shipping:</strong> 1-2 business days
        </li>
        <li>
          <strong>Local Pickup:</strong> Available for select locations
        </li>
      </ul>

      <h2>Shipping Costs</h2>
      <p>Shipping costs vary depending on the shipping method selected and the delivery location. Orders over $75 qualify for free standard shipping.</p>

      <h2>Tracking Your Order</h2>
      <p>
        Once your order is shipped, a tracking number will be emailed to you. You can also <NavLink to="/track-order">track your order here</NavLink>.
      </p>

      <h2>International Shipping</h2>
      <p>Currently, we only ship within the country. We’re working on expanding to international markets soon.</p>
    </main>
  );
};

export default ShippingInfo;
