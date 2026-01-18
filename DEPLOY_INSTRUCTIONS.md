# تعليمات النشر على Sepolia

## خطوة 1: إضافة Private Key

1. افتح ملف `.env` في المشروع
2. استبدل `YOUR_PRIVATE_KEY_HERE` بـ Private Key من MetaMask (بدون `0x`)

مثال:
```
PRIVATE_KEY=abc123def456789...
```

## خطوة 2: التأكد من وجود Sepolia ETH

- تأكد أن محفظتك في MetaMask تحتوي على Sepolia ETH
- يمكنك الحصول على Sepolia ETH من: https://sepoliafaucet.com/

## خطوة 3: النشر

```bash
npm run deploy:sepolia
```

## خطوة 4: إضافة Contract Address إلى Frontend

بعد النشر، سيظهر Contract Address في Terminal. انسخه وأضفه إلى:

1. ملف `.env` في الجذر:
   ```
   NEXT_PUBLIC_CONTRACT_ADDRESS=0x... (العنوان الذي ظهر)
   ```

2. ملف `.env.local` في `frontend/` (أو `.env` في frontend):
   ```
   NEXT_PUBLIC_CONTRACT_ADDRESS=0x... (نفس العنوان)
   ```

## خطوة 5: إعادة تشغيل Frontend

```bash
cd frontend
npm run dev
```

بعد ذلك، كل شيء سيعمل بشكل صحيح مع MetaMask على Sepolia!