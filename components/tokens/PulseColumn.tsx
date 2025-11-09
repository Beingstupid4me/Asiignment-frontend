"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { Zap, Settings } from "lucide-react";
import { TokenCard } from "./TokenCard";
import type { TokenPair, ColumnType } from "@/types/token";
import { cn } from "@/lib/utils";

interface PulseColumnProps {
  title: string;
  type: ColumnType;
  tokens: TokenPair[];
  onBuyToken?: (token: TokenPair) => void;
  isLoading?: boolean;
}

const COLUMN_ICONS: Record<ColumnType, React.ReactNode> = {
  "new-pairs": <Zap className="w-4 h-4" />,
  "final-stretch": <span className="text-sm">⏳</span>,
  "migrated": <span className="text-sm">✅</span>,
};

export function PulseColumn({
  title,
  type,
  tokens,
  onBuyToken,
  isLoading = false,
}: PulseColumnProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>("P1");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  // Handle scroll detection for lazy loading
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const bottom = scrollHeight - scrollTop - clientHeight < 100;

    if (bottom) {
      // Trigger load more
      console.log("Load more for", type);
    }

    setIsScrolling(scrollTop > 0);
  }, [type]);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    scrollElement.addEventListener("scroll", handleScroll);
    return () => scrollElement.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      {/* Column Header */}
      <div className={cn(
        "sticky top-0 z-10 bg-[#0a0a0a] border-b border-gray-800 px-4 py-3 transition-shadow",
        isScrolling && "shadow-lg"
      )}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">{COLUMN_ICONS[type]}</span>
            <h2 className="text-white font-semibold text-lg">{title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors">
              <Zap className="w-4 h-4" />
              <span className="ml-1 text-xs">0</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1 bg-[#141414] rounded-md p-1">
              {["P1", "P2", "P3"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "px-2 py-1 text-xs font-medium rounded transition-colors",
                    activeFilter === filter
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:text-white"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin"
      >
        {isLoading ? (
          // Loading skeleton
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-[#141414] border border-gray-800/50 rounded-lg p-3 animate-pulse"
            >
              <div className="flex gap-3">
                <div className="w-14 h-14 bg-gray-800 rounded-sm" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-800 rounded w-3/4" />
                  <div className="h-3 bg-gray-800 rounded w-1/2" />
                  <div className="h-3 bg-gray-800 rounded w-2/3" />
                </div>
              </div>
            </div>
          ))
        ) : tokens.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-sm">No tokens found</p>
          </div>
        ) : (
          tokens.map((token) => (
            <TokenCard
              key={token.id}
              tokenPair={token}
              onBuy={onBuyToken}
            />
          ))
        )}
      </div>
    </div>
  );
}
