export type PositionCode = "GK" | "CB" | "RB" | "LB" | "CM" | "CAM" | "RW" | "LW" | "ST";
export type PlayerStatus = "active" | "legend";

export type AuctionPlayer = { name: string; rating: number; tier: "LEGEND" | "ELITE" | "STAR" | "PRO"; note: string; };
export type CataloguePlayer = AuctionPlayer & { id: string; position: PositionCode; startPrice: number; status: PlayerStatus; };
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
    ["Lionel Messi", 96, "صانع الفارق", "legend"], ["Garrincha", 94, "مراوغة تاريخية", "legend"], ["Luis Figo", 92, "ذكاء هجومي", "legend"], ["Arjen Robben", 92, "تسديدة مقوسة", "legend"], ["David Beckham", 91, "عرضيات استثنائية", "legend"], ["Mohamed Salah", 90, "إنهاء ذكي"], ["Bernardo Silva", 88, "تحكم تحت الضغط"], ["Bukayo Saka", 87, "اتزان وحسم"], ["Riyad Mahrez", 87, "لمسة حريرية"], ["Lamine Yamal", 87, "موهبة واعدة"], ["Michael Olise", 84, "اختيار هجومي"], ["Ousmane Dembélé", 86, "مراوغة مزدوجة"],
  ],
  LW: [
    ["Cristiano Ronaldo", 96, "آلة تهديفية", "legend"], ["Thierry Henry", 94, "سرعة وإنهاء", "legend"], ["Neymar", 92, "مهارة وابتكار"], ["Eden Hazard", 92, "مراوغة من الطراز", "legend"], ["Franck Ribéry", 91, "جناح لا يهدأ", "legend"], ["Vinícius Júnior", 91, "سرعة وحسم"], ["Kylian Mbappé", 94, "انفجار هجومي"], ["Sadio Mané", 89, "ضغط وإنهاء"], ["Son Heung-min", 89, "قدمين وحسم"], ["Khvicha Kvaratskhelia", 87, "خيال هجومي"], ["Luis Díaz", 85, "طاقة ومراوغة"], ["Jack Grealish", 85, "احتفاظ بالكرة"],
  ],
  ST: [
    ["Ronaldo Nazário", 95, "إنهاء استثنائي", "legend"], ["Marco van Basten", 94, "أناقة تهديفية", "legend"], ["Erling Haaland", 92, "قوة تهديفية"], ["Robert Lewandowski", 91, "تمركز قاتل"], ["Luis Suárez", 92, "حِدّة أمام المرمى", "legend"], ["Karim Benzema", 91, "ربط وإنهاء", "legend"], ["Samuel Eto'o", 91, "سرعة وحسم", "legend"], ["Harry Kane", 91, "تسديد وتمرير"], ["Zlatan Ibrahimović", 91, "قوة وخبرة", "legend"], ["Andriy Shevchenko", 91, "تحرك ذكي", "legend"], ["Sergio Agüero", 90, "لمسة صندوق", "legend"], ["Didier Drogba", 90, "قوة هوائية", "legend"], ["Victor Osimhen", 86, "اندفاع مباشر"], ["Viktor Gyökeres", 86, "قوة وحركة"], ["Julián Álvarez", 86, "ضغط وحلوله"], ["Lautaro Martínez", 88, "إنهاء عنيف"],
  ],
};

const slug = (value: string) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const tierFor = (rating: number): AuctionPlayer["tier"] => rating >= 91 ? "LEGEND" : rating >= 88 ? "ELITE" : rating >= 85 ? "STAR" : "PRO";
const priceFor = (rating: number) => rating >= 95 ? 15 : rating >= 92 ? 13 : rating >= 90 ? 11 : rating >= 88 ? 9 : rating >= 85 ? 7 : 5;

export const playerCatalogue: CataloguePlayer[] = (Object.entries(pools) as [PositionCode, Seed[]][]).flatMap(([position, players]) => players.map(([name, rating, note, status = "active"]) => ({ id: slug(`${position}-${name}`), name, rating, note, status, position, tier: tierFor(rating), startPrice: priceFor(rating) })));

const find = (name: string) => playerCatalogue.find((player) => player.name === name)!;
const asAuctionPlayer = (player: CataloguePlayer): AuctionPlayer => ({ name: player.name, rating: player.rating, tier: player.tier, note: player.note });
const preferredPairs: [string, string][] = [["Manuel Neuer", "Thibaut Courtois"], ["Fabio Cannavaro", "William Saliba"], ["Rio Ferdinand", "Virgil van Dijk"], ["Cafu", "Achraf Hakimi"], ["Roberto Carlos", "Theo Hernández"], ["Andrea Pirlo", "Rodri"], ["Luka Modrić", "Jude Bellingham"], ["Zinedine Zidane", "Jamal Musiala"], ["Lionel Messi", "Mohamed Salah"], ["Ronaldinho", "Vinícius Júnior"], ["Ronaldo Nazário", "Erling Haaland"]];

export function buildAuctionRounds(seed = 0): AuctionRound[] {
  return formationSlots.map((position, slot) => {
    const preferred = preferredPairs[slot];
    const pool = playerCatalogue.filter((player) => player.position === position);
    const offset = seed % pool.length;
    const auction = seed ? pool[(slot * 3 + offset) % pool.length] : find(preferred[0]);
    const hidden = seed ? pool[(slot * 5 + offset + 1) % pool.length] : find(preferred[1]);
    return { slot: slot + 1, position, label: positionLabels[position], startPrice: auction.startPrice, auction: asAuctionPlayer(auction), hidden: asAuctionPlayer(hidden.name === auction.name ? pool[(slot + 2) % pool.length] : hidden) };
  });
}

export const auctionRounds = buildAuctionRounds();
