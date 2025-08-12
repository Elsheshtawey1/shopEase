import React from "react";
import { Link } from "react-router-dom";
import "../style/InfoPages.css";
const Press = () => {
  return (
    <div className="info-page">
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <span>Press</span>
      </div>
      <h1>Media & Press</h1>
      <p>Welcome to our press room. Here, you can find official press releases, media resources, and recent news about our company.</p>

      <section>
        <h2>Press Releases</h2>
        <ul>
          <li>
            <strong>May 2025:</strong> Company reaches 10 million users worldwide.
          </li>
          <li>
            <strong>Feb 2025:</strong> Launch of our eco-friendly packaging initiative.
          </li>
          <li>
            <strong>Oct 2024:</strong> Partnership with leading logistics provider for faster delivery.
          </li>
        </ul>
      </section>

      <section>
        <h2>Media Contact</h2>
        <p>
          For press inquiries, interviews, or speaker opportunities, please contact:
          <br />
          <strong>Email:</strong> media@ecommerce.com
        </p>
      </section>
    </div>
  );
};

export default Press;
