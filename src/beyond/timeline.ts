import { Beat, CHAPTERS, Chapter } from './script';

export const CPS = 17;            // kecepatan baca subtitle (karakter/detik)
export const TITLE_FRAMES = 105;  // kartu judul bab (bab II dst.)
export const OVERLAP = 12;        // crossfade antar beat model

export const plain = (t: string) => t.replace(/\[\[|\]\]/g, '');
export const beatFrames = (b: Beat) => Math.max(b.min ?? 108, Math.ceil((plain(b.text).length / CPS) * 30) + 20);

export type BeatSeg = { beat: Beat; index: number; from: number; dur: number };
export type ChapterSeg = {
  chapter: Chapter;
  index: number;
  start: number;
  titleDur: number;
  beats: BeatSeg[];
  end: number;
};

let cursor = 0;
export const TL: ChapterSeg[] = CHAPTERS.map((chapter, index) => {
  const start = cursor;
  const titleDur = index === 0 ? 0 : TITLE_FRAMES;
  let c = start + titleDur;
  const beats = chapter.beats.map((beat, i) => {
    const dur = beatFrames(beat);
    const seg = { beat, index: i, from: c, dur };
    c += dur;
    return seg;
  });
  cursor = c;
  return { chapter, index, start, titleDur, beats, end: c };
});

export const TOTAL_FRAMES = cursor;
