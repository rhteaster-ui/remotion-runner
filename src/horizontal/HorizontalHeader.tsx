import React from 'react';
import { EREKAP_FONT, EREKAP_TOKENS as T } from '../lib/erekapTokens';

interface HorizontalHeaderProps {
  currentStepIndex: number;
}

const STEPS = [
  { id: 1, label: 'Multi-Perangkat' },
  { id: 2, label: 'Dashboard Live' },
  { id: 3, label: 'Mode Excel' },
  { id: 4, label: 'Cetak A4 & Admin' },
  { id: 5, label: 'rhmt ofc' },
];

export const HorizontalHeader: React.FC<HorizontalHeaderProps> = ({ currentStepIndex }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 24,
        left: 48,
        right: 48,
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        borderRadius: 20,
        backgroundColor: 'rgba(7, 41, 25, 0.72)',
        border: '1px solid rgba(163, 230, 53, 0.28)',
        boxShadow: '0 12px 30px -8px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
        backdropFilter: 'blur(16px)',
        zIndex: 50,
      }}
    >
      {/* Brand & App Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 12,
            backgroundColor: 'rgba(163, 230, 53, 0.15)',
            border: '1.5px solid rgba(163, 230, 53, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 14px rgba(163, 230, 53, 0.25)',
          }}
        >
          <svg width={22} height={22} viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z"
              stroke="#A3E635"
              strokeWidth="2"
            />
            <path d="M8 10h8M8 14h5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            <circle cx="16.5" cy="14.5" r="2.5" fill="#A3E635" />
          </svg>
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                fontFamily: EREKAP_FONT.sans,
                fontSize: 18,
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
              }}
            >
              E-Rekap
            </span>
            <span
              style={{
                fontFamily: EREKAP_FONT.mono,
                fontSize: 10,
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 999,
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                color: '#A3E635',
                border: '1px solid rgba(163, 230, 53, 0.3)',
              }}
            >
              v1.0.0
            </span>
          </div>
          <span
            style={{
              fontFamily: EREKAP_FONT.sans,
              fontSize: 11,
              fontWeight: 600,
              color: 'rgba(231, 245, 236, 0.7)',
            }}
          >
            Sistem Rekapitulasi Kehadiran Siswa
          </span>
        </div>
      </div>

      {/* Stepper Progress Indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {STEPS.map((step, idx) => {
          const isActive = idx === currentStepIndex;
          const isPassed = idx < currentStepIndex;

          return (
            <div
              key={step.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                padding: '5px 14px',
                borderRadius: 999,
                backgroundColor: isActive
                  ? '#A3E635'
                  : isPassed
                  ? 'rgba(163, 230, 53, 0.18)'
                  : 'rgba(255, 255, 255, 0.05)',
                border: isActive
                  ? '1.5px solid #BEF264'
                  : isPassed
                  ? '1px solid rgba(163, 230, 53, 0.35)'
                  : '1px solid rgba(255, 255, 255, 0.08)',
                transition: 'all 200ms ease',
              }}
            >
              <span
                style={{
                  fontFamily: EREKAP_FONT.mono,
                  fontSize: 11,
                  fontWeight: 800,
                  color: isActive ? '#072919' : isPassed ? '#A3E635' : 'rgba(255, 255, 255, 0.4)',
                }}
              >
                0{step.id}
              </span>
              <span
                style={{
                  fontFamily: EREKAP_FONT.sans,
                  fontSize: 12,
                  fontWeight: isActive ? 800 : 600,
                  color: isActive ? '#072919' : isPassed ? '#E7F5EC' : 'rgba(255, 255, 255, 0.45)',
                }}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Institutional School Tag */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '6px 14px',
          borderRadius: 999,
          backgroundColor: 'rgba(0, 0, 0, 0.35)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: 999,
            backgroundColor: '#A3E635',
            boxShadow: '0 0 8px #A3E635',
          }}
        />
        <span
          style={{
            fontFamily: EREKAP_FONT.sans,
            fontSize: 11,
            fontWeight: 700,
            color: '#FFFFFF',
          }}
        >
          MA NU Islamiyah Asembagus
        </span>
      </div>
    </div>
  );
};
