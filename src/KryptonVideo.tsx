import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import timeline from './data/krypton-timeline.json';
import {Wipe} from './components/Chrome';
import {KryptonSubtitles} from './components/KryptonSubtitles';
import {KryptonAudioMix} from './components/KryptonAudioMix';
import {K1Hook, K2Recap, K3Krypton, K4Klaim, K5Status, K6Outro} from './scenes/KryptonScenes';
import {kSceneFrom, kSceneLen} from './lib/kryptonAnchors';
import type {Mode} from './lib/theme';

const SCENES: Record<string, React.FC> = {
  's1-hook': K1Hook,
  's2-recap': K2Recap,
  's3-krypton': K3Krypton,
  's4-klaim': K4Klaim,
  's5-status': K5Status,
  's6-outro': K6Outro,
};

export const KryptonVideo: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#080b10'}}>
    {timeline.scenes.map((s) => {
      const C = SCENES[s.id];
      return (
        <Sequence key={s.id} from={kSceneFrom(s.id)} durationInFrames={kSceneLen(s.id)}>
          <C />
        </Sequence>
      );
    })}
    {timeline.scenes.slice(1).map((s) => (
      <Wipe key={s.id} boundary={kSceneFrom(s.id)} mode={s.bg as Mode} />
    ))}
    <KryptonSubtitles />
    <KryptonAudioMix />
  </AbsoluteFill>
);
