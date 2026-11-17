import React from 'react';
import {Audio, Sequence, staticFile, useVideoConfig} from 'remotion';
import {REPO_CUES} from './cues';

export const RepoFlowAudio: React.FC<{master?: number}> = ({master = 0.8}) => {
  const {fps} = useVideoConfig();

  return (
    <>
      {REPO_CUES.map((c, i) => {
        const fromFrame = Math.max(0, Math.round(c.at * fps));
        return (
          <Sequence key={`${c.sfx}-${i}`} from={fromFrame}>
            <Audio
              src={staticFile(`audio/sfx-erekap/${c.sfx}.wav`)}
              volume={c.vol * master}
            />
          </Sequence>
        );
      })}
    </>
  );
};
