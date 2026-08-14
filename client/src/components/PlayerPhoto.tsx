import React, { useEffect, useMemo, useState } from "react";
import { Goal } from "lucide-react";
import { PLAYER_IMAGE_URLS } from "@/lib/playerImageMap";

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

export default function PlayerPhoto({ name, className = "", loading = "lazy" }: { name: string; className?: string; loading?: "lazy" | "eager" }) {
  const primary = PLAYER_IMAGE_URLS[name] ?? null;
  const [source, setSource] = useState(primary);
  const [failed, setFailed] = useState(false);
  const fallback = useMemo(() => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=152a27&color=f2ca72&bold=true&format=png&size=256`, [name]);

  useEffect(() => {
    setSource(primary);
    setFailed(false);
  }, [primary]);

  if (failed || !source) return <span className={`player-photo player-photo-fallback ${className}`} aria-label={`صورة ${name}`}><b>{initials(name)}</b><Goal /></span>;
  return <img className={`player-photo ${className}`} src={source} alt={name} loading={loading} fetchPriority={loading === "eager" ? "high" : "auto"} onError={() => { if (source !== fallback) setSource(fallback); else setFailed(true); }} />;
}
