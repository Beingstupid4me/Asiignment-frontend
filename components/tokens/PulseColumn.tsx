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
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Sort tokens based on active filter
  const sortedTokens = React.useMemo(() => {
    const tokensCopy = [...tokens];
    
    switch (activeFilter) {
      case "P1": // Sort by time (newest first)
        return tokensCopy.sort((a, b) => {
          const timeToSeconds = (timeStr: string) => {
            const match = timeStr.match(/(\d+)([smh])/);
            if (!match) return 0;
            const value = parseInt(match[1]);
            const unit = match[2];
            if (unit === 's') return value;
            if (unit === 'm') return value * 60;
            if (unit === 'h') return value * 3600;
            return 0;
          };
          return timeToSeconds(a.timeAgo) - timeToSeconds(b.timeAgo);
        });
      
      case "P2": // Sort by market cap (highest first)
        return tokensCopy.sort((a, b) => b.metrics.marketCap - a.metrics.marketCap);
      
      case "P3": // Sort by volume (highest first)
        return tokensCopy.sort((a, b) => b.metrics.volume - a.metrics.volume);
      
      default:
        return tokensCopy;
    }
  }, [tokens, activeFilter]);

  // Intersection Observer for progressive loading
  useEffect(() => {
    const target = observerTarget.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && !isLoadingMore) {
          // Simulate loading more data
          setIsLoadingMore(true);
          setTimeout(() => {
            console.log("Load more tokens for", type);
            setIsLoadingMore(false);
          }, 1000);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [type, isLoading, isLoadingMore]);

  // Handle scroll detection for UI effects
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollTop } = scrollRef.current;
    setIsScrolling(scrollTop > 0);
  }, []);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    // Use passive event listener for better scroll performance
    scrollElement.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollElement.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      {/* Column Header */}
      <div className={cn(
        "sticky top-0 z-10 bg-[#0a0a0a] border-b border-gray-800 px-4 py-3 transition-shadow",
        isScrolling && "shadow-lg"
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0">
            <h2 className="text-white font-semibold text-lg">{title}</h2>
          </div>
          <div className="flex gap-1">
            <div className="flex items-center gap-0">
                <button className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors">
                <Zap className="w-4 h-4" />
                <span className="ml-1 text-xs">0</span>
                </button>
            </div>
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
      </div>

      {/* Scrollable Content */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-3 py-2 space-y-2 scrollbar-thin"
      >
        {isLoading ? (
          // Loading skeleton
          Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-[#0f0f0f] border border-gray-800/40 rounded-md p-2 h-[90px] overflow-hidden relative"
            >
              <div className="absolute inset-0 shimmer" />
              <div className="flex gap-2 h-full relative z-10">
                <div className="w-16 h-16 bg-gray-800/50 rounded-md" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-2.5 bg-gray-800/50 rounded w-3/4" />
                  <div className="h-2 bg-gray-800/50 rounded w-1/2" />
                  <div className="h-2 bg-gray-800/50 rounded w-2/3" />
                </div>
              </div>
            </div>
          ))
        ) : sortedTokens.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-sm">No tokens found</p>
          </div>
        ) : (
          <>
            {sortedTokens.map((token) => (
              <TokenCard
                key={token.id}
                tokenPair={token}
                onBuy={onBuyToken}
              />
            ))}
            
            {/* Intersection Observer Target for Progressive Loading */}
            <div ref={observerTarget} className="h-4" />
            
            {/* Loading More Indicator */}
            {isLoadingMore && (
              <div className="flex items-center justify-center py-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm">Loading more...</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
