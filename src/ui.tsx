import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, CL, asset, fontFamily} from './theme';

export const useIn = (delay = 0, duration = 30) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: frame - delay, fps, config: {damping: 200}, durationInFrames: duration});
};

// Latar bersama untuk seluruh video: graphite + grid halus + cahaya perak.
export const Stage: React.FC<{children: React.ReactNode}> = ({children}) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 120) * 6;
  return (
    <AbsoluteFill style={{background: C.bg, fontFamily, color: C.text}}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(900px 600px at ${25 + drift}% 18%, rgba(143,180,255,0.10), transparent 60%), radial-gradient(800px 700px at ${85 - drift}% 92%, rgba(201,209,218,0.07), transparent 60%)`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${C.line} 1px, transparent 1px), linear-gradient(90deg, ${C.line} 1px, transparent 1px)`,
          backgroundSize: '96px 96px',
          opacity: 0.35,
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 25%, transparent 75%)',
          maskImage: 'radial-gradient(ellipse at center, black 25%, transparent 75%)',
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

export const SceneFade: React.FC<{children: React.ReactNode; inF?: number; outF?: number}> = ({children, inF = 12, outF = 12}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const o = interpolate(frame, [0, inF, durationInFrames - outF, durationInFrames], [0, 1, 1, 0], CL);
  return <AbsoluteFill style={{opacity: o}}>{children}</AbsoluteFill>;
};

export const Glass: React.FC<{style?: React.CSSProperties; children?: React.ReactNode}> = ({style, children}) => (
  <div
    style={{
      background: 'linear-gradient(145deg, rgba(255,255,255,0.09), rgba(255,255,255,0.03))',
      border: `1px solid ${C.line}`,
      borderRadius: 28,
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), 0 40px 80px rgba(0,0,0,0.45)',
      ...style,
    }}
  >
    {children}
  </div>
);

export const Tag: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <div style={{fontSize: 22, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.mute, fontWeight: 500, ...style}}>
    {children}
  </div>
);

export const Rise: React.FC<{delay?: number; children: React.ReactNode; style?: React.CSSProperties}> = ({delay = 0, children, style}) => {
  const p = useIn(delay);
  return <div style={{opacity: p, transform: `translateY(${(1 - p) * 36}px)`, ...style}}>{children}</div>;
};

export const Headline: React.FC<{lines: {t: string; italic?: boolean}[]; size: number; delay?: number}> = ({lines, size, delay = 0}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <div>
      {lines.map((l, i) => {
        const p = spring({frame: frame - delay - i * 8, fps, config: {damping: 200}, durationInFrames: 34});
        return (
          <div key={i} style={{overflow: 'hidden', lineHeight: 1.05, paddingBottom: size * 0.08}}>
            <div
              style={{
                fontSize: size,
                fontWeight: l.italic ? 300 : 700,
                fontStyle: l.italic ? 'italic' : 'normal',
                letterSpacing: '-0.03em',
                color: l.italic ? C.silver : C.text,
                transform: `translateY(${(1 - p) * 110}%)`,
              }}
            >
              {l.t}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Penanda bagian ala situs: "SEC_01  THE DIGITAL ARCHIVE" dan "SYS.01 // ..."
export const Chrome: React.FC<{sec: string; title: string; sys: string}> = ({sec, title, sys}) => (
  <>
    <div style={{position: 'absolute', left: 96, top: 64, display: 'flex', gap: 20, alignItems: 'baseline'}}>
      <span style={{fontSize: 24, color: C.silver, fontWeight: 500}}>{sec}</span>
      <Tag>{title}</Tag>
    </div>
    <div style={{position: 'absolute', right: 96, bottom: 56}}>
      <Tag>{sys}</Tag>
    </div>
  </>
);

// Logo tools diletakkan di ubin terang agar logo gelap tetap terbaca di latar gelap.
export const Logo: React.FC<{name: string; size?: number}> = ({name, size = 92}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.28,
      background: '#e9edf2',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
    }}
  >
    <Img src={asset(`images/tools/${name}.svg`)} style={{width: size * 0.58, height: size * 0.58, objectFit: 'contain'}} />
  </div>
);

export const Chip: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div style={{fontSize: 26, padding: '10px 22px', borderRadius: 999, border: `1px solid ${C.line}`, background: 'rgba(255,255,255,0.05)', color: C.silver}}>
    {children}
  </div>
);
