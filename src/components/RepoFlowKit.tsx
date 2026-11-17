import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {FONT, Mode} from '../lib/theme';
import {pop} from '../lib/anim';

export const REPOFLOW_THEME = {
  dark: {
    bg: '#070A0F',
    surface: '#0B1019',
    surfaceRaised: '#111827',
    well: '#05080C',
    border: '#1E293B',
    borderStrong: '#334155',
    grid: 'rgba(56, 189, 248, 0.05)',
    ink: '#F1F5F9',
    ink2: '#CBD5E1',
    muted: '#94A3B8',
    cyan: '#38BDF8',
    cyanSoft: 'rgba(56, 189, 248, 0.16)',
    gold: '#EAB308',
    goldSoft: 'rgba(234, 179, 8, 0.16)',
    emerald: '#10B981',
    emeraldSoft: 'rgba(16, 185, 129, 0.16)',
    rose: '#F43F5E',
    roseSoft: 'rgba(244, 63, 94, 0.16)',
    shadow: '0 10px 0 rgba(0, 0, 0, 0.55)',
    shadowSm: '0 6px 0 rgba(0, 0, 0, 0.45)',
  },
  light: {
    bg: '#F8FAFC',
    surface: '#FFFFFF',
    surfaceRaised: '#F1F5F9',
    well: '#E2E8F0',
    border: '#CBD5E1',
    borderStrong: '#94A3B8',
    grid: 'rgba(15, 23, 42, 0.04)',
    ink: '#0F172A',
    ink2: '#334155',
    muted: '#64748B',
    cyan: '#0284C7',
    cyanSoft: 'rgba(2, 132, 199, 0.14)',
    gold: '#D97706',
    goldSoft: 'rgba(217, 119, 6, 0.14)',
    emerald: '#059669',
    emeraldSoft: 'rgba(5, 150, 105, 0.14)',
    rose: '#E11D48',
    roseSoft: 'rgba(225, 29, 72, 0.14)',
    shadow: '0 10px 0 rgba(15, 23, 42, 0.10)',
    shadowSm: '0 6px 0 rgba(15, 23, 42, 0.08)',
  },
} as const;

export const REPOFLOW_STEPS = [
  {code: '01', label: 'PROBLEM'},
  {code: '02', label: 'WORKBENCH'},
  {code: '03', label: '1-REF ATOMIC'},
  {code: '04', label: 'AES-256'},
  {code: '05', label: 'REPOFLOW'},
] as const;

/* Official Google Gemini 4-Point Sparkle SVG */
export const GeminiSparkSvg: React.FC<{size?: number; color?: string; rotate?: number}> = ({
  size = 24,
  color = '#38BDF8',
  rotate = 0,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    style={{transform: `rotate(${rotate}deg)`, flexShrink: 0}}
  >
    <path
      d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z"
      fill={color}
    />
  </svg>
);

/* Clean Background Canvas with Blueprint Tech Grid */
export const RepoFlowCanvas: React.FC<{mode: Mode}> = ({mode}) => {
  const t = REPOFLOW_THEME[mode];
  return (
    <AbsoluteFill style={{backgroundColor: t.bg}}>
      <AbsoluteFill
        style={{
          backgroundImage: `
            linear-gradient(to right, ${t.grid} 1px, transparent 1px),
            linear-gradient(to bottom, ${t.grid} 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 44,
          right: 44,
          top: 38,
          bottom: 38,
          border: `1.5px solid ${t.border}`,
          borderRadius: 28,
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};

/* Top App Header with Personal Branding & System Telemetry */
export const RepoFlowHeader: React.FC<{
  mode: Mode;
  index: number;
  total: number;
  statusText?: string;
  accent?: string;
}> = ({mode, index, total, statusText = 'ONLINE', accent}) => {
  const frame = useCurrentFrame();
  const t = REPOFLOW_THEME[mode];
  const ac = accent || t.cyan;
  const pulse = 0.55 + 0.45 * Math.sin(frame * 0.22);

  return (
    <div
      style={{
        position: 'absolute',
        top: 62,
        left: 68,
        right: 68,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 30,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '8px 18px 8px 10px',
          borderRadius: 999,
          backgroundColor: t.surface,
          border: `1.5px solid ${t.borderStrong}`,
        }}
      >
        <Img
          src={staticFile('assets/repoflow/icon.png')}
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            objectFit: 'cover',
            border: `2px solid ${ac}`,
          }}
        />
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <span
            style={{
              fontFamily: FONT.mono,
              fontWeight: 800,
              fontSize: 20,
              color: t.ink,
              letterSpacing: '0.02em',
              lineHeight: 1.1,
            }}
          >
            RepoFlow
          </span>
          <span
            style={{
              fontFamily: FONT.mono,
              fontWeight: 600,
              fontSize: 13,
              color: t.muted,
              letterSpacing: '0.04em',
            }}
          >
            by rhmt ofc
          </span>
        </div>
      </div>

      <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 18px',
            borderRadius: 999,
            backgroundColor: t.surface,
            border: `1.5px solid ${t.borderStrong}`,
          }}
        >
          <span
            style={{
              width: 11,
              height: 11,
              borderRadius: '50%',
              backgroundColor: ac,
              opacity: pulse,
              boxShadow: `0 0 10px ${ac}`,
            }}
          />
          <span
            style={{
              fontFamily: FONT.mono,
              fontWeight: 800,
              fontSize: 17,
              color: t.ink,
              letterSpacing: '0.06em',
            }}
          >
            {statusText}
          </span>
        </div>

        <div
          style={{
            padding: '10px 18px',
            borderRadius: 999,
            backgroundColor: t.surfaceRaised,
            border: `1.5px solid ${t.borderStrong}`,
            fontFamily: FONT.mono,
            fontWeight: 800,
            fontSize: 18,
            color: ac,
            letterSpacing: '0.04em',
          }}
        >
          {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

/* Zona 1: Top Hook Title with Figma Anchor Selection Frame */
export const RepoFlowFigmaAnchorFrame: React.FC<{
  children: React.ReactNode;
  active?: boolean;
  color?: string;
}> = ({children, active = true, color = '#38BDF8'}) => {
  const dotSize = 8;
  const dots = [
    {top: -dotSize / 2, left: -dotSize / 2},
    {top: -dotSize / 2, left: '50%', transform: 'translateX(-50%)'},
    {top: -dotSize / 2, right: -dotSize / 2},
    {top: '50%', left: -dotSize / 2, transform: 'translateY(-50%)'},
    {top: '50%', right: -dotSize / 2, transform: 'translateY(-50%)'},
    {bottom: -dotSize / 2, left: -dotSize / 2},
    {bottom: -dotSize / 2, left: '50%', transform: 'translateX(-50%)'},
    {bottom: -dotSize / 2, right: -dotSize / 2},
  ];

  return (
    <span
      style={{
        position: 'relative',
        display: 'inline-block',
        padding: '3px 12px',
        margin: '0 4px',
        border: active ? `2px solid ${color}` : '2px dashed transparent',
        borderRadius: 6,
        backgroundColor: active ? `${color}18` : 'transparent',
      }}
    >
      {active &&
        dots.map((d, i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              width: dotSize,
              height: dotSize,
              backgroundColor: '#FFFFFF',
              border: `1.5px solid ${color}`,
              borderRadius: 2,
              pointerEvents: 'none',
              ...d,
            }}
          />
        ))}
      {children}
    </span>
  );
};

export const RepoFlowTopHook: React.FC<{
  mode: Mode;
  badge: string;
  badgeColor?: string;
  pre: string;
  focal: string;
  post?: string;
  accent?: string;
}> = ({mode, badge, badgeColor, pre, focal, post, accent}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = REPOFLOW_THEME[mode];
  const ac = accent || t.cyan;
  const bColor = badgeColor || ac;
  const p = spring({frame, fps, config: {damping: 14, stiffness: 160}});

  return (
    <div
      style={{
        position: 'absolute',
        top: 154,
        left: 68,
        right: 68,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 12,
        zIndex: 25,
        opacity: p,
        transform: `translateY(${(1 - p) * 16}px)`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '6px 14px',
          borderRadius: 999,
          backgroundColor: mode === 'dark' ? '#090D14' : '#FFFFFF',
          border: `2px solid ${bColor}`,
        }}
      >
        <GeminiSparkSvg size={18} color={bColor} rotate={frame * 2} />
        <span
          style={{
            fontFamily: FONT.mono,
            fontWeight: 800,
            fontSize: 18,
            color: bColor,
            letterSpacing: '0.08em',
          }}
        >
          {badge}
        </span>
      </div>

      <div
        style={{
          fontFamily: FONT.space,
          fontWeight: 800,
          fontSize: 50,
          color: t.ink,
          lineHeight: 1.14,
          letterSpacing: '-0.025em',
        }}
      >
        {pre}{' '}
        <RepoFlowFigmaAnchorFrame color={ac}>{focal}</RepoFlowFigmaAnchorFrame>
        {post ? ` ${post}` : ''}
      </div>
    </div>
  );
};

/* Zona 2: Breadcrumb Horizontal Stepper (Standard Bendalogi) */
export const RepoFlowStepper: React.FC<{
  mode: Mode;
  currentStep: number;
  metricText?: string;
  accent?: string;
}> = ({mode, currentStep, metricText, accent}) => {
  const t = REPOFLOW_THEME[mode];
  const ac = accent || t.cyan;

  return (
    <div
      style={{
        position: 'absolute',
        top: 366,
        left: 68,
        right: 68,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 18px',
        borderRadius: 16,
        backgroundColor: t.surface,
        border: `1.5px solid ${t.borderStrong}`,
        zIndex: 25,
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
        {REPOFLOW_STEPS.map((s, idx) => {
          const isDone = idx < currentStep;
          const isActive = idx === currentStep;
          const nodeColor = isActive ? ac : isDone ? t.emerald : t.muted;

          return (
            <React.Fragment key={s.code}>
              <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    backgroundColor: isActive ? ac : isDone ? t.emerald : 'transparent',
                    border: `2px solid ${nodeColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: FONT.mono,
                    fontWeight: 800,
                    fontSize: 13,
                    color: isActive || isDone ? (mode === 'dark' ? '#070A0F' : '#FFFFFF') : t.muted,
                    boxShadow: isActive ? `0 0 10px ${ac}` : 'none',
                  }}
                >
                  {isDone ? '✓' : s.code}
                </div>
                <span
                  style={{
                    fontFamily: FONT.mono,
                    fontWeight: isActive ? 800 : 600,
                    fontSize: 16,
                    color: isActive ? t.ink : t.muted,
                    letterSpacing: '0.04em',
                  }}
                >
                  {s.label}
                </span>
              </div>
              {idx < REPOFLOW_STEPS.length - 1 && (
                <div
                  style={{
                    width: 18,
                    height: 2,
                    backgroundColor: idx < currentStep ? t.emerald : t.border,
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {metricText && (
        <div
          style={{
            fontFamily: FONT.mono,
            fontWeight: 800,
            fontSize: 16,
            color: ac,
            letterSpacing: '0.04em',
            padding: '4px 12px',
            borderRadius: 8,
            backgroundColor: t.surfaceRaised,
            border: `1px solid ${t.border}`,
          }}
        >
          {metricText}
        </div>
      )}
    </div>
  );
};

/* Bespoke Spatial Workbench 3D Plate SVG Assembly (Original RepoFlow Identity) */
export const SpatialWorkbenchPlateSvg: React.FC<{
  size?: number;
  rotation?: number;
  pulseGlow?: number;
}> = ({size = 460, rotation = 0, pulseGlow = 1}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 400 400"
      fill="none"
      style={{overflow: 'visible'}}
    >
      <defs>
        <linearGradient id="rfRailCyan" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#dce5f2" stopOpacity="0.2" />
          <stop offset="45%" stopColor="#38bdf8" />
          <stop offset="75%" stopColor="#dce5f2" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>

        <linearGradient id="rfRailGold" x1="400" y1="0" x2="0" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#eab308" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.6" />
        </linearGradient>

        <radialGradient id="rfCoreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </radialGradient>

        <filter id="rfGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Hexagon Substrate Backplate */}
      <polygon
        points="200,40 340,120 340,280 200,360 60,280 60,120"
        fill="#070c14"
        stroke="rgba(56, 189, 248, 0.28)"
        strokeWidth="2"
      />

      {/* Cross Grid Lines */}
      <line x1="200" y1="65" x2="200" y2="335" stroke="rgba(175, 191, 218, 0.2)" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="85" y1="200" x2="315" y2="200" stroke="rgba(175, 191, 218, 0.2)" strokeWidth="1.5" strokeDasharray="4 4" />

      {/* Intersecting Elliptical Orbit Rails */}
      <g transform={`rotate(${rotation} 200 200)`}>
        <ellipse
          cx="200"
          cy="200"
          rx="160"
          ry="90"
          transform="rotate(-24 200 200)"
          stroke="url(#rfRailCyan)"
          strokeWidth="3.5"
          filter="url(#rfGlow)"
        />
        <circle cx="90" cy="155" r="7" fill="#38bdf8" filter="url(#rfGlow)" />
        <circle cx="310" cy="245" r="5" fill="#fef08a" />
      </g>

      <g transform={`rotate(${-rotation * 0.75} 200 200)`}>
        <ellipse
          cx="200"
          cy="200"
          rx="150"
          ry="80"
          transform="rotate(42 200 200)"
          stroke="url(#rfRailGold)"
          strokeWidth="2.5"
          strokeDasharray="6 6"
        />
        <circle cx="280" cy="120" r="6" fill="#eab308" filter="url(#rfGlow)" />
      </g>

      {/* Central Pulsing Atomic Git Nucleus */}
      <circle
        cx="200"
        cy="200"
        r={38 * pulseGlow}
        fill="rgba(56, 189, 248, 0.14)"
        stroke="#38bdf8"
        strokeWidth="2"
      />
      <circle
        cx="200"
        cy="200"
        r={22 * pulseGlow}
        fill="url(#rfCoreGlow)"
        filter="url(#rfGlow)"
      />
      <circle cx="200" cy="200" r="7" fill="#ffffff" />
    </svg>
  );
};

/* Zona 3: Interactive Forensic Stage Wrapper */
export const RepoFlowStageCard: React.FC<{
  mode: Mode;
  title: string;
  badge?: string;
  badgeColor?: string;
  accent?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({mode, title, badge, badgeColor, accent, children, style}) => {
  const t = REPOFLOW_THEME[mode];
  const ac = accent || t.cyan;
  const bColor = badgeColor || ac;

  return (
    <div
      style={{
        position: 'absolute',
        top: 440,
        left: 68,
        right: 68,
        height: 820,
        backgroundColor: t.surface,
        border: `2px solid ${t.borderStrong}`,
        borderRadius: 24,
        boxShadow: t.shadow,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        zIndex: 20,
        ...style,
      }}
    >
      {/* Chrome Window Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px',
          borderBottom: `1.5px solid ${t.border}`,
          backgroundColor: t.surfaceRaised,
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
          <span style={{width: 14, height: 14, borderRadius: '50%', backgroundColor: '#ef4444'}} />
          <span style={{width: 14, height: 14, borderRadius: '50%', backgroundColor: '#f59e0b'}} />
          <span style={{width: 14, height: 14, borderRadius: '50%', backgroundColor: '#10b981'}} />
          <span
            style={{
              fontFamily: FONT.mono,
              fontWeight: 700,
              fontSize: 18,
              color: t.ink,
              marginLeft: 12,
              letterSpacing: '0.04em',
            }}
          >
            {title}
          </span>
        </div>

        {badge && (
          <div
            style={{
              padding: '4px 12px',
              borderRadius: 8,
              backgroundColor: mode === 'dark' ? '#070A0F' : '#FFFFFF',
              border: `1.5px solid ${bColor}`,
              fontFamily: FONT.mono,
              fontWeight: 800,
              fontSize: 15,
              color: bColor,
              letterSpacing: '0.05em',
            }}
          >
            {badge}
          </div>
        )}
      </div>

      {/* Main Forensic Content Area */}
      <div
        style={{
          flex: 1,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {children}
      </div>
    </div>
  );
};

/* Zona 4: Telemetry Status Companion Bar above Subtitles */
export const RepoFlowTelemetryBar: React.FC<{
  mode: Mode;
  metricLabel: string;
  metricValue: string;
  tag: string;
  accent?: string;
}> = ({mode, metricLabel, metricValue, tag, accent}) => {
  const frame = useCurrentFrame();
  const t = REPOFLOW_THEME[mode];
  const ac = accent || t.cyan;

  return (
    <div
      style={{
        position: 'absolute',
        left: 68,
        right: 68,
        bottom: 248,
        padding: '14px 22px',
        borderRadius: 18,
        backgroundColor: t.surface,
        border: `1.5px solid ${t.borderStrong}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 25,
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
        <div
          style={{
            padding: '5px 12px',
            borderRadius: 6,
            backgroundColor: t.well,
            border: `1px solid ${ac}`,
            fontFamily: FONT.mono,
            fontWeight: 800,
            fontSize: 15,
            color: ac,
          }}
        >
          {tag}
        </div>
        <span
          style={{
            fontFamily: FONT.mono,
            fontWeight: 700,
            fontSize: 19,
            color: t.ink,
          }}
        >
          {metricLabel}: <strong style={{color: ac}}>{metricValue}</strong>
        </span>
      </div>

      <div style={{display: 'flex', alignItems: 'flex-end', gap: 5, height: 24}}>
        {[0.6, 1, 0.75, 0.9, 0.5, 0.85].map((h, i) => {
          const val = 0.35 + 0.65 * Math.abs(Math.sin(frame * 0.2 + i * 0.9));
          return (
            <div
              key={i}
              style={{
                width: 5,
                height: Math.round(24 * h * val),
                borderRadius: 3,
                backgroundColor: ac,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
