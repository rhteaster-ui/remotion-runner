import React from 'react';
import {AbsoluteFill, interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import timeline from './data/platypus-timeline.json';
import {PlatypusAudioMix} from './platypus/PlatypusAudio';
import {PlatypusTransitionSweep} from './platypus/PlatypusKit';
import {PlatypusSubtitles} from './platypus/PlatypusSubtitles';
import {P1HookScene, P2SparepartScene, P3TelurKeringatScene} from './platypus/PlatypusScenes1';
import {P4TanpaLambungScene, P5TajiBeracunScene, P6OutroSeblakScene} from './platypus/PlatypusScenes2';

const SCENES: Record<string, React.FC> = {
  'p1-hook': P1HookScene,
  'p2-sparepart': P2SparepartScene,
  'p3-telur-keringat': P3TelurKeringatScene,
  'p4-tanpa-lambung': P4TanpaLambungScene,
  'p5-taji-beracun': P5TajiBeracunScene,
  'p6-outro-seblak': P6OutroSeblakScene,
};

export const PlatypusElainaVideo: React.FC = () => {
  const {fps, durationInFrames} = useVideoConfig();
  const frame = useCurrentFrame();
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 26, durationInFrames - 1],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  const fadeIn = interpolate(frame, [0, 10], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{backgroundColor: '#0b0b0d'}}>
      <PlatypusAudioMix music={0.18} vo={1.0} sfxMaster={0.85} duckDb={-8.5} />

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
        <PlatypusTransitionSweep key={scene.id} atFrame={Math.round(scene.start * fps)} half={12} />
      ))}

      <PlatypusSubtitles bottom={80} fontSize={42} />

      <AbsoluteFill
        style={{
          backgroundColor: '#05060a',
          opacity: Math.max(fadeOut, fadeIn),
          pointerEvents: 'none',
          zIndex: 100,
        }}
      />
    </AbsoluteFill>
  );
};
