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

  it("can restore translated labels to Arabic", () => {
    expect(translateSiteText("Player Library", "ar")).toBe("مكتبة اللاعبين");
    expect(translateSiteText("Start game", "ar")).toBe("ابدأ اللعبة");
  });
});
