import { type ClassValue, clsx } from "clsx";
// Import clsx library for conditional class names
import { twMerge } from "tailwind-merge";
// Import tailwind-merge to merge Tailwind CSS classes

export function cn(...inputs: ClassValue[]) {
  // Utility function to combine and merge CSS class names
  // Takes multiple class name inputs and returns merged string
  return twMerge(clsx(inputs));
  // First combine classes with clsx, then merge conflicting Tailwind classes
}

export function formatAddress(address: string): string {
  // Function to format Ethereum address for display (shortened version)
  if (!address) return "";
  // Return empty string if address is not provided
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
  // Return first 6 characters + "..." + last 4 characters (e.g., "0x1234...5678")
}

export function formatDate(timestamp: bigint | number): string {
  // Function to format Unix timestamp to readable date string
  const date = new Date(Number(timestamp) * 1000);
  // Convert timestamp to Date object (multiply by 1000 because JS uses milliseconds)
  return date.toLocaleDateString("en-US", {
    // Format date using US locale
    year: "numeric",    // Display full year (e.g., 2024)
    month: "short",     // Display abbreviated month (e.g., "Jan")
    day: "numeric",     // Display day number (e.g., 15)
    hour: "2-digit",    // Display hour in 2-digit format (e.g., "09")
    minute: "2-digit",  // Display minute in 2-digit format (e.g., "30")
  });
}

export function getInitials(name: string): string {
  // Function to extract initials from a person's name
  if (!name) return "?";
  // Return "?" if name is empty or undefined
  const parts = name.trim().split(" ");
  // Split name by spaces and remove extra whitespace
  if (parts.length === 1) return parts[0][0].toUpperCase();
  // If only one word, return first letter uppercase
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  // Return first letter of first word + first letter of last word, both uppercase
}

export function getStatusColor(status: string): string {
  // Function to get Tailwind CSS classes based on appointment status
  switch (status) {
    // Check the status value
    case "Booked":
      // If status is "Booked"
      return "bg-blue-100 text-blue-800";
      // Return blue background and text color classes
    case "Completed":
      // If status is "Completed"
      return "bg-green-100 text-green-800";
      // Return green background and text color classes
    case "Cancelled":
      // If status is "Cancelled"
      return "bg-red-100 text-red-800";
      // Return red background and text color classes
    default:
      // For any other status
      return "bg-gray-100 text-gray-800";
      // Return gray background and text color classes
  }
}