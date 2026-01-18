"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Link from "next/link";
import { useRole } from "@/hooks/useRole";
import { useState } from "react";

export function Navbar() {
  const { address, isConnected } = useAccount();
  const { role } = useRole();
  const [darkMode, setDarkMode] = useState(false);

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
            {/* Notifications Icon */}
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            {/* Folder/Briefcase Icon with Badge */}
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="absolute top-1 right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                3
              </span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>

            {/* Profile / Connect Button */}
            <div className="flex items-center space-x-2">
              {isConnected && (
                <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
                  <span>Hello,</span>
                  <span className="font-medium">
                    {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "User"}
                  </span>
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