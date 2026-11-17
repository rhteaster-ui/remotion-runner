import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {N8nOpsAudioMix} from './components/N8nOpsAudioMix';
import {Grid, World, getCamera} from './n8n/Canvas';
import {N8nSubtitles, PromptBubble, Toast, Toolbar, TopBar} from './n8n/Hud';
import {BrandCard, OpsDeckModal} from './n8n/Overlays';
import {C, FONT} from './n8n/theme';

/**
 * OpsFlow — versi kanvas workflow (gaya n8n).
 * Satu kanvas panjang, kamera terbang antar bagian; seluruh scene = satu eksekusi workflow.
 * Audio, VO, dan subtitle memakai timeline tersinkronisasi (n8n-timeline.json / n8n-subtitles.json).
 */
export const N8nOpsVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const cam = getCamera(frame, fps);

  return (
    <AbsoluteFill style={{backgroundColor: C.bg, fontFamily: FONT.sans}}>
      <N8nOpsAudioMix music={0.2} vo={1.0} duckDb={-7} />

      <Grid cam={cam} />
      <World cam={cam} frame={frame} fps={fps} />
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.5) 100%)',
          pointerEvents: 'none',
        }}
      />

      <TopBar t={t} frame={frame} />
      <PromptBubble t={t} />
      <Toolbar t={t} frame={frame} />

      <OpsDeckModal frame={frame} fps={fps} />
      <BrandCard frame={frame} fps={fps} />
      <Toast frame={frame} />

      <N8nSubtitles bottom={230} fontSize={44} />
    </AbsoluteFill>
  );
};
