import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../style/InfoPages.css";

const Blog = () => {
  const { t } = useTranslation();

  return (
    <div className="info-page">
      <div className="breadcrumb">
        <Link to="/">{t("breadcrumbHome")}</Link> / <span>{t("breadcrumbCurrentBlog")}</span>
      </div>

      <h1>{t("blogTitle")}</h1>
      <p>{t("blogIntro")}</p>

      <section>
        <h2>{t("recentArticlesTitle")}</h2>
        <ul>
          {t("recentArticlesList", { returnObjects: true }).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{t("stayConnectedTitle")}</h2>
        <p>{t("stayConnectedText")}</p>
      </section>
    </div>
  );
};

export default Blog;
