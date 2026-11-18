import React from 'react';
import {Audio, Sequence, staticFile, useVideoConfig} from 'remotion';
import data from '../data/wat-cues.json';
import {SceneStart, markerFrame} from './clock';
import {WatSubtitles} from './WatSubtitles';
import {MagicWipe} from './kit/MagicWipe';
import {tokens} from './tokens';

// Scenes
import {S1Hook} from './scenes/S1Hook';
import {S2PlusTempel} from './scenes/S2PlusTempel';
import {S3NaN} from './scenes/S3NaN';
import {S4Operan} from './scenes/S4Operan';
import {S5RapidFire} from './scenes/S5RapidFire';
import {S6TypeScriptOutro} from './scenes/S6TypeScriptOutro';

const PRE = 8; // Frame antisipasi wipe

// SFX mapping from specification
const SFX_CUES: Array<{marker: string; file: string; vol?: number; offset?: number}> = [
  {marker: 'sebelas', file: 'impact.wav', vol: 0.8},
  {marker: 'js', file: 'pop.wav', vol: 0.6},
  {marker: 'sepuluh', file: 'tick.wav', vol: 0.5},
  {marker: 'semua', file: 'riser.wav', vol: 0.6},
  {marker: 'error', file: 'buzz-error.wav', vol: 0.7},
  {marker: 'error', file: 'stamp.wav', vol: 0.8, offset: 4},
  {marker: 'teks', file: 'pop-soft.wav', vol: 0.5},
  {marker: 'plus', file: 'lock-click.wav', vol: 0.6},
  {marker: 'tempel', file: 'lock-click.wav', vol: 0.6},
  {marker: 'dua', file: 'ding.wav', vol: 0.7},
  {marker: 'konsisten', file: 'buzz-error.wav', vol: 0.7},
  {marker: 'percaya', file: 'shimmer.wav', vol: 0.6},
  {marker: 'kasir', file: 'whoosh-soft.wav', vol: 0.6},
  {marker: 'kasir', file: 'print.wav', vol: 0.7, offset: 6},
  {marker: 'total', file: 'ding.wav', vol: 0.8},
  {marker: 'total', file: 'stamp.wav', vol: 0.85, offset: 6},
  {marker: 'total', file: 'sweat-drops.wav', vol: 0.7, offset: 12},
  {marker: 'nan', file: 'pop.wav', vol: 0.6},
  {marker: 'number', file: 'buzz-error.wav', vol: 0.75},
  {marker: 'esteh', file: 'water-splash.wav', vol: 0.8},
  {marker: 'tipenya', file: 'absurd-thud.wav', vol: 0.8},
  {marker: 'array', file: 'tick.wav', vol: 0.5},
  {marker: 'nol', file: 'buzz-error.wav', vol: 0.7},
  {marker: 'telor', file: 'egg-crack-pop.wav', vol: 0.7},
  {marker: 'martabak', file: 'success-arp.wav', vol: 0.8},
  {marker: 'semen', file: 'absurd-thud.wav', vol: 0.85},
  {marker: 'semen', file: 'seblak-rimshot.wav', vol: 0.8, offset: 4},
  {marker: 'masih', file: 'whoosh-soft.wav', vol: 0.6},
  {marker: 'satu', file: 'pop.wav', vol: 0.6},
  {marker: 'banana', file: 'rubber-stretch.wav', vol: 0.7},
  {marker: 'banana', file: 'pop.wav', vol: 0.7, offset: 6},
  {marker: 'ts', file: 'lock-click.wav', vol: 0.6},
  {marker: 'aman', file: 'shimmer.wav', vol: 0.6},
  {marker: 'enggak', file: 'buzz-error.wav', vol: 0.75},
  {marker: 'tebak', file: 'seblak-rimshot.wav', vol: 0.85},
  {marker: 'cta', file: 'success-arp.wav', vol: 0.8},
  {marker: 'cta', file: 'elaina-wand-chime.wav', vol: 0.7, offset: 8},
];

export const JSWat: React.FC = () => {
  const {fps} = useVideoConfig();
  const scenes = data.scenes;

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        position: 'relative',
        backgroundColor: tokens.night,
        overflow: 'hidden',
        fontFamily: '"Rubik", "Plus Jakarta Sans", sans-serif',
      }}
    >
      {/* 1. Voiceover Audio (1-take normalized) */}
      <Audio src={staticFile('audio/vo/wat-vo-norm.wav')} volume={1.0} />

      {/* 2. Custom Background Music Bed with Light Ducking */}
      <Audio src={staticFile('audio/wat-music-bed.mp3')} volume={0.12} loop />

      {/* 3. SFX Cues triggered directly at exact marker frame */}
      {SFX_CUES.map((cue, idx) => {
        const baseFrame = markerFrame(cue.marker);
        const triggerFrame = Math.max(0, baseFrame - 2 + (cue.offset ?? 0));
        return (
          <Sequence key={`sfx-${cue.marker}-${idx}`} from={triggerFrame} durationInFrames={fps * 3}>
            <Audio src={staticFile(`audio/sfx-wat/${cue.file}`)} volume={cue.vol ?? 0.7} />
          </Sequence>
        );
      })}

      {/* 4. Scenes Sequence Rendering */}
      {/* S1: Hook */}
      <Sequence from={0} durationInFrames={scenes[0].endFrame + PRE}>
        <SceneStart.Provider value={0}>
          <S1Hook />
        </SceneStart.Provider>
      </Sequence>

      {/* S2: Plus Tempel */}
      <Sequence
        from={scenes[1].startFrame - PRE}
        durationInFrames={scenes[1].endFrame - scenes[1].startFrame + PRE * 2}
      >
        <SceneStart.Provider value={scenes[1].startFrame - PRE}>
          <S2PlusTempel />
        </SceneStart.Provider>
      </Sequence>

      {/* S3: NaN */}
      <Sequence
        from={scenes[2].startFrame - PRE}
        durationInFrames={scenes[2].endFrame - scenes[2].startFrame + PRE * 2}
      >
        <SceneStart.Provider value={scenes[2].startFrame - PRE}>
          <S3NaN />
        </SceneStart.Provider>
      </Sequence>

      {/* S4: Operan */}
      <Sequence
        from={scenes[3].startFrame - PRE}
        durationInFrames={scenes[3].endFrame - scenes[3].startFrame + PRE * 2}
      >
        <SceneStart.Provider value={scenes[3].startFrame - PRE}>
          <S4Operan />
        </SceneStart.Provider>
      </Sequence>

      {/* S5: Rapid-Fire */}
      <Sequence
        from={scenes[4].startFrame - PRE}
        durationInFrames={scenes[4].endFrame - scenes[4].startFrame + PRE * 2}
      >
        <SceneStart.Provider value={scenes[4].startFrame - PRE}>
          <S5RapidFire />
        </SceneStart.Provider>
      </Sequence>

      {/* S6: TypeScript + Outro */}
      <Sequence
        from={scenes[5].startFrame - PRE}
        durationInFrames={scenes[5].endFrame - scenes[5].startFrame + PRE}
      >
        <SceneStart.Provider value={scenes[5].startFrame - PRE}>
          <S6TypeScriptOutro />
        </SceneStart.Provider>
      </Sequence>

      {/* 5. Magic Circle Wipe Transitions */}
      <MagicWipe atFrame={scenes[1].startFrame} label="MANTRA 02" color={tokens.paper} />
      <MagicWipe atFrame={scenes[2].startFrame} label="MANTRA 03" color={tokens.darkBg} />
      <MagicWipe atFrame={scenes[3].startFrame} label="MANTRA 04" color={tokens.warm} />
      <MagicWipe atFrame={scenes[4].startFrame} label="MANTRA 05" color={tokens.mintBg} />
      <MagicWipe atFrame={scenes[5].startFrame} label="TAMAT" color={tokens.night} />

      {/* 6. Dynamic Word-by-Word Subtitles */}
      <WatSubtitles bottomOffset={84} />
    </div>
  );
};
