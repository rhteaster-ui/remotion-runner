import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {CW, FONT, H, M, Mode, pal} from '../lib/theme';
import {pop} from '../lib/anim';

export const Background: React.FC<{mode: Mode; accent: string}> = ({mode, accent}) => {
  const frame = useCurrentFrame();
  const p = pal(mode);
  const grid = mode === 'dark' ? 'rgba(175,191,218,0.06)' : 'rgba(65,83,109,0.07)';
  const drift = Math.sin(frame / 90) * 40;
  return (
    <AbsoluteFill style={{backgroundColor: p.bg}}>
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${grid} 1px, transparent 1px), linear-gradient(90deg, ${grid} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 80 + drift,
          top: 300,
          width: 920,
          height: 920,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${accent} 0%, rgba(0,0,0,0) 65%)`,
          opacity: mode === 'dark' ? 0.16 : 0.12,
        }}
      />
    </AbsoluteFill>
  );
};

export const Header: React.FC<{index: number; total: number; label: string; mode: Mode; icon?: boolean}> = ({index, total, label, mode, icon = true}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = pal(mode);
  const o = pop(frame, 2, fps);
  return (
    <>
      {icon ? (
        <Img
          src={staticFile('assets/agent-icon.png')}
          style={{position: 'absolute', left: M, top: 96, width: 114, height: 120, opacity: o, transform: `scale(${0.85 + 0.15 * o})`}}
        />
      ) : null}
      <div style={{position: 'absolute', right: M, top: 112, textAlign: 'right', opacity: o}}>
        <div style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 26, color: p.muted, letterSpacing: '0.04em'}}>
          GEMINI 4 · {String(index).padStart(2, '0')}/{String(total).padStart(2, '0')}
        </div>
        <div style={{fontFamily: FONT.mono, fontWeight: 400, fontSize: 24, color: p.muted, marginTop: 8}}>{label}</div>
      </div>
    </>
  );
};

export const Headline: React.FC<{kicker: string; title: string; mode: Mode; accent?: string; size?: number}> = ({
  kicker,
  title,
  mode,
  accent,
  size = 84,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = pal(mode);
  const o = pop(frame, 4, fps);
  const fit = Math.min(size, Math.floor(CW / (title.length * 0.66)));
  return (
    <div style={{position: 'absolute', left: M, top: 292, width: CW, opacity: Math.min(1, o), transform: `translateY(${(1 - o) * 24}px)`}}>
      <div style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 26, color: accent ?? p.textAccent, letterSpacing: '0.03em', whiteSpace: 'nowrap'}}>
        {kicker}
      </div>
      <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: fit, lineHeight: 1.1, color: p.ink, marginTop: 14, whiteSpace: 'nowrap', letterSpacing: '-0.02em'}}>
        {title}
      </div>
    </div>
  );
};

export const Wipe: React.FC<{boundary: number; mode: Mode}> = ({boundary, mode}) => {
  const frame = useCurrentFrame();
  const x = interpolate(frame, [boundary - 8, boundary, boundary + 8], [100, 0, -100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  if (frame < boundary - 8 || frame > boundary + 8) return null;
  const p = pal(mode);
  return (
    <div style={{position: 'absolute', left: 0, top: 0, width: '100%', height: H, transform: `translateX(${x}%)`, backgroundColor: p.bg}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 8, height: '100%', backgroundColor: '#d4ff3f'}} />
    </div>
  );
};
