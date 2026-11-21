import React from 'react';
import {AbsoluteFill, Composition, Sequence, Audio, staticFile} from 'remotion';
import {FPS, SCENES, T, TOTAL, frames} from './data';
import {Backdrop, Chrome, Subtitle} from './Shell';
import {VISUALS} from './Scenes';

export const BeyondTheNamesVideo: React.FC = () => {
  let start = 0;
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Audio src={staticFile('audio/music-bed.mp3')} volume={0.18} loop />
      {SCENES.map((s, i) => {
        const from = start;
        const d = frames(s.sec);
        start += d - T;
        const V = VISUALS[s.id];
        return (
          <Sequence key={s.id} from={from} durationInFrames={d}>
            <Backdrop id={s.id} first={i === 0}><V /></Backdrop>
            <Chrome id={s.id} tag={s.tag} index={i} />
            <Subtitle id={s.id} lines={s.lines} />
            <Audio src={staticFile(`audio/beyond/${s.id}.mp3`)} volume={1.3} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

export const Root: React.FC = () => (
  <Composition id="BeyondTheNames" component={BeyondTheNamesVideo} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
);
