import { CataloguePlayer, playerCatalogue, positionLabels } from "./auctionData";

type CuratedQuestion = { playerName: string; clues: [string, string, string]; options?: string[] };
export type AftakarQuestion = { playerName: string; clues: [string, string, string]; options: string[]; category: "trivia" | "catalogue" };
type TriviaMetadata = { nationality: string; clubs: string; achievement: string; alias: string };

const triviaMetadata: Record<string, TriviaMetadata> = {
  "Lionel Messi": { nationality: "أرجنتيني", clubs: "برشلونة وباريس سان جيرمان وإنتر ميامي", achievement: "كأس العالم 2022 وسبع كرات ذهبية", alias: "البرغوث" },
  "Cristiano Ronaldo": { nationality: "برتغالي", clubs: "سبورتينغ لشبونة ومانشستر يونايتد وريال مدريد ويوفنتوس", achievement: "خمس كرات ذهبية وخمس بطولات دوري أبطال", alias: "الدون" },
  "Mohamed Salah": { nationality: "مصري", clubs: "بازل وتشيلسي وروما وليفربول", achievement: "دوري أبطال أوروبا مع ليفربول", alias: "الملك المصري" },
  "Kylian Mbappé": { nationality: "فرنسي", clubs: "موناكو وباريس سان جيرمان وريال مدريد", achievement: "كأس العالم 2018", alias: "السلحفاة" },
  "Erling Haaland": { nationality: "نرويجي", clubs: "مولده وسالزبورغ وبوروسيا دورتموند ومانشستر سيتي", achievement: "الثلاثية مع مانشستر سيتي", alias: "الآلة" },
  "Zinedine Zidane": { nationality: "فرنسي", clubs: "بوردو ويوفنتوس وريال مدريد", achievement: "كأس العالم 1998 والكرة الذهبية", alias: "زيزو" },
  "Ronaldinho": { nationality: "برازيلي", clubs: "باريس سان جيرمان وبرشلونة وميلان", achievement: "كأس العالم 2002 والكرة الذهبية", alias: "روني" },
  "Ronaldo Nazário": { nationality: "برازيلي", clubs: "آيندهوفن وبرشلونة وإنتر ميلان وريال مدريد", achievement: "كأس العالم 2002 وثلاث كرات ذهبية", alias: "الظاهرة" },
  "Diego Maradona": { nationality: "أرجنتيني", clubs: "بوكا جونيورز وبرشلونة ونابولي", achievement: "كأس العالم 1986", alias: "الأسطورة" },
  "Xavi": { nationality: "إسباني", clubs: "برشلونة والسد", achievement: "كأس العالم 2010 وثلاثة ألقاب دوري أبطال", alias: "المايسترو" },
  "Andrés Iniesta": { nationality: "إسباني", clubs: "برشلونة وفيسيل كوبي", achievement: "هدف نهائي كأس العالم 2010", alias: "الساحر الهادئ" },
  "Andrea Pirlo": { nationality: "إيطالي", clubs: "ميلان ويوفنتوس ونيويورك سيتي", achievement: "كأس العالم 2006", alias: "المهندس" },
  "Luka Modrić": { nationality: "كرواتي", clubs: "دينامو زغرب وتوتنهام وريال مدريد", achievement: "الكرة الذهبية 2018", alias: "الساحر الكرواتي" },
  "Toni Kroos": { nationality: "ألماني", clubs: "بايرن ميونخ وريال مدريد", achievement: "ستة ألقاب دوري أبطال وكأس العالم 2014", alias: "المايسترو" },
  "Lev Yashin": { nationality: "سوفيتي", clubs: "دينامو موسكو", achievement: "الكرة الذهبية 1963", alias: "العنكبوت الأسود" },
  "Gianluigi Buffon": { nationality: "إيطالي", clubs: "بارما ويوفنتوس وباريس سان جيرمان", achievement: "كأس العالم 2006", alias: "جيجي" },
  "Iker Casillas": { nationality: "إسباني", clubs: "ريال مدريد وبورتو", achievement: "كأس العالم 2010 ولقبان أوروبيان", alias: "القديس" },
  "Manuel Neuer": { nationality: "ألماني", clubs: "شالكه وبايرن ميونخ", achievement: "كأس العالم 2014 والقفاز الذهبي", alias: "الحارس الليبيرو" },
  "Paolo Maldini": { nationality: "إيطالي", clubs: "ميلان فقط", achievement: "خمس بطولات دوري أبطال", alias: "القيصر الإيطالي" },
  "Franz Beckenbauer": { nationality: "ألماني", clubs: "بايرن ميونخ ونيويورك كوزموس وهامبورغ", achievement: "كأس العالم لاعباً ومدرباً", alias: "القيصر" },
  "Fabio Cannavaro": { nationality: "إيطالي", clubs: "بارما وإنتر وريال مدريد", achievement: "الكرة الذهبية 2006", alias: "القائد" },
  "Sergio Ramos": { nationality: "إسباني", clubs: "إشبيلية وريال مدريد وباريس سان جيرمان", achievement: "كأس العالم 2010 وأربع بطولات دوري أبطال", alias: "قائد الدفاع" },
  "Thierry Henry": { nationality: "فرنسي", clubs: "موناكو ويوفنتوس وآرسنال وبرشلونة", achievement: "كأس العالم 1998 ودوري أبطال 2009", alias: "الغزال" },
  "Neymar": { nationality: "برازيلي", clubs: "سانتوس وبرشلونة وباريس سان جيرمان", achievement: "دوري أبطال أوروبا 2015", alias: "جونيور" },
  "Robert Lewandowski": { nationality: "بولندي", clubs: "ليخ بوزنان وبوروسيا دورتموند وبايرن وبرشلونة", achievement: "السداسية مع بايرن ميونخ", alias: "الهداف البولندي" },
  "Karim Benzema": { nationality: "فرنسي", clubs: "ليون وريال مدريد والاتحاد", achievement: "الكرة الذهبية 2022", alias: "الحكومة" },
  "Didier Drogba": { nationality: "إيفواري", clubs: "مارسيليا وتشيلسي وغلطة سراي", achievement: "دوري أبطال أوروبا 2012", alias: "الفيل" },
  "Samuel Eto'o": { nationality: "كاميروني", clubs: "ريال مدريد ومايوركا وبرشلونة وإنتر", achievement: "ثلاثية برشلونة ثم ثلاثية إنتر", alias: "الأسد" },
  "David Beckham": { nationality: "إنجليزي", clubs: "مانشستر يونايتد وريال مدريد ولوس أنجلوس جالاكسي", achievement: "دوري أبطال أوروبا 1999", alias: "القدم الذهبية" },
  "Luis Figo": { nationality: "برتغالي", clubs: "سبورتينغ وبرشلونة وريال مدريد وإنتر", achievement: "الكرة الذهبية 2000", alias: "الجناح الساحر" },
};

const curatedQuestions: CuratedQuestion[] = [
  { playerName: "Lionel Messi", clues: ["أسطورة أرجنتينية حملت كأس العالم، لكن الإجابة ليست مارادونا", "لعب أغلب مسيرته مع برشلونة قبل انتقاله إلى باريس ثم إنتر ميامي", "اشتهر بالقدم اليسرى والرقم 10، ومن أقرب المشتتين له جناحان أيمنان أسطوريان"], options: ["Lionel Messi", "Luis Figo", "Mohamed Salah", "Arjen Robben"] },
  { playerName: "Cristiano Ronaldo", clues: ["نجم برتغالي فاز بدوري الأبطال مع أكثر من فريق", "لعب لريال مدريد ومانشستر يونايتد، لكن ليس هو الجناح الفرنسي في الاختيارات", "اشتهر بالارتقاء والإنهاء والرقم 7"], options: ["Cristiano Ronaldo", "Kylian Mbappé", "Thierry Henry", "Zlatan Ibrahimović"] },
  { playerName: "Mohamed Salah", clues: ["جناح مصري وصل إلى قمة أوروبا مع فريق إنجليزي", "لعب أيضاً في إيطاليا قبل أن يصبح أحد رموز ليفربول", "اشتهر بالسرعة والقدم اليسرى والاحتفال الشهير"], options: ["Mohamed Salah", "Riyad Mahrez", "Sadio Mané", "Bernardo Silva"] },
  { playerName: "Zinedine Zidane", clues: ["صانع ألعاب فرنسي فاز بكأس العالم 1998، لكن السؤال ليس عن هنري أو بلاتيني", "ارتدى قميص يوفنتوس وريال مدريد", "اشتهر باللمسة الهادئة والكرة الذهبية والرقم 5 في نهائي شهير"], options: ["Zinedine Zidane", "Andrea Pirlo", "Kaká", "Ronaldinho"] },
  { playerName: "Erling Haaland", clues: ["مهاجم نرويجي من جيل جديد، وليس مهاجم إنجلترا أو بولندا في الاختيارات", "تألق تهديفياً مع مانشستر سيتي بعد محطة ألمانية", "اشتهر بالقوة والسرعة داخل منطقة الجزاء"], options: ["Erling Haaland", "Harry Kane", "Victor Osimhen", "Robert Lewandowski"] },
  { playerName: "Lev Yashin", clues: ["حارس وحيد فاز بالكرة الذهبية", "ارتبط اسمه بنادٍ موسكوفي وباللون الأسود", "لقبه الأشهر مرتبط بمخلوق زاحف، وليس بوفون أو تشيك"], options: ["Lev Yashin", "Gianluigi Buffon", "Petr Čech", "Iker Casillas"] },
  { playerName: "Franz Beckenbauer", clues: ["مدافع ألماني قاد بلاده لاعباً ومدرباً إلى كأس العالم", "ارتبط اسمه بدور الليبيرو وببايرن ميونخ", "لقبه لا يتعلق بالقيصر الروماني الحقيقي، بل بشخصية كروية ألمانية"], options: ["Franz Beckenbauer", "Paolo Maldini", "Sergio Ramos", "Fabio Cannavaro"] },
  { playerName: "Andrea Pirlo", clues: ["إيطالي اشتهر بالتمريرات الطويلة والكرات الثابتة", "لعب لميلان ويوفنتوس، ولم يكن جناحاً أو مهاجماً", "لقبه مرتبط بالهدوء واللحية أكثر من السرعة"], options: ["Andrea Pirlo", "Toni Kroos", "Xavi", "Luka Modrić"] },
  { playerName: "Ronaldinho", clues: ["برازيلي فاز بالكرة الذهبية وترك بصمة في برشلونة", "اسمه مرتبط بالابتسامة والمهارات والركلات الحرة", "ليس رونالدو المهاجم ولا الجناح البرتغالي"], options: ["Ronaldinho", "Kaká", "Neymar", "Rivaldo"] },
  { playerName: "Ronaldo Nazário", clues: ["مهاجم برازيلي فاز بكأس العالم والكرة الذهبية", "لعب لإنتر ميلان وريال مدريد وبرشلونة، وليس كريستيانو", "ارتبط اسمه بالسرعة والتسديد واللقب الذي يميزه عن رونالدو البرتغالي"], options: ["Ronaldo Nazário", "Romário", "Cristiano Ronaldo", "Samuel Eto'o"] },
  { playerName: "Cristiano Ronaldo", clues: ["بحسب سجل UEFA التاريخي، يتصدر قائمة المشاركة في دوري أبطال أوروبا", "الرقم القياسي المذكور في المصدر هو 187 مباراة", "مشتتاته في السؤال من نجوم يملكون سجلاً أوروبياً كبيراً أيضاً"], options: ["Cristiano Ronaldo", "Iker Casillas", "Lionel Messi", "Karim Benzema"] },
  { playerName: "Iker Casillas", clues: ["حارس إسباني يأتي ثانياً في سجل UEFA التاريخي للمباريات بدوري الأبطال", "ارتبط بريال مدريد ثم بورتو، وليس ببايرن ميونخ", "الرقم التاريخي في المصدر هو 181 مباراة"], options: ["Iker Casillas", "Manuel Neuer", "Gianluigi Buffon", "Cristiano Ronaldo"] },
  { playerName: "Lionel Messi", clues: ["في سجل UEFA التاريخي للمباريات، يتساوى مع حارس ألماني عند 163 مشاركة", "قضى أغلب مسيرته الأوروبية مع برشلونة ثم ظهر مع باريس", "المشتت الأصعب هنا هو Manuel Neuer وليس جناحاً أو مهاجماً"], options: ["Lionel Messi", "Manuel Neuer", "Xavi", "Luka Modrić"] },
];

const curatedNames = new Set(curatedQuestions.map((question) => question.playerName));

const distractorPool = (player: CataloguePlayer) => {
  const samePosition = playerCatalogue
    .filter((candidate) => candidate.name !== player.name && candidate.position === player.position)
    .sort((a, b) => Math.abs(a.rating - player.rating) - Math.abs(b.rating - player.rating) || a.name.localeCompare(b.name));
  return [...samePosition.filter((candidate) => candidate.status === player.status), ...samePosition.filter((candidate) => candidate.status !== player.status)];
};

const generatedQuestion = (player: CataloguePlayer, variant: number): AftakarQuestion => {
  const nearby = distractorPool(player);
  const offset = Math.min(variant, Math.max(0, nearby.length - 3));
  const options = [player, ...nearby.slice(offset, offset + 3)].sort((a, b) => a.name.localeCompare(b.name)).map((candidate) => candidate.name);
  const statusClue = player.status === "legend" ? "من أساطير اللعبة المعتزلين" : "من نجوم الكرة الحاليين";
  const clueSets: [string, string, string][] = [
    [`${statusClue}، ومركزه ${positionLabels[player.position]} دون ذكر الاسم مباشرة`, `تقييمه في الكتالوج ${player.rating}، والمشتتون من نفس المركز قريبون جداً في المستوى`, `وصفه الفني: ${player.note} — اختر اللاعب الذي تنطبق عليه المعلومة كاملة`],
    [`يلعب في مركز ${positionLabels[player.position]}، لكن كل الاختيارات تنتمي للمركز نفسه`, `تصنيفه ${player.rating} ويشارك صفته ${player.status === "legend" ? "التاريخية" : "الحالية"} مع أكثر من مشتت`, `المعلومة الأخيرة: ${player.note} — لا تعتمد على الاسم الأشهر فقط`],
    [`السؤال عن لاعب ${player.status === "legend" ? "ترك الملاعب وترك إرثاً كبيراً" : "ما زال اسمه حاضراً في كرة القدم"}`, `مركزه ${positionLabels[player.position]} وتقييمه ${player.rating}، والفارق بين الخيارات محسوب ليكون مضللاً`, `العلامة الفارقة في أسلوبه: ${player.note} — راجع كل التلميحات قبل الاختيار`],
  ];
  const trivia = triviaMetadata[player.name];
  const clues = trivia ? [
    `${trivia.nationality}، ويلعب في مركز ${positionLabels[player.position]} — لا تنخدع بتشابه المراكز`,
    `من أنديته: ${trivia.clubs}، ومن إنجازاته: ${trivia.achievement}`,
    `لقبه أو الاسم المرتبط به: «${trivia.alias}» — راجع المعلومة قبل اختيار المشتت`,
  ] as [string, string, string] : clueSets[variant];
  return { playerName: player.name, clues, options, category: trivia ? "trivia" : "catalogue" };
};

const curated = curatedQuestions.map((question) => ({ ...question, options: question.options ?? [], category: "trivia" as const }));
const generated = playerCatalogue.filter((player) => !curatedNames.has(player.name)).flatMap((player) => [0, 1, 2].map((variant) => generatedQuestion(player, variant)));
export const aftakarQuestionBank: AftakarQuestion[] = [...curated, ...generated];

const hashSeed = (value: number) => {
  let hash = Math.abs(Math.floor(value)) + 17;
  return () => { hash = (hash * 9301 + 49297) % 233280; return hash / 233280; };
};

export function buildAftakarSession(seed = 2026, count = 5): AftakarQuestion[] {
  const random = hashSeed(seed);
  const shuffle = (questions: AftakarQuestion[]) => [...questions].sort(() => random() - 0.5);
  const triviaQuestions = shuffle(aftakarQuestionBank.filter((question) => question.category === "trivia"));
  const catalogueQuestions = shuffle(aftakarQuestionBank.filter((question) => question.category === "catalogue"));
  const picked: AftakarQuestion[] = [];
  const seenPlayers = new Set<string>();
  const addQuestions = (questions: AftakarQuestion[], limit = count) => {
    for (const question of questions) {
      if (picked.length >= limit || picked.length >= count) return true;
      if (seenPlayers.has(question.playerName)) continue;
      picked.push(question);
      seenPlayers.add(question.playerName);
    }
    return picked.length >= limit;
  };
  addQuestions(triviaQuestions, Math.min(3, count));
  addQuestions(catalogueQuestions);
  addQuestions(triviaQuestions);
  return picked.slice(0, count);
}

export const AFTAKAR_BANK_SIZE = aftakarQuestionBank.length;
