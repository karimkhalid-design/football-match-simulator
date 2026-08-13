import React from "react";
import { ArrowLeft, BookOpen, LockKeyhole, Sparkles, Users, UserRound } from "lucide-react";

const GROUP_LOGO_URL = "/manus-storage/group-games_4a9b56ea.png";
const SOLO_LOGO_URL = "/manus-storage/solo-games_c4094958.png";
const ONLINE_LOGO_URL = "/manus-storage/online-games_1826cf60.png";

type CategoryHubProps = {
  onSelectGroup: () => void;
  onSelectSolo: () => void;
  onSelectLibrary: () => void;
};

export default function CategoryHub({ onSelectGroup, onSelectSolo, onSelectLibrary }: CategoryHubProps) {
  return (
    <main className="category-hub" dir="rtl">
      <div className="category-hub-glow category-hub-glow-one" />
      <div className="category-hub-glow category-hub-glow-two" />
      <header className="category-header">
        <div className="category-brand"><span>FOOTBALL GAME ROOM</span><b>كورة كده</b></div>
        <div className="category-header-actions"><button type="button" className="category-library-link" onClick={onSelectLibrary}><BookOpen /> مكتبة اللاعبين</button><span className="category-credit">صناعة كريم</span></div>
      </header>
      <section className="category-intro">
        <p className="category-kicker"><Sparkles /> اختار طريقة اللعب</p>
        <h1>اللعب يبدأ<br /><em>من هنا.</em></h1>
        <p>اختار عالمك، واجمع أصحابك أو اختبر مهاراتك لوحدك.</p>
      </section>
      <section className="category-cards" aria-label="تصنيفات الألعاب">
        <button type="button" className="category-card category-card-group" onClick={onSelectGroup}>
          <div className="category-card-status"><span>متاحة الآن</span><Users /></div>
          <div className="category-card-art"><img src={GROUP_LOGO_URL} alt="شعار الألعاب الجماعية" /></div>
          <div className="category-card-copy"><span>مع أصحابك · موبايل واحد</span><h2>ألعاب جماعية</h2><p>نافسوا بعض، ناقشوا، واكتشفوا مين هيكسب الجولة.</p></div>
          <div className="category-card-action">ادخل الألعاب <ArrowLeft /></div>
        </button>
        <button type="button" className="category-card category-card-solo" onClick={onSelectSolo}>
          <div className="category-card-status"><span>جاهزة للإضافات</span><UserRound /></div>
          <div className="category-card-art"><img src={SOLO_LOGO_URL} alt="شعار الألعاب الفردية" /></div>
          <div className="category-card-copy"><span>تحدياتك · وقتك · مستواك</span><h2>ألعاب فردية</h2><p>العاب تلعبها لوحدك، وهنضيف فيها تحديات جديدة قريباً.</p></div>
          <div className="category-card-action">استكشف القسم <ArrowLeft /></div>
        </button>
        <div className="category-card category-card-online category-card-disabled" aria-disabled="true">
          <div className="category-card-status"><span>قريباً</span><LockKeyhole /></div>
          <div className="category-card-art"><img src={ONLINE_LOGO_URL} alt="شعار العب أونلاين" /></div>
          <div className="category-card-copy"><span>العب مع أي حد · من أي مكان</span><h2>العب أونلاين</h2><p>مباريات وتحديات أونلاين بينك وبين أصحابك. بنجهزها ليكم.</p></div>
          <div className="category-card-action">قريباً <LockKeyhole /></div>
        </div>
      </section>
      <footer className="category-footer"><span>كورة كده</span><i /><span>اختار لعبتك وابدأ الحكاية</span></footer>
    </main>
  );
}
