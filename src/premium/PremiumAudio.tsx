import React from 'react';
import {Audio, Sequence, staticFile, useVideoConfig} from 'remotion';
import {CUES} from './cues';

export const PremiumSfx: React.FC<{master?: number}> = ({master = 1}) => {
  const {fps} = useVideoConfig();
  return (
    <>
      {CUES.map((cue, i) => (
        <Sequence key={i} from={Math.max(0, Math.round(cue.at * fps))} durationInFrames={Math.round(4 * fps)} layout="none">
          <Audio src={staticFile(`audio/sfx-erekap/${cue.sfx}.wav`)} volume={cue.vol * master} />
        </Sequence>
      ))}
    </>
  );
};
