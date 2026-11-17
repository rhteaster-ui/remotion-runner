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
  'PROBLEM',
  'UNPACK',
  'ATOMIC TREE',
  'AES-256 VAULT',
  'BRAND',
];

export const RepoFlowShell: React.FC<{
  mode?: 'dark' | 'light';
  activeStep?: number;
  subtitle?: string;
  children: React.ReactNode;
}> = ({
  mode = 'dark',
  activeStep = 0,
  subtitle = 'CLIENT-SIDE GIT ENGINE',
  children,
}) => {
  const frame = useCurrentFrame();
  const t = REPO_TOKENS[mode];

  // Subtle ambient breathing for volumetric depth (zero blueprint grid lines!)
  const pulse = Math.sin(frame * 0.06) * 0.06 + 1;
  const glowX = Math.sin(frame * 0.025) * 50;
  const glowY = Math.cos(frame * 0.02) * 35;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: t.bg,
        color: t.ink,
        fontFamily: REPO_FONT.sans,
        overflow: 'hidden',
      }}
    >
      {/* Cinematic Studio Ambient Radial Illumination (Zero Blueprint Grid!) */}
      {mode === 'dark' ? (
        <>
          <div
            style={{
              position: 'absolute',
              top: 180 + glowY,
              left: 120 + glowX,
              width: 800,
              height: 800,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(14, 165, 233, 0.16) 0%, transparent 68%)',
              filter: 'blur(100px)',
              pointerEvents: 'none',
              transform: `scale(${pulse})`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 200,
              right: 60,
              width: 500,
              height: 500,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
              filter: 'blur(90px)',
              pointerEvents: 'none',
            }}
          />
        </>
      ) : (
        <>
          <div
            style={{
              position: 'absolute',
              top: 160 + glowY,
              right: 80 + glowX,
              width: 750,
              height: 750,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(2, 132, 199, 0.10) 0%, transparent 68%)',
              filter: 'blur(90px)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 220,
              left: 60,
              width: 500,
              height: 500,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(56, 189, 248, 0.08) 0%, transparent 70%)',
              filter: 'blur(80px)',
              pointerEvents: 'none',
            }}
          />
        </>
      )}

      {/* Main Container Layout */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          padding: '48px 44px 150px',
          boxSizing: 'border-box',
          zIndex: 10,
        }}
      >
        {/* MODERN KEYNOTE TOP BAR */}
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 20,
            borderBottom: `1px solid ${t.line}`,
          }}
        >
          {/* Brand Mark */}
          <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
            <Img
              src={staticFile('assets/repoflow/icon.png')}
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                border: `2px solid ${t.accentBorder}`,
                boxShadow: `0 8px 24px ${t.accentSoft}`,
              }}
            />
            <div>
              <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                <span
                  style={{
                    fontFamily: REPO_FONT.display,
                    fontSize: 30,
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    color: t.ink,
                  }}
                >
                  RepoFlow
                </span>
                <span
                  style={{
                    fontSize: 14,
                    fontFamily: REPO_FONT.mono,
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: 8,
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
                  fontSize: 14,
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
              gap: 10,
              backgroundColor: t.surface,
              padding: '10px 18px',
              borderRadius: 30,
              border: `1.5px solid ${t.lineStrong}`,
              boxShadow: mode === 'dark' ? '0 4px 20px rgba(0, 0, 0, 0.4)' : '0 2px 10px rgba(0,0,0,0.06)',
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: REPO_TOKENS.mint,
                boxShadow: `0 0 10px ${REPO_TOKENS.mint}`,
              }}
            />
            <span
              style={{
                fontFamily: REPO_FONT.mono,
                fontSize: 14,
                fontWeight: 700,
                color: t.ink,
                letterSpacing: '0.03em',
              }}
            >
              rhmt.biz.id
            </span>
          </div>
        </header>

        {/* MODERN MINIMALIST SEGMENTED PROGRESS BAR (Replaces Wire Stepper) */}
        <div
          style={{
            marginTop: 18,
            marginBottom: 26,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          {STEPS.map((step, idx) => {
            const isCompleted = idx < activeStep;
            const isActive = idx === activeStep;
            return (
              <div
                key={step}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 14px',
                  borderRadius: 20,
                  backgroundColor: isActive
                    ? t.accentSoft
                    : isCompleted
                    ? 'rgba(16, 185, 129, 0.12)'
                    : 'transparent',
                  border: isActive
                    ? `1.5px solid ${t.accent}`
                    : isCompleted
                    ? '1.5px solid rgba(16, 185, 129, 0.4)'
                    : `1px solid ${t.line}`,
                  transition: 'all 0.3s ease',
                }}
              >
                <span
                  style={{
                    fontFamily: REPO_FONT.mono,
                    fontSize: 12,
                    fontWeight: 800,
                    color: isActive
                      ? t.accent
                      : isCompleted
                      ? REPO_TOKENS.mint
                      : t.quiet,
                  }}
                >
                  {isCompleted ? '✓' : `0${idx + 1}`}
                </span>
                <span
                  style={{
                    fontFamily: REPO_FONT.sans,
                    fontSize: 13,
                    fontWeight: isActive ? 800 : 600,
                    color: isActive
                      ? t.ink
                      : isCompleted
                      ? t.ink
                      : t.quiet,
                    letterSpacing: '0.02em',
                  }}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>

        {/* EXPANSIVE MAIN STAGE */}
        <main
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {children}
        </main>
      </div>
    </AbsoluteFill>
  );
};

/**
 * Modern High-Impact Header Box (Clean, bold, zero Figma corner tick marks!)
 */
export const FigmaAnchorFrame: React.FC<{
  children: React.ReactNode;
  tag?: string;
  borderColor?: string;
}> = ({children, tag, borderColor = '#38bdf8'}) => {
  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {tag && (
        <span
          style={{
            marginBottom: 8,
            backgroundColor: `${borderColor}22`,
            color: borderColor,
            border: `1px solid ${borderColor}66`,
            fontFamily: REPO_FONT.mono,
            fontSize: 13,
            fontWeight: 800,
            padding: '4px 12px',
            borderRadius: 8,
            letterSpacing: '0.06em',
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
