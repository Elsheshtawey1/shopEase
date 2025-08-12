import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../style/InfoPages.css";

const Careers = () => {
  const { t } = useTranslation();

  return (
    <div className="info-page">
      <div className="breadcrumb">
        <Link to="/">{t("breadcrumbHome")}</Link> / <span>{t("breadcrumbCurrentCareers")}</span>
      </div>

      <h1>{t("careersTitle")}</h1>
      <p>{t("careersIntro")}</p>

      <section>
        <h2>{t("whyWorkTitle")}</h2>
        <ul>
          {t("whyWorkList", { returnObjects: true }).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{t("openPositionsTitle")}</h2>
        <p>{t("openPositionsIntro")}</p>
        <ul>
          {t("openPositionsList", { returnObjects: true }).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p>
          {t("applyText")} <strong>careers@ecommerce.com</strong> {t("or")} <Link to="/contact">{t("contactLink")}</Link>.
        </p>
      </section>
    </div>
  );
};

export default Careers;
