import React from 'react';
import {AbsoluteFill, Sequence, useVideoConfig} from 'remotion';
import timeline from './data/neon-timeline.json';
import {Wipe} from './components/Chrome';
import {NeonAudioMix} from './neon/NeonAudioMix';
import {S1Hook, S2Posisi, S3Thinking, S4Benchmark, S5Outro} from './neon/NeonScenes';
import {NeonSubtitles} from './neon/NeonSubtitles';
import type {Mode} from './lib/theme';

const SCENES: Record<string, React.FC> = {
  's1-hook': S1Hook,
  's2-posisi': S2Posisi,
  's3-thinking': S3Thinking,
  's4-benchmark': S4Benchmark,
  's5-outro': S5Outro,
};

export const NeonVideo: React.FC = () => {
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill style={{backgroundColor: '#080b10'}}>
      {timeline.scenes.map((s) => {
        const C = SCENES[s.id];
        const fromFrame = Math.round(s.start * fps);
        const durFrames = Math.round(s.duration * fps);
        return (
          <Sequence key={s.id} from={fromFrame} durationInFrames={durFrames}>
            <C />
          </Sequence>
        );
      })}

      {/* Transition cuts (Wipe with accent bar) */}
      {timeline.scenes.slice(1).map((s) => (
        <Wipe
          key={`trans-${s.id}`}
          boundary={Math.round(s.start * fps)}
          mode={(s.bg || 'dark') as Mode}
        />
      ))}

      {/* Subtitles at bottom 80px */}
      <NeonSubtitles bottom={80} fontSize={42} />

      {/* Audio Mix with dynamic ducking & SFX */}
      <NeonAudioMix />
    </AbsoluteFill>
  );
};
