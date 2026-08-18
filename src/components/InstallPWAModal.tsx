"use client";

import React from 'react';
import { Share, PlusSquare, Smartphone, Download, X, Check } from 'lucide-react';

interface InstallPWAModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InstallPWAModal: React.FC<InstallPWAModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as { MSStream?: unknown }).MSStream;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#fdf8eb] border-4 border-[#8b5a2b] rounded-3xl p-6 shadow-2xl text-[#3e2723] font-sans relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-[#8b5a2b] hover:bg-[#dfcbb5] p-2 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-5">
          <div className="w-14 h-14 bg-[#8b5a2b] text-[#f2e3c6] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
            <Smartphone size={28} />
          </div>
          <h3 className="font-serif font-black text-2xl text-[#3e2723]">Install Grand Line App</h3>
          <p className="text-xs text-[#5d4037] font-medium mt-1">
            Save to your home screen for full offline app experience on iOS & Android!
          </p>
        </div>

        {isIOS ? (
          <div className="space-y-3 bg-[#f2e3c6] p-4 rounded-2xl border-2 border-[#8b5a2b] text-xs font-semibold">
            <p className="font-bold text-sm text-[#3e2723] border-b border-[#8b5a2b]/30 pb-2 flex items-center gap-2">
              <Share size={16} className="text-blue-600" /> Instructions for iOS (iPhone/iPad):
            </p>
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[#8b5a2b] text-white flex items-center justify-center shrink-0 text-xs font-bold">1</span>
              <p>Tap the <strong className="text-blue-700">Share button</strong> at the bottom of Safari.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[#8b5a2b] text-white flex items-center justify-center shrink-0 text-xs font-bold">2</span>
              <p>Scroll down and tap <strong className="text-[#3e2723] flex items-center gap-1 inline-flex"><PlusSquare size={14} /> Add to Home Screen</strong>.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[#8b5a2b] text-white flex items-center justify-center shrink-0 text-xs font-bold">3</span>
              <p>Tap <strong className="text-emerald-700">Add</strong> in the top right corner.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3 bg-[#f2e3c6] p-4 rounded-2xl border-2 border-[#8b5a2b] text-xs font-semibold">
            <p className="font-bold text-sm text-[#3e2723] border-b border-[#8b5a2b]/30 pb-2 flex items-center gap-2">
              <Download size={16} className="text-emerald-600" /> Instructions for Android / Chrome:
            </p>
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[#8b5a2b] text-white flex items-center justify-center shrink-0 text-xs font-bold">1</span>
              <p>Tap the <strong>three dots menu (⋮)</strong> at top right in Chrome.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[#8b5a2b] text-white flex items-center justify-center shrink-0 text-xs font-bold">2</span>
              <p>Select <strong>"Install App"</strong> or <strong>"Add to Home Screen"</strong>.</p>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full mt-5 bg-[#8b5a2b] text-[#f2e3c6] font-bold py-3 rounded-xl shadow-lg active:scale-95 transition-all text-sm"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export default InstallPWAModal;