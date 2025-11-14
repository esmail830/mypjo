Sudan Service Expo - النموذج الأول (موسّع)

محتويات:
- شاشة تسجيل/دخول
- شاشة رئيسية بالأقسام
- شاشة تفصيلية لطلب العمال مع فلتر
- شاشة حجز الأطباء (وصف المرض + تاريخ)
- ملف firebaseConfig.js جاهز للتعديل لربط Firebase
- إضافة i18n و expo-localization في package.json

تشغيل سريع:
1) ثبت Expo CLI
2) npm install
3) expo start

لربط Firebase:
1) أنشئ مشروع في console.firebase.google.com
2) فعل Authentication (Email/Phone) و Firestore
3) انسخ إعدادات المشروع إلى src/services/firebaseConfig.js
4) استخدم مكتبات firebase/auth و firebase/firestore للتسجيل وتخزين الطلبات

ملاحظات أمنية:
- لا تحفظ كلمات المرور بنص عادي في الإنتاج. استخدم Firebase Auth أو خادم آمن.
- تحقق من قواعد Firestore لضبط من يمكنه القراءة/الكتابة.
