import React from 'react';
import {Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {FONT} from '../theme-tokens';

export type MascotGesture = 'idle' | 'point_up' | 'thumbs_up' | 'warning_stop';

interface AgencyPresenterAnchorProps {
  gesture?: MascotGesture;
  speechText?: string;
  size?: number;
  bottomOffset?: number;
  side?: 'center' | 'left' | 'right';
  theme?: 'dark' | 'light';
}

export const AgencyPresenterAnchor: React.FC<AgencyPresenterAnchorProps> = ({
  gesture = 'idle',
  speechText,
  size = 280,
  bottomOffset = 110,
  side = 'center',
  theme = 'dark',
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Floating breathing oscillation
  const floatY = Math.sin(frame / 14) * 8;
  const floatRotate = Math.sin(frame / 20) * 2;

  // Pop-in spring
  const scale = spring({
    fps,
    frame,
    config: {damping: 12, mass: 0.8},
  });

  const isDark = theme === 'dark';
  const bubbleBg = isDark ? '#141d2e' : '#ffffff';
  const bubbleBorder = isDark ? 'rgba(59, 130, 246, 0.4)' : 'rgba(59, 130, 246, 0.3)';
  const bubbleText = isDark ? '#f8fafc' : '#0f172a';

  return (
    <div
      style={{
        position: 'absolute',
        bottom: bottomOffset,
        left: side === 'center' ? '50%' : side === 'left' ? '12%' : 'auto',
        right: side === 'right' ? '12%' : 'auto',
        transform: side === 'center' ? 'translateX(-50%)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 50,
      }}
    >
      {/* Optional Speech Bubble / Reaction Tag */}
      {speechText && (
        <div
          style={{
            backgroundColor: bubbleBg,
            border: `1.5px solid ${bubbleBorder}`,
            borderRadius: 16,
            padding: '10px 20px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            marginBottom: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            maxWidth: 380,
            transform: `scale(${scale})`,
          }}
        >
          <span
            style={{
              fontFamily: FONT.space,
              fontSize: 20,
              fontWeight: 700,
              color: bubbleText,
              textAlign: 'center',
            }}
          >
            {speechText}
          </span>
        </div>
      )}

      {/* 3D Mascot Character */}
      <div
        style={{
          width: size,
          height: size,
          transform: `scale(${scale}) translateY(${floatY}px) rotate(${floatRotate}deg)`,
          filter: 'drop-shadow(0 16px 30px rgba(0,0,0,0.6))',
          position: 'relative',
        }}
      >
        <Img
          src={staticFile('assets/agent-mascot.png')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />

        {/* Gesture Embellishments */}
        {gesture === 'warning_stop' && (
          <div
            style={{
              position: 'absolute',
              top: '10%',
              right: '5%',
              backgroundColor: '#ef4444',
              color: '#ffffff',
              borderRadius: '50%',
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 22,
              fontFamily: FONT.mono,
              boxShadow: '0 0 16px rgba(239, 68, 68, 0.8)',
            }}
          >
            !
          </div>
        )}

        {gesture === 'thumbs_up' && (
          <div
            style={{
              position: 'absolute',
              top: '10%',
              right: '5%',
              backgroundColor: '#22c55e',
              color: '#ffffff',
              borderRadius: '50%',
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 22,
              boxShadow: '0 0 16px rgba(34, 197, 94, 0.8)',
            }}
          >
            ✓
          </div>
        )}
      </div>
    </div>
  );
};
