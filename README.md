# Healthcare DApp MVP

A decentralized healthcare management application built on Ethereum Sepolia testnet using Next.js, Hardhat, wagmi, and RainbowKit.

## Features

- **User Roles**: Register as Doctor or Patient
- **Appointment Booking**: Patients can book appointments with doctors
- **Medical Notes**: Doctors can add diagnosis and prescription notes to appointments
- **Dashboard**: Role-based dashboards with statistics and appointment management
- **Web3 Integration**: Full MetaMask integration with Sepolia network

## Tech Stack

- **Smart Contracts**: Solidity 0.8.20, Hardhat
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Web3**: wagmi, RainbowKit, viem
- **Network**: Ethereum Sepolia Testnet

## Prerequisites

- Node.js 18+ and npm
- MetaMask browser extension
- Sepolia ETH for transactions
- Infura or Alchemy account (for RPC URL)

## Installation

### 1. Install Dependencies

```bash
# Install Hardhat dependencies
npm install

# Install Frontend dependencies
cd frontend
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` in the root directory:

```bash
cp .env.example .env
```

Update the `.env` file with your values:

```env
# Hardhat Configuration
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
PRIVATE_KEY=your_private_key_here_without_0x
ETHERSCAN_API_KEY=your_etherscan_api_key

# Frontend Configuration (after deployment)
NEXT_PUBLIC_CONTRACT_ADDRESS=0x... # Will be set after deployment
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
```

### 3. Compile Smart Contract

```bash
npm run compile
```

### 4. Run Tests

```bash
npm test
```

### 5. Deploy to Sepolia

```bash
npm run deploy:sepolia
```

After deployment, copy the contract address and update `NEXT_PUBLIC_CONTRACT_ADDRESS` in `.env`.

### 6. Configure MetaMask for Sepolia

1. Open MetaMask
2. Click on network dropdown and select "Add Network"
3. Add Sepolia testnet:
   - Network Name: Sepolia
   - RPC URL: https://sepolia.infura.io/v3/YOUR_KEY
   - Chain ID: 11155111
   - Currency Symbol: ETH
   - Block Explorer: https://sepolia.etherscan.io

### 7. Get Sepolia ETH

Use a faucet to get testnet ETH:
- https://sepoliafaucet.com/
- https://faucet.sepolia.dev/

### 8. Run Frontend

```bash
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Connect Wallet**: Click "Connect Wallet" and connect your MetaMask
2. **Register**: Choose to register as Doctor or Patient
3. **Book Appointment** (Patient): Select a doctor and book an appointment
4. **Add Notes** (Doctor): Add diagnosis and prescription notes to appointments
5. **View Dashboard**: See statistics, appointments, and manage your account

## Project Structure

```
medical-test/
├── contracts/          # Smart contracts
├── scripts/            # Deployment scripts
├── test/               # Hardhat tests
├── frontend/           # Next.js frontend
│   ├── app/            # Next.js pages
│   ├── components/     # React components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utilities and contract ABI
│   └── providers/      # Web3 providers
├── hardhat.config.ts   # Hardhat configuration
└── package.json        # Root package.json
```

## Smart Contract Functions

### Doctor
- `registerDoctor(name, specialty, licenseId)`
- `getMyAppointmentsAsDoctor()`

### Patient
- `registerPatient(name, age)`
- `bookAppointment(doctor, startTime, reason)`
- `getMyAppointmentsAsPatient()`

### Notes
- `addOrUpdateNote(appointmentId, diagnosis, prescription)`
- `getNote(appointmentId)`

### Statistics
- `stats()` - Returns total doctors, patients, and appointments
- `listDoctors()` - Returns all doctors
- `listPatients()` - Returns all patients

## Testing

Run Hardhat tests:

```bash
npm test
```

## Deployment

Deploy to Sepolia:

```bash
npm run deploy:sepolia
```

## Troubleshooting

### MetaMask Connection Issues
- Ensure you're on Sepolia network
- Check that your account has Sepolia ETH
- Try refreshing the page

### Contract Not Found
- Verify `NEXT_PUBLIC_CONTRACT_ADDRESS` is set correctly in `.env`
- Ensure the contract was deployed successfully
- Check that you're on the correct network

### Transaction Failures
- Ensure sufficient Sepolia ETH for gas
- Check contract address is correct
- Verify network is Sepolia (Chain ID: 11155111)

## License

MIT

## Notes

- This is an MVP for demonstration purposes
- All strings are limited to 120 characters to reduce gas costs
- No admin approval required - doctors are auto-approved
- No images or IPFS - using avatar initials instead