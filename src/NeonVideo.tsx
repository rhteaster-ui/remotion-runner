import React from 'react';
import {AbsoluteFill, interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import timeline from './data/neon-timeline.json';
import {NeonAudioMix} from './neon/NeonAudioMix';
import {S1Hook, S2Posisi, S3Thinking, S4Benchmark, S5Outro} from './neon/NeonScenes';
import {NeonSubtitles} from './neon/NeonSubtitles';
import {NEON_TOKENS as T} from './neon/neonTokens';

const SCENES: Record<string, React.FC> = {
  's1-hook': S1Hook,
  's2-posisi': S2Posisi,
  's3-thinking': S3Thinking,
  's4-benchmark': S4Benchmark,
  's5-outro': S5Outro,
};

const SceneTransition: React.FC<{boundary: number}> = ({boundary}) => {
  const f = useCurrentFrame();
  if (f < boundary - 10 || f > boundary + 10) return null;
  const p = interpolate(f, [boundary - 10, boundary, boundary + 10], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#080B12',
        opacity: p * 0.95,
        pointerEvents: 'none',
        zIndex: 80,
      }}
    />
  );
};

export const NeonVideo: React.FC = () => {
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill style={{backgroundColor: T.bg}}>
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

      {/* Transition cuts */}
      {timeline.scenes.slice(1).map((s) => (
        <SceneTransition key={`trans-${s.id}`} boundary={Math.round(s.start * fps)} />
      ))}

      {/* Dynamic Subtitles */}
      <NeonSubtitles bottom={80} fontSize={42} />

      {/* Audio Mix with dynamic ducking */}
      <NeonAudioMix />
    </AbsoluteFill>
  );
};
