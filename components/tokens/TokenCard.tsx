"use client";

import React, { memo } from "react";
import { 
  Eye, EyeOff, RefreshCw, Globe, Link2, Search, 
  Users, TrendingUp, Award, Crown 
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SolButton } from "./SolButton";
import type { TokenPair } from "@/types/token";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TokenCardProps {
  tokenPair: TokenPair;
  onBuy?: (tokenPair: TokenPair) => void;
}

export const TokenCard = memo(function TokenCard({
  tokenPair,
  onBuy,
}: TokenCardProps) {
  const { token, metrics, price, priceChange, percentageChanges, timeAgo, solAmount, migrationRatio } = tokenPair;

  return (
    <div className="group relative bg-[#0f0f0f] hover:bg-[#141414] border border-gray-800/40 hover:border-gray-700/60 rounded-md transition-all duration-200">
      <div className="flex items-center gap-0">
        {/* Left Action Icons */}
        <div className="flex flex-col items-center gap-0.5 px-1.5 py-1.5">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="w-5 h-5 flex items-center justify-center text-gray-600 hover:text-gray-400 transition-colors">
                  <EyeOff className="w-4 h-4" strokeWidth={2} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="text-xs">Hide token</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="w-5 h-5 flex items-center justify-center text-gray-600 hover:text-gray-400 transition-colors">
                  <span className="text-sm">🎩</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="text-xs">Special action</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="w-5 h-5 flex items-center justify-center text-gray-600 hover:text-gray-400 transition-colors">
                  <RefreshCw className="w-4 h-4" strokeWidth={2} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="text-xs">Refresh</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Token Avatar with Overlay Name */}
        <div className="relative flex-shrink-0 py-1.5">
          <div className="relative w-16 h-16">
            <Avatar className="w-full h-full rounded-md border border-gray-800/50 group-hover:border-gray-700">
              <AvatarImage src={token.imageUrl} alt={token.name} className="object-cover" />
              <AvatarFallback className="rounded-md text-base font-bold">
                {token.symbol.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            {/* Name overlay on image */}
            <div className="absolute inset-0 flex items-start justify-center pt-1">
              <span className="text-white text-xs font-bold drop-shadow-lg px-1 py-0.5 bg-black/40 rounded-sm">
                {token.name.length > 8 ? token.name.slice(0, 8) + '...' : token.name}
              </span>
            </div>
            {/* Verified/Featured badge */}
            {tokenPair.featured && (
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center ring-1 ring-[#0f0f0f]">
                <span className="text-[8px]">✓</span>
              </div>
            )}
          </div>
          {/* Contract Address */}
          <div className="mt-0.5 text-center">
            <span className="text-[11px] text-gray-600">{token.contractAddress}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 py-1.5 pr-2 pl-1.5">
          {/* Token Info & Quick Links */}
          <div className="flex items-center gap-1.5 mb-1">
            <h3 className="text-white font-semibold text-sm">
              {token.symbol}
            </h3>
            <span className="text-gray-500 text-xs">#{token.ticker}</span>
            <Badge variant="outline" className="text-[11px] px-0.5 py-0 border-gray-700">
              📋
            </Badge>
          </div>
          
          {/* Age and Quick Action Icons */}
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-emerald-400 font-medium text-xs">{timeAgo}</span>
            <button className="text-gray-600 hover:text-emerald-400 transition-colors">
              <span className="text-xs">🌿</span>
            </button>
            <button className="text-gray-600 hover:text-gray-400 transition-colors">
              <Globe className="w-3.5 h-3.5" strokeWidth={2} />
            </button>
            <button className="text-gray-600 hover:text-gray-400 transition-colors">
              <Link2 className="w-3.5 h-3.5" strokeWidth={2} />
            </button>
            <button className="text-gray-600 hover:text-gray-400 transition-colors">
              <Search className="w-3.5 h-3.5" strokeWidth={2} />
            </button>
          </div>

          {/* Key Metrics Row */}
          <div className="flex items-center gap-2 mb-1 text-xs">
            <div className="flex items-center gap-0.5 text-gray-400">
              <Users className="w-3.5 h-3.5" />
              <span className="text-white font-medium">{metrics.holders}</span>
            </div>
            <div className="flex items-center gap-0.5 text-gray-400">
              <TrendingUp className="w-3.5 h-3.5" />
              <span className="text-white font-medium">{metrics.transactions}</span>
            </div>
            <div className="flex items-center gap-0.5 text-gray-400">
              <Award className="w-3.5 h-3.5" />
              <span className="text-white font-medium">1</span>
            </div>
            {migrationRatio && (
              <div className="flex items-center gap-0.5 text-gray-400">
                <Crown className="w-3.5 h-3.5" />
                <span className="text-white font-medium">{migrationRatio}</span>
              </div>
            )}
          </div>

          {/* Bottom Percentage Tags */}
          <div className="flex items-center gap-1 flex-wrap">
            {percentageChanges.slice(0, 5).map((change, index) => {
              const icons = ['👤', '🎩', '🎯', '👻', '🔸'];
              const isNegative = change.value < 0;
              return (
                <Badge
                  key={index}
                  variant={isNegative ? "danger" : "success"}
                  className="text-[11px] px-1 py-0 font-medium flex items-center gap-0.5"
                >
                  <span className="text-xs">{icons[index % icons.length]}</span>
                  <span>{Math.abs(change.value).toFixed(0)}%</span>
                  {change.timeframe && <span className="opacity-70 text-[10px]">{change.timeframe}</span>}
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Right Section - Financial Data & CTA */}
        <div className="flex flex-col items-end justify-between py-1.5 pr-2 pl-1.5 border-l border-gray-800/40">
          <div className="flex flex-col items-end gap-0.5">
            <div className="text-right">
              <div className="text-[9px] text-gray-500 uppercase">MC</div>
              <div className="text-blue-400 font-bold text-xs whitespace-nowrap">
                {formatPrice(metrics.marketCap)}
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-[9px] text-gray-500 uppercase">V</div>
              <div className="text-gray-300 font-medium text-[10px] whitespace-nowrap">
                {formatPrice(metrics.volume)}
              </div>
            </div>

            {/* Liquidity & TX Info */}
            <div className="text-right text-[9px] text-gray-500">
              <div className="flex items-center gap-0.5 justify-end">
                <span>F</span>
                <span className="text-white font-medium">≡ {price.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-0.5 justify-end">
                <span>TX</span>
                <span className="text-white font-medium">{metrics.transactions}</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <SolButton
            amount={solAmount}
            onClick={() => onBuy?.(tokenPair)}
            className="w-full h-6 text-[10px] px-2"
          />
        </div>
      </div>
    </div>
  );
});
