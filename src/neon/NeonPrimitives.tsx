import React from 'react';
import {useCurrentFrame} from 'remotion';
import {E, p} from './motion';
import {NEON_FONT, NEON_TOKENS as T} from './neonTokens';

export const sans = NEON_FONT.sans;
export const mono = NEON_FONT.mono;

/* ══════════════════════════════════════════════════════════════════════════
   1. TOP PERSISTENT STEPPER HUD (Claude-Style Clean Floating Header)
   ══════════════════════════════════════════════════════════════════════════ */
export const NeonHeaderHUD: React.FC<{activeStep: number}> = ({activeStep}) => {
  const f = useCurrentFrame();
  const steps = [
    {n: '01', label: 'Hook'},
    {n: '02', label: 'Arsitektur'},
    {n: '03', label: 'Thinking'},
    {n: '04', label: 'Benchmark'},
    {n: '05', label: 'rhmt ofc'},
  ];

  return (
    <div
      style={{
        position: 'absolute',
        top: 36,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 960,
        height: 60,
        borderRadius: 999,
        backgroundColor: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(20px)',
        border: '1.5px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 16px 36px -8px rgba(0, 0, 0, 0.6), 0 0 25px rgba(255, 94, 30, 0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        zIndex: 85,
      }}
    >
      {/* Brand Identity */}
      <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            backgroundColor: 'rgba(255, 94, 30, 0.2)',
            border: '1.5px solid #FF5E1E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
              fill="#FF5E1E"
            />
          </svg>
        </div>
        <div style={{display: 'flex', alignItems: 'baseline', gap: 6}}>
          <span
            style={{
              fontFamily: sans,
              fontSize: 16,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
            }}
          >
            Gemini 4 <span style={{color: '#FF5E1E'}}>Neon</span>
          </span>
          <span
            style={{
              fontFamily: mono,
              fontSize: 11,
              fontWeight: 800,
              color: '#FF5E1E',
              backgroundColor: 'rgba(255, 94, 30, 0.18)',
              padding: '2px 8px',
              borderRadius: 6,
              border: '1px solid rgba(255, 94, 30, 0.35)',
            }}
          >
            v2026.11
          </span>
        </div>
      </div>

      {/* Stepper Pills */}
      <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
        {steps.map((st, i) => {
          const isActive = i === activeStep;
          return (
            <div
              key={st.n}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 14px',
                borderRadius: 999,
                backgroundColor: isActive ? 'rgba(255, 94, 30, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                border: isActive ? '1.5px solid #FF5E1E' : '1px solid transparent',
                color: isActive ? '#FFFFFF' : '#94A3B8',
                fontFamily: mono,
                fontSize: 11,
                fontWeight: isActive ? 800 : 600,
                boxShadow: isActive ? '0 0 12px rgba(255, 94, 30, 0.4)' : 'none',
              }}
            >
              {isActive && (
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: 999,
                    backgroundColor: '#FF5E1E',
                    boxShadow: '0 0 8px #FF5E1E',
                  }}
                />
              )}
              {st.n} · {st.label}
            </div>
          );
        })}
      </div>

      {/* Status Badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          fontFamily: mono,
          fontSize: 12,
          fontWeight: 700,
          color: '#10B981',
          backgroundColor: 'rgba(16, 185, 129, 0.12)',
          padding: '4px 12px',
          borderRadius: 999,
          border: '1px solid rgba(16, 185, 129, 0.3)',
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: 999,
            backgroundColor: '#10B981',
            boxShadow: '0 0 6px #10B981',
          }}
        />
        ONLINE
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   2. TACTICAL SIDE WIDGET (Claude SideCard for filling empty canvas)
   ══════════════════════════════════════════════════════════════════════════ */
export const TelemetryCard: React.FC<{
  label: string;
  value: string;
  sub?: string;
  top: number;
  side: 'left' | 'right';
  delay: number;
  accent?: string;
  iconName?: string;
}> = ({label, value, sub, top, side, delay, accent = '#FF5E1E'}) => {
  const f = useCurrentFrame();
  const q = p(f, delay, delay + 20, E.back);
  const dir = side === 'left' ? -1 : 1;

  return (
    <div
      style={{
        position: 'absolute',
        top,
        [side]: 54,
        width: 220,
        padding: '16px 18px',
        borderRadius: 20,
        backgroundColor: 'rgba(15, 23, 42, 0.92)',
        backdropFilter: 'blur(16px)',
        border: `1.5px solid rgba(255, 255, 255, 0.12)`,
        boxShadow: '0 16px 36px -10px rgba(0, 0, 0, 0.7), 0 0 20px rgba(255, 94, 30, 0.1)',
        opacity: Math.min(1, q * 1.5),
        transform: `translateX(${(1 - q) * 100 * dir}px) translateY(${Math.sin(f * 0.04 + delay) * 4}px)`,
        zIndex: 40,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontFamily: mono,
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: '0.14em',
          color: '#94A3B8',
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            backgroundColor: accent,
            boxShadow: `0 0 8px ${accent}`,
          }}
        />
        {label}
      </div>
      <div
        style={{
          fontFamily: sans,
          fontSize: 26,
          fontWeight: 800,
          color: '#FFFFFF',
          marginTop: 6,
          letterSpacing: '-0.02em',
        }}
      >
        {value}
      </div>
      {sub && (
        <div
          style={{
            fontFamily: mono,
            fontSize: 11,
            color: accent,
            marginTop: 4,
            fontWeight: 600,
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   3. BOTTOM SPEC CHIP STRIP (Filling lower zone y: 1540 - 1680)
   ══════════════════════════════════════════════════════════════════════════ */
export const SpecPillStrip: React.FC<{
  pills: {label: string; value: string; accent?: string}[];
  delay?: number;
}> = ({pills, delay = 20}) => {
  const f = useCurrentFrame();

  return (
    <div
      style={{
        position: 'absolute',
        top: 1540,
        left: 54,
        right: 54,
        display: 'flex',
        justifyContent: 'center',
        gap: 14,
        zIndex: 50,
      }}
    >
      {pills.map((pItem, i) => {
        const q = p(f, delay + i * 6, delay + 22 + i * 6, E.back);
        const col = pItem.accent || '#FF5E1E';
        return (
          <div
            key={pItem.label}
            style={{
              flex: 1,
              padding: '14px 20px',
              borderRadius: 18,
              backgroundColor: 'rgba(15, 23, 42, 0.88)',
              border: `1.5px solid rgba(255, 255, 255, 0.1)`,
              backdropFilter: 'blur(16px)',
              boxShadow: '0 12px 28px -8px rgba(0,0,0,0.6)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              opacity: q,
              transform: `translateY(${(1 - q) * 30}px)`,
            }}
          >
            <div
              style={{
                fontFamily: mono,
                fontSize: 11,
                fontWeight: 700,
                color: '#94A3B8',
                letterSpacing: '0.12em',
              }}
            >
              {pItem.label}
            </div>
            <div
              style={{
                fontFamily: sans,
                fontSize: 20,
                fontWeight: 800,
                color: col,
                marginTop: 4,
              }}
            >
              {pItem.value}
            </div>
          </div>
        );
      })}
    </div>
  );
};
