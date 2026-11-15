import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {AgencyPresenterAnchor, MascotGesture} from './components/AgencyPresenterAnchor';
import {COLOR, FONT} from './theme-tokens';

export const MascotShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // 4 Stages, 90 frames (3 seconds) each
  // 0 - 90: Idle & Blinking
  // 90 - 180: Alert & Shock Tremor
  // 180 - 270: Thinking & Analysis
  // 270 - 360: Happy & Buoyant Smile
  let gesture: MascotGesture = 'idle';
  let stateTitle = 'STATE 1: IDLE & NATURAL BLINKING';
  let stateDesc = 'Makhluk melayang bertudung selimut empuk dengan siklus kedip mata natural & breathing float.';
  let stateColor = '#a3e635';

  if (frame >= 90 && frame < 180) {
    gesture = 'warning_stop';
    stateTitle = 'STATE 2: ALERT & SHOCKWAVE';
    stateDesc = 'Reaksi terkejut dengan pupil melebar, getaran mikro, dan gelombang ripple neon reaktif.';
    stateColor = '#ef4444';
  } else if (frame >= 180 && frame < 270) {
    gesture = 'thinking';
    stateTitle = 'STATE 3: CONTEMPLATIVE THINKING';
    stateDesc = 'Posisi miring santai dengan lirikan mata ke kanan atas untuk segmen analisa teknis.';
    stateColor = '#3b82f6';
  } else if (frame >= 270) {
    gesture = 'thumbs_up';
    stateTitle = 'STATE 4: BUOYANT SMILE & VICTORY';
    stateDesc = 'Mata melengkung tersenyum ^^ dengan pantulan melayang gembira (squash & stretch).';
    stateColor = '#84cc16';
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0b0b0d',
        fontFamily: FONT.sans,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '60px 40px',
        color: '#ffffff',
        overflow: 'hidden',
      }}
    >
      {/* Background Subtle Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle at 50% 45%, rgba(163, 230, 53, 0.08) 0%, transparent 60%), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '100% 100%, 48px 48px, 48px 48px',
          pointerEvents: 'none',
        }}
      />

      {/* Header Anchor */}
      <div
        style={{
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          marginTop: 20,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '8px 18px',
            borderRadius: 999,
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: stateColor,
              boxShadow: `0 0 12px ${stateColor}`,
            }}
          />
          <span
            style={{
              fontFamily: FONT.mono,
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: '#f8fafc',
            }}
          >
            RHMT OFC · MASCOT MOTION ENGINE
          </span>
        </div>

        {/* Dynamic State Badge */}
        <div
          style={{
            fontFamily: FONT.space,
            fontSize: 28,
            fontWeight: 800,
            color: stateColor,
            textShadow: `0 0 24px ${stateColor}88`,
            letterSpacing: '0.04em',
          }}
        >
          {stateTitle}
        </div>
      </div>

      {/* Main Mascot Stage */}
      <div
        style={{
          zIndex: 10,
          flex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <AgencyPresenterAnchor
          gesture={gesture}
          size={520}
          positionMode="centered"
          theme="dark"
        />
      </div>

      {/* Bottom Forensic Description Card */}
      <div
        style={{
          zIndex: 10,
          backgroundColor: 'rgba(18, 18, 22, 0.85)',
          border: '1.5px solid rgba(255,255,255,0.1)',
          borderRadius: 20,
          padding: '20px 28px',
          maxWidth: 720,
          width: '90%',
          textAlign: 'center',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
          marginBottom: 30,
        }}
      >
        <p
          style={{
            fontFamily: FONT.sans,
            fontSize: 22,
            lineHeight: 1.5,
            color: '#e2e8f0',
            margin: 0,
            fontWeight: 500,
          }}
        >
          {stateDesc}
        </p>
      </div>
    </AbsoluteFill>
  );
};
