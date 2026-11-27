import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import storyboard from '../data/elainacloud-storyboard.json';
import {ChapterTag, Dock, MenuBar, OVERLAP, SceneFrameProvider, WordSyncCaption, WordTiming} from './kit';
import {FPS} from './theme';
import {S1} from './scenes/S1';
import {S2} from './scenes/S2';
import {S3} from './scenes/S3';
import {S4} from './scenes/S4';
import {S5} from './scenes/S5';
import {S6} from './scenes/S6';
import {S7} from './scenes/S7';

const COMPONENTS = [S1, S2, S3, S4, S5, S6, S7];
const DOCK_ACTIVE = ['elaina', 'panel', 'panel', 'term', 'node', 'qris', 'cta'];
const CAPTION_ACCENT = ['#7DD3FC', '#60A5FA', '#34D399', '#38BDF8', '#7DD3FC', '#34D399', '#60A5FA'];
const MENU_LABELS = ['Panel Overview', 'Live Metrics', 'Pricing Tiers', 'Web Console', 'Frankfurt Node', 'QRIS Deploy', 'Claim Trial'];
const MENU_STATUS = ['Gratis 3 Hari', '1.099+ Users', 'Rp 5.000/bln', 'Baileys Ready', 'Ping 2-3 ms', '< 30s Active', 'Trial Ready'];

const TAIL = 8;
export const ELAINA_FPS = storyboard.videoSpec.fps;
export const ELAINA_W = storyboard.videoSpec.landscape.width;
export const ELAINA_H = storyboard.videoSpec.landscape.height;
export const ELAINA_TOTAL_FRAMES = storyboard.videoSpec.totalFrames;

const Chrome: React.FC = () => {
  const frame = useCurrentFrame();
  let idx = 0;
  storyboard.scenes.forEach((s, i) => {
    if (frame >= s.startFrame) idx = i;
  });
  const sc = storyboard.scenes[idx];
  const sf = frame - sc.startFrame;
  const wordTimings = (sc.wordTimings || []) as WordTiming[];

  return (
    <>
      <MenuBar
        sectionTitle={MENU_LABELS[idx]}
        status={MENU_STATUS[idx]}
        progress={frame / ELAINA_TOTAL_FRAMES}
        sceneFrame={sf}
      />
      <ChapterTag no={idx + 1} title={sc.title} sceneFrame={sf} />
      <Dock active={DOCK_ACTIVE[idx]} sceneFrame={sf} />
      <WordSyncCaption wordTimings={wordTimings} f={sf} accent={CAPTION_ACCENT[idx]} />
    </>
  );
};

const FinalFade: React.FC = () => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [ELAINA_TOTAL_FRAMES - 20, ELAINA_TOTAL_FRAMES - 2], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{background: '#F8FAFC', opacity: o, zIndex: 100}} />;
};

export const ElainaCloudPromoVideo: React.FC = () => (
  <AbsoluteFill style={{background: '#F8FAFC'}}>
    {/* Background Music (95s track > 76s video, ducked cleanly under voiceover) */}
    <Audio
      src={staticFile('audio/sfx/music.mp3')}
      volume={(f) =>
        0.14 *
        interpolate(f, [0, 30, ELAINA_TOTAL_FRAMES - 60, ELAINA_TOTAL_FRAMES], [0, 1, 1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      }
    />

    {storyboard.scenes.map((sc, i) => {
      const C = COMPONENTS[i];
      const ov = i === 0 ? 0 : OVERLAP;
      const from = sc.startFrame - ov;
      const next = storyboard.scenes[i + 1];
      const end = next ? next.startFrame + TAIL : ELAINA_TOTAL_FRAMES;
      const voFile = sc.audio.replace('audio/voiceover/', 'audio/elainacloud/voiceover/');

      return (
        <React.Fragment key={sc.id}>
          <Sequence from={from} durationInFrames={end - from}>
            <SceneFrameProvider value={ov}>
              <C />
            </SceneFrameProvider>
          </Sequence>
          <Sequence from={sc.startFrame} durationInFrames={Math.ceil(sc.audioDuration * FPS) + 6}>
            <Audio src={staticFile(voFile)} volume={1} />
          </Sequence>
        </React.Fragment>
      );
    })}

    <Chrome />
    <FinalFade />
  </AbsoluteFill>
);
