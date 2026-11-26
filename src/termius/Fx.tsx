import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {TERMIUS as T} from './TermiusIcons';
import {frameScale} from './TermiusUI';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/** Background hidup: glow bergerak + grid halus + vignette (frame global) */
export const AmbientBg: React.FC = () => {
  const f = useCurrentFrame();
  const a = f / 30;
  return (
    <AbsoluteFill style={{background: T.outerBg, overflow: 'hidden'}}>
      <div style={{
        position: 'absolute', width: 1200, height: 1200,
        left: -380 + Math.sin(a * 0.35) * 110, top: -300 + Math.cos(a * 0.3) * 90,
        borderRadius: '50%', background: `radial-gradient(circle, ${T.green}2b 0%, transparent 62%)`,
      }} />
      <div style={{
        position: 'absolute', width: 1100, height: 1100,
        right: -420 + Math.cos(a * 0.28) * 100, bottom: -260 + Math.sin(a * 0.33) * 90,
        borderRadius: '50%', background: `radial-gradient(circle, ${T.blue}26 0%, transparent 62%)`,
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
        backgroundSize: '64px 64px', backgroundPosition: `0px ${(f * 0.35) % 64}px`,
        WebkitMaskImage: 'radial-gradient(ellipse at 50% 45%, #000 20%, transparent 75%)',
        maskImage: 'radial-gradient(ellipse at 50% 45%, #000 20%, transparent 75%)',
      }} />
      <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)'}} />
    </AbsoluteFill>
  );
};

/** Transisi masuk/keluar tiap scene (slide halus + fade) */
export const SceneShell: React.FC<{children: React.ReactNode}> = ({children}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const inn = interpolate(f, [0, 10], [0, 1], clamp);
  const out = interpolate(f, [d - 9, d], [1, 0], clamp);
  return (
    <AbsoluteFill style={{opacity: Math.min(inn, out), transform: `translateY(${(1 - inn) * 28}px) scale(${1 - (1 - out) * 0.025})`}}>
      {children}
    </AbsoluteFill>
  );
};

/** Progress bar tipis di atas (pakai frame global, taruh di luar Sequence) */
export const GlobalProgress: React.FC<{total: number}> = ({total}) => {
  const f = useCurrentFrame();
  return (
    <div style={{position: 'absolute', top: 44, left: 54, right: 54, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.08)'}}>
      <div style={{width: `${(f / total) * 100}%`, height: '100%', borderRadius: 3, background: T.green, boxShadow: `0 0 14px ${T.green}`}} />
    </div>
  );
};

export type CursorKey = {f: number; x: number; y: number; click?: boolean};

export const cursorPos = (keys: CursorKey[], f: number) => {
  if (f <= keys[0].f) return {x: keys[0].x, y: keys[0].y};
  for (let i = 1; i < keys.length; i++) {
    if (f <= keys[i].f) {
      const a = keys[i - 1], b = keys[i];
      const p = b.f === a.f ? 1 : (f - a.f) / (b.f - a.f);
      const e = p * p * (3 - 2 * p);
      return {x: a.x + (b.x - a.x) * e, y: a.y + (b.y - a.y) * e};
    }
  }
  const l = keys[keys.length - 1];
  return {x: l.x, y: l.y};
};

/** Kursor mouse + ripple klik. Koordinat = canvas 1080x1920 (ikut zoom frame Termius) */
export const Cursor: React.FC<{keys: CursorKey[]; hideAt?: number}> = ({keys, hideAt}) => {
  const f = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const sc = frameScale(f, durationInFrames, fps);
  const tr = (p: {x: number; y: number}) => ({x: 540 + (p.x - 540) * sc, y: 813 + (p.y - 813) * sc});
  const p = tr(cursorPos(keys, f));
  let op = interpolate(f, [keys[0].f, keys[0].f + 8], [0, 1], clamp);
  if (hideAt !== undefined) op *= interpolate(f, [hideAt, hideAt + 10], [1, 0], clamp);
  const press = keys.some((k) => k.click && f >= k.f - 1 && f <= k.f + 4);
  return (
    <>
      {keys.filter((k) => k.click).map((k) => {
        const t = f - k.f;
        if (t < 0 || t > 20) return null;
        const c = tr(cursorPos(keys, k.f));
        return (
          <div key={k.f} style={{
            position: 'absolute', left: c.x - 40, top: c.y - 40, width: 80, height: 80, borderRadius: '50%',
            border: `3px solid ${T.green}`, background: `${T.green}22`,
            opacity: (1 - t / 20) * op, transform: `scale(${0.3 + 1.3 * (t / 20)})`, zIndex: 49,
          }} />
        );
      })}
      <div style={{
        position: 'absolute', left: p.x - 9, top: p.y - 5, opacity: op, zIndex: 50,
        transform: `scale(${press ? 0.86 : 1})`, transformOrigin: '9px 5px',
        filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.65))',
      }}>
        <svg width={42} height={42} viewBox="0 0 24 24">
          <path d="M5 3l14 8-6 1.5L10 19z" fill="#fff" stroke="#0b0d18" strokeWidth={1.4} strokeLinejoin="round" />
        </svg>
      </div>
    </>
  );
};
