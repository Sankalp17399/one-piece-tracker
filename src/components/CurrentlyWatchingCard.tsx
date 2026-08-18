"use client";

import React from 'react';
import { Plus, Minus, Check, ChevronRight, BookOpen } from 'lucide-react';
import { CANON_CREW_MEMBERS } from '@/data/onePieceProgression';

interface CurrentlyWatchingCardProps {
  arcId: string;
  arcTitle: string;
  arcEpisodes: string;
  arcDescription: string;
  currentEpisode: number;
  onIncrementEpisode: () => void;
  onDecrementEpisode: () => void;
  onCompleteArc: () => void;
  onOpenLogbook: () => void;
  onOpenCrewRoster: () => void;
}

const CurrentlyWatchingCard: React.FC<CurrentlyWatchingCardProps> = ({
  arcId,
  arcTitle,
  arcEpisodes,
  currentEpisode,
  onIncrementEpisode,
  onDecrementEpisode,
  onCompleteArc,
  onOpenLogbook,
  onOpenCrewRoster
}) => {
  const newRecruit = CANON_CREW_MEMBERS.find(m => m.joinedArcId === arcId);

  return (
    <div className="bg-[#f3e5c8] border-[3px] border-[#9c6a3b]/80 rounded-2xl p-5 text-[#341d10] font-serif relative shadow-[0_12px_30px_rgba(0,0,0,0.45),inset_0_0_25px_rgba(139,90,43,0.15)] overflow-hidden space-y-4">
      {/* Subtle vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(100,50,15,0.12)_100%)]" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#dfc59e] border border-[#8b5a2b] flex items-center justify-center text-[#5a3314] shadow-inner">
            <BookOpen size={15} />
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-[#7a5433]">Active Sea Journal</span>
            <h2 className="text-lg font-bold text-[#2a1306] leading-tight">{arcTitle}</h2>
          </div>
        </div>
        <span className="text-xs font-mono font-bold text-[#5a3314] bg-[#dfcaa5] px-2 py-0.5 rounded-md border border-[#8b5a2b]/30">
          {arcEpisodes}
        </span>
      </div>

      {newRecruit && (
        <button 
          onClick={onOpenCrewRoster}
          className="relative z-10 text-xs text-[#8c1d18] hover:text-[#5c0f0b] font-bold flex items-center gap-1 transition-colors"
        >
          <span>{newRecruit.avatarIcon} Recruits {newRecruit.name}</span>
          <ChevronRight size={12} />
        </button>
      )}

      {/* Tactile Episode Stepper Box */}
      <div className="relative z-10 bg-[#e8d5b3] border border-[#8b5a2b]/60 rounded-xl p-3.5 flex items-center justify-between shadow-inner">
        <div>
          <span className="text-[9px] text-[#7a5433] uppercase tracking-wider font-bold">Current Entry</span>
          <p className="text-2xl font-black font-mono tracking-tight text-[#2b1407]">Ep {currentEpisode}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onDecrementEpisode}
            className="w-9 h-9 rounded-xl bg-[#dfcaa5] hover:bg-[#d5bc93] active:scale-95 text-[#3a2010] border border-[#8b5a2b] flex items-center justify-center font-bold shadow-sm transition-all"
            aria-label="Previous episode"
          >
            <Minus size={15} />
          </button>

          <button
            onClick={onIncrementEpisode}
            className="h-9 px-4 rounded-xl bg-[#8b5a2b] hover:bg-[#74481f] active:scale-95 text-[#f7eedc] font-sans font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
          >
            <Plus size={15} />
            <span>Next Ep</span>
          </button>
        </div>
      </div>

      {/* Action Footer */}
      <div className="relative z-10 flex items-center gap-2 pt-0.5">
        <button
          onClick={onCompleteArc}
          className="flex-1 bg-[#dfcaa5] hover:bg-[#d5bc93] active:scale-98 text-[#2b1407] text-xs font-bold py-2.5 rounded-xl border border-[#8b5a2b]/60 transition-all flex items-center justify-center gap-1.5 shadow-sm"
        >
          <Check size={14} className="text-[#8c1d18]" />
          <span>Mark Arc Completed</span>
        </button>

        <button
          onClick={onOpenLogbook}
          className="px-4 py-2.5 bg-[#f3e5c8] hover:bg-[#e8d5b3] text-[#5a3314] text-xs font-bold rounded-xl transition-all border border-[#8b5a2b]/50"
        >
          Change
        </button>
      </div>
    </div>
  );
};

export default CurrentlyWatchingCard;