import React, { useEffect } from "react";

const HUB_LOGO_URL = "/manus-storage/kora-e3mal-elsah-logo_85537310.png";

type Props = { onDone: () => void };

export default function AppSplash({ onDone }: Props) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, 900);
    return () => window.clearTimeout(timer);
  }, [onDone]);

  return (
    <main className="app-splash" dir="rtl" aria-label="جارٍ تحميل كوره كده">
      <div className="app-splash-glow" />
      <div className="app-splash-content">
        <img src={HUB_LOGO_URL} alt="شعار كوره كده" className="app-splash-logo" />
        <p className="app-splash-kicker">FOOTBALL GAME ROOM</p>
        <h1>كوره كده</h1>
        <p className="app-splash-tagline">اللعب يبدأ من هنا.</p>
        <span className="app-splash-loader" aria-hidden="true"><i /><i /><i /></span>
      </div>
      <footer>صناعة كريم</footer>
    </main>
  );
}
