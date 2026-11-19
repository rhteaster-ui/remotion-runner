import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import timeline from '../data/erekap-showcase-timeline.json';
import { ShowcaseAudio } from '../showcase/ShowcaseAudio';
import { ShowcaseSubtitles } from '../showcase/ShowcaseSubtitles';
import { HorizontalHeader } from './HorizontalHeader';
import {
  HorizontalScene1Hook,
  HorizontalScene2Dashboard,
  HorizontalScene3Excel,
  HorizontalScene4Export,
  HorizontalScene5Brand,
} from './HorizontalScenes';

const SCENES: Record<string, React.FC> = {
  's1-hook': HorizontalScene1Hook,
  's2-dashboard': HorizontalScene2Dashboard,
  's3-excel': HorizontalScene3Excel,
  's4-export': HorizontalScene4Export,
  's5-brand': HorizontalScene5Brand,
};

export const ERekapHorizontalVideo: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const currentTime = frame / fps;

  // Determine current active scene index for stepper
  let activeSceneIdx = 0;
  for (let i = 0; i < timeline.scenes.length; i++) {
    const sc = timeline.scenes[i];
    if (currentTime >= sc.start && currentTime < sc.end) {
      activeSceneIdx = i;
      break;
    }
    if (currentTime >= sc.end) {
      activeSceneIdx = i;
    }
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#04140D',
        overflow: 'hidden',
      }}
    >
      {/* Background Subtle Tech Grid & Radial Glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 90% 80% at 50% 35%, #0B3A23 0%, #062215 50%, #03100A 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.08,
          backgroundImage: `
            linear-gradient(rgba(163, 230, 53, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(163, 230, 53, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Synchronized Voiceover (Puck) & Snappy BGM */}
      <ShowcaseAudio music={0.18} vo={1.0} duckDb={-8} />

      {/* Top Fixed Header with Stepper Progress */}
      <HorizontalHeader currentStepIndex={activeSceneIdx} />

      {/* Sequenced Scenes */}
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

      {/* Bottom Subtitles with Karaoke Word-Level Highlight */}
      <ShowcaseSubtitles bottom={46} fontSize={36} />
    </AbsoluteFill>
  );
};
