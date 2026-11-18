import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import timeline from '../data/platypus-timeline.json';
import {ElainaGesture, ElainaPresenterAnchor} from '../components/ElainaPresenterAnchor';
import {pop} from '../lib/anim';
import {FONT, Mode} from '../lib/theme';

/* ───────── Real Per-Frame Audio Amplitude Helper for Elaina + Live Voice Pill ───────── */
export const ElainaStageAnchor: React.FC<{
  sceneId: string;
  gesture: ElainaGesture;
  gestureFrame?: number;
  side?: 'left' | 'right' | 'center';
  theme: Mode;
  size?: number;
  bottomOffset?: number;
  glowColor?: string;
  badgeText?: string;
}> = ({
  sceneId,
  gesture,
  gestureFrame,
  side = 'right',
  theme,
  size = 390,
  bottomOffset = 210,
  glowColor,
  badgeText = 'ELAINA · ANALISIS FAKTA',
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const scene = timeline.scenes.find((s) => s.id === sceneId);
  let audioAmplitude = 0;
  if (scene && Array.isArray(scene.amp)) {
    const voOffsetFrames = Math.round((scene.vo_start - scene.start) * fps);
    const ampIdx = frame - voOffsetFrames;
    if (ampIdx >= 0 && ampIdx < scene.amp.length) {
      audioAmplitude = scene.amp[ampIdx] ?? 0;
    }
  }

  const isDark = theme === 'dark';
  const accent = isDark ? '#38bdf8' : '#0284c7';
  const bars = [0.35, 0.72, 1.0, 0.65, 0.88, 0.48, 0.78];

  return (
    <>
      <ElainaPresenterAnchor
        gesture={gesture}
        gestureFrame={gestureFrame}
        hideBubble={true}
        size={size}
        bottomOffset={bottomOffset}
        side={side}
        theme={theme}
        mode="full"
        showMagicParticles={true}
        enableBlink={false}
        audioAmplitude={audioAmplitude}
        glowColor={glowColor}
      />

      {/* Minimal Live Voice Waveform Pill on the opposite side of Elaina */}
      {side !== 'center' && (
        <div
          style={{
            position: 'absolute',
            bottom: bottomOffset + 85,
            left: side === 'right' ? 72 : 'auto',
            right: side === 'left' ? 72 : 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '12px 20px',
            borderRadius: 999,
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.92)',
            border: isDark ? '1.5px solid rgba(56, 189, 248, 0.35)' : '1.5px solid rgba(15, 23, 42, 0.12)',
            boxShadow: isDark ? '0 12px 28px rgba(0,0,0,0.45)' : '0 10px 24px rgba(15,23,42,0.08)',
            zIndex: 45,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 4, height: 26}}>
            {bars.map((mult, idx) => {
              const wave = Math.abs(Math.sin(frame * 0.25 + idx * 0.9));
              const h = 6 + (audioAmplitude * 18 * mult) + wave * (audioAmplitude > 0.05 ? 6 : 2);
              return (
                <div
                  key={idx}
                  style={{
                    width: 4,
                    height: Math.min(26, Math.max(5, h)),
                    borderRadius: 999,
                    backgroundColor: accent,
                  }}
                />
              );
            })}
          </div>
          <span
            style={{
              fontFamily: FONT.mono,
              fontWeight: 700,
              fontSize: 15,
              letterSpacing: '0.05em',
              color: isDark ? '#e2e8f0' : '#0f172a',
            }}
          >
            {badgeText}
          </span>
        </div>
      )}
    </>
  );
};

/* ───────── Authentic Photo Studio Frame (Ken Burns + Shine + Source Tag) ───────── */
export const PhotoFrame: React.FC<{
  src: string;
  mode: Mode;
  width: number;
  height: number;
  enterAt?: number;
  tiltDeg?: number;
  zoomFrom?: number;
  zoomTo?: number;
  tag?: string;
  accent?: string;
  objectPosition?: string;
  style?: React.CSSProperties;
}> = ({
  src,
  mode,
  width,
  height,
  enterAt = 0,
  tiltDeg = 0,
  zoomFrom = 1.0,
  zoomTo = 1.06,
  tag,
  accent = '#38bdf8',
  objectPosition = 'center center',
  style,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const o = pop(frame, enterAt, fps, 165);
  const localF = Math.max(0, frame - enterAt);
  const isDark = mode === 'dark';

  const floatY = Math.sin(localF / 30) * 3.5;
  const zoom = interpolate(localF, [0, 320], [zoomFrom, zoomTo], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const sweepX = interpolate(localF, [4, 34], [-130, 145], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: Math.min(1, o),
        transform: `perspective(1200px) translateY(${(1 - o) * 22 + floatY}px) rotate(${tiltDeg}deg) scale(${0.93 + 0.07 * o})`,
        ...style,
      }}
    >
      <div
        style={{
          width,
          height,
          borderRadius: 18,
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: isDark ? '#111622' : '#ffffff',
          border: isDark ? '1.5px solid rgba(255,255,255,0.14)' : '1.5px solid rgba(15,23,42,0.12)',
          boxShadow: isDark
            ? '0 24px 56px rgba(0,0,0,0.72)'
            : '0 20px 44px rgba(15,23,42,0.14)',
        }}
      >
        <Img
          src={staticFile(src)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition,
            transform: `scale(${zoom})`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(115deg, transparent 36%, rgba(255,255,255,0.18) 50%, transparent 64%)',
            transform: `translateX(${sweepX}%)`,
            pointerEvents: 'none',
          }}
        />
        {tag ? (
          <div
            style={{
              position: 'absolute',
              top: 14,
              left: 14,
              padding: '6px 13px',
              borderRadius: 999,
              backgroundColor: 'rgba(11, 15, 25, 0.84)',
              border: `1.5px solid ${accent}`,
              fontFamily: FONT.mono,
              fontWeight: 700,
              fontSize: 15,
              color: '#f8fafc',
              letterSpacing: '0.05em',
              backdropFilter: 'blur(6px)',
            }}
          >
            {tag}
          </div>
        ) : null}
      </div>
    </div>
  );
};

/* ───────── Diagonal Transition Sweep (Witch Violet + Aqua Teal) ───────── */
export const PlatypusTransitionSweep: React.FC<{atFrame: number; half?: number}> = ({
  atFrame,
  half = 12,
}) => {
  const frame = useCurrentFrame();
  const s = atFrame - half;
  const e = atFrame + half;
  if (frame < s || frame > e) return null;
  const u = (frame - s) / (e - s);
  const ease = Easing.inOut(Easing.cubic);
  const xLead = interpolate(u, [0, 1], [-108, 108], {easing: ease});
  const xLag = interpolate(Math.max(0, u - 0.09) / 0.91, [0, 1], [-108, 108], {easing: ease});
  const emblemOp = Math.pow(Math.sin(Math.PI * u), 3);

  return (
    <AbsoluteFill style={{pointerEvents: 'none', zIndex: 90, overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          inset: '-8% -24%',
          transform: `translateX(${xLag}%) skewX(-14deg)`,
          background: 'linear-gradient(120deg, #0f172a 0%, #3b0764 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: '-8% -24%',
          transform: `translateX(${xLead}%) skewX(-14deg)`,
          background: 'linear-gradient(120deg, #0284c7 0%, #38bdf8 55%, #a855f7 100%)',
          boxShadow: 'inset 10px 0 0 rgba(255,255,255,0.45), 0 0 60px rgba(56,189,248,0.55)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: emblemOp,
          transform: `scale(${0.7 + 0.4 * Math.sin(Math.PI * u)}) rotate(${(u - 0.5) * 24}deg)`,
        }}
      >
        <div
          style={{
            width: 112,
            height: 112,
            borderRadius: 28,
            background: '#0b0b0d',
            border: '2px solid rgba(255,255,255,0.28)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 24px 60px rgba(0,0,0,0.45)',
          }}
        >
          <Img src={staticFile('assets/portfolio/rhmt-mark.svg')} style={{width: 60, height: 60}} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ───────── Crisp Bespoke Vector SVG Icons (Zero Emojis) ───────── */
export const IconBioSearch: React.FC<{size?: number; color?: string}> = ({
  size = 24,
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <path d="M9 11h4M11 9v4" />
  </svg>
);

export const IconAlertTriangle: React.FC<{size?: number; color?: string}> = ({
  size = 24,
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

export const IconDroplet: React.FC<{size?: number; color?: string}> = ({
  size = 24,
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </svg>
);

export const IconSyringe: React.FC<{size?: number; color?: string}> = ({
  size = 24,
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2l4 4" />
    <path d="M17 7l3-3" />
    <path d="M19 9L8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5" />
    <path d="M9 11l4 4" />
    <path d="M5 19l-3 3" />
  </svg>
);

export const IconMapPin: React.FC<{size?: number; color?: string}> = ({
  size = 24,
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const IconCheckBadge: React.FC<{size?: number; color?: string}> = ({
  size = 24,
  color = 'currentColor',
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <polyline points="8.5 12.5 11 15 16 9.5" />
  </svg>
);
