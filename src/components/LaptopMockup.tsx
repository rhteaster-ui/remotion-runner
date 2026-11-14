import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

interface LaptopMockupProps {
  children?: React.ReactNode;
  width?: number;
  delay?: number;
  theme?: 'dark' | 'light';
}

export const LaptopMockup: React.FC<LaptopMockupProps> = ({
  children,
  width = 820,
  delay = 0,
  theme = 'dark',
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const animFrame = Math.max(0, frame - delay);
  const scale = spring({
    fps,
    frame: animFrame,
    config: {damping: 14, mass: 0.9, stiffness: 140},
  });

  const opacity = interpolate(animFrame, [0, 8], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const screenHeight = width * 0.62;
  const isDark = theme === 'dark';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity,
        transform: `scale(${scale})`,
        width,
        position: 'relative',
        margin: '0 auto',
      }}
    >
      {/* Laptop Screen Lid */}
      <div
        style={{
          width: '88%',
          height: screenHeight,
          backgroundColor: '#0a0d14',
          borderRadius: '16px 16px 4px 4px',
          border: '2px solid #2a3342',
          padding: 12,
          boxShadow: '0 24px 50px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.08)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Top Webcam Notch */}
        <div
          style={{
            position: 'absolute',
            top: 4,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: '#1e293b',
            boxShadow: 'inset 0 0 2px #000000',
            zIndex: 10,
          }}
        />

        {/* Inner Display Area */}
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: isDark ? '#05070c' : '#ffffff',
            borderRadius: 8,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {children}
        </div>
      </div>

      {/* Laptop Hinge & Base Deck */}
      <div
        style={{
          width: '98%',
          height: 18,
          background: 'linear-gradient(180deg, #94a3b8 0%, #475569 60%, #334155 100%)',
          borderRadius: '2px 2px 10px 10px',
          boxShadow: '0 12px 30px rgba(0,0,0,0.6)',
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        {/* Center Trackpad Thumb Groove Notch */}
        <div
          style={{
            width: 110,
            height: 6,
            backgroundColor: '#1e293b',
            borderRadius: '0 0 6px 6px',
            opacity: 0.7,
          }}
        />
      </div>

      {/* Table Surface Reflection / Shadow */}
      <div
        style={{
          width: '90%',
          height: 14,
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 70%)',
          marginTop: -2,
        }}
      />
    </div>
  );
};
