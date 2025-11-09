# Axiom Trade - Token Discovery Table

A pixel-perfect replica of Axiom Trade's token discovery table built with Next.js 14, TypeScript, and Tailwind CSS.

## 🎯 Project Overview

This is a frontend dashboard for a cryptocurrency analytics platform called 'Axiom Pro'. The dashboard, named 'Pulse', displays real-time data for new and trending token pairs on the Solana (SOL) network.

## ✨ Features

- ✅ **Three-Column Layout**: New Pairs, Final Stretch, and Migrated sections
- ✅ **Real-time Updates**: WebSocket mock simulation for live price updates
- ✅ **Interactive Elements**: Tooltips, popovers, and hover effects
- ✅ **Independent Scrolling**: Each column scrolls independently with lazy loading
- ✅ **Smooth Animations**: Color transitions for price changes
- ✅ **Fixed Header/Footer**: Navigation stays accessible while scrolling
- ✅ **Dark Theme**: Professional dark UI matching the design
- 🚧 **Redux State Management**: (In progress)
- 🚧 **Loading States**: Skeleton loaders and shimmer effects (Partially implemented)
- 🚧 **Fully Responsive**: 320px - desktop (In progress)
- 🚧 **Lighthouse Optimized**: Target ≥ 90 score (Pending testing)

## 🛠️ Tech Stack

- **Framework**: Next.js 14.0.4 (App Router)
- **Language**: TypeScript 5.x (strict mode)
- **Styling**: Tailwind CSS 3.3.0
- **State Management**: Redux Toolkit 2.0.1
- **Data Fetching**: React Query (@tanstack/react-query 5.90.7)
- **UI Components**: Radix UI + Custom Components
- **Icons**: Lucide React
- **Animations**: CSS Transitions + Framer Motion

## 📁 Project Structure

```
axiom_frontend/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Main Pulse dashboard page
│   ├── providers.tsx       # Redux & React Query providers
│   └── globals.css         # Global styles + dark theme
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Fixed header with navigation
│   │   └── Footer.tsx      # Fixed footer with stats
│   ├── tokens/
│   │   ├── TokenCard.tsx   # Individual token pair card
│   │   ├── PulseColumn.tsx # Column component with scrolling
│   │   ├── PercentageChange.tsx
│   │   ├── MetricIcon.tsx
│   │   └── SolButton.tsx
│   └── ui/                 # Reusable UI primitives
│       ├── button.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       └── tooltip.tsx
├── lib/
│   ├── store/
│   │   ├── index.ts        # Redux store configuration
│   │   └── hooks.ts        # Typed Redux hooks
│   ├── mock-data.ts        # Mock data generator & WebSocket
│   └── utils.ts            # Utility functions
├── types/
│   └── token.ts            # TypeScript interfaces
└── .vscode/
    ├── settings.json       # VS Code configuration
    └── extensions.json     # Recommended extensions
```

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Build

```bash
npm run build
npm start
```

## 🎨 Key Components

### TokenCard
Displays individual token information including:
- Token avatar with fallback
- Name, symbol, and ticker
- Market cap and volume
- Real-time metrics (holders, transactions, liquidity)
- Percentage changes across multiple timeframes
- Action button with SOL amount

### PulseColumn
Container for token lists with:
- Independent scrolling
- Lazy loading on scroll
- Filter buttons (P1, P2, P3)
- Loading skeletons
- Empty state handling

### Header
Fixed navigation bar featuring:
- Logo and navigation links
- Search bar with keyboard shortcut
- Network selector (SOL)
- Deposit button
- User actions and notifications

### Footer
Status bar showing:
- Preset selector
- Social links
- Real-time stats
- Connection status
- Global selector

## 📊 Mock Data

The application uses a sophisticated mock data generator that:
- Creates realistic token pairs with random data
- Simulates WebSocket connections for real-time updates
- Updates prices every 2-5 seconds
- Maintains data consistency across categories

## 🎯 Performance Optimizations

- ✅ Memoized components with React.memo
- ✅ Optimized re-renders with proper component structure
- ✅ Lazy loading for token lists
- ✅ Custom scrollbar with minimal footprint
- 🚧 Virtual scrolling (Planned)
- 🚧 Image optimization (In progress)
- 🚧 Code splitting (Planned)

## 📱 Responsive Breakpoints

- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

(Responsive implementation in progress)

## 🎨 Design Details

### Color Palette
- Background: `#0a0a0a` (Main dark)
- Cards: `#141414` (Slightly lighter)
- Borders: `#1f1f1f` / `rgba(gray-800/50)`
- Primary: Blue 600 (`#2563eb`)
- Success: Green 500 (`#22c55e`)
- Danger: Red 500 (`#ef4444`)
- Warning: Orange 500 (`#f97316`)

### Typography
- Font Family: Inter (Google Fonts)
- Headings: font-semibold to font-bold
- Body: font-normal to font-medium

## 🚧 Next Steps

1. **Implement Redux State Management**
   - Create token slice for managing all tokens
   - Add filters and sorting logic
   - Handle WebSocket updates through Redux

2. **Add Loading States**
   - Enhance skeleton loaders
   - Add shimmer effects
   - Implement error boundaries

3. **Make Fully Responsive**
   - Mobile-first approach
   - Tablet layout adjustments
   - Desktop optimization

4. **Performance Testing**
   - Run Lighthouse audits
   - Optimize images and assets
   - Implement virtual scrolling for large lists

5. **Polish & Refinement**
   - Add more interactive elements
   - Implement modal dialogs
   - Add toast notifications

## 📝 Deliverables

1. ✅ GitHub repository with clean commits
2. 🚀 Vercel deployment (Pending)
3. 📹 YouTube demo video (Pending)
4. 📱 Responsive snapshots (Pending)

## 🤝 Contributing

This is an assignment project. Not open for contributions.

## 📄 License

This project is for assignment purposes only.

