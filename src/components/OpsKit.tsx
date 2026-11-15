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

export const OPS_THEME = {
  dark: {
    bg: '#090B0E',
    surface: '#12151B',
    surfaceRaised: '#191D26',
    well: '#0E1117',
    border: '#2A3140',
    borderStrong: '#3C4659',
    dot: 'rgba(255, 255, 255, 0.08)',
    ink: '#F4F6FA',
    ink2: '#CBD3DF',
    muted: '#8D97AA',
    amber: '#F59E0B',
    amberSoft: 'rgba(245, 158, 11, 0.18)',
    emerald: '#10B981',
    emeraldSoft: 'rgba(16, 185, 129, 0.18)',
    cyan: '#38BDF8',
    cyanSoft: 'rgba(56, 189, 248, 0.18)',
    shadow: '0 10px 0 rgba(0, 0, 0, 0.45)',
    shadowSm: '0 6px 0 rgba(0, 0, 0, 0.40)',
  },
  light: {
    bg: '#F6F5F0',
    surface: '#FFFFFF',
    surfaceRaised: '#ECEAE1',
    well: '#E9E6DC',
    border: '#D5D0C3',
    borderStrong: '#B7B09E',
    dot: 'rgba(17, 19, 24, 0.10)',
    ink: '#111318',
    ink2: '#373E4B',
    muted: '#5D6472',
    amber: '#D97706',
    amberSoft: 'rgba(217, 119, 6, 0.15)',
    emerald: '#059669',
    emeraldSoft: 'rgba(5, 150, 105, 0.15)',
    cyan: '#0284C7',
    cyanSoft: 'rgba(2, 132, 199, 0.15)',
    shadow: '0 10px 0 rgba(17, 19, 24, 0.10)',
    shadowSm: '0 6px 0 rgba(17, 19, 24, 0.09)',
  },
} as const;

export const PIPELINE_STEPS = [
  {code: '01', label: 'INGRESS'},
  {code: '02', label: 'BRIDGE'},
  {code: '03', label: 'AGENT'},
  {code: '04', label: 'WEB UI'},
  {code: '05', label: 'RHMT OFC'},
] as const;

/* Official 4-point Gemini Sparkle SVG */
export const GeminiSparkSvg: React.FC<{size?: number; color?: string; rotate?: number}> = ({
  size = 24,
  color = '#F59E0B',
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

export const OpsCanvas: React.FC<{mode: Mode}> = ({mode}) => {
  const t = OPS_THEME[mode];
  return (
    <AbsoluteFill style={{backgroundColor: t.bg}}>
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${t.dot} 1.5px, transparent 1.5px)`,
          backgroundSize: '36px 36px',
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
          opacity: 0.45,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};

/* Crisp Top Bar with PP Dev Profile Avatar (Large, Mobile-Readable) */
export const OpsHeader: React.FC<{
  mode: Mode;
  index: number;
  total: number;
  statusText?: string;
  accent?: string;
}> = ({mode, index, total, statusText = 'LIVE', accent}) => {
  const frame = useCurrentFrame();
  const t = OPS_THEME[mode];
  const pulse = 0.55 + 0.45 * Math.sin(frame * 0.22);
  const dotColor = accent || t.emerald;

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
          src={staticFile('assets/ops/pp-dev.png')}
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            objectFit: 'cover',
            border: `2px solid ${t.amber}`,
          }}
        />
        <span
          style={{
            fontFamily: FONT.mono,
            fontWeight: 800,
            fontSize: 21,
            color: t.ink,
            letterSpacing: '0.03em',
          }}
        >
          rhmt ofc
        </span>
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
              backgroundColor: dotColor,
              opacity: pulse,
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontFamily: FONT.mono,
              fontWeight: 800,
              fontSize: 18,
              color: t.ink,
              letterSpacing: '0.04em',
            }}
          >
            {statusText}
          </span>
        </div>

        <div
          style={{
            padding: '10px 16px',
            borderRadius: 14,
            backgroundColor: t.surface,
            border: `1.5px solid ${t.borderStrong}`,
            fontFamily: FONT.mono,
            fontWeight: 800,
            fontSize: 19,
            color: t.ink,
          }}
        >
          0{index}/0{total}
        </div>
      </div>
    </div>
  );
};

/* Zona 1: Bold Kinetic Headline (Large TikTok-Scale Typography) */
export const OpsHook: React.FC<{
  mode: Mode;
  kicker: string;
  headlineTop: string;
  highlight: string;
  accent?: string;
}> = ({mode, kicker, headlineTop, highlight, accent}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = OPS_THEME[mode];
  const ac = accent || t.amber;

  const p1 = pop(frame, 1, fps, 170);
  const p2 = pop(frame, 7, fps, 160);
  const barW = spring({frame: frame - 12, fps, config: {damping: 16, stiffness: 120}});

  return (
    <div
      style={{
        position: 'absolute',
        top: 144,
        left: 68,
        right: 68,
        zIndex: 25,
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          opacity: p1,
          transform: `translateY(${(1 - p1) * 14}px)`,
          marginBottom: 10,
        }}
      >
        <GeminiSparkSvg size={22} color={ac} rotate={frame * 1.4} />
        <span
          style={{
            fontFamily: FONT.mono,
            fontWeight: 800,
            fontSize: 20,
            color: ac,
            letterSpacing: '0.09em',
            textTransform: 'uppercase',
          }}
        >
          {kicker}
        </span>
      </div>

      <div
        style={{
          fontFamily: FONT.space,
          fontWeight: 700,
          fontSize: 48,
          lineHeight: 1.12,
          letterSpacing: '-0.025em',
          color: t.ink2,
          opacity: p1,
          transform: `translateY(${(1 - p1) * 18}px)`,
        }}
      >
        {headlineTop}
      </div>

      <div
        style={{
          position: 'relative',
          display: 'inline-block',
          marginTop: 10,
          padding: '10px 24px',
          backgroundColor: mode === 'dark' ? t.surfaceRaised : '#FFFFFF',
          border: `2.5px solid ${ac}`,
          borderRadius: 16,
          boxShadow: t.shadowSm,
          opacity: p2,
          transform: `translateY(${(1 - p2) * 18}px) scale(${0.94 + 0.06 * p2})`,
        }}
      >
        <span
          style={{
            position: 'absolute',
            left: -2,
            top: 12,
            bottom: 12,
            width: 6,
            borderRadius: 4,
            backgroundColor: ac,
          }}
        />
        <span
          style={{
            fontFamily: FONT.space,
            fontWeight: 800,
            fontSize: 54,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: t.ink,
            paddingLeft: 10,
          }}
        >
          {highlight}
        </span>
        <div
          style={{
            position: 'absolute',
            left: 18,
            right: 18,
            bottom: -2,
            height: 4,
            backgroundColor: ac,
            transformOrigin: 'left',
            transform: `scaleX(${barW})`,
            borderRadius: 2,
          }}
        />
      </div>
    </div>
  );
};

/* Zona 2: Sleek Clean Pipeline Rail (Uncluttered & Readable) */
export const OpsPipelineRail: React.FC<{
  mode: Mode;
  activeIdx: number;
  accent?: string;
}> = ({mode, activeIdx, accent}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = OPS_THEME[mode];
  const ac = accent || t.amber;
  const p = pop(frame, 4, fps, 160);

  return (
    <div
      style={{
        position: 'absolute',
        top: 398,
        left: 68,
        right: 68,
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 10,
        opacity: p,
        transform: `translateY(${(1 - p) * 10}px)`,
        zIndex: 25,
      }}
    >
      {PIPELINE_STEPS.map((st, idx) => {
        const done = idx < activeIdx;
        const active = idx === activeIdx;
        const borderColor = active ? ac : done ? t.emerald : t.border;
        const textColor = active ? t.ink : done ? t.emerald : t.muted;

        return (
          <div
            key={st.code}
            style={{
              backgroundColor: active ? t.surfaceRaised : t.surface,
              border: `2px solid ${borderColor}`,
              borderRadius: 12,
              padding: '10px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 6,
            }}
          >
            <span
              style={{
                fontFamily: FONT.mono,
                fontWeight: active ? 800 : 700,
                fontSize: 16,
                color: textColor,
                whiteSpace: 'nowrap',
              }}
            >
              {st.label}
            </span>
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: '50%',
                backgroundColor: active ? ac : done ? t.emerald : 'transparent',
                border: active || done ? 'none' : `2px solid ${t.muted}`,
                flexShrink: 0,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export const cubicPoint = (
  p0: [number, number],
  p1: [number, number],
  p2: [number, number],
  p3: [number, number],
  u: number
): [number, number] => {
  const m = 1 - u;
  const x =
    m * m * m * p0[0] +
    3 * m * m * u * p1[0] +
    3 * m * u * u * p2[0] +
    u * u * u * p3[0];
  const y =
    m * m * m * p0[1] +
    3 * m * m * u * p1[1] +
    3 * m * u * u * p2[1] +
    u * u * u * p3[1];
  return [x, y];
};

export const OpsBezierWire: React.FC<{
  p0: [number, number];
  p1: [number, number];
  p2: [number, number];
  p3: [number, number];
  color: string;
  active?: boolean;
  speed?: number;
  phaseOffset?: number;
  bidirectional?: boolean;
  label?: string;
  labelBg?: string;
  labelColor?: string;
}> = ({
  p0,
  p1,
  p2,
  p3,
  color,
  active = true,
  speed = 0.026,
  phaseOffset = 0,
  bidirectional = false,
  label,
  labelBg = '#12151B',
  labelColor = '#F4F6FA',
}) => {
  const frame = useCurrentFrame();
  const d = `M ${p0[0]} ${p0[1]} C ${p1[0]} ${p1[1]}, ${p2[0]} ${p2[1]}, ${p3[0]} ${p3[1]}`;
  const u = (frame * speed + phaseOffset) % 1;
  const [px, py] = cubicPoint(p0, p1, p2, p3, u);
  const [mx, my] = cubicPoint(p0, p1, p2, p3, 0.5);

  const uRev = (1 - ((frame * speed + phaseOffset + 0.5) % 1)) % 1;
  const [rx, ry] = cubicPoint(p0, p1, p2, p3, uRev);

  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={active ? 4.5 : 2.5}
        strokeOpacity={active ? 0.35 : 0.25}
      />
      {active && (
        <path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={4.5}
          strokeDasharray="12 12"
          strokeDashoffset={-frame * 3.6}
          strokeLinecap="round"
        />
      )}
      <circle cx={p0[0]} cy={p0[1]} r={6} fill={color} />
      <circle cx={p3[0]} cy={p3[1]} r={6} fill={color} />
      {active && (
        <>
          <circle cx={px} cy={py} r={11} fill={color} fillOpacity={0.28} />
          <circle cx={px} cy={py} r={6.5} fill={color} />
        </>
      )}
      {active && bidirectional && (
        <>
          <circle cx={rx} cy={ry} r={10} fill={color} fillOpacity={0.28} />
          <circle cx={rx} cy={ry} r={5.5} fill={color} />
        </>
      )}
      {label && (
        <g transform={`translate(${mx}, ${my})`}>
          <rect
            x={-62}
            y={-20}
            width={124}
            height={40}
            rx={11}
            fill={labelBg}
            stroke={color}
            strokeWidth={2}
          />
          <text
            x={0}
            y={6}
            textAnchor="middle"
            fill={labelColor}
            fontFamily="JetBrains Mono, monospace"
            fontWeight="800"
            fontSize="17"
          >
            {label}
          </text>
        </g>
      )}
    </g>
  );
};

/* Tactile Large Mobile-First Node Card */
export const OpsNodeBox: React.FC<{
  mode: Mode;
  title: string;
  subtitle: string;
  badge?: string;
  badgeColor?: string;
  accent?: string;
  active?: boolean;
  iconImg?: string;
  iconSvg?: React.ReactNode;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({
  mode,
  title,
  subtitle,
  badge,
  badgeColor,
  accent,
  active = false,
  iconImg,
  iconSvg,
  style,
  children,
}) => {
  const t = OPS_THEME[mode];
  const ac = accent || t.amber;
  const bColor = badgeColor || ac;

  return (
    <div
      style={{
        backgroundColor: active ? t.surfaceRaised : t.surface,
        border: `2.5px solid ${active ? ac : t.border}`,
        borderRadius: 22,
        padding: '20px 22px',
        boxShadow: active ? t.shadow : t.shadowSm,
        position: 'relative',
        ...style,
      }}
    >
      {badge && (
        <div
          style={{
            position: 'absolute',
            top: -16,
            right: 20,
            padding: '4px 14px',
            borderRadius: 999,
            backgroundColor: mode === 'dark' ? '#090B0E' : '#FFFFFF',
            border: `2px solid ${bColor}`,
            fontFamily: FONT.mono,
            fontWeight: 800,
            fontSize: 16,
            color: bColor,
            letterSpacing: '0.05em',
          }}
        >
          {badge}
        </div>
      )}

      <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 18,
            backgroundColor: t.well,
            border: `2px solid ${active ? ac : t.borderStrong}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          {iconImg ? (
            <Img
              src={staticFile(iconImg)}
              style={{width: 50, height: 50, objectFit: 'contain', borderRadius: 10}}
            />
          ) : (
            iconSvg
          )}
        </div>
        <div style={{minWidth: 0, flex: 1}}>
          <div
            style={{
              fontFamily: FONT.space,
              fontWeight: 800,
              fontSize: 30,
              color: t.ink,
              lineHeight: 1.15,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontFamily: FONT.mono,
              fontWeight: 600,
              fontSize: 20,
              color: t.muted,
              marginTop: 6,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {subtitle}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

/* Zona 4 Companion: Crisp Large-Font Status Bar above Subtitles */
export const OpsBottomTelemetryStrip: React.FC<{
  mode: Mode;
  command: string;
  accent?: string;
}> = ({mode, command, accent}) => {
  const frame = useCurrentFrame();
  const t = OPS_THEME[mode];
  const ac = accent || t.amber;

  return (
    <div
      style={{
        position: 'absolute',
        left: 68,
        right: 68,
        bottom: 248,
        padding: '16px 22px',
        borderRadius: 18,
        backgroundColor: t.surface,
        border: `1.5px solid ${t.borderStrong}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        zIndex: 25,
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 14, minWidth: 0}}>
        <Img
          src={staticFile('assets/ops/agy-official.png')}
          style={{width: 34, height: 34, objectFit: 'contain', flexShrink: 0}}
        />
        <span
          style={{
            fontFamily: FONT.mono,
            fontWeight: 700,
            fontSize: 21,
            color: t.ink,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {command}
        </span>
      </div>

      <div style={{display: 'flex', alignItems: 'flex-end', gap: 5, height: 26, flexShrink: 0}}>
        {[0.55, 0.95, 0.7, 1, 0.75].map((h, i) => {
          const val = 0.35 + 0.65 * Math.abs(Math.sin(frame * 0.18 + i * 1.1));
          return (
            <div
              key={i}
              style={{
                width: 5,
                height: Math.round(26 * h * val),
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
