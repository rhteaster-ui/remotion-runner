import type {IconKey} from './icons';

export type NodeKind = 'trigger' | 'node' | 'agent' | 'sub' | 'ghost';
export type NodeDef = {
  id: string;
  x: number;
  y: number;
  title: string;
  sub: string;
  kind: NodeKind;
  tint: string;
  icon: IconKey;
  img?: string;
  appearAt: number;
  runAt: number;
  runDur: number;
  badge?: string;
  size?: number;
};

export type EdgeDef = {
  id: string;
  from: string;
  to: string;
  kind: 'main' | 'sub' | 'ssh';
  appearAt: number;
  flowAt: number;
  flowDur: number;
  socket?: number;
  label?: string;
  ghost?: boolean;
};

export type StickyDef = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  body?: string;
  rgb: string;
  appearAt: number;
};

/* Semua waktu = detik absolut, disinkronkan ke VO & subtitle (ops-subtitles.json). */
export const EXEC_START = 9.1; // "Cukup kirim satu perintah" -> tombol Execute ditekan
export const CASCADE: [number, number] = [10.4, 12.38]; // "seluruh server langsung bekerja"
export const EXEC_END = 51.4;

const ROW_C = 1790;
const SUB_Y = 2110;

const BLUE = '#55B8FF';
const VIOLET = '#A68BFF';
const AMBER = '#FFC857';
const GREEN = '#3DDC97';
const DIM = '#5A5E69';

export const NODES: NodeDef[] = [
  // Chat biasa (satu arah)
  {id: 'g-you', x: -340, y: 330, title: 'Kamu', sub: '1 prompt', kind: 'ghost', tint: DIM, icon: 'user', appearAt: 0.3, runAt: 0.9, runDur: 0.6},
  {id: 'g-llm', x: 0, y: 330, title: 'LLM Chat', sub: 'jawab teks', kind: 'ghost', tint: DIM, icon: 'chat', appearAt: 0.6, runAt: 1.9, runDur: 0.8},
  {id: 'g-out', x: 340, y: 330, title: 'Jawaban', sub: 'selesai', kind: 'ghost', tint: DIM, icon: 'check', appearAt: 0.9, runAt: 3.1, runDur: 0.5},

  // Sistem agentic
  {id: 'tg', x: -340, y: 950, title: 'Bot Telegram', sub: 'trigger · HP', kind: 'trigger', tint: BLUE, icon: 'bolt', img: 'assets/ops/tg-official.svg', appearAt: 9.5, runAt: 13.4, runDur: 1.2},
  {id: 'wa', x: -340, y: 1230, title: 'WhatsApp', sub: 'trigger · HP', kind: 'trigger', tint: GREEN, icon: 'bolt', img: 'assets/ops/wa-official.svg', appearAt: 9.65, runAt: 14.8, runDur: 1.2},
  {id: 'term', x: 0, y: 1090, title: 'Terminal', sub: 'prompt → shell', kind: 'node', tint: AMBER, icon: 'terminal', img: 'assets/ops/termux-official.svg', appearAt: 9.8, runAt: 16.6, runDur: 1.9},
  {id: 'gw', x: 340, y: 1090, title: 'VPS-1 Gateway', sub: 'ssh jump host', kind: 'node', tint: VIOLET, icon: 'server', appearAt: 9.95, runAt: 19.3, runDur: 1.3},
  {id: 'wk', x: -340, y: ROW_C, title: 'VPS-2 Worker', sub: 'eksekutor', kind: 'node', tint: VIOLET, icon: 'server', appearAt: 10.1, runAt: 22.9, runDur: 2.3},
  {id: 'ag', x: 0, y: ROW_C, title: 'AGY Agent', sub: 'AI agent', kind: 'agent', size: 220, tint: BLUE, icon: 'chat', img: 'assets/ops/agy-official.png', appearAt: 10.25, runAt: 26.1, runDur: 12.7},
  {id: 'od', x: 380, y: ROW_C, title: 'Ops Deck', sub: 'web · task map', kind: 'node', tint: '#FF6D5A', icon: 'dash', appearAt: 10.4, runAt: 39.6, runDur: 1.2},

  // Sub-node tool milik agent (gaya n8n AI Agent)
  {id: 's-code', x: -430, y: SUB_Y, title: 'Edit Kode', sub: 'tool', kind: 'sub', tint: BLUE, icon: 'code', appearAt: 10.5, runAt: 28.9, runDur: 1.8},
  {id: 's-web', x: -215, y: SUB_Y, title: 'Riset Web', sub: 'tool', kind: 'sub', tint: GREEN, icon: 'search', appearAt: 10.6, runAt: 30.9, runDur: 1.8},
  {id: 's-bash', x: 0, y: SUB_Y, title: 'Bash', sub: 'tool', kind: 'sub', tint: AMBER, icon: 'terminal', appearAt: 10.7, runAt: 33.0, runDur: 2.2},
  {id: 's-sub', x: 215, y: SUB_Y, title: 'Sub-agen', sub: 'paralel', kind: 'sub', tint: VIOLET, icon: 'users', badge: '×3', appearAt: 10.8, runAt: 36.0, runDur: 1.8},
  {id: 's-acc', x: 430, y: SUB_Y, title: 'Rotasi Akun', sub: 'Pro ⇄ Free', kind: 'sub', tint: '#FF6D5A', icon: 'refresh', appearAt: 10.9, runAt: 37.4, runDur: 1.4},
];

export const NODE_BY_ID: Record<string, NodeDef> = Object.fromEntries(NODES.map((n) => [n.id, n]));

const sub = (id: string, to: string, socket: number): EdgeDef => {
  const n = NODE_BY_ID[to];
  return {id, from: 'ag', to, kind: 'sub', socket, appearAt: n.appearAt + 0.2, flowAt: n.runAt, flowDur: n.runDur};
};

export const EDGES: EdgeDef[] = [
  {id: 'g1', from: 'g-you', to: 'g-llm', kind: 'main', appearAt: 0.8, flowAt: 1.5, flowDur: 0.4, label: '1 item', ghost: true},
  {id: 'g2', from: 'g-llm', to: 'g-out', kind: 'main', appearAt: 1.1, flowAt: 2.7, flowDur: 0.4, label: '1 item', ghost: true},

  {id: 'e1', from: 'tg', to: 'term', kind: 'main', appearAt: 9.95, flowAt: 14.6, flowDur: 1.0, label: '1 item'},
  {id: 'e2', from: 'wa', to: 'term', kind: 'main', appearAt: 10.0, flowAt: 16.0, flowDur: 0.6, label: '1 item'},
  {id: 'e3', from: 'term', to: 'gw', kind: 'main', appearAt: 10.1, flowAt: 18.5, flowDur: 0.8, label: '1 item'},
  {id: 'e4', from: 'gw', to: 'wk', kind: 'ssh', appearAt: 10.3, flowAt: 20.6, flowDur: 2.3, label: 'ssh · realtime'},
  {id: 'e5', from: 'wk', to: 'ag', kind: 'main', appearAt: 10.4, flowAt: 25.2, flowDur: 0.9, label: '1 item'},
  {id: 'e6', from: 'ag', to: 'od', kind: 'main', appearAt: 10.55, flowAt: 38.8, flowDur: 0.8, label: '1 item'},

  sub('u1', 's-code', 0),
  sub('u2', 's-web', 1),
  sub('u3', 's-bash', 2),
  sub('u4', 's-sub', 3),
  sub('u5', 's-acc', 4),
];

export const STICKIES: StickyDef[] = [
  {id: 'ghost', x: -520, y: 130, w: 1040, h: 430, title: 'CHAT BIASA', body: '1 prompt → 1 jawaban → selesai.', rgb: '138,142,153', appearAt: 0.05},
  {id: 'hdr', x: -520, y: 590, w: 1040, h: 170, title: 'BEDA: SISTEM AGENTIC', body: 'dibangun Tuan Rahmat', rgb: '255,109,90', appearAt: 3.9},
  {id: 'a', x: -520, y: 790, w: 1040, h: 660, title: '① PROMPT DARI HP', rgb: '255,200,87', appearAt: 4.3},
  {id: 'b', x: -520, y: 1540, w: 1040, h: 750, title: '② WORKER', rgb: '166,139,255', appearAt: 4.6},
];

/* Kamera: [detik, cx, cy, scale] — satu kanvas panjang, kamera "terbang" antar bagian. */
export const CAM: [number, number, number, number][] = [
  [0, 0, 330, 1.0],
  [3.5, 0, 330, 1.0],
  [5.2, 0, 700, 0.86],
  [9.0, 0, 700, 0.86],
  [11.4, 0, 1330, 0.6],
  [12.6, 0, 1330, 0.6],
  [14.2, 0, 1090, 0.98],
  [19.8, 0, 1090, 0.98],
  [22.0, 0, 1460, 0.85],
  [25.2, 0, 1460, 0.85],
  [26.8, 0, 1930, 0.92],
  [32.0, 0, 1950, 0.95],
  [38.8, 0, 1990, 0.99],
  [40.6, 300, 1790, 1.1],
  [51.1, 300, 1790, 1.1],
  [53.2, 0, 1250, 0.56],
  [70.1, 0, 1250, 0.53],
];
