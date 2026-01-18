"use client";

import { useAccount, useBalance } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { formatEther } from "viem";
import { Navbar } from "@/components/layout/Navbar";
import { useRole } from "@/hooks/useRole";
import {
  useGetMyAppointmentsAsPatient,
  useGetMyAppointmentsAsDoctor,
  useGetStats,
  useGetDoctors,
  useGetPatients,
  useGetAllAppointments,
} from "@/hooks/useHealthcare";
import { StatCard } from "@/components/dashboard/StatCard";
import { BalanceCard } from "@/components/dashboard/BalanceCard";
import { DoctorsGrid } from "@/components/dashboard/DoctorsGrid";
import { PatientsList } from "@/components/dashboard/PatientsList";
import { AppointmentsTable } from "@/components/dashboard/AppointmentsTable";
import { BookAppointmentForm } from "@/components/forms/BookAppointmentForm";
import { CreateAppointmentForPatientForm } from "@/components/forms/CreateAppointmentForPatientForm";
import { NoteModal } from "@/components/forms/NoteModal";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { formatDate } from "@/lib/utils";
import { getRoleLabel, getRoleBadgeStyles, getRoleBadgeIcon } from "@/lib/roleUtils";
import Link from "next/link";

export default function DashboardPage() {
  const { isConnected, address } = useAccount();
  const { role, isLoading: roleLoading } = useRole();
  const router = useRouter();
  const { stats, isLoading: statsLoading } = useGetStats();
  const { appointments: patientAppointments, isLoading: patientAppointmentsLoading } =
    useGetMyAppointmentsAsPatient();
  const { appointments: doctorAppointments, isLoading: doctorAppointmentsLoading, refetch: refetchDoctorAppointments } =
    useGetMyAppointmentsAsDoctor();
  const { appointments: allAppointments } = useGetAllAppointments();
  const { doctors } = useGetDoctors();
  const { patients } = useGetPatients();
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<bigint | null>(null);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  const appointments = role === "patient" ? patientAppointments : doctorAppointments;
  const appointmentsLoading = role === "patient" ? patientAppointmentsLoading : doctorAppointmentsLoading;

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, [isConnected, router]);

  if (!isConnected) {
    return null;
  }

  if (roleLoading || statsLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-gray-600">Loading...</p>
        </main>
      </div>
    );
  }

  if (role === "none") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card>
            <CardHeader>
              <CardTitle>Not Registered</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                You need to register as a doctor or patient to access the dashboard.
              </p>
              <Link href="/register">
                <Button>Register Now</Button>
              </Link>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">Welcome to Healthcare DApp!</h1>
            <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${getRoleBadgeStyles(role)}`}>
              {getRoleBadgeIcon(role)} {getRoleLabel(role)}
            </span>
          </div>
          <p className="text-gray-500">Hospital Decentralized Medical Center</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Patient"
            value={stats?.totalPatients?.toString() || "0"}
            gradient="from-red-500 to-red-600"
            percentage="+4%"
          />
          <StatCard
            title="Doctor"
            value={stats?.totalDoctors?.toString() || "0"}
            gradient="from-green-500 to-green-600"
            percentage="+.4%"
          />
          <StatCard
            title="Appointment"
            value={stats?.totalAppointments?.toString() || "0"}
            gradient="from-blue-400 to-blue-500"
            percentage="+.2%"
          />
          <StatCard
            title="Notifications"
            value={allAppointments.length.toString()}
            gradient="from-purple-500 to-purple-600"
            percentage="+.5%"
          />
        </div>

        {/* Balance Card - Full Width */}
        <div className="mb-8">
          <BalanceCard />
        </div>

        {/* Role-specific content */}
        {role === "patient" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <BookAppointmentForm />
            <Card>
              <CardHeader>
                <CardTitle>My Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                {appointmentsLoading ? (
                  <p className="text-gray-600">Loading...</p>
                ) : appointments.length === 0 ? (
                  <p className="text-gray-600">No appointments yet.</p>
                ) : (
                  <div className="space-y-4">
                    {appointments.slice(0, 5).map((appointment: any) => (
                      <div
                        key={appointment.id.toString()}
                        className="p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-gray-900">
                              Appointment #{appointment.id.toString()}
                            </p>
                            <p className="text-sm text-gray-600">
                              {formatDate(appointment.startTime)}
                            </p>
                          </div>
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {appointment.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{appointment.reason}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {role === "doctor" && (
          <div className="space-y-8 mb-8">
            {/* Create Appointment for Patient */}
            <CreateAppointmentForPatientForm 
              onAppointmentCreated={() => {
                // Refetch appointments in dashboard
                refetchDoctorAppointments();
              }}
            />

            {/* My Appointments */}
            <Card>
              <CardHeader>
                <CardTitle>My Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                {appointmentsLoading ? (
                  <p className="text-gray-600">Loading...</p>
                ) : appointments.length === 0 ? (
                  <p className="text-gray-600">No appointments yet.</p>
                ) : (
                  <div className="space-y-4">
                    {appointments.map((appointment: any) => {
                      const patient = patients.find((p: any) => p.addr.toLowerCase() === appointment.patient.toLowerCase());
                      return (
                        <div
                          key={appointment.id.toString()}
                          className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900">
                                Appointment #{appointment.id.toString()}
                              </p>
                              <p className="text-sm text-gray-600">
                                Patient: {patient ? patient.name : appointment.patient.slice(0, 10) + "..."}
                              </p>
                              <p className="text-sm text-gray-600">
                                {formatDate(appointment.startTime)}
                              </p>
                              <p className="text-sm text-gray-700 mt-2">{appointment.reason}</p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedAppointmentId(appointment.id);
                                setIsNoteModalOpen(true);
                              }}
                            >
                              Add Note
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* All Doctors Section */}
            <Card>
              <CardHeader>
                <CardTitle>All Registered Doctors ({doctors.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {doctors.length === 0 ? (
                  <p className="text-gray-600">No doctors registered yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {doctors.map((doctor: any) => (
                      <div
                        key={doctor.addr}
                        className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <Avatar name={doctor.name} size="md" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{doctor.name}</h4>
                            <p className="text-sm text-gray-600">{doctor.specialty}</p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 font-mono">
                          {doctor.addr.slice(0, 10)}...{doctor.addr.slice(-6)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* All Patients Section */}
            <Card>
              <CardHeader>
                <CardTitle>All Registered Patients ({patients.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {patients.length === 0 ? (
                  <p className="text-gray-600">No patients registered yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {patients.map((patient: any) => (
                      <div
                        key={patient.addr}
                        className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <Avatar name={patient.name} size="md" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{patient.name}</h4>
                            <p className="text-sm text-gray-600">Age: {patient.age}</p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 font-mono">
                          {patient.addr.slice(0, 10)}...{patient.addr.slice(-6)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* All Appointments Section */}
            <Card>
              <CardHeader>
                <CardTitle>All Appointments in System ({allAppointments.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {allAppointments.length === 0 ? (
                  <p className="text-gray-600">No appointments in system yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {allAppointments.map((appointment: any) => {
                          const patient = patients.find((p: any) => p.addr.toLowerCase() === appointment.patient.toLowerCase());
                          const doctor = doctors.find((d: any) => d.addr.toLowerCase() === appointment.doctor.toLowerCase());
                          return (
                            <tr key={appointment.id.toString()} className="hover:bg-gray-50">
                              <td className="px-4 py-4 text-sm font-medium text-gray-900">
                                #{appointment.id.toString()}
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-600">
                                {patient ? patient.name : appointment.patient.slice(0, 8) + "..."}
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-600">
                                {doctor ? doctor.name : appointment.doctor.slice(0, 8) + "..."}
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-600">
                                {formatDate(appointment.startTime)}
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-600">{appointment.reason}</td>
                              <td className="px-4 py-4">
                                <span
                                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                    appointment.status === "Booked"
                                      ? "bg-blue-100 text-blue-800"
                                      : appointment.status === "Completed"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {appointment.status}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* General sections - Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <DoctorsGrid limit={6} />
          <PatientsList limit={5} />
        </div>


        {/* Note Modal */}
        {selectedAppointmentId && (
          <NoteModal
            appointmentId={selectedAppointmentId}
            isOpen={isNoteModalOpen}
            onClose={() => {
              setIsNoteModalOpen(false);
              setSelectedAppointmentId(null);
            }}
            onSuccess={() => {
              // Refresh appointments
              window.location.reload();
            }}
          />
        )}
      </main>
    </div>
  );
}