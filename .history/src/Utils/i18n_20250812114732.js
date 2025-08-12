import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: "en", // اللغة الافتراضية
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // مسار ملفات الترجمة
    },
  });

// تغيير اتجاه الموقع تلقائيًا عند تغيير اللغة
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
});

export default i18n;
