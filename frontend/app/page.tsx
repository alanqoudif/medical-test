"use client";

import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useGetStats } from "@/hooks/useHealthcare";
import Link from "next/link";
import { formatAddress } from "@/lib/utils";

export default function Home() {
  const { isConnected, address } = useAccount();
  const router = useRouter();
  const { stats } = useGetStats();

  // Don't auto-redirect - let user see the landing page and choose registration type

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-3xl font-bold text-green-600">Healthcare DApp</span>
          </div>

          {/* Progress Steps (Optional) */}
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
              isConnected ? "bg-gray-200 text-gray-400" : "bg-gray-200 text-gray-400"
            }`}>
              3
            </div>
          </div>
        </div>

        {/* Connect Wallet Section - FIRST */}
        <div className="text-center mb-8">
          {!isConnected ? (
            <div className="space-y-4">
              <p className="text-gray-600 mb-4">Connect your wallet to get started</p>
              <div className="flex justify-center">
                <ConnectButton />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-green-600 font-medium">✓ Wallet Connected</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => router.push("/register")}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-md"
                >
                  Create Account
                </button>
                <button
                  onClick={() => router.push("/dashboard")}
                  className="px-6 py-3 bg-white text-green-600 border-2 border-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Registration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Patient Registration Card */}
          <Link href="/register?type=patient" className="block">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold">Patient Registration</h3>
                <div className="flex items-center text-sm">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  +40%
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-4xl font-bold mb-1">{stats?.totalPatients?.toString() || "0"}+</p>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Doctor Registration Card */}
          <Link href="/register?type=doctor" className="block">
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold">Doctor Registration</h3>
                <div className="flex items-center text-sm">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  +14%
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-4xl font-bold mb-1">{stats?.totalDoctors?.toString() || "0"}+</p>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Welcome Message */}
        <div className="text-center space-y-2">
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
      </div>
    </div>
  );
}