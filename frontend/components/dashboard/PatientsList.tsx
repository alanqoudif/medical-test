"use client";

import { useGetPatients } from "@/hooks/useHealthcare";
import { Avatar } from "@/components/ui/Avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { formatAddress } from "@/lib/utils";
import type { Patient } from "@/types";

interface PatientsListProps {
  limit?: number;
}

export function PatientsList({ limit }: PatientsListProps) {
  const { patients, isLoading } = useGetPatients();

  const displayPatients = limit ? patients.slice(0, limit) : patients;

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Patients</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Loading patients...</p>
        </CardContent>
      </Card>
    );
  }

  if (displayPatients.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Patients</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">No patients registered yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Patients</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {displayPatients.map((patient: Patient) => (
            <div
              key={patient.addr}
              className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <Avatar name={patient.name} size="md" />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{patient.name}</h4>
                <p className="text-sm text-gray-600">Age: {patient.age}</p>
              </div>
              <span className="text-xs text-gray-500 font-mono">
                {formatAddress(patient.addr)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}