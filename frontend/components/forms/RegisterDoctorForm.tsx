"use client";

import { useState, useEffect } from "react";
import { useRegisterDoctor } from "@/hooks/useHealthcare";
import { useRole } from "@/hooks/useRole";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export function RegisterDoctorForm() {
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [licenseId, setLicenseId] = useState("");
  const { register, isPending, isConfirming, isConfirmed } = useRegisterDoctor();
  const { refetch } = useRole();
  const router = useRouter();

  useEffect(() => {
    if (isConfirmed) {
      // Wait a bit for blockchain to update, then refetch role
      setTimeout(() => {
        refetch();
        // Redirect after refetch
        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 1000);
      }, 2000);
    }
  }, [isConfirmed, refetch, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !specialty || !licenseId) {
      return;
    }

    if (name.length > 120 || specialty.length > 120 || licenseId.length > 120) {
      alert("All fields must be 120 characters or less");
      return;
    }

    try {
      await register(name, specialty, licenseId);
      // Don't clear form until confirmed
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register as Doctor</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Dr. John Smith"
              required
              maxLength={120}
            />
          </div>

          <div>
            <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">
              Specialty
            </label>
            <input
              id="specialty"
              type="text"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Cardiology"
              required
              maxLength={120}
            />
          </div>

          <div>
            <label htmlFor="licenseId" className="block text-sm font-medium text-gray-700 mb-1">
              License ID
            </label>
            <input
              id="licenseId"
              type="text"
              value={licenseId}
              onChange={(e) => setLicenseId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="LIC123456"
              required
              maxLength={120}
            />
          </div>

          <Button
            type="submit"
            isLoading={isPending || isConfirming}
            disabled={isPending || isConfirming}
            className="w-full"
          >
            {isPending || isConfirming ? "Registering..." : "Register as Doctor"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}