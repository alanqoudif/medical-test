# Environment Variables لـ Netlify

## المتغيرات المطلوبة في Netlify Dashboard:

### 1. NEXT_PUBLIC_CONTRACT_ADDRESS
```
Key: NEXT_PUBLIC_CONTRACT_ADDRESS
Value: 0x08aE9733Abcf0EA3833Cf7AB3aac2c1b87B67E2d
```

### 2. NEXT_PUBLIC_CHAIN_ID
```
Key: NEXT_PUBLIC_CHAIN_ID
Value: 11155111
```

### 3. NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
```
Key: NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
Value: 7000939486454648ad2b070db3276e33
```

## كيفية الإضافة:

1. اذهب إلى https://app.netlify.com
2. اختر موقعك → **Site Settings** → **Environment Variables**
3. اضغط **Add variable** لكل متغير أعلاه
4. اضغط **Save** ثم **Deploy site**

## ⚠️ تحذير مهم:

**لا تضع في Netlify:**
- `PRIVATE_KEY` ❌ (حساس - للـ Hardhat فقط)
- `SEPOLIA_RPC_URL` ❌ (لـ Hardhat فقط)
- `ETHERSCAN_API_KEY` ❌ (لـ Hardhat فقط)

**فقط المتغيرات التي تبدأ بـ `NEXT_PUBLIC_` هي المطلوبة للـ Frontend!**
