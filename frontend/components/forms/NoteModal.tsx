"use client";

import { useState, useEffect } from "react";
import { useAddNote } from "@/hooks/useHealthcare";
import { Button } from "@/components/ui/Button";

interface NoteModalProps {
  appointmentId: bigint;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function NoteModal({ appointmentId, isOpen, onClose, onSuccess }: NoteModalProps) {
  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const { addNote, isPending, isConfirming, isConfirmed } = useAddNote();

  useEffect(() => {
    if (isConfirmed) {
      setDiagnosis("");
      setPrescription("");
      onSuccess?.();
      onClose();
    }
  }, [isConfirmed, onClose, onSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!diagnosis || !prescription) {
      return;
    }

    if (diagnosis.length > 120 || prescription.length > 120) {
      alert("Diagnosis and prescription must be 120 characters or less");
      return;
    }

    try {
      await addNote(appointmentId, diagnosis, prescription);
    } catch (error) {
      console.error("Add note error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Add Patient Note</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700 mb-1">
              Diagnosis
            </label>
            <textarea
              id="diagnosis"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter diagnosis"
              required
              maxLength={120}
              rows={3}
            />
          </div>

          <div>
            <label htmlFor="prescription" className="block text-sm font-medium text-gray-700 mb-1">
              Prescription
            </label>
            <textarea
              id="prescription"
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter prescription"
              required
              maxLength={120}
              rows={3}
            />
          </div>

          <div className="flex space-x-3">
            <Button
              type="submit"
              isLoading={isPending || isConfirming}
              disabled={isPending || isConfirming}
              className="flex-1"
            >
              {isPending || isConfirming ? "Adding..." : "Add Note"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending || isConfirming}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}