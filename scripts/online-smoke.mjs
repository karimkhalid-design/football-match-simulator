import { io } from "socket.io-client";

const baseUrl = process.env.ONLINE_TEST_URL ?? "http://127.0.0.1:3000";
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const waitFor = (socket, predicate, timeout = 12000) => new Promise((resolve, reject) => {
  const timer = setTimeout(() => { socket.off("room_state", onState); reject(new Error("Timed out waiting for room state")); }, timeout);
  const onState = (state) => { if (!predicate(state)) return; clearTimeout(timer); socket.off("room_state", onState); resolve(state); };
  socket.on("room_state", onState);
});
const emit = (socket, event, payload) => new Promise((resolve, reject) => socket.emit(event, payload, (response) => response?.ok ? resolve(response) : reject(new Error(response?.error ?? `${event} failed`))));

const first = io(baseUrl, { transports: ["websocket", "polling"] });
const second = io(baseUrl, { transports: ["websocket", "polling"] });
try {
  await Promise.all([new Promise((resolve, reject) => { first.once("connect", resolve); first.once("connect_error", reject); }), new Promise((resolve, reject) => { second.once("connect", resolve); second.once("connect_error", reject); })]);
  const created = await emit(first, "create_room", { nickname: "Karim", category: "football", difficulty: "medium" });
  const joined = await emit(second, "join_room", { code: created.state.roomCode, nickname: "Ahmed" });
  first.emit("set_ready", { token: created.token });
  second.emit("set_ready", { token: joined.token });
  const [questionOne, questionTwo] = await Promise.all([waitFor(first, (state) => state.status === "question"), waitFor(second, (state) => state.status === "question")]);
  if (questionOne.question.id !== questionTwo.question.id) throw new Error("Question IDs are not synchronized");
  await Promise.all([emit(first, "answer", { token: created.token, optionIndex: 0 }), emit(second, "answer", { token: joined.token, optionIndex: 0 })]);
  const [resultOne, resultTwo] = await Promise.all([waitFor(first, (state) => state.status === "round_result"), waitFor(second, (state) => state.status === "round_result")]);
  if (resultOne.scores.length !== 2 || resultTwo.scores.length !== 2) throw new Error("Scores are not synchronized");
  if (resultOne.roundResults.length !== 2 || resultTwo.roundResults.length !== 2) throw new Error("Round results are not synchronized");
  console.log(`Online smoke passed: room ${created.state.roomCode}, question ${questionOne.question.id}, two clients synchronized.`);
} finally {
  first.disconnect();
  second.disconnect();
  await wait(100);
}
