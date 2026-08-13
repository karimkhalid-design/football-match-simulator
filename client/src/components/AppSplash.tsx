import React, { useEffect } from "react";

const HUB_LOGO_URL = "/manus-storage/kora-keda-app-icon_9f5a2e2f.png";

type Props = { onDone: () => void };

export default function AppSplash({ onDone }: Props) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, 30000);
    return () => window.clearTimeout(timer);
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
        <button type="button" className="app-splash-skip" onClick={onDone}>
          تخطي
        </button>
      </div>
      <footer>صناعة كريم</footer>
    </main>
  );
}
