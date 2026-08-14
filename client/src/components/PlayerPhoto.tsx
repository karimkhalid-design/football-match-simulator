import React, { useEffect, useMemo, useState } from "react";
import { Goal } from "lucide-react";
import { PLAYER_IMAGE_URLS } from "@/lib/playerImageMap";

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

export default function PlayerPhoto({ name, className = "", loading = "lazy" }: { name: string; className?: string; loading?: "lazy" | "eager" }) {
  const primary = PLAYER_IMAGE_URLS[name] ?? null;
  const sources = useMemo(() => {
    const encodedName = encodeURIComponent(name.replaceAll(" ", "_"));
    const uiAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=152a27&color=f2ca72&bold=true&format=png&size=256`;
    return Array.from(new Set([
      primary,
      `https://en.wikipedia.org/wiki/Special:FilePath/${encodedName}.jpg?width=330`,
      `https://en.wikipedia.org/wiki/Special:FilePath/${encodedName}.png?width=330`,
      `https://commons.wikimedia.org/wiki/Special:FilePath/${encodedName}.jpg?width=330`,
      uiAvatar,
    ].filter(Boolean) as string[]));
  }, [name, primary]);
  const [sourceIndex, setSourceIndex] = useState(0);

  useEffect(() => setSourceIndex(0), [name, primary]);

  if (!sources[sourceIndex]) return <span className={`player-photo player-photo-fallback ${className}`} aria-label={`صورة ${name}`}><b>{initials(name)}</b><Goal /></span>;
  return <img className={`player-photo ${className}`} src={sources[sourceIndex]} alt={name} loading={loading} fetchPriority={loading === "eager" ? "high" : "auto"} onError={() => setSourceIndex((current) => current + 1)} />;
}
