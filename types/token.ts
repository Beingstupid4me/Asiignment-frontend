export interface Token {
  id: string;
  name: string;
  symbol: string;
  ticker: string;
  imageUrl: string;
  contractAddress: string;
  createdAt: Date;
}

export interface TokenMetrics {
  marketCap: number;
  volume: number;
  liquidity: number;
  transactions: number;
  holders: number;
  fdv?: number; // Fully Diluted Valuation
}

export interface PercentageChange {
  value: number;
  timeframe: string; // e.g., "5m", "1h", "6h", "24h"
}

export interface TokenPair {
  id: string;
  token: Token;
  metrics: TokenMetrics;
  price: number;
  priceChange: number; // percentage
  percentageChanges: PercentageChange[];
  timeAgo: string; // e.g., "0s", "12s", "13h"
  category: "new-pairs" | "final-stretch" | "migrated";
  solAmount: number;
  featured?: boolean;
  migrationProgress?: number; // 0-100 for Final Stretch
  migrationRatio?: string; // e.g., "77/946", "20/21"
}

export interface PriceUpdate {
  tokenId: string;
  price: number;
  change: number;
  timestamp: Date;
}

export interface ColumnFilter {
  preset: "P1" | "P2" | "P3" | null;
  sortBy: "time" | "marketCap" | "volume" | "priceChange";
  sortOrder: "asc" | "desc";
}

export type ColumnType = "new-pairs" | "final-stretch" | "migrated";
