"use client";

import React from 'react';
import { Compass, Plus, Minus, Check, Play, Sparkles } from 'lucide-react';

interface CurrentlyWatchingCardProps {
  arcTitle: string;
  arcEpisodes: string;
  arcDescription: string;
  currentEpisode: number;
  onIncrementEpisode: () => void;
  onDecrementEpisode: () => void;
  onSetEpisode: (ep: number) => void;
  onCompleteArc: () => void;
  onOpenLogbook: () => void;
}

const CurrentlyWatchingCard: React.FC<CurrentlyWatchingCardProps> = ({
  arcTitle,
  arcEpisodes,
  arcDescription,
  currentEpisode,
  onIncrementEpisode,
  onDecrementEpisode,
  onSetEpisode,
  onCompleteArc,
  onOpenLogbook
}) => {
  return (
    <div className="bg-[#f7f1e1] border-2 border-[#8b5a2b]/40 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3.5 relative overflow-hidden font-serif select-none">
      {/* Decorative Stamp */}
      <div className="flex items-center justify-between border-b border-[#8b5a2b]/20 pb-2">
        <div className="flex items-center gap-1.5 text-[11px] font-sans font-bold uppercase tracking-wider text-[#6e4624]">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>Currently Sailing (Watching)</span>
        </div>
        <span className="text-[10px] font-mono font-bold bg-[#ede2ca] text-[#6e4624] px-2 py-0.5 rounded border border-[#8b5a2b]/20">
          {arcEpisodes}
        </span>
      </div>

      {/* Arc Title & Info */}
      <div className="space-y-1">
        <h3 className="font-bold text-lg text-[#2b1810] leading-snug">{arcTitle}</h3>
        <p className="text-xs text-[#6e4624] font-sans leading-relaxed line-clamp-2">
          {arcDescription}
        </p>
      </div>

      {/* Episode Log Stepper */}
      <div className="bg-[#ede2ca] border border-[#8b5a2b]/30 rounded-xl p-3 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-sans font-bold uppercase text-[#8b5a2b] tracking-wider">
            Current Episode Log
          </p>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-xl font-bold font-mono text-[#2b1810]">
              Ep. {currentEpisode}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onDecrementEpisode}
            className="w-8 h-8 rounded-lg bg-[#f7f1e1] hover:bg-[#dfd0b5] border border-[#8b5a2b]/30 text-[#2b1810] flex items-center justify-center transition-all active:scale-95 shadow-sm"
            title="Previous Episode"
          >
            <Minus size={14} />
          </button>

          <button
            onClick={onIncrementEpisode}
            className="h-8 px-3 rounded-lg bg-[#6e4624] hover:bg-[#573519] text-[#f7f1e1] font-sans text-xs font-bold flex items-center gap-1 transition-all active:scale-95 shadow"
            title="Next Episode (+1)"
          >
            <Plus size={14} />
            <span>+1 Ep</span>
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-1">
        <button
          onClick={onCompleteArc}
          className="flex-1 bg-[#6e4624] hover:bg-[#573519] text-[#f7f1e1] font-sans font-semibold py-2.5 rounded-xl shadow active:scale-98 transition-all flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider"
        >
          <Check size={14} /> Finish Arc
        </button>

        <button
          onClick={onOpenLogbook}
          className="px-3 bg-[#ede2ca] hover:bg-[#dfd0b5] border border-[#8b5a2b]/30 text-[#6e4624] font-sans text-xs font-semibold rounded-xl flex items-center justify-center gap-1 transition-all"
          title="Change Arc"
        >
          <Compass size={14} />
          <span>Switch</span>
        </button>
      </div>
    </div>
  );
};

export default CurrentlyWatchingCard;