import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../style/InfoPages.css";

const ShippingInfo = () => {
  const { t } = useTranslation();

  return (
    <main className="info-page">
      <nav className="breadcrumb">
        <NavLink to="/">{t("breadcrumbHome")}</NavLink> / <span>{t("shippingInfo")}</span>
      </nav>

      <h1>{t("shippingInformation")}</h1>
      <p>{t("shippingCommitment")}</p>

      <h2>{t("shippingMethods")}</h2>
      <p>{t("shippingMethodsDescription")}</p>
      <ul>
        <li>
          <strong>{t("standardShipping")}:</strong> {t("standardShippingDesc")}
        </li>
        <li>
          <strong>{t("expressShipping")}:</strong> {t("expressShippingDesc")}
        </li>
        <li>
          <strong>{t("localPickup")}:</strong> {t("localPickupDesc")}
        </li>
      </ul>

      <h2>{t("shippingCosts")}</h2>
      <p>{t("shippingCostsDesc")}</p>

      <h2>{t("trackingOrder")}</h2>
      <p>
        {t("trackingOrderDesc")} <NavLink to="/track-order">{t("trackOrderLink")}</NavLink>.
      </p>

      <h2>{t("internationalShipping")}</h2>
      <p>{t("internationalShippingDesc")}</p>
    </main>
  );
};

export default ShippingInfo;
