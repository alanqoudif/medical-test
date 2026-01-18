"use client";

import { useWriteContract, useWaitForTransactionReceipt, useReadContract, useReadContracts } from "wagmi";
import { HEALTHCARE_ABI, getContractAddress } from "@/lib/contract";
import { useAccount } from "wagmi";
import { parseEther } from "viem";
import toast from "react-hot-toast";
import type { Doctor, Patient, Appointment, Note, Stats } from "@/types";

export function useRegisterDoctor() {
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const register = async (name: string, specialty: string, licenseId: string) => {
    try {
      await writeContract({
        address: getContractAddress(),
        abi: HEALTHCARE_ABI,
        functionName: "registerDoctor",
        args: [name, specialty, licenseId],
      });
      toast.success("Doctor registration submitted!");
    } catch (error: any) {
      toast.error(error?.shortMessage || "Failed to register doctor");
      throw error;
    }
  };

  return {
    register,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
  };
}

export function useRegisterPatient() {
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const register = async (name: string, age: number) => {
    try {
      await writeContract({
        address: getContractAddress(),
        abi: HEALTHCARE_ABI,
        functionName: "registerPatient",
        args: [name, age],
      });
      toast.success("Patient registration submitted!");
    } catch (error: any) {
      toast.error(error?.shortMessage || "Failed to register patient");
      throw error;
    }
  };

  return {
    register,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
  };
}

export function useBookAppointment() {
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const book = async (doctor: string, startTime: bigint, reason: string) => {
    try {
      await writeContract({
        address: getContractAddress(),
        abi: HEALTHCARE_ABI,
        functionName: "bookAppointment",
        args: [doctor as `0x${string}`, startTime, reason],
      });
      toast.success("Appointment booking submitted!");
    } catch (error: any) {
      toast.error(error?.shortMessage || "Failed to book appointment");
      throw error;
    }
  };

  return {
    book,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
  };
}

export function useBookAppointmentForPatient() {
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const bookForPatient = async (patient: string, startTime: bigint, reason: string) => {
    try {
      await writeContract({
        address: getContractAddress(),
        abi: HEALTHCARE_ABI,
        functionName: "bookAppointmentForPatient",
        args: [patient as `0x${string}`, startTime, reason],
      });
      toast.success("Appointment created for patient!");
    } catch (error: any) {
      toast.error(error?.shortMessage || "Failed to create appointment");
      throw error;
    }
  };

  return {
    bookForPatient,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
  };
}

export function useAddNote() {
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const addNote = async (appointmentId: bigint, diagnosis: string, prescription: string) => {
    try {
      await writeContract({
        address: getContractAddress(),
        abi: HEALTHCARE_ABI,
        functionName: "addOrUpdateNote",
        args: [appointmentId, diagnosis, prescription],
      });
      toast.success("Note added successfully!");
    } catch (error: any) {
      toast.error(error?.shortMessage || "Failed to add note");
      throw error;
    }
  };

  return {
    addNote,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
  };
}

export function useGetDoctors() {
  const { data, isLoading, error, refetch } = useReadContract({
    address: getContractAddress(),
    abi: HEALTHCARE_ABI,
    functionName: "listDoctors",
  });

  return {
    doctors: (data as Doctor[]) || [],
    isLoading,
    error,
    refetch,
  };
}

export function useGetPatients() {
  const { data, isLoading, error, refetch } = useReadContract({
    address: getContractAddress(),
    abi: HEALTHCARE_ABI,
    functionName: "listPatients",
  });

  return {
    patients: (data as Patient[]) || [],
    isLoading,
    error,
    refetch,
  };
}

export function useGetMyAppointmentsAsPatient() {
  const { address } = useAccount();
  const { data, isLoading, error, refetch } = useReadContract({
    address: getContractAddress(),
    abi: HEALTHCARE_ABI,
    functionName: "getMyAppointmentsAsPatient",
    query: {
      enabled: !!address,
    },
  });

  // Convert status enum from number/bigint to string
  const appointments: Appointment[] = data 
    ? (Array.from(data as readonly any[]) as any[]).map((appt: any) => {
        const statusNum = typeof appt.status === 'bigint' ? Number(appt.status) : appt.status;
        return {
          ...appt,
          status: statusNum === 0 ? "Booked" : statusNum === 1 ? "Completed" : "Cancelled",
        };
      }) as Appointment[]
    : [];

  return {
    appointments,
    isLoading,
    error,
    refetch,
  };
}

export function useGetMyAppointmentsAsDoctor() {
  const { address } = useAccount();
  const { data, isLoading, error, refetch } = useReadContract({
    address: getContractAddress(),
    abi: HEALTHCARE_ABI,
    functionName: "getMyAppointmentsAsDoctor",
    query: {
      enabled: !!address,
    },
  });

  // Convert status enum from number/bigint to string
  const appointments: Appointment[] = data 
    ? (Array.from(data as readonly any[]) as any[]).map((appt: any) => {
        const statusNum = typeof appt.status === 'bigint' ? Number(appt.status) : appt.status;
        return {
          ...appt,
          status: statusNum === 0 ? "Booked" : statusNum === 1 ? "Completed" : "Cancelled",
        };
      }) as Appointment[]
    : [];

  return {
    appointments,
    isLoading,
    error,
    refetch,
  };
}

export function useGetNote(appointmentId: bigint) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: getContractAddress(),
    abi: HEALTHCARE_ABI,
    functionName: "getNote",
    args: [appointmentId],
  });

  return {
    note: data as Note | undefined,
    isLoading,
    error,
    refetch,
  };
}

export function useGetStats() {
  const { data, isLoading, error, refetch } = useReadContract({
    address: getContractAddress(),
    abi: HEALTHCARE_ABI,
    functionName: "stats",
  });

  return {
    stats: data as Stats | undefined,
    isLoading,
    error,
    refetch,
  };
}

export function useGetAllAppointments() {
  const { data, isLoading, error, refetch } = useReadContract({
    address: getContractAddress(),
    abi: HEALTHCARE_ABI,
    functionName: "getAllAppointments",
  });

  // Convert status enum from number/bigint to string
  const appointments: Appointment[] = data 
    ? (Array.from(data as readonly any[]) as any[]).map((appt: any) => {
        const statusNum = typeof appt.status === 'bigint' ? Number(appt.status) : appt.status;
        return {
          ...appt,
          status: statusNum === 0 ? "Booked" : statusNum === 1 ? "Completed" : "Cancelled",
        };
      }) as Appointment[]
    : [];

  return {
    appointments,
    isLoading,
    error,
    refetch,
  };
}