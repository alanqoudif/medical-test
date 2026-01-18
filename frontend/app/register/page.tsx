"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useRouter, useSearchParams } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Navbar } from "@/components/layout/Navbar";
import { RegisterDoctorForm } from "@/components/forms/RegisterDoctorForm";
import { RegisterPatientForm } from "@/components/forms/RegisterPatientForm";
import { useRole } from "@/hooks/useRole";
import { Card } from "@/components/ui/Card";
import { formatAddress } from "@/lib/utils";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") as "doctor" | "patient" | null;
  const [activeTab, setActiveTab] = useState<"doctor" | "patient">(initialType || "doctor");
  const { isConnected, address } = useAccount();
  const { role } = useRole();
  const router = useRouter();

  useEffect(() => {
    if (initialType === "patient" || initialType === "doctor") {
      setActiveTab(initialType);
    }
  }, [initialType]);

  useEffect(() => {
    if (isConnected && role !== "none") {
      router.push("/dashboard");
    }
  }, [isConnected, role, router]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-12">
        {/* Logo and Progress */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-3xl font-bold text-green-600">Healthcare DApp</span>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold">
              ✓
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
              isConnected ? "bg-green-500 text-white" : "bg-gray-200 text-gray-400"
            }`}>
              {isConnected ? "✓" : "2"}
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
              isConnected && role !== "none" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-400"
            }`}>
              {isConnected && role !== "none" ? "✓" : "3"}
            </div>
          </div>
        </div>

        {/* Connect Wallet Section */}
        {!isConnected && (
          <Card className="p-8 text-center mb-8 border-2 border-gray-200 shadow-lg rounded-2xl">
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
        {isConnected && role === "none" && (
          <>
            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab("doctor")}
                  className={`py-3 px-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === "doctor"
                      ? "border-red-500 text-red-600"
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
          <Card className="p-8 text-center border-2 border-gray-200 shadow-lg rounded-2xl">
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

        {/* Welcome Message Footer */}
        <div className="text-center mt-8 space-y-2">
          <p className="text-gray-700">
            Welcome to <span className="text-green-600 font-semibold">Healthcare DApp: Your Health, Our Priority</span>
          </p>
          <p className="text-sm text-gray-500">where compassionate care meets exceptional medical expertise.</p>
          {isConnected && address && (
            <div className="flex items-center justify-center space-x-2 mt-4 text-sm text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <span className="font-mono">{formatAddress(address)}</span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}