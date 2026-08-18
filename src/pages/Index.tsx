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
  BookOpen,
  Users,
  Sparkles,
  Award,
  Filter,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Film,
  Compass,
  Scroll,
  Info
} from 'lucide-react';
import WantedPoster from '@/components/WantedPoster';
import SailingMap from '@/components/SailingMap';
import OceanAmbience from '@/components/OceanAmbience';
import MobileBottomNav from '@/components/MobileBottomNav';
import InstallPWAModal from '@/components/InstallPWAModal';
import EditProfileModal from '@/components/EditProfileModal';
import OnboardingModal from '@/components/OnboardingModal';
import CurrentlyWatchingCard from '@/components/CurrentlyWatchingCard';
import CrewAndAlliesModal from '@/components/CrewAndAlliesModal';
import { 
  CANON_EPISODE_GUIDE, 
  GuideArcItem,
  getCurrentBounty, 
  getUnlockedCrew, 
  getUnlockedAllies, 
  getActiveShip 
} from '@/data/onePieceProgression';
import { showSuccess, showError } from '@/utils/toast';
import confetti from 'canvas-confetti';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'guide' | 'profile'>('dashboard');

  // Onboarding trigger
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(() => {
    return !localStorage.getItem('hasCompletedOnboarding');
  });

  // Pirate profile identity
  const [pirateName, setPirateName] = useState<string>(() => localStorage.getItem('pirateName') || 'Captain');
  const [pirateLocation, setPirateLocation] = useState<string>(() => localStorage.getItem('pirateLocation') || 'East Blue');
  const [joinedDate, setJoinedDate] = useState<string>(() => localStorage.getItem('joinedDate') || 'Aug 18, 2013');
  const [pirateTitle, setPirateTitle] = useState<string>(() => localStorage.getItem('pirateTitle') || 'Rookie Adventurer');

  // Arc completion & bookmarking
  const [completedIds, setCompletedIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('completedArcs');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('bookmarkedArcs');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  // Currently watching state
  const [currentArcId, setCurrentArcId] = useState<string>(() => {
    return localStorage.getItem('currentWatchingArcId') || "1";
  });

  const [currentEpisode, setCurrentEpisode] = useState<number>(() => {
    const saved = localStorage.getItem('currentWatchingEpisode');
    return saved ? parseInt(saved, 10) : 1;
  });

  const [customNotes, setCustomNotes] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('customArcNotes');
    return saved ? JSON.parse(saved) : {};
  });

  // UI Modals
  const [isPWAModalOpen, setIsPWAModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isCrewRosterOpen, setIsCrewRosterOpen] = useState(false);

  // Guide filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'canon' | 'filler' | 'skip-recommended' | 'must-watch'>('all');
  const [selectedSaga, setSelectedSaga] = useState<string>('all');
  const [bookmarksOnly, setBookmarksOnly] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Storage Persistence
  useEffect(() => localStorage.setItem('completedArcs', JSON.stringify(Array.from(completedIds))), [completedIds]);
  useEffect(() => localStorage.setItem('bookmarkedArcs', JSON.stringify(Array.from(bookmarkedIds))), [bookmarkedIds]);
  useEffect(() => localStorage.setItem('currentWatchingArcId', currentArcId), [currentArcId]);
  useEffect(() => localStorage.setItem('currentWatchingEpisode', currentEpisode.toString()), [currentEpisode]);
  useEffect(() => localStorage.setItem('customArcNotes', JSON.stringify(customNotes)), [customNotes]);
  useEffect(() => localStorage.setItem('pirateName', pirateName), [pirateName]);
  useEffect(() => localStorage.setItem('pirateLocation', pirateLocation), [pirateLocation]);
  useEffect(() => localStorage.setItem('joinedDate', joinedDate), [joinedDate]);
  useEffect(() => localStorage.setItem('pirateTitle', pirateTitle), [pirateTitle]);

  const totalItems = CANON_EPISODE_GUIDE.length;
  const completedCount = completedIds.size;
  const progressPercentage = totalItems > 0 ? (completedCount / totalItems) * 100 : 0;
  
  // Find current active arc item
  const activeArc = CANON_EPISODE_GUIDE.find(item => item.id === currentArcId) || CANON_EPISODE_GUIDE[0];
  const unlockedCrew = getUnlockedCrew(currentEpisode);
  const unlockedAllies = getUnlockedAllies(currentEpisode);
  const activeShip = getActiveShip(currentEpisode);
  const currentBounty = getCurrentBounty(currentEpisode);

  // Extract unique sagas for filtering
  const allSagas = Array.from(new Set(CANON_EPISODE_GUIDE.map(item => item.saga)));

  const handleOnboardingComplete = (data: { name: string; location: string; title: string }) => {
    setPirateName(data.name);
    setPirateLocation(data.location);
    setPirateTitle(data.title);
    localStorage.setItem('hasCompletedOnboarding', 'true');
    setIsOnboardingOpen(false);
    showSuccess(`Welcome aboard, Captain ${data.name}!`);
  };

  const setWatchingArc = (arc: GuideArcItem) => {
    setCurrentArcId(arc.id);
    setCurrentEpisode(arc.startEp);
    showSuccess(`Now sailing: ${arc.title} (${arc.episodes})`);
  };

  const toggleComplete = (id: string) => {
    const nextSet = new Set(completedIds);
    if (nextSet.has(id)) {
      nextSet.delete(id);
    } else {
      nextSet.add(id);
      if (nextSet.size === totalItems) {
        confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 } });
        showSuccess("👑 Grand Line fully conquered! You are the Pirate King!");
      } else {
        showSuccess("Arc completed and recorded in Logbook!");
        // Auto-advance to next unfinished arc
        const nextIncomplete = CANON_EPISODE_GUIDE.find(item => !nextSet.has(item.id));
        if (nextIncomplete) {
          setCurrentArcId(nextIncomplete.id);
          setCurrentEpisode(nextIncomplete.startEp);
        }
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
      showSuccess("Marked as favorite");
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
      currentWatchingArcId: currentArcId,
      currentWatchingEpisode: currentEpisode,
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
          if (parsed.currentWatchingArcId) setCurrentArcId(parsed.currentWatchingArcId);
          if (parsed.currentWatchingEpisode) setCurrentEpisode(parsed.currentWatchingEpisode);
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

  const filteredItems = CANON_EPISODE_GUIDE.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.episodes.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.saga.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesType = true;
    if (typeFilter === 'canon') matchesType = item.type === 'canon';
    if (typeFilter === 'filler') matchesType = item.type === 'filler';
    if (typeFilter === 'skip-recommended') matchesType = item.skipStatus === 'recommended-skip';
    if (typeFilter === 'must-watch') matchesType = item.skipStatus === 'must-watch' || item.skipStatus === 'worth-watching';

    const matchesSaga = selectedSaga === 'all' || item.saga === selectedSaga;
    const matchesBookmark = !bookmarksOnly || bookmarkedIds.has(item.id);

    return matchesSearch && matchesType && matchesSaga && matchesBookmark;
  });

  return (
    <div className="min-h-screen bg-[#160d08] text-[#2b1810] pb-24 md:pb-12 font-serif select-none">
      <input type="file" ref={fileInputRef} onChange={handleRestoreImport} accept=".json" className="hidden" />

      {/* Responsive Top Header */}
      <header className="sticky top-0 z-30 bg-[#160d08]/95 backdrop-blur-md px-4 sm:px-8 py-3.5 border-b border-[#8b5a2b]/30 text-[#f5ebd7]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#8b5a2b]/30 border border-[#8b5a2b]/50 rounded-xl flex items-center justify-center text-[#f5ebd7] shadow">
              <BookOpen size={18} />
            </div>
            <div>
              <h1 className="font-bold text-sm sm:text-base tracking-wide uppercase">
                Grand Line Diary & Episode Navigator
              </h1>
              <p className="text-[11px] text-[#a89083] font-sans">
                Captain <span className="font-bold text-[#f5ebd7]">{pirateName}</span> • Current: <span className="font-mono text-[#f5ebd7]">Ep. {currentEpisode}</span>
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <div className="hidden md:flex items-center gap-2 bg-[#26150c] p-1 rounded-2xl border border-[#8b5a2b]/30">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl font-serif text-xs font-bold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-[#8b5a2b] text-[#f5ebd7] shadow-sm'
                  : 'text-[#a89083] hover:text-[#f5ebd7]'
              }`}
            >
              <Compass size={14} /> Voyage
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl font-serif text-xs font-bold transition-all ${
                activeTab === 'guide'
                  ? 'bg-[#8b5a2b] text-[#f5ebd7] shadow-sm'
                  : 'text-[#a89083] hover:text-[#f5ebd7]'
              }`}
            >
              <BookOpen size={14} /> Logbook & Filler Guide
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl font-serif text-xs font-bold transition-all ${
                activeTab === 'profile'
                  ? 'bg-[#8b5a2b] text-[#f5ebd7] shadow-sm'
                  : 'text-[#a89083] hover:text-[#f5ebd7]'
              }`}
            >
              <Scroll size={14} /> Bounty & Crew
            </button>
          </div>

          <div className="flex items-center gap-2">
            <OceanAmbience />
            <button 
              onClick={() => setIsPWAModalOpen(true)}
              className="p-2 bg-[#8b5a2b]/20 hover:bg-[#8b5a2b]/40 text-[#f5ebd7] rounded-xl text-xs font-sans font-semibold flex items-center gap-1.5 border border-[#8b5a2b]/30 active:scale-95 transition-all"
              title="Install Mobile App"
            >
              <Smartphone size={14} />
              <span className="hidden sm:inline">PWA App</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Responsive Body Container */}
      <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* ========================================================== */}
        {/* TAB 1: VOYAGE DASHBOARD (Desktop 2-Column Grid)            */}
        {/* ========================================================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Top Row: Identity & Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Captain ID Card */}
              <div className="md:col-span-2 bg-[#f7f1e1] border-2 border-[#8b5a2b]/30 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-[#8b5a2b]/20 pb-2.5 mb-3">
                  <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#6e4624] flex items-center gap-1">
                    <Award size={14} /> Captain Certificate
                  </span>
                  <button 
                    onClick={() => setIsEditProfileOpen(true)}
                    className="text-[11px] text-[#6e4624] hover:text-[#2b1810] font-sans font-bold flex items-center gap-1"
                  >
                    <Edit3 size={12} /> Edit Identity
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#6e4624] text-[#f7f1e1] rounded-2xl flex items-center justify-center font-bold text-2xl border-2 border-[#8b5a2b] shadow-inner shrink-0">
                    {pirateName[0] || 'C'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#2b1810] leading-tight truncate">
                      {pirateName}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#6e4624] italic truncate">"{pirateTitle}"</p>
                    <p className="text-xs font-sans text-[#8b5a2b] mt-0.5">Port of Origin: {pirateLocation}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[10px] font-sans font-bold uppercase text-[#8b5a2b]">Current Bounty</p>
                    <p className="text-base sm:text-lg font-mono font-bold text-[#8b1e1e]">
                      ฿ {currentBounty.formattedBounty}
                    </p>
                  </div>
                </div>
              </div>

              {/* Crew & Fleet Quick Summary */}
              <div className="bg-[#f7f1e1] border-2 border-[#8b5a2b]/30 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-[#8b5a2b]/20 pb-2 mb-2">
                  <span className="font-bold text-xs uppercase tracking-wider text-[#6e4624] flex items-center gap-1.5">
                    <Users size={14} /> Active Crew
                  </span>
                  <span className="text-[11px] font-mono font-bold text-[#8b5a2b]">
                    {unlockedCrew.length}/10 Recruited
                  </span>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
                  {unlockedCrew.map(member => (
                    <div 
                      key={member.id}
                      onClick={() => setIsCrewRosterOpen(true)}
                      className="w-8 h-8 rounded-xl bg-[#ede2ca] border border-[#8b5a2b]/40 flex items-center justify-center text-sm shrink-0 cursor-pointer shadow-sm active:scale-95 transition-all"
                      title={`${member.name} (${member.role})`}
                    >
                      {member.avatarIcon}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setIsCrewRosterOpen(true)}
                  className="mt-2 w-full bg-[#6e4624] hover:bg-[#573519] text-[#f7f1e1] font-sans font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow transition-all active:scale-95"
                >
                  <Users size={13} /> Inspect Nakama Roster ({unlockedAllies.length} Allies)
                </button>
              </div>

            </div>

            {/* Main Center Stage: Currently Watching & Sea Chart Map */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Currently Watching Stage */}
              <div className="lg:col-span-6 space-y-4">
                <CurrentlyWatchingCard
                  arcId={activeArc.id}
                  arcTitle={activeArc.title}
                  arcEpisodes={activeArc.episodes}
                  arcDescription={activeArc.summary}
                  currentEpisode={currentEpisode}
                  onIncrementEpisode={() => {
                    setCurrentEpisode(prev => prev + 1);
                    showSuccess(`Logged Ep. ${currentEpisode + 1}`);
                  }}
                  onDecrementEpisode={() => {
                    if (currentEpisode > 1) {
                      setCurrentEpisode(prev => prev - 1);
                    }
                  }}
                  onSetEpisode={(ep) => setCurrentEpisode(ep)}
                  onCompleteArc={() => toggleComplete(activeArc.id)}
                  onOpenLogbook={() => setActiveTab('guide')}
                  onOpenCrewRoster={() => setIsCrewRosterOpen(true)}
                />
              </div>

              {/* Right Column: Grand Line Map */}
              <div className="lg:col-span-6 space-y-4">
                <SailingMap progress={progressPercentage} currentArc={activeArc?.title || 'East Blue'} />
              </div>

            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 2: LOGBOOK & CANON/FILLER GUIDE                        */}
        {/* ========================================================== */}
        {activeTab === 'guide' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            
            {/* Guide Info Banner */}
            <div className="bg-[#ede2ca] border-2 border-[#8b5a2b]/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-sans shadow-sm">
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-sm sm:text-base text-[#2b1810] flex items-center gap-1.5">
                  <Info size={16} className="text-[#6e4624]" /> Complete Episode Guide & Filler Skip Advisor
                </h3>
                <p className="text-[#6e4624]">
                  Track all 34 sagas and arcs with clear badges for <strong className="text-emerald-800">Must Watch Canon</strong>, <strong className="text-rose-800">Skips</strong>, and <strong className="text-amber-800">Fan-Favorite Fillers (G-8)</strong>.
                </p>
              </div>

              <div className="flex items-center gap-2 font-mono text-[11px] shrink-0 bg-[#f7f1e1] px-3 py-1.5 rounded-xl border border-[#8b5a2b]/20">
                <span>Completed:</span>
                <strong className="text-[#2b1810]">{completedCount} / {totalItems} Arcs</strong>
              </div>
            </div>

            {/* Filter & Search Dashboard */}
            <div className="bg-[#f7f1e1] p-4 rounded-2xl border-2 border-[#8b5a2b]/30 shadow-sm space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* Search Input */}
                <div className="sm:col-span-2 relative">
                  <Search className="absolute left-3.5 top-3 text-[#8b5a2b]" size={15} />
                  <input 
                    type="text"
                    placeholder="Search island, arc name, saga, episode number..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-[#ede2ca] border border-[#8b5a2b]/30 rounded-xl text-xs font-sans text-[#2b1810] placeholder-[#8b5a2b]/60 focus:outline-none"
                  />
                </div>

                {/* Saga Dropdown */}
                <div className="relative">
                  <select
                    value={selectedSaga}
                    onChange={(e) => setSelectedSaga(e.target.value)}
                    className="w-full px-3 py-2 bg-[#ede2ca] border border-[#8b5a2b]/30 rounded-xl text-xs font-sans text-[#2b1810] focus:outline-none"
                  >
                    <option value="all">All Sagas (All Arcs)</option>
                    {allSagas.map(s => (
                      <option key={s} value={s}>{s} Saga</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#8b5a2b]/20 font-sans text-xs">
                <span className="text-[10px] uppercase font-bold text-[#8b5a2b] mr-1">Filter:</span>
                
                <button
                  onClick={() => setTypeFilter('all')}
                  className={`px-3 py-1 rounded-xl transition-all font-semibold ${
                    typeFilter === 'all'
                      ? 'bg-[#6e4624] text-[#f7f1e1] shadow-sm'
                      : 'bg-[#ede2ca] text-[#6e4624] hover:bg-[#dfd0b5]'
                  }`}
                >
                  All ({CANON_EPISODE_GUIDE.length})
                </button>

                <button
                  onClick={() => setTypeFilter('canon')}
                  className={`px-3 py-1 rounded-xl transition-all font-semibold flex items-center gap-1 ${
                    typeFilter === 'canon'
                      ? 'bg-emerald-800 text-white shadow-sm'
                      : 'bg-[#ede2ca] text-emerald-900 hover:bg-[#dfd0b5]'
                  }`}
                >
                  <CheckCircle2 size={12} /> Canon Only
                </button>

                <button
                  onClick={() => setTypeFilter('skip-recommended')}
                  className={`px-3 py-1 rounded-xl transition-all font-semibold flex items-center gap-1 ${
                    typeFilter === 'skip-recommended'
                      ? 'bg-rose-800 text-white shadow-sm'
                      : 'bg-[#ede2ca] text-rose-900 hover:bg-[#dfd0b5]'
                  }`}
                >
                  <AlertTriangle size={12} /> Recommended Skips
                </button>

                <button
                  onClick={() => setBookmarksOnly(!bookmarksOnly)}
                  className={`px-3 py-1 rounded-xl transition-all font-semibold flex items-center gap-1 ml-auto ${
                    bookmarksOnly
                      ? 'bg-[#6e4624] text-[#f7f1e1]'
                      : 'bg-[#ede2ca] text-[#6e4624] hover:bg-[#dfd0b5]'
                  }`}
                >
                  <Bookmark size={12} className={bookmarksOnly ? 'fill-current' : ''} />
                  <span>Bookmarked ({bookmarkedIds.size})</span>
                </button>
              </div>
            </div>

            {/* List of Entries (Grid on Desktop, Column on Mobile) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredItems.map((item) => {
                const isCompleted = completedIds.has(item.id);
                const isBookmarked = bookmarkedIds.has(item.id);
                const isCurrentlyWatching = currentArcId === item.id;
                const isExpanded = expandedId === item.id;
                const currentNote = customNotes[item.id] || '';

                return (
                  <div 
                    key={item.id}
                    className={`border-2 rounded-2xl transition-all overflow-hidden flex flex-col justify-between ${
                      isCurrentlyWatching
                        ? 'bg-[#fdf8eb] border-[#8b5a2b] ring-2 ring-[#8b5a2b]/40 shadow-md'
                        : isCompleted 
                        ? 'bg-[#ede2ca]/60 border-[#8b5a2b]/20 opacity-80' 
                        : 'bg-[#f7f1e1] border-[#8b5a2b]/30 shadow-sm hover:border-[#8b5a2b]'
                    }`}
                  >
                    <div 
                      className="p-3.5 sm:p-4 cursor-pointer"
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    >
                      {/* Top status bar of card */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {/* Canon / Filler Badge */}
                          <span className={`text-[10px] font-sans font-bold px-2 py-0.5 rounded-md ${
                            item.type === 'canon' 
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' 
                              : item.skipStatus === 'worth-watching'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-rose-100 text-rose-900 border border-rose-300'
                          }`}>
                            {item.type === 'canon' ? 'Manga Canon' : item.skipStatus === 'worth-watching' ? 'Filler (Fan Favorite)' : 'Anime Filler'}
                          </span>

                          {/* Skip Recommendation */}
                          {item.skipStatus === 'must-watch' && (
                            <span className="text-[10px] font-sans font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                              ✓ Essential
                            </span>
                          )}
                          {item.skipStatus === 'recommended-skip' && (
                            <span className="text-[10px] font-sans font-semibold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded flex items-center gap-1">
                              ✕ Skip Suggested
                            </span>
                          )}
                          {item.skipStatus === 'worth-watching' && (
                            <span className="text-[10px] font-sans font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                              ★ Highly Recommended
                            </span>
                          )}
                        </div>

                        <span className="text-[11px] font-mono font-bold text-[#6e4624] bg-[#ede2ca] px-2 py-0.5 rounded border border-[#8b5a2b]/20">
                          {item.episodes}
                        </span>
                      </div>

                      {/* Header Title & Checkmark */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
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
                            title={isCompleted ? "Mark Unwatched" : "Mark Watched"}
                          >
                            {isCompleted && <Check size={12} />}
                          </button>

                          <div className="min-w-0">
                            <h4 className={`font-serif font-bold text-sm sm:text-base text-[#2b1810] leading-snug truncate ${
                              isCompleted ? 'line-through text-[#8b5a2b]' : ''
                            }`}>
                              {item.title}
                            </h4>
                            <p className="text-[11px] font-sans text-[#8b5a2b]">{item.saga} Saga</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          {!isCurrentlyWatching && !isCompleted && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setWatchingArc(item);
                              }}
                              className="p-1 rounded text-[#8b5a2b]/70 hover:text-[#6e4624] hover:bg-[#ede2ca] transition-colors"
                              title="Set as Currently Watching"
                            >
                              <Play size={14} />
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBookmark(item.id);
                            }}
                            className={`p-1 rounded ${isBookmarked ? 'text-[#8b5a2b]' : 'text-[#8b5a2b]/30 hover:text-[#8b5a2b]'}`}
                          >
                            <Bookmark size={15} className={isBookmarked ? 'fill-current' : ''} />
                          </button>
                          {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                        </div>
                      </div>

                      {/* Brief Summary */}
                      <p className="text-xs text-[#6e4624] font-sans mt-2 line-clamp-2 leading-relaxed">
                        {item.summary}
                      </p>
                    </div>

                    {/* Expandable Details & Journal Note */}
                    {isExpanded && (
                      <div className="p-3.5 sm:p-4 border-t border-dashed border-[#8b5a2b]/30 bg-[#ede2ca]/70 font-sans text-xs space-y-3">
                        {item.mangaChapters && (
                          <p className="text-[11px] text-[#8b5a2b]">
                            <strong className="text-[#2b1810]">Manga chapters:</strong> {item.mangaChapters}
                          </p>
                        )}

                        {item.keyEvents && item.keyEvents.length > 0 && (
                          <div className="space-y-1">
                            <p className="font-bold text-[11px] text-[#2b1810] uppercase">Notable Key Events:</p>
                            <ul className="list-disc list-inside space-y-0.5 text-[#6e4624] text-[11px]">
                              {item.keyEvents.map((evt, idx) => (
                                <li key={idx}>{evt}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {!isCurrentlyWatching && (
                          <button
                            onClick={() => setWatchingArc(item)}
                            className="w-full bg-[#6e4624] hover:bg-[#573519] text-[#f7f1e1] py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow active:scale-95 transition-all"
                          >
                            <Play size={13} className="fill-current" /> Set as Currently Watching
                          </button>
                        )}

                        <div className="space-y-1 pt-1">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8b5a2b]">
                            Captain Log Note
                          </label>
                          <textarea
                            value={currentNote}
                            onChange={(e) => updateArcNote(item.id, e.target.value)}
                            placeholder="Write your reaction or thoughts..."
                            rows={2}
                            className="w-full p-2 bg-[#f7f1e1] border border-[#8b5a2b]/30 rounded-xl text-xs font-serif text-[#2b1810] focus:outline-none"
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

        {/* ========================================================== */}
        {/* TAB 3: BOUNTY POSTER, NAKAMA & DATA ARCHIVE                */}
        {/* ========================================================== */}
        {activeTab === 'profile' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Official Wanted Poster */}
              <div className="lg:col-span-5">
                <WantedPoster 
                  currentEpisode={currentEpisode}
                  completedCount={completedCount} 
                  totalArcs={totalItems}
                  username={pirateName} 
                  location={pirateLocation} 
                  joinedDate={joinedDate} 
                  onOpenCrewRoster={() => setIsCrewRosterOpen(true)}
                />
              </div>

              {/* Right Column: Crew Roster & Archive Utilities */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Straw Hat Crew & Flagships Card */}
                <div className="bg-[#f7f1e1] border-2 border-[#8b5a2b]/30 rounded-2xl p-5 shadow-sm font-sans space-y-3">
                  <div className="flex items-center justify-between border-b border-[#8b5a2b]/20 pb-2.5">
                    <span className="font-serif font-bold text-sm uppercase tracking-wider text-[#6e4624] flex items-center gap-1.5">
                      <Users size={16} /> Straw Hat Crew & Flagships
                    </span>
                    <span className="text-xs font-mono font-bold text-[#8b5a2b]">
                      Flagship: {activeShip.name}
                    </span>
                  </div>

                  <p className="text-xs text-[#6e4624] leading-relaxed">
                    Crew members, ships, and Grand Fleet alliances unlock organically as you log through episodes.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
                    {unlockedCrew.map(member => (
                      <div 
                        key={member.id}
                        onClick={() => setIsCrewRosterOpen(true)}
                        className="p-2.5 rounded-xl bg-[#ede2ca] border border-[#8b5a2b]/30 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#6e4624] transition-all shadow-sm active:scale-95"
                      >
                        <span className="text-2xl mb-1">{member.avatarIcon}</span>
                        <p className="font-serif font-bold text-xs text-[#2b1810] truncate w-full">
                          {member.id === 'luffy' ? pirateName : member.name}
                        </p>
                        <p className="text-[10px] text-[#8b5a2b] truncate w-full">{member.role}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setIsCrewRosterOpen(true)}
                    className="w-full mt-2 bg-[#6e4624] hover:bg-[#573519] text-[#f7f1e1] font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow active:scale-98 transition-all"
                  >
                    <Users size={14} /> Open Full Roster & Grand Fleet Details
                  </button>
                </div>

                {/* Data Backup & Restore */}
                <div className="bg-[#f7f1e1] border-2 border-[#8b5a2b]/30 rounded-2xl p-5 shadow-sm font-sans space-y-3">
                  <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-[#6e4624] border-b border-[#8b5a2b]/20 pb-2">
                    Logbook Archive & Backup
                  </h3>
                  
                  <p className="text-xs text-[#6e4624]">
                    Export your watch progress, bounties, and journal notes to a JSON file to keep safe or sync between devices.
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <button
                      onClick={handleBackupExport}
                      className="bg-[#6e4624] hover:bg-[#573519] text-[#f7f1e1] font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow active:scale-98 transition-all"
                    >
                      <HardDrive size={14} /> Export Backup
                    </button>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-[#ede2ca] hover:bg-[#dfd0b5] text-[#2b1810] font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 border border-[#8b5a2b]/30 active:scale-98 transition-all"
                    >
                      <Upload size={14} /> Restore Backup
                    </button>
                  </div>

                  <button
                    onClick={() => setIsOnboardingOpen(true)}
                    className="w-full py-1.5 text-xs text-[#6e4624] hover:text-[#2b1810] flex items-center justify-center gap-1"
                  >
                    <RotateCcw size={12} /> Restart First-Time Sailor Onboarding
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

      </main>

      {/* Mobile Floating Bottom Bar */}
      <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Modals & Dialogs */}
      <CrewAndAlliesModal
        isOpen={isCrewRosterOpen}
        onClose={() => setIsCrewRosterOpen(false)}
        currentEpisode={currentEpisode}
        captainName={pirateName}
      />

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