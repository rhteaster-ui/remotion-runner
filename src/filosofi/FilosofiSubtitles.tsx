import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import data from '../data/filosofi-subtitles.json';
import {FILOSOFI_FONT, FILOSOFI_TOKENS as T} from './filosofiTokens';

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

export const FilosofiSubtitles: React.FC<{bottom?: number; fontSize?: number}> = ({
  bottom = 80,
  fontSize = 42,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const cap = CAPTIONS.find((c) => t >= c.start && t < c.end);
  if (!cap) return null;

  const inP = interpolate(t, [cap.start, cap.start + 0.12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const outP = interpolate(t, [cap.end - 0.08, cap.end], [1, 0], {
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

  // Scene-dependent accent
  const accent = cap.scene === 's2-claude'
    ? T.claude
    : cap.scene === 's3-gemini'
    ? T.gemini
    : cap.scene === 's4-openai'
    ? T.openai
    : '#38BDF8';

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
        transform: `translateY(${(1 - inP) * 8}px)`,
        pointerEvents: 'none',
        zIndex: 90,
      }}
    >
      {lines.map((ws, li) => (
        <div
          key={li}
          style={{
            display: 'flex',
            justifyContent: 'center',
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
                  fontFamily: FILOSOFI_FONT.sans,
                  fontWeight: active ? 800 : 600,
                  fontSize,
                  lineHeight: 1.35,
                  letterSpacing: '-0.01em',
                  color: active ? '#FFFFFF' : spoken ? T.ink : T.inkMuted,
                  backgroundColor: active
                    ? `${accent}40`
                    : 'transparent',
                  padding: active ? '3px 12px' : '3px 4px',
                  borderRadius: 10,
                  border: active
                    ? `1.5px solid ${accent}`
                    : '1.5px solid transparent',
                  boxShadow: active
                    ? `0 0 20px ${accent}80`
                    : 'none',
                  textShadow: '0 2px 6px rgba(0,0,0,0.85)',
                  transform: active ? 'scale(1.05)' : 'scale(1)',
                  transition: 'transform 0.08s ease',
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
