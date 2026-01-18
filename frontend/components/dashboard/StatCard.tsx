"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  gradient: string;
  percentage?: string;
  iconPath?: string;
}

export function StatCard({ title, value, icon, gradient, percentage, iconPath }: StatCardProps) {
  const defaultIcons: Record<string, string> = {
    patient: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    doctor: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    appointment: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    notifications: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
  };

  const iconSvg = iconPath || defaultIcons[title.toLowerCase().split(" ")[0]] || "";

  return (
    <div
      className={cn(
        "rounded-xl shadow-lg p-6 text-white relative overflow-hidden min-h-[140px] flex flex-col justify-between",
        `bg-gradient-to-br ${gradient}`
      )}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <p className="text-white/90 text-sm font-medium">{title}</p>
          {iconSvg && (
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconSvg} />
              </svg>
            </div>
          )}
          {icon && <div className="text-white">{icon}</div>}
        </div>
        <div className="flex items-baseline space-x-2">
          <p className="text-4xl font-bold">{value}</p>
          {percentage && (
            <span className="text-white/80 text-sm flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              {percentage}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}