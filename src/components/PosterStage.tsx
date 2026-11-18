import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {FONT, Mode} from '../lib/theme';
import {pop} from '../lib/anim';

export type PosterSpec = {
  src: string;
  caption: string;
  accent: string;
  blendDark?: boolean;
};

export const POSTERS = {
  argon: {
    src: 'assets/krypton/argon-official.webp',
    caption: 'blog.google · Gemini 4 Argon (Official)',
    accent: '#ff9800',
  },
  carbon: {
    src: 'assets/krypton/carbon-official.jpg',
    caption: 'blog.google · Gemini 4 Carbon (Official)',
    accent: '#4285f4',
  },
  hydrogen: {
    src: 'assets/krypton/hydrogen-official.jpg',
    caption: 'blog.google · Gemini 4 Hydrogen (Official)',
    accent: '#00e676',
  },
  kryptonHero: {
    src: 'assets/krypton/krypton-hero-plasma.jpg',
    caption: 'Community / Google Search · Gemini 4 Krypton',
    accent: '#3b82f6',
  },
  kryptonNeural: {
    src: 'assets/krypton/krypton-neural-wave.jpg',
    caption: 'OfficeChai / X · Gemini 4 Krypton',
    accent: '#60a5fa',
  },
  kryptonStarOrbit: {
    src: 'assets/krypton/krypton-star-orbit.jpg',
    caption: 'Concept Key Art · Gemini 4 Krypton',
    accent: '#38bdf8',
  },
  kryptonGiant4: {
    src: 'assets/krypton/krypton-giant-4.jpg',
    caption: 'X / Community · Gemini Krypton',
    accent: '#2563eb',
  },
  kryptonBlack: {
    src: 'assets/krypton/krypton-leak-2.png',
    caption: 'CometAPI / X · Unannounced Checkpoint',
    accent: '#f59e0b',
    blendDark: true,
  },
} as const satisfies Record<string, PosterSpec>;

/* ============================================================================
   1. CLEAN MATTE CANVAS (Bendalogi-style: zero borders, zero neon glow slop)
   ============================================================================ */
export const BendaBackground: React.FC<{mode: Mode}> = ({mode}) => {
  const isDark = mode === 'dark';
  const bg = isDark ? '#0b0b0d' : '#f7f8fa';
  const grid = isDark ? 'rgba(255, 255, 255, 0.028)' : 'rgba(15, 23, 42, 0.038)';
  return (
    <AbsoluteFill style={{backgroundColor: bg}}>
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${grid} 1px, transparent 1px), linear-gradient(90deg, ${grid} 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />
    </AbsoluteFill>
  );
};

export const BendaWatermark: React.FC<{mode: Mode; index: number; total: number}> = ({mode, index, total}) => {
  const isDark = mode === 'dark';
  const ink = isDark ? 'rgba(248,250,252,0.52)' : 'rgba(15,23,42,0.48)';
  return (
    <div
      style={{
        position: 'absolute',
        top: 64,
        left: 72,
        right: 72,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 20,
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
        <Img src={staticFile('assets/portfolio/rhmt-mark.svg')} style={{width: 22, height: 22}} />
        <span style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 18, color: ink, letterSpacing: '0.06em'}}>
          rhmt ofc
        </span>
      </div>
      <span style={{fontFamily: FONT.mono, fontWeight: 600, fontSize: 17, color: ink, letterSpacing: '0.08em'}}>
        {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};

/* ============================================================================
   2. ZONA 1: KINETIC HOOK + FIGMA ANCHOR SELECTION FRAME
   ============================================================================ */
export const BendaHook: React.FC<{
  mode: Mode;
  lead: string;
  anchorText: string;
  tail?: string;
  accent?: string;
  enterAt?: number;
}> = ({mode, lead, anchorText, tail, accent = '#2563eb', enterAt = 2}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const isDark = mode === 'dark';
  const leadColor = isDark ? 'rgba(248, 250, 252, 0.76)' : 'rgba(15, 23, 42, 0.68)';
  const anchorColor = isDark ? '#ffffff' : '#0f172a';

  const o = pop(frame, enterAt, fps, 175);
  const boxScale = spring({
    frame: Math.max(0, frame - (enterAt + 4)),
    fps,
    config: {damping: 14, stiffness: 190, mass: 0.7},
  });
  const dot = 9;
  const off = -dot / 2 - 1;
  const hStyle: React.CSSProperties = {
    position: 'absolute',
    width: dot,
    height: dot,
    backgroundColor: '#ffffff',
    border: `2px solid ${accent}`,
    borderRadius: 1.5,
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: 152,
        left: 64,
        right: 64,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 12,
        opacity: Math.min(1, o),
        transform: `translateY(${(1 - o) * 14}px)`,
      }}
    >
      <div
        style={{
          fontFamily: FONT.sans,
          fontWeight: 600,
          fontSize: 42,
          lineHeight: 1.2,
          color: leadColor,
          letterSpacing: '-0.02em',
        }}
      >
        {lead}
      </div>

      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap'}}>
        <div
          style={{
            position: 'relative',
            padding: '6px 22px',
            border: `2px solid ${accent}`,
            backgroundColor: isDark ? `${accent}24` : `${accent}14`,
            borderRadius: 3,
            fontFamily: FONT.sans,
            fontWeight: 800,
            fontSize: 54,
            lineHeight: 1.12,
            color: anchorColor,
            letterSpacing: '-0.025em',
            transform: `scale(${0.92 + 0.08 * boxScale})`,
          }}
        >
          <div style={{...hStyle, top: off, left: off}} />
          <div style={{...hStyle, top: off, right: off}} />
          <div style={{...hStyle, bottom: off, left: off}} />
          <div style={{...hStyle, bottom: off, right: off}} />
          <div style={{...hStyle, top: off, left: '50%', transform: 'translateX(-50%)'}} />
          <div style={{...hStyle, bottom: off, left: '50%', transform: 'translateX(-50%)'}} />
          <div style={{...hStyle, left: off, top: '50%', transform: 'translateY(-50%)'}} />
          <div style={{...hStyle, right: off, top: '50%', transform: 'translateY(-50%)'}} />
          {anchorText}
        </div>
        {tail ? (
          <span style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 44, color: leadColor}}>
            {tail}
          </span>
        ) : null}
      </div>
    </div>
  );
};

/* ============================================================================
   3. ZONA 2: NAKED HORIZONTAL BREADCRUMB TIMELINE (Zero Box Container)
   ============================================================================ */
export type TimelineNode = {
  label: string;
  done?: boolean;
  active?: boolean;
  rumor?: boolean;
};

export const BendaStepper: React.FC<{
  mode: Mode;
  nodes: TimelineNode[];
  counterTop?: string;
  counterSub?: string;
  accent?: string;
  top?: number;
}> = ({mode, nodes, counterTop, counterSub, accent = '#22c55e', top = 372}) => {
  const frame = useCurrentFrame();
  const isDark = mode === 'dark';
  const trackCol = isDark ? 'rgba(255,255,255,0.16)' : 'rgba(15,23,42,0.16)';
  const mutedInk = isDark ? 'rgba(248,250,252,0.48)' : 'rgba(15,23,42,0.48)';
  const activeInk = isDark ? '#f8fafc' : '#0f172a';
  const activeIdx = Math.max(
    0,
    nodes.findIndex((n) => n.active),
  );

  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: 72,
        right: 72,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 20,
      }}
    >
      {/* Tiny 3D package/cube anchor icon like Bendalogi */}
      <div style={{marginTop: 2, flexShrink: 0, opacity: 0.85}}>
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={isDark ? '#e2e8f0' : '#1e293b'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      </div>

      {/* Horizontal Line + Dots */}
      <div style={{flex: 1, position: 'relative', paddingTop: 4}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative'}}>
          {nodes.map((n, i) => {
            const lit = Boolean(n.done || n.active);
            const dotColor = n.active ? accent : n.done ? '#22c55e' : 'transparent';
            const borderColor = n.active ? accent : n.done ? '#22c55e' : trackCol;
            const pulse = n.active ? 1 + Math.sin(frame / 6) * 0.12 : 1;
            const segLit = i < activeIdx || n.done;
            return (
              <React.Fragment key={n.label}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2}}>
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      backgroundColor: lit ? dotColor : isDark ? '#0b0b0d' : '#f7f8fa',
                      border: `2.5px solid ${borderColor}`,
                      boxShadow: n.active ? `0 0 12px ${accent}bb` : 'none',
                      transform: `scale(${pulse})`,
                    }}
                  />
                  <span
                    style={{
                      marginTop: 10,
                      fontFamily: FONT.mono,
                      fontWeight: n.active ? 700 : 600,
                      fontSize: 15,
                      color: lit ? activeInk : mutedInk,
                      letterSpacing: '0.05em',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {n.label}
                  </span>
                </div>
                {i < nodes.length - 1 ? (
                  <div
                    style={{
                      flex: 1,
                      height: 0,
                      marginBottom: 24,
                      borderTop: nodes[i + 1].rumor
                        ? `2px dashed ${trackCol}`
                        : `2px solid ${segLit ? '#22c55e' : trackCol}`,
                    }}
                  />
                ) : null}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Right-aligned minimalist counter */}
      {counterTop ? (
        <div style={{textAlign: 'right', flexShrink: 0, marginTop: -4}}>
          <div style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 19, color: activeInk}}>
            {counterTop}
          </div>
          {counterSub ? (
            <div style={{fontFamily: FONT.mono, fontWeight: 500, fontSize: 13, color: mutedInk, marginTop: 2}}>
              {counterSub}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

/* ============================================================================
   4. CLEAN ARTWORK POSTER STAGE (No neon border, no bottom overlay bars)
   ============================================================================ */
export const CleanPoster: React.FC<{
  poster: PosterSpec;
  mode: Mode;
  enterAt?: number;
  width?: number;
  height?: number;
  tiltDeg?: number;
  zoomFrom?: number;
  zoomTo?: number;
  showCaption?: boolean;
  style?: React.CSSProperties;
}> = ({
  poster,
  mode,
  enterAt = 0,
  width = 880,
  height = 495,
  tiltDeg = 0,
  zoomFrom = 1.0,
  zoomTo = 1.04,
  showCaption = true,
  style,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const o = pop(frame, enterAt, fps, 165);
  const localF = Math.max(0, frame - enterAt);
  const isDark = mode === 'dark';

  const floatY = Math.sin(localF / 34) * 4;
  const zoom = interpolate(localF, [0, 240], [zoomFrom, zoomTo], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const sweepX = interpolate(localF, [3, 30], [-120, 140], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const hairline = poster.blendDark
    ? 'rgba(255,255,255,0.06)'
    : isDark
      ? 'rgba(255,255,255,0.12)'
      : 'rgba(15,23,42,0.10)';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: Math.min(1, o),
        transform: `perspective(1200px) translateY(${(1 - o) * 24 + floatY}px) rotateY(${tiltDeg}deg) scale(${0.94 + 0.06 * o})`,
        ...style,
      }}
    >
      <div
        style={{
          width,
          height,
          borderRadius: 16,
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: poster.blendDark ? '#000000' : isDark ? '#090d16' : '#ffffff',
          border: `1px solid ${hairline}`,
          boxShadow: poster.blendDark
            ? 'none'
            : isDark
              ? '0 24px 54px rgba(0,0,0,0.65)'
              : '0 18px 42px rgba(15,23,42,0.12)',
        }}
      >
        <Img
          src={staticFile(poster.src)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: `scale(${zoom})`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(115deg, transparent 38%, rgba(255,255,255,0.16) 50%, transparent 62%)',
            transform: `translateX(${sweepX}%)`,
            pointerEvents: 'none',
          }}
        />
      </div>
      {showCaption ? (
        <div
          style={{
            marginTop: 12,
            fontFamily: FONT.mono,
            fontWeight: 600,
            fontSize: 15,
            color: isDark ? 'rgba(248,250,252,0.5)' : 'rgba(15,23,42,0.52)',
            letterSpacing: '0.04em',
          }}
        >
          {poster.caption}
        </div>
      ) : null}
    </div>
  );
};

/* ============================================================================
   5. BENDALOGI MOTION PRIMITIVES (Cursor, Dashed Curve, Equation, Batas)
   ============================================================================ */
export const AnimatedPointer: React.FC<{
  x: number;
  y: number;
  clickAt?: number;
}> = ({x, y, clickAt}) => {
  const frame = useCurrentFrame();
  const isClicking = clickAt !== undefined && frame >= clickAt && frame <= clickAt + 10;
  const rippleP = clickAt !== undefined ? interpolate(frame, [clickAt, clickAt + 18], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 0;

  return (
    <div style={{position: 'absolute', left: x, top: y, zIndex: 40, pointerEvents: 'none'}}>
      {clickAt !== undefined && frame >= clickAt && frame <= clickAt + 18 ? (
        <div
          style={{
            position: 'absolute',
            left: -18,
            top: -18,
            width: 44,
            height: 44,
            borderRadius: '50%',
            border: '2px solid #38bdf8',
            transform: `scale(${0.4 + rippleP * 1.3})`,
            opacity: 1 - rippleP,
          }}
        />
      ) : null}
      <svg width={34} height={34} viewBox="0 0 24 24" style={{transform: `scale(${isClicking ? 0.84 : 1})`, filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.45))'}}>
        <path d="M4 2L20 11L12.5 13.5L9 21L4 2Z" fill="#ffffff" stroke="#0f172a" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

export const BatasDivider: React.FC<{label?: string; enterAt?: number}> = ({label = 'BATAS FAKTA', enterAt = 12}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const o = pop(frame, enterAt, fps, 170);
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        opacity: Math.min(1, o),
      }}
    >
      <div
        style={{
          padding: '5px 14px',
          borderRadius: 6,
          backgroundColor: '#dc2626',
          fontFamily: FONT.mono,
          fontWeight: 800,
          fontSize: 15,
          color: '#ffffff',
          letterSpacing: '0.07em',
          flexShrink: 0,
        }}
      >
        {label}
      </div>
      <div style={{flex: 1, borderTop: '2.5px dashed #ef4444', opacity: 0.85}} />
    </div>
  );
};
