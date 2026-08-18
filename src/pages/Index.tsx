"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
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
  Users,
  Compass,
  BookOpen,
  Scroll,
  Smartphone,
  Navigation,
  Sparkles
} from 'lucide-react';
import WantedPoster from '@/components/WantedPoster';
import SailingMap from '@/components/SailingMap';
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

const TOTAL_ANIME_EPISODES = 1122;

const Index = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'guide' | 'profile'>('dashboard');

  // Onboarding
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(() => {
    return !localStorage.getItem('hasCompletedOnboarding');
  });

  // Profile Identity
  const [pirateName, setPirateName] = useState<string>(() => localStorage.getItem('pirateName') || 'Captain');
  const [pirateLocation, setPirateLocation] = useState<string>(() => localStorage.getItem('pirateLocation') || 'East Blue');
  const [joinedDate, setJoinedDate] = useState<string>(() => localStorage.getItem('joinedDate') || 'Aug 18, 2013');
  const [pirateTitle, setPirateTitle] = useState<string>(() => localStorage.getItem('pirateTitle') || 'Rookie Adventurer');

  // Progress Tracking
  const [completedIds, setCompletedIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('completedArcs');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('bookmarkedArcs');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

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

  // Modals
  const [isPWAModalOpen, setIsPWAModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isCrewRosterOpen, setIsCrewRosterOpen] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'canon' | 'filler' | 'skip-recommended'>('all');
  const [selectedSaga, setSelectedSaga] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Persistence
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
  const activeArc = CANON_EPISODE_GUIDE.find(item => item.id === currentArcId) || CANON_EPISODE_GUIDE[0];
  const unlockedCrew = getUnlockedCrew(currentEpisode);
  const unlockedAllies = getUnlockedAllies(currentEpisode);
  const activeShip = getActiveShip(currentEpisode);
  const currentBounty = getCurrentBounty(currentEpisode);

  // Unique sagas for quick jumps
  const allSagas = Array.from(new Set(CANON_EPISODE_GUIDE.map(item => item.saga)));

  const scrollToCurrentArc = () => {
    // If the active arc was filtered out by saga, reset saga filter to 'all'
    if (selectedSaga !== 'all') {
      setSelectedSaga('all');
    }
    setTimeout(() => {
      const el = document.getElementById(`arc-card-${currentArcId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setExpandedId(currentArcId);
      }
    }, 50);
  };

  const handleOnboardingComplete = (data: { name: string; location: string; title: string }) => {
    setPirateName(data.name);
    setPirateLocation(data.location);
    setPirateTitle(data.title);
    localStorage.setItem('hasCompletedOnboarding', 'true');
    setIsOnboardingOpen(false);
    showSuccess(`Welcome aboard, Captain ${data.name}`);
  };

  const setWatchingArc = (arc: GuideArcItem) => {
    setCurrentArcId(arc.id);
    setCurrentEpisode(arc.startEp);
    showSuccess(`Sailing ${arc.title}`);
  };

  const toggleComplete = (id: string) => {
    const nextSet = new Set(completedIds);
    if (nextSet.has(id)) {
      nextSet.delete(id);
    } else {
      nextSet.add(id);
      if (nextSet.size === totalItems) {
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
        showSuccess("Grand Line completed!");
      } else {
        showSuccess("Arc completed");
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
    if (nextSet.has(id)) nextSet.delete(id);
    else nextSet.add(id);
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
    a.download = `GrandLine_${pirateName}.json`;
    a.click();
    showSuccess("Log exported");
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
          showSuccess("Log restored");
        } catch {
          showError("Invalid backup file");
        }
      };
    }
  };

  const filteredItems = CANON_EPISODE_GUIDE.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.episodes.toLowerCase().includes(searchQuery.toLowerCase());
    let matchesType = true;
    if (typeFilter === 'canon') matchesType = item.type === 'canon';
    if (typeFilter === 'filler') matchesType = item.type === 'filler';
    if (typeFilter === 'skip-recommended') matchesType = item.skipStatus === 'recommended-skip';
    
    const matchesSaga = selectedSaga === 'all' || item.saga === selectedSaga;
    return matchesSearch && matchesType && matchesSaga;
  });

  return (
    <div className="min-h-screen bg-[#120a06] text-white/90 font-sans select-none pb-24 md:pb-12">
      <input type="file" ref={fileInputRef} onChange={handleRestoreImport} accept=".json" className="hidden" />

      {/* Minimal Apple-Style Header */}
      <header className="sticky top-0 z-30 bg-[#120a06]/85 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-base font-semibold tracking-tight text-white">Grand Line</h1>
            <span className="text-xs text-white/40 font-mono hidden sm:inline">
              Ep {currentEpisode} / {TOTAL_ANIME_EPISODES}
            </span>
          </div>

          {/* Desktop Minimal Segmented Control */}
          <div className="hidden md:flex items-center bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'dashboard' ? 'bg-white/15 text-white shadow-sm' : 'text-white/50 hover:text-white'
              }`}
            >
              Voyage
            </button>
            <button
              onClick={() => {
                setActiveTab('guide');
                setTimeout(scrollToCurrentArc, 100);
              }}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'guide' ? 'bg-white/15 text-white shadow-sm' : 'text-white/50 hover:text-white'
              }`}
            >
              Logbook
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'profile' ? 'bg-white/15 text-white shadow-sm' : 'text-white/50 hover:text-white'
              }`}
            >
              Bounty & Nakama
            </button>
          </div>

          <button 
            onClick={() => setIsPWAModalOpen(true)}
            className="text-xs font-medium text-white/60 hover:text-white px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-1.5"
          >
            <Smartphone size={13} />
            <span className="hidden sm:inline">PWA</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">

        {/* TAB 1: VOYAGE */}
        {activeTab === 'dashboard' && (
          <div className="space-y-5 animate-in fade-in duration-150">
            {/* Top Minimal Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 bg-[#1c120c] border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 font-semibold flex items-center justify-center text-lg">
                    {pirateName[0] || 'C'}
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-white leading-tight">{pirateName}</h2>
                    <p className="text-xs text-white/40">{pirateLocation} • "{pirateTitle}"</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsEditProfileOpen(true)}
                  className="text-xs text-white/50 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-white/5"
                >
                  <Edit3 size={12} /> Edit
                </button>
              </div>

              <div className="bg-[#1c120c] border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-white/40 uppercase font-semibold">Bounty</span>
                  <p className="text-base font-mono font-bold text-amber-400">฿ {currentBounty.formattedBounty}</p>
                </div>
                <button
                  onClick={() => setIsCrewRosterOpen(true)}
                  className="text-xs text-white/70 hover:text-white bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5"
                >
                  {unlockedCrew.length} Crew →
                </button>
              </div>
            </div>

            {/* Main Center Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <CurrentlyWatchingCard
                arcId={activeArc.id}
                arcTitle={activeArc.title}
                arcEpisodes={activeArc.episodes}
                arcDescription={activeArc.summary}
                currentEpisode={currentEpisode}
                onIncrementEpisode={() => {
                  setCurrentEpisode(prev => prev + 1);
                  showSuccess(`Logged Ep ${currentEpisode + 1}`);
                }}
                onDecrementEpisode={() => {
                  if (currentEpisode > 1) setCurrentEpisode(prev => prev - 1);
                }}
                onCompleteArc={() => toggleComplete(activeArc.id)}
                onOpenLogbook={() => {
                  setActiveTab('guide');
                  setTimeout(scrollToCurrentArc, 100);
                }}
                onOpenCrewRoster={() => setIsCrewRosterOpen(true)}
              />

              <SailingMap 
                currentEpisode={currentEpisode} 
                totalEpisodes={TOTAL_ANIME_EPISODES} 
                currentArcTitle={activeArc.title} 
              />
            </div>
          </div>
        )}

        {/* TAB 2: LOGBOOK */}
        {activeTab === 'guide' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            
            {/* Quick Jump to Active Arc Anchor Bar */}
            <div className="bg-[#1c120c] border border-amber-500/30 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] uppercase font-semibold text-white/40 tracking-wider">Currently Watching</p>
                  <p className="text-xs font-semibold text-white truncate">
                    {activeArc.title} <span className="text-white/40 font-mono font-normal">({activeArc.episodes})</span>
                  </p>
                </div>
              </div>

              <button
                onClick={scrollToCurrentArc}
                className="shrink-0 bg-amber-500 hover:bg-amber-400 text-black px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
              >
                <Navigation size={12} className="rotate-45" />
                <span>Jump to Arc</span>
              </button>
            </div>

            {/* Saga Jump Rail */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              <button
                onClick={() => setSelectedSaga('all')}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                  selectedSaga === 'all'
                    ? 'bg-white/20 text-white font-medium shadow-sm'
                    : 'bg-white/5 text-white/40 hover:text-white'
                }`}
              >
                All Sagas
              </button>
              {allSagas.map(saga => (
                <button
                  key={saga}
                  onClick={() => setSelectedSaga(saga)}
                  className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                    selectedSaga === saga
                      ? 'bg-white/20 text-white font-medium shadow-sm'
                      : 'bg-white/5 text-white/40 hover:text-white'
                  }`}
                >
                  {saga}
                </button>
              ))}
            </div>

            {/* Search & Minimal Filters */}
            <div className="bg-[#1c120c] border border-white/10 rounded-2xl p-3 space-y-2.5">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-white/30" size={14} />
                <input 
                  type="text"
                  placeholder="Search arc name or episode..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                <button
                  onClick={() => setTypeFilter('all')}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${typeFilter === 'all' ? 'bg-white/20 text-white font-medium' : 'text-white/40 hover:text-white'}`}
                >
                  All ({filteredItems.length})
                </button>
                <button
                  onClick={() => setTypeFilter('canon')}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${typeFilter === 'canon' ? 'bg-white/20 text-white font-medium' : 'text-white/40 hover:text-white'}`}
                >
                  Canon
                </button>
                <button
                  onClick={() => setTypeFilter('filler')}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${typeFilter === 'filler' ? 'bg-white/20 text-white font-medium' : 'text-white/40 hover:text-white'}`}
                >
                  Filler
                </button>
                <button
                  onClick={() => setTypeFilter('skip-recommended')}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${typeFilter === 'skip-recommended' ? 'bg-rose-500/20 text-rose-300 font-medium' : 'text-white/40 hover:text-white'}`}
                >
                  Skips
                </button>
              </div>
            </div>

            {/* Compact Arc List */}
            <div className="space-y-2">
              {filteredItems.map((item) => {
                const isCompleted = completedIds.has(item.id);
                const isBookmarked = bookmarkedIds.has(item.id);
                const isWatching = currentArcId === item.id;
                const isExpanded = expandedId === item.id;

                return (
                  <div 
                    id={`arc-card-${item.id}`}
                    key={item.id}
                    className={`border rounded-xl transition-all overflow-hidden scroll-mt-24 ${
                      isWatching 
                        ? 'bg-[#241710] border-amber-500 ring-1 ring-amber-500/50 shadow-md'
                        : isCompleted 
                        ? 'bg-[#1c120c]/60 border-white/5 opacity-60'
                        : 'bg-[#1c120c] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div 
                      className="p-3 flex items-center justify-between gap-3 cursor-pointer"
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleComplete(item.id);
                          }}
                          className={`w-5 h-5 rounded-md flex items-center justify-center border shrink-0 transition-colors ${
                            isCompleted ? 'bg-amber-500 text-black border-amber-500' : 'border-white/20 hover:border-white/40'
                          }`}
                        >
                          {isCompleted && <Check size={12} />}
                        </button>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className={`text-xs font-semibold text-white truncate ${isCompleted ? 'line-through text-white/40' : ''}`}>
                              {item.title}
                            </h4>
                            {isWatching && (
                              <span className="text-[9px] font-bold bg-amber-500 text-black px-1.5 py-0.2 rounded uppercase">
                                Active
                              </span>
                            )}
                            <span className="text-[10px] text-white/40 font-mono shrink-0">{item.episodes}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {item.type === 'canon' ? (
                          <span className="text-[10px] text-emerald-400/80 bg-emerald-400/10 px-1.5 py-0.5 rounded">Canon</span>
                        ) : item.skipStatus === 'worth-watching' ? (
                          <span className="text-[10px] text-amber-400/80 bg-amber-400/10 px-1.5 py-0.5 rounded">G-8 Best</span>
                        ) : (
                          <span className="text-[10px] text-rose-400/80 bg-rose-400/10 px-1.5 py-0.5 rounded">Skip</span>
                        )}

                        {!isWatching && !isCompleted && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setWatchingArc(item);
                            }}
                            className="p-1 text-white/40 hover:text-white"
                            title="Set Watching"
                          >
                            <Play size={13} />
                          </button>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(item.id);
                          }}
                          className={`p-1 ${isBookmarked ? 'text-amber-400' : 'text-white/20 hover:text-white/50'}`}
                        >
                          <Bookmark size={13} className={isBookmarked ? 'fill-current' : ''} />
                        </button>
                        {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-3 border-t border-white/5 bg-black/20 text-xs text-white/70 space-y-2.5">
                        <p className="leading-relaxed">{item.summary}</p>
                        <div className="flex items-center justify-between pt-1">
                          {!isWatching && (
                            <button
                              onClick={() => setWatchingArc(item)}
                              className="text-xs text-amber-400 hover:text-amber-300 font-medium"
                            >
                              Set as current arc →
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: BOUNTY & NAKAMA */}
        {activeTab === 'profile' && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
              <WantedPoster 
                currentEpisode={currentEpisode}
                completedCount={completedCount} 
                totalArcs={totalItems}
                username={pirateName} 
                location={pirateLocation} 
                joinedDate={joinedDate} 
                onOpenCrewRoster={() => setIsCrewRosterOpen(true)}
              />

              <div className="space-y-4">
                {/* Crew Card */}
                <div className="bg-[#1c120c] border border-white/10 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white">Active Crew</h3>
                    <span className="text-xs font-mono text-white/40">{unlockedCrew.length} Recruited</span>
                  </div>

                  <div className="grid grid-cols-5 gap-2 pt-1">
                    {unlockedCrew.map(member => (
                      <div 
                        key={member.id}
                        onClick={() => setIsCrewRosterOpen(true)}
                        className="p-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 text-center cursor-pointer transition-all"
                        title={member.name}
                      >
                        <span className="text-xl">{member.avatarIcon}</span>
                        <p className="text-[10px] text-white/70 truncate mt-1">{member.name.split(' ')[0]}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setIsCrewRosterOpen(true)}
                    className="w-full mt-2 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-medium text-white/80 transition-colors"
                  >
                    View All Nakama & Fleet
                  </button>
                </div>

                {/* Data Backup */}
                <div className="bg-[#1c120c] border border-white/10 rounded-2xl p-5 space-y-3">
                  <h3 className="text-sm font-semibold text-white">Data Management</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleBackupExport}
                      className="py-2 bg-white/10 hover:bg-white/15 rounded-xl text-xs font-medium text-white transition-colors"
                    >
                      Export Log
                    </button>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-medium text-white/70 transition-colors border border-white/5"
                    >
                      Restore Log
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Mobile Nav */}
      <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Dialogs */}
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
          showSuccess("Updated");
        }}
      />
    </div>
  );
};

export default Index;