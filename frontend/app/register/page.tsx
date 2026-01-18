"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Navbar } from "@/components/layout/Navbar";
import { RegisterDoctorForm } from "@/components/forms/RegisterDoctorForm";
import { RegisterPatientForm } from "@/components/forms/RegisterPatientForm";
import { useRole } from "@/hooks/useRole";
import { useEffect } from "react";
import { Card } from "@/components/ui/Card";

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState<"doctor" | "patient">("doctor");
  const { isConnected } = useAccount();
  const { role } = useRole();
  const router = useRouter();

  useEffect(() => {
    if (isConnected && role !== "none") {
      router.push("/dashboard");
    }
  }, [isConnected, role, router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Connect your wallet and register as Doctor or Patient</p>
        </div>

        {/* Connect Wallet Section */}
        {!isConnected && (
          <Card className="mb-8 p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Connect Your Wallet</h2>
            <p className="text-gray-600 mb-6">
              Please connect your MetaMask wallet to continue with registration
            </p>
            <div className="flex justify-center">
              <ConnectButton />
            </div>
          </Card>
        )}

        {/* Registration Forms */}
        {isConnected && (
          <>
            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab("doctor")}
                  className={`py-3 px-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === "doctor"
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Register as Doctor
                </button>
                <button
                  onClick={() => setActiveTab("patient")}
                  className={`py-3 px-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === "patient"
                      ? "border-green-500 text-green-600"
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
          </>
        )}

        {/* Already registered message */}
        {isConnected && role !== "none" && (
          <Card className="p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              You're already registered as {role === "doctor" ? "Doctor" : "Patient"}
            </h2>
            <button
              onClick={() => router.push("/dashboard")}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Go to Dashboard
            </button>
          </Card>
        )}
      </main>
    </div>
  );
}