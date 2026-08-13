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
  { id: 20, statement: "بيراميدز فاز بالدوري المصري الممتاز قبل الأهلي والزمالك.", correctAnswer: false, explanation: "بيراميدز لم يفز بالدوري المصري الممتاز حتى الآن، بينما الأهلي والزمالك من أبطال المسابقة التاريخيين.", category: "egypt", difficulty: "medium" },
];

export function shuffleMenByehbad<T>(items: T[], random = Math.random): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}
