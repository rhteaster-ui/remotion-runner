import React from 'react';
import {AbsoluteFill, interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import timeline from './data/js-timeline.json';
import {JavaScriptAudioMix} from './javascript/JavaScriptAudio';
import {JavaScriptSubtitles} from './javascript/JavaScriptSubtitles';
import {JS1HookScene, JS2AngkaTeksScene} from './javascript/JavaScriptScenes1';
import {JS3NanScene, JS4ArrayObjekScene, JS5TypescriptOutroScene} from './javascript/JavaScriptScenes2';

const SCENES: Record<string, React.FC> = {
  'js1-hook': JS1HookScene,
  'js2-angka-teks': JS2AngkaTeksScene,
  'js3-nan': JS3NanScene,
  'js4-array-objek': JS4ArrayObjekScene,
  'js5-typescript-outro': JS5TypescriptOutroScene,
};

export const JavaScriptVideo: React.FC = () => {
  const {fps, durationInFrames} = useVideoConfig();
  const frame = useCurrentFrame();

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 24, durationInFrames - 1],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  const fadeIn = interpolate(frame, [0, 12], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{backgroundColor: '#0b0b0d'}}>
      <JavaScriptAudioMix music={0.18} vo={1.0} sfxMaster={0.85} duckDb={-9.0} />

      {timeline.scenes.map((scene) => {
        const Comp = SCENES[scene.id];
        if (!Comp) return null;
        return (
          <Sequence
            key={scene.id}
            from={scene.startFrame}
            durationInFrames={scene.durationFrames}
          >
            <Comp />
          </Sequence>
        );
      })}

      <JavaScriptSubtitles bottom={84} fontSize={42} />

      {/* Gentle Fade In / Fade Out */}
      <AbsoluteFill
        style={{
          backgroundColor: '#0b0b0d',
          opacity: Math.max(fadeOut, fadeIn),
          pointerEvents: 'none',
          zIndex: 100,
        }}
      />
    </AbsoluteFill>
  );
};
