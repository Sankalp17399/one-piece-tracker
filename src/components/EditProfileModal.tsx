"use client";

import React, { useState } from 'react';
import { X, User, MapPin, Calendar, Save } from 'lucide-react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  location: string;
  date: string;
  onSave: (name: string, location: string, date: string) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  name,
  location,
  date,
  onSave
}) => {
  const [tempName, setTempName] = useState(name);
  const [tempLocation, setTempLocation] = useState(location);
  const [tempDate, setTempDate] = useState(date);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(tempName, tempLocation, tempDate);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#fdf8eb] border-4 border-[#8b5a2b] rounded-3xl p-6 shadow-2xl text-[#3e2723] font-serif relative">
        <div className="flex items-center justify-between border-b-2 border-[#8b5a2b] pb-3 mb-4">
          <h3 className="font-black text-xl text-[#3e2723] uppercase">Edit Pirate Identity</h3>
          <button 
            onClick={onClose} 
            className="text-[#8b5a2b] hover:bg-[#dfcbb5] p-1.5 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4 font-sans text-xs">
          <div>
            <label className="block font-bold uppercase text-[#5d4037] mb-1">Pirate Name / Captain</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-[#8b5a2b]" size={16} />
              <input 
                type="text" 
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2.5 bg-[#f2e3c6] border-2 border-[#8b5a2b] rounded-xl text-[#3e2723] font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#8b5a2b]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold uppercase text-[#5d4037] mb-1">Starting Sea / Island</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-[#8b5a2b]" size={16} />
              <input 
                type="text" 
                value={tempLocation}
                onChange={(e) => setTempLocation(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2.5 bg-[#f2e3c6] border-2 border-[#8b5a2b] rounded-xl text-[#3e2723] font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#8b5a2b]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold uppercase text-[#5d4037] mb-1">Sailing Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 text-[#8b5a2b]" size={16} />
              <input 
                type="text" 
                value={tempDate}
                onChange={(e) => setTempDate(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2.5 bg-[#f2e3c6] border-2 border-[#8b5a2b] rounded-xl text-[#3e2723] font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#8b5a2b]"
              />
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-[#dfcbb5] text-[#3e2723] font-bold py-3 rounded-xl hover:bg-[#8b5a2b]/20 transition-all text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#8b5a2b] text-[#f2e3c6] font-bold py-3 rounded-xl shadow-lg active:scale-95 transition-all text-xs flex items-center justify-center gap-2"
            >
              <Save size={14} /> Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;