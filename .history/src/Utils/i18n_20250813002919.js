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
  // إضافة class عام للغة (مثلاً: 'lang-ar' أو 'lang-en')

  }, [i18n.language]);


// تغيير اتجاه الموقع بناءً على اللغة
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
      document.documentElement.classList.remove("lang-ar", "lang-en");
    document.documentElement.classList.add(i18n.language === "ar" ? "lang-ar" : "lang-en");
});

export default i18n;
