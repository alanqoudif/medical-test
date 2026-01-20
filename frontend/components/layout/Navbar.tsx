"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Link from "next/link";
import { useRole } from "@/hooks/useRole";
import { getRoleLabel, getRoleBadgeStyles, getRoleBadgeIcon } from "@/lib/roleUtils";

export function Navbar() {
  const { address, isConnected } = useAccount();
  const { role } = useRole();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & App Name */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-xl font-bold text-green-600">Healthcare DApp</span>
            </Link>
            {isConnected && (
              <div className="hidden md:flex items-center ml-6">
                <span className="text-gray-700 font-semibold">Dashboard</span>
              </div>
            )}
          </div>

          {/* Right Side Icons & Actions */}
          <div className="flex items-center space-x-4">
            {/* Profile / Connect Button */}
            <div className="flex items-center space-x-2">
              {isConnected && (
                <div className="hidden sm:flex items-center space-x-3">
                  {role !== "none" && (
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getRoleBadgeStyles(role)}`}>
                      {getRoleBadgeIcon(role)} {getRoleLabel(role)}
                    </span>
                  )}
                  <div className="text-sm text-gray-600">
                    <span>Hello,</span>
                    <span className="font-medium ml-1">
                      {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "User"}
                    </span>
                  </div>
                </div>
              )}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                {isConnected && address ? address[2].toUpperCase() : "U"}
              </div>
            </div>

            {/* Connect Button (if not connected) */}
            {!isConnected && (
              <ConnectButton showBalance={false} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}