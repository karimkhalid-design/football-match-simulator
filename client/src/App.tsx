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
import AppSplash from "./components/AppSplash";

type View = "categories" | "group" | "solo" | "road" | "auction" | "aftakar" | "var" | "menbyehbad";

function App() {
  const [view, setView] = useState<View>(() => window.location.hash === "#categories" ? "categories" : window.location.hash === "#aftakar" ? "aftakar" : window.location.hash === "#var" ? "var" : window.location.hash === "#menbyehbad" ? "menbyehbad" : window.location.hash === "#auction" ? "auction" : window.location.hash === "#solo" ? "solo" : window.location.hash === "#road" ? "road" : "group");
  const [showSplash, setShowSplash] = useState(() => !window.location.hash || window.location.hash === "#");
  const finishSplash = useCallback(() => { setShowSplash(false); setView("categories"); }, []);

  useEffect(() => {
    if (view !== "group") setShowSplash(false);
  }, [view]);

  if (showSplash && view === "group") return <AppSplash onDone={finishSplash} />;

  return <ErrorBoundary><ThemeProvider defaultTheme="dark"><TooltipProvider><Toaster />{view === "categories" ? <CategoryHub onSelectGroup={() => setView("group")} onSelectSolo={() => setView("solo")} /> : view === "group" ? <GameHub onSelectAuction={() => setView("auction")} onSelectAftakar={() => setView("aftakar")} onSelectVar={() => setView("var")} onSelectMenByehbad={() => setView("menbyehbad")} /> : view === "solo" ? <SoloGames onBack={() => setView("categories")} onSelectRoad={() => setView("road")} /> : view === "road" ? <RoadGame onBack={() => setView("solo")} /> : view === "auction" ? <Home onBackToHub={() => setView("group")} /> : view === "aftakar" ? <Aftakar onBackToHub={() => setView("group")} /> : view === "var" ? <VarGame onBackToHub={() => setView("group")} /> : <MenByehbad onBackToHub={() => setView("group")} />}</TooltipProvider></ThemeProvider></ErrorBoundary>;
}

export default App;
