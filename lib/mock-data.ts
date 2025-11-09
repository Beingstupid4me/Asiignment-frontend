import type { Token, TokenPair, ColumnType } from "@/types/token";

const tokenNames = [
  "Brady Red Pill Mr Beast",
  "crazy i just found something crazy",
  "DAKOTA",
  "bundlecoin i just found something crazy",
  "El Jefe El Jefe Pequeno",
  "xAI",
  "Experiment The Mushroom Experiment",
  "GIGA GIGA COIN",
  "Tiberius Tiberius Coin",
  "ZOLANACHAN Zolana-Chan",
  "MrBeast2.0 Brady Penfield",
];

const tokenSymbols = ["BRADY", "CRAZY", "DAKOTA", "BUNDLE", "JEFE", "XAI", "SHRM", "GIGA", "TIB", "ZOLA", "BEAST"];

const contractPrefixes = ["FrGY", "5D9s", "HAc4", "6co8", "DfaZ", "9byn", "03EH", "5Q3a", "3Jzq", "Cf3H"];

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateToken(index: number): Token {
  return {
    id: `token-${index}`,
    name: tokenNames[index % tokenNames.length],
    symbol: tokenSymbols[index % tokenSymbols.length],
    ticker: tokenSymbols[index % tokenSymbols.length],
    imageUrl: `https://api.dicebear.com/7.x/shapes/svg?seed=${index}&backgroundColor=1e293b`,
    contractAddress: `${contractPrefixes[index % contractPrefixes.length]}_${randomChoice(["pump", "yMko", "rB6V", "qwrx"])}`,
    createdAt: new Date(Date.now() - randomInt(0, 86400000)), // Within last 24h
  };
}

function generateTimeAgo(): string {
  const seconds = randomInt(0, 86400);
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  return `${Math.floor(seconds / 3600)}h`;
}

function generatePercentageChanges() {
  return [
    { value: randomFloat(-50, 50), timeframe: "5m" },
    { value: randomFloat(-30, 70), timeframe: "1h" },
    { value: randomFloat(-20, 100), timeframe: "6h" },
    { value: randomFloat(-10, 150), timeframe: "24h" },
  ].slice(0, randomInt(2, 4));
}

export function generateTokenPair(index: number, category: ColumnType): TokenPair {
  const token = generateToken(index);
  const marketCap = randomFloat(1000, 500000);
  const volume = randomFloat(0, marketCap * 0.3);

  return {
    id: `pair-${category}-${index}`,
    token,
    metrics: {
      marketCap,
      volume,
      liquidity: randomFloat(0, 10000),
      transactions: randomInt(0, 1000),
      holders: randomInt(0, 500),
    },
    price: randomFloat(0, 1000),
    priceChange: randomFloat(-50, 100),
    percentageChanges: generatePercentageChanges(),
    timeAgo: generateTimeAgo(),
    category,
    solAmount: randomChoice([0, 0.037, 0.025, 0.011, 0.5]),
    featured: Math.random() > 0.8,
    migrationProgress: category === "final-stretch" ? randomInt(50, 99) : undefined,
    migrationRatio: category === "final-stretch" 
      ? `${randomInt(10, 80)}/${randomInt(100, 1000)}` 
      : category === "migrated" 
      ? `${randomInt(1, 5)}/${randomInt(1, 5)}`
      : undefined,
  };
}

export function generateMockData(): Record<ColumnType, TokenPair[]> {
  return {
    "new-pairs": Array.from({ length: 15 }, (_, i) => generateTokenPair(i, "new-pairs")),
    "final-stretch": Array.from({ length: 12 }, (_, i) => generateTokenPair(i + 20, "final-stretch")),
    "migrated": Array.from({ length: 18 }, (_, i) => generateTokenPair(i + 40, "migrated")),
  };
}

// WebSocket simulation
export class MockWebSocket {
  private interval: NodeJS.Timeout | null = null;
  private callbacks: ((data: TokenPair[]) => void)[] = [];

  connect(onUpdate: (data: TokenPair[]) => void) {
    this.callbacks.push(onUpdate);

    // Simulate price updates every 2-5 seconds
    this.interval = setInterval(() => {
      const updates = Array.from({ length: randomInt(1, 3) }, (_, i) => {
        const category = randomChoice<ColumnType>(["new-pairs", "final-stretch", "migrated"]);
        return generateTokenPair(randomInt(0, 100), category);
      });

      this.callbacks.forEach(cb => cb(updates));
    }, randomInt(2000, 5000));
  }

  disconnect() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.callbacks = [];
  }
}
