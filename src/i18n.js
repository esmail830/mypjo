import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

i18n.translations = {
  en: {
    login: 'Login',
    register: 'Register',
    home: 'Home',
    logout: 'Logout',
    welcome: 'Welcome to Services App'
  },
  ar: {
    login: 'تسجيل الدخول',
    register: 'إنشاء حساب',
    home: 'الرئيسية',
    logout: 'تسجيل خروج',
    welcome: 'مرحباً بك في تطبيق الخدمات'
  }
};

i18n.locale = Localization.locale || 'ar';
i18n.fallbacks = true;

export default i18n;
