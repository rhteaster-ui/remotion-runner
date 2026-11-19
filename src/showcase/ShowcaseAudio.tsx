import React from 'react';
import {Audio, interpolate, Sequence, staticFile, useVideoConfig} from 'remotion';
import timeline from '../data/erekap-showcase-timeline.json';

const START: Record<string, number> = Object.fromEntries(
  timeline.scenes.map((s) => [s.id, s.start])
);
const BOUNDARIES = timeline.scenes.slice(1).map((s) => s.start);

const c = (scene: string, t: number, sfx: string, vol = 0.65) => ({
  at: (START[scene] ?? 0) + t,
  sfx,
  vol,
});

const CUES = [
  /* S1 — hook */
  c('s1-hook', 0.4, 'whoosh-soft', 0.55),
  c('s1-hook', 1.2, 'pop-soft', 0.5),
  c('s1-hook', 3.2, 'impact', 0.8),
  c('s1-hook', 3.3, 'shimmer', 0.4),
  c('s1-hook', 6.5, 'pop', 0.5),
  c('s1-hook', 8.8, 'tick', 0.45),
  c('s1-hook', 9.4, 'tick', 0.45),
  c('s1-hook', 10.0, 'ding', 0.5),

  /* S2 — dashboard */
  c('s2-dashboard', 0.5, 'pop', 0.5),
  c('s2-dashboard', 3.4, 'tick', 0.55),
  c('s2-dashboard', 4.6, 'tick', 0.55),
  c('s2-dashboard', 5.8, 'tick', 0.55),
  c('s2-dashboard', 7.0, 'tick', 0.55),
  c('s2-dashboard', 8.6, 'shimmer', 0.4),
  c('s2-dashboard', 9.8, 'ding', 0.55),

  /* S3 — excel */
  c('s3-excel', 0.5, 'pop', 0.5),
  c('s3-excel', 3.5, 'lock-click', 0.7),
  c('s3-excel', 3.8, 'success-arp', 0.55),
  c('s3-excel', 6.8, 'tick', 0.45),
  c('s3-excel', 7.6, 'pop-soft', 0.5),

  /* S4 — export & print */
  c('s4-export', 0.5, 'pop', 0.5),
  c('s4-export', 2.4, 'lock-click', 0.65),
  c('s4-export', 5.6, 'success-arp', 0.6),
  c('s4-export', 8.4, 'print', 0.6),
  c('s4-export', 10.2, 'stamp', 0.75),

  /* S5 — brand */
  c('s5-brand', 0.6, 'pop', 0.55),
  c('s5-brand', 3.6, 'shimmer', 0.45),
  c('s5-brand', 6.4, 'ding', 0.65),
  c('s5-brand', 6.6, 'swell', 0.55),

  /* Transisi tirai antar-scene */
  ...BOUNDARIES.map((b) => ({at: b - 0.45, sfx: 'whoosh-wipe', vol: 0.85})),
];

export const ShowcaseAudio: React.FC<{music?: number; vo?: number; duckDb?: number}> = ({
  music = 0.2,
  vo = 1.0,
  duckDb = -8,
}) => {
  const {fps, durationInFrames} = useVideoConfig();
  const duck = Math.pow(10, duckDb / 20);
  const ranges = timeline.scenes.map((s) => [s.vo_start * fps, s.vo_end * fps] as const);

  const musicVolume = (f: number) => {
    let depth = 0;
    for (const [a, b] of ranges) {
      const k = interpolate(f, [a - 6, a + 6, b - 4, b + 16], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
      depth = Math.max(depth, k);
    }
    const fade = interpolate(
      f,
      [0, 18, durationInFrames - 55, durationInFrames - 1],
      [0, 1, 1, 0],
      {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
    );
    return music * (1 - depth * (1 - duck)) * fade;
  };

  return (
    <>
      <Audio src={staticFile('audio/music-bed.mp3')} volume={musicVolume} />
      {timeline.scenes.map((s) => (
        <Sequence key={s.id} from={Math.round(s.vo_start * fps)}>
          <Audio src={staticFile(s.audio)} volume={vo} />
        </Sequence>
      ))}
      {CUES.map((cue, i) => (
        <Sequence
          key={`sfx-${i}`}
          from={Math.max(0, Math.round(cue.at * fps))}
          durationInFrames={Math.round(4 * fps)}
          layout="none"
        >
          <Audio src={staticFile(`audio/sfx-erekap/${cue.sfx}.wav`)} volume={cue.vol * 0.8} />
        </Sequence>
      ))}
    </>
  );
};
