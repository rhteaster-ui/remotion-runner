import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {tokens} from '../tokens';

interface MagicWipeProps {
  atFrame: number; // frame saat wipe dimulai
  label?: string; // misal "MANTRA 02"
  color?: string;
}

export const MagicWipe: React.FC<MagicWipeProps> = ({
  atFrame,
  label = 'MANTRA',
  color = tokens.js,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const rel = frame - atFrame;

  // wipe aktif selama 18 frame (-2 s/d 16)
  if (rel < -2 || rel > 18) return null;

  // 0 -> 1 ekspansi (frame 0-8), 1 -> 0 kontraksi (frame 9-16)
  const isOpening = rel < 8;
  const spr = isOpening
    ? spring({frame: Math.max(0, rel), fps, config: {damping: 14, stiffness: 180}})
    : 1 - spring({frame: Math.max(0, rel - 8), fps, config: {damping: 14, stiffness: 200}});

  const scale = Math.max(0, spr * 2.8);
  const rot = rel * 18;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 80,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Expanding colored circle */}
      <div
        style={{
          width: 900,
          height: 900,
          borderRadius: '50%',
          backgroundColor: color,
          border: `12px solid ${tokens.ink}`,
          boxShadow: `0 0 60px rgba(20, 16, 43, 0.4)`,
          transform: `scale(${scale})`,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Rotating SVG runes */}
        <svg
          viewBox="0 0 100 100"
          width="820"
          height="820"
          style={{
            position: 'absolute',
            transform: `rotate(${rot}deg)`,
            opacity: 0.4,
          }}
        >
          <circle cx="50" cy="50" r="46" fill="none" stroke={tokens.ink} strokeWidth="1.5" strokeDasharray="4 6" />
          <circle cx="50" cy="50" r="38" fill="none" stroke={tokens.ink} strokeWidth="1" />
          <polygon points="50,14 81,68 19,68" fill="none" stroke={tokens.ink} strokeWidth="1" />
          <polygon points="50,86 81,32 19,32" fill="none" stroke={tokens.ink} strokeWidth="1" />
        </svg>

        {/* Slam chip in center */}
        {label && isOpening && (
          <div
            style={{
              backgroundColor: tokens.ink,
              color: '#FFFFFF',
              fontWeight: 900,
              fontSize: 34,
              letterSpacing: '3px',
              padding: '14px 28px',
              borderRadius: 16,
              border: `4px solid #FFFFFF`,
              transform: `scale(${Math.min(1, scale)})`,
              boxShadow: `6px 6px 0px rgba(0, 0, 0, 0.3)`,
            }}
          >
            {label}
          </div>
        )}
      </div>
    </div>
  );
};
