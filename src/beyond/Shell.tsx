import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {T} from './data';
import {ACC, SANS, ease} from './util';

// Sistem konsisten: latar gelap yang sama, teks putih, satu aksen. Hanya "glow" tipis yang mengikuti hero model.
export const Backdrop: React.FC<{glow: [string, string]; first: boolean; children: React.ReactNode}> = ({glow, first, children}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const inn = first ? 1 : ease(f, 0, T);
  const out = ease(f, d - T, d);
  const sweep = interpolate(f, [0, T + 6], [-60, 160], {extrapolateRight: 'clamp'});
  const blob = (c: string, x: number, y: number, ph: number): React.CSSProperties => ({position: 'absolute', width: 900, height: 900, borderRadius: '50%',
    filter: 'blur(140px)', opacity: 0.32, background: c, left: x + Math.sin(f / 90 + ph) * 100, top: y + Math.cos(f / 110 + ph) * 120});
  return (
    <AbsoluteFill style={{clipPath: `circle(${inn * 150}% at 50% 50%)`, opacity: 1 - out * 0.9, filter: `blur(${out * 8}px)`,
      background: 'linear-gradient(170deg,#090b11,#151a28)', color: '#fff', fontFamily: SANS, overflow: 'hidden'}}>
      <div style={blob(glow[0], -250, 100, 0)} />
      <div style={blob(glow[1], 450, 700, 2)} />
      <AbsoluteFill style={{transform: `scale(${1 + (f / d) * 0.05})`}}>{children}</AbsoluteFill>
      {!first && f < T + 8 && <div style={{position: 'absolute', top: '-10%', bottom: '-10%', width: '30%', left: `${sweep}%`, transform: 'skewX(-14deg)',
        background: `linear-gradient(90deg,transparent,${ACC}88,transparent)`}} />}
    </AbsoluteFill>
  );
};

export const Chrome: React.FC<{tag: string}> = ({tag}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const [t1, t2] = tag.split('|');
  const o = ease(f, T, T + 20);
  return (
    <AbsoluteFill style={{pointerEvents: 'none', fontFamily: SANS}}>
      <div style={{position: 'absolute', top: 0, left: 0, height: 10, width: `${(f / d) * 100}%`, background: ACC}} />
      <div style={{position: 'absolute', top: 32, right: 60, fontSize: 24, fontWeight: 800, letterSpacing: 2, color: '#fff', opacity: 0.5}}>rhmt ofc</div>
      <div style={{position: 'absolute', top: 110, left: 60, right: 60, opacity: o, transform: `translateY(${(1 - o) * 24}px)`}}>
        <div style={{fontSize: 84, fontWeight: 900, lineHeight: 1, color: '#fff'}}>{t1}</div>
        <div style={{fontSize: 46, fontWeight: 600, marginTop: 10, color: ACC}}>{t2}</div>
      </div>
    </AbsoluteFill>
  );
};

export const Subtitle: React.FC<{lines: string[]}> = ({lines}) => {
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
      <div style={{width: 960, padding: '30px 40px', borderRadius: 32, background: 'rgba(6,8,14,0.86)', borderLeft: `12px solid ${ACC}`,
        opacity: op, transform: `translateY(${(1 - ease(lf, 0, 10)) * 24}px)`}}>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 52, lineHeight: 1.25, color: '#fff'}}>{lines[i]}</div>
      </div>
    </AbsoluteFill>
  );
};
