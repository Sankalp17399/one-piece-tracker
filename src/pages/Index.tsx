"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Smartphone, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Edit3, 
  Bookmark, 
  HardDrive, 
  Upload, 
  Play,
  RotateCcw,
  Sparkles,
  BookOpen
} from 'lucide-react';
import WantedPoster from '@/components/WantedPoster';
import SailingMap from '@/components/SailingMap';
import OceanAmbience from '@/components/OceanAmbience';
import MobileBottomNav from '@/components/MobileBottomNav';
import InstallPWAModal from '@/components/InstallPWAModal';
import EditProfileModal from '@/components/EditProfileModal';
import OnboardingModal from '@/components/OnboardingModal';
import { showSuccess, showError } from '@/utils/toast';
import confetti from 'canvas-confetti';

interface GuideItem {
  id: string;
  title: string;
  episodes: string;
  type: 'canon' | 'filler';
  description: string;
  saga: string;
}

const guideData: GuideItem[] = [
  // --- East Blue Saga ---
  { id: "1", title: "Romance Dawn", episodes: "Ep 1-3", type: "canon", description: "Luffy sets sail and recruits swordsman Roronoa Zoro.", saga: "East Blue" },
  { id: "2", title: "Orange Town", episodes: "Ep 4-8", type: "canon", description: "Encounter with the thief Nami and pirate Buggy the Clown.", saga: "East Blue" },
  { id: "3", title: "Syrup Village", episodes: "Ep 9-18", type: "canon", description: "Usopp joins the crew; Going Merry is acquired.", saga: "East Blue" },
  { id: "4", title: "Baratie Sea Restaurant", episodes: "Ep 19-30", type: "canon", description: "Cook Sanji joins; encounter with warlord Dracule Mihawk.", saga: "East Blue" },
  { id: "5", title: "Arlong Park", episodes: "Ep 31-44", type: "canon", description: "Showdown at Arlong Park to free Nami and Cocoyasi Village.", saga: "East Blue" },
  { id: "6", title: "Loguetown", episodes: "Ep 45, 48-53", type: "canon", description: "The town where the Pirate King Gol D. Roger was born and died.", saga: "East Blue" },
  { id: "7", title: "Warship Island", episodes: "Ep 54-61", type: "filler", description: "Legendary dragon filler before entering the Calm Belt.", saga: "East Blue" },

  // --- Alabasta Saga ---
  { id: "8", title: "Reverse Mountain & Laboon", episodes: "Ep 62-63", type: "canon", description: "Crossing the red line and meeting the whale Laboon.", saga: "Alabasta" },
  { id: "9", title: "Whisky Peak", episodes: "Ep 64-67", type: "canon", description: "Baroque Works assassins and alliance with Princess Vivi.", saga: "Alabasta" },
  { id: "10", title: "Little Garden", episodes: "Ep 70-77", type: "canon", description: "Prehistoric island duel between giants Dorry and Brogy.", saga: "Alabasta" },
  { id: "11", title: "Drum Island", episodes: "Ep 78-91", type: "canon", description: "Winter island journey; doctor Tony Tony Chopper joins.", saga: "Alabasta" },
  { id: "12", title: "Alabasta Kingdom", episodes: "Ep 92-130", type: "canon", description: "Civil war battle against warlord Sir Crocodile.", saga: "Alabasta" },
  { id: "13", title: "Post-Alabasta Stories", episodes: "Ep 131-143", type: "filler", description: "Short crew episodic fillers.", saga: "Alabasta" },

  // --- Sky Island Saga ---
  { id: "14", title: "Jaya & Mock Town", episodes: "Ep 144-152", type: "canon", description: "First encounter with Blackbeard and Bellamy.", saga: "Sky Island" },
  { id: "15", title: "Skypiea", episodes: "Ep 153-195", type: "canon", description: "The lost city of gold in the sea of clouds vs God Enel.", saga: "Sky Island" },
  { id: "16", title: "G-8 Marine Base", episodes: "Ep 196-206", type: "filler", description: "Navarone marine base infiltration. High quality story.", saga: "Sky Island" },

  // --- Water 7 Saga ---
  { id: "17", title: "Water 7", episodes: "Ep 227-263", type: "canon", description: "Shipwright city, CP9 conspiracy, and crew fallout.", saga: "Water 7" },
  { id: "18", title: "Enies Lobby", episodes: "Ep 264-312", type: "canon", description: "Invasion of judicial island to save Nico Robin; Gear 2nd debut.", saga: "Water 7" },
  { id: "19", title: "Post-Enies Lobby", episodes: "Ep 313-325", type: "canon", description: "Franky crafts Thousand Sunny; Ace confronts Blackbeard.", saga: "Water 7" },

  // --- Thriller Bark Saga ---
  { id: "20", title: "Thriller Bark", episodes: "Ep 337-381", type: "canon", description: "Ghost ship island, warlord Gecko Moria, and Brook joins.", saga: "Thriller Bark" },

  // --- Summit War Saga ---
  { id: "21", title: "Sabaody Archipelago", episodes: "Ep 385-405", type: "canon", description: "Celestial Dragons clash and the crew separation disaster.", saga: "Summit War" },
  { id: "22", title: "Amazon Lily", episodes: "Ep 408-421", type: "canon", description: "Island of women ruled by warlord Boa Hancock.", saga: "Summit War" },
  { id: "23", title: "Impel Down", episodes: "Ep 422-452", type: "canon", description: "Underwater great prison infiltration to save Portgas D. Ace.", saga: "Summit War" },
  { id: "24", title: "Marineford", episodes: "Ep 457-489", type: "canon", description: "Whitebeard Pirates vs Marine HQ in the Paramount War.", saga: "Summit War" },
  { id: "25", title: "Post-War & 3D2Y", episodes: "Ep 490-516", type: "canon", description: "Childhood brothers flashback and the 2-year training pledge.", saga: "Summit War" },

  // --- New World Sagas ---
  { id: "26", title: "Return to Sabaody", episodes: "Ep 517-522", type: "canon", description: "The Straw Hats reunite stronger after 2 years.", saga: "Fishman Island" },
  { id: "27", title: "Fishman Island", episodes: "Ep 523-574", type: "canon", description: "Voyage 10,000 meters beneath the sea to Ryugu Kingdom.", saga: "Fishman Island" },
  { id: "28", title: "Punk Hazard", episodes: "Ep 579-625", type: "canon", description: "Alliance with Trafalgar Law and Caesar Clown's lab.", saga: "Dressrosa" },
  { id: "29", title: "Dressrosa", episodes: "Ep 629-746", type: "canon", description: "Colosseum tournament & overthrowing Donquixote Doflamingo.", saga: "Dressrosa" },
  { id: "30", title: "Zou Island", episodes: "Ep 751-779", type: "canon", description: "The back of the giant elephant Zunesha & Road Poneglyphs.", saga: "Whole Cake Island" },
  { id: "31", title: "Whole Cake Island", episodes: "Ep 783-877", type: "canon", description: "Tea party infiltration vs Emperor Big Mom and Katakuri.", saga: "Whole Cake Island" },
  { id: "32", title: "Levely / Reverie", episodes: "Ep 878-889", type: "canon", description: "World summit of monarchies and secrets of Mary Geoise.", saga: "Whole Cake Island" },
  { id: "33", title: "Wano Country", episodes: "Ep 890-1085", type: "canon", description: "Samurai raid on Onigashima vs Emperor Kaido; Gear 5th awakens.", saga: "Wano Country" },
  { id: "34", title: "Egghead Island", episodes: "Ep 1086-Present", type: "canon", description: "Future island of Dr. Vegapunk and truth of the Void Century.", saga: "Final Saga" }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'guide' | 'profile'>('dashboard');

  // First-time onboarding trigger check
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(() => {
    return !localStorage.getItem('hasCompletedOnboarding');
  });

  // Pirate profile identity
  const [pirateName, setPirateName] = useState<string>(() => localStorage.getItem('pirateName') || 'Captain');
  const [pirateLocation, setPirateLocation] = useState<string>(() => localStorage.getItem('pirateLocation') || 'East Blue');
  const [joinedDate, setJoinedDate] = useState<string>(() => localStorage.getItem('joinedDate') || 'Aug 18, 2013');
  const [pirateTitle, setPirateTitle] = useState<string>(() => localStorage.getItem('pirateTitle') || 'Rookie Adventurer');

  // Arc tracking state
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

  // Guide filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'canon' | 'filler'>('all');
  const [bookmarksOnly, setBookmarksOnly] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Storage Persistence
  useEffect(() => localStorage.setItem('completedArcs', JSON.stringify(Array.from(completedIds))), [completedIds]);
  useEffect(() => localStorage.setItem('bookmarkedArcs', JSON.stringify(Array.from(bookmarkedIds))), [bookmarkedIds]);
  useEffect(() => localStorage.setItem('customArcNotes', JSON.stringify(customNotes)), [customNotes]);
  useEffect(() => localStorage.setItem('pirateName', pirateName), [pirateName]);
  useEffect(() => localStorage.setItem('pirateLocation', pirateLocation), [pirateLocation]);
  useEffect(() => localStorage.setItem('joinedDate', joinedDate), [joinedDate]);
  useEffect(() => localStorage.setItem('pirateTitle', pirateTitle), [pirateTitle]);

  const totalItems = guideData.length;
  const completedCount = completedIds.size;
  const progressPercentage = totalItems > 0 ? (completedCount / totalItems) * 100 : 0;
  const nextArc = guideData.find(item => !completedIds.has(item.id)) || guideData[guideData.length - 1];

  const handleOnboardingComplete = (data: { name: string; location: string; title: string }) => {
    setPirateName(data.name);
    setPirateLocation(data.location);
    setPirateTitle(data.title);
    localStorage.setItem('hasCompletedOnboarding', 'true');
    setIsOnboardingOpen(false);
    showSuccess(`Welcome aboard, ${data.name}!`);
  };

  const toggleComplete = (id: string) => {
    const nextSet = new Set(completedIds);
    if (nextSet.has(id)) {
      nextSet.delete(id);
    } else {
      nextSet.add(id);
      if (nextSet.size === totalItems) {
        confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
        showSuccess("Grand Line fully mapped!");
      } else {
        showSuccess("Entry recorded in diary.");
      }
    }
    setCompletedIds(nextSet);
  };

  const toggleBookmark = (id: string) => {
    const nextSet = new Set(bookmarkedIds);
    if (nextSet.has(id)) {
      nextSet.delete(id);
    } else {
      nextSet.add(id);
      showSuccess("Marked favorite");
    }
    setBookmarkedIds(nextSet);
  };

  const updateArcNote = (id: string, note: string) => {
    setCustomNotes(prev => ({ ...prev, [id]: note }));
  };

  const handleBackupExport = () => {
    const backupData = {
      pirateName,
      pirateLocation,
      joinedDate,
      pirateTitle,
      completedArcs: Array.from(completedIds),
      bookmarkedArcs: Array.from(bookmarkedIds),
      customArcNotes: customNotes
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `${pirateName}_GrandLine_Diary.json`;
    a.click();
    showSuccess("Journal exported!");
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
          if (parsed.completedArcs) setCompletedIds(new Set(parsed.completedArcs));
          if (parsed.bookmarkedArcs) setBookmarkedIds(new Set(parsed.bookmarkedArcs));
          if (parsed.customArcNotes) setCustomNotes(parsed.customArcNotes);
          showSuccess("Logbook restored!");
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
    <div className="min-h-screen bg-[#160d08] text-[#2b1810] pb-24 font-serif select-none max-w-lg mx-auto sm:border-x border-[#8b5a2b]/20 shadow-2xl">
      <input type="file" ref={fileInputRef} onChange={handleRestoreImport} accept=".json" className="hidden" />

      {/* Clean Minimal App Header */}
      <header className="sticky top-0 z-30 bg-[#160d08]/95 backdrop-blur-md px-4 py-3 border-b border-[#8b5a2b]/20 flex items-center justify-between text-[#f5ebd7]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#8b5a2b]/20 border border-[#8b5a2b]/40 rounded-xl flex items-center justify-center text-[#f5ebd7]">
            <BookOpen size={16} />
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-wide uppercase">Grand Line Diary</h1>
            <p className="text-[10px] text-[#9c8274] font-sans">
              Capt. <span className="font-bold text-[#f5ebd7]">{pirateName}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <OceanAmbience />
          <button 
            onClick={() => setIsPWAModalOpen(true)}
            className="p-2 bg-[#8b5a2b]/20 hover:bg-[#8b5a2b]/40 text-[#f5ebd7] rounded-xl text-xs font-sans font-semibold flex items-center gap-1 border border-[#8b5a2b]/30 active:scale-95 transition-all"
            title="Install Mobile App"
          >
            <Smartphone size={14} />
            <span className="hidden sm:inline">Install</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="p-4 space-y-5">
        
        {/* TAB 1: VOYAGE DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Identity Card */}
            <div className="bg-[#f7f1e1] border-2 border-[#8b5a2b]/30 rounded-2xl p-4 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-[#8b5a2b]/20 pb-2 mb-3">
                <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#6e4624]">
                  Journal Cover
                </span>
                <button 
                  onClick={() => setIsEditProfileOpen(true)}
                  className="text-[11px] text-[#6e4624] hover:text-[#2b1810] font-sans font-bold flex items-center gap-1"
                >
                  <Edit3 size={11} /> Edit Name
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#6e4624] text-[#f7f1e1] rounded-xl flex items-center justify-center font-bold text-xl border border-[#8b5a2b] shadow-inner shrink-0">
                  {pirateName[0] || 'C'}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#2b1810] leading-tight">{pirateName}</h2>
                  <p className="text-xs text-[#6e4624] italic">"{pirateTitle}"</p>
                  <p className="text-[11px] font-sans text-[#8b5a2b] mt-0.5">Port: {pirateLocation}</p>
                </div>
              </div>
            </div>

            {/* Antique Route Map */}
            <SailingMap progress={progressPercentage} currentArc={nextArc?.title || 'Unknown'} />

            {/* Current Log Entry Card */}
            <div className="bg-[#f7f1e1] border-2 border-[#8b5a2b]/30 rounded-2xl p-4 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-sans font-bold uppercase text-[#6e4624] flex items-center gap-1">
                  <Play size={12} className="fill-current" /> Next Port of Call
                </span>
                <span className="text-[10px] font-mono font-bold bg-[#ede2ca] px-2 py-0.5 rounded text-[#6e4624]">
                  {nextArc?.episodes}
                </span>
              </div>

              <h3 className="font-bold text-base text-[#2b1810]">{nextArc?.title}</h3>
              <p className="text-xs text-[#6e4624] font-sans leading-relaxed">{nextArc?.description}</p>

              <button
                onClick={() => nextArc && toggleComplete(nextArc.id)}
                className="w-full mt-2 bg-[#6e4624] hover:bg-[#573519] text-[#f7f1e1] font-sans font-semibold py-2.5 rounded-xl shadow-md active:scale-98 transition-all flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider"
              >
                <Check size={14} /> Record Completion
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: LOGBOOK */}
        {activeTab === 'guide' && (
          <div className="space-y-3 animate-in fade-in duration-200">
            {/* Search & Filter Bar */}
            <div className="bg-[#f7f1e1] p-3 rounded-2xl border border-[#8b5a2b]/30 shadow-sm space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-[#8b5a2b]" size={14} />
                <input 
                  type="text"
                  placeholder="Search island, arc, episode..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-[#ede2ca] border border-[#8b5a2b]/30 rounded-xl text-xs font-sans text-[#2b1810] placeholder-[#8b5a2b]/60 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-sans">
                <button
                  onClick={() => setTypeFilter(typeFilter === 'all' ? 'canon' : typeFilter === 'canon' ? 'filler' : 'all')}
                  className="bg-[#ede2ca] px-2.5 py-1 rounded-lg font-semibold text-[#6e4624] border border-[#8b5a2b]/20"
                >
                  Type: <span className="uppercase font-bold">{typeFilter}</span>
                </button>

                <button
                  onClick={() => setBookmarksOnly(!bookmarksOnly)}
                  className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 border border-[#8b5a2b]/20 transition-colors ${
                    bookmarksOnly ? 'bg-[#6e4624] text-[#f7f1e1]' : 'bg-[#ede2ca] text-[#6e4624]'
                  }`}
                >
                  <Bookmark size={11} className={bookmarksOnly ? 'fill-current' : ''} /> Bookmarked
                </button>
              </div>
            </div>

            {/* List of Entries */}
            <div className="space-y-2">
              {filteredItems.map((item) => {
                const isCompleted = completedIds.has(item.id);
                const isBookmarked = bookmarkedIds.has(item.id);
                const isExpanded = expandedId === item.id;
                const currentNote = customNotes[item.id] || '';

                return (
                  <div 
                    key={item.id}
                    className={`border rounded-xl transition-all overflow-hidden ${
                      isCompleted 
                        ? 'bg-[#eae0cb] border-[#8b5a2b]/20 opacity-75' 
                        : 'bg-[#f7f1e1] border-[#8b5a2b]/30 shadow-sm'
                    }`}
                  >
                    <div 
                      className="p-3 flex items-center justify-between gap-2.5 cursor-pointer"
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleComplete(item.id);
                          }}
                          className={`w-5 h-5 rounded-md flex items-center justify-center border shrink-0 transition-colors ${
                            isCompleted 
                              ? 'bg-[#6e4624] text-[#f7f1e1] border-[#2b1810]' 
                              : 'border-[#8b5a2b]/50 bg-[#ede2ca]'
                          }`}
                        >
                          {isCompleted && <Check size={12} />}
                        </button>

                        <div className="min-w-0 flex-1">
                          <h4 className={`font-serif font-bold text-xs text-[#2b1810] truncate ${
                            isCompleted ? 'line-through text-[#8b5a2b]' : ''
                          }`}>
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[9px] font-mono text-[#6e4624] bg-[#ede2ca] px-1.5 py-0.2 rounded">
                              {item.episodes}
                            </span>
                            <span className="text-[9px] font-sans text-[#8b5a2b]">
                              {item.type}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(item.id);
                          }}
                          className={`p-1 rounded ${isBookmarked ? 'text-[#8b5a2b]' : 'text-[#8b5a2b]/30'}`}
                        >
                          <Bookmark size={14} className={isBookmarked ? 'fill-current' : ''} />
                        </button>
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-3 border-t border-dashed border-[#8b5a2b]/30 bg-[#ede2ca]/60 font-sans text-xs space-y-2">
                        <p className="text-[#6e4624] leading-relaxed">{item.description}</p>
                        <div className="space-y-1">
                          <label className="block text-[9px] font-bold uppercase tracking-wider text-[#8b5a2b]">
                            Personal Journal Note
                          </label>
                          <textarea
                            value={currentNote}
                            onChange={(e) => updateArcNote(item.id, e.target.value)}
                            placeholder="Inscribe a log note..."
                            rows={2}
                            className="w-full p-2 bg-[#f7f1e1] border border-[#8b5a2b]/30 rounded-lg text-xs font-serif text-[#2b1810] focus:outline-none"
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

        {/* TAB 3: BOUNTY & POSTER */}
        {activeTab === 'profile' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <WantedPoster 
              followers={completedCount} 
              following={totalItems - completedCount} 
              username={pirateName} 
              location={pirateLocation} 
              joinedDate={joinedDate} 
            />

            {/* Journal Data Backup Card */}
            <div className="bg-[#f7f1e1] border-2 border-[#8b5a2b]/30 rounded-2xl p-4 shadow-sm font-sans space-y-3">
              <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-[#6e4624] border-b border-[#8b5a2b]/20 pb-1.5">
                Diary Archive & Backup
              </h3>
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleBackupExport}
                  className="bg-[#6e4624] hover:bg-[#573519] text-[#f7f1e1] font-semibold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-all"
                >
                  <HardDrive size={13} /> Export JSON
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-[#ede2ca] hover:bg-[#dfd0b5] text-[#2b1810] font-semibold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 border border-[#8b5a2b]/30 active:scale-98 transition-all"
                >
                  <Upload size={13} /> Restore
                </button>
              </div>

              <button
                onClick={() => setIsOnboardingOpen(true)}
                className="w-full py-1.5 text-[11px] text-[#6e4624] hover:text-[#2b1810] flex items-center justify-center gap-1"
              >
                <RotateCcw size={11} /> Re-run Orientation Journey
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Mobile App Navigation */}
      <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Modals & Dialogs */}
      <OnboardingModal 
        isOpen={isOnboardingOpen} 
        onComplete={handleOnboardingComplete} 
      />

      <InstallPWAModal 
        isOpen={isPWAModalOpen} 
        onClose={() => setIsPWAModalOpen(false)} 
      />

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
          showSuccess("Identity updated!");
        }}
      />
    </div>
  );
};

export default Index;