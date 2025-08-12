import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../style/InfoPages.css";

const Press = () => {
  const { t } = useTranslation();

  return (
    <div className="info-page">
      <div className="breadcrumb">
        <Link to="/">{t("breadcrumbHome")}</Link> / <span>{t("breadcrumbCurrentPress")}</span>
      </div>

      <h1>{t("pressTitle")}</h1>
      <p>{t("pressIntro")}</p>

      <section>
        <h2>{t("pressReleasesTitle")}</h2>
        <ul>
          {t("pressReleasesList", { returnObjects: true }).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{t("mediaContactTitle")}</h2>
        <p>
          {t("mediaContactText")}
          <br />
          <strong>{t("mediaEmail")}:</strong> media@ecommerce.com
        </p>
      </section>
    </div>
  );
};

export default Press;
