"use client";

import React from 'react';
import { Home, BookOpen, User, Sparkles } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: 'dashboard' | 'guide' | 'profile';
  setActiveTab: (tab: 'dashboard' | 'guide' | 'profile') => void;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#1e120c]/95 backdrop-blur-md border-t-2 border-[#8b5a2b] px-6 py-2 flex items-center justify-around shadow-2xl max-w-lg mx-auto rounded-t-3xl sm:rounded-none">
      <button
        onClick={() => setActiveTab('dashboard')}
        className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-2xl transition-all ${
          activeTab === 'dashboard'
            ? 'text-[#f2e3c6] bg-[#8b5a2b] font-bold shadow-md scale-105'
            : 'text-[#dfcbb5]/70 hover:text-[#f2e3c6]'
        }`}
      >
        <Home size={18} />
        <span className="text-[10px] uppercase font-sans tracking-wider">Dashboard</span>
      </button>

      <button
        onClick={() => setActiveTab('guide')}
        className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-2xl transition-all ${
          activeTab === 'guide'
            ? 'text-[#f2e3c6] bg-[#8b5a2b] font-bold shadow-md scale-105'
            : 'text-[#dfcbb5]/70 hover:text-[#f2e3c6]'
        }`}
      >
        <BookOpen size={18} />
        <span className="text-[10px] uppercase font-sans tracking-wider">Logbook</span>
      </button>

      <button
        onClick={() => setActiveTab('profile')}
        className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-2xl transition-all ${
          activeTab === 'profile'
            ? 'text-[#f2e3c6] bg-[#8b5a2b] font-bold shadow-md scale-105'
            : 'text-[#dfcbb5]/70 hover:text-[#f2e3c6]'
        }`}
      >
        <User size={18} />
        <span className="text-[10px] uppercase font-sans tracking-wider">Pirate Card</span>
      </button>
    </nav>
  );
};

export default MobileBottomNav;