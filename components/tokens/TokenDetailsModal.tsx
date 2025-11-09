"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Activity, 
  DollarSign,
  BarChart3,
  Globe,
  ExternalLink
} from "lucide-react";
import { TokenPair } from "@/types/token";
import { formatPrice } from "@/lib/utils";

interface TokenDetailsModalProps {
  token: TokenPair;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TokenDetailsModal({ token, open, onOpenChange }: TokenDetailsModalProps) {
  const { token: tokenData, metrics, price, priceChange, percentageChanges, timeAgo, solAmount } = token;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={tokenData.imageUrl} alt={tokenData.name} />
              <AvatarFallback>{tokenData.symbol.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="text-2xl">{tokenData.name}</DialogTitle>
              <DialogDescription className="text-base">
                {tokenData.symbol} / SOL
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Price Info */}
          <div className="space-y-4">
            <div className="bg-[#0f0f0f] border border-gray-800 rounded-lg p-4">
              <h3 className="text-sm text-gray-400 uppercase mb-2">Current Price</h3>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-white">${price.toFixed(8)}</span>
                <Badge variant={priceChange >= 0 ? "success" : "destructive"}>
                  {priceChange >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                  {Math.abs(priceChange).toFixed(2)}%
                </Badge>
              </div>
            </div>

            {/* Percentage Changes */}
            <div className="bg-[#0f0f0f] border border-gray-800 rounded-lg p-4">
              <h3 className="text-sm text-gray-400 uppercase mb-3">Price Changes</h3>
              <div className="grid grid-cols-2 gap-3">
                {percentageChanges.map((change, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{change.timeframe}</span>
                    <Badge variant={change.value >= 0 ? "success" : "destructive"} className="text-xs">
                      {change.value >= 0 ? '+' : ''}{change.value.toFixed(1)}%
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="space-y-4">
            <div className="bg-[#0f0f0f] border border-gray-800 rounded-lg p-4">
              <h3 className="text-sm text-gray-400 uppercase mb-3">Token Metrics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-300">
                    <DollarSign className="w-4 h-4 text-blue-400" />
                    <span className="text-sm">Market Cap</span>
                  </div>
                  <span className="font-semibold text-white">{formatPrice(metrics.marketCap)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Activity className="w-4 h-4 text-green-400" />
                    <span className="text-sm">24h Volume</span>
                  </div>
                  <span className="font-semibold text-white">{formatPrice(metrics.volume)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-300">
                    <BarChart3 className="w-4 h-4 text-purple-400" />
                    <span className="text-sm">Liquidity</span>
                  </div>
                  <span className="font-semibold text-white">{formatPrice(metrics.liquidity)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Users className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm">Holders</span>
                  </div>
                  <span className="font-semibold text-white">{metrics.holders.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Activity className="w-4 h-4 text-orange-400" />
                    <span className="text-sm">Transactions</span>
                  </div>
                  <span className="font-semibold text-white">{metrics.transactions.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="mt-6 bg-[#0f0f0f] border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm text-gray-400 uppercase">Price Chart</h3>
            <div className="flex gap-2">
              {['1H', '4H', '1D', '1W', '1M'].map((timeframe) => (
                <button
                  key={timeframe}
                  className="px-3 py-1 text-xs rounded bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  {timeframe}
                </button>
              ))}
            </div>
          </div>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <BarChart3 className="w-16 h-16 mb-2" />
            <p className="text-sm">Chart visualization coming soon</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
            <TrendingUp className="w-4 h-4 mr-2" />
            Buy {tokenData.symbol}
          </Button>
          <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white">
            <TrendingDown className="w-4 h-4 mr-2" />
            Sell {tokenData.symbol}
          </Button>
          <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
            <Globe className="w-4 h-4 mr-2" />
            Website
          </Button>
          <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
            <ExternalLink className="w-4 h-4 mr-2" />
            Explorer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
