export type MenByehbadCategory = "players" | "clubs" | "competitions" | "egypt";

export type MenByehbadStatement = {
  id: number;
  statement: string;
  correctAnswer: boolean;
  explanation: string;
  category: MenByehbadCategory;
  difficulty: "easy" | "medium" | "hard";
};

export const menByehbadStatements: MenByehbadStatement[] = [
  { id: 1, statement: "محمد صلاح لعب لروما قبل انتقاله إلى ليفربول.", correctAnswer: true, explanation: "صلاح لعب مع روما في موسمَي 2015/16 و2016/17 قبل انتقاله إلى ليفربول.", category: "players", difficulty: "easy" },
  { id: 2, statement: "كريستيانو رونالدو فاز بالكرة الذهبية عام 2018.", correctAnswer: false, explanation: "لوكا مودريتش هو الفائز بالكرة الذهبية عام 2018، بينما فاز رونالدو بها عام 2017.", category: "players", difficulty: "medium" },
  { id: 3, statement: "ليف ياشين هو الحارس الوحيد الذي فاز بالكرة الذهبية.", correctAnswer: true, explanation: "ليف ياشين فاز بالجائزة عام 1963، وما زال الحارس الوحيد الذي حققها.", category: "players", difficulty: "medium" },
  { id: 4, statement: "إيرلينغ هالاند سجل 36 هدفاً في الدوري الإنجليزي موسم 2022/23.", correctAnswer: true, explanation: "هالاند سجل 36 هدفاً في أول موسم له بالدوري الإنجليزي الممتاز، وهو رقم قياسي للمسابقة.", category: "players", difficulty: "easy" },
  { id: 5, statement: "رونالدينيو فاز بالكرة الذهبية أثناء لعبه مع ريال مدريد.", correctAnswer: false, explanation: "رونالدينيو فاز بالكرة الذهبية عام 2005 أثناء لعبه مع برشلونة.", category: "players", difficulty: "medium" },
  { id: 6, statement: "أياكس هو النادي الذي بدأ فيه زين الدين زيدان مسيرته الاحترافية.", correctAnswer: false, explanation: "زيدان بدأ مسيرته مع كان الفرنسي، ثم لعب لبوردو ويوفنتوس وريال مدريد.", category: "players", difficulty: "medium" },
  { id: 7, statement: "ريال مدريد هو أكثر نادٍ فاز بدوري أبطال أوروبا.", correctAnswer: true, explanation: "ريال مدريد يملك الرقم القياسي في عدد ألقاب البطولة الأوروبية.", category: "clubs", difficulty: "easy" },
  { id: 8, statement: "ملعب كامب نو هو ملعب نادي ريال مدريد.", correctAnswer: false, explanation: "كامب نو ارتبط ببرشلونة، بينما ملعب ريال مدريد هو سانتياغو برنابيو.", category: "clubs", difficulty: "easy" },
  { id: 9, statement: "مانشستر سيتي فاز بدوري أبطال أوروبا للمرة الأولى عام 2023.", correctAnswer: true, explanation: "مانشستر سيتي فاز بالنهائي أمام إنتر ميلان في إسطنبول عام 2023.", category: "clubs", difficulty: "easy" },
  { id: 10, statement: "جوزيه مورينيو درّب برشلونة قبل أن يدرب ريال مدريد.", correctAnswer: true, explanation: "مورينيو عمل مترجماً ومساعداً في برشلونة قبل تولي تدريب أندية كبرى، ومنها ريال مدريد.", category: "clubs", difficulty: "hard" },
  { id: 11, statement: "نادي نابولي تأسس قبل نادي يوفنتوس.", correctAnswer: false, explanation: "يوفنتوس تأسس عام 1897، بينما تأسس نابولي بصورته المعروفة عام 1926.", category: "clubs", difficulty: "hard" },
  { id: 12, statement: "نهائي كأس العالم 2006 انتهى بفوز إيطاليا على فرنسا بركلات الترجيح.", correctAnswer: true, explanation: "تعادل الفريقان 1-1، ثم فازت إيطاليا بركلات الترجيح.", category: "competitions", difficulty: "easy" },
  { id: 13, statement: "أول نسخة من كأس العالم أقيمت في البرازيل.", correctAnswer: false, explanation: "أول كأس عالم أقيمت في أوروجواي عام 1930 وفازت بها الدولة المضيفة.", category: "competitions", difficulty: "medium" },
  { id: 14, statement: "كريستيانو رونالدو هو الهداف التاريخي لدوري أبطال أوروبا.", correctAnswer: true, explanation: "رونالدو يتصدر قائمة هدافي دوري أبطال أوروبا عبر تاريخ البطولة.", category: "competitions", difficulty: "easy" },
  { id: 15, statement: "إسبانيا فازت بكأس العالم 2010 بهدف في الوقت الأصلي من المباراة النهائية.", correctAnswer: false, explanation: "أندريس إنييستا سجل هدف الفوز في الوقت الإضافي أمام هولندا.", category: "competitions", difficulty: "medium" },
  { id: 16, statement: "الأهلي المصري فاز بدوري أبطال أفريقيا أمام الترجي في نهائي 2024.", correctAnswer: true, explanation: "الأهلي حسم نهائي 2024 أمام الترجي بهدف في القاهرة بعد التعادل ذهاباً.", category: "egypt", difficulty: "medium" },
  { id: 17, statement: "الزمالك هو أول نادٍ مصري يفوز بدوري أبطال أفريقيا.", correctAnswer: false, explanation: "الإسماعيلي كان أول نادٍ مصري يفوز بكأس أفريقيا للأندية البطلة عام 1969.", category: "egypt", difficulty: "hard" },
  { id: 18, statement: "منتخب مصر فاز بكأس الأمم الأفريقية ثلاث مرات متتالية.", correctAnswer: true, explanation: "مصر فازت بنسخ 2006 و2008 و2010، وهو إنجاز تاريخي متتالٍ.", category: "egypt", difficulty: "medium" },
  { id: 19, statement: "حسام حسن هو الهداف التاريخي لمنتخب مصر.", correctAnswer: false, explanation: "محمد صلاح أصبح الهداف التاريخي لمنتخب مصر بعد تجاوزه رقم حسام حسن.", category: "egypt", difficulty: "hard" },
  { id: 20, statement: "بيراميدز فاز بالدوري المصري الممتاز قبل الأهلي والزمالك.", correctAnswer: false, explanation: "بيراميدز لم يفز بالدوري المصري الممتاز حتى الآن، بينما الأهلي والزمالك من أبطال المسابقة التاريخيين.", category: "egypt", difficulty: "hard" },
  { id: 21, statement: "جورج ويا كان أول لاعب أفريقي وأول لاعب من خارج أوروبا يفوز بالكرة الذهبية.", correctAnswer: true, explanation: "جورج ويا فاز بالكرة الذهبية عام 1995، وكان أول لاعب أفريقي وأول لاعب من خارج أوروبا يحققها.", category: "players", difficulty: "hard" },
  { id: 22, statement: "أندريس إنييستا سجل هدفاً في نهائي دوري أبطال أوروبا مع برشلونة.", correctAnswer: false, explanation: "إنييستا صنع لحظات كبيرة في الأدوار الحاسمة، لكنه لم يسجل في نهائي دوري الأبطال مع برشلونة؛ أهداف نهائيي 2009 و2015 جاءت من لاعبين آخرين.", category: "players", difficulty: "hard" },
  { id: 23, statement: "كريستيانو رونالدو سجل 15 هدفاً في ثلاث نسخ فقط من كأس العالم.", correctAnswer: false, explanation: "رونالدو سجل هدفاً واحداً في كل من نسخ 2006 و2010 و2014، ثم أضاف أربعة أهداف في 2018؛ رقم 15 ليس مجموع أهدافه في ثلاث نسخ.", category: "players", difficulty: "hard" },
  { id: 24, statement: "لوكا مودريتش فاز بالكرة الذهبية قبل وصوله إلى نهائي كأس العالم 2018.", correctAnswer: false, explanation: "مودريتش فاز بالكرة الذهبية في نهاية عام 2018 بعد نهائي كأس العالم، وليس قبله.", category: "players", difficulty: "hard" },
  { id: 25, statement: "مانشستر يونايتد سجل هدفيه في نهائي دوري الأبطال 1999 بعد الدقيقة 90.", correctAnswer: true, explanation: "تعادل مانشستر يونايتد في الدقيقة 91 تقريباً ثم سجل هدف الفوز في الوقت بدل الضائع أمام بايرن ميونخ.", category: "competitions", difficulty: "hard" },
  { id: 26, statement: "نهائي كأس العالم 2010 شهد بطاقات صفراء أكثر من نهائي كأس العالم 2006.", correctAnswer: true, explanation: "نهائي 2010 كان شديد التوتر وشهد عدداً كبيراً من البطاقات، إضافة إلى طرد جون هيتينغا، مقارنة بنهائي 2006.", category: "competitions", difficulty: "hard" },
  { id: 27, statement: "اليونان فازت على البرتغال ذهاباً وإياباً في بطولة أمم أوروبا 2004.", correctAnswer: true, explanation: "اليونان هزمت البرتغال في المباراة الافتتاحية ثم كررت الفوز عليها في النهائي.", category: "competitions", difficulty: "hard" },
  { id: 28, statement: "أول هدف في نهائي كأس العالم 2006 سجله زين الدين زيدان من ركلة جزاء.", correctAnswer: true, explanation: "زيدان تقدم لفرنسا من ركلة جزاء في بداية النهائي، قبل أن تتعادل إيطاليا برأسية ماتيراتزي.", category: "competitions", difficulty: "hard" },
  { id: 29, statement: "تشيلسي فاز بنهائي دوري أبطال أوروبا 2012 بهدف سجله في الوقت الأصلي.", correctAnswer: false, explanation: "تشيلسي تعادل مع بايرن ميونخ في الوقت الأصلي والإضافي، ثم فاز بركلات الترجيح.", category: "clubs", difficulty: "hard" },
  { id: 30, statement: "إسماعيلي هو أول نادٍ مصري يفوز ببطولة أفريقية للأندية.", correctAnswer: true, explanation: "إسماعيلي فاز بكأس أفريقيا للأندية البطلة عام 1969، ليصبح أول نادٍ مصري يحقق لقباً قارياً.", category: "egypt", difficulty: "hard" },
  { id: 31, statement: "محمد أبو تريكة سجل هدف فوز الأهلي في نهائي دوري أبطال أفريقيا 2006 أمام الصفاقسي.", correctAnswer: true, explanation: "أبو تريكة سجل هدفاً حاسماً في الدقيقة الأخيرة من إياب النهائي في رادس.", category: "egypt", difficulty: "hard" },
  { id: 32, statement: "منتخب مصر خسر نهائي كأس الأمم الأفريقية 2010 أمام غانا.", correctAnswer: false, explanation: "مصر فازت بالنهائي أمام غانا بهدف محمد ناجي جدو، وحققت اللقب الثالث على التوالي.", category: "egypt", difficulty: "hard" },
  { id: 33, statement: "دييغو مارادونا سجل في أربع نسخ مختلفة من كأس العالم.", correctAnswer: true, explanation: "مارادونا شارك وسجل في نسخ 1982 و1986 و1990 و1994 من كأس العالم.", category: "players", difficulty: "hard" },
  { id: 34, statement: "ريال مدريد خسر نهائي دوري أبطال أوروبا 2014 أمام أتلتيكو مدريد.", correctAnswer: false, explanation: "ريال مدريد فاز بنهائي 2014 على أتلتيكو مدريد بعد التعادل في الوقت الأصلي والحسم في الوقت الإضافي.", category: "clubs", difficulty: "hard" },
  { id: 35, statement: "الهدف الذهبي لمنتخب إسبانيا في نهائي كأس العالم 2010 جاء في الوقت الأصلي.", correctAnswer: false, explanation: "إنييستا سجل هدف الفوز في الوقت الإضافي، وليس خلال الدقائق التسعين الأصلية.", category: "competitions", difficulty: "hard" },
  { id: 36, statement: "ليفربول سجل أهدافه الثلاثة في نهائي دوري الأبطال 2005 خلال ست دقائق فقط.", correctAnswer: true, explanation: "ميلان تقدم 3-0، ثم سجل ليفربول ثلاثة أهداف بين الدقيقتين 54 و60 تقريباً قبل الفوز بركلات الترجيح.", category: "competitions", difficulty: "hard" },
  { id: 37, statement: "تشيلسي كان قد فاز بدوري الأبطال قبل نهائي 2012 أمام بايرن ميونخ.", correctAnswer: false, explanation: "نهائي 2012 كان أول لقب لتشيلسي في دوري الأبطال، بعد التعادل والفوز بركلات الترجيح.", category: "clubs", difficulty: "hard" },
  { id: 38, statement: "إنتر ميلان فاز بنهائي دوري الأبطال 2010 بهدفين سجلهما دييغو ميليتو.", correctAnswer: true, explanation: "ميليتو سجل هدفي إنتر أمام بايرن ميونخ في نهائي سانتياغو برنابيو.", category: "players", difficulty: "hard" },
  { id: 39, statement: "نهائي دوري الأبطال 1994 كان أول نهائي يخسره برشلونة في تاريخ البطولة.", correctAnswer: false, explanation: "برشلونة خسر نهائي 1961 أمام بنفيكا، ثم خسر نهائي 1994 أمام ميلان 4-0.", category: "clubs", difficulty: "hard" },
  { id: 40, statement: "أياكس فاز بنهائي كأس أوروبا 1971 و1972 و1973 بثلاثة مدربين مختلفين.", correctAnswer: false, explanation: "الألقاب الثلاثة جاءت مع المدرب رينوس ميشيلز في 1971 وستيفان كوفاتش في 1972 و1973، أي مدربان فقط.", category: "clubs", difficulty: "hard" },
  { id: 41, statement: "بايرن ميونخ أحرز دوري الأبطال 2020 من دون أن يخسر أو يتعادل في أي مباراة بالنسخة.", correctAnswer: true, explanation: "بايرن فاز في مبارياته الإحدى عشرة في نسخة 2019/20، بما فيها النهائي أمام باريس سان جيرمان.", category: "competitions", difficulty: "hard" },
  { id: 42, statement: "نهائي دوري الأبطال 2013 جمع بين فريقين من إسبانيا.", correctAnswer: false, explanation: "النهائي كان ألمانياً خالصاً بين بايرن ميونخ وبوروسيا دورتموند في ويمبلي.", category: "competitions", difficulty: "hard" },
  { id: 43, statement: "كريستيانو رونالدو سجل هدفين في نهائي دوري الأبطال 2017 أمام يوفنتوس.", correctAnswer: true, explanation: "رونالدو سجل هدفين لريال مدريد في الفوز 4-1 على يوفنتوس.", category: "players", difficulty: "hard" },
  { id: 44, statement: "هدف غاريث بيل المقصي في نهائي 2018 كان أول هدف له في نهائي دوري الأبطال.", correctAnswer: false, explanation: "بيل سجل في نهائي 2014 أمام أتلتيكو، قبل هدفيه في نهائي 2018 أمام ليفربول.", category: "players", difficulty: "hard" },
  { id: 45, statement: "ريال مدريد فاز بنهائي دوري الأبطال 2022 على ليفربول بهدف سجله كريم بنزيما.", correctAnswer: false, explanation: "فينيسيوس جونيور سجل هدف المباراة الوحيد، بينما أُلغي هدف لبنزيما بداعي التسلل.", category: "players", difficulty: "hard" },
  { id: 46, statement: "مانشستر يونايتد فاز بنهائي 1999 رغم أنه كان متأخراً بهدفين بعد الدقيقة 85.", correctAnswer: false, explanation: "كان متأخراً 1-0 حتى الدقائق الأخيرة، ثم سجل شيرنغهام وسولسكاير هدفين في الوقت بدل الضائع.", category: "competitions", difficulty: "hard" },
  { id: 47, statement: "يوفنتوس خسر نهائي دوري الأبطال مرتين متتاليتين أمام ريال مدريد وبرشلونة في عامي 2017 و2015.", correctAnswer: true, explanation: "خسر يوفنتوس نهائي 2015 أمام برشلونة ونهائي 2017 أمام ريال مدريد.", category: "clubs", difficulty: "hard" },
  { id: 48, statement: "صامويل إيتو سجل في نهائي دوري الأبطال مع برشلونة وإنتر ميلان.", correctAnswer: true, explanation: "سجل لبرشلونة في نهائي 2006، ثم سجل لإنتر في نهائي 2010 أمام بايرن ميونخ.", category: "players", difficulty: "hard" },
  { id: 49, statement: "جوزيه مورينيو فاز بنهائي دوري الأبطال 2004 مع بورتو بعد أن سبق له الوصول إلى النهائي مع النادي نفسه في الموسم السابق.", correctAnswer: false, explanation: "بورتو فاز بنهائي 2004، لكن مورينيو لم يصل معه إلى نهائي الموسم السابق؛ النهائي السابق كان بين ميلان ويوفنتوس في 2003.", category: "players", difficulty: "hard" },
  { id: 50, statement: "كارلو أنشيلوتي هو المدرب الوحيد الذي فاز بدوري الأبطال خمس مرات.", correctAnswer: true, explanation: "أنشيلوتي فاز مرتين مع ميلان وثلاث مرات مع ريال مدريد، وهو الرقم القياسي للمدربين.", category: "competitions", difficulty: "hard" },
  { id: 51, statement: "فرانشيسكو خينتو فاز بكأس أوروبا ست مرات مع ريال مدريد.", correctAnswer: true, explanation: "خينتو هو اللاعب الذي فاز بكأس أوروبا ست مرات، وكلها مع ريال مدريد.", category: "players", difficulty: "hard" },
  { id: 52, statement: "أول نهائي أوروبي لريال مدريد انتهى بفوزه على آينتراخت فرانكفورت بهدف واحد فقط.", correctAnswer: false, explanation: "ريال مدريد فاز بنهائي 1960 بنتيجة 7-3 على آينتراخت فرانكفورت، وهو من أكثر النهائيات تهديفاً.", category: "competitions", difficulty: "hard" },
  { id: 53, statement: "ستياوا بوخارست فاز بكأس أوروبا 1986 بركلات الترجيح من دون أن يسجل أي فريق ركلة ناجحة.", correctAnswer: true, explanation: "انتهى النهائي أمام برشلونة 0-0، وفاز ستياوا بركلات الترجيح 2-0 بعد تألق هيلموت دوكادام.", category: "clubs", difficulty: "hard" },
  { id: 54, statement: "مارسيلو سجل هدفاً في نهائي دوري الأبطال 2018 أمام ليفربول.", correctAnswer: false, explanation: "سجل بنزيما وبيل هدفين، بينما جاء هدف ليفربول بالنيران الصديقة من ماني؛ مارسيلو لم يسجل.", category: "players", difficulty: "hard" },
  { id: 55, statement: "نهائي كأس العالم 1978 كان أول نهائي مونديالي يُحسم في الوقت الإضافي.", correctAnswer: false, explanation: "نهائيا 1934 و1966 حُسما في الوقت الإضافي قبل نهائي 1978، الذي فازت فيه الأرجنتين على هولندا.", category: "competitions", difficulty: "hard" },
  { id: 56, statement: "الأرجنتين خسرت نهائي كأس العالم 1990 بهدف من ركلة جزاء.", correctAnswer: true, explanation: "أندرياس بريمه سجل من ركلة جزاء لألمانيا الغربية في نهائي روما.", category: "competitions", difficulty: "hard" },
  { id: 57, statement: "رونالدو البرازيلي سجل هدفين في نهائي كأس العالم 2002 أمام ألمانيا.", correctAnswer: true, explanation: "رونالدو سجل هدفي البرازيل في النهائي، وحصل على الحذاء الذهبي بثمانية أهداف.", category: "players", difficulty: "hard" },
  { id: 58, statement: "فرنسا فازت بنهائي كأس العالم 1998 بركلات الترجيح أمام البرازيل.", correctAnswer: false, explanation: "فرنسا فازت 3-0 في الوقت الأصلي بهدفين لزيدان وهدف لبيتي، من دون ركلات ترجيح.", category: "competitions", difficulty: "hard" },
  { id: 59, statement: "الأهلي فاز بنهائي دوري أبطال أفريقيا 2006 بهدف في الدقيقة الأخيرة من مباراة الإياب.", correctAnswer: true, explanation: "محمد أبو تريكة سجل هدف الفوز أمام الصفاقسي في رادس بالدقيقة الأخيرة تقريباً.", category: "egypt", difficulty: "hard" },
  { id: 60, statement: "الترجي خسر نهائي دوري أبطال أفريقيا 2018 أمام الأهلي بركلات الترجيح.", correctAnswer: false, explanation: "الترجي فاز بنهائي 2018 على الأهلي ذهاباً وإياباً، ولم يُحسم النهائي بركلات الترجيح.", category: "egypt", difficulty: "hard" },
];

export const hardMenByehbadStatements = menByehbadStatements.filter((statement) => statement.difficulty === "hard");

export function shuffleMenByehbad<T>(items: T[], random = Math.random): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}


export type MenByehbadAidKind = "double" | "bonus" | "shield" | "risk";
export type MenByehbadAid = { kind: MenByehbadAidKind; title: string; description: string; owner: string };

const MEN_BYEHBAD_AIDS: Omit<MenByehbadAid, "owner">[] = [
  { kind: "double", title: "مضاعف الحقيقة", description: "لو إجابتك صح، نقاطك في الراوند ده تتضاعف." },
  { kind: "bonus", title: "دفعة إضافية", description: "الإجابة الصحيحة تمنحك 50 نقطة إضافية." },
  { kind: "shield", title: "حماية من الهبد", description: "لو إجابتك غلط، تخسر صفر بدلاً من أي خصم." },
  { kind: "risk", title: "كارت المخاطرة", description: "إجابة صح تمنحك 200 نقطة، وإجابة غلط تخصم 50 نقطة." },
];

export function drawMenByehbadAid(names: string[], random = Math.random): MenByehbadAid {
  if (!names.length) throw new Error("لا يمكن سحب مساعدة بدون لاعبين");
  const owner = names[Math.floor(random() * names.length)] ?? names[0];
  const card = MEN_BYEHBAD_AIDS[Math.floor(random() * MEN_BYEHBAD_AIDS.length)] ?? MEN_BYEHBAD_AIDS[0];
  return { ...card, owner };
}

export function getMenByehbadAidPoints(aid: MenByehbadAid | null, owner: string, player: string, isCorrect: boolean) {
  if (!isCorrect) return aid?.kind === "shield" && aid.owner === player ? 0 : aid?.kind === "risk" && aid.owner === player ? -50 : 0;
  if (!aid || aid.owner !== player) return 100;
  if (aid.kind === "double") return 200;
  if (aid.kind === "bonus") return 150;
  if (aid.kind === "risk") return 200;
  return 100;
}
