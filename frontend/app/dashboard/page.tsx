"use client";
// Directive to mark this as a client-side component in Next.js

import { useAccount, useBalance } from "wagmi";
// Import hooks to get wallet account and balance information
import { useRouter } from "next/navigation";
// Import Next.js router hook for navigation
import { useEffect, useState } from "react";
// Import React hooks: useEffect for side effects, useState for state management
import { formatEther } from "viem";
// Import utility to format ether values (not used but imported)
import { Navbar } from "@/components/layout/Navbar";
// Import navigation bar component
import { useRole } from "@/hooks/useRole";
// Import custom hook to get user's role
import {
  useGetMyAppointmentsAsPatient,
  useGetMyAppointmentsAsDoctor,
  useGetStats,
  useGetDoctors,
  useGetPatients,
  useGetAllAppointments,
} from "@/hooks/useHealthcare";
// Import custom hooks for fetching healthcare data from smart contract
import { StatCard } from "@/components/dashboard/StatCard";
// Import component to display statistics cards
import { BalanceCard } from "@/components/dashboard/BalanceCard";
// Import component to display wallet balance
import { DoctorsGrid } from "@/components/dashboard/DoctorsGrid";
// Import component to display grid of doctors
import { PatientsList } from "@/components/dashboard/PatientsList";
// Import component to display list of patients
import { AppointmentsTable } from "@/components/dashboard/AppointmentsTable";
// Import component to display appointments table
import { BookAppointmentForm } from "@/components/forms/BookAppointmentForm";
// Import form component for patients to book appointments
import { CreateAppointmentForPatientForm } from "@/components/forms/CreateAppointmentForPatientForm";
// Import form component for doctors to create appointments for patients
import { NoteModal } from "@/components/forms/NoteModal";
// Import modal component for adding medical notes
import { Button } from "@/components/ui/Button";
// Import button UI component
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
// Import card UI components
import { Avatar } from "@/components/ui/Avatar";
// Import avatar UI component
import { formatDate } from "@/lib/utils";
// Import utility function to format dates
import { getRoleLabel, getRoleBadgeStyles, getRoleBadgeIcon } from "@/lib/roleUtils";
// Import utility functions for role display
import Link from "next/link";
// Import Next.js Link component for client-side navigation

export default function DashboardPage() {
  // Main dashboard page component
  const { isConnected, address } = useAccount();
  // Get current wallet address and connection status
  const { role, isLoading: roleLoading } = useRole();
  // Get user's role and loading state
  const router = useRouter();
  // Get router instance for programmatic navigation
  const { stats, isLoading: statsLoading } = useGetStats();
  // Fetch system statistics (total doctors, patients, appointments)
  const { appointments: patientAppointments, isLoading: patientAppointmentsLoading, error: patientAppointmentsError, refetch: refetchPatientAppointments } =
    useGetMyAppointmentsAsPatient();
  // Fetch appointments for current patient (if user is a patient)
  const { appointments: doctorAppointments, isLoading: doctorAppointmentsLoading, error: doctorAppointmentsError, refetch: refetchDoctorAppointments } =
    useGetMyAppointmentsAsDoctor();
  // Fetch appointments for current doctor (if user is a doctor)
  const { appointments: allAppointments } = useGetAllAppointments();
  // Fetch all appointments in the system (for doctor view)
  const { doctors } = useGetDoctors();
  // Fetch list of all registered doctors
  const { patients } = useGetPatients();
  // Fetch list of all registered patients
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<bigint | null>(null);
  // State to track which appointment is selected for adding a note
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  // State to control note modal visibility

  const appointments = role === "patient" ? patientAppointments : doctorAppointments;
  // Select appointments based on user's role (patient or doctor)
  const appointmentsLoading = role === "patient" ? patientAppointmentsLoading : doctorAppointmentsLoading;
  // Select loading state based on user's role
  const appointmentsError = role === "patient" ? patientAppointmentsError : doctorAppointmentsError;
  // Select error state based on user's role

  useEffect(() => {
    // Effect hook: redirect to home if wallet is not connected
    if (!isConnected) {
      // Check if wallet is not connected
      router.push("/");
      // Navigate to home page
    }
  }, [isConnected, router]);
  // Re-run effect when connection status or router changes

  // Refetch appointments when role changes (after registration)
  useEffect(() => {
    // Effect hook: refetch appointments after user registers
    if (role === "patient" && isConnected) {
      // Check if user is a patient and wallet is connected
      // Small delay to ensure contract state is updated
      const timer = setTimeout(() => {
        // Set timeout to wait 2 seconds
        refetchPatientAppointments();
        // Refetch patient appointments after delay
      }, 2000);
      return () => clearTimeout(timer);
      // Cleanup function: clear timeout if component unmounts
    } else if (role === "doctor" && isConnected) {
      // Check if user is a doctor and wallet is connected
      const timer = setTimeout(() => {
        // Set timeout to wait 2 seconds
        refetchDoctorAppointments();
        // Refetch doctor appointments after delay
      }, 2000);
      return () => clearTimeout(timer);
      // Cleanup function: clear timeout if component unmounts
    }
  }, [role, isConnected, refetchPatientAppointments, refetchDoctorAppointments]);
  // Re-run effect when role, connection status, or refetch functions change

  if (!isConnected) {
    // Early return: don't render anything if wallet is not connected
    return null;
  }

  if (roleLoading || statsLoading) {
    // Early return: show loading screen while data is being fetched
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Full screen container with gray background */}
        <Navbar />
        {/* Display navigation bar */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Main content area with max width, centered, and padding */}
          <p className="text-gray-600">Loading...</p>
          {/* Loading text */}
        </main>
      </div>
    );
  }

  if (role === "none") {
    // Early return: show registration prompt if user is not registered
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Full screen container with gray background */}
        <Navbar />
        {/* Display navigation bar */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Main content area with max width, centered, and padding */}
          <Card>
            {/* Card component */}
            <CardHeader>
              {/* Card header section */}
              <CardTitle>Not Registered</CardTitle>
              {/* Card title text */}
            </CardHeader>
            <CardContent>
              {/* Card content section */}
              <p className="text-gray-600 mb-4">
                {/* Instruction text in gray color with bottom margin */}
                You need to register as a doctor or patient to access the dashboard.
                {/* Message explaining user needs to register */}
              </p>
              <Link href="/register">
                {/* Link to registration page */}
                <Button>Register Now</Button>
                {/* Button to navigate to registration */}
              </Link>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    // Main dashboard layout
    <div className="min-h-screen bg-gray-50">
      {/* Full screen container with gray background */}
      <Navbar />
      {/* Display navigation bar at top */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main content area with max width, centered, responsive padding, and vertical padding */}
        {/* Welcome Section */}
        {/* Header section with welcome message and role badge */}
        <div className="mb-8">
          {/* Container with bottom margin */}
          <div className="flex items-center space-x-3 mb-2">
            {/* Flex container for title and badge, centered vertically with horizontal spacing */}
            <h1 className="text-3xl font-bold text-gray-900">Welcome to Healthcare DApp!</h1>
            {/* Main heading with large size, bold weight, and dark gray color */}
            <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${getRoleBadgeStyles(role)}`}>
              {/* Role badge with padding, rounded corners, border, and dynamic styling */}
              {getRoleBadgeIcon(role)} {getRoleLabel(role)}
              {/* Display role emoji icon and label text */}
            </span>
          </div>
          <p className="text-gray-500">Hospital Decentralized Medical Center</p>
          {/* Subtitle text in gray color */}
        </div>

        {/* Stats Cards */}
        {/* Grid of statistics cards showing system metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Grid layout: 1 column on mobile, 2 on medium screens, 4 on large screens, with gap and bottom margin */}
          <StatCard
            // Statistics card component for total patients
            title="Total Patient"
            // Card title text
            value={stats?.totalPatients?.toString() || "0"}
            // Display total patients count, or "0" if stats not loaded
            gradient="from-red-500 to-red-600"
            // Red gradient color scheme
            percentage="+4%"
            // Percentage indicator text
          />
          <StatCard
            // Statistics card component for total doctors
            title="Doctor"
            // Card title text
            value={stats?.totalDoctors?.toString() || "0"}
            // Display total doctors count, or "0" if stats not loaded
            gradient="from-green-500 to-green-600"
            // Green gradient color scheme
            percentage="+.4%"
            // Percentage indicator text
          />
          <StatCard
            // Statistics card component for total appointments
            title="Appointment"
            // Card title text
            value={stats?.totalAppointments?.toString() || "0"}
            // Display total appointments count, or "0" if stats not loaded
            gradient="from-blue-400 to-blue-500"
            // Blue gradient color scheme
            percentage="+.2%"
            // Percentage indicator text
          />
          <StatCard
            // Statistics card component for notifications
            title="Notifications"
            // Card title text
            value={allAppointments.length.toString()}
            // Display total number of appointments as notifications
            gradient="from-purple-500 to-purple-600"
            // Purple gradient color scheme
            percentage="+.5%"
            // Percentage indicator text
          />
        </div>

        {/* Balance Card - Full Width */}
        {/* Wallet balance display card */}
        <div className="mb-8">
          {/* Container with bottom margin */}
          <BalanceCard />
          {/* Component to display wallet balance */}
        </div>

        {/* Role-specific content */}
        {/* Content that changes based on user's role (patient or doctor) */}
        {role === "patient" && (
          // Conditional rendering: show patient-specific content only if user is a patient
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Grid layout: 1 column on mobile, 2 columns on large screens, with gap and bottom margin */}
            <BookAppointmentForm 
              // Form component for patients to book appointments
              onAppointmentBooked={() => {
                // Callback function executed after appointment is successfully booked
                refetchPatientAppointments();
                // Refresh patient appointments list
              }}
            />
            <Card>
              <CardHeader>
                <CardTitle>My Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                {appointmentsLoading ? (
                  <p className="text-gray-600">Loading...</p>
                ) : appointmentsError ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-2">No appointments found.</p>
                    <p className="text-sm text-gray-500 mb-4">
                      {appointmentsError?.message?.includes("Not a registered") || appointmentsError?.message?.includes("Not registered")
                        ? "If you just registered, please wait a moment and the appointments will appear automatically."
                        : "Your appointments will appear here once you book one."}
                    </p>
                    {appointmentsError?.message?.includes("Not a registered") || appointmentsError?.message?.includes("Not registered") ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          if (role === "patient") {
                            refetchPatientAppointments();
                          } else {
                            refetchDoctorAppointments();
                          }
                        }}
                      >
                        Refresh
                      </Button>
                    ) : null}
                  </div>
                ) : appointments.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-2">No appointments yet.</p>
                    <p className="text-sm text-gray-500">
                      Book an appointment using the form on the left.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {appointments.slice(0, 5).map((appointment: any) => {
                      const doctor = doctors.find((d: any) => d.addr.toLowerCase() === appointment.doctor.toLowerCase());
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
                              {doctor && (
                                <p className="text-sm text-gray-600">
                                  Doctor: {doctor.name} - {doctor.specialty}
                                </p>
                              )}
                              <p className="text-sm text-gray-600">
                                {formatDate(appointment.startTime)}
                              </p>
                            </div>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              appointment.status === "Booked"
                                ? "bg-blue-100 text-blue-800"
                                : appointment.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}>
                              {appointment.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mt-2">{appointment.reason}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {role === "doctor" && (
          // Conditional rendering: show doctor-specific content only if user is a doctor
          <div className="space-y-8 mb-8">
            {/* Container with vertical spacing between children and bottom margin */}
            {/* Create Appointment for Patient */}
            {/* Form for doctors to create appointments for patients */}
            <CreateAppointmentForPatientForm 
              // Form component for doctors to book appointments for patients
              onAppointmentCreated={() => {
                // Callback function executed after appointment is successfully created
                // Refetch appointments in dashboard
                refetchDoctorAppointments();
                // Refresh doctor appointments list
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
                ) : appointmentsError ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-2">No appointments found.</p>
                    <p className="text-sm text-gray-500 mb-4">
                      {appointmentsError?.message?.includes("Not a registered") || appointmentsError?.message?.includes("Not registered")
                        ? "If you just registered, please wait a moment and the appointments will appear automatically."
                        : "Your appointments will appear here once you create one for a patient."}
                    </p>
                    {appointmentsError?.message?.includes("Not a registered") || appointmentsError?.message?.includes("Not registered") ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          refetchDoctorAppointments();
                        }}
                      >
                        Refresh
                      </Button>
                    ) : null}
                  </div>
                ) : appointments.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-2">No appointments yet.</p>
                    <p className="text-sm text-gray-500">
                      Create an appointment for a patient using the form above.
                    </p>
                  </div>
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
        {/* Modal component for adding medical notes to appointments */}
        {selectedAppointmentId && (
          // Conditional rendering: show modal only if an appointment is selected
          <NoteModal
            // Modal component for adding/editing medical notes
            appointmentId={selectedAppointmentId}
            // ID of the appointment to add note to
            isOpen={isNoteModalOpen}
            // Boolean to control modal visibility
            onClose={() => {
              // Callback function executed when modal is closed
              setIsNoteModalOpen(false);
              // Hide the modal
              setSelectedAppointmentId(null);
              // Clear the selected appointment ID
            }}
            onSuccess={() => {
              // Callback function executed when note is successfully added
              // Refresh appointments
              window.location.reload();
              // Reload the entire page to refresh all data
            }}
          />
        )}
      </main>
    </div>
  );
}
// End of DashboardPage component