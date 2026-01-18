export type UserRole = "doctor" | "patient" | "none";

export interface Doctor {
  addr: string;
  name: string;
  specialty: string;
  licenseId: string;
  exists: boolean;
  approved: boolean;
  createdAt: bigint;
}

export interface Patient {
  addr: string;
  name: string;
  age: number;
  exists: boolean;
  createdAt: bigint;
}

export type AppointmentStatus = "Booked" | "Completed" | "Cancelled";

export interface Appointment {
  id: bigint;
  patient: string;
  doctor: string;
  startTime: bigint;
  reason: string;
  status: AppointmentStatus;
  createdAt: bigint;
}

export interface Note {
  exists: boolean;
  appointmentId: bigint;
  doctor: string;
  diagnosis: string;
  prescription: string;
  createdAt: bigint;
}

export interface Stats {
  totalDoctors: bigint;
  totalPatients: bigint;
  totalAppointments: bigint;
}