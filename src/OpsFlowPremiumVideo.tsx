import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import timeline from './data/ops-timeline.json';
import {OpsAudioMix} from './components/OpsAudioMix';
import {OpsSubtitles} from './components/OpsSubtitles';
import {OpsPremiumAudio} from './premium-ops/OpsPremiumAudio';
import {OpsTransitionSweep} from './premium-ops/shell';
import {
  OpsPremiumBridgeScene,
  OpsPremiumHookScene,
} from './premium-ops/scenes1';
import {
  OpsPremiumAgentScene,
  OpsPremiumBrandScene,
  OpsPremiumWebScene,
} from './premium-ops/scenes2';

const SCENES: Record<string, React.FC> = {
  's1-hook': OpsPremiumHookScene,
  's2-bridge': OpsPremiumBridgeScene,
  's3-agent': OpsPremiumAgentScene,
  's4-web': OpsPremiumWebScene,
  's5-brand': OpsPremiumBrandScene,
};

export const OpsFlowPremiumVideo: React.FC = () => {
  const {fps, durationInFrames} = useVideoConfig();
  const frame = useCurrentFrame();
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 26, durationInFrames - 1],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );
  const fadeIn = interpolate(frame, [0, 10], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{backgroundColor: '#080b10'}}>
      <OpsAudioMix music={0.2} vo={1.0} duckDb={-8} />
      <OpsPremiumAudio master={0.8} />

      {timeline.scenes.map((scene) => {
        const Comp = SCENES[scene.id];
        if (!Comp) return null;
        return (
          <Sequence
            key={scene.id}
            from={Math.round(scene.start * fps)}
            durationInFrames={Math.max(1, Math.round(scene.duration * fps))}
          >
            <Comp />
          </Sequence>
        );
      })}

      {timeline.scenes.slice(1).map((scene) => (
        <OpsTransitionSweep
          key={scene.id}
          atFrame={Math.round(scene.start * fps)}
          half={12}
        />
      ))}

      <OpsSubtitles bottom={78} fontSize={42} palette="portfolio" />
      <AbsoluteFill
        style={{
          backgroundColor: '#080b10',
          opacity: Math.max(fadeOut, fadeIn),
          pointerEvents: 'none',
          zIndex: 100,
        }}
      />
    </AbsoluteFill>
  );
};
