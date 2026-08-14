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
    { id: "cristiano-ronaldo", name: "كريستيانو رونالدو", category: "players", hint: "هداف برتغالي صاحب مسيرة طويلة", facts: ["فاز بدوري الأبطال مع أكثر من نادٍ", "لعب لريال مدريد ومانشستر يونايتد", "من أكثر اللاعبين تسجيلًا دوليًا"], difficulty: "سهل" },
    { id: "kylian-mbappe", name: "كيليان مبابي", category: "players", hint: "مهاجم فرنسي سريع", facts: ["فاز بكأس العالم", "لعب لباريس سان جيرمان", "اشتهر بالانطلاق خلف الدفاع"], difficulty: "متوسط" },
    { id: "erling-haaland", name: "إيرلينج هالاند", category: "players", hint: "مهاجم نرويجي قوي داخل المنطقة", facts: ["تألق في الدوري الإنجليزي", "لعب لبوروسيا دورتموند", "معروف بإنهاء الهجمات بسرعة"], difficulty: "متوسط" },
    { id: "kevin-de-bruyne", name: "كيفن دي بروين", category: "players", hint: "صانع لعب بلجيكي بتمريرات حاسمة", facts: ["تألق مع مانشستر سيتي", "يجيد التسديد من خارج المنطقة", "لعب في الدوري الألماني"], difficulty: "متوسط" },
    { id: "vinicius-junior", name: "فينيسيوس جونيور", category: "players", hint: "جناح برازيلي يعتمد على السرعة", facts: ["لعب لريال مدريد", "سجل في نهائي دوري الأبطال", "يلعب غالبًا على الجناح الأيسر"], difficulty: "متوسط" },
    { id: "jude-bellingham", name: "جود بيلينجهام", category: "players", hint: "لاعب وسط إنجليزي شاب", facts: ["لعب لبوروسيا دورتموند", "انتقل إلى ريال مدريد", "يجيد الوصول إلى منطقة الجزاء"], difficulty: "متوسط" },
    { id: "robert-lewandowski", name: "روبرت ليفاندوفسكي", category: "players", hint: "مهاجم بولندي هداف", facts: ["تألق مع بايرن ميونخ", "لعب لبرشلونة", "سجل أهدافًا كثيرة في موسم واحد"], difficulty: "متوسط" },
    { id: "son-heung-min", name: "سون هيونج مين", category: "players", hint: "جناح كوري هداف في إنجلترا", facts: ["لعب لتوتنهام", "سجل بقدميه اليمنى واليسرى", "فاز بالحذاء الذهبي في الدوري الإنجليزي"], difficulty: "متوسط" },
    { id: "sadio-mane", name: "ساديو ماني", category: "players", hint: "جناح سنغالي سريع", facts: ["لعب لليفربول", "فاز بدوري الأبطال", "من أبرز نجوم الكرة الأفريقية"], difficulty: "متوسط" },
    { id: "riyad-mahrez", name: "رياض محرز", category: "players", hint: "جناح جزائري أعسر", facts: ["فاز بالدوري الإنجليزي مع ليستر سيتي", "لعب لمانشستر سيتي", "يجيد اللعب على الجناح الأيمن"], difficulty: "متوسط" },
    { id: "achraf-hakimi", name: "أشرف حكيمي", category: "players", hint: "ظهير مغربي هجومي", facts: ["لعب لريال مدريد", "شارك مع إنتر وباريس", "من أبرز أظهرة أفريقيا"], difficulty: "صعب" },
    { id: "antoine-griezmann", name: "أنطوان جريزمان", category: "players", hint: "مهاجم فرنسي متعدد الأدوار", facts: ["فاز بكأس العالم", "لعب لأتلتيكو مدريد", "يمكنه اللعب خلف المهاجم"], difficulty: "متوسط" },
    { id: "rodri", name: "رودري", category: "players", hint: "لاعب وسط إسباني هادئ", facts: ["لعب لمانشستر سيتي", "سجل في نهائي دوري الأبطال", "يجيد حماية الدفاع"], difficulty: "صعب" },
    { id: "thibaut-courtois", name: "تيبو كورتوا", category: "players", hint: "حارس بلجيكي طويل القامة", facts: ["لعب لتشيلسي وريال مدريد", "فاز بدوري الأبطال", "تصدى لركلات حاسمة"], difficulty: "صعب" },
    { id: "luka-modric", name: "لوكا مودريتش", category: "players", hint: "قائد كرواتي في خط الوسط", facts: ["فاز بالكرة الذهبية", "لعب لريال مدريد", "متخصص في التمرير"], difficulty: "متوسط" },
    { id: "didier-drogba", name: "ديدييه دروجبا", category: "players", hint: "مهاجم أفريقي قوي", facts: ["لعب لتشيلسي", "من ساحل العاج", "اشتهر بالضربات الرأسية"], difficulty: "متوسط" },
    { id: "andres-iniesta", name: "أندريس إنييستا", category: "players", hint: "رسام إسباني في وسط الملعب", facts: ["سجل في نهائي كأس العالم", "لعب لبرشلونة", "صاحب تمريرات هادئة"], difficulty: "متوسط" },
    { id: "xavi-hernandez", name: "تشافي هيرنانديز", category: "players", hint: "قائد إسباني اشتهر بالتمرير", facts: ["لعب لبرشلونة", "فاز بكأس العالم", "كان من أبطال يورو 2008 و2012"], difficulty: "صعب" },
    { id: "zinedine-zidane", name: "زين الدين زيدان", category: "players", hint: "صانع لعب فرنسي أنيق", facts: ["فاز بكأس العالم", "لعب لريال مدريد ويوفنتوس", "سجل في نهائي كأس العالم"], difficulty: "سهل" },
    { id: "ronaldinho", name: "رونالدينيو", category: "players", hint: "نجم برازيلي اشتهر بالمهارة", facts: ["لعب لبرشلونة", "فاز بكأس العالم", "اشتهر بالابتسامة واللمسات الفنية"], difficulty: "سهل" },
    { id: "kaka", name: "كاكا", category: "players", hint: "صانع لعب برازيلي أنيق", facts: ["فاز بالكرة الذهبية", "لعب لميلان وريال مدريد", "فاز بدوري الأبطال مع ميلان"], difficulty: "متوسط" },
    { id: "thierry-henry", name: "تييري هنري", category: "players", hint: "مهاجم فرنسي سريع", facts: ["تألق مع أرسنال", "فاز بكأس العالم", "كان من هدافي الدوري الإنجليزي"], difficulty: "متوسط" },
    { id: "zlatan-ibrahimovic", name: "زلاتان إبراهيموفيتش", category: "players", hint: "مهاجم سويدي صاحب شخصية قوية", facts: ["لعب لأندية أوروبية كثيرة", "سجل أهدافًا استعراضية", "لعب في الدوري الإيطالي والإسباني والفرنسي"], difficulty: "متوسط" },
    { id: "karim-benzema", name: "كريم بنزيما", category: "players", hint: "مهاجم فرنسي لعب لريال مدريد", facts: ["فاز بالكرة الذهبية", "حقق دوري الأبطال عدة مرات", "لعب مع رونالدو في ريال مدريد"], difficulty: "متوسط" },
    { id: "sergio-ramos", name: "سيرخيو راموس", category: "players", hint: "مدافع إسباني هداف", facts: ["لعب لريال مدريد", "فاز بكأس العالم", "سجل أهدافًا مهمة بالرأس"], difficulty: "متوسط" },
    { id: "manuel-neuer", name: "مانويل نوير", category: "players", hint: "حارس ألماني يجيد اللعب بقدميه", facts: ["فاز بكأس العالم", "لعب لبايرن ميونخ", "اشتهر بالخروج من مرماه"], difficulty: "صعب" },
    { id: "yaya-toure", name: "يايا توريه", category: "players", hint: "لاعب وسط إيفواري قوي", facts: ["لعب لمانشستر سيتي", "فاز بالدوري الإنجليزي", "اشتهر بالتقدم من الوسط"], difficulty: "صعب" },
    { id: "samuel-etoo", name: "صامويل إيتو", category: "players", hint: "مهاجم كاميروني سريع", facts: ["فاز بدوري الأبطال مع برشلونة وإنتر", "لعب لريال مدريد وبرشلونة", "من أبرز مهاجمي أفريقيا"], difficulty: "صعب" },
    { id: "neymar", name: "نيمار", category: "players", hint: "جناح برازيلي صاحب مهارة", facts: ["لعب لسانتوس وبرشلونة وباريس", "فاز بدوري الأبطال", "اشتهر بالمراوغات"], difficulty: "سهل" },
    { id: "victor-osimhen", name: "فيكتور أوسيمين", category: "players", hint: "مهاجم نيجيري قوي", facts: ["تألق في الدوري الإيطالي", "فاز بلقب الدوري مع نابولي", "يعتمد على السرعة والضغط"], difficulty: "صعب" },
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
