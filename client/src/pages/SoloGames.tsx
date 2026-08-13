import React from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

const SOLO_LOGO_URL = "/manus-storage/solo-games_c4094958.png";
const ROAD_LOGO_URL = "/manus-storage/road-game_ea66d69e.png";

type SoloGamesProps = { onBack: () => void; onSelectRoad: () => void };

export default function SoloGames({ onBack, onSelectRoad }: SoloGamesProps) {
  return (
    <main className="solo-page" dir="rtl">
      <div className="solo-page-glow" />
      <header className="solo-header">
        <button type="button" className="solo-back" onClick={onBack}><ArrowRight /> التصنيفات</button>
        <span>كورة كده · ألعاب فردية</span>
      </header>
      <section className="solo-empty-state">
        <div className="solo-logo-frame"><img src={SOLO_LOGO_URL} alt="شعار الألعاب الفردية" /></div>
        <p className="category-kicker"><Sparkles /> القسم الفردي</p>
        <h1>اللعب لوحدك<br /><em>له طعم تاني.</em></h1>
        <p>هنضيف هنا ألعاب وتحديات تقدر تلعبها لوحدك، وتنافس نتيجتك وتكسر أرقامك القياسية.</p>
        <span className="solo-coming-soon">قسم جديد · ألعاب تتطور معك</span>
        <button type="button" className="solo-primary" onClick={onBack}>ارجع للتصنيفات <ArrowRight /></button>
      </section>
      <section className="solo-games-list" aria-label="الألعاب الفردية المتاحة">
        <button type="button" className="solo-game-card" onClick={onSelectRoad}>
          <div className="solo-game-card-art"><img src={ROAD_LOGO_URL} alt="شعار الطريق ما يتوهش" /></div>
          <div className="solo-game-card-copy"><span>اقرأ المسيرة · اكشف الـHints · خمن</span><h2>الطريق ما يتوهش</h2><p>خمن اللاعب المجهول من سهم مسيرته قبل ما نقاطك تقل.</p></div>
          <div className="solo-game-card-cta">ابدأ اللعبة <ArrowLeft /></div>
        </button>
      </section>
      <footer className="category-footer"><span>كورة كده</span><i /><span>صناعة كريم</span></footer>
    </main>
  );
}
