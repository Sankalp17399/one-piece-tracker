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

export const CANON_BOUNTY_MILESTONES: BountyMilestone[] = [
  {
    episode: 1,
    arcId: "1",
    bountyAmount: 0,
    formattedBounty: "0",
    reason: "Unregistered Rookie Pirate"
  },
  {
    episode: 45,
    arcId: "5",
    bountyAmount: 30000000,
    formattedBounty: "30,000,000",
    reason: "Defeat of Arlong, Don Krieg, and Buggy in the East Blue"
  },
  {
    episode: 130,
    arcId: "12",
    bountyAmount: 100000000,
    formattedBounty: "100,000,000",
    reason: "Overthrow of Warlord Sir Crocodile in Alabasta Kingdom"
  },
  {
    episode: 324,
    arcId: "18",
    bountyAmount: 300000000,
    formattedBounty: "300,000,000",
    reason: "Invasion of Judicial Island Enies Lobby, defeat of CP9 Rob Lucci, declared war on World Government"
  },
  {
    episode: 517,
    arcId: "24",
    bountyAmount: 400000000,
    formattedBounty: "400,000,000",
    reason: "Infiltration and breakout of Impel Down, participation in Marineford Paramount War, son of Dragon"
  },
  {
    episode: 746,
    arcId: "29",
    bountyAmount: 500000000,
    formattedBounty: "500,000,000",
    reason: "Defeat of Heavenly Demon Donquixote Doflamingo & formation of Straw Hat Grand Fleet"
  },
  {
    episode: 878,
    arcId: "31",
    bountyAmount: 1500000000,
    formattedBounty: "1,500,000,000",
    reason: "Invasion of Totto Land, defeat of Sweet Commanders Katakuri & Cracker, declared the 'Fifth Emperor'"
  },
  {
    episode: 1080,
    arcId: "33",
    bountyAmount: 3000000000,
    formattedBounty: "3,000,000,000",
    reason: "Defeat of Emperor Kaido of the Beasts, Gear 5th Nika awakening, declared official Emperor of the Sea (Yonko)"
  }
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
    haki: ["Conqueror's (Advanced)", "Armament (Advanced / Ryuo)", "Observation (Future Sight)"]
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
    haki: ["Conqueror's (Advanced / Infusion)", "Armament (Advanced)", "Observation"]
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
    epithet: "God Usopp / Sniper King (Sogeking)",
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
    quote: "Yo-ho-ho-ho! Can I see your panties? (Skull joke!)",
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