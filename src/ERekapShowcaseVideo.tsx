import React from 'react';
import {AbsoluteFill, interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import timeline from './data/erekap-showcase-timeline.json';
import {TransitionSweep} from './premium/fx';
import {ShowcaseAudio} from './showcase/ShowcaseAudio';
import {ShowcaseSubtitles} from './showcase/ShowcaseSubtitles';
import {
  ShowcaseBrandScene,
  ShowcaseDashboardScene,
  ShowcaseExcelScene,
  ShowcaseExportScene,
  ShowcaseHookScene,
} from './showcase/ShowcaseScenes';

const SCENES: Record<string, React.FC> = {
  's1-hook': ShowcaseHookScene,
  's2-dashboard': ShowcaseDashboardScene,
  's3-excel': ShowcaseExcelScene,
  's4-export': ShowcaseExportScene,
  's5-brand': ShowcaseBrandScene,
};

export const ERekapShowcaseVideo: React.FC = () => {
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
    <AbsoluteFill style={{backgroundColor: '#072919'}}>
      <ShowcaseAudio music={0.2} vo={1.0} duckDb={-8} />

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
        <TransitionSweep
          key={scene.id}
          atFrame={Math.round(scene.start * fps)}
          half={12}
        />
      ))}

      <ShowcaseSubtitles bottom={78} fontSize={42} />
      <AbsoluteFill
        style={{
          backgroundColor: '#02100A',
          opacity: Math.max(fadeOut, fadeIn),
          pointerEvents: 'none',
          zIndex: 100,
        }}
      />
    </AbsoluteFill>
  );
};
