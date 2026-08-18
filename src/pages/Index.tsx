"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Skull, 
  Smartphone, 
  Search, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Edit3, 
  Download, 
  Upload, 
  Bookmark, 
  HardDrive, 
  RefreshCw, 
  Sparkles,
  Ship,
  Compass,
  Play
} from 'lucide-react';
import WantedPoster from '@/components/WantedPoster';
import SailingMap from '@/components/SailingMap';
import OceanAmbience from '@/components/OceanAmbience';
import DevilFruitGenerator from '@/components/DevilFruitGenerator';
import MobileBottomNav from '@/components/MobileBottomNav';
import InstallPWAModal from '@/components/InstallPWAModal';
import EditProfileModal from '@/components/EditProfileModal';
import { showSuccess, showError } from '@/utils/toast';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface GuideItem {
  id: string;
  title: string;
  episodes: string;
  type: 'canon' | 'filler' | 'mixed' | 'movie' | 'special' | 'optional';
  description: string;
  recommendation: 'Watch' | 'Skip' | 'Optional';
  saga: string;
}

const guideData: GuideItem[] = [
  // --- East Blue Saga ---
  { id: "1", title: "Romance Dawn / Captain Morgan", episodes: "Ep 1-3", type: "canon", recommendation: "Watch", description: "Introduces Luffy & Zoro. Sets sail!", saga: "East Blue Saga" },
  { id: "2", title: "Orange Town / Buggy Arc", episodes: "Ep 4-8", type: "canon", recommendation: "Watch", description: "Luffy meets Nami and fights Buggy.", saga: "East Blue Saga" },
  { id: "3", title: "Syrup Village / Captain Kuro", episodes: "Ep 9-18", type: "canon", recommendation: "Watch", description: "Usopp joins and gets Going Merry.", saga: "East Blue Saga" },
  { id: "4", title: "Baratie / Don Krieg", episodes: "Ep 19-30", type: "canon", recommendation: "Watch", description: "Sanji joins. Mihawk enters.", saga: "East Blue Saga" },
  { id: "5", title: "Arlong Park / Nami's Arc", episodes: "Ep 31-44", type: "canon", recommendation: "Watch", description: "Emotional peak of East Blue.", saga: "East Blue Saga" },
  { id: "6", title: "Loguetown Arc", episodes: "Ep 45, 48-53", type: "canon", recommendation: "Watch", description: "Town of beginning and end.", saga: "East Blue Saga" },
  { id: "7", title: "Warship Island Filler", episodes: "Ep 54-61", type: "filler", recommendation: "Skip", description: "Calm Belt filler.", saga: "East Blue Saga" },

  // --- Alabasta Saga ---
  { id: "8", title: "Reverse Mountain / Laboon", episodes: "Ep 62-63", type: "canon", recommendation: "Watch", description: "Grand Line entry & Laboon.", saga: "Alabasta Saga" },
  { id: "9", title: "Whisky Peak", episodes: "Ep 64-67", type: "canon", recommendation: "Watch", description: "Baroque Works & Princess Vivi.", saga: "Alabasta Saga" },
  { id: "10", title: "Little Garden", episodes: "Ep 70-77", type: "canon", recommendation: "Watch", description: "Giants Dorry & Brogy.", saga: "Alabasta Saga" },
  { id: "11", title: "Drum Island", episodes: "Ep 78-91", type: "canon", recommendation: "Watch", description: "Tony Tony Chopper joins!", saga: "Alabasta Saga" },
  { id: "12", title: "Alabasta Arc", episodes: "Ep 92-130", type: "canon", recommendation: "Watch", description: "Showdown vs Crocodile.", saga: "Alabasta Saga" },
  { id: "13", title: "Post-Alabasta Fillers", episodes: "Ep 131-143", type: "filler", recommendation: "Skip", description: "Pacing break filler.", saga: "Alabasta Saga" },

  // --- Sky Island Saga ---
  { id: "14", title: "Jaya / Mock Town", episodes: "Ep 144-152", type: "canon", recommendation: "Watch", description: "Blackbeard & Bellamy debut.", saga: "Sky Island Saga" },
  { id: "15", title: "Skypiea Arc", episodes: "Ep 153-195", type: "canon", recommendation: "Watch", description: "Island in the clouds vs Enel.", saga: "Sky Island Saga" },
  { id: "16", title: "G-8 Arc (Navarone)", episodes: "Ep 196-206", type: "filler", recommendation: "Watch", description: "Best filler arc in anime!", saga: "Sky Island Saga" },

  // --- Water 7 Saga ---
  { id: "17", title: "Water 7 Arc", episodes: "Ep 227-263", type: "canon", recommendation: "Watch", description: "CP9 & crew emotional conflict.", saga: "Water 7 Saga" },
  { id: "18", title: "Enies Lobby Arc", episodes: "Ep 264-312", type: "canon", recommendation: "Watch", description: "Robin rescue & Gear 2nd debut.", saga: "Water 7 Saga" },
  { id: "19", title: "Post-Enies Lobby", episodes: "Ep 313-325", type: "canon", recommendation: "Watch", description: "Thousand Sunny & Ace vs Blackbeard.", saga: "Water 7 Saga" },

  // --- Thriller Bark Saga ---
  { id: "20", title: "Thriller Bark Arc", episodes: "Ep 337-381", type: "canon", recommendation: "Watch", description: "Brook joins & Kuma encounter.", saga: "Thriller Bark Saga" },

  // --- Summit War Saga ---
  { id: "21", title: "Sabaody Archipelago", episodes: "Ep 385-405", type: "canon", recommendation: "Watch", description: "Supernovas & Celestial Dragons.", saga: "Summit War Saga" },
  { id: "22", title: "Amazon Lily", episodes: "Ep 408-421", type: "canon", recommendation: "Watch", description: "Luffy meets Boa Hancock.", saga: "Summit War Saga" },
  { id: "23", title: "Impel Down", episodes: "Ep 422-452", type: "canon", recommendation: "Watch", description: "Underwater prison break.", saga: "Summit War Saga" },
  { id: "24", title: "Marineford (Summit War)", episodes: "Ep 457-489", type: "canon", recommendation: "Watch", description: "Pirate war at Marine HQ.", saga: "Summit War Saga" },
  { id: "25", title: "Post-War & 3D2Y", episodes: "Ep 490-516", type: "canon", recommendation: "Watch", description: "Childhood flashback & training.", saga: "Summit War Saga" },

  // --- Post-Timeskip Sagas ---
  { id: "26", title: "Return to Sabaody", episodes: "Ep 517-522", type: "canon", recommendation: "Watch", description: "2-year reunion!", saga: "Fishman Island Saga" },
  { id: "27", title: "Fishman Island", episodes: "Ep 523-574", type: "canon", recommendation: "Watch", description: "10,000 meters underwater.", saga: "Fishman Island Saga" },
  { id: "28", title: "Punk Hazard", episodes: "Ep 579-625", type: "canon", recommendation: "Watch", description: "Law alliance & Caesar Clown.", saga: "Dressrosa Saga" },
  { id: "29", title: "Dressrosa", episodes: "Ep 629-746", type: "canon", recommendation: "Watch", description: "Gear 4th vs Doflamingo.", saga: "Dressrosa Saga" },
  { id: "30", title: "Zou Arc", episodes: "Ep 751-779", type: "canon", recommendation: "Watch", description: "Elephant island & Road Poneglyphs.", saga: "Whole Cake Island Saga" },
  { id: "31", title: "Whole Cake Island", episodes: "Ep 783-877", type: "canon", recommendation: "Watch", description: "Big Mom & Katakuri fight.", saga: "Whole Cake Island Saga" },
  { id: "32", title: "Reverie Arc", episodes: "Ep 878-889", type: "canon", recommendation: "Watch", description: "World leaders council.", saga: "Whole Cake Island Saga" },
  { id: "33", title: "Wano Country Arc", episodes: "Ep 890-1085", type: "canon", recommendation: "Watch", description: "Samurai raid & Gear 5th!", saga: "Wano Country Saga" },
  { id: "34", title: "Egghead Arc", episodes: "Ep 1086-Present", type: "canon", recommendation: "Watch", description: "Dr. Vegapunk & Final Saga.", saga: "Final Saga" }
];

const Index = () => {
  // Mobile app active tab state
  const [activeTab, setActiveTab] = useState<'dashboard' | 'guide' | 'profile'>('dashboard');

  // Local storage state initialization
  const [pirateName, setPirateName] = useState<string>(() => localStorage.getItem('pirateName') || 'Halex');
  const [pirateLocation, setPirateLocation] = useState<string>(() => localStorage.getItem('pirateLocation') || 'East Blue');
  const [joinedDate, setJoinedDate] = useState<string>(() => localStorage.getItem('joinedDate') || 'Aug 18, 2013');
  const [pirateTitle, setPirateTitle] = useState<string>(() => localStorage.getItem('pirateTitle') || 'Pirate Rookie');
  const [pirateFruit, setPirateFruit] = useState<string>(() => localStorage.getItem('pirateFruit') || 'None Awakened');

  const [completedIds, setCompletedIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('completedArcs');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('bookmarkedArcs');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [customNotes, setCustomNotes] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('customArcNotes');
    return saved ? JSON.parse(saved) : {};
  });

  // UI Modals
  const [isPWAModalOpen, setIsPWAModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [bookmarksOnly, setBookmarksOnly] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-Save listeners
  useEffect(() => localStorage.setItem('completedArcs', JSON.stringify(Array.from(completedIds))), [completedIds]);
  useEffect(() => localStorage.setItem('bookmarkedArcs', JSON.stringify(Array.from(bookmarkedIds))), [bookmarkedIds]);
  useEffect(() => localStorage.setItem('customArcNotes', JSON.stringify(customNotes)), [customNotes]);
  useEffect(() => localStorage.setItem('pirateName', pirateName), [pirateName]);
  useEffect(() => localStorage.setItem('pirateLocation', pirateLocation), [pirateLocation]);
  useEffect(() => localStorage.setItem('joinedDate', joinedDate), [joinedDate]);
  useEffect(() => localStorage.setItem('pirateTitle', pirateTitle), [pirateTitle]);
  useEffect(() => localStorage.setItem('pirateFruit', pirateFruit), [pirateFruit]);

  const totalItems = guideData.length;
  const completedCount = completedIds.size;
  const progressPercentage = totalItems > 0 ? (completedCount / totalItems) * 100 : 0;

  const nextArc = guideData.find(item => !completedIds.has(item.id)) || guideData[guideData.length - 1];

  const toggleComplete = (id: string) => {
    const newCompleted = new Set(completedIds);
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
      if (newCompleted.size === totalItems) {
        confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
        showSuccess("You conquered the Grand Line!");
      } else {
        showSuccess("Adventure saved!");
      }
    }
    setCompletedIds(newCompleted);
  };

  const toggleBookmark = (id: string) => {
    const newBookmarks = new Set(bookmarkedIds);
    if (newBookmarks.has(id)) {
      newBookmarks.delete(id);
    } else {
      newBookmarks.add(id);
      showSuccess("Bookmarked!");
    }
    setBookmarkedIds(newBookmarks);
  };

  const updateArcNote = (id: string, note: string) => {
    setCustomNotes(prev => ({ ...prev, [id]: note }));
  };

  const handleBackupExport = () => {
    const backupData = {
      pirateName, pirateLocation, joinedDate, pirateTitle, pirateFruit,
      completedArcs: Array.from(completedIds),
      bookmarkedArcs: Array.from(bookmarkedIds),
      customArcNotes: customNotes
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `${pirateName}_GrandLine_Logbook.json`;
    a.click();
    showSuccess("Backup JSON exported!");
  };

  const handleRestoreImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files?.[0]) {
      reader.readAsText(e.target.files[0], "UTF-8");
      reader.onload = (evt) => {
        try {
          const parsed = JSON.parse(evt.target?.result as string);
          if (parsed.pirateName) setPirateName(parsed.pirateName);
          if (parsed.pirateLocation) setPirateLocation(parsed.pirateLocation);
          if (parsed.joinedDate) setJoinedDate(parsed.joinedDate);
          if (parsed.pirateTitle) setPirateTitle(parsed.pirateTitle);
          if (parsed.pirateFruit) setPirateFruit(parsed.pirateFruit);
          if (parsed.completedArcs) setCompletedIds(new Set(parsed.completedArcs));
          if (parsed.bookmarkedArcs) setBookmarkedIds(new Set(parsed.bookmarkedArcs));
          if (parsed.customArcNotes) setCustomNotes(parsed.customArcNotes);
          showSuccess("Logbook restored successfully!");
        } catch {
          showError("Invalid backup file.");
        }
      };
    }
  };

  const filteredItems = guideData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.episodes.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    const matchesBookmark = !bookmarksOnly || bookmarkedIds.has(item.id);
    return matchesSearch && matchesType && matchesBookmark;
  });

  return (
    <div className="min-h-screen bg-[#1e120c] text-[#3e2723] pb-24 font-serif select-none max-w-2xl mx-auto sm:border-x-2 border-[#8b5a2b]/30 shadow-2xl">
      <input type="file" ref={fileInputRef} onChange={handleRestoreImport} accept=".json" className="hidden" />

      {/* App Mobile Top Bar */}
      <header className="sticky top-0 z-30 bg-[#1e120c]/90 backdrop-blur-md px-4 py-3 border-b-2 border-[#8b5a2b] flex items-center justify-between text-[#f2e3c6]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-[#8b5a2b] rounded-xl flex items-center justify-center text-[#f2e3c6] shadow-md">
            <Skull size={20} />
          </div>
          <div>
            <h1 className="font-black text-base tracking-wide uppercase leading-tight">Grand Line</h1>
            <p className="text-[10px] text-[#dfcbb5] font-sans">
              Logged as: <span className="font-bold text-[#f2e3c6]">{pirateName}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <OceanAmbience />
          <button 
            onClick={() => setIsPWAModalOpen(true)}
            className="p-2 bg-[#8b5a2b] hover:bg-[#a16e3f] text-[#f2e3c6] rounded-xl text-xs font-sans font-bold flex items-center gap-1 shadow active:scale-95 transition-transform"
            title="Install as Phone App"
          >
            <Smartphone size={15} />
            <span className="hidden sm:inline">Install App</span>
          </button>
        </div>
      </header>

      {/* Main Tab Views */}
      <main className="p-4 sm:p-6 space-y-6">
        
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Quick Profile Summary Banner */}
            <div className="bg-[#f2e3c6] border-4 border-[#8b5a2b] rounded-3xl p-5 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b-2 border-[#8b5a2b]/40 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-[#8b5a2b]" />
                  <span className="font-sans text-xs font-bold uppercase text-[#5d4037]">Pirate Dashboard</span>
                </div>
                <button 
                  onClick={() => setIsEditProfileOpen(true)}
                  className="bg-[#8b5a2b] text-[#f2e3c6] px-3 py-1 rounded-full text-xs font-sans font-bold flex items-center gap-1 active:scale-95 transition-transform"
                >
                  <Edit3 size={12} /> Edit Profile
                </button>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#5d4037] text-[#f2e3c6] rounded-2xl flex items-center justify-center font-bold text-2xl border-2 border-[#8b5a2b] shadow-inner shrink-0">
                  {pirateName[0]}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#3e2723]">{pirateName}</h2>
                  <p className="text-xs font-sans text-[#8b5a2b] font-bold mt-0.5">"{pirateTitle}"</p>
                  <p className="text-[11px] font-sans text-[#5d4037] mt-0.5">Fruit: {pirateFruit}</p>
                </div>
              </div>
            </div>

            {/* Sailing Progress Bar Map */}
            <SailingMap progress={progressPercentage} currentArc={nextArc.title} />

            {/* Next Recommended Adventure Card */}
            <div className="bg-[#f2e3c6] border-4 border-[#8b5a2b] rounded-3xl p-5 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-sans font-bold uppercase text-[#8b5a2b] flex items-center gap-1.5">
                  <Play size={14} /> Continue Watching Next
                </span>
                <span className="text-xs font-mono font-bold bg-[#dfcbb5] px-2 py-0.5 rounded text-[#3e2723]">
                  {nextArc.episodes}
                </span>
              </div>

              <h3 className="font-bold text-lg text-[#3e2723] mb-1">{nextArc.title}</h3>
              <p className="text-xs font-sans text-[#5d4037] mb-4">{nextArc.description}</p>

              <button
                onClick={() => toggleComplete(nextArc.id)}
                className="w-full bg-[#8b5a2b] hover:bg-[#a16e3f] text-[#f2e3c6] font-sans font-bold py-3 rounded-2xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Check size={16} /> Mark "{nextArc.title}" Completed
              </button>
            </div>

            {/* Quick App Shortcut Banner for iOS/Android */}
            <div className="bg-[#5d4037] text-[#f2e3c6] p-4 rounded-3xl border-2 border-[#8b5a2b] flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <Smartphone size={24} className="text-[#f2e3c6] shrink-0" />
                <div>
                  <h4 className="font-bold text-sm">Save to Phone Home Screen</h4>
                  <p className="text-[11px] text-[#dfcbb5] font-sans">Use offline like a real app on iOS & Android</p>
                </div>
              </div>
              <button 
                onClick={() => setIsPWAModalOpen(true)}
                className="bg-[#f2e3c6] text-[#3e2723] px-3 py-1.5 rounded-xl font-sans font-bold text-xs shrink-0 active:scale-95 transition-transform"
              >
                Install
              </button>
            </div>
          </div>
        )}

        {/* LOGBOOK / GUIDE TAB */}
        {activeTab === 'guide' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Search & Filter Header */}
            <div className="space-y-3 bg-[#f2e3c6] p-4 rounded-3xl border-2 border-[#8b5a2b] shadow-md">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-[#8b5a2b]" size={16} />
                <input 
                  type="text"
                  placeholder="Search arc name, episodes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#fdf8eb] border-2 border-[#8b5a2b] rounded-2xl text-xs font-sans font-bold text-[#3e2723] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between gap-2 font-sans text-xs">
                <button
                  onClick={() => setTypeFilter(typeFilter === 'all' ? 'canon' : typeFilter === 'canon' ? 'filler' : 'all')}
                  className="bg-[#dfcbb5] px-3 py-1.5 rounded-xl font-bold text-[#3e2723] border border-[#8b5a2b]"
                >
                  Type: <span className="uppercase text-[#8b5a2b]">{typeFilter}</span>
                </button>

                <button
                  onClick={() => setBookmarksOnly(!bookmarksOnly)}
                  className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1 border border-[#8b5a2b] ${
                    bookmarksOnly ? 'bg-[#8b5a2b] text-[#f2e3c6]' : 'bg-[#dfcbb5] text-[#3e2723]'
                  }`}
                >
                  <Bookmark size={12} className={bookmarksOnly ? 'fill-current' : ''} /> Favorites
                </button>
              </div>
            </div>

            {/* List of Arcs */}
            <div className="space-y-2.5">
              {filteredItems.map((item) => {
                const isCompleted = completedIds.has(item.id);
                const isBookmarked = bookmarkedIds.has(item.id);
                const isExpanded = expandedId === item.id;
                const currentNote = customNotes[item.id] || '';

                return (
                  <div 
                    key={item.id}
                    className={`border-2 rounded-2xl transition-all overflow-hidden ${
                      isCompleted ? 'bg-[#e2d4be] border-[#8b5a2b]/40 opacity-80' : 'bg-[#f2e3c6] border-[#8b5a2b]'
                    }`}
                  >
                    <div 
                      className="p-3.5 flex items-center justify-between gap-3 cursor-pointer"
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleComplete(item.id);
                          }}
                          className={`w-6 h-6 rounded-full flex items-center justify-center border-2 shrink-0 ${
                            isCompleted ? 'bg-[#8b5a2b] text-[#f2e3c6] border-[#3e2723]' : 'border-[#8b5a2b] bg-[#fdf8eb]'
                          }`}
                        >
                          {isCompleted && <Check size={14} />}
                        </button>

                        <div className="min-w-0 flex-1">
                          <h4 className={`font-bold text-sm text-[#3e2723] truncate ${isCompleted ? 'line-through text-gray-600' : ''}`}>
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-mono bg-[#dfcbb5] px-1.5 py-0.2 rounded font-bold text-[#5d4037]">
                              {item.episodes}
                            </span>
                            <span className={`text-[9px] font-sans font-bold uppercase px-1.5 py-0.2 rounded ${
                              item.type === 'canon' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {item.type}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(item.id);
                          }}
                          className={`p-1 rounded ${isBookmarked ? 'text-amber-600' : 'text-[#8b5a2b]/40'}`}
                        >
                          <Bookmark size={16} className={isBookmarked ? 'fill-current' : ''} />
                        </button>
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-3 border-t border-dashed border-[#8b5a2b]/40 bg-[#dfcbb5]/40 font-sans text-xs space-y-2">
                        <p>{item.description}</p>
                        <div className="bg-[#f2e3c6] p-2 rounded-xl border border-[#8b5a2b]">
                          <label className="block text-[10px] font-bold uppercase text-[#5d4037] mb-1">
                            Personal Note (Auto-Saved)
                          </label>
                          <textarea
                            value={currentNote}
                            onChange={(e) => updateArcNote(item.id, e.target.value)}
                            placeholder="Add note..."
                            rows={2}
                            className="w-full p-2 bg-[#fdf8eb] border border-[#8b5a2b] rounded-lg text-xs"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PROFILE & WANTED CARD TAB */}
        {activeTab === 'profile' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Wanted Poster Card */}
            <div className="bg-[#2d1a12] p-4 rounded-3xl border-2 border-[#8b5a2b] shadow-xl">
              <WantedPoster 
                followers={completedCount} 
                following={totalItems - completedCount} 
                username={`${pirateName} ${pirateTitle !== 'Pirate Rookie' ? `"${pirateTitle}"` : ''}`} 
                location={pirateLocation} 
                joinedDate={joinedDate} 
              />
            </div>

            {/* Devil Fruit Title Roll */}
            <DevilFruitGenerator 
              initialTitle={pirateTitle}
              initialFruit={pirateFruit}
              onAssignTitle={(title, fruit) => {
                setPirateTitle(title);
                setPirateFruit(fruit);
              }}
            />

            {/* Backup & Restore Controls */}
            <div className="bg-[#f2e3c6] border-4 border-[#8b5a2b] rounded-3xl p-5 shadow-xl font-sans text-xs space-y-3">
              <h3 className="font-serif font-bold text-base text-[#3e2723] border-b border-[#8b5a2b]/30 pb-2">
                Data & Logbook Backup
              </h3>
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleBackupExport}
                  className="bg-[#5d4037] hover:bg-[#8b5a2b] text-[#f2e3c6] font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5"
                >
                  <HardDrive size={14} /> Backup JSON
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-[#5d4037] hover:bg-[#8b5a2b] text-[#f2e3c6] font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5"
                >
                  <Upload size={14} /> Restore
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Mobile App Navigation Bar */}
      <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Modals */}
      <InstallPWAModal isOpen={isPWAModalOpen} onClose={() => setIsPWAModalOpen(false)} />
      <EditProfileModal 
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        name={pirateName}
        location={pirateLocation}
        date={joinedDate}
        onSave={(n, l, d) => {
          setPirateName(n);
          setPirateLocation(l);
          setJoinedDate(d);
          showSuccess("Profile updated!");
        }}
      />
    </div>
  );
};

export default Index;