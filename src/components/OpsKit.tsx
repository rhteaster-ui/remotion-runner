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
    border: '#262C39',
    borderStrong: '#384152',
    dot: 'rgba(255, 255, 255, 0.08)',
    ink: '#F4F6FA',
    ink2: '#B5BECA',
    muted: '#7D8799',
    amber: '#F59E0B',
    amberSoft: 'rgba(245, 158, 11, 0.16)',
    emerald: '#10B981',
    emeraldSoft: 'rgba(16, 185, 129, 0.16)',
    cyan: '#38BDF8',
    cyanSoft: 'rgba(56, 189, 248, 0.16)',
    shadow: '0 10px 0 rgba(0, 0, 0, 0.45)',
    shadowSm: '0 5px 0 rgba(0, 0, 0, 0.42)',
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
    ink2: '#3D4451',
    muted: '#666D7A',
    amber: '#D97706',
    amberSoft: 'rgba(217, 119, 6, 0.14)',
    emerald: '#059669',
    emeraldSoft: 'rgba(5, 150, 105, 0.14)',
    cyan: '#0284C7',
    cyanSoft: 'rgba(2, 132, 199, 0.13)',
    shadow: '0 10px 0 rgba(17, 19, 24, 0.10)',
    shadowSm: '0 5px 0 rgba(17, 19, 24, 0.09)',
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
      {/* Crisp architectural frame lines at margins */}
      <div
        style={{
          position: 'absolute',
          left: 48,
          right: 48,
          top: 40,
          bottom: 40,
          border: `1px solid ${t.border}`,
          borderRadius: 24,
          opacity: 0.45,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};

export const OpsHeader: React.FC<{
  mode: Mode;
  index: number;
  total: number;
  statusText?: string;
  accent?: string;
}> = ({mode, index, total, statusText = 'SSE LIVE', accent}) => {
  const frame = useCurrentFrame();
  const t = OPS_THEME[mode];
  const pulse = 0.55 + 0.45 * Math.sin(frame * 0.22);
  const dotColor = accent || t.emerald;

  return (
    <div
      style={{
        position: 'absolute',
        top: 62,
        left: 72,
        right: 72,
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
          gap: 12,
          padding: '8px 16px',
          borderRadius: 12,
          backgroundColor: t.surface,
          border: `1.5px solid ${t.border}`,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            backgroundColor: t.amber,
            color: '#090B0E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: FONT.mono,
            fontWeight: 800,
            fontSize: 13,
          }}
        >
          RH
        </div>
        <span
          style={{
            fontFamily: FONT.mono,
            fontWeight: 700,
            fontSize: 16,
            color: t.ink,
            letterSpacing: '0.06em',
          }}
        >
          rhmt ofc
        </span>
        <span style={{color: t.muted, fontFamily: FONT.mono, fontSize: 15}}>/</span>
        <span
          style={{
            fontFamily: FONT.mono,
            fontWeight: 600,
            fontSize: 14,
            color: t.muted,
            letterSpacing: '0.04em',
          }}
        >
          AGENTIC OPS
        </span>
      </div>

      <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 14px',
            borderRadius: 999,
            backgroundColor: t.surface,
            border: `1.5px solid ${t.border}`,
          }}
        >
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: '50%',
              backgroundColor: dotColor,
              opacity: pulse,
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontFamily: FONT.mono,
              fontWeight: 700,
              fontSize: 14,
              color: t.ink,
              letterSpacing: '0.05em',
            }}
          >
            {statusText}
          </span>
        </div>

        <div
          style={{
            padding: '8px 14px',
            borderRadius: 10,
            backgroundColor: t.surface,
            border: `1.5px solid ${t.border}`,
            fontFamily: FONT.mono,
            fontWeight: 700,
            fontSize: 15,
            color: t.ink2,
          }}
        >
          0{index}/0{total}
        </div>
      </div>
    </div>
  );
};

/* Zona 1: Kinetic Headline with Precision Bracket Markers */
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
        top: 138,
        left: 72,
        right: 72,
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
          marginBottom: 12,
        }}
      >
        <GeminiSparkSvg size={18} color={ac} rotate={frame * 1.4} />
        <span
          style={{
            fontFamily: FONT.mono,
            fontWeight: 700,
            fontSize: 17,
            color: ac,
            letterSpacing: '0.1em',
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
          fontSize: 44,
          lineHeight: 1.15,
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
          marginTop: 8,
          padding: '8px 20px',
          backgroundColor: mode === 'dark' ? t.surfaceRaised : '#FFFFFF',
          border: `2px solid ${ac}`,
          borderRadius: 14,
          boxShadow: t.shadowSm,
          opacity: p2,
          transform: `translateY(${(1 - p2) * 18}px) scale(${0.94 + 0.06 * p2})`,
        }}
      >
        {/* Corner precision ticks */}
        <span
          style={{
            position: 'absolute',
            left: -2,
            top: 10,
            bottom: 10,
            width: 5,
            borderRadius: 4,
            backgroundColor: ac,
          }}
        />
        <span
          style={{
            fontFamily: FONT.space,
            fontWeight: 800,
            fontSize: 50,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: t.ink,
            paddingLeft: 8,
          }}
        >
          {highlight}
        </span>
        <div
          style={{
            position: 'absolute',
            left: 16,
            right: 16,
            bottom: -2,
            height: 3,
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

/* Zona 2: Segmented Pipeline Progress Rail */
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
        top: 382,
        left: 72,
        right: 72,
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
        const fillColor = active ? ac : done ? t.emerald : 'transparent';
        const textColor = active ? t.ink : done ? t.emerald : t.muted;

        return (
          <div
            key={st.code}
            style={{
              backgroundColor: active ? t.surfaceRaised : t.surface,
              border: `1.5px solid ${borderColor}`,
              borderRadius: 10,
              padding: '8px 10px',
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontWeight: 700,
                  fontSize: 12,
                  color: textColor,
                  letterSpacing: '0.04em',
                }}
              >
                {st.code}
              </span>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: fillColor,
                  border: active || done ? 'none' : `1.5px solid ${t.muted}`,
                }}
              />
            </div>
            <span
              style={{
                fontFamily: FONT.mono,
                fontWeight: active ? 800 : 600,
                fontSize: 13,
                color: textColor,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {st.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

/* Cubic Bezier Point Helper + Animated Flow Connector */
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
        strokeWidth={active ? 3.5 : 2.2}
        strokeOpacity={active ? 0.35 : 0.25}
      />
      {active && (
        <path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={3.5}
          strokeDasharray="10 10"
          strokeDashoffset={-frame * 3.2}
          strokeLinecap="round"
        />
      )}
      <circle cx={p0[0]} cy={p0[1]} r={5} fill={color} />
      <circle cx={p3[0]} cy={p3[1]} r={5} fill={color} />
      {active && (
        <>
          <circle cx={px} cy={py} r={8.5} fill={color} fillOpacity={0.28} />
          <circle cx={px} cy={py} r={5} fill={color} />
        </>
      )}
      {active && bidirectional && (
        <>
          <circle cx={rx} cy={ry} r={8} fill={color} fillOpacity={0.28} />
          <circle cx={rx} cy={ry} r={4.5} fill={color} />
        </>
      )}
      {label && (
        <g transform={`translate(${mx}, ${my})`}>
          <rect
            x={-48}
            y={-15}
            width={96}
            height={30}
            rx={8}
            fill={labelBg}
            stroke={color}
            strokeWidth={1.6}
          />
          <text
            x={0}
            y={5}
            textAnchor="middle"
            fill={labelColor}
            fontFamily="JetBrains Mono, monospace"
            fontWeight="700"
            fontSize="13"
          >
            {label}
          </text>
        </g>
      )}
    </g>
  );
};

/* Tactile n8n / Ops Node Box */
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
        border: `2px solid ${active ? ac : t.border}`,
        borderRadius: 18,
        padding: '16px 18px',
        boxShadow: active ? `0 8px 0 ${mode === 'dark' ? 'rgba(0,0,0,0.55)' : 'rgba(17,19,24,0.12)'}` : t.shadowSm,
        position: 'relative',
        ...style,
      }}
    >
      {badge && (
        <div
          style={{
            position: 'absolute',
            top: -13,
            right: 16,
            padding: '3px 11px',
            borderRadius: 999,
            backgroundColor: mode === 'dark' ? '#090B0E' : '#FFFFFF',
            border: `1.5px solid ${bColor}`,
            fontFamily: FONT.mono,
            fontWeight: 800,
            fontSize: 12,
            color: bColor,
            letterSpacing: '0.06em',
          }}
        >
          {badge}
        </div>
      )}

      <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            backgroundColor: t.well,
            border: `1.5px solid ${active ? ac : t.border}`,
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
              style={{width: 36, height: 36, objectFit: 'contain', borderRadius: 8}}
            />
          ) : (
            iconSvg
          )}
        </div>
        <div style={{minWidth: 0, flex: 1}}>
          <div
            style={{
              fontFamily: FONT.space,
              fontWeight: 700,
              fontSize: 22,
              color: t.ink,
              lineHeight: 1.2,
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
              fontWeight: 500,
              fontSize: 15,
              color: t.muted,
              marginTop: 4,
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

/* Zona 4 Companion: Expressive Telemetry Ticker Strip above Subtitles (prevents dead space) */
export const OpsBottomTelemetryStrip: React.FC<{
  mode: Mode;
  command: string;
  status: string;
  accent?: string;
}> = ({mode, command, status, accent}) => {
  const frame = useCurrentFrame();
  const t = OPS_THEME[mode];
  const ac = accent || t.amber;
  const barPulse = 0.35 + 0.65 * Math.abs(Math.sin(frame * 0.14));

  return (
    <div
      style={{
        position: 'absolute',
        left: 72,
        right: 72,
        bottom: 248,
        padding: '14px 20px',
        borderRadius: 16,
        backgroundColor: t.surface,
        border: `1.5px solid ${t.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        zIndex: 25,
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 14, minWidth: 0}}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            backgroundColor: mode === 'dark' ? t.amberSoft : t.well,
            border: `1.5px solid ${ac}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Img
            src={staticFile('assets/ops/agy-official.png')}
            style={{width: 24, height: 24, objectFit: 'contain'}}
          />
        </div>
        <div style={{minWidth: 0}}>
          <div
            style={{
              fontFamily: FONT.mono,
              fontWeight: 700,
              fontSize: 15,
              color: t.ink,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {command}
          </div>
          <div
            style={{
              fontFamily: FONT.mono,
              fontWeight: 500,
              fontSize: 13,
              color: t.muted,
              marginTop: 2,
            }}
          >
            {status}
          </div>
        </div>
      </div>

      {/* Animated waveform bars */}
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 4, height: 22, flexShrink: 0}}>
        {[0.5, 0.9, 0.65, 1, 0.7].map((h, i) => {
          const val = 0.35 + 0.65 * Math.abs(Math.sin(frame * 0.18 + i * 1.1));
          return (
            <div
              key={i}
              style={{
                width: 4,
                height: Math.round(22 * h * val),
                borderRadius: 3,
                backgroundColor: ac,
                opacity: i === 2 ? barPulse : 0.85,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
