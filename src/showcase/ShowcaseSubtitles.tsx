import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import data from '../data/erekap-showcase-subtitles.json';
import {EREKAP_FONT} from '../lib/erekapTokens';

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
    ink: '#F4F8F5',
    future: 'rgba(244, 248, 245, 0.56)',
    activePillBg: 'rgba(163, 230, 53, 0.25)',
    activeBorder: '1.5px solid rgba(163, 230, 53, 0.85)',
    activeColor: '#BEF264',
    shadow: '0 2px 6px rgba(4, 20, 12, 0.94), 0 0 18px rgba(4, 20, 12, 0.85)',
  },
  light: {
    ink: '#0B1410',
    future: 'rgba(11, 20, 16, 0.48)',
    activePillBg: '#0A3D26',
    activeBorder: '1.5px solid #072919',
    activeColor: '#A3E635',
    shadow: '0 1px 3px rgba(241, 245, 242, 0.96), 0 0 12px rgba(241, 245, 242, 0.95)',
  },
};

export const ShowcaseSubtitles: React.FC<{bottom?: number; fontSize?: number}> = ({
  bottom = 78,
  fontSize = 42,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const cap = CAPTIONS.find((c) => t >= c.start && t < c.end);
  if (!cap) return null;

  const s = STYLE[cap.bg];
  const inP = interpolate(t, [cap.start, cap.start + 0.12], [0, 1], {
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
        left: 52,
        right: 52,
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
                  fontFamily: EREKAP_FONT.sans,
                  fontWeight: active ? 800 : spoken ? 700 : 600,
                  fontSize,
                  lineHeight: 1.28,
                  letterSpacing: '-0.015em',
                  color: active ? s.activeColor : spoken ? s.ink : s.future,
                  backgroundColor: active ? s.activePillBg : 'transparent',
                  padding: active ? '4px 14px' : '4px 3px',
                  borderRadius: 12,
                  border: active ? s.activeBorder : '1.5px solid transparent',
                  textShadow: active && cap.bg === 'light' ? 'none' : s.shadow,
                  transform: active ? 'scale(1.04)' : 'scale(1)',
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
