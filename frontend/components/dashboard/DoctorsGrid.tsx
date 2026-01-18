"use client";

import { useGetDoctors } from "@/hooks/useHealthcare";
import { Avatar } from "@/components/ui/Avatar";
import { Card, CardTitle } from "@/components/ui/Card";
import { formatAddress } from "@/lib/utils";
import Link from "next/link";
import type { Doctor } from "@/types";

interface DoctorsGridProps {
  limit?: number;
}

export function DoctorsGrid({ limit }: DoctorsGridProps) {
  const { doctors, isLoading } = useGetDoctors();

  const displayDoctors = limit ? doctors.slice(0, limit) : doctors;

  if (isLoading) {
    return (
      <Card className="bg-white border border-gray-200 shadow-md">
        <div className="p-6">
          <CardTitle className="mb-4">Top Rated Doctors</CardTitle>
          <p className="text-gray-600">Loading doctors...</p>
        </div>
      </Card>
    );
  }

  if (displayDoctors.length === 0) {
    return (
      <Card className="bg-white border border-gray-200 shadow-md">
        <div className="p-6">
          <CardTitle className="mb-4">Top Rated Doctors</CardTitle>
          <p className="text-gray-600">No doctors registered yet.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white border border-gray-200 shadow-md">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <CardTitle>Top Rated Doctors</CardTitle>
          <Link href="/doctors" className="text-green-600 hover:text-green-700 text-sm font-medium">
            View more &gt;&gt;
          </Link>
        </div>
        <div className="overflow-x-auto">
          <div className="flex space-x-4 pb-4" style={{ minWidth: "max-content" }}>
            {displayDoctors.map((doctor: Doctor, index: number) => (
              <div
                key={doctor.addr}
                className="flex-shrink-0 w-48 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="relative mb-4">
                  <Avatar name={doctor.name} size="lg" />
                  <div className="absolute bottom-0 right-0 bg-green-700 text-white text-xs px-2 py-1 rounded font-semibold">
                    #{`D-${String(index + 1).padStart(3, "0")}`}
                  </div>
                </div>
                <h4 className="font-bold text-gray-900 mb-1 text-sm">{doctor.name}</h4>
                <p className="text-green-600 text-sm font-medium">{doctor.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}