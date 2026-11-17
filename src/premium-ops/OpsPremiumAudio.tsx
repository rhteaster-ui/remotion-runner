import React from 'react';
import {Audio, Sequence, staticFile, useVideoConfig} from 'remotion';
import {OPS_CUES} from './cues';

export const OpsPremiumAudio: React.FC<{master?: number}> = ({master = 0.8}) => {
  const {fps} = useVideoConfig();
  return (
    <>
      {OPS_CUES.map((cue, i) => (
        <Sequence
          key={i}
          from={Math.max(0, Math.round(cue.at * fps))}
          durationInFrames={Math.round(4 * fps)}
          layout="none"
        >
          <Audio
            src={staticFile(`audio/sfx-erekap/${cue.sfx}.wav`)}
            volume={cue.vol * master}
          />
        </Sequence>
      ))}
    </>
  );
};
