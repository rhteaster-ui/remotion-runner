import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {FONT} from '../theme-tokens';

export interface StepItem {
  id: string;
  label: string;
  sublabel?: string;
}

interface TimelineStepperProps {
  steps: StepItem[];
  activeStep: number;
  metricBadge?: string;
  theme?: 'dark' | 'light';
}

export const TimelineStepper: React.FC<TimelineStepperProps> = ({
  steps,
  activeStep,
  metricBadge,
  theme = 'dark',
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const isDark = theme === 'dark';
  const lineColor = isDark ? 'rgba(148, 163, 184, 0.25)' : 'rgba(100, 116, 139, 0.25)';
  const activeGreen = '#22c55e';
  const labelColor = isDark ? '#94a3b8' : '#64748b';
  const activeLabelColor = isDark ? '#f8fafc' : '#0f172a';

  // Connecting line progress
  const progressPercent = steps.length > 1 ? (activeStep / (steps.length - 1)) * 100 : 0;

  return (
    <div
      style={{
        width: '100%',
        padding: '16px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        {/* Background track line */}
        <div
          style={{
            position: 'absolute',
            left: 20,
            right: 20,
            top: 14,
            height: 3,
            backgroundColor: lineColor,
            zIndex: 1,
          }}
        />

        {/* Active progress track line */}
        <div
          style={{
            position: 'absolute',
            left: 20,
            width: `calc(${progressPercent}% - 40px)`,
            maxWidth: 'calc(100% - 40px)',
            top: 14,
            height: 3,
            backgroundColor: activeGreen,
            boxShadow: `0 0 10px ${activeGreen}80`,
            zIndex: 2,
            transition: 'width 0.3s ease-out',
          }}
        />

        {/* Steps Nodes */}
        {steps.map((s, idx) => {
          const isDone = idx < activeStep;
          const isActive = idx === activeStep;

          const pulseScale = isActive
            ? 1 + Math.sin(frame / 6) * 0.1
            : 1;

          return (
            <div
              key={s.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 3,
                minWidth: 80,
              }}
            >
              {/* Dot Icon */}
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  backgroundColor: isDone || isActive ? activeGreen : isDark ? '#0f172a' : '#ffffff',
                  border: `3px solid ${isDone || isActive ? activeGreen : lineColor}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: `scale(${pulseScale})`,
                  boxShadow: isActive ? `0 0 16px ${activeGreen}cc` : 'none',
                }}
              >
                {isDone && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
                {isActive && (
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      backgroundColor: '#ffffff',
                    }}
                  />
                )}
              </div>

              {/* Step Label */}
              <span
                style={{
                  marginTop: 8,
                  fontFamily: FONT.space,
                  fontSize: 18,
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? activeLabelColor : labelColor,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                {s.label}
              </span>

              {s.sublabel && (
                <span
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 14,
                    color: labelColor,
                    opacity: 0.8,
                  }}
                >
                  {s.sublabel}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Metric Badge (if present) */}
      {metricBadge && (
        <div
          style={{
            alignSelf: 'flex-end',
            fontFamily: FONT.mono,
            fontSize: 20,
            fontWeight: 700,
            color: activeGreen,
            backgroundColor: `${activeGreen}18`,
            padding: '4px 12px',
            borderRadius: 6,
            border: `1px solid ${activeGreen}40`,
          }}
        >
          {metricBadge}
        </div>
      )}
    </div>
  );
};
