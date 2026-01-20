"use client";
// Directive to mark this as a client-side component in Next.js

import { useWriteContract, useWaitForTransactionReceipt, useReadContract, useReadContracts } from "wagmi";
// Import hooks from wagmi library for interacting with smart contracts
import { HEALTHCARE_ABI, getContractAddress } from "@/lib/contract";
// Import contract ABI (Application Binary Interface) and address getter function
import { useAccount } from "wagmi";
// Import hook to get current connected wallet account
import { parseEther } from "viem";
// Import utility to convert ether values (not used in this file but imported)
import toast from "react-hot-toast";
// Import toast notification library for user feedback
import type { Doctor, Patient, Appointment, Note, Stats } from "@/types";
// Import TypeScript type definitions for data structures

export function useRegisterDoctor() {
  // Custom React hook for registering a new doctor
  const { writeContract, data: hash, isPending } = useWriteContract();
  // Get function to write to contract, transaction hash, and pending status
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash, // Wait for transaction with this hash to be confirmed
    });
  // Get loading state while confirming and success state when confirmed

  const register = async (name: string, specialty: string, licenseId: string) => {
    // Async function to register a doctor with name, specialty, and license ID
    try {
      // Try to execute the contract write operation
      await writeContract({
        address: getContractAddress(), // Get the deployed contract address
        abi: HEALTHCARE_ABI, // Contract ABI for encoding/decoding
        functionName: "registerDoctor", // Name of the function to call
        args: [name, specialty, licenseId], // Arguments to pass to the function
      });
      // Show success notification to user
      toast.success("Doctor registration submitted!");
    } catch (error: any) {
      // Catch any errors that occur
      // Show error notification with error message or default message
      toast.error(error?.shortMessage || "Failed to register doctor");
      // Re-throw error so caller can handle it
      throw error;
    }
  };

  return {
    register,        // Function to call for registration
    isPending,       // Boolean: true while transaction is being sent
    isConfirming,    // Boolean: true while waiting for confirmation
    isConfirmed,     // Boolean: true when transaction is confirmed
    hash,            // Transaction hash string
  };
}

export function useRegisterPatient() {
  // Custom React hook for registering a new patient
  const { writeContract, data: hash, isPending } = useWriteContract();
  // Get function to write to contract, transaction hash, and pending status
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash, // Wait for transaction with this hash to be confirmed
    });
  // Get loading state while confirming and success state when confirmed

  const register = async (name: string, age: number) => {
    // Async function to register a patient with name and age
    try {
      // Try to execute the contract write operation
      await writeContract({
        address: getContractAddress(), // Get the deployed contract address
        abi: HEALTHCARE_ABI, // Contract ABI for encoding/decoding
        functionName: "registerPatient", // Name of the function to call
        args: [name, age], // Arguments to pass to the function
      });
      // Show success notification to user
      toast.success("Patient registration submitted!");
    } catch (error: any) {
      // Catch any errors that occur
      // Show error notification with error message or default message
      toast.error(error?.shortMessage || "Failed to register patient");
      // Re-throw error so caller can handle it
      throw error;
    }
  };

  return {
    register,        // Function to call for registration
    isPending,       // Boolean: true while transaction is being sent
    isConfirming,    // Boolean: true while waiting for confirmation
    isConfirmed,     // Boolean: true when transaction is confirmed
    hash,            // Transaction hash string
  };
}

export function useBookAppointment() {
  // Custom React hook for booking an appointment (patient action)
  const { writeContract, data: hash, isPending } = useWriteContract();
  // Get function to write to contract, transaction hash, and pending status
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash, // Wait for transaction with this hash to be confirmed
    });
  // Get loading state while confirming and success state when confirmed

  const book = async (doctor: string, startTime: bigint, reason: string) => {
    // Async function to book appointment with doctor address, start time, and reason
    try {
      // Try to execute the contract write operation
      await writeContract({
        address: getContractAddress(), // Get the deployed contract address
        abi: HEALTHCARE_ABI, // Contract ABI for encoding/decoding
        functionName: "bookAppointment", // Name of the function to call
        args: [doctor as `0x${string}`, startTime, reason], // Arguments: doctor address, time, reason
      });
      // Show success notification to user
      toast.success("Appointment booking submitted!");
    } catch (error: any) {
      // Catch any errors that occur
      // Show error notification with error message or default message
      toast.error(error?.shortMessage || "Failed to book appointment");
      // Re-throw error so caller can handle it
      throw error;
    }
  };

  return {
    book,            // Function to call for booking
    isPending,       // Boolean: true while transaction is being sent
    isConfirming,    // Boolean: true while waiting for confirmation
    isConfirmed,     // Boolean: true when transaction is confirmed
    hash,            // Transaction hash string
  };
}

export function useBookAppointmentForPatient() {
  // Custom React hook for doctor to book appointment for a patient
  const { writeContract, data: hash, isPending } = useWriteContract();
  // Get function to write to contract, transaction hash, and pending status
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash, // Wait for transaction with this hash to be confirmed
    });
  // Get loading state while confirming and success state when confirmed

  const bookForPatient = async (patient: string, startTime: bigint, reason: string) => {
    // Async function for doctor to book appointment for patient with address, time, and reason
    try {
      // Try to execute the contract write operation
      await writeContract({
        address: getContractAddress(), // Get the deployed contract address
        abi: HEALTHCARE_ABI, // Contract ABI for encoding/decoding
        functionName: "bookAppointmentForPatient", // Name of the function to call
        args: [patient as `0x${string}`, startTime, reason], // Arguments: patient address, time, reason
      });
      // Show success notification to user
      toast.success("Appointment created for patient!");
    } catch (error: any) {
      // Catch any errors that occur
      // Show error notification with error message or default message
      toast.error(error?.shortMessage || "Failed to create appointment");
      // Re-throw error so caller can handle it
      throw error;
    }
  };

  return {
    bookForPatient,   // Function to call for booking
    isPending,       // Boolean: true while transaction is being sent
    isConfirming,    // Boolean: true while waiting for confirmation
    isConfirmed,     // Boolean: true when transaction is confirmed
    hash,            // Transaction hash string
  };
}

export function useAddNote() {
  // Custom React hook for adding medical notes to appointments (doctor only)
  const { writeContract, data: hash, isPending } = useWriteContract();
  // Get function to write to contract, transaction hash, and pending status
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash, // Wait for transaction with this hash to be confirmed
    });
  // Get loading state while confirming and success state when confirmed

  const addNote = async (appointmentId: bigint, diagnosis: string, prescription: string) => {
    // Async function to add note with appointment ID, diagnosis, and prescription
    try {
      // Try to execute the contract write operation
      await writeContract({
        address: getContractAddress(), // Get the deployed contract address
        abi: HEALTHCARE_ABI, // Contract ABI for encoding/decoding
        functionName: "addOrUpdateNote", // Name of the function to call
        args: [appointmentId, diagnosis, prescription], // Arguments: appointment ID, diagnosis, prescription
      });
      // Show success notification to user
      toast.success("Note added successfully!");
    } catch (error: any) {
      // Catch any errors that occur
      // Show error notification with error message or default message
      toast.error(error?.shortMessage || "Failed to add note");
      // Re-throw error so caller can handle it
      throw error;
    }
  };

  return {
    addNote,         // Function to call for adding note
    isPending,       // Boolean: true while transaction is being sent
    isConfirming,    // Boolean: true while waiting for confirmation
    isConfirmed,     // Boolean: true when transaction is confirmed
    hash,            // Transaction hash string
  };
}

export function useGetDoctors() {
  // Custom React hook for fetching all registered doctors
  const { data, isLoading, error, refetch } = useReadContract({
    // Hook to read data from smart contract (read-only operation)
    address: getContractAddress(), // Get the deployed contract address
    abi: HEALTHCARE_ABI, // Contract ABI for encoding/decoding
    functionName: "listDoctors", // Name of the function to call
  });
  // Returns: data from contract, loading state, error object, and refetch function

  return {
    doctors: (data as Doctor[]) || [], // Convert data to Doctor array or empty array
    isLoading,                          // Boolean: true while fetching data
    error,                              // Error object if fetch failed
    refetch,                            // Function to manually refetch data
  };
}

export function useGetPatients() {
  // Custom React hook for fetching all registered patients
  const { data, isLoading, error, refetch } = useReadContract({
    // Hook to read data from smart contract (read-only operation)
    address: getContractAddress(), // Get the deployed contract address
    abi: HEALTHCARE_ABI, // Contract ABI for encoding/decoding
    functionName: "listPatients", // Name of the function to call
  });
  // Returns: data from contract, loading state, error object, and refetch function

  return {
    patients: (data as Patient[]) || [], // Convert data to Patient array or empty array
    isLoading,                           // Boolean: true while fetching data
    error,                               // Error object if fetch failed
    refetch,                             // Function to manually refetch data
  };
}

export function useGetMyAppointmentsAsPatient() {
  // Custom React hook for fetching appointments for the current patient
  const { address, isConnected } = useAccount();
  // Get current wallet address and connection status
  const { data, isLoading, error, refetch } = useReadContract({
    // Hook to read data from smart contract (read-only operation)
    address: getContractAddress(), // Get the deployed contract address
    abi: HEALTHCARE_ABI, // Contract ABI for encoding/decoding
    functionName: "getMyAppointmentsAsPatient", // Name of the function to call
    query: {
      enabled: !!address && isConnected, // Only fetch if wallet is connected
      retry: 1, // Retry once in case of network issues
    },
  });
  // Returns: data from contract, loading state, error object, and refetch function

  // Convert status enum from number/bigint to string
  const appointments: Appointment[] = data 
    // If data exists, process it
    ? (Array.from(data as readonly any[]) as any[]).map((appt: any) => {
        // Convert each appointment
        // Convert status from bigint to number if needed
        const statusNum = typeof appt.status === 'bigint' ? Number(appt.status) : appt.status;
        return {
          ...appt, // Spread all appointment properties
          // Convert numeric status to readable string
          status: statusNum === 0 ? "Booked" : statusNum === 1 ? "Completed" : "Cancelled",
        };
      }) as Appointment[]
    : []; // Return empty array if no data

  // Log for debugging
  if (error) {
    // Log error to console if fetch failed
    console.error("Error fetching patient appointments:", error);
  }

  return {
    appointments, // Array of appointments with converted status
    isLoading,    // Boolean: true while fetching data
    error,        // Error object if fetch failed
    refetch,      // Function to manually refetch data
  };
}

export function useGetMyAppointmentsAsDoctor() {
  // Custom React hook for fetching appointments for the current doctor
  const { address, isConnected } = useAccount();
  // Get current wallet address and connection status
  const { data, isLoading, error, refetch } = useReadContract({
    // Hook to read data from smart contract (read-only operation)
    address: getContractAddress(), // Get the deployed contract address
    abi: HEALTHCARE_ABI, // Contract ABI for encoding/decoding
    functionName: "getMyAppointmentsAsDoctor", // Name of the function to call
    query: {
      enabled: !!address && isConnected, // Only fetch if wallet is connected
      retry: 1, // Retry once in case of network issues
    },
  });
  // Returns: data from contract, loading state, error object, and refetch function

  // Convert status enum from number/bigint to string
  const appointments: Appointment[] = data 
    // If data exists, process it
    ? (Array.from(data as readonly any[]) as any[]).map((appt: any) => {
        // Convert each appointment
        // Convert status from bigint to number if needed
        const statusNum = typeof appt.status === 'bigint' ? Number(appt.status) : appt.status;
        return {
          ...appt, // Spread all appointment properties
          // Convert numeric status to readable string
          status: statusNum === 0 ? "Booked" : statusNum === 1 ? "Completed" : "Cancelled",
        };
      }) as Appointment[]
    : []; // Return empty array if no data

  // Log for debugging
  if (error) {
    // Log error to console if fetch failed
    console.error("Error fetching doctor appointments:", error);
  }

  return {
    appointments, // Array of appointments with converted status
    isLoading,    // Boolean: true while fetching data
    error,        // Error object if fetch failed
    refetch,      // Function to manually refetch data
  };
}

export function useGetNote(appointmentId: bigint) {
  // Custom React hook for fetching a medical note for a specific appointment
  const { data, isLoading, error, refetch } = useReadContract({
    // Hook to read data from smart contract (read-only operation)
    address: getContractAddress(), // Get the deployed contract address
    abi: HEALTHCARE_ABI, // Contract ABI for encoding/decoding
    functionName: "getNote", // Name of the function to call
    args: [appointmentId], // Pass appointment ID as argument
  });
  // Returns: data from contract, loading state, error object, and refetch function

  return {
    note: data as Note | undefined, // Convert data to Note type or undefined
    isLoading,                      // Boolean: true while fetching data
    error,                          // Error object if fetch failed
    refetch,                        // Function to manually refetch data
  };
}

export function useGetStats() {
  // Custom React hook for fetching system statistics
  const { data, isLoading, error, refetch } = useReadContract({
    // Hook to read data from smart contract (read-only operation)
    address: getContractAddress(), // Get the deployed contract address
    abi: HEALTHCARE_ABI, // Contract ABI for encoding/decoding
    functionName: "stats", // Name of the function to call
  });
  // Returns: data from contract, loading state, error object, and refetch function

  return {
    stats: data as Stats | undefined, // Convert data to Stats type or undefined
    isLoading,                        // Boolean: true while fetching data
    error,                            // Error object if fetch failed
    refetch,                          // Function to manually refetch data
  };
}

export function useGetAllAppointments() {
  // Custom React hook for fetching all appointments in the system
  const { data, isLoading, error, refetch } = useReadContract({
    // Hook to read data from smart contract (read-only operation)
    address: getContractAddress(), // Get the deployed contract address
    abi: HEALTHCARE_ABI, // Contract ABI for encoding/decoding
    functionName: "getAllAppointments", // Name of the function to call
  });
  // Returns: data from contract, loading state, error object, and refetch function

  // Convert status enum from number/bigint to string
  const appointments: Appointment[] = data 
    // If data exists, process it
    ? (Array.from(data as readonly any[]) as any[]).map((appt: any) => {
        // Convert each appointment
        // Convert status from bigint to number if needed
        const statusNum = typeof appt.status === 'bigint' ? Number(appt.status) : appt.status;
        return {
          ...appt, // Spread all appointment properties
          // Convert numeric status to readable string
          status: statusNum === 0 ? "Booked" : statusNum === 1 ? "Completed" : "Cancelled",
        };
      }) as Appointment[]
    : []; // Return empty array if no data

  return {
    appointments, // Array of appointments with converted status
    isLoading,    // Boolean: true while fetching data
    error,        // Error object if fetch failed
    refetch,      // Function to manually refetch data
  };
}