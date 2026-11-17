import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import timeline from './data/repoflow-timeline.json';
import {RepoFlowAudioMix} from './components/RepoFlowAudioMix';
import {RepoFlowSubtitles} from './components/RepoFlowSubtitles';
import {OpsTransitionSweep} from './premium-ops/shell';
import {
  RepoFlowAtomicScene,
  RepoFlowBrandScene,
  RepoFlowHookScene,
  RepoFlowSecurityScene,
  RepoFlowWorkbenchScene,
} from './premium-repoflow/RepoFlowScenes';

const SCENES: Record<string, React.FC> = {
  's1-hook': RepoFlowHookScene,
  's2-workbench': RepoFlowWorkbenchScene,
  's2-unpack': RepoFlowWorkbenchScene,
  's3-atomic': RepoFlowAtomicScene,
  's3-tree': RepoFlowAtomicScene,
  's4-security': RepoFlowSecurityScene,
  's4-vault': RepoFlowSecurityScene,
  's5-brand': RepoFlowBrandScene,
};

export const RepoFlowVideo: React.FC = () => {
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
    <AbsoluteFill style={{backgroundColor: '#070A0F'}}>
      <RepoFlowAudioMix music={0.2} vo={1.0} duckDb={-8} />

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

      <RepoFlowSubtitles bottom={78} fontSize={42} palette="cyan" />

      <AbsoluteFill
        style={{
          backgroundColor: '#070A0F',
          opacity: Math.max(fadeOut, fadeIn),
          pointerEvents: 'none',
          zIndex: 100,
        }}
      />
    </AbsoluteFill>
  );
};
