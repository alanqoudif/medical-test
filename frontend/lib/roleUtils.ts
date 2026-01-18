import type { UserRole } from "@/types";

export function getRoleLabel(role: UserRole): string {
  switch (role) {
    case "doctor":
      return "Doctor";
    case "patient":
      return "Patient";
    case "none":
      return "Guest";
    default:
      return "Unknown";
  }
}

export function getRoleBadgeStyles(role: UserRole): string {
  switch (role) {
    case "doctor":
      return "bg-green-100 text-green-800 border-green-300";
    case "patient":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "none":
      return "bg-gray-100 text-gray-800 border-gray-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
}

export function getRoleBadgeIcon(role: UserRole): string {
  switch (role) {
    case "doctor":
      return "👨‍⚕️";
    case "patient":
      return "🏥";
    default:
      return "👤";
  }
}
