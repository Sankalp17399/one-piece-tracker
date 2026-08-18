"use client";

import React from 'react';

interface SailingMapProps {
  currentEpisode: number;
  totalEpisodes?: number;
  currentArcTitle: string;
}

const WAYPOINTS = [
  { name: "Reverse Mtn", ep: 62 },
  { name: "Alabasta", ep: 92 },
  { name: "Skypiea", ep: 153 },
  { name: "Water 7", ep: 227 },
  { name: "Marineford", ep: 457 },
  { name: "Fishman", ep: 523 },
  { name: "Dressrosa", ep: 629 },
  { name: "Wano", ep: 890 },
  { name: "Egghead", ep: 1086 }
];

const SailingMap: React.FC<SailingMapProps> = ({ 
  currentEpisode, 
  totalEpisodes = 1122,
  currentArcTitle 
}) => {
  const percentage = Math.min(100, Math.max(0, (currentEpisode / totalEpisodes) * 100));

  return (
    <div className="bg-[#1c120c] border border-white/10 rounded-2xl p-5 text-white/90 font-sans space-y-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold tracking-wider text-white/40 uppercase">Grand Line Course</span>
          <h3 className="text-base font-medium text-white tracking-tight mt-0.5">{currentArcTitle}</h3>
        </div>
        <div className="text-right">
          <span className="text-sm font-medium font-mono text-white">{percentage.toFixed(1)}%</span>
          <p className="text-[11px] text-white/40 font-mono">Ep {currentEpisode} / {totalEpisodes}</p>
        </div>
      </div>

      {/* Minimal Progress Bar */}
      <div className="space-y-2">
        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden relative">
          <div 
            className="h-full bg-amber-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.max(1, percentage)}%` }}
          />
        </div>

        {/* Minimal key waypoints */}
        <div className="flex items-center justify-between text-[10px] text-white/35 font-mono pt-1">
          <span>East Blue</span>
          <span className="hidden sm:inline">Marineford (457)</span>
          <span className="hidden sm:inline">Wano (890)</span>
          <span>Laugh Tale</span>
        </div>
      </div>

      {/* Next Upcoming Waypoint Tag */}
      {(() => {
        const nextWaypoint = WAYPOINTS.find(w => w.ep > currentEpisode);
        if (!nextWaypoint) return null;
        const epsLeft = nextWaypoint.ep - currentEpisode;
        return (
          <div className="bg-white/5 border border-white/5 rounded-xl px-3.5 py-2 flex items-center justify-between text-xs text-white/60">
            <span>Next landmark: <strong className="text-white font-medium">{nextWaypoint.name}</strong></span>
            <span className="font-mono text-amber-400/90 text-[11px]">in {epsLeft} {epsLeft === 1 ? 'ep' : 'eps'}</span>
          </div>
        );
      })()}
    </div>
  );
};

export default SailingMap;