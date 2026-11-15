import React from 'react';
import {Composition} from 'remotion';
import {GeminiVideo} from './GeminiVideo';
import {KryptonVideo} from './KryptonVideo';
import {MascotShowcase} from './MascotShowcase';
import timeline from './data/timeline.json';
import kryptonTimeline from './data/krypton-timeline.json';

export const Root: React.FC = () => (
  <>
    <Composition
      id="Gemini4"
      component={GeminiVideo}
      width={1080}
      height={1920}
      fps={timeline.fps}
      durationInFrames={Math.ceil(timeline.total * timeline.fps)}
    />
    <Composition
      id="Gemini4Krypton"
      component={KryptonVideo}
      width={1080}
      height={1920}
      fps={kryptonTimeline.fps}
      durationInFrames={Math.ceil(kryptonTimeline.total * kryptonTimeline.fps)}
    />
    <Composition
      id="MascotShowcase"
      component={MascotShowcase}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={360}
    />
  </>
);
