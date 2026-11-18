import React from 'react';
import {spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {useGlobalFrame, markerFrame} from './clock';
import {tokens} from './tokens';

export type ElainaPose =
  | 'finger_gun'
  | 'arms_crossed'
  | 'excited'
  | 'double_peace'
  | 'chin_rest'
  | 'open_hand';

export interface ElainaTrackItem {
  at?: string; // marker name
  atFrame?: number;
  pose: ElainaPose;
  reaction?: 'exclamation' | 'sweat' | 'sparkle' | 'question';
}

interface ElainaProps {
  track: ElainaTrackItem[];
  side?: 'left' | 'right';
  entryFrame?: number;
  bottom?: number;
}

export const Elaina: React.FC<ElainaProps> = ({
  track,
  side = 'right',
  entryFrame = 0,
  bottom = 190,
}) => {
  const globalFrame = useGlobalFrame();
  const localFrame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Tentukan pose aktif berdasarkan marker global frame
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

  // Slap entry animation
  const relEntry = localFrame - entryFrame;
  const entrySpring = spring({
    frame: Math.max(0, relEntry),
    fps,
    config: {damping: 12, mass: 0.7, stiffness: 150},
  });

  // Squash & stretch saat pergantian pose (6 frame)
  const relSwitch = Math.max(0, globalFrame - lastPoseSwitchFrame);
  let poseScaleX = 1;
  let poseScaleY = 1;
  if (relSwitch < 6) {
    // 0..3 squash, 3..6 stretch back
    const progress = relSwitch / 6;
    const sinFactor = Math.sin(progress * Math.PI);
    poseScaleX = 1 + 0.06 * sinFactor;
    poseScaleY = 1 - 0.06 * sinFactor;
  }

  // Gentle idle bob (periode ~3.5 detik, amplitudo 4px) - Anti-getar
  const idleBobY = Math.sin((localFrame * Math.PI * 2) / 105) * 4;

  const posX = side === 'right' ? {right: 48} : {left: 48};

  return (
    <div
      style={{
        position: 'absolute',
        bottom,
        ...posX,
        width: 440,
        height: 640,
        zIndex: 40,
        pointerEvents: 'none',
        transform: `translateY(${idleBobY}px) scale(${entrySpring}) scale(${poseScaleX}, ${poseScaleY})`,
        transformOrigin: 'bottom center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      {/* SVG Reaction Badge */}
      {activeReaction && (
        <div
          style={{
            position: 'absolute',
            top: 20,
            right: side === 'right' ? -10 : undefined,
            left: side === 'left' ? -10 : undefined,
            zIndex: 45,
          }}
        >
          {activeReaction === 'exclamation' && (
            <svg width="60" height="60" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill={tokens.hot} stroke={tokens.ink} strokeWidth="5" />
              <text x="50" y="68" textAnchor="middle" fill="#FFFFFF" fontWeight="900" fontSize="56">!?</text>
            </svg>
          )}
          {activeReaction === 'sweat' && (
            <svg width="50" height="50" viewBox="0 0 100 100">
              <path
                d="M50,15 C50,15 25,50 25,70 C25,84 36,92 50,92 C64,92 75,84 75,70 C75,50 50,15 50,15 Z"
                fill={tokens.sky}
                stroke={tokens.ink}
                strokeWidth="5"
              />
            </svg>
          )}
          {activeReaction === 'sparkle' && (
            <svg width="54" height="54" viewBox="0 0 100 100">
              <polygon points="50,5 62,38 95,50 62,62 50,95 38,62 5,50 38,38" fill={tokens.js} stroke={tokens.ink} strokeWidth="4" />
            </svg>
          )}
        </div>
      )}

      {/* Die-cut sticker image */}
      <img
        src={staticFile(`assets/elaina_v2/${currentPose}_sticker.png`)}
        alt={`Elaina ${currentPose}`}
        style={{
          width: '100%',
          height: 'auto',
          maxHeight: 640,
          objectFit: 'contain',
          filter: `drop-shadow(8px 8px 0px ${tokens.ink})`,
        }}
      />
    </div>
  );
};
