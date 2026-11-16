import React from 'react';
import {AbsoluteFill, Sequence, useVideoConfig} from 'remotion';
import timeline from './data/erekap-timeline.json';
import {ERekapAudioMix} from './components/ERekapAudioMix';
import {ERekapSubtitles} from './components/ERekapSubtitles';
import {
  ERekapAdminScene,
  ERekapBrandScene,
  ERekapDashboardScene,
  ERekapExportPrintScene,
  ERekapHookScene,
} from './scenes/ERekapScenes';

const SCENE_COMPONENTS: Record<string, React.FC> = {
  's1-hook': ERekapHookScene,
  's2-dashboard': ERekapDashboardScene,
  's3-rekap-admin': ERekapAdminScene,
  's4-export-print': ERekapExportPrintScene,
  's5-brand': ERekapBrandScene,
};

export const ERekapVideo: React.FC = () => {
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill style={{backgroundColor: '#072919'}}>
      <ERekapAudioMix music={0.18} vo={1.0} duckDb={-7} />

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

      <ERekapSubtitles bottom={78} fontSize={42} />
    </AbsoluteFill>
  );
};
