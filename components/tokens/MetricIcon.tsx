"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface MetricIconProps {
  icon: React.ReactNode;
  value: string | number;
  label?: string;
  variant?: "default" | "positive" | "negative" | "warning";
  className?: string;
}

export function MetricIcon({
  icon,
  value,
  label,
  variant = "default",
  className,
}: MetricIconProps) {
  const variantStyles = {
    default: "text-gray-400",
    positive: "text-green-500",
    negative: "text-red-500",
    warning: "text-orange-500",
  };

  const content = (
    <div
      className={cn(
        "flex items-center gap-1 text-xs",
        variantStyles[variant],
        className
      )}
    >
      <span className="w-3 h-3 flex items-center justify-center">{icon}</span>
      <span className="font-medium">{value}</span>
    </div>
  );

  if (label) {
    return (
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
}
