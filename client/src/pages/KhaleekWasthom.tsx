import React, { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, EyeOff, HelpCircle, RotateCcw, ShieldQuestion, Sparkles, Timer, Trophy, Users } from "lucide-react";
import { getCategoryLabel, getItemsForCategories, KHALEEK_CATEGORIES, type KhaleekCategory, type SecretItem } from "@/lib/khaleekWasthomData";

const LOGO_URL = "/manus-storage/khaleek-wasthom-logo_0b52eb31.png";
type Phase = "home" | "setup" | "names" | "categories" | "reveal" | "pass" | "handoff" | "discussion" | "votePass" | "vote" | "guess" | "result";
type Props = { onBackToHub: () => void };
const defaultNames = ["كريم", "أحمد", "محمد", "يوسف", "عمر", "سيف", "مروان", "ياسين", "آدم", "حسن"];
const suggestedQuestions = ["هل العنصر مرتبط بأوروبا؟", "هل اشتهر أكثر مع نادٍ أم منتخب؟", "هل حقق بطولة كبيرة؟", "هل يرتبط ببلد عربي؟", "هل يمكن معرفة العنصر من جيله؟"];

export default function KhaleekWasthom({ onBackToHub }: Props) {
  const [phase, setPhase] = useState<Phase>("home");
  const [playerCount, setPlayerCount] = useState(5);
  const [names, setNames] = useState(defaultNames.slice(0, 5));
  const [categories, setCategories] = useState<KhaleekCategory[]>(["players"]);
  const [item, setItem] = useState<SecretItem | null>(null);
  const [agentIndex, setAgentIndex] = useState(0);
  const [revealIndex, setRevealIndex] = useState(0);
  const [voteIndex, setVoteIndex] = useState(0);
  const [votes, setVotes] = useState<number[]>([]);
  const [guess, setGuess] = useState("");
  const [agentFound, setAgentFound] = useState(false);

  const items = useMemo(() => getItemsForCategories(categories), [categories]);
  const players = names.slice(0, playerCount);
  const reset = () => { setPhase("home"); setItem(null); setRevealIndex(0); setVoteIndex(0); setVotes([]); setGuess(""); setAgentFound(false); };
  const startNames = () => { setNames(Array.from({ length: playerCount }, (_, index) => names[index] || defaultNames[index])); setPhase("names"); };
  const startCategories = () => setPhase("categories");
  const startReveal = () => {
    const pool = items.length ? items : getItemsForCategories(["players"]);
    setItem(pool[Math.floor(Math.random() * pool.length)]);
    setAgentIndex(Math.floor(Math.random() * playerCount));
    setRevealIndex(0); setPhase("reveal");
  };
  const nextReveal = () => { if (revealIndex + 1 < playerCount) { setRevealIndex(revealIndex + 1); setPhase("handoff"); } else setPhase("discussion"); };
  const finishVote = (finalVotes = votes) => {
    const counts = finalVotes.reduce<Record<number, number>>((acc, target) => ({ ...acc, [target]: (acc[target] ?? 0) + 1 }), {});
    const mostVoted = Number(Object.entries(counts).sort(([, a], [, b]) => b - a)[0]?.[0] ?? -1);
    const found = mostVoted === agentIndex;
    setAgentFound(found);
    setPhase(found ? "guess" : "result");
  };
  const submitVote = (target: number) => { const next = [...votes, target]; setVotes(next); if (voteIndex + 1 < playerCount) { setVoteIndex(voteIndex + 1); setPhase("votePass"); } else { finishVote(next); } };
  const submitGuess = () => setPhase("result");
  const selectedCategoryText = categories.length === KHALEEK_CATEGORIES.length ? "كل الأقسام" : categories.map(getCategoryLabel).join(" · ");

  if (phase === "home") return <main className="khaleek-page khaleek-home" dir="rtl"><div className="khaleek-glow" /><header className="khaleek-topbar"><button className="khaleek-back" onClick={onBackToHub}><ArrowRight /> الألعاب الجماعية</button><span>كورة كده · لعبة جماعية</span></header><section className="khaleek-hero"><img src={LOGO_URL} alt="شعار خليك وسطهم" /><p className="khaleek-eyebrow"><ShieldQuestion /> SECRET FOOTBALL AGENT</p><h1>خليك <em>وسطهم.</em></h1><p>لعبة كورة جماعية على موبايل واحد. مين العميل السري؟ ومين هيعرف يكتشفه؟</p><button className="khaleek-primary" onClick={() => setPhase("setup")}>ابدأ اللعب <ArrowLeft /></button><div className="khaleek-rules"><span><Users /> 3–10 لاعبين</span><span><EyeOff /> بدون حساب</span><span><Sparkles /> على موبايل واحد</span></div></section></main>;

  if (phase === "setup") return <main className="khaleek-page" dir="rtl"><KhaleekHeader title="إعداد اللعبة" onBack={reset} /><section className="khaleek-panel"><span className="khaleek-step">01 · عدد اللاعبين</span><h1>مين داخل الجولة؟</h1><p>اختار من 3 إلى 10 لاعبين، وبعدها مرر الهاتف بينهم بأمان.</p><div className="count-grid">{Array.from({ length: 8 }, (_, index) => index + 3).map((count) => <button key={count} className={playerCount === count ? "selected" : ""} onClick={() => { setPlayerCount(count); setNames(defaultNames.slice(0, count)); }}>{count}<small>لاعبين</small></button>)}</div><button className="khaleek-primary" onClick={startNames}>التالي <ArrowLeft /></button></section></main>;

  if (phase === "names") return <main className="khaleek-page" dir="rtl"><KhaleekHeader title="أسماء اللاعبين" onBack={() => setPhase("setup")} /><section className="khaleek-panel"><span className="khaleek-step">02 · عرفنا عليك</span><h1>اكتب أسماء الفريق</h1><div className="names-grid">{players.map((name, index) => <label key={index}><span>{index + 1}</span><input value={name} onChange={(event) => setNames((current) => current.map((old, i) => i === index ? event.target.value : old))} placeholder={defaultNames[index]} /></label>)}</div><button className="khaleek-primary" onClick={startCategories}>اختيار الأقسام <ArrowLeft /></button></section></main>;

  if (phase === "categories") return <main className="khaleek-page" dir="rtl"><KhaleekHeader title="اختر الأقسام" onBack={() => setPhase("names")} /><section className="khaleek-panel"><span className="khaleek-step">03 · مكتبة السر</span><h1>العنصر ممكن يكون إيه؟</h1><p>اختار قسمًا أو أكثر، أو فعل الكل وخلي اللعبة تختار لك عشوائيًا.</p><div className="category-grid">{KHALEEK_CATEGORIES.map((category) => <button key={category.id} className={`category-card ${category.tone} ${categories.includes(category.id) ? "selected" : ""}`} onClick={() => setCategories((current) => current.includes(category.id) ? current.filter((id) => id !== category.id) : [...current, category.id])}><b>{category.icon}</b><strong>{category.label}</strong><small>{category.description}</small>{categories.includes(category.id) && <Check />}</button>)}</div><button className="random-category" onClick={() => setCategories(KHALEEK_CATEGORIES.map((category) => category.id))}>🎲 عشوائي · كل الأقسام</button><button className="khaleek-primary" disabled={!categories.length} onClick={startReveal}>ابدأ توزيع الأدوار <ArrowLeft /></button></section></main>;

  if (phase === "reveal") return <main className="khaleek-page reveal-page" dir="rtl"><section className="reveal-card"><div className="reveal-progress">اللاعب {revealIndex + 1} من {playerCount}</div><EyeOff /><h1>مرر الهاتف إلى<br /><em>{players[revealIndex]}</em></h1><p>تأكد إن مفيش حد بيبص على الشاشة، ثم اضغط لعرض دورك.</p><button className="khaleek-primary" onClick={() => setPhase("pass")}>أنا جاهز <ArrowLeft /></button></section></main>;

  if (phase === "handoff") return <main className="khaleek-page reveal-page" dir="rtl"><section className="reveal-card handoff-card"><div className="reveal-progress">تم إخفاء الدور السابق بالكامل</div><EyeOff /><span className="secret-label">مرر الهاتف الآن إلى</span><h1><em>{players[revealIndex]}</em></h1><p>لا تضغط «جاهز» إلا بعد أن يصبح الهاتف مع اللاعب المكتوب اسمه، ويتأكد أن الآخرين لا ينظرون للشاشة.</p><button className="khaleek-primary" onClick={() => setPhase("reveal")}>تم تسليم الهاتف <ArrowLeft /></button></section></main>;

  if (phase === "pass") { const isAgent = revealIndex === agentIndex; return <main className="khaleek-page reveal-page" dir="rtl"><section className={`secret-card ${isAgent ? "agent" : "knower"}`}><div className="secret-badge">{isAgent ? "🕵️" : "⚽"}</div>{isAgent ? <><h1>أنت العميل السري!</h1><p>لا تعرف العنصر. اسمع كلام أصحابك وحاول تكتشفه بدون ما يمسكو عليك.</p></> : <><span className="secret-label">العنصر السري هو</span><h1>{item?.name}</h1><p>{item?.hint}</p><div className="secret-facts">{item?.facts.map((fact) => <span key={fact}>• {fact}</span>)}</div></>}<button className="khaleek-primary" onClick={nextReveal}>{revealIndex + 1 === playerCount ? "ابدأ الأسئلة" : "تم · مرر الهاتف"} <ArrowLeft /></button></section></main>; }

  if (phase === "discussion") return <main className="khaleek-page" dir="rtl"><KhaleekHeader title="دوركم الآن" onBack={reset} /><section className="khaleek-panel discussion-panel"><div className="discussion-timer"><Timer /> 60 <small>ثانية للنقاش</small></div><span className="khaleek-step">04 · اسألوا بذكاء</span><h1>مين مش عارف السر؟</h1><p>اسألوا بعض أسئلة ذكية، بدون ما تفضحوا العنصر السري للعميل.</p><div className="suggested-question"><HelpCircle /><span>سؤال مقترح</span><strong>{suggestedQuestions[Math.floor(Math.random() * suggestedQuestions.length)]}</strong></div><button className="khaleek-primary" onClick={() => { setVoteIndex(0); setVotes([]); setPhase("votePass"); }}>ابدأ التصويت <ArrowLeft /></button></section></main>;

  if (phase === "votePass") return <main className="khaleek-page reveal-page" dir="rtl"><section className="reveal-card vote-pass"><div className="reveal-progress">التصويت · {voteIndex + 1} من {playerCount}</div><ShieldQuestion /><h1>مرر الهاتف إلى<br /><em>{players[voteIndex]}</em></h1><p>ممنوع تشوف تصويت اللاعب اللي قبلك. اضغط عندما تكون جاهزًا.</p><button className="khaleek-primary" onClick={() => setPhase("vote")}>أنا جاهز <ArrowLeft /></button></section></main>;

  if (phase === "vote") return <main className="khaleek-page" dir="rtl"><KhaleekHeader title={`تصويت ${players[voteIndex]}`} onBack={reset} /><section className="khaleek-panel"><span className="khaleek-step">05 · القرار الأخير</span><h1>مين العميل السري؟</h1><p>اختار لاعبًا واحدًا فقط. لا تصوت لنفسك.</p><div className="vote-list">{players.map((name, index) => <button key={name} disabled={index === voteIndex} onClick={() => submitVote(index)} className={index === voteIndex ? "disabled" : ""}><span>{index + 1}</span><strong>{name}</strong>{index === voteIndex ? <small>أنت</small> : <ArrowLeft />}</button>)}</div></section></main>;

  if (phase === "guess") return <main className="khaleek-page" dir="rtl"><KhaleekHeader title="فرصة العميل الأخيرة" onBack={reset} /><section className="khaleek-panel guess-panel"><Trophy /><span className="khaleek-step">تم اكتشافك يا {players[agentIndex]}</span><h1>خمن العنصر السري</h1><p>لو عرفت السر، تكسب الجولة حتى لو تم كشفك.</p><div className="guess-list">{items.map((candidate) => <button key={candidate.id} className={guess === candidate.name ? "selected" : ""} onClick={() => setGuess(candidate.name)}>{candidate.name}<span>{getCategoryLabel(candidate.category)}</span></button>)}</div><button className="khaleek-primary" disabled={!guess} onClick={submitGuess}>تأكيد التخمين <Check /></button></section></main>;

  return <main className="khaleek-page" dir="rtl"><KhaleekHeader title="النتيجة" onBack={onBackToHub} /><section className="khaleek-panel result-panel"><Trophy /><span className="khaleek-step">انتهت الجولة</span><h1>{agentFound ? "العميل اتكشف!" : "العميل كسب الجولة!"}</h1><div className="result-secret"><span>العنصر السري</span><strong>{item?.name}</strong><small>{item && getCategoryLabel(item.category)}</small></div>{agentFound ? <p>العميل كان <b>{players[agentIndex]}</b>. {guess ? `اختياره كان: ${guess}.` : "لكن فرصته الأخيرة لم تبدأ."}</p> : <p>التصويت تشتت، والعميل <b>{players[agentIndex]}</b> عرف يستخبى وسطهم.</p>}<div className="result-actions"><button className="khaleek-primary" onClick={reset}><RotateCcw /> جولة جديدة</button><button className="khaleek-secondary" onClick={onBackToHub}>الألعاب الجماعية <ArrowRight /></button></div></section></main>;
}

function KhaleekHeader({ title, onBack }: { title: string; onBack: () => void }) { return <header className="khaleek-topbar inner"><button className="khaleek-back" onClick={onBack}><ArrowRight /> رجوع</button><img src={LOGO_URL} alt="خليك وسطهم" /><strong>{title}</strong></header>; }
