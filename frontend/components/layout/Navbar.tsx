"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance } from "wagmi";
import { formatEther } from "viem";
import Link from "next/link";
import { useRole } from "@/hooks/useRole";

export function Navbar() {
  const { address, isConnected } = useAccount();
  const { role } = useRole();
  const { data: balance } = useBalance({
    address,
  });

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & App Name */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                H
              </div>
              <span className="text-xl font-bold text-gray-900">Healthcare DApp</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {isConnected && (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Dashboard
                </Link>
                {role === "patient" && (
                  <Link
                    href="/appointments"
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    Appointments
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Connect Button & User Info */}
          <div className="flex items-center space-x-4">
            {isConnected && balance && (
              <div className="hidden sm:block text-sm text-gray-600">
                <span className="font-medium">{parseFloat(formatEther(balance.value)).toFixed(4)}</span>
                <span className="ml-1">ETH</span>
              </div>
            )}
            <ConnectButton showBalance={false} />
          </div>
        </div>
      </div>
    </nav>
  );
}