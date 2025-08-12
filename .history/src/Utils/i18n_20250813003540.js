import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend) // لتحميل ملفات الترجمة من public
  .use(initReactI18next)
  .init({
    lng: "en", // اللغة الافتراضية
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // مسار ملفات الترجمة
    },
  });

// ضبط خصائص الـ <html> عند تحميل الصفحة وتغيير اللغة
function updateHtmlAttributes(lng) {
  document.documentElement.lang = lng;
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";

  document.documentElement.classList.remove("lang-ar", "lang-en");
  document.documentElement.classList.add(lng === "ar" ? "lang-ar" : "lang-en");
}

// عند بدء التهيئة، نفذ مرة واحدة
updateHtmlAttributes(i18n.language);

// عند تغيير اللغة، حدث خصائص الـ html
i18n.on("languageChanged", (lng) => {
  updateHtmlAttributes(lng);
});

export default i18n;
