import React, { useEffect, useMemo, useState } from "react";
import { io, type Socket } from "socket.io-client";
import { startLogin } from "@/const";
import { useAuth } from "../_core/hooks/useAuth";
import { ArrowRight, Check, Copy, Crown, Flame, Link2, LoaderCircle, LockKeyhole, Play, RotateCcw, Share2, Trophy, Volume2, VolumeX, X, Zap } from "lucide-react";
import ShareResult from "../components/ShareResult";

const ONLINE_LOGO_URL = "/manus-storage/online-quiz_c48ff820.png";
type Category = "random" | "general" | "football" | "movies" | "games" | "geography" | "science" | "history" | "technology" | "music" | "fun";
type Difficulty = "easy" | "medium" | "hard";
type OnlineState = any;

const categoryOptions: Array<[Category, string]> = [["random", "عشوائي 🎲"], ["football", "كرة القدم ⚽"], ["general", "معلومات عامة 🧠"], ["movies", "أفلام 🎬"], ["games", "ألعاب 🎮"], ["geography", "جغرافيا 🌍"], ["science", "علوم 🔬"], ["history", "تاريخ 📚"], ["technology", "تكنولوجيا 💻"], ["music", "موسيقى 🎵"], ["fun", "خفيفة ومضحكة 😂"]];

export default function OnlineQuiz({ onBack }: { onBack: () => void }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [screen, setScreen] = useState<"home" | "auth" | "username" | "name" | "create" | "join" | "room" | "leaderboard">("home");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [category, setCategory] = useState<Category>("random");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [token, setToken] = useState(() => sessionStorage.getItem("kora-online-token") ?? "");
  const [state, setState] = useState<OnlineState>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [muted, setMuted] = useState(() => localStorage.getItem("kora-online-muted") === "1");
  const [now, setNow] = useState(Date.now());
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [usernameDraft, setUsernameDraft] = useState("");
  const { user, loading: authLoading, isAuthenticated, logout, setUsername, settingUsername } = useAuth();
  const accountName = user?.name?.trim() || user?.email?.split("@")[0] || "لاعب";

  useEffect(() => {
    const inviteCode = window.location.hash.match(/[?&]room=([A-Z0-9]{5})/i)?.[1];
    if (inviteCode) { setCode(inviteCode.toUpperCase()); (window as any).__onlineIntent = "join"; setScreen("auth"); }
    const client = io(window.location.origin, { transports: ["websocket", "polling"] });
    client.on("room_state", (nextState) => { setState(nextState); setScreen("room"); });
    client.on("connect_error", () => setError("تعذر الاتصال بالخادم. جرّب مرة أخرى."));
    setSocket(client);
    return () => { client.disconnect(); };
  }, []);

  useEffect(() => {
    if (authLoading || !isAuthenticated) return;
    const pendingIntent = sessionStorage.getItem("kora-online-auth-intent") as "create" | "join" | null;
    if (pendingIntent) {
      setName(user?.username || accountName);
      if (user?.username) {
        setScreen(pendingIntent);
        sessionStorage.removeItem("kora-online-auth-intent");
      } else {
        setUsernameDraft("");
        setScreen("username");
      }
    }
  }, [accountName, authLoading, isAuthenticated, user?.username]);

  useEffect(() => { if (state?.status !== "question") return; const interval = window.setInterval(() => setNow(Date.now()), 100); return () => window.clearInterval(interval); }, [state?.status, state?.round]);
  useEffect(() => { localStorage.setItem("kora-online-muted", muted ? "1" : "0"); }, [muted]);

  const secondsLeft = useMemo(() => state?.question ? Math.max(0, Math.ceil((state.question.durationMs - (now - state.question.startedAt)) / 1000)) : 0, [state?.question, now]);
  const self = state?.players?.find((player: any) => player.isYou);
  const opponent = state?.players?.find((player: any) => !player.isYou);
  const winner = state?.scores?.slice().sort((a: any, b: any) => b.score - a.score)?.[0];
  const goName = (next: "create" | "join") => { setError(""); setCode(next === "join" ? code : ""); setName(user?.username || accountName); setCategory("random"); setDifficulty("medium"); (window as any).__onlineIntent = next; sessionStorage.setItem("kora-online-auth-intent", next); if (!isAuthenticated) return setScreen("auth"); if (!user?.username) { setUsernameDraft(""); return setScreen("username"); } setScreen(next); };
  const emit = (event: string, payload: any, callback?: (response: any) => void) => { if (!socket) return; socket.emit(event, payload, callback); };
  const submitName = () => { if (!name.trim()) return setError("اكتب اسمك الأول"); setError(""); setScreen((window as any).__onlineIntent === "create" ? "create" : "join"); };
  const submitUsername = async () => {
    const normalized = usernameDraft.trim().toLowerCase();
    if (!/^[a-z0-9_]{3,24}$/.test(normalized)) return setError("استخدم 3 إلى 24 حرفاً إنجليزياً أو رقماً أو _");
    try {
      await setUsername({ username: normalized });
      setName(normalized);
      setError("");
      const pendingIntent = sessionStorage.getItem("kora-online-auth-intent") as "create" | "join" | null;
      sessionStorage.removeItem("kora-online-auth-intent");
      setScreen(pendingIntent ?? "home");
    } catch (submitError: any) {
      setError(submitError?.message ?? "اسم المستخدم مستخدم بالفعل");
    }
  };
  const createRoom = () => emit("create_room", { nickname: (name || accountName).trim(), category: "football", difficulty }, (response) => { if (!response?.ok) return setError("تعذر إنشاء الغرفة"); sessionStorage.setItem("kora-online-token", response.token); setToken(response.token); setState(response.state); setScreen("room"); });
  const joinRoom = () => emit("join_room", { code, nickname: (name || accountName).trim(), token }, (response) => { if (!response?.ok) return setError(response?.error ?? "تعذر دخول الغرفة"); sessionStorage.setItem("kora-online-token", response.token); setToken(response.token); setState(response.state); setScreen("room"); });
  const setReady = () => emit("set_ready", { token });
  const answer = (optionIndex: number) => { if (!state?.ownAnswer && state?.status === "question" && !state?.bonus?.eliminatedOptions?.includes(optionIndex)) emit("answer", { token, optionIndex }); };
  const useBonusAid = () => emit("use_bonus_aid", { token });
  const copyCode = async () => { if (!state?.roomCode) return; await navigator.clipboard?.writeText(state.roomCode); setCopied(true); window.setTimeout(() => setCopied(false), 1600); };
  const copyInvite = async () => { if (!state?.roomCode) return; await navigator.clipboard?.writeText(`${window.location.origin}/#online?room=${state.roomCode}`); setCopied(true); window.setTimeout(() => setCopied(false), 1600); };
  const playAgain = () => emit("play_again", { token });
  const showLeaderboard = () => { emit("get_leaderboard", (response: any) => { setLeaderboard(response?.rows ?? []); setScreen("leaderboard"); }); };

  const shell = (content: React.ReactNode) => <main className="online-game" dir="rtl"><div className="online-orb online-orb-blue" /><div className="online-orb online-orb-red" /><header className="online-header"><button type="button" className="online-back" onClick={onBack}><ArrowRight /> التصنيفات</button><button type="button" className="online-sound" aria-label={muted ? "تشغيل الصوت" : "كتم الصوت"} onClick={() => setMuted((value) => !value)}>{muted ? <VolumeX /> : <Volume2 />}</button></header>{content}</main>;

  if (screen === "home") return shell(<section className="online-hero"><img className="online-logo" src={ONLINE_LOGO_URL} alt="هتعرف تجاوب؟" /><p className="online-eyebrow">ONLINE FOOTBALL QUIZ · 1 VS 1</p><h1>هتعرف تجاوب؟</h1><p className="online-lead">اختبر معلوماتك… واتحدى صاحبك!<br />غرفة حقيقية، إجابات حقيقية، وفائز واحد.</p>{isAuthenticated && <div className="online-account-chip"><span>مرحباً، {accountName}</span><button type="button" onClick={() => void logout()}>خروج</button></div>}<div className="online-home-actions"><button type="button" className="online-primary" onClick={() => goName("create")}><Play /> اعمل لعبة</button><button type="button" className="online-secondary" onClick={() => goName("join")}><Link2 /> ادخل بكود</button><button type="button" className="online-ghost" onClick={showLeaderboard}><Trophy /> المتصدرين</button></div>{error && <p className="online-error">{error}</p>}<small className="online-credit">صناعة كريم · كورة كده</small></section>);

  if (screen === "username") return shell(<section className="online-panel online-username-panel"><img className="online-mini-logo" src={ONLINE_LOGO_URL} alt="" /><p className="online-eyebrow">هوية اللاعب · كورة كده</p><h1>اختار Username ثابت</h1><p className="online-lead">الاسم ده هيظهر في الغرف والمتصدرين ودعوات أصحابك.</p><input className="online-input online-username-input" autoFocus value={usernameDraft} maxLength={24} onChange={(event) => { setUsernameDraft(event.target.value.replace(/[^a-zA-Z0-9_]/g, "")); setError(""); }} onKeyDown={(event) => event.key === "Enter" && void submitUsername()} placeholder="مثال: karim_10" />{error && <p className="online-error">{error}</p>}<button type="button" className="online-primary" onClick={() => void submitUsername()} disabled={settingUsername}>{settingUsername ? <LoaderCircle className="online-spinner" /> : <Check />} {settingUsername ? "جاري الحفظ…" : "حفظ Username"}</button><small className="online-auth-note">الاسم ثابت لحسابك، ويمكن تغييره لاحقاً من إعدادات الأونلاين.</small></section>);

  if (screen === "auth") return shell(<section className="online-panel online-auth-panel"><img className="online-mini-logo" src={ONLINE_LOGO_URL} alt="" /><p className="online-eyebrow">الأونلاين فقط · حسابك محفوظ</p><h1>سجّل دخولك</h1><p className="online-lead">بدل ما تكتب اسمك كل مرة، استخدم حسابك وادخل تلعب مع أصحابك بسهولة.</p><div className="online-auth-provider-grid"><button type="button" className="online-auth-provider online-google" onClick={() => startLogin()}><b>G</b><span>تسجيل سريع عبر Google</span></button><button type="button" className="online-auth-provider online-apple" onClick={() => startLogin()}><b>●</b><span>تسجيل سريع عبر Apple</span></button></div><small className="online-auth-note">سيتم فتح بوابة الدخول الآمنة لاختيار Google أو Apple. باقي الألعاب لا تحتاج تسجيل دخول.</small>{error && <p className="online-error">{error}</p>}<button type="button" className="online-text-button" onClick={() => setScreen("home")}>رجوع</button></section>);

  if (screen === "leaderboard") return shell(<section className="online-panel online-leaderboard-panel"><Trophy className="online-trophy" /><p className="online-eyebrow">RATING · ONLINE</p><h1>المتصدرين</h1>{leaderboard.length ? <div className="online-leaderboard">{leaderboard.map((row) => <div className="online-leaderboard-row" key={row.nickname}><b>#{row.rank}</b><span>{row.nickname}<small>{row.wins} فوز · {row.draws} تعادل · {row.losses} خسارة</small></span><strong>{row.rating}</strong></div>)}</div> : <p className="online-lead">لسه مفيش مباريات مسجلة. اعمل أول تحدي وابدأ ترتيبك!</p>}<button type="button" className="online-text-button" onClick={() => setScreen("home")}>رجوع</button></section>);

  if (screen === "name") return shell(<section className="online-panel"><img className="online-mini-logo" src={ONLINE_LOGO_URL} alt="" /><p className="online-eyebrow">خطوة واحدة ونبدأ</p><h1>اكتب اسمك</h1><p className="online-lead">اسم مستعار فقط، من غير تسجيل حساب.</p><input className="online-input" autoFocus value={name} maxLength={24} onChange={(event) => setName(event.target.value)} onKeyDown={(event) => event.key === "Enter" && submitName()} placeholder="اكتب اسمك هنا" />{error && <p className="online-error">{error}</p>}<button type="button" className="online-primary" onClick={submitName}><ArrowRight /> دخول</button><button type="button" className="online-text-button" onClick={() => setScreen("home")}>رجوع</button></section>);

  if (screen === "create") return shell(<section className="online-panel online-create-panel"><img className="online-mini-logo" src={ONLINE_LOGO_URL} alt="" /><p className="online-eyebrow">إعداد الغرفة</p><h1>اختار التحدي</h1><div className="online-label">الفئة<div className="online-category-fixed">⚽ كرة القدم فقط</div></div><div className="online-difficulty"><span className="online-label">الصعوبة</span>{([ ["easy", "سهل", "🟢"], ["medium", "متوسط", "🟡"], ["hard", "صعب", "🔴"]] as const).map(([value, label, icon]) => <button type="button" key={value} className={difficulty === value ? "active" : ""} onClick={() => setDifficulty(value)}>{icon} {label}</button>)}</div><button type="button" className="online-primary" onClick={createRoom}><Crown /> اعمل الغرفة</button></section>);

  if (screen === "join") return shell(<section className="online-panel"><img className="online-mini-logo" src={ONLINE_LOGO_URL} alt="" /><p className="online-eyebrow">جاهز للتحدي؟</p><h1>ادخل بكود الغرفة</h1><p className="online-lead">اكتب الكود الذي أرسله لك صاحبك.</p><input className="online-input online-code-input" autoFocus value={code} maxLength={5} onChange={(event) => setCode(event.target.value.toUpperCase())} onKeyDown={(event) => event.key === "Enter" && joinRoom()} placeholder="A7K92" />{error && <p className="online-error">{error}</p>}<button type="button" className="online-primary" onClick={joinRoom}><Link2 /> انضم</button><button type="button" className="online-text-button" onClick={() => setScreen("home")}>رجوع</button></section>);

  if (!state) return shell(<section className="online-panel"><LoaderCircle className="online-spinner" /><h1>جاري الاتصال…</h1></section>);
  if (state.status === "lobby" || state.status === "countdown") return shell(<section className="online-room-panel"><div className="online-room-top"><img className="online-mini-logo" src={ONLINE_LOGO_URL} alt="" /><div><p className="online-eyebrow">هتعرف تجاوب؟ · ROOM</p><h1>{state.roomCode}</h1></div><button type="button" className="online-copy-icon" onClick={copyCode} aria-label="نسخ كود الغرفة">{copied ? <Check /> : <Copy />}</button></div><div className="online-invite"><span>ابعت الكود لصاحبك</span><strong>{state.roomCode}</strong><div><button type="button" onClick={copyCode}><Copy /> {copied ? "تم النسخ" : "نسخ الكود"}</button><button type="button" onClick={copyInvite}><Share2 /> مشاركة الرابط</button></div></div><div className="online-vs-players"><PlayerSlot player={self} you /><b>VS</b><PlayerSlot player={opponent} /></div>{state.status === "countdown" ? <div className="online-countdown"><span>استعد!</span><strong>GO!</strong></div> : <><p className="online-room-note">{opponent ? "لما اللاعبان يدوسوا جاهز، المباراة هتبدأ عندكم معاً." : "في انتظار دخول اللاعب الثاني…"}</p><button type="button" className={`online-primary ${self?.ready ? "ready" : ""}`} onClick={setReady}><Check /> {self?.ready ? "جاهز ✓" : "جاهز"}</button></>}</section>);

  if (state.status === "finished") return shell(<section className="online-finished"><Crown className="online-trophy" /><p className="online-eyebrow">المباراة انتهت</p><h1>{winner?.nickname === self?.nickname ? "أنت الفائز!" : winner?.score === self?.score ? "تعادل!" : `${winner?.nickname} كسب!`}</h1><div className="online-final-score">{state.scores?.map((score: any) => <div key={score.nickname}><span>{score.nickname}</span><strong>{score.score}</strong><small>{score.combo >= 3 ? `🔥 ${score.combo} Combo` : "أداء جامد"}</small></div>)}</div><div className="online-finished-actions"><button type="button" className="online-primary" onClick={playAgain}><RotateCcw /> العب مرة أخرى</button><ShareResult gameName="هتعرف تجاوب؟" eyebrow="مباراة أونلاين · 1 ضد 1" winnerName={winner?.nickname ?? "الفائز"} winnerScore={winner?.score ?? 0} rows={state.scores?.map((score: any) => ({ label: score.nickname, score: score.score, detail: score.combo ? `أفضل Combo: ${score.combo}` : undefined })) ?? []} highlights={[state.settings?.categoryLabel, "10 أسئلة", "كورة كده"]} accent="#2dd4ff" triggerLabel="شارك النتيجة" triggerClassName="online-secondary" /><button type="button" className="online-text-button" onClick={onBack}>الصفحة الرئيسية</button></div></section>);

  return shell(<section className="online-question-panel"><div className="online-score-bar"><Score player={self} /><div className="online-round"><span>السؤال</span><strong>{state.round} / {state.totalRounds}</strong><b className={secondsLeft <= 3 ? "danger" : ""}><Zap /> {secondsLeft}</b></div><Score player={opponent} /></div><div className="online-bonus-meter"><div className="online-bonus-head"><span><Zap /> عداد السرعة</span><strong>{state.bonus?.charge ?? 0}%</strong></div><div className="online-bonus-track"><span style={{ width: `${state.bonus?.charge ?? 0}%` }} /></div>{state.bonus?.aidAvailable ? <button type="button" className="online-bonus-button" onClick={useBonusAid} disabled={Boolean(state.ownAnswer)}><Zap /> استخدم المساعدة: احذف إجابتين غلط</button> : <small>لو أجبت صح أسرع من خصمك، العداد يزيد. عند 100% تفتح مساعدة خاصة لك.</small>}</div><div className="online-question-meta"><span>{state.question?.category}</span><span>{state.question?.difficulty}</span></div><h1 className="online-question">{state.question?.prompt}</h1><div className="online-options">{state.question?.options?.map((option: string, index: number) => { const eliminated = state.bonus?.eliminatedOptions?.includes(index); return <button type="button" key={option} disabled={Boolean(state.ownAnswer) || eliminated} className={`${state.ownAnswer?.optionIndex === index ? "selected" : ""} ${eliminated ? "eliminated" : ""}`} onClick={() => answer(index)}><b>{eliminated ? "×" : String.fromCharCode(65 + index)}</b>{eliminated ? "اختيار محذوف" : option}</button>; })}</div>{state.ownAnswer ? <div className="online-waiting"><Check /> تم تسجيل إجابتك · في انتظار إجابة الخصم</div> : <p className="online-question-note">اختار إجابة واحدة فقط — السرعة بتفرق!</p>}{state.status === "round_result" && <div className="online-round-result"><strong>{state.ownAnswer?.correct ? "إجابة صحيحة!" : "إجابة غير صحيحة"}</strong><span>{state.ownAnswer?.points ? `+${state.ownAnswer.points} نقطة` : "0 نقطة"}</span></div>}</section>);
}

function PlayerSlot({ player, you = false }: { player?: any; you?: boolean }) { return <div className={`online-player-slot ${player ? "filled" : "empty"}`}><div className="online-avatar">{player ? player.nickname.slice(0, 1).toUpperCase() : "?"}</div><span>{player ? player.nickname : "في انتظار اللاعب…"}</span><small>{player ? (player.connected ? (player.ready ? "🟢 Ready" : "🟢 Online") : "🟡 جاري إعادة الاتصال") : "🟡 Waiting"}{you ? " · أنت" : ""}</small></div>; }
function Score({ player }: { player?: any }) { return <div className="online-score"><span>{player?.nickname ?? "في انتظار…"}</span><strong>{player?.score ?? 0}</strong>{player?.combo >= 3 && <small><Flame /> {player.combo} Combo</small>}</div>; }
