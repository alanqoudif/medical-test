"use client";

import { useAccount, useBalance } from "wagmi";
import { formatEther } from "viem";
import { Card } from "@/components/ui/Card";

export function BalanceCard() {
  const { address } = useAccount();
  const { data: balance, isLoading } = useBalance({
    address,
  });

  if (!address) {
    return null;
  }

  return (
    <Card className="bg-white border border-gray-200 shadow-md">
      <div className="p-6">
        <h3 className="text-gray-900 font-semibold mb-3">Balance</h3>
        {isLoading ? (
          <p className="text-3xl font-bold text-blue-600">Loading...</p>
        ) : (
          <div className="flex items-baseline space-x-2">
            <p className="text-3xl font-bold text-blue-600">
              {balance ? parseFloat(formatEther(balance.value)).toFixed(2) : "0.00"}
            </p>
            <span className="text-gray-900 text-xl font-semibold">ETH</span>
          </div>
        )}
      </div>
    </Card>
  );
}