export type RoadDifficulty = "easy" | "medium" | "hard";

import { playerLibrary } from "./playerLibrary";

export type RoadTimelineNode = { year: string; club: string; country: string; rating: number; value?: string };
export type RoadHint = { label: string; text: string };
export type RoadPlayer = {
  id: string;
  name: string;
  arabicName: string;
  alternativeNames: string[];
  nationality: string;
  position: string;
  preferredFoot: string;
  birthYear: number;
  height: string;
  difficulty: RoadDifficulty;
  image?: string;
  timeline: RoadTimelineNode[];
  hints: RoadHint[];
};

export const ROAD_SCORE_STEPS = [100, 85, 70, 50, 30, 15] as const;
export const ROAD_ROUND_SECONDS = 90;

const ROAD_PLAYERS: RoadPlayer[] = [
  { id: "salah", name: "Mohamed Salah", arabicName: "محمد صلاح", alternativeNames: ["mohamed salah", "mohammed salah", "محمد صلاح", "salah"], nationality: "مصر", position: "جناح أيمن", preferredFoot: "اليسرى", birthYear: 1992, height: "175 سم", difficulty: "easy", image: "/manus-storage/player-mohamed-salah.jpg", timeline: [{ year: "2010", club: "المقاولون العرب", country: "مصر", rating: 67 }, { year: "2012", club: "بازل", country: "سويسرا", rating: 72 }, { year: "2014", club: "تشيلسي", country: "إنجلترا", rating: 70 }, { year: "2015", club: "روما", country: "إيطاليا", rating: 79 }, { year: "2017", club: "ليفربول", country: "إنجلترا", rating: 86 }, { year: "2024", club: "ليفربول", country: "إنجلترا", rating: 90 }], hints: [{ label: "الموسم الأول", text: "بدأ مسيرته الاحترافية في نادٍ مصري، وكان جناحاً سريعاً بقدمه اليسرى." }, { label: "الخطوة الأوروبية", text: "أول محطة أوروبية كبيرة له كانت في دوري لا يُلعب باللغة الإنجليزية." }, { label: "قفزة مهمة", text: "ارتفع مستواه بشكل واضح بعد العودة إلى الدوري الإنجليزي عبر بوابة إيطالية." }, { label: "سجل مميز", text: "سجل أكثر من 30 هدفاً في أول موسم كامل له مع نادٍ إنجليزي كبير." }, { label: "إنجاز", text: "فاز بدوري أبطال أوروبا والدوري الإنجليزي خلال مسيرته." }, { label: "الهوية", text: "هو أحد أشهر لاعبي منتخب مصر في القرن الحالي." }] },
  { id: "messi", name: "Lionel Messi", arabicName: "ليونيل ميسي", alternativeNames: ["lionel messi", "leo messi", "ميسي", "ليونيل ميسي"], nationality: "الأرجنتين", position: "مهاجم / جناح", preferredFoot: "اليسرى", birthYear: 1987, height: "170 سم", difficulty: "easy", image: "/manus-storage/player-lionel-messi.jpg", timeline: [{ year: "2004", club: "برشلونة", country: "إسبانيا", rating: 78 }, { year: "2009", club: "برشلونة", country: "إسبانيا", rating: 94 }, { year: "2015", club: "برشلونة", country: "إسبانيا", rating: 96 }, { year: "2021", club: "باريس سان جيرمان", country: "فرنسا", rating: 92 }, { year: "2023", club: "إنتر ميامي", country: "الولايات المتحدة", rating: 90 }], hints: [{ label: "البداية", text: "انتقل صغيراً إلى أكاديمية أوروبية شهيرة خارج بلده الأصلي." }, { label: "القدم", text: "لاعب أعسر اشتهر بالمراوغة من الجهة اليمنى إلى العمق." }, { label: "الأرقام", text: "حمل الرقم 10 وحقق أرقاماً قياسية في صناعة وتسجيل الأهداف." }, { label: "الجوائز", text: "فاز بالكرة الذهبية مرات عديدة أكثر من أي لاعب آخر." }, { label: "المنتخب", text: "قاد منتخب بلاده للفوز بكأس العالم." }, { label: "المحطة الأخيرة", text: "يلعب حالياً في الدوري الأمريكي." }] },
  { id: "ronaldo", name: "Cristiano Ronaldo", arabicName: "كريستيانو رونالدو", alternativeNames: ["cristiano ronaldo", "cr7", "رونالدو", "كريستيانو رونالدو"], nationality: "البرتغال", position: "جناح / مهاجم", preferredFoot: "اليمنى", birthYear: 1985, height: "187 سم", difficulty: "easy", timeline: [{ year: "2002", club: "سبورتينغ لشبونة", country: "البرتغال", rating: 72 }, { year: "2003", club: "مانشستر يونايتد", country: "إنجلترا", rating: 81 }, { year: "2009", club: "ريال مدريد", country: "إسبانيا", rating: 94 }, { year: "2018", club: "يوفنتوس", country: "إيطاليا", rating: 92 }, { year: "2023", club: "النصر", country: "السعودية", rating: 88 }], hints: [{ label: "الانطلاقة", text: "بدأ في جزيرة أوروبية ثم لفت نظر نادٍ إنجليزي كبير." }, { label: "الأسلوب", text: "تطور من جناح مهاري إلى مهاجم يعتمد على التحرك والإنهاء." }, { label: "الرقم", text: "ارتبط اسمه بالرقم 7 طوال معظم مسيرته." }, { label: "الإنجاز الأوروبي", text: "حقق دوري أبطال أوروبا أكثر من مرة مع ناديين مختلفين." }, { label: "المنتخب", text: "هو الهداف التاريخي لمنتخب بلاده." }, { label: "المحطة الحالية", text: "يلعب في الدوري السعودي." }] },
  { id: "modric", name: "Luka Modric", arabicName: "لوكا مودريتش", alternativeNames: ["luka modric", "مودريتش", "لوكا مودريتش"], nationality: "كرواتيا", position: "وسط", preferredFoot: "اليمنى", birthYear: 1985, height: "172 سم", difficulty: "medium", timeline: [{ year: "2003", club: "دينامو زغرب", country: "كرواتيا", rating: 70 }, { year: "2008", club: "توتنهام", country: "إنجلترا", rating: 81 }, { year: "2012", club: "ريال مدريد", country: "إسبانيا", rating: 88 }, { year: "2018", club: "ريال مدريد", country: "إسبانيا", rating: 93 }, { year: "2024", club: "ريال مدريد", country: "إسبانيا", rating: 86 }], hints: [{ label: "الملعب الأول", text: "تطور في نادٍ من عاصمة بلاده قبل الانتقال إلى إنجلترا." }, { label: "المركز", text: "لاعب وسط يتحكم في إيقاع المباراة بتمريراته القصيرة والطويلة." }, { label: "الخطوة الكبيرة", text: "انتقل إلى العاصمة الإسبانية بعد سنوات في لندن." }, { label: "الجائزة", text: "فاز بالكرة الذهبية بعد قيادة منتخب بلاده لنهائي كأس العالم." }, { label: "الإنجاز", text: "حقق دوري أبطال أوروبا مرات عديدة." }, { label: "الصفة", text: "يُعرف بقدرته على اللعب بمستوى عالٍ رغم تقدمه في العمر." }] },
  { id: "benzema", name: "Karim Benzema", arabicName: "كريم بنزيما", alternativeNames: ["karim benzema", "benzema", "بنزيما", "كريم بنزيما"], nationality: "فرنسا", position: "مهاجم", preferredFoot: "اليمنى", birthYear: 1987, height: "185 سم", difficulty: "medium", timeline: [{ year: "2005", club: "ليون", country: "فرنسا", rating: 75 }, { year: "2009", club: "ريال مدريد", country: "إسبانيا", rating: 84 }, { year: "2017", club: "ريال مدريد", country: "إسبانيا", rating: 91 }, { year: "2022", club: "ريال مدريد", country: "إسبانيا", rating: 95 }, { year: "2023", club: "الاتحاد", country: "السعودية", rating: 88 }], hints: [{ label: "التكوين", text: "بدأ مع نادٍ فرنسي عريق اشتهر بتخريج المهاجمين." }, { label: "الدور", text: "مهاجم يجمع بين التسجيل واللعب كمحطة لزملائه." }, { label: "الاستمرارية", text: "قضى أكثر من عقد في نفس النادي الإسباني الكبير." }, { label: "أفضل موسم", text: "وصل لأعلى مستوياته في موسم قاد فيه فريقه للفوز بدوري الأبطال." }, { label: "الجائزة", text: "فاز بالكرة الذهبية في بداية العقد الحالي." }, { label: "المحطة الحالية", text: "انتقل إلى نادٍ سعودي بعد مغادرة أوروبا." }] },
  { id: "de-bruyne", name: "Kevin De Bruyne", arabicName: "كيفن دي بروين", alternativeNames: ["kevin de bruyne", "de bruyne", "دي بروين", "كيفن دي بروين"], nationality: "بلجيكا", position: "وسط هجومي", preferredFoot: "اليمنى", birthYear: 1991, height: "181 سم", difficulty: "medium", timeline: [{ year: "2010", club: "جينك", country: "بلجيكا", rating: 69 }, { year: "2014", club: "فولفسبورغ", country: "ألمانيا", rating: 82 }, { year: "2015", club: "مانشستر سيتي", country: "إنجلترا", rating: 89 }, { year: "2023", club: "مانشستر سيتي", country: "إنجلترا", rating: 94 }], hints: [{ label: "البداية", text: "بدأ في بلده قبل تجربة قصيرة مع نادٍ إنجليزي لم تكن الأفضل." }, { label: "العودة", text: "استعاد مستواه في الدوري الألماني بفضل التمرير والتسديد." }, { label: "التمرير", text: "اشتهر بالتمريرات البينية والعرضيات القوية من نصف المساحة." }, { label: "الإنجاز", text: "كان لاعباً أساسياً في فريق حقق الثلاثية التاريخية." }, { label: "المنتخب", text: "يُعد من أبرز لاعبي الجيل الذهبي لمنتخب بلجيكا." }, { label: "المركز", text: "يلعب غالباً خلف المهاجم أو في وسط متقدم." }] },
  { id: "lewandowski", name: "Robert Lewandowski", arabicName: "روبرت ليفاندوفسكي", alternativeNames: ["robert lewandowski", "lewandowski", "ليفاندوفسكي", "روبرت ليفاندوفسكي"], nationality: "بولندا", position: "مهاجم", preferredFoot: "اليمنى", birthYear: 1988, height: "185 سم", difficulty: "medium", timeline: [{ year: "2008", club: "ليخ بوزنان", country: "بولندا", rating: 70 }, { year: "2010", club: "بوروسيا دورتموند", country: "ألمانيا", rating: 82 }, { year: "2014", club: "بايرن ميونخ", country: "ألمانيا", rating: 92 }, { year: "2022", club: "برشلونة", country: "إسبانيا", rating: 90 }], hints: [{ label: "البداية", text: "لفت الأنظار في الدوري البولندي قبل خوض تجربة ألمانية." }, { label: "الحس التهديفي", text: "مهاجم صندوق ممتاز يجيد إنهاء الفرص بكلتا القدمين والرأس." }, { label: "الرقم", text: "سجل خمسة أهداف في مباراة واحدة خلال دقائق قليلة." }, { label: "الإنجاز", text: "فاز بدوري الأبطال والكرة الذهبية الخاصة بمهاجمي العام." }, { label: "التحول", text: "انتقل من ألمانيا إلى إسبانيا في صفقة كبيرة." }, { label: "المنتخب", text: "هو الهداف التاريخي لمنتخب بولندا." }] },
  { id: "neymar", name: "Neymar Jr", arabicName: "نيمار", alternativeNames: ["neymar", "neymar jr", "نيمار", "نيمار جونيور"], nationality: "البرازيل", position: "جناح أيسر", preferredFoot: "اليمنى", birthYear: 1992, height: "175 سم", difficulty: "easy", timeline: [{ year: "2009", club: "سانتوس", country: "البرازيل", rating: 75 }, { year: "2013", club: "برشلونة", country: "إسبانيا", rating: 88 }, { year: "2017", club: "باريس سان جيرمان", country: "فرنسا", rating: 93 }, { year: "2023", club: "الهلال", country: "السعودية", rating: 86 }], hints: [{ label: "الطفولة", text: "صعد من نادٍ برازيلي عُرف بإخراج المواهب الهجومية." }, { label: "المهارة", text: "جناح يعتمد على المراوغة واللعب الاستعراضي في المساحات الضيقة." }, { label: "الثلاثي", text: "كون ثلاثياً هجومياً شهيراً في إسبانيا مع نجمين عالميين." }, { label: "الصفقة", text: "أصبح من أغلى اللاعبين في تاريخ كرة القدم عند انتقاله إلى فرنسا." }, { label: "المنتخب", text: "ارتدى القميص الأصفر وحقق ذهبية أولمبية مع بلاده." }, { label: "المحطة", text: "انتقل لاحقاً إلى الدوري السعودي." }] },
  { id: "haaland", name: "Erling Haaland", arabicName: "إيرلينغ هالاند", alternativeNames: ["erling haaland", "haaland", "هالاند", "إيرلينغ هالاند"], nationality: "النرويج", position: "مهاجم", preferredFoot: "اليسرى", birthYear: 2000, height: "195 سم", difficulty: "easy", timeline: [{ year: "2017", club: "مولده", country: "النرويج", rating: 64 }, { year: "2019", club: "سالزبورغ", country: "النمسا", rating: 78 }, { year: "2020", club: "بوروسيا دورتموند", country: "ألمانيا", rating: 88 }, { year: "2022", club: "مانشستر سيتي", country: "إنجلترا", rating: 94 }], hints: [{ label: "الطول", text: "مهاجم طويل جداً يجمع بين القوة والسرعة غير المعتادة." }, { label: "الانفجار", text: "لفت الأنظار في بطولة أوروبية للشباب قبل أن يلمع في دوري الأبطال." }, { label: "الرقم", text: "حطم أرقاماً تهديفية في الدوري الإنجليزي خلال أول موسم كامل." }, { label: "الإنجاز", text: "كان رأس الحربة في فريق حقق الثلاثية التاريخية." }, { label: "العائلة", text: "والده كان لاعباً محترفاً وسبق أن لعب في إنجلترا." }, { label: "المنتخب", text: "يمثل منتخب النرويج." }] },
  { id: "mbappe", name: "Kylian Mbappe", arabicName: "كيليان مبابي", alternativeNames: ["kylian mbappe", "mbappe", "مبابي", "كيليان مبابي"], nationality: "فرنسا", position: "جناح / مهاجم", preferredFoot: "اليمنى", birthYear: 1998, height: "178 سم", difficulty: "easy", timeline: [{ year: "2015", club: "موناكو", country: "فرنسا", rating: 70 }, { year: "2017", club: "باريس سان جيرمان", country: "فرنسا", rating: 87 }, { year: "2022", club: "باريس سان جيرمان", country: "فرنسا", rating: 94 }, { year: "2024", club: "ريال مدريد", country: "إسبانيا", rating: 93 }], hints: [{ label: "السرعة", text: "اشتهر بانطلاقاته خلف خط الدفاع منذ أن كان مراهقاً." }, { label: "البداية", text: "صعد من أكاديمية نادي يقع في جنوب فرنسا." }, { label: "كأس العالم", text: "سجل في نهائي كأس العالم وهو في سن صغيرة جداً." }, { label: "المحطة", text: "قضى عدة مواسم في العاصمة الفرنسية قبل انتقاله الكبير." }, { label: "القدم", text: "يلعب غالباً من الجهة اليسرى رغم استخدامه القدم اليمنى." }, { label: "الخطوة الجديدة", text: "انتقل إلى نادٍ إسباني صاحب الرقم القياسي في دوري الأبطال." }] },
  { id: "ibrahimovic", name: "Zlatan Ibrahimovic", arabicName: "زلاتان إبراهيموفيتش", alternativeNames: ["zlatan ibrahimovic", "ibrahimovic", "زلاتان", "إبراهيموفيتش"], nationality: "السويد", position: "مهاجم", preferredFoot: "اليمنى", birthYear: 1981, height: "195 سم", difficulty: "hard", timeline: [{ year: "1999", club: "مالمو", country: "السويد", rating: 68 }, { year: "2001", club: "أياكس", country: "هولندا", rating: 77 }, { year: "2004", club: "يوفنتوس", country: "إيطاليا", rating: 84 }, { year: "2009", club: "برشلونة", country: "إسبانيا", rating: 88 }, { year: "2012", club: "باريس سان جيرمان", country: "فرنسا", rating: 91 }, { year: "2018", club: "لوس أنجلوس جالاكسي", country: "الولايات المتحدة", rating: 84 }], hints: [{ label: "المقاس", text: "مهاجم طويل جداً اشتهر بالأهداف الأكروباتية والثقة العالية." }, { label: "الجذور", text: "بدأ في مدينة سويدية قبل أن يتعلم كرة القدم الهجومية في هولندا." }, { label: "التنقل", text: "لعب في أربع من أقوى دوريات أوروبا قبل تجربة أمريكية." }, { label: "التحدي", text: "ترك بصمته في أندية إيطاليا وإسبانيا وفرنسا." }, { label: "الأسلوب", text: "جمع بين القوة والمهارة والقدرة على التسجيل من مسافات بعيدة." }, { label: "الهوية", text: "هو الهداف التاريخي لمنتخب السويد." }] },
  { id: "son", name: "Son Heung-min", arabicName: "سون هيونغ مين", alternativeNames: ["son heung min", "son", "سون", "سون هيونغ مين"], nationality: "كوريا الجنوبية", position: "جناح أيسر", preferredFoot: "اليمنى", birthYear: 1992, height: "183 سم", difficulty: "hard", timeline: [{ year: "2010", club: "هامبورغ", country: "ألمانيا", rating: 67 }, { year: "2013", club: "باير ليفركوزن", country: "ألمانيا", rating: 76 }, { year: "2015", club: "توتنهام", country: "إنجلترا", rating: 86 }, { year: "2021", club: "توتنهام", country: "إنجلترا", rating: 91 }], hints: [{ label: "القارة", text: "لاعب آسيوي بدأ مسيرته الأوروبية في ألمانيا." }, { label: "القدم", text: "يجيد التسديد بكلتا القدمين ويعتمد على الركض خلف المدافعين." }, { label: "الثنائي", text: "كوّن شراكة هجومية تاريخية مع مهاجم إنجليزي في لندن." }, { label: "الإنجاز", text: "فاز بالحذاء الذهبي في الدوري الإنجليزي من دون ركلات جزاء." }, { label: "المنتخب", text: "قاد منتخب بلاده في كأس العالم وارتدى شارة القيادة." }, { label: "الهوية", text: "هو أحد أشهر لاعبي كرة القدم في شرق آسيا." }] }
];

const curatedRoadNames = new Set(ROAD_PLAYERS.map((player) => player.name));
const catalogueRoadPlayers: RoadPlayer[] = playerLibrary.filter((player) => !curatedRoadNames.has(player.name)).map((player) => ({
  id: `catalogue-${player.id}`,
  name: player.name,
  arabicName: player.arabicName,
  alternativeNames: player.aliases,
  nationality: player.nationality,
  position: player.position,
  preferredFoot: "غير محدد",
  birthYear: 0,
  height: "غير متاح",
  difficulty: player.rating >= 90 ? "hard" : player.rating >= 85 ? "medium" : "easy",
  image: player.image,
  timeline: [
    { year: "البداية", club: "محطة البداية", country: player.nationality, rating: Math.max(60, player.rating - 12) },
    { year: "المحطة الثانية", club: "مسيرة أوروبية أو محلية", country: player.nationality, rating: Math.max(65, player.rating - 7) },
    { year: "القمة", club: "فريق بارز في المسيرة", country: player.nationality, rating: Math.max(70, player.rating - 3) },
    { year: "الآن", club: player.currentClub, country: player.nationality, rating: player.rating },
  ],
  hints: [
    { label: "المركز", text: `يلعب في مركز ${player.position}.` },
    { label: "الهوية", text: `ينتمي إلى جيل ${player.careerLabel}.` },
    { label: "التقييم", text: `تقييمه في مكتبة كورة كده ${player.rating}.` },
    { label: "الاسم", text: "اسمه موجود في مكتبة اللاعبين الواسعة داخل الموقع." },
    { label: "التحدي", text: "قارن المسار الظاهر مع الأسماء المتاحة قبل الإجابة." },
    { label: "اللمسة الأخيرة", text: `ابحث عن اللاعب المعروف باسم ${player.arabicName}.` },
  ],
}));
export const roadGamePlayers = [...ROAD_PLAYERS, ...catalogueRoadPlayers];

export function normalizeRoadName(value: string) {
  return value.toLocaleLowerCase("ar").normalize("NFKD").replace(/[\u064B-\u065F\u0670]/g, "").replace(/[أإآ]/g, "ا").replace(/ى/g, "ي").replace(/[ًٌٍَُِّْـ]/g, "").replace(/[^a-z0-9\u0600-\u06ff]/g, "");
}

export function isRoadGuessCorrect(player: RoadPlayer, guess: string) {
  const normalizedGuess = normalizeRoadName(guess);
  return player.alternativeNames.some((name) => normalizeRoadName(name) === normalizedGuess);
}

export function getRoadScore(hintsUsed: number, wrongGuesses = 0, difficulty: RoadDifficulty = "easy") {
  const multiplier = difficulty === "hard" ? 2 : difficulty === "medium" ? 1.5 : 1;
  return Math.max(0, Math.round(ROAD_SCORE_STEPS[Math.min(Math.max(hintsUsed - 1, 0), ROAD_SCORE_STEPS.length - 1)] * multiplier - wrongGuesses * 5));
}

export function getRoadVisibleTimeline(player: RoadPlayer, hintsUsed: number) {
  return player.timeline.map((node, index) => index < Math.max(1, Math.ceil((hintsUsed / ROAD_SCORE_STEPS.length) * player.timeline.length)) ? node : { year: node.year, club: "؟", country: "؟", rating: 0 });
}

export function getRoadPlayerForDay(date = new Date()) {
  const dateKey = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
  const hash = Array.from(dateKey).reduce((total, character) => (total * 31 + character.charCodeAt(0)) >>> 0, 7);
  return ROAD_PLAYERS[hash % ROAD_PLAYERS.length];
}

export function getRoadRandomPlayer(previousId?: string) {
  const available = ROAD_PLAYERS.filter((player) => player.id !== previousId);
  return available[Math.floor(Math.random() * available.length)] ?? ROAD_PLAYERS[0];
}
