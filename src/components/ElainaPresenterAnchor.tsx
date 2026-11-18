import React from 'react';
import {Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {FONT} from '../theme-tokens';

export type ElainaGesture =
  | 'idle'
  | 'idea'
  | 'smug'
  | 'thinking'
  | 'point_up'
  | 'wink_point'
  | 'alert'
  | 'thumbs_up';

export interface ElainaPresenterAnchorProps {
  gesture?: ElainaGesture;
  speechText?: string;
  hideBubble?: boolean;
  glowColor?: string;
  size?: number;
  bottomOffset?: number;
  side?: 'left' | 'right' | 'center';
  theme?: 'dark' | 'light';
  positionMode?: 'bottom_fixed' | 'centered';
  gestureFrame?: number;
  mode?: 'bust' | 'full';
  showMagicParticles?: boolean;
  /** Enable procedural eye blink overlay */
  enableBlink?: boolean;
  /** Audio amplitude 0-1 for reactive head-tilt & micro-bounce */
  audioAmplitude?: number;
}

// ---------------------------------------------------------------------------
// ELAINA ASSET MAP — Gesture-aware image switching
// ---------------------------------------------------------------------------
const ELAINA_ASSETS: Record<string, {bust: string; full: string}> = {
  idle:       {bust: 'assets/elaina_v3/intro.png',    full: 'assets/elaina_v3/intro.png'},
  smug:       {bust: 'assets/elaina_v3/pointing.png', full: 'assets/elaina_v3/pointing.png'},
  wink_point: {bust: 'assets/elaina_v3/pointing.png', full: 'assets/elaina_v3/pointing.png'},
  thinking:   {bust: 'assets/elaina_v3/intro.png',    full: 'assets/elaina_v3/intro.png'},
  idea:       {bust: 'assets/elaina_v3/pointing.png', full: 'assets/elaina_v3/pointing.png'},
  point_up:   {bust: 'assets/elaina_v3/pointing.png', full: 'assets/elaina_v3/pointing.png'},
  alert:      {bust: 'assets/elaina_v3/shocked.png',  full: 'assets/elaina_v3/shocked.png'},
  thumbs_up:  {bust: 'assets/elaina_v3/pointing.png', full: 'assets/elaina_v3/pointing.png'},
};

// ---------------------------------------------------------------------------
// PROCEDURAL BLINK SYSTEM — natural 3-4s cadence with 4-frame blink
// ---------------------------------------------------------------------------
function getBlinkScale(frame: number, fps: number): number {
  // Blink cycle: every ~100 frames (3.3s at 30fps) with slight variation
  const cycle1 = 97;  // Primary blink rhythm
  const cycle2 = 137; // Secondary offset rhythm (double-blink feel)

  const inBlink1 = (frame % cycle1) < 4;
  const inBlink2 = (frame % cycle2) < 3;

  if (inBlink1 || inBlink2) {
    const blinkFrame = inBlink1 ? (frame % cycle1) : (frame % cycle2);
    const blinkDuration = inBlink1 ? 4 : 3;
    // Quick squish down then back up
    const t = blinkFrame / blinkDuration;
    return 1 - Math.sin(t * Math.PI) * 0.85; // Minimum 0.15 scale at peak blink
  }
  return 1;
}

// ---------------------------------------------------------------------------
// MAGIC PARTICLE DEFINITIONS (witch stardust)
// ---------------------------------------------------------------------------
interface Particle {
  cx: number; cy: number;
  radiusX: number; radiusY: number;
  speedX: number; speedY: number;
  scaleSpeed: number; opacitySpeed: number;
  baseScale: number; baseOpacity: number;
  fill: string; glow: string;
  size: number;
  shape: 'star' | 'circle' | 'diamond';
}

const WITCH_PARTICLES: Particle[] = [
  // Golden wand sparkle (top-left orbit)
  {cx: 80, cy: 70, radiusX: 12, radiusY: 10, speedX: 14, speedY: 12, scaleSpeed: 10, opacitySpeed: 8, baseScale: 0.7, baseOpacity: 0.4, fill: '#fde047', glow: '#facc15', size: 12, shape: 'star'},
  // Purple stardust (right orbit)
  {cx: 210, cy: 110, radiusX: 14, radiusY: 12, speedX: 16, speedY: 15, scaleSpeed: 11, opacitySpeed: 9, fill: '#c084fc', glow: '#a855f7', baseScale: 0.6, baseOpacity: 0.5, size: 10, shape: 'star'},
  // Tiny golden mote (hat area)
  {cx: 140, cy: 30, radiusX: 8, radiusY: 6, speedX: 20, speedY: 18, scaleSpeed: 7, opacitySpeed: 6, fill: '#fcd34d', glow: '#f59e0b', baseScale: 0.5, baseOpacity: 0.35, size: 5, shape: 'circle'},
  // Lavender trail (bottom-right)
  {cx: 240, cy: 280, radiusX: 10, radiusY: 14, speedX: 24, speedY: 20, scaleSpeed: 13, opacitySpeed: 10, fill: '#d8b4fe', glow: '#a78bfa', baseScale: 0.45, baseOpacity: 0.3, size: 7, shape: 'diamond'},
  // Warm amber core (center-left)
  {cx: 50, cy: 200, radiusX: 16, radiusY: 10, speedX: 18, speedY: 22, scaleSpeed: 9, opacitySpeed: 7, fill: '#fbbf24', glow: '#d97706', baseScale: 0.55, baseOpacity: 0.4, size: 6, shape: 'circle'},
];

// Extra burst particles only during Idea/Smug/Alert
const BURST_PARTICLES: Particle[] = [
  {cx: 150, cy: 40, radiusX: 20, radiusY: 8, speedX: 9, speedY: 7, scaleSpeed: 6, opacitySpeed: 5, fill: '#38bdf8', glow: '#0284c7', baseScale: 0.8, baseOpacity: 0.7, size: 4, shape: 'circle'},
  {cx: 60, cy: 140, radiusX: 18, radiusY: 16, speedX: 11, speedY: 9, scaleSpeed: 8, opacitySpeed: 6, fill: '#e879f9', glow: '#c026d3', baseScale: 0.6, baseOpacity: 0.5, size: 8, shape: 'star'},
];


export const ElainaPresenterAnchor: React.FC<ElainaPresenterAnchorProps> = ({
  gesture = 'idle',
  speechText,
  hideBubble = false,
  glowColor = 'rgba(192, 132, 252, 0.28)',
  size = 320,
  bottomOffset = 84,
  side = 'right',
  theme = 'dark',
  positionMode = 'bottom_fixed',
  gestureFrame,
  mode = 'bust',
  showMagicParticles = true,
  enableBlink = true,
  audioAmplitude = 0,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Gesture state flags
  const isSmug = gesture === 'smug' || gesture === 'wink_point';
  const isIdea = gesture === 'idea';
  const isThinking = gesture === 'thinking';
  const isPointUp = gesture === 'point_up';
  const isAlert = gesture === 'alert';
  const isThumbsUp = gesture === 'thumbs_up';

  // Local frame progress within current gesture cycle (smooth 75-frame / 2.5s window)
  const gf = gestureFrame !== undefined ? gestureFrame : (frame % 75);

  // --------------------------------------------------------------------------
  // PROCEDURAL BLINK
  // --------------------------------------------------------------------------
  const blinkScale = enableBlink ? getBlinkScale(frame, fps) : 1;

  // --------------------------------------------------------------------------
  // AUDIO-REACTIVE HEAD TILT & MICRO-BOUNCE
  // --------------------------------------------------------------------------
  const audioTilt = audioAmplitude * 4; // Max ~4 degree curious tilt
  const audioBounce = audioAmplitude * -3; // Slight upward bounce when speaking

  // --------------------------------------------------------------------------
  // 5-LAYER ORGANIC PHYSICS ENGINE
  // --------------------------------------------------------------------------
  let floatY = 0;
  let floatRotateZ = 0;
  let floatRotateX = 0;
  let floatRotateY = 0;
  let squashX = 1;
  let squashY = 1;
  let hatTilt = 0;

  // 1. Natural Breathing & Floating (Idle & Baseline)
  const baseFloat = Math.sin(frame / 16) * 6;
  const breathingScaleY = 1 + Math.sin(frame / 18) * 0.015;
  const breathingScaleX = 1 - Math.sin(frame / 18) * 0.01;
  const windSway = Math.cos(frame / 22) * 2.2; // Gentle breeze on witch hat & robe

  if (gesture === 'idle') {
    floatY = baseFloat + audioBounce;
    floatRotateZ = windSway + audioTilt * Math.sin(frame / 30);
    squashX = breathingScaleX;
    squashY = breathingScaleY;
    hatTilt = Math.sin(frame / 20) * 1.5;
  } else if (isSmug) {
    // Confident proud posture: slight buoyant float, chin raised (+2 deg pitch), playful tilt
    const bounce = Math.sin(gf / 10) * 5;
    floatY = -8 + bounce + audioBounce;
    floatRotateZ = -2.5 + Math.sin(gf / 15) * 1.8 + audioTilt * 0.5;
    floatRotateX = -4; // Chin raised proudly
    squashX = 1.02;
    squashY = 1.02;
    hatTilt = -3;
  } else if (isThinking) {
    // Inquisitive tilt (-5 deg), slow curious hovering
    floatY = Math.sin(gf / 18) * 4 + audioBounce;
    floatRotateZ = -5.5 + Math.sin(gf / 24) * 1.2 + audioTilt;
    floatRotateY = 4;
    squashX = 0.99;
    squashY = 1.01;
    hatTilt = -4;
  } else if (isPointUp) {
    // Alert upwards reach, energetic elevation
    floatY = -14 + Math.sin(gf / 12) * 4 + audioBounce;
    floatRotateZ = -3 + Math.sin(gf / 18) * 1.5;
    squashX = 0.97;
    squashY = 1.03;
    hatTilt = -2;
  } else if (isIdea) {
    // Anticipation squat -> AHA perk-up spring!
    if (gf < 12) {
      const p = gf / 12;
      floatY = 6 * p;
      squashX = 1 + 0.05 * p;
      squashY = 1 - 0.05 * p;
    } else if (gf < 26) {
      const p = (gf - 12) / 14;
      const curve = Math.sin(p * Math.PI * 0.5);
      floatY = 6 - 22 * curve;
      squashX = 1.05 - 0.1 * curve;
      squashY = 0.95 + 0.12 * curve;
      floatRotateZ = Math.sin(p * Math.PI) * 3;
    } else {
      const t = gf - 26;
      floatY = -16 + Math.sin(t / 10) * 3;
      squashX = 0.99;
      squashY = 1.01;
      floatRotateZ = Math.sin(t / 14) * 1.5;
    }
  } else if (isAlert) {
    // Startled seismic shock tremor
    const shake = Math.sin(gf * 2.2) * 4;
    floatY = -10 + shake;
    floatRotateZ = Math.cos(gf * 1.8) * 3;
    squashX = 1.06;
    squashY = 0.94;
    hatTilt = 5;
  } else if (isThumbsUp) {
    // Joyful bouncy victory
    const bounce = Math.abs(Math.sin(gf / 7)) * 12;
    floatY = -bounce + audioBounce;
    squashX = 1 + (bounce / 12) * 0.06;
    squashY = 1 - (bounce / 12) * 0.06;
    floatRotateZ = Math.sin(gf / 10) * 2.8;
  }

  // Pop-in spring entry
  const entryScale = spring({
    fps,
    frame,
    config: {damping: 14, mass: 0.7},
  });

  // --------------------------------------------------------------------------
  // GESTURE-AWARE ASSET SELECTION
  // --------------------------------------------------------------------------
  const assetSet = ELAINA_ASSETS[gesture] || ELAINA_ASSETS.idle;
  const imageSrc = staticFile(mode === 'full' ? assetSet.full : assetSet.bust);

  const isDark = theme === 'dark';
  const width = size;
  const height = Math.round(size * 1.34);

  // Which particles to show
  const showBurstParticles = isIdea || isSmug || isAlert;
  const allParticles = showBurstParticles
    ? [...WITCH_PARTICLES, ...BURST_PARTICLES]
    : WITCH_PARTICLES;

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
              left: side === 'center' ? '50%' : side === 'left' ? '6%' : 'auto',
              right: side === 'right' ? '6%' : 'auto',
              transform: side === 'center' ? 'translateX(-50%)' : 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: side === 'right' ? 'flex-end' : side === 'left' ? 'flex-start' : 'center',
              zIndex: 50,
              pointerEvents: 'none',
            }
      }
    >
      {/* Speech / Dialog Balloon */}
      {speechText && !hideBubble && (
        <div
          style={{
            maxWidth: 380,
            marginBottom: 14,
            padding: '12px 18px',
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.92)' : 'rgba(255, 255, 255, 0.96)',
            border: `1.5px solid ${isDark ? 'rgba(168, 85, 247, 0.45)' : 'rgba(147, 51, 234, 0.35)'}`,
            borderRadius: 18,
            boxShadow: isDark
              ? '0 12px 28px rgba(0, 0, 0, 0.6), 0 0 20px rgba(168, 85, 247, 0.2)'
              : '0 10px 24px rgba(100, 116, 139, 0.15)',
            backdropFilter: 'blur(12px)',
            color: isDark ? '#f8fafc' : '#0f172a',
            fontSize: 22,
            fontWeight: 600,
            lineHeight: 1.35,
            fontFamily: FONT.sans,
            textAlign: 'left' as const,
            position: 'relative' as const,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4}}>
            <span style={{fontSize: 13, textTransform: 'uppercase' as const, letterSpacing: 1.5, color: '#c084fc', fontWeight: 800}}>
              Elaina
            </span>
            <span style={{fontSize: 11, color: isDark ? '#94a3b8' : '#64748b', fontWeight: 500}}>
              The Wandering Witch
            </span>
          </div>
          {speechText}
        </div>
      )}

      {/* Main Character Animated Stage */}
      <div
        style={{
          width,
          height,
          position: 'relative',
          transformStyle: 'preserve-3d' as const,
          transform: `scale(${entryScale * squashX}, ${entryScale * squashY}) translateY(${floatY}px) rotateY(${floatRotateY}deg) rotateX(${floatRotateX}deg) rotateZ(${floatRotateZ + hatTilt}deg)`,
          filter: isDark
            ? `drop-shadow(0 18px 36px rgba(0,0,0,0.85)) drop-shadow(0 0 22px ${glowColor})`
            : `drop-shadow(0 14px 28px rgba(0,0,0,0.20)) drop-shadow(0 0 16px ${glowColor})`,
          transformOrigin: 'bottom center',
        }}
      >
        {/* Magic Particles & Stardust (SVG Overlay) */}
        {showMagicParticles && (
          <svg
            viewBox="0 0 300 400"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              overflow: 'visible',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          >
            {allParticles.map((p, i) => {
              const px = p.cx + Math.sin(frame / p.speedX) * p.radiusX;
              const py = p.cy + Math.cos(frame / p.speedY) * p.radiusY;
              const sc = p.baseScale + Math.sin(frame / p.scaleSpeed) * 0.3;
              const op = Math.max(0, Math.min(1, p.baseOpacity + Math.sin(frame / p.opacitySpeed) * 0.4));

              return (
                <g
                  key={i}
                  transform={`translate(${px}, ${py}) scale(${sc})`}
                  opacity={op}
                >
                  {p.shape === 'star' ? (
                    <polygon
                      points={`0,-${p.size} ${p.size * 0.25},-${p.size * 0.25} ${p.size},0 ${p.size * 0.25},${p.size * 0.25} 0,${p.size} -${p.size * 0.25},${p.size * 0.25} -${p.size},0 -${p.size * 0.25},-${p.size * 0.25}`}
                      fill={p.fill}
                      filter={`drop-shadow(0 0 6px ${p.glow})`}
                    />
                  ) : p.shape === 'diamond' ? (
                    <polygon
                      points={`0,-${p.size} ${p.size * 0.6},0 0,${p.size} -${p.size * 0.6},0`}
                      fill={p.fill}
                      filter={`drop-shadow(0 0 5px ${p.glow})`}
                    />
                  ) : (
                    <circle
                      cx="0"
                      cy="0"
                      r={p.size * 0.5}
                      fill={p.fill}
                      filter={`drop-shadow(0 0 8px ${p.glow})`}
                    />
                  )}
                </g>
              );
            })}
          </svg>
        )}

        {/* Procedural Blink Overlay — subtle eye-area squish */}
        {enableBlink && blinkScale < 1 && (
          <div
            style={{
              position: 'absolute',
              top: '15%',
              left: '20%',
              width: '60%',
              height: '18%',
              zIndex: 15,
              pointerEvents: 'none',
              transform: `scaleY(${blinkScale})`,
              transformOrigin: 'center center',
              // Subtle skin-tone bar that simulates eyelid closing
              background: `linear-gradient(180deg, transparent 0%, rgba(230, 215, 200, ${(1 - blinkScale) * 0.6}) 40%, rgba(230, 215, 200, ${(1 - blinkScale) * 0.6}) 60%, transparent 100%)`,
              borderRadius: '50%',
              mixBlendMode: 'multiply' as const,
            }}
          />
        )}

        {/* Character Base Image */}
        <Img
          src={imageSrc}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'bottom center',
          }}
        />

        {/* Dynamic Smug / AHA Sparkle Aura */}
        {isSmug && (
          <div
            style={{
              position: 'absolute',
              top: '12%',
              right: '18%',
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(253, 224, 71, 0.8) 0%, transparent 70%)',
              filter: 'blur(4px)',
              pointerEvents: 'none',
              transform: `scale(${1 + Math.sin(gf / 6) * 0.3})`,
            }}
          />
        )}

        {/* Alert Warning Pulse Ring */}
        {isAlert && (
          <div
            style={{
              position: 'absolute',
              top: '5%',
              left: '50%',
              transform: `translateX(-50%) scale(${1 + Math.sin(gf / 4) * 0.2})`,
              width: 48,
              height: 48,
              borderRadius: '50%',
              border: '2px solid rgba(239, 68, 68, 0.6)',
              boxShadow: '0 0 18px rgba(239, 68, 68, 0.4)',
              pointerEvents: 'none',
              opacity: 0.5 + Math.sin(gf / 3) * 0.4,
            }}
          />
        )}

        {/* Idea Magic Burst Halo */}
        {isIdea && gf > 20 && (
          <div
            style={{
              position: 'absolute',
              top: '-8%',
              left: '50%',
              transform: `translateX(-50%) scale(${0.8 + Math.sin(gf / 5) * 0.2})`,
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, transparent 70%)',
              boxShadow: '0 0 24px rgba(168, 85, 247, 0.4)',
              pointerEvents: 'none',
            }}
          />
        )}
      </div>
    </div>
  );
};
