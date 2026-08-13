import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import GameHub from "./pages/GameHub";
import Home from "./pages/Home";
import Aftakar from "./pages/Aftakar";
import VarGame from "./pages/VarGame";

function App() {
  const [view, setView] = useState<"hub" | "auction" | "aftakar" | "var">(() => window.location.hash === "#aftakar" ? "aftakar" : window.location.hash === "#var" ? "var" : "hub");
  return <ErrorBoundary><ThemeProvider defaultTheme="dark"><TooltipProvider><Toaster />{view === "hub" ? <GameHub onSelectAuction={() => setView("auction")} onSelectAftakar={() => setView("aftakar")} onSelectVar={() => setView("var")} /> : view === "auction" ? <Home onBackToHub={() => setView("hub")} /> : view === "aftakar" ? <Aftakar onBackToHub={() => setView("hub")} /> : <VarGame onBackToHub={() => setView("hub")} />}</TooltipProvider></ThemeProvider></ErrorBoundary>;
}

export default App;
