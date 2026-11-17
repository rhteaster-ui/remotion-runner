import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import data from '../data/ops-subtitles.json';
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
  amber: {
    dark: {
      ink: '#F4F6FA',
      future: 'rgba(244, 246, 250, 0.56)',
      activePillBg: 'rgba(245, 158, 11, 0.26)',
      activeBorder: '1.5px solid rgba(245, 158, 11, 0.78)',
      activeColor: '#FFFFFF',
      shadow: '0 2px 6px rgba(0, 0, 0, 0.92), 0 0 18px rgba(0, 0, 0, 0.82)',
    },
    light: {
      ink: '#111318',
      future: 'rgba(17, 19, 24, 0.48)',
      activePillBg: 'rgba(217, 119, 6, 0.18)',
      activeBorder: '1.5px solid rgba(217, 119, 6, 0.72)',
      activeColor: '#090B0E',
      shadow: '0 1px 3px rgba(246, 245, 240, 0.95), 0 0 12px rgba(246, 245, 240, 0.92)',
    },
  },
  portfolio: {
    dark: {
      ink: '#f1f3f6',
      future: 'rgba(169, 177, 190, 0.62)',
      activePillBg: 'rgba(197, 162, 117, 0.24)',
      activeBorder: '1.5px solid rgba(197, 162, 117, 0.85)',
      activeColor: '#dfc198',
      shadow: '0 2px 6px rgba(8, 11, 16, 0.95), 0 0 18px rgba(8, 11, 16, 0.85)',
    },
    light: {
      ink: '#181e28',
      future: 'rgba(77, 88, 104, 0.56)',
      activePillBg: 'rgba(53, 68, 90, 0.14)',
      activeBorder: '1.5px solid rgba(53, 68, 90, 0.68)',
      activeColor: '#181e28',
      shadow: '0 1px 3px rgba(238, 240, 242, 0.95), 0 0 12px rgba(238, 240, 242, 0.92)',
    },
  },
};

export const OpsSubtitles: React.FC<{
  bottom?: number;
  fontSize?: number;
  palette?: 'amber' | 'portfolio';
}> = ({
  bottom = 82,
  fontSize = 42,
  palette = 'amber',
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const cap = CAPTIONS.find((c) => t >= c.start && t < c.end);
  if (!cap) return null;

  const s = STYLE[palette][cap.bg];
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
        left: 56,
        right: 56,
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
                  lineHeight: 1.28,
                  letterSpacing: '-0.015em',
                  color: active ? s.activeColor : spoken ? s.ink : s.future,
                  backgroundColor: active ? s.activePillBg : 'transparent',
                  padding: active ? '4px 12px' : '4px 3px',
                  borderRadius: 10,
                  border: active ? s.activeBorder : '1.5px solid transparent',
                  textShadow: s.shadow,
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
