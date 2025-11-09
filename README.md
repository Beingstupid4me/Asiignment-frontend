# Axiom Trade - Token Discovery Table

A pixel-perfect replica of Axiom Trade's token discovery table built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- ✅ Three token columns (New Pairs, Final Stretch, Migrated)
- ✅ Real-time price updates with WebSocket mock
- ✅ Interactive elements: popovers, tooltips, modals
- ✅ Smooth color transitions and hover effects
- ✅ Loading states: skeleton, shimmer, progressive loading
- ✅ Error boundaries for robust error handling
- ✅ Fully responsive (320px - desktop)
- ✅ Lighthouse score ≥ 90

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Data Fetching**: React Query (@tanstack/react-query)
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Project Structure

```
axiom_frontend/
├── app/                    # Next.js 14 app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── providers.tsx      # Redux & React Query providers
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── tokens/           # Token-related components
│   └── layout/           # Layout components
├── lib/                   # Utilities and configuration
│   ├── store/            # Redux store
│   ├── hooks/            # Custom React hooks
│   └── utils.ts          # Utility functions
└── types/                # TypeScript type definitions
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```bash
npm run build
npm start
```

## Performance Optimizations

- Memoized components with React.memo
- Optimized re-renders with useMemo and useCallback
- Virtual scrolling for large lists
- Image optimization with Next.js Image
- Code splitting and lazy loading
- Debounced search and filters

## Responsive Breakpoints

- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

## Deliverables

1. ✅ GitHub repository with clean commits
2. 🚀 Vercel deployment (pending)
3. 📹 YouTube demo video (pending)
4. 📱 Responsive layout snapshots (attached below)

## License

This project is for assignment purposes only.
