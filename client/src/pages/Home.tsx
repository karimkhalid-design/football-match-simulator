import { useEffect, useMemo, useState } from "react";
import { trpc } from "@/lib/trpc";
import { filterPlayers } from "@/lib/playerFilters";
import { useLocation, useRoute } from "wouter";
import {
  Activity,
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  ChevronLeft,
  Clock3,
  Goal,
  ListFilter,
  LoaderCircle,
  Plus,
  Search,
  Shield,
  Shirt,
  SlidersHorizontal,
  Sparkles,
  Trophy,
  UsersRound,
  X,
  Zap,
} from "lucide-react";

type View = "match" | "database" | "builder" | "history" | "summary" | "player";
type Position = "GK" | "DF" | "MF" | "FW";
type Status = "active" | "retired";

const positionNames: Record<string, string> = { GK: "حارس", DF: "دفاع", MF: "وسط", FW: "هجوم" };
const eventLabels = { goal: "هدف", yellow: "بطاقة صفراء", red: "بطاقة حمراء", substitution: "تبديل", chance: "فرصة محققة" };

function TeamMark({ team, size = "md" }: { team: any; size?: "sm" | "md" | "lg" }) {
  return <span className={`team-mark ${size}`} style={{ "--team-colour": team.colour, "--team-accent": team.accent } as React.CSSProperties}>{team.shortName}</span>;
}

function EventGlyph({ type }: { type: keyof typeof eventLabels }) {
  if (type === "goal") return <Goal />;
  if (type === "yellow") return <span className="card-glyph yellow" />;
  if (type === "red") return <span className="card-glyph red" />;
  if (type === "substitution") return <ArrowLeft />;
  return <Zap />;
}

function EmptyState({ icon: Icon, title, copy }: { icon: typeof Activity; title: string; copy: string }) {
  return <div className="empty-state"><Icon /><strong>{title}</strong><span>{copy}</span></div>;
}

export default function Home() {
  const [isPlayerRoute, routeParams] = useRoute("/players/:id");
  const [, setLocation] = useLocation();
  const [view, setView] = useState<View>("match");
  const [homeId, setHomeId] = useState("real-madrid");
  const [awayId, setAwayId] = useState("manchester-city");
  const [playerSearch, setPlayerSearch] = useState("");
  const [positionFilter, setPositionFilter] = useState<Position | "all">("all");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [clubFilter, setClubFilter] = useState("all");
  const [nationalityFilter, setNationalityFilter] = useState("all");
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [homeLineup, setHomeLineup] = useState<string[]>([]);
  const [awayLineup, setAwayLineup] = useState<string[]>([]);
  const [builderSide, setBuilderSide] = useState<"home" | "away">("home");
  const [matchData, setMatchData] = useState<any>(null);
  const [liveIndex, setLiveIndex] = useState(0);

  const catalogueQuery = trpc.football.catalogue.useQuery();
  const historyQuery = trpc.football.history.useQuery(undefined, { refetchInterval: 10_000 });
  const routePlayerQuery = trpc.football.player.useQuery({ id: routeParams?.id ?? "" }, { enabled: isPlayerRoute && Boolean(routeParams?.id) });
  const archivedMatchQuery = trpc.football.match.useQuery({ id: selectedMatchId ?? "" }, { enabled: Boolean(selectedMatchId) });
  const simulate = trpc.football.simulate.useMutation({
    onSuccess: (data) => {
      setMatchData(data);
      setSelectedMatchId(null);
      setLiveIndex(0);
      setView("match");
      historyQuery.refetch();
    },
  });

  const catalogue = catalogueQuery.data;
  const teams = catalogue?.teams ?? [];
  const players = catalogue?.players ?? [];
  const homeTeam = teams.find((team: any) => team.id === homeId) ?? teams[0];
  const awayTeam = teams.find((team: any) => team.id === awayId) ?? teams[1];
  const homeTeamPlayers = useMemo(() => players.filter((player: any) => player.teamId === homeId), [players, homeId]);
  const awayTeamPlayers = useMemo(() => players.filter((player: any) => player.teamId === awayId), [players, awayId]);
  const visibleHomeIds = homeLineup.length ? homeLineup : homeTeamPlayers.map((player: any) => player.id);
  const visibleAwayIds = awayLineup.length ? awayLineup : awayTeamPlayers.map((player: any) => player.id);
  const visibleHome = players.filter((player: any) => visibleHomeIds.includes(player.id));
  const visibleAway = players.filter((player: any) => visibleAwayIds.includes(player.id));
  const clubs = useMemo(() => Array.from(new Set(players.map((player: any) => player.club))).sort(), [players]);
  const nationalities = useMemo(() => Array.from(new Set(players.map((player: any) => player.nationality))).sort(), [players]);
  const filteredPlayers = useMemo(() => filterPlayers(players, {
    search: playerSearch,
    position: positionFilter,
    status: statusFilter,
    club: clubFilter,
    nationality: nationalityFilter,
  }), [players, playerSearch, positionFilter, statusFilter, clubFilter, nationalityFilter]);
  const archivedSummary = useMemo(() => {
    const record: any = archivedMatchQuery.data;
    if (!record) return null;
    const homeTeam = teams.find((team: any) => team.id === record.homeTeamId);
    const awayTeam = teams.find((team: any) => team.id === record.awayTeamId);
    if (!homeTeam || !awayTeam) return null;
    const pick = (ids: unknown, teamId: string) => Array.isArray(ids) && ids.length ? players.filter((player: any) => ids.includes(player.id)) : players.filter((player: any) => player.teamId === teamId);
    return { id: record.id, homeTeam, awayTeam, homeSelection: pick(record.homeLineupIds, record.homeTeamId), awaySelection: pick(record.awayLineupIds, record.awayTeamId), result: record.matchStats };
  }, [archivedMatchQuery.data, teams, players]);
  const activeSummary = selectedMatchId ? archivedSummary : matchData;

  const events = matchData?.result.events ?? [];
  const revealedEvents = events.slice(0, liveIndex);
  const isComplete = matchData && liveIndex >= events.length;
  const homeLiveScore = revealedEvents.filter((event: any) => event.team === "home" && event.type === "goal").length;
  const awayLiveScore = revealedEvents.filter((event: any) => event.team === "away" && event.type === "goal").length;
  const liveMinute = Math.min(90, revealedEvents.at(-1)?.minute ?? 0);

  useEffect(() => {
    if (!matchData || liveIndex >= events.length) return;
    const timer = window.setTimeout(() => setLiveIndex((index) => index + 1), 880);
    return () => window.clearTimeout(timer);
  }, [matchData, liveIndex, events.length]);

  useEffect(() => {
    if (!teams.length) return;
    if (!teams.some((team: any) => team.id === homeId)) setHomeId(teams[0].id);
    if (!teams.some((team: any) => team.id === awayId)) setAwayId(teams[1]?.id ?? teams[0].id);
  }, [teams, homeId, awayId]);

  useEffect(() => {
    if (isPlayerRoute && routePlayerQuery.data) {
      setSelectedPlayer(routePlayerQuery.data);
      setView("player");
    }
  }, [isPlayerRoute, routePlayerQuery.data]);

  const startSimulation = () => {
    if (homeId === awayId) return;
    simulate.mutate({ homeTeamId: homeId, awayTeamId: awayId, homePlayerIds: homeLineup.length ? homeLineup : undefined, awayPlayerIds: awayLineup.length ? awayLineup : undefined });
  };

  const openPlayer = (player: any) => {
    setSelectedPlayer(player);
    setView("player");
    setLocation(`/players/${player.id}`);
  };

  const openArchivedSummary = (id: string) => {
    setSelectedMatchId(id);
    setView("summary");
  };

  const chooseTeam = (side: "home" | "away", id: string) => {
    if (side === "home") {
      setHomeId(id);
      setHomeLineup([]);
    } else {
      setAwayId(id);
      setAwayLineup([]);
    }
  };

  const toggleBuilderPlayer = (id: string) => {
    const setter = builderSide === "home" ? setHomeLineup : setAwayLineup;
    const current = builderSide === "home" ? visibleHomeIds : visibleAwayIds;
    const isSelected = current.includes(id);
    if (isSelected) setter(current.filter((playerId) => playerId !== id));
    else if (current.length < 11) setter([...current, id]);
  };

  if (catalogueQuery.isLoading) {
    return <main className="loading-screen"><div><LoaderCircle className="spin" /><span>جارٍ تجهيز غرفة المحاكاة</span></div></main>;
  }

  return (
    <main className="app-shell" dir="rtl">
      <div className="ambient ambient-a" /><div className="ambient ambient-b" />
      <header className="topbar">
        <button className="brand" onClick={() => setView("match")} aria-label="العودة إلى المحاكاة">
          <span className="brand-mark"><Sparkles /></span><span><b>ELEVEN</b><em>SIMULATOR</em></span>
        </button>
        <nav className="nav-tabs" aria-label="التنقل الرئيسي">
          {[
            ["match", "المباراة", Activity], ["database", "اللاعبون", UsersRound], ["builder", "بناء التشكيلة", Shirt], ["history", "السجل", Clock3],
          ].map(([id, label, Icon]: any) => <button key={id} className={view === id ? "nav-tab active" : "nav-tab"} onClick={() => setView(id)}><Icon />{label}</button>)}
        </nav>
        <div className="season-note"><span>SEASON 26</span><i /><span>LIVE ENGINE</span></div>
      </header>

      <section className="masthead">
        <div><p className="eyebrow"><span /> FOOTBALL, REIMAGINED</p><h1>المباراة ليست نتيجة.<br /><i>إنها قصة تُبنى لحظةً بلحظة.</i></h1></div>
        <div className="catalogue-stat"><div className="catalogue-icon"><UsersRound /></div><div><b>{players.length}</b><span>ملف لاعب في الكتالوج</span></div><small>نشط + أساطير</small></div>
      </section>

      {view === "match" && <>
        <section className="match-console panel-surface">
          <div className="console-header"><div><span className="overline">MATCH LAB</span><h2>اضبط المواجهة التالية</h2></div><div className="formation-pill"><SlidersHorizontal /> 4–3–3 افتراضي</div></div>
          <div className="team-picker-grid">
            <TeamSelector label="المضيف" team={homeTeam} teams={teams} selected={homeId} onChoose={(id) => chooseTeam("home", id)} />
            <div className="versus"><span>VS</span><i>SIMULATION</i></div>
            <TeamSelector label="الضيف" team={awayTeam} teams={teams} selected={awayId} onChoose={(id) => chooseTeam("away", id)} />
          </div>
          {homeId === awayId && <p className="inline-error">اختر فريقين مختلفين لبدء المحاكاة.</p>}
          <div className="console-actions"><div className="lineup-status"><Shield /> <span>{homeLineup.length || 11} لاعباً للمضيف</span><i /> <span>{awayLineup.length || 11} لاعباً للضيف</span></div><button className="primary-action" onClick={startSimulation} disabled={simulate.isPending || homeId === awayId}>{simulate.isPending ? <LoaderCircle className="spin" /> : <PlayMark />}<span>{simulate.isPending ? "جارٍ توليد سيناريو المباراة" : "ابدأ المحاكاة"}</span><ArrowUpRight /></button></div>
        </section>

        <section className="live-grid">
          <article className="live-card panel-surface">
            <div className="live-head"><div><span className="overline">LIVE MATCH FEED</span><b>{matchData ? (isComplete ? "انتهت المباراة" : "المباراة جارية الآن") : "بانتظار صافرة البداية"}</b></div><div className={`live-badge ${matchData && !isComplete ? "pulsing" : ""}`}><i /> {matchData && !isComplete ? `${liveMinute}'` : isComplete ? "FT" : "READY"}</div></div>
            {matchData ? <LiveMatchBoard home={matchData.homeTeam} away={matchData.awayTeam} homeScore={homeLiveScore} awayScore={awayLiveScore} complete={isComplete} homeStrength={matchData.homeTeam.strength} awayStrength={matchData.awayTeam.strength} onSummary={() => setView("summary")} /> : <PreviewBoard home={homeTeam} away={awayTeam} />}
            <div className="timeline">
              {matchData ? revealedEvents.length ? revealedEvents.map((event: any, index: number) => <div className={`timeline-event ${event.team}`} key={`${event.minute}-${index}`}><span className="event-minute">{event.minute}'</span><span className="event-icon"><EventGlyph type={event.type} /></span><div><b>{event.player}</b><small>{eventLabels[event.type as keyof typeof eventLabels]} · {event.detail}</small></div></div>) : <EmptyState icon={Zap} title="جاهزون للانطلاق" copy="سيبدأ ظهور أحداث المباراة تدريجياً فور إطلاق المحاكاة." /> : <EmptyState icon={Activity} title="لوحة الأحداث الحية" copy="اختر الفريقين ثم ابدأ محاكاة لعرض الأهداف والبطاقات والتبديلات لحظة بلحظة." />}
            </div>
          </article>
          <aside className="side-column">
            <article className="form-card panel-surface"><div className="mini-head"><span>FORM GUIDE</span><ChevronLeft /></div><h3>نبض الفرق</h3>{[homeTeam, awayTeam].filter(Boolean).map((team: any) => <div className="form-team" key={team.id}><TeamMark team={team} size="sm" /><div><b>{team.name}</b><span>{team.status === "retired" ? "Legends archive" : "Active squad"}</span></div><strong>{team.strength}</strong></div>)}</article>
            <article className="insight-card"><Sparkles /><span>محرك الاحتمالات يحلل قوة التشكيلة وخصائص اللاعبين لصناعة سيناريو فريد في كل مباراة.</span><button onClick={() => setView("builder")}>خصص تشكيلتك <ArrowLeft /></button></article>
          </aside>
        </section>
      </>}

      {view === "database" && <section className="content-page"><PageHeader eyebrow="PLAYER VAULT" title="قاعدة بيانات اللاعبين" copy="ابحث داخل كتالوج اللاعبين النشطين والأساطير. افتح الملف للحصول على مؤشر الأداء ومحطات المسيرة." action={<span className="count-chip">{filteredPlayers.length} نتيجة</span>} />
        <div className="filters panel-surface"><div className="search-field"><Search /><input value={playerSearch} onChange={(event) => setPlayerSearch(event.target.value)} placeholder="ابحث بالاسم أو النادي أو الجنسية" /></div><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as Status | "all")}><option value="all">كل الحالات</option><option value="active">نشط</option><option value="retired">معتزل</option></select><select value={positionFilter} onChange={(event) => setPositionFilter(event.target.value as Position | "all")}><option value="all">كل المراكز</option>{Object.entries(positionNames).map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select><select value={nationalityFilter} onChange={(event) => setNationalityFilter(event.target.value)}><option value="all">كل الجنسيات</option>{nationalities.map((nationality) => <option key={nationality} value={nationality}>{nationality}</option>)}</select><select value={clubFilter} onChange={(event) => setClubFilter(event.target.value)}><option value="all">كل الأندية</option>{clubs.map((club) => <option key={club} value={club}>{club}</option>)}</select><button className="filter-reset" onClick={() => { setPlayerSearch(""); setPositionFilter("all"); setStatusFilter("all"); setClubFilter("all"); setNationalityFilter("all"); }}><ListFilter /> مسح المرشحات</button></div>
        <div className="player-grid">{filteredPlayers.map((player: any) => <PlayerCard key={player.id} player={player} onOpen={() => openPlayer(player)} onAdd={() => { setBuilderSide("home"); setView("builder"); }} />)}</div>
      </section>}

      {view === "builder" && <section className="content-page"><PageHeader eyebrow="TACTICAL STUDIO" title="ابنِ تشكيلتك يدوياً" copy="اختر أحد الفريقين ثم انتقِ أحد عشر لاعباً من الكتالوج. ستُستخدم قوة التشكيلة في المحاكاة التالية." action={<button className="outline-action" onClick={() => setView("match")}>إلى المباراة <ArrowLeft /></button>} />
        <div className="builder-layout"><article className="builder-pitch panel-surface"><div className="builder-toolbar"><div><span className="overline">LINEUP CONTROL</span><h3>{builderSide === "home" ? homeTeam?.name : awayTeam?.name}</h3></div><div className="side-toggle"><button className={builderSide === "home" ? "active" : ""} onClick={() => setBuilderSide("home")}>المضيف</button><button className={builderSide === "away" ? "active" : ""} onClick={() => setBuilderSide("away")}>الضيف</button></div></div><div className="pitch"><span className="center-circle" /><span className="half-line" />{(builderSide === "home" ? visibleHome : visibleAway).slice(0, 11).map((player: any, index: number) => <button className={`pitch-player p-${index}`} key={player.id} onClick={() => openPlayer(player)}><i>{player.overall}</i><b>{player.name.split(" ").at(-1)}</b><small>{positionNames[player.position]}</small></button>)}</div><div className="builder-footer"><span><b>{(builderSide === "home" ? visibleHome : visibleAway).length}</b> / 11 لاعباً</span><button onClick={() => builderSide === "home" ? setHomeLineup(homeTeamPlayers.map((player: any) => player.id)) : setAwayLineup(awayTeamPlayers.map((player: any) => player.id))}>استعادة التشكيلة الأساسية</button></div></article>
          <article className="builder-picker panel-surface"><div className="picker-head"><div><span className="overline">PLAYER POOL</span><h3>اختر من الكتالوج</h3></div><span>{(builderSide === "home" ? visibleHome : visibleAway).length}/11</span></div><div className="builder-search"><Search /><input placeholder="ابحث عن لاعب لإضافته" value={playerSearch} onChange={(event) => setPlayerSearch(event.target.value)} /></div><div className="builder-list">{players.filter((player: any) => !playerSearch || player.name.toLowerCase().includes(playerSearch.toLowerCase())).slice(0, 38).map((player: any) => { const current = builderSide === "home" ? visibleHomeIds : visibleAwayIds; const selected = current.includes(player.id); return <button key={player.id} className={selected ? "builder-row selected" : "builder-row"} onClick={() => toggleBuilderPlayer(player.id)}><span className="player-overall">{player.overall}</span><span><b>{player.name}</b><small>{player.club} · {positionNames[player.position]}</small></span><i>{selected ? <X /> : <Plus />}</i></button>; })}</div></article>
        </div>
      </section>}

      {view === "player" && selectedPlayer && <section className="content-page"><PageHeader eyebrow="PLAYER DOSSIER" title={selectedPlayer.name} copy="ملف لاعب مستقل يضم مؤشرات الأداء وسجل المسيرة ضمن كتالوج المحاكاة." action={<button className="outline-action" onClick={() => { setLocation("/"); setView("database"); }}>العودة إلى القاعدة <ArrowLeft /></button>} /><PlayerModal player={selectedPlayer} onClose={() => { setLocation("/"); setView("database"); }} onAdd={() => { setLocation("/"); setBuilderSide("home"); setView("builder"); }} /></section>}

      {view === "summary" && <section className="content-page"><PageHeader eyebrow={selectedMatchId ? "ARCHIVED RESULT" : "FINAL WHISTLE"} title="ملخص المباراة" copy={activeSummary ? "تفاصيل النتيجة والإحصاءات وتسلسل الأحداث محفوظة في سجل المباراة." : selectedMatchId ? "جارٍ تحميل الملخص المؤرشف." : "أطلق محاكاة أولاً للحصول على ملخص تفصيلي."} action={activeSummary ? <button className="outline-action" onClick={() => setView("match")}>العودة للبث <ArrowLeft /></button> : undefined} />
        {activeSummary ? <MatchSummary data={activeSummary} onOpenPlayer={openPlayer} /> : <article className="panel-surface summary-empty"><EmptyState icon={selectedMatchId ? LoaderCircle : Trophy} title={selectedMatchId ? "جارٍ تحميل الملخص" : "لا يوجد ملخص بعد"} copy={selectedMatchId ? "يتم استرجاع الإحصاءات والأحداث المحفوظة." : "انتقل إلى صفحة المباراة، اختر فريقين، ثم ابدأ المحاكاة."} /><button className="primary-action" onClick={() => setView("match")}>إلى غرفة المباراة</button></article>}
      </section>}

      {view === "history" && <section className="content-page"><PageHeader eyebrow="ARCHIVE" title="سجل المباريات" copy="كل المحاكاة المنفذة تُحفظ في السجل لتستطيع الرجوع إلى نتائجها ومقارنتها." action={<span className="count-chip">{historyQuery.data?.length ?? 0} مباراة</span>} />
        <div className="history-list panel-surface">{historyQuery.isLoading ? <EmptyState icon={LoaderCircle} title="جارٍ قراءة الأرشيف" copy="لحظة واحدة." /> : historyQuery.data?.length ? historyQuery.data.map((record: any) => <button className="history-row" key={record.id} onClick={() => openArchivedSummary(record.id)}><span className="history-date"><CalendarDays />{new Date(record.playedAt).toLocaleDateString("ar-EG", { day: "numeric", month: "short", year: "numeric" })}</span><div className="history-score"><b>{record.homeTeamName}</b><strong>{record.homeScore}<i>—</i>{record.awayScore}</strong><b>{record.awayTeamName}</b></div><ArrowLeft /></button>) : <EmptyState icon={Clock3} title="الأرشيف فارغ" copy="ستظهر هنا كل المباريات بعد تشغيل أول محاكاة." />}</div>
      </section>}

    </main>
  );
}

function TeamSelector({ label, team, teams, selected, onChoose }: { label: string; team: any; teams: any[]; selected: string; onChoose: (id: string) => void }) {
  return <div className="team-selector"><span className="selector-label">{label}</span><div className="selected-team">{team && <TeamMark team={team} size="lg" />}<div><b>{team?.name ?? "اختَر فريقاً"}</b><span>{team?.country} · {team?.strength} OVR</span></div></div><select value={selected} onChange={(event) => onChoose(event.target.value)}>{teams.map((option) => <option value={option.id} key={option.id}>{option.name} — {option.status === "retired" ? "Icons" : "Active"}</option>)}</select></div>;
}

function PreviewBoard({ home, away }: { home: any; away: any }) { return <div className="score-board preview"><div><TeamMark team={home} size="lg" /><b>{home?.shortName}</b></div><span className="score-ghost">— <i>VS</i> —</span><div><TeamMark team={away} size="lg" /><b>{away?.shortName}</b></div></div>; }
function LiveMatchBoard({ home, away, homeScore, awayScore, complete, homeStrength, awayStrength, onSummary }: any) { return <><div className="score-board"><div><TeamMark team={home} size="lg" /><b>{home.shortName}</b><small>{home.name}</small></div><strong>{homeScore}<i>:</i>{awayScore}</strong><div><TeamMark team={away} size="lg" /><b>{away.shortName}</b><small>{away.name}</small></div></div><div className="strength-bar"><span style={{ width: `${Math.round((homeStrength / (homeStrength + awayStrength)) * 100)}%` }} /><i>OVR {homeStrength} · {awayStrength}</i></div>{complete && <button className="summary-link" onClick={onSummary}>شاهد الملخص التفصيلي <ArrowLeft /></button>}</>; }
function PlayMark() { return <span className="play-mark">▶</span>; }
function PageHeader({ eyebrow, title, copy, action }: { eyebrow: string; title: string; copy: string; action?: React.ReactNode }) { return <header className="page-header"><div><p className="eyebrow"><span /> {eyebrow}</p><h2>{title}</h2><p>{copy}</p></div>{action}</header>; }
function PlayerCard({ player, onOpen, onAdd }: any) { return <article className="player-card"><div className="player-card-top"><span className={`status-dot ${player.status}`} /><span>{player.status === "active" ? "ACTIVE" : "ICON"}</span><strong>{player.overall}</strong></div><div className="player-avatar">{player.name.split(" ").map((part: string) => part[0]).slice(0, 2).join("")}</div><h3>{player.name}</h3><p>{player.nationality} <i /> {positionNames[player.position]} <i /> {player.age} سنة</p><div className="mini-stats"><span><b>{player.goals}</b> أهداف</span><span><b>{player.assists}</b> تمريرات</span><span><b>{player.appearances}</b> مباريات</span></div><div className="player-card-actions"><button onClick={onOpen}>عرض الملف <ArrowLeft /></button><button aria-label="أضف إلى التشكيلة" onClick={onAdd}><Plus /></button></div></article>; }
function PlayerModal({ player, onClose, onAdd }: any) { return <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={`ملف ${player.name}`}><article className="player-modal"><button className="modal-close" onClick={onClose}><X /></button><div className="modal-hero"><div className="modal-avatar">{player.name.split(" ").map((part: string) => part[0]).slice(0, 2).join("")}</div><div><span className="overline">{player.status === "active" ? "ACTIVE PLAYER PROFILE" : "LEGACY PLAYER PROFILE"}</span><h2>{player.name}</h2><p>{player.nationality} · {player.club} · {positionNames[player.position]}</p></div><strong>{player.overall}<small>OVR</small></strong></div><div className="profile-stat-row">{[["المباريات", player.appearances], ["الأهداف", player.goals], ["التمريرات", player.assists], ["التمريرات الكلية", player.passes], ["الافتكاكات", player.tackles]].map(([label, value]) => <span key={label as string}><b>{value as number}</b><small>{label as string}</small></span>)}</div><section className="attribute-section"><h3>مؤشرات الأداء</h3>{[["السرعة", player.pace], ["التسديد", player.shooting], ["التمرير", player.passing], ["الدفاع", player.defence], ["القوة", player.physical]].map(([label, value]) => <div className="attribute" key={label as string}><span>{label as string}</span><div><i style={{ width: `${value}%` }} /></div><b>{value as number}</b></div>)}</section><section className="career-section"><div className="section-title"><div><span className="overline">CAREER TIMELINE</span><h3>محطات المسيرة</h3></div><BadgeCheck /></div><div className="career-list">{player.career.map((stop: any) => <div className="career-stop" key={stop.period}><span>{stop.period}</span><div><b>{stop.club}</b><small>{stop.note} · {stop.appearances} مباراة · {stop.goals} هدف</small></div></div>)}</div></section><button className="primary-action full" onClick={onAdd}>إضافة إلى بناء التشكيلة <Plus /></button></article></div>; }
function MatchSummary({ data, onOpenPlayer }: any) { const { homeTeam, awayTeam, result, homeSelection, awaySelection } = data; const summaryStats = [["الاستحواذ", `${result.homeStats.possession}%`, `${result.awayStats.possession}%`], ["التسديدات", result.homeStats.shots, result.awayStats.shots], ["على المرمى", result.homeStats.shotsOnTarget, result.awayStats.shotsOnTarget], ["التمريرات", result.homeStats.passes, result.awayStats.passes], ["دقة التمرير", `${result.homeStats.passAccuracy}%`, `${result.awayStats.passAccuracy}%`], ["الركنيات", result.homeStats.corners, result.awayStats.corners]]; return <><article className="summary-hero panel-surface"><div><TeamMark team={homeTeam} size="lg" /><b>{homeTeam.name}</b></div><strong>{result.homeScore}<i>—</i>{result.awayScore}</strong><div><TeamMark team={awayTeam} size="lg" /><b>{awayTeam.name}</b></div><span>FULL TIME</span></article><div className="summary-layout"><article className="stats-table panel-surface"><div className="table-head"><b>{homeTeam.shortName}</b><span>إحصاءات المباراة</span><b>{awayTeam.shortName}</b></div>{summaryStats.map(([label, home, away]) => <div className="stat-row" key={label as string}><b>{home as string}</b><div><span>{label as string}</span><i><em style={{ width: `${label === "الاستحواذ" ? home : 50}%` }} /></i></div><b>{away as string}</b></div>)}</article><article className="final-events panel-surface"><div className="mini-head"><span>EVENTS</span><b>أحداث اللقاء</b></div>{result.events.map((event: any, index: number) => <div className={`timeline-event ${event.team}`} key={`${event.minute}-${index}`}><span className="event-minute">{event.minute}'</span><span className="event-icon"><EventGlyph type={event.type} /></span><div><b>{event.player}</b><small>{eventLabels[event.type as keyof typeof eventLabels]} · {event.detail}</small></div></div>)}</article></div><section className="lineup-review"><div><span className="overline">STARTING XIs</span><h3>تشكيلات المباراة</h3></div><div className="lineup-columns"><div>{homeSelection.map((player: any) => <button key={player.id} onClick={() => onOpenPlayer(player)}><span>{player.overall}</span>{player.name}<small>{positionNames[player.position]}</small></button>)}</div><div>{awaySelection.map((player: any) => <button key={player.id} onClick={() => onOpenPlayer(player)}><span>{player.overall}</span>{player.name}<small>{positionNames[player.position]}</small></button>)}</div></div></section></>; }
