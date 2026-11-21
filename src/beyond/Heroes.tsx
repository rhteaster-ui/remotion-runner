import React from 'react';
import {random} from 'remotion';
import {ease} from './util';

// Setiap hero object digambar di kanvas 700x700. Warna di sini = interpretasi kreatif, bukan warna resmi model.
type P = {f: number};
const S: React.FC<{children: React.ReactNode}> = ({children}) => <svg width="700" height="700" viewBox="0 0 700 700" style={{overflow: 'visible'}}>{children}</svg>;
const GLOW = <filter id="gl" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>;
const CX = 350, CY = 350;

const Astra: React.FC<P> = ({f}) => (
  <S><defs><radialGradient id="ac"><stop offset="0%" stopColor="#fff2c2" /><stop offset="100%" stopColor="#d9a441" stopOpacity="0" /></radialGradient></defs>
    {Array.from({length: 280}).map((_, i) => { const t = i / 280, r = 25 + t * 320, ang = t * 9 + (i % 3) * 2.094 + f / 120, j = (random('j' + i) - 0.5) * 44;
      return <circle key={i} cx={CX + Math.cos(ang) * (r + j)} cy={CY + Math.sin(ang) * (r + j) * 0.6} r={1.5 + random('r' + i) * 4}
        fill={i % 7 === 0 ? '#ffd36b' : i % 2 ? '#b79cff' : '#e8eaf6'} opacity={0.3 + 0.7 * random('o' + i)} />; })}
    <circle cx={CX} cy={CY} r={110} fill="url(#ac)" /></S>
);
const Sol: React.FC<P> = ({f}) => (
  <S><defs><radialGradient id="sg"><stop offset="0%" stopColor="#fff4c0" /><stop offset="100%" stopColor="#ff8a00" /></radialGradient>{GLOW}</defs>
    {Array.from({length: 28}).map((_, i) => { const a = (i / 28) * 6.283 + f / 90, l = 60 + 45 * Math.sin(f / 9 + i);
      return <line key={i} x1={CX + Math.cos(a) * 160} y1={CY + Math.sin(a) * 160} x2={CX + Math.cos(a) * (160 + l)} y2={CY + Math.sin(a) * (160 + l)} stroke="#ffb703" strokeWidth="10" strokeLinecap="round" />; })}
    {Array.from({length: 36}).map((_, i) => { const a = random('p' + i) * 6.283, r = 190 + ((f * 2 + i * 23) % 150);
      return <circle key={i} cx={CX + Math.cos(a) * r} cy={CY + Math.sin(a) * r} r="4" fill="#ffe08a" opacity={1 - (r - 190) / 150} />; })}
    <circle cx={CX} cy={CY} r={150} fill="url(#sg)" filter="url(#gl)" /></S>
);
const Terra: React.FC<P> = ({f}) => {
  const x = -((f * 1.4) % 700);
  const land = <g fill="#3e9a55"><path d="M150,260 q60,-50 120,-10 q40,60 -20,110 q-70,20 -100,-40z" /><path d="M420,380 q70,-30 110,20 q10,70 -60,90 q-60,-30 -50,-110z" /><path d="M300,160 q40,-20 70,10 q-10,40 -50,40z" /></g>;
  return (
    <S><defs><clipPath id="tc"><circle cx={CX} cy={CY} r="215" /></clipPath>
      <radialGradient id="tg" cx="35%" cy="30%"><stop offset="0%" stopColor="#2a8fe0" /><stop offset="100%" stopColor="#06284f" /></radialGradient>
      <radialGradient id="ts" cx="35%" cy="30%"><stop offset="55%" stopColor="#000" stopOpacity="0" /><stop offset="100%" stopColor="#000" stopOpacity="0.55" /></radialGradient></defs>
      <circle cx={CX} cy={CY} r="215" fill="url(#tg)" />
      <g clipPath="url(#tc)"><g transform={`translate(${x},0)`}>{land}</g><g transform={`translate(${x + 700},0)`}>{land}</g>
        {[-100, 0, 100].map((y) => <ellipse key={y} cx={CX} cy={CY + y} rx="215" ry={Math.max(6, 40 - Math.abs(y) / 5)} fill="none" stroke="#fff" strokeOpacity="0.15" strokeWidth="2" />)}</g>
      <circle cx={CX} cy={CY} r="215" fill="url(#ts)" /></S>
  );
};
const Luna: React.FC<P> = ({f}) => (
  <S><defs><clipPath id="lc"><circle cx={CX} cy={CY} r="215" /></clipPath><radialGradient id="lg"><stop offset="60%" stopColor="#9bbbe0" stopOpacity="0.5" /><stop offset="100%" stopColor="#9bbbe0" stopOpacity="0" /></radialGradient></defs>
    <circle cx={CX} cy={CY} r="330" fill="url(#lg)" />
    <circle cx={CX} cy={CY} r="215" fill="#d3dae4" />
    <g clipPath="url(#lc)" fill="#aab4c3">{[[280, 280, 36], [420, 330, 50], [330, 440, 30], [470, 450, 24], [260, 400, 22], [380, 230, 20]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} />)}
      <circle cx={CX + 330 * Math.sin(f / 70)} cy={CY} r="215" fill="#070a12" fillOpacity="0.82" /></g></S>
);
const Hydrogen: React.FC<P> = ({f}) => (
  <S><defs>{GLOW}</defs>
    <circle cx={CX} cy={CY} r="200" fill="none" stroke="#9ee7ff" strokeOpacity="0.35" strokeWidth="3" />
    {Array.from({length: 16}).map((_, i) => { const a = f / 5 - i * 0.14; return <circle key={i} cx={CX + Math.cos(a) * 200} cy={CY + Math.sin(a) * 200} r={16 - i} fill="#37d6ff" opacity={1 - i / 16} />; })}
    <circle cx={CX} cy={CY} r="34" fill="#fff" filter="url(#gl)" />
    <text x={CX} y={CY + 14} textAnchor="middle" fontSize="40" fontWeight="900" fill="#0a2a3a">p⁺</text></S>
);
const Carbon: React.FC<P> = ({f}) => {
  const R = 85, cs = [[0, 0], ...Array.from({length: 6}, (_, k) => [Math.cos(0.5236 + k * 1.0472) * R * 1.732, Math.sin(0.5236 + k * 1.0472) * R * 1.732])];
  return (
    <S><g transform={`translate(${CX},${CY}) rotate(${f / 4})`}>
      {cs.map(([cx, cy], i) => { const o = ease(f, i * 10, i * 10 + 30), v = Array.from({length: 6}, (_, k) => [cx + Math.cos(k * 1.0472) * R, cy + Math.sin(k * 1.0472) * R]);
        return <g key={i} opacity={o}><polygon points={v.map((p) => p.join(',')).join(' ')} fill="rgba(255,255,255,0.05)" stroke="#c9d1dc" strokeWidth="5" />{v.map((p, k) => <circle key={k} cx={p[0]} cy={p[1]} r="11" fill="#fff" />)}</g>; })}
    </g></S>
  );
};
const Neon: React.FC<P> = ({f}) => {
  const fl = 0.8 + 0.2 * Math.sin(f * 0.9) * Math.sin(f / 7);
  return (
    <S><defs>{GLOW}</defs><g filter="url(#gl)" opacity={fl}>
      <circle cx={CX} cy={CY} r="260" fill="none" stroke="#d11bff" strokeWidth="12" strokeDasharray={`${ease(f, 0, 40) * 1630} 1630`} strokeLinecap="round" />
      <text x={CX} y={CY + 110} textAnchor="middle" fontSize="320" fontWeight="900" fill="none" stroke="#ff4d2e" strokeWidth="12">Ne</text></g></S>
  );
};
const Argon: React.FC<P> = ({f}) => (
  <S><defs>{GLOW}</defs>
    {[0, 60, 120].map((r) => <ellipse key={r} cx={CX} cy={CY} rx="250" ry="90" fill="none" stroke="#6f8fff" strokeOpacity="0.6" strokeWidth="4" transform={`rotate(${r + f / 2} ${CX} ${CY})`} />)}
    <g filter="url(#gl)" stroke="#9bb8ff" strokeWidth="5" fill="none" strokeLinecap="round">
      {Array.from({length: 7}).map((_, i) => { const a = (i / 7) * 6.283, s = Math.floor(f / 4), j = (k: number) => (random(`${i}${k}${s}`) - 0.5) * 70, ex = CX + Math.cos(a) * 270, ey = CY + Math.sin(a) * 270;
        return <path key={i} d={`M${CX},${CY} Q${(CX + ex) / 2 + j(1)},${(CY + ey) / 2 + j(2)} ${ex},${ey}`} />; })}</g>
    <circle cx={CX} cy={CY} r="42" fill="#9b5cff" filter="url(#gl)" /></S>
);
const Haiku: React.FC<P> = ({f}) => (
  <S><circle cx={CX} cy={CY - 40} r="190" fill="none" stroke="#e8e1d2" strokeWidth="30" strokeLinecap="round" strokeDasharray={`${ease(f, 10, 90) * 1050} 1300`} transform={`rotate(-70 ${CX} ${CY - 40})`} />
    <circle cx={CX + 150} cy={CY - 190} r={22 * ease(f, 90, 120)} fill="#cc5a1a" />
    {[5, 7, 5].map((u, i) => <rect key={i} x={CX - 110} y={CY + 200 + i * 30} width={u * 30 * ease(f, 100 + i * 15, 130 + i * 15)} height="12" rx="6" fill="#e8e1d2" />)}</S>
);
const Sonnet: React.FC<P> = ({f}) => (
  <S>{Array.from({length: 14}).map((_, i) => <rect key={i} x={90} y={90 + i * 37} height="14" rx="7" fill={i > 7 ? '#d9822b' : '#f3e6cf'}
    width={(380 + 140 * Math.sin(i * 1.7)) * ease(f, i * 7, i * 7 + 30) * (0.96 + 0.04 * Math.sin(f / 8 + i))} />)}</S>
);
const Opus: React.FC<P> = ({f}) => (
  <S><circle cx={CX} cy={CY} r="250" fill="none" stroke="#cc5a1a" strokeWidth="14" strokeDasharray={`${ease(f, 0, 70) * 1570} 1570`} />
    {[0, 1, 2, 3, 4].map((i) => <line key={i} x1="90" x2={90 + 520 * ease(f, 20, 70)} y1={270 + i * 32} y2={270 + i * 32} stroke="#f3e6cf" strokeWidth="4" />)}
    {Array.from({length: 8}).map((_, i) => { const y = 270 + ((i * 3) % 5) * 32, x = 130 + i * 62, o = ease(f, 60 + i * 9, 75 + i * 9);
      return <g key={i} opacity={o}><ellipse cx={x} cy={y} rx="18" ry="13" fill="#cc5a1a" /><line x1={x + 17} x2={x + 17} y1={y} y2={y - 70} stroke="#f3e6cf" strokeWidth="4" /></g>; })}</S>
);
export const HEROES: Record<string, React.FC<P>> = {astra: Astra, sol: Sol, terra: Terra, luna: Luna, hydrogen: Hydrogen, carbon: Carbon, neon: Neon, argon: Argon, haiku: Haiku, sonnet: Sonnet, opus: Opus};
