import { afterEach, describe, expect, it, vi } from "vitest";
import { setupOnlineGame } from "./onlineGame";

type FakeSocket = { id: string; handlers: Map<string, Function>; events: Array<{ event: string; payload: any }>; on: (event: string, handler: Function) => void; join: () => void; leave: () => void };

function makeHarness() {
  const sockets: FakeSocket[] = [];
  let onConnection: ((socket: FakeSocket) => void) | undefined;
  const io = { on: (_event: string, handler: (socket: FakeSocket) => void) => { onConnection = handler; }, to: (target: string) => ({ emit: (event: string, payload: any) => { const socket = sockets.find((item) => item.id === target); if (socket) socket.events.push({ event, payload }); } }) };
  setupOnlineGame(io as any);
  const connect = (id: string) => { const socket: FakeSocket = { id, handlers: new Map(), events: [], on(event, handler) { this.handlers.set(event, handler); }, join() {}, leave() {} }; sockets.push(socket); onConnection?.(socket); return socket; };
  const call = (socket: FakeSocket, event: string, payload: any, callback?: Function) => socket.handlers.get(event)?.(payload, callback);
  return { connect, call };
}

afterEach(() => vi.useRealTimers());

describe("online room readiness", () => {
  it("starts when both clients use the UI-style event without callbacks", () => {
    vi.useFakeTimers();
    const { connect, call } = makeHarness();
    const first = connect("first");
    const second = connect("second");
    let created: any;
    call(first, "create_room", { nickname: "Karim", category: "football", difficulty: "medium" }, (response: any) => { created = response; });
    let joined: any;
    call(second, "join_room", { code: created.state.roomCode, nickname: "Ahmed" }, (response: any) => { joined = response; });
    call(first, "set_ready", { token: created.token });
    call(second, "set_ready", { token: joined.token });
    expect(first.events.some((event) => event.event === "room_state" && event.payload.status === "countdown")).toBe(true);
    expect(second.events.some((event) => event.event === "room_state" && event.payload.status === "countdown")).toBe(true);
    vi.advanceTimersByTime(3000);
    expect(first.events.some((event) => event.event === "room_state" && event.payload.status === "question")).toBe(true);
    expect(second.events.some((event) => event.event === "room_state" && event.payload.status === "question")).toBe(true);
    call(first, "answer", { token: created.token, optionIndex: 0 });
    call(second, "answer", { token: joined.token, optionIndex: 0 });
    expect(first.events.some((event) => event.event === "room_state" && event.payload.status === "round_result")).toBe(false);
    vi.advanceTimersByTime(19_999);
    expect(first.events.some((event) => event.event === "room_state" && event.payload.status === "round_result")).toBe(false);
    vi.advanceTimersByTime(1);
    expect(first.events.some((event) => event.event === "room_state" && event.payload.status === "round_result")).toBe(true);
  });
});
