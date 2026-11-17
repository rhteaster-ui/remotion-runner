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
import {RepoFlowAudio} from './premium-repoflow/RepoFlowAudio';
import {RepoFlowTransitionSweep} from './premium-repoflow/shell';
import {
  RepoFlowBrandScene,
  RepoFlowHookScene,
  RepoFlowTreeScene,
  RepoFlowUnpackScene,
  RepoFlowVaultScene,
} from './premium-repoflow/scenes';

const SCENES: Record<string, React.FC> = {
  's1-hook': RepoFlowHookScene,
  's2-unpack': RepoFlowUnpackScene,
  's3-tree': RepoFlowTreeScene,
  's4-vault': RepoFlowVaultScene,
  's5-brand': RepoFlowBrandScene,
};

export const RepoFlowPremiumVideo: React.FC = () => {
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
    <AbsoluteFill style={{backgroundColor: '#07090e'}}>
      {/* Background Music Bed + Gemini Voiceover with Auto-Ducking */}
      <RepoFlowAudioMix music={0.2} vo={1.0} duckDb={-8} />

      {/* 20+ Synthesized SFX Cues (Pop, Tick, Whoosh, Impact, Shimmer, Arp) */}
      <RepoFlowAudio master={0.8} />

      {/* 5 Dynamic Scenes Sequenced by Timestamp */}
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

      {/* Transition Sweeps between Scenes */}
      {timeline.scenes.slice(1).map((scene) => (
        <RepoFlowTransitionSweep
          key={scene.id}
          atFrame={Math.round(scene.start * fps)}
          half={12}
        />
      ))}

      {/* Subtitles at bottom offset 78px with dynamic karaoke word highlight */}
      <RepoFlowSubtitles bottom={78} fontSize={42} />

      {/* Global Fade In & Fade Out */}
      <AbsoluteFill
        style={{
          backgroundColor: '#07090e',
          opacity: Math.max(fadeOut, fadeIn),
          pointerEvents: 'none',
          zIndex: 100,
        }}
      />
    </AbsoluteFill>
  );
};
