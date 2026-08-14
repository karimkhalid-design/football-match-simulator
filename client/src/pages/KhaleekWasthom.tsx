import React, { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, EyeOff, HelpCircle, RotateCcw, ShieldQuestion, Sparkles, Timer, Trophy, Users } from "lucide-react";
import { getCategoryLabel, getItemsForCategories, KHALEEK_CATEGORIES, type KhaleekCategory, type SecretItem } from "@/lib/khaleekWasthomData";
import ShareResult from "@/components/ShareResult";

const LOGO_URL = "/manus-storage/khaleek-wasthom-logo_0b52eb31.png";
type Phase = "home" | "setup" | "names" | "categories" | "reveal" | "pass" | "handoff" | "discussion" | "votePass" | "vote" | "guess" | "result";
type Props = { onBackToHub: () => void };
const defaultNames = ["كريم", "أحمد", "محمد", "يوسف", "عمر", "سيف", "مروان", "ياسين", "آدم", "حسن"];
const suggestedQuestions = ["هل العنصر مرتبط بأوروبا؟", "هل اشتهر أكثر مع نادٍ أم منتخب؟", "هل حقق بطولة كبيرة؟", "هل يرتبط ببلد عربي؟", "هل يمكن معرفة العنصر من جيله؟"];
const privateClueLabels = ["المعلومة الخاصة ١", "المعلومة الخاصة ٢", "المعلومة الخاصة ٣", "المعلومة الخاصة ٤", "المعلومة الخاصة ٥", "المعلومة الخاصة ٦", "المعلومة الخاصة ٧", "المعلومة الخاصة ٨", "المعلومة الخاصة ٩", "المعلومة الخاصة ١٠"];
const maxAgentsForPlayers = (count: number) => Math.max(1, Math.floor(count / 3));
const getPrivateClue = (secret: SecretItem, playerIndex: number) => {
  const source = [secret.hint, ...secret.facts][playerIndex % (secret.facts.length + 1)];
  const label = privateClueLabels[playerIndex] ?? `المعلومة الخاصة ${playerIndex + 1}`;
  return `${label}: ${source}`;
};

export function shufflePlayers<T>(players: T[], random: () => number = Math.random) {
  const shuffled = [...players];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

export function chooseAgentIndices(playerCount: number, agentCount: number, random: () => number = Math.random) {
  const available = Array.from({ length: playerCount }, (_, index) => index);
  const selected: number[] = [];
  while (selected.length < Math.min(agentCount, playerCount) && available.length) {
    const selectedPosition = Math.floor(random() * available.length);
    selected.push(available.splice(selectedPosition, 1)[0]);
  }
  return selected.sort((a, b) => a - b);
}

export function resolveAgentVotes(agentIndices: number[], ballots: number[][], agentCount: number) {
  const counts = ballots.flat().reduce<Record<number, number>>((acc, target) => ({ ...acc, [target]: (acc[target] ?? 0) + 1 }), {});
  const rankedTargets = Object.entries(counts).sort(([, a], [, b]) => b - a).map(([target]) => Number(target)).slice(0, agentCount);
  const foundAgents = agentIndices.filter((index) => rankedTargets.includes(index));
  return { foundAgents, hiddenAgents: agentIndices.filter((index) => !foundAgents.includes(index)), rankedTargets };
}

export default function KhaleekWasthom({ onBackToHub }: Props) {
  const [phase, setPhase] = useState<Phase>("home");
  const [playerCount, setPlayerCount] = useState(5);
  const [agentCount, setAgentCount] = useState(1);
  const [names, setNames] = useState(defaultNames.slice(0, 5));
  const [categories, setCategories] = useState<KhaleekCategory[]>(["players"]);
  const [item, setItem] = useState<SecretItem | null>(null);
  const [agentIndex, setAgentIndex] = useState(0);
  const [agentIndices, setAgentIndices] = useState<number[]>([0]);
  const [revealIndex, setRevealIndex] = useState(0);
  const [voteIndex, setVoteIndex] = useState(0);
  const [votes, setVotes] = useState<number[][]>([]);
  const [selectedVoteTargets, setSelectedVoteTargets] = useState<number[]>([]);
  const [discoveredAgentIndices, setDiscoveredAgentIndices] = useState<number[]>([]);
  const [guess, setGuess] = useState("");
  const [agentFound, setAgentFound] = useState(false);
  const [agentGuessCorrect, setAgentGuessCorrect] = useState(false);
  const [playersScore, setPlayersScore] = useState(0);
  const [agentScore, setAgentScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState<Record<string, number>>({});
  const [leaderboardKey, setLeaderboardKey] = useState("");
  const [roundPlayers, setRoundPlayers] = useState<string[]>([]);

  const items = useMemo(() => getItemsForCategories(categories), [categories]);
  const players = roundPlayers.length === playerCount ? roundPlayers : names.slice(0, playerCount);
  const agentSet = useMemo(() => new Set(agentIndices), [agentIndices]);
  const reset = () => { setPhase("home"); setItem(null); setRevealIndex(0); setVoteIndex(0); setVotes([]); setSelectedVoteTargets([]); setDiscoveredAgentIndices([]); setGuess(""); setAgentFound(false); setAgentGuessCorrect(false); setPlayersScore(0); setAgentScore(0); setRoundPlayers([]); };
  const startNames = () => { setNames(Array.from({ length: playerCount }, (_, index) => names[index] || defaultNames[index])); setPhase("names"); };
  const startCategories = () => setPhase("categories");
  const startReveal = () => {
    const sessionPlayers = names.slice(0, playerCount);
    const currentKey = [...sessionPlayers].map((name) => name.trim().toLocaleLowerCase("ar")).sort().join("|");
    setRoundPlayers(shufflePlayers(sessionPlayers));
    if (currentKey !== leaderboardKey) {
      setLeaderboardKey(currentKey);
      setLeaderboard(Object.fromEntries(sessionPlayers.map((name) => [name, 0])));
    } else {
      setLeaderboard((current) => Object.fromEntries(sessionPlayers.map((name) => [name, current[name] ?? 0])));
    }
    const pool = items.length ? items : getItemsForCategories(["players"]);
    setItem(pool[Math.floor(Math.random() * pool.length)]);
    const selectedAgents = chooseAgentIndices(playerCount, agentCount);
    setAgentIndices(selectedAgents);
    setAgentIndex(selectedAgents[0] ?? 0);
    setRevealIndex(0); setPhase("reveal");
  };
  const nextReveal = () => { if (revealIndex + 1 < playerCount) { setRevealIndex(revealIndex + 1); setPhase("handoff"); } else setPhase("discussion"); };
  const finishVote = (finalVotes = votes) => {
    const { foundAgents, hiddenAgents } = resolveAgentVotes(agentIndices, finalVotes, agentCount);
    const found = foundAgents.length > 0;
    setDiscoveredAgentIndices(foundAgents);
    setAgentFound(found);
    setPlayersScore(foundAgents.length === agentIndices.length ? 100 : 0);
    setAgentScore(found ? hiddenAgents.length * 100 : agentIndices.length * 100);
    if (!found) {
      const awards = Object.fromEntries(players.map((name, index) => [name, agentSet.has(index) ? 100 : 0]));
      setLeaderboard((current) => Object.fromEntries(players.map((name) => [name, (current[name] ?? 0) + (awards[name] ?? 0)])));
    }
    setPhase(found ? "guess" : "result");
  };
  const submitVote = (targets: number[]) => { const next = [...votes, targets]; setVotes(next); setSelectedVoteTargets([]); if (voteIndex + 1 < playerCount) { setVoteIndex(voteIndex + 1); setPhase("votePass"); } else { finishVote(next); } };
  const toggleVoteTarget = (target: number) => setSelectedVoteTargets((current) => current.includes(target) ? current.filter((index) => index !== target) : current.length < agentCount ? [...current, target] : current);
  const confirmVote = () => { if (selectedVoteTargets.length) submitVote(selectedVoteTargets); };
  const normalizeGuess = (value: string) => value.trim().toLocaleLowerCase("ar").replace(/[إأآ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي").replace(/\s+/g, " ");
  const submitGuess = () => { const correct = normalizeGuess(guess) === normalizeGuess(item?.name ?? ""); setAgentGuessCorrect(correct); const roundAgentScore = correct ? (discoveredAgentIndices.length * 50) + ((agentIndices.length - discoveredAgentIndices.length) * 100) : (agentIndices.length - discoveredAgentIndices.length) * 100; setAgentScore(roundAgentScore); const awards = Object.fromEntries(players.map((name, index) => [name, agentSet.has(index) ? (discoveredAgentIndices.includes(index) ? (correct ? 50 : 0) : 100) : 100])); setLeaderboard((current) => Object.fromEntries(players.map((name) => [name, (current[name] ?? 0) + (awards[name] ?? 0)]))); setPlayersScore(discoveredAgentIndices.length === agentIndices.length ? 100 : 0); setPhase("result"); };
  const selectedCategoryText = categories.length === KHALEEK_CATEGORIES.length ? "كل الأقسام" : categories.map(getCategoryLabel).join(" · ");
  const leaderboardRows = players.map((name) => ({ name, score: leaderboard[name] ?? 0 })).sort((a, b) => b.score - a.score);
  const leaderboardWinner = leaderboardRows[0]?.name ?? players[0] ?? "الفائز";
  const leaderboardWinnerScore = leaderboardRows[0]?.score ?? 0;

  if (phase === "home") return <main className="khaleek-page khaleek-home" dir="rtl"><div className="khaleek-glow" /><header className="khaleek-topbar"><button className="khaleek-back" onClick={onBackToHub}><ArrowRight /> الألعاب الجماعية</button><span>كورة كده · لعبة جماعية</span></header><section className="khaleek-hero"><img src={LOGO_URL} alt="شعار خليك وسطهم" /><p className="khaleek-eyebrow"><ShieldQuestion /> SECRET FOOTBALL AGENT</p><h1>خليك <em>وسطهم.</em></h1><p>لعبة كورة جماعية على موبايل واحد. مين العميل السري؟ ومين هيعرف يكتشفه؟</p><button className="khaleek-primary" onClick={() => setPhase("setup")}>ابدأ اللعب <ArrowLeft /></button><div className="khaleek-rules"><span><Users /> 3–10 لاعبين</span><span><EyeOff /> بدون حساب</span><span><Sparkles /> على موبايل واحد</span></div></section></main>;

  if (phase === "setup") return <main className="khaleek-page" dir="rtl"><KhaleekHeader title="إعداد اللعبة" onBack={reset} /><section className="khaleek-panel"><span className="khaleek-step">01 · عدد اللاعبين والعملاء</span><h1>مين داخل الجولة؟</h1><p>اختار من 3 إلى 10 لاعبين، وبعدها مرر الهاتف بينهم بأمان.</p><div className="count-grid">{Array.from({ length: 8 }, (_, index) => index + 3).map((count) => <button key={count} className={playerCount === count ? "selected" : ""} onClick={() => { setPlayerCount(count); setAgentCount((current) => Math.min(current, maxAgentsForPlayers(count))); setNames(defaultNames.slice(0, count)); }}>{count}<small>لاعبين</small></button>)}</div><div className="agent-count-picker"><div><strong>عدد العملاء السريين</strong><small>يزيد تلقائيًا حسب عدد اللاعبين — عميل واحد لكل 3 لاعبين تقريبًا</small></div><div className="count-grid compact">{Array.from({ length: maxAgentsForPlayers(playerCount) }, (_, index) => index + 1).map((count) => <button key={count} className={agentCount === count ? "selected" : ""} onClick={() => setAgentCount(count)}>{count}<small>{count === 1 ? "عميل" : "عملاء"}</small></button>)}</div></div><button className="khaleek-primary" onClick={startNames}>التالي <ArrowLeft /></button></section></main>;

  if (phase === "names") return <main className="khaleek-page" dir="rtl"><KhaleekHeader title="أسماء اللاعبين" onBack={() => setPhase("setup")} /><section className="khaleek-panel"><span className="khaleek-step">02 · عرفنا عليك</span><h1>اكتب أسماء الفريق</h1><div className="names-grid">{players.map((name, index) => <label key={index}><span>{index + 1}</span><input value={name} onChange={(event) => setNames((current) => current.map((old, i) => i === index ? event.target.value : old))} placeholder={defaultNames[index]} /></label>)}</div><button className="khaleek-primary" onClick={startCategories}>اختيار الأقسام <ArrowLeft /></button></section></main>;

  if (phase === "categories") return <main className="khaleek-page" dir="rtl"><KhaleekHeader title="اختر الأقسام" onBack={() => setPhase("names")} /><section className="khaleek-panel"><span className="khaleek-step">03 · مكتبة السر</span><h1>العنصر ممكن يكون إيه؟</h1><p>اختار قسمًا أو أكثر، أو فعل الكل وخلي اللعبة تختار لك عشوائيًا.</p><div className="category-grid">{KHALEEK_CATEGORIES.map((category) => <button key={category.id} className={`category-card ${category.tone} ${categories.includes(category.id) ? "selected" : ""}`} onClick={() => setCategories((current) => current.includes(category.id) ? current.filter((id) => id !== category.id) : [...current, category.id])}><b>{category.icon}</b><strong>{category.label}</strong><small>{category.description}</small>{categories.includes(category.id) && <Check />}</button>)}</div><button className="random-category" onClick={() => setCategories(KHALEEK_CATEGORIES.map((category) => category.id))}>🎲 عشوائي · كل الأقسام</button><button className="khaleek-primary" disabled={!categories.length} onClick={startReveal}>ابدأ توزيع الأدوار <ArrowLeft /></button></section></main>;

  if (phase === "reveal") return <main className="khaleek-page reveal-page" dir="rtl"><section className="reveal-card"><div className="reveal-progress">اللاعب {revealIndex + 1} من {playerCount}</div><EyeOff /><h1>مرر الهاتف إلى<br /><em>{players[revealIndex]}</em></h1><p>تأكد إن مفيش حد بيبص على الشاشة، ثم اضغط لعرض دورك.</p><button className="khaleek-primary" onClick={() => setPhase("pass")}>أنا جاهز <ArrowLeft /></button></section></main>;

  if (phase === "handoff") return <main className="khaleek-page reveal-page" dir="rtl"><section className="reveal-card handoff-card"><div className="reveal-progress">تم إخفاء الدور السابق بالكامل</div><EyeOff /><span className="secret-label">مرر الهاتف الآن إلى</span><h1><em>{players[revealIndex]}</em></h1><p>لا تضغط «جاهز» إلا بعد أن يصبح الهاتف مع اللاعب المكتوب اسمه، ويتأكد أن الآخرين لا ينظرون للشاشة.</p><button className="khaleek-primary" onClick={() => setPhase("reveal")}>تم تسليم الهاتف <ArrowLeft /></button></section></main>;

  if (phase === "pass") { const isAgent = agentSet.has(revealIndex); return <main className="khaleek-page reveal-page" dir="rtl"><section className={`secret-card ${isAgent ? "agent" : "knower"}`}><div className="secret-badge">{isAgent ? "🕵️" : "⚽"}</div>{isAgent ? <><h1>أنت العميل السري!</h1><p>لا تعرف العنصر. اسمع كلام أصحابك وحاول تكتشفه بدون ما يمسكو عليك.</p></> : <><span className="secret-label">العنصر السري هو</span><h1>{item?.name}</h1><p>{item && getPrivateClue(item, revealIndex)}</p><div className="secret-facts"><span>هذه معلومتك الخاصة — لا تعرضها على باقي اللاعبين</span></div></>}<button className="khaleek-primary" onClick={nextReveal}>{revealIndex + 1 === playerCount ? "ابدأ الأسئلة" : "تم · مرر الهاتف"} <ArrowLeft /></button></section></main>; }

  if (phase === "discussion") return <main className="khaleek-page" dir="rtl"><KhaleekHeader title="دوركم الآن" onBack={reset} /><section className="khaleek-panel discussion-panel"><div className="discussion-timer"><Timer /> 60 <small>ثانية للنقاش</small></div><span className="khaleek-step">04 · اسألوا بذكاء</span><h1>مين مش عارف السر؟</h1><p>اسألوا بعض أسئلة ذكية، بدون ما تفضحوا العنصر السري للعميل.</p><div className="suggested-question"><HelpCircle /><span>سؤال مقترح</span><strong>{suggestedQuestions[Math.floor(Math.random() * suggestedQuestions.length)]}</strong></div><button className="khaleek-primary" onClick={() => { setVoteIndex(0); setVotes([]); setSelectedVoteTargets([]); setPhase("votePass"); }}>ابدأ التصويت <ArrowLeft /></button></section></main>;

  if (phase === "votePass") return <main className="khaleek-page reveal-page" dir="rtl"><section className="reveal-card vote-pass"><div className="reveal-progress">التصويت · {voteIndex + 1} من {playerCount}</div><ShieldQuestion /><h1>مرر الهاتف إلى<br /><em>{players[voteIndex]}</em></h1><p>ممنوع تشوف تصويت اللاعب اللي قبلك. اضغط عندما تكون جاهزًا.</p><button className="khaleek-primary" onClick={() => setPhase("vote")}>أنا جاهز <ArrowLeft /></button></section></main>;

  if (phase === "vote") return <main className="khaleek-page" dir="rtl"><KhaleekHeader title={`تصويت ${players[voteIndex]}`} onBack={reset} /><section className="khaleek-panel"><span className="khaleek-step">05 · القرار الأخير</span><h1>حدد العملاء السريين</h1><p>اختار حتى {agentCount} عملاء. تم اختيار {selectedVoteTargets.length} من {agentCount}، ولا يمكنك اختيار نفس اللاعب مرتين.</p><div className="vote-list">{players.map((name, index) => <button key={name} disabled={index === voteIndex} onClick={() => agentCount === 1 ? submitVote([index]) : toggleVoteTarget(index)} className={`${index === voteIndex ? "disabled" : ""} ${selectedVoteTargets.includes(index) ? "selected" : ""}`}><span>{index + 1}</span><strong>{name}</strong>{index === voteIndex ? <small>أنت</small> : selectedVoteTargets.includes(index) ? <Check /> : <ArrowLeft />}</button>)}</div>{agentCount > 1 && <button className="khaleek-primary" disabled={!selectedVoteTargets.length} onClick={confirmVote}>تأكيد اختياراتي ({selectedVoteTargets.length}/{agentCount}) <Check /></button>}</section></main>;

  if (phase === "guess") return <main className="khaleek-page" dir="rtl"><KhaleekHeader title="فرصة العملاء الأخيرة" onBack={reset} /><section className="khaleek-panel guess-panel"><Trophy /><span className="khaleek-step">تم اكتشاف: {discoveredAgentIndices.map((index) => players[index]).join(" و ")}</span><h1>خمن العنصر السري</h1><p>اكتب اسم العنصر كما تتوقعه. لو إجابتك صحيحة، تكسب الجولة حتى لو تم كشفك.</p><input className="guess-input" value={guess} onChange={(event) => setGuess(event.target.value)} placeholder="اكتب اسم العنصر السري" aria-label="اكتب تخمينك" autoComplete="off" /><div className="guess-list">{items.slice(0, 6).map((candidate) => <button key={candidate.id} className={guess === candidate.name ? "selected" : ""} onClick={() => setGuess(candidate.name)}>{candidate.name}<span>{getCategoryLabel(candidate.category)}</span></button>)}</div><button className="khaleek-primary" disabled={!guess.trim()} onClick={submitGuess}>تأكيد التخمين <Check /></button></section></main>;

  return <main className="khaleek-page" dir="rtl"><KhaleekHeader title="النتيجة" onBack={onBackToHub} /><section className="khaleek-panel result-panel"><Trophy /><span className="khaleek-step">انتهت الجولة</span><h1>{agentFound ? (agentGuessCorrect ? "العملاء عرفوا السر وكسبوا!" : discoveredAgentIndices.length === agentIndices.length ? "كل العملاء اتكشفوا!" : "اتكشف جزء من العملاء!") : "العملاء كسبوا الجولة!"}</h1><div className="result-secret"><span>العنصر السري</span><strong>{item?.name}</strong><small>{item && getCategoryLabel(item.category)}</small></div><div className="score-board"><div><span>نقاط اللاعبين</span><strong>{playersScore}</strong><small>نقطة للجولة</small></div><div><span>نقاط العميل السري</span><strong>{agentScore}</strong><small>نقطة للجولة</small></div></div><div className="khaleek-leaderboard"><div className="leaderboard-heading"><span>الترتيب المستمر</span><small>يتراكم طالما الأسماء ثابتة</small></div>{leaderboardRows.map((row, index) => <div className="leaderboard-row" key={row.name}><b>{index + 1}</b><strong>{row.name}</strong><span>{row.score} نقطة</span></div>)}</div><ShareResult gameName="خليك وسطهم" eyebrow="الترتيب بعد الجولة" winnerName={leaderboardWinner} winnerScore={leaderboardWinnerScore} rows={leaderboardRows.map((row) => ({ label: row.name, score: row.score, detail: "إجمالي الجلسة" }))} highlights={[agentGuessCorrect ? "العملاء عرفوا السر" : agentFound ? `تم اكتشاف ${discoveredAgentIndices.length} من ${agentIndices.length} عملاء` : "العملاء نجوا"]} accent="#f3bf35" triggerLabel="شارك السكور" triggerClassName="khaleek-share-trigger" />{agentFound ? <p>العملاء الحقيقيون كانوا <b>{agentIndices.map((index) => players[index]).join(" و ")}</b>، وتم اكتشاف <b>{discoveredAgentIndices.map((index) => players[index]).join(" و ")}</b>. {agentGuessCorrect ? `كتب العملاء «${guess}» بشكل صحيح.` : `كتبوا «${guess || "إجابة غير صحيحة"}»، لذلك حصل العملاء المختبئون على نقاطهم.`}</p> : <p>التصويت تشتت، والعملاء <b>{agentIndices.map((index) => players[index]).join(" و ")}</b> عرفوا يستخبوا وسطهم.</p>}<div className="result-actions"><button className="khaleek-primary" onClick={reset}><RotateCcw /> جولة جديدة</button><button className="khaleek-secondary" onClick={onBackToHub}>الألعاب الجماعية <ArrowRight /></button></div></section></main>;
}

function KhaleekHeader({ title, onBack }: { title: string; onBack: () => void }) { return <header className="khaleek-topbar inner"><button className="khaleek-back" onClick={onBack}><ArrowRight /> رجوع</button><img src={LOGO_URL} alt="خليك وسطهم" /><strong>{title}</strong></header>; }
