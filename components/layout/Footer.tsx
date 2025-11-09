"use client";

import React from "react";
import { Settings, Twitter, Radio } from "lucide-react";

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 h-[50px] bg-[#0a0a0a] border-t border-gray-800">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left - Preset and Stats */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-400">PRESET 1</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">📋 1</span>
              <span className="text-gray-500">≡ 0</span>
            </div>
          </div>
        </div>

        {/* Center - Social and Status */}
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <Settings className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <div className="w-4 h-4">💰</div>
            <span className="text-sm">Wallet</span>
          </button>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <Twitter className="w-4 h-4" />
            <span className="text-sm">Twitter</span>
          </button>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <Radio className="w-4 h-4" />
            <span className="text-sm">Discover</span>
          </button>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <div className="w-4 h-4">📊</div>
            <span className="text-sm">Pulse</span>
          </button>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span className="text-sm">||</span>
            <span className="text-sm">PnL</span>
          </button>
        </div>

        {/* Right - Stats and Connection */}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-4">
            <span className="text-orange-500">🔶 $102.0K</span>
            <span className="text-gray-500">💲 $3420</span>
            <span className="text-emerald-500">≡ $159.6</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <span className="text-gray-500">$65.6K</span>
            <span className="text-gray-600">📊 0.0,22</span>
            <span className="text-gray-600">⏱ 0.00,3</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-500 text-xs">Connection is stable</span>
          </div>
          <button className="text-gray-400 hover:text-white transition-colors">
            <span className="text-sm">GLOBAL</span>
            <span className="ml-1 text-xs">▼</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
