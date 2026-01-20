"use client";
// Directive to mark this as a client-side component in Next.js

import { useAccount } from "wagmi";
// Import hook to get current wallet account information
import { useReadContract } from "wagmi";
// Import hook to read data from smart contracts
import { HEALTHCARE_ABI, getContractAddress } from "@/lib/contract";
// Import contract ABI and address getter function
import { useMemo } from "react";
// Import React hook for memoizing computed values
import type { UserRole } from "@/types";
// Import UserRole type definition

export function useRole(): {
  // Custom React hook to determine user's role (doctor, patient, or none)
  role: UserRole;           // The user's role
  isDoctor: boolean;       // Boolean: true if user is a doctor
  isPatient: boolean;       // Boolean: true if user is a patient
  isLoading: boolean;      // Boolean: true while checking role
  address: string | undefined; // User's wallet address
  refetch: () => void;     // Function to manually refetch role data
} {
  const { address, isConnected } = useAccount();
  // Get current wallet address and connection status

  const { data: isDoctorData, isLoading: isDoctorLoading, refetch: refetchDoctor } = useReadContract({
    // Hook to check if current address is a registered doctor
    address: getContractAddress(), // Get the deployed contract address
    abi: HEALTHCARE_ABI, // Contract ABI for encoding/decoding
    functionName: "isDoctor", // Name of the function to call
    args: address ? [address] : undefined, // Pass address as argument if available
    query: {
      enabled: isConnected && !!address, // Only fetch if wallet is connected
      refetchInterval: 3000, // Refetch every 3 seconds to catch new registrations
    },
  });
  // Returns: boolean data, loading state, and refetch function

  const { data: isPatientData, isLoading: isPatientLoading, refetch: refetchPatient } = useReadContract({
    // Hook to check if current address is a registered patient
    address: getContractAddress(), // Get the deployed contract address
    abi: HEALTHCARE_ABI, // Contract ABI for encoding/decoding
    functionName: "isPatient", // Name of the function to call
    args: address ? [address] : undefined, // Pass address as argument if available
    query: {
      enabled: isConnected && !!address, // Only fetch if wallet is connected
      refetchInterval: 3000, // Refetch every 3 seconds to catch new registrations
    },
  });
  // Returns: boolean data, loading state, and refetch function

  const role: UserRole = useMemo(() => {
    // Memoized computation of user role based on contract data
    if (!isConnected || !address) return "none";
    // Return "none" if wallet is not connected or address is missing
    if (isDoctorData) return "doctor";
    // Return "doctor" if contract confirms user is a doctor
    if (isPatientData) return "patient";
    // Return "patient" if contract confirms user is a patient
    return "none";
    // Return "none" if user is not registered
  }, [isConnected, address, isDoctorData, isPatientData]);
  // Recompute only when these dependencies change

  const refetch = () => {
    // Function to manually refetch both doctor and patient status
    refetchDoctor();
    // Refetch doctor status from contract
    refetchPatient();
    // Refetch patient status from contract
  };

  return {
    role,                    // User's role: "doctor", "patient", or "none"
    isDoctor: role === "doctor", // Boolean: true if role is doctor
    isPatient: role === "patient", // Boolean: true if role is patient
    isLoading: isDoctorLoading || isPatientLoading, // Boolean: true if either check is loading
    address,                  // User's wallet address
    refetch,                  // Function to manually refresh role data
  };
}