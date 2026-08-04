"use client";

import React from 'react';
import { Compass, Ship, MapPin } from 'lucide-react';

interface SailingMapProps {
  progress: number; // 0 to 100
  currentArc: string;
}

const SailingMap: React.FC<SailingMapProps> = ({ progress, currentArc }) => {
  // Define key milestones along the Grand Line
  const milestones = [
    { name: "East Blue", pos: 5 },
    { name: "Alabasta", pos: 22 },
    { name: "Skypiea", pos: 40 },
    { name: "Water 7", pos: 55 },
    { name: "Marineford", pos: 70 },
    { name: "Wano", pos: 85 },
    { name: "Egghead", pos: 98 }
  ];

  return (
    <div className="relative w-full bg-[#f4eccf] border-4 border-[#8b5a2b] rounded-xl p-6 shadow-xl overflow-hidden select-none">
      {/* Map Background Grid & Compass */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
      <Compass className="absolute right-4 top-4 text-[#8b5a2b] opacity-20 w-24 h-24 animate-[spin_20s_linear_infinite]" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <Ship className="text-[#8b5a2b] animate-bounce" />
          <h3 className="font-serif text-xl font-bold text-[#3e2723]">Grand Line Navigation Map</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-[#8b5a2b] text-[#f4eccf] px-3 py-1 rounded-full text-xs font-bold font-mono">
            Sailing Progress: {Math.round(progress)}%
          </span>
          {currentArc && (
            <span className="bg-[#5d4037] text-[#f4eccf] px-3 py-1 rounded-full text-xs font-bold font-serif">
              Current: {currentArc}
            </span>
          )}
        </div>
      </div>

      {/* The Map Route Line */}
      <div className="relative h-24 flex items-center mt-8 mb-4 overflow-x-auto scrollbar-none">
        <div className="min-w-[600px] w-full relative h-full flex items-center">
          {/* Dotted Sea Route */}
          <div className="absolute left-0 right-0 h-1 border-t-4 border-dashed border-[#a1887f]" />
          
          {/* Completed Route Highlight */}
          <div 
            className="absolute left-0 h-1 bg-[#8b5a2b] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />

          {/* Milestones */}
          {milestones.map((m, idx) => {
            const isReached = progress >= m.pos;
            return (
              <div 
                key={idx} 
                className="absolute flex flex-col items-center -translate-x-1/2 transition-all duration-300"
                style={{ left: `${m.pos}%` }}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isReached 
                    ? 'bg-[#8b5a2b] border-[#3e2723] text-[#f4eccf] scale-110 shadow-md' 
                    : 'bg-[#dfcbb5] border-[#a1887f] text-[#8b5a2b]'
                }`}>
                  <MapPin size={12} />
                </div>
                <span className={`text-[11px] font-serif font-bold mt-1 whitespace-nowrap ${
                  isReached ? 'text-[#3e2723]' : 'text-[#8d6e63]'
                }`}>
                  {m.name}
                </span>
              </div>
            );
          })}

          {/* Animated Ship following progress */}
          <div 
            className="absolute -translate-x-1/2 -translate-y-6 transition-all duration-500 ease-out"
            style={{ left: `${progress}%` }}
          >
            <div className="bg-[#3e2723] text-[#f4eccf] p-2 rounded-full shadow-lg border-2 border-[#8b5a2b] animate-pulse">
              <Ship size={20} className="text-[#f4eccf]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SailingMap;