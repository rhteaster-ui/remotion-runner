import React from 'react';
import {Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {FONT, Mode, pal} from '../lib/theme';
import {pop} from '../lib/anim';

export type PosterSpec = {
  src: string;
  badge: string;
  source: string;
  accent: string;
  isRumor?: boolean;
};

export const POSTERS = {
  argon: {
    src: 'assets/krypton/argon-official.webp',
    badge: 'OFFICIAL KEY ART',
    source: 'blog.google',
    accent: '#ff9800',
  },
  carbon: {
    src: 'assets/krypton/carbon-official.jpg',
    badge: 'OFFICIAL KEY ART',
    source: 'blog.google',
    accent: '#4285f4',
  },
  hydrogen: {
    src: 'assets/krypton/hydrogen-official.jpg',
    badge: 'OFFICIAL KEY ART',
    source: 'blog.google',
    accent: '#00e676',
  },
  kryptonLeak1: {
    src: 'assets/krypton/krypton-leak-1.jpg',
    badge: 'CIRCULATING LEAK',
    source: 'X / Community',
    accent: '#10b981',
    isRumor: true,
  },
  kryptonLeak2: {
    src: 'assets/krypton/krypton-leak-2.png',
    badge: 'RUMOR REPORT',
    source: 'CometAPI / X',
    accent: '#10b981',
    isRumor: true,
  },
  kryptonYt: {
    src: 'assets/krypton/krypton-yt.jpg',
    badge: 'LEAK SHOWCASE',
    source: 'YouTube / X',
    accent: '#10b981',
    isRumor: true,
  },
} as const satisfies Record<string, PosterSpec>;

export const PosterFrame: React.FC<{
  poster: PosterSpec;
  mode: Mode;
  enterAt?: number;
  width?: number;
  height?: number;
  tiltDeg?: number;
  zoomFrom?: number;
  zoomTo?: number;
  panX?: number;
  panY?: number;
  dimmed?: boolean;
  style?: React.CSSProperties;
}> = ({
  poster,
  mode,
  enterAt = 0,
  width = 936,
  height = 526,
  tiltDeg = 0,
  zoomFrom = 1.0,
  zoomTo = 1.08,
  panX = 0,
  panY = 0,
  dimmed = false,
  style,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = pal(mode);
  const o = pop(frame, enterAt, fps, 150);
  const localF = Math.max(0, frame - enterAt);

  const floatY = Math.sin(localF / 28) * 5;
  const rotY = tiltDeg + Math.sin(localF / 36) * 1.8;
  const rotX = Math.cos(localF / 42) * 1.2;

  const zoom = interpolate(localF, [0, 240], [zoomFrom, zoomTo], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const sweepX = interpolate(localF, [4, 34], [-120, 140], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const frameBg = mode === 'dark' ? '#0d1322' : '#ffffff';
  const borderCol = dimmed ? p.line : poster.accent;

  return (
    <div
      style={{
        width,
        height,
        borderRadius: 24,
        backgroundColor: frameBg,
        border: `2px solid ${borderCol}`,
        boxShadow: dimmed
          ? `0 16px 36px rgba(0,0,0,0.35)`
          : `0 28px 64px rgba(0,0,0,${mode === 'dark' ? 0.65 : 0.22}), 0 0 0 1px rgba(255,255,255,0.08) inset, 0 0 42px ${poster.accent}33`,
        overflow: 'hidden',
        position: 'relative',
        opacity: dimmed ? 0.38 * o : Math.min(1, o),
        transform: `perspective(1200px) translateY(${(1 - o) * 32 + floatY}px) rotateY(${rotY}deg) rotateX(${rotX}deg) scale(${0.92 + 0.08 * o})`,
        ...style,
      }}
    >
      <Img
        src={staticFile(poster.src)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${zoom}) translate(${panX}px, ${panY}px)`,
        }}
      />

      {/* Subtle bottom vignette for crisp badge readability */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(6,10,18,0.45) 0%, rgba(6,10,18,0) 32%, rgba(6,10,18,0) 68%, rgba(6,10,18,0.65) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Specular light sweep on reveal */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.22) 50%, transparent 65%)`,
          transform: `translateX(${sweepX}%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Top-left authentic badge */}
      <div
        style={{
          position: 'absolute',
          top: 18,
          left: 18,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 14px',
          borderRadius: 12,
          backgroundColor: 'rgba(8, 11, 20, 0.84)',
          border: `1px solid ${poster.accent}88`,
          backdropFilter: 'blur(8px)',
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: poster.isRumor ? '#f59e0b' : poster.accent,
            boxShadow: `0 0 10px ${poster.isRumor ? '#f59e0b' : poster.accent}`,
          }}
        />
        <span style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 16, color: '#f8fafc', letterSpacing: '0.06em'}}>
          {poster.badge}
        </span>
      </div>

      {/* Bottom-right source tag */}
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          right: 18,
          padding: '6px 12px',
          borderRadius: 10,
          backgroundColor: 'rgba(8, 11, 20, 0.78)',
          border: '1px solid rgba(255,255,255,0.16)',
        }}
      >
        <span style={{fontFamily: FONT.mono, fontWeight: 600, fontSize: 15, color: '#cbd5e1', letterSpacing: '0.04em'}}>
          SRC: {poster.source}
        </span>
      </div>
    </div>
  );
};

export const EditorialCard: React.FC<{
  mode: Mode;
  accent: string;
  kicker: string;
  title: string;
  body: string;
  enterAt?: number;
  icon?: React.ReactNode;
  tag?: string;
}> = ({mode, accent, kicker, title, body, enterAt = 8, icon, tag}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = pal(mode);
  const o = pop(frame, enterAt, fps, 160);
  const surface = mode === 'dark' ? '#101829' : '#ffffff';

  return (
    <div
      style={{
        width: '100%',
        borderRadius: 22,
        backgroundColor: surface,
        border: `1.5px solid ${p.line}`,
        borderLeft: `6px solid ${accent}`,
        boxShadow: mode === 'dark' ? '0 16px 36px rgba(0,0,0,0.45)' : '0 12px 28px rgba(15,23,42,0.08)',
        padding: '22px 26px',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        opacity: Math.min(1, o),
        transform: `translateY(${(1 - o) * 20}px)`,
      }}
    >
      {icon ? (
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            backgroundColor: `${accent}18`,
            border: `1px solid ${accent}44`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
      ) : null}
      <div style={{flex: 1, minWidth: 0}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12}}>
          <span style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 18, color: accent, letterSpacing: '0.06em'}}>
            {kicker}
          </span>
          {tag ? (
            <span
              style={{
                fontFamily: FONT.mono,
                fontWeight: 700,
                fontSize: 15,
                color: p.ink,
                backgroundColor: `${accent}22`,
                border: `1px solid ${accent}55`,
                padding: '4px 10px',
                borderRadius: 8,
              }}
            >
              {tag}
            </span>
          ) : null}
        </div>
        <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 30, color: p.ink, marginTop: 4, lineHeight: 1.15}}>
          {title}
        </div>
        <div style={{fontFamily: FONT.sans, fontWeight: 500, fontSize: 22, color: p.muted, marginTop: 6, lineHeight: 1.35}}>
          {body}
        </div>
      </div>
    </div>
  );
};

export const StepStepper: React.FC<{
  mode: Mode;
  steps: {label: string; accent: string; active: boolean; done?: boolean}[];
  enterAt?: number;
}> = ({mode, steps, enterAt = 4}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = pal(mode);
  const o = pop(frame, enterAt, fps);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        width: '100%',
        opacity: Math.min(1, o),
        transform: `translateY(${(1 - o) * 12}px)`,
      }}
    >
      {steps.map((st, idx) => (
        <React.Fragment key={st.label}>
          <div
            style={{
              flex: 1,
              padding: '10px 12px',
              borderRadius: 14,
              backgroundColor: st.active ? `${st.accent}22` : mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(15,23,42,0.04)',
              border: `1.5px solid ${st.active ? st.accent : p.line}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <div
              style={{
                width: 9,
                height: 9,
                borderRadius: '50%',
                backgroundColor: st.active || st.done ? st.accent : p.muted,
                boxShadow: st.active ? `0 0 10px ${st.accent}` : 'none',
              }}
            />
            <span
              style={{
                fontFamily: FONT.mono,
                fontWeight: 700,
                fontSize: 17,
                color: st.active ? p.ink : p.muted,
                letterSpacing: '0.04em',
              }}
            >
              {st.label}
            </span>
          </div>
          {idx < steps.length - 1 ? (
            <div style={{width: 14, height: 2, backgroundColor: p.line, flexShrink: 0}} />
          ) : null}
        </React.Fragment>
      ))}
    </div>
  );
};
