export type UserRole = "doctor" | "patient" | "none";
// Type definition for user roles - can be doctor, patient, or none (not registered)

export interface Doctor {
  // TypeScript interface defining the structure of a Doctor object
  addr: string;        // Ethereum address of the doctor
  name: string;       // Doctor's full name
  specialty: string;  // Medical specialty (e.g., "Cardiology", "Pediatrics")
  licenseId: string;  // Medical license identification number
  exists: boolean;    // Flag indicating if doctor is registered
  approved: boolean;  // Flag indicating if doctor is approved to practice
  createdAt: bigint;  // Unix timestamp when doctor was registered
}

export interface Patient {
  // TypeScript interface defining the structure of a Patient object
  addr: string;       // Ethereum address of the patient
  name: string;      // Patient's full name
  age: number;       // Patient's age
  exists: boolean;    // Flag indicating if patient is registered
  createdAt: bigint;  // Unix timestamp when patient was registered
}

export type AppointmentStatus = "Booked" | "Completed" | "Cancelled";
// Type definition for appointment status - can be Booked, Completed, or Cancelled

export interface Appointment {
  // TypeScript interface defining the structure of an Appointment object
  id: bigint;              // Unique appointment identifier
  patient: string;          // Ethereum address of the patient
  doctor: string;           // Ethereum address of the doctor
  startTime: bigint;        // Unix timestamp when appointment starts
  reason: string;           // Reason for the appointment
  status: AppointmentStatus; // Current status of the appointment
  createdAt: bigint;        // Unix timestamp when appointment was created
}

export interface Note {
  // TypeScript interface defining the structure of a medical Note object
  exists: boolean;        // Flag indicating if note exists for this appointment
  appointmentId: bigint;  // ID of the appointment this note belongs to
  doctor: string;        // Ethereum address of the doctor who wrote the note
  diagnosis: string;     // Medical diagnosis
  prescription: string;  // Prescribed medication or treatment
  createdAt: bigint;     // Unix timestamp when note was created
}

export interface Stats {
  // TypeScript interface defining the structure of system statistics
  totalDoctors: bigint;      // Total number of registered doctors
  totalPatients: bigint;     // Total number of registered patients
  totalAppointments: bigint; // Total number of appointments in the system
}