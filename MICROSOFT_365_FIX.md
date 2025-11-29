# حل مشكلة Microsoft 365 / Outlook Authentication

## المشكلة:
```
535 5.7.139 Authentication unsuccessful, user is locked by your organization's security defaults policy
```

هذه المشكلة تحدث لأن Microsoft 365 يمنع **Basic Authentication** (المصادقة الأساسية) عندما تكون **Security Defaults** مفعلة.

---

## الحلول المتاحة:

### ✅ الحل 1: استخدام Gmail (الأسهل والأسرع)

Gmail أسهل في الإعداد ولا يحتاج إلى OAuth2 معقد.

1. **إنشاء Gmail App Password:**
   - اذهب إلى: https://myaccount.google.com/apppasswords
   - فعّل 2-Step Verification أولاً
   - أنشئ App Password جديد

2. **تحديث `.env.local`:**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   SMTP_FROM=your-email@gmail.com
   ```

---

### ✅ الحل 2: استخدام SendGrid (موصى به للإنتاج)

SendGrid خدمة احترافية لإرسال الإيميلات، مجانية حتى 100 إيميل يومياً.

1. **إنشاء حساب SendGrid:**
   - اذهب إلى: https://signup.sendgrid.com/
   - سجّل حساب مجاني
   - أنشئ API Key من Settings → API Keys

2. **تحديث `.env.local`:**
   ```env
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_USER=apikey
   SMTP_PASSWORD=your-sendgrid-api-key
   SMTP_FROM=info@homeinformationsearches.co.uk
   ```

**مميزات SendGrid:**
- ✅ مجاني حتى 100 إيميل/يوم
- ✅ لا يحتاج OAuth2
- ✅ موثوق ومستقر
- ✅ مناسب للإنتاج

---

### ✅ الحل 3: استخدام Mailgun (بديل جيد)

1. **إنشاء حساب Mailgun:**
   - اذهب إلى: https://signup.mailgun.com/
   - سجّل حساب مجاني (5000 إيميل/شهر)

2. **تحديث `.env.local`:**
   ```env
   SMTP_HOST=smtp.mailgun.org
   SMTP_PORT=587
   SMTP_USER=your-mailgun-username
   SMTP_PASSWORD=your-mailgun-password
   SMTP_FROM=info@homeinformationsearches.co.uk
   ```

---

### ⚠️ الحل 4: تعطيل Security Defaults في Microsoft 365 (يتطلب صلاحيات مسؤول)

**ملاحظة:** هذا الحل يتطلب صلاحيات مسؤول وقد لا يكون متاحاً للحسابات الشخصية.

1. اذهب إلى: https://admin.microsoft.com/
2. Security → Policies → Security Defaults
3. عطّل Security Defaults
4. **تحذير:** هذا قد يقلل من أمان حسابك

---

### ⚠️ الحل 5: استخدام OAuth2 مع Microsoft (معقد)

يتطلب إعداد Azure App Registration و OAuth2 tokens. هذا الحل معقد ويحتاج إلى كود إضافي.

---

## التوصية:

**للإنتاج:** استخدم **SendGrid** أو **Mailgun** (أفضل وأكثر موثوقية)

**للاختبار السريع:** استخدم **Gmail** (أسهل في الإعداد)

---

## بعد تحديث `.env.local`:

1. **أعد تشغيل الـ dev server:**
   ```bash
   # أوقف السيرفر (Ctrl+C)
   npm run dev
   # أو
   pnpm dev
   ```

2. **اختبر الفورم:**
   - املأ الفورم في الموقع
   - اضغط "Send Request"
   - تحقق من وصول الإيميل

---

## استكشاف الأخطاء:

### إذا استمرت المشكلة:

1. **تحقق من `.env.local`:**
   - تأكد من عدم وجود مسافات إضافية
   - تأكد من صحة القيم

2. **تحقق من الـ logs:**
   - شوف الـ console للبحث عن أخطاء

3. **اختبر مع Gmail أولاً:**
   - Gmail أسهل في الإعداد
   - إذا عمل مع Gmail، المشكلة في إعدادات Microsoft

---

## ملاحظات مهمة:

- ⚠️ **لا ترفع `.env.local` على Git** - إنه موجود في `.gitignore`
- ✅ **SendGrid/Mailgun** أفضل للإنتاج من Gmail
- ✅ **Gmail** جيد للاختبار والتطوير
- ⚠️ **Microsoft 365** يحتاج OAuth2 أو تعطيل Security Defaults

