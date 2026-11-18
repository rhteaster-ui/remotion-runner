import React from 'react';
import {spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {markerFrame, useGlobalFrame} from './clock';
import {chipTokens} from './tokens';

export type ElainaPose =
  | 'finger_gun'
  | 'arms_crossed'
  | 'excited'
  | 'double_peace'
  | 'chin_rest'
  | 'open_hand';

export interface ElainaTrackItem {
  at?: string;
  atFrame?: number;
  pose: ElainaPose;
  reaction?: 'exclamation' | 'sweat' | 'sparkle' | 'question';
}

interface ChipElainaProps {
  track: ElainaTrackItem[];
  side?: 'left' | 'right';
  entryFrame?: number;
  bottom?: number;
  width?: number;
}

export const ChipElaina: React.FC<ChipElainaProps> = ({
  track,
  side = 'right',
  entryFrame = 0,
  bottom = 175,
  width = 410,
}) => {
  const globalFrame = useGlobalFrame();
  const localFrame = useCurrentFrame();
  const {fps} = useVideoConfig();

  let currentPose: ElainaPose = track[0]?.pose || 'finger_gun';
  let lastPoseSwitchFrame = entryFrame;
  let activeReaction: string | undefined = undefined;

  for (const item of track) {
    const f = item.at ? markerFrame(item.at) : item.atFrame ?? 0;
    if (globalFrame >= f) {
      if (currentPose !== item.pose) {
        lastPoseSwitchFrame = f;
      }
      currentPose = item.pose;
      activeReaction = item.reaction;
    }
  }

  const relEntry = localFrame - entryFrame;
  const entrySpring = spring({
    frame: Math.max(0, relEntry),
    fps,
    config: {damping: 13, mass: 0.75, stiffness: 155},
  });

  // 6-frame smooth squash-stretch on pose switch
  const relSwitch = Math.max(0, globalFrame - lastPoseSwitchFrame);
  let poseScaleX = 1;
  let poseScaleY = 1;
  if (relSwitch < 6) {
    const p = relSwitch / 6;
    const s = Math.sin(p * Math.PI);
    poseScaleX = 1 + 0.055 * s;
    poseScaleY = 1 - 0.055 * s;
  }

  // Calm organic idle float (period ~3.5s, NO jitter)
  const idleBobY = Math.sin((localFrame * Math.PI * 2) / 105) * 4.5;
  const posX = side === 'right' ? {right: 36} : {left: 36};

  return (
    <div
      style={{
        position: 'absolute',
        bottom,
        ...posX,
        width,
        height: 590,
        zIndex: 55,
        pointerEvents: 'none',
        transform: `translateY(${idleBobY}px) scale(${entrySpring}) scale(${poseScaleX}, ${poseScaleY})`,
        transformOrigin: 'bottom center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      {activeReaction && (
        <div
          style={{
            position: 'absolute',
            top: 24,
            right: side === 'right' ? 6 : undefined,
            left: side === 'left' ? 6 : undefined,
            zIndex: 60,
          }}
        >
          {activeReaction === 'exclamation' && (
            <svg width="62" height="62" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill={chipTokens.crimson} stroke={chipTokens.ink} strokeWidth="6" />
              <text x="50" y="67" textAnchor="middle" fill={chipTokens.white} fontWeight="900" fontSize="52">!?</text>
            </svg>
          )}
          {activeReaction === 'question' && (
            <svg width="62" height="62" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill={chipTokens.gold} stroke={chipTokens.ink} strokeWidth="6" />
              <text x="50" y="68" textAnchor="middle" fill={chipTokens.ink} fontWeight="900" fontSize="54">?</text>
            </svg>
          )}
          {activeReaction === 'sweat' && (
            <svg width="52" height="52" viewBox="0 0 100 100">
              <path
                d="M50,14 C50,14 24,50 24,70 C24,85 36,94 50,94 C64,94 76,85 76,70 C76,50 50,14 50,14 Z"
                fill={chipTokens.cobaltLight}
                stroke={chipTokens.ink}
                strokeWidth="6"
              />
            </svg>
          )}
          {activeReaction === 'sparkle' && (
            <svg width="58" height="58" viewBox="0 0 100 100">
              <polygon
                points="50,4 63,37 96,50 63,63 50,96 37,63 4,50 37,37"
                fill={chipTokens.gold}
                stroke={chipTokens.ink}
                strokeWidth="5"
              />
            </svg>
          )}
        </div>
      )}

      <img
        src={staticFile(`assets/elaina_v2/${currentPose}_sticker.png`)}
        alt={`Elaina ${currentPose}`}
        style={{
          width: '100%',
          height: 'auto',
          maxHeight: 590,
          objectFit: 'contain',
          filter: `drop-shadow(8px 8px 0px ${chipTokens.ink})`,
        }}
      />
    </div>
  );
};
