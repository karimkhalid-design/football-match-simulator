import { describe, expect, it } from "vitest";
import { translateSiteText } from "./siteTranslations";

describe("site translations", () => {
  it("translates shared navigation and game labels to English", () => {
    expect(translateSiteText("مكتبة اللاعبين", "en")).toBe("Player Library");
    expect(translateSiteText("العب أونلاين", "en")).toBe("Play Online");
    expect(translateSiteText("مين بيهبد؟", "en")).toBe("Who Is Bluffing?");
    expect(translateSiteText("ابدأ اللعبة", "en")).toBe("Start game");
  });

  it("translates phrases inside longer dynamic labels", () => {
    expect(translateSiteText("الفائز · كاشف الهبد", "en")).toBe("Winner · Bluff detector");
    expect(translateSiteText("شارك النتيجة مع أصدقائك", "en")).toBe("Share result with your friends");
  });

  it("keeps the English UI corpus free of Arabic characters", () => {
    const uiCorpus = [
      "اللعب يبدأ من هنا.", "طريقة تثبيت الموقع", "تخطي", "مكتبة اللاعبين", "ألعاب جماعية",
      "ألعاب فردية", "العب أونلاين", "إعداد اللعبة", "ابدأ الأسئلة", "ابدأ التصويت",
      "العملاء كسبوا الجولة!", "العنصر ده خاص بيك — لا تعرضه على باقي اللاعبين", "شارك النتيجة مع أصدقائك",
      "السؤال التالي", "انتهى الوقت", "مشاركة النتيجة", "مسيرة اللاعب", "كشفت المسيرة كاملة",
      "كل الحالات", "لاعبون حاليون", "معتزلون وأساطير", "إغلاق الملف",
    ];
    for (const phrase of uiCorpus) {
      expect(translateSiteText(phrase, "en")).not.toMatch(/[\u0600-\u06ff]/u);
    }
  });

  it("can restore translated labels to Arabic", () => {
    expect(translateSiteText("Player Library", "ar")).toBe("مكتبة اللاعبين");
    expect(translateSiteText("Start game", "ar")).toBe("ابدأ اللعبة");
  });
});
