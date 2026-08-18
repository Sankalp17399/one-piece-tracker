"use client";

import React from 'react';
import { Compass, Navigation } from 'lucide-react';

interface SailingMapProps {
  progress: number;
  currentArc: string;
}

const SailingMap: React.FC<SailingMapProps> = ({ progress, currentArc }) => {
  const milestones = [
    { name: "East Blue", pos: 8 },
    { name: "Alabasta", pos: 25 },
    { name: "Skypiea", pos: 42 },
    { name: "Water 7", pos: 58 },
    { name: "Marineford", pos: 72 },
    { name: "Wano", pos: 88 },
    { name: "Egghead", pos: 98 }
  ];

  return (
    <div className="relative w-full bg-[#f6f0de] border-2 border-[#8b5a2b]/40 rounded-2xl p-4 sm:p-6 shadow-md overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#8b5a2b]/20 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Compass className="text-[#6e4624]" size={18} />
          <h3 className="font-serif text-sm sm:text-base font-bold text-[#2b1810] tracking-wide uppercase">
            Grand Line Sea Chart Navigation
          </h3>
        </div>
        <div className="text-xs font-mono font-bold text-[#6e4624] bg-[#ede2ca] px-3 py-1 rounded-full border border-[#8b5a2b]/20">
          {Math.round(progress)}% Conquered
        </div>
      </div>

      {/* Sea Route Progress Track */}
      <div className="relative py-4 overflow-x-auto scrollbar-none">
        <div className="min-w-[550px] md:min-w-full relative h-14 flex items-center">
          {/* Faint Dotted Sea Route */}
          <div className="absolute left-3 right-3 h-0.5 border-t-2 border-dashed border-[#cbb399]" />
          
          {/* Inked Progress Line */}
          <div 
            className="absolute left-3 h-0.5 bg-[#6e4624] transition-all duration-700"
            style={{ width: `${progress}%` }}
          />

          {/* Key Port Markers */}
          {milestones.map((m, idx) => {
            const isReached = progress >= m.pos;
            return (
              <div 
                key={idx} 
                className="absolute flex flex-col items-center -translate-x-1/2 transition-all duration-300"
                style={{ left: `${m.pos}%` }}
              >
                <div className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all ${
                  isReached 
                    ? 'bg-[#6e4624] border-[#2b1810] text-[#f6f0de] shadow-sm scale-110' 
                    : 'bg-[#ede2ca] border-[#cbb399] text-[#8b5a2b]'
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${isReached ? 'bg-[#f6f0de]' : 'bg-[#a1887f]'}`} />
                </div>
                <span className={`text-[10px] sm:text-[11px] font-serif mt-1.5 whitespace-nowrap ${
                  isReached ? 'text-[#2b1810] font-bold' : 'text-[#8b5a2b]/70 font-medium'
                }`}>
                  {m.name}
                </span>
              </div>
            );
          })}

          {/* Sloop marker */}
          <div 
            className="absolute -translate-x-1/2 -translate-y-5 transition-all duration-700 ease-out"
            style={{ left: `${Math.max(5, Math.min(95, progress))}%` }}
          >
            <div className="bg-[#2b1810] text-[#f6f0de] p-1.5 rounded-full shadow-lg border-2 border-[#8b5a2b]">
              <Navigation size={13} className="rotate-45 fill-current" />
            </div>
          </div>
        </div>
      </div>
      
      {currentArc && (
        <div className="mt-2 bg-[#ede2ca]/60 border border-[#8b5a2b]/20 rounded-xl py-2 px-3 flex items-center justify-between text-xs font-serif text-[#6e4624]">
          <span>Current Territorial Waters:</span>
          <span className="font-bold text-[#2b1810] bg-[#f6f0de] px-2.5 py-0.5 rounded border border-[#8b5a2b]/30">
            {currentArc}
          </span>
        </div>
      )}
    </div>
  );
};

export default SailingMap;