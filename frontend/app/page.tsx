"use client";
// Directive to mark this as a client-side component in Next.js

import { useAccount } from "wagmi";
// Import hook to get current wallet account information
import { ConnectButton } from "@rainbow-me/rainbowkit";
// Import button component for connecting wallet
import { useRouter } from "next/navigation";
// Import Next.js router hook for navigation
import { useEffect } from "react";
// Import React hook for side effects (not used but imported)
import { useGetStats } from "@/hooks/useHealthcare";
// Import custom hook to fetch system statistics
import Link from "next/link";
// Import Next.js Link component for client-side navigation
import { formatAddress } from "@/lib/utils";
// Import utility function to format Ethereum addresses

export default function Home() {
  // Main home page component - landing page for the healthcare dApp
  const { isConnected, address } = useAccount();
  // Get wallet connection status and current address
  const router = useRouter();
  // Get router instance for programmatic navigation
  const { stats } = useGetStats();
  // Fetch statistics (total doctors, patients, appointments)

  // Don't auto-redirect - let user see the landing page and choose registration type

  return (
    // Main container with full screen height, white background, centered content
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      {/* Inner container with max width constraint */}
      <div className="max-w-2xl w-full">
        {/* Logo and Brand */}
        {/* Section for displaying logo and application name */}
        <div className="text-center mb-8">
          {/* Container with centered text and bottom margin */}
          <div className="flex items-center justify-center space-x-3 mb-6">
            {/* Flex container for logo icon and text, centered with horizontal spacing */}
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              {/* Logo container with gradient background, rounded corners, and shadow */}
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {/* SVG icon (plus sign) with white color */}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                {/* SVG path defining the plus icon shape */}
              </svg>
            </div>
            <span className="text-3xl font-bold text-green-600">Healthcare DApp</span>
            {/* Application title with large, bold, green text */}
          </div>

          {/* Progress Steps (Optional) */}
          {/* Visual progress indicator showing user onboarding steps */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            {/* Container for progress steps, centered with horizontal spacing */}
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold">
              {/* Step 1: Completed (always green with checkmark) */}
              ✓
              {/* Checkmark symbol */}
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            {/* Connector dot between steps */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
              isConnected ? "bg-green-500 text-white" : "bg-gray-200 text-gray-400"
            }`}>
              {/* Step 2: Connect wallet (green if connected, gray if not) */}
              {isConnected ? "✓" : "2"}
              {/* Show checkmark if connected, otherwise show step number */}
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            {/* Connector dot between steps */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
              isConnected ? "bg-gray-200 text-gray-400" : "bg-gray-200 text-gray-400"
            }`}>
              {/* Step 3: Register (always gray, not yet implemented) */}
              3
              {/* Step number */}
            </div>
          </div>
        </div>

        {/* Connect Wallet Section - FIRST */}
        {/* Section for wallet connection - shown first to users */}
        <div className="text-center mb-8">
          {/* Container with centered text and bottom margin */}
          {!isConnected ? (
            // Conditional rendering: show if wallet is NOT connected
            <div className="space-y-4">
              {/* Container with vertical spacing between children */}
              <p className="text-gray-600 mb-4">Connect your wallet to get started</p>
              {/* Instruction text in gray color */}
              <div className="flex justify-center">
                {/* Container to center the connect button */}
                <ConnectButton />
                {/* RainbowKit button component for connecting wallet */}
              </div>
            </div>
          ) : (
            // Conditional rendering: show if wallet IS connected
            <div className="space-y-4">
              {/* Container with vertical spacing between children */}
              <p className="text-green-600 font-medium">✓ Wallet Connected</p>
              {/* Success message showing wallet is connected */}
              <div className="flex justify-center space-x-4">
                {/* Container for action buttons, centered with horizontal spacing */}
                <button
                  // Button to navigate to registration page
                  onClick={() => router.push("/register")}
                  // Click handler: navigate to /register route
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-md"
                  // Styling: green background, white text, rounded corners, hover effect, shadow
                >
                  Create Account
                  {/* Button text */}
                </button>
                <button
                  // Button to navigate to dashboard page
                  onClick={() => router.push("/dashboard")}
                  // Click handler: navigate to /dashboard route
                  className="px-6 py-3 bg-white text-green-600 border-2 border-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium"
                  // Styling: white background, green text and border, rounded corners, hover effect
                >
                  Go to Dashboard
                  {/* Button text */}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Registration Cards */}
        {/* Grid layout for registration option cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Grid: 1 column on mobile, 2 columns on medium screens and up, with gap and bottom margin */}
          {/* Patient Registration Card */}
          {/* Link to patient registration page */}
          <Link href="/register?type=patient" className="block">
            {/* Next.js Link component with query parameter for patient type */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              {/* Card container with green gradient, rounded corners, padding, white text, shadow, hover effect */}
              <div className="flex items-start justify-between mb-4">
                {/* Header section with title and percentage indicator */}
                <h3 className="text-lg font-semibold">Patient Registration</h3>
                {/* Card title */}
                <div className="flex items-center text-sm">
                  {/* Percentage indicator container */}
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    {/* Upward arrow icon */}
                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    {/* SVG path for upward arrow */}
                  </svg>
                  +40%
                  {/* Percentage text */}
                </div>
              </div>
              <div className="flex items-end justify-between">
                {/* Bottom section with statistics and icon */}
                <div>
                  {/* Statistics container */}
                  <p className="text-4xl font-bold mb-1">{stats?.totalPatients?.toString() || "0"}+</p>
                  {/* Display total patients count, or "0" if stats not loaded yet */}
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  {/* Icon container with semi-transparent white background, circular */}
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {/* Heart icon SVG */}
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    {/* SVG path for heart shape */}
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Doctor Registration Card */}
          {/* Link to doctor registration page */}
          <Link href="/register?type=doctor" className="block">
            {/* Next.js Link component with query parameter for doctor type */}
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              {/* Card container with red gradient, rounded corners, padding, white text, shadow, hover effect */}
              <div className="flex items-start justify-between mb-4">
                {/* Header section with title and percentage indicator */}
                <h3 className="text-lg font-semibold">Doctor Registration</h3>
                {/* Card title */}
                <div className="flex items-center text-sm">
                  {/* Percentage indicator container */}
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    {/* Upward arrow icon */}
                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    {/* SVG path for upward arrow */}
                  </svg>
                  +14%
                  {/* Percentage text */}
                </div>
              </div>
              <div className="flex items-end justify-between">
                {/* Bottom section with statistics and icon */}
                <div>
                  {/* Statistics container */}
                  <p className="text-4xl font-bold mb-1">{stats?.totalDoctors?.toString() || "0"}+</p>
                  {/* Display total doctors count, or "0" if stats not loaded yet */}
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  {/* Icon container with semi-transparent white background, circular */}
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {/* Lightbulb icon SVG */}
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    {/* SVG path for lightbulb shape */}
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Welcome Message */}
        {/* Footer section with welcome text and connected address */}
        <div className="text-center space-y-2">
          {/* Container with centered text and vertical spacing */}
          <p className="text-gray-700">
            {/* Welcome text in gray color */}
            Welcome to <span className="text-green-600 font-semibold">Healthcare DApp: Your Health, Our Priority</span>
            {/* Welcome message with highlighted app name in green */}
          </p>
          <p className="text-sm text-gray-500">where compassionate care meets exceptional medical expertise.</p>
          {/* Subtitle text in smaller gray font */}
          {isConnected && address && (
            // Conditional rendering: show address only if wallet is connected
            <div className="flex items-center justify-center space-x-2 mt-4 text-sm text-gray-600">
              {/* Container for displaying connected wallet address */}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {/* Arrow icon SVG */}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                {/* SVG path for arrow shape */}
              </svg>
              <span className="font-mono">{formatAddress(address)}</span>
              {/* Display formatted wallet address in monospace font */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}