"use client";

import { useState, useEffect } from "react";
import { useRegisterPatient } from "@/hooks/useHealthcare";
import { useRole } from "@/hooks/useRole";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export function RegisterPatientForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const { register, isPending, isConfirming, isConfirmed } = useRegisterPatient();
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

    if (!name || !age) {
      return;
    }

    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum) || ageNum <= 0 || ageNum > 150) {
      alert("Age must be between 1 and 150");
      return;
    }

    if (name.length > 120) {
      alert("Name must be 120 characters or less");
      return;
    }

    try {
      await register(name, ageNum);
      // Don't clear form until confirmed
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register as Patient</CardTitle>
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
              placeholder="John Doe"
              required
              maxLength={120}
            />
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="30"
              required
              min={1}
              max={150}
            />
          </div>

          <Button
            type="submit"
            isLoading={isPending || isConfirming}
            disabled={isPending || isConfirming}
            className="w-full"
          >
            {isPending || isConfirming ? "Registering..." : "Register as Patient"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}