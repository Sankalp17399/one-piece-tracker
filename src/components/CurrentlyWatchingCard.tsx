"use client";

import React from 'react';
import { Plus, Minus, Check, ChevronRight } from 'lucide-react';
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
    <div className="bg-[#1c120c] border border-white/10 rounded-2xl p-5 text-white font-sans space-y-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-[11px] font-medium text-white/50 uppercase tracking-wider">Current Arc</span>
        </div>
        <span className="text-xs font-mono text-white/40 bg-white/5 px-2 py-0.5 rounded-md">
          {arcEpisodes}
        </span>
      </div>

      <div>
        <h2 className="text-xl font-semibold tracking-tight text-white">{arcTitle}</h2>
        {newRecruit && (
          <button 
            onClick={onOpenCrewRoster}
            className="mt-1 text-xs text-amber-400/90 hover:text-amber-300 flex items-center gap-1 transition-colors"
          >
            <span>{newRecruit.avatarIcon} Recruits {newRecruit.name}</span>
            <ChevronRight size={12} />
          </button>
        )}
      </div>

      {/* Minimal Episode Stepper */}
      <div className="bg-white/5 border border-white/5 rounded-xl p-3.5 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Progress</span>
          <p className="text-2xl font-bold font-mono tracking-tight text-white">Ep {currentEpisode}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onDecrementEpisode}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/15 text-white/80 flex items-center justify-center transition-all active:scale-95"
            aria-label="Previous episode"
          >
            <Minus size={15} />
          </button>

          <button
            onClick={onIncrementEpisode}
            className="h-9 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
          >
            <Plus size={15} />
            <span>Next Ep</span>
          </button>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={onCompleteArc}
          className="flex-1 bg-white/10 hover:bg-white/15 text-white text-xs font-medium py-2.5 rounded-xl transition-all active:scale-98 flex items-center justify-center gap-1.5"
        >
          <Check size={14} className="text-emerald-400" />
          <span>Mark Arc Completed</span>
        </button>

        <button
          onClick={onOpenLogbook}
          className="px-4 py-2.5 bg-transparent hover:bg-white/5 text-white/60 hover:text-white text-xs font-medium rounded-xl transition-all border border-white/10"
        >
          Change
        </button>
      </div>
    </div>
  );
};

export default CurrentlyWatchingCard;