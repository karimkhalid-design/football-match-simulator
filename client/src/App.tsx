import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import GameHub from "./pages/GameHub";
import Home from "./pages/Home";

function App() {
  const [view, setView] = useState<"hub" | "auction">("hub");
  return <ErrorBoundary><ThemeProvider defaultTheme="dark"><TooltipProvider><Toaster />{view === "hub" ? <GameHub onSelectAuction={() => setView("auction")} /> : <Home onBackToHub={() => setView("hub")} />}</TooltipProvider></ThemeProvider></ErrorBoundary>;
}

export default App;
