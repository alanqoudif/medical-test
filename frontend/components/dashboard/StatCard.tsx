"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  gradient: string;
  tag?: string;
}

export function StatCard({ title, value, icon, gradient, tag }: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg shadow-lg p-6 text-white relative overflow-hidden",
        `bg-gradient-to-br ${gradient}`
      )}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <p className="text-white/80 text-sm font-medium">{title}</p>
          {icon && <div className="text-white/80">{icon}</div>}
        </div>
        <p className="text-3xl font-bold">{value}</p>
        {tag && (
          <p className="text-white/70 text-xs mt-2 font-mono">#{tag}</p>
        )}
      </div>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-pattern" />
      </div>
    </div>
  );
}