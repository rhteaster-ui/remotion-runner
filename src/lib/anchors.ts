import subtitles from '../data/subtitles.json';
import timeline from '../data/timeline.json';

type W = {text: string; start: number; end: number};
const FPS = timeline.fps;
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

export const sceneInfo = (id: string) => timeline.scenes.find((s) => s.id === id)!;
export const sceneFrom = (id: string) => Math.round(sceneInfo(id).start * FPS);
export const sceneLen = (id: string) => Math.round(sceneInfo(id).end * FPS) - sceneFrom(id);

export const anchor = (id: string, key: string, occ = 0, fallbackSec = 1): number => {
  const s = sceneInfo(id);
  const k = norm(key);
  const words = (subtitles.captions as {scene: string; words: W[]}[])
    .filter((c) => c.scene === id)
    .flatMap((c) => c.words);
  const hits = words.filter((w) => norm(w.text).startsWith(k));
  const t = hits[occ] ? hits[occ].start : s.vo_start + fallbackSec;
  return Math.max(0, Math.round(t * FPS) - sceneFrom(id));
};
