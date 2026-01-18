"use client";

import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { useRole } from "@/hooks/useRole";
import { AppointmentsTable } from "@/components/dashboard/AppointmentsTable";
import { BookAppointmentForm } from "@/components/forms/BookAppointmentForm";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";

export default function AppointmentsPage() {
  const { isConnected } = useAccount();
  const { role } = useRole();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, [isConnected, router]);

  if (!isConnected || role !== "patient") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
          <p className="text-gray-600">View and manage your appointments</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <BookAppointmentForm />
          <Card>
            <CardHeader>
              <CardTitle>Book New Appointment</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="mt-8">
          <AppointmentsTable showNotes={true} />
        </div>
      </main>
    </div>
  );
}