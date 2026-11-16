import timeline from '../data/erekap-timeline.json';

/** Waktu mulai tiap scene (detik, absolut) — diambil dari timeline VO supaya selalu sinkron. */
export const START: Record<string, number> = Object.fromEntries(timeline.scenes.map((s) => [s.id, s.start]));
export const BOUNDARIES = timeline.scenes.slice(1).map((s) => s.start);

export type Cue = {at: number; sfx: string; vol: number};
const L = (scene: string, t: number) => START[scene] + t;
const c = (scene: string, t: number, sfx: string, vol = 0.7): Cue => ({at: L(scene, t), sfx, vol});

export const CUES: Cue[] = [
  /* S1 — hook */
  c('s1-hook', 0.85, 'pop-soft', 0.5), c('s1-hook', 1.25, 'pop-soft', 0.5), c('s1-hook', 1.65, 'pop-soft', 0.5),
  c('s1-hook', 2.5, 'riser', 0.38), c('s1-hook', 2.7, 'buzz-error', 0.5),
  c('s1-hook', 3.42, 'whoosh-soft', 0.6), c('s1-hook', 3.63, 'impact', 0.85), c('s1-hook', 3.7, 'shimmer', 0.4),
  c('s1-hook', 4.3, 'pop', 0.5), c('s1-hook', 5.2, 'pop', 0.5),
  c('s1-hook', 6.0, 'tick', 0.35), c('s1-hook', 6.8, 'tick', 0.35), c('s1-hook', 7.4, 'tick', 0.35),
  c('s1-hook', 7.6, 'pop-soft', 0.55), c('s1-hook', 8.6, 'pop-soft', 0.55), c('s1-hook', 9.4, 'pop-soft', 0.55), c('s1-hook', 10.4, 'pop-soft', 0.55),
  c('s1-hook', 9.1, 'tick', 0.35), c('s1-hook', 9.9, 'tick', 0.35), c('s1-hook', 10.65, 'ding', 0.5),

  /* S2 — dashboard */
  c('s2-dashboard', 0.55, 'pop', 0.45), c('s2-dashboard', 1.25, 'pop-soft', 0.5),
  c('s2-dashboard', 4.9, 'tick', 0.7), c('s2-dashboard', 5.7, 'tick', 0.7), c('s2-dashboard', 6.5, 'tick', 0.7), c('s2-dashboard', 7.4, 'tick', 0.7),
  c('s2-dashboard', 9.2, 'pop', 0.55), c('s2-dashboard', 10.1, 'pop', 0.55), c('s2-dashboard', 11.1, 'pop', 0.55), c('s2-dashboard', 12.1, 'pop', 0.55),
  c('s2-dashboard', 12.25, 'shimmer', 0.35), c('s2-dashboard', 14.4, 'ding', 0.6),

  /* S3 — rekap & admin */
  c('s3-rekap-admin', 0.55, 'pop', 0.45),
  ...[2.4, 2.54, 2.68, 2.82, 2.96].map((t) => c('s3-rekap-admin', t, 'key', 0.5)),
  c('s3-rekap-admin', 3.1, 'tick', 0.5),
  c('s3-rekap-admin', 4.5, 'whoosh-soft', 0.45), c('s3-rekap-admin', 4.75, 'pop-soft', 0.5),
  ...[7.5, 7.64, 7.78, 7.92, 8.06, 8.2].map((t) => c('s3-rekap-admin', t, 'key', 0.3)),
  c('s3-rekap-admin', 9.3, 'lock-click', 0.7), c('s3-rekap-admin', 9.5, 'ding', 0.6), c('s3-rekap-admin', 9.55, 'shimmer', 0.35),
  c('s3-rekap-admin', 10.6, 'tick', 0.45), c('s3-rekap-admin', 10.8, 'tick', 0.45), c('s3-rekap-admin', 11.0, 'tick', 0.45),
  c('s3-rekap-admin', 11.15, 'success-arp', 0.55), c('s3-rekap-admin', 12.25, 'pop', 0.5),

  /* S4 — ekspor & cetak */
  c('s4-export-print', 0.55, 'pop', 0.45), c('s4-export-print', 1.0, 'pop-soft', 0.5),
  c('s4-export-print', 3.5, 'tick', 0.7), c('s4-export-print', 4.55, 'success-arp', 0.6),
  c('s4-export-print', 4.9, 'whoosh-soft', 0.3),
  c('s4-export-print', 6.5, 'pop', 0.6), c('s4-export-print', 6.6, 'print', 0.55),
  c('s4-export-print', 8.8, 'shimmer', 0.4), c('s4-export-print', 9.5, 'stamp', 0.85),

  /* S5 — brand */
  c('s5-brand', 0.7, 'pop', 0.5),
  c('s5-brand', 1.7, 'tick', 0.4), c('s5-brand', 2.3, 'tick', 0.4), c('s5-brand', 2.9, 'tick', 0.4), c('s5-brand', 3.4, 'tick', 0.4), c('s5-brand', 4.8, 'ding', 0.45),
  c('s5-brand', 5.6, 'whoosh-soft', 0.5), c('s5-brand', 5.75, 'pop-soft', 0.55),
  c('s5-brand', 7.0, 'shimmer', 0.4), c('s5-brand', 8.4, 'pop', 0.55),
  c('s5-brand', 9.6, 'tick', 0.7), c('s5-brand', 9.7, 'ding', 0.7), c('s5-brand', 9.8, 'swell', 0.5),

  /* Transisi antar-scene: whoosh mulai 0.45s sebelum potongan */
  ...BOUNDARIES.map((b) => ({at: b - 0.45, sfx: 'whoosh-wipe', vol: 0.85})),
];
