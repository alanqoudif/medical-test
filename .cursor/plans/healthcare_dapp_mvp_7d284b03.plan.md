---
name: Healthcare DApp MVP
overview: بناء MVP كامل لتطبيق DApp للرعاية الصحية على Sepolia باستخدام Next.js + Hardhat + wagmi + RainbowKit
todos:
  - id: setup-hardhat
    content: إعداد Hardhat project مع TypeScript وSepolia config
    status: completed
  - id: smart-contract
    content: كتابة Smart Contract مع جميع Structs وFunctions وEvents
    status: completed
  - id: contract-tests
    content: كتابة Hardhat tests للعقد
    status: completed
  - id: deploy-script
    content: إنشاء deploy script للنشر على Sepolia
    status: completed
  - id: nextjs-setup
    content: إعداد Next.js project مع TypeScript وTailwind
    status: completed
  - id: web3-provider
    content: إعداد wagmi + RainbowKit provider مع Sepolia chain
    status: completed
  - id: contract-integration
    content: ربط Frontend بالعقد الذكي (ABI, address, hooks)
    status: completed
  - id: layout-components
    content: إنشاء Navbar وlayout components
    status: completed
  - id: dashboard-components
    content: إنشاء StatCard, BalanceCard, DoctorsGrid, PatientsList, AppointmentsTable
    status: completed
  - id: form-components
    content: إنشاء جميع الفورمس (RegisterDoctor, RegisterPatient, BookAppointment, NoteModal)
    status: completed
  - id: ui-components
    content: إنشاء Avatar وButton وCard base components
    status: completed
  - id: pages
    content: إنشاء جميع الصفحات (Landing, Register, Dashboard, Appointments)
    status: completed
  - id: custom-hooks
    content: إنشاء useHealthcare وuseRole hooks للـ contract interactions
    status: completed
  - id: styling
    content: تطبيق Tailwind styles مع gradients وresponsive design
    status: completed
  - id: error-handling
    content: إضافة error handling وtoast notifications
    status: completed
  - id: config-docs
    content: إنشاء .env.example وREADME.md مع instructions
    status: completed
---

# Healthcare DApp MVP - Implementation Plan

## Project Structure

```
medical-test/
├── contracts/
│   ├── Healthcare.sol          # Smart contract رئيسي
│   └── interfaces/             
├── scripts/
│   ├── deploy.ts               # سكريبت النشر على Sepolia
│   └── verify.ts               # (اختياري) التحقق من العقد
├── test/
│   └── Healthcare.test.ts      # Hardhat tests
├── frontend/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout مع Web3Provider
│   │   ├── page.tsx            # Landing page
│   │   ├── dashboard/
│   │   │   └── page.tsx        # Dashboard حسب الدور
│   │   ├── register/
│   │   │   └── page.tsx        # صفحة التسجيل
│   │   └── appointments/
│   │       └── page.tsx        # قائمة المواعيد
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx      # Navigation bar
│   │   │   └── Sidebar.tsx     # (اختياري)
│   │   ├── dashboard/
│   │   │   ├── StatCard.tsx    # كروت الإحصائيات الملونة
│   │   │   ├── BalanceCard.tsx # رصيد ETH
│   │   │   ├── DoctorsGrid.tsx # قائمة الأطباء
│   │   │   ├── PatientsList.tsx# قائمة المرضى
│   │   │   └── AppointmentsTable.tsx
│   │   ├── forms/
│   │   │   ├── RegisterDoctorForm.tsx
│   │   │   ├── RegisterPatientForm.tsx
│   │   │   ├── BookAppointmentForm.tsx
│   │   │   └── NoteModal.tsx   # إضافة diagnosis/prescription
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── Avatar.tsx      # Avatars بالحروف الأولية
│   ├── hooks/
│   │   ├── useWeb3.ts          # Web3 hooks wrapper
│   │   ├── useHealthcare.ts    # Contract interactions
│   │   └── useRole.ts          # تحديد دور المستخدم
│   ├── lib/
│   │   ├── contract.ts         # Contract ABI & address
│   │   ├── utils.ts            # Helper functions
│   │   └── constants.ts        # Chain config
│   ├── providers/
│   │   └── Web3Provider.tsx    # wagmi + RainbowKit setup
│   ├── types/
│   │   └── index.ts            # TypeScript types
│   └── public/                 # Static assets
├── hardhat.config.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── .env.example
└── README.md
```

## Implementation Steps

### Phase 1: Smart Contract Setup

**1.1 Hardhat Configuration**

- إنشاء `hardhat.config.ts` مع Sepolia network config
- إعداد TypeScript وplugins (ethers, hardhat-deploy)

**1.2 Smart Contract (`contracts/Healthcare.sol`)**

- Structs: `Doctor`, `Patient`, `Appointment`, `Note`
- Enum: `AppointmentStatus` (Booked, Completed, Cancelled)
- Storage mappings: `doctors`, `patients`, `appointments[]`, `notes`
- Functions:
  - `registerDoctor(name, specialty, licenseId)` - auto-approve (لا admin)
  - `registerPatient(name, age)`
  - `listDoctors()` returns `Doctor[]`
  - `listPatients()` returns `Patient[]`
  - `bookAppointment(doctor, startTime, reason)` - onlyPatient
  - `getMyAppointmentsAsPatient()` returns `Appointment[]`
  - `getMyAppointmentsAsDoctor()` returns `Appointment[]`
  - `addOrUpdateNote(appointmentId, diagnosis, prescription)` - onlyDoctor
  - `getNote(appointmentId)` returns `Note`
  - `stats()` returns totals
- Events: `DoctorRegistered`, `PatientRegistered`, `AppointmentBooked`, `NoteAdded`
- Modifiers: `onlyDoctor`, `onlyPatient`, `requireRegistered`
- String limits: max 120 chars لتقليل الغاز

**1.3 Tests (`test/Healthcare.test.ts`)**

- Tests للتسجيل والحجز والإضافة

**1.4 Deploy Script (`scripts/deploy.ts`)**

- نشر العقد على Sepolia وحفظ Address

### Phase 2: Frontend Setup

**2.1 Next.js Project Structure**

- Next.js 14+ مع App Router
- TypeScript configuration
- Tailwind CSS setup مع custom colors للـ gradients

**2.2 Dependencies Installation**

- `wagmi`, `@rainbow-me/rainbowkit`, `viem`
- `ethers` (لـ Hardhat)
- `react-hot-toast`
- `date-fns` (للتاريخ)

**2.3 Web3 Provider (`frontend/providers/Web3Provider.tsx`)**

- إعداد wagmi Config مع Sepolia chain
- RainbowKit configuration
- Chain switching handling (إذا كان على شبكة أخرى)

**2.4 Contract Integration (`frontend/lib/contract.ts`)**

- Contract ABI export
- Contract address من environment variables
- TypeScript types للـ contract calls

### Phase 3: Core Components

**3.1 Layout Components**

- `Navbar.tsx`: شريط علوي مع Connect button + User info + Theme toggle (UI فقط)
- Responsive design

**3.2 Dashboard Components**

- `StatCard.tsx`: 4 cards ملونة بتدرّجات (#D-001 style tags)
- `BalanceCard.tsx`: عرض ETH balance من wagmi
- `DoctorsGrid.tsx`: Grid للأطباء مع avatars وspecialty
- `PatientsList.tsx`: قائمة المرضى
- `AppointmentsTable.tsx`: جدول المواعيد مع status colors

**3.3 Form Components**

- `RegisterDoctorForm.tsx`: name, specialty, licenseId
- `RegisterPatientForm.tsx`: name, age
- `BookAppointmentForm.tsx`: اختيار doctor + date/time + reason
- `NoteModal.tsx`: Dialog لإضافة diagnosis + prescription

**3.4 UI Components**

- `Avatar.tsx`: دائرة مع initials + gradient background
- `Button.tsx`, `Card.tsx`: Base components

### Phase 4: Pages & Routing

**4.1 Landing Page (`app/page.tsx`)**

- Hero section + Connect Wallet button
- Redirect للـ dashboard بعد الاتصال

**4.2 Register Page (`app/register/page.tsx`)**

- اختيار Doctor/Patient tabs
- عرض الفورم المناسب حسب الاختيار
- Toast notifications عند النجاح/الفشل

**4.3 Dashboard Page (`app/dashboard/page.tsx`)**

- تحديد الدور (Doctor/Patient) من blockchain
- عرض Dashboard مختلف حسب الدور:
  - **Patient**: بياناته + مواعيده + Notes + زر Book
  - **Doctor**: بياناته + مواعيد مرضاه + زر Add Note
  - **Unregistered**: زر التسجيل
- General stats في الأعلى

**4.4 Appointments Page (`app/appointments/page.tsx`)**

- قائمة كاملة للمواعيد مع filters

### Phase 5: Hooks & Logic

**5.1 `useHealthcare.ts`**

- Custom hooks للـ contract interactions:
  - `useRegisterDoctor()`
  - `useRegisterPatient()`
  - `useBookAppointment()`
  - `useAddNote()`
  - `useGetDoctors()`
  - `useGetPatients()`
  - `useGetAppointments()`
  - `useGetStats()`

**5.2 `useRole.ts`**

- تحديد دور المستخدم (Doctor/Patient/None)
- استخدام `useAccount` من wagmi

**5.3 Error Handling**

- Toast notifications للـ errors
- Network validation (Sepolia فقط)
- Transaction status tracking

### Phase 6: Styling & UX

**6.1 Tailwind Configuration**

- Custom colors للـ gradients
- Card shadows وrounded corners
- Spacing consistent

**6.2 Responsive Design**

- Mobile-first approach
- Grid layouts تتكيف مع الشاشات

**6.3 Loading States**

- Skeleton loaders
- Button loading indicators

### Phase 7: Configuration & Documentation

**7.1 Environment Variables (`.env.example`)**

- `NEXT_PUBLIC_CONTRACT_ADDRESS`
- `NEXT_PUBLIC_CHAIN_ID` (11155111 لـ Sepolia)
- `SEPOLIA_RPC_URL` (لـ Hardhat)

**7.2 README.md**

- خطوات التشغيل
- ربط MetaMask بـ Sepolia
- Deploy instructions
- Testing guide

## Technical Decisions

1. **Admin Approval**: تمت إزالتها - الأطباء يُعتمدون تلقائياً
2. **String Limits**: 120 حرف لجميع strings في العقد
3. **Avatar System**: Initials داخل دائرة ملونة (لا صور)
4. **Network**: Sepolia فقط - إجبار التحويل إذا كان على شبكة أخرى
5. **State Management**: React Context + wagmi hooks (لا Zustand لتقليل التعقيد)

## Files to Create

### Smart Contract (5 files)

- `contracts/Healthcare.sol`
- `scripts/deploy.ts`
- `test/Healthcare.test.ts`
- `hardhat.config.ts`
- `package.json` (root - Hardhat deps)

### Frontend (35+ files)

- Next.js config files (3)
- Provider & hooks (6)
- Components (15+)
- Pages (4)
- Types & utils (4)
- Config files (3)

### Documentation (2 files)

- `README.md`
- `.env.example`

**Total: ~50 files**