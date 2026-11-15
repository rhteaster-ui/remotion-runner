import React from 'react';
import {AbsoluteFill, Sequence, useVideoConfig} from 'remotion';
import timeline from './data/ops-timeline.json';
import {OpsAudioMix} from './components/OpsAudioMix';
import {OpsSubtitles} from './components/OpsSubtitles';
import {
  OpsAgentScene,
  OpsBrandScene,
  OpsBridgeScene,
  OpsHookScene,
  OpsWebDashboardScene,
} from './scenes/OpsFlowScenes';

const SCENE_COMPONENTS: Record<string, React.FC> = {
  's1-hook': OpsHookScene,
  's2-bridge': OpsBridgeScene,
  's3-agent': OpsAgentScene,
  's4-web': OpsWebDashboardScene,
  's5-brand': OpsBrandScene,
};

export const OpsFlowVideo: React.FC = () => {
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill style={{backgroundColor: '#090B0E'}}>
      <OpsAudioMix music={0.2} vo={1.0} duckDb={-7} />

      {timeline.scenes.map((scene) => {
        const Comp = SCENE_COMPONENTS[scene.id];
        if (!Comp) return null;
        const from = Math.round(scene.start * fps);
        const durationInFrames = Math.max(1, Math.round(scene.duration * fps));
        return (
          <Sequence key={scene.id} from={from} durationInFrames={durationInFrames}>
            <Comp />
          </Sequence>
        );
      })}

      <OpsSubtitles bottom={82} fontSize={42} />
    </AbsoluteFill>
  );
};
