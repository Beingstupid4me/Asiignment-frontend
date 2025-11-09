"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PulseColumn } from "@/components/tokens/PulseColumn";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { generateMockData, MockWebSocket } from "@/lib/mock-data";
import type { TokenPair, ColumnType } from "@/types/token";
import { HelpCircle, List, BarChart3, Volume2, Settings as SettingsIcon } from "lucide-react";

export default function Home() {
  const [tokens, setTokens] = useState<Record<ColumnType, TokenPair[]>>({
    "new-pairs": [],
    "final-stretch": [],
    "migrated": [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load initial data
    const mockData = generateMockData();
    setTokens(mockData);
    setIsLoading(false);

    // Setup WebSocket simulation for real-time updates
    const ws = new MockWebSocket();
    ws.connect((updates) => {
      setTokens((prev) => {
        const newTokens = { ...prev };
        updates.forEach((update) => {
          // Add new token to the top of its category
          newTokens[update.category] = [
            update,
            ...newTokens[update.category].slice(0, 19), // Keep max 20 items
          ];
        });
        return newTokens;
      });
    });

    return () => ws.disconnect();
  }, []);

  const handleBuyToken = (token: TokenPair) => {
    console.log("Buy token:", token);
    // Implement buy logic
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      <Header />
      
      {/* Main Content */}
      <main className="flex-1 mt-[60px] mb-[50px]">
        {/* Pulse Header */}
        <div className="border-b border-gray-800 bg-[#0a0a0a] sticky top-[60px] z-40">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-white flex items-center my-4">
                  Pulse
                </h1>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white transition-colors">
                  <HelpCircle className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-1 bg-[#141414] rounded-md p-1">
                  <button className="px-3 py-1.5 text-sm text-white bg-blue-600 rounded">
                    <List className="w-4 h-4" />
                  </button>
                  <button className="px-3 py-1.5 text-sm text-gray-400 hover:text-white rounded">
                    Display
                  </button>
                </div>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <BarChart3 className="w-5 h-5" />
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <SettingsIcon className="w-5 h-5" />
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <Volume2 className="w-5 h-5" />
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <SettingsIcon className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2 bg-[#141414] rounded-md px-3 py-1.5">
                  <span className="text-white text-sm">📋 1</span>
                  <span className="text-gray-500">≡ 0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Three Column Layout - Each with independent scroll */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 h-[calc(100vh-160px)]">
          {/* Column 1 - New Pairs */}
          <div className="border-r border-gray-800 h-full overflow-hidden flex flex-col">
            <ErrorBoundary>
              <PulseColumn
                title="New Pairs"
                type="new-pairs"
                tokens={tokens["new-pairs"]}
                onBuyToken={handleBuyToken}
                isLoading={isLoading}
              />
            </ErrorBoundary>
          </div>

          {/* Column 2 - Final Stretch */}
          <div className="border-r border-gray-800 h-full overflow-hidden flex flex-col">
            <ErrorBoundary>
              <PulseColumn
                title="Final Stretch"
                type="final-stretch"
                tokens={tokens["final-stretch"]}
                onBuyToken={handleBuyToken}
                isLoading={isLoading}
              />
            </ErrorBoundary>
          </div>

          {/* Column 3 - Migrated */}
          <div className="h-full overflow-hidden flex flex-col">
            <ErrorBoundary>
              <PulseColumn
                title="Migrated"
                type="migrated"
                tokens={tokens["migrated"]}
                onBuyToken={handleBuyToken}
                isLoading={isLoading}
              />
            </ErrorBoundary>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
