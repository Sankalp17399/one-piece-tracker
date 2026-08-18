"use client";

import React from 'react';
import { Compass, BookOpen, Scroll } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: 'dashboard' | 'guide' | 'profile';
  setActiveTab: (tab: 'dashboard' | 'guide' | 'profile') => void;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
      <div className="bg-[#1a0f08]/95 backdrop-blur-xl border border-[#8b5a2b]/30 px-2 py-1.5 rounded-[9999px] shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_0_1px_rgba(139,90,43,0.15)] flex items-center gap-1">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-[9999px] transition-all duration-200 ${
            activeTab === 'dashboard'
              ? 'text-[#f5ebd7] bg-[#8b5a2b] shadow-[0_4px_16px_rgba(139,90,43,0.4)] font-serif font-bold text-xs'
              : 'text-[#a89083] hover:text-[#f5ebd7] active:text-[#f5ebd7] text-xs font-serif'
          }`}
        >
          <Compass size={16} />
          <span className="hidden sm:inline">Voyage</span>
        </button>

        <button
          onClick={() => setActiveTab('guide')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-[9999px] transition-all duration-200 ${
            activeTab === 'guide'
              ? 'text-[#f5ebd7] bg-[#8b5a2b] shadow-[0_4px_16px_rgba(139,90,43,0.4)] font-serif font-bold text-xs'
              : 'text-[#a89083] hover:text-[#f5ebd7] active:text-[#f5ebd7] text-xs font-serif'
          }`}
        >
          <BookOpen size={16} />
          <span className="hidden sm:inline">Logbook</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-[9999px] transition-all duration-200 ${
            activeTab === 'profile'
              ? 'text-[#f5ebd7] bg-[#8b5a2b] shadow-[0_4px_16px_rgba(139,90,43,0.4)] font-serif font-bold text-xs'
              : 'text-[#a89083] hover:text-[#f5ebd7] active:text-[#f5ebd7] text-xs font-serif'
          }`}
        >
          <Scroll size={16} />
          <span className="hidden sm:inline">Bounty</span>
        </button>
      </div>
    </nav>
  );
};

export default MobileBottomNav;