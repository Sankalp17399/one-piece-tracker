"use client";

import React, { useState } from 'react';
import { 
  X, 
  Users, 
  Anchor, 
  Award, 
  Sparkles, 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  Lock,
  ChevronRight
} from 'lucide-react';
import { 
  CANON_CREW_MEMBERS, 
  CANON_ALLIES, 
  CANON_SHIPS, 
  CANON_BOUNTY_MILESTONES,
  CrewMember,
  Ally
} from '@/data/onePieceProgression';

interface CrewAndAlliesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentEpisode: number;
  captainName: string;
}

const CrewAndAlliesModal: React.FC<CrewAndAlliesModalProps> = ({
  isOpen,
  onClose,
  currentEpisode,
  captainName
}) => {
  const [activeTab, setActiveTab] = useState<'crew' | 'allies' | 'ships' | 'bounties'>('crew');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState<CrewMember | null>(null);

  if (!isOpen) return null;

  const filteredCrew = CANON_CREW_MEMBERS.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.epithet.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAllies = CANON_ALLIES.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.faction.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unlockedCrewCount = CANON_CREW_MEMBERS.filter(m => currentEpisode >= m.joinedEpisode).length;
  const unlockedAlliesCount = CANON_ALLIES.filter(a => currentEpisode >= a.episode).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-xl max-h-[90vh] bg-[#f7f1e1] border-4 border-[#6e4624] rounded-3xl shadow-2xl text-[#2b1810] font-serif flex flex-col overflow-hidden relative">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b-2 border-[#8b5a2b]/30 bg-[#ede2ca]/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#6e4624] text-[#f7f1e1] flex items-center justify-center border border-[#8b5a2b] shadow">
              <Users size={18} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#2b1810] uppercase tracking-wide">
                Straw Hat Crew & Allies Roster
              </h2>
              <p className="text-[11px] font-sans text-[#6e4624]">
                Synced with Episode <span className="font-bold text-[#2b1810] font-mono">{currentEpisode}</span>
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 text-[#6e4624] hover:text-[#2b1810] hover:bg-[#dfd0b5] rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-4 pt-3 pb-2 bg-[#f2e7d0] border-b border-[#8b5a2b]/20 flex items-center gap-1.5 shrink-0 overflow-x-auto scrollbar-none font-sans text-xs">
          <button
            onClick={() => setActiveTab('crew')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'crew'
                ? 'bg-[#6e4624] text-[#f7f1e1] shadow-sm'
                : 'text-[#6e4624] hover:bg-[#ede2ca]'
            }`}
          >
            <span>Crew Members</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-black/20 rounded-full font-mono">
              {unlockedCrewCount}/{CANON_CREW_MEMBERS.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('allies')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'allies'
                ? 'bg-[#6e4624] text-[#f7f1e1] shadow-sm'
                : 'text-[#6e4624] hover:bg-[#ede2ca]'
            }`}
          >
            <span>Allies & Fleet</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-black/20 rounded-full font-mono">
              {unlockedAlliesCount}/{CANON_ALLIES.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('ships')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
              activeTab === 'ships'
                ? 'bg-[#6e4624] text-[#f7f1e1] shadow-sm'
                : 'text-[#6e4624] hover:bg-[#ede2ca]'
            }`}
          >
            Flagships
          </button>

          <button
            onClick={() => setActiveTab('bounties')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
              activeTab === 'bounties'
                ? 'bg-[#6e4624] text-[#f7f1e1] shadow-sm'
                : 'text-[#6e4624] hover:bg-[#ede2ca]'
            }`}
          >
            Bounty Timeline
          </button>
        </div>

        {/* Search input for lists */}
        {(activeTab === 'crew' || activeTab === 'allies') && (
          <div className="p-3 bg-[#f7f1e1] border-b border-[#8b5a2b]/20 shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-[#8b5a2b]" size={14} />
              <input
                type="text"
                placeholder={activeTab === 'crew' ? "Search crewmate, role, epithet..." : "Search ally, fleet, faction..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-[#ede2ca] border border-[#8b5a2b]/30 rounded-xl text-xs font-sans text-[#2b1810] placeholder-[#8b5a2b]/60 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Modal Body Content */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1 scrollbar-thin">
          
          {/* TAB: CREW */}
          {activeTab === 'crew' && (
            <div className="space-y-2.5">
              {filteredCrew.map((member) => {
                const isUnlocked = currentEpisode >= member.joinedEpisode;
                return (
                  <div
                    key={member.id}
                    onClick={() => setSelectedMember(member)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isUnlocked
                        ? 'bg-[#ede2ca] border-[#8b5a2b]/40 hover:border-[#6e4624] shadow-sm'
                        : 'bg-[#ede2ca]/40 border-[#8b5a2b]/20 opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-11 h-11 rounded-2xl bg-[#f7f1e1] border border-[#8b5a2b]/40 flex items-center justify-center text-xl shrink-0 shadow-inner">
                          {isUnlocked ? member.avatarIcon : <Lock size={16} className="text-[#8b5a2b]" />}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-[#2b1810] truncate">
                              {member.id === 'luffy' ? captainName : member.name}
                            </h4>
                            {isUnlocked ? (
                              <span className="text-[10px] font-sans font-bold bg-[#6e4624] text-[#f7f1e1] px-1.5 py-0.2 rounded shrink-0">
                                Recruited
                              </span>
                            ) : (
                              <span className="text-[10px] font-sans font-mono text-[#8b5a2b] bg-[#dfd0b5] px-1.5 py-0.2 rounded shrink-0">
                                Joins Ep. {member.joinedEpisode}
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-[#6e4624] italic font-serif truncate">
                            "{member.epithet}" • <span className="font-sans not-italic font-semibold text-[#8b5a2b]">{member.role}</span>
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="text-[10px] font-sans uppercase font-bold text-[#8b5a2b]">Current Bounty</p>
                        <p className="text-xs font-mono font-bold text-[#8b1e1e]">
                          {isUnlocked ? member.bounty : '???'}
                        </p>
                      </div>
                    </div>

                    {isUnlocked && (
                      <p className="mt-2 text-[11px] font-sans text-[#6e4624] border-t border-[#8b5a2b]/20 pt-1.5 line-clamp-1 italic">
                        "{member.quote}"
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB: ALLIES & GRAND FLEET */}
          {activeTab === 'allies' && (
            <div className="space-y-2.5">
              {filteredAllies.map((ally) => {
                const isUnlocked = currentEpisode >= ally.episode;
                return (
                  <div
                    key={ally.id}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isUnlocked
                        ? 'bg-[#ede2ca] border-[#8b5a2b]/40 shadow-sm'
                        : 'bg-[#ede2ca]/40 border-[#8b5a2b]/20 opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-2xl bg-[#f7f1e1] border border-[#8b5a2b]/40 flex items-center justify-center text-xl shrink-0">
                          {isUnlocked ? ally.icon : <Lock size={15} className="text-[#8b5a2b]" />}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-[#2b1810] truncate">{ally.name}</h4>
                            <span className={`text-[9px] font-sans font-bold px-1.5 py-0.2 rounded shrink-0 ${
                              ally.status === 'Grand Fleet' 
                                ? 'bg-amber-700 text-white' 
                                : ally.status === 'Honorary Straw Hat' 
                                ? 'bg-rose-700 text-white'
                                : 'bg-[#6e4624] text-[#f7f1e1]'
                            }`}>
                              {ally.status}
                            </span>
                          </div>
                          <p className="text-[11px] font-sans text-[#6e4624] font-medium truncate">
                            {ally.faction}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[10px] font-mono text-[#8b5a2b] bg-[#dfd0b5] px-2 py-0.5 rounded">
                          {isUnlocked ? `Allied Ep. ${ally.episode}` : `Ep. ${ally.episode}`}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#6e4624] font-sans mt-2 pt-1.5 border-t border-[#8b5a2b]/20 leading-relaxed">
                      {ally.description}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB: SHIPS */}
          {activeTab === 'ships' && (
            <div className="space-y-3">
              {CANON_SHIPS.map((ship) => {
                const isAcquired = currentEpisode >= ship.acquiredEpisode;
                const isRetired = ship.retiredEpisode && currentEpisode >= ship.retiredEpisode;
                return (
                  <div
                    key={ship.id}
                    className={`p-4 rounded-2xl border ${
                      isAcquired
                        ? 'bg-[#ede2ca] border-[#8b5a2b]/40 shadow-sm'
                        : 'bg-[#ede2ca]/40 border-[#8b5a2b]/20 opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between border-b border-[#8b5a2b]/20 pb-2 mb-2">
                      <div className="flex items-center gap-2">
                        <Anchor className="text-[#6e4624]" size={18} />
                        <h4 className="font-bold text-base text-[#2b1810]">{ship.name}</h4>
                      </div>
                      <span className={`text-[10px] font-sans font-bold px-2 py-0.5 rounded ${
                        isRetired
                          ? 'bg-rose-900 text-white'
                          : isAcquired
                          ? 'bg-emerald-700 text-white'
                          : 'bg-[#8b5a2b]/30 text-[#6e4624]'
                      }`}>
                        {isRetired ? 'Resting at Sea (Ep 312)' : isAcquired ? 'Active Flagship' : `Acquires Ep. ${ship.acquiredEpisode}`}
                      </span>
                    </div>

                    <div className="space-y-1 font-sans text-xs text-[#6e4624]">
                      <p><strong className="text-[#2b1810]">Type:</strong> {ship.type}</p>
                      <p><strong className="text-[#2b1810]">Master Shipwright:</strong> {ship.shipwright}</p>
                      <p className="mt-2 text-[#2b1810] font-serif leading-relaxed italic">{ship.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB: BOUNTY TIMELINE */}
          {activeTab === 'bounties' && (
            <div className="space-y-2.5">
              {CANON_BOUNTY_MILESTONES.map((bounty, idx) => {
                const isPassed = currentEpisode >= bounty.episode;
                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isPassed
                        ? 'bg-[#ede2ca] border-[#8b5a2b]/40 shadow-sm'
                        : 'bg-[#ede2ca]/40 border-[#8b5a2b]/20 opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award size={16} className={isPassed ? 'text-amber-700' : 'text-[#8b5a2b]/40'} />
                        <span className="font-mono font-black text-sm text-[#8b1e1e]">
                          ฿ {bounty.formattedBounty}-
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#6e4624] bg-[#dfd0b5] px-2 py-0.5 rounded">
                        Ep. {bounty.episode}+
                      </span>
                    </div>

                    <p className="text-xs font-sans text-[#6e4624] mt-1.5 leading-relaxed">
                      {bounty.reason}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* Selected Member Detail Overlay */}
        {selectedMember && (
          <div className="p-4 bg-[#ede2ca] border-t-2 border-[#8b5a2b]/40 shrink-0 font-sans text-xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">{selectedMember.avatarIcon}</span>
                <h4 className="font-serif font-bold text-sm text-[#2b1810]">
                  {selectedMember.id === 'luffy' ? captainName : selectedMember.name} ({selectedMember.japaneseName})
                </h4>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="text-[10px] font-bold uppercase text-[#8b5a2b] hover:text-[#2b1810]"
              >
                Close Details
              </button>
            </div>

            <p className="text-[#6e4624]"><strong className="text-[#2b1810]">Dream:</strong> {selectedMember.dream}</p>
            {selectedMember.devilFruit && (
              <p className="text-[#6e4624]"><strong className="text-[#2b1810]">Devil Fruit:</strong> {selectedMember.devilFruit}</p>
            )}
            {selectedMember.haki && (
              <p className="text-[#6e4624]"><strong className="text-[#2b1810]">Haki Disciplines:</strong> {selectedMember.haki.join(", ")}</p>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default CrewAndAlliesModal;