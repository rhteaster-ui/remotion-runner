import subtitles from '../data/krypton-subtitles.json';
import timeline from '../data/krypton-timeline.json';

type W = {text: string; start: number; end: number};
const FPS = timeline.fps;
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

export const kSceneInfo = (id: string) => timeline.scenes.find((s) => s.id === id)!;
export const kSceneFrom = (id: string) => Math.round(kSceneInfo(id).start * FPS);
export const kSceneLen = (id: string) => Math.round(kSceneInfo(id).end * FPS) - kSceneFrom(id);

export const kAnchor = (id: string, key: string, occ = 0, fallbackSec = 1): number => {
  const s = kSceneInfo(id);
  const k = norm(key);
  const words = (subtitles.captions as {scene: string; words: W[]}[])
    .filter((c) => c.scene === id)
    .flatMap((c) => c.words);
  const hits = words.filter((w) => norm(w.text).startsWith(k));
  const t = hits[occ] ? hits[occ].start : s.vo_start + fallbackSec;
  return Math.max(0, Math.round(t * FPS) - kSceneFrom(id));
};
