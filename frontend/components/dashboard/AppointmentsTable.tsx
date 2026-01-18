"use client";

import { useGetMyAppointmentsAsPatient, useGetMyAppointmentsAsDoctor, useGetNote } from "@/hooks/useHealthcare";
import { useRole } from "@/hooks/useRole";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { formatDate, getStatusColor } from "@/lib/utils";
import type { Appointment } from "@/types";
import { useState } from "react";

interface AppointmentsTableProps {
  showNotes?: boolean;
}

export function AppointmentsTable({ showNotes = false }: AppointmentsTableProps) {
  const { role } = useRole();
  const { appointments: patientAppointments, isLoading: patientLoading } = useGetMyAppointmentsAsPatient();
  const { appointments: doctorAppointments, isLoading: doctorLoading } = useGetMyAppointmentsAsDoctor();

  const appointments = role === "patient" ? patientAppointments : doctorAppointments;
  const isLoading = role === "patient" ? patientLoading : doctorLoading;

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Loading appointments...</p>
        </CardContent>
      </Card>
    );
  }

  if (appointments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">No appointments found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {role === "patient" ? "Doctor" : "Patient"}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                {showNotes && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Notes
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.map((appointment: Appointment) => (
                <AppointmentRow
                  key={appointment.id.toString()}
                  appointment={appointment}
                  role={role}
                  showNotes={showNotes}
                />
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function AppointmentRow({
  appointment,
  role,
  showNotes,
}: {
  appointment: Appointment;
  role: string;
  showNotes: boolean;
}) {
  const [showNoteDetails, setShowNoteDetails] = useState(false);
  const { note } = useGetNote(appointment.id);

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          #{appointment.id.toString()}
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
          {role === "patient" ? appointment.doctor.slice(0, 10) + "..." : appointment.patient.slice(0, 10) + "..."}
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
          {formatDate(appointment.startTime)}
        </td>
        <td className="px-4 py-4 text-sm text-gray-600">{appointment.reason}</td>
        <td className="px-4 py-4 whitespace-nowrap">
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
              appointment.status
            )}`}
          >
            {appointment.status}
          </span>
        </td>
        {showNotes && (
          <td className="px-4 py-4 whitespace-nowrap text-sm">
            {note?.exists ? (
              <button
                onClick={() => setShowNoteDetails(!showNoteDetails)}
                className="text-blue-600 hover:text-blue-800"
              >
                {showNoteDetails ? "Hide Note" : "View Note"}
              </button>
            ) : (
              <span className="text-gray-400 text-xs">No notes yet</span>
            )}
          </td>
        )}
      </tr>
      {showNoteDetails && note?.exists && (
        <tr>
          <td colSpan={showNotes ? 6 : 5} className="px-4 py-4 bg-gray-50">
            <div className="space-y-2">
              <div>
                <span className="font-semibold text-sm">Diagnosis: </span>
                <span className="text-sm text-gray-700">{note.diagnosis}</span>
              </div>
              <div>
                <span className="font-semibold text-sm">Prescription: </span>
                <span className="text-sm text-gray-700">{note.prescription}</span>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}