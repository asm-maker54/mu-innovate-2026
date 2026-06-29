import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// English Translations
const enTranslation = {
  landing: {
    title: 'Minia University Innovation & Entrepreneurship Summit 2026',
    slogan: 'From Idea to Startup... From Research to Market',
    register: 'Register',
    explore: 'Explore Innovation',
  },
  auth: {
    login: 'Login',
    register: 'Register',
  },
  dashboard: {
    welcome: 'Welcome to your Dashboard',
  }
};

// Arabic Translations
const arTranslation = {
  landing: {
    title: 'قمة جامعة المنيا للابتكار وريادة الأعمال ٢٠٢٦',
    slogan: 'من الفكرة إلى الشركة الناشئة... من البحث العلمي إلى السوق',
    register: 'سجل الآن',
    explore: 'استكشف الابتكار',
  },
  auth: {
    login: 'تسجيل الدخول',
    register: 'إنشاء حساب',
  },
  dashboard: {
    welcome: 'مرحباً بك في لوحة التحكم',
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      ar: { translation: arTranslation }
    },
    lng: 'ar', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
