import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import data from '../data/subtitles.json';
import {FONT} from '../lib/theme';

type Word = {text: string; start: number; end: number};
type Caption = {id: number; scene: string; bg: 'dark' | 'light'; lines: string[]; words: Word[]; start: number; end: number};
const CAPTIONS = data.captions as Caption[];

const STYLE = {
  dark: {
    ink: '#f1f3f6',
    future: 'rgba(241,243,246,0.62)',
    active: '#d4ff3f',
    shadow: '0 2px 3px rgba(0,0,0,0.85), 0 0 16px rgba(0,0,0,0.7)',
  },
  light: {
    ink: '#181e28',
    future: 'rgba(24,30,40,0.55)',
    active: '#3a4fe0',
    shadow: '0 0 3px rgba(255,255,255,0.95), 0 0 14px rgba(255,255,255,0.85)',
  },
};

export const Subtitles: React.FC<{bottom?: number; fontSize?: number}> = ({bottom = 360, fontSize = 46}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const cap = CAPTIONS.find((c) => t >= c.start && t < c.end);
  if (!cap) return null;

  const s = STYLE[cap.bg];
  const inP = interpolate(t, [cap.start, cap.start + 0.14], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const outP = interpolate(t, [cap.end - 0.1, cap.end], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

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
        left: 72,
        right: 72,
        bottom,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: Math.min(inP, outP),
        transform: `translateY(${(1 - inP) * 8}px)`,
        pointerEvents: 'none',
      }}
    >
      {lines.map((ws, li) => (
        <div key={li} style={{display: 'flex', justifyContent: 'center', gap: `0 ${Math.round(fontSize * 0.28)}px`, whiteSpace: 'nowrap'}}>
          {ws.map((w, wi) => {
            const active = t >= w.start && t < w.end;
            const spoken = t >= w.end;
            return (
              <span
                key={wi}
                style={{
                  fontFamily: FONT.sans,
                  fontWeight: 800,
                  fontSize,
                  lineHeight: 1.3,
                  letterSpacing: '-0.005em',
                  color: active ? s.active : spoken ? s.ink : s.future,
                  textShadow: s.shadow,
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
