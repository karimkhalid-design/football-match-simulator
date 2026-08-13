import type { Server, Socket } from "socket.io";
import { nanoid } from "nanoid";
import { categoryLabels, difficultyLabels, onlineQuestions, type OnlineCategory, type OnlineDifficulty, type OnlineQuestion } from "./onlineGameData";

type Player = { token: string; nickname: string; connected: boolean; ready: boolean; score: number; combo: number; socketId?: string; disconnectedAt?: number; playAgain: boolean };
type Answer = { optionIndex: number; correct: boolean; points: number; elapsedMs: number; combo: number };
type Room = { code: string; hostToken: string; players: Map<string, Player>; settings: { category: OnlineCategory | "random"; difficulty: OnlineDifficulty; totalRounds: number }; questions: OnlineQuestion[]; status: "lobby" | "countdown" | "question" | "round_result" | "finished"; currentRound: number; roundStartedAt: number; answers: Map<string, Answer>; roundResults: Array<{ token: string; correct: boolean; points: number; combo: number; elapsedMs: number }>; timer?: ReturnType<typeof setTimeout>; resultTimer?: ReturnType<typeof setTimeout> };

const rooms = new Map<string, Room>();
const leaderboard = new Map<string, { nickname: string; wins: number; draws: number; losses: number; rating: number }>();
const TIMER_MS = 10_000;
const RESULT_MS = 2_300;

const shuffle = <T,>(items: T[]) => [...items].sort(() => Math.random() - 0.5);
const createCode = () => { let code = ""; do code = nanoid(5).toUpperCase().replace(/[^A-Z0-9]/g, "A"); while (rooms.has(code)); return code; };
const chooseQuestions = (category: Room["settings"]["category"], difficulty: OnlineDifficulty) => {
  const pool = onlineQuestions.filter((item) => (category === "random" || item.category === category) && item.difficulty === difficulty);
  const fallback = onlineQuestions.filter((item) => category === "random" || item.category === category);
  return shuffle(pool.length >= 10 ? pool : fallback).slice(0, 10);
};
const roomFor = (socket: Socket, token: string) => Array.from(rooms.values()).find((room) => room.players.get(token)?.socketId === socket.id);
const broadcast = (io: Server, room: Room) => io.to(room.code).emit("room_state", Array.from(room.players.values()).map((player) => player.socketId ? publicState(room, player.token) : null).filter(Boolean));
const currentQuestion = (room: Room) => room.questions[room.currentRound];
const leaderboardRows = () => Array.from(leaderboard.values()).sort((a, b) => b.rating - a.rating).slice(0, 50).map((row, index) => ({ rank: index + 1, ...row }));
function recordMatch(room: Room) { const players = Array.from(room.players.values()); if (players.length !== 2) return; const [first, second] = players; const firstRow = leaderboard.get(first.nickname) ?? { nickname: first.nickname, wins: 0, draws: 0, losses: 0, rating: 1000 }; const secondRow = leaderboard.get(second.nickname) ?? { nickname: second.nickname, wins: 0, draws: 0, losses: 0, rating: 1000 }; if (first.score === second.score) { firstRow.draws += 1; secondRow.draws += 1; firstRow.rating += 5; secondRow.rating += 5; } else { const winner = first.score > second.score ? firstRow : secondRow; const loser = first.score > second.score ? secondRow : firstRow; winner.wins += 1; loser.losses += 1; winner.rating += 20; loser.rating = Math.max(0, loser.rating - 15); } leaderboard.set(first.nickname, firstRow); leaderboard.set(second.nickname, secondRow); }

function publicState(room: Room, token: string) {
  const self = room.players.get(token);
  const question = currentQuestion(room);
  const state = {
    roomCode: room.code,
    status: room.status,
    isHost: room.hostToken === token,
    settings: { ...room.settings, categoryLabel: room.settings.category === "random" ? "عشوائي" : categoryLabels[room.settings.category], difficultyLabel: difficultyLabels[room.settings.difficulty] },
    players: Array.from(room.players.values()).map(({ token: playerToken, socketId, ...player }) => ({ ...player, id: playerToken.slice(0, 8), isYou: playerToken === token })),
    round: room.currentRound + 1,
    totalRounds: room.settings.totalRounds,
    question: room.status === "question" || room.status === "round_result" ? { id: question?.id, prompt: question?.prompt, options: question?.options, category: question ? categoryLabels[question.category] : "", difficulty: question ? difficultyLabels[question.difficulty] : "", startedAt: room.roundStartedAt, durationMs: TIMER_MS } : null,
    ownAnswer: room.answers.get(token) ?? null,
    answerCount: room.answers.size,
    roundResults: room.status === "round_result" ? room.roundResults.map((result) => ({ ...result, player: room.players.get(result.token)?.nickname ?? "لاعب" })) : [],
    winner: room.status === "finished" ? Array.from(room.players.values()).sort((a, b) => b.score - a.score).map((player) => ({ nickname: player.nickname, score: player.score, combo: player.combo }))[0] : null,
    scores: Array.from(room.players.values()).map((player) => ({ nickname: player.nickname, score: player.score, combo: player.combo })),
  };
  return state;
}

function emitToPlayer(io: Server, room: Room, token: string) { const player = room.players.get(token); if (player?.socketId) io.to(player.socketId).emit("room_state", publicState(room, token)); }
function emitAll(io: Server, room: Room) { for (const player of Array.from(room.players.values())) emitToPlayer(io, room, player.token); }
function clearTimers(room: Room) { if (room.timer) clearTimeout(room.timer); if (room.resultTimer) clearTimeout(room.resultTimer); room.timer = undefined; room.resultTimer = undefined; }

function resolveRound(io: Server, room: Room) {
  if (room.status !== "question") return;
  const question = currentQuestion(room);
  room.status = "round_result";
  room.roundResults = Array.from(room.players.values()).map((player) => { const answer = room.answers.get(player.token); return { token: player.token, correct: Boolean(answer?.correct), points: answer?.points ?? 0, combo: answer?.combo ?? player.combo, elapsedMs: answer?.elapsedMs ?? TIMER_MS }; });
  emitAll(io, room);
  room.resultTimer = setTimeout(() => {
    if (room.currentRound >= room.settings.totalRounds - 1) { room.status = "finished"; recordMatch(room); clearTimers(room); emitAll(io, room); return; }
    room.currentRound += 1; room.answers.clear(); room.roundResults = []; room.status = "question"; room.roundStartedAt = Date.now(); emitAll(io, room);
    room.timer = setTimeout(() => resolveRound(io, room), TIMER_MS);
  }, RESULT_MS);
  void question;
}

function beginGame(io: Server, room: Room) {
  clearTimers(room); room.status = "countdown"; emitAll(io, room);
  setTimeout(() => { if (room.status !== "countdown") return; room.status = "question"; room.currentRound = 0; room.answers.clear(); room.roundResults = []; room.roundStartedAt = Date.now(); emitAll(io, room); room.timer = setTimeout(() => resolveRound(io, room), TIMER_MS); }, 3000);
}

function resetRoom(room: Room) { clearTimers(room); room.status = "lobby"; room.currentRound = 0; room.questions = chooseQuestions(room.settings.category, room.settings.difficulty); room.answers.clear(); room.roundResults = []; for (const player of Array.from(room.players.values())) { player.ready = false; player.score = 0; player.combo = 0; player.playAgain = false; } }

export function setupOnlineGame(io: Server) {
  io.on("connection", (socket) => {
    socket.on("get_leaderboard", (callback) => callback({ ok: true, rows: leaderboardRows() }));
    socket.on("create_room", ({ nickname, category = "random", difficulty = "medium" }, callback) => {
      const token = nanoid(18); const room: Room = { code: createCode(), hostToken: token, players: new Map(), settings: { category, difficulty, totalRounds: 10 }, questions: chooseQuestions(category, difficulty), status: "lobby", currentRound: 0, roundStartedAt: 0, answers: new Map(), roundResults: [] };
      room.players.set(token, { token, nickname: String(nickname).trim().slice(0, 24) || "لاعب", connected: true, ready: false, score: 0, combo: 0, socketId: socket.id, playAgain: false }); rooms.set(room.code, room); socket.join(room.code); callback({ ok: true, token, state: publicState(room, token) });
    });

    socket.on("join_room", ({ code, nickname, token }, callback) => {
      const room = rooms.get(String(code).trim().toUpperCase()); if (!room) return callback({ ok: false, error: "الغرفة غير موجودة" });
      const cleanName = String(nickname).trim().slice(0, 24) || "لاعب"; const existing = token ? room.players.get(token) : undefined;
      if (existing) { existing.nickname = cleanName; existing.connected = true; existing.socketId = socket.id; existing.disconnectedAt = undefined; socket.join(room.code); return callback({ ok: true, token, state: publicState(room, token) }); }
      if (room.status !== "lobby") return callback({ ok: false, error: "المباراة بدأت بالفعل" });
      if (room.players.size >= 2) return callback({ ok: false, error: "الغرفة ممتلئة" });
      const newToken = nanoid(18); room.players.set(newToken, { token: newToken, nickname: cleanName, connected: true, ready: false, score: 0, combo: 0, socketId: socket.id, playAgain: false }); socket.join(room.code); emitAll(io, room); callback({ ok: true, token: newToken, state: publicState(room, newToken) });
    });

    socket.on("set_ready", ({ token }, callback) => { const room = roomFor(socket, token); const player = room?.players.get(token); if (!room || !player || room.status !== "lobby") return callback({ ok: false }); player.ready = !player.ready; emitAll(io, room); if (room.players.size === 2 && Array.from(room.players.values()).every((item) => item.ready && item.connected)) beginGame(io, room); callback({ ok: true }); });
    socket.on("answer", ({ token, optionIndex }, callback) => { const room = roomFor(socket, token); const player = room?.players.get(token); const question = room && currentQuestion(room); if (!room || !player || !question || room.status !== "question" || room.answers.has(token)) return callback({ ok: false, error: "الإجابة غير متاحة" }); const elapsedMs = Math.min(TIMER_MS, Math.max(0, Date.now() - room.roundStartedAt)); const correct = Number(optionIndex) === question.correctIndex; const speedBonus = correct && elapsedMs < 2000 ? 2 : correct ? 1 : 0; const combo = correct ? player.combo + 1 : 0; const comboBonus = correct && combo >= 5 ? 1 : correct && combo >= 3 ? 1 : 0; const points = speedBonus + comboBonus; player.combo = combo; player.score += points; room.answers.set(token, { optionIndex: Number(optionIndex), correct, points, elapsedMs, combo }); emitAll(io, room); if (room.answers.size === room.players.size) resolveRound(io, room); callback({ ok: true }); });
    socket.on("play_again", ({ token }, callback) => { const room = roomFor(socket, token); const player = room?.players.get(token); if (!room || !player || room.status !== "finished") return callback({ ok: false }); player.playAgain = true; if (Array.from(room.players.values()).every((item) => item.playAgain && item.connected)) { resetRoom(room); emitAll(io, room); } else emitAll(io, room); callback({ ok: true }); });
    socket.on("leave_room", ({ token }) => { const room = roomFor(socket, token); if (!room) return; room.players.delete(token); socket.leave(room.code); if (room.players.size === 0) { clearTimers(room); rooms.delete(room.code); } else emitAll(io, room); });
    socket.on("disconnect", () => { for (const room of Array.from(rooms.values()) as Room[]) { const player: Player | undefined = Array.from(room.players.values()).find((item: Player) => item.socketId === socket.id); if (!player) continue; player.connected = false; player.socketId = undefined; player.disconnectedAt = Date.now(); emitAll(io, room); setTimeout(() => { if (player.disconnectedAt && Date.now() - player.disconnectedAt >= 30_000) { room.players.delete(player.token); emitAll(io, room); if (room.players.size === 0) { clearTimers(room); rooms.delete(room.code); } } }, 30_500); } });
  });
}
