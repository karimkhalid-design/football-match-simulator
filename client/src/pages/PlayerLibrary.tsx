import React, { useMemo, useState } from "react";
import { ArrowRight, Search, SlidersHorizontal, X } from "lucide-react";
import { libraryPositionLabels, libraryStatusLabels, playerLibrary, searchLibraryPlayers, type LibraryPlayer } from "../lib/playerLibrary";
import PlayerPhoto from "../components/PlayerPhoto";

type PlayerLibraryProps = { onBack: () => void };

export default function PlayerLibrary({ onBack }: PlayerLibraryProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | "active" | "legend">("all");
  const [position, setPosition] = useState("all");
  const [selected, setSelected] = useState<LibraryPlayer | null>(null);
  const filteredPlayers = useMemo(() => searchLibraryPlayers(playerLibrary, query).filter((player) => (status === "all" || player.status === status) && (position === "all" || player.position === position)), [position, query, status]);
  const activeCount = playerLibrary.filter((player) => player.status === "active").length;
  const legendCount = playerLibrary.filter((player) => player.status === "legend").length;

  return <main className="library-page" dir="rtl">
    <header className="library-header">
      <button type="button" className="library-back" onClick={onBack}><ArrowRight /> التصنيفات</button>
      <div><span>كورة كده · أرشيف الكرة</span><h1>مكتبة اللاعبين</h1></div>
    </header>
    <section className="library-hero">
      <div><span className="library-kicker">من النجوم إلى المواهب</span><h2>كل لاعب له حكاية.</h2><p>مكتبة واحدة تجمع الحاليين والمعتزلين، المشاهير والأسماء التي تستحق أن تُكتشف.</p></div>
      <div className="library-stats"><strong>{playerLibrary.length}</strong><span>لاعب في الكتالوج</span><small>{activeCount} حالي · {legendCount} معتزل / أسطورة</small></div>
    </section>
    <section className="library-toolbar" aria-label="فلاتر مكتبة اللاعبين">
      <label className="library-search"><Search /><input aria-label="ابحث عن لاعب" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث بالاسم العربي أو الإنجليزي..." /></label>
      <div className="library-filter-row"><SlidersHorizontal /><select aria-label="حالة اللاعب" value={status} onChange={(event) => setStatus(event.target.value as typeof status)}><option value="all">كل الحالات</option><option value="active">لاعبون حاليون</option><option value="legend">معتزلون وأساطير</option></select><select aria-label="مركز اللاعب" value={position} onChange={(event) => setPosition(event.target.value)}><option value="all">كل المراكز</option>{Object.entries(libraryPositionLabels).map(([code, label]) => <option key={code} value={code}>{label}</option>)}</select>{(query || status !== "all" || position !== "all") && <button type="button" className="library-clear" onClick={() => { setQuery(""); setStatus("all"); setPosition("all"); }}><X /> مسح</button>}</div>
    </section>
    <div className="library-results-bar"><span>عرض {filteredPlayers.length} لاعب</span><small>اختر لاعباً لفتح بطاقته</small></div>
    <section className="library-grid" aria-label="قائمة اللاعبين">{filteredPlayers.map((player) => <button type="button" className="library-player-card" key={player.id} onClick={() => setSelected(player)}><div className="library-player-image"><PlayerPhoto name={player.name} /></div><div className="library-player-copy"><span className="library-status">{libraryStatusLabels[player.status]}</span><h3>{player.arabicName}</h3><p>{player.name}</p><small>{libraryPositionLabels[player.position]} · {player.rating} تقييم</small></div></button>)}</section>
    {filteredPlayers.length === 0 && <div className="library-empty">لا يوجد لاعب يطابق بحثك حالياً.</div>}
    {selected && <div className="library-drawer-backdrop" role="presentation" onClick={() => setSelected(null)}><aside className="library-drawer" role="dialog" aria-label={`ملف ${selected.arabicName}`} onClick={(event) => event.stopPropagation()}><button type="button" className="library-drawer-close" aria-label="إغلاق الملف" onClick={() => setSelected(null)}><X /></button><div className="library-drawer-image"><PlayerPhoto name={selected.name} loading="eager" /></div><span className="library-status">{libraryStatusLabels[selected.status]}</span><h2>{selected.arabicName}</h2><p className="library-drawer-en">{selected.name}</p><div className="library-detail-grid"><div><b>{selected.rating}</b><span>التقييم</span></div><div><b>{libraryPositionLabels[selected.position]}</b><span>المركز</span></div><div><b>{selected.nationality}</b><span>الهوية الكروية</span></div></div><p className="library-note">{selected.note}</p><div className="library-career"><strong>المسيرة</strong><span>{selected.careerLabel}</span><span>{selected.currentClub}</span></div></aside></div>}
  </main>;
}
