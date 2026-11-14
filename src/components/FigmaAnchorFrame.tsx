import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {FONT} from '../theme-tokens';

interface FigmaAnchorFrameProps {
  text: string;
  subtext?: string;
  color?: string;
  fontSize?: number;
  delay?: number;
}

export const FigmaAnchorFrame: React.FC<FigmaAnchorFrameProps> = ({
  text,
  subtext,
  color = '#3b82f6',
  fontSize = 64,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const animFrame = Math.max(0, frame - delay);
  const scale = spring({
    fps,
    frame: animFrame,
    config: {damping: 14, mass: 0.8, stiffness: 180},
  });

  const opacity = interpolate(animFrame, [0, 8], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const dotSize = 10;
  const dotOffset = -dotSize / 2;

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        opacity,
        transform: `scale(${scale})`,
        margin: '12px 0',
      }}
    >
      <div
        style={{
          position: 'relative',
          padding: '10px 24px',
          border: `2px solid ${color}`,
          backgroundColor: `${color}18`,
          borderRadius: 4,
          fontFamily: FONT.space,
          fontWeight: 700,
          fontSize,
          color: '#ffffff',
          letterSpacing: '-0.02em',
          textShadow: '0 2px 12px rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Corner Anchor Handles */}
        <div style={{...handleStyle, top: dotOffset, left: dotOffset, borderColor: color}} />
        <div style={{...handleStyle, top: dotOffset, right: dotOffset, borderColor: color}} />
        <div style={{...handleStyle, bottom: dotOffset, left: dotOffset, borderColor: color}} />
        <div style={{...handleStyle, bottom: dotOffset, right: dotOffset, borderColor: color}} />

        {/* Edge Center Anchor Handles */}
        <div style={{...handleStyle, top: dotOffset, left: '50%', transform: 'translateX(-50%)', borderColor: color}} />
        <div style={{...handleStyle, bottom: dotOffset, left: '50%', transform: 'translateX(-50%)', borderColor: color}} />
        <div style={{...handleStyle, left: dotOffset, top: '50%', transform: 'translateY(-50%)', borderColor: color}} />
        <div style={{...handleStyle, right: dotOffset, top: '50%', transform: 'translateY(-50%)', borderColor: color}} />

        {text}
      </div>

      {subtext && (
        <span
          style={{
            marginTop: 8,
            fontFamily: FONT.mono,
            fontSize: 22,
            color: '#94a3b8',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          {subtext}
        </span>
      )}
    </div>
  );
};

const handleStyle: React.CSSProperties = {
  position: 'absolute',
  width: 10,
  height: 10,
  backgroundColor: '#ffffff',
  borderWidth: 2,
  borderStyle: 'solid',
  borderRadius: 2,
  boxShadow: '0 1px 4px rgba(0,0,0,0.5)',
};
