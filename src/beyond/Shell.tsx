import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {SCENES, T} from './data';
import {SANS, TH, Theme, ease} from './util';

// Transisi: iris membuka + light sweep + fade/blur keluar. Latar: blob gradien bergerak + zoom pelan.
export const Backdrop: React.FC<{id: Theme; first: boolean; children: React.ReactNode}> = ({id, first, children}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const th = TH[id];
  const inn = first ? 1 : ease(f, 0, T);
  const out = ease(f, d - T, d);
  const sweep = interpolate(f, [0, T + 6], [-60, 160], {extrapolateRight: 'clamp'});
  const blob = (c: string, x: number, y: number, ph: number): React.CSSProperties => ({
    position: 'absolute', width: 900, height: 900, borderRadius: '50%', filter: 'blur(120px)', opacity: 0.55,
    background: c, left: x + Math.sin(f / 90 + ph) * 120, top: y + Math.cos(f / 110 + ph) * 160,
  });
  return (
    <AbsoluteFill style={{clipPath: `circle(${inn * 150}% at 50% 50%)`, opacity: 1 - out * 0.9, filter: `blur(${out * 8}px)`,
      background: `linear-gradient(170deg, ${th.bg[0]}, ${th.bg[1]})`, color: th.fg, fontFamily: SANS, overflow: 'hidden'}}>
      <div style={blob(th.b[0], -300, -200, 0)} />
      <div style={blob(th.b[1], 500, 1000, 2)} />
      <AbsoluteFill style={{transform: `scale(${1 + (f / d) * 0.06})`}}>{children}</AbsoluteFill>
      {!first && f < T + 8 && (
        <div style={{position: 'absolute', top: '-10%', bottom: '-10%', width: '30%', left: `${sweep}%`, transform: 'skewX(-14deg)',
          background: `linear-gradient(90deg, transparent, ${th.ac}aa, transparent)`}} />
      )}
    </AbsoluteFill>
  );
};

// Judul bab besar & jelas (bukan label kecil) + rhmt ofc branding
export const Chrome: React.FC<{id: Theme; tag: string; index: number}> = ({id, tag, index}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const th = TH[id];
  const [t1, t2] = tag.split('|');
  const o = ease(f, T, T + 20);
  return (
    <AbsoluteFill style={{pointerEvents: 'none', fontFamily: SANS}}>
      <div style={{position: 'absolute', top: 0, left: 0, height: 10, width: `${(f / d) * 100}%`, background: th.ac}} />
      <div style={{position: 'absolute', top: 32, right: 60, fontSize: 24, fontWeight: 800, letterSpacing: 2, color: th.fg, opacity: 0.55}}>rhmt ofc</div>
      <div style={{position: 'absolute', top: 120, left: 60, right: 60, opacity: o, transform: `translateY(${(1 - o) * 30}px)`}}>
        <div style={{fontSize: 96, fontWeight: 900, lineHeight: 1, color: th.fg, letterSpacing: -1}}>
          <span style={{color: th.ac}}>{String(index + 1).padStart(2, '0')}</span> {t1}
        </div>
        {t2 && <div style={{fontSize: 52, fontWeight: 600, marginTop: 10, color: th.fg, opacity: 0.85}}>{t2}</div>}
      </div>
    </AbsoluteFill>
  );
};

// Subtitle konsisten: besar, tebal, kontras tinggi
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
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 300}}>
      <div style={{width: 960, padding: '30px 40px', borderRadius: 32, background: 'rgba(10,6,30,0.85)', borderLeft: `12px solid ${TH[id].ac}`,
        opacity: op, transform: `translateY(${(1 - ease(lf, 0, 10)) * 24}px)`, boxShadow: '0 20px 60px rgba(0,0,0,0.5)'}}>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 54, lineHeight: 1.25, color: '#fff'}}>{lines[i]}</div>
      </div>
    </AbsoluteFill>
  );
};
