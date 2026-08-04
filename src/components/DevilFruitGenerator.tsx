"use client";

import React, { useState } from 'react';
import { Sparkles, Dices, Award } from 'lucide-react';

interface DevilFruitGeneratorProps {
  onAssignTitle: (title: string, fruit: string) => void;
}

const EPITHETS = [
  "Straw Hat", "Pirate Hunter", "Cat Burglar", "God", "Black Leg",
  "Cotton Candy Lover", "Demon Child", "Cyborg", "Soul King", "First Son of the Sea",
  "Fire Fist", "Surgeon of Death", "Heavenly Demon", "Red Hair", "Dark King",
  "Sea Devil", "Thunder Lord", "Iron Fist", "Roaring Gale", "Golden Lion"
];

const DEVIL_FRUITS = [
  "Gomu Gomu no Mi (Rubber-Rubber Fruit)",
  "Mera Mera no Mi (Flame-Flame Fruit)",
  "Ope Ope no Mi (Op-Op Fruit)",
  "Gura Gura no Mi (Tremor-Tremor Fruit)",
  "Glint-Glint Fruit (Pika Pika no Mi)",
  "Hito Hito no Mi, Model: Nika",
  "Yami Yami no Mi (Dark-Dark Fruit)",
  "Tori Tori no Mi, Model: Phoenix",
  "Ito Ito no Mi (String-String Fruit)",
  "Goro Goro no Mi (Rumble-Rumble Fruit)",
  "Moku Moku no Mi (Smoke-Smoke Fruit)",
  "Hana Hana no Mi (Flower-Flower Fruit)",
  "Yomi Yomi no Mi (Revive-Revive Fruit)",
  "Suna Suna no Mi (Sand-Sand Fruit)",
  "Uo Uo no Mi, Model: Seiryu (Azure Dragon)"
];

const DevilFruitGenerator: React.FC<DevilFruitGeneratorProps> = ({ onAssignTitle }) => {
  const [currentEpithet, setCurrentEpithet] = useState<string>("Pirate Rookie");
  const [currentFruit, setCurrentFruit] = useState<string>("None Awakened");

  const rollTitle = () => {
    const randomEpithet = EPITHETS[Math.floor(Math.random() * EPITHETS.length)];
    const randomFruit = DEVIL_FRUITS[Math.floor(Math.random() * DEVIL_FRUITS.length)];
    
    setCurrentEpithet(randomEpithet);
    setCurrentFruit(randomFruit);
    onAssignTitle(randomEpithet, randomFruit);
  };

  return (
    <div className="bg-[#f2e3c6] border-4 border-[#8b5a2b] rounded-xl p-5 shadow-xl font-serif">
      <div className="flex items-center justify-between border-b-2 border-[#8b5a2b] pb-2 mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="text-[#8b5a2b]" size={20} />
          <h3 className="font-bold text-base text-[#3e2723]">Grand Line Title & Fruit</h3>
        </div>
        <button
          onClick={rollTitle}
          className="flex items-center gap-1 bg-[#8b5a2b] hover:bg-[#a16e3f] text-[#f2e3c6] px-3 py-1 rounded-lg text-xs font-sans font-bold shadow transition-all active:scale-95"
        >
          <Dices size={14} /> Roll Title
        </button>
      </div>

      <div className="space-y-2 font-sans text-xs">
        <div className="bg-[#dfcbb5] p-2.5 rounded-lg border border-[#8b5a2b]">
          <p className="text-[10px] uppercase font-bold text-[#5d4037]">Pirate Epithet / Title</p>
          <p className="font-bold text-sm text-[#3e2723] flex items-center gap-1.5 mt-0.5">
            <Award size={14} className="text-[#8b5a2b]" /> "{currentEpithet}"
          </p>
        </div>

        <div className="bg-[#dfcbb5] p-2.5 rounded-lg border border-[#8b5a2b]">
          <p className="text-[10px] uppercase font-bold text-[#5d4037]">Eaten Devil Fruit</p>
          <p className="font-bold text-xs text-[#3e2723] mt-0.5">
            🍎 {currentFruit}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DevilFruitGenerator;