"use client";

import { useGetPatients } from "@/hooks/useHealthcare";
import { Avatar } from "@/components/ui/Avatar";
import { Card, CardTitle } from "@/components/ui/Card";
import { formatAddress } from "@/lib/utils";
import Link from "next/link";
import type { Patient } from "@/types";

interface PatientsListProps {
  limit?: number;
}

export function PatientsList({ limit }: PatientsListProps) {
  const { patients, isLoading } = useGetPatients();

  const displayPatients = limit ? patients.slice(0, limit) : patients;

  if (isLoading) {
    return (
      <Card className="bg-white border border-gray-200 shadow-md">
        <div className="p-6">
          <CardTitle className="mb-4">Recent Patient</CardTitle>
          <p className="text-gray-600">Loading patients...</p>
        </div>
      </Card>
    );
  }

  if (displayPatients.length === 0) {
    return (
      <Card className="bg-white border border-gray-200 shadow-md">
        <div className="p-6">
          <CardTitle className="mb-4">Recent Patient</CardTitle>
          <p className="text-gray-600">No patients registered yet.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white border border-gray-200 shadow-md">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <CardTitle>Recent Patient</CardTitle>
          <Link href="/patients" className="text-green-600 hover:text-green-700 text-sm font-medium">
            View more &gt;&gt;
          </Link>
        </div>
        <div className="space-y-4">
          {displayPatients.map((patient: Patient) => (
            <div
              key={patient.addr}
              className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Avatar name={patient.name} size="md" />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{patient.name}</h4>
                <p className="text-sm text-gray-500">Age: {patient.age}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}