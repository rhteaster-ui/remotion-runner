import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {FONT} from '../theme-tokens';

interface CalloutPillProps {
  text: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'neutral' | 'success' | 'warning' | 'danger';
  delay?: number;
  fontSize?: number;
}

export const CalloutPill: React.FC<CalloutPillProps> = ({
  text,
  leftIcon,
  rightIcon,
  variant = 'neutral',
  delay = 0,
  fontSize = 20,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const animFrame = Math.max(0, frame - delay);
  const scale = spring({
    fps,
    frame: animFrame,
    config: {damping: 14, mass: 0.8},
  });

  const styles = {
    neutral: {
      bg: '#ffffff',
      border: 'rgba(148, 163, 184, 0.35)',
      text: '#0f172a',
      shadow: '0 8px 24px rgba(15, 23, 42, 0.12)',
    },
    success: {
      bg: 'rgba(34, 197, 94, 0.12)',
      border: '#22c55e',
      text: '#15803d',
      shadow: '0 8px 24px rgba(34, 197, 94, 0.2)',
    },
    warning: {
      bg: 'rgba(245, 158, 11, 0.12)',
      border: '#f59e0b',
      text: '#b45309',
      shadow: '0 8px 24px rgba(245, 158, 11, 0.2)',
    },
    danger: {
      bg: 'rgba(239, 68, 68, 0.12)',
      border: '#ef4444',
      text: '#b91c1c',
      shadow: '0 8px 24px rgba(239, 68, 68, 0.2)',
    },
  }[variant];

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 24px',
        borderRadius: 9999,
        backgroundColor: styles.bg,
        border: `1.5px solid ${styles.border}`,
        boxShadow: styles.shadow,
        transform: `scale(${scale})`,
        fontFamily: FONT.space,
        fontSize,
        fontWeight: 600,
        color: styles.text,
        letterSpacing: '-0.01em',
      }}
    >
      {leftIcon && (
        <span style={{display: 'flex', alignItems: 'center'}}>
          {leftIcon}
        </span>
      )}

      <span>{text}</span>

      {rightIcon && (
        <span style={{display: 'flex', alignItems: 'center', opacity: 0.7}}>
          {rightIcon}
        </span>
      )}
    </div>
  );
};
