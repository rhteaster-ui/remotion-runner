import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  random,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import {useProg} from '../premium/fx';
import {PORTFOLIO_FONT, PORTFOLIO_TOKENS as P} from './tokens';

export {
  Reveal,
  WordReveal,
  Shine,
  Sparks,
  Tap,
  useProg,
  clamp,
  EXPO,
} from '../premium/fx';

export type OpsTab = 'trigger' | 'bridge' | 'worker' | 'opsdeck';

const TAB_ORDER: OpsTab[] = ['trigger', 'bridge', 'worker', 'opsdeck'];

/* ───────── Minimal UI Chrome Icons (Lucide-aligned) ───────── */
export const TerminalIcon: React.FC<{color?: string; size?: number}> = ({
  color = 'currentColor',
  size = 20,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

export const WorkflowIcon: React.FC<{color?: string; size?: number}> = ({
  color = 'currentColor',
  size = 20,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="6" height="6" rx="1.5" />
    <rect x="15" y="15" width="6" height="6" rx="1.5" />
    <path d="M9 6h4a2 2 0 0 1 2 2v7" />
  </svg>
);

export const CpuIcon: React.FC<{color?: string; size?: number}> = ({
  color = 'currentColor',
  size = 20,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="6" width="12" height="12" rx="2" />
    <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
    <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
  </svg>
);

export const ActivityIcon: React.FC<{color?: string; size?: number}> = ({
  color = 'currentColor',
  size = 20,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

/* ───────── Portfolio Technical Ambient & Vignette ───────── */
export const OpsAmbient: React.FC<{dark: boolean}> = ({dark}) => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const orbs = [
    {
      x: 84,
      y: 10,
      r: 720,
      c: dark ? 'rgba(197, 162, 117, 0.14)' : 'rgba(53, 68, 90, 0.08)',
      sp: 0.28,
      ph: 0,
    },
    {
      x: 10,
      y: 78,
      r: 820,
      c: dark ? 'rgba(53, 68, 90, 0.26)' : 'rgba(197, 162, 117, 0.12)',
      sp: 0.2,
      ph: 2,
    },
  ];
  return (
    <AbsoluteFill style={{pointerEvents: 'none', overflow: 'hidden'}}>
      {orbs.map((o, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${o.x + Math.sin(t * o.sp + o.ph) * 7}%`,
            top: `${o.y + Math.cos(t * o.sp * 1.15 + o.ph) * 4}%`,
            width: o.r,
            height: o.r,
            marginLeft: -o.r / 2,
            marginTop: -o.r / 2,
            borderRadius: 999,
            background: `radial-gradient(circle, ${o.c} 0%, transparent 66%)`,
          }}
        />
      ))}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: dark ? 0.055 : 0.045,
          backgroundImage: `linear-gradient(to right, ${dark ? P.steelIce : P.light.accent} 1px, transparent 1px), linear-gradient(to bottom, ${dark ? P.steelIce : P.light.accent} 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
          backgroundPosition: `0px ${(t * 8) % 48}px`,
          maskImage: 'radial-gradient(circle at 50% 42%, black 0%, transparent 74%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 42%, black 0%, transparent 74%)',
        }}
      />
      {Array.from({length: 18}).map((_, i) => {
        const x = random(`opx${i}`) * 1080 + Math.sin(t * 0.55 + i) * 14;
        const sp = 14 + random(`ops${i}`) * 30;
        const y = (((random(`opy${i}`) * 1920 - t * sp) % 1920) + 1920) % 1920;
        const s = 2.5 + random(`opz${i}`) * 5;
        const tw = 0.5 + 0.5 * Math.sin(t * 1.4 + i * 1.9);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: s,
              height: s,
              borderRadius: 999,
              background: dark ? P.gold : P.light.accent,
              opacity: (dark ? 0.38 : 0.14) * tw,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export const OpsVignette: React.FC<{dark: boolean}> = ({dark}) => (
  <AbsoluteFill
    style={{
      pointerEvents: 'none',
      background: dark
        ? 'radial-gradient(ellipse at 50% 45%, transparent 56%, rgba(4, 6, 10, 0.58) 100%)'
        : 'radial-gradient(ellipse at 50% 45%, transparent 62%, rgba(24, 30, 40, 0.09) 100%)',
    }}
  />
);

/* ───────── Transition Sweep (Darkroom Slate + Warm Gold + RHMT Mark) ───────── */
export const OpsTransitionSweep: React.FC<{atFrame: number; half?: number}> = ({
  atFrame,
  half = 12,
}) => {
  const frame = useCurrentFrame();
  const u = interpolate(frame, [atFrame - half, atFrame + half], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  if (u <= 0 || u >= 1) return null;
  const ease = Easing.inOut(Easing.cubic);
  const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
  const xLead = interpolate(ease(u), [0, 1], [-106, 106]);
  const xLag = interpolate(ease(clamp01(u - 0.09)), [0, 1], [-106, 106]);
  const iconP = Math.pow(Math.sin(Math.PI * u), 3);

  const panel = (x: number, bg: string, z: number): React.CSSProperties => ({
    position: 'absolute',
    top: '-8%',
    height: '116%',
    left: '-35%',
    width: '170%',
    background: bg,
    transform: `translateX(${x}%) skewX(-14deg)`,
    zIndex: z,
  });

  return (
    <AbsoluteFill style={{pointerEvents: 'none', zIndex: 80, overflow: 'hidden'}}>
      <div
        style={panel(
          xLag,
          `linear-gradient(160deg, ${P.dark.surface2} 0%, ${P.dark.bg} 100%)`,
          1
        )}
      />
      <div
        style={panel(
          xLead,
          `linear-gradient(160deg, ${P.goldBright} 0%, ${P.gold} 100%)`,
          2
        )}
      >
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 8,
            background: 'rgba(255,255,255,0.75)',
            boxShadow: '0 0 32px rgba(255,255,255,0.7)',
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 3,
          opacity: iconP,
        }}
      >
        <div
          style={{
            width: 180,
            height: 180,
            borderRadius: 42,
            background: '#17191c',
            border: `2px solid ${P.gold}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${0.7 + 0.4 * iconP}) rotate(${(u - 0.5) * 20}deg)`,
            boxShadow: '0 30px 70px rgba(0, 0, 0, 0.65)',
          }}
        >
          <Img
            src={staticFile('assets/portfolio/rhmt-mark.svg')}
            style={{width: 120, height: 120, objectFit: 'contain'}}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ───────── Shared Tactile Card & Kicker (Max 2 Elevation Depths) ───────── */
export const OpsTactileCard: React.FC<{
  dark: boolean;
  raised?: boolean;
  accentBorder?: boolean;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({dark, raised = false, accentBorder = false, style, children}) => {
  const th = dark ? P.dark : P.light;
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 22,
        backgroundColor: raised ? th.surface2 : th.surface,
        border: accentBorder
          ? `1.5px solid ${th.accentBorder}`
          : `1px solid ${th.lineStrong}`,
        boxShadow: th.shadow,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const OpsKicker: React.FC<{dark: boolean; text: string}> = ({
  dark,
  text,
}) => {
  const th = dark ? P.dark : P.light;
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 9,
        padding: '7px 14px',
        borderRadius: 999,
        fontFamily: PORTFOLIO_FONT.mono,
        fontSize: 15,
        fontWeight: 700,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        backgroundColor: th.accentSoft,
        color: dark ? P.goldBright : th.accent,
        border: `1px solid ${th.accentBorder}`,
        alignSelf: 'flex-start',
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: 999,
          backgroundColor: dark ? P.gold : th.accent,
        }}
      />
      {text}
    </div>
  );
};

/* ───────── Unified Portfolio App Shell (OpsPremiumShell) ───────── */
const DOCK_ITEMS: {
  id: OpsTab;
  label: string;
  renderIcon: (active: boolean) => React.ReactNode;
}[] = [
  {
    id: 'trigger',
    label: 'Trigger',
    renderIcon: (a) => (
      <TerminalIcon color={a ? P.goldBright : 'rgba(241,243,246,0.58)'} size={20} />
    ),
  },
  {
    id: 'bridge',
    label: 'Bridge',
    renderIcon: (a) => (
      <WorkflowIcon color={a ? P.goldBright : 'rgba(241,243,246,0.58)'} size={20} />
    ),
  },
  {
    id: 'worker',
    label: 'Worker',
    renderIcon: (a) => (
      <CpuIcon color={a ? P.goldBright : 'rgba(241,243,246,0.58)'} size={20} />
    ),
  },
  {
    id: 'opsdeck',
    label: 'Ops Deck',
    renderIcon: (a) => (
      <ActivityIcon color={a ? P.goldBright : 'rgba(241,243,246,0.58)'} size={20} />
    ),
  },
];

export const OpsPremiumShell: React.FC<{
  mode: 'dark' | 'light';
  from: OpsTab;
  moves?: {t: number; tab: OpsTab}[];
  statusLabel: string;
  activeStatusLabel?: string;
  statusActiveMix?: number;
  children: React.ReactNode;
}> = ({
  mode,
  from,
  moves = [],
  statusLabel,
  activeStatusLabel,
  statusActiveMix = 0,
  children,
}) => {
  const {frame, now, prog} = useProg();
  const dark = mode === 'dark';
  const th = dark ? P.dark : P.light;
  const topP = prog(0.08, 0.65);
  const dockP = prog(0.16, 0.72);
  const idxF = moves.reduce(
    (acc, m) =>
      interpolate(prog(m.t, 0.55), [0, 1], [acc, TAB_ORDER.indexOf(m.tab)]),
    TAB_ORDER.indexOf(from)
  );
  const zoom = 1 + frame * 0.00009;
  const pulse = 0.55 + 0.45 * Math.sin(now * 4);
  const isHot = statusActiveMix > 0.5;
  const pillText = isHot && activeStatusLabel ? activeStatusLabel : statusLabel;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: th.bg,
        fontFamily: PORTFOLIO_FONT.sans,
        color: th.ink,
      }}
    >
      <OpsAmbient dark={dark} />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '60px 52px 246px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transform: `scale(${zoom})`,
          transformOrigin: '50% 42%',
        }}
      >
        {/* Top Header Bar (Precision Technical Glass) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 20px',
            borderRadius: 22,
            backgroundColor: th.glass,
            border: `1px solid ${th.lineStrong}`,
            boxShadow: th.shadow,
            opacity: topP,
            transform: `translateY(${(1 - topP) * -24}px)`,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
            <Img
              src={staticFile('assets/portfolio/rhmt-mark.svg')}
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                objectFit: 'contain',
                border: `1px solid ${P.dark.accentBorder}`,
              }}
            />
            <div>
              <div
                style={{
                  fontFamily: PORTFOLIO_FONT.display,
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                }}
              >
                R_HMT OFC
              </div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: th.muted,
                }}
              >
                rhmt.biz.id · Agentic Engine
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              borderRadius: 999,
              fontFamily: PORTFOLIO_FONT.mono,
              backgroundColor: isHot
                ? dark
                  ? P.gold
                  : P.light.accent
                : th.surface2,
              color: isHot
                ? dark
                  ? '#111720'
                  : '#ffffff'
                : th.ink,
              fontSize: 15,
              fontWeight: 800,
              border: `1px solid ${isHot ? 'transparent' : th.lineStrong}`,
              boxShadow: isHot
                ? dark
                  ? '0 0 22px rgba(197, 162, 117, 0.45)'
                  : '0 0 20px rgba(53, 68, 90, 0.28)'
                : 'none',
            }}
          >
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: 999,
                backgroundColor: isHot
                  ? dark
                    ? '#111720'
                    : P.goldBright
                  : P.gold,
                boxShadow: `0 0 ${6 + pulse * 8}px ${P.gold}`,
              }}
            />
            <span>{pillText}</span>
          </div>
        </div>

        {/* Center Stage */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            paddingTop: 12,
            paddingBottom: 12,
            position: 'relative',
          }}
        >
          {children}
        </div>

        {/* Bottom Floating Dock (Industrial Slate) */}
        <div
          style={{
            alignSelf: 'center',
            width: '100%',
            maxWidth: 780,
            position: 'relative',
            backgroundColor: 'rgba(16, 22, 30, 0.95)',
            borderRadius: 28,
            padding: '10px 14px',
            border: `1px solid ${P.dark.lineStrong}`,
            boxShadow: '0 18px 36px -8px rgba(0, 0, 0, 0.55)',
            opacity: dockP,
            transform: `translateY(${(1 - dockP) * 40}px)`,
          }}
        >
          <div
            style={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 8,
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: 'calc((100% - 24px) / 4)',
                left: `calc(${idxF} * ((100% - 24px) / 4 + 8px))`,
                borderRadius: 20,
                backgroundColor: P.dark.surface2,
                border: `1px solid ${P.dark.accentBorder}`,
                boxShadow: '0 0 20px rgba(197, 162, 117, 0.18)',
              }}
            />
            {DOCK_ITEMS.map((item, i) => {
              const active = Math.abs(idxF - i) < 0.5;
              return (
                <div
                  key={item.id}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    padding: '12px 8px',
                    color: active ? P.goldBright : 'rgba(241,243,246,0.58)',
                    fontWeight: active ? 800 : 600,
                    fontSize: 17,
                  }}
                >
                  {item.renderIcon(active)}
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <OpsVignette dark={dark} />
    </AbsoluteFill>
  );
};
