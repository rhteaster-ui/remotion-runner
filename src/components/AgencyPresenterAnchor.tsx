import React from 'react';
import {Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {FONT} from '../theme-tokens';

export type MascotGesture =
  | 'idle'
  | 'idea'
  | 'jump_spin'
  | 'peek_3d'
  | 'alert'
  | 'warning_stop'
  | 'thinking'
  | 'thumbs_up'
  | 'point_up';

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

  // Gesture state flags
  const isAlert = gesture === 'warning_stop' || gesture === 'alert';
  const isThinking = gesture === 'thinking';
  const isHappy = gesture === 'thumbs_up';
  const isPointUp = gesture === 'point_up';
  const isIdea = gesture === 'idea';
  const isJumpSpin = gesture === 'jump_spin';
  const isPeek3D = gesture === 'peek_3d';

  // Base physics parameters
  let floatY = Math.sin(frame / 14) * 8;
  let floatRotateZ = Math.sin(frame / 20) * 2;
  let floatRotateY = 0;
  let floatRotateX = 0;
  let squashX = 1 + Math.sin(frame / 14) * 0.02;
  let squashY = 1 - Math.sin(frame / 14) * 0.02;

  // 1. STATE: IDEA (Lampu Ide Muncul + Perk Up)
  let bulbProgress = 0;
  if (isIdea) {
    const perk = Math.sin(Math.min(frame, 20) / 20 * Math.PI * 0.5);
    floatY = -18 * perk + Math.sin(frame / 12) * 5;
    floatRotateZ = Math.sin(frame / 15) * 2;
    squashX = 0.96;
    squashY = 1.05;
    bulbProgress = spring({
      fps,
      frame,
      config: {damping: 10, mass: 0.6, stiffness: 140},
    });
  }

  // 2. STATE: JUMP & SPIN (Lompat Tinggi + Putaran 360° Akrobatik)
  if (isJumpSpin) {
    const cycle = frame % 60; // 2 seconds loop at 30fps
    if (cycle < 10) {
      // Crouch / Anticipation
      const p = cycle / 10;
      floatY = 22 * p;
      squashX = 1 + 0.22 * p;
      squashY = 1 - 0.22 * p;
      floatRotateZ = 0;
      floatRotateY = 0;
    } else if (cycle < 42) {
      // Jump Arc (frames 10 to 42, 32 frames flight)
      const p = (cycle - 10) / 32;
      const jumpHeight = Math.sin(p * Math.PI) * 110;
      floatY = -jumpHeight;
      // 360 Full 3D Barrel Roll / Spin
      floatRotateY = p * 360;
      floatRotateZ = Math.sin(p * Math.PI * 2) * 8;
      // Stretched during takeoff/flight
      squashX = 0.88;
      squashY = 1.16;
    } else if (cycle < 52) {
      // Landing Impact Squash
      const p = (cycle - 42) / 10;
      floatY = 16 * (1 - p);
      squashX = 1 + 0.18 * (1 - p);
      squashY = 1 - 0.18 * (1 - p);
      floatRotateY = 360;
      floatRotateZ = 0;
    } else {
      // Recovery to neutral
      floatY = 0;
      squashX = 1;
      squashY = 1;
      floatRotateY = 0;
    }
  }

  // 3. STATE: PEEK 3D (Menoleh Kiri-Kanan Bolak-Balik dengan Perspektif 3D)
  if (isPeek3D) {
    // Oscillates smoothly left and right in 3D yaw (-32deg to +32deg)
    floatRotateY = Math.sin(frame / 18) * 32;
    floatRotateX = Math.cos(frame / 22) * 5;
    floatRotateZ = Math.sin(frame / 20) * 3;
    floatY = -6 + Math.sin(frame / 14) * 6;
  }

  // 4. STATE: ALERT (Shockwave + Tremor)
  if (isAlert) {
    const shake = Math.sin(frame * 1.8) * 3.5;
    floatY = -14 + shake;
    floatRotateZ = Math.cos(frame * 1.5) * 3;
    squashX = 1.06;
    squashY = 0.95;
  }

  // 5. STATE: THINKING (Miring Santai)
  if (isThinking) {
    floatRotateZ = -8 + Math.sin(frame / 18) * 1.5;
    floatY = -6 + Math.sin(frame / 16) * 5;
    squashX = 0.98;
    squashY = 1.03;
  }

  // 6. STATE: HAPPY (Buoyant Bounce)
  if (isHappy) {
    const bounce = Math.abs(Math.sin(frame / 5)) * 14;
    floatY = -bounce;
    floatRotateZ = Math.sin(frame / 8) * 4;
    squashX = 1 + (bounce / 14) * 0.08;
    squashY = 1 - (bounce / 14) * 0.08;
  }

  // 7. STATE: POINT UP
  if (isPointUp) {
    floatY = -12 + Math.sin(frame / 14) * 6;
    floatRotateZ = -4 + Math.sin(frame / 22) * 1.5;
  }

  // Pop-in spring
  const scale = spring({
    fps,
    frame,
    config: {damping: 12, mass: 0.8},
  });

  // Natural blinking cycle (blinks every ~75 frames, lasting 6 frames)
  const blinkCycle = frame % 80;
  const isBlinking = !isAlert && !isHappy && !isIdea && blinkCycle < 6;
  let eyeScaleY = 1;
  if (isBlinking) {
    eyeScaleY = blinkCycle < 3 ? 0.12 : 0.55;
  }

  // Alert shockwave ripple
  const rippleProgress = (frame % 28) / 28;
  const rippleScale = 1 + rippleProgress * 0.7;
  const rippleOpacity = (1 - rippleProgress) * 0.75;

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
      {/* Optional Speech Bubble */}
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

      {/* 3D Transform Container (Supports Perspective, 3D Yaw Rotation & Spin) */}
      <div
        style={{
          width: size,
          height: size,
          perspective: 1200,
          perspectiveOrigin: '50% 50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            transformStyle: 'preserve-3d',
            transform: `scale(${scale * squashX}, ${scale * squashY}) translateY(${floatY}px) rotateY(${floatRotateY}deg) rotateX(${floatRotateX}deg) rotateZ(${floatRotateZ}deg)`,
            filter: 'drop-shadow(0 18px 36px rgba(0,0,0,0.7))',
            transition: 'transform 0.05s linear',
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
                border: '3.5px solid #ef4444',
                transform: `scale(${rippleScale})`,
                opacity: rippleOpacity,
                boxShadow: '0 0 24px rgba(239, 68, 68, 0.9)',
                pointerEvents: 'none',
              }}
            />
          )}

          {/* 1. Base Mascot (Authentic Cocoon Blanket Wrap with Blank Smooth Visor) */}
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
              <filter id="ideaEyeGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="0" stdDeviation="7" floodColor="#ffffff" floodOpacity="1" />
                <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#facc15" floodOpacity="0.8" />
              </filter>
            </defs>

            {/* EYE RENDERING MODES */}
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
                <circle cx="293" cy="182" r="7" fill="#0f172a" />
                <circle cx="359" cy="178" r="7" fill="#0f172a" />
              </g>
            ) : isIdea ? (
              /* Excited Idea Eyes (Bright Golden Attentive Glow) */
              <g filter="url(#ideaEyeGlow)">
                <ellipse cx="293" cy="182" rx="19" ry="25" fill="#ffffff" />
                <ellipse cx="359" cy="178" rx="19" ry="25" fill="#ffffff" />
                {/* Tiny sparkle highlight */}
                <circle cx="297" cy="176" r="4" fill="#facc15" />
                <circle cx="363" cy="172" r="4" fill="#facc15" />
              </g>
            ) : isThinking ? (
              /* Thinking Inquisitive Eyes (Gazing Up-Right) */
              <g filter="url(#eyeGlow)" transform="translate(6, -10)">
                <rect x="276" y="142" width="32" height="80" rx="16" ry="16" fill="#ffffff" />
                <rect x="342" y="132" width="32" height="88" rx="16" ry="16" fill="#ffffff" />
              </g>
            ) : (
              /* Normal Pill Eyes with Natural Blinking & 3D Parallax Shift */
              <g
                filter="url(#eyeGlow)"
                transform={`translate(${floatRotateY * 0.4}, ${floatRotateX * 0.3})`}
              >
                <g transform={`translate(293, 182) scale(1, ${eyeScaleY}) translate(-293, -182)`}>
                  <rect x="276" y="135" width="33" height="94" rx="16.5" ry="16.5" fill="#ffffff" />
                </g>
                <g transform={`translate(359, 178) scale(1, ${eyeScaleY}) translate(-359, -178)`}>
                  <rect x="342" y="125" width="34" height="106" rx="17" ry="17" fill="#ffffff" />
                </g>
              </g>
            )}
          </svg>

          {/* 3. BESPOKE VECTOR LIGHTBULB (Appears on IDEA state) */}
          {isIdea && (
            <div
              style={{
                position: 'absolute',
                top: '-18%',
                left: '42%',
                transform: `translateX(-50%) scale(${bulbProgress})`,
                filter: 'drop-shadow(0 0 24px rgba(250, 204, 21, 0.95))',
                zIndex: 60,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <svg width="72" height="72" viewBox="0 0 24 24" fill="none">
                {/* Radiating Light Rays */}
                <g stroke="#facc15" strokeWidth="2" strokeLinecap="round" opacity={0.9}>
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </g>
                {/* Glowing Bulb Body */}
                <path
                  d="M9 18h6m-4 3h2m-5-8.5c-.83-.83-2-2.17-2-4.5a6 6 0 1 1 12 0c0 2.33-1.17 3.67-2 4.5V17H9v-2.5z"
                  fill="#fef08a"
                  stroke="#eab308"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Inner Glowing Filament */}
                <path
                  d="M10 10a2 2 0 0 1 4 0"
                  stroke="#ca8a04"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          )}

          {/* 4. SLEEK VECTOR BADGES */}
          {isIdea && (
            <div
              style={{
                position: 'absolute',
                top: '4%',
                right: '2%',
                backgroundColor: '#facc15',
                color: '#713f12',
                borderRadius: 14,
                padding: '4px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontWeight: 800,
                fontSize: 16,
                fontFamily: FONT.space,
                boxShadow: '0 0 24px rgba(250, 204, 21, 0.95), 0 4px 12px rgba(0,0,0,0.5)',
                border: '1.5px solid rgba(255,255,255,0.8)',
                transform: `scale(${1 + Math.sin(frame / 4) * 0.08})`,
              }}
            >
              IDEA !
            </div>
          )}

          {isJumpSpin && (
            <div
              style={{
                position: 'absolute',
                top: '4%',
                right: '2%',
                backgroundColor: '#ec4899',
                color: '#ffffff',
                borderRadius: 14,
                padding: '4px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontWeight: 800,
                fontSize: 16,
                fontFamily: FONT.space,
                boxShadow: '0 0 24px rgba(236, 72, 153, 0.95), 0 4px 12px rgba(0,0,0,0.5)',
                border: '1.5px solid rgba(255,255,255,0.7)',
              }}
            >
              360° SPIN !
            </div>
          )}

          {isPeek3D && (
            <div
              style={{
                position: 'absolute',
                top: '4%',
                right: '2%',
                backgroundColor: '#06b6d4',
                color: '#ffffff',
                borderRadius: 14,
                padding: '4px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontWeight: 800,
                fontSize: 16,
                fontFamily: FONT.space,
                boxShadow: '0 0 24px rgba(6, 182, 212, 0.95), 0 4px 12px rgba(0,0,0,0.5)',
                border: '1.5px solid rgba(255,255,255,0.7)',
              }}
            >
              3D PEEK ⟷
            </div>
          )}

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
                boxShadow: '0 0 24px rgba(239, 68, 68, 0.95), 0 4px 12px rgba(0,0,0,0.5)',
                border: '1.5px solid rgba(255,255,255,0.6)',
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
                boxShadow: '0 0 24px rgba(132, 204, 22, 0.95), 0 4px 12px rgba(0,0,0,0.5)',
                border: '1.5px solid rgba(255,255,255,0.7)',
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
                boxShadow: '0 0 24px rgba(59, 130, 246, 0.95), 0 4px 12px rgba(0,0,0,0.5)',
                border: '1.5px solid rgba(255,255,255,0.6)',
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
                boxShadow: '0 0 24px rgba(16, 185, 129, 0.95), 0 4px 12px rgba(0,0,0,0.5)',
                border: '1.5px solid rgba(255,255,255,0.6)',
                transform: `scale(${1 + Math.sin(frame / 5) * 0.06})`,
              }}
            >
              FOCUS ▲
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
