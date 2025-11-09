"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/Popover";
import { 
  ShoppingCart, 
  TrendingUp, 
  Star, 
  BarChart3, 
  Share2, 
  Bell,
  ExternalLink,
  Info 
} from "lucide-react";
import { TokenPair } from "@/types/token";

// Lazy load the modal since it's only needed when user clicks
const TokenDetailsModal = dynamic(
  () => import("./TokenDetailsModal").then(mod => ({ default: mod.TokenDetailsModal })),
  { ssr: false }
);

interface TokenActionMenuProps {
  token: TokenPair;
  children: React.ReactNode;
  onBuy?: (tokenId: string) => void;
}

export function TokenActionMenu({ token, children, onBuy }: TokenActionMenuProps) {
  const [open, setOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);

  const actions = [
    {
      icon: Info,
      label: "View Details",
      onClick: () => {
        setModalOpen(true);
        setOpen(false);
      },
      color: "text-blue-400 hover:text-blue-300",
    },
    {
      icon: ShoppingCart,
      label: "Buy Token",
      onClick: () => {
        onBuy?.(token.id);
        setOpen(false);
      },
      color: "text-green-400 hover:text-green-300",
    },
    {
      icon: TrendingUp,
      label: "Sell Token",
      onClick: () => {
        console.log("Sell", token.id);
        setOpen(false);
      },
      color: "text-red-400 hover:text-red-300",
    },
    {
      icon: Star,
      label: "Add to Watchlist",
      onClick: () => {
        console.log("Add to watchlist", token.id);
        setOpen(false);
      },
      color: "text-yellow-400 hover:text-yellow-300",
    },
    {
      icon: BarChart3,
      label: "View Chart",
      onClick: () => {
        console.log("View chart", token.id);
        setOpen(false);
      },
      color: "text-blue-400 hover:text-blue-300",
    },
    {
      icon: Bell,
      label: "Set Price Alert",
      onClick: () => {
        console.log("Set alert", token.id);
        setOpen(false);
      },
      color: "text-purple-400 hover:text-purple-300",
    },
    {
      icon: Share2,
      label: "Share Token",
      onClick: () => {
        console.log("Share", token.id);
        setOpen(false);
      },
      color: "text-gray-400 hover:text-gray-300",
    },
    {
      icon: ExternalLink,
      label: "View on Explorer",
      onClick: () => {
        console.log("View on explorer", token.id);
        setOpen(false);
      },
      color: "text-gray-400 hover:text-gray-300",
    },
  ];

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent align="start" className="w-64">
          <div className="space-y-1">
            <div className="pb-2 border-b border-gray-800/50">
              <p className="text-sm font-semibold text-white">{token.token.name}</p>
              <p className="text-xs text-gray-400">{token.token.symbol}/SOL</p>
            </div>
            
            <div className="space-y-0.5 pt-2">
              {actions.map((action) => (
                <button
                  key={action.label}
                  onClick={action.onClick}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-gray-800/50 transition-colors text-left"
                >
                  <action.icon className={`w-4 h-4 ${action.color}`} />
                  <span className="text-sm text-gray-200">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
      
      <TokenDetailsModal 
        token={token} 
        open={modalOpen} 
        onOpenChange={setModalOpen} 
      />
    </>
  );
}
