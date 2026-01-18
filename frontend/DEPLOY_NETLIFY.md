# تعليمات النشر على Netlify

## المتطلبات

1. حساب Netlify (https://netlify.com)
2. Node.js 18+
3. متغيرات البيئة

## خطوات النشر

### 1. إعداد Environment Variables في Netlify

بعد النشر على Netlify، أضف هذه المتغيرات في Netlify Dashboard:

- `NEXT_PUBLIC_CONTRACT_ADDRESS` = `0x08aE9733Abcf0EA3833Cf7AB3aac2c1b87B67E2d`
- `NEXT_PUBLIC_CHAIN_ID` = `11155111`
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` = `7000939486454648ad2b070db3276e33`

### 2. النشر عبر Netlify CLI

```bash
# تثبيت Netlify CLI
npm install -g netlify-cli

# تسجيل الدخول
netlify login

# من مجلد frontend
cd frontend

# النشر
netlify deploy --prod
```

### 3. النشر عبر Git (مفضّل)

1. ادفع الكود إلى GitHub/GitLab
2. اربط المستودع في Netlify Dashboard
3. إعدادات Build:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Base directory: `frontend`
4. أضف Environment Variables
5. اضغط "Deploy"

### 4. إعدادات Build في Netlify

- Build command: `npm run build`
- Publish directory: `.next`
- Node version: `18`

## ملاحظات

- تأكد من أن جميع متغيرات البيئة `NEXT_PUBLIC_*` مضاف في Netlify
- بعد النشر، الموقع سيعمل على `https://your-site.netlify.app`
- MetaMask سيعمل على Sepolia network

## استكشاف الأخطاء

إذا ظهرت أخطاء في Build:
- تأكد من أن Node version = 18
- تأكد من Environment Variables موجودة
- تحقق من logs في Netlify Dashboard