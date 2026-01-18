"use client";

import { useState } from "react";
import { useBookAppointmentForPatient, useGetPatients } from "@/hooks/useHealthcare";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import type { Patient } from "@/types";

export function CreateAppointmentForPatientForm() {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const { patients, isLoading: patientsLoading } = useGetPatients();
  const { bookForPatient, isPending, isConfirming, isConfirmed } = useBookAppointmentForPatient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPatient || !date || !time || !reason) {
      return;
    }

    const dateTime = new Date(`${date}T${time}`);
    const timestamp = BigInt(Math.floor(dateTime.getTime() / 1000));

    if (timestamp <= BigInt(Math.floor(Date.now() / 1000))) {
      alert("Appointment time must be in the future");
      return;
    }

    if (reason.length > 120) {
      alert("Reason must be 120 characters or less");
      return;
    }

    try {
      await bookForPatient(selectedPatient as `0x${string}`, timestamp, reason);
      setSelectedPatient("");
      setDate("");
      setTime("");
      setReason("");
    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  if (patientsLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Create Appointment for Patient</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Loading patients...</p>
        </CardContent>
      </Card>
    );
  }

  if (patients.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Create Appointment for Patient</CardTitle>
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
        <CardTitle>Create Appointment for Patient</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="patient" className="block text-sm font-medium text-gray-700 mb-1">
              Select Patient
            </label>
            <select
              id="patient"
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Choose a patient...</option>
              {patients.map((patient: Patient) => (
                <option key={patient.addr} value={patient.addr}>
                  {patient.name} (Age: {patient.age})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
              Reason
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Reason for appointment"
              required
              maxLength={120}
              rows={3}
            />
          </div>

          <Button
            type="submit"
            isLoading={isPending || isConfirming}
            disabled={isPending || isConfirming}
            className="w-full"
          >
            {isPending || isConfirming ? "Creating..." : "Create Appointment"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}