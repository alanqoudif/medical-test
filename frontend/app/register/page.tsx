"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { RegisterDoctorForm } from "@/components/forms/RegisterDoctorForm";
import { RegisterPatientForm } from "@/components/forms/RegisterPatientForm";
import { useRole } from "@/hooks/useRole";
import { useEffect } from "react";

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState<"doctor" | "patient">("doctor");
  const { isConnected } = useAccount();
  const { role } = useRole();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    } else if (role !== "none") {
      router.push("/dashboard");
    }
  }, [isConnected, role, router]);

  if (!isConnected) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Register</h1>
          <p className="text-gray-600">Choose your role and complete registration</p>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("doctor")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "doctor"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Register as Doctor
            </button>
            <button
              onClick={() => setActiveTab("patient")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "patient"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Register as Patient
            </button>
          </nav>
        </div>

        {/* Form */}
        <div className="mt-8">
          {activeTab === "doctor" ? <RegisterDoctorForm /> : <RegisterPatientForm />}
        </div>
      </main>
    </div>
  );
}