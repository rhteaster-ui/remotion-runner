import React from 'react';
import {Audio, interpolate, Sequence, staticFile, useVideoConfig} from 'remotion';
import timeline from '../data/krypton-timeline.json';

type Props = {
  music?: number;
  sfx?: number;
  vo?: number;
  duckDb?: number;
};

export const KryptonAudioMix: React.FC<Props> = ({music = 0.85, sfx = 0.85, vo = 1.05, duckDb = -7}) => {
  const {fps, durationInFrames} = useVideoConfig();
  const duck = Math.pow(10, duckDb / 20);
  const ranges = timeline.scenes.map((s) => [s.vo_start * fps, s.vo_end * fps] as const);

  const musicVolume = (f: number) => {
    let depth = 0;
    for (const [a, b] of ranges) {
      const k = interpolate(f, [a - 5, a + 5, b - 3, b + 18], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
      depth = Math.max(depth, k);
    }
    const fade = interpolate(f, [0, 20, durationInFrames - 70, durationInFrames - 1], [0, 1, 1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    return music * (1 - depth * (1 - duck)) * fade;
  };

  return (
    <>
      <Audio src={staticFile('audio/music-bed.mp3')} volume={musicVolume} loop />
      <Audio src={staticFile('audio/sfx-track.mp3')} volume={sfx} />
      {timeline.scenes.map((s) => (
        <Sequence key={s.id} from={Math.round(s.vo_start * fps)}>
          <Audio src={staticFile(`audio/vo-krypton/${s.id}.mp3`)} volume={vo} />
        </Sequence>
      ))}
    </>
  );
};
