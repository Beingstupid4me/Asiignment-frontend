"use client";

import React from "react";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SolButtonProps {
  amount: number;
  onClick?: () => void;
  className?: string;
}

export function SolButton({ amount, onClick, className }: SolButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "h-7 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-full transition-all flex items-center gap-1.5",
        className
      )}
    >
      <Zap className="w-3 h-3 fill-white" />
      <span>{amount} SOL</span>
    </Button>
  );
}
