"use client";

import { HTMLAttributes } from "react";
import { cn, getInitials } from "@/lib/utils";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  size?: "sm" | "md" | "lg";
}

const gradients = [
  "from-blue-500 to-purple-600",
  "from-green-500 to-teal-600",
  "from-pink-500 to-rose-600",
  "from-orange-500 to-red-600",
  "from-indigo-500 to-blue-600",
  "from-purple-500 to-pink-600",
  "from-teal-500 to-cyan-600",
  "from-yellow-500 to-orange-600",
];

function getGradientForName(name: string): string {
  const index = name.charCodeAt(0) % gradients.length;
  return gradients[index];
}

export function Avatar({ name, size = "md", className, ...props }: AvatarProps) {
  const initials = getInitials(name);
  const gradient = getGradientForName(name);

  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-base",
    lg: "w-16 h-16 text-lg",
  };

  return (
    <div
      className={cn(
        "rounded-full bg-gradient-to-br flex items-center justify-center text-white font-semibold",
        sizes[size],
        `bg-gradient-to-br ${gradient}`,
        className
      )}
      {...props}
    >
      {initials}
    </div>
  );
}