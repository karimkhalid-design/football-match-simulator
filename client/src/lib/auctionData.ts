export type PositionCode = "GK" | "CB" | "RB" | "LB" | "CM" | "CAM" | "RW" | "LW" | "ST";
import { expandedPlayerSeeds } from "./expandedPlayerSeeds";

export type PlayerStatus = "active" | "legend";

export type AuctionPlayer = { name: string; rating: number; tier: "LEGEND" | "ELITE" | "STAR" | "PRO"; note: string; };
export type AuctionSection = "all" | "premier-league" | "la-liga" | "bundesliga" | "egyptian-league" | "legends";
export const auctionSectionLabels: Record<AuctionSection, string> = { all: "ميكس", "premier-league": "الدوري الإنجليزي", "la-liga": "الدوري الإسباني", bundesliga: "الدوري الألماني", "egyptian-league": "الدوري المصري", legends: "الأساطير" };
export type CataloguePlayer = AuctionPlayer & { id: string; position: PositionCode; startPrice: number; status: PlayerStatus; section?: Exclude<AuctionSection, "all">; };
export type AuctionRound = { slot: number; position: PositionCode; label: string; startPrice: number; auction: AuctionPlayer; hidden: AuctionPlayer; };

export const TEAM_STARTING_BUDGET = 100;
export const MINIMUM_FUTURE_PRICE = 3;
export const formationSlots: PositionCode[] = ["GK", "CB", "CB", "RB", "LB", "CM", "CM", "CAM", "RW", "LW", "ST"];
export const positionLabels: Record<PositionCode, string> = { GK: "حارس مرمى", CB: "قلب دفاع", RB: "ظهير أيمن", LB: "ظهير أيسر", CM: "لاعب وسط", CAM: "صانع ألعاب", RW: "جناح أيمن", LW: "جناح أيسر", ST: "مهاجم صريح" };

type Seed = [string, number, string, PlayerStatus?];
const pools: Record<PositionCode, Seed[]> = {
  GK: [
    ["Lev Yashin", 93, "رد فعل تاريخي", "legend"], ["Gianluigi Buffon", 92, "خبرة وقيادة", "legend"], ["Iker Casillas", 91, "حارس اللحظات", "legend"], ["Thibaut Courtois", 91, "حارس عملاق"], ["Manuel Neuer", 90, "ليبيرو وقائد"], ["Petr Čech", 89, "ثبات تحت الضغط", "legend"], ["Alisson Becker", 89, "هدوء وتمركز"], ["Ederson", 88, "بناء لعب دقيق"], ["Gianluigi Donnarumma", 88, "قوة بدنية"], ["Jan Oblak", 87, "ردة فعل سريعة"], ["Marc-André ter Stegen", 87, "إتقان بالقدم"], ["David Raya", 83, "اختيار متوازن"],
  ],
  CB: [
    ["Franz Beckenbauer", 95, "ليبيرو أسطوري", "legend"], ["Paolo Maldini", 94, "قراءة دفاعية", "legend"], ["Alessandro Nesta", 92, "هدوء إيطالي", "legend"], ["Fabio Cannavaro", 91, "توقيت مثالي", "legend"], ["Sergio Ramos", 91, "شخصية حاسمة", "legend"], ["Rio Ferdinand", 90, "سرعة وخبرة", "legend"], ["Virgil van Dijk", 90, "هيمنة هوائية"], ["Carles Puyol", 89, "روح قتالية", "legend"], ["William Saliba", 88, "قوة وهدوء"], ["Rúben Dias", 88, "تنظيم دفاعي"], ["Thiago Silva", 88, "خبرة ونظافة"], ["Alessandro Bastoni", 86, "تمرير من الخلف"], ["Ronald Araújo", 86, "افتكاك قوي"], ["Aymeric Laporte", 85, "توازن دفاعي"], ["Pau Torres", 84, "بناء لعب"], ["Ibrahima Konaté", 84, "سرعة وقوة"],
  ],
  RB: [
    ["Philipp Lahm", 92, "ذكاء تكتيكي", "legend"], ["Javier Zanetti", 91, "ثبات أسطوري", "legend"], ["Cafu", 91, "طاقة لا تنتهي", "legend"], ["Dani Alves", 90, "دعم هجومي", "legend"], ["Trent Alexander-Arnold", 86, "عرضيات وتمرير"], ["Achraf Hakimi", 88, "سرعة هجومية"], ["João Cancelo", 85, "مرونة فنية"], ["Dani Carvajal", 85, "خبرة المباريات"], ["Kyle Walker", 84, "سرعة تغطية"], ["Jeremie Frimpong", 86, "اندفاع مستمر"], ["Reece James", 84, "قوة وعرضيات"], ["Pedro Porro", 82, "اختيار متزن"],
  ],
  LB: [
    ["Roberto Carlos", 92, "قدم يسارية تاريخية", "legend"], ["Marcelo", 91, "مهارة وابتكار", "legend"], ["Ashley Cole", 91, "دفاع مثالي", "legend"], ["Jordi Alba", 86, "تحرك ذكي", "legend"], ["Theo Hernández", 86, "اندفاع متوازن"], ["Alphonso Davies", 86, "سرعة خارقة"], ["Joško Gvardiol", 86, "قوة وهدوء"], ["Alejandro Grimaldo", 85, "دقة هجومية"], ["Nuno Mendes", 84, "طاقة شابة"], ["Leighton Baines", 85, "كرات ثابتة", "legend"], ["Pervis Estupiñán", 82, "عرضيات قوية"], ["Alejandro Balde", 81, "موهبة صاعدة"],
  ],
  CM: [
    ["Xavi", 93, "إيقاع وتحكم", "legend"], ["Andrés Iniesta", 93, "حلول تحت الضغط", "legend"], ["Andrea Pirlo", 91, "رؤية وتمرير", "legend"], ["Toni Kroos", 91, "دقة استثنائية", "legend"], ["Rodri", 91, "محور لا يُكسر"], ["Patrick Vieira", 91, "قوة وسيطرة", "legend"], ["Yaya Touré", 90, "قوة من العمق", "legend"], ["Luka Modrić", 90, "إيقاع وسيطرة", "legend"], ["Jude Bellingham", 91, "طاقة وحسم"], ["Federico Valverde", 89, "تغطية شاملة"], ["N'Golo Kanté", 89, "افتكاك لا يتوقف"], ["Paul Scholes", 90, "تسديد وتمرير", "legend"], ["İlkay Gündoğan", 87, "وصول لمنطقة الجزاء"], ["Frenkie de Jong", 87, "حمل الكرة"], ["Sandro Tonali", 84, "اختيار متوازن"], ["Declan Rice", 86, "توازن وقيادة"],
  ],
  CAM: [
    ["Diego Maradona", 97, "عبقرية مطلقة", "legend"], ["Zinedine Zidane", 94, "لمسة لا تُنسى", "legend"], ["Ronaldinho", 94, "سحر وإمتاع", "legend"], ["Kaká", 92, "اندفاع من العمق", "legend"], ["Kevin De Bruyne", 92, "تمريرة قاتلة"], ["Francesco Totti", 91, "رؤية وقوة", "legend"], ["Juan Román Riquelme", 91, "إيقاع خاص", "legend"], ["Mesut Özil", 89, "صناعة فرص", "legend"], ["Jamal Musiala", 90, "مراوغة وإبداع"], ["Phil Foden", 89, "تحرك ذكي"], ["Bruno Fernandes", 87, "مخاطرة هجومية"], ["Cole Palmer", 87, "ثقة وحسم"], ["Paulo Dybala", 86, "قدم يسارية"], ["Martin Ødegaard", 87, "قيادة فنية"],
  ],
  RW: [
    ["Lionel Messi", 96, "صانع الفارق", "legend"], ["Garrincha", 94, "مراوغة تاريخية", "legend"], ["Luis Figo", 92, "ذكاء هجومي", "legend"], ["Arjen Robben", 92, "تسديدة مقوسة", "legend"], ["David Beckham", 91, "عرضيات استثنائية", "legend"], ["Mohamed Salah", 90, "إنهاء ذكي"], ["Bernardo Silva", 88, "تحكم تحت الضغط"], ["Bukayo Saka", 87, "اتزان وحسم"], ["Riyad Mahrez", 87, "لمسة حريرية"], ["Lamine Yamal", 87, "موهبة واعدة"], ["Michael Olise", 84, "اختيار هجومي"], ["Ousmane Dembélé", 86, "مراوغة مزدوجة"], ["Robin van Persie", 90, "قدم يسرى ذهبية", "legend"],
  ],
  LW: [
    ["Cristiano Ronaldo", 96, "آلة تهديفية", "legend"], ["Thierry Henry", 94, "سرعة وإنهاء", "legend"], ["Neymar", 92, "مهارة وابتكار"], ["Eden Hazard", 92, "مراوغة من الطراز", "legend"], ["Franck Ribéry", 91, "جناح لا يهدأ", "legend"], ["Vinícius Júnior", 91, "سرعة وحسم"], ["Kylian Mbappé", 94, "انفجار هجومي"], ["Sadio Mané", 89, "ضغط وإنهاء"], ["Son Heung-min", 89, "قدمين وحسم"], ["Khvicha Kvaratskhelia", 87, "خيال هجومي"], ["Luis Díaz", 85, "طاقة ومراوغة"], ["Jack Grealish", 85, "احتفاظ بالكرة"],
  ],
  ST: [
    ["Ronaldo Nazário", 95, "إنهاء استثنائي", "legend"], ["Marco van Basten", 94, "أناقة تهديفية", "legend"], ["Erling Haaland", 92, "قوة تهديفية"], ["Robert Lewandowski", 91, "تمركز قاتل"], ["Luis Suárez", 92, "حِدّة أمام المرمى", "legend"], ["Karim Benzema", 91, "ربط وإنهاء", "legend"], ["Samuel Eto'o", 91, "سرعة وحسم", "legend"], ["Harry Kane", 91, "تسديد وتمرير"], ["Zlatan Ibrahimović", 91, "قوة وخبرة", "legend"], ["Andriy Shevchenko", 91, "تحرك ذكي", "legend"], ["Sergio Agüero", 90, "لمسة صندوق", "legend"], ["Didier Drogba", 90, "قوة هوائية", "legend"], ["Victor Osimhen", 86, "اندفاع مباشر"], ["Viktor Gyökeres", 86, "قوة وحركة"], ["Julián Álvarez", 86, "ضغط وحلوله"], ["Lautaro Martínez", 88, "إنهاء عنيف"], ["Pierre-Emerick Aubameyang", 86, "سرعة وإنهاء"],
  ],
};

const slug = (value: string) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const tierFor = (rating: number): AuctionPlayer["tier"] => rating >= 91 ? "LEGEND" : rating >= 88 ? "ELITE" : rating >= 85 ? "STAR" : "PRO";
const priceFor = (rating: number) => rating >= 95 ? 15 : rating >= 92 ? 13 : rating >= 90 ? 11 : rating >= 88 ? 9 : rating >= 85 ? 7 : 5;

const basePlayerCatalogue: CataloguePlayer[] = (Object.entries(pools) as [PositionCode, Seed[]][]).flatMap(([position, players]) => players.map(([name, rating, note, status = "active"]) => ({ id: slug(`${position}-${name}`), name, rating, note, status, position, tier: tierFor(rating), startPrice: priceFor(rating) })));
const baseNames = new Set(basePlayerCatalogue.map((player) => player.name));
const expandedCatalogue: CataloguePlayer[] = expandedPlayerSeeds.filter(([name]) => !baseNames.has(name)).map(([name, position, rating, status]) => ({ id: slug(`${position}-${name}`), name, rating, note: "مسيرة كروية تستحق الاكتشاف", status, position, tier: tierFor(rating), startPrice: priceFor(rating) }));
const mergedCatalogue = [...basePlayerCatalogue, ...expandedCatalogue];
const premierLeagueNames = new Set(["Alisson Becker", "Ederson", "David Raya", "Jordan Pickford", "Virgil van Dijk", "Rio Ferdinand", "John Terry", "William Saliba", "Rúben Dias", "Thiago Silva", "Ibrahima Konaté", "Kyle Walker", "Trent Alexander-Arnold", "Ashley Cole", "Kevin De Bruyne", "Rodri", "Moisés Caicedo", "Enzo Fernández", "Bruno Fernandes", "Martin Ødegaard", "Declan Rice", "N'Golo Kanté", "Paul Scholes", "Steven Gerrard", "Frank Lampard", "Patrick Vieira", "Yaya Touré", "Mohamed Salah", "Bukayo Saka", "Riyad Mahrez", "Sadio Mané", "Son Heung-min", "Jack Grealish", "Phil Foden", "David Beckham", "Harry Kane", "Erling Haaland", "Sergio Agüero", "Didier Drogba", "Thierry Henry", "Pierre-Emerick Aubameyang", "Robin van Persie", "Ben Chilwell", "Luke Shaw", "Andy Robertson", "Kieran Trippier", "Reece James", "James Maddison", "Marcus Rashford", "Gabriel Jesus", "Alexander Isak", "Gabriel Martinelli"]);
const laLigaNames = new Set(["Thibaut Courtois", "Iker Casillas", "Jan Oblak", "Marc-André ter Stegen", "Sergio Ramos", "Marcelo", "Carles Puyol", "Gerard Piqué", "Aymeric Laporte", "Pau Torres", "Ronald Araújo", "Dani Alves", "João Cancelo", "Achraf Hakimi", "Raphinha", "Rodrygo", "Takefusa Kubo", "Dani Carvajal", "David Alaba", "Theo Hernández", "Alejandro Grimaldo", "Alphonso Davies", "Roberto Carlos", "Luka Modrić", "Xavi", "Andrés Iniesta", "Toni Kroos", "Zinedine Zidane", "Isco", "Ferran Torres", "Giovani Lo Celso", "Rafinha Alcântara", "Mikel Oyarzabal", "Cesc Fàbregas", "David Silva", "Santi Cazorla", "Thiago Alcântara", "Eduardo Camavinga", "Aurélien Tchouaméni", "Federico Valverde", "Frenkie de Jong", "Casemiro", "Jude Bellingham", "Lionel Messi", "Cristiano Ronaldo", "Neymar", "Vinícius Júnior", "Kylian Mbappé", "Luis Figo", "Ronaldinho", "Karim Benzema", "Luis Suárez", "Álvaro Morata", "Robert Lewandowski", "Ronaldo Nazário", "Samuel Eto'o", "Andriy Shevchenko"]);
const bundesligaNames = new Set(["Manuel Neuer", "Kevin Trapp", "Oliver Kahn", "Sepp Maier", "Bernd Leno", "Jürgen Kohler", "Matthias Sammer", "Mats Hummels", "Niklas Süle", "Matthias Ginter", "Jonathan Tah", "Antonio Rüdiger", "Benjamin Pavard", "Noussair Mazraoui", "Philipp Lahm", "Berti Vogts", "Paul Breitner", "Bixente Lizarazu", "Raphaël Guerreiro", "David Raum", "Lothar Matthäus", "Günter Netzer", "Michael Ballack", "Bastian Schweinsteiger", "Sami Khedira", "Toni Kroos", "Joshua Kimmich", "Leon Goretzka", "İlkay Gündoğan", "Florian Wirtz", "Kai Havertz", "Thomas Müller", "Mario Götze", "Jamal Musiala", "Marco Reus", "Serge Gnabry", "Leroy Sané", "Kingsley Coman", "Arjen Robben", "Franck Ribéry", "Robert Lewandowski", "Victor Boniface", "Niclas Füllkrug", "Karim Adeyemi", "Timo Werner", "Gerd Müller", "Miroslav Klose", "Erling Haaland", "Harry Kane", "Mario Mandžukić"]);
const egyptianLeagueNames = new Set(["Essam El Hadary", "Ahmed El Shenawy", "Mohamed El Shenawy", "Ahmed Hegazi", "Ramy Rabia", "Ali Gabr", "Mahmoud Hamdy El Wensh", "Ayman Ashraf", "Mohamed Hany", "Omar Kamal", "Ahmed Fathi", "Sacha Boey", "Ahmed Abu El Fotouh", "Ali Maaloul", "Karim Hafez", "Mohamed Hamdy", "Mohamed Elneny", "Amr El Solia", "Tarek Hamed", "Hamdy Fathy", "Mohamed Aboutrika", "Mohamed Magdy Afsha", "Marwan Attia", "Aliou Dieng", "Emam Ashour", "Hossam Ashour", "Mostafa Mohamed", "Abdallah El Said", "Shikabala", "Walid Soliman", "Amr Warda", "Ahmed Hassan", "Trézéguet", "Mahmoud Kahraba", "Hussein El Shahat", "Omar Marmoush", "Ibrahim Adel", "Ahmed Refaat", "Mostafa Fathi", "Ahmed Sayed Zizo", "Mohamed Sherif", "Ahmed Hassan Kouka", "Ahmed Yasser Rayan", "Marwan Hamdy", "Hossam Hassan", "Mido", "Amr Zaki"]);
const classifySection = (player: CataloguePlayer): CataloguePlayer["section"] => premierLeagueNames.has(player.name) ? "premier-league" : laLigaNames.has(player.name) ? "la-liga" : bundesligaNames.has(player.name) ? "bundesliga" : egyptianLeagueNames.has(player.name) ? "egyptian-league" : undefined;
export const playerCatalogue: CataloguePlayer[] = mergedCatalogue.filter((player, index, players) => players.findIndex((candidate) => candidate.name === player.name) === index).map((player) => ({ ...player, section: classifySection(player) }));
export function getPlayersForAuctionSection(section: AuctionSection = "all") {
  if (section === "all") return playerCatalogue;
  if (section === "legends") return playerCatalogue.filter((player) => player.status === "legend");
  return playerCatalogue.filter((player) => player.section === section && player.status === "active");
}

const find = (name: string) => playerCatalogue.find((player) => player.name === name)!;
const asAuctionPlayer = (player: CataloguePlayer): AuctionPlayer => ({ name: player.name, rating: player.rating, tier: player.tier, note: player.note });
const preferredPairs: [string, string][] = [["Manuel Neuer", "Thibaut Courtois"], ["Fabio Cannavaro", "William Saliba"], ["Rio Ferdinand", "Virgil van Dijk"], ["Cafu", "Achraf Hakimi"], ["Roberto Carlos", "Theo Hernández"], ["Andrea Pirlo", "Rodri"], ["Luka Modrić", "Jude Bellingham"], ["Zinedine Zidane", "Jamal Musiala"], ["Lionel Messi", "Mohamed Salah"], ["Ronaldinho", "Vinícius Júnior"], ["Ronaldo Nazário", "Erling Haaland"]];

const pickUnused = (pool: CataloguePlayer[], startIndex: number, usedNames: Set<string>) => {
  for (let step = 0; step < pool.length; step += 1) {
    const candidate = pool[(startIndex + step) % pool.length];
    if (!usedNames.has(candidate.name)) return candidate;
  }
  throw new Error(`No unused player remains for ${pool[0]?.position ?? "auction"}`);
};

export function buildAuctionRounds(seed = 0, section: AuctionSection = "all"): AuctionRound[] {
  const usedNames = new Set<string>();

  return formationSlots.map((position, slot) => {
    const preferred = preferredPairs[slot];
    const pool = getPlayersForAuctionSection(section).filter((player) => player.position === position);
    if (pool.length < 2) throw new Error(`قسم ${auctionSectionLabels[section]} لا يحتوي لاعبين كافيين لمركز ${positionLabels[position]}`);
    const offset = Math.abs(seed) % pool.length;
    const preferredAuction = section === "all" && seed === 0 ? find(preferred[0]) : null;
    const auction = preferredAuction && !usedNames.has(preferredAuction.name)
      ? preferredAuction
      : pickUnused(pool, seed === 0 ? 0 : slot * 3 + offset, usedNames);
    usedNames.add(auction.name);

    const preferredHidden = section === "all" && seed === 0 ? find(preferred[1]) : null;
    const hidden = preferredHidden && !usedNames.has(preferredHidden.name)
      ? preferredHidden
      : pickUnused(pool, seed === 0 ? 0 : slot * 5 + offset + 1, usedNames);
    usedNames.add(hidden.name);

    return { slot: slot + 1, position, label: positionLabels[position], startPrice: auction.startPrice, auction: asAuctionPlayer(auction), hidden: asAuctionPlayer(hidden) };
  });
}

export const auctionRounds = buildAuctionRounds();
