import { useCallback, useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import GameHub from "./pages/GameHub";
import CategoryHub from "./pages/CategoryHub";
import SoloGames from "./pages/SoloGames";
import RoadGame from "./pages/RoadGame";
import Home from "./pages/Home";
import Aftakar from "./pages/Aftakar";
import VarGame from "./pages/VarGame";
import MenByehbad from "./pages/MenByehbad";
import PlayerLibrary from "./pages/PlayerLibrary";
import OnlineQuiz from "./pages/OnlineQuiz";
import KhaleekWasthom from "./pages/KhaleekWasthom";
import AppSplash from "./components/AppSplash";
import { LanguageProvider, useLanguage, languageLabels } from "./contexts/LanguageContext";
import { Languages } from "lucide-react";

type View = "categories" | "group" | "solo" | "road" | "library" | "online" | "auction" | "aftakar" | "var" | "menbyehbad" | "khaleek";

function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const label = languageLabels[language];
  return (
    <button type="button" className="language-toggle" onClick={toggleLanguage} aria-label={label.aria} title={label.aria}>
      <Languages aria-hidden="true" />
      <span>{label.switchTo}</span>
    </button>
  );
}

function AppContent() {
  const [view, setView] = useState<View>(() => window.location.hash === "#categories" ? "categories" : window.location.hash === "#aftakar" ? "aftakar" : window.location.hash === "#var" ? "var" : window.location.hash === "#menbyehbad" ? "menbyehbad" : window.location.hash === "#khaleek" ? "khaleek" : window.location.hash === "#auction" ? "auction" : window.location.hash === "#solo" ? "solo" : window.location.hash === "#road" ? "road" : window.location.hash === "#library" ? "library" : window.location.hash.startsWith("#online") ? "online" : "group");
  const [showSplash, setShowSplash] = useState(() => !window.location.hash || window.location.hash === "#");
  const finishSplash = useCallback(() => { setShowSplash(false); setView("categories"); }, []);

  useEffect(() => {
    if (view !== "group") setShowSplash(false);
  }, [view]);

  if (showSplash && view === "group") return <><LanguageToggle /><AppSplash onDone={finishSplash} /></>;

  return <><LanguageToggle /><ErrorBoundary><ThemeProvider defaultTheme="dark"><TooltipProvider><Toaster />{view === "categories" ? <CategoryHub onSelectGroup={() => setView("group")} onSelectSolo={() => setView("solo")} onSelectLibrary={() => setView("library")} onSelectOnline={() => setView("online")} /> : view === "group" ? <GameHub onSelectAuction={() => setView("auction")} onSelectAftakar={() => setView("aftakar")} onSelectVar={() => setView("var")} onSelectMenByehbad={() => setView("menbyehbad")} onSelectKhaleek={() => setView("khaleek")} onBackToCategories={() => setView("categories")} /> : view === "solo" ? <SoloGames onBack={() => setView("categories")} onSelectRoad={() => setView("road")} /> : view === "road" ? <RoadGame onBack={() => setView("solo")} /> : view === "library" ? <PlayerLibrary onBack={() => setView("categories")} /> : view === "online" ? <OnlineQuiz onBack={() => setView("categories")} /> : view === "auction" ? <Home onBackToHub={() => setView("group")} /> : view === "aftakar" ? <Aftakar onBackToHub={() => setView("group")} /> : view === "var" ? <VarGame onBackToHub={() => setView("group")} /> : view === "khaleek" ? <KhaleekWasthom onBackToHub={() => setView("group")} /> : <MenByehbad onBackToHub={() => setView("group")} />}</TooltipProvider></ThemeProvider></ErrorBoundary></>;
}

export default function App() {
  return <LanguageProvider><AppContent /></LanguageProvider>;
}
