import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../style/InfoPages.css";

const CompanyInfo = () => {
  const { t } = useTranslation();

  return (
    <div className="info-page">
      <div className="breadcrumb">
        <Link to="/">{t("breadcrumbHome")}</Link> / <span>{t("breadcrumbCurrent")}</span>
      </div>

      <h1>{t("pageTitle")}</h1>
      <p>{t("pageDescription")}</p>

      <section>
        <h2>{t("missionTitle")}</h2>
        <p>{t("missionText")}</p>
      </section>

      <section>
        <h2>{t("valuesTitle")}</h2>
        <ul>
          {t("valuesList", { returnObjects: true }).map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{t("contactTitle")}</h2>
        <p>
          {t("contactText")} <Link to="/contact">{t("contactLink")}</Link>.
        </p>
      </section>
    </div>
  );
};

export default CompanyInfo;
