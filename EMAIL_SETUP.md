# Email Setup Instructions

## إعداد الإيميل للفورم

لجعل فورم "Request a Search or Get in Touch" يعمل بشكل كامل، تحتاج إلى إعداد متغيرات البيئة (Environment Variables) لإرسال الإيميلات.

### الخطوات:

1. **إنشاء ملف `.env.local`** في المجلد الرئيسي للمشروع:
   ```
   .env.local
   ```

2. **إضافة متغيرات البيئة التالية** في ملف `.env.local`:

   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   SMTP_FROM=your-email@gmail.com
   ```

### إعداد Gmail (مثال):

1. **تفعيل App Password**:
   - اذهب إلى [Google Account Settings](https://myaccount.google.com/)
   - Security → 2-Step Verification (يجب تفعيله أولاً)
   - App passwords → Generate new app password
   - استخدم هذا الـ App Password في `SMTP_PASSWORD`

2. **مثال على `.env.local`**:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=yourname@gmail.com
   SMTP_PASSWORD=abcd efgh ijkl mnop
   SMTP_FROM=yourname@gmail.com
   ```

### خيارات أخرى لإرسال الإيميلات:

#### Outlook/Hotmail:
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASSWORD=your-password
SMTP_FROM=your-email@outlook.com
```

#### SendGrid:
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
SMTP_FROM=your-email@yourdomain.com
```

#### Mailgun:
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=your-mailgun-username
SMTP_PASSWORD=your-mailgun-password
SMTP_FROM=your-email@yourdomain.com
```

### ملاحظات مهمة:

- ⚠️ **لا ترفع ملف `.env.local` إلى Git** - إنه موجود في `.gitignore` تلقائياً
- ✅ الإيميلات ستُرسل إلى: `info@propertysearchsolutions.co.uk`
- ✅ الإيميلات ستكون منسقة ومهنية مع جميع بيانات الفورم
- ✅ المستخدم سيحصل على رسالة نجاح/خطأ بعد الإرسال

### اختبار الإعداد:

1. املأ الفورم في الموقع
2. اضغط "Send Request"
3. تحقق من وصول الإيميل إلى `info@propertysearchsolutions.co.uk`
4. تحقق من أن الإيميل منسق ويحتوي على جميع البيانات

### استكشاف الأخطاء:

إذا لم تعمل الإيميلات:
- تحقق من صحة بيانات SMTP
- تأكد من تفعيل 2-Step Verification لـ Gmail
- استخدم App Password بدلاً من كلمة المرور العادية
- تحقق من logs في console للبحث عن أخطاء

