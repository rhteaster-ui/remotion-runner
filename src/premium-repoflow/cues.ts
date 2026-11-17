import timeline from '../data/repoflow-timeline.json';

export const START: Record<string, number> = Object.fromEntries(
  timeline.scenes.map((s) => [s.id, s.start])
);
export const BOUNDARIES = timeline.scenes.slice(1).map((s) => s.start);

export type Cue = {at: number; sfx: string; vol: number};
const L = (scene: string, t: number) => START[scene] + t;
const c = (scene: string, t: number, sfx: string, vol = 0.3): Cue => ({
  at: L(scene, t),
  sfx,
  vol,
});

export const REPO_CUES: Cue[] = [
  /* S1 — Hook: Masalah Push ZIP ke GitHub */
  c('s1-hook', 0.5, 'pop-soft', 0.3),
  c('s1-hook', 1.8, 'pop-soft', 0.25),
  c('s1-hook', 4.5, 'whoosh-soft', 0.28),
  c('s1-hook', 8.6, 'tick', 0.25),
  c('s1-hook', 11.2, 'pop', 0.35),

  /* S2 — Unpack: Ekstraksi Memori Klien Instan */
  c('s2-unpack', 0.4, 'pop', 0.3),
  c('s2-unpack', 2.0, 'pop-soft', 0.25),
  c('s2-unpack', 5.2, 'tick', 0.22),
  c('s2-unpack', 8.5, 'tick', 0.22),
  c('s2-unpack', 11.0, 'success-arp', 0.32),

  /* S3 — Tree: Atomic Git Tree & Zero Broken State */
  c('s3-tree', 0.4, 'pop', 0.3),
  c('s3-tree', 2.2, 'pop-soft', 0.25),
  c('s3-tree', 5.0, 'whoosh-soft', 0.25),
  c('s3-tree', 7.8, 'tick', 0.22),
  c('s3-tree', 10.5, 'shimmer', 0.3),

  /* S4 — Vault: Enkripsi Token Web Crypto AES-256 */
  c('s4-vault', 0.4, 'pop', 0.3),
  c('s4-vault', 2.5, 'lock-click', 0.35),
  c('s4-vault', 6.0, 'tick', 0.22),
  c('s4-vault', 9.5, 'pop-soft', 0.25),
  c('s4-vault', 13.0, 'ding', 0.32),

  /* S5 — Brand: Karya Orisinal RHMT OFC */
  c('s5-brand', 0.4, 'pop', 0.3),
  c('s5-brand', 2.5, 'shimmer', 0.3),
  c('s5-brand', 5.8, 'tick', 0.22),
  c('s5-brand', 8.5, 'pop-soft', 0.25),
  c('s5-brand', 11.5, 'swell', 0.38),

  /* Smooth Transition Anticipation (-0.4s sebelum batas antar scene) */
  ...BOUNDARIES.map((b) => ({at: b - 0.4, sfx: 'whoosh-wipe', vol: 0.35})),
];
