// Contract ABI - This will be generated after compiling the contract
// For now, we'll use a minimal ABI with the essential functions
export const HEALTHCARE_ABI = [
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "specialty", type: "string" },
      { internalType: "string", name: "licenseId", type: "string" },
    ],
    name: "registerDoctor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "uint8", name: "age", type: "uint8" },
    ],
    name: "registerPatient",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "listDoctors",
    outputs: [
      {
        components: [
          { internalType: "address", name: "addr", type: "address" },
          { internalType: "string", name: "name", type: "string" },
          { internalType: "string", name: "specialty", type: "string" },
          { internalType: "string", name: "licenseId", type: "string" },
          { internalType: "bool", name: "exists", type: "bool" },
          { internalType: "bool", name: "approved", type: "bool" },
          { internalType: "uint256", name: "createdAt", type: "uint256" },
        ],
        internalType: "struct Healthcare.Doctor[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "listPatients",
    outputs: [
      {
        components: [
          { internalType: "address", name: "addr", type: "address" },
          { internalType: "string", name: "name", type: "string" },
          { internalType: "uint8", name: "age", type: "uint8" },
          { internalType: "bool", name: "exists", type: "bool" },
          { internalType: "uint256", name: "createdAt", type: "uint256" },
        ],
        internalType: "struct Healthcare.Patient[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "doctor", type: "address" },
      { internalType: "uint64", name: "startTime", type: "uint64" },
      { internalType: "string", name: "reason", type: "string" },
    ],
    name: "bookAppointment",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "patient", type: "address" },
      { internalType: "uint64", name: "startTime", type: "uint64" },
      { internalType: "string", name: "reason", type: "string" },
    ],
    name: "bookAppointmentForPatient",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllAppointments",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "address", name: "patient", type: "address" },
          { internalType: "address", name: "doctor", type: "address" },
          { internalType: "uint64", name: "startTime", type: "uint64" },
          { internalType: "string", name: "reason", type: "string" },
          {
            internalType: "enum Healthcare.AppointmentStatus",
            name: "status",
            type: "uint8",
          },
          { internalType: "uint64", name: "createdAt", type: "uint64" },
        ],
        internalType: "struct Healthcare.Appointment[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMyAppointmentsAsPatient",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "address", name: "patient", type: "address" },
          { internalType: "address", name: "doctor", type: "address" },
          { internalType: "uint64", name: "startTime", type: "uint64" },
          { internalType: "string", name: "reason", type: "string" },
          {
            internalType: "enum Healthcare.AppointmentStatus",
            name: "status",
            type: "uint8",
          },
          { internalType: "uint64", name: "createdAt", type: "uint64" },
        ],
        internalType: "struct Healthcare.Appointment[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMyAppointmentsAsDoctor",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "address", name: "patient", type: "address" },
          { internalType: "address", name: "doctor", type: "address" },
          { internalType: "uint64", name: "startTime", type: "uint64" },
          { internalType: "string", name: "reason", type: "string" },
          {
            internalType: "enum Healthcare.AppointmentStatus",
            name: "status",
            type: "uint8",
          },
          { internalType: "uint64", name: "createdAt", type: "uint64" },
        ],
        internalType: "struct Healthcare.Appointment[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "appointmentId", type: "uint256" },
      { internalType: "string", name: "diagnosis", type: "string" },
      { internalType: "string", name: "prescription", type: "string" },
    ],
    name: "addOrUpdateNote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "appointmentId", type: "uint256" }],
    name: "getNote",
    outputs: [
      {
        components: [
          { internalType: "bool", name: "exists", type: "bool" },
          { internalType: "uint256", name: "appointmentId", type: "uint256" },
          { internalType: "address", name: "doctor", type: "address" },
          { internalType: "string", name: "diagnosis", type: "string" },
          { internalType: "string", name: "prescription", type: "string" },
          { internalType: "uint64", name: "createdAt", type: "uint64" },
        ],
        internalType: "struct Healthcare.Note",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "stats",
    outputs: [
      { internalType: "uint256", name: "totalDoctors", type: "uint256" },
      { internalType: "uint256", name: "totalPatients", type: "uint256" },
      { internalType: "uint256", name: "totalAppointments", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "doctors",
    outputs: [
      { internalType: "address", name: "addr", type: "address" },
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "specialty", type: "string" },
      { internalType: "string", name: "licenseId", type: "string" },
      { internalType: "bool", name: "exists", type: "bool" },
      { internalType: "bool", name: "approved", type: "bool" },
      { internalType: "uint256", name: "createdAt", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "patients",
    outputs: [
      { internalType: "address", name: "addr", type: "address" },
      { internalType: "string", name: "name", type: "string" },
      { internalType: "uint8", name: "age", type: "uint8" },
      { internalType: "bool", name: "exists", type: "bool" },
      { internalType: "uint256", name: "createdAt", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "addr", type: "address" }],
    name: "isDoctor",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "addr", type: "address" }],
    name: "isPatient",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "doctor", type: "address" },
      { indexed: false, internalType: "string", name: "name", type: "string" },
      { indexed: false, internalType: "string", name: "specialty", type: "string" },
    ],
    name: "DoctorRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "patient", type: "address" },
      { indexed: false, internalType: "string", name: "name", type: "string" },
    ],
    name: "PatientRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "appointmentId", type: "uint256" },
      { indexed: true, internalType: "address", name: "patient", type: "address" },
      { indexed: true, internalType: "address", name: "doctor", type: "address" },
      { indexed: false, internalType: "uint64", name: "startTime", type: "uint64" },
    ],
    name: "AppointmentBooked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "appointmentId", type: "uint256" },
      { indexed: true, internalType: "address", name: "doctor", type: "address" },
    ],
    name: "NoteAdded",
    type: "event",
  },
] as const;

export function getContractAddress(): `0x${string}` {
  const address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  if (!address || address === "0x0000000000000000000000000000000000000000") {
    // Return a dummy address for development - replace with actual deployed address
    console.warn("NEXT_PUBLIC_CONTRACT_ADDRESS not set. Using dummy address. Please deploy contract and set the address.");
    return "0x0000000000000000000000000000000000000000" as `0x${string}`;
  }
  return address as `0x${string}`;
}