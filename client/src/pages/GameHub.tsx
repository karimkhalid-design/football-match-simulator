import React from "react";
import { ArrowLeft, LockKeyhole, Sparkles, Swords } from "lucide-react";

const HUB_LOGO_URL = "/manus-storage/kora-e3mal-elsah-logo_85537310.png";
const IN_GAME_LOGO_URL = "/manus-storage/e3mal-elsah-logo_b8d9ae3f.png";
const AFTAKAR_LOGO_URL = "/manus-storage/aftakar-logo_c6bb6361.png";
const VAR_LOGO_URL = "/manus-storage/4A3546B6-12EE-496E-B7CF-41A005590FB6_5eea2af3.png";

type GameHubProps = { onSelectAuction: () => void; onSelectAftakar?: () => void; onSelectVar?: () => void };

export default function GameHub({ onSelectAuction, onSelectAftakar, onSelectVar }: GameHubProps) {
  return (
    <main className="game-hub" dir="rtl">
      <div className="hub-noise" />
      <div className="hub-orb hub-orb-one" />
      <div className="hub-orb hub-orb-two" />
      <header className="hub-header">
        <div className="hub-wordmark"><span>FOOTBALL GAME ROOM</span><b>كوره كده · ألعاب كتير.</b></div>
        <span className="hub-season">SEASON ONE · 2026</span>
      </header>

      <section className="hub-hero">
        <div className="hub-hero-copy">
          <p className="hub-kicker"><Sparkles /> اختار لعبتك</p>
          <h1>الكرة تبدأ<br /><em>من هنا.</em></h1>
          <p className="hub-description">ادخل عالم ألعاب كرة القدم من بوابة واحدة. كوّن فريقك، خاطر في المزاد، ناقش اللقطات، واستعد للجولة القادمة.</p>
          <div className="hub-stats"><span><b>03</b> ألعاب</span><i /><span><b>122</b> لاعباً</span><i /><span><b>03</b> متاحة الآن</span></div>
        </div>
        <div className="hub-mark"><img src={HUB_LOGO_URL} alt="شعار كوره كده واعمل الصح" /></div>
      </section>

      <section className="game-cards" aria-label="الألعاب المتاحة">
        <button className="game-card game-card-auction" onClick={onSelectAuction} type="button">
          <div className="game-card-topline"><span className="game-number">01</span><span className="game-status available"><i /> متاحة الآن</span></div>
          <div className="game-card-art"><img src={IN_GAME_LOGO_URL} alt="شعار اعمل الصح" /></div>
          <div className="game-card-content"><p>مزاد · تشكيل · مباراة</p><h2>اعمل الصح</h2><span>زايد بذكاء، ابنِ فريقك، وخد مكانك في المباراة النهائية.</span></div>
          <div className="game-card-cta">ابدأ اللعبة <ArrowLeft /></div>
        </button>

        <button className="game-card game-card-aftakar" onClick={onSelectAftakar} type="button">
          <div className="game-card-topline"><span className="game-number">02</span><span className="game-status available aftakar-status"><i /> متاحة الآن</span></div>
          <div className="game-card-art"><img src={AFTAKAR_LOGO_URL} alt="شعار أفتكر" /></div>
          <div className="game-card-content"><p>خمن · اكتشف · نافس</p><h2>أفتكر</h2><span>اختبر ذاكرتك الكروية وخمّن اللاعب من تاريخه وأرقامه.</span></div>
          <div className="game-card-cta aftakar-cta">ابدأ التحدي <ArrowLeft /></div>
        </button>
        <button className="game-card game-card-var" onClick={onSelectVar} type="button">
          <div className="game-card-topline"><span className="game-number">03</span><span className="game-status available var-status"><i /> متاحة الآن</span></div>
          <div className="game-card-art"><img src={VAR_LOGO_URL} alt="شعار VAR و لا لأ؟" /></div>
          <div className="game-card-content"><p>اقرأ · ناقش · احكم</p><h2>VAR و لا لأ؟</h2><span>لعبة صحاب على موبايل واحد: اقرأ حالة حقيقية وخد قرارك.</span></div>
          <div className="game-card-cta var-cta">ابدأ المراجعة <ArrowLeft /></div>
        </button>
      </section>

      <footer className="hub-footer"><span>كوره كده · صناعة كريم</span><span className="hub-footer-line" /><span><Swords /> ألعاب كرة القدم بطريقتنا</span></footer>
    </main>
  );
}
