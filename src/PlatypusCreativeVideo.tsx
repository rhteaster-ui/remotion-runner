import React from 'react';
import {AbsoluteFill, interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import timeline from './data/platypus-timeline.json';
import {PlatypusAudioMix} from './platypus/PlatypusAudio';
import {PlatypusTransitionSweep} from './platypus/PlatypusKit';
import {PlatypusSubtitles} from './platypus/PlatypusSubtitles';
import {
  P1HookCreativeScene,
  P2SparepartCreativeScene,
  P3TelurKeringatCreativeScene,
  P4TanpaLambungCreativeScene,
  P5TajiBeracunCreativeScene,
  P6OutroSeblakCreativeScene,
} from './platypus/PlatypusCreativeScenes';

const SCENES: Record<string, React.FC> = {
  'p1-hook': P1HookCreativeScene,
  'p2-sparepart': P2SparepartCreativeScene,
  'p3-telur-keringat': P3TelurKeringatCreativeScene,
  'p4-tanpa-lambung': P4TanpaLambungCreativeScene,
  'p5-taji-beracun': P5TajiBeracunCreativeScene,
  'p6-outro-seblak': P6OutroSeblakCreativeScene,
};

export const PlatypusCreativeVideo: React.FC = () => {
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
      <PlatypusAudioMix music={0.2} vo={1.0} sfxMaster={0.9} duckDb={-8.5} />

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

      <PlatypusSubtitles bottom={84} fontSize={44} />

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
