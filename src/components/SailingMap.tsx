"use client";

import React from 'react';
import { Compass, MapPin } from 'lucide-react';

interface SailingMapProps {
  currentEpisode: number;
  totalEpisodes?: number;
  currentArcTitle: string;
}

const WAYPOINTS = [
  { name: "Reverse Mountain", ep: 62 },
  { name: "Alabasta", ep: 92 },
  { name: "Skypiea", ep: 153 },
  { name: "Water 7", ep: 227 },
  { name: "Marineford", ep: 457 },
  { name: "Fishman Island", ep: 523 },
  { name: "Dressrosa", ep: 629 },
  { name: "Wano Country", ep: 890 },
  { name: "Egghead", ep: 1086 }
];

const SailingMap: React.FC<SailingMapProps> = ({ 
  currentEpisode, 
  totalEpisodes = 1122,
  currentArcTitle 
}) => {
  const percentage = Math.min(100, Math.max(0, (currentEpisode / totalEpisodes) * 100));

  return (
    <div className="bg-[#f3e5c8] border-[3px] border-[#9c6a3b]/80 rounded-2xl p-5 text-[#341d10] font-serif relative shadow-[0_12px_30px_rgba(0,0,0,0.45),inset_0_0_25px_rgba(139,90,43,0.15)] overflow-hidden space-y-4">
      {/* Parchment subtle texture */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(100,50,15,0.12)_100%)]" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#dfc59e] border border-[#8b5a2b] flex items-center justify-center text-[#5a3314] shadow-inner">
            <Compass size={16} />
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-[#7a5433]">Grand Line Log</span>
            <h3 className="text-base font-bold text-[#2a1306] leading-tight">{currentArcTitle}</h3>
          </div>
        </div>

        <div className="text-right">
          <span className="text-base font-bold font-mono text-[#8c1d18]">{percentage.toFixed(1)}%</span>
          <p className="text-[10px] text-[#7a5433] font-mono">Ep {currentEpisode} / {totalEpisodes}</p>
        </div>
      </div>

      {/* Nautical Progress Track */}
      <div className="relative z-10 space-y-2">
        <div className="h-2 w-full bg-[#dfcaa5] border border-[#8b5a2b]/40 rounded-full overflow-hidden p-0.5 shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-[#9c6a3b] to-[#8c1d18] rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${Math.max(1.5, percentage)}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[9px] text-[#7a5433] font-mono">
          <span>East Blue</span>
          <span className="hidden sm:inline">Paradise (457)</span>
          <span className="hidden sm:inline">New World (890)</span>
          <span>Laugh Tale</span>
        </div>
      </div>

      {/* Next Upcoming Waypoint Tag */}
      {(() => {
        const nextWaypoint = WAYPOINTS.find(w => w.ep > currentEpisode);
        if (!nextWaypoint) return null;
        const epsLeft = nextWaypoint.ep - currentEpisode;
        return (
          <div className="relative z-10 bg-[#e8d5b3] border border-[#8b5a2b]/50 rounded-xl px-3.5 py-2 flex items-center justify-between text-xs text-[#4a2b13] shadow-inner">
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin size={13} className="text-[#8c1d18]" />
              <span>Next Island: <strong className="text-[#2b1407] font-bold">{nextWaypoint.name}</strong></span>
            </span>
            <span className="font-mono font-bold text-[#8c1d18] text-[11px]">in {epsLeft} eps</span>
          </div>
        );
      })()}
    </div>
  );
};

export default SailingMap;