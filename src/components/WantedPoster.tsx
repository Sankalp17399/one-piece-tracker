"use client";

import React from 'react';
import { getCurrentBounty, getUnlockedCrew } from '@/data/onePieceProgression';

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
    <div className="bg-[#1c120c] border border-white/10 rounded-2xl p-6 text-white font-sans space-y-5 shadow-sm max-w-sm mx-auto">
      {/* Header */}
      <div className="text-center space-y-1">
        <span className="text-[10px] tracking-widest text-amber-500 uppercase font-semibold">Marine Official</span>
        <h2 className="text-3xl font-black tracking-widest text-white uppercase font-mono">WANTED</h2>
      </div>

      {/* Portrait Box */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center space-y-2">
        <div className="w-16 h-16 mx-auto bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center text-xl font-bold border border-amber-500/30">
          {username[0] || 'C'}
        </div>
        <div>
          <h3 className="font-semibold text-base text-white truncate">{username}</h3>
          <p className="text-xs text-white/40">{location}</p>
        </div>
      </div>

      {/* Bounty */}
      <div className="text-center space-y-1">
        <span className="text-[10px] uppercase text-white/40 font-semibold tracking-wider">Current Bounty</span>
        <p className="text-2xl font-black font-mono tracking-tight text-amber-400">
          ฿ {currentBountyMilestone.formattedBounty}
        </p>
      </div>

      {/* Crew summary pill */}
      <button
        onClick={onOpenCrewRoster}
        className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 flex items-center justify-between text-xs text-white/80 transition-all"
      >
        <span className="font-medium">Crew Recruited</span>
        <span className="font-mono text-amber-400">{unlockedCrew.length} / 10 →</span>
      </button>

      {/* Minimal Footer Stats */}
      <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2 text-center text-xs">
        <div className="bg-white/5 p-2 rounded-xl">
          <p className="font-mono font-semibold text-white">{completedCount}</p>
          <p className="text-[10px] text-white/40">Arcs Finished</p>
        </div>
        <div className="bg-white/5 p-2 rounded-xl">
          <p className="font-mono font-semibold text-white">{totalArcs - completedCount}</p>
          <p className="text-[10px] text-white/40">Arcs Left</p>
        </div>
        <div className="col-span-2 text-[11px] text-white/30 pt-1">
          Sailing since {joinedDate}
        </div>
      </div>
    </div>
  );
};

export default WantedPoster;