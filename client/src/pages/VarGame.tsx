import React, { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, Clock3, Eye, Flag, RotateCcw, ShieldAlert, Trophy, Tv, Volume2, X, Zap } from "lucide-react";
import { VarDecision, VarRound, VAR_DECISIONS, getRoundTypeLabel, varRounds } from "../lib/varData";

const VAR_LOGO_URL = "/manus-storage/4A3546B6-12EE-496E-B7CF-41A005590FB6_5eea2af3.png";
type Phase = "setup" | "watch" | "discussion" | "var" | "decision" | "result" | "finished";
type VarGameProps = { onBackToHub: () => void };

const defaultNames = ["لاعب ١", "لاعب ٢", "لاعب ٣", "لاعب ٤", "لاعب ٥", "لاعب ٦", "لاعب ٧", "لاعب ٨", "لاعب ٩", "لاعب ١٠"];
const emptyPredictions = (names: string[]) => Object.fromEntries(names.map((name) => [name, ""])) as Record<string, string>;
const decisionLabel = (round: VarRound) => round.type === "change" ? "هل يتغير القرار؟" : "إيه قرار الحكم؟";

export default function VarGame({ onBackToHub }: VarGameProps) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "VAR و لا لأ؟";
    return () => { document.title = previousTitle || "كوره كده"; };
  }, []);
  const [phase, setPhase] = useState<Phase>("setup");
  const [playerCount, setPlayerCount] = useState(4);
  const [names, setNames] = useState(defaultNames.slice(0, 4));
  const [roundIndex, setRoundIndex] = useState(0);
  const [seconds, setSeconds] = useState(60);
  const [varSeconds, setVarSeconds] = useState(5);
  const [selectedDecision, setSelectedDecision] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<Record<string, string>>({});
  const [scores, setScores] = useState<Record<string, number>>({});
  const [roundScored, setRoundScored] = useState(false);

  const round = varRounds[roundIndex];
  const judge = names[roundIndex % names.length];
  const sortedScores = useMemo(() => names.map((name) => ({ name, score: scores[name] ?? 0 })).sort((a, b) => b.score - a.score), [names, scores]);
  const correctDecision = round.type === "change" ? round.changeAnswer : round.correctAnswer;
  const isCorrect = selectedDecision === correctDecision;
  const pointsFor = (name: string) => predictions[name] === correctDecision ? 100 : 0;

  useEffect(() => {
    if (phase !== "discussion" || seconds <= 0) return;
    const timer = window.setInterval(() => setSeconds((current) => Math.max(0, current - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [phase, seconds]);

  useEffect(() => {
    if (phase === "discussion" && seconds === 0) setPhase("var");
  }, [phase, seconds]);

  useEffect(() => {
    if (phase !== "var" || varSeconds <= 0) return;
    const timer = window.setInterval(() => setVarSeconds((current) => Math.max(0, current - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [phase, varSeconds]);

  useEffect(() => {
    if (phase === "var" && varSeconds === 0) setPhase("decision");
  }, [phase, varSeconds]);

  const changeCount = (nextCount: number) => {
    setPlayerCount(nextCount);
    setNames((current) => Array.from({ length: nextCount }, (_, index) => current[index] || defaultNames[index]));
  };

  const startGame = () => {
    const cleaned = names.map((name, index) => name.trim() || defaultNames[index]);
    setNames(cleaned);
    setScores(Object.fromEntries(cleaned.map((name) => [name, 0])));
    setPredictions(emptyPredictions(cleaned));
    setRoundIndex(0);
    setPhase("watch");
  };

  const watchClip = () => { setSeconds(60); setPhase("discussion"); };
  const openVar = () => { setVarSeconds(5); setPhase("var"); };
  const updatePrediction = (name: string, answer: string) => setPredictions((current) => ({ ...current, [name]: answer }));

  const chooseDecision = (decision: string) => {
    if (roundScored) return;
    setSelectedDecision(decision);
    const correctPlayers = names.filter((name) => predictions[name] === correctDecision);
    const bonusName = correctPlayers.length === 1 ? correctPlayers[0] : null;
    setScores((current) => Object.fromEntries(names.map((name) => [name, (current[name] ?? 0) + pointsFor(name) + (name === bonusName ? 200 : 0)])));
    setRoundScored(true);
    setPhase("result");
  };

  const nextRound = () => {
    if (roundIndex >= varRounds.length - 1) { setPhase("finished"); return; }
    setRoundIndex((current) => current + 1);
    setSelectedDecision(null);
    setPredictions(emptyPredictions(names));
    setRoundScored(false);
    setSeconds(60);
    setVarSeconds(5);
    setPhase("watch");
  };

  const restart = () => {
    setPhase("setup");
    setRoundIndex(0);
    setSelectedDecision(null);
    setPredictions({});
    setScores({});
    setRoundScored(false);
  };

  if (phase === "setup") return <main className="var-page" dir="rtl"><div className="var-grid" /><header className="var-header"><button className="var-back" onClick={onBackToHub}><ArrowRight /> كل الألعاب</button><img src={VAR_LOGO_URL} alt="شعار VAR و لا لأ؟" /></header><section className="var-setup"><div className="var-setup-art"><img src={VAR_LOGO_URL} alt="VAR و لا لأ؟" /></div><p className="var-kicker"><ShieldAlert /> لعبة الصحاب · موبايل واحد</p><h1>VAR <span>و لا لأ؟</span></h1><p className="var-tagline">شوف اللقطة… خد قرارك</p><p className="var-copy">الموبايل هو شاشة الـVAR. الحكم يمسكه، والباقي يتناقشوا بصوتهم لحد لحظة القرار.</p><div className="var-count-picker"><b>عدد اللاعبين</b><div>{Array.from({ length: 9 }, (_, index) => index + 2).map((count) => <button key={count} className={playerCount === count ? "active" : ""} onClick={() => changeCount(count)}>{count}</button>)}</div></div><div className="var-name-grid">{names.map((name, index) => <label key={index}>لاعب {index + 1}<input value={name} onChange={(event) => setNames((current) => current.map((currentName, nameIndex) => nameIndex === index ? event.target.value : currentName))} /></label>)}</div><button className="var-primary var-start" onClick={startGame}><Zap /> ابدأ اللعبة</button></section><footer className="var-footer">VAR و لا لأ؟ · صناعة كريم</footer></main>;

  if (phase === "finished") return <main className="var-page" dir="rtl"><div className="var-grid" /><header className="var-header"><button className="var-back" onClick={onBackToHub}><ArrowRight /> كل الألعاب</button><img src={VAR_LOGO_URL} alt="شعار VAR و لا لأ؟" /></header><section className="var-finish"><span className="var-finish-icon"><Trophy /></span><p className="var-kicker">صافرة النهاية</p><h1>مين <span>خبير VAR؟</span></h1><div className="var-leaderboard">{sortedScores.map((entry, index) => <div key={entry.name} className={index === 0 ? "winner" : ""}><strong>{index + 1}</strong><span>{entry.name}</span><b>{entry.score}</b></div>)}</div><div className="var-titles"><span>🥇 {sortedScores[0]?.name}: خبير VAR</span><span>👁 {sortedScores[1]?.name ?? "الباقي"}: عين الصقر</span></div><button className="var-primary" onClick={restart}><RotateCcw /> لعبة جديدة</button></section></main>;

  const showDecisionControls = phase === "decision";
  const showPredictions = phase === "discussion" || phase === "var" || phase === "decision";
  return <main className="var-page" dir="rtl"><div className="var-grid" /><div className={`var-alert var-alert-${phase}`} />
    <header className="var-header"><button className="var-back" onClick={onBackToHub}><ArrowRight /> كل الألعاب</button><div className="var-header-brand"><span>VAR CONTROL ROOM</span><img src={VAR_LOGO_URL} alt="شعار VAR و لا لأ؟" /></div><div className="var-round-pill">{roundIndex + 1} / {varRounds.length}<i /></div></header>
    <section className="var-round-head"><div><p className="var-kicker"><Flag /> {round.badge}</p><h1>{round.title}</h1><p>{round.minute} · {getRoundTypeLabel(round.type)}</p></div><div className="var-judge"><small>الحكم الحالي</small><b>{judge}</b><span>يمسك الموبايل</span></div></section>
    <section className="var-main-card">
      <div className={`var-screen var-screen-${phase}`}><div className="var-screen-top"><span>LIVE REVIEW</span><span><i /> VAR ROOM</span></div>{phase === "watch" && <div className="var-scene"><Tv /><b>اللقطة جاهزة</b><small>{round.description}</small><button className="var-watch" onClick={watchClip}><Eye /> شاهد اللقطة</button></div>}{phase === "discussion" && <div className="var-scene"><div className="var-countdown"><Clock3 /><strong>{seconds}</strong><small>ثانية للنقاش</small></div><b>اتناقشوا… إيه قراركم؟</b><small>{round.description}</small><span className="var-live-note"><Volume2 /> الحكم فقط يستخدم الموبايل</span></div>}{phase === "var" && <div className="var-checking"><span className="var-replay-lines" /><Tv /><b>VAR CHECKING...</b><small>{round.varInfo}</small><div className="var-progress"><i /></div><strong>{varSeconds}</strong></div>}{(phase === "decision" || phase === "result") && <div className="var-review-result"><span className="var-replay-tag">REPLAY · SLOW MOTION</span><div className="var-fake-pitch"><span /><i /><b>PLAY</b></div><small>{round.varInfo}</small>{round.originalDecision && <em>قرار الحكم الأصلي: {round.originalDecision}</em>}</div>}</div>
      <div className="var-decision-panel">{phase === "watch" && <div className="var-panel-message"><ShieldAlert /><b>استنى يا حكم!</b><span>شغّل اللقطة الأول، وبعدها يبدأ وقت النقاش.</span></div>}{phase === "discussion" && <><div className="var-panel-title"><b>سجّل توقعات الصحاب</b><span>بعد ما تتفقوا، اختار توقع كل لاعب</span></div><PredictionGrid names={names} predictions={predictions} onChange={updatePrediction} options={round.options} /><button className="var-primary" onClick={openVar}><Tv /> افتح الـVAR</button></>}{phase === "var" && <div className="var-panel-message var-panel-checking"><ShieldAlert /><b>استنى يا حكم!</b><span>الإعادة البطيئة شغالة… الـVAR بيفحص كل زاوية.</span><button className="var-primary" onClick={() => setPhase("decision")}>انتقل للقرار</button></div>}{showDecisionControls && <><div className="var-panel-title"><b>{decisionLabel(round)}</b><span>الحكم يختار القرار النهائي</span></div><div className="var-decision-options">{round.options.map((option) => <button key={option} className="var-choice" onClick={() => chooseDecision(option)}><span>{option}</span><ArrowRight /></button>)}</div></>}{phase === "result" && <ResultPanel round={round} selected={selectedDecision} correct={isCorrect} onNext={nextRound} isLast={roundIndex === varRounds.length - 1} />}</div>
    </section>
    {showPredictions && <div className="var-prediction-strip"><span>توقعات الجولة</span>{names.map((name) => <b key={name}>{name}: {predictions[name] || "—"}</b>)}</div>}
    <footer className="var-footer"><span>VAR و لا لأ؟ · صناعة كريم</span><span>الجولة {roundIndex + 1} من {varRounds.length}</span></footer>
  </main>;
}

function PredictionGrid({ names, predictions, options, onChange }: { names: string[]; predictions: Record<string, string>; options: string[]; onChange: (name: string, answer: string) => void }) {
  return <div className="var-prediction-grid">{names.map((name) => <div key={name}><b>{name}</b><div>{options.map((option) => <button key={option} className={predictions[name] === option ? "selected" : ""} onClick={() => onChange(name, option)}>{option}</button>)}</div></div>)}</div>;
}

function ResultPanel({ round, selected, correct, onNext, isLast }: { round: VarRound; selected: string | null; correct: boolean; onNext: () => void; isLast: boolean }) {
  return <div className={`var-result-panel ${correct ? "correct" : "wrong"}`}><div className="var-result-icon">{correct ? <Check /> : <X />}</div><p className="var-kicker">قرار الحكم</p><h2>{selected}</h2><strong>{correct ? "🎯 قرار صحيح!" : "❌ قرار خاطئ!"}</strong><p><b>القرار الصحيح: {round.correctAnswer}</b><br />{round.explanation}</p><em>{round.comment}</em><button className="var-primary" onClick={onNext}>{isLast ? "صافرة النهاية" : "الجولة التالية"} <ArrowRight /></button></div>;
}
