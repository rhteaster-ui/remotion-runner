import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import subtitlesData from '../data/js-subtitles.json';
import timelineData from '../data/js-timeline.json';
import {FONT} from '../theme-tokens';

type Word = {word: string; start: number; end: number};
type Cue = {
  id: string;
  sceneId: string;
  start: number;
  end: number;
  lines: string[];
  words: Word[];
};

const CUES = subtitlesData.cues as Cue[];
const SCENE_THEMES: Record<string, 'dark' | 'light'> = {};
timelineData.scenes.forEach((s) => {
  SCENE_THEMES[s.id] = s.theme as 'dark' | 'light';
});

const STYLE = {
  dark: {
    ink: '#F8FAFC',
    future: 'rgba(248, 250, 252, 0.48)',
    activePillBg: 'rgba(247, 223, 30, 0.22)',
    activeBorder: '1.5px solid rgba(247, 223, 30, 0.90)',
    activeColor: '#FEF08A',
    shadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 16px rgba(0, 0, 0, 0.85)',
  },
  light: {
    ink: '#0F172A',
    future: 'rgba(15, 23, 42, 0.42)',
    activePillBg: '#0F172A',
    activeBorder: '1.5px solid #020617',
    activeColor: '#FACC15',
    shadow: '0 1px 4px rgba(247, 248, 250, 0.98), 0 0 12px rgba(247, 248, 250, 0.90)',
  },
};

export const JavaScriptSubtitles: React.FC<{bottom?: number; fontSize?: number}> = ({
  bottom = 72,
  fontSize = 42,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  const cue = CUES.find((c) => t >= c.start && t < c.end);
  if (!cue) return null;

  const theme = SCENE_THEMES[cue.sceneId] || 'dark';
  const s = STYLE[theme];

  const inP = interpolate(t, [cue.start, cue.start + 0.1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const outP = interpolate(t, [cue.end - 0.09, cue.end], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  let idx = 0;
  const lines = cue.lines.map((l) => {
    const n = l.split(' ').length;
    const ws = cue.words.slice(idx, idx + n);
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
        transform: `translateY(${(1 - inP) * 5}px)`,
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
            gap: '8px 16px',
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
                  padding: active ? '4px 16px' : '4px 3px',
                  borderRadius: 12,
                  border: active ? s.activeBorder : '1.5px solid transparent',
                  textShadow: active && theme === 'light' ? 'none' : s.shadow,
                  transform: active ? 'scale(1.05)' : 'scale(1)',
                  display: 'inline-block',
                  transition: 'all 0.05s ease',
                }}
              >
                {w.word}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};
