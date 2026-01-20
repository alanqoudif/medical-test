"use client";

import { useState, useEffect } from "react";
import { useBookAppointment, useGetDoctors, useGetMyAppointmentsAsPatient } from "@/hooks/useHealthcare";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import type { Doctor } from "@/types";

interface BookAppointmentFormProps {
  onAppointmentBooked?: () => void;
}

export function BookAppointmentForm({ onAppointmentBooked }: BookAppointmentFormProps = {}) {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const { doctors, isLoading: doctorsLoading } = useGetDoctors();
  const { book, isPending, isConfirming, isConfirmed } = useBookAppointment();
  const { refetch: refetchAppointments } = useGetMyAppointmentsAsPatient();

  useEffect(() => {
    if (isConfirmed) {
      // Refetch appointments after successful creation
      setTimeout(() => {
        refetchAppointments();
        onAppointmentBooked?.();
      }, 2000); // Increased timeout to ensure transaction is confirmed on chain
    }
  }, [isConfirmed, refetchAppointments, onAppointmentBooked]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDoctor || !date || !time || !reason) {
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
      await book(selectedDoctor as `0x${string}`, timestamp, reason);
      setSelectedDoctor("");
      setDate("");
      setTime("");
      setReason("");
    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  if (doctorsLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Book Appointment</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Loading doctors...</p>
        </CardContent>
      </Card>
    );
  }

  if (doctors.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Book Appointment</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">No doctors available. Please check back later.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book Appointment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="doctor" className="block text-sm font-medium text-gray-700 mb-2">
              Select Doctor from Registered Doctors
            </label>
            {doctors.length === 0 ? (
              <p className="text-sm text-gray-500 mb-2">No doctors registered yet. Please check back later.</p>
            ) : (
              <select
                id="doctor"
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-base"
                required
              >
                <option value="">Choose a doctor from the platform...</option>
                {doctors.map((doctor: Doctor) => (
                  <option key={doctor.addr} value={doctor.addr}>
                    {doctor.name} - {doctor.specialty} (Registered Doctor)
                  </option>
                ))}
              </select>
            )}
            {doctors.length > 0 && (
              <p className="mt-2 text-xs text-gray-500">
                {doctors.length} doctor{doctors.length !== 1 ? "s" : ""} available on the platform
              </p>
            )}
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
              placeholder="Reason for visit"
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
            {isPending || isConfirming ? "Booking..." : "Book Appointment"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}