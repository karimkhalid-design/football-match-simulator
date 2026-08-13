import React, { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, Clock3, Eye, Plus, RotateCcw, Trophy, Users, X } from "lucide-react";
import { menByehbadStatements, shuffleMenByehbad, type MenByehbadStatement } from "../lib/menByehbadData";

const MEN_BYEHBAD_LOGO_URL = "/manus-storage/men-byehbad-logo_a02e06b2.png";
type Phase = "setup" | "instructions" | "discussion" | "secret" | "reveal" | "score" | "finished";
type Props = { onBackToHub: () => void; initialNames?: string[] };
type ShellProps = { children: React.ReactNode; onBackToHub: () => void; phase: Phase; roundIndex: number };

const categoryLabels = { players: "لاعبين", clubs: "أندية", competitions: "بطولات", egypt: "كورة مصرية" } as const;
const emptyAnswers = (count: number) => Object.fromEntries(Array.from({ length: count }, (_, index) => [index, null])) as Record<number, boolean | null>;

function MenByehbadShell({ children, onBackToHub, phase, roundIndex }: ShellProps) {
  return <main className="menbyehbad-page" dir="rtl"><div className="menbyehbad-grid" /><div className="menbyehbad-glow" /><header className="menbyehbad-header"><button className="menbyehbad-back" onClick={onBackToHub}><ArrowRight /> كل الألعاب</button><div className="menbyehbad-brand"><span>PARTY FOOTBALL GAME</span><img src={MEN_BYEHBAD_LOGO_URL} alt="شعار مين بيهبد؟" /></div><div className="menbyehbad-round"><Trophy /> {phase === "setup" || phase === "instructions" ? "جاهزين؟" : `${roundIndex + 1} / 10`}</div></header>{children}<footer className="menbyehbad-footer">مين بيهبد؟ · صناعة كريم</footer></main>;
}

export default function MenByehbad({ onBackToHub, initialNames }: Props) {
  const [phase, setPhase] = useState<Phase>("setup");
  const [names, setNames] = useState(() => initialNames?.slice(0, 10) ?? ["", "", ""]);
  const [setupError, setSetupError] = useState("");
  const [questions, setQuestions] = useState<MenByehbadStatement[]>(() => shuffleMenByehbad(menByehbadStatements));
  const [roundIndex, setRoundIndex] = useState(0);
  const [seconds, setSeconds] = useState(20);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [answers, setAnswers] = useState<Record<number, boolean | null>>({});
  const [scores, setScores] = useState<Record<string, number>>({});
  const [roundPoints, setRoundPoints] = useState<Record<number, number>>({});
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "مين بيهبد؟";
    return () => { document.title = previousTitle || "كورة كده"; };
  }, []);

  const round = questions[roundIndex];
  const leaderboard = useMemo(() => names.map((name) => ({ name, score: scores[name] ?? 0 })).sort((a, b) => b.score - a.score), [names, scores]);

  useEffect(() => {
    if (phase !== "discussion" || seconds <= 0) return;
    const timer = window.setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [phase, seconds]);

  useEffect(() => {
    if (phase === "discussion" && seconds === 0) setPhase("secret");
  }, [phase, seconds]);

  const startGame = () => {
    const cleaned = names.map((name) => name.trim());
    if (cleaned.some((name) => !name)) { setSetupError("اكتب أسماء كل اللاعبين الأول."); return; }
    if (new Set(cleaned).size !== cleaned.length) { setSetupError("كل لاعب لازم يكون له اسم مختلف."); return; }
    setSetupError("");
    setNames(cleaned);
    setScores(Object.fromEntries(cleaned.map((name) => [name, 0])));
    setAnswers(emptyAnswers(cleaned.length));
    setQuestions(shuffleMenByehbad(menByehbadStatements));
    setRoundIndex(0);
    setPhase("instructions");
  };

  const beginRound = () => { setSeconds(20); setPhase("discussion"); };
  const finishDiscussion = () => { setSeconds(0); setPhase("secret"); };

  const chooseAnswer = (answer: boolean) => {
    if (answers[currentPlayer] !== null) return;
    const nextAnswers = { ...answers, [currentPlayer]: answer };
    setAnswers(nextAnswers);
    if (currentPlayer < names.length - 1) {
      setCurrentPlayer((value) => value + 1);
      setPhase("secret");
    } else {
      setPhase("reveal");
    }
  };

  const revealTruth = () => {
    if (checking) return;
    setChecking(true);
    window.setTimeout(() => {
      const points = Object.fromEntries(names.map((_, index) => [index, answers[index] === round.correctAnswer ? 100 : 0]));
      setRoundPoints(points);
      setScores((current) => Object.fromEntries(names.map((name, index) => [name, (current[name] ?? 0) + (points[index] ?? 0)])));
      setChecking(false);
      setPhase("score");
    }, 800);
  };

  const nextRound = () => {
    if (roundIndex >= 9 || roundIndex >= questions.length - 1) { setPhase("finished"); return; }
    setRoundIndex((value) => value + 1);
    setCurrentPlayer(0);
    setAnswers(emptyAnswers(names.length));
    setRoundPoints({});
    setSeconds(20);
    setPhase("instructions");
  };

  const restart = () => {
    setNames(["", "", ""]);
    setQuestions(shuffleMenByehbad(menByehbadStatements));
    setRoundIndex(0);
    setCurrentPlayer(0);
    setAnswers({});
    setScores({});
    setRoundPoints({});
    setSetupError("");
    setPhase("setup");
  };

  const updateName = (index: number, value: string) => setNames((current) => current.map((name, nameIndex) => nameIndex === index ? value : name));
  const addPlayer = () => { if (names.length < 10) setNames((current) => [...current, ""]); };
  const removePlayer = (index: number) => { if (names.length > 3) setNames((current) => current.filter((_, nameIndex) => nameIndex !== index)); };


  if (phase === "setup") return <MenByehbadShell onBackToHub={onBackToHub} phase={phase} roundIndex={roundIndex}><section className="menbyehbad-setup"><img className="menbyehbad-hero-logo" src={MEN_BYEHBAD_LOGO_URL} alt="مين بيهبد؟" /><p className="menbyehbad-kicker"><Users /> لعبة صحاب · موبايل واحد</p><h1>مين <em>بيهبد؟</em></h1><p className="menbyehbad-copy">متصدقش كل اللي تسمعه… ناقشوا المعلومة وشوفوا مين هيعرف الحقيقة.</p><div className="menbyehbad-panel"><div className="menbyehbad-panel-title"><b>مين هيلعب؟</b><span>{names.length} / 10 لاعبين</span></div><div className="menbyehbad-names">{names.map((name, index) => <label key={index}><span>لاعب {index + 1}</span><div><input value={name} onChange={(event) => updateName(index, event.target.value)} placeholder="اكتب اسم اللاعب" maxLength={18} />{names.length > 3 && <button type="button" aria-label={`حذف اللاعب ${index + 1}`} onClick={() => removePlayer(index)}><X /></button>}</div></label>)}</div><button className="menbyehbad-add" type="button" onClick={addPlayer} disabled={names.length >= 10}><Plus /> إضافة لاعب</button>{setupError && <p className="menbyehbad-error">{setupError}</p>}<button className="menbyehbad-primary" type="button" onClick={startGame}>ابدأ اللعبة <ArrowRight /></button></div></section></MenByehbadShell>;

  if (phase === "instructions") return <MenByehbadShell onBackToHub={onBackToHub} phase={phase} roundIndex={roundIndex}><section className="menbyehbad-card menbyehbad-instructions"><div className="menbyehbad-card-icon"><Eye /></div><p className="menbyehbad-kicker">قواعدها بسيطة</p><h1>ركز كده <em>👀</em></h1><p>هتظهر معلومة عن الكورة. اتناقشوا فيها، وبعدها كل واحد هياخد الموبايل ويختار في السر: حقيقة ولا هبد.</p><div className="menbyehbad-steps"><span><b>01</b> اقرأوا المعلومة</span><span><b>02</b> اتناقشوا 20 ثانية</span><span><b>03</b> كل لاعب يختار في السر</span><span><b>04</b> نكشف الحقيقة ونحسب النقاط</span></div><button className="menbyehbad-primary" onClick={beginRound}>فهمت، ابدأ الجولة <ArrowRight /></button></section></MenByehbadShell>;

  if (phase === "discussion") return <MenByehbadShell onBackToHub={onBackToHub} phase={phase} roundIndex={roundIndex}><section className="menbyehbad-card menbyehbad-statement-card"><div className="menbyehbad-card-top"><span>الجولة {roundIndex + 1} من 10</span><span className="menbyehbad-category">{categoryLabels[round.category]}</span></div><p className="menbyehbad-kicker">ركز كده… متصدقش بسرعة</p><h1>هل المعلومة دي <em>حقيقة؟</em></h1><div className="menbyehbad-statement">{round.statement}</div><div className={`menbyehbad-timer ${seconds <= 5 ? "danger" : ""}`}><Clock3 /><strong>{seconds}</strong><span>ثانية للنقاش</span></div><p className="menbyehbad-talk">اتناقشوا بسرعة! مين شايف إنها هبد؟</p><button className="menbyehbad-secondary" onClick={finishDiscussion}>خلصنا النقاش <ArrowRight /></button></section></MenByehbadShell>;

  if (phase === "secret") return <MenByehbadShell onBackToHub={onBackToHub} phase={phase} roundIndex={roundIndex}><section className="menbyehbad-card menbyehbad-secret"><div className="menbyehbad-lock">🔒</div><p className="menbyehbad-kicker">اختيار سري</p><h1>دور <em>{names[currentPlayer]}</em></h1><p>اختار إجابتك، وبعدها خبّي الشاشة ومرر الموبايل للي بعدك.</p><div className="menbyehbad-secret-buttons"><button className="truth" onClick={() => chooseAnswer(true)}><Check /> حقيقة</button><button className="bluff" onClick={() => chooseAnswer(false)}><X /> هبد</button></div><small>إجابات اللاعبين اللي فاتوا اتقفلت ومش هتظهر.</small></section></MenByehbadShell>;

  if (phase === "reveal") return <MenByehbadShell onBackToHub={onBackToHub} phase={phase} roundIndex={roundIndex}><section className="menbyehbad-card menbyehbad-reveal"><div className="menbyehbad-search">{checking ? "CHECKING…" : "🔍"}</div><p className="menbyehbad-kicker">نكشف الحقيقة؟</p><h1>{checking ? "استنى… بنراجع المعلومة" : "اضغط عشان نعرف"}</h1><p>{checking ? "بنراجع كل تفصيلة كروية…" : "كل الإجابات اتسجلت. مستعدين؟"}</p>{!checking && <button className="menbyehbad-primary" onClick={revealTruth}><Eye /> اكشف الحقيقة</button>}</section></MenByehbadShell>;

  if (phase === "score") return <MenByehbadShell onBackToHub={onBackToHub} phase={phase} roundIndex={roundIndex}><section className="menbyehbad-card menbyehbad-score"><div className={`menbyehbad-verdict ${round.correctAnswer ? "truth" : "bluff"}`}>{round.correctAnswer ? <><Check /> حقيقة</> : <><X /> هبد</>}</div><p className="menbyehbad-kicker">الحقيقة ظهرت</p><h1>{round.correctAnswer ? "طلعت صح يا موسوعة!" : "يا نهار أبيض، دي هبد!"}</h1><div className="menbyehbad-statement small">{round.statement}</div><p className="menbyehbad-explanation">{round.explanation}</p><div className="menbyehbad-round-scores">{names.map((name, index) => <div key={name}><span>{name}</span><b className={roundPoints[index] ? "earned" : ""}>{roundPoints[index] ? "+100" : "+0"}</b><small>{answers[index] === round.correctAnswer ? "إجابة صح" : "إجابة غلط"}</small></div>)}</div><button className="menbyehbad-primary" onClick={nextRound}>{roundIndex >= 9 ? "النتيجة النهائية" : "الجولة الجاية"} <ArrowRight /></button></section></MenByehbadShell>;

  return <MenByehbadShell onBackToHub={onBackToHub} phase={phase} roundIndex={roundIndex}><section className="menbyehbad-card menbyehbad-finished"><div className="menbyehbad-card-icon"><Trophy /></div><p className="menbyehbad-kicker">انتهت اللعبة</p><h1>مين كان <em>موسوعة؟</em></h1><div className="menbyehbad-leaderboard">{leaderboard.map((entry, index) => <div key={entry.name} className={index === 0 ? "winner" : ""}><strong>{index + 1}</strong><span>{entry.name}</span><b>{entry.score}</b></div>)}</div><div className="menbyehbad-titles"><span>🧠 كاشف الهبد: {leaderboard[0]?.name}</span><span>🔥 موسوعة كورة: {leaderboard[0]?.name}</span><span>🤡 بيصدق أي حاجة: {leaderboard[leaderboard.length - 1]?.name}</span></div><button className="menbyehbad-primary" onClick={restart}><RotateCcw /> لعبة جديدة</button></section></MenByehbadShell>;
}
