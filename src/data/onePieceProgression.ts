export interface CrewMember {
  id: string;
  name: string;
  japaneseName: string;
  role: string;
  epithet: string;
  joinedArcId: string;
  joinedEpisode: number;
  bounty: string;
  avatarIcon: string;
  quote: string;
  dream: string;
  devilFruit?: string;
  haki?: string[];
}

export interface Ally {
  id: string;
  name: string;
  faction: string;
  arcId: string;
  episode: number;
  status: 'Allied' | 'Grand Fleet' | 'Honorary Straw Hat';
  description: string;
  icon: string;
}

export interface Ship {
  id: string;
  name: string;
  acquiredArcId: string;
  acquiredEpisode: number;
  retiredEpisode?: number;
  shipwright: string;
  type: string;
  description: string;
}

export interface BountyMilestone {
  episode: number;
  arcId: string;
  bountyAmount: number;
  formattedBounty: string;
  reason: string;
}

export type ArcClassification = 'canon' | 'filler' | 'mixed' | 'movie-tie-in';
export type SkipRecommendation = 'must-watch' | 'recommended-skip' | 'worth-watching';

export interface GuideArcItem {
  id: string;
  title: string;
  saga: string;
  episodes: string;
  startEp: number;
  endEp: number;
  type: ArcClassification;
  skipStatus: SkipRecommendation;
  summary: string;
  keyEvents: string[];
  mangaChapters?: string;
}

export const CANON_EPISODE_GUIDE: GuideArcItem[] = [
  // EAST BLUE SAGA
  {
    id: "1",
    title: "Romance Dawn",
    saga: "East Blue",
    episodes: "Ep. 1 - 3",
    startEp: 1,
    endEp: 3,
    type: "canon",
    skipStatus: "must-watch",
    summary: "Luffy sets sail in a barrel, frees Coby from Alvida, and recruits Roronoa Zoro from Marine base Shells Town.",
    keyEvents: ["Luffy starts pirate journey", "Zoro joins crew", "Defeat of Captain Morgan"],
    mangaChapters: "Ch. 1-7"
  },
  {
    id: "2",
    title: "Orange Town",
    saga: "East Blue",
    episodes: "Ep. 4 - 8",
    startEp: 4,
    endEp: 8,
    type: "canon",
    skipStatus: "must-watch",
    summary: "Straw Hats clash with Buggy the Clown; encounter thief Nami and loyal dog Chouchou.",
    keyEvents: ["Nami temporary alliance", "Buggy Chop-Chop Fruit debut", "Grand Line map acquired"],
    mangaChapters: "Ch. 8-21"
  },
  {
    id: "3",
    title: "Syrup Village",
    saga: "East Blue",
    episodes: "Ep. 9 - 18",
    startEp: 9,
    endEp: 18,
    type: "canon",
    skipStatus: "must-watch",
    summary: "Usopp and the crew foil Captain Kuro's inheritance plot against Lady Kaya.",
    keyEvents: ["Usopp joins crew", "Going Merry flagship acquired", "Defeat of Black Cat Pirates"],
    mangaChapters: "Ch. 22-41"
  },
  {
    id: "4",
    title: "Baratie",
    saga: "East Blue",
    episodes: "Ep. 19 - 30",
    startEp: 19,
    endEp: 30,
    type: "canon",
    skipStatus: "must-watch",
    summary: "Ocean restaurant under siege by Don Krieg; Zoro challenges Warlord Dracule Mihawk.",
    keyEvents: ["Sanji joins crew", "Mihawk World's Greatest Swordsman duel", "Zoro's oath to never lose"],
    mangaChapters: "Ch. 42-68"
  },
  {
    id: "5",
    title: "Arlong Park",
    saga: "East Blue",
    episodes: "Ep. 31 - 44",
    startEp: 31,
    endEp: 44,
    type: "canon",
    skipStatus: "must-watch",
    summary: "Emotional confrontation to liberate Cocoyasi Village and free Nami from Saw-Tooth Arlong.",
    keyEvents: ["Nami officially joins", "First Marine Bounty (30M)", "Arlong Park destroyed"],
    mangaChapters: "Ch. 69-95"
  },
  {
    id: "6",
    title: "Loguetown",
    saga: "East Blue",
    episodes: "Ep. 45, 48 - 53",
    startEp: 45,
    endEp: 53,
    type: "canon",
    skipStatus: "must-watch",
    summary: "The town of beginning and end where Pirate King Roger was born & executed; Smoker and Dragon appear.",
    keyEvents: ["Zoro obtains Sandai Kitetsu & Yubashiri", "Monkey D. Dragon saves Luffy", "Entry into Grand Line"],
    mangaChapters: "Ch. 96-100"
  },
  {
    id: "7",
    title: "Warship Island",
    saga: "East Blue",
    episodes: "Ep. 54 - 61",
    startEp: 54,
    endEp: 61,
    type: "filler",
    skipStatus: "recommended-skip",
    summary: "Apis and the Millennium Dragon filler arc before crossing the Calm Belt.",
    keyEvents: ["Non-canon dragon rescue", "Can safely skip before entering Reverse Mountain"],
  },

  // ALABASTA SAGA
  {
    id: "8",
    title: "Reverse Mountain & Laboon",
    saga: "Alabasta",
    episodes: "Ep. 62 - 63",
    startEp: 62,
    endEp: 63,
    type: "canon",
    skipStatus: "must-watch",
    summary: "Riding the upside-down ocean current into the Grand Line; promise with Laboon the Island Whale.",
    keyEvents: ["Crocus & Laboon vow", "Log Pose introduction", "Mr. 9 & Miss Wednesday clash"],
    mangaChapters: "Ch. 101-105"
  },
  {
    id: "9",
    title: "Whisky Peak",
    saga: "Alabasta",
    episodes: "Ep. 64 - 67",
    startEp: 64,
    endEp: 67,
    type: "canon",
    skipStatus: "must-watch",
    summary: "Town of welcoming bounty hunters and revelation of Princess Nefertari Vivi of Alabasta.",
    keyEvents: ["Zoro defeats 100 assassins", "Princess Vivi joins the voyage", "Baroque Works syndicate revealed"],
    mangaChapters: "Ch. 106-114"
  },
  {
    id: "10",
    title: "Little Garden",
    saga: "Alabasta",
    episodes: "Ep. 70 - 77",
    startEp: 70,
    endEp: 77,
    type: "canon",
    skipStatus: "must-watch",
    summary: "Prehistoric island duel between warrior giants Dorry and Brogy; battle against Mr. 3.",
    keyEvents: ["Elbaf giants honor lore", "Sanji outsmarts Crocodile as 'Mr. Prince'", "Eternal Pose to Alabasta"],
    mangaChapters: "Ch. 115-129"
  },
  {
    id: "11",
    title: "Drum Island",
    saga: "Alabasta",
    episodes: "Ep. 78 - 91",
    startEp: 78,
    endEp: 91,
    type: "canon",
    skipStatus: "must-watch",
    summary: "Winter island medical search for Nami's fever; Dr. Hiluluk's cherry blossoms and Tony Tony Chopper.",
    keyEvents: ["Tony Tony Chopper joins", "Dr. Kureha & Will of D mention", "Defeat of King Wapol"],
    mangaChapters: "Ch. 130-154"
  },
  {
    id: "12",
    title: "Alabasta Kingdom",
    saga: "Alabasta",
    episodes: "Ep. 92 - 130",
    startEp: 92,
    endEp: 130,
    type: "canon",
    skipStatus: "must-watch",
    summary: "Full scale desert rebellion against Warlord Sir Crocodile; Ancient Weapon Pluton secrets.",
    keyEvents: ["Crocodile overthrown", "Luffy 100M bounty", "Nico Robin joins crew", "Vivi's 'X' farewell vow"],
    mangaChapters: "Ch. 155-217"
  },
  {
    id: "13",
    title: "Post-Alabasta Fillers",
    saga: "Alabasta",
    episodes: "Ep. 131 - 143",
    startEp: 131,
    endEp: 143,
    type: "filler",
    skipStatus: "recommended-skip",
    summary: "Episodic fillers highlighting crew members' personal backstories and Goat Island.",
    keyEvents: ["Standalone comedic side stories", "Skip to get straight to Jaya"],
  },

  // SKY ISLAND SAGA
  {
    id: "14",
    title: "Jaya",
    saga: "Sky Island",
    episodes: "Ep. 144 - 152",
    startEp: 144,
    endEp: 152,
    type: "canon",
    skipStatus: "must-watch",
    summary: "Pirate haven Mock Town; Blackbeard's famous dream speech, Bellamy clash, and Knock Up Stream.",
    keyEvents: ["Blackbeard debut ('People's dreams never die!')", "Bellamy one-punch defeat", "Mont Blanc Cricket & Sky Island launch"],
    mangaChapters: "Ch. 218-236"
  },
  {
    id: "15",
    title: "Skypiea",
    saga: "Sky Island",
    episodes: "Ep. 153 - 195",
    startEp: 153,
    endEp: 195,
    type: "canon",
    skipStatus: "must-watch",
    summary: "Island 10,000 meters in the clouds, the Shandian warriors, City of Gold Shandora, and God Enel.",
    keyEvents: ["Defeat of God Enel & Golden Bell rung", "Klabautermann spirit repairs Merry", "Gol D. Roger Poneglyph inscription"],
    mangaChapters: "Ch. 237-302"
  },
  {
    id: "16",
    title: "G-8 Marine Base (Navarone)",
    saga: "Sky Island",
    episodes: "Ep. 196 - 206",
    startEp: 196,
    endEp: 206,
    type: "filler",
    skipStatus: "worth-watching",
    summary: "The highest-rated filler in anime history! Going Merry drops straight into Vice Admiral Jonathan's marine fortress.",
    keyEvents: ["Fan favorite filler", "Hilarious stealth infiltration", "Condoriano meme"],
  },

  // WATER 7 SAGA
  {
    id: "17",
    title: "Water 7",
    saga: "Water 7",
    episodes: "Ep. 227 - 263",
    startEp: 227,
    endEp: 263,
    type: "canon",
    skipStatus: "must-watch",
    summary: "The water metropolis of Galley-La; Merry's fatal damage, Usopp vs Luffy duel, and CP9 assassination.",
    keyEvents: ["Luffy vs Usopp duel", "CP9 undercover betrayal", "Nico Robin disappears to protect crew", "Sea Train Rocketman departure"],
    mangaChapters: "Ch. 322-374"
  },
  {
    id: "18",
    title: "Enies Lobby",
    saga: "Water 7",
    episodes: "Ep. 264 - 312",
    startEp: 264,
    endEp: 312,
    type: "canon",
    skipStatus: "must-watch",
    summary: "Assault on the World Government's judicial fortress. Straw Hats declare war on the world to save Robin.",
    keyEvents: ["Robin's 'I want to live!'", "Gear 2nd & Gear 3rd debut", "CP9 Rob Lucci defeat", "Going Merry's funeral Viking fire"],
    mangaChapters: "Ch. 375-430"
  },
  {
    id: "19",
    title: "Post-Enies Lobby",
    saga: "Water 7",
    episodes: "Ep. 313 - 325",
    startEp: 313,
    endEp: 325,
    type: "canon",
    skipStatus: "must-watch",
    summary: "Garp reveals Luffy's father Monkey D. Dragon; Franky crafts Thousand Sunny; Ace vs Blackbeard duel.",
    keyEvents: ["Franky joins as shipwright", "Thousand Sunny launched", "Luffy 300M bounty", "Usopp apologizes & rejoins"],
    mangaChapters: "Ch. 431-441"
  },

  // THRILLER BARK SAGA
  {
    id: "20",
    title: "Thriller Bark",
    saga: "Thriller Bark",
    episodes: "Ep. 337 - 381",
    startEp: 337,
    endEp: 381,
    type: "canon",
    skipStatus: "must-watch",
    summary: "Giant ghost pirate ship in Florian Triangle; Warlord Gecko Moria, oars zombie, and Zoro's legendary sacrifice.",
    keyEvents: ["Brook joins as musician", "Nightmare Luffy", "Zoro's 'Nothing Happened' with Kuma", "Binks' Sake"],
    mangaChapters: "Ch. 442-489"
  },

  // SUMMIT WAR SAGA
  {
    id: "21",
    title: "Sabaody Archipelago",
    saga: "Summit War",
    episodes: "Ep. 385 - 405",
    startEp: 385,
    endEp: 405,
    type: "canon",
    skipStatus: "must-watch",
    summary: "11 Supernovas assemble; Luffy punches a Celestial Dragon, prompting Admiral Kizaru and Kuma to scatter the crew.",
    keyEvents: ["Celestial Dragon punch", "Silvers Rayleigh Dark King reveal", "Straw Hat crew complete separation defeat"],
    mangaChapters: "Ch. 490-513"
  },
  {
    id: "22",
    title: "Amazon Lily",
    saga: "Summit War",
    episodes: "Ep. 408 - 421",
    startEp: 408,
    endEp: 421,
    type: "canon",
    skipStatus: "must-watch",
    summary: "Luffy lands on the island of the Kuja pirate tribe ruled by Pirate Empress Boa Hancock.",
    keyEvents: ["Boa Hancock alliance", "Conqueror's Haki display", "News of Ace's scheduled execution"],
    mangaChapters: "Ch. 514-524"
  },
  {
    id: "23",
    title: "Impel Down",
    saga: "Summit War",
    episodes: "Ep. 422 - 452",
    startEp: 422,
    endEp: 452,
    type: "canon",
    skipStatus: "must-watch",
    summary: "Luffy infiltrates the World Government's deepest underwater hell prison; unifies Buggy, Crocodile, Jinbe & Bon Clay.",
    keyEvents: ["Warden Magellan venom clash", "Level 5.5 Ivankov miracle cure", "Bon Clay ultimate sacrifice"],
    mangaChapters: "Ch. 525-549"
  },
  {
    id: "24",
    title: "Marineford (Paramount War)",
    saga: "Summit War",
    episodes: "Ep. 457 - 489",
    startEp: 457,
    endEp: 489,
    type: "canon",
    skipStatus: "must-watch",
    summary: "Whitebeard Pirates clash with Marine HQ and Warlords to rescue Portgas D. Ace. The world shifts forever.",
    keyEvents: ["Ace & Whitebeard deaths", "Blackbeard takes Tremor fruit", "Shanks halts the war", "'The One Piece is real!'"],
    mangaChapters: "Ch. 550-580"
  },
  {
    id: "25",
    title: "Post-War & 3D2Y",
    saga: "Summit War",
    episodes: "Ep. 490 - 516",
    startEp: 490,
    endEp: 516,
    type: "canon",
    skipStatus: "must-watch",
    summary: "Luffy, Ace, and Sabo childhood flashback; the 3D2Y tattoo secret code to train for two years.",
    keyEvents: ["ASL brotherhood flashback", "3D2Y message to crew", "Rayleigh trains Luffy in 3 types of Haki"],
    mangaChapters: "Ch. 581-597"
  },

  // NEW WORLD SAGAS
  {
    id: "26",
    title: "Return to Sabaody",
    saga: "Fishman Island",
    episodes: "Ep. 517 - 522",
    startEp: 517,
    endEp: 522,
    type: "canon",
    skipStatus: "must-watch",
    summary: "Two years later, the upgraded Straw Hats reunite and easily dismantle the Pacifistas and Fake Straw Hats.",
    keyEvents: ["2-Year timeskip glow-up", "Pacifista one-shot defeat", "Thousand Sunny sets sail underwater"],
    mangaChapters: "Ch. 598-602"
  },
  {
    id: "27",
    title: "Fishman Island",
    saga: "Fishman Island",
    episodes: "Ep. 523 - 574",
    startEp: 523,
    endEp: 574,
    type: "canon",
    skipStatus: "must-watch",
    summary: "Journey 10,000 meters underwater to Ryugu Kingdom; Hody Jones coup, Joy Boy apology, and Princess Shirahoshi.",
    keyEvents: ["Conqueror's Haki clears 50,000 foes", "Shirahoshi is Ancient Weapon Poseidon", "Luffy challenges Big Mom over phone"],
    mangaChapters: "Ch. 603-653"
  },
  {
    id: "28",
    title: "Punk Hazard",
    saga: "Dressrosa",
    episodes: "Ep. 579 - 625",
    startEp: 579,
    endEp: 625,
    type: "canon",
    skipStatus: "must-watch",
    summary: "Fire and ice laboratory island; Straw Hats form the Pirate Alliance with Trafalgar Law to capture Caesar Clown.",
    keyEvents: ["Trafalgar Law Pirate Alliance", "SMILE artificial devil fruits exposed", "Kin'emon & Momonosuke rescue"],
    mangaChapters: "Ch. 654-699"
  },
  {
    id: "29",
    title: "Dressrosa",
    saga: "Dressrosa",
    episodes: "Ep. 629 - 746",
    startEp: 629,
    endEp: 746,
    type: "canon",
    skipStatus: "must-watch",
    summary: "Corrida Colosseum tournament for Ace's Flame-Flame Fruit; Sabo returns, Gear 4th Boundman debuts against Doflamingo.",
    keyEvents: ["Sabo reunion & Mera Mera Fruit", "Gear 4th Boundman debut", "Straw Hat Grand Fleet (5,600 men) formed", "Luffy 500M bounty"],
    mangaChapters: "Ch. 700-801"
  },
  {
    id: "30",
    title: "Zou Island",
    saga: "Whole Cake Island",
    episodes: "Ep. 751 - 779",
    startEp: 751,
    endEp: 779,
    type: "canon",
    skipStatus: "must-watch",
    summary: "City atop the giant ancient elephant Zunesha; Mink tribe, Road Poneglyphs to Laugh Tale, and Sanji's abduction.",
    keyEvents: ["First Red Road Poneglyph found", "Ninja-Pirate-Mink-Samurai Alliance", "Sanji Vinsmoke royal wedding dilemma"],
    mangaChapters: "Ch. 802-824"
  },
  {
    id: "31",
    title: "Whole Cake Island",
    saga: "Whole Cake Island",
    episodes: "Ep. 783 - 877",
    startEp: 783,
    endEp: 877,
    type: "canon",
    skipStatus: "must-watch",
    summary: "Tea Party infiltration in Emperor Big Mom's pastry realm; Germa 66, Luffy vs Katakuri, and Gear 4th Snakeman.",
    keyEvents: ["Luffy vs Katakuri Future Sight clash", "Gear 4th Snakeman debut", "Jinbe officially leaves Big Mom to join Luffy", "Luffy 1.5 Billion 5th Emperor bounty"],
    mangaChapters: "Ch. 825-902"
  },
  {
    id: "32",
    title: "Levely (Reverie)",
    saga: "Whole Cake Island",
    episodes: "Ep. 878 - 889",
    startEp: 878,
    endEp: 889,
    type: "canon",
    skipStatus: "must-watch",
    summary: "World summit of 50 royal kings in Holy Land Mary Geoise; Empty Throne secret ruler Imu revealed.",
    keyEvents: ["Imu-sama on the Empty Throne", "Shanks meets Five Elders", "Warlord system abolished"],
    mangaChapters: "Ch. 903-908"
  },
  {
    id: "33",
    title: "Wano Country",
    saga: "Wano Country",
    episodes: "Ep. 890 - 1085",
    startEp: 890,
    endEp: 1085,
    type: "canon",
    skipStatus: "must-watch",
    summary: "Isolated samurai empire of Wano. Fire Festival raid on Onigashima vs Emperors Kaido & Big Mom; Gear 5th Sun God Nika awakens.",
    keyEvents: ["Oden flashback & Laugh Tale backstory", "Advanced Conqueror's Infusion (Ryuo)", "Gear 5th Nika Sun God Awakening", "Luffy becomes official Emperor of the Sea (Yonko 3B Bounty)"],
    mangaChapters: "Ch. 909-1057"
  },
  {
    id: "34",
    title: "Egghead Island (Future Island)",
    saga: "Final Saga",
    episodes: "Ep. 1086 - Present",
    startEp: 1086,
    endEp: 1122,
    type: "canon",
    skipStatus: "must-watch",
    summary: "Dr. Vegapunk's futuristic island of 500 years in the future; Buster Call, Gorosei Saint Saturn, and the Void Century truth.",
    keyEvents: ["Dr. Vegapunk 6 satellite bodies", "Seraphim warlord cyborg clones", "Buster Call & World Broadcast on Ancient Kingdom sinking"],
    mangaChapters: "Ch. 1058-1125+"
  }
];

export const CANON_BOUNTY_MILESTONES: BountyMilestone[] = [
  { episode: 1, arcId: "1", bountyAmount: 0, formattedBounty: "0", reason: "Unregistered Rookie Pirate" },
  { episode: 45, arcId: "5", bountyAmount: 30000000, formattedBounty: "30,000,000", reason: "Defeat of Arlong, Don Krieg, and Buggy in East Blue" },
  { episode: 130, arcId: "12", bountyAmount: 100000000, formattedBounty: "100,000,000", reason: "Overthrow of Warlord Sir Crocodile in Alabasta" },
  { episode: 324, arcId: "18", bountyAmount: 300000000, formattedBounty: "300,000,000", reason: "Invasion of Enies Lobby & declared war on World Gov" },
  { episode: 517, arcId: "24", bountyAmount: 400000000, formattedBounty: "400,000,000", reason: "Impel Down breakout & Marineford Paramount War" },
  { episode: 746, arcId: "29", bountyAmount: 500000000, formattedBounty: "500,000,000", reason: "Defeat of Donquixote Doflamingo & Grand Fleet formed" },
  { episode: 878, arcId: "31", bountyAmount: 1500000000, formattedBounty: "1,500,000,000", reason: "Invasion of Totto Land & declared 5th Emperor" },
  { episode: 1080, arcId: "33", bountyAmount: 3000000000, formattedBounty: "3,000,000,000", reason: "Defeat of Emperor Kaido & Gear 5th Sun God Nika awakening" }
];

export const CANON_CREW_MEMBERS: CrewMember[] = [
  {
    id: "luffy",
    name: "Monkey D. Luffy",
    japaneseName: "モンキー・D・ルフィ",
    role: "Captain",
    epithet: "Straw Hat",
    joinedArcId: "1",
    joinedEpisode: 1,
    bounty: "฿ 3,000,000,000",
    avatarIcon: "👒",
    quote: "I'm gonna be King of the Pirates!",
    dream: "To become the Pirate King and find the One Piece.",
    devilFruit: "Hito Hito no Mi, Model: Nika (Mythical Zoan)",
    haki: ["Conqueror's (Advanced Infusion)", "Armament (Advanced / Ryuo)", "Observation (Future Sight)"]
  },
  {
    id: "zoro",
    name: "Roronoa Zoro",
    japaneseName: "ロロノア・ゾロ",
    role: "Combatant / Swordsman",
    epithet: "Pirate Hunter / King of Hell",
    joinedArcId: "1",
    joinedEpisode: 3,
    bounty: "฿ 1,111,000,000",
    avatarIcon: "⚔️",
    quote: "Scars on the back are a swordsman's shame.",
    dream: "To become the World's Greatest Swordsman by surpassing Mihawk.",
    haki: ["Conqueror's (Advanced Infusion)", "Armament (Advanced)", "Observation"]
  },
  {
    id: "nami",
    name: "Nami",
    japaneseName: "ナミ",
    role: "Navigator",
    epithet: "Cat Burglar",
    joinedArcId: "5",
    joinedEpisode: 44,
    bounty: "฿ 366,000,000",
    avatarIcon: "🍊",
    quote: "Life is like a wind. You have to ride it!",
    dream: "To draw a complete navigation map of the entire world.",
    haki: ["Observation (Weather Instincts)"]
  },
  {
    id: "usopp",
    name: "Usopp",
    japaneseName: "ウソップ",
    role: "Sniper",
    epithet: "God Usopp / Sogeking",
    joinedArcId: "3",
    joinedEpisode: 17,
    bounty: "฿ 500,000,000",
    avatarIcon: "🎯",
    quote: "There comes a time when a man has to stand and fight!",
    dream: "To become a brave warrior of the sea and visit Elbaf.",
    haki: ["Observation (Awakened in Dressrosa)"]
  },
  {
    id: "sanji",
    name: "Sanji (Vinsmoke)",
    japaneseName: "サンジ",
    role: "Cook / Chef",
    epithet: "Black Leg / Stealth Black",
    joinedArcId: "4",
    joinedEpisode: 30,
    bounty: "฿ 1,032,000,000",
    avatarIcon: "🍳",
    quote: "I'll never kick a woman, even if I die!",
    dream: "To find the All Blue, the legendary ocean paradise for chefs.",
    haki: ["Armament (Exoskeleton / Ifrit Jambe)", "Observation (Advanced Specialist)"]
  },
  {
    id: "chopper",
    name: "Tony Tony Chopper",
    japaneseName: "トニートニー・チョッパー",
    role: "Doctor / Physician",
    epithet: "Cotton Candy Lover",
    joinedArcId: "11",
    joinedEpisode: 90,
    bounty: "฿ 1,000",
    avatarIcon: "🌸",
    quote: "I'll become a doctor who can cure any disease!",
    dream: "To create a panacea that can cure any illness on Earth.",
    devilFruit: "Hito Hito no Mi (Human-Human Fruit - Zoan)"
  },
  {
    id: "robin",
    name: "Nico Robin",
    japaneseName: "ニコ・ロビン",
    role: "Archaeologist",
    epithet: "Devil Child / Light of the Revolution",
    joinedArcId: "13",
    joinedEpisode: 130,
    bounty: "฿ 930,000,000",
    avatarIcon: "📖",
    quote: "I want to live! Take me with you to the sea!",
    dream: "To decipher all Road Poneglyphs and uncover the true Rio Poneglyph history of the Void Century.",
    devilFruit: "Hana Hana no Mi (Flower-Flower Fruit - Paramecia / Demonio Fleur)"
  },
  {
    id: "franky",
    name: "Franky (Cutty Flam)",
    japaneseName: "フランキー",
    role: "Shipwright / Engineer",
    epithet: "Cyborg / Iron Man",
    joinedArcId: "19",
    joinedEpisode: 322,
    bounty: "฿ 394,000,000",
    avatarIcon: "🤖",
    quote: "SUPER! No matter what ship you make, you must love it!",
    dream: "To build a dream ship (Thousand Sunny) and sail it across the world to the end of the Grand Line."
  },
  {
    id: "brook",
    name: "Brook",
    japaneseName: "ブルック",
    role: "Musician / Swordsman",
    epithet: "Soul King / Humming Brook",
    joinedArcId: "20",
    joinedEpisode: 381,
    bounty: "฿ 383,000,000",
    avatarIcon: "🎻",
    quote: "Yo-ho-ho-ho! (Skull joke!)",
    dream: "To sail around the Grand Line and reunite with Laboon at Reverse Mountain.",
    devilFruit: "Yomi Yomi no Mi (Revive-Revive Fruit - Paramecia / Soul Master)"
  },
  {
    id: "jinbe",
    name: "Jinbe",
    japaneseName: "ジンベエ",
    role: "Helmsman / Master of Fishman Karate",
    epithet: "First Son of the Sea / Knight of the Sea",
    joinedArcId: "33",
    joinedEpisode: 980,
    bounty: "฿ 1,100,000,000",
    avatarIcon: "🥋",
    quote: "What can a mere Emperor of the Sea do to a man who pledges his life to the future King of the Pirates?!",
    dream: "To realize Fishman co-existence and complete equality with humankind under the sun.",
    haki: ["Armament (Advanced)", "Observation"]
  }
];

export const CANON_SHIPS: Ship[] = [
  {
    id: "going_merry",
    name: "Going Merry",
    acquiredArcId: "3",
    acquiredEpisode: 17,
    retiredEpisode: 312,
    shipwright: "Merry (Syrup Village)",
    type: "Caravel",
    description: "The beloved first ship of the Straw Hat Pirates with the iconic sheep figurehead and Klabautermann spirit."
  },
  {
    id: "thousand_sunny",
    name: "Thousand Sunny",
    acquiredArcId: "19",
    acquiredEpisode: 321,
    shipwright: "Franky, Iceburg & Galley-La",
    type: "Sloop-of-War (Treasure Tree Adam)",
    description: "The invincible dream ship crafted from Adam Wood, featuring the Soldier Dock System and Gaon Cannon."
  }
];

export const CANON_ALLIES: Ally[] = [
  {
    id: "vivi",
    name: "Nefertari Vivi & Karoo",
    faction: "Alabasta Kingdom",
    arcId: "9",
    episode: 65,
    status: "Honorary Straw Hat",
    description: "Princess of Alabasta who sailed through the Grand Line as an official crewmate bearing the 'X' arm mark.",
    icon: "👑"
  },
  {
    id: "bon_clay",
    name: "Bentham (Mr. 2 Bon Clay)",
    faction: "Newkama Land / Baroque Works",
    arcId: "12",
    episode: 129,
    status: "Allied",
    description: "Sworn soul friend who sacrificed himself twice to ensure Luffy and the crew's survival in Alabasta and Impel Down.",
    icon: "🦢"
  },
  {
    id: "law",
    name: "Trafalgar D. Water Law",
    faction: "Heart Pirates",
    arcId: "28",
    episode: 584,
    status: "Allied",
    description: "Surgeon of Death who formed the Pirate Alliance at Punk Hazard to take down Doflamingo and Emperor Kaido.",
    icon: "🗡️"
  },
  {
    id: "grand_fleet_cavendish",
    name: "Cavendish & Beautiful Pirates",
    faction: "Straw Hat Grand Fleet (1st Division)",
    arcId: "29",
    episode: 745,
    status: "Grand Fleet",
    description: "Supernova pirate prince of the Bourbon Kingdom and commander of Hakuba, leading the 1st fleet ship.",
    icon: "🌹"
  },
  {
    id: "grand_fleet_barto",
    name: "Bartolomeo & Barto Club",
    faction: "Straw Hat Grand Fleet (2nd Division)",
    arcId: "29",
    episode: 745,
    status: "Grand Fleet",
    description: "Devoted Straw Hat fanatic with the Barrier-Barrier Fruit, commanding the 2nd fleet ship Going Luffy-senpai.",
    icon: "🛡️"
  },
  {
    id: "grand_fleet_sai",
    name: "Don Sai & Happo Navy",
    faction: "Straw Hat Grand Fleet (3rd Division)",
    arcId: "29",
    episode: 745,
    status: "Grand Fleet",
    description: "13th leader of the Kano Kingdom Happo Navy and master of the Hasshoken martial art, leading the 3rd fleet.",
    icon: "🐉"
  },
  {
    id: "grand_fleet_ideo",
    name: "Ideo & Ideo Pirates",
    faction: "Straw Hat Grand Fleet (4th Division)",
    arcId: "29",
    episode: 745,
    status: "Grand Fleet",
    description: "Longarm tribe boxer and champion of the New World Central Martial Arts, leading the 4th fleet division.",
    icon: "🥊"
  },
  {
    id: "grand_fleet_leo",
    name: "Leo & Tontatta Pirates",
    faction: "Straw Hat Grand Fleet (5th Division)",
    arcId: "29",
    episode: 745,
    status: "Grand Fleet",
    description: "Warrior dwarf leader of Green Bit with Stitch-Stitch powers, leading the 5th fleet division.",
    icon: "🌿"
  },
  {
    id: "grand_fleet_hajrudin",
    name: "Hajrudin & New Giant Warrior Pirates",
    faction: "Straw Hat Grand Fleet (6th Division)",
    arcId: "29",
    episode: 745,
    status: "Grand Fleet",
    description: "Elbaf giant warrior striving to unify all giants under the Straw Hat banner, commanding the 6th fleet division.",
    icon: "⚡"
  },
  {
    id: "grand_fleet_orlumbus",
    name: "Orlumbus & Yonta Maria Grand Fleet",
    faction: "Straw Hat Grand Fleet (7th Division)",
    arcId: "29",
    episode: 745,
    status: "Grand Fleet",
    description: "Admiral of the Standing Kingdom commanding 56 ships and 4,300 men, forming the 7th division armada.",
    icon: "⚓"
  },
  {
    id: "momonosuke_scabbards",
    name: "Kozuki Momonosuke & Nine Red Scabbards",
    faction: "Kozuki Clan (Wano)",
    arcId: "33",
    episode: 892,
    status: "Allied",
    description: "Rightful Shogun of Wano Country and his loyal samurai retinue who fought side-by-side on Onigashima.",
    icon: "🐲"
  },
  {
    id: "yamato",
    name: "Yamato (Son of Kaido / Oden's Will)",
    faction: "Wano Guardian",
    arcId: "33",
    episode: 990,
    status: "Honorary Straw Hat",
    description: "Wielder of Mythical Okuchi no Makami powers who defends Wano until it is time to set sail.",
    icon: "👹"
  }
];

export const getCurrentBounty = (currentEp: number): BountyMilestone => {
  let milestone = CANON_BOUNTY_MILESTONES[0];
  for (const m of CANON_BOUNTY_MILESTONES) {
    if (currentEp >= m.episode) {
      milestone = m;
    } else {
      break;
    }
  }
  return milestone;
};

export const getUnlockedCrew = (currentEp: number): CrewMember[] => {
  return CANON_CREW_MEMBERS.filter(member => currentEp >= member.joinedEpisode);
};

export const getUnlockedAllies = (currentEp: number): Ally[] => {
  return CANON_ALLIES.filter(ally => currentEp >= ally.episode);
};

export const getActiveShip = (currentEp: number): Ship => {
  if (currentEp >= 321) {
    return CANON_SHIPS[1]; // Thousand Sunny
  }
  return CANON_SHIPS[0]; // Going Merry
};