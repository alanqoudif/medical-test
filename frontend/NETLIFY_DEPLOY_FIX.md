# حل مشكلة 404 على Netlify

## المشكلة:
الموقع يعرض "Page not found" بعد النشر على Netlify.

## الحل:

### 1. إعدادات Build في Netlify Dashboard:

اذهب إلى: **Site Settings → Build & Deploy → Build settings**

#### إذا المشروع في مجلد `frontend/`:
- **Base directory:** `frontend`
- **Build command:** `npm run build` (أو `cd frontend && npm run build`)
- **Publish directory:** `.next`

#### إذا المشروع في الجذر:
- **Base directory:** `(leave empty)` أو `.`
- **Build command:** `npm run build`
- **Publish directory:** `.next`

### 2. Environment Variables:

تأكد من إضافة هذه المتغيرات:
- `NEXT_PUBLIC_CONTRACT_ADDRESS`
- `NEXT_PUBLIC_CHAIN_ID`
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`

### 3. بعد التعديل:

1. **Trigger deploy** → **Clear cache and deploy site**
2. أو ادفع commit جديد إلى Git
3. انتظر Build يكتمل
4. جرب الموقع

### 4. إذا استمرت المشكلة:

- تأكد من أن `@netlify/plugin-nextjs` موجود في `package.json`
- تحقق من Build logs في Netlify
- تأكد من أن Build نجح بدون أخطاء

## الملفات المهمة:

- `netlify.toml` - إعدادات Netlify
- `next.config.js` - إعدادات Next.js
- `_redirects` - للـ routing (تم إنشاؤه)

## ملاحظة:

Next.js App Router يحتاج `@netlify/plugin-nextjs` plugin للتشغيل الصحيح على Netlify.