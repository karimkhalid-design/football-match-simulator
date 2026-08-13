import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import GameHub from "./pages/GameHub";
import Home from "./pages/Home";
import Aftakar from "./pages/Aftakar";

function App() {
  const [view, setView] = useState<"hub" | "auction" | "aftakar">(() => window.location.hash === "#aftakar" ? "aftakar" : "hub");
  return <ErrorBoundary><ThemeProvider defaultTheme="dark"><TooltipProvider><Toaster />{view === "hub" ? <GameHub onSelectAuction={() => setView("auction")} onSelectAftakar={() => setView("aftakar")} /> : view === "auction" ? <Home onBackToHub={() => setView("hub")} /> : <Aftakar onBackToHub={() => setView("hub")} />}</TooltipProvider></ThemeProvider></ErrorBoundary>;
}

export default App;
