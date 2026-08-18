"use client";

import React from 'react';
import { Compass, BookOpen, Scroll } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: 'dashboard' | 'guide' | 'profile';
  setActiveTab: (tab: 'dashboard' | 'guide' | 'profile') => void;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#160d08]/95 backdrop-blur-md border-t border-[#8b5a2b]/30 px-6 py-2.5 flex items-center justify-around shadow-2xl max-w-lg mx-auto sm:rounded-t-2xl">
      <button
        onClick={() => setActiveTab('dashboard')}
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl transition-all ${
          activeTab === 'dashboard'
            ? 'text-[#f5ebd7] bg-[#8b5a2b]/30 border border-[#8b5a2b]/50 font-serif font-bold text-xs shadow-inner'
            : 'text-[#9c8274] hover:text-[#f5ebd7] text-xs font-serif'
        }`}
      >
        <Compass size={16} />
        <span>Voyage</span>
      </button>

      <button
        onClick={() => setActiveTab('guide')}
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl transition-all ${
          activeTab === 'guide'
            ? 'text-[#f5ebd7] bg-[#8b5a2b]/30 border border-[#8b5a2b]/50 font-serif font-bold text-xs shadow-inner'
            : 'text-[#9c8274] hover:text-[#f5ebd7] text-xs font-serif'
        }`}
      >
        <BookOpen size={16} />
        <span>Logbook</span>
      </button>

      <button
        onClick={() => setActiveTab('profile')}
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl transition-all ${
          activeTab === 'profile'
            ? 'text-[#f5ebd7] bg-[#8b5a2b]/30 border border-[#8b5a2b]/50 font-serif font-bold text-xs shadow-inner'
            : 'text-[#9c8274] hover:text-[#f5ebd7] text-xs font-serif'
        }`}
      >
        <Scroll size={16} />
        <span>Bounty</span>
      </button>
    </nav>
  );
};

export default MobileBottomNav;