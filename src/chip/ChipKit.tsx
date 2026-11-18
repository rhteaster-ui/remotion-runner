import React from 'react';
import {Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {chipTokens} from './tokens';
import {FONT} from '../theme-tokens';

/**
 * Hardware PCB trace + dot-matrix parallax canvas background (zero AI-slop glow).
 */
export const PcbBackground: React.FC<{
  bgColor: string;
  traceColor?: string;
  dotColor?: string;
  children?: React.ReactNode;
}> = ({
  bgColor,
  traceColor = 'rgba(255,255,255,0.06)',
  dotColor = 'rgba(255,255,255,0.12)',
  children,
}) => {
  const frame = useCurrentFrame();
  const drift = (frame * 0.45) % 48;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: bgColor,
        overflow: 'hidden',
      }}
    >
      {/* Subtle drifting dot-matrix */}
      <div
        style={{
          position: 'absolute',
          inset: -60,
          backgroundImage: `radial-gradient(${dotColor} 2px, transparent 2px)`,
          backgroundSize: '48px 48px',
          transform: `translate(${drift}px, ${drift * 0.5}px)`,
        }}
      />
      {/* Crisp geometric PCB trace lines */}
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}
      >
        <path
          d="M 80 260 L 80 540 L 180 640 L 180 1200"
          fill="none"
          stroke={traceColor}
          strokeWidth="3"
        />
        <circle cx="80" cy="260" r="8" fill={traceColor} />
        <circle cx="180" cy="1200" r="8" fill={traceColor} />
        <path
          d="M 1000 320 L 1000 720 L 900 820 L 900 1480"
          fill="none"
          stroke={traceColor}
          strokeWidth="3"
        />
        <circle cx="1000" cy="320" r="8" fill={traceColor} />
        <circle cx="900" cy="1480" r="8" fill={traceColor} />
      </svg>
      {children}
    </div>
  );
};

/**
 * Tactile die-cut Zine Card with 4px ink border & hard offset shadow.
 */
export const ZineCard: React.FC<{
  children: React.ReactNode;
  bg?: string;
  rotate?: number;
  enter?: number;
  style?: React.CSSProperties;
}> = ({children, bg = chipTokens.white, rotate = 0, enter = 1, style}) => {
  const scale = interpolate(enter, [0, 1], [0.85, 1]);
  const ty = interpolate(enter, [0, 1], [32, 0]);
  return (
    <div
      style={{
        backgroundColor: bg,
        border: `4px solid ${chipTokens.ink}`,
        borderRadius: 26,
        boxShadow: `10px 10px 0px ${chipTokens.ink}`,
        padding: '24px 28px',
        transform: `translateY(${ty}px) scale(${scale}) rotate(${rotate}deg)`,
        opacity: Math.min(1, enter * 1.4),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/**
 * Authentic News Article / Poster Card with Real Photograph from Media Outlets.
 */
export const RealNewsPosterCard: React.FC<{
  imageSrc: string;
  portalName: string;
  headline: string;
  captionText: string;
  badgeText?: string;
  enter?: number;
  rotate?: number;
}> = ({
  imageSrc,
  portalName,
  headline,
  captionText,
  badgeText = 'KSTI 2026 SURABAYA',
  enter = 1,
  rotate = -0.5,
}) => {
  const scale = interpolate(enter, [0, 1], [0.88, 1]);
  const ty = interpolate(enter, [0, 1], [36, 0]);

  return (
    <div
      style={{
        backgroundColor: chipTokens.white,
        border: `4px solid ${chipTokens.ink}`,
        borderRadius: 24,
        boxShadow: `10px 10px 0px ${chipTokens.ink}`,
        padding: '20px 22px',
        transform: `translateY(${ty}px) scale(${scale}) rotate(${rotate}deg)`,
        opacity: Math.min(1, enter * 1.4),
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        width: '100%',
      }}
    >
      {/* News Portal Header */}
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
          <span
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              backgroundColor: chipTokens.crimson,
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontFamily: FONT.space,
              fontSize: 22,
              fontWeight: 900,
              color: chipTokens.crimson,
              letterSpacing: '0.04em',
            }}
          >
            {portalName}
          </span>
        </div>
        <span
          style={{
            fontFamily: FONT.mono,
            fontSize: 16,
            fontWeight: 800,
            backgroundColor: chipTokens.gold,
            color: chipTokens.ink,
            padding: '3px 12px',
            borderRadius: 8,
            border: `2px solid ${chipTokens.ink}`,
          }}
        >
          {badgeText}
        </span>
      </div>

      {/* Real News Photo with Border & Caption Tag */}
      <div style={{position: 'relative', width: '100%', overflow: 'hidden', borderRadius: 16, border: `3.5px solid ${chipTokens.ink}`}}>
        <Img
          src={imageSrc}
          style={{
            width: '100%',
            height: 380,
            objectFit: 'cover',
            display: 'block',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '8px 16px',
            backgroundColor: 'rgba(17, 16, 29, 0.88)',
            borderTop: '2px solid rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontFamily: FONT.mono,
              fontSize: 15,
              fontWeight: 700,
              color: '#F8FAFC',
            }}
          >
            {captionText}
          </span>
          <span
            style={{
              fontFamily: FONT.mono,
              fontSize: 14,
              fontWeight: 800,
              color: chipTokens.gold,
            }}
          >
            DOKUMEN ASLI
          </span>
        </div>
      </div>

      {/* Headline Text */}
      <div
        style={{
          fontFamily: FONT.space,
          fontSize: 34,
          fontWeight: 900,
          color: chipTokens.ink,
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
        }}
      >
        {headline}
      </div>
    </div>
  );
};

/**
 * Authentic TikTok-style skeptical comment bubble with vector user avatar & heart SVG.
 */
export const TikTokCommentCard: React.FC<{
  handle: string;
  comment: string;
  likes: string;
  avatarColor: string;
  enter: number;
  rotate?: number;
  tag?: string;
  peelEffect?: boolean;
}> = ({handle, comment, likes, avatarColor, enter, rotate = 0, tag, peelEffect = false}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(enter, [0, 1], [0.8, 1]);
  const ty = interpolate(enter, [0, 1], [40, 0]);
  const peelAngle = peelEffect ? Math.min(22, (frame % 30)) : 0;

  return (
    <div
      style={{
        backgroundColor: '#18181B',
        border: `4px solid ${chipTokens.ink}`,
        borderRadius: 24,
        boxShadow: `8px 8px 0px ${chipTokens.crimson}`,
        padding: '18px 22px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        transform: `translateY(${ty}px) scale(${scale}) rotate(${rotate}deg)`,
        opacity: Math.min(1, enter * 1.4),
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 16, flex: 1}}>
        {/* Vector Avatar */}
        <svg width="56" height="56" viewBox="0 0 56 56" style={{flexShrink: 0}}>
          <circle cx="28" cy="28" r="26" fill={avatarColor} stroke={chipTokens.white} strokeWidth="2.5" />
          <circle cx="28" cy="21" r="9" fill={chipTokens.white} />
          <path d="M13 44 C15 34, 41 34, 43 44" fill={chipTokens.white} />
        </svg>
        <div>
          <div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4}}>
            <span style={{fontFamily: FONT.mono, fontSize: 20, fontWeight: 700, color: '#A1A1AA'}}>
              {handle}
            </span>
            {tag && (
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 16,
                  fontWeight: 800,
                  backgroundColor: chipTokens.crimson,
                  color: chipTokens.white,
                  padding: '2px 8px',
                  borderRadius: 6,
                }}
              >
                {tag}
              </span>
            )}
          </div>
          <div style={{fontFamily: FONT.sans, fontSize: 28, fontWeight: 800, color: chipTokens.white, lineHeight: 1.25}}>
            "{comment}"
          </div>
        </div>
      </div>

      {/* Heart count SVG */}
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0}}>
        <svg width="30" height="30" viewBox="0 0 24 24">
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill={chipTokens.crimson}
          />
        </svg>
        <span style={{fontFamily: FONT.mono, fontSize: 18, fontWeight: 700, color: '#D4D4D8'}}>{likes}</span>
      </div>

      {peelEffect && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 44,
            height: 44,
            background: 'linear-gradient(135deg, transparent 50%, rgba(225,29,72,0.85) 50%)',
            transform: `rotate(${peelAngle}deg)`,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
};

/**
 * Slanted comic stamp badge.
 */
export const StampBadge: React.FC<{
  text: string;
  color?: string;
  enter: number;
  rotate?: number;
  fontSize?: number;
}> = ({text, color = chipTokens.crimson, enter, rotate = -8, fontSize = 38}) => {
  if (enter <= 0.01) return null;
  const scale = interpolate(enter, [0, 1], [1.7, 1]);
  return (
    <div
      style={{
        display: 'inline-block',
        padding: '12px 28px',
        backgroundColor: color,
        color: chipTokens.white,
        border: `4.5px solid ${chipTokens.ink}`,
        borderRadius: 16,
        boxShadow: `8px 8px 0px ${chipTokens.ink}`,
        fontFamily: FONT.space,
        fontSize,
        fontWeight: 900,
        letterSpacing: '0.04em',
        transform: `rotate(${rotate}deg) scale(${scale})`,
        opacity: Math.min(1, enter * 2),
      }}
    >
      {text}
    </div>
  );
};

/**
 * Animated Central Silicon Wafer Blueprint Hero Component.
 */
export const SiliconWaferHero: React.FC<{
  pulseFrame: number;
  size?: number;
  activeLabel?: string;
}> = ({pulseFrame, size = 380, activeLabel = 'PROTOTIPE RI-01'}) => {
  const scanAngle = (pulseFrame * 2.8) % 360;
  const glow = 0.5 + 0.5 * Math.sin(pulseFrame * 0.18);

  return (
    <div
      style={{
        width: size,
        height: size,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg width={size} height={size} viewBox="0 0 400 400">
        <defs>
          <radialGradient id="waferGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E11D48" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#1E293B" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0B0F19" stopOpacity="1" />
          </radialGradient>
          <linearGradient id="laserBeam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0" />
            <stop offset="85%" stopColor="#F59E0B" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FBBF24" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Outer Circular Silicon Wafer Substrate */}
        <circle cx="200" cy="200" r="185" fill="url(#waferGlow)" stroke={chipTokens.ink} strokeWidth="6" />
        <circle cx="200" cy="200" r="172" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="2.5" />
        <circle cx="200" cy="200" r="150" fill="none" stroke="rgba(251,191,36,0.25)" strokeWidth="1.5" strokeDasharray="6 4" />

        {/* Wafer Alignment Notch at top */}
        <path d="M 194 15 A 8 8 0 0 1 206 15" stroke={chipTokens.gold} strokeWidth="4" fill="none" />

        {/* Lithography Die Grid Matrix */}
        {[-90, -60, -30, 0, 30, 60, 90].map((offset) => (
          <React.Fragment key={`grid-${offset}`}>
            <line
              x1={200 + offset}
              y1="40"
              x2={200 + offset}
              y2="360"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1.5"
            />
            <line
              x1="40"
              y1={200 + offset}
              x2="360"
              y2={200 + offset}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1.5"
            />
          </React.Fragment>
        ))}

        {/* Sweeping Laser Scan Line */}
        <g transform={`translate(200, 200) rotate(${scanAngle})`}>
          <path d="M 0 0 L 175 -24 A 175 175 0 0 1 175 0 Z" fill="url(#laserBeam)" />
          <line x1="0" y1="0" x2="175" y2="0" stroke={chipTokens.gold} strokeWidth="3" />
        </g>

        {/* Microchip Contact Pins */}
        {[-48, -24, 0, 24, 48].map((d) => (
          <React.Fragment key={`pin-${d}`}>
            <rect x={200 + d - 4} y="112" width="8" height="18" rx="2" fill={chipTokens.gold} stroke={chipTokens.ink} strokeWidth="2" />
            <rect x={200 + d - 4} y="270" width="8" height="18" rx="2" fill={chipTokens.gold} stroke={chipTokens.ink} strokeWidth="2" />
            <rect x="112" y={200 + d - 4} width="18" height="8" rx="2" fill={chipTokens.gold} stroke={chipTokens.ink} strokeWidth="2" />
            <rect x="270" y={200 + d - 4} width="18" height="8" rx="2" fill={chipTokens.gold} stroke={chipTokens.ink} strokeWidth="2" />
          </React.Fragment>
        ))}

        {/* Center Silicon Die Package */}
        <rect x="135" y="135" width="130" height="130" rx="16" fill="#0F172A" stroke={chipTokens.ink} strokeWidth="6" />

        {/* Indonesian Flag Split Silicon Core */}
        <rect x="145" y="145" width="110" height="55" rx="8" fill={chipTokens.crimson} />
        <rect x="145" y="200" width="110" height="55" rx="8" fill={chipTokens.white} />
        <rect x="145" y="145" width="110" height="110" rx="8" fill="none" stroke={chipTokens.ink} strokeWidth="3" />

        {/* Center Microcontroller Golden Enclave */}
        <circle cx="200" cy="200" r="28" fill={chipTokens.gold} stroke={chipTokens.ink} strokeWidth="3.5" opacity={0.88 + 0.12 * glow} />
        <path d="M192 198 v-6 a8 8 0 0 1 16 0 v6" fill="none" stroke={chipTokens.ink} strokeWidth="3" strokeLinecap="round" />
        <rect x="189" y="198" width="22" height="16" rx="4" fill={chipTokens.ink} />
        <circle cx="200" cy="206" r="2.5" fill={chipTokens.gold} />
      </svg>

      <div
        style={{
          position: 'absolute',
          bottom: -14,
          padding: '6px 20px',
          backgroundColor: chipTokens.ink,
          border: `3px solid ${chipTokens.gold}`,
          borderRadius: 999,
          boxShadow: `4px 4px 0px ${chipTokens.crimson}`,
          fontFamily: FONT.mono,
          fontSize: 16,
          fontWeight: 800,
          color: chipTokens.gold,
          letterSpacing: '0.08em',
        }}
      >
        {activeLabel}
      </div>
    </div>
  );
};

/**
 * Animated Secure Chip + Indonesian e-Paspor illustration SVG.
 */
export const SecureChipSvg: React.FC<{pulseFrame: number; size?: number}> = ({
  pulseFrame,
  size = 180,
}) => {
  const glow = 0.5 + 0.5 * Math.sin(pulseFrame * 0.22);
  return (
    <svg width={size} height={size} viewBox="0 0 180 180">
      {/* Pins Top/Bottom/Left/Right */}
      {[42, 66, 90, 114, 138].map((pos, i) => {
        const active = ((Math.floor(pulseFrame / 4) + i) % 5) === 0;
        const pinColor = active ? chipTokens.gold : '#94A3B8';
        return (
          <g key={pos}>
            <rect x={pos - 4} y={10} width="8" height="22" rx="3" fill={pinColor} stroke={chipTokens.ink} strokeWidth="2.5" />
            <rect x={pos - 4} y={148} width="8" height="22" rx="3" fill={pinColor} stroke={chipTokens.ink} strokeWidth="2.5" />
            <rect x={10} y={pos - 4} width="22" height="8" rx="3" fill={pinColor} stroke={chipTokens.ink} strokeWidth="2.5" />
            <rect x={148} y={pos - 4} width="22" height="8" rx="3" fill={pinColor} stroke={chipTokens.ink} strokeWidth="2.5" />
          </g>
        );
      })}
      {/* Chip Substrate */}
      <rect x="28" y="28" width="124" height="124" rx="18" fill="#1E293B" stroke={chipTokens.ink} strokeWidth="5" />
      <rect x="42" y="42" width="96" height="96" rx="12" fill={chipTokens.crimson} stroke={chipTokens.ink} strokeWidth="3.5" />
      {/* Merah-Putih split core */}
      <rect x="44" y="90" width="92" height="46" rx="0" fill={chipTokens.white} />
      <rect x="42" y="42" width="96" height="96" rx="12" fill="none" stroke={chipTokens.ink} strokeWidth="3.5" />
      {/* Gold Padlock Core */}
      <circle cx="90" cy="90" r="24" fill={chipTokens.gold} stroke={chipTokens.ink} strokeWidth="3.5" opacity={0.85 + 0.15 * glow} />
      <path d="M82 88 v-5 a8 8 0 0 1 16 0 v5" fill="none" stroke={chipTokens.ink} strokeWidth="3.5" strokeLinecap="round" />
      <rect x="79" y="88" width="22" height="16" rx="4" fill={chipTokens.ink} />
      <circle cx="90" cy="96" r="2.5" fill={chipTokens.gold} />
    </svg>
  );
};

/**
 * Animated Tap Cursor for Follow Button.
 */
export const TapCursor: React.FC<{atFrame: number; x?: number; y?: number}> = ({
  atFrame,
  x = 0,
  y = 0,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const rel = frame - atFrame;
  if (rel < -10 || rel > 40) return null;

  const approach = spring({
    frame: Math.max(0, rel + 10),
    fps,
    config: {damping: 14, mass: 0.7, stiffness: 140},
  });
  const press = rel >= 4 && rel <= 12 ? Math.sin(((rel - 4) / 8) * Math.PI) : 0;
  const ripple = rel >= 6 ? Math.min(1, (rel - 6) / 16) : 0;

  const curX = interpolate(approach, [0, 1], [x + 120, x]);
  const curY = interpolate(approach, [0, 1], [y + 140, y]);

  return (
    <div style={{position: 'absolute', left: curX, top: curY, pointerEvents: 'none', zIndex: 75}}>
      {ripple > 0 && ripple < 1 && (
        <div
          style={{
            position: 'absolute',
            left: -24,
            top: -24,
            width: 56,
            height: 56,
            borderRadius: '50%',
            border: `4px solid ${chipTokens.crimson}`,
            transform: `scale(${0.4 + ripple * 2.2})`,
            opacity: 1 - ripple,
          }}
        />
      )}
      <svg
        width="54"
        height="54"
        viewBox="0 0 32 32"
        style={{transform: `scale(${1 - 0.18 * press})`, filter: `drop-shadow(3px 3px 0px ${chipTokens.ink})`}}
      >
        <path
          d="M6 3 L26 15 L17 18 L13 28 Z"
          fill={chipTokens.white}
          stroke={chipTokens.ink}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
