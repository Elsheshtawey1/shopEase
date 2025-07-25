// Returns.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "../Style/InfoPages.css";

const Returns = () => {
  return (
    <main className="info-page">
      <nav className="breadcrumb">
        <NavLink to="/">Home</NavLink> / <span>Returns</span>
      </nav>

      <h1>Return & Refund Policy</h1>
      <p>Your satisfaction is our top priority. If you're not completely satisfied with your purchase, we're here to help.</p>

      <h2>Return Conditions</h2>
      <ul>
        <li>Items must be returned within 14 days of delivery.</li>
        <li>Products must be unused, in original packaging, and include all tags and accessories.</li>
        <li>Sale or clearance items are non-returnable unless defective.</li>
      </ul>

      <h2>How to Initiate a Return</h2>
      <p>
        To start a return, please visit your <NavLink to="/account/orders">Orders</NavLink> page and select the item you'd like to return. You'll receive instructions and a return label via email.
      </p>

      <h2>Refunds</h2>
      <p>Refunds are issued to the original payment method within 5-7 business days after the returned item is received and inspected.</p>

      <h2>Exchanges</h2>
      <p>Need a different size or color? Simply return the original item and place a new order.</p>
    </main>
  );
};

export default Returns;
