"use client";
// Directive to mark this as a client-side component in Next.js

import { ConnectButton } from "@rainbow-me/rainbowkit";
// Import button component for connecting wallet
import { useAccount } from "wagmi";
// Import hook to get current wallet account information
import Link from "next/link";
// Import Next.js Link component for client-side navigation
import { useRole } from "@/hooks/useRole";
// Import custom hook to get user's role
import { getRoleLabel, getRoleBadgeStyles, getRoleBadgeIcon } from "@/lib/roleUtils";
// Import utility functions for role display

export function Navbar() {
  // Navigation bar component - appears at top of all pages
  const { address, isConnected } = useAccount();
  // Get current wallet address and connection status
  const { role } = useRole();
  // Get user's role (doctor, patient, or none)

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      {/* Navigation bar with white background, shadow, and bottom border */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Container with max width, centered, and responsive padding */}
        <div className="flex justify-between items-center h-16">
          {/* Flex container: space between logo and user actions, centered vertically, fixed height */}
          {/* Logo & App Name */}
          {/* Left side: logo and app name */}
          <div className="flex items-center space-x-4">
            {/* Container for logo and text with horizontal spacing */}
            <Link href="/" className="flex items-center space-x-3">
              {/* Link to home page with flex layout */}
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-md">
                {/* Logo container with green gradient, rounded corners, and shadow */}
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {/* Plus icon SVG with white color */}
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  {/* SVG path defining the plus icon shape */}
                </svg>
              </div>
              <span className="text-xl font-bold text-green-600">Healthcare DApp</span>
              {/* Application name with large, bold, green text */}
            </Link>
            {isConnected && (
              // Conditional rendering: show "Dashboard" text only if wallet is connected
              <div className="hidden md:flex items-center ml-6">
                {/* Hidden on mobile, visible on medium screens and up */}
                <span className="text-gray-700 font-semibold">Dashboard</span>
                {/* Dashboard label text */}
              </div>
            )}
          </div>

          {/* Right Side Icons & Actions */}
          {/* Right side: user profile and connect button */}
          <div className="flex items-center space-x-4">
            {/* Container for user actions with horizontal spacing */}
            {/* Profile / Connect Button */}
            {/* User profile section */}
            <div className="flex items-center space-x-2">
              {/* Container for profile elements with small spacing */}
              {isConnected && (
                // Conditional rendering: show user info only if wallet is connected
                <div className="hidden sm:flex items-center space-x-3">
                  {/* Hidden on small screens, visible on larger screens */}
                  {role !== "none" && (
                    // Conditional rendering: show role badge only if user is registered
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getRoleBadgeStyles(role)}`}>
                      {/* Role badge with padding, rounded corners, and dynamic styling */}
                      {getRoleBadgeIcon(role)} {getRoleLabel(role)}
                      {/* Display role emoji icon and label text */}
                    </span>
                  )}
                  <div className="text-sm text-gray-600">
                    {/* Container for greeting text */}
                    <span>Hello,</span>
                    {/* Greeting text */}
                    <span className="font-medium ml-1">
                      {/* User address with medium font weight */}
                      {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "User"}
                      {/* Display shortened address (first 6 + last 4 chars) or "User" */}
                    </span>
                  </div>
                </div>
              )}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                {/* Avatar circle with blue-purple gradient */}
                {isConnected && address ? address[2].toUpperCase() : "U"}
                {/* Display third character of address (uppercase) or "U" */}
              </div>
            </div>

            {/* Connect Button (if not connected) */}
            {/* Show connect button only when wallet is not connected */}
            {!isConnected && (
              // Conditional rendering: show connect button if wallet is NOT connected
              <ConnectButton showBalance={false} />
              // RainbowKit connect button without balance display
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}