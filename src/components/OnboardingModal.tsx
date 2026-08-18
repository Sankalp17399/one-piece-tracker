"use client";

import React, { useState } from 'react';
import { Anchor, Sparkles, Feather, Compass, CheckCircle2, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: (data: {
    name: string;
    location: string;
    title: string;
    fruit: string;
  }) => void;
}

const STARTING_SEAS = [
  "East Blue (Sea of Peace)",
  "North Blue (Sea of Science)",
  "West Blue (Sea of Honor)",
  "South Blue (Sea of Inventors)"
];

const INITIAL_TITLES = [
  "Rookie Adventurer",
  "Straw Hat Dreamer",
  "Swordsman of the Seas",
  "Master Navigator",
  "Sea Thief"
];

const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onComplete }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState('');
  const [location, setLocation] = useState(STARTING_SEAS[0]);
  const [title, setTitle] = useState(INITIAL_TITLES[0]);

  if (!isOpen) return null;

  const handleFinish = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });

    onComplete({
      name: name.trim() || 'Captain',
      location: location.split(' (')[0],
      title,
      fruit: 'Unawakened'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-[#f7f1e1] border-4 border-[#6e4624] rounded-3xl p-6 sm:p-8 shadow-2xl text-[#2b1810] font-serif relative overflow-hidden">
        {/* Subtle vintage parchment texture vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#8b5a2b_1px,transparent_1px)] opacity-5 [background-size:12px_12px]" />
        
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className={`h-1.5 rounded-full transition-all duration-300 ${step >= 1 ? 'w-8 bg-[#8b5a2b]' : 'w-2 bg-[#d7c4a8]'}`} />
          <div className={`h-1.5 rounded-full transition-all duration-300 ${step >= 2 ? 'w-8 bg-[#8b5a2b]' : 'w-2 bg-[#d7c4a8]'}`} />
          <div className={`h-1.5 rounded-full transition-all duration-300 ${step >= 3 ? 'w-8 bg-[#8b5a2b]' : 'w-2 bg-[#d7c4a8]'}`} />
        </div>

        {/* STEP 1: Captain Signature */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto bg-[#8b5a2b]/15 text-[#6e4624] rounded-2xl flex items-center justify-center border border-[#8b5a2b]/30">
                <Feather size={24} />
              </div>
              <h2 className="text-2xl font-bold text-[#2b1810]">Inscribe Your Name</h2>
              <p className="text-xs text-[#6e4624] font-sans">
                Every great journey across the Grand Line begins with a captain signing their journal.
              </p>
            </div>

            <div className="space-y-1 pt-2">
              <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-[#6e4624]">
                Captain / Navigator Name
              </label>
              <input
                type="text"
                placeholder="e.g. Monkey D. Luffy or your alias"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                className="w-full px-4 py-3 bg-[#ede2ca] border-2 border-[#8b5a2b]/40 rounded-2xl text-sm font-serif font-bold text-[#2b1810] placeholder-[#8b5a2b]/50 focus:outline-none focus:border-[#6e4624]"
              />
            </div>

            <button
              onClick={() => {
                if (!name.trim()) setName('Captain');
                setStep(2);
              }}
              className="w-full mt-4 bg-[#6e4624] hover:bg-[#573519] text-[#f7f1e1] font-sans font-semibold py-3.5 rounded-2xl shadow-lg flex items-center justify-center gap-2 text-xs uppercase tracking-wider active:scale-98 transition-all"
            >
              <span>Next: Set Port of Origin</span>
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* STEP 2: Sea Selection */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto bg-[#8b5a2b]/15 text-[#6e4624] rounded-2xl flex items-center justify-center border border-[#8b5a2b]/30">
                <Compass size={24} />
              </div>
              <h2 className="text-2xl font-bold text-[#2b1810]">Port of Departure</h2>
              <p className="text-xs text-[#6e4624] font-sans">
                Choose the sea where your ship first raised its pirate sail.
              </p>
            </div>

            <div className="space-y-2 pt-1">
              {STARTING_SEAS.map((seaOption) => {
                const isSelected = location === seaOption;
                return (
                  <button
                    key={seaOption}
                    onClick={() => setLocation(seaOption)}
                    className={`w-full p-3 text-left rounded-2xl border transition-all text-xs font-serif flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#ede2ca] border-[#6e4624] font-bold text-[#2b1810] shadow-sm'
                        : 'bg-[#f7f1e1] border-[#8b5a2b]/20 text-[#6e4624] hover:bg-[#ede2ca]/50'
                    }`}
                  >
                    <span>{seaOption}</span>
                    {isSelected && <CheckCircle2 size={16} className="text-[#6e4624]" />}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-3 rounded-2xl border border-[#8b5a2b]/40 font-sans text-xs font-semibold text-[#6e4624]"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 bg-[#6e4624] hover:bg-[#573519] text-[#f7f1e1] font-sans font-semibold py-3.5 rounded-2xl shadow-lg flex items-center justify-center gap-2 text-xs uppercase tracking-wider active:scale-98 transition-all"
              >
                <span>Next: Claim Title</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Epithet & Oath */}
        {step === 3 && (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto bg-[#8b5a2b]/15 text-[#6e4624] rounded-2xl flex items-center justify-center border border-[#8b5a2b]/30">
                <Anchor size={24} />
              </div>
              <h2 className="text-2xl font-bold text-[#2b1810]">Claim Your Epithet</h2>
              <p className="text-xs text-[#6e4624] font-sans">
                How shall rumors of your voyage spread across the seas?
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2 pt-1">
              {INITIAL_TITLES.map((t) => {
                const isSelected = title === t;
                return (
                  <button
                    key={t}
                    onClick={() => setTitle(t)}
                    className={`w-full px-4 py-2.5 text-left rounded-xl border text-xs font-serif transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#ede2ca] border-[#6e4624] font-bold text-[#2b1810]'
                        : 'bg-[#f7f1e1] border-[#8b5a2b]/20 text-[#6e4624]'
                    }`}
                  >
                    <span>"{t}"</span>
                    {isSelected && <Sparkles size={14} className="text-[#6e4624]" />}
                  </button>
                );
              })}
            </div>

            <div className="bg-[#ede2ca] p-3 rounded-2xl border border-[#8b5a2b]/30 text-[11px] font-serif text-[#6e4624] italic text-center">
              "To the sea, freedom, and whatever lies at the end of the Grand Line."
            </div>

            <button
              onClick={handleFinish}
              className="w-full bg-[#6e4624] hover:bg-[#573519] text-[#f7f1e1] font-sans font-bold py-3.5 rounded-2xl shadow-xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider active:scale-98 transition-all"
            >
              <span>Seal & Open Logbook</span>
              <Sparkles size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingModal;