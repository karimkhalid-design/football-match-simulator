import React, { useEffect, useState } from "react";

const HUB_LOGO_URL = "/manus-storage/kora-keda-app-icon_9f5a2e2f.png";

type Props = { onDone: () => void };

export default function AppSplash({ onDone }: Props) {
  const [showInstallGuide, setShowInstallGuide] = useState(false);

  useEffect(() => {
    const guideTimer = window.setTimeout(() => setShowInstallGuide(true), 900);
    const timer = window.setTimeout(onDone, 30000);
    return () => {
      window.clearTimeout(guideTimer);
      window.clearTimeout(timer);
    };
  }, [onDone]);

  return (
    <main className="app-splash" dir="rtl" aria-label="جارٍ تحميل كورة كده">
      <div className="app-splash-glow" />
      <div className="app-splash-content">
        <img src={HUB_LOGO_URL} alt="شعار كورة كده" className="app-splash-logo" />
        <p className="app-splash-kicker">FOOTBALL GAME ROOM</p>
        <h1>كورة كده</h1>
        <p className="app-splash-tagline">اللعب يبدأ من هنا.</p>
        <span className="app-splash-loader" aria-hidden="true"><i /><i /><i /></span>
        <div className="app-splash-actions">
          <button type="button" className="app-splash-install" onClick={() => setShowInstallGuide(true)}>
            طريقة تثبيت الموقع
          </button>
          <button type="button" className="app-splash-skip" onClick={onDone}>
            تخطي
          </button>
        </div>
      </div>
      <footer>صناعة كريم</footer>
      {showInstallGuide && <div className="pwa-guide-backdrop" role="presentation" onClick={() => setShowInstallGuide(false)}>
        <section className="pwa-guide-modal" role="dialog" aria-modal="true" aria-labelledby="pwa-guide-title" onClick={(event) => event.stopPropagation()}>
          <button type="button" className="pwa-guide-close" aria-label="إغلاق طريقة التثبيت" onClick={() => setShowInstallGuide(false)}>×</button>
          <span className="pwa-guide-kicker">تجربة أسرع · بدون متجر</span>
          <h2 id="pwa-guide-title">ثبّت كورة كده على جهازك</h2>
          <p>خلي اللعبة على الشاشة الرئيسية وافتحها في أي وقت كأنها تطبيق مستقل.</p>
          <div className="pwa-guide-steps">
            <article><strong>iPhone / iPad</strong><span>افتح الموقع من Safari، اضغط زر المشاركة، ثم اختر «إضافة إلى الشاشة الرئيسية» واضغط «إضافة».</span></article>
            <article><strong>Android</strong><span>افتح الموقع من Chrome، اضغط ⋮، ثم اختر «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية».</span></article>
            <article><strong>الكمبيوتر</strong><span>من Chrome أو Edge اضغط رمز التثبيت بجوار شريط العنوان، ثم اختر «تثبيت».</span></article>
          </div>
          <button type="button" className="pwa-guide-done" onClick={() => setShowInstallGuide(false)}>تمام، فهمت</button>
        </section>
      </div>}
    </main>
  );
}
