import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {SCENES, T} from './data';
import {MONO, SANS, TH, Theme, ease} from './util';

// Transisi sinematik: iris (lingkaran membuka) + light sweep diagonal + fade-out + blur halus
export const Backdrop: React.FC<{id: Theme; first: boolean; children: React.ReactNode}> = ({id, first, children}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const th = TH[id];
  const inn = first ? 1 : ease(f, 0, T);
  const out = ease(f, d - T, d);
  const sweep = interpolate(f, [0, T + 6], [-60, 160], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{
      clipPath: `circle(${inn * 150}% at 50% 50%)`,
      opacity: 1 - out * 0.9,
      filter: `blur(${out * 8}px)`,
      background: `linear-gradient(170deg, ${th.bg[0]}, ${th.bg[1]})`,
      color: th.fg, fontFamily: SANS,
    }}>
      {children}
      {!first && f < T + 8 && (
        <div style={{position: 'absolute', top: '-10%', bottom: '-10%', width: '28%', left: `${sweep}%`,
          transform: 'skewX(-14deg)', background: `linear-gradient(90deg, transparent, ${th.ac}66, transparent)`}} />
      )}
    </AbsoluteFill>
  );
};

// Chrome konsisten: tag bab + progress bar di atas + rhmt ofc branding
export const Chrome: React.FC<{id: Theme; tag: string; index: number}> = ({id, tag, index}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const th = TH[id];
  return (
    <AbsoluteFill style={{pointerEvents: 'none', fontFamily: MONO}}>
      <div style={{position: 'absolute', top: 110, left: 60, right: 60, opacity: ease(f, T, T + 15)}}>
        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 24, letterSpacing: 4, color: th.fg, opacity: 0.85}}>
          <span>{String(index + 1).padStart(2, '0')} / {String(SCENES.length).padStart(2, '0')}</span>
          <span style={{color: th.ac, fontWeight: 700}}>rhmt ofc · BEYOND THE NAMES</span>
        </div>
        <div style={{height: 3, marginTop: 14, background: `${th.fg}22`}}>
          <div style={{height: '100%', width: `${(f / d) * 100}%`, background: th.ac}} />
        </div>
        <div style={{marginTop: 18, fontSize: 26, letterSpacing: 3, color: th.fg}}>{tag}</div>
      </div>
    </AbsoluteFill>
  );
};

// Subtitle konsisten: pill gelap kaca, aksen warna bab, zona aman bawah TikTok
export const Subtitle: React.FC<{id: Theme; lines: string[]}> = ({id, lines}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const a = T + 6, b = d - T - 6;
  if (f < a || f >= b) return null;
  const seg = (b - a) / lines.length;
  const i = Math.min(lines.length - 1, Math.floor((f - a) / seg));
  const lf = f - a - i * seg;
  const op = Math.min(ease(lf, 0, 10), 1 - ease(lf, seg - 10, seg));
  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 280}}>
      <div style={{
        width: 940, padding: '30px 38px', borderRadius: 28, display: 'flex', gap: 24, alignItems: 'stretch',
        background: 'rgba(8,10,16,0.78)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.15)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
        opacity: op, transform: `translateY(${(1 - ease(lf, 0, 10)) * 20}px)`,
      }}>
        <div style={{width: 8, borderRadius: 4, background: TH[id].ac, flexShrink: 0}} />
        <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 44, lineHeight: 1.3, color: '#fff'}}>{lines[i]}</div>
      </div>
    </AbsoluteFill>
  );
};
