import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const SOLO_LOGO_URL = "/manus-storage/solo-games_c4094958.png";

type SoloGamesProps = { onBack: () => void };

export default function SoloGames({ onBack }: SoloGamesProps) {
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
        <span className="solo-coming-soon">أول لعبة فردية قريباً</span>
        <button type="button" className="solo-primary" onClick={onBack}>ارجع للتصنيفات <ArrowRight /></button>
      </section>
      <footer className="category-footer"><span>كورة كده</span><i /><span>صناعة كريم</span></footer>
    </main>
  );
}
