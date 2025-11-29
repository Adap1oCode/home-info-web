# دليل إعداد Gmail لإرسال الإيميلات

## الخطوات بالتفصيل:

### 1. تفعيل 2-Step Verification (التحقق بخطوتين)

1. اذهب إلى: https://myaccount.google.com/
2. اضغط على **Security** (الأمان) من القائمة الجانبية
3. ابحث عن **2-Step Verification** (التحقق بخطوتين)
4. اضغط **Get Started** أو **Turn On**
5. اتبع الخطوات لتفعيل التحقق بخطوتين (سيرسل كود على هاتفك)

### 2. إنشاء App Password (كلمة مرور التطبيق)

بعد تفعيل 2-Step Verification:

1. اذهب إلى: https://myaccount.google.com/apppasswords
   - أو من Security → 2-Step Verification → App passwords
2. اختر **App**: اختر **Mail**
3. اختر **Device**: اختر **Other (Custom name)**
4. اكتب اسم مثل: "Property Search Website"
5. اضغط **Generate** (إنشاء)
6. **انسخ الكود اللي هيطلعلك** - بيكون شكله كدا: `abcd efgh ijkl mnop`
   - ⚠️ **مهم جداً**: انسخه كامل لأنك مش هتقدر تشوفه تاني!

### 3. إعداد ملف `.env.local`

1. في المجلد الرئيسي للمشروع، أنشئ ملف اسمه `.env.local`
2. ضيف فيه الكود ده:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=mohammedmohanad485@gmail.com
SMTP_PASSWORD=abcd efgh ijkl mnop
SMTP_FROM=mohammedmohanad485@gmail.com
```

**ملاحظة مهمة**: 
- في `SMTP_PASSWORD` حط الـ App Password اللي نسخته (ممكن تحط المسافات أو تحذفها - الاتنين شغال)
- **لا ترفع ملف `.env.local` على Git** - إنه موجود في `.gitignore` تلقائياً

### 4. تثبيت nodemailer

افتح Terminal في المجلد الرئيسي للمشروع واكتب:

```bash
npm install nodemailer
```

### 5. تشغيل المشروع واختبار

```bash
npm run dev
```

بعد كدا:
1. املأ الفورم في الموقع
2. اضغط "Send Request"
3. تحقق من إيميلك `mohammedmohanad485@gmail.com`
4. الإيميل هيوصل منسق وجميل مع كل البيانات

---

## ملخص ما تحتاجه بالضبط:

✅ **إيميل Gmail**: `mohammedmohanad485@gmail.com` (موجود عندك)

✅ **App Password**: 
   - اذهب إلى: https://myaccount.google.com/apppasswords
   - أنشئ App Password جديد
   - انسخه وحطه في `.env.local`

✅ **ملف `.env.local`** في المجلد الرئيسي:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=mohammedmohanad485@gmail.com
SMTP_PASSWORD=هنا_حط_ال_App_Password_اللي_نسخته
SMTP_FROM=mohammedmohanad485@gmail.com
```

---

## استكشاف الأخطاء:

### لو الإيميل مش بيوصل:
1. تأكد إن 2-Step Verification مفعل
2. تأكد إنك نسخت الـ App Password صح
3. تأكد إنك حطيت الـ App Password في `.env.local` (مش كلمة المرور العادية)
4. تأكد إنك عملت restart للـ dev server بعد إضافة `.env.local`

### لو في error في console:
- شوف الـ error message واقراه
- في الغالب بيكون في مشكلة في الـ App Password أو الـ SMTP settings

---

## ملاحظات:

- ⚠️ **App Password** مش نفس كلمة المرور العادية - لازم تنشئه من Google Account
- ✅ الإيميلات هتوصلك على `mohammedmohanad485@gmail.com`
- ✅ الإيميلات هتكون منسقة ومهنية
- ✅ الـ reply-to هيكون إيميل العميل اللي ملأ الفورم

