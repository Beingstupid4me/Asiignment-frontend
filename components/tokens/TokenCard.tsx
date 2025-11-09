"use client";

import React, { memo } from "react";
import { Edit, Link as LinkIcon, Search, Star, Users, Flame, TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PercentageChange } from "./PercentageChange";
import { MetricIcon } from "./MetricIcon";
import { SolButton } from "./SolButton";
import type { TokenPair } from "@/types/token";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";

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
    <div className="group relative bg-[#141414] hover:bg-[#181818] border border-gray-800/50 hover:border-gray-700 rounded-lg p-3 transition-all duration-200">
      <div className="flex items-start gap-3">
        {/* Token Avatar */}
        <div className="relative">
          <Avatar className="w-14 h-14 ring-2 ring-gray-800 group-hover:ring-gray-700">
            <AvatarImage src={token.imageUrl} alt={token.name} />
            <AvatarFallback>{token.symbol.slice(0, 2)}</AvatarFallback>
          </Avatar>
          {tokenPair.featured && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
              <Star className="w-3 h-3 text-black fill-black" />
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Header Row */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-white font-semibold text-sm truncate">
                  {token.name}
                </h3>
                <span className="text-gray-500 text-xs">{token.symbol}</span>
                {token.ticker !== token.symbol && (
                  <Badge variant="outline" className="text-xs px-1 py-0">
                    {token.ticker}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-emerald-500 font-medium">{timeAgo}</span>
                <button className="text-gray-500 hover:text-white transition-colors">
                  <Edit className="w-3 h-3" />
                </button>
                <button className="text-gray-500 hover:text-white transition-colors">
                  <LinkIcon className="w-3 h-3" />
                </button>
                <button className="text-gray-500 hover:text-white transition-colors">
                  <Search className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Right Side - MC & Volume */}
            <div className="text-right">
              <div className="text-blue-400 font-bold text-sm">
                MC {formatPrice(metrics.marketCap)}
              </div>
              <div className="text-gray-400 text-xs">
                V {formatPrice(metrics.volume)}
              </div>
            </div>
          </div>

          {/* Metrics Row */}
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <MetricIcon
              icon={<Star />}
              value={metrics.holders}
              label="Holders"
            />
            <MetricIcon
              icon={<Users />}
              value={`${metrics.transactions}`}
              label="Transactions"
              variant={metrics.transactions > 0 ? "positive" : "default"}
            />
            <MetricIcon
              icon={<Flame />}
              value="0"
              label="Liquidity"
            />
            <MetricIcon
              icon={<Activity />}
              value="0"
              label="Activity Score"
            />
            {migrationRatio && (
              <span className="text-xs text-yellow-500 font-medium">
                ⭐ {migrationRatio}
              </span>
            )}
          </div>

          {/* Bottom Row - Price Changes & Action */}
          <div className="flex items-center justify-between gap-2">
            {/* Percentage Changes */}
            <div className="flex items-center gap-2 flex-wrap">
              {percentageChanges.map((change, index) => (
                <div key={index} className="flex items-center gap-1">
                  {change.value >= 0 ? (
                    <TrendingUp className="w-3 h-3 text-green-500" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-500" />
                  )}
                  <span className={cn(
                    "text-xs font-medium",
                    change.value >= 0 ? "text-green-500" : "text-red-500"
                  )}>
                    {change.value >= 0 ? "+" : ""}{change.value}%
                  </span>
                  {change.timeframe && (
                    <span className="text-xs text-gray-500">{change.timeframe}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Action Button */}
            <SolButton
              amount={solAmount}
              onClick={() => onBuy?.(tokenPair)}
            />
          </div>

          {/* Price Info */}
          <div className="mt-2 pt-2 border-t border-gray-800/50 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <span className="text-gray-500">
                F <span className="text-white">≡ {price.toFixed(4)}</span>
              </span>
              <span className="text-gray-500">
                TX <span className="text-white">{metrics.transactions}</span>
              </span>
            </div>
            <div className={cn(
              "font-medium",
              priceChange >= 0 ? "text-green-500" : "text-red-500"
            )}>
              {priceChange >= 0 ? "+" : ""}{priceChange.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
