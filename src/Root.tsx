import React from 'react';
import {Composition} from 'remotion';
import {GeminiVideo} from './GeminiVideo';
import {KryptonVideo} from './KryptonVideo';
import {MascotShowcase} from './MascotShowcase';
import {StorytellingVideo} from './StorytellingVideo';
import {OpsFlowVideo} from './OpsFlowVideo';
import {OpsFlowPremiumVideo} from './OpsFlowPremiumVideo';
import {RepoFlowVideo} from './RepoFlowVideo';
import {RepoFlowPremiumVideo} from './RepoFlowPremiumVideo';
import {ERekapVideo} from './ERekapVideo';
import {ERekapPremiumVideo} from './ERekapPremiumVideo';
import {N8nOpsVideo} from './N8nOpsVideo';
import timeline from './data/timeline.json';
import kryptonTimeline from './data/krypton-timeline.json';
import agenticTimeline from './data/agentic-timeline.json';
import opsTimeline from './data/ops-timeline.json';
import n8nTimeline from './data/n8n-timeline.json';
import repoflowTimeline from './data/repoflow-timeline.json';
import erekapTimeline from './data/erekap-timeline.json';

export const Root: React.FC = () => (
  <>
    <Composition
      id="OpsFlowN8N"
      component={N8nOpsVideo}
      width={1080}
      height={1920}
      fps={n8nTimeline.fps}
      durationInFrames={Math.ceil(n8nTimeline.total * n8nTimeline.fps)}
    />
    <Composition
      id="ERekapPremium"
      component={ERekapPremiumVideo}
      width={1080}
      height={1920}
      fps={erekapTimeline.fps}
      durationInFrames={Math.ceil(erekapTimeline.total * erekapTimeline.fps)}
    />
    <Composition
      id="ERekapTikTok"
      component={ERekapVideo}
      width={1080}
      height={1920}
      fps={erekapTimeline.fps}
      durationInFrames={Math.ceil(erekapTimeline.total * erekapTimeline.fps)}
    />
    <Composition
      id="RepoFlowTikTok"
      component={RepoFlowVideo}
      width={1080}
      height={1920}
      fps={repoflowTimeline.fps}
      durationInFrames={Math.ceil(repoflowTimeline.total * repoflowTimeline.fps)}
    />
    <Composition
      id="RepoFlowPremium"
      component={RepoFlowPremiumVideo}
      width={1080}
      height={1920}
      fps={repoflowTimeline.fps}
      durationInFrames={Math.ceil(repoflowTimeline.total * repoflowTimeline.fps)}
    />
    <Composition
      id="OpsFlowPremium"
      component={OpsFlowPremiumVideo}
      width={1080}
      height={1920}
      fps={opsTimeline.fps}
      durationInFrames={Math.ceil(opsTimeline.total * opsTimeline.fps)}
    />
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
