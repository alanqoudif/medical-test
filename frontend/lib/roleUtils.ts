import type { UserRole } from "@/types";
// Import UserRole type definition

export function getRoleLabel(role: UserRole): string {
  // Function to get human-readable label for user role
  switch (role) {
    // Check the role value
    case "doctor":
      // If role is "doctor"
      return "Doctor";
      // Return "Doctor" label
    case "patient":
      // If role is "patient"
      return "Patient";
      // Return "Patient" label
    case "none":
      // If role is "none" (not registered)
      return "Guest";
      // Return "Guest" label
    default:
      // For any other role
      return "Unknown";
      // Return "Unknown" label
  }
}

export function getRoleBadgeStyles(role: UserRole): string {
  // Function to get Tailwind CSS classes for role badge styling
  switch (role) {
    // Check the role value
    case "doctor":
      // If role is "doctor"
      return "bg-green-100 text-green-800 border-green-300";
      // Return green color scheme classes
    case "patient":
      // If role is "patient"
      return "bg-blue-100 text-blue-800 border-blue-300";
      // Return blue color scheme classes
    case "none":
      // If role is "none" (not registered)
      return "bg-gray-100 text-gray-800 border-gray-300";
      // Return gray color scheme classes
    default:
      // For any other role
      return "bg-gray-100 text-gray-800 border-gray-300";
      // Return gray color scheme classes as default
  }
}

export function getRoleBadgeIcon(role: UserRole): string {
  // Function to get emoji icon for user role
  switch (role) {
    // Check the role value
    case "doctor":
      // If role is "doctor"
      return "👨‍⚕️";
      // Return doctor emoji
    case "patient":
      // If role is "patient"
      return "🏥";
      // Return hospital emoji
    default:
      // For any other role (including "none")
      return "👤";
      // Return generic user emoji
  }
}
