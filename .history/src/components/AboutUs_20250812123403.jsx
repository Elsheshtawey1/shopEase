// AboutUs.jsx
import React, { useEffect } from "react";
import "../style/AboutUs.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const { t } = useTranslation();

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
      title: t("about.sections.story.title"),
      content: t("about.sections.story.content"),
    },
    {
      title: t("about.sections.mission.title"),
      content: t("about.sections.mission.content"),
    },
    {
      title: t("about.sections.values.title"),
      content: t("about.sections.values.content"),
    },
    {
      title: t("about.sections.growth.title"),
      content: t("about.sections.growth.content"),
    },
    {
      title: t("about.sections.team.title"),
      content: t("about.sections.team.content"),
      cta: (
        <Link to="/careers" className="inline-link">
          {t("about.sections.team.cta")}
        </Link>
      ),
    },
  ];

  return (
    <section className="about-rich-container">
      <div className="hero-rich fade-up">
        <h1>{t("about.hero.title")}</h1>
        <p>{t("about.hero.subtitle")}</p>
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
        <h2>{t("about.ctaBanner.title")}</h2>
        <p>{t("about.ctaBanner.subtitle")}</p>
        <Link to="/contact" className="cta-button">
          {t("about.ctaBanner.button")}
        </Link>
      </div>
    </section>
  );
};

export default AboutUs;
