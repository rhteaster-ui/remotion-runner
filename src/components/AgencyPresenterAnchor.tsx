import React from 'react';
import {Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {FONT} from '../theme-tokens';

export type MascotGesture =
  | 'idle'
  | 'point_up'
  | 'thumbs_up'
  | 'warning_stop'
  | 'thinking'
  | 'alert';

interface AgencyPresenterAnchorProps {
  gesture?: MascotGesture;
  speechText?: string;
  size?: number;
  bottomOffset?: number;
  side?: 'center' | 'left' | 'right';
  theme?: 'dark' | 'light';
  positionMode?: 'bottom_fixed' | 'centered';
}

export const AgencyPresenterAnchor: React.FC<AgencyPresenterAnchorProps> = ({
  gesture = 'idle',
  speechText,
  size = 280,
  bottomOffset = 110,
  side = 'center',
  theme = 'dark',
  positionMode = 'bottom_fixed',
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Natural multi-harmonic floating physics
  const isAlert = gesture === 'warning_stop' || gesture === 'alert';
  const isThinking = gesture === 'thinking';
  const isHappy = gesture === 'thumbs_up';
  const isPointUp = gesture === 'point_up';

  // Floating breathing cycle
  let floatY = Math.sin(frame / 14) * 8;
  let floatRotate = Math.sin(frame / 20) * 2;
  let squashX = 1 + Math.sin(frame / 14) * 0.02;
  let squashY = 1 - Math.sin(frame / 14) * 0.02;

  // State-specific physics modifiers
  if (isAlert) {
    // High frequency shock tremor + sudden recoil
    const shake = Math.sin(frame * 1.8) * 3;
    floatY = -12 + shake;
    floatRotate = Math.cos(frame * 1.5) * 2.5;
    squashX = 1.05;
    squashY = 0.96;
  } else if (isThinking) {
    // Tilted contemplative hover
    floatRotate = -7 + Math.sin(frame / 18) * 1.5;
    floatY = -6 + Math.sin(frame / 16) * 5;
    squashX = 0.98;
    squashY = 1.03;
  } else if (isHappy) {
    // Energetic happy buoyant bounce
    const bounce = Math.abs(Math.sin(frame / 5)) * 12;
    floatY = -bounce;
    floatRotate = Math.sin(frame / 8) * 3.5;
    squashX = 1 + (bounce / 12) * 0.06;
    squashY = 1 - (bounce / 12) * 0.06;
  } else if (isPointUp) {
    // Upward aspirational tilt
    floatY = -10 + Math.sin(frame / 14) * 6;
    floatRotate = -4 + Math.sin(frame / 22) * 1.5;
  }

  // Pop-in spring
  const scale = spring({
    fps,
    frame,
    config: {damping: 12, mass: 0.8},
  });

  // Natural blinking cycle (blinks every ~75 frames, lasting 6 frames)
  const blinkCycle = frame % 80;
  const isBlinking = !isAlert && !isHappy && blinkCycle < 6;
  let eyeScaleY = 1;
  if (isBlinking) {
    eyeScaleY = blinkCycle < 3 ? 0.12 : 0.55;
  }

  // Alert shockwave ripple
  const rippleProgress = (frame % 30) / 30;
  const rippleScale = 1 + rippleProgress * 0.6;
  const rippleOpacity = (1 - rippleProgress) * 0.7;

  const isDark = theme === 'dark';
  const bubbleBg = isDark ? '#141d2e' : '#ffffff';
  const bubbleBorder = isDark ? 'rgba(59, 130, 246, 0.4)' : 'rgba(59, 130, 246, 0.3)';
  const bubbleText = isDark ? '#f8fafc' : '#0f172a';

  return (
    <div
      style={
        positionMode === 'centered'
          ? {
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 50,
            }
          : {
              position: 'absolute',
              bottom: bottomOffset,
              left: side === 'center' ? '50%' : side === 'left' ? '12%' : 'auto',
              right: side === 'right' ? '12%' : 'auto',
              transform: side === 'center' ? 'translateX(-50%)' : 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 50,
            }
      }
    >
      {/* Optional Speech Bubble / Reaction Tag */}
      {speechText && (
        <div
          style={{
            backgroundColor: bubbleBg,
            border: `1.5px solid ${bubbleBorder}`,
            borderRadius: 16,
            padding: '10px 20px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            marginBottom: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            maxWidth: 380,
            transform: `scale(${scale})`,
          }}
        >
          <span
            style={{
              fontFamily: FONT.space,
              fontSize: 20,
              fontWeight: 700,
              color: bubbleText,
              textAlign: 'center',
            }}
          >
            {speechText}
          </span>
        </div>
      )}

      {/* Mascot Container with Floating Physics */}
      <div
        style={{
          width: size,
          height: size,
          transform: `scale(${scale * squashX}, ${scale * squashY}) translateY(${floatY}px) rotate(${floatRotate}deg)`,
          filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.65))',
          position: 'relative',
        }}
      >
        {/* Neon Shockwave Ripple (Active on Alert) */}
        {isAlert && (
          <div
            style={{
              position: 'absolute',
              top: '15%',
              left: '15%',
              width: '70%',
              height: '70%',
              borderRadius: '50%',
              border: '3px solid #84cc16',
              transform: `scale(${rippleScale})`,
              opacity: rippleOpacity,
              boxShadow: '0 0 20px rgba(132, 204, 22, 0.8)',
              pointerEvents: 'none',
            }}
          />
        )}

        {/* 1. Base Pristine Mascot (Blank Smooth Visor, Authentic Cocoon Blanket Wrap) */}
        <Img
          src={staticFile('assets/agent-mascot-blank-visor.png')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />

        {/* 2. Procedural Reactive Eyes SVG Overlay (ViewBox 456 x 444) */}
        <svg
          viewBox="0 0 456 444"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'visible',
            pointerEvents: 'none',
          }}
        >
          <defs>
            <filter id="eyeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#ffffff" floodOpacity="0.9" />
              <feDropShadow dx="0" dy="0" stdDeviation="9" floodColor="#a3e635" floodOpacity="0.6" />
            </filter>
            <filter id="alertGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="7" floodColor="#ffffff" floodOpacity="1" />
              <feDropShadow dx="0" dy="0" stdDeviation="14" floodColor="#ef4444" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* EYE RENDERERS */}
          {isHappy ? (
            /* Smiling Crescent Eyes ^^ */
            <g filter="url(#eyeGlow)">
              <path
                d="M 276 195 Q 293 162 310 195"
                fill="none"
                stroke="#ffffff"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M 342 190 Q 359 157 376 190"
                fill="none"
                stroke="#ffffff"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </g>
          ) : isAlert ? (
            /* Alert Wide Eyes */
            <g filter="url(#alertGlow)">
              <ellipse cx="293" cy="182" rx="20" ry="26" fill="#ffffff" />
              <ellipse cx="359" cy="178" rx="20" ry="26" fill="#ffffff" />
              {/* Dilated pupils */}
              <circle cx="293" cy="182" r="7" fill="#0f172a" />
              <circle cx="359" cy="178" r="7" fill="#0f172a" />
            </g>
          ) : isThinking ? (
            /* Thinking Inquisitive Eyes (Gazing Up-Right) */
            <g filter="url(#eyeGlow)" transform="translate(6, -10)">
              <rect
                x="276"
                y="142"
                width="32"
                height="80"
                rx="16"
                ry="16"
                fill="#ffffff"
              />
              <rect
                x="342"
                y="132"
                width="32"
                height="88"
                rx="16"
                ry="16"
                fill="#ffffff"
              />
            </g>
          ) : (
            /* Normal Pill Eyes with Natural Smooth Blinking */
            <g filter="url(#eyeGlow)">
              {/* Left Eye */}
              <g transform={`translate(293, 182) scale(1, ${eyeScaleY}) translate(-293, -182)`}>
                <rect
                  x="276"
                  y="135"
                  width="33"
                  height="94"
                  rx="16.5"
                  ry="16.5"
                  fill="#ffffff"
                />
              </g>
              {/* Right Eye */}
              <g transform={`translate(359, 178) scale(1, ${eyeScaleY}) translate(-359, -178)`}>
                <rect
                  x="342"
                  y="125"
                  width="34"
                  height="106"
                  rx="17"
                  ry="17"
                  fill="#ffffff"
                />
              </g>
            </g>
          )}
        </svg>

        {/* 3. Sleek Floating Reactive Badges */}
        {isAlert && (
          <div
            style={{
              position: 'absolute',
              top: '4%',
              right: '2%',
              backgroundColor: '#ef4444',
              color: '#ffffff',
              borderRadius: 14,
              padding: '4px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontWeight: 800,
              fontSize: 16,
              fontFamily: FONT.space,
              boxShadow: '0 0 20px rgba(239, 68, 68, 0.9), 0 4px 12px rgba(0,0,0,0.5)',
              border: '1.5px solid rgba(255,255,255,0.4)',
              transform: `scale(${1 + Math.sin(frame / 4) * 0.08})`,
            }}
          >
            ALERT !
          </div>
        )}

        {isHappy && (
          <div
            style={{
              position: 'absolute',
              top: '4%',
              right: '2%',
              backgroundColor: '#84cc16',
              color: '#0f172a',
              borderRadius: 14,
              padding: '4px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontWeight: 800,
              fontSize: 16,
              fontFamily: FONT.space,
              boxShadow: '0 0 20px rgba(132, 204, 22, 0.9), 0 4px 12px rgba(0,0,0,0.5)',
              border: '1.5px solid rgba(255,255,255,0.6)',
              transform: `scale(${1 + Math.sin(frame / 4) * 0.08})`,
            }}
          >
            GREAT ✓
          </div>
        )}

        {isThinking && (
          <div
            style={{
              position: 'absolute',
              top: '4%',
              right: '2%',
              backgroundColor: '#3b82f6',
              color: '#ffffff',
              borderRadius: 14,
              padding: '4px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontWeight: 800,
              fontSize: 16,
              fontFamily: FONT.space,
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.9), 0 4px 12px rgba(0,0,0,0.5)',
              border: '1.5px solid rgba(255,255,255,0.5)',
              transform: `scale(${1 + Math.sin(frame / 5) * 0.06})`,
            }}
          >
            ANALYZING ?
          </div>
        )}

        {isPointUp && (
          <div
            style={{
              position: 'absolute',
              top: '4%',
              right: '2%',
              backgroundColor: '#10b981',
              color: '#ffffff',
              borderRadius: 14,
              padding: '4px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontWeight: 800,
              fontSize: 16,
              fontFamily: FONT.space,
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.9), 0 4px 12px rgba(0,0,0,0.5)',
              border: '1.5px solid rgba(255,255,255,0.5)',
              transform: `scale(${1 + Math.sin(frame / 5) * 0.06})`,
            }}
          >
            FOCUS ▲
          </div>
        )}
      </div>
    </div>
  );
};
