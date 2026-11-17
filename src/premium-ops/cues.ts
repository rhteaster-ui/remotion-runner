import timeline from '../data/ops-timeline.json';

/** Waktu mulai tiap scene (detik, absolut) — diambil dari ops-timeline.json agar sinkron VO. */
export const START: Record<string, number> = Object.fromEntries(
  timeline.scenes.map((s) => [s.id, s.start])
);
export const BOUNDARIES = timeline.scenes.slice(1).map((s) => s.start);

export type Cue = {at: number; sfx: string; vol: number};
const L = (scene: string, t: number) => START[scene] + t;
const c = (scene: string, t: number, sfx: string, vol = 0.7): Cue => ({
  at: L(scene, t),
  sfx,
  vol,
});

export const OPS_CUES: Cue[] = [
  /* S1 — Hook: Chat 1-arah vs Sistem Agentic Rahmat */
  c('s1-hook', 0.65, 'pop-soft', 0.5),
  c('s1-hook', 1.4, 'pop-soft', 0.5),
  c('s1-hook', 2.4, 'buzz-error', 0.45),
  c('s1-hook', 3.5, 'whoosh-soft', 0.55),
  c('s1-hook', 3.85, 'impact', 0.8),
  c('s1-hook', 3.95, 'shimmer', 0.4),
  c('s1-hook', 6.45, 'pop', 0.55),
  c('s1-hook', 7.2, 'tick', 0.45),
  c('s1-hook', 8.0, 'tick', 0.45),
  c('s1-hook', 8.8, 'tick', 0.45),
  c('s1-hook', 9.4, 'ding', 0.55),

  /* S2 — Dual-VPS Bridge: Telegram/WA -> SSH -> VPS-1 -> VPS-2 */
  c('s2-bridge', 0.6, 'pop', 0.45),
  c('s2-bridge', 1.4, 'pop-soft', 0.55),
  c('s2-bridge', 3.1, 'whoosh-soft', 0.5),
  c('s2-bridge', 4.3, 'lock-click', 0.65),
  c('s2-bridge', 5.8, 'tick', 0.45),
  c('s2-bridge', 7.2, 'tick', 0.45),
  c('s2-bridge', 8.6, 'ding', 0.5),
  c('s2-bridge', 10.2, 'success-arp', 0.5),

  /* S3 — Worker Execution & Multi-Account Rotation */
  c('s3-agent', 0.6, 'pop', 0.45),
  ...[1.8, 1.94, 2.08, 2.22].map((t) => c('s3-agent', t, 'key', 0.42)),
  c('s3-agent', 3.0, 'pop-soft', 0.55),
  c('s3-agent', 4.4, 'pop-soft', 0.55),
  c('s3-agent', 5.8, 'pop-soft', 0.55),
  c('s3-agent', 7.1, 'pop-soft', 0.55),
  c('s3-agent', 8.3, 'whoosh-soft', 0.5),
  c('s3-agent', 9.2, 'tick', 0.55),
  c('s3-agent', 10.4, 'tick', 0.55),
  c('s3-agent', 11.4, 'shimmer', 0.4),
  c('s3-agent', 11.6, 'success-arp', 0.55),

  /* S4 — Web Ops Deck & Task Map */
  c('s4-web', 0.6, 'pop', 0.45),
  c('s4-web', 1.8, 'tick', 0.45),
  c('s4-web', 2.8, 'tick', 0.45),
  c('s4-web', 3.8, 'tick', 0.45),
  c('s4-web', 4.8, 'ding', 0.55),
  c('s4-web', 5.5, 'pop', 0.6),
  c('s4-web', 5.65, 'shimmer', 0.4),
  c('s4-web', 7.5, 'pop-soft', 0.5),
  c('s4-web', 9.2, 'success-arp', 0.55),

  /* S5 — Personal Branding Rahmat / RHMT OFC */
  c('s5-brand', 0.7, 'pop', 0.5),
  c('s5-brand', 2.3, 'impact', 0.7),
  c('s5-brand', 2.4, 'shimmer', 0.45),
  c('s5-brand', 4.8, 'tick', 0.45),
  c('s5-brand', 6.2, 'tick', 0.45),
  c('s5-brand', 7.6, 'tick', 0.45),
  c('s5-brand', 10.6, 'whoosh-soft', 0.5),
  c('s5-brand', 11.4, 'pop', 0.6),
  c('s5-brand', 11.55, 'ding', 0.65),
  c('s5-brand', 13.0, 'swell', 0.55),

  /* Transition Anticipation: whoosh-wipe -0.45s sebelum potongan scene */
  ...BOUNDARIES.map((b) => ({at: b - 0.45, sfx: 'whoosh-wipe', vol: 0.85})),
];
