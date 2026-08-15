import React, { useEffect, useMemo, useState } from "react";
import { ArrowRight, Clock3, Flame, Gauge, RotateCcw, Sparkles, Target, Trophy } from "lucide-react";
import ShareResult from "../components/ShareResult";
import { getRoadPlayerForDay, getRoadRandomPlayer, getRoadScore, getRoadVisibleTimeline, isRoadGuessCorrect, ROAD_ROUND_SECONDS, type RoadDifficulty, type RoadPlayer } from "../lib/roadGameData";

const ROAD_LOGO_URL = "/manus-storage/road-game_ea66d69e.png";

type RoadGameProps = { onBack: () => void };
type Mode = "normal" | "daily";

const formatTime = (seconds: number) => `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

export default function RoadGame({ onBack }: RoadGameProps) {
  const [phase, setPhase] = useState<"home" | "playing" | "finished">("home");
  const [difficulty, setDifficulty] = useState<RoadDifficulty>("medium");
  const [mode, setMode] = useState<Mode>("normal");
  const [player, setPlayer] = useState<RoadPlayer | null>(null);
  const hintsUsed = 1;
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [seconds, setSeconds] = useState(ROAD_ROUND_SECONDS);
  const [elapsed, setElapsed] = useState(0);
  const [resultReason, setResultReason] = useState<"correct" | "timeout" | "revealed">("correct");
  const [streak, setStreak] = useState(() => Number(window.localStorage.getItem("road-streak") ?? 0));
  const [bestStreak, setBestStreak] = useState(() => Number(window.localStorage.getItem("road-best-streak") ?? 0));

  const visibleTimeline = useMemo(() => player ? getRoadVisibleTimeline(player, hintsUsed) : [], [player]);
  const potentialScore = useMemo(() => getRoadScore(hintsUsed, wrongGuesses, difficulty), [hintsUsed, wrongGuesses, difficulty]);

  const finishGame = (reason: "correct" | "timeout" | "revealed") => {
    setResultReason(reason);
    setPhase("finished");
    if (reason === "correct") {
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      setBestStreak((currentBest) => {
        const nextBest = Math.max(currentBest, nextStreak);
        window.localStorage.setItem("road-best-streak", String(nextBest));
        return nextBest;
      });
      window.localStorage.setItem("road-streak", String(nextStreak));
    } else {
      setStreak(0);
      window.localStorage.setItem("road-streak", "0");
    }
  };

  useEffect(() => {
    if (phase !== "playing") return;
    const timer = window.setInterval(() => {
      setSeconds((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          setElapsed(ROAD_ROUND_SECONDS);
          finishGame("timeout");
          return 0;
        }
        return current - 1;
      });
      setElapsed((current) => current + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [phase]);

  const startRound = (selectedMode: Mode = "normal") => {
    const nextPlayer = selectedMode === "daily" ? getRoadPlayerForDay(undefined, "medium") : getRoadRandomPlayer(player?.id, "medium");
    setMode(selectedMode);
    setPlayer(nextPlayer);
    setWrongGuesses(0);
    setGuess("");
    setFeedback("");
    setSeconds(ROAD_ROUND_SECONDS);
    setElapsed(0);
    setResultReason("correct");
    setPhase("playing");
  };

  const submitGuess = () => {
    if (!player || !guess.trim()) return;
    if (isRoadGuessCorrect(player, guess)) {
      setFeedback("صح! عرفت اللاعب قبل ما السهم يخلص.");
      finishGame("correct");
    } else {
      setWrongGuesses((current) => current + 1);
      setFeedback("مش هو! حاول تاني، لسه عندك فرصة.");
      setGuess("");
    }
  };

  const revealNext = () => {
    setFeedback("");
  };

  if (phase === "home") return <main className="road-game road-home" dir="rtl">
    <header className="road-topbar"><button type="button" className="road-back" onClick={onBack}><ArrowRight /> الألعاب الفردية</button><span>كورة كده · صناعة كريم</span></header>
    <section className="road-home-hero"><div className="road-logo-wrap"><img src={ROAD_LOGO_URL} alt="شعار الطريق ما يتوهش" /></div><p className="road-kicker"><Sparkles /> لعبة استنتاج كروية</p><h1>الطريق ما <em>يتوهش.</em></h1><p>اقرأ جزءاً من مسيرة اللاعب، واستنتجه قبل ما الوقت يخلص.</p><div className="road-home-actions"><button type="button" className="road-primary" onClick={() => startRound("normal")}><Target /> ابدأ اللعب</button><button type="button" className="road-secondary" onClick={() => startRound("daily")}><Trophy /> لاعب اليوم</button></div><div className="road-home-stats"><span><b>{streak}</b><small>Streak الحالي</small></span><i /><span><b>{bestStreak}</b><small>أفضل Streak</small></span><i /><span><b>90</b><small>ثانية للجولة</small></span></div></section>
  </main>;

  if (!player) return null;

  if (phase === "finished") {
    const resultScore = resultReason === "correct" ? potentialScore : 0;
    const reasonLabel = resultReason === "correct" ? "عرفت اللاعب!" : resultReason === "timeout" ? "الوقت خلص!" : "كشفت المسيرة كاملة";
    return <main className="road-game road-result" dir="rtl">
      <header className="road-topbar"><button type="button" className="road-back" onClick={onBack}><ArrowRight /> الألعاب الفردية</button><span>النتيجة النهائية</span></header>
      <section className="road-result-shell"><div className={`road-result-badge ${resultReason}`}><Trophy /></div><p className="road-kicker"><Sparkles /> {mode === "daily" ? "PLAYER OF THE DAY" : "سهم اللاعب"}</p><h1>{reasonLabel}</h1><p className="road-result-answer">الإجابة كانت: <strong>{player.arabicName}</strong></p><div className="road-score-panel"><div><small>Score</small><b>{resultScore} / 100</b></div><div><small>Wrong Guesses</small><b>{wrongGuesses}</b></div><div><small>Time</small><b>{formatTime(elapsed)}</b></div></div><div className="road-streak-banner"><Flame /> Streak: <b>{streak}</b><span>Best: {bestStreak}</span></div><div className="road-full-timeline"><div className="road-timeline-heading"><span>مسيرة اللاعب</span><small>السهم كامل</small></div><div className="road-timeline road-timeline-full">{player.timeline.map((node) => <div className="road-timeline-node" key={`${node.year}-${node.club}`}><strong>{node.year}</strong><span>{node.club}</span><small>{node.country} · {node.rating}</small></div>)}</div></div><div className="road-result-actions"><button type="button" className="road-primary" onClick={() => startRound(mode)}><RotateCcw /> لاعب جديد</button><ShareResult gameName="الطريق ما يتوهش" eyebrow={mode === "daily" ? "لاعب اليوم · نتيجة سرية" : "الجولة انتهت · نتيجة سرية"} winnerName="أنت" winnerScore={`${resultScore} نقطة`} rows={[{ label: "Score", score: `${resultScore} / 100`, detail: "النتيجة" }, { label: "Wrong guesses", score: String(wrongGuesses), detail: "المحاولات الخاطئة" }, { label: "Time", score: formatTime(elapsed), detail: "الوقت" }, { label: "Streak", score: String(streak), detail: "السلسلة" }]} highlights={["نتيجة سرية", `Wrong guesses: ${wrongGuesses}`, `Streak: ${streak}`]} accent="#b7ff1a" triggerLabel="مشاركة النتيجة" triggerClassName="road-share-trigger" /></div></section>
    </main>;
  }

  return <main className="road-game road-play" dir="rtl">
    <header className="road-topbar"><button type="button" className="road-back" onClick={onBack}><ArrowRight /> الألعاب الفردية</button><span>{mode === "daily" ? "⚡ لاعب اليوم" : "سهم اللاعب"}</span></header>
    <section className="road-play-shell"><div className="road-play-heading"><div><p className="road-kicker"><Gauge /> اقرأ المسيرة واختار</p><h1>مين <em>اللاعب؟</em></h1></div><div className={`road-timer ${seconds <= 15 ? "urgent" : ""}`}><Clock3 /> {formatTime(seconds)}</div></div><div className="road-potential"><span>رصيدك الحالي</span><b>{potentialScore}</b><small>نقطة محتملة — بدون تلميحات</small></div><div className="road-timeline-heading"><span>سهم المسيرة</span><small>استنتج اللاعب من المسيرة المتاحة</small></div><div className="road-timeline">{visibleTimeline.map((node) => <div className={`road-timeline-node ${node.club === "؟" ? "hidden" : "revealed"}`} key={`${node.year}-${node.club}`}><strong>{node.year}</strong><span>{node.club}</span><small>{node.country}{node.rating ? ` · ${node.rating}` : ""}</small></div>)}</div><div className="road-guess-card"><label htmlFor="road-guess">من هو اللاعب؟</label><div className="road-input-row"><input id="road-guess" value={guess} onChange={(event) => setGuess(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") submitGuess(); }} placeholder="اكتب الاسم بالعربي أو الإنجليزي" autoComplete="off" /><button type="button" onClick={submitGuess}>خمن</button></div>{feedback && <p className={feedback.startsWith("صح") ? "correct" : "wrong"}>{feedback}</p>}</div><div className="road-play-footer"><span><Flame /> {streak} Streak</span><span>{wrongGuesses ? `-${wrongGuesses * 5} خصم` : "كل محاولة محسوبة"}</span></div></section>
  </main>;
}
