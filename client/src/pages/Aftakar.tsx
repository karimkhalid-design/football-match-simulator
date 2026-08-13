import React, { useMemo, useState } from "react";
import { ArrowRight, Check, ChevronLeft, RotateCcw, Sparkles, Trophy, X } from "lucide-react";
import { playerCatalogue, positionLabels } from "../lib/auctionData";
import { AFTAKAR_BANK_SIZE, buildAftakarSession } from "../lib/aftakarData";
import { PLAYER_IMAGE_URLS } from "../lib/playerImageMap";

const AFTAKAR_LOGO_URL = "/manus-storage/aftakar-logo_c6bb6361.png";

const normalize = (value: string) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "");

const getPlayer = (name: string) => playerCatalogue.find((player) => player.name === name);

export default function Aftakar({ onBackToHub }: { onBackToHub: () => void }) {
  const [rounds, setRounds] = useState(() => buildAftakarSession(2026));
  const [sessionSeed, setSessionSeed] = useState(2026);
  const [roundIndex, setRoundIndex] = useState(0);
  const [clueIndex, setClueIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const round = rounds[roundIndex];
  const player = useMemo(() => getPlayer(round.playerName), [round.playerName]);
  const answered = selectedAnswer !== null;
  const correct = selectedAnswer !== null && normalize(selectedAnswer) === normalize(round.playerName);
  const pointsForRound = 1000 - clueIndex * 300;

  const chooseAnswer = (answer: string) => {
    const trimmedAnswer = answer.trim();
    if (answered || !trimmedAnswer) return;
    setSelectedAnswer(trimmedAnswer);
    if (normalize(trimmedAnswer) === normalize(round.playerName)) setScore((current) => current + pointsForRound);
  };

  const submitTypedAnswer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    chooseAnswer(typedAnswer);
  };

  const revealClue = () => {
    if (clueIndex < 2 && !answered) setClueIndex((current) => current + 1);
  };

  const nextRound = () => {
    if (roundIndex === rounds.length - 1) {
      setFinished(true);
      return;
    }
    setRoundIndex((current) => current + 1);
    setClueIndex(0);
    setSelectedAnswer(null);
    setTypedAnswer("");
  };

  const restart = () => {
    const nextSeed = sessionSeed + 1;
    setSessionSeed(nextSeed);
    setRounds(buildAftakarSession(nextSeed));
    setRoundIndex(0);
    setClueIndex(0);
    setSelectedAnswer(null);
    setTypedAnswer("");
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <main className="aftakar-page" dir="rtl">
        <div className="aftakar-glow aftakar-glow-one" /><div className="aftakar-glow aftakar-glow-two" />
        <header className="aftakar-header"><button className="aftakar-back" onClick={onBackToHub}><ArrowRight /> كل الألعاب</button><img src={AFTAKAR_LOGO_URL} alt="شعار أفتكر" /></header>
        <section className="aftakar-finish">
          <span className="aftakar-finish-icon"><Trophy /></span>
          <p className="aftakar-eyebrow">انتهت اللعبة</p>
          <h1>ذاكرتك الكروية <em>قوية.</em></h1>
          <p className="aftakar-finish-copy">أنهيت كل الجولات وحصلت على نتيجتك النهائية.</p>
          <div className="aftakar-score"><small>مجموع النقاط</small><strong>{score.toLocaleString("ar-EG")}</strong><span>من {rounds.length * 1000} نقطة</span></div>
          <div className="aftakar-finish-actions"><button className="aftakar-primary" onClick={restart}><RotateCcw /> العب من جديد</button><button className="aftakar-secondary" onClick={onBackToHub}>العودة للألعاب</button></div>
        </section>
        <footer className="aftakar-footer">أفتكر · صناعة كريم</footer>
      </main>
    );
  }

  return (
    <main className="aftakar-page" dir="rtl">
      <div className="aftakar-noise" /><div className="aftakar-glow aftakar-glow-one" /><div className="aftakar-glow aftakar-glow-two" />
      <header className="aftakar-header"><button className="aftakar-back" onClick={onBackToHub}><ArrowRight /> كل الألعاب</button><div className="aftakar-header-brand"><span>FOOTBALL MEMORY GAME</span><img src={AFTAKAR_LOGO_URL} alt="شعار أفتكر" /></div><div className="aftakar-score-pill"><Trophy /> {score.toLocaleString("ar-EG")}</div></header>

      <section className="aftakar-intro"><div><p className="aftakar-eyebrow"><Sparkles /> افتكر اللاعب</p><h1>مين <em>ده؟</em></h1><p>اقرأ التلميحات الصعبة، اختار اللاعب الصح، واجمع أكبر عدد من النقاط.</p><small className="aftakar-bank-note">بنك الأسئلة: {AFTAKAR_BANK_SIZE} لاعباً وسؤالاً متنوعاً</small></div><div className="aftakar-progress"><span>الجولة {roundIndex + 1} من {rounds.length}</span><div><i style={{ width: `${((roundIndex + 1) / rounds.length) * 100}%` }} /></div></div></section>

      <section className="aftakar-game-layout">
        <div className="aftakar-player-card">
          {answered ? <img src={PLAYER_IMAGE_URLS[round.playerName]} alt={round.playerName} /> : <div className="aftakar-mystery"><span>?</span><small>مين اللاعب؟</small></div>}
          <div className="aftakar-player-card-bottom"><span>{answered ? `${positionLabels[player?.position ?? "ST"]} · تقييم ${player?.rating ?? "—"}` : "الصورة تظهر بعد الإجابة"}</span><b>{answered ? round.playerName : "لاعب مجهول"}</b></div>
        </div>
        <div className="aftakar-question-panel">
          <div className="aftakar-clue-head"><span>التلميح {clueIndex + 1}</span><b>{pointsForRound} نقطة</b></div>
          <div className="aftakar-clue"><span className="aftakar-clue-number">0{clueIndex + 1}</span><p>{round.clues[clueIndex]}</p></div>
          {!answered && clueIndex < 2 && <button className="aftakar-clue-button" onClick={revealClue}>تلميح إضافي <ChevronLeft /></button>}
          <form className="aftakar-answer-form" onSubmit={submitTypedAnswer}>
            <label htmlFor="aftakar-answer">اكتب اسم اللاعب</label>
            <div><input id="aftakar-answer" value={typedAnswer} onChange={(event) => setTypedAnswer(event.target.value)} placeholder="مثال: Lionel Messi" disabled={answered} /><button type="submit" disabled={answered || !typedAnswer.trim()}>تخمين</button></div>
          </form>
          <div className="aftakar-options" aria-label="اختيارات اللاعبين">
            {round.options.map((option) => {
              const isCorrect = option === round.playerName;
              const isWrong = selectedAnswer === option && !isCorrect;
              return <button key={option} className={`aftakar-option ${answered && isCorrect ? "correct" : ""} ${answered && isWrong ? "wrong" : ""}`} onClick={() => chooseAnswer(option)} disabled={answered}><span>{option}</span>{answered && isCorrect && <Check />}{answered && isWrong && <X />}</button>;
            })}
          </div>
          {answered && <div className={`aftakar-feedback ${correct ? "success" : "failure"}`}><span>{correct ? <Check /> : <X />}</span><div><b>{correct ? `إجابة صحيحة! +${pointsForRound} نقطة` : "مش هي دي الإجابة"}</b><small>{correct ? "ذاكرة ممتازة، كمل بنفس التركيز." : `الإجابة الصحيحة هي ${round.playerName}.`}</small></div><button onClick={nextRound}>{roundIndex === rounds.length - 1 ? "النتيجة" : "الجولة التالية"} <ArrowRight /></button></div>}
        </div>
      </section>
      <footer className="aftakar-footer"><span>أفتكر · صناعة كريم</span><span>كل إجابة صح تقرّبك من القمة</span></footer>
    </main>
  );
}
