"use client";

import { useAccount } from "wagmi";
import { useReadContract } from "wagmi";
import { HEALTHCARE_ABI, getContractAddress } from "@/lib/contract";
import { useMemo } from "react";
import type { UserRole } from "@/types";

export function useRole(): {
  role: UserRole;
  isDoctor: boolean;
  isPatient: boolean;
  isLoading: boolean;
  address: string | undefined;
  refetch: () => void;
} {
  const { address, isConnected } = useAccount();

  const { data: isDoctorData, isLoading: isDoctorLoading, refetch: refetchDoctor } = useReadContract({
    address: getContractAddress(),
    abi: HEALTHCARE_ABI,
    functionName: "isDoctor",
    args: address ? [address] : undefined,
    query: {
      enabled: isConnected && !!address,
      refetchInterval: 3000, // Refetch every 3 seconds to catch new registrations
    },
  });

  const { data: isPatientData, isLoading: isPatientLoading, refetch: refetchPatient } = useReadContract({
    address: getContractAddress(),
    abi: HEALTHCARE_ABI,
    functionName: "isPatient",
    args: address ? [address] : undefined,
    query: {
      enabled: isConnected && !!address,
      refetchInterval: 3000, // Refetch every 3 seconds to catch new registrations
    },
  });

  const role: UserRole = useMemo(() => {
    if (!isConnected || !address) return "none";
    if (isDoctorData) return "doctor";
    if (isPatientData) return "patient";
    return "none";
  }, [isConnected, address, isDoctorData, isPatientData]);

  const refetch = () => {
    refetchDoctor();
    refetchPatient();
  };

  return {
    role,
    isDoctor: role === "doctor",
    isPatient: role === "patient",
    isLoading: isDoctorLoading || isPatientLoading,
    address,
    refetch,
  };
}