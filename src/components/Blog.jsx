import React from "react";
import { Link } from "react-router-dom";
import "../Style/InfoPages.css";

const Blog = () => {
  return (
    <div className="info-page">
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <span>Blog</span>
      </div>
      <h1>Our E-Commerce Insights</h1>
      <p>Explore tips, guides, and updates from our team to help you shop smarter and stay informed about the latest in online retail.</p>

      <section>
        <h2>Recent Articles</h2>
        <ul>
          <li>
            <strong>Top 10 Tech Gadgets of 2025</strong> – Discover our favorite innovations this year.
          </li>
          <li>
            <strong>How to Choose the Right Size in Clothing</strong> – A guide for hassle-free fashion shopping.
          </li>
          <li>
            <strong>Returns Made Easy</strong> – A deep dive into our customer-first returns process.
          </li>
        </ul>
      </section>

      <section>
        <h2>Stay Connected</h2>
        <p>Want more updates? Follow us on social media or subscribe to our monthly newsletter.</p>
      </section>
    </div>
  );
};

export default Blog;
