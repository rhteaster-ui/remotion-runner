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
import {REPO_FONT, REPO_TOKENS} from './tokens';

const STEPS = [
  {id: 'zip', label: 'ZIP IN'},
  {id: 'unpack', label: 'MEM UNPACK'},
  {id: 'tree', label: 'ATOMIC TREE'},
  {id: 'vault', label: 'AES-256 VAULT'},
  {id: 'commit', label: 'HEAD PUSH'},
];

export const RepoFlowShell: React.FC<{
  mode?: 'dark' | 'light';
  activeStep?: number;
  subtitle?: string;
  children: React.ReactNode;
}> = ({
  mode = 'dark',
  activeStep = 0,
  subtitle = 'CLIENT-SIDE GIT AUTOMATION',
  children,
}) => {
  const frame = useCurrentFrame();
  const t = REPO_TOKENS[mode];

  // Subtle ambient breathing
  const pulse = Math.sin(frame * 0.08) * 0.05 + 1;
  const glowX = Math.sin(frame * 0.03) * 60;
  const glowY = Math.cos(frame * 0.025) * 40;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: t.bg,
        color: t.ink,
        fontFamily: REPO_FONT.sans,
        overflow: 'hidden',
      }}
    >
      {/* Blueprint Grid System */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, ${t.gridLine} 1px, transparent 1px),
            linear-gradient(to bottom, ${t.gridLine} 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px',
          opacity: 0.9,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, ${t.gridAccent} 1.5px, transparent 1.5px),
            linear-gradient(to bottom, ${t.gridAccent} 1.5px, transparent 1.5px)
          `,
          backgroundSize: '180px 180px',
          opacity: 0.7,
          pointerEvents: 'none',
        }}
      />

      {/* Atmospheric Radial Glow Orb */}
      {mode === 'dark' ? (
        <div
          style={{
            position: 'absolute',
            top: 240 + glowY,
            left: 140 + glowX,
            width: 700,
            height: 700,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(14, 165, 233, 0.16) 0%, transparent 68%)',
            filter: 'blur(70px)',
            pointerEvents: 'none',
            transform: `scale(${pulse})`,
          }}
        />
      ) : (
        <div
          style={{
            position: 'absolute',
            top: 260 + glowY,
            right: 100 + glowX,
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(2, 132, 199, 0.09) 0%, transparent 68%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Safe Container Layout (4-Zone Vertical Grid) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          padding: '52px 48px 230px',
          boxSizing: 'border-box',
          zIndex: 10,
        }}
      >
        {/* TOP BAR / APP HEADER */}
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 24,
            borderBottom: `1px solid ${t.line}`,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
            <Img
              src={staticFile('assets/repoflow/icon.png')}
              style={{
                width: 46,
                height: 46,
                borderRadius: 12,
                border: `1.5px solid ${t.accentBorder}`,
                boxShadow: `0 6px 18px ${t.accentSoft}`,
              }}
            />
            <div>
              <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                <span
                  style={{
                    fontFamily: REPO_FONT.display,
                    fontSize: 26,
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: t.ink,
                  }}
                >
                  RepoFlow
                </span>
                <span
                  style={{
                    fontSize: 12,
                    fontFamily: REPO_FONT.mono,
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: 6,
                    backgroundColor: t.accentSoft,
                    color: t.accent,
                    border: `1px solid ${t.accentBorder}`,
                  }}
                >
                  v2.0 PWA
                </span>
              </div>
              <div
                style={{
                  fontFamily: REPO_FONT.mono,
                  fontSize: 13,
                  fontWeight: 600,
                  color: t.quiet,
                  letterSpacing: '0.04em',
                }}
              >
                {subtitle}
              </div>
            </div>
          </div>

          {/* Right Live Status Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              backgroundColor: t.surface,
              padding: '8px 16px',
              borderRadius: 24,
              border: `1px solid ${t.lineStrong}`,
              boxShadow: mode === 'dark' ? '0 0 16px rgba(56, 189, 248, 0.12)' : 'none',
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: REPO_TOKENS.mint,
                boxShadow: `0 0 8px ${REPO_TOKENS.mint}`,
              }}
            />
            <span
              style={{
                fontFamily: REPO_FONT.mono,
                fontSize: 13,
                fontWeight: 700,
                color: t.ink,
                letterSpacing: '0.02em',
              }}
            >
              ZERO-BACKEND SECURE
            </span>
          </div>
        </header>

        {/* ZONE 2 — TIMELINE BREADCRUMB STEPPER (BENDASTEPPER) */}
        <div
          style={{
            marginTop: 22,
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
          }}
        >
          {/* Background Connecting Line */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: 20,
              right: 20,
              height: 2,
              backgroundColor: t.line,
              transform: 'translateY(-50%)',
              zIndex: 1,
            }}
          />
          {/* Active Progress Fill Line */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: 20,
              width: `${(activeStep / (STEPS.length - 1)) * 100}%`,
              height: 2.5,
              backgroundColor: t.accent,
              boxShadow: mode === 'dark' ? '0 0 10px #38bdf8' : 'none',
              transform: 'translateY(-50%)',
              zIndex: 2,
              transition: 'width 0.3s ease',
            }}
          />

          {STEPS.map((step, idx) => {
            const isCompleted = idx < activeStep;
            const isActive = idx === activeStep;
            return (
              <div
                key={step.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  zIndex: 3,
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: isActive ? 26 : 18,
                    height: isActive ? 26 : 18,
                    borderRadius: '50%',
                    backgroundColor: isActive
                      ? t.accent
                      : isCompleted
                      ? REPO_TOKENS.mint
                      : t.surface,
                    border: isActive
                      ? `3px solid ${t.bg}`
                      : isCompleted
                      ? `2px solid ${REPO_TOKENS.mint}`
                      : `2px solid ${t.lineStrong}`,
                    boxShadow: isActive
                      ? `0 0 16px ${t.accent}, 0 0 0 4px ${t.accentSoft}`
                      : isCompleted
                      ? `0 0 10px ${REPO_TOKENS.mint}`
                      : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {isCompleted && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="#ffffff"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {isActive && (
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: '#ffffff',
                      }}
                    />
                  )}
                </div>
                <span
                  style={{
                    position: 'absolute',
                    top: 28,
                    fontFamily: REPO_FONT.mono,
                    fontSize: 11,
                    fontWeight: isActive ? 800 : 600,
                    color: isActive ? t.accent : isCompleted ? t.ink : t.quiet,
                    whiteSpace: 'nowrap',
                    letterSpacing: '0.04em',
                  }}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* ZONE 3 — INTERACTIVE MAIN STAGE */}
        <div
          style={{
            flex: 1,
            marginTop: 24,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {children}
        </div>

        {/* ZONE 4 — TELEMETRY BOTTOM BAR (Di atas area subtitle aman) */}
        <footer
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 16,
            borderTop: `1px solid ${t.line}`,
            fontFamily: REPO_FONT.mono,
            fontSize: 13,
            color: t.quiet,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
            <span style={{color: t.accent, fontWeight: 700}}>URL:</span>
            <span>https://repoflow.web.id</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
            <span>BY RHMT OFC</span>
            <span style={{opacity: 0.4}}>|</span>
            <span style={{color: REPO_TOKENS.mint, fontWeight: 700}}>ATOMIC COMMIT</span>
          </div>
        </footer>
      </div>
    </AbsoluteFill>
  );
};

/**
 * Figma-style anchor selection frame for focusing viewer attention
 */
export const FigmaAnchorFrame: React.FC<{
  children: React.ReactNode;
  tag?: string;
  borderColor?: string;
}> = ({children, tag = 'FOCAL TARGET', borderColor = '#38bdf8'}) => {
  return (
    <div
      style={{
        position: 'relative',
        border: `2px solid ${borderColor}`,
        borderRadius: 8,
        padding: '12px 18px',
        display: 'inline-block',
        boxShadow: `0 0 20px ${borderColor}26`,
      }}
    >
      {/* 4 Corner Anchors */}
      <div
        style={{
          position: 'absolute',
          top: -5,
          left: -5,
          width: 8,
          height: 8,
          backgroundColor: '#ffffff',
          border: `2px solid ${borderColor}`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: -5,
          right: -5,
          width: 8,
          height: 8,
          backgroundColor: '#ffffff',
          border: `2px solid ${borderColor}`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -5,
          left: -5,
          width: 8,
          height: 8,
          backgroundColor: '#ffffff',
          border: `2px solid ${borderColor}`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -5,
          right: -5,
          width: 8,
          height: 8,
          backgroundColor: '#ffffff',
          border: `2px solid ${borderColor}`,
        }}
      />

      {/* Floating Tag */}
      {tag && (
        <span
          style={{
            position: 'absolute',
            top: -12,
            right: 14,
            backgroundColor: borderColor,
            color: '#07090e',
            fontFamily: REPO_FONT.mono,
            fontSize: 10,
            fontWeight: 800,
            padding: '2px 6px',
            borderRadius: 4,
            letterSpacing: '0.04em',
          }}
        >
          {tag}
        </span>
      )}

      {children}
    </div>
  );
};

/**
 * Dynamic Diagonal Sweep Transition between scenes
 */
export const RepoFlowTransitionSweep: React.FC<{
  atFrame: number;
  half?: number;
}> = ({atFrame, half = 12}) => {
  const frame = useCurrentFrame();
  const d = frame - atFrame;
  if (Math.abs(d) > half) return null;

  const u = interpolate(d, [-half, half], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const xLag = interpolate(u, [0, 1], [-115, 115]);
  const xLead = interpolate(u, [0, 1], [-125, 125]);
  const emblemScale = Math.pow(Math.sin(Math.PI * u), 2.5) * 1.15;
  const emblemRotate = (u - 0.5) * 36;

  return (
    <AbsoluteFill
      style={{
        zIndex: 90,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Dark Slate Base Panel */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${xLag}%`,
          width: '135%',
          backgroundColor: '#07090e',
          transform: 'skewX(-14deg)',
          boxShadow: '0 0 60px rgba(0, 0, 0, 0.85)',
        }}
      />
      {/* Sky Blue Cyan Foreground Panel */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${xLead}%`,
          width: '135%',
          backgroundColor: '#0ea5e9',
          transform: 'skewX(-14deg)',
          boxShadow: '0 0 80px rgba(56, 189, 248, 0.8)',
          borderLeft: '8px solid #ffffff',
        }}
      />

      {/* Center 3D Logo Emblem */}
      {emblemScale > 0.05 && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) scale(${emblemScale}) rotate(${emblemRotate}deg)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Img
            src={staticFile('assets/repoflow/icon.png')}
            style={{
              width: 170,
              height: 170,
              borderRadius: 38,
              border: '3px solid #38bdf8',
              boxShadow: '0 24px 60px rgba(2, 132, 199, 0.6)',
              filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.65))',
            }}
          />
        </div>
      )}
    </AbsoluteFill>
  );
};
