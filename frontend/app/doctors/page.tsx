"use client";

import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { useGetDoctors } from "@/hooks/useHealthcare";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import type { Doctor } from "@/types";

export default function DoctorsPage() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const { doctors, isLoading } = useGetDoctors();

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, [isConnected, router]);

  if (!isConnected) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Doctors</h1>
          <p className="text-gray-600">Browse all registered doctors on the platform</p>
        </div>

        {isLoading ? (
          <Card>
            <CardHeader>
              <CardTitle>Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Loading doctors...</p>
            </CardContent>
          </Card>
        ) : doctors.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No Doctors</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">No doctors registered yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor: Doctor, index: number) => (
              <Card key={doctor.addr} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar name={doctor.name} size="lg" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
                      <p className="text-green-600 font-medium">{doctor.specialty}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-500">License ID: </span>
                      <span className="text-gray-900">{doctor.licenseId}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Address: </span>
                      <span className="text-gray-900 font-mono text-xs break-all">
                        {doctor.addr}
                      </span>
                    </div>
                    <div>
                      <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                        doctor.approved 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {doctor.approved ? "Approved" : "Pending Approval"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
