"use client";

import React from 'react';
import { getCurrentBounty, getUnlockedCrew } from '@/data/onePieceProgression';
import { ShieldAlert, Award, Anchor } from 'lucide-react';

interface WantedPosterProps {
  currentEpisode: number;
  completedCount: number;
  totalArcs: number;
  username: string;
  location: string;
  joinedDate: string;
  onOpenCrewRoster: () => void;
}

const WantedPoster: React.FC<WantedPosterProps> = ({
  currentEpisode = 1,
  completedCount = 0,
  totalArcs = 34,
  username = "Captain",
  location = "East Blue",
  joinedDate = "Aug 18, 2013",
  onOpenCrewRoster
}) => {
  const currentBountyMilestone = getCurrentBounty(currentEpisode);
  const unlockedCrew = getUnlockedCrew(currentEpisode);

  return (
    <div className="relative max-w-sm mx-auto select-none">
      {/* Tactile Aged Parchment Poster */}
      <div className="bg-[#f3e5c8] text-[#341d10] p-6 sm:p-7 rounded-2xl shadow-[0_20px_45px_rgba(0,0,0,0.65),inset_0_0_40px_rgba(139,90,43,0.22)] border-[3px] border-[#9c6a3b]/80 relative overflow-hidden font-serif">
        
        {/* Subtle Paper Grain & Stained Edge Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(100,50,15,0.18)_100%)]" />
        <div className="absolute -inset-1 pointer-events-none opacity-20 bg-[radial-gradient(#5a3212_1px,transparent_1px)] [background-size:10px_10px]" />

        {/* 4 Tactile Brass Corner Pins */}
        <div className="absolute top-3 left-3 w-2.5 h-2.5 rounded-full bg-[#8c6b32] border border-[#d6ad5e] shadow-sm" />
        <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-[#8c6b32] border border-[#d6ad5e] shadow-sm" />
        <div className="absolute bottom-3 left-3 w-2.5 h-2.5 rounded-full bg-[#8c6b32] border border-[#d6ad5e] shadow-sm" />
        <div className="absolute bottom-3 right-3 w-2.5 h-2.5 rounded-full bg-[#8c6b32] border border-[#d6ad5e] shadow-sm" />

        {/* Header Title: WANTED */}
        <div className="text-center relative z-10 space-y-0.5">
          <div className="flex items-center justify-center gap-1.5 text-[9px] uppercase tracking-[0.35em] text-[#784d28] font-bold">
            <Anchor size={11} className="text-[#8b5a2b]" />
            <span>Marine Headquarters</span>
            <Anchor size={11} className="text-[#8b5a2b]" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-[0.25em] text-[#291409] uppercase drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] pt-1">
            WANTED
          </h2>
        </div>

        {/* Portrait Photo Stamp Box */}
        <div className="relative z-10 my-4 bg-[#e8d5b3] border-[3px] border-[#6b4221] rounded-xl p-5 text-center shadow-[inset_0_2px_8px_rgba(0,0,0,0.2)]">
          <div className="w-20 h-20 mx-auto rounded-full bg-[#dfc59e] border-2 border-[#8a572a] shadow-inner flex items-center justify-center text-3xl font-black text-[#44220d]">
            {username[0]?.toUpperCase() || 'C'}
          </div>

          <h3 className="mt-3 text-lg sm:text-xl font-black uppercase text-[#2b1407] tracking-wider truncate">
            {username}
          </h3>
          <p className="text-[11px] text-[#6b482b] font-medium tracking-wide italic">
            "{location}"
          </p>

          {/* Marine Ink Stamp in bottom corner */}
          <div className="absolute bottom-2 right-2 border-2 border-[#9e2a2b]/70 text-[#9e2a2b] text-[8px] font-mono uppercase font-black px-1.5 py-0.5 rounded rotate-[-12deg] tracking-widest pointer-events-none opacity-85">
            GOV AUTH
          </div>
        </div>

        {/* Dead or Alive Ribbon */}
        <div className="relative z-10 text-center py-1 border-y border-[#8b5a2b]/30">
          <p className="text-[11px] tracking-[0.3em] uppercase font-bold text-[#5c371a]">
            DEAD OR ALIVE
          </p>
        </div>

        {/* Big Stamped Bounty Amount */}
        <div className="relative z-10 text-center py-3">
          <p className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-[#8c1d18] drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
            ฿ {currentBountyMilestone.formattedBounty}-
          </p>
        </div>

        {/* Interactive Nakama Manifest Button */}
        <button
          onClick={onOpenCrewRoster}
          className="relative z-10 w-full mt-1 bg-[#dfc7a2] hover:bg-[#d5bb92] active:scale-[0.98] border-2 border-[#8b5a2b] rounded-xl py-2 px-3 flex items-center justify-between text-xs font-bold text-[#3d200e] shadow-sm transition-all"
        >
          <span className="flex items-center gap-1.5">
            <Award size={14} className="text-[#8b5a2b]" />
            <span>Crew Roster</span>
          </span>
          <span className="font-mono bg-[#8b5a2b] text-[#f7eedc] text-[11px] px-2 py-0.5 rounded-md">
            {unlockedCrew.length} / 10
          </span>
        </button>

        {/* Minimal Footer Seal & Date */}
        <div className="relative z-10 pt-3 text-center text-[10px] text-[#7a5433] flex items-center justify-between border-t border-[#8b5a2b]/25 mt-3">
          <span>{completedCount} Arcs Cleared</span>
          <span>Sailing: {joinedDate}</span>
        </div>

      </div>
    </div>
  );
};

export default WantedPoster;