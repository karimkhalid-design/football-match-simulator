import React, { useEffect, useState } from "react";

const HUB_LOGO_URL = "/manus-storage/kora-keda-app-icon_9f5a2e2f.png";

type Props = { onDone: () => void };
type InstallPromptEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: "accepted" | "dismissed" }> };
type DeviceKind = "ios" | "android" | "desktop";

const INSTALL_DISMISSED_KEY = "kora-keda-pwa-guide-dismissed";
const getDeviceKind = (): DeviceKind => {
  const browserNavigator = typeof navigator === "undefined" ? undefined : navigator;
  const userAgent = browserNavigator?.userAgent ?? "";
  if (/iPad|iPhone|iPod/i.test(userAgent) || (browserNavigator?.platform === "MacIntel" && (browserNavigator.maxTouchPoints ?? 0) > 1)) return "ios";
  if (/Android/i.test(userAgent)) return "android";
  return "desktop";
};

export default function AppSplash({ onDone }: Props) {
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<InstallPromptEvent | null>(null);
  const [deviceKind] = useState<DeviceKind>(getDeviceKind);
  const [dontShowAgain, setDontShowAgain] = useState(() => window.localStorage.getItem(INSTALL_DISMISSED_KEY) === "1");

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as InstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    const guideTimer = window.setTimeout(() => {
      if (window.localStorage.getItem(INSTALL_DISMISSED_KEY) !== "1") setShowInstallGuide(true);
    }, 900);
    const timer = window.setTimeout(onDone, 30000);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.clearTimeout(guideTimer);
      window.clearTimeout(timer);
    };
  }, [onDone]);

  const closeGuide = () => setShowInstallGuide(false);
  const dismissGuideForever = () => {
    window.localStorage.setItem(INSTALL_DISMISSED_KEY, "1");
    setDontShowAgain(true);
    closeGuide();
  };
  const installApp = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    if (choice.outcome === "accepted") closeGuide();
  };

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
          <p>عرضنا لك تعليمات {deviceKind === "ios" ? "iPhone وiPad" : deviceKind === "android" ? "Android" : "الكمبيوتر"} أولًا حسب جهازك.</p>
          <div className="pwa-guide-steps">
            {deviceKind === "ios" && <article className="pwa-guide-primary"><strong>جهازك: iPhone / iPad</strong><span>افتح الموقع من Safari، اضغط زر المشاركة، ثم اختر «إضافة إلى الشاشة الرئيسية» واضغط «إضافة».</span></article>}
            {deviceKind === "android" && <article className="pwa-guide-primary"><strong>جهازك: Android</strong><span>افتح الموقع من Chrome، اضغط ⋮، ثم اختر «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية».</span></article>}
            {deviceKind === "desktop" && <article className="pwa-guide-primary"><strong>جهازك: الكمبيوتر</strong><span>من Chrome أو Edge اضغط رمز التثبيت بجوار شريط العنوان، ثم اختر «تثبيت».</span></article>}
            <article><strong>لو بتستخدم iPhone / iPad</strong><span>في Safari اضغط المشاركة، ثم «إضافة إلى الشاشة الرئيسية».</span></article>
            <article><strong>لو بتستخدم Android</strong><span>في Chrome اضغط ⋮، ثم «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية».</span></article>
            {deferredPrompt && <button type="button" className="pwa-guide-install" onClick={installApp}>تثبيت التطبيق الآن</button>}
          </div>
          <label className="pwa-guide-preference"><input type="checkbox" checked={dontShowAgain} onChange={(event) => event.target.checked ? dismissGuideForever() : (window.localStorage.removeItem(INSTALL_DISMISSED_KEY), setDontShowAgain(false))} /> <span>عدم إظهار هذه الرسالة مرة أخرى</span></label>
          <button type="button" className="pwa-guide-done" onClick={closeGuide}>تمام، فهمت</button>
        </section>
      </div>}
    </main>
  );
}
