import React from "react";
import { ArrowLeft, LockKeyhole, Sparkles, Swords } from "lucide-react";

const E3MAL_LOGO_URL = "/manus-storage/e3mal-elsah-logo_b8d9ae3f.png";
const AFTAKAR_LOGO_URL = "/manus-storage/aftakar-logo_c6bb6361.png";

type GameHubProps = { onSelectAuction: () => void };

export default function GameHub({ onSelectAuction }: GameHubProps) {
  return (
    <main className="game-hub" dir="rtl">
      <div className="hub-noise" />
      <div className="hub-orb hub-orb-one" />
      <div className="hub-orb hub-orb-two" />
      <header className="hub-header">
        <div className="hub-wordmark"><span>FOOTBALL GAME ROOM</span><b>ملعب واحد. ألعاب كتير.</b></div>
        <span className="hub-season">SEASON ONE · 2026</span>
      </header>

      <section className="hub-hero">
        <div className="hub-hero-copy">
          <p className="hub-kicker"><Sparkles /> اختار لعبتك</p>
          <h1>الكرة تبدأ<br /><em>من هنا.</em></h1>
          <p className="hub-description">ادخل عالم ألعاب كرة القدم من بوابة واحدة. كوّن فريقك، خاطر في المزاد، واستعد لألعاب جديدة قادمة.</p>
          <div className="hub-stats"><span><b>02</b> ألعاب</span><i /><span><b>122</b> لاعباً</span><i /><span><b>01</b> متاح الآن</span></div>
        </div>
        <div className="hub-mark"><div className="hub-mark-ring" /><span>THE<br />GAME<br />ROOM</span></div>
      </section>

      <section className="game-cards" aria-label="الألعاب المتاحة">
        <button className="game-card game-card-auction" onClick={onSelectAuction} type="button">
          <div className="game-card-topline"><span className="game-number">01</span><span className="game-status available"><i /> متاحة الآن</span></div>
          <div className="game-card-art"><img src={E3MAL_LOGO_URL} alt="شعار اعمل الصح" /></div>
          <div className="game-card-content"><p>مزاد · تشكيل · مباراة</p><h2>اعمل الصح</h2><span>زايد بذكاء، ابنِ فريقك، وخد مكانك في المباراة النهائية.</span></div>
          <div className="game-card-cta">ابدأ اللعبة <ArrowLeft /></div>
        </button>

        <article className="game-card game-card-locked" aria-disabled="true">
          <div className="game-card-topline"><span className="game-number">02</span><span className="game-status soon"><LockKeyhole /> قريباً</span></div>
          <div className="game-card-art"><img src={AFTAKAR_LOGO_URL} alt="شعار أفتكر" /></div>
          <div className="game-card-content"><p>خمن · اكتشف · نافس</p><h2>أفتكر</h2><span>اختبر ذاكرتك الكروية وخمّن اللاعب من تاريخه وأرقامه.</span></div>
          <div className="game-card-cta disabled-cta">اللعبة غير متاحة حالياً <LockKeyhole /></div>
        </article>
      </section>

      <footer className="hub-footer"><span>صناعة كريم</span><span className="hub-footer-line" /><span><Swords /> ألعاب كرة القدم بطريقتنا</span></footer>
    </main>
  );
}
