import React from 'react';
import {Audio, interpolate, Sequence, staticFile, useVideoConfig} from 'remotion';
import timeline from '../data/erekap-timeline.json';

type Props = {
  music?: number;
  vo?: number;
  duckDb?: number;
};

export const ERekapAudioMix: React.FC<Props> = ({
  music = 0.18,
  vo = 1.0,
  duckDb = -7,
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
    </>
  );
};
