import React from 'react';
import {Audio, Sequence, interpolate, staticFile} from 'remotion';

export type Cue = {f: number; n: string; v?: number};
const src = (n: string) => staticFile(`audio/sfx/${n}.mp3`);

/** Putar daftar cue SFX (frame relatif ke scene) */
export const Sfx: React.FC<{cues: Cue[]}> = ({cues}) => (
  <>
    {cues.map((c, i) => (
      <Sequence key={i} layout="none" from={Math.max(0, Math.round(c.f))} durationInFrames={90}>
        <Audio src={src(c.n)} volume={c.v ?? 0.5} />
      </Sequence>
    ))}
  </>
);

/** Musik latar, fade in/out */
export const Music: React.FC<{total: number}> = ({total}) => (
  <Audio
    src={src('music')}
    volume={(f) =>
      0.14 *
      interpolate(f, [0, 45], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) *
      interpolate(f, [total - 60, total], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
    }
  />
);

/** Suara ketikan: 1 klik per huruf, sinkron dengan typed(text, f, start, speed) */
export const typeCues = (start: number, len: number, speed: number, enter = true, v = 0.32): Cue[] => {
  const out: Cue[] = [];
  for (let i = 1; i <= len; i++) out.push({f: start + Math.ceil(i / speed), n: `key${(i % 4) + 1}`, v});
  if (enter) out.push({f: start + Math.ceil(len / speed) + 6, n: 'enter', v: 0.42});
  return out;
};

const ck = (f: number): Cue => ({f, n: 'click', v: 0.5});

/** SFX per scene (frame lokal scene @30fps) */
export const SCENE_CUES: Record<string, Cue[]> = {
  's1-hook': [
    {f: 0, n: 'impact', v: 0.55}, {f: 6, n: 'pop', v: 0.5},
    {f: 22, n: 'blip', v: 0.4}, {f: 30, n: 'blip', v: 0.4}, {f: 38, n: 'blip', v: 0.4}, {f: 46, n: 'blip', v: 0.4},
    ck(150), ck(156), {f: 162, n: 'success', v: 0.4},
  ],
  's2-hosts': [
    {f: 0, n: 'whoosh', v: 0.4}, {f: 10, n: 'whoosh_short', v: 0.35},
    ck(38), ...typeCues(40, 14, 0.45, false),
    ck(92), ...typeCues(95, 11, 0.45, false),
    ck(142), ...typeCues(145, 4, 0.45, false),
    {f: 185, n: 'pop', v: 0.45}, ck(190), ck(236), {f: 275, n: 'connect', v: 0.5},
  ],
  's3-commands': [
    {f: 0, n: 'whoosh', v: 0.4},
    ...typeCues(25, 4, 0.35), {f: 50, n: 'blip', v: 0.4},
    ...typeCues(180, 6, 0.45), {f: 210, n: 'blip', v: 0.4},
    ...typeCues(315, 10, 0.45), {f: 350, n: 'blip', v: 0.4},
    ...typeCues(465, 18, 0.55), {f: 505, n: 'success', v: 0.45},
  ],
  's4-snippets-sftp': [
    {f: 0, n: 'whoosh', v: 0.4}, ck(140), {f: 155, n: 'success', v: 0.45},
    {f: 280, n: 'whoosh', v: 0.4}, ck(308), ck(336), {f: 340, n: 'progress', v: 0.4}, {f: 460, n: 'success', v: 0.5},
  ],
  's5-shortcuts': [
    {f: 0, n: 'whoosh', v: 0.4},
    {f: 15, n: 'pop', v: 0.4}, {f: 165, n: 'pop', v: 0.4}, {f: 265, n: 'pop', v: 0.4}, {f: 395, n: 'pop', v: 0.4},
    {f: 15, n: 'key2', v: 0.4}, {f: 165, n: 'key3', v: 0.4}, {f: 265, n: 'key1', v: 0.4}, {f: 395, n: 'key4', v: 0.4},
  ],
  's6-outro': [
    {f: 0, n: 'whoosh', v: 0.4}, {f: 5, n: 'pop', v: 0.5}, {f: 150, n: 'success', v: 0.45}, {f: 250, n: 'ding', v: 0.4},
  ],
};
