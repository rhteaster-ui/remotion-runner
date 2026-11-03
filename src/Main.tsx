import React from 'react';
import {Series} from 'remotion';
import {SCENES} from './theme';
import {Stage} from './ui';
import {Boot, Hero, Works} from './scenes1';
import {Journey, Stack, Universe} from './scenes2';
import {Community, Finale} from './scenes3';

export const Main: React.FC = () => (
  <Stage>
    <Series>
      <Series.Sequence durationInFrames={SCENES.boot}><Boot /></Series.Sequence>
      <Series.Sequence durationInFrames={SCENES.hero}><Hero /></Series.Sequence>
      <Series.Sequence durationInFrames={SCENES.works}><Works /></Series.Sequence>
      <Series.Sequence durationInFrames={SCENES.journey}><Journey /></Series.Sequence>
      <Series.Sequence durationInFrames={SCENES.stack}><Stack /></Series.Sequence>
      <Series.Sequence durationInFrames={SCENES.universe}><Universe /></Series.Sequence>
      <Series.Sequence durationInFrames={SCENES.community}><Community /></Series.Sequence>
      <Series.Sequence durationInFrames={SCENES.outro}><Finale /></Series.Sequence>
    </Series>
  </Stage>
);
