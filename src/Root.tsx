import React from 'react';
import {Composition} from 'remotion';
import {GeminiVideo} from './GeminiVideo';
import {KryptonVideo} from './KryptonVideo';
import {MascotShowcase} from './MascotShowcase';
import {ElainaShowcase} from './ElainaShowcase';
import {JavaScriptVideo} from './JavaScriptVideo';
import {PlatypusElainaVideo} from './PlatypusElainaVideo';
import {PlatypusCreativeVideo} from './PlatypusCreativeVideo';
import {StorytellingVideo} from './StorytellingVideo';
import {OpsFlowVideo} from './OpsFlowVideo';
import {OpsFlowPremiumVideo} from './OpsFlowPremiumVideo';
import {RepoFlowVideo} from './RepoFlowVideo';
import {RepoFlowPremiumVideo} from './RepoFlowPremiumVideo';
import {ERekapVideo} from './ERekapVideo';
import {ERekapPremiumVideo} from './ERekapPremiumVideo';
import {ERekapShowcaseVideo} from './ERekapShowcaseVideo';
import {N8nOpsVideo} from './N8nOpsVideo';
import timeline from './data/timeline.json';
import kryptonTimeline from './data/krypton-timeline.json';
import agenticTimeline from './data/agentic-timeline.json';
import opsTimeline from './data/ops-timeline.json';
import n8nTimeline from './data/n8n-timeline.json';
import repoflowTimeline from './data/repoflow-timeline.json';
import erekapTimeline from './data/erekap-timeline.json';
import erekapShowcaseTimeline from './data/erekap-showcase-timeline.json';
import platypusTimeline from './data/platypus-timeline.json';
import jsTimeline from './data/js-timeline.json';
import watCues from './data/wat-cues.json';
import {JSWat} from './wat/JSWat';
import chipCues from './data/chip-cues.json';
import {ChipMerahPutihVideo} from './chip/ChipMerahPutihVideo';
import {ERekapHorizontalVideo} from './horizontal/ERekapHorizontalVideo';
import {ERekapKineticTeaser, TEASER_TOTAL_FRAMES} from './kinetic/ERekapKineticTeaser';
import {ERekapKineticTypography, KINETIC_TOTAL_FRAMES} from './typography/ERekapKineticTypography';

export const Root: React.FC = () => (
  <>
    <Composition
      id="ERekapKineticTypography"
      component={ERekapKineticTypography}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={KINETIC_TOTAL_FRAMES}
    />
    <Composition
      id="ERekapKineticTeaser"
      component={ERekapKineticTeaser}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={TEASER_TOTAL_FRAMES}
    />
    <Composition
      id="ERekapHorizontal"
      component={ERekapHorizontalVideo}
      width={1920}
      height={1080}
      fps={erekapShowcaseTimeline.fps}
      durationInFrames={Math.ceil(erekapShowcaseTimeline.total * erekapShowcaseTimeline.fps)}
    />
    <Composition
      id="ChipMerahPutih"
      component={ChipMerahPutihVideo}
      width={1080}
      height={1920}
      fps={chipCues.fps}
      durationInFrames={chipCues.totalFrames}
    />
    <Composition
      id="JSWat"
      component={JSWat}
      width={1080}
      height={1920}
      fps={watCues.fps}
      durationInFrames={watCues.totalFrames}
    />
    <Composition
      id="JavaScriptAbsurd"
      component={JavaScriptVideo}
      width={1080}
      height={1920}
      fps={jsTimeline.fps}
      durationInFrames={jsTimeline.totalFrames}
    />
    <Composition
      id="PlatypusCreative"
      component={PlatypusCreativeVideo}
      width={1080}
      height={1920}
      fps={platypusTimeline.fps}
      durationInFrames={Math.ceil(platypusTimeline.total * platypusTimeline.fps)}
    />
    <Composition
      id="Platypus"
      component={PlatypusCreativeVideo}
      width={1080}
      height={1920}
      fps={platypusTimeline.fps}
      durationInFrames={Math.ceil(platypusTimeline.total * platypusTimeline.fps)}
    />
    <Composition
      id="PlatypusElaina"
      component={PlatypusCreativeVideo}
      width={1080}
      height={1920}
      fps={platypusTimeline.fps}
      durationInFrames={Math.ceil(platypusTimeline.total * platypusTimeline.fps)}
    />
    <Composition
      id="OpsFlowN8N"
      component={N8nOpsVideo}
      width={1080}
      height={1920}
      fps={n8nTimeline.fps}
      durationInFrames={Math.ceil(n8nTimeline.total * n8nTimeline.fps)}
    />
    <Composition
      id="ERekapShowcase"
      component={ERekapShowcaseVideo}
      width={1080}
      height={1920}
      fps={erekapShowcaseTimeline.fps}
      durationInFrames={Math.ceil(erekapShowcaseTimeline.total * erekapShowcaseTimeline.fps)}
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
      id="ElainaShowcase"
      component={ElainaShowcase}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={450}
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
