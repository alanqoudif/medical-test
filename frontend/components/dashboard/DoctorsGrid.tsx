"use client";

import { useGetDoctors } from "@/hooks/useHealthcare";
import { Avatar } from "@/components/ui/Avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { formatAddress } from "@/lib/utils";
import type { Doctor } from "@/types";

interface DoctorsGridProps {
  limit?: number;
}

export function DoctorsGrid({ limit }: DoctorsGridProps) {
  const { doctors, isLoading } = useGetDoctors();

  const displayDoctors = limit ? doctors.slice(0, limit) : doctors;

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Rated Doctors</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Loading doctors...</p>
        </CardContent>
      </Card>
    );
  }

  if (displayDoctors.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Rated Doctors</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">No doctors registered yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Rated Doctors</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayDoctors.map((doctor: Doctor, index: number) => (
            <div
              key={doctor.addr}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-3 mb-3">
                <Avatar name={doctor.name} size="md" />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{doctor.name}</h4>
                  <p className="text-sm text-gray-600">{doctor.specialty}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="font-mono">#{formatAddress(doctor.addr)}</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  D-{String(index + 1).padStart(3, "0")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}