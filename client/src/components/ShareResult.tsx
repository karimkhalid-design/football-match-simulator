import React, { useEffect, useMemo, useState } from "react";
import { Check, Copy, Download, Image as ImageIcon, Share2, Trophy, X } from "lucide-react";

export type ShareScoreRow = { label: string; score: string | number; detail?: string };
export type ShareResultProps = {
  gameName: string;
  eyebrow?: string;
  winnerName: string;
  winnerScore: string | number;
  rows: ShareScoreRow[];
  highlights?: string[];
  accent?: string;
  triggerLabel?: string;
  triggerClassName?: string;
};

const CANVAS_WIDTH = 1080;
const CANVAS_HEIGHT = 1350;
const KORA_LOGO_URL = "/manus-storage/kora-keda-app-icon_9f5a2e2f.png";

const roundedRect = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) => {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
};

const fitText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number) => {
  let value = text;
  while (value.length > 2 && ctx.measureText(value).width > maxWidth) value = `${value.slice(0, -2)}…`;
  return value;
};

const loadLogo = () => new Promise<HTMLImageElement | null>((resolve) => {
  const image = new Image();
  let settled = false;
  const finish = (value: HTMLImageElement | null) => {
    if (settled) return;
    settled = true;
    resolve(value);
  };
  image.onload = () => finish(image);
  image.onerror = () => finish(null);
  image.src = KORA_LOGO_URL;
  window.setTimeout(() => finish(null), 1200);
});

const canvasToBlob = (canvas: HTMLCanvasElement) => new Promise<Blob | null>((resolve) => {
  if (typeof canvas.toBlob === "function") {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else resolve(null);
    }, "image/png", 0.94);
    return;
  }
  try {
    const dataUrl = canvas.toDataURL("image/png");
    if (!dataUrl) { resolve(null); return; }
    void fetch(dataUrl).then((response) => response.blob()).then(resolve).catch(() => resolve(null));
  } catch {
    resolve(null);
  }
});

const generateScoreImage = async (data: ShareResultProps) => {
  const canvas = document.createElement("canvas");
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const accent = data.accent ?? "#c4fb61";
  const logo = await loadLogo();
  const background = ctx.createLinearGradient(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  background.addColorStop(0, "#07120d");
  background.addColorStop(0.52, "#102b1d");
  background.addColorStop(1, "#050907");
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  const glow = ctx.createRadialGradient(180, 120, 10, 180, 120, 650);
  glow.addColorStop(0, `${accent}55`);
  glow.addColorStop(1, `${accent}00`);
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  if (logo) {
    ctx.save();
    ctx.shadowColor = `${accent}88`;
    ctx.shadowBlur = 35;
    ctx.beginPath();
    ctx.arc(145, 145, 82, 0, Math.PI * 2);
    ctx.fillStyle = "#09130d";
    ctx.fill();
    ctx.clip();
    ctx.drawImage(logo, 63, 63, 164, 164);
    ctx.restore();
    ctx.strokeStyle = accent;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(145, 145, 88, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.direction = "rtl";
  ctx.textAlign = "right";
  ctx.fillStyle = "#c4fb61";
  ctx.font = "600 30px Arial";
  ctx.fillText("KORA KEDA · SCORE CARD", 960, 95);
  ctx.fillStyle = "#f3f8f2";
  ctx.font = "800 74px Arial";
  ctx.fillText(fitText(ctx, data.gameName, 900), 960, 200);
  ctx.fillStyle = "#a6b9aa";
  ctx.font = "400 30px Arial";
  ctx.fillText(data.eyebrow ?? "نتيجة اللعبة", 960, 255);

  roundedRect(ctx, 70, 315, 940, 255, 34);
  ctx.fillStyle = "#173a27";
  ctx.fill();
  ctx.strokeStyle = `${accent}99`;
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = "#ffcd6e";
  ctx.font = "700 32px Arial";
  ctx.fillText("الفائز", 940, 375);
  ctx.fillStyle = "#ffffff";
  ctx.font = "800 66px Arial";
  ctx.fillText(fitText(ctx, data.winnerName, 730), 940, 460);
  ctx.fillStyle = accent;
  ctx.font = "800 58px Arial";
  ctx.fillText(String(data.winnerScore), 940, 530);

  ctx.fillStyle = "#f3f8f2";
  ctx.font = "700 34px Arial";
  ctx.fillText("النتيجة والتفاصيل", 960, 655);
  let y = 720;
  data.rows.slice(0, 8).forEach((row, index) => {
    roundedRect(ctx, 70, y - 42, 940, 92, 18);
    ctx.fillStyle = index % 2 === 0 ? "#10251a" : "#0d1e15";
    ctx.fill();
    ctx.fillStyle = "#f3f8f2";
    ctx.font = "700 31px Arial";
    ctx.fillText(fitText(ctx, row.label, 520), 930, y + 5);
    ctx.fillStyle = accent;
    ctx.font = "800 34px Arial";
    ctx.fillText(String(row.score), 300, y + 5);
    if (row.detail) {
      ctx.fillStyle = "#91a698";
      ctx.font = "400 22px Arial";
      ctx.fillText(fitText(ctx, row.detail, 500), 930, y + 35);
    }
    y += 108;
  });

  if (data.highlights?.length) {
    ctx.fillStyle = "#ffcd6e";
    ctx.font = "700 27px Arial";
    ctx.fillText(data.highlights.slice(0, 2).join("  ·  "), 960, 1225);
  }
  ctx.fillStyle = "#789182";
  ctx.font = "400 24px Arial";
  ctx.fillText("صناعة كريم · كورة كده", 960, 1290);
  return canvasToBlob(canvas);
};

export default function ShareResult({ triggerLabel = "شارك النتيجة", triggerClassName = "share-result-trigger", gameName, eyebrow, winnerName, winnerScore, rows, highlights, accent }: ShareResultProps) {
  const data = useMemo(() => ({ gameName, eyebrow, winnerName, winnerScore, rows, highlights, accent }), [gameName, eyebrow, winnerName, winnerScore, rows, highlights, accent]);
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [saving, setSaving] = useState(false);
  const shareUrl = useMemo(() => window.location.href, []);

  useEffect(() => {
    if (!open) return;
    let active = true;
    setImageBlob(null);
    setImageUrl(null);
    void generateScoreImage(data).then((blob) => {
      if (!active || !blob) return;
      setImageBlob(blob);
      setImageUrl(URL.createObjectURL(blob));
    });
    return () => { active = false; };
  }, [open, data]);

  useEffect(() => () => { if (imageUrl) URL.revokeObjectURL(imageUrl); }, [imageUrl]);

  const share = async () => {
    setSharing(true);
    try {
      const file = imageBlob ? new File([imageBlob], "kora-keda-score.png", { type: "image/png" }) : null;
      if (navigator.share) {
        const canShareFile = file && navigator.canShare?.({ files: [file] });
        await navigator.share({ title: `${data.gameName} · كورة كده`, text: `${data.winnerName} كسب! النتيجة: ${data.winnerScore}`, url: shareUrl, ...(canShareFile ? { files: [file] } : {}) });
      } else {
        await navigator.clipboard?.writeText(shareUrl);
        setCopied(true);
      }
    } catch (error) {
      if ((error as DOMException).name !== "AbortError") {
        await navigator.clipboard?.writeText(shareUrl);
        setCopied(true);
      }
    } finally {
      setSharing(false);
    }
  };

  const copyLink = async () => {
    await navigator.clipboard?.writeText(shareUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const download = async () => {
    setSaving(true);
    let url = imageUrl;
    let revokeAfter = false;
    try {
      if (!url) {
        const blob = await generateScoreImage(data);
        if (blob) {
          url = URL.createObjectURL(blob);
          revokeAfter = true;
        }
      }
      if (!url) {
        const escapeXml = (value: string | number) => String(value).replace(/[&<>\"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\\\"": "&quot;", "'": "&apos;" }[character] ?? character));
        const fallbackSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350"><rect width="1080" height="1350" fill="#07120d"/><rect x="50" y="50" width="980" height="1250" rx="42" fill="#12311f" stroke="#c4fb61" stroke-width="5"/><text x="960" y="150" text-anchor="end" fill="#c4fb61" font-size="34" font-family="Arial">KORA KEDA · SCORE CARD</text><text x="960" y="260" text-anchor="end" fill="white" font-size="72" font-weight="700" font-family="Arial">${escapeXml(data.gameName)}</text><text x="960" y="430" text-anchor="end" fill="#ffcd6e" font-size="34" font-family="Arial">الفائز</text><text x="960" y="530" text-anchor="end" fill="white" font-size="68" font-weight="700" font-family="Arial">${escapeXml(data.winnerName)}</text><text x="960" y="640" text-anchor="end" fill="#c4fb61" font-size="58" font-weight="700" font-family="Arial">${escapeXml(data.winnerScore)}</text><text x="960" y="1230" text-anchor="end" fill="#9db4a3" font-size="28" font-family="Arial">صناعة كريم · كورة كده</text></svg>`;
        url = URL.createObjectURL(new Blob([fallbackSvg], { type: "image/svg+xml" }));
        revokeAfter = true;
      }
      const link = document.createElement("a");
      link.href = url;
      link.download = "kora-keda-score.png";
      link.click();
    } finally {
      if (revokeAfter && url) window.setTimeout(() => URL.revokeObjectURL(url as string), 1000);
      setSaving(false);
    }
  };

  return <>
    <button type="button" className={triggerClassName} onClick={() => setOpen(true)}><Share2 /> {triggerLabel}</button>
    {open && <div className="share-result-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <section className="share-result-modal" role="dialog" aria-modal="true" aria-labelledby="share-result-title" dir="rtl">
        <button type="button" className="share-result-close" aria-label="إغلاق نافذة المشاركة" onClick={() => setOpen(false)}><X /></button>
        <div className="share-result-heading"><img className="share-result-logo" src={KORA_LOGO_URL} alt="شعار كورة كده" /><span className="share-result-icon"><Trophy /></span><div><p>نتيجتك جاهزة للمشاركة</p><h2 id="share-result-title">خلي أصحابك يعرفوا مين كسب</h2></div></div>
        <div className="share-result-card"><span>{data.eyebrow ?? "النتيجة النهائية"}</span><h3>{data.gameName}</h3><small>الفائز</small><strong>{data.winnerName}</strong><b>{data.winnerScore}</b><div className="share-result-mini-grid">{data.rows.slice(0, 4).map((row) => <div key={row.label}><small>{row.label}</small><b>{row.score}</b></div>)}</div></div>
        <p className="share-result-copy">شارك كارت النتيجة كصورة أو ابعت رابط الجولة لأصحابك.</p>
        <div className="share-result-actions"><button type="button" className="share-result-primary" onClick={share} disabled={sharing}>{sharing ? "جاري التجهيز…" : <><Share2 /> مشاركة</>}</button><button type="button" className="share-result-secondary" onClick={download} aria-busy={saving}><ImageIcon /> {saving ? "جاري الحفظ…" : "حفظ الصورة"}</button><button type="button" className="share-result-secondary" onClick={copyLink}>{copied ? <><Check /> تم النسخ</> : <><Copy /> نسخ الرابط</>}</button></div>
        <p className="share-result-note"><Download /> الصورة تتولد تلقائياً بتفاصيل النتيجة واسم الفائز.</p>
      </section>
    </div>}
  </>;
}

export { generateScoreImage };
