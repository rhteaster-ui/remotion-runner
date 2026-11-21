import React from 'react';
import {AbsoluteFill, Sequence, useVideoConfig} from 'remotion';
import timeline from './data/filosofi-timeline.json';
import {Wipe} from './components/Chrome';
import {FilosofiAudioMix} from './filosofi/FilosofiAudioMix';
import {S1Hook, S2Claude, S3Gemini, S4OpenAI, S5Outro} from './filosofi/FilosofiScenes';
import {FilosofiSubtitles} from './filosofi/FilosofiSubtitles';
import type {Mode} from './lib/theme';

const SCENES: Record<string, React.FC> = {
  's1-hook': S1Hook,
  's2-claude': S2Claude,
  's3-gemini': S3Gemini,
  's4-openai': S4OpenAI,
  's5-outro': S5Outro,
};

export const FilosofiVideo: React.FC = () => {
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill style={{backgroundColor: '#080B12'}}>
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
      <FilosofiSubtitles bottom={80} fontSize={42} />

      {/* Audio Mix with dynamic ducking & SFX */}
      <FilosofiAudioMix />
    </AbsoluteFill>
  );
};
