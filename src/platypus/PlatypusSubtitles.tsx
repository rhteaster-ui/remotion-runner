import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import data from '../data/platypus-subtitles.json';
import {FONT} from '../theme-tokens';

type Word = {text: string; start: number; end: number};
type Caption = {
  id: number;
  scene: string;
  bg: 'dark' | 'light';
  lines: string[];
  words: Word[];
  start: number;
  end: number;
};

const CAPTIONS = data.captions as Caption[];

const STYLE = {
  dark: {
    ink: '#F8FAFC',
    future: 'rgba(248, 250, 252, 0.54)',
    activePillBg: 'rgba(56, 189, 248, 0.28)',
    activeBorder: '1.5px solid rgba(56, 189, 248, 0.90)',
    activeColor: '#7DD3FC',
    shadow: '0 2px 8px rgba(0, 0, 0, 0.92), 0 0 18px rgba(0, 0, 0, 0.85)',
  },
  light: {
    ink: '#0F172A',
    future: 'rgba(15, 23, 42, 0.46)',
    activePillBg: '#0F172A',
    activeBorder: '1.5px solid #020617',
    activeColor: '#38BDF8',
    shadow: '0 1px 4px rgba(247, 248, 250, 0.98), 0 0 14px rgba(247, 248, 250, 0.96)',
  },
};

export const PlatypusSubtitles: React.FC<{bottom?: number; fontSize?: number}> = ({
  bottom = 80,
  fontSize = 42,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const cap = CAPTIONS.find((c) => t >= c.start && t < c.end);
  if (!cap) return null;

  const s = STYLE[cap.bg];
  const inP = interpolate(t, [cap.start, cap.start + 0.1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const outP = interpolate(t, [cap.end - 0.09, cap.end], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  let idx = 0;
  const lines = cap.lines.map((l) => {
    const n = l.split(' ').length;
    const ws = cap.words.slice(idx, idx + n);
    idx += n;
    return ws;
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: 48,
        right: 48,
        bottom,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: Math.min(inP, outP),
        transform: `translateY(${(1 - inP) * 6}px)`,
        pointerEvents: 'none',
        zIndex: 80,
      }}
    >
      {lines.map((ws, li) => (
        <div
          key={li}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px 15px',
            marginBottom: 6,
          }}
        >
          {ws.map((w, wi) => {
            const active = t >= w.start && t < w.end;
            const spoken = t >= w.end;
            return (
              <span
                key={wi}
                style={{
                  fontFamily: FONT.sans,
                  fontWeight: active ? 800 : spoken ? 700 : 600,
                  fontSize,
                  lineHeight: 1.28,
                  letterSpacing: '-0.015em',
                  color: active ? s.activeColor : spoken ? s.ink : s.future,
                  backgroundColor: active ? s.activePillBg : 'transparent',
                  padding: active ? '4px 15px' : '4px 3px',
                  borderRadius: 12,
                  border: active ? s.activeBorder : '1.5px solid transparent',
                  textShadow: active && cap.bg === 'light' ? 'none' : s.shadow,
                  transform: active ? 'scale(1.05)' : 'scale(1)',
                  display: 'inline-block',
                }}
              >
                {w.text}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};
