"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { useRole } from "@/hooks/useRole";
import { useGetMyAppointmentsAsDoctor, useGetNote } from "@/hooks/useHealthcare";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { formatAddress, formatDate } from "@/lib/utils";
import { NoteModal } from "@/components/forms/NoteModal";
import type { Doctor, Patient, Appointment } from "@/types";

function PatientAppointmentCard({
  appointment,
  onAddNote,
}: {
  appointment: Appointment;
  onAddNote: (appointmentId: bigint) => void;
}) {
  const { note } = useGetNote(appointment.id);

  return (
    <div className="p-3 border border-gray-200 rounded-lg">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900">
            Appointment #{appointment.id.toString()}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            {formatDate(appointment.startTime)}
          </p>
          <p className="text-xs text-gray-700 mt-1">{appointment.reason}</p>
          {note?.exists && (
            <div className="mt-2 p-2 bg-blue-50 rounded text-xs">
              <p className="font-semibold">Diagnosis: {note.diagnosis}</p>
              <p className="font-semibold mt-1">Prescription: {note.prescription}</p>
            </div>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAddNote(appointment.id)}
          className="ml-2"
        >
          {note?.exists ? "Update Note" : "Add Note"}
        </Button>
      </div>
    </div>
  );
}

interface ProfileModalProps {
  type: "doctor" | "patient";
  profile: Doctor | Patient;
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileModal({ type, profile, isOpen, onClose }: ProfileModalProps) {
  const { address } = useAccount();
  const { role } = useRole();
  const { appointments: doctorAppointments } = useGetMyAppointmentsAsDoctor();
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<bigint | null>(null);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  if (!isOpen) return null;

  const doctor = type === "doctor" ? (profile as Doctor) : null;
  const patient = type === "patient" ? (profile as Patient) : null;
  
  // Get appointments between current doctor and this patient (if doctor viewing patient profile)
  const patientAppointments = 
    role === "doctor" && patient
      ? doctorAppointments.filter(
          (appt: Appointment) => appt.patient.toLowerCase() === patient.addr.toLowerCase()
        )
      : [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {type === "doctor" ? "Doctor Profile" : "Patient Profile"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col items-center mb-6">
            <Avatar name={profile.name} size="lg" />
            <h3 className="text-xl font-bold text-gray-900 mt-4">{profile.name}</h3>
            {doctor && (
              <p className="text-green-600 font-medium mt-1">{doctor.specialty}</p>
            )}
            {patient && (
              <p className="text-gray-600 mt-1">Age: {patient.age}</p>
            )}
          </div>

          <div className="border-t pt-4 space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-500">Address</p>
              <p className="text-sm text-gray-900 font-mono break-all">{profile.addr}</p>
            </div>

            {doctor && (
              <div>
                <p className="text-sm font-medium text-gray-500">License ID</p>
                <p className="text-sm text-gray-900">{doctor.licenseId}</p>
              </div>
            )}

            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                profile.approved ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
              }`}>
                {profile.approved ? "Approved" : "Pending Approval"}
              </span>
            </div>
          </div>
        </div>

        {/* Show appointments for doctor viewing patient profile */}
        {role === "doctor" && patient && patientAppointments.length > 0 && (
          <div className="border-t pt-4 mt-4">
            <h4 className="font-semibold text-gray-900 mb-3">Appointments with this Patient</h4>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {patientAppointments.map((appointment: Appointment) => (
                <PatientAppointmentCard
                  key={appointment.id.toString()}
                  appointment={appointment}
                  onAddNote={(appointmentId: bigint) => {
                    setSelectedAppointmentId(appointmentId);
                    setIsNoteModalOpen(true);
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {role === "doctor" && patient && patientAppointments.length === 0 && (
          <div className="border-t pt-4 mt-4">
            <p className="text-sm text-gray-600">No appointments with this patient yet.</p>
          </div>
        )}

        <div className="mt-6 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="w-full"
          >
            Close
          </Button>
        </div>
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
            // Refresh will happen automatically via refetch
            setIsNoteModalOpen(false);
            setSelectedAppointmentId(null);
          }}
        />
      )}
    </div>
  );
}
