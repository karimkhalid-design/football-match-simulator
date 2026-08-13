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
];

export function shuffleMenByehbad<T>(items: T[], random = Math.random): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}
