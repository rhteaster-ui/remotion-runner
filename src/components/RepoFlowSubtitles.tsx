import React, {useMemo} from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import data from '../data/repoflow-subtitles.json';
import {REPO_FONT} from '../premium-repoflow/tokens';

export type Word = {text: string; start: number; end: number};
export type Caption = {
  id: number;
  scene: string;
  bg: 'dark' | 'light';
  lines: string[];
  words: Word[];
  start: number;
  end: number;
};

const CAPTIONS = data.captions as Caption[];

export const RepoFlowSubtitles: React.FC<{
  bottom?: number;
  fontSize?: number;
  palette?: 'cyan' | 'amber' | 'default';
}> = ({
  bottom = 78,
  fontSize = 42,
  palette = 'cyan',
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  const cap = useMemo(
    () => CAPTIONS.find((c) => t >= c.start && t < c.end),
    [t]
  );

  if (!cap) return null;

  // Caption block entrance & exit easing (smooth cubic curve)
  const inP = interpolate(t, [cap.start, cap.start + 0.14], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const outP = interpolate(t, [cap.end - 0.12, cap.end], [1, 0], {
    easing: Easing.in(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const blockOpacity = Math.min(inP, outP);
  const blockY = interpolate(inP, [0, 1], [6, 0]);

  // Split words by lines cleanly
  let idx = 0;
  const lines = cap.lines.map((l) => {
    const n = l.split(' ').length;
    const ws = cap.words.slice(idx, idx + n);
    idx += n;
    return ws;
  });

  const isDark = cap.bg === 'dark';

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
        opacity: blockOpacity,
        transform: `translateY(${blockY}px)`,
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
            gap: '8px 12px',
            marginBottom: 6,
          }}
        >
          {ws.map((w, wi) => {
            // Find next word in caption for gapless handover (anti-stutter)
            const allWords = cap.words;
            const globalWordIndex = allWords.indexOf(w);
            const nextWord =
              globalWordIndex >= 0 && globalWordIndex < allWords.length - 1
                ? allWords[globalWordIndex + 1]
                : null;

            // If gap between this word and next word is small (<= 0.22s),
            // bridge the highlight smoothly to prevent multi-frame flickering
            const gapToNext = nextWord ? nextWord.start - w.end : 999;
            const effectiveEnd =
              gapToNext > 0 && gapToNext <= 0.22 ? nextWord!.start : w.end;

            // Frame-interpolated continuous progress (0.0 to 1.0)
            const enterProgress = interpolate(
              t,
              [w.start, w.start + 0.08],
              [0, 1],
              {
                easing: Easing.out(Easing.cubic),
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }
            );

            const exitProgress = interpolate(
              t,
              [effectiveEnd, effectiveEnd + 0.08],
              [1, 0],
              {
                easing: Easing.in(Easing.cubic),
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }
            );

            const activeProgress = enterProgress * exitProgress;
            const isSpoken = t >= effectiveEnd && activeProgress < 0.05;

            // Elastic organic scale & micro-lift without ANY layout shift
            // transform scales purely on GPU compositor; layout dimensions stay 100% frozen
            const scale = interpolate(
              activeProgress,
              [0, 1],
              [1.0, 1.05],
              {
                easing: Easing.bezier(0.18, 0.9, 0.3, 1.1),
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }
            );
            const liftY = interpolate(activeProgress, [0, 1], [0, -2]);

            // Theme colors with continuous alpha blending
            const textColor = isDark
              ? activeProgress > 0.1
                ? '#ffffff'
                : isSpoken
                ? '#f8fafc'
                : 'rgba(248, 250, 252, 0.48)'
              : activeProgress > 0.1
              ? '#0284c7'
              : isSpoken
              ? '#0f172a'
              : 'rgba(15, 23, 42, 0.42)';

            const pillBg = isDark
              ? `rgba(56, 189, 248, ${0.24 * activeProgress})`
              : `rgba(2, 132, 199, ${0.16 * activeProgress})`;

            const borderColor = isDark
              ? `rgba(56, 189, 248, ${0.85 * activeProgress})`
              : `rgba(2, 132, 199, ${0.75 * activeProgress})`;

            const boxShadow =
              activeProgress > 0.05
                ? isDark
                  ? `0 0 ${16 * activeProgress}px rgba(56, 189, 248, ${0.45 * activeProgress}), 0 2px 8px rgba(0, 0, 0, 0.85)`
                  : `0 0 ${12 * activeProgress}px rgba(2, 132, 199, ${0.35 * activeProgress}), 0 2px 6px rgba(255, 255, 255, 0.85)`
                : 'none';

            const textShadow = isDark
              ? activeProgress > 0.05
                ? `0 0 ${10 * activeProgress}px rgba(56, 189, 248, ${0.75 * activeProgress}), 0 2px 6px rgba(0, 0, 0, 0.95)`
                : '0 2px 6px rgba(0, 0, 0, 0.95)'
              : activeProgress > 0.05
              ? '0 1px 2px rgba(255, 255, 255, 0.95)'
              : '0 1px 2px rgba(255, 255, 255, 0.85)';

            return (
              <span
                key={wi}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxSizing: 'border-box',
                  fontFamily: REPO_FONT.sans,
                  // STRICT CONSTANTS: ZERO LAYOUT SHIFT (Bebas Getar)
                  fontWeight: 700,
                  fontSize,
                  lineHeight: 1.28,
                  letterSpacing: '-0.015em',
                  padding: '4px 12px',
                  borderRadius: 10,
                  border: `1.5px solid ${borderColor}`,
                  backgroundColor: pillBg,
                  color: textColor,
                  boxShadow,
                  textShadow,
                  // ELASTIC MICRO-LIFT (Bebas Kaku)
                  transform: `scale(${scale}) translateY(${liftY}px)`,
                  willChange: 'transform, opacity',
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
