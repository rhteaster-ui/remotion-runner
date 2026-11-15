import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import data from '../data/agentic-subtitles.json';
import {FONT} from '../lib/theme';

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
    ink: '#f8fafc',
    future: 'rgba(248,250,252,0.64)',
    activePillBg: 'rgba(56, 189, 248, 0.24)',
    activeBorder: '1.5px solid rgba(56, 189, 248, 0.6)',
    activeGlow: '0 0 16px rgba(56, 189, 248, 0.75)',
    activeColor: '#38bdf8',
    shadow: '0 2px 4px rgba(0,0,0,0.9), 0 0 18px rgba(0,0,0,0.85)',
  },
  light: {
    ink: '#0f172a',
    future: 'rgba(15,23,42,0.55)',
    activePillBg: 'rgba(37, 99, 235, 0.16)',
    activeBorder: '1.5px solid rgba(37, 99, 235, 0.55)',
    activeGlow: '0 0 12px rgba(37, 99, 235, 0.45)',
    activeColor: '#1d4ed8',
    shadow: '0 1px 3px rgba(255,255,255,0.95), 0 0 12px rgba(255,255,255,0.9)',
  },
};

export const AgenticSubtitles: React.FC<{bottom?: number; fontSize?: number}> = ({
  bottom = 78,
  fontSize = 42,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const cap = CAPTIONS.find((c) => t >= c.start && t < c.end);
  if (!cap) return null;

  const s = STYLE[cap.bg];
  const inP = interpolate(t, [cap.start, cap.start + 0.14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const outP = interpolate(t, [cap.end - 0.1, cap.end], [1, 0], {
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
        left: 54,
        right: 54,
        bottom,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: Math.min(inP, outP),
        transform: `translateY(${(1 - inP) * 6}px)`,
        pointerEvents: 'none',
        zIndex: 60,
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
            gap: '8px 14px',
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
                  lineHeight: 1.3,
                  letterSpacing: '-0.015em',
                  color: active ? (cap.bg === 'dark' ? '#ffffff' : '#0f172a') : spoken ? s.ink : s.future,
                  backgroundColor: active ? s.activePillBg : 'transparent',
                  padding: active ? '4px 10px' : '4px 2px',
                  borderRadius: 8,
                  border: active ? s.activeBorder : '1.5px solid transparent',
                  textShadow: active ? s.activeGlow : s.shadow,
                  transform: active ? 'scale(1.04)' : 'scale(1)',
                  transition: 'transform 0.1s ease',
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
