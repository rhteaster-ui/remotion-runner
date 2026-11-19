import React from 'react';
import {Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {E, p} from './motion';
import {NEON_FONT, NEON_TOKENS as T} from './neonTokens';

export type PosterSpec = {
  src: string;
  source: string;
  accent?: string;
};

export const NEON_POSTERS = {
  hero: {
    src: 'assets/neon/neon-hero-plasma.jpg',
    source: 'blog.google · DeepMind Announcement',
    accent: '#FF5E1E',
  },
  lineup: {
    src: 'assets/neon/neon-lineup-banner.jpg',
    source: 'Google DeepMind · Model Architecture Hierarchy',
    accent: '#FF5E1E',
  },
  argon: {
    src: 'assets/krypton/argon-official.webp',
    source: 'blog.google · Gemini 4 Argon (Official)',
    accent: '#FF9800',
  },
  carbon: {
    src: 'assets/krypton/carbon-official.jpg',
    source: 'blog.google · Gemini 4 Carbon (Official)',
    accent: '#4285F4',
  },
  hydrogen: {
    src: 'assets/krypton/hydrogen-official.jpg',
    source: 'blog.google · Gemini 4 Hydrogen (Official)',
    accent: '#00E676',
  },
  benchmark: {
    src: 'assets/neon/neon-benchmark-board.png',
    source: 'Artificial Analysis & DeepMind Empirical Evaluation',
    accent: '#FF5E1E',
  },
} as const satisfies Record<string, PosterSpec>;

export const CleanPoster: React.FC<{
  poster: PosterSpec;
  enterAt?: number;
  width?: number;
  height?: number;
  tiltDeg?: number;
  zoomFrom?: number;
  zoomTo?: number;
  showCaption?: boolean;
  style?: React.CSSProperties;
}> = ({
  poster,
  enterAt = 0,
  width = 920,
  height = 518,
  tiltDeg = 0,
  zoomFrom = 1.0,
  zoomTo = 1.04,
  showCaption = true,
  style,
}) => {
  const f = useCurrentFrame();
  const localF = Math.max(0, f - enterAt);
  const enterP = p(f, enterAt, enterAt + 24, E.back);

  const floatY = Math.sin(localF * 0.05) * 4;
  const zoom = interpolate(localF, [0, 240], [zoomFrom, zoomTo], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const sweepX = interpolate(localF, [4, 34], [-150, 180], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const accentColor = poster.accent || '#FF5E1E';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: Math.min(1, enterP * 1.5),
        transform: `perspective(1400px) translateY(${(1 - enterP) * 30 + floatY}px) rotateY(${tiltDeg}deg) scale(${0.92 + 0.08 * enterP})`,
        ...style,
      }}
    >
      {/* 16:9 Cinema Poster Frame */}
      <div
        style={{
          width,
          height,
          borderRadius: 24,
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#0F172A',
          border: `1.5px solid rgba(255, 255, 255, 0.15)`,
          boxShadow: `0 30px 70px -15px rgba(0, 0, 0, 0.85), 0 0 40px ${accentColor}25`,
        }}
      >
        <Img
          src={staticFile(poster.src)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transform: `scale(${zoom})`,
          }}
        />

        {/* Glint Light Sweep */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${sweepX}%`,
            width: 140,
            background:
              'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
            transform: 'skewX(-25deg)',
            pointerEvents: 'none',
          }}
        />

        {/* Subtle Inner Border Shadow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.12)',
            pointerEvents: 'none',
            borderRadius: 24,
          }}
        />
      </div>

      {/* Official Publication Source Pill */}
      {showCaption && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            marginTop: 18,
            padding: '7px 20px',
            borderRadius: 999,
            backgroundColor: 'rgba(15, 23, 42, 0.92)',
            border: `1.5px solid rgba(255, 255, 255, 0.12)`,
            backdropFilter: 'blur(14px)',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.5)',
            transform: `translateY(${(1 - enterP) * 12}px)`,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              backgroundColor: accentColor,
              boxShadow: `0 0 8px ${accentColor}`,
            }}
          />
          <span
            style={{
              fontFamily: NEON_FONT.mono,
              fontSize: 13,
              fontWeight: 700,
              color: '#FFFFFF',
              letterSpacing: '0.04em',
            }}
          >
            {poster.source}
          </span>
        </div>
      )}
    </div>
  );
};
