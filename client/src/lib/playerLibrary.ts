import { playerCatalogue, positionLabels, type CataloguePlayer, type PlayerStatus, type PositionCode } from "./auctionData";
import { PLAYER_IMAGE_URLS } from "./playerImageMap";

export type LibraryPlayer = CataloguePlayer & {
  arabicName: string;
  aliases: string[];
  nationality: string;
  currentClub: string;
  careerLabel: string;
  image?: string;
};

const arabicNames: Record<string, string> = {
  "Mohamed Salah": "محمد صلاح", "Lionel Messi": "ليونيل ميسي", "Cristiano Ronaldo": "كريستيانو رونالدو", "Neymar": "نيمار", "Kylian Mbappé": "كيليان مبابي", "Erling Haaland": "إيرلينغ هالاند", "Robert Lewandowski": "روبرت ليفاندوفسكي", "Karim Benzema": "كريم بنزيما", "Luka Modrić": "لوكا مودريتش", "Kevin De Bruyne": "كيفن دي بروين", "Zlatan Ibrahimović": "زلاتان إبراهيموفيتش", "Sergio Ramos": "سيرجيو راموس", "Virgil van Dijk": "فيرجيل فان دايك", "Thierry Henry": "تييري هنري", "Ronaldinho": "رونالدينيو", "Zinedine Zidane": "زين الدين زيدان", "Diego Maradona": "دييجو مارادونا", "Ronaldo Nazário": "رونالدو نازاريو", "Xavi": "تشافي", "Andrés Iniesta": "أندريس إنييستا", "Andrea Pirlo": "أندريا بيرلو", "Toni Kroos": "توني كروس", "Manuel Neuer": "مانويل نوير", "Gianluigi Buffon": "جانلويجي بوفون", "Iker Casillas": "إيكر كاسياس", "Paolo Maldini": "باولو مالديني", "Roberto Carlos": "روبرتو كارلوس", "Marcelo": "مارسيلو", "Sadio Mané": "ساديو ماني", "Son Heung-min": "سون هيونغ مين", "Riyad Mahrez": "رياض محرز", "Sergio Agüero": "سيرجيو أجويرو", "Didier Drogba": "ديدييه دروجبا", "Luis Suárez": "لويس سواريز", "Harry Kane": "هاري كين", "Bruno Fernandes": "برونو فرنانديز", "Jude Bellingham": "جود بيلينجهام", "Rodri": "رودري", "Vinícius Júnior": "فينيسيوس جونيور", "Bukayo Saka": "بوكايو ساكا", "David Beckham": "ديفيد بيكهام", "Arjen Robben": "أريين روبن", "Luis Figo": "لويس فيجو", "Francesco Totti": "فرانشيسكو توتي", "Kaká": "كاكا", "Lev Yashin": "ليف ياشين", "Franz Beckenbauer": "فرانتس بكنباور", "Cafu": "كافو", "Javier Zanetti": "خافيير زانيتي", "Ashley Cole": "أشلي كول", "N'Golo Kanté": "نجولو كانتي", "Patrick Vieira": "باتريك فييرا", "Yaya Touré": "يايا توريه", "Samuel Eto'o": "صامويل إيتو", "Andriy Shevchenko": "أندريه شيفتشينكو", "Marco van Basten": "ماركو فان باستن", "Robin van Persie": "روبن فان بيرسي", "Pierre-Emerick Aubameyang": "بيير إيميريك أوباميانج"
};

const nationalities: Record<string, string> = {
  "Mohamed Salah": "مصر", "Riyad Mahrez": "الجزائر", "Lionel Messi": "الأرجنتين", "Cristiano Ronaldo": "البرتغال", "Neymar": "البرازيل", "Kylian Mbappé": "فرنسا", "Karim Benzema": "فرنسا", "Zinedine Zidane": "فرنسا", "Erling Haaland": "النرويج", "Martin Ødegaard": "النرويج", "Robert Lewandowski": "بولندا", "Luka Modrić": "كرواتيا", "Kevin De Bruyne": "بلجيكا", "Thibaut Courtois": "بلجيكا", "Eden Hazard": "بلجيكا", "Son Heung-min": "كوريا الجنوبية", "Sadio Mané": "السنغال", "Samuel Eto'o": "الكاميرون", "Didier Drogba": "ساحل العاج", "Luis Suárez": "أوروجواي", "Diego Maradona": "الأرجنتين", "Ronaldo Nazário": "البرازيل", "Ronaldinho": "البرازيل", "Thierry Henry": "فرنسا", "Andriy Shevchenko": "أوكرانيا", "Zlatan Ibrahimović": "السويد", "Gianluigi Buffon": "إيطاليا", "Paolo Maldini": "إيطاليا", "Andrea Pirlo": "إيطاليا", "Alessandro Nesta": "إيطاليا", "Fabio Cannavaro": "إيطاليا", "Xavi": "إسبانيا", "Andrés Iniesta": "إسبانيا", "Sergio Ramos": "إسبانيا", "David Beckham": "إنجلترا", "Harry Kane": "إنجلترا", "Jude Bellingham": "إنجلترا", "Bukayo Saka": "إنجلترا", "Virgil van Dijk": "هولندا", "Arjen Robben": "هولندا", "Marco van Basten": "هولندا", "Franz Beckenbauer": "ألمانيا", "Toni Kroos": "ألمانيا", "Manuel Neuer": "ألمانيا", "Mesut Özil": "ألمانيا", "Lev Yashin": "الاتحاد السوفيتي"
};

const retiredNames = new Set(["Eden Hazard", "Franck Ribéry", "Arjen Robben", "David Beckham", "Luis Figo", "Kaká", "Ronaldinho", "Zinedine Zidane", "Diego Maradona", "Ronaldo Nazário", "Thierry Henry", "Marco van Basten", "Andriy Shevchenko", "Sergio Agüero", "Didier Drogba", "Samuel Eto'o", "Zlatan Ibrahimović", "Xavi", "Andrés Iniesta", "Andrea Pirlo", "Toni Kroos", "Sergio Ramos", "Marcelo", "Paolo Maldini", "Franz Beckenbauer", "Lev Yashin", "Cafu", "Javier Zanetti", "Ashley Cole", "Patrick Vieira", "Yaya Touré", "Paul Scholes", "Juan Román Riquelme", "Mesut Özil", "Robin van Persie", "Leighton Baines", "Dani Alves"]);

const normalize = (value: string) => value.toLocaleLowerCase("ar").normalize("NFKD").replace(/[\u064B-\u065F\u0670]/g, "").replace(/[أإآ]/g, "ا").replace(/ى/g, "ي").replace(/[^a-z0-9\u0600-\u06ff]/g, "");

export const playerLibrary: LibraryPlayer[] = playerCatalogue.map((player) => {
  const arabicName = arabicNames[player.name] ?? player.name;
  const aliases = [player.name, arabicName];
  return { ...player, status: retiredNames.has(player.name) ? "legend" : player.status, arabicName, aliases, nationality: nationalities[player.name] ?? "دولي", currentClub: retiredNames.has(player.name) ? "معتزل" : "لاعب حالي", careerLabel: player.status === "legend" || retiredNames.has(player.name) ? "أرشيف النجوم والمعتزلين" : "جيل اللاعبين الحالي", image: PLAYER_IMAGE_URLS[player.name] };
});

export const libraryPositionLabels = positionLabels;
export const libraryPositionCodes = Object.keys(positionLabels) as PositionCode[];
export const libraryStatusLabels: Record<PlayerStatus, string> = { active: "حالي", legend: "معتزل / أسطورة" };

export function searchLibraryPlayers(players: LibraryPlayer[], query: string) {
  const value = normalize(query.trim());
  if (!value) return players;
  return players.filter((player) => normalize(`${player.name} ${player.arabicName} ${player.aliases.join(" ")} ${player.nationality} ${player.note}`).includes(value));
}
