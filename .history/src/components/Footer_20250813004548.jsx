import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import "../style/Footer.css";
import Container from "./Container";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <Container>
        <div className="footer-main">
          <div className="footer-column">
            <h4>{t("footer.aboutUs")}</h4>
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
            <h4>{t("footer.customerService")}</h4>
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
            <h4>{t("footer.shop")}</h4>
            <ul>
              <li>{t("footer.men")}</li>
              <li>{t("footer.women")}</li>
              <li>{t("footer.electronics")}</li>
              <li>{t("footer.homeGarden")}</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>{t("footer.followUs")}</h4>
            <div className="social-icons">
              <a href="https://www.linkedin.com/in/mohamed-elsheshtawey/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://www.linkedin.com/in/mohamed-elsheshtawey/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com/in/mohamed-elsheshtawey/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="https://www.linkedin.com/in/mohamed-elsheshtawey/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} elsheshtawey. {t("footer.rights")}
          </p>
          <p>{t("footer.moreInfo")}</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
