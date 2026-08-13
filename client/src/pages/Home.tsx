import { useEffect, useMemo, useState } from "react";
import { CircleDollarSign, Crown, Goal, Gavel, LockKeyhole, Medal, RefreshCw, Shield, Sparkles, Swords, Trophy, UsersRound } from "lucide-react";
import { buildAuctionRounds, formationSlots, playerCatalogue, type AuctionRound, type PositionCode } from "@/lib/auctionData";
import { canPlaceBid, createTeams, simulateDraftMatch, squadValue, teamStrength, totalSpent, type AuctionTeam } from "@/lib/auctionLogic";

type Award = { round: AuctionRound; winner: number; loser: number; price: number };
type Screen = "auction" | "final" | "match";

const positionLabel: Record<PositionCode, string> = { GK: "GK", CB: "CB", RB: "RB", LB: "LB", CM: "CM", CAM: "CAM", RW: "RW", LW: "LW", ST: "ST" };

const money = (value: number) => `${value}M`;

export default function Home() {
  const [teams, setTeams] = useState<AuctionTeam[]>(createTeams);
  const [rounds, setRounds] = useState<AuctionRound[]>(() => buildAuctionRounds());
  const [roundIndex, setRoundIndex] = useState(0);
  const [currentBid, setCurrentBid] = useState<number | null>(null);
  const [leader, setLeader] = useState<number | null>(null);
  const [passed, setPassed] = useState<[boolean, boolean]>([false, false]);
  const [award, setAward] = useState<Award | null>(null);
  const [screen, setScreen] = useState<Screen>("auction");
  const [match, setMatch] = useState<ReturnType<typeof simulateDraftMatch> | null>(null);

  const round = rounds[roundIndex];
  const remainingRounds = rounds.length - roundIndex - 1;
  const bidAmount = currentBid ?? round.startPrice;
  const canAward = leader !== null && passed[1 - leader];
  const roundProgress = ((roundIndex + 1) / rounds.length) * 100;

  const teamAuctionCounts = useMemo(() => teams.map((team) => team.players.filter((player) => player.source === "auction").length), [teams]);
  const teamHiddenCounts = useMemo(() => teams.map((team) => team.players.filter((player) => player.source === "hidden").length), [teams]);

  useEffect(() => {
    if (!award) return;
    const timer = window.setTimeout(() => {
      if (roundIndex === rounds.length - 1) {
        setScreen("final");
      } else {
        setRoundIndex((index) => index + 1);
        setCurrentBid(null);
        setLeader(null);
        setPassed([false, false]);
      }
      setAward(null);
    }, 2700);
    return () => window.clearTimeout(timer);
  }, [award, roundIndex, rounds.length]);

  const placeBid = (teamIndex: number) => {
    if (award || passed[teamIndex] || leader === teamIndex) return;
    const next = currentBid === null ? round.startPrice : currentBid + 1;
    if (!canPlaceBid(teams[teamIndex], next, remainingRounds)) return;
    setCurrentBid(next);
    setLeader(teamIndex);
  };

  const pass = (teamIndex: number) => {
    if (award || passed[teamIndex] || leader === teamIndex) return;
    const other = teamIndex === 0 ? 1 : 0;
    setPassed((state) => teamIndex === 0 ? [true, state[1]] : [state[0], true]);
    if (leader === null && canPlaceBid(teams[other], round.startPrice, remainingRounds)) {
      setLeader(other);
      setCurrentBid(round.startPrice);
    }
  };

  const awardRound = () => {
    if (leader === null || !canAward) return;
    const loser = leader === 0 ? 1 : 0;
    const paid = currentBid ?? round.startPrice;
    setTeams((state) => state.map((team, index) => {
      if (index === leader) return { ...team, budget: team.budget - paid, players: [...team.players, { ...round.auction, position: round.position, paid, source: "auction" }] };
      return { ...team, players: [...team.players, { ...round.hidden, position: round.position, paid: 0, source: "hidden" }] };
    }));
    setAward({ round, winner: leader, loser, price: paid });
  };

  const resetGame = () => {
    setTeams(createTeams());
    setRounds(buildAuctionRounds(Date.now()));
    setRoundIndex(0);
    setCurrentBid(null);
    setLeader(null);
    setPassed([false, false]);
    setAward(null);
    setMatch(null);
    setScreen("auction");
  };

  const simulateFinal = () => {
    setMatch(simulateDraftMatch(teams[0], teams[1]));
    setScreen("match");
  };

  if (screen === "final") return <FinalResults teams={teams} auctionCounts={teamAuctionCounts} hiddenCounts={teamHiddenCounts} onSimulate={simulateFinal} onReset={resetGame} />;
  if (screen === "match" && match) return <MatchResults teams={teams} match={match} onReset={resetGame} />;

  return <main className="auction-app" dir="rtl">
    <div className="noise" /><div className="spotlight spotlight-one" /><div className="spotlight spotlight-two" />
    <header className="auction-header">
      <div className="brand-lockup"><span className="brand-icon"><Gavel /></span><div><b>المزاد</b><small>AL MZAD · FOOTBALL DRAFT</small></div></div>
      <div className="header-rule"><span>LIVE AUCTION</span><i /><span>SEASON ONE</span></div>
      <button className="reset-button" onClick={resetGame}><RefreshCw /> إعادة اللعبة</button>
    </header>

    <section className="auction-intro">
      <div><p className="micro-title"><Sparkles /> DRAFT ROOM 01</p><h1>ارفع السعر.<br /><em>واكسب المخاطرة.</em></h1><p className="catalogue-note"><UsersRound /> كتالوج اللعبة: <b>{playerCatalogue.length}</b> لاعباً · حاليون وأساطير · 9 مراكز</p></div>
      <div className="round-tracker"><div><span>الجولة الحالية</span><b>{String(roundIndex + 1).padStart(2, "0")} <i>/ {rounds.length}</i></b></div><div className="progress-line"><i style={{ width: `${roundProgress}%` }} /></div><small>{round.label} · {round.position}</small></div>
    </section>

    <section className="budget-board">
      {teams.map((team, index) => <TeamBudget key={team.id} team={team} accent={index === 0 ? "lime" : "sky"} />)}
    </section>

    <section className="auction-layout">
      <SquadBoard team={teams[0]} accent="lime" />
      <article className="auction-stage">
        <div className="stage-topline"><span className="position-chip">{round.position} <i>{round.label}</i></span><span className="live-status"><i /> المزاد مفتوح</span></div>
        <div className="player-hero"><div className={`tier-ring ${round.auction.tier.toLowerCase()}`}><span>{round.auction.rating}</span><small>OVR</small></div><p className="tier-label">{round.auction.tier}</p><h2>{round.auction.name}</h2><span>{round.auction.note}</span></div>
        <div className="price-panel"><span>السعر الحالي</span><strong>{money(bidAmount)}</strong><small>سعر البداية: {money(round.startPrice)}</small></div>
        <div className="hidden-player"><span className="lock-orb"><LockKeyhole /></span><div><b>اللاعب الخفي</b><small>سيتم الكشف عنه بعد حسم المزاد</small></div><i>?</i></div>
        <div className="bidding-grid">
          {teams.map((team, index) => {
            const nextBid = currentBid === null ? round.startPrice : currentBid + 1;
            const eligible = !award && !passed[index] && leader !== index && canPlaceBid(team, nextBid, remainingRounds);
            return <button key={team.id} className={`bid-button ${index === 0 ? "lime" : "sky"} ${leader === index ? "leading" : ""}`} disabled={!eligible} onClick={() => placeBid(index)}><span>{leader === index ? "أنت متصدر المزاد" : currentBid === null ? `ابدأ بـ ${money(round.startPrice)}` : `ارفع إلى ${money(nextBid)}`}</span><b>{team.name}</b></button>;
          })}
        </div>
        <div className="auction-actions"><button className="pass-button" disabled={Boolean(award) || passed[0] || leader === 0} onClick={() => pass(0)}>علي مختار · انسحاب</button><button className="award-button" disabled={!canAward || Boolean(award)} onClick={awardRound}><Trophy /> حسم المزاد</button><button className="pass-button" disabled={Boolean(award) || passed[1] || leader === 1} onClick={() => pass(1)}>حسين إيهاب · انسحاب</button></div>
        <p className="auction-hint">{leader === null ? "ابدأ المزايدة — القرار الأول يغيّر شكل التشكيلة." : canAward ? "انسحب المنافس. يمكنك الآن حسم المزاد." : `المتصدر: ${teams[leader].name} · انتظر رد المنافس.`}</p>
        {award && <AwardReveal award={award} teams={teams} />}
      </article>
      <SquadBoard team={teams[1]} accent="sky" />
    </section>
  </main>;
}

function TeamBudget({ team, accent }: { team: AuctionTeam; accent: "lime" | "sky" }) {
  return <article className={`team-budget ${accent}`}><div className="team-avatar">{team.name.split(" ").map((part) => part[0]).join("")}</div><div className="team-meta"><small>{team.id === "ali" ? "الفريق الأول" : "الفريق الثاني"}</small><h3>{team.name}</h3><span>{team.players.length} / 11 لاعباً</span></div><div className="budget-number"><small>الميزانية</small><strong>{money(team.budget)}</strong></div><div className="team-spent"><span>تم صرف {money(totalSpent(team))}</span><i style={{ width: `${totalSpent(team)}%` }} /></div></article>;
}

function SquadBoard({ team, accent }: { team: AuctionTeam; accent: "lime" | "sky" }) {
  return <aside className={`squad-board ${accent}`}><div className="squad-header"><div><span className="micro-title">4–3–3 SQUAD</span><h3>{team.name}</h3></div><strong>{teamStrength(team) || "—"}<small>OVR</small></strong></div><div className="squad-list">{formationSlots.map((slot, index) => { const player = team.players[index]; return <div className={`squad-row ${player ? "filled" : ""}`} key={`${slot}-${index}`}><span>{positionLabel[slot]}</span><div>{player ? <><b>{player.name}</b><small>{player.source === "hidden" ? "هدية خفية" : `${money(player.paid)} · مزاد`}</small></> : <small>في انتظار الجولة</small>}</div>{player && <i>{player.rating}</i>}</div>; })}</div><div className="squad-footer"><span><CircleDollarSign /> المتبقي</span><b>{money(team.budget)}</b></div></aside>;
}

function AwardReveal({ award, teams }: { award: Award; teams: AuctionTeam[] }) {
  return <div className="award-reveal"><div className="award-glow" /><div className="award-grid"><div><span className="reveal-kicker"><Crown /> الفائز بالمزاد</span><h3>{teams[award.winner].name}</h3><p>حصل على <b>{award.round.auction.name}</b> مقابل <strong>{money(award.price)}</strong></p></div><div className="versus-reveal">VS</div><div><span className="reveal-kicker gift"><Sparkles /> تم كشف اللاعب الخفي</span><h3>{teams[award.loser].name}</h3><p>حصل على <b>{award.round.hidden.name}</b> <strong>مجاناً</strong></p></div></div></div>;
}

function FinalResults({ teams, auctionCounts, hiddenCounts, onSimulate, onReset }: { teams: AuctionTeam[]; auctionCounts: number[]; hiddenCounts: number[]; onSimulate: () => void; onReset: () => void }) {
  return <main className="auction-app final-screen" dir="rtl"><div className="noise" /><header className="auction-header"><div className="brand-lockup"><span className="brand-icon"><Gavel /></span><div><b>المزاد</b><small>FINAL DRAFT</small></div></div><button className="reset-button" onClick={onReset}><RefreshCw /> لعبة جديدة</button></header><section className="final-hero"><p className="micro-title"><Trophy /> ALL ROUNDS COMPLETE</p><h1>اكتملت التشكيلتان.<br /><em>حان وقت الحسم.</em></h1><p>تم توزيع 22 لاعباً بين المزاد والهدية الخفية. راجع التشكيلتين قبل محاكاة المباراة.</p></section><section className="final-squads">{teams.map((team, index) => <article className={`final-team ${index === 0 ? "lime" : "sky"}`} key={team.id}><div className="final-team-head"><div><span>{team.name}</span><b>{money(team.budget)} متبقي</b></div><strong>{teamStrength(team)}<small>TEAM OVR</small></strong></div><div className="final-team-stats"><span><b>{auctionCounts[index]}</b> من المزاد</span><span><b>{hiddenCounts[index]}</b> لاعب خفي</span><span><b>{money(squadValue(team))}</b> قيمة مدفوعة</span></div><div className="final-list">{team.players.map((player) => <div key={player.name}><span>{player.position}</span><b>{player.name}</b><small>{player.source === "hidden" ? "مجاناً" : money(player.paid)}</small><i>{player.rating}</i></div>)}</div></article>)}</section><button className="simulate-button" onClick={onSimulate}><Swords /><span>محاكاة المباراة النهائية</span><small>قوة اللاعبين · توازن التشكيلة · عامل مفاجأة</small></button></main>;
}

function MatchResults({ teams, match, onReset }: { teams: AuctionTeam[]; match: ReturnType<typeof simulateDraftMatch>; onReset: () => void }) {
  return <main className="auction-app final-screen" dir="rtl"><div className="noise" /><header className="auction-header"><div className="brand-lockup"><span className="brand-icon"><Gavel /></span><div><b>المزاد</b><small>FINAL MATCH</small></div></div><button className="reset-button" onClick={onReset}><RefreshCw /> ابدأ لعبة جديدة</button></header><section className="match-hero"><p className="micro-title"><Goal /> SIMULATION COMPLETE</p><div className="final-score"><div><span>{teams[0].name}</span><b>{teamStrength(teams[0])} OVR</b></div><strong>{match.homeGoals}<i>—</i>{match.awayGoals}</strong><div><span>{teams[1].name}</span><b>{teamStrength(teams[1])} OVR</b></div></div><div className="motm"><Medal /><div><small>رجل المباراة</small><b>{match.manOfTheMatch}</b></div></div></section><section className="match-report"><article className="goal-feed"><div className="report-head"><span>GOAL TIMELINE</span><h2>أهداف اللقاء</h2></div>{match.events.length ? match.events.map((event, index) => <div className={`goal-event ${event.team === 0 ? "home" : "away"}`} key={`${event.minute}-${index}`}><span>{event.minute}'</span><Goal /><div><b>{event.scorer}</b><small>{event.assist ? `تمريرة حاسمة: ${event.assist}` : "هدف من اللعب"}</small></div></div>) : <div className="no-goals">مباراة تكتيكية بلا أهداف — الحراس تفوقوا.</div>}</article><article className="match-stats"><div className="report-head"><span>DATA ROOM</span><h2>إحصاءات المباراة</h2></div><Stat label="الاستحواذ" home={`${match.homeStats.possession}%`} away={`${match.awayStats.possession}%`} ratio={match.homeStats.possession} /><Stat label="التسديدات" home={match.homeStats.shots} away={match.awayStats.shots} ratio={(match.homeStats.shots / (match.homeStats.shots + match.awayStats.shots)) * 100} /><Stat label="على المرمى" home={match.homeStats.onTarget} away={match.awayStats.onTarget} ratio={(match.homeStats.onTarget / (match.homeStats.onTarget + match.awayStats.onTarget)) * 100} /><Stat label="الفرص الخطيرة" home={match.homeStats.chances} away={match.awayStats.chances} ratio={(match.homeStats.chances / (match.homeStats.chances + match.awayStats.chances)) * 100} /></article></section></main>;
}

function Stat({ label, home, away, ratio }: { label: string; home: string | number; away: string | number; ratio: number }) { return <div className="match-stat"><b>{home}</b><div><span>{label}</span><i><em style={{ width: `${ratio}%` }} /></i></div><b>{away}</b></div>; }
