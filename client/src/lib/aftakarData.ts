import { CataloguePlayer, playerCatalogue, positionLabels } from "./auctionData";

type AftakarCategory = "trivia" | "career" | "record" | "tactical" | "era" | "transfer" | "competition" | "award" | "match-event";
type CuratedQuestion = { playerName: string; clues: [string, string, string]; options?: string[] };
export type AftakarQuestion = { playerName: string; clues: [string, string, string]; options: string[]; category: AftakarCategory };
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
  "Luka Modrić": { nationality: "كرواتي", clubs: "دينامو زغرب وتوتنهام وريال مدريد", achievement: "الكرة الذهبية 2018", alias: "الساحر" },
  "Toni Kroos": { nationality: "ألماني", clubs: "بايرن ميونخ وريال مدريد", achievement: "ستة ألقاب دوري أبطال وكأس العالم 2014", alias: "المايسترو" },
  "Lev Yashin": { nationality: "سوفيتي", clubs: "دينامو موسكو", achievement: "الكرة الذهبية 1963", alias: "العنكبوت الأسود" },
  "Gianluigi Buffon": { nationality: "إيطالي", clubs: "بارما ويوفنتوس وباريس سان جيرمان", achievement: "كأس العالم 2006", alias: "جيجي" },
  "Iker Casillas": { nationality: "إسباني", clubs: "ريال مدريد وبورتو", achievement: "كأس العالم 2010 ولقبان أوروبيان", alias: "القديس" },
  "Manuel Neuer": { nationality: "ألماني", clubs: "شالكه وبايرن ميونخ", achievement: "كأس العالم 2014 والقفاز الذهبي", alias: "الحارس الليبيرو" },
  "Paolo Maldini": { nationality: "إيطالي", clubs: "ميلان فقط", achievement: "خمس بطولات دوري أبطال", alias: "القيصر" },
  "Franz Beckenbauer": { nationality: "ألماني", clubs: "بايرن ميونخ ونيويورك كوزموس وهامبورغ", achievement: "كأس العالم لاعباً ومدرباً", alias: "القيصر" },
  "Fabio Cannavaro": { nationality: "إيطالي", clubs: "بارما وإنتر وريال مدريد", achievement: "الكرة الذهبية 2006", alias: "القائد" },
  "Sergio Ramos": { nationality: "إسباني", clubs: "إشبيلية وريال مدريد وباريس سان جيرمان", achievement: "كأس العالم 2010 وأربع بطولات دوري أبطال", alias: "قائد الدفاع" },
  "Thierry Henry": { nationality: "فرنسي", clubs: "موناكو ويوفنتوس وآرسنال وبرشلونة", achievement: "كأس العالم 1998 ودوري أبطال 2009", alias: "الغزال" },
  "Neymar": { nationality: "برازيلي", clubs: "سانتوس وبرشلونة وباريس سان جيرمان", achievement: "دوري أبطال أوروبا 2015", alias: "جونيور" },
  "Robert Lewandowski": { nationality: "بولندي", clubs: "ليخ بوزنان وبوروسيا دورتموند وبايرن وبرشلونة", achievement: "السداسية مع بايرن ميونخ", alias: "الهداف" },
  "Karim Benzema": { nationality: "فرنسي", clubs: "ليون وريال مدريد والاتحاد", achievement: "الكرة الذهبية 2022", alias: "الحكومة" },
  "Didier Drogba": { nationality: "إيفواري", clubs: "مارسيليا وتشيلسي وغلطة سراي", achievement: "دوري أبطال أوروبا 2012", alias: "الفيل" },
  "Samuel Eto'o": { nationality: "كاميروني", clubs: "ريال مدريد ومايوركا وبرشلونة وإنتر", achievement: "ثلاثية برشلونة ثم ثلاثية إنتر", alias: "الأسد" },
  "David Beckham": { nationality: "إنجليزي", clubs: "مانشستر يونايتد وريال مدريد ولوس أنجلوس جالاكسي", achievement: "دوري أبطال أوروبا 1999", alias: "القدم الذهبية" },
  "Luis Figo": { nationality: "برتغالي", clubs: "سبورتينغ وبرشلونة وريال مدريد وإنتر", achievement: "الكرة الذهبية 2000", alias: "الجناح الساحر" },
};

const curatedQuestions: CuratedQuestion[] = [
  { playerName: "Lionel Messi", clues: ["حسم جائزة فردية كبرى بعد عام شهد تتويجاً دولياً، لا بعد موسم أوروبي فقط", "يبدأ الهجمة من الطرف ثم يدخل إلى العمق ليصنع أو ينهي", "القدم اليسرى وتغيير الاتجاه أهم من الالتحام في أسلوبه"], options: ["Lionel Messi", "Luis Figo", "Mohamed Salah", "Arjen Robben"] },
  { playerName: "Cristiano Ronaldo", clues: ["جمع بين لقب أوروبي مع أكثر من فريق وسجل تهديفي يصعب مجاراته", "تحول من جناح مباشر إلى مهاجم يحسم داخل الصندوق مع مرور السنوات", "الهواء والتمركز والضربة الأولى أقوى مفاتيح لعبه"], options: ["Cristiano Ronaldo", "Kylian Mbappé", "Thierry Henry", "Zlatan Ibrahimović"] },
  { playerName: "Mohamed Salah", clues: ["احتاج إلى أكثر من محطة أوروبية قبل أن يصبح اسماً ثابتاً في سباق الهدافين", "يبدأ غالباً من الطرف ثم يهاجم المساحة خلف الظهير بلمسته الأولى", "القدم اليسرى والاحتفاظ بالكرة أثناء السرعة يميزان قراراته"], options: ["Mohamed Salah", "Riyad Mahrez", "Sadio Mané", "Bernardo Silva"] },
  { playerName: "Zinedine Zidane", clues: ["ارتبط بأحد أكثر النهائيات العالمية شهرة قبل أن يحقق إنجازاً أوروبياً كمدرب", "لا يعتمد على السرعة؛ قوته في استقبال الكرة تحت الضغط", "توقيته في المباريات الكبيرة أهم من كثرة لمساته"], options: ["Zinedine Zidane", "Andrea Pirlo", "Kaká", "Ronaldinho"] },
  { playerName: "Erling Haaland", clues: ["مهاجم من جيل جديد حوّل المساحات القصيرة إلى أرقام تهديفية ضخمة", "يحتاج إلى لمسات قليلة كي يغيّر نتيجة المباراة", "الانطلاق خلف الخط والدخول في المسار الأول للعرضية مفتاحه"], options: ["Erling Haaland", "Harry Kane", "Victor Osimhen", "Robert Lewandowski"] },
  { playerName: "Lev Yashin", clues: ["في زمن كانت فيه حدود الحارس أقل اتساعاً، كان يتحرك كأنه لاعب إضافي", "اختياراته تحت الضغط صنعت صورة مختلفة للحارس التقليدي", "اللون الأسود والقرارات الجريئة جزء من صورته التاريخية"], options: ["Lev Yashin", "Gianluigi Buffon", "Petr Čech", "Iker Casillas"] },
  { playerName: "Franz Beckenbauer", clues: ["حوّل قلب الدفاع إلى مركز يبدأ منه بناء اللعب لا مجرد إبعاد الكرة", "قاد فريقه من الخلف ثم عاد إلى الخط نفسه في حقبة مختلفة", "قراءته للمساحة كانت أهم من التدخلات القوية"], options: ["Franz Beckenbauer", "Paolo Maldini", "Sergio Ramos", "Fabio Cannavaro"] },
  { playerName: "Andrea Pirlo", clues: ["كان يرى التمريرة قبل أن تتحرك بقية الأقدام", "يظهر تأثيره أكثر عندما تكون المباراة بطيئة والمساحات ضيقة", "الركلات الثابتة والكرات القطرية جزء من بصمته لا سرعته"], options: ["Andrea Pirlo", "Toni Kroos", "Xavi", "Luka Modrić"] },
  { playerName: "Ronaldinho", clues: ["كان قادراً على تحويل لقطة غير متوقعة إلى فرصة من دون تغيير سرعته", "ابتسامته لا تعني أن قراره الفني عشوائي", "الركلة الحرة والمراوغة القصيرة أبرز من اللعب المباشر"], options: ["Ronaldinho", "Kaká", "Neymar", "Rivaldo"] },
  { playerName: "Ronaldo Nazário", clues: ["جمع بين الانفجار في أول خطوة واللمسة الهادئة بعد تجاوز الحارس", "أثر على طريقة تقييم المهاجم الذي يصنع الفرصة لنفسه", "اللقب المرتبط به يميزه عن لاعب آخر يحمل الاسم نفسه"], options: ["Ronaldo Nazário", "Romário", "Cristiano Ronaldo", "Samuel Eto'o"] },
  { playerName: "Cristiano Ronaldo", clues: ["استمر تأثيره بعد تغير مركزه، مدربه، وطريقة بناء الهجمة حوله", "يظهر في مباريات الحسم كلاعب يرفع حجم المخاطرة بدلاً من انتظار المساحة", "قارن بين من يصنع الفارق بالتحرك والارتقاء ومن يعتمد على اللمسة الأخيرة فقط"], options: ["Cristiano Ronaldo", "Iker Casillas", "Lionel Messi", "Karim Benzema"] },
  { playerName: "Iker Casillas", clues: ["كان يتعامل مع اللحظة الأخيرة بسرعة قبل أن يكتمل شكل الهجمة", "في النهائيات كان هدوء القرار أهم من كثرة الخروج من المرمى", "القرار الصحيح هنا يخص حارساً قائداً لا مدافعاً متقدماً"], options: ["Iker Casillas", "Manuel Neuer", "Gianluigi Buffon", "Cristiano Ronaldo"] },
  { playerName: "Lionel Messi", clues: ["يتحول من صانع أول للهجمة إلى منهيها من دون أن يعلن عن هذا التحول", "أثره يقاس بصناعة الفرصة بقدر قياسه باللمسة الأخيرة", "ابحث عن اللاعب الذي يغير شكل الدفاع بمجرد استلامه بين الخطوط"], options: ["Lionel Messi", "Manuel Neuer", "Xavi", "Luka Modrić"] },
];

const factualQuestions: AftakarQuestion[] = [
  { playerName: "Cristiano Ronaldo", clues: ["من اللاعب الذي سجل 17 هدفاً في دوري أبطال أوروبا موسم 2013/14؟", "كان يلعب وقتها مع ريال مدريد، وحقق لقب هداف البطولة في مواسم أخرى أيضاً", "الاختيارات من أجنحة هجومية حققوا أرقاماً كبيرة في أوروبا"], options: ["Cristiano Ronaldo", "Thierry Henry", "Kylian Mbappé", "Neymar"], category: "record" },
  { playerName: "Erling Haaland", clues: ["من سجل 36 هدفاً في الدوري الإنجليزي الممتاز موسم 2022/23؟", "كان هذا أول موسم كامل له في الدوري مع مانشستر سيتي", "قارن بينه وبين ليفاندوفسكي وكين وأجويرو في اختيارات السؤال"], options: ["Erling Haaland", "Robert Lewandowski", "Harry Kane", "Sergio Agüero"], category: "record" },
  { playerName: "Mohamed Salah", clues: ["من فاز بالحذاء الذهبي للدوري الإنجليزي موسم 2017/18 بعد تسجيل 32 هدفاً؟", "كان أول موسم كامل له مع ليفربول في الدوري الإنجليزي", "الاختيارات أجنحة ومهاجمون من نفس جيل الدوري"], options: ["Mohamed Salah", "Lionel Messi", "Luis Figo", "Arjen Robben"], category: "award" },
  { playerName: "Thierry Henry", clues: ["من سجل 30 هدفاً في الدوري الإنجليزي موسم 2003/04؟", "كان هداف الدوري وقتها مع آرسنال، في موسم لم يخسر فيه الفريق مباراة", "الاختيارات تضم مهاجمين فازوا بالحذاء الذهبي أيضاً"], options: ["Thierry Henry", "Cristiano Ronaldo", "Neymar", "Kylian Mbappé"], category: "competition" },
  { playerName: "Luis Suárez", clues: ["من سجل 40 هدفاً في الدوري الإسباني موسم 2015/16؟", "كان يلعب مع برشلونة وتفوق في سباق الهدافين على زميله ميسي", "اختياراتك من مهاجمين كبار في الدوري الإسباني وأوروبا"], options: ["Luis Suárez", "Robert Lewandowski", "Ronaldo Nazário", "Karim Benzema"], category: "record" },
  { playerName: "Robert Lewandowski", clues: ["من سجل 41 هدفاً في الدوري الألماني موسم 2020/21؟", "كسر وقتها الرقم السابق المسجل باسم غيرد مولر", "الاختيارات مهاجمون معروفون بأرقامهم التهديفية"], options: ["Robert Lewandowski", "Erling Haaland", "Harry Kane", "Sergio Agüero"], category: "record" },
  { playerName: "Zinedine Zidane", clues: ["من فاز بالكرة الذهبية عام 1998 وهو يلعب مع يوفنتوس؟", "جاءت الجائزة في عام فاز فيه أيضاً بكأس العالم مع منتخب بلاده", "الاختيارات صانعو لعب ومهاجمون فازوا بالجائزة في فترات قريبة"], options: ["Zinedine Zidane", "Kaká", "Ronaldinho", "Kevin De Bruyne"], category: "award" },
  { playerName: "Kaká", clues: ["من فاز بالكرة الذهبية عام 2007 وهو لاعب في ميلان؟", "سبق الجائزة تتويج فريقه بدوري أبطال أوروبا في العام نفسه", "الاختيارات تضم صانعي لعب فازوا أو نافسوا على الجائزة في فترات قريبة"], options: ["Kaká", "Zinedine Zidane", "Ronaldinho", "Kevin De Bruyne"], category: "award" },
  { playerName: "Luka Modrić", clues: ["من فاز بالكرة الذهبية عام 2018 وهو يلعب مع ريال مدريد؟", "وصل في العام نفسه إلى نهائي كأس العالم مع منتخب بلاده", "الاختيارات لاعبو وسط من جيل الجوائز نفسه"], options: ["Luka Modrić", "Toni Kroos", "Xavi", "Andrés Iniesta"], category: "award" },
  { playerName: "Lionel Messi", clues: ["من فاز بالكرة الذهبية عام 2019 وهو لاعب في برشلونة؟", "كان ينافسه في القائمة لاعبون من ليفربول ويوفنتوس", "السؤال عن الجائزة في ذلك العام وليس عن عدد مرات الفوز الكلي"], options: ["Lionel Messi", "Mohamed Salah", "Luis Figo", "Arjen Robben"], category: "award" },
  { playerName: "Karim Benzema", clues: ["من فاز بالكرة الذهبية عام 2022 وهو لاعب في ريال مدريد؟", "جاءت الجائزة بعد موسم تهديفي حاسم في دوري أبطال أوروبا", "الاختيارات مهاجمون من أندية أوروبية كبيرة"], options: ["Karim Benzema", "Robert Lewandowski", "Erling Haaland", "Harry Kane"], category: "award" },
  { playerName: "Cristiano Ronaldo", clues: ["من كان هداف دوري أبطال أوروبا موسم 2017/18 برصيد 15 هدفاً؟", "سجل الأهداف مع ريال مدريد قبل انتقاله إلى يوفنتوس", "اختيارات السؤال من أبرز هدافي البطولة في تلك الحقبة"], options: ["Cristiano Ronaldo", "Thierry Henry", "Kylian Mbappé", "Neymar"], category: "competition" },
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
  const options = [player, ...nearby.slice(offset, offset + 3)].map((candidate) => candidate.name);
  const trivia = triviaMetadata[player.name];
  if (!trivia) throw new Error(`Missing verified trivia metadata for ${player.name}`);
  const factualClues: [string, string, string][] = [
    [`ارتبطت مسيرته بالأندية: ${trivia.clubs}`, `ومن أبرز إنجازاته: ${trivia.achievement}`, `يظهر في مركز ${positionLabels[player.position]}`],
    [`من محطات هذا اللاعب: ${trivia.clubs}`, `حقق أو شارك في إنجاز موثق هو ${trivia.achievement}`, `يعرفه بعض المتابعين بلقب «${trivia.alias}»`],
    [`توزعت مسيرته بين الأندية التالية: ${trivia.clubs}`, `ارتبط اسمه ببطولة أو جائزة مهمة: ${trivia.achievement}`, `مركزه المسجل في البيانات هو ${positionLabels[player.position]}`],
    [`لعب مع أكثر من نادٍ بارز، منها: ${trivia.clubs}`, `من العلامات الواضحة في مسيرته: ${trivia.achievement}`, `لقبه المتداول هو «${trivia.alias}»`],
    [`إذا تتبعت مسيرته ستجد الأندية: ${trivia.clubs}`, `من إنجازاته التي تساعد في التعرف عليه: ${trivia.achievement}`, `يلعب في مركز ${positionLabels[player.position]}`],
    [`الأندية المرتبطة بهذا اللاعب تشمل: ${trivia.clubs}`, `فاز أو ساهم في إنجاز هو ${trivia.achievement}`, `يحمل لقب «${trivia.alias}» في بعض التغطيات`],
    [`بدأ أو واصل مسيرته مع أندية مثل: ${trivia.clubs}`, `ارتبط اسمه تاريخياً بـ${trivia.achievement}`, `المركز الأقرب له في الكتالوج: ${positionLabels[player.position]}`],
    [`من سجل مسيرته: ${trivia.clubs}`, `تتضمن إنجازاته ${trivia.achievement}`, `هل تتذكر اللاعب المعروف بلقب «${trivia.alias}»؟`],
    [`هذه الأندية جزء من مسيرته: ${trivia.clubs}`, `وهذا إنجاز منسوب إليه: ${trivia.achievement}`, `يُصنّف في مركز ${positionLabels[player.position]}`],
    [`للتعرف عليه راجع محطات الأندية: ${trivia.clubs}`, `ثم طابقها مع الإنجاز: ${trivia.achievement}`, `آخر تلميح: مركزه ${positionLabels[player.position]} ولقبه «${trivia.alias}»`],
  ];
  return { playerName: player.name, clues: factualClues[variant % factualClues.length], options, category: "trivia" };
};

const curated: AftakarQuestion[] = [];
const generated = playerCatalogue.filter((player) => Boolean(triviaMetadata[player.name])).flatMap((player) => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((variant) => generatedQuestion(player, variant)));
export const aftakarQuestionBank: AftakarQuestion[] = [...curated, ...factualQuestions, ...generated];

const hashSeed = (value: number) => {
  let hash = Math.abs(Math.floor(value)) + 17;
  return () => { hash = (hash * 9301 + 49297) % 233280; return hash / 233280; };
};

let sessionCounter = 0;
export const freshAftakarSeed = () => Date.now() + (++sessionCounter * 997);

export function buildAftakarSession(seed = 2026, count = 5): AftakarQuestion[] {
  const random = hashSeed(seed);
  const shuffle = <T,>(items: T[]) => {
    const result = [...items];
    for (let index = result.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(random() * (index + 1));
      [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
    }
    return result;
  };
  const triviaQuestions = shuffle(aftakarQuestionBank.filter((question) => question.category === "trivia"));
  const factualQuestionsForSession = shuffle(aftakarQuestionBank.filter((question) => ["record", "award", "competition"].includes(question.category)));
  const otherQuestions = shuffle(aftakarQuestionBank.filter((question) => question.category !== "trivia"));
  const picked: AftakarQuestion[] = [];
  const seenPlayers = new Set<string>();
  const addQuestions = (questions: AftakarQuestion[], limit = count) => {
    for (const question of questions) {
      if (picked.length >= limit || picked.length >= count) return true;
      if (seenPlayers.has(question.playerName)) continue;
      picked.push({ ...question, options: shuffle(question.options) });
      seenPlayers.add(question.playerName);
    }
    return picked.length >= limit;
  };
  if (count >= 4) addQuestions(factualQuestionsForSession, 1);
  addQuestions(triviaQuestions, count >= 4 ? Math.min(4, count) : Math.min(3, count));
  addQuestions(otherQuestions);
  addQuestions(triviaQuestions);
  return picked.slice(0, count);
}

export const AFTAKAR_BANK_SIZE = aftakarQuestionBank.length;
