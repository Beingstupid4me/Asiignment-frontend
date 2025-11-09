"use client";

import React from "react";
import Link from "next/link";
import { Search, Bell, Settings, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigationLinks = [
  { label: "Discover", href: "/discover" },
  { label: "Pulse", href: "/", active: true },
  { label: "Trackers", href: "/trackers" },
  { label: "Perpetuals", href: "/perpetuals" },
  { label: "Yield", href: "/yield" },
  { label: "Vision", href: "/vision" },
  { label: "Portfolio", href: "/portfolio" },
];

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[60px] bg-[#0a0a0a] border-b border-gray-800">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left - Logo and Navigation */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-sm" />
            <span className="text-white font-bold text-lg">AXIOM</span>
            <span className="text-gray-400 text-sm font-medium">Pro</span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-6">
            {navigationLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  link.active
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right - Search, Network, Actions */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search by token or CA..."
              className="w-[280px] h-9 pl-10 pr-4 bg-[#1a1a1a] border border-gray-800 rounded-md text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-[#2a2a2a] border border-gray-700 rounded text-xs text-gray-500">
              /
            </kbd>
          </div>

          {/* Network Selector */}
          <button className="flex items-center gap-2 h-9 px-3 bg-[#1a1a1a] border border-gray-800 rounded-md hover:border-gray-700 transition-colors">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-400 to-green-400" />
              <span className="text-sm font-medium text-white">SOL</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {/* Deposit Button */}
          <Button className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors">
            Deposit
          </Button>

          {/* Action Icons */}
          <div className="flex items-center gap-2 pl-2 border-l border-gray-800">
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
              <div className="w-5 h-5 flex items-center justify-center">★</div>
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
              <div className="flex items-center gap-1 text-xs">
                <span className="text-white">📋</span>
                <span className="text-white">≡</span>
                <span className="text-green-500">●</span>
                <span className="text-white">0</span>
              </div>
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
              <User className="w-4 h-4" />
              <ChevronDown className="w-3 h-3 ml-0.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
