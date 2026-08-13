import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import GameHub from "./pages/GameHub";
import Home from "./pages/Home";
import Aftakar from "./pages/Aftakar";
import VarGame from "./pages/VarGame";
import MenByehbad from "./pages/MenByehbad";

function App() {
  const [view, setView] = useState<"hub" | "auction" | "aftakar" | "var" | "menbyehbad">(() => window.location.hash === "#aftakar" ? "aftakar" : window.location.hash === "#var" ? "var" : window.location.hash === "#menbyehbad" ? "menbyehbad" : "hub");
  return <ErrorBoundary><ThemeProvider defaultTheme="dark"><TooltipProvider><Toaster />{view === "hub" ? <GameHub onSelectAuction={() => setView("auction")} onSelectAftakar={() => setView("aftakar")} onSelectVar={() => setView("var")} onSelectMenByehbad={() => setView("menbyehbad")} /> : view === "auction" ? <Home onBackToHub={() => setView("hub")} /> : view === "aftakar" ? <Aftakar onBackToHub={() => setView("hub")} /> : view === "var" ? <VarGame onBackToHub={() => setView("hub")} /> : <MenByehbad onBackToHub={() => setView("hub")} />}</TooltipProvider></ThemeProvider></ErrorBoundary>;
}

export default App;
