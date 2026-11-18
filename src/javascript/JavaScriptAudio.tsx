import React from 'react';
import {Audio, interpolate, Sequence, staticFile, useVideoConfig} from 'remotion';
import timeline from '../data/js-timeline.json';

export interface SfxCue {
  at: number; // seconds
  sfx: string;
  vol: number;
}

export const JS_SFX_CUES: SfxCue[] = [
  // Scene 1: Hook
  {at: 0.1, sfx: 'whoosh-wipe', vol: 0.75},
  {at: 1.8, sfx: 'ding', vol: 0.65},
  {at: 5.5, sfx: 'pop', vol: 0.55},

  // Scene 2: 1 + '1' = 11
  {at: 12.0, sfx: 'whoosh-wipe', vol: 0.75},
  {at: 15.2, sfx: 'buzz-error', vol: 0.8},
  {at: 21.0, sfx: 'stamp', vol: 0.85},
  {at: 27.5, sfx: 'impact', vol: 0.7},

  // Scene 3: typeof NaN
  {at: 32.6, sfx: 'whoosh-wipe', vol: 0.75},
  {at: 41.5, sfx: 'buzz-error', vol: 0.8},
  {at: 48.0, sfx: 'ding', vol: 0.6},
  {at: 59.0, sfx: 'absurd-thud', vol: 0.75},

  // Scene 4: [] + {} vs {} + []
  {at: 70.3, sfx: 'whoosh-wipe', vol: 0.75},
  {at: 77.0, sfx: 'buzz-error', vol: 0.75},
  {at: 84.5, sfx: 'seblak-rimshot', vol: 0.85},
  {at: 91.0, sfx: 'impact', vol: 0.7},

  // Scene 5: Outro & TypeScript
  {at: 94.6, sfx: 'whoosh-wipe', vol: 0.75},
  {at: 99.5, sfx: 'buzz-error', vol: 0.75},
  {at: 104.0, sfx: 'success-arp', vol: 0.7},
  {at: 111.0, sfx: 'shimmer', vol: 0.75},
];

export const JavaScriptAudioMix: React.FC<{
  music?: number;
  vo?: number;
  sfxMaster?: number;
  duckDb?: number;
}> = ({music = 0.18, vo = 1.0, sfxMaster = 0.85, duckDb = -9.0}) => {
  const {fps, durationInFrames} = useVideoConfig();
  const duck = Math.pow(10, duckDb / 20);

  const ranges = timeline.scenes.map((s) => [
    (s.start + s.voOffset) * fps,
    (s.start + s.voOffset + s.audioDuration) * fps,
  ] as const);

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
      [0, 15, durationInFrames - 45, durationInFrames - 1],
      [0, 1, 1, 0],
      {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
    );
    return music * (1 - depth * (1 - duck)) * fade;
  };

  return (
    <>
      <Audio src={staticFile('audio/platypus-music-bed.mp3')} volume={musicVolume} />
      {timeline.scenes.map((s) => {
        const startFrame = Math.round((s.start + s.voOffset) * fps);
        return (
          <Sequence key={s.id} from={startFrame}>
            <Audio src={staticFile(s.audioFile)} volume={vo} />
          </Sequence>
        );
      })}
      {JS_SFX_CUES.map((c, i) => {
        const startFrame = Math.max(0, Math.round(c.at * fps));
        // Check if SFX exists in sfx-platypus or sfx-erekap
        const sfxFolder = ['buzz-error', 'ding', 'impact', 'key', 'lock-click', 'pop', 'print', 'riser', 'shimmer', 'stamp', 'success-arp', 'whoosh-wipe'].includes(c.sfx)
          ? 'sfx-erekap'
          : 'sfx-platypus';
        return (
          <Sequence key={`${c.sfx}-${i}`} from={startFrame} durationInFrames={90}>
            <Audio src={staticFile(`audio/${sfxFolder}/${c.sfx}.wav`)} volume={c.vol * sfxMaster} />
          </Sequence>
        );
      })}
    </>
  );
};
