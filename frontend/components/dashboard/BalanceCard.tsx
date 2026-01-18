"use client";

import { useAccount, useBalance } from "wagmi";
import { formatEther } from "viem";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export function BalanceCard() {
  const { address } = useAccount();
  const { data: balance, isLoading } = useBalance({
    address,
  });

  if (!address) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-0">
      <CardHeader>
        <CardTitle className="text-white">Wallet Balance</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-2xl font-bold">Loading...</p>
        ) : (
          <p className="text-3xl font-bold">
            {balance ? parseFloat(formatEther(balance.value)).toFixed(4) : "0.0000"} ETH
          </p>
        )}
      </CardContent>
    </Card>
  );
}