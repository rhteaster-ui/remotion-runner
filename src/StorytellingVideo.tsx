import React from 'react';
import {AbsoluteFill, Sequence, useVideoConfig} from 'remotion';
import timeline from './data/agentic-timeline.json';
import {AgenticAudioMix} from './components/AgenticAudioMix';
import {AgenticSubtitles} from './components/AgenticSubtitles';
import {
  StoryHookScene,
  StoryOriginScene,
  StoryArchitectureScene,
  StoryExecutionScene,
  StoryOutroScene,
} from './scenes/AgenticStoryScenes';

const SCENE_COMPONENTS: Record<string, React.FC> = {
  hook: StoryHookScene,
  origin: StoryOriginScene,
  architecture: StoryArchitectureScene,
  execution: StoryExecutionScene,
  outro: StoryOutroScene,
};

export const StorytellingVideo: React.FC = () => {
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill style={{backgroundColor: '#0b0b0d'}}>
      {/* Dynamic Audio Mix with Background Music & Voiceover */}
      <AgenticAudioMix music={0.22} vo={1.0} duckDb={-6} />

      {/* Sequential 4-Zone Scenes */}
      {timeline.scenes.map((scene) => {
        const Comp = SCENE_COMPONENTS[scene.id];
        if (!Comp) return null;
        const from = Math.round(scene.start * fps);
        const durationInFrames = Math.max(1, Math.round(scene.duration * fps));
        return (
          <Sequence key={scene.id} from={from} durationInFrames={durationInFrames}>
            <Comp />
          </Sequence>
        );
      })}

      {/* Dynamic Bottom Subtitles (Karaoke Word-by-Word Highlight, 42px) */}
      <AgenticSubtitles bottom={78} fontSize={42} />
    </AbsoluteFill>
  );
};
