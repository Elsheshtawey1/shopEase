import React from "react";
import { Link } from "react-router-dom";
import "../style/InfoPages.css";
const Careers = () => {
  return (
    <div className="info-page">
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <span>Careers</span>
      </div>
      <h1>Join Our Team</h1>
      <p>
        At our company, we believe in nurturing talent and creating an environment where innovation thrives. If you’re passionate about e-commerce and want to grow in a fast-paced digital world, we’d
        love to hear from you.
      </p>

      <section>
        <h2>Why Work With Us?</h2>
        <ul>
          <li>Flexible remote work options</li>
          <li>Continuous learning and training opportunities</li>
          <li>Collaborative and inclusive culture</li>
          <li>Employee discounts and wellness benefits</li>
        </ul>
      </section>

      <section>
        <h2>Open Positions</h2>
        <p>We are currently hiring for roles in:</p>
        <ul>
          <li>Frontend Developers</li>
          <li>Customer Service Representatives</li>
          <li>Logistics & Operations</li>
          <li>Marketing & SEO Specialists</li>
        </ul>
        <p>
          To apply, send your resume to <strong>careers@ecommerce.com</strong> or visit our <Link to="/contact">Contact Us</Link> page.
        </p>
      </section>
    </div>
  );
};

export default Careers;
