import React from 'react';
import {Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

export type ElainaGptGesture =
  | 'open_hand'
  | 'finger_gun'
  | 'arms_crossed'
  | 'excited'
  | 'double_peace'
  | 'chin_rest';

const ELAINA_GPT_ASSETS: Record<ElainaGptGesture, string> = {
  open_hand: 'assets/elaina_gpt/06_open_hand.png',
  finger_gun: 'assets/elaina_gpt/01_finger_gun.png',
  arms_crossed: 'assets/elaina_gpt/02_arms_crossed.png',
  excited: 'assets/elaina_gpt/03_excited.png',
  double_peace: 'assets/elaina_gpt/04_double_peace.png',
  chin_rest: 'assets/elaina_gpt/05_chin_rest.png',
};

export interface ElainaGptAnchorProps {
  gesture: ElainaGptGesture;
  gestureFrame?: number;
  side?: 'left' | 'right';
  bottomOffset?: number;
  size?: number;
  theme?: 'dark' | 'light';
}

export const ElainaGptAnchor: React.FC<ElainaGptAnchorProps> = ({
  gesture = 'finger_gun',
  gestureFrame,
  side = 'right',
  bottomOffset = 250,
  size = 370,
  theme = 'dark',
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Local frame count for gesture entry / pose transition
  const gf = gestureFrame !== undefined ? gestureFrame : frame;

  // Smooth pop-in spring for pose transition
  const entryScale = spring({
    fps,
    frame: gf,
    config: {damping: 18, mass: 0.8},
  });

  // Natural calm floating & subtle breath — NO jitter, NO rapid shake, NO audio amplitude distortion
  const floatY = Math.sin(frame / 26) * 4.5;
  const swayZ = Math.sin(frame / 42) * 1.0; // max 1 degree gentle tilt

  const assetPath = ELAINA_GPT_ASSETS[gesture] || ELAINA_GPT_ASSETS.open_hand;
  const isDark = theme === 'dark';

  // Drop shadow with subtle rim lighting
  const shadowFilter = isDark
    ? 'drop-shadow(0 12px 28px rgba(0, 0, 0, 0.75)) drop-shadow(0 0 16px rgba(247, 223, 30, 0.15))'
    : 'drop-shadow(0 12px 24px rgba(15, 23, 42, 0.35)) drop-shadow(0 0 12px rgba(2, 132, 199, 0.12))';

  const positionStyles: React.CSSProperties =
    side === 'right'
      ? {right: 32}
      : {left: 32};

  return (
    <div
      style={{
        position: 'absolute',
        bottom: bottomOffset,
        ...positionStyles,
        width: size,
        pointerEvents: 'none',
        zIndex: 50,
        transform: `translateY(${floatY}px) rotate(${swayZ}deg) scale(${entryScale})`,
        transformOrigin: 'bottom center',
        filter: shadowFilter,
      }}
    >
      <Img
        src={staticFile(assetPath)}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          objectFit: 'contain',
        }}
      />
    </div>
  );
};
