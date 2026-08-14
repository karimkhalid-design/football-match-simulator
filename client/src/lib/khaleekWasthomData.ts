export type KhaleekCategory = "players" | "coaches" | "stadiums" | "tournaments" | "clubs" | "nationalTeams";

export type SecretItem = { id: string; name: string; category: KhaleekCategory; hint: string; facts: string[]; difficulty: "سهل" | "متوسط" | "صعب" };

export const KHALEEK_CATEGORIES: Array<{ id: KhaleekCategory; label: string; icon: string; description: string; tone: string }> = [
  { id: "players", label: "لاعبين كرة قدم", icon: "⚽", description: "اختبر معلوماتك عن أشهر لاعبي كرة القدم.", tone: "green" },
  { id: "coaches", label: "مدربين", icon: "👔", description: "تعرف على أشهر المدربين في تاريخ كرة القدم.", tone: "blue" },
  { id: "stadiums", label: "استادات", icon: "🏟️", description: "هل تستطيع معرفة أشهر ملاعب العالم؟", tone: "purple" },
  { id: "tournaments", label: "بطولات", icon: "🏆", description: "بطولات محلية وقارية وعالمية.", tone: "gold" },
  { id: "clubs", label: "أندية", icon: "🛡️", description: "أندية كرة القدم من جميع أنحاء العالم.", tone: "red" },
  { id: "nationalTeams", label: "منتخبات", icon: "🌍", description: "منتخبات كرة القدم حول العالم.", tone: "cyan" },
];

export const SECRET_ITEMS: Record<KhaleekCategory, SecretItem[]> = {
  players: [
    { id: "mohamed-salah", name: "محمد صلاح", category: "players", hint: "جناح مصري تألق في إنجلترا", facts: ["هداف مصري", "لعب في الدوري الإنجليزي", "اشتهر بالقدم اليسرى"], difficulty: "سهل" },
    { id: "lionel-messi", name: "ليونيل ميسي", category: "players", hint: "أسطورة أرجنتينية وصانع لعب", facts: ["فاز بكأس العالم", "لعب لبرشلونة", "أعسر القدم"], difficulty: "سهل" },
    { id: "luka-modric", name: "لوكا مودريتش", category: "players", hint: "قائد كرواتي في خط الوسط", facts: ["فاز بالكرة الذهبية", "لعب لريال مدريد", "متخصص في التمرير"], difficulty: "متوسط" },
    { id: "didier-drogba", name: "ديدييه دروجبا", category: "players", hint: "مهاجم أفريقي قوي", facts: ["لعب لتشيلسي", "من ساحل العاج", "اشتهر بالضربات الرأسية"], difficulty: "متوسط" },
    { id: "andres-iniesta", name: "أندريس إنييستا", category: "players", hint: "رسام إسباني في وسط الملعب", facts: ["سجل في نهائي كأس العالم", "لعب لبرشلونة", "صاحب تمريرات هادئة"], difficulty: "متوسط" },
  ],
  coaches: [
    { id: "pep-guardiola", name: "بيب جوارديولا", category: "coaches", hint: "مدرب يحب الاستحواذ والبناء من الخلف", facts: ["درب برشلونة", "حقق دوري الأبطال", "درب مانشستر سيتي"], difficulty: "سهل" },
    { id: "jose-mourinho", name: "جوزيه مورينيو", category: "coaches", hint: "مدرب برتغالي معروف بالواقعية", facts: ["حقق دوري الأبطال مع فريقين", "درب إنتر", "لقب بالاستثنائي"], difficulty: "متوسط" },
    { id: "carlo-ancelotti", name: "كارلو أنشيلوتي", category: "coaches", hint: "مدرب إيطالي هادئ صاحب أرقام قياسية", facts: ["حقق دوري الأبطال عدة مرات", "درب ريال مدريد", "لعب سابقًا في الوسط"], difficulty: "متوسط" },
  ],
  stadiums: [
    { id: "cairo-stadium", name: "استاد القاهرة", category: "stadiums", hint: "ملعب مصري تاريخي", facts: ["يقع في مدينة نصر", "استضاف مباريات دولية", "من أكبر ملاعب مصر"], difficulty: "سهل" },
    { id: "wembley", name: "ويمبلي", category: "stadiums", hint: "ملعب إنجليزي ببرج القوس", facts: ["في لندن", "ملعب المنتخب الإنجليزي", "استضاف نهائيات كبرى"], difficulty: "سهل" },
    { id: "maracana", name: "ماراكانا", category: "stadiums", hint: "ملعب برازيلي أسطوري", facts: ["في ريو دي جانيرو", "استضاف نهائيات كأس العالم", "مرتبط بتاريخ البرازيل"], difficulty: "متوسط" },
  ],
  tournaments: [
    { id: "world-cup", name: "كأس العالم", category: "tournaments", hint: "أكبر بطولة للمنتخبات", facts: ["تقام كل أربع سنوات", "تجمع منتخبات العالم", "لها كأس ذهبية"], difficulty: "سهل" },
    { id: "champions-league", name: "دوري أبطال أوروبا", category: "tournaments", hint: "بطولة أندية أوروبية كبرى", facts: ["تلعب بنظام المجموعات سابقًا", "تضم أبطال القارة", "نهائيها حدث عالمي"], difficulty: "سهل" },
    { id: "afcon", name: "كأس أمم أفريقيا", category: "tournaments", hint: "بطولة منتخبات القارة السمراء", facts: ["تجمع منتخبات أفريقيا", "مصر من أكثر الفائزين", "تقام بنظام إقصائي"], difficulty: "متوسط" },
  ],
  clubs: [
    { id: "al-ahly", name: "الأهلي", category: "clubs", hint: "نادٍ مصري صاحب بطولات قارية", facts: ["من القاهرة", "يلقب بنادي القرن أفريقيًا", "يرتدي الأحمر"], difficulty: "سهل" },
    { id: "real-madrid", name: "ريال مدريد", category: "clubs", hint: "نادٍ ملكي من العاصمة الإسبانية", facts: ["ملعبه سانتياغو برنابيو", "من الأكثر تتويجًا أوروبيًا", "ألوانه البيضاء"], difficulty: "سهل" },
    { id: "liverpool", name: "ليفربول", category: "clubs", hint: "نادٍ إنجليزي من الميرسيسايد", facts: ["ملعبه أنفيلد", "شعاره يتضمن طائرًا", "يرتدي الأحمر"], difficulty: "متوسط" },
  ],
  nationalTeams: [
    { id: "egypt", name: "منتخب مصر", category: "nationalTeams", hint: "منتخب عربي أفريقي صاحب تاريخ قاري", facts: ["يلقب بالفراعنة", "من الأكثر فوزًا بأمم أفريقيا", "ألوانه الأحمر والأبيض والأسود"], difficulty: "سهل" },
    { id: "brazil", name: "منتخب البرازيل", category: "nationalTeams", hint: "منتخب أمريكا الجنوبية صاحب القميص الأصفر", facts: ["الأكثر فوزًا بكأس العالم", "يلقب بالسامبا", "خرج منه نجوم كثيرون"], difficulty: "سهل" },
    { id: "france", name: "منتخب فرنسا", category: "nationalTeams", hint: "منتخب أوروبي أزرق", facts: ["فاز بكأس العالم أكثر من مرة", "يلقب بالديوك", "يمتلك جيلًا قويًا"], difficulty: "متوسط" },
  ],
};

export const getItemsForCategories = (categories: KhaleekCategory[]) => categories.flatMap((category) => SECRET_ITEMS[category]);
export const getCategoryLabel = (category: KhaleekCategory) => KHALEEK_CATEGORIES.find((item) => item.id === category)?.label ?? "كرة القدم";
