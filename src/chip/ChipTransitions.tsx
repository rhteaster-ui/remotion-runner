import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {chipTokens} from './tokens';
import {FONT} from '../theme-tokens';

interface SiliconShutterWipeProps {
  atFrame: number;
  label: string;
  accentColor?: string;
}

/**
 * Diagonal dual-blade silicon shutter wipe with central micro-chip pinout badge.
 */
export const SiliconShutterWipe: React.FC<SiliconShutterWipeProps> = ({
  atFrame,
  label,
  accentColor = chipTokens.crimson,
}) => {
  const frame = useCurrentFrame();
  const half = 9;
  const rel = frame - atFrame;

  if (rel < -half || rel > half) return null;

  const progress = interpolate(rel, [-half, half], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const leadX = interpolate(progress, [0, 1], [-120, 120]);
  const lagX = interpolate(progress, [0, 1], [-145, 105]);
  const badgeOpacity = Math.sin(progress * Math.PI);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 85,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Back dark blade */}
      <div
        style={{
          position: 'absolute',
          top: -100,
          bottom: -100,
          left: 0,
          width: '130%',
          backgroundColor: chipTokens.ink,
          transform: `translateX(${lagX}%) skewX(-12deg)`,
        }}
      />
      {/* Lead crimson/accent blade */}
      <div
        style={{
          position: 'absolute',
          top: -100,
          bottom: -100,
          left: 0,
          width: '115%',
          backgroundColor: accentColor,
          borderRight: `10px solid ${chipTokens.gold}`,
          transform: `translateX(${leadX}%) skewX(-12deg)`,
        }}
      />
      {/* Central IC pinout stamp */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: Math.max(0, badgeOpacity),
          transform: `scale(${0.86 + 0.18 * badgeOpacity})`,
        }}
      >
        <div
          style={{
            padding: '18px 36px',
            backgroundColor: chipTokens.cream,
            border: `4px solid ${chipTokens.ink}`,
            borderRadius: 20,
            boxShadow: `10px 10px 0px ${chipTokens.ink}`,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <svg width="34" height="34" viewBox="0 0 36 36">
            <rect x="8" y="8" width="20" height="20" rx="4" fill={chipTokens.ink} />
            <rect x="13" y="13" width="10" height="10" rx="2" fill={chipTokens.gold} />
            <path d="M13 3v5M18 3v5M23 3v5M13 28v5M18 28v5M23 28v5M3 13h5M3 18h5M3 23h5M28 13h5M28 18h5M28 23h5" stroke={chipTokens.ink} strokeWidth="3" strokeLinecap="round" />
          </svg>
          <span
            style={{
              fontFamily: FONT.mono,
              fontSize: 30,
              fontWeight: 800,
              color: chipTokens.ink,
              letterSpacing: '0.06em',
            }}
          >
            {label}
          </span>
        </div>
      </div>
    </div>
  );
};

export const SmashFlash: React.FC<{atFrame: number; duration?: number}> = ({
  atFrame,
  duration = 3,
}) => {
  const frame = useCurrentFrame();
  const rel = frame - atFrame;
  if (rel < 0 || rel > duration) return null;
  const op = interpolate(rel, [0, duration], [0.85, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: chipTokens.white,
        opacity: op,
        zIndex: 88,
        pointerEvents: 'none',
      }}
    />
  );
};
