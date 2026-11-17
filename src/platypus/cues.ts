import timeline from '../data/platypus-timeline.json';

export const START: Record<string, number> = Object.fromEntries(
  timeline.scenes.map((s) => [s.id, s.start]),
);
export const BOUNDARIES = timeline.scenes.slice(1).map((s) => s.start);

export type Cue = {at: number; sfx: string; vol: number};
const L = (scene: string, t: number) => (START[scene] ?? 0) + t;
const c = (scene: string, t: number, sfx: string, vol = 0.75): Cue => ({
  at: L(scene, t),
  sfx,
  vol,
});

export const PLATYPUS_CUES: Cue[] = [
  /* Scene 1 — Hook */
  c('p1-hook', 0.45, 'water-splash', 0.72),
  c('p1-hook', 1.33, 'absurd-thud', 0.78),
  c('p1-hook', 4.35, 'elaina-wand-chime', 0.68),
  c('p1-hook', 7.83, 'rubber-stretch', 0.58),

  /* Scene 2 — Sparepart & 1799 */
  c('p2-sparepart', 1.64, 'elaina-wand-chime', 0.55),
  c('p2-sparepart', 5.45, 'duck-quack', 0.88),
  c('p2-sparepart', 6.75, 'water-splash', 0.52),
  c('p2-sparepart', 8.68, 'elaina-gasp-pop', 0.55),
  c('p2-sparepart', 11.30, 'elaina-wand-chime', 0.60),
  c('p2-sparepart', 16.70, 'rubber-stretch', 0.88),
  c('p2-sparepart', 18.05, 'absurd-thud', 0.82),
  c('p2-sparepart', 18.75, 'elaina-gasp-pop', 0.72),

  /* Scene 3 — Bertelur & Susu Keringat */
  c('p3-telur-keringat', 4.95, 'egg-crack-pop', 0.90),
  c('p3-telur-keringat', 6.65, 'elaina-gasp-pop', 0.72),
  c('p3-telur-keringat', 9.40, 'gerd-honk', 0.55),
  c('p3-telur-keringat', 12.55, 'sweat-drops', 0.86),
  c('p3-telur-keringat', 15.05, 'sweat-drops', 0.72),
  c('p3-telur-keringat', 20.70, 'elaina-gasp-pop', 0.75),
  c('p3-telur-keringat', 22.45, 'absurd-thud', 0.78),

  /* Scene 4 — Tanpa Lambung & GERD */
  c('p4-tanpa-lambung', 3.50, 'elaina-wand-chime', 0.62),
  c('p4-tanpa-lambung', 7.15, 'tube-zip-bloop', 0.92),
  c('p4-tanpa-lambung', 11.40, 'sweat-drops', 0.45),
  c('p4-tanpa-lambung', 17.15, 'elaina-gasp-pop', 0.62),
  c('p4-tanpa-lambung', 18.85, 'gerd-honk', 0.86),

  /* Scene 5 — Taji Beracun */
  c('p5-taji-beracun', 3.80, 'venom-sting', 0.88),
  c('p5-taji-beracun', 6.45, 'absurd-thud', 0.72),
  c('p5-taji-beracun', 9.50, 'elaina-wand-chime', 0.58),
  c('p5-taji-beracun', 12.35, 'venom-sting', 0.76),

  /* Scene 6 — Australia & Seblak */
  c('p6-outro-seblak', 3.95, 'elaina-wand-chime', 0.62),
  c('p6-outro-seblak', 7.95, 'seblak-rimshot', 0.92),
  c('p6-outro-seblak', 11.80, 'elaina-wand-chime', 0.76),

  /* Transisi antar-scene */
  ...BOUNDARIES.map((b) => ({at: b - 0.45, sfx: 'water-whoosh-wipe', vol: 0.78})),
];
