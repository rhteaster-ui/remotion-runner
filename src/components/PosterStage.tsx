import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
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
  kryptonHero: {
    src: 'assets/krypton/krypton-hero-plasma.jpg',
    badge: 'RUMOR KEY ART',
    source: 'Community / Google Search',
    accent: '#38bdf8',
    isRumor: true,
  },
  kryptonNeural: {
    src: 'assets/krypton/krypton-neural-wave.jpg',
    badge: 'ARENA TRACKER',
    source: 'OfficeChai / X',
    accent: '#60a5fa',
    isRumor: true,
  },
  kryptonLight: {
    src: 'assets/krypton/krypton-light-silk.jpg',
    badge: 'BENCHMARK LEAK',
    source: 'X / Community',
    accent: '#0284c7',
    isRumor: true,
  },
  kryptonMinimal: {
    src: 'assets/krypton/krypton-leak-2.png',
    badge: 'STATUS CHECK',
    source: 'CometAPI / X',
    accent: '#f59e0b',
    isRumor: true,
  },
} as const satisfies Record<string, PosterSpec>;

export const KryptonBackground: React.FC<{mode: Mode; accent: string}> = ({mode, accent}) => {
  const frame = useCurrentFrame();
  const isDark = mode === 'dark';
  const baseBg = isDark ? '#070a12' : '#f4f7fb';
  const dotColor = isDark ? 'rgba(148, 163, 184, 0.14)' : 'rgba(15, 23, 42, 0.08)';
  const frameHairline = isDark ? 'rgba(148, 163, 184, 0.10)' : 'rgba(15, 23, 42, 0.07)';
  const driftY = Math.sin(frame / 110) * 14;

  return (
    <AbsoluteFill style={{backgroundColor: baseBg}}>
      {/* Architectural micro-dot matrix */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${dotColor} 1.25px, transparent 1.25px)`,
          backgroundSize: '32px 32px',
          backgroundPosition: `0 ${driftY}px`,
        }}
      />
      {/* Directional top wash (no neon radial blob) */}
      <AbsoluteFill
        style={{
          background: isDark
            ? `linear-gradient(180deg, ${accent}1a 0%, rgba(7,10,18,0) 36%, rgba(7,10,18,0.45) 100%)`
            : `linear-gradient(180deg, ${accent}14 0%, rgba(244,247,251,0) 34%, rgba(226,232,240,0.35) 100%)`,
          pointerEvents: 'none',
        }}
      />
      {/* Subtle outer editorial margin guides */}
      <div
        style={{
          position: 'absolute',
          left: 44,
          right: 44,
          top: 56,
          bottom: 56,
          border: `1px solid ${frameHairline}`,
          borderRadius: 18,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};

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
  height = 510,
  tiltDeg = 0,
  zoomFrom = 1.0,
  zoomTo = 1.07,
  panX = 0,
  panY = 0,
  dimmed = false,
  style,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const o = pop(frame, enterAt, fps, 155);
  const localF = Math.max(0, frame - enterAt);

  const floatY = Math.sin(localF / 30) * 4;
  const rotY = tiltDeg + Math.sin(localF / 40) * 1.4;
  const rotX = Math.cos(localF / 44) * 1.0;

  const zoom = interpolate(localF, [0, 240], [zoomFrom, zoomTo], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const sweepX = interpolate(localF, [4, 34], [-120, 140], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const isDark = mode === 'dark';
  const frameBg = isDark ? '#0b1120' : '#ffffff';
  const bezelBorder = isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(15, 23, 42, 0.14)';
  const statusDot = poster.isRumor ? '#f59e0b' : poster.accent;

  return (
    <div
      style={{
        width,
        height,
        borderRadius: 16,
        backgroundColor: frameBg,
        border: `1px solid ${bezelBorder}`,
        boxShadow: dimmed
          ? '0 14px 30px rgba(0,0,0,0.3)'
          : isDark
            ? '0 26px 56px rgba(0,0,0,0.62), inset 0 1px 0 rgba(255,255,255,0.12)'
            : '0 20px 44px rgba(15,23,42,0.14), inset 0 1px 0 rgba(255,255,255,0.9)',
        overflow: 'hidden',
        position: 'relative',
        opacity: dimmed ? 0.38 * o : Math.min(1, o),
        transform: `perspective(1200px) translateY(${(1 - o) * 28 + floatY}px) rotateY(${rotY}deg) rotateX(${rotX}deg) scale(${0.93 + 0.07 * o})`,
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

      {/* Specular light sweep on reveal */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(115deg, transparent 36%, rgba(255,255,255,0.18) 50%, transparent 64%)',
          transform: `translateX(${sweepX}%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Subtle architectural corner reticle ticks */}
      <div style={{position: 'absolute', top: 12, left: 12, width: 14, height: 14, borderTop: '1.5px solid rgba(255,255,255,0.38)', borderLeft: '1.5px solid rgba(255,255,255,0.38)', pointerEvents: 'none'}} />
      <div style={{position: 'absolute', top: 12, right: 12, width: 14, height: 14, borderTop: '1.5px solid rgba(255,255,255,0.38)', borderRight: '1.5px solid rgba(255,255,255,0.38)', pointerEvents: 'none'}} />

      {/* Integrated bottom matte caption bar (no floating corner pills) */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 44,
          padding: '0 20px',
          background: 'linear-gradient(180deg, rgba(6,10,18,0.62) 0%, rgba(6,10,18,0.88) 100%)',
          borderTop: '1px solid rgba(255,255,255,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backdropFilter: 'blur(6px)',
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: statusDot,
              boxShadow: `0 0 8px ${statusDot}`,
            }}
          />
          <span style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 15, color: '#f8fafc', letterSpacing: '0.07em'}}>
            {poster.badge}
          </span>
        </div>
        <span style={{fontFamily: FONT.mono, fontWeight: 600, fontSize: 14, color: '#cbd5e1', letterSpacing: '0.04em'}}>
          SRC // {poster.source}
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
  codeChip?: string;
  compact?: boolean;
}> = ({mode, accent, kicker, title, body, enterAt = 8, icon, tag, codeChip, compact = false}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = pal(mode);
  const o = pop(frame, enterAt, fps, 160);
  const isDark = mode === 'dark';
  const surface = isDark ? '#0e1526' : '#ffffff';
  const borderCol = isDark ? 'rgba(148, 163, 184, 0.20)' : 'rgba(15, 23, 42, 0.12)';
  const dividerCol = isDark ? 'rgba(148, 163, 184, 0.14)' : 'rgba(15, 23, 42, 0.09)';

  return (
    <div
      style={{
        width: '100%',
        borderRadius: 14,
        backgroundColor: surface,
        border: `1px solid ${borderCol}`,
        boxShadow: isDark
          ? '0 18px 40px rgba(0,0,0,0.48), inset 0 1px 0 rgba(255,255,255,0.08)'
          : '0 12px 28px rgba(15,23,42,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
        overflow: 'hidden',
        opacity: Math.min(1, o),
        transform: `translateY(${(1 - o) * 18}px)`,
      }}
    >
      {/* Top hairline metadata header (replaces AI-slop border-left + pill clutter) */}
      <div
        style={{
          padding: compact ? '10px 22px' : '12px 24px',
          borderBottom: `1px solid ${dividerCol}`,
          backgroundColor: isDark ? 'rgba(255,255,255,0.025)' : 'rgba(15,23,42,0.025)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
          <div style={{width: 7, height: 7, borderRadius: 2, backgroundColor: accent}} />
          <span style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 16, color: accent, letterSpacing: '0.07em'}}>
            {kicker}
          </span>
        </div>
        {tag ? (
          <span
            style={{
              fontFamily: FONT.mono,
              fontWeight: 700,
              fontSize: 14,
              color: p.muted,
              letterSpacing: '0.06em',
            }}
          >
            [{tag}]
          </span>
        ) : null}
      </div>

      {/* Card Body with decoupled inner accent bar (never curves at corners) */}
      <div
        style={{
          padding: compact ? '16px 22px' : '20px 24px',
          display: 'flex',
          alignItems: 'stretch',
          gap: 18,
        }}
      >
        <div
          style={{
            width: 3,
            borderRadius: 2,
            backgroundColor: accent,
            flexShrink: 0,
          }}
        />

        {icon ? (
          <div
            style={{
              width: compact ? 48 : 54,
              height: compact ? 48 : 54,
              borderRadius: 12,
              backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(15,23,42,0.04)',
              border: `1px solid ${dividerCol}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              alignSelf: 'center',
            }}
          >
            {icon}
          </div>
        ) : null}

        <div style={{flex: 1, minWidth: 0}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap'}}>
            <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: compact ? 27 : 29, color: p.ink, lineHeight: 1.15}}>
              {title}
            </div>
            {codeChip ? (
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontWeight: 700,
                  fontSize: 17,
                  color: accent,
                  backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,23,42,0.05)',
                  border: `1px solid ${borderCol}`,
                  padding: '3px 10px',
                  borderRadius: 6,
                }}
              >
                {codeChip}
              </span>
            ) : null}
          </div>
          <div style={{fontFamily: FONT.sans, fontWeight: 500, fontSize: compact ? 20 : 22, color: p.muted, marginTop: 6, lineHeight: 1.35}}>
            {body}
          </div>
        </div>
      </div>
    </div>
  );
};

export const StepStepper: React.FC<{
  mode: Mode;
  steps: {label: string; accent: string; active: boolean; done?: boolean; rumor?: boolean}[];
  enterAt?: number;
}> = ({mode, steps, enterAt = 4}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = pal(mode);
  const o = pop(frame, enterAt, fps);
  const isDark = mode === 'dark';

  return (
    <div
      style={{
        width: '100%',
        padding: '14px 20px',
        boxSizing: 'border-box',
        borderRadius: 12,
        backgroundColor: isDark ? 'rgba(14, 21, 38, 0.85)' : 'rgba(255, 255, 255, 0.9)',
        border: `1px solid ${isDark ? 'rgba(148,163,184,0.18)' : 'rgba(15,23,42,0.10)'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        opacity: Math.min(1, o),
        transform: `translateY(${(1 - o) * 10}px)`,
      }}
    >
      {steps.map((st, idx) => (
        <React.Fragment key={st.label}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 9,
              padding: '6px 12px',
              borderRadius: 8,
              backgroundColor: st.active ? `${st.accent}1f` : 'transparent',
              border: st.active ? `1px solid ${st.accent}66` : '1px solid transparent',
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: st.active || st.done ? st.accent : 'transparent',
                border: `2px solid ${st.active || st.done ? st.accent : p.muted}`,
                boxShadow: st.active ? `0 0 10px ${st.accent}` : 'none',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: FONT.mono,
                fontWeight: 700,
                fontSize: 16,
                color: st.active ? p.ink : st.done ? p.ink : p.muted,
                letterSpacing: '0.05em',
                whiteSpace: 'nowrap',
              }}
            >
              {st.label}
            </span>
          </div>
          {idx < steps.length - 1 ? (
            <div
              style={{
                flex: 1,
                height: 0,
                borderTop: steps[idx + 1].rumor
                  ? `2px dashed ${isDark ? 'rgba(148,163,184,0.35)' : 'rgba(15,23,42,0.22)'}`
                  : `2px solid ${st.done ? st.accent : isDark ? 'rgba(148,163,184,0.22)' : 'rgba(15,23,42,0.14)'}`,
                minWidth: 16,
              }}
            />
          ) : null}
        </React.Fragment>
      ))}
    </div>
  );
};

export const TelemetryStrip: React.FC<{
  mode: Mode;
  items: {label: string; value: string; accent?: string}[];
  enterAt?: number;
}> = ({mode, items, enterAt = 14}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = pal(mode);
  const o = pop(frame, enterAt, fps);
  const isDark = mode === 'dark';
  const borderCol = isDark ? 'rgba(148, 163, 184, 0.18)' : 'rgba(15, 23, 42, 0.11)';

  return (
    <div
      style={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: `repeat(${items.length}, 1fr)`,
        borderRadius: 12,
        backgroundColor: isDark ? '#0c1222' : '#ffffff',
        border: `1px solid ${borderCol}`,
        overflow: 'hidden',
        opacity: Math.min(1, o),
        transform: `translateY(${(1 - o) * 14}px)`,
      }}
    >
      {items.map((it, idx) => (
        <div
          key={it.label}
          style={{
            padding: '14px 18px',
            borderLeft: idx > 0 ? `1px solid ${borderCol}` : 'none',
          }}
        >
          <div style={{fontFamily: FONT.mono, fontWeight: 600, fontSize: 14, color: p.muted, letterSpacing: '0.06em'}}>
            {it.label}
          </div>
          <div
            style={{
              fontFamily: FONT.mono,
              fontWeight: 700,
              fontSize: 20,
              color: it.accent ?? p.ink,
              marginTop: 5,
              whiteSpace: 'nowrap',
            }}
          >
            {it.value}
          </div>
        </div>
      ))}
    </div>
  );
};
