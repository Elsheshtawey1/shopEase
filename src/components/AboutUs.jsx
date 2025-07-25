// AboutUs.jsx
import React, { useEffect } from "react";
import "../style/AboutUs.css";
import { Link } from "react-router-dom";

const AboutUs = () => {
  useEffect(() => {
    const revealElements = document.querySelectorAll(".fade-up");
    const onScroll = () => {
      revealElements.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
          el.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sections = [
    {
      title: "Our Story",
      content:
        "Founded in 2022, ShopSphere began as a small digital storefront with a bold mission: make e-commerce smarter, faster, and more customer-focused. Today, we serve millions across the region with a seamless online shopping experience.",
    },
    {
      title: "Our Mission",
      content:
        "We aim to empower customers with a reliable, efficient, and enjoyable way to shop online. From product discovery to doorstep delivery, we focus on making every step simple and satisfying.",
    },
    {
      title: "Core Values",
      content: `
        • Customer Obsession – we put users at the center of every decision.\n
        • Innovation – we adopt modern tech to lead the market.\n
        • Trust & Transparency – we communicate clearly and deliver what we promise.`,
    },
    {
      title: "Growth & Impact",
      content: "With over 10,000 verified vendors and 1M+ SKUs, we’re a hub for small businesses and large brands alike. In 2024 alone, we shipped over 3 million orders across 7 countries.",
    },
    {
      title: "Meet the Team",
      content: "Our diverse team of developers, designers, logistics experts, and customer support professionals work together every day to build something meaningful. Want to be part of it?",
      cta: (
        <Link to="/careers" className="inline-link">
          Explore Careers
        </Link>
      ),
    },
  ];

  return (
    <section className="about-rich-container">
      <div className="hero-rich fade-up">
        <h1>About ShopSphere</h1>
        <p>We’re redefining digital shopping through innovation, speed, and heart.</p>
      </div>

      <div className="about-grid">
        {sections.map((section, i) => (
          <div className="about-card fade-up" key={i}>
            <h2>{section.title}</h2>
            <p>
              {section.content.split("\n").map((line, idx) => (
                <span key={idx}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
            {section.cta && <div className="card-cta">{section.cta}</div>}
          </div>
        ))}
      </div>

      <div className="cta-banner fade-up">
        <h2>Have Questions or Ideas?</h2>
        <p>We’d love to hear from you. Reach out anytime.</p>
        <Link to="/contact" className="cta-button">
          Contact Us
        </Link>
      </div>
    </section>
  );
};

export default AboutUs;
