"use client";
// Directive to mark this as a client-side component in Next.js

import { useState, useEffect, Suspense } from "react";
// Import React hooks: useState for state, useEffect for side effects, Suspense for loading states
import { useAccount } from "wagmi";
// Import hook to get current wallet account information
import { useRouter, useSearchParams } from "next/navigation";
// Import Next.js router and search params hooks for navigation and URL parameters
import { ConnectButton } from "@rainbow-me/rainbowkit";
// Import button component for connecting wallet
import { Navbar } from "@/components/layout/Navbar";
// Import navigation bar component
import { RegisterDoctorForm } from "@/components/forms/RegisterDoctorForm";
// Import form component for doctor registration
import { RegisterPatientForm } from "@/components/forms/RegisterPatientForm";
// Import form component for patient registration
import { useRole } from "@/hooks/useRole";
// Import custom hook to get user's role
import { Card } from "@/components/ui/Card";
// Import card UI component
import { formatAddress } from "@/lib/utils";
// Import utility function to format Ethereum addresses

function RegisterContent() {
  // Main registration page content component
  const searchParams = useSearchParams();
  // Get URL search parameters (query string)
  const initialType = searchParams.get("type") as "doctor" | "patient" | null;
  // Get registration type from URL parameter (e.g., ?type=doctor)
  const [activeTab, setActiveTab] = useState<"doctor" | "patient">(initialType || "doctor");
  // State to track which registration form is active (defaults to "doctor")
  const { isConnected, address } = useAccount();
  // Get current wallet address and connection status
  const { role } = useRole();
  // Get user's role (doctor, patient, or none)
  const router = useRouter();
  // Get router instance for programmatic navigation

  useEffect(() => {
    // Effect hook: runs when component mounts or initialType changes
    if (initialType === "patient" || initialType === "doctor") {
      // Check if URL parameter specifies a valid registration type
      setActiveTab(initialType);
      // Set the active tab to match the URL parameter
    }
  }, [initialType]);
  // Re-run effect when initialType changes

  useEffect(() => {
    // Effect hook: redirect to dashboard if user is already registered
    if (isConnected && role !== "none") {
      // Check if wallet is connected and user has a role (is registered)
      router.push("/dashboard");
      // Navigate to dashboard page
    }
  }, [isConnected, role, router]);
  // Re-run effect when connection status, role, or router changes

  return (
    <div className="min-h-screen bg-white">
      {/* Main container with full screen height and white background */}
      <Navbar />
      {/* Display navigation bar at top */}
      <main className="max-w-2xl mx-auto px-4 py-12">
        {/* Main content area with max width, centered, and padding */}
        {/* Logo and Progress */}
        {/* Section for logo and progress indicator */}
        <div className="text-center mb-8">
          {/* Container with centered text and bottom margin */}
          <div className="flex items-center justify-center space-x-3 mb-6">
            {/* Flex container for logo icon and text, centered with horizontal spacing */}
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              {/* Logo container with green gradient, rounded corners, and shadow */}
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {/* Plus icon SVG with white color */}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                {/* SVG path defining the plus icon shape */}
              </svg>
            </div>
            <span className="text-3xl font-bold text-green-600">Healthcare DApp</span>
            {/* Application name with large, bold, green text */}
          </div>

          {/* Progress Steps */}
          {/* Visual progress indicator showing registration steps */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            {/* Container for progress steps, centered with horizontal spacing */}
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold">
              {/* Step 1: Always completed (green with checkmark) */}
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
              isConnected && role !== "none" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-400"
            }`}>
              {/* Step 3: Register (green if registered, gray if not) */}
              {isConnected && role !== "none" ? "✓" : "3"}
              {/* Show checkmark if registered, otherwise show step number */}
            </div>
          </div>
        </div>

        {/* Connect Wallet Section */}
        {/* Section shown when wallet is not connected */}
        {!isConnected && (
          // Conditional rendering: show only if wallet is NOT connected
          <Card className="p-8 text-center mb-8 border-2 border-gray-200 shadow-lg rounded-2xl">
            {/* Card component with padding, centered text, border, shadow, and rounded corners */}
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Connect Your Wallet</h2>
            {/* Heading text with large size, semibold weight, and bottom margin */}
            <p className="text-gray-600 mb-6">
              {/* Instruction text in gray color */}
              Please connect your MetaMask wallet to continue with registration
              {/* Message asking user to connect wallet */}
            </p>
            <div className="flex justify-center">
              {/* Container to center the connect button */}
              <ConnectButton />
              {/* RainbowKit button component for connecting wallet */}
            </div>
          </Card>
        )}

        {/* Registration Forms */}
        {/* Section shown when wallet is connected but user is not registered */}
        {isConnected && role === "none" && (
          // Conditional rendering: show forms only if connected AND not registered
          <>
            {/* React fragment to group multiple elements */}
            {/* Tabs */}
            {/* Tab navigation for switching between doctor and patient registration */}
            <div className="mb-6 border-b border-gray-200">
              {/* Container with bottom margin and bottom border */}
              <nav className="-mb-px flex space-x-8">
                {/* Navigation container with negative margin and horizontal spacing */}
                <button
                  // Button for doctor registration tab
                  onClick={() => setActiveTab("doctor")}
                  // Click handler: switch active tab to "doctor"
                  className={`py-3 px-4 border-b-2 font-medium text-sm transition-colors ${
                    // Dynamic classes based on active tab state
                    activeTab === "doctor"
                      ? "border-red-500 text-red-600"
                      // Active state: red border and text
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      // Inactive state: transparent border, gray text, hover effects
                  }`}
                >
                  Register as Doctor
                  {/* Button text */}
                </button>
                <button
                  // Button for patient registration tab
                  onClick={() => setActiveTab("patient")}
                  // Click handler: switch active tab to "patient"
                  className={`py-3 px-4 border-b-2 font-medium text-sm transition-colors ${
                    // Dynamic classes based on active tab state
                    activeTab === "patient"
                      ? "border-green-500 text-green-600"
                      // Active state: green border and text
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      // Inactive state: transparent border, gray text, hover effects
                  }`}
                >
                  Register as Patient
                  {/* Button text */}
                </button>
              </nav>
            </div>

            {/* Form */}
            {/* Registration form container */}
            <div className="mt-8">
              {/* Container with top margin */}
              {activeTab === "doctor" ? <RegisterDoctorForm /> : <RegisterPatientForm />}
              {/* Conditional rendering: show doctor form if doctor tab active, otherwise patient form */}
            </div>
          </>
        )}

        {/* Already registered message */}
        {/* Section shown when user is already registered */}
        {isConnected && role !== "none" && (
          // Conditional rendering: show only if connected AND has a role (is registered)
          <Card className="p-8 text-center border-2 border-gray-200 shadow-lg rounded-2xl">
            {/* Card component with padding, centered text, border, shadow, and rounded corners */}
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {/* Heading with large size, semibold weight, and bottom margin */}
              You're already registered as {role === "doctor" ? "Doctor" : "Patient"}
              {/* Message showing user's current role */}
            </h2>
            <button
              // Button to navigate to dashboard
              onClick={() => router.push("/dashboard")}
              // Click handler: navigate to dashboard page
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              // Styling: green background, white text, rounded corners, hover effect
            >
              Go to Dashboard
              {/* Button text */}
            </button>
          </Card>
        )}

        {/* Welcome Message Footer */}
        {/* Footer section with welcome text and connected address */}
        <div className="text-center mt-8 space-y-2">
          {/* Container with centered text, top margin, and vertical spacing */}
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
      </main>
    </div>
  );
}

export default function RegisterPage() {
  // Main page component wrapped in Suspense for loading state
  return (
    <Suspense fallback={
      // Suspense component to handle loading state while search params load
      <div className="min-h-screen bg-white flex items-center justify-center">
        {/* Loading screen with full height, white background, centered content */}
        <p className="text-gray-600">Loading...</p>
        {/* Loading text */}
      </div>
    }>
      <RegisterContent />
      {/* Render RegisterContent component inside Suspense */}
    </Suspense>
  );
}