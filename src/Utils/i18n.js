import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend) // تحميل ملفات الترجمة من public
  .use(initReactI18next)
  .init({
    lng: "en", // اللغة الافتراضية
    fallbackLng: "en", // لو مفيش ترجمة للغة دي
    interpolation: { escapeValue: false },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // مكان ملفات الترجمة
    },
  });

// تغيير اتجاه الموقع بناءً على اللغة
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
});

export default i18n;
