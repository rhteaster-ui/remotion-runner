import React from 'react';
import {chipTokens} from './tokens';
import {FONT} from '../theme-tokens';

interface ChipHUDProps {
  index: string;
  label: string;
  stepIndex: number; // 0 to 5
  dark?: boolean;
  metricTag?: string;
}

const STEPS = [
  {id: '01', title: 'VIRAL'},
  {id: '02', title: 'REALITA'},
  {id: '03', title: 'FABLESS'},
  {id: '04', title: 'ENKRIPSI'},
  {id: '05', title: 'ROADMAP'},
  {id: '06', title: 'RHMT OFC'},
];

export const ChipHUD: React.FC<ChipHUDProps> = ({
  index,
  label,
  stepIndex,
  dark = true,
  metricTag = 'SECURE SILICON RI',
}) => {
  const border = dark ? 'rgba(255,255,255,0.22)' : chipTokens.ink;
  const bg = dark ? 'rgba(17, 16, 29, 0.88)' : chipTokens.white;
  const textCol = dark ? chipTokens.white : chipTokens.ink;

  return (
    <div
      style={{
        position: 'absolute',
        top: 48,
        left: 56,
        right: 56,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        zIndex: 80,
        pointerEvents: 'none',
      }}
    >
      {/* Zone 1: Top Anchor Frame (Scene ID + Brand Wordmark) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 58,
        }}
      >
        {/* Left Scene Index Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '8px 20px',
            borderRadius: 999,
            backgroundColor: bg,
            border: `3px solid ${border}`,
            boxShadow: dark ? '4px 4px 0px rgba(225,29,72,0.55)' : `4px 4px 0px ${chipTokens.ink}`,
          }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: chipTokens.crimson,
              display: 'inline-block',
              boxShadow: `0 0 8px ${chipTokens.crimson}`,
            }}
          />
          <span
            style={{
              fontFamily: FONT.mono,
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: '0.04em',
              color: textCol,
            }}
          >
            {index} · {label}
          </span>
        </div>

        {/* Right Personal Brand Badge (pure rhmt ofc — ZERO Gemini logo) */}
        <div
          style={{
            padding: '8px 22px',
            borderRadius: 999,
            backgroundColor: dark ? chipTokens.gold : chipTokens.ink,
            border: `3px solid ${chipTokens.ink}`,
            boxShadow: dark ? `4px 4px 0px ${chipTokens.crimson}` : `4px 4px 0px ${chipTokens.crimson}`,
          }}
        >
          <span
            style={{
              fontFamily: FONT.space,
              fontSize: 24,
              fontWeight: 900,
              letterSpacing: '0.04em',
              color: dark ? chipTokens.ink : chipTokens.white,
            }}
          >
            rhmt ofc
          </span>
        </div>
      </div>

      {/* Zone 2: Horizontal Segmented Stepper */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          backgroundColor: dark ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.92)',
          border: `2.5px solid ${dark ? 'rgba(255,255,255,0.18)' : chipTokens.ink}`,
          borderRadius: 16,
          padding: '10px 18px',
          boxShadow: dark ? '4px 4px 0px rgba(0,0,0,0.5)' : `4px 4px 0px ${chipTokens.ink}`,
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 8, flex: 1}}>
          {STEPS.map((step, idx) => {
            const isDone = idx < stepIndex;
            const isActive = idx === stepIndex;
            const activeColor =
              stepIndex === 1
                ? chipTokens.crimson
                : stepIndex === 2
                ? chipTokens.cobaltLight
                : stepIndex === 3
                ? chipTokens.emerald
                : stepIndex === 4
                ? chipTokens.gold
                : chipTokens.crimson;

            return (
              <div
                key={step.id}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT.mono,
                      fontSize: 14,
                      fontWeight: 800,
                      color: isActive
                        ? activeColor
                        : isDone
                        ? chipTokens.emerald
                        : dark
                        ? '#64748B'
                        : '#94A3B8',
                    }}
                  >
                    {step.id} {step.title}
                  </span>
                  {isDone && (
                    <span
                      style={{
                        fontFamily: FONT.mono,
                        fontSize: 12,
                        fontWeight: 900,
                        color: chipTokens.emerald,
                      }}
                    >
                      ✓
                    </span>
                  )}
                </div>
                {/* Segment Bar */}
                <div
                  style={{
                    height: 6,
                    borderRadius: 999,
                    backgroundColor: isDone
                      ? chipTokens.emerald
                      : isActive
                      ? activeColor
                      : dark
                      ? 'rgba(255,255,255,0.14)'
                      : 'rgba(0,0,0,0.12)',
                    boxShadow: isActive ? `0 0 8px ${activeColor}` : 'none',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Live Telemetry / Metric Tag */}
        <div
          style={{
            marginLeft: 12,
            paddingLeft: 12,
            borderLeft: `2px solid ${dark ? 'rgba(255,255,255,0.16)' : 'rgba(0,0,0,0.16)'}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <span
            style={{
              fontFamily: FONT.mono,
              fontSize: 13,
              fontWeight: 800,
              color: dark ? chipTokens.gold : chipTokens.crimson,
              letterSpacing: '0.06em',
            }}
          >
            {metricTag}
          </span>
        </div>
      </div>
    </div>
  );
};
