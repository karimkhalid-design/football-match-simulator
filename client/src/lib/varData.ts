export type VarDecision = "هدف" | "ضربة جزاء" | "كارت أحمر" | "استمرار اللعب";
export type VarRoundType = "penalty" | "offside" | "goal" | "red-card" | "foul" | "change";

export type VarRound = {
  id: number;
  type: VarRoundType;
  badge: string;
  title: string;
  minute: string;
  description: string;
  varInfo: string;
  originalDecision?: VarDecision;
  options: string[];
  correctAnswer: VarDecision;
  changeAnswer?: "نعم" | "لا";
  explanation: string;
  comment: string;
};

export const VAR_DECISIONS: VarDecision[] = ["هدف", "ضربة جزاء", "كارت أحمر", "استمرار اللعب"];

export const varRounds: VarRound[] = [
  { id: 1, type: "penalty", badge: "ضربة جزاء؟", title: "احتكاك في آخر لحظة", minute: "87:14", description: "المهاجم دخل المنطقة، والمدافع حاول قطع الكرة قبل أن يحدث احتكاك واضح وسقط المهاجم.", varInfo: "الزاوية الجانبية توضح أن قدم المدافع لمست قدم المهاجم قبل الكرة.", options: VAR_DECISIONS, correctAnswer: "ضربة جزاء", explanation: "الاحتكاك المؤثر حصل داخل منطقة الجزاء قبل الوصول للكرة، لذلك القرار الصحيح ضربة جزاء.", comment: "راجعها يا حكم! الـVAR أنقذك في آخر دقيقة." },
  { id: 2, type: "offside", badge: "تسلل؟", title: "قدم واحدة قلبت الهدف", minute: "32:08", description: "المهاجم استلم تمريرة بينية وسدد الكرة في الشباك، لكن المدافع رفع يده مطالباً بالتسلل.", varInfo: "خط التسلل يظهر أن كتف المهاجم متقدم قليلاً لحظة خروج الكرة.", options: VAR_DECISIONS, correctAnswer: "استمرار اللعب", explanation: "الكتف لا يُحتسب جزءاً مسموحاً بالتسجيل منه في هذه اللقطة، والقدم الأقرب للمرمى كانت خلف المدافع الأخير.", comment: "يا حكم إنت بتعمل إيه؟ القرار طلع أهدى من النقاش." },
  { id: 3, type: "goal", badge: "هدف ولا لأ؟", title: "لمسة اليد قبل الاحتفال", minute: "61:42", description: "الكرة ارتدت من المدافع إلى المهاجم، ثم لمست ذراعه قبل أن يضعها في المرمى.", varInfo: "الإعادة البطيئة تُظهر أن اللمسة سبقت التسديدة مباشرة.", options: VAR_DECISIONS, correctAnswer: "استمرار اللعب", explanation: "اللمسة العرضية غير المتعمدة لا تلغي الهدف وحدها إذا لم تكن هي التي سجلت الكرة مباشرة.", comment: "الـVAR قالك كمّل، والاحتفال لسه شغال." },
  { id: 4, type: "red-card", badge: "كارت أحمر؟", title: "تدخل بباطن القدم", minute: "74:03", description: "لاعب اندفع بسرعة عالية واصطدمت قدمه بساق المنافس في تدخل مرتفع.", varInfo: "الكاميرا الأمامية توضح أن النعل واجه ساق المنافس وأن القوة كانت كبيرة.", options: VAR_DECISIONS, correctAnswer: "كارت أحمر", explanation: "التدخل بقوة مفرطة مع تعريض سلامة المنافس للخطر يستحق الطرد المباشر.", comment: "يا نهار أبيض… دي مش التحام، دي مخالفة تستاهل كارت." },
  { id: 5, type: "foul", badge: "خطأ ولا التحام؟", title: "كتف بكتف", minute: "18:27", description: "المدافع والمهاجم جريا بجوار بعضهما، وحدث احتكاك بالكتف فسقط المهاجم.", varInfo: "الإعادة توضح أن اللاعبين كانا يتنافسان على الكرة وأن الكتفين في نفس المستوى.", options: VAR_DECISIONS, correctAnswer: "استمرار اللعب", explanation: "الاحتكاك كتفاً بكتف أثناء المنافسة المشروعة على الكرة لا يُعد خطأ.", comment: "قرار مظبوط يا معلم، سيبهم يلعبوا." },
  { id: 6, type: "change", badge: "VAR قلب القرار", title: "الحكم قال استمرار", minute: "90+2", description: "الحكم أشار باستمرار اللعب بعد سقوط مهاجم داخل المنطقة وسط اعتراضات كبيرة من الفريق.", varInfo: "الزاوية خلف المرمى تكشف أن المدافع سحب قميص المهاجم بوضوح.", originalDecision: "استمرار اللعب", options: ["نعم", "لا"], correctAnswer: "ضربة جزاء", changeAnswer: "نعم", explanation: "القرار الأصلي يتغير لأن سحب القميص منع المهاجم من لعب الكرة داخل المنطقة.", comment: "الـVAR أنقذ الحكم من قرار كان هيعمل أزمة في المدرجات." },
  { id: 7, type: "penalty", badge: "ضربة جزاء؟", title: "الكرة لمست اليد", minute: "45+1", description: "تسديدة قوية اصطدمت بذراع المدافع داخل المنطقة بعد أن أبعدها من جسمه.", varInfo: "الذراع كانت بعيدة عن الجسم وجعلت مساحة الجسم أكبر بشكل واضح.", options: VAR_DECISIONS, correctAnswer: "ضربة جزاء", explanation: "وضع الذراع غير الطبيعي أدى إلى منع تسديدة داخل المنطقة، والقرار ضربة جزاء.", comment: "إيده كانت عاملة جناح يا حكم، القرار واضح." },
  { id: 8, type: "offside", badge: "تسلل؟", title: "المدافع الأخير", minute: "53:19", description: "المهاجم سجل بعد كرة طويلة، لكن الإعادة تحتاج مقارنة خط الحذاء مع آخر مدافع.", varInfo: "الخط الافتراضي يمر بمحاذاة الحذاء ويظهر أن المهاجم على نفس الخط تماماً.", options: VAR_DECISIONS, correctAnswer: "هدف", explanation: "اللاعب كان على خط واحد مع ثاني آخر مدافع، وعلى الخط لا يُعد تسللاً.", comment: "هدف سليم، الخط كان في صفه يا جماعة." },
  { id: 9, type: "red-card", badge: "كارت أحمر؟", title: "منع فرصة محققة", minute: "66:11", description: "مهاجم انفرد بالمرمى، والمدافع أمسكه من الكتف قبل دخول المنطقة بقليل.", varInfo: "الإعادة تُظهر أن المخالفة خارج المنطقة وأن المهاجم لم يكن متجهاً مباشرة للمرمى.", options: VAR_DECISIONS, correctAnswer: "استمرار اللعب", explanation: "المخالفة تستحق بطاقة لكنها خارج منطقة الجزاء، واللقطة لا تحقق كل شروط الطرد الأحمر.", comment: "مش كل مسكة تبقى أحمر يا حكم، راجعها بهدوء." },
  { id: 10, type: "goal", badge: "هدف ولا لأ؟", title: "الحارس اتزق؟", minute: "78:36", description: "ركنية وصلت للحارس، مهاجم قفز بجواره واحتك به قبل أن تسقط الكرة في المرمى.", varInfo: "الإعادة من الخلف توضح أن المهاجم دفع الحارس بكلتا يديه قبل لمس الكرة.", options: VAR_DECISIONS, correctAnswer: "استمرار اللعب", explanation: "الدفع الواضح منع الحارس من لعب الكرة، لذلك لا يُحتسب الهدف ويستمر اللعب بعد إلغائه.", comment: "الحارس اتزق يا حكم، مش كل كرة ثابتة هدف." },
];

export const getRoundTypeLabel = (type: VarRoundType) => ({ penalty: "PENALTY REVIEW", offside: "OFFSIDE REVIEW", goal: "GOAL REVIEW", "red-card": "RED CARD REVIEW", foul: "FOUL REVIEW", change: "DECISION REVIEW" }[type]);
