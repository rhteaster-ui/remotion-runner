import React from 'react';
import {Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {chipTokens} from './tokens';
import {FONT} from '../theme-tokens';

/**
 * Hardware PCB trace + dot-matrix parallax canvas background with depth.
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
      {/* Crisp geometric PCB trace lines with glowing junctions */}
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}
      >
        <path
          d="M 60 220 L 60 580 L 160 680 L 160 1340 L 60 1440 L 60 1820"
          fill="none"
          stroke={traceColor}
          strokeWidth="3.5"
        />
        <circle cx="60" cy="220" r="9" fill={traceColor} />
        <circle cx="160" cy="680" r="7" fill={traceColor} />
        <circle cx="160" cy="1340" r="7" fill={traceColor} />
        <circle cx="60" cy="1820" r="9" fill={traceColor} />

        <path
          d="M 1020 280 L 1020 740 L 920 840 L 920 1420 L 1020 1520 L 1020 1820"
          fill="none"
          stroke={traceColor}
          strokeWidth="3.5"
        />
        <circle cx="1020" cy="280" r="9" fill={traceColor} />
        <circle cx="920" cy="840" r="7" fill={traceColor} />
        <circle cx="920" cy="1420" r="7" fill={traceColor} />
        <circle cx="1020" cy="1820" r="9" fill={traceColor} />
      </svg>
      {children}
    </div>
  );
};

/**
 * Tactile die-cut Zine Card with thick border & hard mechanical offset shadow.
 */
export const ZineCard: React.FC<{
  children: React.ReactNode;
  bg?: string;
  rotate?: number;
  enter?: number;
  borderColor?: string;
  shadowColor?: string;
  style?: React.CSSProperties;
}> = ({
  children,
  bg = chipTokens.white,
  rotate = 0,
  enter = 1,
  borderColor = chipTokens.ink,
  shadowColor = chipTokens.ink,
  style,
}) => {
  const scale = interpolate(enter, [0, 1], [0.85, 1]);
  const ty = interpolate(enter, [0, 1], [34, 0]);
  return (
    <div
      style={{
        backgroundColor: bg,
        border: `4px solid ${borderColor}`,
        borderRadius: 24,
        boxShadow: `10px 10px 0px ${shadowColor}`,
        padding: '22px 24px',
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
 * Heavy Industrial Tactile Stamp with spring recoil, tilt, and drop shadow.
 */
export const TactileStamp: React.FC<{
  text: string;
  color?: string;
  textColor?: string;
  enter: number;
  tilt?: number;
  fontSize?: number;
  subText?: string;
}> = ({
  text,
  color = chipTokens.crimson,
  textColor = chipTokens.white,
  enter,
  tilt = -5,
  fontSize = 38,
  subText,
}) => {
  if (enter <= 0.01) return null;
  const scale = interpolate(enter, [0, 1], [1.7, 1]);

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '12px 32px',
        backgroundColor: color,
        color: textColor,
        border: `5px solid ${chipTokens.ink}`,
        borderRadius: 18,
        boxShadow: `8px 8px 0px ${chipTokens.ink}`,
        fontFamily: FONT.space,
        fontSize,
        fontWeight: 900,
        letterSpacing: '0.04em',
        transform: `rotate(${tilt}deg) scale(${scale})`,
        transformOrigin: 'center center',
        zIndex: 60,
      }}
    >
      <span>{text}</span>
      {subText && (
        <span
          style={{
            fontFamily: FONT.mono,
            fontSize: 16,
            fontWeight: 800,
            marginTop: 4,
            opacity: 0.95,
            letterSpacing: '0.06em',
          }}
        >
          {subText}
        </span>
      )}
    </div>
  );
};

/**
 * Authentic News Document Frame with real news photo, scanning reticle HUD, and metadata.
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
  rotate = -0.4,
}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(enter, [0, 1], [0.88, 1]);
  const ty = interpolate(enter, [0, 1], [36, 0]);

  // Cinematic slow zoom so photo is never static
  const zoom = 1.0 + (frame * 0.0007);

  // High-tech laser reticle scan coordinates across the photo
  const t = frame / 30;
  const scanX = interpolate(Math.sin(t * 1.5), [-1, 1], [140, 780]);
  const scanY = interpolate(Math.cos(t * 1.2), [-1, 1], [80, 360]);

  return (
    <div
      style={{
        backgroundColor: chipTokens.white,
        border: `4.5px solid ${chipTokens.ink}`,
        borderRadius: 26,
        boxShadow: `12px 12px 0px ${chipTokens.ink}`,
        padding: '22px 24px',
        transform: `translateY(${ty}px) scale(${scale}) rotate(${rotate}deg)`,
        opacity: Math.min(1, enter * 1.4),
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        width: '100%',
      }}
    >
      {/* News Portal Header Bar */}
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <span
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              backgroundColor: chipTokens.crimson,
              display: 'inline-block',
              boxShadow: `0 0 8px ${chipTokens.crimson}`,
            }}
          />
          <span
            style={{
              fontFamily: FONT.space,
              fontSize: 24,
              fontWeight: 900,
              color: chipTokens.crimson,
              letterSpacing: '0.04em',
            }}
          >
            {portalName}
          </span>
          <span
            style={{
              fontFamily: FONT.mono,
              fontSize: 16,
              fontWeight: 800,
              color: chipTokens.slateMuted,
            }}
          >
            · SIARAN PERS RESMI
          </span>
        </div>
        <span
          style={{
            fontFamily: FONT.mono,
            fontSize: 16,
            fontWeight: 800,
            backgroundColor: chipTokens.gold,
            color: chipTokens.ink,
            padding: '4px 14px',
            borderRadius: 8,
            border: `2px solid ${chipTokens.ink}`,
          }}
        >
          {badgeText}
        </span>
      </div>

      {/* Real News Photo Container with Laser HUD */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 440,
          overflow: 'hidden',
          borderRadius: 18,
          border: `4px solid ${chipTokens.ink}`,
          backgroundColor: '#0F172A',
        }}
      >
        <Img
          src={imageSrc}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transform: `scale(${zoom})`,
          }}
        />

        {/* Laser HUD Reticle tracking across photo */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 920 440"
          style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}
        >
          <g transform={`translate(${scanX}, ${scanY})`}>
            <circle cx="0" cy="0" r="42" fill="none" stroke={chipTokens.gold} strokeWidth="3" strokeDasharray="8 6" />
            <circle cx="0" cy="0" r="14" fill="none" stroke={chipTokens.crimson} strokeWidth="2.5" />
            <line x1="-58" y1="0" x2="-20" y2="0" stroke={chipTokens.gold} strokeWidth="3" />
            <line x1="20" y1="0" x2="58" y2="0" stroke={chipTokens.gold} strokeWidth="3" />
            <line x1="0" y1="-58" x2="0" y2="-20" stroke={chipTokens.gold} strokeWidth="3" />
            <line x1="0" y1="20" x2="0" y2="58" stroke={chipTokens.gold} strokeWidth="3" />
          </g>
        </svg>

        {/* Top Floating Spec Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 14,
            left: 14,
            display: 'flex',
            gap: 10,
          }}
        >
          <span
            style={{
              padding: '6px 14px',
              backgroundColor: 'rgba(15, 23, 42, 0.92)',
              borderRadius: 8,
              border: `2px solid ${chipTokens.gold}`,
              fontFamily: FONT.mono,
              fontSize: 14,
              fontWeight: 800,
              color: chipTokens.gold,
            }}
          >
            NODE: 130nm 32-bit
          </span>
          <span
            style={{
              padding: '6px 14px',
              backgroundColor: 'rgba(15, 23, 42, 0.92)',
              borderRadius: 8,
              border: `2px solid ${chipTokens.emerald}`,
              fontFamily: FONT.mono,
              fontSize: 14,
              fontWeight: 800,
              color: chipTokens.emerald,
            }}
          >
            e-PASPOR RI
          </span>
        </div>

        {/* Bottom Caption Overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '10px 18px',
            backgroundColor: 'rgba(17, 16, 29, 0.92)',
            borderTop: '2px solid rgba(255,255,255,0.22)',
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
              fontWeight: 900,
              color: chipTokens.gold,
            }}
          >
            DOKUMEN ASLI
          </span>
        </div>
      </div>

      {/* Main Headline */}
      <div
        style={{
          fontFamily: FONT.space,
          fontSize: 36,
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
  const peelWave = peelEffect ? Math.sin(frame * 0.18) * 12 : 0;

  return (
    <div
      style={{
        backgroundColor: '#18181B',
        border: `4px solid ${chipTokens.ink}`,
        borderRadius: 24,
        boxShadow: `8px 8px 0px ${chipTokens.crimson}`,
        padding: '18px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        transform: `translateY(${ty}px) scale(${scale}) rotate(${rotate}deg)`,
        opacity: Math.min(1, enter * 1.4),
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
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
            top: -12,
            right: -12,
            width: 52,
            height: 52,
            background: 'linear-gradient(135deg, transparent 50%, #EF4444 50%)',
            transform: `rotate(${peelWave}deg)`,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
};

/**
 * Animated Secure Chip + Indonesian e-Paspor illustration SVG.
 */
export const SecureChipSvg: React.FC<{pulseFrame: number; size?: number}> = ({
  pulseFrame,
  size = 200,
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
