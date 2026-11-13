import React from 'react';
import {Composition} from 'remotion';
import {GeminiVideo} from './GeminiVideo';
import timeline from './data/timeline.json';

export const Root: React.FC = () => (
  <Composition
    id="Gemini4"
    component={GeminiVideo}
    width={1080}
    height={1920}
    fps={timeline.fps}
    durationInFrames={Math.ceil(timeline.total * timeline.fps)}
  />
);
