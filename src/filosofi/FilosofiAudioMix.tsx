import React from 'react';
import {Audio, interpolate, Sequence, staticFile, useVideoConfig} from 'remotion';
import timeline from '../data/filosofi-timeline.json';

type Props = {
  music?: number;
  sfx?: number;
  vo?: number;
  duckDb?: number;
};

export const FilosofiAudioMix: React.FC<Props> = ({
  music = 0.45,
  sfx = 0.85,
  vo = 1.25,
  duckDb = -10,
}) => {
  const {fps, durationInFrames} = useVideoConfig();
  const duck = Math.pow(10, duckDb / 20);
  const ranges = timeline.scenes.map((s) => [s.vo_start * fps, s.vo_end * fps] as const);

  const musicVolume = (f: number) => {
    let depth = 0;
    for (const [a, b] of ranges) {
      const k = interpolate(f, [a - 6, a + 6, b - 4, b + 20], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
      depth = Math.max(depth, k);
    }
    const fade = interpolate(f, [0, 25, durationInFrames - 60, durationInFrames - 1], [0, 1, 1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    return music * (1 - depth * (1 - duck)) * fade;
  };

  const s2Start = Math.round(timeline.scenes[1].start * fps);
  const s3Start = Math.round(timeline.scenes[2].start * fps);
  const s4Start = Math.round(timeline.scenes[3].start * fps);
  const s5Start = Math.round(timeline.scenes[4].start * fps);

  const SFX_CUES: {from: number; name: string; vol?: number}[] = [
    // Scene 1: Hook
    {from: 6, name: 'whoosh-soft.wav', vol: 0.6},
    {from: 40, name: 'riser.wav', vol: 0.75},
    {from: 55, name: 'impact.wav', vol: 0.9},
    {from: 62, name: 'shimmer.wav', vol: 0.7},

    // Scene 2: Claude Literature
    {from: s2Start + 4, name: 'whoosh-wipe.wav', vol: 0.8},
    {from: s2Start + 25, name: 'lock-click.wav', vol: 0.7},
    {from: s2Start + 60, name: 'tick.wav', vol: 0.75},
    {from: s2Start + 90, name: 'pop-soft.wav', vol: 0.8},

    // Scene 3: Gemini DeepMind
    {from: s3Start + 4, name: 'whoosh-wipe.wav', vol: 0.8},
    {from: s3Start + 30, name: 'shimmer.wav', vol: 0.8},
    {from: s3Start + 65, name: 'lock-click.wav', vol: 0.75},
    {from: s3Start + 110, name: 'ding.wav', vol: 0.85},

    // Scene 4: OpenAI o1 Reasoning
    {from: s4Start + 4, name: 'whoosh-wipe.wav', vol: 0.8},
    {from: s4Start + 35, name: 'impact.wav', vol: 0.95},
    {from: s4Start + 60, name: 'tick.wav', vol: 0.8},
    {from: s4Start + 95, name: 'success-arp.wav', vol: 0.8},

    // Scene 5: Outro rhmt ofc
    {from: s5Start + 4, name: 'whoosh-soft.wav', vol: 0.7},
    {from: s5Start + 30, name: 'ding.wav', vol: 0.9},
    {from: s5Start + 60, name: 'shimmer.wav', vol: 0.75},
  ];

  return (
    <>
      {/* Background Music with Auto Ducking */}
      <Audio src={staticFile('audio/music-bed.mp3')} volume={musicVolume} loop />

      {/* Voiceover Sequences */}
      {timeline.scenes.map((s) => (
        <Sequence key={s.id} from={Math.round(s.vo_start * fps)}>
          <Audio src={staticFile(`audio/vo-filosofi/${s.id}.mp3`)} volume={vo} />
        </Sequence>
      ))}

      {/* Synchronized Micro-SFX */}
      {SFX_CUES.map((cue, idx) => (
        <Sequence key={`${cue.name}-${cue.from}-${idx}`} from={cue.from}>
          <Audio src={staticFile(`audio/sfx-erekap/${cue.name}`)} volume={(cue.vol ?? 1.0) * sfx} />
        </Sequence>
      ))}
    </>
  );
};
