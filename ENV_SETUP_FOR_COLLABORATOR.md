# تعليمات إعداد Environment Variables للزميل

## 📋 ملف `.env` - ما الذي يحتاج تغييره؟

عند استلام المشروع، يجب على زميلك إنشاء ملف `.env` في المجلد الرئيسي (root) للمشروع وملء القيم التالية:

---

## 🔐 القيم التي **يجب** تغييرها (حساسة/شخصية):

### 1. `PRIVATE_KEY` ⚠️ **يجب تغييره**
```
PRIVATE_KEY=your_own_private_key_here_without_0x
```
- **ما هو**: Private Key من محفظة MetaMask الخاصة به
- **كيف يحصل عليه**: MetaMask → Account Details → Export Private Key
- **⚠️ مهم جداً**: لا يشارك هذا المفتاح مع أحد أبداً!
- **ملاحظة**: بدون `0x` في البداية

### 2. `SEPOLIA_RPC_URL` (اختياري - فقط إذا كان يريد نشر العقد)
```
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
# أو
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
```
- **ما هو**: RPC URL من Alchemy أو Infura
- **متى يحتاجه**: فقط إذا كان يريد نشر العقد الذكي (`npm run deploy:sepolia`)
- **كيف يحصل عليه**:
  - Alchemy: https://www.alchemy.com/ → Create App → Copy HTTP URL
  - Infura: https://infura.io/ → Create Project → Copy Endpoint

### 3. `ETHERSCAN_API_KEY` (اختياري - فقط للتحقق من العقد)
```
ETHERSCAN_API_KEY=your_etherscan_api_key
```
- **ما هو**: API Key من Etherscan للتحقق من العقد بعد النشر
- **متى يحتاجه**: فقط إذا كان يريد التحقق من العقد على Etherscan
- **كيف يحصل عليه**: https://etherscan.io/apis → Create API Key

---

## ✅ القيم التي يمكن **تركها كما هي** (مشتركة):

### 4. `NEXT_PUBLIC_CONTRACT_ADDRESS`
```
NEXT_PUBLIC_CONTRACT_ADDRESS=0x08aE9733Abcf0EA3833Cf7AB3aac2c1b87B67E2d
```
- **ما هو**: عنوان العقد الذكي المنشور على Sepolia
- **✅ يمكن تركه كما هو**: إذا كان سيستخدم نفس العقد المشترك
- **متى يغيره**: إذا نشر عقد جديد خاص به

### 5. `NEXT_PUBLIC_CHAIN_ID`
```
NEXT_PUBLIC_CHAIN_ID=11155111
```
- **ما هو**: Chain ID لشبكة Sepolia (مشترك للجميع)
- **✅ يترك كما هو**: Sepolia دائماً `11155111`

### 6. `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
```
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=7000939486454648ad2b070db3276e33
```
- **ما هو**: WalletConnect Project ID (يمكن مشاركته)
- **✅ يمكن تركه كما هو**: إذا كان Project ID مشترك
- **متى يغيره**: إذا أراد إنشاء Project ID خاص به من https://cloud.walletconnect.com/

---

## 📝 مثال لملف `.env` جاهز للاستخدام:

### للـ Frontend فقط (بدون نشر العقد):
```env
# Frontend Configuration (يمكن استخدامها كما هي)
NEXT_PUBLIC_CONTRACT_ADDRESS=0x08aE9733Abcf0EA3833Cf7AB3aac2c1b87B67E2d
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=7000939486454648ad2b070db3276e33
```

### للنشر + استخدام Frontend:
```env
# Hardhat Configuration (يحتاج تغيير)
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
PRIVATE_KEY=your_own_private_key_without_0x
ETHERSCAN_API_KEY=your_etherscan_api_key

# Frontend Configuration (يمكن تركها كما هي)
NEXT_PUBLIC_CONTRACT_ADDRESS=0x08aE9733Abcf0EA3833Cf7AB3aac2c1b87B67E2d
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=7000939486454648ad2b070db3276e33
```

---

## 🚀 خطوات سريعة للزميل:

### 1. إنشاء ملف `.env`:
```bash
# من المجلد الرئيسي للمشروع
cp .env.example .env
```

### 2. فتح `.env` وتعديل القيم:

**الحد الأدنى المطلوب للـ Frontend فقط:**
- لا حاجة لتغيير شيء! ✅

**للنشر:**
- غيّر `PRIVATE_KEY` → Private Key الخاص به
- غيّر `SEPOLIA_RPC_URL` → Alchemy/Infura URL الخاص به

### 3. تثبيت المكتبات:
```bash
npm install
cd frontend && npm install
```

### 4. تشغيل Frontend:
```bash
cd frontend
npm run dev
```

---

## ⚠️ ملاحظات أمنية مهمة:

1. **❌ لا تشارك `PRIVATE_KEY` أبداً!**
2. **❌ لا ترفع ملف `.env` إلى Git!** (موجود في `.gitignore`)
3. **✅ يمكن مشاركة `NEXT_PUBLIC_*` variables** - هذه public بالفعل
4. **✅ `NEXT_PUBLIC_CONTRACT_ADDRESS`** - يمكن استخدام نفس العقد المشترك

---

## 📌 ملخص سريع:

| المتغير | يحتاج تغيير؟ | السبب |
|---------|-------------|--------|
| `PRIVATE_KEY` | ✅ **نعم** | حساس - خاص بكل شخص |
| `SEPOLIA_RPC_URL` | ⚠️ اختياري | فقط إذا كان ينشر العقد |
| `ETHERSCAN_API_KEY` | ⚠️ اختياري | فقط للتحقق من العقد |
| `NEXT_PUBLIC_CONTRACT_ADDRESS` | ❌ لا | يمكن استخدام نفس العقد |
| `NEXT_PUBLIC_CHAIN_ID` | ❌ لا | Sepolia دائماً `11155111` |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | ❌ لا | يمكن مشاركته |

---

## 🆘 مساعدة:

إذا كان الزميل يستخدم المشروع للـ Frontend فقط:
- **لا حاجة لتغيير شيء!** ✅
- فقط يشغل `npm run dev` وسيعمل

إذا كان يريد نشر عقد جديد:
- يغيّر `PRIVATE_KEY` و `SEPOLIA_RPC_URL`
- يشغل `npm run deploy:sepolia`
- ينسخ Contract Address الجديد ويضيفه في `NEXT_PUBLIC_CONTRACT_ADDRESS`
