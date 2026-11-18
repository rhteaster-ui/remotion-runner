import React from 'react';
import {Audio, AbsoluteFill, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import data from '../data/chip-cues.json';
import {ChipSceneStart, markerFrame} from './clock';
import {ChipSubtitles} from './ChipSubtitles';
import {SiliconShutterWipe, SmashFlash} from './ChipTransitions';
import {chipTokens} from './tokens';
import {S1NetizenHook, S2SnapdragonVsPaspor, S3FablessTruth} from './ChipScenes1';
import {S4SovereignKey, S5RealistisCta, S6OutroBrand} from './ChipScenes2';

const PRE = 8;

const SFX_CUES: Array<{marker: string; file: string; vol?: number; offset?: number}> = [
  {marker: 'rame', file: 'impact.wav', vol: 0.72},
  {marker: 'netizen', file: 'pop.wav', vol: 0.55},
  {marker: 'stiker', file: 'pop-soft.wav', vol: 0.55},
  {marker: 'esemka', file: 'pop-soft.wav', vol: 0.55},
  {marker: 'aslinya', file: 'stamp.wav', vol: 0.8},
  {marker: 'snapdragon', file: 'lock-click.wav', vol: 0.55},
  {marker: 'bukan', file: 'buzz-error.wav', vol: 0.75},
  {marker: 'bukan', file: 'stamp.wav', vol: 0.82, offset: 3},
  {marker: 'mikrokontroler', file: 'shimmer.wav', vol: 0.65},
  {marker: 'negara', file: 'ding.wav', vol: 0.65},
  {marker: 'pabriknya', file: 'pop.wav', vol: 0.6},
  {marker: 'apple', file: 'tick.wav', vol: 0.55},
  {marker: 'fabless', file: 'lock-click.wav', vol: 0.65},
  {marker: 'peruri', file: 'pop.wav', vol: 0.6},
  {marker: 'penting', file: 'riser.wav', vol: 0.55},
  {marker: 'impor', file: 'buzz-error.wav', vol: 0.65},
  {marker: 'sendiri', file: 'impact.wav', vol: 0.75},
  {marker: 'sendiri', file: 'shimmer.wav', vol: 0.6, offset: 4},
  {marker: 'realistis', file: 'pop.wav', vol: 0.55},
  {marker: 'kalian', file: 'ding.wav', vol: 0.65},
  {marker: 'follow', file: 'lock-click.wav', vol: 0.75, offset: 6},
  {marker: 'follow', file: 'success-arp.wav', vol: 0.72, offset: 10},
];

export const ChipMerahPutihVideo: React.FC = () => {
  const {fps, durationInFrames} = useVideoConfig();
  const frame = useCurrentFrame();
  const scenes = data.scenes;

  // Dynamic music ducking following actual spoken words
  const wordRanges = (data.words as Array<{s: number; e: number}>).map((w) => [
    w.s * fps,
    w.e * fps,
  ] as const);

  const musicVol = (f: number) => {
    let speaking = 0;
    for (const [a, b] of wordRanges) {
      const k = interpolate(f, [a - 4, a + 2, b, b + 8], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
      if (k > speaking) speaking = k;
    }
    const edgeFade = interpolate(
      f,
      [0, 10, durationInFrames - 20, durationInFrames - 1],
      [0, 1, 1, 0],
      {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
    );
    return 0.16 * (1 - speaking * 0.62) * edgeFade;
  };

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 16, durationInFrames - 1],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  return (
    <AbsoluteFill style={{backgroundColor: chipTokens.cream, overflow: 'hidden'}}>
      {/* 1. Single-Take Normalized Voiceover (100% consistent speaker) */}
      <Audio src={staticFile('audio/vo/chip-vo-norm.wav')} volume={1.0} />

      {/* 2. Custom Upbeat Tech Music Bed with Word-Level Ducking */}
      <Audio src={staticFile('audio/chip-music-bed.mp3')} volume={musicVol} loop />

      {/* 3. Marker-Anchored SFX Cues */}
      {SFX_CUES.map((cue, idx) => {
        const triggerFrame = Math.max(0, markerFrame(cue.marker) - 2 + (cue.offset ?? 0));
        return (
          <Sequence key={`sfx-${cue.marker}-${idx}`} from={triggerFrame} durationInFrames={fps * 3}>
            <Audio src={staticFile(`audio/sfx-wat/${cue.file}`)} volume={cue.vol ?? 0.65} />
          </Sequence>
        );
      })}

      {/* Wipe Sound Effects centered on transition */}
      {scenes.slice(1).map((s, idx) => (
        <Sequence key={`wipe-sfx-${idx}`} from={Math.max(0, s.startFrame - 6)} durationInFrames={fps * 2}>
          <Audio src={staticFile('audio/sfx-wat/whoosh-wipe.wav')} volume={0.68} />
        </Sequence>
      ))}

      {/* 4. Scenes */}
      <Sequence from={0} durationInFrames={scenes[0].endFrame + PRE}>
        <ChipSceneStart.Provider value={0}>
          <S1NetizenHook />
        </ChipSceneStart.Provider>
      </Sequence>

      <Sequence
        from={scenes[1].startFrame - PRE}
        durationInFrames={scenes[1].endFrame - scenes[1].startFrame + PRE * 2}
      >
        <ChipSceneStart.Provider value={scenes[1].startFrame - PRE}>
          <S2SnapdragonVsPaspor />
        </ChipSceneStart.Provider>
      </Sequence>

      <Sequence
        from={scenes[2].startFrame - PRE}
        durationInFrames={scenes[2].endFrame - scenes[2].startFrame + PRE * 2}
      >
        <ChipSceneStart.Provider value={scenes[2].startFrame - PRE}>
          <S3FablessTruth />
        </ChipSceneStart.Provider>
      </Sequence>

      <Sequence
        from={scenes[3].startFrame - PRE}
        durationInFrames={scenes[3].endFrame - scenes[3].startFrame + PRE * 2}
      >
        <ChipSceneStart.Provider value={scenes[3].startFrame - PRE}>
          <S4SovereignKey />
        </ChipSceneStart.Provider>
      </Sequence>

      <Sequence
        from={scenes[4].startFrame - PRE}
        durationInFrames={scenes[4].endFrame - scenes[4].startFrame + PRE * 2}
      >
        <ChipSceneStart.Provider value={scenes[4].startFrame - PRE}>
          <S5RealistisCta />
        </ChipSceneStart.Provider>
      </Sequence>

      <Sequence
        from={scenes[5].startFrame - PRE}
        durationInFrames={scenes[5].endFrame - scenes[5].startFrame + PRE}
      >
        <ChipSceneStart.Provider value={scenes[5].startFrame - PRE}>
          <S6OutroBrand />
        </ChipSceneStart.Provider>
      </Sequence>

      {/* 5. Custom Silicon Shutter Wipes & Punchline Smash Flash */}
      <SiliconShutterWipe atFrame={scenes[1].startFrame} label="REALITA" accentColor={chipTokens.crimson} />
      <SiliconShutterWipe atFrame={scenes[2].startFrame} label="FABLESS" accentColor={chipTokens.cobaltLight} />
      <SiliconShutterWipe atFrame={scenes[3].startFrame} label="ENKRIPSI" accentColor={chipTokens.emerald} />
      <SiliconShutterWipe atFrame={scenes[4].startFrame} label="DISKUSI" accentColor={chipTokens.goldDeep} />
      <SiliconShutterWipe atFrame={scenes[5].startFrame} label="RHMT OFC" accentColor={chipTokens.crimson} />

      <SmashFlash atFrame={markerFrame('bukan')} duration={3} />
      <SmashFlash atFrame={markerFrame('sendiri')} duration={3} />

      {/* 6. Dynamic Word-by-Word Karaoke Subtitles */}
      <ChipSubtitles bottomOffset={84} />

      {/* Final clean fade out */}
      {fadeOut > 0 && (
        <AbsoluteFill style={{backgroundColor: '#000000', opacity: fadeOut, zIndex: 100}} />
      )}
    </AbsoluteFill>
  );
};
