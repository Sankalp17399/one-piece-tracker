"use client";

import React from 'react';
import { Shield, Anchor, Calendar, MapPin, Users } from 'lucide-react';

interface WantedPosterProps {
  followers: number;
  following: number;
  username: string;
  location: string;
  joinedDate: string;
}

const WantedPoster: React.FC<WantedPosterProps> = ({
  followers = 876,
  following = 334,
  username = "Halex",
  location = "USA",
  joinedDate = "Aug 18, 2013"
}) => {
  // Calculate bounty based on followers
  const bounty = (followers * 1000000).toLocaleString();

  return (
    <div className="relative w-full max-w-sm mx-auto bg-[#f2e3c6] border-[12px] border-[#8b5a2b] rounded-lg p-6 shadow-2xl text-[#3e2723] font-serif overflow-hidden select-none transform hover:scale-105 transition-transform duration-300">
      {/* Burnt/aged paper overlay effect */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-20 mix-blend-multiply" />
      <div className="absolute -top-10 -left-10 w-24 h-24 bg-[#8b5a2b] rounded-full opacity-10 blur-xl" />
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#3e2723] rounded-full opacity-15 blur-xl" />

      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="text-4xl font-extrabold tracking-widest text-[#2d1a12] uppercase border-b-4 border-double border-[#5d4037] pb-1">
          WANTED
        </h2>
        <p className="text-xs uppercase tracking-widest font-sans font-bold text-[#5d4037] mt-1">
          Dead or Alive
        </p>
      </div>

      {/* Avatar Frame */}
      <div className="relative bg-[#dfcbb5] border-4 border-[#5d4037] p-3 rounded shadow-inner mb-4">
        <div className="aspect-square w-full bg-[#cbb399] rounded overflow-hidden relative flex items-center justify-center border-2 border-dashed border-[#8b5a2b]">
          {/* Pirate Skull / Anchor Watermark */}
          <Anchor className="absolute text-[#bfa385] w-32 h-32 opacity-30 animate-pulse" />
          
          {/* Character Image Placeholder / Styled Avatar */}
          <div className="relative z-10 text-center p-4">
            <div className="w-24 h-24 mx-auto bg-[#5d4037] rounded-full flex items-center justify-center border-4 border-[#f2e3c6] shadow-lg mb-2">
              <span className="text-3xl font-bold text-[#f2e3c6]">{username[0]}</span>
            </div>
            <h3 className="text-xl font-bold text-[#3e2723]">{username}</h3>
            <p className="text-xs text-[#5d4037] font-sans flex items-center justify-center gap-1 mt-1">
              <MapPin size={12} /> {location}
            </p>
          </div>
        </div>
        
        {/* Corner Rivets */}
        <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-[#5d4037]" />
        <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#5d4037]" />
        <div className="absolute bottom-1 left-1 w-2 h-2 rounded-full bg-[#5d4037]" />
        <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-[#5d4037]" />
      </div>

      {/* Bounty & Stats */}
      <div className="text-center space-y-2">
        <p className="text-xs uppercase tracking-wider text-[#5d4037] font-sans font-semibold">
          Bounty
        </p>
        <p className="text-3xl font-black tracking-wider text-[#7f1d1d] font-mono drop-shadow-sm">
          ฿ {bounty}-
        </p>
        <p className="text-[10px] text-[#5d4037] italic">
          MARINE HEADQUARTERS
        </p>
      </div>

      {/* Pirate Stats Footer */}
      <div className="mt-6 pt-4 border-t border-dashed border-[#8b5a2b] grid grid-cols-2 gap-2 text-xs font-sans text-[#5d4037]">
        <div className="flex items-center gap-1.5 bg-[#dfcbb5] p-1.5 rounded">
          <Users size={14} className="text-[#8b5a2b]" />
          <div>
            <p className="font-bold text-[#3e2723]">{followers}</p>
            <p className="text-[9px] uppercase">Crew Members</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-[#dfcbb5] p-1.5 rounded">
          <Anchor size={14} className="text-[#8b5a2b]" />
          <div>
            <p className="font-bold text-[#3e2723]">{following}</p>
            <p className="text-[9px] uppercase">Allies</p>
          </div>
        </div>
        <div className="col-span-2 flex items-center justify-center gap-1.5 bg-[#dfcbb5] p-1.5 rounded mt-1">
          <Calendar size={14} className="text-[#8b5a2b]" />
          <p className="text-[10px]">Sailing since: <span className="font-bold text-[#3e2723]">{joinedDate}</span></p>
        </div>
      </div>
    </div>
  );
};

export default WantedPoster;