"use client";

import React from 'react';
import { Anchor, MapPin, Calendar, Award } from 'lucide-react';

interface WantedPosterProps {
  followers: number;
  following: number;
  username: string;
  location: string;
  joinedDate: string;
}

const WantedPoster: React.FC<WantedPosterProps> = ({
  followers = 0,
  following = 0,
  username = "Captain",
  location = "East Blue",
  joinedDate = "Aug 18, 2013"
}) => {
  const bounty = (followers * 30000000).toLocaleString();

  return (
    <div className="relative w-full max-w-sm mx-auto bg-[#f5ebd7] border-4 border-[#6e4624] rounded-2xl p-5 shadow-2xl text-[#2b1810] font-serif select-none">
      {/* Corner Rivets */}
      <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-[#6e4624]" />
      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#6e4624]" />
      <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-[#6e4624]" />
      <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-[#6e4624]" />

      {/* Header */}
      <div className="text-center mb-3">
        <h2 className="text-3xl font-black tracking-widest text-[#2b1810] uppercase border-b-2 border-[#6e4624] pb-0.5">
          WANTED
        </h2>
        <p className="text-[9px] uppercase tracking-widest font-sans font-bold text-[#6e4624] mt-0.5">
          Dead or Alive
        </p>
      </div>

      {/* Portrait box */}
      <div className="relative bg-[#ebe0c7] border-2 border-[#6e4624] p-2 rounded-lg shadow-inner mb-3">
        <div className="aspect-square w-full bg-[#dfd0b5] rounded flex flex-col items-center justify-center border border-dashed border-[#8b5a2b]/60 relative">
          <Anchor className="absolute text-[#8b5a2b]/20 w-28 h-28" />
          
          <div className="relative z-10 text-center">
            <div className="w-16 h-16 mx-auto bg-[#6e4624] rounded-full flex items-center justify-center text-[#f5ebd7] text-2xl font-bold border-2 border-[#f5ebd7] shadow mb-1.5">
              {username[0] || 'C'}
            </div>
            <h3 className="text-base font-bold text-[#2b1810] max-w-[200px] truncate px-2">{username}</h3>
            <p className="text-[11px] text-[#6e4624] font-sans flex items-center justify-center gap-1 mt-0.5">
              <MapPin size={11} /> {location}
            </p>
          </div>
        </div>
      </div>

      {/* Bounty */}
      <div className="text-center space-y-0.5 mb-3">
        <p className="text-[10px] uppercase font-sans font-bold text-[#6e4624]">Bounty</p>
        <p className="text-2xl font-black text-[#8b1e1e] font-mono tracking-wider">
          ฿ {bounty}-
        </p>
        <p className="text-[8px] text-[#6e4624] uppercase tracking-widest">Marine Headquarters</p>
      </div>

      {/* Footer stats */}
      <div className="pt-2.5 border-t border-dashed border-[#8b5a2b]/50 grid grid-cols-2 gap-2 text-center text-xs font-sans">
        <div className="bg-[#ebe0c7] p-1.5 rounded-lg border border-[#8b5a2b]/30">
          <p className="font-bold text-[#2b1810] font-mono">{followers}</p>
          <p className="text-[9px] uppercase text-[#6e4624]">Arcs Conquered</p>
        </div>
        <div className="bg-[#ebe0c7] p-1.5 rounded-lg border border-[#8b5a2b]/30">
          <p className="font-bold text-[#2b1810] font-mono">{following}</p>
          <p className="text-[9px] uppercase text-[#6e4624]">Uncharted Waters</p>
        </div>
        <div className="col-span-2 text-[10px] text-[#6e4624] font-serif flex items-center justify-center gap-1 mt-0.5">
          <Calendar size={11} /> Since {joinedDate}
        </div>
      </div>
    </div>
  );
};

export default WantedPoster;