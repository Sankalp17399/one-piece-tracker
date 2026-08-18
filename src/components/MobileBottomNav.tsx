"use client";

import React from 'react';
import { Compass, BookOpen, Scroll } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: 'dashboard' | 'guide' | 'profile';
  setActiveTab: (tab: 'dashboard' | 'guide' | 'profile') => void;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="md:hidden fixed bottom-3 left-4 right-4 z-40 bg-[#160d08]/95 backdrop-blur-md border border-[#8b5a2b]/40 px-4 py-2 flex items-center justify-around shadow-2xl rounded-2xl">
      <button
        onClick={() => setActiveTab('dashboard')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
          activeTab === 'dashboard'
            ? 'text-[#f5ebd7] bg-[#8b5a2b]/40 border border-[#8b5a2b]/60 font-serif font-bold text-xs shadow-inner'
            : 'text-[#a89083] hover:text-[#f5ebd7] text-xs font-serif'
        }`}
      >
        <Compass size={15} />
        <span>Voyage</span>
      </button>

      <button
        onClick={() => setActiveTab('guide')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
          activeTab === 'guide'
            ? 'text-[#f5ebd7] bg-[#8b5a2b]/40 border border-[#8b5a2b]/60 font-serif font-bold text-xs shadow-inner'
            : 'text-[#a89083] hover:text-[#f5ebd7] text-xs font-serif'
        }`}
      >
        <BookOpen size={15} />
        <span>Logbook</span>
      </button>

      <button
        onClick={() => setActiveTab('profile')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
          activeTab === 'profile'
            ? 'text-[#f5ebd7] bg-[#8b5a2b]/40 border border-[#8b5a2b]/60 font-serif font-bold text-xs shadow-inner'
            : 'text-[#a89083] hover:text-[#f5ebd7] text-xs font-serif'
        }`}
      >
        <Scroll size={15} />
        <span>Bounty</span>
      </button>
    </nav>
  );
};

export default MobileBottomNav;