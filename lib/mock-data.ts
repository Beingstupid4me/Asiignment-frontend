import type { Token, TokenPair, ColumnType } from "@/types/token";

const tokenNames = [
  "Keep4o",
  "petitions",
  "BANANA",
  "1TRENCH",
  "Putrana",
  "El Jefe",
  "xAI",
  "Experiment",
  "SACHI",
  "SORE",
  "squidward",
  "Nostalgia",
];

const tokenSymbols = ["4o", "petitions", "BANANA", "1TRENCH", "Putrana", "JEFE", "XAI", "SHRM", "SACHI", "SORE", "squidward", "Nostalgia"];

const contractPrefixes = ["H9Zj", "rZ83", "EfvE", "CL8g", "HAc4", "DfaZ", "9byn", "5uPm", "Gx2Q", "ud8x"];

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
  const nameIndex = index % tokenNames.length;
  return {
    id: `token-${index}`,
    name: tokenNames[nameIndex],
    symbol: tokenSymbols[nameIndex],
    ticker: tokenSymbols[nameIndex].replace(/\s+/g, ''),
    imageUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${index}&backgroundColor=1e293b,334155,475569`,
    contractAddress: `${contractPrefixes[index % contractPrefixes.length]}...${randomChoice(["pump", "yMko", "PHbf", "BNKU", "bond", "SPDk", "aoV6"])}`,
    createdAt: new Date(Date.now() - randomInt(0, 86400000)),
  };
}

function generateTimeAgo(): string {
  const seconds = randomInt(0, 86400);
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  return `${Math.floor(seconds / 3600)}h`;
}

function generatePercentageChanges() {
  // Generate 5 percentage changes with varied values
  return [
    { value: randomFloat(-40, 30), timeframe: "" },     // User concentration
    { value: randomFloat(-5, 5), timeframe: "2mo" },    // Lock/vesting
    { value: randomFloat(-5, 15), timeframe: "" },      // Tax/fee
    { value: randomFloat(-2, 2), timeframe: "" },       // Mint function
    { value: randomFloat(-60, 60), timeframe: "" },     // Ownership
  ];
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
