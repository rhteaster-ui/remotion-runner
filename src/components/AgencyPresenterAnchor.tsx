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
  gestureFrame?: number;
}

export const AgencyPresenterAnchor: React.FC<AgencyPresenterAnchorProps> = ({
  gesture = 'idle',
  speechText,
  size = 280,
  bottomOffset = 110,
  side = 'center',
  theme = 'dark',
  positionMode = 'bottom_fixed',
  gestureFrame,
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

  // Local frame progress within current gesture cycle (smooth 75-frame / 2.5s window)
  const gf = gestureFrame !== undefined ? gestureFrame : (frame % 75);

  // --------------------------------------------------------------------------
  // NATURAL DYNAMIC PHYSICS & KINETICS
  // --------------------------------------------------------------------------
  let floatY = 0;
  let floatRotateZ = 0;
  let floatRotateY = 0;
  let floatRotateX = 0;
  let squashX = 1;
  let squashY = 1;

  // 1. STATE: IDLE & NATURAL BREATHING FLOAT
  if (gesture === 'idle') {
    // Multi-harmonic gentle organic respiration
    floatY = Math.sin(frame / 20) * 8 + Math.cos(frame / 32) * 2;
    floatRotateZ = Math.sin(frame / 24) * 1.6;
    floatRotateY = Math.sin(frame / 28) * 2.2;
    floatRotateX = Math.cos(frame / 22) * 1.2;
    squashX = 1 + Math.sin(frame / 20) * 0.02;
    squashY = 1 - Math.sin(frame / 20) * 0.02;
  }

  // 2. STATE: IDEA (Anticipation Squat -> AHA! Perk-Up -> Floating Glow)
  let bulbProgress = 0;
  if (isIdea) {
    if (gf < 10) {
      // Anticipation curiosity crouch
      const p = gf / 10;
      floatY = 8 * p;
      squashX = 1 + 0.06 * p;
      squashY = 1 - 0.06 * p;
      floatRotateX = 4 * p;
      floatRotateZ = 0;
    } else if (gf < 24) {
      // Perk up ("AHA!")
      const p = (gf - 10) / 14;
      const perkCurve = Math.sin(p * Math.PI * 0.5);
      floatY = 8 - 26 * perkCurve;
      squashX = 1.06 - 0.12 * perkCurve;
      squashY = 0.94 + 0.14 * perkCurve;
      floatRotateX = 4 - 8 * perkCurve;
      floatRotateZ = Math.sin(p * Math.PI) * 2;
    } else {
      // Sustained vibrant ideation float
      const t = gf - 24;
      floatY = -18 + Math.sin(t / 12) * 4;
      squashX = 0.98 + Math.sin(t / 12) * 0.015;
      squashY = 1.02 - Math.sin(t / 12) * 0.015;
      floatRotateZ = Math.sin(t / 14) * 1.8;
      floatRotateX = -4 + Math.sin(t / 18) * 1.5;
    }

    // Spring entrance for bulb starting at frame 12
    bulbProgress = spring({
      fps,
      frame: Math.max(0, gf - 12),
      config: {damping: 9, mass: 0.5, stiffness: 160},
    });
  }

  // 3. STATE: PEEK 3D (Fluid Continuous 3D Yaw & Visor Parallax)
  let eyeParallaxX = 0;
  let eyeParallaxY = 0;
  let visorSpecularShift = 0;

  if (isPeek3D) {
    // Continuous sinusoidal 3D head turn: left (-16deg) -> pause/inspect -> right (+16deg) -> center
    const angle = Math.sin((gf / 75) * Math.PI * 2) * 16;
    floatRotateY = angle;
    floatRotateZ = angle * 0.12; // Organic head tilt into the turn
    floatRotateX = Math.cos((gf / 75) * Math.PI * 2) * 2.2;
    floatY = -6 + Math.sin(gf / 16) * 4;
    squashX = 1 + Math.abs(angle) * 0.003;
    squashY = 1 - Math.abs(angle) * 0.003;

    // Eyeball horizontal shift inside curved visor
    eyeParallaxX = angle * 1.05;
    eyeParallaxY = floatRotateX * 0.8;
    // Specular glass highlight counter-translates to reinforce volumetric 3D spherical visor
    visorSpecularShift = -angle * 1.25;
  }

  // 4. STATE: JUMP & SPIN (Weighted Anticipation, Kinetic 360 Spin Arc, Landing Cushion)
  if (isJumpSpin) {
    if (gf < 10) {
      // Deep Anticipation Crouch
      const p = gf / 10;
      floatY = 22 * p;
      squashX = 1 + 0.18 * p;
      squashY = 1 - 0.18 * p;
      floatRotateX = 6 * p;
      floatRotateZ = 0;
      floatRotateY = 0;
    } else if (gf < 44) {
      // Flight Arc (34 frames)
      const p = (gf - 10) / 34;
      const jumpHeight = Math.sin(p * Math.PI) * 125;
      floatY = -jumpHeight;

      // Kinetic ease-in-out spin curve
      const spinCurve = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      floatRotateZ = spinCurve * 360;
      floatRotateY = Math.sin(p * Math.PI) * 15;
      floatRotateX = -Math.sin(p * Math.PI) * 10;
      squashX = 0.88 + Math.sin(p * Math.PI) * 0.04;
      squashY = 1.15 - Math.sin(p * Math.PI) * 0.04;
    } else if (gf < 56) {
      // Heavy Landing Impact Cushion
      const p = (gf - 44) / 12;
      floatY = 16 * (1 - p);
      squashX = 1 + 0.16 * (1 - p);
      squashY = 1 - 0.16 * (1 - p);
      floatRotateZ = 0;
      floatRotateY = 0;
      floatRotateX = 0;
    } else {
      // Elastic Rebound back to neutral float
      const p = (gf - 56) / 19;
      floatY = -Math.sin(p * Math.PI) * 5;
      squashX = 1 - Math.sin(p * Math.PI) * 0.03;
      squashY = 1 + Math.sin(p * Math.PI) * 0.03;
      floatRotateZ = 0;
      floatRotateY = 0;
      floatRotateX = 0;
    }
  }

  // 5. STATE: BUOYANT SMILE ^^ (Joyful Bobbing Bounce & Victory)
  if (isHappy) {
    const bounce = Math.abs(Math.sin(gf / 6)) * 14;
    floatY = -bounce;
    squashX = 1 + (bounce / 14) * 0.08;
    squashY = 1 - (bounce / 14) * 0.08;
    floatRotateZ = Math.sin(gf / 9) * 3.5;
    floatRotateX = -3 + Math.sin(gf / 12) * 1.5;
  }

  // 6. STATE: ALERT (Clean Seismic Shockwave)
  if (isAlert) {
    const shake = Math.sin(gf * 1.8) * 3;
    floatY = -12 + shake;
    floatRotateZ = Math.cos(gf * 1.5) * 2.5;
    squashX = 1.05;
    squashY = 0.95;
  }

  // 7. STATE: THINKING (Gentle Inquisitive Tilt)
  if (isThinking) {
    floatRotateZ = -7 + Math.sin(gf / 18) * 1.4;
    floatY = -6 + Math.sin(gf / 16) * 4;
    squashX = 0.98;
    squashY = 1.02;
  }

  // 8. STATE: POINT UP
  if (isPointUp) {
    floatY = -12 + Math.sin(gf / 14) * 5;
    floatRotateZ = -4 + Math.sin(gf / 22) * 1.5;
  }

  // Natural organic blinking cycle
  const blinkCycle = frame % 85;
  const isBlinking = !isAlert && !isHappy && !isIdea && blinkCycle < 6;
  let eyeScaleY = 1;
  if (isBlinking) {
    eyeScaleY = blinkCycle < 3 ? 0.1 : 0.5;
  }

  // Pop-in spring for overall presence
  const scale = spring({
    fps,
    frame,
    config: {damping: 12, mass: 0.8},
  });

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

      {/* 3D Transform Container (Supports Perspective, 3D Yaw Rotation & Aerobatic Roll) */}
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
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.75))',
          }}
        >
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

          {/* Dynamic Golden Ambient Illumination on Head when IDEA is active */}
          {isIdea && (
            <div
              style={{
                position: 'absolute',
                top: '6%',
                left: '28%',
                width: '44%',
                height: '35%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(250, 204, 21, 0.45) 0%, rgba(250, 204, 21, 0.12) 50%, transparent 80%)',
                opacity: bulbProgress,
                filter: 'blur(8px)',
                pointerEvents: 'none',
                mixBlendMode: 'screen',
              }}
            />
          )}

          {/* Dynamic Visor Specular Glass Highlight during 3D Yaw Turn */}
          {isPeek3D && (
            <div
              style={{
                position: 'absolute',
                top: '24%',
                left: '35%',
                width: '30%',
                height: '25%',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse at 45% 35%, rgba(255, 255, 255, 0.28) 0%, transparent 70%)',
                transform: `translateX(${visorSpecularShift}px)`,
                pointerEvents: 'none',
                mixBlendMode: 'overlay',
              }}
            />
          )}

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
              <filter id="smileGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#ffffff" floodOpacity="0.9" />
                <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#84cc16" floodOpacity="0.85" />
              </filter>
            </defs>

            {/* EYE RENDERING MODES */}
            {isHappy ? (
              /* Smiling Crescent Eyes ^^ with Joyful Radiance */
              <g filter="url(#smileGlow)">
                <path
                  d="M 274 195 Q 293 158 312 195"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
                <path
                  d="M 340 190 Q 359 153 378 190"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
                {/* Twinkling sparkle star on left cheek */}
                <path
                  d="M 252 205 Q 256 205 256 200 Q 256 205 260 205 Q 256 205 256 210 Q 256 205 252 205"
                  fill="#facc15"
                  opacity={0.85 + Math.sin(gf / 4) * 0.15}
                />
                {/* Twinkling sparkle star on right cheek */}
                <path
                  d="M 395 198 Q 399 198 399 193 Q 399 198 403 198 Q 399 198 399 203 Q 399 198 395 198"
                  fill="#facc15"
                  opacity={0.85 + Math.cos(gf / 4) * 0.15}
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
              /* Excited Idea Eyes (Bright Golden Attentive Glow + Sparkle) */
              <g filter="url(#ideaEyeGlow)">
                <ellipse cx="293" cy="182" rx="20" ry="26" fill="#ffffff" />
                <ellipse cx="359" cy="178" rx="20" ry="26" fill="#ffffff" />
                <circle cx="297" cy="176" r="4.5" fill="#facc15" />
                <circle cx="363" cy="172" r="4.5" fill="#facc15" />
              </g>
            ) : isThinking ? (
              /* Thinking Inquisitive Eyes (Gazing Up-Right) */
              <g filter="url(#eyeGlow)" transform="translate(6, -10)">
                <rect x="276" y="142" width="32" height="80" rx="16" ry="16" fill="#ffffff" />
                <rect x="342" y="132" width="32" height="88" rx="16" ry="16" fill="#ffffff" />
              </g>
            ) : isPeek3D ? (
              /* 3D Peek Parallax Eyes shifting inside visor */
              <g
                filter="url(#eyeGlow)"
                transform={`translate(${eyeParallaxX}, ${eyeParallaxY})`}
              >
                <rect x="276" y="135" width="33" height="94" rx="16.5" ry="16.5" fill="#ffffff" />
                <rect x="342" y="125" width="34" height="106" rx="17" ry="17" fill="#ffffff" />
              </g>
            ) : (
              /* Normal Pill Eyes with Natural Blinking */
              <g filter="url(#eyeGlow)">
                <g transform={`translate(293, 182) scale(1, ${eyeScaleY}) translate(-293, -182)`}>
                  <rect x="276" y="135" width="33" height="94" rx="16.5" ry="16.5" fill="#ffffff" />
                </g>
                <g transform={`translate(359, 178) scale(1, ${eyeScaleY}) translate(-359, -178)`}>
                  <rect x="342" y="125" width="34" height="106" rx="17" ry="17" fill="#ffffff" />
                </g>
              </g>
            )}
          </svg>

          {/* 3. ELEVATED HOLOGRAPHIC LIGHTBULB (Centered & Cleanly Integrated) */}
          {isIdea && (
            <div
              style={{
                position: 'absolute',
                top: '-24%',
                left: '50%',
                transform: `translateX(-50%) scale(${bulbProgress})`,
                zIndex: 60,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pointerEvents: 'none',
              }}
            >
              {/* Radial Energy Pulse Wave Rings */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 140,
                  height: 140,
                  borderRadius: '50%',
                  border: '1.5px solid rgba(250, 204, 21, 0.45)',
                  boxShadow: '0 0 32px rgba(250, 204, 21, 0.55)',
                  opacity: 0.6 + Math.sin(gf / 4) * 0.35,
                  pointerEvents: 'none',
                }}
              />

              {/* Glowing Vector Holographic Bulb */}
              <svg
                width="84"
                height="84"
                viewBox="0 0 24 24"
                fill="none"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(250, 204, 21, 0.95))',
                }}
              >
                {/* Ambient Soft Rays */}
                <g stroke="#facc15" strokeWidth="2.2" strokeLinecap="round" opacity={0.92}>
                  <line x1="12" y1="1" x2="12" y2="3.5" />
                  <line x1="4.22" y1="4.22" x2="6" y2="6" />
                  <line x1="1" y1="12" x2="3.5" y2="12" />
                  <line x1="20.5" y1="12" x2="23" y2="12" />
                  <line x1="18" y1="6" x2="19.78" y2="4.22" />
                </g>

                {/* Bulb Body */}
                <path
                  d="M9 18h6m-4 3h2m-5-8.5c-.83-.83-2-2.17-2-4.5a6 6 0 1 1 12 0c0 2.33-1.17 3.67-2 4.5V17H9v-2.5z"
                  fill="#fef08a"
                  stroke="#eab308"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Glowing Core Filament */}
                <path
                  d="M10 10a2 2 0 0 1 4 0"
                  stroke="#ca8a04"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>

              {/* Holographic Magnetic Stem connecting bulb to cocoon head */}
              <div
                style={{
                  width: 2.5,
                  height: 18,
                  background: 'linear-gradient(to bottom, #facc15, transparent)',
                  boxShadow: '0 0 10px #facc15',
                  marginTop: -2,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
