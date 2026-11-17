import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from 'remotion';
import {EREKAP_FONT, EREKAP_TOKENS as T} from '../lib/erekapTokens';
import {
  Ambient,
  Vignette,
  useProg,
} from '../premium/fx';

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

/* ───────── Crisp Vector SVG Icons (Zero Emoji) ───────── */
export const AgentCoreSvg: React.FC<{color?: string; size?: number}> = ({
  color = T.lime,
  size = 28,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z"
      fill={color}
    />
    <circle cx="12" cy="12" r="2.2" fill={T.canopyDeep} />
  </svg>
);

export const TerminalSvg: React.FC<{color?: string; size?: number}> = ({
  color = 'currentColor',
  size = 22,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

export const BridgeSvg: React.FC<{color?: string; size?: number}> = ({
  color = 'currentColor',
  size = 22,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="5" cy="12" r="3" />
    <circle cx="19" cy="12" r="3" />
    <path d="M8 12h8" />
    <path d="M13 9l3 3-3 3" />
  </svg>
);

export const CpuSvg: React.FC<{color?: string; size?: number}> = ({
  color = 'currentColor',
  size = 22,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="6" y="6" width="12" height="12" rx="2" />
    <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
    <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
  </svg>
);

export const ActivitySvg: React.FC<{color?: string; size?: number}> = ({
  color = 'currentColor',
  size = 22,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

export const CodeSvg: React.FC<{color?: string; size?: number}> = ({
  color = 'currentColor',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

export const SearchSvg: React.FC<{color?: string; size?: number}> = ({
  color = 'currentColor',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="7" />
    <line x1="20" y1="20" x2="16.2" y2="16.2" />
  </svg>
);

export const ServerSvg: React.FC<{color?: string; size?: number}> = ({
  color = 'currentColor',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="6" rx="2" />
    <rect x="3" y="14" width="18" height="6" rx="2" />
    <circle cx="7" cy="7" r="1.1" fill={color} />
    <circle cx="7" cy="17" r="1.1" fill={color} />
  </svg>
);

export const ShieldCheckSvg: React.FC<{color?: string; size?: number}> = ({
  color = 'currentColor',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

export const GitBranchSvg: React.FC<{color?: string; size?: number}> = ({
  color = 'currentColor',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="6" cy="6" r="2.5" />
    <circle cx="18" cy="6" r="2.5" />
    <circle cx="6" cy="18" r="2.5" />
    <path d="M6 8.5v7" />
    <path d="M18 8.5c0 4-12 2-12 7" />
  </svg>
);

export const GlobeSvg: React.FC<{color?: string; size?: number}> = ({
  color = 'currentColor',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z" />
  </svg>
);

/* ───────── Transition Sweep (Tirai diagonal dua lapis + AgentCore Emblem) ───────── */
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
          `linear-gradient(160deg, ${T.canopy} 0%, ${T.canopyDeep} 100%)`,
          1
        )}
      />
      <div
        style={panel(
          xLead,
          `linear-gradient(160deg, ${T.limeHover} 0%, ${T.lime} 100%)`,
          2
        )}
      >
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 10,
            background: 'rgba(255,255,255,0.85)',
            boxShadow: '0 0 40px rgba(255,255,255,0.9)',
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
            width: 184,
            height: 184,
            borderRadius: 46,
            background: T.canopyDeep,
            border: '2px solid rgba(163,230,53,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${0.7 + 0.4 * iconP}) rotate(${(u - 0.5) * 24}deg)`,
            boxShadow: '0 30px 70px rgba(7,41,25,0.6)',
          }}
        >
          <AgentCoreSvg color={T.lime} size={96} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ───────── Shared Tactile Card & Kicker Badge ───────── */
export const OpsTactileCard: React.FC<{
  dark: boolean;
  raised?: boolean;
  accentBorder?: boolean;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({dark, raised = false, accentBorder = false, style, children}) => (
  <div
    style={{
      position: 'relative',
      borderRadius: 26,
      backgroundColor: dark
        ? raised
          ? 'rgba(17, 87, 55, 0.44)'
          : 'rgba(255, 255, 255, 0.06)'
        : raised
        ? T.surfaceRaised
        : T.surface,
      border: accentBorder
        ? `1.5px solid ${dark ? 'rgba(163, 230, 53, 0.55)' : T.canopy}`
        : dark
        ? '1px solid rgba(255, 255, 255, 0.13)'
        : `1px solid ${T.borderStrong}`,
      boxShadow: dark
        ? accentBorder
          ? '0 20px 44px -14px rgba(0,0,0,0.55), 0 0 32px rgba(163,230,53,0.14)'
          : '0 18px 40px -14px rgba(0,0,0,0.45)'
        : T.shadowSheet,
      ...style,
    }}
  >
    {children}
  </div>
);

export const OpsKicker: React.FC<{dark: boolean; text: string}> = ({
  dark,
  text,
}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '7px 14px',
      borderRadius: 999,
      fontFamily: EREKAP_FONT.mono,
      fontSize: 15,
      fontWeight: 700,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      backgroundColor: dark ? 'rgba(163, 230, 53, 0.14)' : T.surfaceMint,
      color: dark ? T.lime : T.canopy,
      border: dark
        ? '1px solid rgba(163, 230, 53, 0.35)'
        : `1px solid ${T.borderStrong}`,
      alignSelf: 'flex-start',
    }}
  >
    <span
      style={{
        width: 7,
        height: 7,
        borderRadius: 999,
        backgroundColor: dark ? T.lime : T.canopyMid,
      }}
    />
    {text}
  </div>
);

/* ───────── Unified App Shell (OpsPremiumShell) ───────── */
const DOCK_ITEMS: {
  id: OpsTab;
  label: string;
  renderIcon: (active: boolean) => React.ReactNode;
}[] = [
  {
    id: 'trigger',
    label: 'Trigger',
    renderIcon: (a) => (
      <TerminalSvg color={a ? T.lime : 'rgba(255,255,255,0.62)'} size={20} />
    ),
  },
  {
    id: 'bridge',
    label: 'Bridge',
    renderIcon: (a) => (
      <BridgeSvg color={a ? T.lime : 'rgba(255,255,255,0.62)'} size={20} />
    ),
  },
  {
    id: 'worker',
    label: 'Worker',
    renderIcon: (a) => (
      <CpuSvg color={a ? T.lime : 'rgba(255,255,255,0.62)'} size={20} />
    ),
  },
  {
    id: 'opsdeck',
    label: 'Ops Deck',
    renderIcon: (a) => (
      <ActivitySvg color={a ? T.lime : 'rgba(255,255,255,0.62)'} size={20} />
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
        backgroundColor: dark ? T.canopyDeep : T.bg,
        backgroundImage: dark
          ? `linear-gradient(165deg, ${T.canopy} 0%, ${T.canopyDeep} 100%)`
          : undefined,
        fontFamily: EREKAP_FONT.sans,
        color: dark ? '#FFFFFF' : T.ink,
      }}
    >
      <Ambient dark={dark} />

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
        {/* Top App Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 20px',
            borderRadius: 24,
            backgroundColor: dark
              ? 'rgba(255,255,255,0.07)'
              : 'rgba(255,255,255,0.94)',
            border: dark
              ? '1px solid rgba(255,255,255,0.12)'
              : `1px solid ${T.border}`,
            boxShadow: dark ? 'none' : T.shadowCard,
            opacity: topP,
            transform: `translateY(${(1 - topP) * -24}px)`,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 13,
                backgroundColor: T.canopyDeep,
                border: '1px solid rgba(163,230,53,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AgentCoreSvg color={T.lime} size={26} />
            </div>
            <div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                }}
              >
                RHMT OPS
              </div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: dark ? 'rgba(220,252,231,0.78)' : T.inkMuted,
                }}
              >
                Dual-VPS Agentic Engine
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
              fontFamily: EREKAP_FONT.mono,
              backgroundColor: isHot
                ? T.lime
                : dark
                ? 'rgba(255,255,255,0.12)'
                : T.surfaceMint,
              color: isHot ? T.limeInk : dark ? '#FFFFFF' : T.canopy,
              fontSize: 15,
              fontWeight: 800,
              border: dark
                ? '1px solid rgba(255,255,255,0.14)'
                : `1px solid ${T.borderStrong}`,
              boxShadow: isHot ? '0 0 24px rgba(163,230,53,0.55)' : 'none',
            }}
          >
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: 999,
                backgroundColor: isHot ? T.canopyDeep : T.lime,
                boxShadow: `0 0 ${6 + pulse * 8}px ${T.lime}`,
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

        {/* Bottom Floating Dock */}
        <div
          style={{
            alignSelf: 'center',
            width: '100%',
            maxWidth: 780,
            position: 'relative',
            backgroundColor: dark
              ? 'rgba(6, 28, 17, 0.94)'
              : 'rgba(11, 20, 16, 0.94)',
            borderRadius: 30,
            padding: '10px 14px',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: T.shadowDock,
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
                borderRadius: 22,
                backgroundColor: T.canopy,
                border: '1px solid rgba(163,230,53,0.42)',
                boxShadow: '0 0 22px rgba(163,230,53,0.25)',
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
                    color: active ? T.lime : 'rgba(255,255,255,0.62)',
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

      <Vignette dark={dark} />
    </AbsoluteFill>
  );
};
