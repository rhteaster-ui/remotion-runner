import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {SCENES, T} from './data';
import {MONO, SANS, TH, Theme, ease} from './util';

// Backdrop: Minimalist Technical Slate Canvas dengan 1px engineering grid & subtle spotlight
export const Backdrop: React.FC<{id: Theme; first: boolean; children: React.ReactNode}> = ({id, first, children}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const th = TH[id];
  const inn = first ? 1 : ease(f, 0, T);
  const out = ease(f, d - T, d);
  const sweep = interpolate(f, [0, T + 6], [-60, 160], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill
      style={{
        clipPath: `circle(${inn * 150}% at 50% 50%)`,
        opacity: 1 - out * 0.92,
        backgroundColor: th.bg[0],
        backgroundImage: `
          radial-gradient(ellipse 900px 700px at 50% 25%, ${th.bg[1]} 0%, transparent 80%),
          linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 72px 72px, 72px 72px',
        color: th.fg,
        fontFamily: SANS,
        overflow: 'hidden',
      }}
    >
      {/* Precision Corner Crosshairs (Technical Craft) */}
      <div style={{position: 'absolute', top: 36, left: 36, fontFamily: MONO, fontSize: 18, color: 'rgba(255,255,255,0.18)'}}>+</div>
      <div style={{position: 'absolute', top: 36, right: 36, fontFamily: MONO, fontSize: 18, color: 'rgba(255,255,255,0.18)'}}>+</div>
      <div style={{position: 'absolute', bottom: 36, left: 36, fontFamily: MONO, fontSize: 18, color: 'rgba(255,255,255,0.18)'}}>+</div>
      <div style={{position: 'absolute', bottom: 36, right: 36, fontFamily: MONO, fontSize: 18, color: 'rgba(255,255,255,0.18)'}}>+</div>

      {/* Main Content with smooth slow drift */}
      <AbsoluteFill style={{transform: `scale(${1 + (f / d) * 0.04})`}}>{children}</AbsoluteFill>

      {/* Subtle Technical Diagonal Sweep on transition */}
      {!first && f < T + 8 && (
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            bottom: '-10%',
            width: '25%',
            left: `${sweep}%`,
            transform: 'skewX(-16deg)',
            background: `linear-gradient(90deg, transparent, ${th.ac}33, transparent)`,
            pointerEvents: 'none',
          }}
        />
      )}
    </AbsoluteFill>
  );
};

// Chrome: Technical HUD Header dengan chapter indexing & rhmt ofc branding
export const Chrome: React.FC<{id: Theme; tag: string; index: number}> = ({id, tag, index}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const th = TH[id];
  const [t1, t2] = tag.split('|');
  const o = ease(f, T, T + 18);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {/* Top Progress Line */}
      <div style={{position: 'absolute', top: 0, left: 0, height: 4, width: `${(f / d) * 100}%`, background: th.ac}} />

      {/* Technical HUD Meta Header */}
      <div
        style={{
          position: 'absolute',
          top: 36,
          left: 64,
          right: 64,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: MONO,
          fontSize: 20,
          letterSpacing: 2,
          color: '#64748B',
          opacity: o,
        }}
      >
        <span>
          SYS.STAGE // <span style={{color: th.ac, fontWeight: 700}}>{String(index + 1).padStart(2, '0')}</span>/{String(SCENES.length).padStart(2, '0')}
        </span>
        <span style={{color: '#94A3B8', fontWeight: 700}}>rhmt ofc</span>
      </div>

      {/* Chapter Title Container */}
      <div
        style={{
          position: 'absolute',
          top: 100,
          left: 64,
          right: 64,
          opacity: o,
          transform: `translateY(${(1 - o) * 24}px)`,
        }}
      >
        <div
          style={{
            fontFamily: SANS,
            fontSize: 84,
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: -1.5,
            color: '#FFFFFF',
          }}
        >
          <span style={{color: th.ac}}>{String(index + 1).padStart(2, '0')}</span> {t1}
        </div>
        {t2 && (
          <div
            style={{
              fontFamily: SANS,
              fontSize: 38,
              fontWeight: 600,
              marginTop: 8,
              color: '#94A3B8',
              letterSpacing: -0.5,
            }}
          >
            {t2}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// Subtitle: High-Contrast Technical Slate Card di TikTok/Reels Safe-Zone
export const Subtitle: React.FC<{id: Theme; lines: string[]}> = ({id, lines}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const a = T + 6,
    b = d - T - 6;
  if (f < a || f >= b) return null;
  const seg = (b - a) / lines.length;
  const i = Math.min(lines.length - 1, Math.floor((f - a) / seg));
  const lf = f - a - i * seg;
  const op = Math.min(ease(lf, 0, 10), 1 - ease(lf, seg - 10, seg));
  const th = TH[id];

  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 260}}>
      <div
        style={{
          width: 940,
          padding: '28px 36px',
          borderRadius: 20,
          background: 'rgba(11, 15, 25, 0.92)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderLeft: `6px solid ${th.ac}`,
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          opacity: op,
          transform: `translateY(${(1 - ease(lf, 0, 10)) * 20}px)`,
        }}
      >
        <div
          style={{
            fontFamily: SANS,
            fontWeight: 700,
            fontSize: 44,
            lineHeight: 1.35,
            color: '#F8FAFC',
          }}
        >
          {lines[i]}
        </div>
      </div>
    </AbsoluteFill>
  );
};
