import React from "react";
import { ArrowLeft, BookOpen, Sparkles, Users, UserRound } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const GROUP_LOGO_URL = "/manus-storage/group-games_4a9b56ea.png";
const SOLO_LOGO_URL = "/manus-storage/solo-games_c4094958.png";
const ONLINE_LOGO_URL = "/manus-storage/online-games_1826cf60.png";

type CategoryHubProps = {
  onSelectGroup: () => void;
  onSelectSolo: () => void;
  onSelectLibrary: () => void;
  onSelectOnline: () => void;
};

export default function CategoryHub({ onSelectGroup, onSelectSolo, onSelectLibrary, onSelectOnline }: CategoryHubProps) {
  const { isArabic } = useLanguage();
  const t = isArabic ? {
    library: "مكتبة اللاعبين", credit: "صناعة كريم", kicker: "اختار طريقة اللعب", title: <>اللعب يبدأ<br /><em>من هنا.</em></>, intro: "اختار عالمك، واجمع أصحابك أو اختبر مهاراتك لوحدك.", categories: "تصنيفات الألعاب", available: "متاحة الآن", groupMeta: "مع أصحابك · موبايل واحد", groupTitle: "ألعاب جماعية", groupDesc: "نافسوا بعض، ناقشوا، واكتشفوا مين هيكسب الجولة.", groupAction: "ادخل الألعاب", soloStatus: "جاهزة للإضافات", soloMeta: "تحدياتك · وقتك · مستواك", soloTitle: "ألعاب فردية", soloDesc: "العاب تلعبها لوحدك، وهنضيف فيها تحديات جديدة قريباً.", soloAction: "استكشف القسم", onlineStatus: "متاحة الآن · 1 ضد 1", onlineMeta: "غرفة حقيقية · من أي جهاز", onlineTitle: "العب أونلاين", onlineDesc: "اختبر معلوماتك واتحدى صاحبك في مباراة أسئلة أونلاين.", onlineAction: "اعمل تحدي", footer: "اختار لعبتك وابدأ الحكاية"
  } : {
    library: "Player Library", credit: "Made by Kareem", kicker: "CHOOSE YOUR PLAY MODE", title: <>The game starts<br /><em>right here.</em></>, intro: "Pick your world, gather your friends, or test your skills solo.", categories: "Game categories", available: "AVAILABLE NOW", groupMeta: "With friends · One phone", groupTitle: "Group Games", groupDesc: "Compete, debate, and find out who owns the round.", groupAction: "Enter games", soloStatus: "MORE COMING SOON", soloMeta: "Your challenge · Your pace · Your level", soloTitle: "Solo Games", soloDesc: "Play on your own, with new challenges arriving soon.", soloAction: "Explore section", onlineStatus: "AVAILABLE NOW · 1V1", onlineMeta: "Live room · Any device", onlineTitle: "Play Online", onlineDesc: "Test your knowledge and challenge a friend in a live quiz match.", onlineAction: "Start challenge", footer: "Choose your game and start the story"
  };

  return (
    <main className="category-hub" dir={isArabic ? "rtl" : "ltr"}>
      <div className="category-hub-glow category-hub-glow-one" />
      <div className="category-hub-glow category-hub-glow-two" />
      <header className="category-header">
        <div className="category-brand"><span>FOOTBALL GAME ROOM</span><b>كورة كده</b></div>
        <div className="category-header-actions"><button type="button" className="category-library-link" onClick={onSelectLibrary}><BookOpen /> {t.library}</button><span className="category-credit">{t.credit}</span></div>
      </header>
      <section className="category-intro">
        <p className="category-kicker"><Sparkles /> {t.kicker}</p>
        <h1>{t.title}</h1>
        <p>{t.intro}</p>
      </section>
      <section className="category-cards" aria-label={t.categories}>
        <button type="button" className="category-card category-card-group" onClick={onSelectGroup}>
          <div className="category-card-status"><span>{t.available}</span><Users /></div>
          <div className="category-card-art"><img src={GROUP_LOGO_URL} alt="شعار الألعاب الجماعية" /></div>
          <div className="category-card-copy"><span>{t.groupMeta}</span><h2>{t.groupTitle}</h2><p>{t.groupDesc}</p></div>
          <div className="category-card-action">{t.groupAction} <ArrowLeft /></div>
        </button>
        <button type="button" className="category-card category-card-solo" onClick={onSelectSolo}>
          <div className="category-card-status"><span>{t.soloStatus}</span><UserRound /></div>
          <div className="category-card-art"><img src={SOLO_LOGO_URL} alt="شعار الألعاب الفردية" /></div>
          <div className="category-card-copy"><span>{t.soloMeta}</span><h2>{t.soloTitle}</h2><p>{t.soloDesc}</p></div>
          <div className="category-card-action">{t.soloAction} <ArrowLeft /></div>
        </button>
        <button type="button" className="category-card category-card-online" onClick={onSelectOnline}>
          <div className="category-card-status"><span>{t.onlineStatus}</span><Users /></div>
          <div className="category-card-art"><img src={ONLINE_LOGO_URL} alt="شعار هتعرف تجاوب؟" /></div>
          <div className="category-card-copy"><span>{t.onlineMeta}</span><h2>{t.onlineTitle}</h2><p>{t.onlineDesc}</p></div>
          <div className="category-card-action">{t.onlineAction} <ArrowLeft /></div>
        </button>
      </section>
      <footer className="category-footer"><span>كورة كده</span><i /><span>{t.footer}</span></footer>
    </main>
  );
}
