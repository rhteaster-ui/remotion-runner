import React from 'react';
import {Audio, interpolate, Sequence, staticFile, useVideoConfig} from 'remotion';
import timeline from '../data/platypus-timeline.json';
import {PLATYPUS_CUES} from './cues';

export const PlatypusAudioMix: React.FC<{
  music?: number;
  vo?: number;
  sfxMaster?: number;
  duckDb?: number;
}> = ({music = 0.19, vo = 1.0, sfxMaster = 0.82, duckDb = -8.5}) => {
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
      [0, 16, durationInFrames - 45, durationInFrames - 1],
      [0, 1, 1, 0],
      {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
    );
    return music * (1 - depth * (1 - duck)) * fade;
  };

  return (
    <>
      <Audio src={staticFile('audio/platypus-music-bed.mp3')} volume={musicVolume} />
      {timeline.scenes.map((s) => (
        <Sequence key={s.id} from={Math.round(s.vo_start * fps)}>
          <Audio src={staticFile(s.audio)} volume={vo} />
        </Sequence>
      ))}
      {PLATYPUS_CUES.map((c, i) => (
        <Sequence key={`${c.sfx}-${i}`} from={Math.max(0, Math.round(c.at * fps))} durationInFrames={90}>
          <Audio src={staticFile(`audio/sfx-platypus/${c.sfx}.wav`)} volume={c.vol * sfxMaster} />
        </Sequence>
      ))}
    </>
  );
};
