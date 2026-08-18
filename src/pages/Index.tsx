"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Check,
  Edit3,
  Bookmark,
  Play,
  Navigation,
  Smartphone,
  Users,
  Compass,
  BookOpen,
  Scroll,
  Award,
  Download,
  Upload,
  Sparkles,
} from "lucide-react";
import WantedPoster from "@/components/WantedPoster";
import SailingMap from "@/components/SailingMap";
import MobileBottomNav from "@/components/MobileBottomNav";
import InstallPWAModal from "@/components/InstallPWAModal";
import EditProfileModal from "@/components/EditProfileModal";
import OnboardingModal from "@/components/OnboardingModal";
import CurrentlyWatchingCard from "@/components/CurrentlyWatchingCard";
import CrewAndAlliesModal from "@/components/CrewAndAlliesModal";
import {
  CANON_EPISODE_GUIDE,
  getCurrentBounty,
  getUnlockedCrew,
  getUnlockedAllies,
  getActiveShip,
} from "@/data/onePieceProgression";
import type { GuideArcItem } from "@/data/onePieceProgression";
import { showSuccess, showError } from "@/utils/toast";
import confetti from "canvas-confetti";

const TOTAL_ANIME_EPISODES = 1122;

const Index = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'guide' | 'profile'>('dashboard');
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [pirateName, setPirateName] = useState<string>(() => localStorage.getItem('pirateName') || 'Captain');
  const [pirateLocation, setPirateLocation] = useState<string>(() => localStorage.getItem('pirateLocation') || 'East Blue');
  const [joinedDate, setJoinedDate] = useState<string>(() => localStorage.getItem('joinedDate') || 'Aug 18, 2013');
  const [pirateTitle, setPirateTitle] = useState<string>(() => localStorage.getItem('pirateTitle') || 'Rookie Adventurer');
  const [completedIds, setCompletedIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('completedArcs');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('bookmarkedArcs');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [currentArcId, setCurrentArcId] = useState<string>(() => localStorage.getItem('currentWatchingArcId') || '1');
  const [currentEpisode, setCurrentEpisode] = useState<number>(() => {
    const saved = localStorage.getItem('currentWatchingEpisode');
    return saved ? parseInt(saved, 10) : 1;
  });
  const [customNotes, setCustomNotes] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('customArcNotes');
    return saved ? JSON.parse(saved) : {};
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'canon' | 'filler' | 'skip-recommended'>('all');
  const [selectedSaga, setSelectedSaga] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isPWAModalOpen, setIsPWAModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isCrewRosterOpen, setIsCrewRosterOpen] = useState(false);
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

  const totalItems = completedIds.size;
  const activeArc = CANON_EPISODE_GUIDE.find(item => item.id === currentArcId) || CANON_EPISODE_GUIDE[0];
  const unlockedCrew = getUnlockedCrew(currentEpisode);
  const unlockedAllies = getUnlockedAllies(currentEpisode);
  const activeShip = getActiveShip(currentEpisode);
  const currentBounty = getCurrentBounty(currentEpisode);

  const allSagas = Array.from(new Set(CANON_EPISODE_GUIDE.map(item => item.saga)));

  const scrollToCurrentArc = () => {
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
    setIsOnboardingOpen(false);
    showSuccess(`Welcome aboard, Captain ${data.name}`);
  };

  const setWatchingArc = (arc: GuideArcItem) => {
    setCurrentArcId(arc.id);
    setCurrentEpisode(arc.startEp);
    showSuccess(`Sailing ${arc.title}`);
  };

  const toggleComplete = (id: string) => {
    setCompletedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
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
      customArcNotes: customNotes,
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `GrandLine_${pirateName}.json`;
    a.click();
    showSuccess('Log exported');
  };

  const handleRestoreImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files?.[0]) {
      reader.readAsText(e.target.files[0], 'UTF-8');
      reader.onload = (evt) => {
        try {
          const parsed = JSON.parse(evt.target?.result as string);
          if (parsed.pirateName) setPirateName(parsed.pirateName);
          if (parsed.pirateLocation) setPirateLocation(parsed.pirateLocation);
          if (parsed.joinedDate) setJoinedDate(parsed.joinedDate);
          if (parsed.pirateTitle) setPirateTitle(parsed.pirateTitle);
          if (parsed.currentWatchingArcId) setCurrentArcId(parsed.currentWatchingArcId);
          if (parsed.currentWatchingEpisode) setCurrentEpisode(parsed.currentWatchingEpisode);
          if (parsed.completedArcs) setCompletedIds(new Set(parsed.completedArcs as string[]));
          if (parsed.bookmarkedArcs) setBookmarkedIds(new Set(parsed.bookmarkedArcs as string[]));
          if (parsed.customArcNotes) setCustomNotes(parsed.customArcNotes);
          showSuccess('Log restored');
        } catch {
          showError('Invalid backup file');
        }
      };
    }
  };

  const filteredItems = CANON_EPISODE_GUIDE.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.episodes.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' ||
      (typeFilter === 'canon' && item.type === 'canon') ||
      (typeFilter === 'filler' && item.type === 'filler') ||
      (typeFilter === 'skip-recommended' && item.skipStatus === 'recommended-skip');
    const matchesSaga = selectedSaga === 'all' || item.saga === selectedSaga;
    return matchesSearch && matchesType && matchesSaga;
  });

  // Helper function for saga button classes
  const getSagaButtonClass = (isSelected: boolean) => {
    if (isSelected) {
      return 'px-3 py-1.5 rounded-xl whitespace-nowrap font-bold transition-all border bg-[#8b5a2b] text-[#f7eedc] border-[#8b5a2b] shadow-sm';
    }
    return 'px-3 py-1.5 rounded-xl whitespace-nowrap font-bold transition-all border bg-[#f3e5c8] text-[#341d10] border-[#9c6a3b]/60 hover:bg-[#e8d5b3]';
  };

  // Helper function for filter button classes
  const getFilterButtonClass = (isActive: boolean, isSpecial?: boolean) => {
    if (isActive) {
      if (isSpecial) {
        return 'px-3 py-1 rounded-lg transition-colors border bg-[#8c1d18] text-white border-[#8c1d18]';
      }
      return 'px-3 py-1 rounded-lg transition-colors border bg-[#8b5a2b] text-[#f7eedc] border-[#8b5a2b]';
    }
    return 'px-3 py-1 rounded-lg transition-colors border bg-[#dfcaa5] text-[#341d10] border-[#8b5a2b]/40 hover:bg-[#d5bc93]';
  };

  return (
    <div className="min-h-screen bg-[#180e09] text-[#f4e6cc] font-serif select-none pb-24 md:pb-12 bg-[radial-gradient(#8b5a2b_0.75px,transparent_0.75px)] [background-size:16px_16px]">
      <input type="file" ref={fileInputRef} onChange={handleRestoreImport} accept=".json" className="hidden" />
      
      <header className="sticky top-0 z-30 bg-[#25150c]/95 backdrop-blur-xl border-b-2 border-[#8b5a2b]/40 px-4 sm:px-8 py-3.5 shadow-lg">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-black tracking-wider text-[#f3e5c8] uppercase drop-shadow">Grand Line</h1>
            <span className="text-xs text-[#b89574] font-mono hidden sm:inline bg-[#190d07] px-2 py-0.5 rounded-md border border-[#8b5a2b]/30">
              Ep {currentEpisode} / {TOTAL_ANIME_EPISODES}
            </span>
          </div>
          <div className="hidden md:flex items-center bg-[#150c07] p-1 rounded-xl border border-[#8b5a2b]/40 text-xs shadow-inner">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={activeTab === 'dashboard' 
                ? 'px-4 py-1.5 rounded-lg font-bold transition-all bg-[#8b5a2b] text-[#f7eedc] shadow-sm' 
                : 'px-4 py-1.5 rounded-lg font-bold transition-all text-[#b89574] hover:text-[#f3e5c8]'}
            >
              Voyage
            </button>
            <button
              onClick={() => {
                setActiveTab('guide');
                setTimeout(scrollToCurrentArc, 100);
              }}
              className={activeTab === 'guide' 
                ? 'px-4 py-1.5 rounded-lg font-bold transition-all bg-[#8b5a2b] text-[#f7eedc] shadow-sm' 
                : 'px-4 py-1.5 rounded-lg font-bold transition-all text-[#b89574] hover:text-[#f3e5c8]'}
            >
              Logbook
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={activeTab === 'profile' 
                ? 'px-4 py-1.5 rounded-lg font-bold transition-all bg-[#8b5a2b] text-[#f7eedc] shadow-sm' 
                : 'px-4 py-1.5 rounded-lg font-bold transition-all text-[#b89574] hover:text-[#f3e5c8]'}
            >
              Bounty & Nakama
            </button>
          </div>
          <button
            onClick={() => setIsPWAModalOpen(true)}
            className="text-xs font-bold text-[#f3e5c8] px-3 py-1.5 rounded-lg bg-[#8b5a2b]/40 hover:bg-[#8b5a2b]/60 border border-[#8b5a2b]/50 transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Smartphone size={13} />
            <span className="hidden sm:inline">PWA</span>
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* TAB 1: VOYAGE */}
        {activeTab === 'dashboard' && (
          <div className="space-y-5 animate-in fade-in duration-150">
            {/* Top Captain Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 bg-[#f3e5c8] border-[3px] border-[#9c6a3b]/80 rounded-2xl p-4 flex items-center justify-between text-[#341d10] shadow-[0_8px_20px_rgba(0,0,0,0.4)]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#dfc59e] border-2 border-[#8b5a2b] text-[#3e200c] font-black flex items-center justify-center text-xl shadow-inner">
                    {pirateName[0]?.toUpperCase() || 'C'}
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-[#2b1407] leading-tight">{pirateName}</h2>
                    <p className="text-xs text-[#704b2b] italic">{pirateLocation} • "{pirateTitle}"</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditProfileOpen(true)}
                  className="text-xs font-bold text-[#6a4220] hover:text-[#2b1407] flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#dfc7a2] hover:bg-[#d5bb92] border border-[#8b5a2b]/50 shadow-sm transition-all"
                >
                  <Edit3 size={12} /> Edit
                </button>
              </div>

              <div className="bg-[#f3e5c8] border-[3px] border-[#9c6a3b]/80 rounded-2xl p-4 flex items-center justify-between text-[#341d10] shadow-[0_8px_20px_rgba(0,0,0,0.4)]">
                <div>
                  <span className="text-[9px] text-[#704b2b] uppercase tracking-wider font-bold">Current Bounty</span>
                  <p className="text-lg font-mono font-black text-[#8c1d18]">฿ {currentBounty.formattedBounty}</p>
                </div>
                <button
                  onClick={() => setIsCrewRosterOpen(true)}
                  className="text-xs font-bold text-[#2b1407] bg-[#dfc7a2] hover:bg-[#d5bb92] px-3 py-1.5 rounded-lg border border-[#8b5a2b]/50 shadow-sm transition-all"
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
                onIncrementEpisode={() => setCurrentEpisode(prev => prev + 1)}
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
            {/* Quick Jump Bar */}
            <div className="bg-[#f3e5c8] border-[3px] border-[#9c6a3b]/80 rounded-2xl p-3 flex items-center justify-between gap-3 text-[#341d10] shadow-[0_8px_20px_rgba(0,0,0,0.4)]">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8c1d18] shrink-0 animate-pulse" />
                <div className="min-w-0">
                  <p className="text-[9px] uppercase font-bold text-[#704b2b] tracking-wider">Active Island Destination</p>
                  <p className="text-xs font-black text-[#2b1407] truncate">
                    {activeArc.title} <span className="text-[#704b2b] font-mono font-normal">({activeArc.episodes})</span>
                  </p>
                </div>
              </div>

              <button
                onClick={scrollToCurrentArc}
                className="shrink-0 bg-[#8b5a2b] hover:bg-[#74481f] text-[#f7eedc] px-3.5 py-1.5 rounded-xl text-xs font-sans font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-md"
              >
                <Navigation size={12} className="rotate-45" />
                <span>Jump to Arc</span>
              </button>
            </div>

            {/* Saga Pill Rail */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              <button
                onClick={() => setSelectedSaga('all')}
                className={getSagaButtonClass(selectedSaga === 'all')}
              >
                All Sagas
              </button>
              {allSagas.map(saga => (
                <button
                  key={saga}
                  onClick={() => setSelectedSaga(saga)}
                  className={getSagaButtonClass(selectedSaga === saga)}
                >
                  {saga}
                </button>
              ))}
            </div>

            {/* Search & Minimal Filters */}
            <div className="bg-[#f3e5c8] border-[3px] border-[#9c6a3b]/80 rounded-2xl p-3.5 space-y-2.5 text-[#341d10] shadow-[0_8px_20px_rgba(0,0,0,0.4)]">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-[#704b2b]" size={14} />
                <input
                  type="text"
                  placeholder="Search arc name or episode number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-[#e8d5b3] border border-[#8b5a2b]/60 rounded-xl text-xs text-[#2b1407] placeholder-[#704b2b]/70 focus:outline-none shadow-inner font-serif"
                />
              </div>

              <div className="flex items-center gap-1.5 text-xs font-bold">
                <button
                  onClick={() => setTypeFilter('all')}
                  className={getFilterButtonClass(typeFilter === 'all')}
                >
                  All ({filteredItems.length})
                </button>
                <button
                  onClick={() => setTypeFilter('canon')}
                  className={getFilterButtonClass(typeFilter === 'canon')}
                >
                  Canon
                </button>
                <button
                  onClick={() => setTypeFilter('filler')}
                  className={getFilterButtonClass(typeFilter === 'filler')}
                >
                  Filler
                </button>
                <button
                  onClick={() => setTypeFilter('skip-recommended')}
                  className={getFilterButtonClass(typeFilter === 'skip-recommended', true)}
                >
                  Skips
                </button>
              </div>
            </div>

            {/* Tactile Parchment Arc List */}
            <div className="space-y-2.5">
              {filteredItems.map((item) => {
                const isCompleted = completedIds.has(item.id);
                const isBookmarked = bookmarkedIds.has(item.id);
                const isWatching = currentArcId === item.id;
                const isExpanded = expandedId === item.id;

                return (
                  <div
                    id={`arc-card-${item.id}`}
                    key={item.id}
                    className={`border-2 rounded-2xl transition-all overflow-hidden scroll-mt-24 ${
                      isWatching
                        ? 'bg-[#f5ebd7] border-[#8b5a2b] ring-2 ring-[#8b5a2b]/50 shadow-md text-[#2b1407]'
                        : isCompleted
                        ? 'bg-[#e8d7bb]/70 border-[#8b5a2b]/30 opacity-75 text-[#5e4128]'
                        : 'bg-[#f3e5c8] border-[#9c6a3b]/70 hover:border-[#8b5a2b] text-[#341d10]'
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
                          className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 shrink-0 transition-colors ${
                            isCompleted
                              ? 'bg-[#8c1d18] text-white border-[#8c1d18]'
                              : 'bg-[#e8d5b3] border-[#8b5a2b]/60 hover:border-[#8b5a2b]'
                          }`}
                        >
                          {isCompleted && <Check size={14} />}
                        </button>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className={`text-sm font-bold truncate ${isCompleted ? 'line-through text-[#704b2b]' : 'text-[#2b1407]'}`}>
                              {item.title}
                            </h4>
                            {isWatching && (
                              <span className="text-[9px] font-sans font-black bg-[#8b5a2b] text-[#f7eedc] px-1.5 py-0.2 rounded uppercase">
                                Active
                              </span>
                            )}
                            <span className="text-[11px] text-[#704b2b] font-mono shrink-0">{item.episodes}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 font-sans">
                        {item.type === 'canon' ? (
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-700/15 px-2 py-0.5 rounded border border-emerald-700/30">
                            Canon
                          </span>
                        ) : item.skipStatus === 'worth-watching' ? (
                          <span className="text-[10px] font-bold text-amber-900 bg-amber-700/20 px-2 py-0.5 rounded border border-amber-700/30">
                            G-8 Masterpiece
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-rose-800 bg-rose-700/15 px-2 py-0.5 rounded border border-rose-700/30">
                            Skip
                          </span>
                        )}

                        {!isWatching && !isCompleted && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setWatchingArc(item);
                            }}
                            className="p-1.5 text-[#704b2b] hover:text-[#2b1407] hover:bg-[#dfcaa5] rounded-lg transition-colors"
                            title="Set as active arc"
                          >
                            <Play size={13} />
                          </button>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(item.id);
                          }}
                          className={`p-1.5 rounded-lg ${isBookmarked ? 'text-[#8c1d18]' : 'text-[#8b5a2b]/50 hover:text-[#8b5a2b]'}`}
                        >
                          <Bookmark size={14} className={isBookmarked ? 'fill-current' : ''} />
                        </button>
                        {isExpanded ? (
                          <ChevronUp size={14} className="text-[#704b2b]" />
                        ) : (
                          <ChevronDown size={14} className="text-[#704b2b]" />
                        )}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-4 border-t border-[#8b5a2b]/30 bg-[#e8d5b3]/70 text-xs text-[#3d220e] space-y-2.5">
                        <p className="leading-relaxed font-serif italic text-sm">{item.summary}</p>
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[11px] text-[#704b2b] font-mono">
                            {item.mangaChapters ? `Manga: ${item.mangaChapters}` : ''}
                          </span>
                          {!isWatching && (
                            <button
                              onClick={() => setWatchingArc(item)}
                              className="text-xs text-[#8c1d18] hover:text-[#5a100d] font-sans font-bold flex items-center gap-1"
                            >
                              Set as current voyage destination →
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
                completedCount={completedIds.size}
                totalArcs={totalItems}
                username={pirateName}
                location={pirateLocation}
                joinedDate={joinedDate}
                onOpenCrewRoster={() => setIsCrewRosterOpen(true)}
              />

              <div className="space-y-4">
                {/* Crew Roster Ledger Card */}
                <div className="bg-[#f3e5c8] border-[3px] border-[#9c6a3b]/80 rounded-2xl p-5 space-y-4 text-[#341d10] shadow-[0_8px_20px_rgba(0,0,0,0.4)]">
                  <div className="flex items-center justify-between border-b border-[#8b5a2b]/30 pb-2">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider font-bold text-[#704b2b]">Nakama Manifest</span>
                      <h3 className="text-base font-bold text-[#2b1407]">Active Crew Members</h3>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#8c1d18] bg-[#dfcaa5] px-2 py-0.5 rounded-md">
                      {unlockedCrew.length} Recruited
                    </span>
                  </div>

                  <div className="grid grid-cols-5 gap-2.5 pt-1">
                    {unlockedCrew.map((member) => (
                      <div
                        key={member.id}
                        onClick={() => setIsCrewRosterOpen(true)}
                        className="p-2 bg-[#e8d5b3] hover:bg-[#dfc7a2] rounded-xl border border-[#8b5a2b]/50 text-center cursor-pointer transition-all active:scale-95 shadow-inner"
                        title={`${member.name} (${member.role})`}
                      >
                        <span className="text-2xl">{member.avatarIcon}</span>
                        <p className="text-[10px] font-bold text-[#2b1407] truncate mt-1">{member.name.split(' ')[0]}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setIsCrewRosterOpen(true)}
                    className="w-full mt-2 py-2.5 bg-[#8b5a2b] hover:bg-[#74481f] text-[#f7eedc] rounded-xl text-xs font-sans font-bold transition-all shadow-md active:scale-98 flex items-center justify-center gap-1.5"
                  >
                    <Users size={14} />
                    <span>Open Straw Hat & Grand Fleet Roster</span>
                  </button>
                </div>

                {/* Sea Journal Backup Ledger */}
                <div className="bg-[#f3e5c8] border-[3px] border-[#9c6a3b]/80 rounded-2xl p-5 space-y-3 text-[#341d10] shadow-[0_8px_20px_rgba(0,0,0,0.4)]">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider font-bold text-[#704b2b]">Preserve Log</span>
                    <h3 className="text-base font-bold text-[#2b1407]">Sea Journal Data</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 font-sans">
                    <button
                      onClick={handleBackupExport}
                      className="py-2.5 bg-[#dfcaa5] hover:bg-[#d5bc93] border border-[#8b5a2b]/60 rounded-xl text-xs font-bold text-[#2b1407] transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
                    >
                      <Download size={13} />
                      <span>Export Log</span>
                    </button>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="py-2.5 bg-[#e8d5b3] hover:bg-[#dfc7a2] border border-[#8b5a2b]/60 rounded-xl text-xs font-bold text-[#5c381c] transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
                    >
                      <Upload size={13} />
                      <span>Restore Log</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Dialogs */}
      <CrewAndAlliesModal
        isOpen={isCrewRosterOpen}
        onClose={() => setIsCrewRosterOpen(false)}
        currentEpisode={currentEpisode}
        captainName={pirateName}
      />

      <OnboardingModal isOpen={isOnboardingOpen} onComplete={handleOnboardingComplete} />

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
          showSuccess('Identity Updated');
        }}
      />
    </div>
  );
};

export default Index;