import React from 'react';
import { AbsoluteFill, random, useCurrentFrame } from 'remotion';
import { noise2D } from '@remotion/noise';
import { H, THEMES, ThemeId, W } from './theme';

const Blob: React.FC<{ seed: string; x: number; y: number; s: number; c: string; amp: number }> = ({ seed, x, y, s, c, amp }) => {
  const f = useCurrentFrame();
  return (
    <div
      style={{
        position: 'absolute',
        left: x + noise2D(seed, f * 0.0035, 0) * amp - s / 2,
        top: y + noise2D(seed, 0, f * 0.0035) * amp - s / 2,
        width: s,
        height: s,
        borderRadius: 999,
        background: `radial-gradient(circle, ${c} 0%, transparent 68%)`,
        filter: 'blur(60px)',
      }}
    />
  );
};

const Stars: React.FC<{ n: number; seedKey: string; tint?: string }> = ({ n, seedKey, tint = '#FFFFFF' }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      {Array.from({ length: n }).map((_, i) => {
        const depth = 0.3 + random(`${seedKey}d${i}`) * 0.7;
        const x = ((random(`${seedKey}x${i}`) * W - f * 0.18 * depth) % W + W) % W;
        const y = random(`${seedKey}y${i}`) * H;
        const sz = 1 + depth * 2.2;
        const tw = 0.45 + 0.55 * Math.abs(Math.sin(f * 0.03 * depth + i));
        return <div key={i} style={{ position: 'absolute', left: x, top: y, width: sz, height: sz, borderRadius: 999, background: tint, opacity: tw * depth, boxShadow: depth > 0.8 ? `0 0 8px ${tint}` : undefined }} />;
      })}
    </AbsoluteFill>
  );
};

export const Backdrop: React.FC<{ theme: ThemeId }> = ({ theme }) => {
  const f = useCurrentFrame();
  const t = THEMES[theme];

  if (theme === 'cosmos') {
    return (
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 70% 40%, #0B1230 0%, ${t.bg} 65%)` }}>
        <Blob seed="n1" x={1500} y={380} s={1100} c="rgba(70,90,210,0.30)" amp={120} />
        <Blob seed="n2" x={400} y={900} s={900} c="rgba(140,60,170,0.16)" amp={100} />
        <Stars n={170} seedKey="cs" tint="#DCE6FF" />
      </AbsoluteFill>
    );
  }
  if (theme === 'spectral') {
    return (
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 72% 45%, #161D22 0%, ${t.bg} 70%)` }}>
        <AbsoluteFill
          style={{
            backgroundImage: 'linear-gradient(rgba(237,243,244,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(237,243,244,0.045) 1px, transparent 1px)',
            backgroundSize: '120px 120px',
            backgroundPosition: `${(f * 0.2) % 120}px 0`,
          }}
        />
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 8, background: 'linear-gradient(90deg, #6A2BD9, #2F6BFF, #1FD1C2, #5BE15A, #F2E34A, #FF9A2E, #FF3B30)', opacity: 0.8 }} />
        <Stars n={50} seedKey="sp" tint="#9FE8DF" />
      </AbsoluteFill>
    );
  }
  if (theme === 'washi') {
    return (
      <AbsoluteFill style={{ background: t.bg }}>
        <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
          <filter id="paper">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="7" />
            <feColorMatrix values="0 0 0 0 0.32  0 0 0 0 0.30  0 0 0 0 0.26  0 0 0 0.55 -0.2" />
          </filter>
          <filter id="fiber">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.35" numOctaves="2" seed="3" />
            <feColorMatrix values="0 0 0 0 0.4  0 0 0 0 0.38  0 0 0 0 0.33  0 0 0 0.5 -0.18" />
          </filter>
          <rect width={W} height={H} filter="url(#paper)" opacity={0.5} />
          <rect width={W} height={H} filter="url(#fiber)" opacity={0.45} />
        </svg>
        <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(70,64,50,0.2) 100%)' }} />
      </AbsoluteFill>
    );
  }
  // studio
  return (
    <AbsoluteFill style={{ background: t.bg }}>
      <Blob seed="s1" x={420} y={260} s={1100} c="rgba(110,140,255,0.16)" amp={110} />
      <Blob seed="s2" x={1560} y={900} s={900} c="rgba(255,196,130,0.07)" amp={90} />
      <Stars n={60} seedKey="st" tint="#C9D6FF" />
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(2,4,12,0.55) 100%)' }} />
    </AbsoluteFill>
  );
};
