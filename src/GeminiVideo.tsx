import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import timeline from './data/timeline.json';
import {Wipe} from './components/Chrome';
import {Subtitles} from './components/Subtitles';
import {AudioMix} from './components/AudioMix';
import {S1Hook, S2Peran, S3Argon, S4Carbon, S5Hydrogen, S6Duet, S7Penutup} from './scenes/Scenes';
import {sceneFrom, sceneLen} from './lib/anchors';
import type {Mode} from './lib/theme';

const SCENES: Record<string, React.FC> = {
  's1-hook': S1Hook,
  's2-peran': S2Peran,
  's3-argon': S3Argon,
  's4-carbon': S4Carbon,
  's5-hydrogen': S5Hydrogen,
  's6-duet': S6Duet,
  's7-penutup': S7Penutup,
};

export const GeminiVideo: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#080b10'}}>
    {timeline.scenes.map((s) => {
      const C = SCENES[s.id];
      return (
        <Sequence key={s.id} from={sceneFrom(s.id)} durationInFrames={sceneLen(s.id)}>
          <C />
        </Sequence>
      );
    })}
    {timeline.scenes.slice(1).map((s) => (
      <Wipe key={s.id} boundary={sceneFrom(s.id)} mode={s.bg as Mode} />
    ))}
    <Subtitles />
    <AudioMix />
  </AbsoluteFill>
);
