import timeline from '../data/repoflow-timeline.json';

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

export const REPO_CUES: Cue[] = [
  /* S1 — Hook: Masalah Push ZIP ke GitHub */
  c('s1-hook', 0.6, 'pop-soft', 0.5),
  c('s1-hook', 1.5, 'pop-soft', 0.5),
  c('s1-hook', 2.8, 'buzz-error', 0.5),
  c('s1-hook', 4.2, 'whoosh-soft', 0.55),
  c('s1-hook', 4.6, 'impact', 0.8),
  c('s1-hook', 4.75, 'shimmer', 0.4),
  c('s1-hook', 7.2, 'tick', 0.45),
  c('s1-hook', 8.5, 'tick', 0.45),
  c('s1-hook', 10.0, 'pop', 0.6),
  c('s1-hook', 10.8, 'ding', 0.55),

  /* S2 — Unpack: Ekstraksi Memori Klien Instan di Browser */
  c('s2-unpack', 0.5, 'pop', 0.5),
  c('s2-unpack', 1.8, 'whoosh-soft', 0.5),
  c('s2-unpack', 3.2, 'lock-click', 0.65),
  ...[4.2, 4.4, 4.6, 4.8].map((t) => c('s2-unpack', t, 'pop-soft', 0.45)),
  c('s2-unpack', 6.5, 'tick', 0.5),
  c('s2-unpack', 7.8, 'tick', 0.5),
  c('s2-unpack', 9.5, 'shimmer', 0.4),
  c('s2-unpack', 11.2, 'success-arp', 0.55),

  /* S3 — Tree: Atomic Git Tree & Zero Broken State */
  c('s3-tree', 0.6, 'pop', 0.45),
  ...[1.8, 1.95, 2.1, 2.25].map((t) => c('s3-tree', t, 'key', 0.42)),
  c('s3-tree', 3.2, 'pop-soft', 0.55),
  c('s3-tree', 4.8, 'whoosh-soft', 0.5),
  c('s3-tree', 6.2, 'tick', 0.5),
  c('s3-tree', 7.6, 'lock-click', 0.7),
  c('s3-tree', 9.2, 'impact', 0.75),
  c('s3-tree', 9.4, 'shimmer', 0.45),
  c('s3-tree', 11.5, 'success-arp', 0.55),

  /* S4 — Vault: Enkripsi Token Web Crypto AES-256 */
  c('s4-vault', 0.6, 'pop', 0.5),
  c('s4-vault', 2.0, 'lock-click', 0.7),
  c('s4-vault', 3.5, 'tick', 0.5),
  c('s4-vault', 5.0, 'pop-soft', 0.5),
  c('s4-vault', 6.8, 'whoosh-soft', 0.5),
  c('s4-vault', 8.5, 'tick', 0.5),
  c('s4-vault', 10.2, 'ding', 0.6),
  c('s4-vault', 11.8, 'success-arp', 0.55),

  /* S5 — Brand: Karya Orisinal RHMT OFC */
  c('s5-brand', 0.6, 'pop', 0.5),
  c('s5-brand', 2.2, 'impact', 0.7),
  c('s5-brand', 2.35, 'shimmer', 0.45),
  c('s5-brand', 4.6, 'tick', 0.45),
  c('s5-brand', 6.2, 'tick', 0.45),
  c('s5-brand', 7.8, 'pop', 0.6),
  c('s5-brand', 9.5, 'whoosh-soft', 0.5),
  c('s5-brand', 10.8, 'ding', 0.65),
  c('s5-brand', 12.2, 'swell', 0.6),

  /* Transition Anticipation: whoosh-wipe -0.45s sebelum batas antar scene */
  ...BOUNDARIES.map((b) => ({at: b - 0.45, sfx: 'whoosh-wipe', vol: 0.85})),
];
