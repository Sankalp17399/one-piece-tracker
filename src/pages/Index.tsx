"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Anchor, 
  BookOpen, 
  Compass, 
  Download, 
  Upload,
  Search, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Info,
  Flame,
  Check,
  Skull,
  User,
  MapPin,
  RefreshCw,
  Bookmark,
  Edit3,
  Save,
  HardDrive
} from 'lucide-react';
import WantedPoster from '@/components/WantedPoster';
import SailingMap from '@/components/SailingMap';
import OceanAmbience from '@/components/OceanAmbience';
import DevilFruitGenerator from '@/components/DevilFruitGenerator';
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
  notes?: string;
  saga: string;
}

const guideData: GuideItem[] = [
  // --- East Blue Saga ---
  {
    id: "1",
    title: "Romance Dawn / Captain Morgan Arc",
    episodes: "Episodes 1-3",
    type: "canon",
    recommendation: "Watch",
    description: "Introduces you to One Piece's world & main protagonist Luffy.",
    saga: "East Blue Saga"
  },
  {
    id: "2",
    title: "Orange Town / Buggy the Clown Arc",
    episodes: "Episodes 4-8",
    type: "canon",
    recommendation: "Watch",
    description: "Luffy meets Nami and faces Buggy the Clown.",
    saga: "East Blue Saga"
  },
  {
    id: "3",
    title: "Syrup Village / Captain Kuro Arc",
    episodes: "Episodes 9-18",
    type: "canon",
    recommendation: "Watch",
    description: "Usopp joins the crew and they acquire the Going Merry.",
    saga: "East Blue Saga"
  },
  {
    id: "4",
    title: "Baratie Restaurant / Don Krieg Arc",
    episodes: "Episodes 19-30",
    type: "canon",
    recommendation: "Watch",
    description: "Sanji joins the crew. Introduces Mihawk and the Grand Line threat.",
    saga: "East Blue Saga"
  },
  {
    id: "5",
    title: "Arlong Park / Nami's Arc",
    episodes: "Episodes 31-44",
    type: "canon",
    recommendation: "Watch",
    description: "This is the Arc where One Piece really starts to shine. Highly emotional and essential.",
    saga: "East Blue Saga"
  },
  {
    id: "6",
    title: "Loguetown Arc",
    episodes: "Episodes 45, 48-49, 52-53",
    type: "canon",
    recommendation: "Watch",
    description: "The town of the beginning and the end. Facing Smoker and Dragon.",
    saga: "East Blue Saga"
  },
  {
    id: "7",
    title: "Loguetown Fillers (Ep 50-51)",
    episodes: "Episodes 50-51",
    type: "filler",
    recommendation: "Optional",
    description: "Usopp's goggles and Sanji cooking contest.",
    saga: "East Blue Saga"
  },
  {
    id: "8",
    title: "Warship Island / Apis Arc",
    episodes: "Episodes 54-61",
    type: "filler",
    recommendation: "Skip",
    description: "First anime filler arc. Explains Calm Belts.",
    saga: "East Blue Saga"
  },

  // --- Alabasta Saga ---
  {
    id: "9",
    title: "Reverse Mountain / Laboon Arc",
    episodes: "Episodes 62-63",
    type: "canon",
    recommendation: "Watch",
    description: "Entering the Grand Line! Meeting Laboon and Crocus.",
    saga: "Alabasta Saga"
  },
  {
    id: "10",
    title: "Whisky Peak Arc",
    episodes: "Episodes 64-67",
    type: "canon",
    recommendation: "Watch",
    description: "Introducing Baroque Works and Princess Vivi.",
    saga: "Alabasta Saga"
  },
  {
    id: "11",
    title: "Little Garden Arc",
    episodes: "Episodes 70-77",
    type: "canon",
    recommendation: "Watch",
    description: "Island of giants Dorry & Brogy, prehistoric beasts, and Mr. 3.",
    saga: "Alabasta Saga"
  },
  {
    id: "12",
    title: "Drum Island Arc",
    episodes: "Episodes 78-91",
    type: "canon",
    recommendation: "Watch",
    description: "Tony Tony Chopper joins the crew! Emotional winter island arc.",
    saga: "Alabasta Saga"
  },
  {
    id: "13",
    title: "Alabasta Arc",
    episodes: "Episodes 92-130",
    type: "canon",
    recommendation: "Watch",
    description: "The epic showdown against Crocodile and Baroque Works. Ace debuts.",
    saga: "Alabasta Saga"
  },
  {
    id: "14",
    title: "Post-Alabasta Fillers",
    episodes: "Episodes 131-143",
    type: "filler",
    recommendation: "Skip",
    description: "Low priority filler arcs. Skip to maintain story pacing.",
    saga: "Alabasta Saga"
  },

  // --- Sky Island Saga ---
  {
    id: "15",
    title: "Jaya / Mock Town Arc",
    episodes: "Episodes 144-152",
    type: "canon",
    recommendation: "Watch",
    description: "Introduces Blackbeard, Bellamy, Doflamingo, and Sky Island clues.",
    saga: "Sky Island Saga"
  },
  {
    id: "16",
    title: "Skypiea Arc",
    episodes: "Episodes 153-195",
    type: "canon",
    recommendation: "Watch",
    description: "The legendary island in the sky. Battle against God Enel.",
    saga: "Sky Island Saga"
  },
  {
    id: "17",
    title: "G-8 Arc (Navarone)",
    episodes: "Episodes 196-206",
    type: "filler",
    recommendation: "Watch",
    description: "Widely considered the BEST filler arc in anime history! Highly recommended.",
    saga: "Sky Island Saga"
  },

  // --- Water 7 Saga ---
  {
    id: "18",
    title: "Long Ring Long Land (Davy Back Fight)",
    episodes: "Episodes 207-219",
    type: "canon",
    recommendation: "Optional",
    description: "Comedic pirate game created by Oda. Introduces Foxy.",
    saga: "Water 7 Saga"
  },
  {
    id: "19",
    title: "Ocean's Dream / Foxy Returns (Filler)",
    episodes: "Episodes 220-226",
    type: "filler",
    recommendation: "Skip",
    description: "Memory loss filler arc.",
    saga: "Water 7 Saga"
  },
  {
    id: "20",
    title: "Water 7 Arc",
    episodes: "Episodes 227-263",
    type: "canon",
    recommendation: "Watch",
    description: "Incredible drama, crew conflict, Franky introduction, and CP9 revelation.",
    saga: "Water 7 Saga"
  },
  {
    id: "21",
    title: "Enies Lobby Arc",
    episodes: "Episodes 264-312",
    type: "canon",
    recommendation: "Watch",
    description: "The ultimate rescue mission. Gear 2nd and 3rd debut. Robin's iconic backstory.",
    saga: "Water 7 Saga"
  },
  {
    id: "22",
    title: "Post-Enies Lobby Arc",
    episodes: "Episodes 313-325",
    type: "canon",
    recommendation: "Watch",
    description: "Thousand Sunny debut, new bounties, and Ace vs Blackbeard.",
    saga: "Water 7 Saga"
  },

  // --- Thriller Bark Saga ---
  {
    id: "23",
    title: "Lovely Land Filler",
    episodes: "Episodes 326-336",
    type: "filler",
    recommendation: "Skip",
    description: "Ice Hunter filler arc.",
    saga: "Thriller Bark Saga"
  },
  {
    id: "24",
    title: "Thriller Bark Arc",
    episodes: "Episodes 337-381",
    type: "canon",
    recommendation: "Watch",
    description: "Brook joins! Battle against Gecko Moria and Bartholomew Kuma.",
    saga: "Thriller Bark Saga"
  },

  // --- Summit War Saga ---
  {
    id: "25",
    title: "Sabaody Archipelago Arc",
    episodes: "Episodes 385-405",
    type: "canon",
    recommendation: "Watch",
    description: "Supernovas, Rayleigh, and Celestial Dragons. Shocking ending.",
    saga: "Summit War Saga"
  },
  {
    id: "26",
    title: "Amazon Lily Arc",
    episodes: "Episodes 408-421",
    type: "canon",
    recommendation: "Watch",
    description: "Luffy lands on the island of women and meets Boa Hancock.",
    saga: "Summit War Saga"
  },
  {
    id: "27",
    title: "Impel Down Arc",
    episodes: "Episodes 422-452",
    type: "canon",
    recommendation: "Watch",
    description: "Infiltrating the world's greatest underwater prison to save Ace.",
    saga: "Summit War Saga"
  },
  {
    id: "28",
    title: "Marineford Arc (The Summit War)",
    episodes: "Episodes 457-489",
    type: "canon",
    recommendation: "Watch",
    description: "The greatest war in pirate history. Whitebeard Pirates vs. Marine Headquarters.",
    saga: "Summit War Saga"
  },
  {
    id: "29",
    title: "Post-War Arc & 3D2Y Flashback",
    episodes: "Episodes 490-516",
    type: "canon",
    recommendation: "Watch",
    description: "Luffy, Ace, and Sabo's childhood. The 3D2Y time-skip training message.",
    saga: "Summit War Saga"
  },

  // --- Fishman Island Saga (Post-Timeskip) ---
  {
    id: "30",
    title: "Return to Sabaody Arc",
    episodes: "Episodes 517-522",
    type: "canon",
    recommendation: "Watch",
    description: "The Straw Hats reunite after 2 years of training! Brand new designs.",
    saga: "Fishman Island Saga"
  },
  {
    id: "31",
    title: "Fishman Island Arc",
    episodes: "Episodes 523-574",
    type: "canon",
    recommendation: "Watch",
    description: "Journey 10,000 meters underwater. Jinbe backstory & Hody Jones showdown.",
    saga: "Fishman Island Saga"
  },

  // --- Dressrosa Saga ---
  {
    id: "32",
    title: "Punk Hazard Arc",
    episodes: "Episodes 579-625",
    type: "canon",
    recommendation: "Watch",
    description: "Luffy and Trafalgar Law form a Pirate Alliance! Caesar Clown and Kin'emon debut.",
    saga: "Dressrosa Saga"
  },
  {
    id: "33",
    title: "Dressrosa Arc",
    episodes: "Episodes 629-746",
    type: "canon",
    recommendation: "Watch",
    description: "Colosseum battles, Mera Mera no Mi, Gear 4th debut, and Heavenly Demon Doflamingo.",
    saga: "Dressrosa Saga"
  },

  // --- Whole Cake Island Saga ---
  {
    id: "34",
    title: "Zou Arc",
    episodes: "Episodes 751-779",
    type: "canon",
    recommendation: "Watch",
    description: "Giant phantom elephant island. Introduction of Minks, Poneglyphs, and Sanji's lineage.",
    saga: "Whole Cake Island Saga"
  },
  {
    id: "35",
    title: "Whole Cake Island Arc",
    episodes: "Episodes 783-877",
    type: "canon",
    recommendation: "Watch",
    description: "Infiltrating Big Mom's territory. Sanji's emotional backstory & Luffy vs Katakuri.",
    saga: "Whole Cake Island Saga"
  },
  {
    id: "36",
    title: "Reverie Arc",
    episodes: "Episodes 878-889",
    type: "canon",
    recommendation: "Watch",
    description: "World Leaders gather in Mary Geoise. World Bounties updated & Im-sama debut.",
    saga: "Whole Cake Island Saga"
  },

  // --- Wano Country Saga ---
  {
    id: "37",
    title: "Wano Country Arc (Act 1 & 2)",
    episodes: "Episodes 890-956",
    type: "canon",
    recommendation: "Watch",
    description: "Samurai island. Luffy vs Kaido initial clash & Udon Prison training.",
    saga: "Wano Country Saga"
  },
  {
    id: "38",
    title: "Wano Country Arc (Act 3 - Onigashima War)",
    episodes: "Episodes 957-1085",
    type: "canon",
    recommendation: "Watch",
    description: "Peak anime animation! Raid on Onigashima, Gear 5th debut, and Emperor defeat.",
    saga: "Wano Country Saga"
  },

  // --- Final Saga ---
  {
    id: "39",
    title: "Egghead Arc (Future Island)",
    episodes: "Episodes 1086-Present",
    type: "canon",
    recommendation: "Watch",
    description: "Dr. Vegapunk's futuristic island, Void Century secrets unveiled, and Five Elders.",
    saga: "Final Saga"
  }
];

const Index = () => {
  // State for user customization with Local Storage initializers
  const [pirateName, setPirateName] = useState<string>(() => localStorage.getItem('pirateName') || 'Halex');
  const [pirateLocation, setPirateLocation] = useState<string>(() => localStorage.getItem('pirateLocation') || 'East Blue');
  const [joinedDate, setJoinedDate] = useState<string>(() => localStorage.getItem('joinedDate') || 'Aug 18, 2013');
  const [pirateTitle, setPirateTitle] = useState<string>(() => localStorage.getItem('pirateTitle') || 'Pirate Rookie');
  const [pirateFruit, setPirateFruit] = useState<string>(() => localStorage.getItem('pirateFruit') || 'None Awakened');

  // State for checklist, bookmarks, & user notes
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

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [recFilter, setRecFilter] = useState<string>('all');
  const [sagaFilter, setSagaFilter] = useState<string>('all');
  const [bookmarksOnly, setBookmarksOnly] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto Save all state changes directly to Browser LocalStorage
  useEffect(() => {
    localStorage.setItem('completedArcs', JSON.stringify(Array.from(completedIds)));
  }, [completedIds]);

  useEffect(() => {
    localStorage.setItem('bookmarkedArcs', JSON.stringify(Array.from(bookmarkedIds)));
  }, [bookmarkedIds]);

  useEffect(() => {
    localStorage.setItem('customArcNotes', JSON.stringify(customNotes));
  }, [customNotes]);

  useEffect(() => {
    localStorage.setItem('pirateName', pirateName);
  }, [pirateName]);

  useEffect(() => {
    localStorage.setItem('pirateLocation', pirateLocation);
  }, [pirateLocation]);

  useEffect(() => {
    localStorage.setItem('joinedDate', joinedDate);
  }, [joinedDate]);

  useEffect(() => {
    localStorage.setItem('pirateTitle', pirateTitle);
  }, [pirateTitle]);

  useEffect(() => {
    localStorage.setItem('pirateFruit', pirateFruit);
  }, [pirateFruit]);

  // Calculate progress
  const totalItems = guideData.length;
  const completedCount = completedIds.size;
  const progressPercentage = totalItems > 0 ? (completedCount / totalItems) * 100 : 0;

  const getCurrentArc = () => {
    if (completedCount === 0) return "East Blue";
    if (completedCount === totalItems) return "Laugh Tale (Pirate King!)";
    const nextItem = guideData.find(item => !completedIds.has(item.id));
    return nextItem ? nextItem.title : "Grand Line";
  };

  const toggleComplete = (id: string) => {
    const newCompleted = new Set(completedIds);
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
      if (newCompleted.size === totalItems) {
        confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
        showSuccess("CONGRATULATIONS! You have conquered the Grand Line!");
      } else if (newCompleted.size % 5 === 0) {
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
        showSuccess(`Milestone reached! ${newCompleted.size} adventures completed!`);
      } else {
        showSuccess("Adventure logged in browser storage!");
      }
    }
    setCompletedIds(newCompleted);
  };

  const toggleBookmark = (id: string, title: string) => {
    const newBookmarks = new Set(bookmarkedIds);
    if (newBookmarks.has(id)) {
      newBookmarks.delete(id);
      showSuccess(`Removed "${title}" from favorites.`);
    } else {
      newBookmarks.add(id);
      showSuccess(`Bookmarked "${title}" as a favorite arc!`);
    }
    setBookmarkedIds(newBookmarks);
  };

  const updateArcNote = (id: string, note: string) => {
    setCustomNotes(prev => ({ ...prev, [id]: note }));
  };

  const markAllCompleted = () => {
    setCompletedIds(new Set(guideData.map(item => item.id)));
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    showSuccess("All adventures saved as completed!");
  };

  const resetProgress = () => {
    if (window.confirm("Are you sure you want to reset your sailing progress?")) {
      setCompletedIds(new Set());
      setBookmarkedIds(new Set());
      setCustomNotes({});
      showSuccess("Progress reset back to the East Blue!");
    }
  };

  // Export JSON Backup
  const exportBackupJSON = () => {
    const backupData = {
      pirateName,
      pirateLocation,
      joinedDate,
      pirateTitle,
      pirateFruit,
      completedArcs: Array.from(completedIds),
      bookmarkedArcs: Array.from(bookmarkedIds),
      customArcNotes: customNotes
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${pirateName}_GrandLine_Backup.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showSuccess("Backup JSON file exported!");
  };

  // Import JSON Backup
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed.pirateName) setPirateName(parsed.pirateName);
          if (parsed.pirateLocation) setPirateLocation(parsed.pirateLocation);
          if (parsed.joinedDate) setJoinedDate(parsed.joinedDate);
          if (parsed.pirateTitle) setPirateTitle(parsed.pirateTitle);
          if (parsed.pirateFruit) setPirateFruit(parsed.pirateFruit);
          if (parsed.completedArcs) setCompletedIds(new Set(parsed.completedArcs));
          if (parsed.bookmarkedArcs) setBookmarkedIds(new Set(parsed.bookmarkedArcs));
          if (parsed.customArcNotes) setCustomNotes(parsed.customArcNotes);
          
          showSuccess("Logbook backup successfully loaded!");
        } catch {
          showError("Invalid backup file structure.");
        }
      };
    }
  };

  const filteredItems = guideData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.episodes.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    const matchesRec = recFilter === 'all' || item.recommendation === recFilter;
    const matchesSaga = sagaFilter === 'all' || item.saga === sagaFilter;
    const matchesBookmark = !bookmarksOnly || bookmarkedIds.has(item.id);

    return matchesSearch && matchesType && matchesRec && matchesSaga && matchesBookmark;
  });

  const exportToPDF = async () => {
    const element = document.getElementById('pirate-logbook-content');
    if (!element) return;
    showSuccess("Generating Pirate Logbook PDF...");

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#fdf8eb'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${pirateName}_Pirate_Logbook.pdf`);
      showSuccess("PDF logbook downloaded successfully!");
    } catch {
      showError("Failed to generate PDF.");
    }
  };

  return (
    <div className="min-h-screen bg-[#1e120c] bg-[radial-gradient(#2d1a12_1px,transparent_1px)] [background-size:24px_24px] text-[#3e2723] py-8 px-4 sm:px-6 lg:px-8 font-serif">
      {/* Hidden File Input for Backup Restore */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImportJSON} 
        accept=".json" 
        className="hidden" 
      />

      {/* Top Header */}
      <header className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row items-center justify-between gap-4 border-b-4 border-double border-[#8b5a2b] pb-6">
        <div className="flex items-center gap-3">
          <div className="bg-[#8b5a2b] p-3 rounded-full text-[#f2e3c6] shadow-lg animate-pulse">
            <Skull size={32} />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl sm:text-4xl font-black tracking-wider text-[#f2e3c6] drop-shadow-md uppercase">
                Grand Line Logbook
              </h1>
              {/* Auto-Saved Badge */}
              <span className="bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-[10px] font-sans font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-inner">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Auto-Saved in Browser
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#dfcbb5] font-sans tracking-widest uppercase mt-1">
              The Ultimate One Piece Watching Guide & Arc Tracker
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <OceanAmbience />
          <button 
            onClick={exportBackupJSON}
            className="flex items-center gap-1.5 bg-[#5d4037] hover:bg-[#8b5a2b] text-[#f2e3c6] px-3 py-2 rounded-lg font-sans font-bold text-xs transition-all shadow-md active:scale-95"
            title="Export your progress as a JSON file"
          >
            <HardDrive size={14} /> Backup
          </button>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 bg-[#5d4037] hover:bg-[#8b5a2b] text-[#f2e3c6] px-3 py-2 rounded-lg font-sans font-bold text-xs transition-all shadow-md active:scale-95"
            title="Import progress from JSON file"
          >
            <Upload size={14} /> Restore
          </button>
          <button 
            onClick={exportToPDF}
            className="flex items-center gap-1.5 bg-[#8b5a2b] hover:bg-[#a16e3f] text-[#f2e3c6] px-3.5 py-2 rounded-lg font-sans font-bold text-xs transition-all shadow-md active:scale-95"
          >
            <Download size={14} /> Export PDF
          </button>
          <button 
            onClick={resetProgress}
            className="flex items-center gap-1.5 bg-[#7f1d1d] hover:bg-red-800 text-white px-3.5 py-2 rounded-lg font-sans font-bold text-xs transition-all shadow-md active:scale-95"
          >
            <RefreshCw size={14} /> Reset
          </button>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#2d1a12] p-4 rounded-2xl border-2 border-[#8b5a2b] shadow-xl">
            <h3 className="text-center text-[#dfcbb5] font-sans text-xs uppercase tracking-widest mb-3 flex items-center justify-center gap-1">
              <Flame size={14} className="text-red-500" /> Your Pirate Bounty <Flame size={14} className="text-red-500" />
            </h3>
            <WantedPoster 
              followers={completedCount} 
              following={totalItems - completedCount} 
              username={`${pirateName} ${pirateTitle !== 'Pirate Rookie' ? `"${pirateTitle}"` : ''}`} 
              location={pirateLocation} 
              joinedDate={joinedDate} 
            />
          </div>

          <DevilFruitGenerator 
            initialTitle={pirateTitle}
            initialFruit={pirateFruit}
            onAssignTitle={(title, fruit) => {
              setPirateTitle(title);
              setPirateFruit(fruit);
            }} 
          />

          <div className="bg-[#f2e3c6] border-4 border-[#8b5a2b] rounded-xl p-5 shadow-xl">
            <div className="flex items-center justify-between border-b-2 border-[#8b5a2b] pb-2 mb-3">
              <div className="flex items-center gap-2">
                <Anchor className="text-[#8b5a2b]" size={18} />
                <h3 className="font-bold text-base text-[#3e2723]">Customize Pirate Identity</h3>
              </div>
              <span className="text-[10px] text-[#8b5a2b] font-mono font-bold">Auto-Saved</span>
            </div>
            
            <div className="space-y-3 font-sans text-xs">
              <div>
                <label className="block font-bold uppercase text-[#5d4037] mb-1">Pirate Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 text-[#8b5a2b]" size={14} />
                  <input 
                    type="text" 
                    value={pirateName}
                    onChange={(e) => setPirateName(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-[#dfcbb5] border-2 border-[#8b5a2b] rounded-lg text-[#3e2723] font-bold focus:outline-none focus:ring-2 focus:ring-[#8b5a2b]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-[#5d4037] mb-1">Starting Sea</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 text-[#8b5a2b]" size={14} />
                  <input 
                    type="text" 
                    value={pirateLocation}
                    onChange={(e) => setPirateLocation(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-[#dfcbb5] border-2 border-[#8b5a2b] rounded-lg text-[#3e2723] font-bold focus:outline-none focus:ring-2 focus:ring-[#8b5a2b]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-[#5d4037] mb-1">Sailing Since</label>
                <input 
                  type="text" 
                  value={joinedDate}
                  onChange={(e) => setJoinedDate(e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#dfcbb5] border-2 border-[#8b5a2b] rounded-lg text-[#3e2723] font-bold focus:outline-none focus:ring-2 focus:ring-[#8b5a2b]"
                />
              </div>
            </div>
          </div>

          <div className="bg-[#f2e3c6] border-4 border-[#8b5a2b] rounded-xl p-5 shadow-xl">
            <div className="flex items-center gap-2 mb-3 border-b-2 border-[#8b5a2b] pb-2">
              <Info className="text-[#8b5a2b]" size={18} />
              <h3 className="font-bold text-base text-[#3e2723]">Guide Legend</h3>
            </div>
            <div className="space-y-2 font-sans text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-600 shrink-0" />
                <p className="font-bold text-[#3e2723]">Canon - Manga Adapted</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-600 shrink-0" />
                <p className="font-bold text-[#3e2723]">Filler - Safe to Skip</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
                <p className="font-bold text-[#3e2723]">Optional / Movie / Special</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Main Column */}
        <div className="lg:col-span-8 space-y-6" id="pirate-logbook-content">
          <SailingMap progress={progressPercentage} currentArc={getCurrentArc()} />

          <div className="bg-[#fdf8eb] border-4 border-[#8b5a2b] rounded-xl p-6 shadow-xl">
            <div className="space-y-4 mb-6 border-b-2 border-[#8b5a2b] pb-6">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 text-[#8b5a2b]" size={18} />
                  <input 
                    type="text"
                    placeholder="Search arcs, episodes, or sagas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#f2e3c6] border-2 border-[#8b5a2b] rounded-lg text-[#3e2723] font-sans font-semibold placeholder-[#8b5a2b]/60 focus:outline-none focus:ring-2 focus:ring-[#8b5a2b]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setBookmarksOnly(!bookmarksOnly)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-sans font-bold text-xs transition-all border-2 border-[#8b5a2b] ${
                      bookmarksOnly ? 'bg-[#8b5a2b] text-[#f2e3c6]' : 'bg-[#f2e3c6] text-[#3e2723] hover:bg-[#dfcbb5]'
                    }`}
                  >
                    <Bookmark size={14} className={bookmarksOnly ? 'fill-current' : ''} />
                    Favorites ({bookmarkedIds.size})
                  </button>

                  <button 
                    onClick={markAllCompleted}
                    className="bg-[#8b5a2b] hover:bg-[#a16e3f] text-[#f2e3c6] px-3 py-2 rounded-lg font-sans font-bold text-xs transition-all shadow-md active:scale-95"
                  >
                    Mark All
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans text-xs">
                <div>
                  <label className="block font-bold text-[#5d4037] mb-1 uppercase">Type</label>
                  <select 
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full p-2 bg-[#f2e3c6] border-2 border-[#8b5a2b] rounded-lg text-[#3e2723] font-bold focus:outline-none"
                  >
                    <option value="all">All Types</option>
                    <option value="canon">Canon Only</option>
                    <option value="filler">Filler Only</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#5d4037] mb-1 uppercase">Recommendation</label>
                  <select 
                    value={recFilter}
                    onChange={(e) => setRecFilter(e.target.value)}
                    className="w-full p-2 bg-[#f2e3c6] border-2 border-[#8b5a2b] rounded-lg text-[#3e2723] font-bold focus:outline-none"
                  >
                    <option value="all">All Recommendations</option>
                    <option value="Watch">Watch</option>
                    <option value="Skip">Skip</option>
                    <option value="Optional">Optional</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#5d4037] mb-1 uppercase">Saga</label>
                  <select 
                    value={sagaFilter}
                    onChange={(e) => setSagaFilter(e.target.value)}
                    className="w-full p-2 bg-[#f2e3c6] border-2 border-[#8b5a2b] rounded-lg text-[#3e2723] font-bold focus:outline-none"
                  >
                    <option value="all">All Sagas</option>
                    <option value="East Blue Saga">East Blue Saga</option>
                    <option value="Alabasta Saga">Alabasta Saga</option>
                    <option value="Sky Island Saga">Sky Island Saga</option>
                    <option value="Water 7 Saga">Water 7 Saga</option>
                    <option value="Thriller Bark Saga">Thriller Bark Saga</option>
                    <option value="Summit War Saga">Summit War Saga</option>
                    <option value="Fishman Island Saga">Fishman Island Saga</option>
                    <option value="Dressrosa Saga">Dressrosa Saga</option>
                    <option value="Whole Cake Island Saga">Whole Cake Island Saga</option>
                    <option value="Wano Country Saga">Wano Country Saga</option>
                    <option value="Final Saga">Final Saga (Egghead)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* List of Arcs */}
            <div className="space-y-3">
              {filteredItems.length === 0 ? (
                <div className="text-center py-12 text-[#8b5a2b]">
                  <Compass className="mx-auto w-12 h-12 mb-2 animate-spin" />
                  <p className="font-bold">No adventures found matching filters.</p>
                </div>
              ) : (
                filteredItems.map((item) => {
                  const isCompleted = completedIds.has(item.id);
                  const isBookmarked = bookmarkedIds.has(item.id);
                  const isExpanded = expandedId === item.id;
                  const currentNote = customNotes[item.id] || '';

                  return (
                    <div 
                      key={item.id}
                      className={`border-2 rounded-xl transition-all duration-300 overflow-hidden ${
                        isCompleted ? 'bg-[#e2d4be] border-[#8b5a2b]/40 opacity-85' : 'bg-[#f2e3c6] border-[#8b5a2b] hover:shadow-md'
                      }`}
                    >
                      <div 
                        className="p-4 flex items-center justify-between gap-3 cursor-pointer select-none" 
                        onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleComplete(item.id);
                            }}
                            className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                              isCompleted ? 'bg-[#8b5a2b] border-[#3e2723] text-[#f2e3c6]' : 'border-[#8b5a2b] hover:bg-[#dfcbb5]'
                            }`}
                          >
                            {isCompleted && <Check size={14} />}
                          </button>

                          <div className="min-w-0 flex-1">
                            <h4 className={`font-bold text-sm sm:text-base text-[#3e2723] truncate ${isCompleted ? 'line-through text-gray-600' : ''}`}>
                              {item.title}
                            </h4>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              <span className="text-xs font-mono bg-[#dfcbb5] px-2 py-0.5 rounded text-[#5d4037] font-bold">
                                {item.episodes}
                              </span>
                              <span className={`text-[10px] font-sans font-bold uppercase px-2 py-0.5 rounded ${
                                item.type === 'canon' ? 'bg-green-100 text-green-800 border border-green-300' :
                                item.type === 'filler' ? 'bg-red-100 text-red-800 border border-red-300' :
                                'bg-amber-100 text-amber-800 border border-amber-300'
                              }`}>
                                {item.type}
                              </span>
                              {currentNote && (
                                <span className="text-[10px] font-sans font-bold bg-[#8b5a2b] text-[#f2e3c6] px-2 py-0.5 rounded flex items-center gap-1">
                                  <Edit3 size={10} /> Note Added
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBookmark(item.id, item.title);
                            }}
                            className={`p-1.5 rounded hover:bg-[#dfcbb5] transition-colors ${
                              isBookmarked ? 'text-amber-600' : 'text-[#8b5a2b]/50'
                            }`}
                          >
                            <Bookmark size={16} className={isBookmarked ? 'fill-current' : ''} />
                          </button>

                          <span className={`text-xs font-sans font-bold px-2.5 py-1 rounded-full ${
                            item.recommendation === 'Watch' ? 'bg-green-600 text-white' :
                            item.recommendation === 'Skip' ? 'bg-red-600 text-white' :
                            'bg-amber-500 text-white'
                          }`}>
                            {item.recommendation}
                          </span>
                          {isExpanded ? <ChevronUp size={18} className="text-[#8b5a2b]" /> : <ChevronDown size={18} className="text-[#8b5a2b]" />}
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="px-4 pb-4 pt-2 border-t border-dashed border-[#8b5a2b]/40 bg-[#dfcbb5]/30 font-sans text-xs sm:text-sm text-[#5d4037] space-y-3">
                          <p className="leading-relaxed">{item.description}</p>
                          
                          {/* Custom Personal Journal Notes */}
                          <div className="mt-2 bg-[#f2e3c6] p-3 rounded-lg border border-[#8b5a2b]">
                            <label className="block font-bold text-[11px] uppercase text-[#5d4037] mb-1 flex items-center gap-1">
                              <Edit3 size={12} /> Personal Logbook Journal Note
                            </label>
                            <textarea
                              value={currentNote}
                              onChange={(e) => updateArcNote(item.id, e.target.value)}
                              placeholder="Type your personal thoughts, favorite moment, or episode notes here... (Auto-Saved)"
                              rows={2}
                              className="w-full p-2 bg-[#dfcbb5] border border-[#8b5a2b] rounded text-xs text-[#3e2723] focus:outline-none focus:ring-1 focus:ring-[#8b5a2b] resize-none"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;