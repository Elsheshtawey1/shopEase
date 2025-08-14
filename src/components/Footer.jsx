import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import "../style/Footer.css";
import Container from "./Container";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  // a11y: Current year for copyright
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      {/* a11y: Wrapper div for main footer content */}
      <Container>
        <div className="footer-main">
          <div className="footer-column">
            <h2 className="visually-hidden">{t("footer.siteLinks")}</h2>
            <h3>{t("footer.aboutUs")}</h3>
            <ul>
              <li>
                <Link to="/companyinfo">{t("footer.companyInfo")}</Link>
              </li>
              <li>
                <Link to="/careers">{t("footer.careers")}</Link>
              </li>
              <li>
                <Link to="/press">{t("footer.press")}</Link>
              </li>
              <li>
                <Link to="/blog">{t("footer.blog")}</Link>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>{t("footer.customerService")}</h3>
            <ul>
              <li>
                <Link to="/contact">{t("footer.contactUs")}</Link>
              </li>
              <li>
                <Link to="/Returns">{t("footer.returns")}</Link>
              </li>
              <li>
                <Link to="/faq" className="faq-Footer">
                  {t("footer.faqs")}
                </Link>
              </li>
              <li>
                <Link to="/ShippingInfo">{t("footer.shippingInfo")}</Link>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>{t("footer.shop")}</h3>
            <ul>
              <li>{t("footer.men")}</li>
              <li>{t("footer.women")}</li>
              <li>{t("footer.electronics")}</li>
              <li>{t("footer.homeGarden")}</li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>{t("footer.followUs")}</h3>
            <div className="social-icons">
              <a 
                href="https://www.linkedin.com/in/mohamed-elsheshtawey/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook (opens in new tab)"
                className="social-link"
              >
                <FaFacebookF />
                <span className="visually-hidden">Facebook (opens in new tab)</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/mohamed-elsheshtawey/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram (opens in new tab)"
                className="social-link"
              >
                <FaInstagram />
                <span className="visually-hidden">Instagram (opens in new tab)</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/mohamed-elsheshtawey/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Twitter (opens in new tab)"
                className="social-link"
              >
                <FaTwitter />
                <span className="visually-hidden">Twitter (opens in new tab)</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/mohamed-elsheshtawey/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="YouTube (opens in new tab)"
                className="social-link"
              >
                <FaYoutube />
                <span className="visually-hidden">YouTube (opens in new tab)</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom" role="contentinfo">
          <p>
            <span role="text">
              <span aria-hidden="true">©</span> {currentYear} elsheshtawey. {t("footer.rights")}
            </span>
          </p>
          <p>{t("footer.moreInfo")}</p>
          {/* a11y: Hidden link to top of page for keyboard users */}
          <a href="#" className="back-to-top" aria-label="Back to top">
            <span aria-hidden="true">↑</span>
            <span className="visually-hidden">Back to top</span>
          </a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
