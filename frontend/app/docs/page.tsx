"use client";

import { Navbar } from "@/components/layout/Navbar";
import Link from "next/link";
import { useState } from "react";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setActiveSection(id);
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const sections = [
    { id: "overview", title: "Overview", icon: "📋" },
    { id: "smart-contract", title: "Smart Contract", icon: "🔷" },
    { id: "components", title: "Components", icon: "🧩" },
    { id: "hooks", title: "Hooks", icon: "🎣" },
    { id: "pages", title: "Pages", icon: "📄" },
    { id: "utils", title: "Utilities", icon: "🛠️" },
    { id: "types", title: "Types", icon: "📝" },
    { id: "config", title: "Configuration", icon: "⚙️" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-8">
              <nav className="space-y-2">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-3">
                  Documentation
                </div>
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeSection === section.id
                        ? "bg-blue-100 text-blue-700"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span className="mr-2">{section.icon}</span>
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 max-w-4xl">
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                Healthcare DApp Documentation
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Complete guide to all components, smart contracts, hooks, and utilities in the Healthcare DApp project.
              </p>
            </div>

            {/* Section 1: Overview */}
            <section id="overview" className="mb-16 scroll-mt-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Overview</h2>
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-700 leading-relaxed mb-6">
                    Healthcare DApp is a decentralized healthcare management application built on Ethereum Sepolia Testnet.
                    It enables doctors and patients to register, book appointments, and manage medical records in a
                    secure, blockchain-based system.
                  </p>

                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded-r-lg">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-amber-700">
                          <strong>Note:</strong> This is an MVP demonstration project. All strings are limited to 120 characters to reduce gas costs.
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">Project Goal</h3>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    Create a decentralized healthcare management system that ensures:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6 ml-4">
                    <li>Transparency in medical records</li>
                    <li>Data security through blockchain technology</li>
                    <li>Easy access to appointments and records</li>
                    <li>Efficient management of doctor-patient relationships</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">Tech Stack</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                      <h4 className="font-semibold text-slate-900 mb-2">Smart Contracts</h4>
                      <ul className="text-sm space-y-1 text-slate-600">
                        <li>• Solidity 0.8.20</li>
                        <li>• Hardhat</li>
                        <li>• OpenZeppelin Contracts</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                      <h4 className="font-semibold text-slate-900 mb-2">Frontend</h4>
                      <ul className="text-sm space-y-1 text-slate-600">
                        <li>• Next.js 14 (App Router)</li>
                        <li>• TypeScript</li>
                        <li>• Tailwind CSS</li>
                        <li>• React 18</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                      <h4 className="font-semibold text-slate-900 mb-2">Web3 Integration</h4>
                      <ul className="text-sm space-y-1 text-slate-600">
                        <li>• wagmi v2</li>
                        <li>• RainbowKit</li>
                        <li>• viem</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                      <h4 className="font-semibold text-slate-900 mb-2">Network</h4>
                      <ul className="text-sm space-y-1 text-slate-600">
                        <li>• Ethereum Sepolia Testnet</li>
                        <li>• Chain ID: 11155111</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">Project Structure</h3>
                  <div className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto mb-6">
                    <pre className="text-sm font-mono">
{`medical-test/
├── contracts/          # Smart contracts
│   └── Healthcare.sol
├── scripts/            # Deployment scripts
│   └── deploy.ts
├── test/               # Tests
│   └── Healthcare.test.ts
├── frontend/           # Next.js frontend
│   ├── app/            # Pages
│   ├── components/     # React components
│   ├── hooks/          # Custom hooks
│   ├── lib/            # Utilities
│   ├── providers/      # Web3 providers
│   └── types/          # TypeScript types
└── hardhat.config.ts   # Hardhat config`}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Smart Contract */}
            <section id="smart-contract" className="mb-16 scroll-mt-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Smart Contract</h2>
                <p className="text-slate-600 mb-6">
                  <code className="bg-slate-100 px-2 py-1 rounded text-sm">contracts/Healthcare.sol</code>
                </p>

                <div className="space-y-8">
                  {/* Structs */}
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-900 mb-4">Structs</h3>
                    <div className="space-y-4">
                      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                        <h4 className="font-semibold text-lg mb-3 text-slate-900">Doctor</h4>
                        <p className="text-slate-600 mb-4">Doctor data structure</p>
                        <div className="bg-slate-50 p-4 rounded border border-slate-200">
                          <pre className="text-sm font-mono text-slate-800 space-y-1">
{`address addr          // Doctor wallet address
string name            // Doctor name (max 120 chars)
string specialty       // Medical specialty (max 120 chars)
string licenseId       // License ID (max 120 chars)
bool exists            // Registration status
bool approved          // Approval status (always true)
uint256 createdAt      // Registration timestamp`}
                          </pre>
                        </div>
                      </div>

                      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                        <h4 className="font-semibold text-lg mb-3 text-slate-900">Patient</h4>
                        <p className="text-slate-600 mb-4">Patient data structure</p>
                        <div className="bg-slate-50 p-4 rounded border border-slate-200">
                          <pre className="text-sm font-mono text-slate-800 space-y-1">
{`address addr          // Patient wallet address
string name            // Patient name (max 120 chars)
uint8 age              // Age (1-150)
bool exists            // Registration status
uint256 createdAt      // Registration timestamp`}
                          </pre>
                        </div>
                      </div>

                      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                        <h4 className="font-semibold text-lg mb-3 text-slate-900">Appointment</h4>
                        <p className="text-slate-600 mb-4">Appointment data structure</p>
                        <div className="bg-slate-50 p-4 rounded border border-slate-200">
                          <pre className="text-sm font-mono text-slate-800 space-y-1">
{`uint256 id            // Appointment ID
address patient        // Patient address
address doctor         // Doctor address
uint64 startTime       // Start time (Unix timestamp)
string reason          // Reason for appointment (max 120 chars)
AppointmentStatus status  // Current status
uint64 createdAt       // Creation timestamp`}
                          </pre>
                        </div>
                      </div>

                      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                        <h4 className="font-semibold text-lg mb-3 text-slate-900">Note</h4>
                        <p className="text-slate-600 mb-4">Medical note data structure</p>
                        <div className="bg-slate-50 p-4 rounded border border-slate-200">
                          <pre className="text-sm font-mono text-slate-800 space-y-1">
{`bool exists           // Note existence
uint256 appointmentId  // Associated appointment ID
address doctor         // Doctor who added the note
string diagnosis       // Diagnosis (max 120 chars)
string prescription    // Prescription (max 120 chars)
uint64 createdAt       // Creation timestamp`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enums */}
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-900 mb-4">Enums</h3>
                    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                      <h4 className="font-semibold text-lg mb-3 text-slate-900">AppointmentStatus</h4>
                      <p className="text-slate-600 mb-4">Appointment status options:</p>
                      <ul className="space-y-2 text-slate-700">
                        <li>• <code className="bg-slate-100 px-2 py-1 rounded text-sm">Booked</code> - Appointment is booked</li>
                        <li>• <code className="bg-slate-100 px-2 py-1 rounded text-sm">Completed</code> - Appointment is completed</li>
                        <li>• <code className="bg-slate-100 px-2 py-1 rounded text-sm">Cancelled</code> - Appointment is cancelled</li>
                      </ul>
                    </div>
                  </div>

                  {/* Events */}
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-900 mb-4">Events</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { name: "DoctorRegistered", desc: "Emitted when a doctor registers", params: "address indexed doctor, string name, string specialty" },
                        { name: "PatientRegistered", desc: "Emitted when a patient registers", params: "address indexed patient, string name" },
                        { name: "AppointmentBooked", desc: "Emitted when an appointment is booked", params: "uint256 indexed appointmentId, address indexed patient, address indexed doctor, uint64 startTime" },
                        { name: "NoteAdded", desc: "Emitted when a medical note is added", params: "uint256 indexed appointmentId, address indexed doctor" },
                      ].map((event) => (
                        <div key={event.name} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                          <h4 className="font-semibold mb-2 text-slate-900">{event.name}</h4>
                          <p className="text-sm text-slate-600 mb-2">{event.desc}</p>
                          <div className="mt-2 text-xs font-mono bg-slate-50 p-2 rounded border border-slate-200">
                            {event.params}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Modifiers */}
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-900 mb-4">Modifiers</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { name: "onlyDoctor", desc: "Ensures caller is registered and approved as doctor" },
                        { name: "onlyPatient", desc: "Ensures caller is registered as patient" },
                        { name: "requireRegistered", desc: "Ensures caller is registered as doctor or patient" },
                        { name: "validStringLength", desc: "Ensures string is between 1-120 characters" },
                      ].map((modifier) => (
                        <div key={modifier.name} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                          <h4 className="font-semibold mb-2 text-slate-900">{modifier.name}</h4>
                          <p className="text-sm text-slate-600">{modifier.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Functions */}
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-900 mb-4">Functions</h3>
                    <div className="space-y-6">
                      {[
                        {
                          name: "registerDoctor",
                          sig: "registerDoctor(string name, string specialty, string licenseId)",
                          desc: "Register a new doctor (auto-approved, no admin required)",
                          params: ["name: string (1-120 chars)", "specialty: string (1-120 chars)", "licenseId: string (1-120 chars)"],
                          requires: ["User not already registered as doctor", "User not registered as patient", "All fields within limits"],
                          event: "DoctorRegistered"
                        },
                        {
                          name: "registerPatient",
                          sig: "registerPatient(string name, uint8 age)",
                          desc: "Register a new patient",
                          params: ["name: string (1-120 chars)", "age: uint8 (1-150)"],
                          requires: ["User not already registered as patient", "User not registered as doctor", "Age between 1-150"],
                          event: "PatientRegistered"
                        },
                        {
                          name: "listDoctors",
                          sig: "listDoctors() → Doctor[]",
                          desc: "Get all registered doctors",
                          returns: "Doctor[] - Array of all doctors"
                        },
                        {
                          name: "bookAppointment",
                          sig: "bookAppointment(address doctor, uint64 startTime, string reason) → uint256",
                          desc: "Book an appointment (patients only)",
                          params: ["doctor: address", "startTime: uint64 (Unix timestamp)", "reason: string (1-120 chars)"],
                          requires: ["Caller is registered patient (onlyPatient)", "Doctor exists and approved", "Start time in future"],
                          returns: "uint256 - Appointment ID",
                          event: "AppointmentBooked"
                        },
                        {
                          name: "addOrUpdateNote",
                          sig: "addOrUpdateNote(uint256 appointmentId, string diagnosis, string prescription)",
                          desc: "Add or update medical note (doctors only)",
                          params: ["appointmentId: uint256", "diagnosis: string (1-120 chars)", "prescription: string (1-120 chars)"],
                          requires: ["Caller is registered doctor (onlyDoctor)", "Appointment exists and belongs to doctor", "Status is Booked or Completed"],
                          event: "NoteAdded"
                        },
                        {
                          name: "stats",
                          sig: "stats() → (uint256, uint256, uint256)",
                          desc: "Get system statistics",
                          returns: "totalDoctors, totalPatients, totalAppointments"
                        }
                      ].map((func) => (
                        <div key={func.name} className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                          <h4 className="font-semibold text-lg mb-2 text-slate-900">{func.name}</h4>
                          <div className="bg-slate-900 text-green-400 p-3 rounded mb-3">
                            <code className="text-sm font-mono">{func.sig}</code>
                          </div>
                          <p className="text-slate-600 mb-4">{func.desc}</p>
                          {func.params && (
                            <div className="mb-3">
                              <strong className="text-slate-900">Parameters:</strong>
                              <ul className="list-disc list-inside ml-4 mt-1 text-sm text-slate-700">
                                {func.params.map((param, i) => (
                                  <li key={i}>{param}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {func.requires && (
                            <div className="mb-3">
                              <strong className="text-slate-900">Requirements:</strong>
                              <ul className="list-disc list-inside ml-4 mt-1 text-sm text-slate-700">
                                {func.requires.map((req, i) => (
                                  <li key={i}>{req}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {func.returns && (
                            <div className="mb-3">
                              <strong className="text-slate-900">Returns:</strong>
                              <span className="ml-2 text-sm text-slate-700">{func.returns}</span>
                            </div>
                          )}
                          {func.event && (
                            <div>
                              <strong className="text-slate-900">Event:</strong>
                              <code className="ml-2 bg-slate-100 px-2 py-1 rounded text-sm">{func.event}</code>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Components */}
            <section id="components" className="mb-16 scroll-mt-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Components</h2>
                <p className="text-slate-600 mb-6">React components used throughout the application.</p>

                <div className="space-y-8">
                  {/* Layout Components */}
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">Layout Components</h3>
                    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                      <h4 className="font-semibold text-lg mb-2 text-slate-900">Navbar</h4>
                      <p className="text-slate-600 mb-3">Top navigation bar component</p>
                      <div className="bg-slate-900 text-green-400 p-3 rounded mb-3">
                        <code className="text-sm font-mono">components/layout/Navbar.tsx</code>
                      </div>
                      <p className="text-sm text-slate-700 mb-2"><strong>Features:</strong></p>
                      <ul className="list-disc list-inside ml-4 text-sm text-slate-700 space-y-1">
                        <li>Wallet connection button (RainbowKit)</li>
                        <li>User info display when connected</li>
                        <li>Notifications and settings icons</li>
                        <li>Responsive design</li>
                      </ul>
                    </div>
                  </div>

                  {/* Dashboard Components */}
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">Dashboard Components</h3>
                    <div className="space-y-4">
                      {[
                        {
                          name: "StatCard",
                          desc: "Colorful statistics card with gradient",
                          props: ["title: string", "value: string | number", "gradient: string", "percentage?: string", "icon?: ReactNode", "iconPath?: string"]
                        },
                        {
                          name: "BalanceCard",
                          desc: "Displays ETH balance for connected wallet"
                        },
                        {
                          name: "DoctorsGrid",
                          desc: "Displays list of doctors in grid layout",
                          props: ["limit?: number"]
                        },
                        {
                          name: "PatientsList",
                          desc: "Displays list of patients",
                          props: ["limit?: number"]
                        },
                        {
                          name: "AppointmentsTable",
                          desc: "Table showing appointments with status colors",
                          props: ["showNotes?: boolean"]
                        }
                      ].map((comp) => (
                        <div key={comp.name} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                          <h4 className="font-semibold mb-2 text-slate-900">{comp.name}</h4>
                          <p className="text-sm text-slate-600 mb-2">{comp.desc}</p>
                          {comp.props && (
                            <div className="mt-2">
                              <strong className="text-sm text-slate-900">Props:</strong>
                              <ul className="list-disc list-inside ml-4 mt-1 text-xs text-slate-700">
                                {comp.props.map((prop, i) => (
                                  <li key={i}><code className="bg-slate-100 px-1 rounded">{prop}</code></li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Form Components */}
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">Form Components</h3>
                    <div className="space-y-4">
                      {[
                        {
                          name: "RegisterDoctorForm",
                          desc: "Doctor registration form",
                          fields: ["Name (max 120 chars)", "Specialty (max 120 chars)", "License ID (max 120 chars)"]
                        },
                        {
                          name: "RegisterPatientForm",
                          desc: "Patient registration form",
                          fields: ["Name (max 120 chars)", "Age (1-150)"]
                        },
                        {
                          name: "BookAppointmentForm",
                          desc: "Appointment booking form (for patients)",
                          fields: ["Doctor selection", "Date & Time", "Reason (max 120 chars)"]
                        },
                        {
                          name: "NoteModal",
                          desc: "Modal for adding medical notes",
                          props: ["appointmentId: bigint", "isOpen: boolean", "onClose: () => void", "onSuccess?: () => void"],
                          fields: ["Diagnosis (max 120 chars)", "Prescription (max 120 chars)"]
                        }
                      ].map((comp) => (
                        <div key={comp.name} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                          <h4 className="font-semibold mb-2 text-slate-900">{comp.name}</h4>
                          <p className="text-sm text-slate-600 mb-2">{comp.desc}</p>
                          {comp.fields && (
                            <div className="mt-2">
                              <strong className="text-sm text-slate-900">Fields:</strong>
                              <ul className="list-disc list-inside ml-4 mt-1 text-xs text-slate-700">
                                {comp.fields.map((field, i) => (
                                  <li key={i}>{field}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {comp.props && (
                            <div className="mt-2">
                              <strong className="text-sm text-slate-900">Props:</strong>
                              <ul className="list-disc list-inside ml-4 mt-1 text-xs text-slate-700">
                                {comp.props.map((prop, i) => (
                                  <li key={i}><code className="bg-slate-100 px-1 rounded">{prop}</code></li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* UI Components */}
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">UI Components</h3>
                    <div className="space-y-4">
                      {[
                        {
                          name: "Button",
                          desc: "Reusable button component",
                          props: ["variant?: 'primary' | 'secondary' | 'outline' | 'ghost'", "size?: 'sm' | 'md' | 'lg'", "isLoading?: boolean", "children: ReactNode"]
                        },
                        {
                          name: "Card",
                          desc: "Base card component with subcomponents",
                          subcomponents: ["CardHeader", "CardTitle", "CardContent"]
                        },
                        {
                          name: "Avatar",
                          desc: "Avatar component showing initials",
                          props: ["name: string", "size?: 'sm' | 'md' | 'lg'", "className?: string"]
                        }
                      ].map((comp) => (
                        <div key={comp.name} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                          <h4 className="font-semibold mb-2 text-slate-900">{comp.name}</h4>
                          <p className="text-sm text-slate-600 mb-2">{comp.desc}</p>
                          {comp.props && (
                            <div className="mt-2">
                              <strong className="text-sm text-slate-900">Props:</strong>
                              <ul className="list-disc list-inside ml-4 mt-1 text-xs text-slate-700">
                                {comp.props.map((prop, i) => (
                                  <li key={i}><code className="bg-slate-100 px-1 rounded">{prop}</code></li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {comp.subcomponents && (
                            <div className="mt-2">
                              <strong className="text-sm text-slate-900">Subcomponents:</strong>
                              <span className="ml-2 text-xs text-slate-700">{comp.subcomponents.join(", ")}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Hooks */}
            <section id="hooks" className="mb-16 scroll-mt-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Hooks</h2>
                <p className="text-slate-600 mb-6">Custom React hooks for contract interactions and state management.</p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">useHealthcare.ts</h3>
                    <div className="space-y-4">
                      {[
                        {
                          name: "useRegisterDoctor",
                          returns: ["register(name, specialty, licenseId)", "isPending: boolean", "isConfirming: boolean", "isConfirmed: boolean", "hash: string | undefined"]
                        },
                        {
                          name: "useRegisterPatient",
                          returns: ["register(name, age)", "isPending", "isConfirming", "isConfirmed", "hash"]
                        },
                        {
                          name: "useBookAppointment",
                          returns: ["book(doctor, startTime, reason)", "isPending", "isConfirming", "isConfirmed", "hash"]
                        },
                        {
                          name: "useAddNote",
                          returns: ["addNote(appointmentId, diagnosis, prescription)", "isPending", "isConfirming", "isConfirmed", "hash"]
                        },
                        {
                          name: "useGetDoctors",
                          returns: ["doctors: Doctor[]", "isLoading: boolean", "error: Error | null", "refetch: () => void"]
                        },
                        {
                          name: "useGetStats",
                          returns: ["stats: Stats | undefined", "isLoading", "error", "refetch"]
                        }
                      ].map((hook) => (
                        <div key={hook.name} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                          <h4 className="font-semibold mb-2 text-slate-900">{hook.name}()</h4>
                          <div className="mt-2">
                            <strong className="text-sm text-slate-900">Returns:</strong>
                            <ul className="list-disc list-inside ml-4 mt-1 text-xs text-slate-700 space-y-1">
                              {hook.returns.map((ret, i) => (
                                <li key={i}><code className="bg-slate-100 px-1 rounded">{ret}</code></li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">useRole.ts</h3>
                    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                      <h4 className="font-semibold mb-2 text-slate-900">useRole()</h4>
                      <p className="text-sm text-slate-600 mb-3">Determines the current user's role</p>
                      <div className="mt-2">
                        <strong className="text-sm text-slate-900">Returns:</strong>
                        <ul className="list-disc list-inside ml-4 mt-1 text-xs text-slate-700 space-y-1">
                          <li><code className="bg-slate-100 px-1 rounded">role: "doctor" | "patient" | "none"</code></li>
                          <li><code className="bg-slate-100 px-1 rounded">isDoctor: boolean</code></li>
                          <li><code className="bg-slate-100 px-1 rounded">isPatient: boolean</code></li>
                          <li><code className="bg-slate-100 px-1 rounded">isLoading: boolean</code></li>
                          <li><code className="bg-slate-100 px-1 rounded">address: string | undefined</code></li>
                          <li><code className="bg-slate-100 px-1 rounded">refetch: () =&gt; void</code></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: Pages */}
            <section id="pages" className="mb-16 scroll-mt-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Pages</h2>
                <div className="space-y-4">
                  {[
                    {
                      name: "Landing Page",
                      path: "app/page.tsx",
                      desc: "Welcome page with wallet connection and registration cards"
                    },
                    {
                      name: "Register Page",
                      path: "app/register/page.tsx",
                      desc: "Registration page with tabs for doctor/patient registration"
                    },
                    {
                      name: "Dashboard",
                      path: "app/dashboard/page.tsx",
                      desc: "Role-based dashboard showing appointments, stats, and management tools"
                    },
                    {
                      name: "Appointments",
                      path: "app/appointments/page.tsx",
                      desc: "Comprehensive appointments list page"
                    }
                  ].map((page) => (
                    <div key={page.name} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                      <h4 className="font-semibold mb-1 text-slate-900">{page.name}</h4>
                      <code className="text-xs text-slate-500 bg-slate-50 px-1 py-0.5 rounded">{page.path}</code>
                      <p className="text-sm text-slate-600 mt-2">{page.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section 6: Utilities */}
            <section id="utils" className="mb-16 scroll-mt-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Utilities</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">lib/utils.ts</h3>
                    <div className="space-y-3">
                      {[
                        { name: "cn(...inputs)", desc: "Merges Tailwind CSS classes using clsx and tailwind-merge" },
                        { name: "formatAddress(address)", desc: "Formats wallet address (first 6 + ... + last 4 chars)" },
                        { name: "formatDate(timestamp)", desc: "Formats Unix timestamp to readable date string" },
                        { name: "getInitials(name)", desc: "Extracts initials from name for avatars" },
                        { name: "getStatusColor(status)", desc: "Returns Tailwind classes for appointment status colors" }
                      ].map((util) => (
                        <div key={util.name} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                          <code className="font-mono text-sm text-slate-900">{util.name}</code>
                          <p className="text-sm text-slate-600 mt-1">{util.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">lib/contract.ts</h3>
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                        <code className="font-mono text-sm text-slate-900">HEALTHCARE_ABI</code>
                        <p className="text-sm text-slate-600 mt-1">Contract ABI containing all function and event definitions</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                        <code className="font-mono text-sm text-slate-900">getContractAddress()</code>
                        <p className="text-sm text-slate-600 mt-1">Returns contract address from NEXT_PUBLIC_CONTRACT_ADDRESS env variable</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 7: Types */}
            <section id="types" className="mb-16 scroll-mt-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Types</h2>
                <p className="text-slate-600 mb-6"><code className="bg-slate-100 px-2 py-1 rounded text-sm">types/index.ts</code></p>
                <div className="space-y-4">
                  {[
                    { name: "UserRole", type: '"doctor" | "patient" | "none"' },
                    { name: "Doctor", type: "interface with addr, name, specialty, licenseId, exists, approved, createdAt" },
                    { name: "Patient", type: "interface with addr, name, age, exists, createdAt" },
                    { name: "AppointmentStatus", type: '"Booked" | "Completed" | "Cancelled"' },
                    { name: "Appointment", type: "interface with id, patient, doctor, startTime, reason, status, createdAt" },
                    { name: "Note", type: "interface with exists, appointmentId, doctor, diagnosis, prescription, createdAt" },
                    { name: "Stats", type: "interface with totalDoctors, totalPatients, totalAppointments" }
                  ].map((type) => (
                    <div key={type.name} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                      <code className="font-semibold text-slate-900">{type.name}</code>
                      <p className="text-sm text-slate-600 mt-1">{type.type}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section 8: Configuration */}
            <section id="config" className="mb-16 scroll-mt-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Configuration</h2>
                <div className="space-y-4">
                  {[
                    {
                      name: "hardhat.config.ts",
                      desc: "Hardhat configuration with Solidity 0.8.20, Sepolia network, and environment variables"
                    },
                    {
                      name: "next.config.js",
                      desc: "Next.js configuration with App Router and TypeScript support"
                    },
                    {
                      name: "tailwind.config.ts",
                      desc: "Tailwind CSS configuration with custom colors and content paths"
                    },
                    {
                      name: "providers/Web3Provider.tsx",
                      desc: "Web3 provider setup with wagmi (Sepolia chain), RainbowKit, and React Query"
                    }
                  ].map((config) => (
                    <div key={config.name} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                      <code className="font-semibold text-slate-900">{config.name}</code>
                      <p className="text-sm text-slate-600 mt-2">{config.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Success Message */}
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg mb-12">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">
                    <strong>Documentation complete!</strong> All sections have been documented in detail.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">Healthcare DApp Documentation</p>
                <Link href="/dashboard" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Back to Dashboard →
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
