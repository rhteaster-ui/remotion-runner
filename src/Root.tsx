import React from 'react';
import {Composition} from 'remotion';
import {GeminiVideo} from './GeminiVideo';
import {KryptonVideo} from './KryptonVideo';
import {MascotShowcase} from './MascotShowcase';
import {StorytellingVideo} from './StorytellingVideo';
import {OpsFlowVideo} from './OpsFlowVideo';
import timeline from './data/timeline.json';
import kryptonTimeline from './data/krypton-timeline.json';
import agenticTimeline from './data/agentic-timeline.json';
import opsTimeline from './data/ops-timeline.json';

export const Root: React.FC = () => (
  <>
    <Composition
      id="OpsFlowTikTok"
      component={OpsFlowVideo}
      width={1080}
      height={1920}
      fps={opsTimeline.fps}
      durationInFrames={Math.ceil(opsTimeline.total * opsTimeline.fps)}
    />
    <Composition
      id="StorytellingVideo"
      component={StorytellingVideo}
      width={1080}
      height={1920}
      fps={agenticTimeline.fps}
      durationInFrames={Math.ceil(agenticTimeline.total * agenticTimeline.fps)}
    />
    <Composition
      id="MascotShowcase"
      component={MascotShowcase}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={375}
    />
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
  </>
);
