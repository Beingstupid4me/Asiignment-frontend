"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface PercentageChangeProps {
  value: number;
  timeframe?: string;
  showIcon?: boolean;
  className?: string;
}

export function PercentageChange({
  value,
  timeframe,
  showIcon = true,
  className,
}: PercentageChangeProps) {
  const isPositive = value >= 0;
  const Icon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div
      className={cn(
        "flex items-center gap-1 text-xs font-medium",
        isPositive ? "text-green-500" : "text-red-500",
        className
      )}
    >
      {showIcon && <Icon className="w-3 h-3" />}
      <span>
        {isPositive ? "+" : ""}
        {value.toFixed(1)}%
      </span>
      {timeframe && <span className="text-gray-500">{timeframe}</span>}
    </div>
  );
}
